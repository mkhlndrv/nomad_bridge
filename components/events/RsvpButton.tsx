"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface RsvpButtonProps {
  eventId: string;
  eventDate: string | Date;
  capacity: number;
  rsvpCount: number;
  isRsvped: boolean;
  rsvpStatus: "CONFIRMED" | "WAITLISTED" | null;
  waitlistPosition?: number | null;
  onRsvpSuccess?: () => void;
  onCountChange?: (delta: number) => void;
}

export default function RsvpButton({
  eventId,
  eventDate,
  capacity,
  rsvpCount,
  isRsvped: initialIsRsvped,
  rsvpStatus: initialStatus,
  waitlistPosition,
  onRsvpSuccess,
  onCountChange,
}: RsvpButtonProps) {
  const [isRsvped, setIsRsvped] = useState(initialIsRsvped);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPast = new Date(eventDate) < new Date();
  const isFull = rsvpCount >= capacity;

  if (isPast) {
    return (
      <button disabled className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-400 cursor-not-allowed">
        Past Event
      </button>
    );
  }

  if (capacity === 0) {
    return (
      <button disabled className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-400 cursor-not-allowed">
        Registration Closed
      </button>
    );
  }

  async function handleRsvp() {
    setLoading(true);
    setError(null);

    // Optimistic update
    setIsRsvped(true);
    setStatus("CONFIRMED");
    onCountChange?.(1);

    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        // Revert optimistic
        setIsRsvped(false);
        setStatus(null);
        onCountChange?.(-1);
        setError(data.error || "Failed to RSVP");
        return;
      }

      if (data.status === "waitlisted") {
        setStatus("WAITLISTED");
        onCountChange?.(-1); // Revert — waitlist doesn't affect count
      }

      onRsvpSuccess?.();
    } catch {
      setIsRsvped(false);
      setStatus(null);
      onCountChange?.(-1);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!window.confirm("Are you sure you want to cancel your RSVP?")) return;

    setLoading(true);
    setError(null);

    const prevStatus = status;
    setIsRsvped(false);
    setStatus(null);
    if (prevStatus === "CONFIRMED") onCountChange?.(-1);

    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        setIsRsvped(true);
        setStatus(prevStatus);
        if (prevStatus === "CONFIRMED") onCountChange?.(1);
        setError(data.error || "Failed to cancel RSVP");
      }
    } catch {
      setIsRsvped(true);
      setStatus(prevStatus);
      if (prevStatus === "CONFIRMED") onCountChange?.(1);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {isRsvped && status === "CONFIRMED" ? (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="w-full rounded-lg border-2 border-red-300 bg-white px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Cancel RSVP"}
        </button>
      ) : isRsvped && status === "WAITLISTED" ? (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="w-full rounded-lg border-2 border-orange-300 bg-white px-4 py-3 text-sm font-medium text-orange-600 hover:bg-orange-50 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Leave Waitlist"}
        </button>
      ) : isFull ? (
        <button
          onClick={handleRsvp}
          disabled={loading}
          className="w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : `Join Waitlist${waitlistPosition ? ` (#${waitlistPosition})` : ""}`}
        </button>
      ) : (
        <button
          onClick={handleRsvp}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "RSVP Now"}
        </button>
      )}
    </div>
  );
}
