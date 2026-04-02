import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: replyId } = await params;
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reply = await prisma.forumReply.findUnique({ where: { id: replyId } });
  if (!reply) {
    return NextResponse.json({ error: "Reply not found" }, { status: 404 });
  }

  if (reply.authorId === userId) {
    return NextResponse.json({ error: "Cannot vote on your own reply" }, { status: 403 });
  }

  const body = await request.json();
  const direction = body.direction;

  const existing = await prisma.forumVote.findFirst({
    where: { userId, targetType: "REPLY", replyId },
  });

  let scoreDelta = 0;

  if (direction === null || direction === "NONE") {
    if (existing) {
      await prisma.forumVote.delete({ where: { id: existing.id } });
      scoreDelta = existing.direction === "UP" ? -1 : 1;
    }
  } else if (direction === "UP" || direction === "DOWN") {
    if (existing) {
      if (existing.direction === direction) {
        await prisma.forumVote.delete({ where: { id: existing.id } });
        scoreDelta = direction === "UP" ? -1 : 1;
      } else {
        await prisma.forumVote.update({
          where: { id: existing.id },
          data: { direction },
        });
        scoreDelta = direction === "UP" ? 2 : -2;
      }
    } else {
      await prisma.forumVote.create({
        data: { userId, targetType: "REPLY", direction, replyId },
      });
      scoreDelta = direction === "UP" ? 1 : -1;
    }
  } else {
    return NextResponse.json({ error: "Invalid direction" }, { status: 400 });
  }

  if (scoreDelta !== 0) {
    await prisma.forumReply.update({
      where: { id: replyId },
      data: { netScore: { increment: scoreDelta } },
    });
  }

  const updated = await prisma.forumReply.findUnique({
    where: { id: replyId },
    select: { netScore: true },
  });

  return NextResponse.json({ netScore: updated?.netScore ?? 0 });
}
