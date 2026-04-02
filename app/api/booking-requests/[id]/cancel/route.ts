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
      const req = await tx.bookingRequest.findUnique({
        where: { id: bookingRequestId },
      });
      if (!req) throw { code: 404, message: "Booking request not found" };

      if (req.userId !== userId) {
        throw { code: 403, message: "Only the requester can cancel this request" };
      }

      if (req.status === "CANCELLED" || req.status === "REJECTED") {
        throw { code: 400, message: "Request is already cancelled or rejected" };
      }

      let trustPenalty = 0;

      if (req.status === "APPROVED") {
        trustPenalty = -2;
        await tx.user.update({
          where: { id: userId },
          data: { trustScore: { decrement: 2 } },
        });
      }

      await tx.bookingRequest.update({
        where: { id: bookingRequestId },
        data: { status: "CANCELLED" },
      });

      // TODO: Notify venue manager about cancellation (C.6)

      return { status: "CANCELLED", trustPenalty };
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/booking-requests/[id]/cancel error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
