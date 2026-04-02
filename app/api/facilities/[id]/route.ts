import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const facility = await prisma.facility.findUnique({
    where: { id },
    include: {
      manager: { select: { id: true, name: true, trustScore: true } },
      bookingRequests: {
        where: { status: { in: ["OPEN", "UNDER_REVIEW"] } },
        orderBy: { interestCount: "desc" },
        include: {
          user: { select: { id: true, name: true, trustScore: true } },
        },
      },
    },
  });

  if (!facility || !facility.available) {
    return NextResponse.json({ error: "Facility not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...facility,
    activeRequests: facility.bookingRequests,
    bookingRequests: undefined,
  });
}
