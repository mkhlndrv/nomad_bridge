import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_TYPES = ["GUEST_LECTURE", "WORKSHOP", "SKILL_EXCHANGE", "MENTORSHIP", "PROJECT"];
const VALID_STATUSES = ["OPEN", "IN_DISCUSSION", "MATCHED", "COMPLETED", "CANCELLED"];
const VALID_FORMATS = ["IN_PERSON", "ONLINE", "HYBRID"];
const VALID_COMPENSATIONS = ["PAID", "FREE", "FACILITY_ACCESS"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get("tab") ?? "all";
  const type = searchParams.get("type") || undefined;
  const format = searchParams.get("format") || undefined;
  const compensation = searchParams.get("compensation") || undefined;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;
  const page = Math.max(parseInt(searchParams.get("page") ?? "1") || 1, 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "12") || 12, 1), 50);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [];

  // Default: exclude CANCELLED/COMPLETED unless status explicitly set
  if (!status) {
    conditions.push({ status: { notIn: ["CANCELLED", "COMPLETED"] } });
  } else {
    conditions.push({ status });
  }

  if (type) conditions.push({ collaborationType: type });
  if (format) conditions.push({ format });
  if (compensation) conditions.push({ compensation });

  if (tab === "requests") {
    conditions.push({ user: { role: "UNIVERSITY" } });
  } else if (tab === "offers") {
    conditions.push({ user: { role: "NOMAD" } });
  }

  if (search) {
    conditions.push({
      OR: [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ],
    });
  }

  const where = conditions.length > 0 ? { AND: conditions } : undefined;
  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      prisma.collaborationOpportunity.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true, role: true } },
        },
      }),
      prisma.collaborationOpportunity.count({ where }),
    ]);

    return NextResponse.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("GET /api/collaborations error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate shared required fields
  const required = ["title", "description", "collaborationType"] as const;
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  const collabType = String(body.collaborationType);
  if (!VALID_TYPES.includes(collabType)) {
    return NextResponse.json({ error: `Invalid collaborationType. Must be one of: ${VALID_TYPES.join(", ")}` }, { status: 400 });
  }

  const format = body.format ? String(body.format) : null;
  if (format && !VALID_FORMATS.includes(format)) {
    return NextResponse.json({ error: `Invalid format. Must be one of: ${VALID_FORMATS.join(", ")}` }, { status: 400 });
  }

  const compensation = body.compensation ? String(body.compensation) : null;
  if (compensation && !VALID_COMPENSATIONS.includes(compensation)) {
    return NextResponse.json({ error: `Invalid compensation. Must be one of: ${VALID_COMPENSATIONS.join(", ")}` }, { status: 400 });
  }

  // Type-specific validation
  if (collabType === "GUEST_LECTURE") {
    if (!body.expectedAudience || !body.department) {
      return NextResponse.json({ error: "GUEST_LECTURE requires expectedAudience and department" }, { status: 400 });
    }
  }
  if (collabType === "SKILL_EXCHANGE") {
    if (!body.requiredSkills || !body.estimatedDuration) {
      return NextResponse.json({ error: "SKILL_EXCHANGE requires requiredSkills and estimatedDuration" }, { status: 400 });
    }
  }
  if (collabType === "MENTORSHIP") {
    if (!body.frequency || !body.topicArea) {
      return NextResponse.json({ error: "MENTORSHIP requires frequency and topicArea" }, { status: 400 });
    }
  }

  // Rate limit: max 3 posts per 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentCount = await prisma.collaborationOpportunity.count({
    where: { userId, createdAt: { gte: sevenDaysAgo } },
  });
  if (recentCount >= 3) {
    return NextResponse.json({ error: "You've reached the limit of 3 posts per week" }, { status: 429 });
  }

  const tags = body.tags
    ? String(body.tags).split(",").map((t: string) => t.trim()).filter(Boolean).join(",")
    : null;

  const collaboration = await prisma.collaborationOpportunity.create({
    data: {
      title: String(body.title),
      description: String(body.description),
      collaborationType: collabType as "GUEST_LECTURE" | "WORKSHOP" | "SKILL_EXCHANGE" | "MENTORSHIP" | "PROJECT",
      format,
      compensation,
      tags,
      status: "OPEN",
      preferredDateRange: body.preferredDateRange ? String(body.preferredDateRange) : null,
      expectedAudience: body.expectedAudience ? parseInt(String(body.expectedAudience)) : null,
      department: body.department ? String(body.department) : null,
      talkFormat: body.talkFormat ? String(body.talkFormat) : null,
      requiredSkills: body.requiredSkills ? String(body.requiredSkills) : null,
      estimatedDuration: body.estimatedDuration ? String(body.estimatedDuration) : null,
      deliverables: body.deliverables ? String(body.deliverables) : null,
      frequency: body.frequency ? String(body.frequency) : null,
      topicArea: body.topicArea ? String(body.topicArea) : null,
      commitmentDuration: body.commitmentDuration ? String(body.commitmentDuration) : null,
      projectDescription: body.projectDescription ? String(body.projectDescription) : null,
      userId,
    },
  });

  return NextResponse.json(collaboration, { status: 201 });
}
