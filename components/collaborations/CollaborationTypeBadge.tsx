import { Mic, Users, FlaskConical, GraduationCap, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const typeConfig: Record<string, { icon: LucideIcon; label: string; bgClass: string; textClass: string }> = {
  GUEST_LECTURE: { icon: Mic, label: "Guest Lecture", bgClass: "bg-purple-50", textClass: "text-purple-700" },
  WORKSHOP: { icon: Users, label: "Workshop", bgClass: "bg-blue-50", textClass: "text-blue-700" },
  SKILL_EXCHANGE: { icon: FlaskConical, label: "Skill Exchange", bgClass: "bg-teal-50", textClass: "text-teal-700" },
  MENTORSHIP: { icon: GraduationCap, label: "Mentorship", bgClass: "bg-amber-50", textClass: "text-amber-700" },
  PROJECT: { icon: Handshake, label: "Project", bgClass: "bg-rose-50", textClass: "text-rose-700" },
};

interface CollaborationTypeBadgeProps {
  type: string;
}

export default function CollaborationTypeBadge({ type }: CollaborationTypeBadgeProps) {
  const config = typeConfig[type] ?? { icon: Handshake, label: type, bgClass: "bg-gray-50", textClass: "text-gray-700" };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgClass} ${config.textClass}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
