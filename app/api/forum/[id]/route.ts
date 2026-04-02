import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";

const REPLIES_PAGE_SIZE = 20;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = getUserId(request);

  const thread = await prisma.forumPost.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, trustScore: true } },
      _count: { select: { replies: true } },
    },
  });

  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const replies = await prisma.forumReply.findMany({
    where: { threadId: id },
    orderBy: [{ isBestAnswer: "desc" }, { createdAt: "asc" }],
    skip: (page - 1) * REPLIES_PAGE_SIZE,
    take: REPLIES_PAGE_SIZE,
    include: {
      author: { select: { id: true, name: true, trustScore: true } },
    },
  });

  // Mask deleted replies
  const maskedReplies = replies.map((r) =>
    r.isDeleted ? { ...r, content: "[removed]" } : r
  );

  // Get user vote/bookmark status if authenticated
  let userVote: string | null = null;
  let isBookmarked = false;
  let replyVotes: Record<string, string> = {};

  if (userId) {
    const [threadVote, bookmark, votes] = await Promise.all([
      prisma.forumVote.findFirst({
        where: { userId, targetType: "THREAD", threadId: id },
      }),
      prisma.forumBookmark.findFirst({
        where: { userId, threadId: id },
      }),
      prisma.forumVote.findMany({
        where: {
          userId,
          targetType: "REPLY",
          replyId: { in: replies.map((r) => r.id) },
        },
      }),
    ]);

    userVote = threadVote?.direction ?? null;
    isBookmarked = !!bookmark;
    replyVotes = Object.fromEntries(
      votes.map((v) => [v.replyId, v.direction])
    );
  }

  const totalReplies = thread._count.replies;

  return NextResponse.json({
    thread: {
      ...thread,
      content: thread.isDeleted ? "[removed]" : thread.content,
      userVote,
      isBookmarked,
    },
    replies: maskedReplies.map((r) => ({
      ...r,
      userVote: replyVotes[r.id] ?? null,
    })),
    pagination: {
      totalReplies,
      page,
      pageSize: REPLIES_PAGE_SIZE,
      totalPages: Math.ceil(totalReplies / REPLIES_PAGE_SIZE),
    },
  });
}
