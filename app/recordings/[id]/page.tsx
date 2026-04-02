import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Eye, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateBangkok } from "@/lib/utils";
import { RecordingNotes } from "./_components/RecordingNotes";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rec = await prisma.recording.findUnique({ where: { id }, select: { title: true } });
  return { title: rec ? `${rec.title} — NomadBridge` : "Recording Not Found" };
}

export default async function RecordingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recording = await prisma.recording.findUnique({
    where: { id },
    include: {
      event: { select: { id: true, title: true, date: true, venue: true } },
      uploader: { select: { id: true, name: true } },
      _count: { select: { notes: true } },
    },
  });

  if (!recording) notFound();

  // Increment view count
  await prisma.recording.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  const highlights: Array<{ time: number; label: string }> = recording.highlights
    ? (() => { try { return JSON.parse(recording.highlights); } catch { return []; } })()
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/recordings" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" /> Back to Library
      </Link>

      <h1 className="mb-4 text-xl font-bold text-gray-900">{recording.title}</h1>

      {/* Player placeholder */}
      <div className="mb-6 overflow-hidden rounded-lg bg-gray-900">
        <div className="flex aspect-video items-center justify-center">
          {recording.sourceType === "YOUTUBE" ? (
            <iframe
              className="h-full w-full"
              src={recording.sourceUrl.replace("watch?v=", "embed/")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center text-white/70">
              <p className="text-lg font-medium">Video Player</p>
              <p className="mt-1 text-sm">{recording.sourceUrl}</p>
              {recording.duration > 0 && (
                <p className="mt-2 text-xs text-white/50">Duration: {formatDuration(recording.duration)}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDateBangkok(new Date(recording.event.date))}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {recording.event.venue}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            {recording.viewCount} views
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {recording.uploader.name}
          </span>
        </div>
        <div className="mt-2">
          <Link href={`/events`} className="text-sm text-blue-600 hover:text-blue-700">
            Event: {recording.event.title}
          </Link>
        </div>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {recording.sourceType}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {recording.visibility}
          </span>
        </div>
      </div>

      {/* Transcript */}
      {recording.transcript && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Transcript</h2>
          <div className="max-h-60 overflow-y-auto whitespace-pre-wrap text-sm text-gray-600">
            {recording.transcript}
          </div>
        </div>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-700">Highlights</h2>
          <div className="space-y-1">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-mono text-blue-600">
                  {formatDuration(h.time)}
                </span>
                <span className="text-gray-700">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <RecordingNotes recordingId={recording.id} userId="user-alice" />
    </div>
  );
}
