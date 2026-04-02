import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload-utils";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: eventId } = await params;
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (new Date(event.date) > new Date()) {
    return NextResponse.json({ error: "Materials can only be added to past events" }, { status: 400 });
  }

  // Auth check: only creator or admin
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (event.creatorId !== userId && user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Only organizers can upload materials" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const title = formData.get("title") as string | null;
  const fileType = formData.get("fileType") as string | null;

  if (!title || !fileType) {
    return NextResponse.json({ error: "title and fileType are required" }, { status: 400 });
  }

  const validTypes = ["pdf", "slides", "video", "link"];
  if (!validTypes.includes(fileType)) {
    return NextResponse.json({ error: `fileType must be one of: ${validTypes.join(", ")}` }, { status: 400 });
  }

  let url: string;

  if (fileType === "link") {
    const fileUrl = formData.get("fileUrl") as string | null;
    if (!fileUrl || (!fileUrl.startsWith("http://") && !fileUrl.startsWith("https://"))) {
      return NextResponse.json({ error: "Valid URL required for link type" }, { status: 400 });
    }
    url = fileUrl;
  } else {
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "File required for non-link types" }, { status: 400 });
    }

    const maxSize = fileType === "video" ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `File must be ${fileType === "video" ? "50MB" : "10MB"} or smaller` }, { status: 400 });
    }

    const { relativePath } = await saveUploadedFile(file, `uploads/materials/${eventId}`);
    url = relativePath;
  }

  const material = await prisma.eventMaterial.create({
    data: {
      eventId,
      uploadedById: userId,
      title,
      url,
      fileType,
    },
  });

  // TODO: Notify attendees about new materials (EVT-MAT-02)

  return NextResponse.json(material, { status: 201 });
}
