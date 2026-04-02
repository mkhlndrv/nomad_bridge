import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const recording = await prisma.recording.findUnique({
    where: { id },
    include: {
      event: { select: { id: true, title: true, date: true, venue: true } },
      uploader: { select: { id: true, name: true } },
      _count: { select: { notes: true } },
    },
  });

  if (!recording) {
    return NextResponse.json({ error: "Recording not found" }, { status: 404 });
  }

  // Increment view count
  await prisma.recording.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  return NextResponse.json(recording);
}
