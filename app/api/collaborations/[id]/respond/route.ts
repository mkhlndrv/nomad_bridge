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

  let body: { applicationId?: string; action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.applicationId || !body.action) {
    return NextResponse.json({ error: "applicationId and action are required" }, { status: 400 });
  }

  const action = body.action.toUpperCase();
  if (action !== "ACCEPT" && action !== "REJECT") {
    return NextResponse.json({ error: "action must be ACCEPT or REJECT" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const collab = await tx.collaborationOpportunity.findUnique({
        where: { id: collaborationId },
      });
      if (!collab) throw { code: 404, message: "Collaboration not found" };

      if (collab.userId !== userId) {
        throw { code: 403, message: "Only the poster can respond to applications" };
      }

      const application = await tx.collaborationApplication.findUnique({
        where: { id: body.applicationId },
      });
      if (!application || application.collaborationId !== collaborationId) {
        throw { code: 400, message: "Application not found for this collaboration" };
      }
      if (application.status !== "PENDING") {
        throw { code: 400, message: "Application is no longer pending" };
      }

      if (action === "ACCEPT") {
        // Accept this application
        await tx.collaborationApplication.update({
          where: { id: application.id },
          data: { status: "ACCEPTED" },
        });

        // Update collaboration to MATCHED
        await tx.collaborationOpportunity.update({
          where: { id: collaborationId },
          data: { status: "MATCHED" },
        });

        // Reject all other pending applications
        await tx.collaborationApplication.updateMany({
          where: {
            collaborationId,
            id: { not: application.id },
            status: "PENDING",
          },
          data: { status: "REJECTED" },
        });

        // TODO: Notify accepted applicant (C.6)
        // TODO: Notify rejected applicants (C.6)

        return { application: { ...application, status: "ACCEPTED" }, collaborationStatus: "MATCHED" };
      } else {
        // Reject this application
        await tx.collaborationApplication.update({
          where: { id: application.id },
          data: { status: "REJECTED" },
        });

        // Check if any pending applications remain
        const pendingCount = await tx.collaborationApplication.count({
          where: { collaborationId, status: "PENDING" },
        });

        let collabStatus = collab.status;
        if (pendingCount === 0 && collab.status === "IN_DISCUSSION") {
          await tx.collaborationOpportunity.update({
            where: { id: collaborationId },
            data: { status: "OPEN" },
          });
          collabStatus = "OPEN";
        }

        // TODO: Notify rejected applicant (C.6)

        return { application: { ...application, status: "REJECTED" }, collaborationStatus: collabStatus };
      }
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && "message" in err) {
      const e = err as { code: number; message: string };
      return NextResponse.json({ error: e.message }, { status: e.code });
    }
    console.error("POST /api/collaborations/[id]/respond error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
