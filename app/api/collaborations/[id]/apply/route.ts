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

  let body: { message?: string } = {};
  try {
    body = await request.json();
  } catch {
    // message is optional
  }

  const message = body.message?.trim().slice(0, 500) || null;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const collab = await tx.collaborationOpportunity.findUnique({
        where: { id: collaborationId },
      });
      if (!collab) throw { code: 404, message: "Collaboration not found" };

      if (collab.userId === userId) {
        throw { code: 400, message: "Cannot apply to your own collaboration" };
      }

      if (collab.status !== "OPEN" && collab.status !== "IN_DISCUSSION") {
        throw { code: 400, message: "Collaboration is not accepting applications" };
      }

      // Check duplicate
      const existing = await tx.collaborationApplication.findFirst({
        where: { collaborationId, userId },
      });
      if (existing) throw { code: 409, message: "Already applied to this collaboration" };

      const application = await tx.collaborationApplication.create({
        data: { collaborationId, userId, message, status: "PENDING" },
      });

      // Update to IN_DISCUSSION if first application
      if (collab.status === "OPEN") {
        await tx.collaborationOpportunity.update({
          where: { id: collaborationId },
          data: { status: "IN_DISCUSSION" },
        });
      }

      // TODO: Notify poster about new application (C.6)

      return application;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/collaborations/[id]/apply error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
