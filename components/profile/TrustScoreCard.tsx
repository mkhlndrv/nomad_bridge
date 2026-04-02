import { AlertTriangle, TrendingUp } from "lucide-react";
import TrustScoreBadge from "../shared/TrustScoreBadge";
import VerificationBadge from "../shared/VerificationBadge";
import type { VerificationLevelValue } from "@/lib/trust-score";

interface TrustScoreCardProps {
  trustScore: number;
  verificationLevel: VerificationLevelValue;
}

const levelLabels: Record<VerificationLevelValue, string> = {
  unverified: "Unverified",
  email_verified: "Email Verified",
  community_verified: "Community Verified",
};

export default function TrustScoreCard({ trustScore, verificationLevel }: TrustScoreCardProps) {
  const progressTarget = 30;
  const progressPercent = Math.min(Math.max(trustScore / progressTarget, 0), 1) * 100;
  const isCommunityVerified = verificationLevel === "community_verified";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Trust Score</h2>
        <TrustScoreBadge score={trustScore} />
      </div>

      {/* Verification Level */}
      <div className="flex items-center gap-2 mb-4">
        <VerificationBadge level={verificationLevel} size="md" />
        <span className="text-sm font-medium text-gray-700">{levelLabels[verificationLevel]}</span>
      </div>

      {/* Progress bar */}
      {!isCommunityVerified && trustScore >= 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress to Community Verified</span>
            <span>{trustScore}/{progressTarget}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Encouraging / warning messages */}
      {trustScore === 0 && (
        <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm text-blue-700">
          <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" />
          <span>Build your reputation by attending events and collaborating!</span>
        </div>
      )}

      {trustScore < 0 && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>Your trust score is below zero. Attend events and get positive reviews to improve it.</span>
        </div>
      )}

      {isCommunityVerified && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-100 p-3 text-sm text-green-700">
          <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" />
          <span>You&apos;re Community Verified! Keep up the great work.</span>
        </div>
      )}

      <a
        href="/profile/trust-history"
        className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        View History →
      </a>
    </div>
  );
}
