import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const collaboration = await prisma.collaborationOpportunity.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, role: true, bio: true, trustScore: true } },
      applications: {
        include: {
          user: { select: { id: true, name: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      feedback: {
        include: {
          reviewer: { select: { id: true, name: true } },
          reviewee: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!collaboration) {
    return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
  }

  // Only include feedback for completed collaborations
  const result = {
    ...collaboration,
    feedback: collaboration.status === "COMPLETED" ? collaboration.feedback : [],
  };

  return NextResponse.json(result);
}
