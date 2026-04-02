import { TrustScoreBadge } from "@/app/_components/TrustScoreBadge";
import { formatRelativeTime } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  GENERAL: "bg-gray-100 text-gray-700",
  TIPS: "bg-blue-100 text-blue-700",
  EVENTS: "bg-purple-100 text-purple-700",
  HOUSING: "bg-green-100 text-green-700",
  COWORKING: "bg-orange-100 text-orange-700",
};

interface ThreadPostProps {
  thread: {
    id: string;
    title: string;
    content: string;
    category: string;
    pinned: boolean;
    netScore: number;
    createdAt: string;
    isDeleted: boolean;
    user: { id: string; name: string; trustScore: number };
  };
  voteButtons?: React.ReactNode;
}

export function ThreadPost({ thread, voteButtons }: ThreadPostProps) {
  const initials = thread.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const categoryColor = CATEGORY_COLORS[thread.category] ?? CATEGORY_COLORS.GENERAL;
  const isDimmed = thread.netScore < -5;

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-5 ${isDimmed ? "opacity-60" : ""}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{thread.user.name}</span>
            <TrustScoreBadge score={thread.user.trustScore} showLabel />
          </div>
          <span className="text-xs text-gray-500">
            {formatRelativeTime(new Date(thread.createdAt))}
          </span>
        </div>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColor}`}>
          {thread.category.charAt(0) + thread.category.slice(1).toLowerCase()}
        </span>
        {thread.pinned && (
          <span className="text-xs font-medium text-amber-600">📌 Pinned</span>
        )}
      </div>

      {isDimmed ? (
        <details>
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            This post has been hidden due to low score. Click to show.
          </summary>
          <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
            {thread.content}
          </div>
        </details>
      ) : (
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
          {thread.content}
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        {voteButtons ?? (
          <span className="text-sm font-medium text-gray-500">
            Score: {thread.netScore}
          </span>
        )}
      </div>
    </div>
  );
}
