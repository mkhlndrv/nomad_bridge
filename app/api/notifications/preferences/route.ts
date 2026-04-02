import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { NOTIFICATION_CATEGORIES } from "@/lib/notification-types";

export async function GET(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.notificationPreference.findMany({
    where: { userId },
  });

  // Ensure all 5 categories exist
  const existingCategories = new Set(existing.map((p) => p.category));
  const missing = NOTIFICATION_CATEGORIES.filter((c) => !existingCategories.has(c));

  if (missing.length > 0) {
    for (const category of missing) {
      await prisma.notificationPreference.create({
        data: { userId, category, emailEnabled: true, lineEnabled: true, telegramEnabled: true },
      });
    }
  }

  const preferences = await prisma.notificationPreference.findMany({
    where: { userId },
    orderBy: { category: "asc" },
  });

  return NextResponse.json({ preferences });
}

export async function PUT(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { preferences } = body;

  if (!Array.isArray(preferences)) {
    return NextResponse.json({ error: "Invalid preferences format" }, { status: 400 });
  }

  for (const pref of preferences) {
    const { category, emailEnabled, lineEnabled, telegramEnabled } = pref;
    if (!NOTIFICATION_CATEGORIES.includes(category)) continue;

    await prisma.notificationPreference.upsert({
      where: { userId_category: { userId, category } },
      update: {
        emailEnabled: !!emailEnabled,
        lineEnabled: !!lineEnabled,
        telegramEnabled: !!telegramEnabled,
      },
      create: {
        userId,
        category,
        emailEnabled: !!emailEnabled,
        lineEnabled: !!lineEnabled,
        telegramEnabled: !!telegramEnabled,
      },
    });
  }

  const updated = await prisma.notificationPreference.findMany({
    where: { userId },
    orderBy: { category: "asc" },
  });

  return NextResponse.json({ preferences: updated });
}
