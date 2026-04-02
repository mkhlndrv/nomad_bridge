import Link from "next/link";
import { Settings } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatRelativeTime } from "@/lib/utils";

const MOCK_USER_ID = "user-alice";

const CATEGORY_COLORS: Record<string, string> = {
  EVENTS: "bg-purple-100 text-purple-700",
  BOOKINGS: "bg-blue-100 text-blue-700",
  LECTURES: "bg-green-100 text-green-700",
  COMMUNITY: "bg-orange-100 text-orange-700",
  TRUST: "bg-amber-100 text-amber-700",
};

export const metadata = {
  title: "Notifications — NomadBridge",
};

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const pageSize = 20;

  const where = { userId: MOCK_USER_ID, archived: false };

  const [notifications, totalCount] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.notification.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Link
          href="/notifications/preferences"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Settings className="h-4 w-4" />
          Preferences
        </Link>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
          <p className="text-lg font-medium text-gray-600">No notifications</p>
          <p className="mt-1 text-sm text-gray-400">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-lg border p-4 transition-colors ${
                !n.read ? "border-blue-200 bg-blue-50/30" : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[n.category] ?? "bg-gray-100 text-gray-600"}`}>
                  {n.category}
                </span>
                <span className="text-xs text-gray-400">
                  {formatRelativeTime(new Date(n.createdAt))}
                </span>
                {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
              </div>
              <p className="font-medium text-gray-900">{n.title}</p>
              <p className="mt-1 text-sm text-gray-600">{n.message}</p>
              {n.linkUrl && (
                <Link
                  href={n.linkUrl}
                  className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700"
                >
                  View details →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/notifications?page=${page - 1}`}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link
              href={`/notifications?page=${page + 1}`}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
