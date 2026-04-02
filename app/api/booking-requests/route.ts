import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { facilityId, eventTitle, eventDescription, proposedDate, startTime, endTime, expectedAttendance, purpose } = body as Record<string, string>;

  if (!facilityId || !eventTitle || !proposedDate || !startTime || !endTime) {
    return NextResponse.json({ error: "facilityId, eventTitle, proposedDate, startTime, and endTime are required" }, { status: 400 });
  }

  if (eventTitle.length > 120) {
    return NextResponse.json({ error: "Event title must be 120 characters or less" }, { status: 400 });
  }

  const date = new Date(proposedDate);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }
  if (date <= new Date()) {
    return NextResponse.json({ error: "Proposed date must be in the future" }, { status: 400 });
  }

  if (startTime >= endTime) {
    return NextResponse.json({ error: "Start time must be before end time" }, { status: 400 });
  }

  const attendance = parseInt(String(expectedAttendance));
  if (!attendance || attendance <= 0) {
    return NextResponse.json({ error: "Expected attendance must be a positive number" }, { status: 400 });
  }

  const facility = await prisma.facility.findUnique({ where: { id: facilityId } });
  if (!facility || !facility.available) {
    return NextResponse.json({ error: "Facility not found or unavailable" }, { status: 404 });
  }

  if (attendance > facility.capacity) {
    return NextResponse.json({ error: `Expected attendance exceeds facility capacity (${facility.capacity})` }, { status: 400 });
  }

  const bookingRequest = await prisma.bookingRequest.create({
    data: {
      eventTitle,
      eventDescription: eventDescription || null,
      proposedDate: date,
      startTime,
      endTime,
      expectedAttendance: attendance,
      purpose: purpose || null,
      status: "OPEN",
      userId,
      facilityId,
    },
  });

  return NextResponse.json(bookingRequest, { status: 201 });
}
