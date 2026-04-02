import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: collaborationId } = await params;
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { rating?: number; comment?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rating = body.rating;
  if (!rating || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be an integer between 1 and 5" }, { status: 400 });
  }

  const comment = body.comment?.trim().slice(0, 1000) || null;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const collab = await tx.collaborationOpportunity.findUnique({
        where: { id: collaborationId },
      });
      if (!collab) throw { code: 404, message: "Collaboration not found" };

      if (collab.status !== "COMPLETED") {
        throw { code: 400, message: "Feedback can only be given on completed collaborations" };
      }

      const acceptedApp = await tx.collaborationApplication.findFirst({
        where: { collaborationId, status: "ACCEPTED" },
      });
      if (!acceptedApp) {
        throw { code: 400, message: "No accepted application found" };
      }

      // Validate requester is one of the matched parties
      const posterId = collab.userId;
      const applicantId = acceptedApp.userId;

      if (userId !== posterId && userId !== applicantId) {
        throw { code: 403, message: "Only matched parties can submit feedback" };
      }

      // Check duplicate
      const existing = await tx.collaborationFeedback.findFirst({
        where: { collaborationId, reviewerId: userId },
      });
      if (existing) throw { code: 409, message: "You have already submitted feedback" };

      // Determine the other party
      const revieweeId = userId === posterId ? applicantId : posterId;

      const feedback = await tx.collaborationFeedback.create({
        data: { collaborationId, reviewerId: userId, revieweeId, rating, comment },
      });

      // Trust score impact on the reviewee (only if NOMAD)
      const reviewee = await tx.user.findUnique({
        where: { id: revieweeId },
        select: { role: true },
      });

      if (reviewee?.role === "NOMAD") {
        let delta = 0;
        if (rating >= 4) delta = 3;
        else if (rating <= 2) delta = -2;

        if (delta !== 0) {
          await tx.user.update({
            where: { id: revieweeId },
            data: { trustScore: { increment: delta } },
          });
        }
      }

      return feedback;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/collaborations/[id]/feedback error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
