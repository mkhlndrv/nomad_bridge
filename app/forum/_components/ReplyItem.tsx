import { TrustScoreBadge } from "@/app/_components/TrustScoreBadge";
import { formatRelativeTime } from "@/lib/utils";
import { Award } from "lucide-react";

interface ReplyItemProps {
  reply: {
    id: string;
    content: string;
    netScore: number;
    isBestAnswer: boolean;
    isDeleted: boolean;
    createdAt: string;
    author: { id: string; name: string; trustScore: number };
  };
  voteButtons?: React.ReactNode;
}

export function ReplyItem({ reply, voteButtons }: ReplyItemProps) {
  const initials = reply.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isDimmed = reply.netScore < -5;

  return (
    <div
      className={`rounded-lg border p-4 ${
        reply.isBestAnswer
          ? "border-green-300 bg-green-50/50"
          : "border-gray-200 bg-white"
      } ${isDimmed ? "opacity-60" : ""}`}
    >
      {reply.isBestAnswer && (
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-600">
          <Award className="h-3.5 w-3.5" />
          Best Answer
        </div>
      )}

      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-900">{reply.author.name}</span>
        <TrustScoreBadge score={reply.author.trustScore} />
        <span className="text-xs text-gray-500">
          {formatRelativeTime(new Date(reply.createdAt))}
        </span>
      </div>

      {isDimmed && !reply.isDeleted ? (
        <details>
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            Hidden due to low score. Click to show.
          </summary>
          <div className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{reply.content}</div>
        </details>
      ) : (
        <div className="whitespace-pre-wrap text-sm text-gray-700">{reply.content}</div>
      )}

      <div className="mt-2 flex items-center gap-3">
        {voteButtons ?? (
          <span className="text-xs font-medium text-gray-500">
            Score: {reply.netScore}
          </span>
        )}
      </div>
    </div>
  );
}
