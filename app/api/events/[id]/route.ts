import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = request.headers.get("x-user-id");

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true, role: true } },
      photos: { orderBy: { createdAt: "desc" } },
      materials: true,
      rsvps: {
        select: { id: true, userId: true, isWaitlisted: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const isPast = new Date(event.date) < new Date();

  // Compute current user's RSVP status
  let isRsvped = false;
  let userRsvpStatus: "CONFIRMED" | "WAITLISTED" | null = null;
  let waitlistPosition: number | null = null;

  if (userId) {
    const userRsvp = event.rsvps.find((r) => r.userId === userId);
    if (userRsvp) {
      isRsvped = true;
      userRsvpStatus = userRsvp.isWaitlisted ? "WAITLISTED" : "CONFIRMED";
      if (userRsvp.isWaitlisted) {
        const waitlistedRsvps = event.rsvps.filter((r) => r.isWaitlisted);
        waitlistPosition = waitlistedRsvps.findIndex((r) => r.userId === userId) + 1;
      }
    }
  }

  // Only include materials for past events
  const materials = isPast ? event.materials : [];

  // Strip individual RSVP details from response
  const { rsvps: _rsvps, ...eventData } = event;

  return NextResponse.json({
    ...eventData,
    materials,
    isRsvped,
    userRsvpStatus,
    waitlistPosition,
    rsvpTotal: event.rsvps.length,
  });
}
