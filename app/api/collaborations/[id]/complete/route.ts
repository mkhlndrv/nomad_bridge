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

  try {
    const result = await prisma.$transaction(async (tx) => {
      const collab = await tx.collaborationOpportunity.findUnique({
        where: { id: collaborationId },
      });
      if (!collab) throw { code: 404, message: "Collaboration not found" };

      if (collab.status === "COMPLETED") {
        throw { code: 400, message: "Collaboration is already completed" };
      }
      if (collab.status !== "MATCHED") {
        throw { code: 400, message: "Collaboration must be in MATCHED status to complete" };
      }

      const acceptedApp = await tx.collaborationApplication.findFirst({
        where: { collaborationId, status: "ACCEPTED" },
      });
      if (!acceptedApp) {
        throw { code: 400, message: "No accepted application found" };
      }

      // Validate requester is one of the matched parties
      if (collab.userId !== userId && acceptedApp.userId !== userId) {
        throw { code: 403, message: "Only matched parties can complete this collaboration" };
      }

      // Update collaboration status
      const updated = await tx.collaborationOpportunity.update({
        where: { id: collaborationId },
        data: { status: "COMPLETED" },
      });

      // Award +10 trust score to the nomad participant
      const poster = await tx.user.findUnique({ where: { id: collab.userId }, select: { role: true } });
      const applicant = await tx.user.findUnique({ where: { id: acceptedApp.userId }, select: { role: true } });

      const nomadUserId =
        poster?.role === "NOMAD" ? collab.userId :
        applicant?.role === "NOMAD" ? acceptedApp.userId :
        acceptedApp.userId; // Default to applicant

      await tx.user.update({
        where: { id: nomadUserId },
        data: { trustScore: { increment: 10 } },
      });

      return updated;
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/collaborations/[id]/complete error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
