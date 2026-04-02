import { Suspense } from "react";
import Link from "next/link";
import { Plus, Handshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import CollaborationCard from "@/components/collaborations/CollaborationCard";
import CollaborationTabBar from "@/components/collaborations/CollaborationTabBar";
import CollaborationFilterBar from "@/components/collaborations/CollaborationFilterBar";

export const metadata = { title: "Collaboration Board — NomadBridge" };
export const dynamic = "force-dynamic";

export default async function CollaborationBoardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const tab = sp.tab ?? "all";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [];
  if (sp.type) conditions.push({ collaborationType: sp.type });
  if (sp.format) conditions.push({ format: sp.format });
  if (sp.compensation) conditions.push({ compensation: sp.compensation });
  if (sp.status) conditions.push({ status: sp.status });
  if (sp.search) {
    conditions.push({
      OR: [
        { title: { contains: sp.search } },
        { description: { contains: sp.search } },
        { tags: { contains: sp.search } },
      ],
    });
  }

  // Tab filter: requests = UNIVERSITY posters, offers = NOMAD posters
  if (tab === "requests") {
    conditions.push({ user: { role: "UNIVERSITY" } });
  } else if (tab === "offers") {
    conditions.push({ user: { role: "NOMAD" } });
  }

  const collaborations = await prisma.collaborationOpportunity.findMany({
    where: conditions.length > 0 ? { AND: conditions } : undefined,
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      user: { select: { name: true, role: true } },
    },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collaboration Board</h1>
          <p className="text-sm text-gray-500 mt-1">
            Connect with universities and nomads for lectures, workshops, mentoring, and projects
          </p>
        </div>
        <Link
          href="/collaborations/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Post Collaboration
        </Link>
      </div>

      <Suspense fallback={<div className="h-10 animate-pulse bg-gray-100 rounded-lg" />}>
        <CollaborationTabBar />
      </Suspense>

      <div className="my-4">
        <Suspense fallback={<div className="h-10 animate-pulse bg-gray-100 rounded-lg" />}>
          <CollaborationFilterBar />
        </Suspense>
      </div>

      {collaborations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <Handshake className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No collaborations found</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            {tab !== "all"
              ? "Try switching tabs or adjusting your filters"
              : "Be the first to post a collaboration opportunity!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborations.map((c) => (
            <CollaborationCard
              key={c.id}
              id={c.id}
              title={c.title}
              description={c.description}
              collaborationType={c.collaborationType}
              format={c.format}
              compensation={c.compensation}
              tags={c.tags}
              status={c.status}
              preferredDateRange={c.preferredDateRange}
              userName={c.user.name}
              userRole={c.user.role}
            />
          ))}
        </div>
      )}
    </div>
  );
}
