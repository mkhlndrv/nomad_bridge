import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

const PAGE_SIZE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const eventId = searchParams.get("eventId");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const where = {
    visibility: "PUBLIC" as const,
    ...(eventId ? { eventId } : {}),
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
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        event: { select: { id: true, title: true, date: true } },
        uploader: { select: { id: true, name: true } },
        _count: { select: { notes: true } },
      },
    }),
    prisma.recording.count({ where }),
  ]);

  return NextResponse.json({
    recordings,
    totalCount,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  });
}

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = (body.title ?? "").trim();
  const sourceUrl = (body.sourceUrl ?? "").trim();
  const sourceType = body.sourceType ?? "UPLOAD";
  const eventId = body.eventId;
  const visibility = body.visibility ?? "PUBLIC";
  const duration = parseInt(body.duration ?? "0", 10);

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!sourceUrl) {
    return NextResponse.json({ error: "Source URL is required" }, { status: 400 });
  }
  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const recording = await prisma.recording.create({
    data: {
      title,
      sourceUrl,
      sourceType,
      eventId,
      uploaderId: userId,
      visibility,
      duration,
    },
    include: {
      event: { select: { id: true, title: true } },
      uploader: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(recording, { status: 201 });
}
