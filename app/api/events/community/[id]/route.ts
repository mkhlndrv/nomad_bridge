import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = getUserId(request);

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true, trustScore: true } },
      rsvps: {
        include: { user: { select: { id: true, name: true, trustScore: true } } },
        orderBy: { createdAt: "asc" },
      },
      _count: { select: { rsvps: true } },
    },
  });

  if (!event || !event.isCommunity) {
    return NextResponse.json({ error: "Community event not found" }, { status: 404 });
  }

  const isOrganizer = event.creatorId === userId;
  const userRsvp = userId ? event.rsvps.find((r) => r.userId === userId) : null;

  return NextResponse.json({
    event: {
      ...event,
      rsvps: isOrganizer ? event.rsvps : undefined,
    },
    isOrganizer,
    userRsvp: userRsvp ? { rsvped: true, checkedIn: userRsvp.checkedIn } : null,
  });
}
