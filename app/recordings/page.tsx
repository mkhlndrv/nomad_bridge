import Link from "next/link";
import { Play, Eye, Calendar, StickyNote } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateBangkok } from "@/lib/utils";

export const metadata = { title: "Recordings — NomadBridge" };

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function RecordingsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim();
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const pageSize = 12;

  const where = {
    visibility: "PUBLIC" as const,
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { event: { title: { contains: search } } },
          ],
        }
      : {}),
  };

  const [recordings, totalCount] = await Promise.all([
    prisma.recording.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        event: { select: { id: true, title: true, date: true } },
        uploader: { select: { id: true, name: true } },
        _count: { select: { notes: true } },
      },
    }),
    prisma.recording.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recording Library</h1>
        <p className="mt-1 text-sm text-gray-500">Watch recordings from past events</p>
      </div>

      {recordings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
          <p className="text-lg font-medium text-gray-600">No recordings yet</p>
          <p className="mt-1 text-sm text-gray-400">Recordings from events will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recordings.map((rec) => (
            <Link key={rec.id} href={`/recordings/${rec.id}`} className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-36 overflow-hidden bg-gray-900 flex items-center justify-center">
                <img 
                  src={[
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1475721028070-128a3064e622?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80"
                  ][rec.id.charCodeAt(0) % 3]} 
                  alt="Video Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />
                <Play className="relative z-10 h-10 w-10 text-white/90 group-hover:text-white transition-colors" />
                {rec.duration > 0 && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white z-10">
                    {formatDuration(rec.duration)}
                  </span>
                )}
                <span className="absolute top-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] uppercase text-white/80 z-10">
                  {rec.sourceType}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">{rec.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{rec.event.title}</p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="inline-flex items-center gap-0.5"><Calendar className="h-3 w-3" />{formatDateBangkok(new Date(rec.event.date))}</span>
                  <span className="inline-flex items-center gap-0.5"><Eye className="h-3 w-3" />{rec.viewCount}</span>
                  <span className="inline-flex items-center gap-0.5"><StickyNote className="h-3 w-3" />{rec._count.notes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link href={`/recordings?${new URLSearchParams({ ...(search ? { search } : {}), page: String(page - 1) }).toString()}`}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Previous</Link>
          )}
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/recordings?${new URLSearchParams({ ...(search ? { search } : {}), page: String(page + 1) }).toString()}`}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Next</Link>
          )}
        </div>
      )}
    </div>
  );
}
