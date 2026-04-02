import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import EventCard from "@/components/events/EventCard";
import EventFilterBar from "@/components/events/EventFilterBar";

export const metadata = { title: "Discover Events — NomadBridge" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    take: 20,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Events</h1>
          <p className="text-sm text-gray-500 mt-1">Find workshops, meetups, and networking events at Bangkok universities</p>
        </div>
        <Link
          href="/events/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Create Event
        </Link>
      </div>

      <div className="mb-6">
        <EventFilterBar />
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-lg font-medium text-gray-600">No upcoming events</p>
          <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <EventCard
              key={e.id}
              id={e.id}
              title={e.title}
              description={e.description}
              date={e.date}
              venue={e.venue}
              university={e.university}
              category={e.category}
              imageUrl={e.imageUrl}
              tags={e.tags}
              rsvpCount={e.rsvpCount}
              capacity={e.capacity}
              status={e.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
