"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

interface VoteButtonsProps {
  targetType: "THREAD" | "REPLY";
  targetId: string;
  initialScore: number;
  initialVote: string | null;
  userId: string;
  disabled?: boolean;
}

export function VoteButtons({
  targetType,
  targetId,
  initialScore,
  initialVote,
  userId,
  disabled = false,
}: VoteButtonsProps) {
  const [score, setScore] = useState(initialScore);
  const [currentVote, setCurrentVote] = useState<string | null>(initialVote);
  const [loading, setLoading] = useState(false);

  async function handleVote(direction: "UP" | "DOWN") {
    if (loading || disabled) return;
    setLoading(true);

    const newDirection = currentVote === direction ? "NONE" : direction;
    const url =
      targetType === "THREAD"
        ? `/api/forum/${targetId}/vote`
        : `/api/forum/replies/${targetId}/vote`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ direction: newDirection }),
      });

      if (res.ok) {
        const data = await res.json();
        setScore(data.netScore);
        setCurrentVote(newDirection === "NONE" ? null : newDirection);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleVote("UP")}
        disabled={loading || disabled}
        className={`rounded p-0.5 transition-colors ${
          currentVote === "UP"
            ? "text-orange-500"
            : "text-gray-400 hover:text-orange-400"
        } disabled:cursor-not-allowed`}
        title="Upvote"
      >
        <ArrowBigUp className="h-5 w-5" fill={currentVote === "UP" ? "currentColor" : "none"} />
      </button>
      <span className={`min-w-[2ch] text-center text-sm font-semibold ${
        score > 0 ? "text-orange-500" : score < 0 ? "text-blue-500" : "text-gray-500"
      }`}>
        {score}
      </span>
      <button
        onClick={() => handleVote("DOWN")}
        disabled={loading || disabled}
        className={`rounded p-0.5 transition-colors ${
          currentVote === "DOWN"
            ? "text-blue-500"
            : "text-gray-400 hover:text-blue-400"
        } disabled:cursor-not-allowed`}
        title="Downvote"
      >
        <ArrowBigDown className="h-5 w-5" fill={currentVote === "DOWN" ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
