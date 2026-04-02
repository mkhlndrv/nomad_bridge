"use client";

import { Mic, Users, FlaskConical, GraduationCap, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TypeOption {
  value: string;
  label: string;
  icon: LucideIcon;
  description: string;
  colorClass: string;
  selectedBg: string;
}

const COLLABORATION_TYPES: TypeOption[] = [
  { value: "GUEST_LECTURE", label: "Guest Lecture", icon: Mic, description: "Share knowledge through talks and presentations", colorClass: "text-purple-600", selectedBg: "border-purple-500 bg-purple-50" },
  { value: "WORKSHOP", label: "Workshop", icon: Users, description: "Co-host hands-on learning sessions", colorClass: "text-blue-600", selectedBg: "border-blue-500 bg-blue-50" },
  { value: "SKILL_EXCHANGE", label: "Skill Exchange", icon: FlaskConical, description: "Collaborate on skill sharing and research", colorClass: "text-teal-600", selectedBg: "border-teal-500 bg-teal-50" },
  { value: "MENTORSHIP", label: "Mentorship", icon: GraduationCap, description: "Guide or be guided in your field", colorClass: "text-amber-600", selectedBg: "border-amber-500 bg-amber-50" },
  { value: "PROJECT", label: "Project", icon: Handshake, description: "Partner on real-world projects", colorClass: "text-rose-600", selectedBg: "border-rose-500 bg-rose-50" },
];

interface CollaborationTypeSelectorProps {
  selected: string | null;
  onSelect: (type: string) => void;
}

export default function CollaborationTypeSelector({ selected, onSelect }: CollaborationTypeSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Collaboration type" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {COLLABORATION_TYPES.map((type) => {
        const Icon = type.icon;
        const isSelected = selected === type.value;

        return (
          <button
            key={type.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(type.value)}
            className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
              isSelected
                ? type.selectedBg
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className={`rounded-lg p-2 ${isSelected ? type.selectedBg : "bg-gray-100"}`}>
              <Icon className={`h-6 w-6 ${isSelected ? type.colorClass : "text-gray-500"}`} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${isSelected ? type.colorClass : "text-gray-900"}`}>
                {type.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
