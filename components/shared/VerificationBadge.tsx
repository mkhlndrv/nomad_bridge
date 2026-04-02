import { ShieldCheck, BadgeCheck, Circle } from "lucide-react";

interface VerificationBadgeProps {
  level: "unverified" | "email_verified" | "community_verified";
  size?: "sm" | "md";
}

const config = {
  unverified: {
    icon: Circle,
    color: "text-gray-400",
    title: "Unverified",
    label: "Not yet verified",
  },
  email_verified: {
    icon: BadgeCheck,
    color: "text-blue-500",
    title: "Email Verified",
    label: "Email address confirmed",
  },
  community_verified: {
    icon: ShieldCheck,
    color: "text-green-500",
    title: "Community Verified",
    label: "Community Verified — Trust Score 30+",
  },
} as const;

const sizeMap = { sm: "h-4 w-4", md: "h-5 w-5" };

export default function VerificationBadge({ level, size = "md" }: VerificationBadgeProps) {
  const { icon: Icon, color, title, label } = config[level];

  return (
    <span title={title} aria-label={label} className={`inline-flex ${color}`}>
      <Icon className={sizeMap[size]} />
    </span>
  );
}
