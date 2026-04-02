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

  const reply = await prisma.forumReply.findUnique({
    where: { id: replyId },
    include: { thread: { select: { userId: true } } },
  });

  if (!reply) {
    return NextResponse.json({ error: "Reply not found" }, { status: 404 });
  }

  // Only thread author can mark best answer
  if (reply.thread.userId !== userId) {
    return NextResponse.json(
      { error: "Only the thread author can mark best answer" },
      { status: 403 }
    );
  }

  if (reply.isBestAnswer) {
    // Unmark
    await prisma.forumReply.update({
      where: { id: replyId },
      data: { isBestAnswer: false },
    });
    return NextResponse.json({ isBestAnswer: false });
  }

  // Unmark any existing best answer in same thread, then mark this one
  await prisma.forumReply.updateMany({
    where: { threadId: reply.threadId, isBestAnswer: true },
    data: { isBestAnswer: false },
  });

  await prisma.forumReply.update({
    where: { id: replyId },
    data: { isBestAnswer: true },
  });

  return NextResponse.json({ isBestAnswer: true });
}
