import { MapPin } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import TrustScoreBadge from "../shared/TrustScoreBadge";
import VerificationBadge from "../shared/VerificationBadge";
import { calculateVerificationLevel, type VerificationLevelValue } from "@/lib/trust-score";

interface ProfileHeaderProps {
  user: {
    name: string;
    bio?: string | null;
    role: string;
    trustScore: number;
    avatarUrl?: string | null;
    location?: string | null;
    emailVerified: boolean;
  };
  isOwnProfile?: boolean;
}

const roleBadgeStyles: Record<string, string> = {
  NOMAD: "bg-blue-100 text-blue-800 border-blue-200",
  UNIVERSITY: "bg-purple-100 text-purple-800 border-purple-200",
  ADMIN: "bg-gray-100 text-gray-800 border-gray-200",
  VENUE_MANAGER: "bg-orange-100 text-orange-800 border-orange-200",
};

const roleLabels: Record<string, string> = {
  NOMAD: "Nomad",
  UNIVERSITY: "University",
  ADMIN: "Admin",
  VENUE_MANAGER: "Venue Manager",
};

export default function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
      <ProfileAvatar
        name={user.name}
        avatarUrl={user.avatarUrl}
        size="lg"
        verificationLevel={calculateVerificationLevel(user) as VerificationLevelValue}
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{user.name}</h1>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${roleBadgeStyles[user.role] ?? "bg-gray-100 text-gray-800 border-gray-200"}`}
          >
            {roleLabels[user.role] ?? user.role}
          </span>
          <TrustScoreBadge score={user.trustScore} />
          <VerificationBadge level={calculateVerificationLevel(user)} size="md" />
        </div>

        {user.location && (
          <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
            <MapPin className="h-3.5 w-3.5" />
            {user.location}
          </p>
        )}

        {user.bio ? (
          <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">
            {isOwnProfile ? "Add a bio to tell others about yourself" : "No bio yet"}
          </p>
        )}

        {isOwnProfile && (
          <a
            href="/profile/edit"
            className="mt-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Edit Profile
          </a>
        )}
      </div>
    </div>
  );
}
