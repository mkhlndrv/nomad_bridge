import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await params;
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event) throw { code: 404, message: "Event not found" };
      if (event.status === "CANCELLED") throw { code: 400, message: "Event is cancelled" };
      if (new Date(event.date) < new Date()) throw { code: 400, message: "Cannot RSVP to past events" };

      // Check duplicate
      const existing = await tx.eventRsvp.findFirst({
        where: { userId, eventId },
      });
      if (existing) throw { code: 409, message: "Already RSVP'd to this event" };

      const isFull = event.rsvpCount >= event.capacity;

      if (isFull) {
        // Waitlist
        const rsvp = await tx.eventRsvp.create({
          data: {
            userId,
            eventId,
            isWaitlisted: true,
          },
        });
        const waitlistPos = await tx.eventRsvp.count({
          where: { eventId, isWaitlisted: true },
        });
        return { rsvp, status: "waitlisted" as const, waitlistPosition: waitlistPos };
      } else {
        // Confirmed
        const rsvp = await tx.eventRsvp.create({
          data: { userId, eventId, isWaitlisted: false },
        });
        await tx.event.update({
          where: { id: eventId },
          data: { rsvpCount: { increment: 1 } },
        });
        return { rsvp, status: "confirmed" as const };
      }
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/events/[id]/rsvp error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await params;
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event) throw { code: 404, message: "Event not found" };

      const rsvp = await tx.eventRsvp.findFirst({ where: { userId, eventId } });
      if (!rsvp) throw { code: 404, message: "No RSVP found for this event" };

      await tx.eventRsvp.delete({ where: { id: rsvp.id } });

      let promoted: { userId: string } | undefined;

      if (!rsvp.isWaitlisted) {
        // Was confirmed — decrement count
        await tx.event.update({
          where: { id: eventId },
          data: { rsvpCount: Math.max(0, event.rsvpCount - 1) },
        });

        // Promote next waitlisted
        const nextWaitlisted = await tx.eventRsvp.findFirst({
          where: { eventId, isWaitlisted: true },
          orderBy: { createdAt: "asc" },
        });

        if (nextWaitlisted) {
          await tx.eventRsvp.update({
            where: { id: nextWaitlisted.id },
            data: { isWaitlisted: false },
          });
          await tx.event.update({
            where: { id: eventId },
            data: { rsvpCount: { increment: 1 } },
          });
          promoted = { userId: nextWaitlisted.userId };
        }
      }

      return { message: "RSVP cancelled", promoted };
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("DELETE /api/events/[id]/rsvp error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
