import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import type { ForumCategory } from "@prisma/client";

const PAGE_SIZE = 20;
const VALID_CATEGORIES = ["GENERAL", "TIPS", "EVENTS", "HOUSING", "COWORKING"];
const RATE_LIMIT_MS = 30_000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const where = {
    isDeleted: false,
    ...(category && VALID_CATEGORIES.includes(category)
      ? { category: category as ForumCategory }
      : {}),
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

  return NextResponse.json({
    threads,
    totalCount,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  });
}

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = (body.title ?? "").trim();
  const content = (body.content ?? "").trim();
  const category = body.category;

  if (!title || title.length > 120) {
    return NextResponse.json(
      { error: "Title is required and must be at most 120 characters" },
      { status: 400 }
    );
  }

  if (!content || content.length > 5000) {
    return NextResponse.json(
      { error: "Content is required and must be at most 5000 characters" },
      { status: 400 }
    );
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: "Invalid category" },
      { status: 400 }
    );
  }

  // Rate limiting: check last post or reply within 30s
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

  const thread = await prisma.forumPost.create({
    data: {
      title,
      content,
      category: category as ForumCategory,
      lastActivity: new Date(),
      userId,
    },
    include: {
      user: { select: { id: true, name: true, trustScore: true } },
    },
  });

  return NextResponse.json(thread, { status: 201 });
}
