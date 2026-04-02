import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(parseInt(searchParams.get("page") ?? "1") || 1, 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "20") || 20, 1), 50);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.trustScoreLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.trustScoreLog.count({ where: { userId } }),
  ]);

  return NextResponse.json({ data, total, page, limit });
}
