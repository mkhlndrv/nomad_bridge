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

  // Only organizer can check people in
  if (event.creatorId !== userId) {
    // Or the user is checking themselves in
    const body = await request.json();
    const targetUserId = body.userId ?? userId;

    if (targetUserId !== userId) {
      return NextResponse.json({ error: "Only the organizer can check in others" }, { status: 403 });
    }

    const rsvp = await prisma.eventRsvp.findFirst({
      where: { userId: targetUserId, eventId },
    });

    if (!rsvp) {
      return NextResponse.json({ error: "Not RSVPed to this event" }, { status: 400 });
    }

    await prisma.eventRsvp.update({
      where: { id: rsvp.id },
      data: { checkedIn: true },
    });

    return NextResponse.json({ checkedIn: true });
  }

  // Organizer checking in a user
  const body = await request.json();
  const targetUserId = body.userId;

  if (!targetUserId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const rsvp = await prisma.eventRsvp.findFirst({
    where: { userId: targetUserId, eventId },
  });

  if (!rsvp) {
    return NextResponse.json({ error: "User not RSVPed to this event" }, { status: 400 });
  }

  await prisma.eventRsvp.update({
    where: { id: rsvp.id },
    data: { checkedIn: !rsvp.checkedIn },
  });

  return NextResponse.json({ checkedIn: !rsvp.checkedIn });
}
