import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

const TRUST_SCORE_MIN = 10;
const VALID_EVENT_TYPES = ["MEETUP", "WORKSHOP", "SKILL_SHARE", "SOCIAL", "COWORKING_SESSION"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = 12;

  const where = {
    isCommunity: true,
    date: { gte: new Date() },
    ...(type && VALID_EVENT_TYPES.includes(type) ? { eventType: type } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {}),
  };

  const [events, totalCount] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { date: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        creator: { select: { id: true, name: true, trustScore: true } },
        _count: { select: { rsvps: true } },
      },
    }),
    prisma.event.count({ where }),
  ]);

  return NextResponse.json({
    events,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  });
}

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Trust gate
  if (user.trustScore < TRUST_SCORE_MIN) {
    return NextResponse.json(
      { error: `You need a trust score of at least ${TRUST_SCORE_MIN} to create community events. Current: ${user.trustScore}` },
      { status: 403 }
    );
  }

  const body = await request.json();
  const title = (body.title ?? "").trim();
  const description = (body.description ?? "").trim();
  const venue = (body.venue ?? "").trim();
  const date = body.date;
  const capacity = parseInt(body.capacity, 10);
  const eventType = body.eventType;
  const tags = (body.tags ?? "").trim();

  if (!title || title.length > 200) {
    return NextResponse.json({ error: "Title is required (max 200 chars)" }, { status: 400 });
  }
  if (!venue) {
    return NextResponse.json({ error: "Venue is required" }, { status: 400 });
  }
  if (!date || isNaN(new Date(date).getTime())) {
    return NextResponse.json({ error: "Valid date is required" }, { status: 400 });
  }
  if (new Date(date) <= new Date()) {
    return NextResponse.json({ error: "Event date must be in the future" }, { status: 400 });
  }
  if (!capacity || capacity < 2 || capacity > 500) {
    return NextResponse.json({ error: "Capacity must be between 2 and 500" }, { status: 400 });
  }
  if (!VALID_EVENT_TYPES.includes(eventType)) {
    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description: description || null,
      venue,
      date: new Date(date),
      capacity,
      university: "Community",
      category: "SOCIAL",
      tags: tags || null,
      isCommunity: true,
      eventType,
      creatorId: userId,
    },
    include: {
      creator: { select: { id: true, name: true, trustScore: true } },
    },
  });

  return NextResponse.json(event, { status: 201 });
}
