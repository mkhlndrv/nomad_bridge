import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/profile/[id] — Public profile (email excluded)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const [eventsAttended, collaborationsCreated, bookingsMade, forumPosts] =
    await Promise.all([
      prisma.eventRsvp.count({ where: { userId: id } }),
      prisma.collaborationOpportunity.count({ where: { userId: id } }),
      prisma.bookingRequest.count({ where: { userId: id } }),
      prisma.forumPost.count({ where: { userId: id } }),
    ]);

  // Exclude email from public profile
  const { email: _email, ...publicProfile } = user;

  return NextResponse.json({
    ...publicProfile,
    activityCounts: {
      eventsAttended,
      lecturesGiven: collaborationsCreated,
      bookingsMade,
      forumPosts,
    },
  });
}
