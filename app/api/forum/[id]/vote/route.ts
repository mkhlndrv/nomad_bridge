import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: threadId } = await params;
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const thread = await prisma.forumPost.findUnique({ where: { id: threadId } });
  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // Author cannot vote on their own post
  // if (thread.userId === userId) {
  //   return NextResponse.json({ error: "Cannot vote on your own post" }, { status: 403 });
  // }

  const body = await request.json();
  const direction = body.direction; // "UP" or "DOWN" or null (remove vote)

  // Find existing vote
  const existing = await prisma.forumVote.findFirst({
    where: { userId, targetType: "THREAD", threadId },
  });

  let scoreDelta = 0;

  if (direction === null || direction === "NONE") {
    // Remove vote
    if (existing) {
      await prisma.forumVote.delete({ where: { id: existing.id } });
      scoreDelta = existing.direction === "UP" ? -1 : 1;
    }
  } else if (direction === "UP" || direction === "DOWN") {
    if (existing) {
      if (existing.direction === direction) {
        // Same vote — toggle off
        await prisma.forumVote.delete({ where: { id: existing.id } });
        scoreDelta = direction === "UP" ? -1 : 1;
      } else {
        // Switch vote
        await prisma.forumVote.update({
          where: { id: existing.id },
          data: { direction },
        });
        scoreDelta = direction === "UP" ? 2 : -2;
      }
    } else {
      // New vote
      await prisma.forumVote.create({
        data: { userId, targetType: "THREAD", direction, threadId },
      });
      scoreDelta = direction === "UP" ? 1 : -1;
    }
  } else {
    return NextResponse.json({ error: "Invalid direction" }, { status: 400 });
  }

  // Update net score
  if (scoreDelta !== 0) {
    await prisma.forumPost.update({
      where: { id: threadId },
      data: { netScore: { increment: scoreDelta } },
    });
  }

  const updated = await prisma.forumPost.findUnique({
    where: { id: threadId },
    select: { netScore: true },
  });

  return NextResponse.json({ netScore: updated?.netScore ?? 0 });
}
