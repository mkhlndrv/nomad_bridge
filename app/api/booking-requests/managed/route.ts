import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (user?.role !== "VENUE_MANAGER") {
    return NextResponse.json({ error: "Forbidden: VENUE_MANAGER role required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status") || undefined;
  const facilityId = searchParams.get("facilityId") || undefined;
  const page = Math.max(parseInt(searchParams.get("page") ?? "1") || 1, 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "20") || 20, 1), 50);

  // Get manager's facility IDs
  const facilities = await prisma.facility.findMany({
    where: { managerId: userId },
    select: { id: true },
  });
  const facilityIds = facilities.map((f) => f.id);

  if (facilityIds.length === 0) {
    return NextResponse.json({ requests: [], total: 0, page, totalPages: 0 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [
    { facilityId: facilityId ? facilityId : { in: facilityIds } },
  ];

  if (statusFilter) {
    const statuses = statusFilter.split(",").map((s) => s.trim());
    conditions.push({ status: { in: statuses } });
  }

  const where = { AND: conditions };
  const skip = (page - 1) * limit;

  const [requests, total] = await Promise.all([
    prisma.bookingRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        user: { select: { id: true, name: true, trustScore: true, avatarUrl: true } },
        facility: { select: { id: true, name: true, type: true, interestThreshold: true, capacity: true } },
      },
    }),
    prisma.bookingRequest.count({ where }),
  ]);

  // Sort by status priority: UNDER_REVIEW > OPEN > APPROVED > REJECTED > CANCELLED
  const statusPriority: Record<string, number> = {
    UNDER_REVIEW: 0, OPEN: 1, APPROVED: 2, REJECTED: 3, CANCELLED: 4,
  };
  requests.sort((a, b) => (statusPriority[a.status] ?? 5) - (statusPriority[b.status] ?? 5));

  return NextResponse.json({
    requests,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
