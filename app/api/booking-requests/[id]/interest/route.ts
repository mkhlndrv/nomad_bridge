import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingRequestId } = await params;
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const bookingRequest = await tx.bookingRequest.findUnique({
        where: { id: bookingRequestId },
        include: { facility: { select: { interestThreshold: true } } },
      });
      if (!bookingRequest) throw { code: 404, message: "Booking request not found" };

      const terminalStatuses = ["APPROVED", "REJECTED", "CANCELLED"];
      if (terminalStatuses.includes(bookingRequest.status)) {
        throw { code: 400, message: "Cannot express interest on a closed request" };
      }

      const existing = await tx.bookingInterest.findUnique({
        where: { userId_bookingRequestId: { userId, bookingRequestId } },
      });

      let interested: boolean;
      let newCount: number;

      if (existing) {
        // Remove interest
        await tx.bookingInterest.delete({ where: { id: existing.id } });
        newCount = Math.max(0, bookingRequest.interestCount - 1);
        await tx.bookingRequest.update({
          where: { id: bookingRequestId },
          data: { interestCount: newCount },
        });
        interested = false;
      } else {
        // Add interest
        await tx.bookingInterest.create({ data: { userId, bookingRequestId } });
        newCount = bookingRequest.interestCount + 1;
        await tx.bookingRequest.update({
          where: { id: bookingRequestId },
          data: { interestCount: newCount },
        });
        interested = true;
      }

      // Check threshold for auto-transition to UNDER_REVIEW
      let status = bookingRequest.status;
      if (
        interested &&
        newCount >= bookingRequest.facility.interestThreshold &&
        bookingRequest.status === "OPEN"
      ) {
        await tx.bookingRequest.update({
          where: { id: bookingRequestId },
          data: { status: "UNDER_REVIEW" },
        });
        status = "UNDER_REVIEW";
        // TODO: Notify venue manager (C.6)
      }

      return { interested, interestCount: newCount, status };
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/booking-requests/[id]/interest error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
