export interface CapacityBarProps {
  rsvpCount: number;
  capacity: number;
  size?: "sm" | "lg";
}

function getBarColor(percent: number): string {
  if (percent >= 85) return "bg-red-500";
  if (percent >= 60) return "bg-yellow-500";
  return "bg-green-500";
}

export default function CapacityBar({ rsvpCount, capacity, size = "sm" }: CapacityBarProps) {
  if (capacity === 0) {
    return (
      <div className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-400 font-medium`}>
        Registration Closed
      </div>
    );
  }

  const percent = Math.min(100, Math.round((rsvpCount / capacity) * 100));
  const remaining = Math.max(0, capacity - rsvpCount);
  const isFull = rsvpCount >= capacity;

  const barHeight = size === "sm" ? "h-1.5" : "h-2.5";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div>
      <div className={`flex justify-between items-center mb-1 ${textSize}`}>
        {isFull ? (
          <span className="font-medium text-red-600">Event Full</span>
        ) : (
          <span className="text-gray-600">
            {remaining}/{capacity} spots remaining
          </span>
        )}
      </div>
      <div className={`${barHeight} rounded-full bg-gray-100 overflow-hidden`}>
        <div
          className={`${barHeight} rounded-full ${getBarColor(percent)} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
