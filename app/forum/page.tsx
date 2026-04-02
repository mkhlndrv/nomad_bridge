import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ThreadCard } from "./_components/ThreadCard";
import { ForumFilterBar } from "./_components/ForumFilterBar";
import type { ForumCategory } from "@prisma/client";

const PAGE_SIZE = 20;
const VALID_CATEGORIES = ["GENERAL", "TIPS", "EVENTS", "HOUSING", "COWORKING"];

export const metadata = {
  title: "Community Discussion — NomadBridge",
};

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = VALID_CATEGORIES.includes(params.category ?? "")
    ? (params.category as ForumCategory)
    : undefined;
  const search = params.search?.trim() || undefined;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const where = {
    isDeleted: false,
    ...(category ? { category } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
          ],
        }
      : {}),
  };

  const [threads, totalCount] = await Promise.all([
    prisma.forumPost.findMany({
      where,
      orderBy: [{ pinned: "desc" }, { lastActivity: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        user: { select: { id: true, name: true, trustScore: true } },
        _count: { select: { replies: true } },
      },
    }),
    prisma.forumPost.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Community Discussion</h1>
        <Link
          href="/forum/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Thread
        </Link>
      </div>

      <ForumFilterBar />

      <div className="mt-6 space-y-3">
        {threads.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
            <p className="text-lg font-medium text-gray-600">
              {search
                ? "No threads match your search."
                : "Be the first to start a discussion!"}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {search
                ? "Try different keywords or clear filters."
                : "Share tips, ask questions, or connect with fellow nomads."}
            </p>
          </div>
        ) : (
          threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/forum?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(search ? { search } : {}),
                page: String(page - 1),
              }).toString()}`}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/forum?${new URLSearchParams({
                ...(category ? { category } : {}),
                ...(search ? { search } : {}),
                page: String(page + 1),
              }).toString()}`}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
