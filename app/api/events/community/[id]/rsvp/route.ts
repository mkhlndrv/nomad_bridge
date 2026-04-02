import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await params;
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || !event.isCommunity) {
    return NextResponse.json({ error: "Community event not found" }, { status: 404 });
  }

  const existing = await prisma.eventRsvp.findFirst({
    where: { userId, eventId },
  });

  if (existing) {
    // Cancel RSVP
    await prisma.eventRsvp.delete({ where: { id: existing.id } });
    await prisma.event.update({
      where: { id: eventId },
      data: { rsvpCount: { decrement: 1 } },
    });
    return NextResponse.json({ rsvped: false });
  }

  // Check capacity
  if (event.rsvpCount >= event.capacity) {
    return NextResponse.json({ error: "Event is full" }, { status: 409 });
  }

  await prisma.eventRsvp.create({ data: { userId, eventId } });
  await prisma.event.update({
    where: { id: eventId },
    data: { rsvpCount: { increment: 1 } },
  });

  return NextResponse.json({ rsvped: true });
}
