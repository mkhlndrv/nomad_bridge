import { prisma } from "@/lib/prisma";
import { NOTIFICATION_TYPE_MAP, type NotificationPayload, type Channel } from "@/lib/notification-types";
import { mockSendEmail } from "@/lib/mock-email";
import { mockSendLine } from "@/lib/mock-line";
import { mockSendTelegram } from "@/lib/mock-telegram";

const RATE_LIMIT_PER_HOUR = 10;
const DEDUP_WINDOW_MS = 5 * 60 * 1000;

interface SendResult {
  notificationId: string | null;
  channelsDispatched: Channel[];
  channelsSkipped: Channel[];
  skipped: boolean;
  reason?: string;
}

export async function sendNotification(payload: NotificationPayload): Promise<SendResult> {
  const { userId, type, title, message, linkUrl } = payload;
  const typeConfig = NOTIFICATION_TYPE_MAP[type];

  if (!typeConfig) {
    return { notificationId: null, channelsDispatched: [], channelsSkipped: [], skipped: true, reason: "Unknown type" };
  }

  // Rate limiting: max 10 per user per hour
  const oneHourAgo = new Date(Date.now() - 3600_000);
  const recentCount = await prisma.notification.count({
    where: { userId, createdAt: { gte: oneHourAgo } },
  });

  if (recentCount >= RATE_LIMIT_PER_HOUR) {
    return { notificationId: null, channelsDispatched: [], channelsSkipped: [], skipped: true, reason: "Rate limited" };
  }

  // Idempotency: same (userId, type, linkUrl) within 5 minutes
  if (linkUrl) {
    const fiveMinAgo = new Date(Date.now() - DEDUP_WINDOW_MS);
    const duplicate = await prisma.notification.findFirst({
      where: { userId, type, linkUrl, createdAt: { gte: fiveMinAgo } },
    });
    if (duplicate) {
      return { notificationId: duplicate.id, channelsDispatched: [], channelsSkipped: [], skipped: true, reason: "Duplicate" };
    }
  }

  // Create in-app notification record
  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      category: typeConfig.category,
      title,
      message,
      linkUrl,
    },
  });

  // Get user preferences for this category
  let pref = await prisma.notificationPreference.findFirst({
    where: { userId, category: typeConfig.category },
  });

  if (!pref) {
    pref = await prisma.notificationPreference.create({
      data: {
        userId,
        category: typeConfig.category,
        emailEnabled: true,
        lineEnabled: true,
        telegramEnabled: true,
      },
    });
  }

  // Get user info for dispatching
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });

  if (!user) {
    return { notificationId: notification.id, channelsDispatched: [], channelsSkipped: [], skipped: false };
  }

  // Determine active channels: intersection of defaultChannels and user prefs
  const channelsDispatched: Channel[] = [];
  const channelsSkipped: Channel[] = [];

  const channelChecks: { channel: Channel; enabled: boolean; dispatch: () => Promise<boolean> }[] = [
    {
      channel: "email",
      enabled: pref.emailEnabled && typeConfig.defaultChannels.includes("email"),
      dispatch: () => mockSendEmail({ to: user.email, subject: title, body: message }),
    },
    {
      channel: "line",
      enabled: pref.lineEnabled && typeConfig.defaultChannels.includes("line"),
      dispatch: () => mockSendLine({ userId, message: `${title}\n${message}` }),
    },
    {
      channel: "telegram",
      enabled: pref.telegramEnabled && typeConfig.defaultChannels.includes("telegram"),
      dispatch: () => mockSendTelegram({ userId, message: `*${title}*\n${message}` }),
    },
  ];

  const results = await Promise.allSettled(
    channelChecks.map(async ({ channel, enabled, dispatch }) => {
      if (!enabled) {
        channelsSkipped.push(channel);
        return;
      }
      try {
        await dispatch();
        channelsDispatched.push(channel);
      } catch (err) {
        console.error(`Failed to send ${channel} notification:`, err);
        channelsSkipped.push(channel);
      }
    })
  );

  // Log any unexpected rejections
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Channel dispatch ${i} rejected:`, r.reason);
    }
  });

  return { notificationId: notification.id, channelsDispatched, channelsSkipped, skipped: false };
}
