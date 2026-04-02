"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatDateBangkok } from "@/lib/utils";

interface TrustEntry {
  id: string;
  delta: number;
  reason: string;
  newScore: number;
  createdAt: string;
}

export default function TrustScoreHistory() {
  const [entries, setEntries] = useState<TrustEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  async function fetchHistory(p: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/trust-history?page=${p}&limit=${limit}`);
      if (res.ok) {
        const data = await res.json();
        if (p === 1) {
          setEntries(data.data);
        } else {
          setEntries((prev) => [...prev, ...data.data]);
        }
        setTotal(data.total);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory(1);
  }, []);

  function handleLoadMore() {
    const next = page + 1;
    setPage(next);
    fetchHistory(next);
  }

  if (!loading && entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        No trust score history yet. Start by attending events!
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3"
        >
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${entry.delta >= 0 ? "bg-green-50" : "bg-red-50"}`}>
            {entry.delta >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 truncate">{entry.reason}</p>
            <p className="text-xs text-gray-400">
              {formatDateBangkok(new Date(entry.createdAt))}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className={`text-sm font-semibold ${entry.delta >= 0 ? "text-green-600" : "text-red-600"}`}>
              {entry.delta >= 0 ? "+" : ""}{entry.delta}
            </p>
            <p className="text-xs text-gray-400">→ {entry.newScore}</p>
          </div>
        </div>
      ))}

      {entries.length < total && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="w-full mt-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
