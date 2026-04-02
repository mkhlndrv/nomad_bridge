import Link from "next/link";
import { Pin, MessageCircle, ArrowUp } from "lucide-react";
import { TrustScoreBadge } from "@/app/_components/TrustScoreBadge";
import { formatRelativeTime } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  GENERAL: "bg-gray-100 text-gray-700",
  TIPS: "bg-blue-100 text-blue-700",
  EVENTS: "bg-purple-100 text-purple-700",
  HOUSING: "bg-green-100 text-green-700",
  COWORKING: "bg-orange-100 text-orange-700",
};

interface ThreadCardProps {
  thread: {
    id: string;
    title: string;
    category: string;
    pinned: boolean;
    netScore: number;
    lastActivity: Date;
    createdAt: Date;
    user: { id: string; name: string; trustScore: number };
    _count: { replies: number };
  };
}

export function ThreadCard({ thread }: ThreadCardProps) {
  const categoryColor = CATEGORY_COLORS[thread.category] ?? CATEGORY_COLORS.GENERAL;

  return (
    <div className={`rounded-lg border bg-white p-4 transition-shadow hover:shadow-md ${thread.pinned ? "border-amber-300 bg-amber-50/30" : "border-gray-200"}`}>
      <div className="flex items-start gap-3">
        {/* Vote score */}
        <div className="flex flex-col items-center gap-0.5 pt-1 text-gray-500">
          <ArrowUp className="h-4 w-4" />
          <span className="text-sm font-semibold">{thread.netScore}</span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {thread.pinned && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                <Pin className="h-3 w-3" />
                Pinned
              </span>
            )}
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor}`}>
              {thread.category.charAt(0) + thread.category.slice(1).toLowerCase()}
            </span>
          </div>

          <Link
            href={`/forum/${thread.id}`}
            className="block text-base font-semibold text-gray-900 hover:text-blue-600"
          >
            {thread.title}
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="font-medium text-gray-700">{thread.user.name}</span>
              <TrustScoreBadge score={thread.user.trustScore} />
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {thread._count.replies} {thread._count.replies === 1 ? "reply" : "replies"}
            </span>
            <span>{formatRelativeTime(new Date(thread.lastActivity))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
