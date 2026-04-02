"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "GENERAL", label: "General" },
  { value: "TIPS", label: "Tips" },
  { value: "EVENTS", label: "Events" },
  { value: "HOUSING", label: "Housing" },
  { value: "COWORKING", label: "Coworking" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "": "bg-gray-900 text-white",
  GENERAL: "bg-gray-200 text-gray-800",
  TIPS: "bg-blue-200 text-blue-800",
  EVENTS: "bg-purple-200 text-purple-800",
  HOUSING: "bg-green-200 text-green-800",
  COWORKING: "bg-orange-200 text-orange-800",
};

const CATEGORY_COLORS_INACTIVE: Record<string, string> = {
  "": "bg-gray-100 text-gray-600 hover:bg-gray-200",
  GENERAL: "bg-gray-50 text-gray-500 hover:bg-gray-100",
  TIPS: "bg-blue-50 text-blue-500 hover:bg-blue-100",
  EVENTS: "bg-purple-50 text-purple-500 hover:bg-purple-100",
  HOUSING: "bg-green-50 text-green-500 hover:bg-green-100",
  COWORKING: "bg-orange-50 text-orange-500 hover:bg-orange-100",
};

export function ForumFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";
  const searchQuery = searchParams.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleCategoryClick(category: string) {
    updateParams("category", category);
  }

  function handleSearchChange(value: string) {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams("search", value.trim());
    }, 300);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          const colorClass = isActive
            ? CATEGORY_COLORS[cat.value]
            : CATEGORY_COLORS_INACTIVE[cat.value];
          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${colorClass}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search threads..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
        />
      </div>
    </div>
  );
}
