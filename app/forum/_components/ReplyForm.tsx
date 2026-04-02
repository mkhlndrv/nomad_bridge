"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReplyFormProps {
  threadId: string;
  userId: string;
}

export function ReplyForm({ threadId, userId }: ReplyFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`/api/forum/${threadId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to post reply");
        setSubmitting(false);
        return;
      }

      setContent("");
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Reply</h3>
      {error && (
        <div className="mb-2 rounded bg-red-50 p-2 text-sm text-red-600">{error}</div>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        required
        rows={4}
        placeholder="Write your reply..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{content.length}/5000</span>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Reply"}
        </button>
      </div>
    </form>
  );
}
