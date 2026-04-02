import { Shield } from "lucide-react";

interface TrustScoreBadgeProps {
  score: number;
  size?: "sm" | "md";
}

export function getTrustScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
} {
  if (score >= 30) return { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" };
  if (score >= 0) return { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" };
  return { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" };
}

export default function TrustScoreBadge({ score, size = "md" }: TrustScoreBadgeProps) {
  const colors = getTrustScoreColor(score);
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${colors.text} ${colors.bg} ${colors.border} ${isSmall ? "text-xs" : "text-sm"}`}
      aria-label={`Trust score: ${score}`}
    >
      <Shield className={isSmall ? "h-3 w-3" : "h-4 w-4"} />
      {score}
    </span>
  );
}
