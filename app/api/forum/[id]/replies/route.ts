import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

const RATE_LIMIT_MS = 30_000;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: threadId } = await params;
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const thread = await prisma.forumPost.findUnique({ where: { id: threadId } });
  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  const body = await request.json();
  const content = (body.content ?? "").trim();

  if (!content || content.length > 5000) {
    return NextResponse.json(
      { error: "Content is required and must be at most 5000 characters" },
      { status: 400 }
    );
  }

  // Rate limiting
  const thirtySecondsAgo = new Date(Date.now() - RATE_LIMIT_MS);
  const [recentPost, recentReply] = await Promise.all([
    prisma.forumPost.findFirst({
      where: { userId, createdAt: { gte: thirtySecondsAgo } },
    }),
    prisma.forumReply.findFirst({
      where: { authorId: userId, createdAt: { gte: thirtySecondsAgo } },
    }),
  ]);

  if (recentPost || recentReply) {
    return NextResponse.json(
      { error: "Please wait 30 seconds between posts" },
      { status: 429 }
    );
  }

  const reply = await prisma.forumReply.create({
    data: {
      content,
      authorId: userId,
      threadId,
    },
    include: {
      author: { select: { id: true, name: true, trustScore: true } },
    },
  });

  // Update thread's lastActivity
  await prisma.forumPost.update({
    where: { id: threadId },
    data: { lastActivity: new Date() },
  });

  return NextResponse.json(reply, { status: 201 });
}
