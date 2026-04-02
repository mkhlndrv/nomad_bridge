import { Clock } from "lucide-react";

interface WaitlistIndicatorProps {
  position: number;
  totalWaitlisted: number;
}

export default function WaitlistIndicator({ position, totalWaitlisted }: WaitlistIndicatorProps) {
  if (position <= 0) return null;

  const positionText =
    position === 1
      ? "You're next on the waitlist!"
      : `You're #${position} on the waitlist`;

  return (
    <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
      <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-blue-800">{positionText}</p>
        <p className="text-xs text-blue-600 mt-0.5">
          {totalWaitlisted} {totalWaitlisted === 1 ? "person" : "people"} waiting
        </p>
        <p className="text-xs text-blue-500 mt-1">
          You&apos;ll be automatically promoted when a spot opens up
        </p>
      </div>
    </div>
  );
}
