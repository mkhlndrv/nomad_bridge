import Link from "next/link";
import { Calendar, MapPin, GraduationCap } from "lucide-react";
import { formatDateBangkok, formatTimeBangkok, parseTags } from "@/lib/utils";
import CapacityBar from "../shared/CapacityBar";

export interface EventCardProps {
  id: string;
  title: string;
  description?: string | null;
  date: string | Date;
  venue: string;
  university: string;
  category: string;
  imageUrl?: string | null;
  tags?: string | null;
  rsvpCount: number;
  capacity: number;
  status?: string;
}

const categoryColors: Record<string, string> = {
  ACADEMIC: "bg-blue-600",
  NETWORKING: "bg-purple-600",
  WORKSHOP: "bg-orange-600",
  SOCIAL: "bg-pink-600",
  CAREER: "bg-emerald-600",
};

const categoryLabels: Record<string, string> = {
  ACADEMIC: "Academic",
  NETWORKING: "Networking",
  WORKSHOP: "Workshop",
  SOCIAL: "Social",
  CAREER: "Career",
};

export default function EventCard({
  id,
  title,
  description,
  date,
  venue,
  university,
  category,
  tags,
  rsvpCount,
  capacity,
  status,
}: EventCardProps) {
  const eventDate = new Date(date);
  const isPast = status === "PAST" || eventDate < new Date();
  const tagList = parseTags(tags ?? "");

  return (
    <Link
      href={`/events/${id}`}
      className="block rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden bg-white"
    >
      {/* Image / gradient header */}
      <div className="relative h-36 bg-gradient-to-br from-blue-500 to-purple-600">
        {/* Category badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${categoryColors[category] ?? "bg-gray-600"}`}
        >
          {categoryLabels[category] ?? category}
        </span>

        {/* Past event overlay */}
        {isPast && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="rounded-full bg-gray-900/80 px-3 py-1 text-sm font-medium text-white">
              Past Event
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2.5">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{title}</h3>

        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="flex flex-col gap-1.5 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {formatDateBangkok(eventDate)} · {formatTimeBangkok(eventDate)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {venue}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            {university}
          </span>
        </div>

        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tagList.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <CapacityBar rsvpCount={rsvpCount} capacity={capacity} size="sm" />
      </div>
    </Link>
  );
}
