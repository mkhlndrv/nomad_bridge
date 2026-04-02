import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface TrustScoreBadgeProps {
  score: number;
  showLabel?: boolean;
}

export function TrustScoreBadge({ score, showLabel = false }: TrustScoreBadgeProps) {
  let color: string;
  let Icon: typeof Shield;
  let label: string;

  if (score >= 50) {
    color = "text-green-600";
    Icon = ShieldCheck;
    label = "Trusted";
  } else if (score >= 10) {
    color = "text-blue-500";
    Icon = Shield;
    label = "Verified";
  } else {
    color = "text-gray-400";
    Icon = ShieldAlert;
    label = "New";
  }

  return (
    <span className={`inline-flex items-center gap-1 ${color}`} title={`Trust score: ${score}`}>
      <Icon className="h-3.5 w-3.5" />
      {showLabel && <span className="text-xs font-medium">{label}</span>}
    </span>
  );
}
