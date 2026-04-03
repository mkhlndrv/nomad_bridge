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

const venueImages: Record<string, string> = {
  LIBRARY: "https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&w=800&q=80",
  COWORKING: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
  GYM: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  CAFE: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  LAB: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
};
const defaultImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";

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
      <div className="relative h-40 bg-gray-100">
        <img
          src={venueImages[type] || defaultImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
        <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeColors[type] ?? "bg-gray-100 text-gray-700"}`}>
          {typeLabels[type] ?? type}
        </span>
        {!available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="rounded-full bg-gray-900/90 px-3 py-1 text-sm font-medium text-white border border-gray-700/50">
              Unavailable
            </span>
          </div>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-2 py-0.5 text-xs font-medium text-gray-700 shadow-sm">
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
