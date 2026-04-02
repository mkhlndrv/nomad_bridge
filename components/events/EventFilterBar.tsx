"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/useDebounce";

const UNIVERSITIES = [
  "All Universities",
  "Chulalongkorn University",
  "Thammasat University",
  "Mahidol University",
];

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "ACADEMIC", label: "Academic" },
  { value: "NETWORKING", label: "Networking" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SOCIAL", label: "Social" },
  { value: "CAREER", label: "Career" },
];

export default function EventFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [university, setUniversity] = useState(searchParams.get("university") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("from") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("to") ?? "");

  const debouncedSearch = useDebounce(search, 300);

  const pushParams = useCallback(
    (overrides: Record<string, string> = {}) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged = { university, category, search: debouncedSearch, from: dateFrom, to: dateTo, ...overrides };

      // Reset page on filter change
      params.delete("page");

      for (const [key, value] of Object.entries(merged)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      router.push(`/events?${params.toString()}`);
    },
    [router, searchParams, university, category, debouncedSearch, dateFrom, dateTo]
  );

  // Update URL when debounced search changes
  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    if (debouncedSearch !== currentSearch) {
      pushParams({ search: debouncedSearch });
    }
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  function updateFilter(key: string, value: string) {
    const setters: Record<string, (v: string) => void> = {
      university: setUniversity,
      category: setCategory,
      from: setDateFrom,
      to: setDateTo,
    };
    setters[key]?.(value);
    pushParams({ [key]: value });
  }

  function clearFilters() {
    setUniversity("");
    setCategory("");
    setSearch("");
    setDateFrom("");
    setDateTo("");
    router.push("/events");
  }

  const hasFilters = university || category || search || dateFrom || dateTo;

  return (
    <div className="space-y-3">
      {/* Search + University */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={university}
          onChange={(e) => updateFilter("university", e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u === "All Universities" ? "" : u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => updateFilter("category", category === cat.value && cat.value ? "" : cat.value)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              category === cat.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Date range + Clear */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor="date-from">From</label>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => updateFilter("from", e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor="date-to">To</label>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => updateFilter("to", e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <X className="h-3.5 w-3.5" /> Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
