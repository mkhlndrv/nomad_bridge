import Link from "next/link";
import { Calendar, MapPin, Monitor, Laptop, DollarSign } from "lucide-react";
import { parseTags } from "@/lib/utils";
import CollaborationTypeBadge from "./CollaborationTypeBadge";
import CollaborationStatusBadge from "./CollaborationStatusBadge";

export interface CollaborationCardProps {
  id: string;
  title: string;
  description?: string | null;
  collaborationType: string;
  format?: string | null;
  compensation?: string | null;
  tags?: string | null;
  status: string;
  preferredDateRange?: string | null;
  userName: string;
  userRole: string;
}

const formatConfig: Record<string, { icon: typeof MapPin; label: string }> = {
  IN_PERSON: { icon: MapPin, label: "In Person" },
  ONLINE: { icon: Monitor, label: "Online" },
  HYBRID: { icon: Laptop, label: "Hybrid" },
};

const compensationLabels: Record<string, string> = {
  PAID: "Paid",
  FREE: "Free",
  FACILITY_ACCESS: "Facility Access",
};

export default function CollaborationCard({
  id,
  title,
  description,
  collaborationType,
  format,
  compensation,
  tags,
  status,
  preferredDateRange,
  userName,
  userRole,
}: CollaborationCardProps) {
  const tagList = parseTags(tags ?? "");
  const fmt = format ? formatConfig[format] : null;
  const FormatIcon = fmt?.icon ?? MapPin;

  return (
    <Link
      href={`/collaborations/${id}`}
      className="block rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <CollaborationTypeBadge type={collaborationType} />
        <CollaborationStatusBadge status={status} />
      </div>

      <h3 className="text-base font-semibold text-gray-900 line-clamp-1 mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
      )}

      <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="font-medium text-gray-700">{userName}</span>
          <span className="text-gray-400">·</span>
          <span>{userRole === "UNIVERSITY" ? "University" : "Nomad"}</span>
        </span>

        {format && (
          <span className="inline-flex items-center gap-1.5">
            <FormatIcon className="h-3.5 w-3.5 shrink-0" />
            {fmt?.label ?? format}
          </span>
        )}

        {compensation && (
          <span className="inline-flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 shrink-0" />
            {compensationLabels[compensation] ?? compensation}
          </span>
        )}

        {preferredDateRange && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {preferredDateRange}
          </span>
        )}
      </div>

      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tagList.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {tag}
            </span>
          ))}
          {tagList.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
              +{tagList.length - 3} more
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
