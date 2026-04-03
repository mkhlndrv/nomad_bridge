import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ThreadPost } from "../_components/ThreadPost";
import { ReplyItem } from "../_components/ReplyItem";
import { ReplyForm } from "../_components/ReplyForm";
import { VoteButtons } from "../_components/VoteButtons";

const REPLIES_PAGE_SIZE = 20;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thread = await prisma.forumPost.findUnique({
    where: { id },
    select: { title: true },
  });
  return { title: thread ? `${thread.title} — NomadBridge` : "Thread Not Found" };
}

export default async function ThreadDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const userId = "user-alice";

  const thread = await prisma.forumPost.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, trustScore: true } },
      _count: { select: { replies: true } },
      votes: {
        where: { userId },
        select: { direction: true },
      },
    },
  });

  if (!thread) notFound();

  const replies = await prisma.forumReply.findMany({
    where: { threadId: id },
    orderBy: [{ isBestAnswer: "desc" }, { createdAt: "asc" }],
    skip: (page - 1) * REPLIES_PAGE_SIZE,
    take: REPLIES_PAGE_SIZE,
    include: {
      author: { select: { id: true, name: true, trustScore: true } },
      votes: {
        where: { userId },
        select: { direction: true },
      },
    },
  });

  const totalReplies = thread._count.replies;
  const totalPages = Math.ceil(totalReplies / REPLIES_PAGE_SIZE);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/forum"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Forum
      </Link>

      <h1 className="mb-4 text-xl font-bold text-gray-900">{thread.title}</h1>

      <ThreadPost
        thread={{
          ...thread,
          createdAt: thread.createdAt.toISOString(),
        }}
        voteButtons={
          <VoteButtons
            targetType="THREAD"
            targetId={thread.id}
            initialScore={thread.netScore}
            initialVote={thread.votes[0]?.direction ?? null}
            userId={userId}
          />
        }
      />

      {/* Replies */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-gray-600">
          {totalReplies} {totalReplies === 1 ? "Reply" : "Replies"}
        </h2>

        <div className="space-y-3">
          {replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={{
                ...reply,
                content: reply.isDeleted ? "[removed]" : reply.content,
                createdAt: reply.createdAt.toISOString(),
              }}
              voteButtons={
                <VoteButtons
                  targetType="REPLY"
                  targetId={reply.id}
                  initialScore={reply.netScore}
                  initialVote={reply.votes[0]?.direction ?? null}
                  userId={userId}
                />
              }
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/forum/${id}?page=${page - 1}`}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/forum/${id}?page=${page + 1}`}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <div className="mt-6">
        <ReplyForm threadId={id} userId="user-alice" />
      </div>
    </div>
  );
}
