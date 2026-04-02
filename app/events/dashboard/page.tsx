import Link from "next/link";
import { Calendar, Users, CheckCircle, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateBangkok } from "@/lib/utils";

const MOCK_USER_ID = "user-bob";

export const metadata = { title: "Organizer Dashboard — NomadBridge" };

export default async function OrganizerDashboardPage() {
  const events = await prisma.event.findMany({
    where: { creatorId: MOCK_USER_ID, isCommunity: true },
    orderBy: { date: "desc" },
    include: {
      rsvps: {
        include: { user: { select: { id: true, name: true } } },
      },
      _count: { select: { rsvps: true } },
    },
  });

  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  const past = events.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
        <Link href="/events/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + New Event
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{events.length}</p>
          <p className="text-sm text-gray-500">Total Events</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{upcoming.length}</p>
          <p className="text-sm text-gray-500">Upcoming</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">
            {events.reduce((sum, e) => sum + e._count.rsvps, 0)}
          </p>
          <p className="text-sm text-gray-500">Total RSVPs</p>
        </div>
      </div>

      {upcoming.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <div className="space-y-3">
            {upcoming.map((event) => {
              const checkedInCount = event.rsvps.filter((r) => r.checkedIn).length;
              return (
                <div key={event.id} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateBangkok(new Date(event.date))}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{event.venue}</span>
                        <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{event._count.rsvps}/{event.capacity} RSVPs</span>
                        <span className="inline-flex items-center gap-1"><CheckCircle className="h-3 w-3" />{checkedInCount} checked in</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{event.eventType}</span>
                  </div>

                  {event.rsvps.length > 0 && (
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <p className="mb-2 text-xs font-semibold text-gray-600">Attendees:</p>
                      <div className="flex flex-wrap gap-2">
                        {event.rsvps.map((rsvp) => (
                          <span key={rsvp.id} className={`rounded-full px-2 py-0.5 text-xs ${rsvp.checkedIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {rsvp.user.name} {rsvp.checkedIn ? "✓" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Past Events</h2>
          <div className="space-y-2">
            {past.map((event) => (
              <div key={event.id} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{event.title}</span>
                  <span className="text-xs text-gray-400">{formatDateBangkok(new Date(event.date))}</span>
                </div>
                <p className="text-xs text-gray-500">{event._count.rsvps} attendees</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
          <p className="text-lg font-medium text-gray-600">No events yet</p>
          <p className="mt-1 text-sm text-gray-400">Create your first community event to get started!</p>
        </div>
      )}
    </div>
  );
}
