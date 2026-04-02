import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: recordingId } = await params;
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.recordingNote.findMany({
    where: { recordingId, userId },
    orderBy: { timestamp: "asc" },
  });

  return NextResponse.json({ notes });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: recordingId } = await params;
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recording = await prisma.recording.findUnique({ where: { id: recordingId } });
  if (!recording) {
    return NextResponse.json({ error: "Recording not found" }, { status: 404 });
  }

  const body = await request.json();
  const content = (body.content ?? "").trim();
  const timestamp = parseInt(body.timestamp ?? "0", 10);

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const note = await prisma.recordingNote.create({
    data: { content, timestamp, recordingId, userId },
  });

  return NextResponse.json(note, { status: 201 });
}
