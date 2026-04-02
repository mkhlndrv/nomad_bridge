"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

interface Notification {
  id: string;
  type: string;
  category: string;
  title: string;
  message: string;
  linkUrl: string | null;
  read: boolean;
  createdAt: string;
}

interface NotificationDropdownProps {
  userId: string;
  onClose: () => void;
  onMarkRead: () => void;
}

export function NotificationDropdown({ userId, onClose, onMarkRead }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notifications?page=1", {
          headers: { "x-user-id": userId },
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  async function handleMarkAllRead() {
    try {
      await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": userId },
        body: JSON.stringify({}),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      onMarkRead();
    } catch {
      // Silently fail
    }
  }

  const CATEGORY_COLORS: Record<string, string> = {
    EVENTS: "bg-purple-100 text-purple-700",
    BOOKINGS: "bg-blue-100 text-blue-700",
    LECTURES: "bg-green-100 text-green-700",
    COMMUNITY: "bg-orange-100 text-orange-700",
    TRUST: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg sm:w-96">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          <Check className="h-3 w-3" />
          Mark all read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">No notifications yet</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50 ${
                !n.read ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[n.category] ?? "bg-gray-100 text-gray-600"}`}>
                  {n.category}
                </span>
                <span className="text-[10px] text-gray-400">
                  {formatRelativeTime(new Date(n.createdAt))}
                </span>
                {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
              </div>
              <p className="text-sm font-medium text-gray-900">{n.title}</p>
              <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{n.message}</p>
              {n.linkUrl && (
                <Link
                  href={n.linkUrl}
                  onClick={onClose}
                  className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  View <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-100 px-4 py-2 text-center">
        <Link
          href="/notifications"
          onClick={onClose}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}
