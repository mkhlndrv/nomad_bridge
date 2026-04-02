"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const TYPES = [
  { value: "", label: "All Types" },
  { value: "GUEST_LECTURE", label: "Guest Lecture" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SKILL_EXCHANGE", label: "Skill Exchange" },
  { value: "MENTORSHIP", label: "Mentorship" },
  { value: "PROJECT", label: "Project" },
];

const FORMATS = [
  { value: "", label: "All Formats" },
  { value: "IN_PERSON", label: "In Person" },
  { value: "ONLINE", label: "Online" },
  { value: "HYBRID", label: "Hybrid" },
];

const COMPENSATIONS = [
  { value: "", label: "All Compensation" },
  { value: "PAID", label: "Paid" },
  { value: "FREE", label: "Free" },
  { value: "FACILITY_ACCESS", label: "Facility Access" },
];

const STATUSES = [
  { value: "", label: "All Statuses" },
  { value: "OPEN", label: "Open" },
  { value: "IN_DISCUSSION", label: "In Discussion" },
  { value: "MATCHED", label: "Matched" },
  { value: "COMPLETED", label: "Completed" },
];

export default function CollaborationFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(`/collaborations${qs ? `?${qs}` : ""}`);
  }

  function handleSearch() {
    updateParam("search", search);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          placeholder="Search collaborations..."
          className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <select
        value={searchParams.get("type") ?? ""}
        onChange={(e) => updateParam("type", e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
      <select
        value={searchParams.get("format") ?? ""}
        onChange={(e) => updateParam("format", e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
      </select>
      <select
        value={searchParams.get("compensation") ?? ""}
        onChange={(e) => updateParam("compensation", e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {COMPENSATIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <select
        value={searchParams.get("status") ?? ""}
        onChange={(e) => updateParam("status", e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>
  );
}
