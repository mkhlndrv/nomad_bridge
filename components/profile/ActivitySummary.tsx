import { Calendar, BookOpen, Building2, MessageSquare } from "lucide-react";

interface ActivitySummaryProps {
  eventsAttended: number;
  lecturesGiven: number;
  bookingsMade: number;
  forumPosts: number;
}

const stats = [
  { key: "eventsAttended", label: "Events Attended", icon: Calendar, color: "text-blue-600 bg-blue-50" },
  { key: "lecturesGiven", label: "Lectures Given", icon: BookOpen, color: "text-purple-600 bg-purple-50" },
  { key: "bookingsMade", label: "Bookings Made", icon: Building2, color: "text-orange-600 bg-orange-50" },
  { key: "forumPosts", label: "Forum Posts", icon: MessageSquare, color: "text-green-600 bg-green-50" },
] as const;

export default function ActivitySummary(props: ActivitySummaryProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Activity</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm"
          >
            <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{props[key]}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
