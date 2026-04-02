import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;
  const university = searchParams.get("university") || undefined;
  const priceMax = searchParams.get("priceMax");
  const capacityMin = searchParams.get("capacityMin");
  const search = searchParams.get("search") || undefined;
  const page = Math.max(parseInt(searchParams.get("page") ?? "1") || 1, 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "12") || 12, 1), 50);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [{ available: true }];

  if (type) conditions.push({ type });
  if (university) conditions.push({ university });
  if (priceMax !== null && priceMax !== undefined && priceMax !== "") {
    const max = parseFloat(priceMax);
    if (max === 0) {
      conditions.push({ pricePerHour: 0 });
    } else {
      conditions.push({ pricePerHour: { lte: max } });
    }
  }
  if (capacityMin) {
    conditions.push({ capacity: { gte: parseInt(capacityMin) } });
  }
  if (search) {
    conditions.push({
      OR: [
        { name: { contains: search } },
        { university: { contains: search } },
        { description: { contains: search } },
      ],
    });
  }

  const where = { AND: conditions };
  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      prisma.facility.findMany({
        where,
        orderBy: [{ university: "asc" }, { name: "asc" }],
        skip,
        take: limit,
        include: {
          manager: { select: { id: true, name: true } },
        },
      }),
      prisma.facility.count({ where }),
    ]);

    return NextResponse.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /api/facilities error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
