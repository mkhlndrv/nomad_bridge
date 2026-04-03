import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Clock, DollarSign, Shield, Wifi } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { parseTags } from "@/lib/utils";
import TrustScoreBadge from "@/components/shared/TrustScoreBadge";

export const dynamic = "force-dynamic";

const typeColors: Record<string, string> = {
  LIBRARY: "bg-blue-100 text-blue-700",
  COWORKING: "bg-green-100 text-green-700",
  GYM: "bg-orange-100 text-orange-700",
  CAFE: "bg-amber-100 text-amber-700",
  LAB: "bg-purple-100 text-purple-700",
};

const venueImages: Record<string, string> = {
  LIBRARY: "https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&w=1200&q=80",
  COWORKING: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80",
  GYM: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  CAFE: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
  LAB: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
};
const defaultImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";

const typeLabels: Record<string, string> = {
  LIBRARY: "Library", COWORKING: "Coworking", GYM: "Gym", CAFE: "Cafe", LAB: "Lab",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const f = await prisma.facility.findUnique({ where: { id }, select: { name: true } });
  if (!f) return { title: "Not Found" };
  return { title: `${f.name} — NomadBridge` };
}

export default async function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const facility = await prisma.facility.findUnique({
    where: { id },
    include: {
      manager: { select: { id: true, name: true, trustScore: true } },
      bookingRequests: {
        where: { status: { in: ["OPEN", "UNDER_REVIEW"] } },
        orderBy: { interestCount: "desc" },
        include: {
          user: { select: { id: true, name: true, trustScore: true } },
        },
      },
    },
  });

  if (!facility) notFound();

  const amenities = parseTags(facility.amenities ?? "");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/facilities" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Venues
      </Link>

      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 bg-gray-100 mb-6 shadow-sm">
        <img 
          src={venueImages[facility.type] || defaultImage} 
          alt={facility.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
        <span className={`absolute top-4 right-4 rounded-full px-3 py-1 text-sm font-semibold ${typeColors[facility.type] ?? "bg-gray-100 text-gray-700"} shadow-sm`}>
          {typeLabels[facility.type] ?? facility.type}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{facility.name}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {facility.university}{facility.location ? ` · ${facility.location}` : ""}
            </p>
          </div>

          {facility.description && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{facility.description}</p>
            </section>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Wifi className="h-4 w-4" /> Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <span key={a} className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-sm text-emerald-700">{a}</span>
                ))}
              </div>
            </section>
          )}

          {/* Rules */}
          {facility.rules && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" /> Rules
              </h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{facility.rules}</p>
            </section>
          )}

          {/* Active Requests */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Active Booking Requests</h2>
            {facility.bookingRequests.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No active requests for this venue. Be the first to request!</p>
            ) : (
              <div className="space-y-3">
                {facility.bookingRequests.map((req) => (
                  <div key={req.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{req.eventTitle}</h3>
                        {req.eventDescription && <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{req.eventDescription}</p>}
                      </div>
                      <span className={`shrink-0 ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        req.status === "UNDER_REVIEW" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                      }`}>
                        {req.status === "UNDER_REVIEW" ? "Under Review" : "Open"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>by {req.user.name}</span>
                      <TrustScoreBadge score={req.user.trustScore} />
                      <span className="font-medium text-blue-600">{req.interestCount} interested</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <Users className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div><p className="font-medium">Capacity: {facility.capacity}</p></div>
            </div>
            {facility.operatingHours && (
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <Clock className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div><p className="font-medium">{facility.operatingHours}</p></div>
              </div>
            )}
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <DollarSign className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className={`font-medium ${facility.pricePerHour === 0 ? "text-green-600" : ""}`}>
                  {facility.pricePerHour === 0 ? "Free" : `฿${facility.pricePerHour}/hr`}
                </p>
              </div>
            </div>
          </div>

          {/* Manager */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {facility.manager ? (
              <div>
                <p className="text-xs text-gray-500 mb-1">Managed by</p>
                <p className="text-sm font-medium text-gray-900">{facility.manager.name}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Contact university directly</p>
            )}
          </div>

          {/* Request CTA */}
          <Link
            href={`/facilities/${id}/request`}
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Request This Venue
          </Link>
        </div>
      </div>
    </main>
  );
}
