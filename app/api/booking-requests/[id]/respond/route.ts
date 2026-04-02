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

  let body: { action?: string; rejectionReason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = body.action?.toUpperCase();
  if (action !== "APPROVE" && action !== "REJECT") {
    return NextResponse.json({ error: "action must be APPROVE or REJECT" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const bookingRequest = await tx.bookingRequest.findUnique({
        where: { id: bookingRequestId },
        include: { facility: { select: { managerId: true } } },
      });
      if (!bookingRequest) throw { code: 404, message: "Booking request not found" };

      // Only venue manager can respond
      if (bookingRequest.facility.managerId !== userId) {
        throw { code: 403, message: "Only the venue manager can approve or reject requests" };
      }

      if (bookingRequest.status !== "OPEN" && bookingRequest.status !== "UNDER_REVIEW") {
        throw { code: 400, message: "Request is not in a reviewable state" };
      }

      if (action === "APPROVE") {
        const updated = await tx.bookingRequest.update({
          where: { id: bookingRequestId },
          data: { status: "APPROVED" },
        });
        // TODO: Notify requester about approval (C.6)
        return updated;
      } else {
        const updated = await tx.bookingRequest.update({
          where: { id: bookingRequestId },
          data: {
            status: "REJECTED",
            rejectionReason: body.rejectionReason?.trim().slice(0, 500) || null,
          },
        });
        // TODO: Notify requester about rejection (C.6)
        return updated;
      }
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/booking-requests/[id]/respond error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
