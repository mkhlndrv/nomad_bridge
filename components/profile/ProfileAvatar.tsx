import VerificationBadge from "../shared/VerificationBadge";

interface ProfileAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  verificationLevel?: "unverified" | "email_verified" | "community_verified";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-xl",
  lg: "h-24 w-24 text-3xl",
};

export default function ProfileAvatar({ name, avatarUrl, size = "md", verificationLevel }: ProfileAvatarProps) {
  const initials = getInitials(name);

  const avatar = avatarUrl ? (
    <img
      src={avatarUrl}
      alt={name}
      className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
    />
  ) : (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold border-2 border-gray-200`}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );

  if (verificationLevel && verificationLevel !== "unverified") {
    return (
      <div className="relative inline-block">
        {avatar}
        <span className="absolute bottom-0 right-0 rounded-full bg-white p-0.5 shadow-sm">
          <VerificationBadge level={verificationLevel} size="sm" />
        </span>
      </div>
    );
  }

  return avatar;
}
