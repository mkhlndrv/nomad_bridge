"use client";

import { useState } from "react";
import { Search } from "lucide-react";

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

interface EventFilterBarProps {
  onFilter?: (filters: {
    university: string;
    category: string;
    search: string;
    dateFrom: string;
    dateTo: string;
  }) => void;
}

export default function EventFilterBar({ onFilter }: EventFilterBarProps) {
  const [university, setUniversity] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function emitFilter(overrides: Record<string, string> = {}) {
    const filters = { university, category, search, dateFrom, dateTo, ...overrides };
    onFilter?.(filters);
  }

  return (
    <div className="space-y-3">
      {/* Search + University */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); emitFilter({ search: e.target.value }); }}
            placeholder="Search events..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={university}
          onChange={(e) => { setUniversity(e.target.value); emitFilter({ university: e.target.value }); }}
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
            onClick={() => { setCategory(cat.value); emitFilter({ category: cat.value }); }}
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

      {/* Date range */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor="date-from">From</label>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); emitFilter({ dateFrom: e.target.value }); }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor="date-to">To</label>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); emitFilter({ dateTo: e.target.value }); }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
