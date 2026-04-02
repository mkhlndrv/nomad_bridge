import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_CATEGORIES = ["ACADEMIC", "NETWORKING", "WORKSHOP", "SOCIAL", "CAREER"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const university = searchParams.get("university") || undefined;
  const category = searchParams.get("category") || undefined;
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;
  const search = searchParams.get("search") || undefined;
  const page = Math.max(parseInt(searchParams.get("page") ?? "1") || 1, 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "12") || 12, 1), 50);

  if (category && !VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` }, { status: 400 });
  }

  if (from && isNaN(Date.parse(from))) {
    return NextResponse.json({ error: "Invalid 'from' date format" }, { status: 400 });
  }
  if (to && isNaN(Date.parse(to))) {
    return NextResponse.json({ error: "Invalid 'to' date format" }, { status: 400 });
  }

  // Build where clause dynamically
  const where: Record<string, unknown> = { status: "PUBLISHED" };

  if (university) where.university = university;
  if (category) where.category = category;

  const dateFilter: Record<string, Date> = {};
  if (from) dateFilter.gte = new Date(from);
  if (to) dateFilter.lte = new Date(to);
  if (Object.keys(dateFilter).length > 0) where.date = dateFilter;

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { tags: { contains: search } },
    ];
  }

  const skip = (page - 1) * limit;

  try {
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: "asc" },
        skip,
        take: limit,
        include: {
          creator: { select: { id: true, name: true } },
        },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      events,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/events error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["title", "description", "date", "venue", "capacity", "university", "category"] as const;
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  const capacity = parseInt(String(body.capacity));
  if (!Number.isInteger(capacity) || capacity <= 0) {
    return NextResponse.json({ error: "Capacity must be greater than zero" }, { status: 400 });
  }

  const eventDate = new Date(String(body.date));
  if (isNaN(eventDate.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }
  if (eventDate < new Date()) {
    return NextResponse.json({ error: "Event date must be in the future" }, { status: 400 });
  }

  const category = String(body.category);
  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` }, { status: 400 });
  }

  // Trust score + role check
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { trustScore: true, role: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.role === "NOMAD" && user.trustScore < 10) {
    return NextResponse.json({ error: "Trust score too low to create events (minimum: 10)" }, { status: 403 });
  }

  // Max 5 active events check
  const activeCount = await prisma.event.count({
    where: {
      creatorId: userId,
      date: { gt: new Date() },
      status: { not: "CANCELLED" },
    },
  });
  if (activeCount >= 5) {
    return NextResponse.json({ error: "Maximum 5 active events allowed" }, { status: 403 });
  }

  const tags = body.tags
    ? String(body.tags).split(",").map((t: string) => t.trim()).filter(Boolean).join(",")
    : null;

  const event = await prisma.event.create({
    data: {
      title: String(body.title),
      description: String(body.description),
      date: eventDate,
      venue: String(body.venue),
      capacity,
      university: String(body.university),
      category: category as "ACADEMIC" | "NETWORKING" | "WORKSHOP" | "SOCIAL" | "CAREER",
      tags,
      creatorId: userId,
      status: "PUBLISHED",
      rsvpCount: 0,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
