import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/profile — Current user's profile
export async function GET(request: Request) {
  // TODO: Replace with real auth
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const [eventsAttended, collaborationsCreated, bookingsMade, forumPosts] =
    await Promise.all([
      prisma.eventRsvp.count({ where: { userId } }),
      prisma.collaborationOpportunity.count({ where: { userId } }),
      prisma.bookingRequest.count({ where: { userId } }),
      prisma.forumPost.count({ where: { userId } }),
    ]);

  return NextResponse.json({
    ...user,
    activityCounts: {
      eventsAttended,
      lecturesGiven: collaborationsCreated,
      bookingsMade,
      forumPosts,
    },
  });
}

// PATCH /api/profile — Update current user's profile
export async function PATCH(request: Request) {
  // TODO: Replace with real auth
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Only allow editable fields
  const { name, bio, skills, location } = body as {
    name?: string;
    bio?: string;
    skills?: string;
    location?: string;
  };

  const errors: Record<string, string> = {};

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.name = "Name is required";
    } else if (name.length > 100) {
      errors.name = "Name must be 100 characters or less";
    }
  }

  if (bio !== undefined && typeof bio === "string" && bio.length > 500) {
    errors.bio = "Bio must be 500 characters or less";
  }

  if (location !== undefined && typeof location === "string" && location.length > 100) {
    errors.location = "Location must be 100 characters or less";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
  }

  const updateData: Record<string, string> = {};
  if (name !== undefined) updateData.name = (name as string).trim();
  if (bio !== undefined) updateData.bio = (bio as string).trim();
  if (skills !== undefined) updateData.skills = (skills as string).trim();
  if (location !== undefined) updateData.location = (location as string).trim();

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return NextResponse.json(updated);
}
