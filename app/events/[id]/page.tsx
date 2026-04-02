import { notFound } from "next/navigation";
import { Calendar, MapPin, GraduationCap, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateBangkok, formatTimeBangkok, parseTags } from "@/lib/utils";
import CapacityBar from "@/components/shared/CapacityBar";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, select: { title: true, description: true } });
  if (!event) return { title: "Event Not Found" };
  return { title: `${event.title} — NomadBridge`, description: event.description ?? undefined };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true, role: true } },
      photos: { orderBy: { createdAt: "desc" } },
      materials: true,
    },
  });

  if (!event) notFound();

  const isPast = new Date(event.date) < new Date();
  const tags = parseTags(event.tags ?? "");

  const categoryLabels: Record<string, string> = {
    ACADEMIC: "Academic",
    NETWORKING: "Networking",
    WORKSHOP: "Workshop",
    SOCIAL: "Social",
    CAREER: "Career",
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden h-48 sm:h-64 bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
        {isPast && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="rounded-full bg-gray-900/80 px-4 py-1.5 text-base font-semibold text-white">
              Past Event
            </span>
          </div>
        )}
        <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800">
          {categoryLabels[event.category] ?? event.category}
        </span>
      </div>

      {/* Title + Creator */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Organized by <a href={`/profile/${event.creator.id}`} className="text-blue-600 hover:underline font-medium">{event.creator.name}</a>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {event.description && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
            </section>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm text-blue-700">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Photos */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Photos</h2>
            {event.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {event.photos.map((photo) => (
                  <div key={photo.id} className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
                    <img src={photo.url} alt="Event photo" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No photos yet</p>
            )}
          </section>

          {/* Materials (past events only) */}
          {isPast && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Materials</h2>
              {event.materials.length > 0 ? (
                <ul className="space-y-2">
                  {event.materials.map((mat) => (
                    <li key={mat.id}>
                      <a
                        href={mat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
                      >
                        {mat.title}
                        <span className="text-xs text-gray-400">({mat.fileType})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">No materials available</p>
              )}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Event info card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <Calendar className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{formatDateBangkok(new Date(event.date))}</p>
                <p className="text-gray-500">{formatTimeBangkok(new Date(event.date))} (Bangkok)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{event.venue}</p>
                <p className="text-xs text-gray-400 mt-0.5">Map coming soon</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <GraduationCap className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <p className="font-medium">{event.university}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <CapacityBar rsvpCount={event.rsvpCount} capacity={event.capacity} size="lg" />
          </div>

          {/* RSVP placeholder */}
          {!isPast && (
            <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-5 text-center">
              <p className="text-sm text-blue-700 font-medium">RSVP button coming in Sprint 3</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
