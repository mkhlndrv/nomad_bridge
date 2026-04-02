import Link from "next/link";
import { Plus, MapPin, Calendar, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TrustScoreBadge } from "@/app/_components/TrustScoreBadge";
import { formatDateBangkok } from "@/lib/utils";

export const metadata = { title: "Events — NomadBridge" };

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; tab?: string }>;
}) {
  const sp = await searchParams;
  const tab = sp.tab === "community" ? "community" : "all";
  const type = sp.type;

  const where = {
    date: { gte: new Date() },
    ...(tab === "community" ? { isCommunity: true } : {}),
    ...(type ? { eventType: type } : {}),
  };

  const events = await prisma.event.findMany({
    where,
    orderBy: { date: "asc" },
    take: 20,
    include: {
      creator: { select: { id: true, name: true, trustScore: true } },
      _count: { select: { rsvps: true } },
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Link href="/events/new" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Create Event
        </Link>
      </div>
      <div className="mb-6 flex gap-2">
        <Link href="/events" className={`rounded-full px-4 py-1.5 text-sm font-medium ${tab === "all" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>All Events</Link>
        <Link href="/events?tab=community" className={`rounded-full px-4 py-1.5 text-sm font-medium ${tab === "community" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}>Community</Link>
      </div>
      {events.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
          <p className="text-lg font-medium text-gray-600">No upcoming events</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((e) => (
            <div key={e.id} className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
              {e.isCommunity && <span className="mb-2 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{e.eventType ?? "Community"}</span>}
              <h2 className="text-base font-semibold text-gray-900">{e.title}</h2>
              {e.description && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{e.description}</p>}
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateBangkok(new Date(e.date))}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{e.rsvpCount}/{e.capacity}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <span className="font-medium text-gray-700">{e.creator.name}</span>
                <TrustScoreBadge score={e.creator.trustScore} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
