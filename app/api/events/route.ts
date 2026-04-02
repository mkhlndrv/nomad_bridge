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
