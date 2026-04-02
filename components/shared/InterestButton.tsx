"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface InterestButtonProps {
  bookingRequestId: string;
  initialCount: number;
  initialIsInterested: boolean;
}

export default function InterestButton({
  bookingRequestId,
  initialCount,
  initialIsInterested,
}: InterestButtonProps) {
  const [interested, setInterested] = useState(initialIsInterested);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);

    // Optimistic
    const prevInterested = interested;
    const prevCount = count;
    setInterested(!interested);
    setCount(interested ? count - 1 : count + 1);

    try {
      const res = await fetch(`/api/booking-requests/${bookingRequestId}/interest`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setInterested(prevInterested);
        setCount(prevCount);
        return;
      }

      // Reconcile with server
      setInterested(data.interested);
      setCount(data.interestCount);
    } catch {
      setInterested(prevInterested);
      setCount(prevCount);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-label={interested ? "Remove interest" : "Express interest"}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
        interested
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Heart className={`h-4 w-4 ${interested ? "fill-red-500 text-red-500" : ""}`} />
      {count}
    </button>
  );
}
