"use client";

import { useState, useEffect } from "react";
import { StickyNote, Plus } from "lucide-react";

interface Note {
  id: string;
  content: string;
  timestamp: number;
  createdAt: string;
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RecordingNotes({ recordingId, userId }: { recordingId: string; userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [timestamp, setTimestamp] = useState("0");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/recordings/${recordingId}/notes`, {
          headers: { "x-user-id": userId },
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data.notes);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [recordingId, userId]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/recordings/${recordingId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": userId },
        body: JSON.stringify({ content: content.trim(), timestamp: parseInt(timestamp, 10) || 0 }),
      });
      if (res.ok) {
        const note = await res.json();
        setNotes((prev) => [...prev, note].sort((a, b) => a.timestamp - b.timestamp));
        setContent("");
        setTimestamp("0");
      }
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
        <StickyNote className="h-4 w-4" /> My Notes
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="mb-3 text-sm text-gray-400">No notes yet. Add your first note below.</p>
      ) : (
        <div className="mb-4 space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="flex gap-2 rounded bg-amber-50 p-2">
              <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-mono text-amber-700">
                {formatTimestamp(note.timestamp)}
              </span>
              <p className="text-sm text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="number"
          min="0"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="0:00"
          className="w-20 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          title="Timestamp (seconds)"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
