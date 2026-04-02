"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/useDebounce";

const TYPES = [
  { value: "", label: "All" },
  { value: "LIBRARY", label: "Library" },
  { value: "COWORKING", label: "Coworking" },
  { value: "GYM", label: "Gym" },
  { value: "CAFE", label: "Cafe" },
  { value: "LAB", label: "Lab" },
];

const UNIVERSITIES = [
  "All Universities",
  "Chulalongkorn University",
  "Thammasat University",
  "KMUTT",
  "Mahidol University",
];

const PRICE_RANGES = [
  { value: "", label: "Any Price" },
  { value: "0", label: "Free" },
  { value: "100", label: "Under ฿100/hr" },
  { value: "500", label: "Under ฿500/hr" },
];

export default function VenueFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const debouncedSearch = useDebounce(search, 300);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(`/facilities${qs ? `?${qs}` : ""}`);
  }

  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    if (debouncedSearch !== current) {
      updateParam("search", debouncedSearch);
    }
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  function clearFilters() {
    setSearch("");
    setType("");
    router.push("/facilities");
  }

  const hasFilters = search || searchParams.get("type") || searchParams.get("university") || searchParams.get("maxPrice");

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
            placeholder="Search venues..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={searchParams.get("university") ?? ""}
          onChange={(e) => updateParam("university", e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u === "All Universities" ? "" : u}>{u}</option>
          ))}
        </select>
        <select
          value={searchParams.get("maxPrice") ?? ""}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {PRICE_RANGES.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Type pills */}
      <div className="flex flex-wrap gap-2 items-center">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => { setType(t.value); updateParam("type", t.value); }}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              type === t.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
