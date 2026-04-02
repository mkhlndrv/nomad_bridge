import Link from "next/link";
import { MapPin, Users, Clock } from "lucide-react";

export interface VenueCardProps {
  id: string;
  name: string;
  university: string;
  type: string;
  description?: string | null;
  location?: string | null;
  capacity: number;
  pricePerHour: number;
  operatingHours?: string | null;
  amenities?: string | null;
  available: boolean;
}

const typeColors: Record<string, string> = {
  LIBRARY: "bg-blue-100 text-blue-700",
  COWORKING: "bg-green-100 text-green-700",
  GYM: "bg-orange-100 text-orange-700",
  CAFE: "bg-amber-100 text-amber-700",
  LAB: "bg-purple-100 text-purple-700",
};

const typeLabels: Record<string, string> = {
  LIBRARY: "Library",
  COWORKING: "Coworking",
  GYM: "Gym",
  CAFE: "Cafe",
  LAB: "Lab",
};

export default function VenueCard({
  id,
  name,
  university,
  type,
  description,
  location,
  capacity,
  pricePerHour,
  operatingHours,
  available,
}: VenueCardProps) {
  return (
    <Link
      href={`/facilities/${id}`}
      className="block rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden bg-white"
    >
      {/* Image placeholder */}
      <div className="relative h-36 bg-gradient-to-br from-emerald-400 to-teal-600">
        <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeColors[type] ?? "bg-gray-100 text-gray-700"}`}>
          {typeLabels[type] ?? type}
        </span>
        {!available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="rounded-full bg-gray-900/80 px-3 py-1 text-sm font-medium text-white">
              Unavailable
            </span>
          </div>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-600">
          Request-based
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{name}</h3>

        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="flex flex-col gap-1.5 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {university}{location ? ` · ${location}` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0" />
            Capacity: {capacity}
          </span>
          {operatingHours && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {operatingHours}
            </span>
          )}
        </div>

        <div className="pt-1">
          <span className={`text-sm font-semibold ${pricePerHour === 0 ? "text-green-600" : "text-gray-900"}`}>
            {pricePerHour === 0 ? "Free" : `฿${pricePerHour}/hr`}
          </span>
        </div>
      </div>
    </Link>
  );
}
