"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { value: "all", label: "All Opportunities" },
  { value: "requests", label: "Requests from Universities" },
  { value: "offers", label: "Offers from Nomads" },
];

export default function CollaborationTabBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";

  function setTab(tab: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(`/collaborations${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => setTab(tab.value)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === tab.value
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
