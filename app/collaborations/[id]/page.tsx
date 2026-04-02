import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Monitor, Laptop, DollarSign, Users, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { parseTags } from "@/lib/utils";
import CollaborationTypeBadge from "@/components/collaborations/CollaborationTypeBadge";
import CollaborationStatusBadge from "@/components/collaborations/CollaborationStatusBadge";
import TrustScoreBadge from "@/components/shared/TrustScoreBadge";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collab = await prisma.collaborationOpportunity.findUnique({ where: { id }, select: { title: true } });
  if (!collab) return { title: "Not Found" };
  return { title: `${collab.title} — NomadBridge` };
}

const formatLabels: Record<string, { icon: typeof MapPin; label: string }> = {
  IN_PERSON: { icon: MapPin, label: "In Person" },
  ONLINE: { icon: Monitor, label: "Online" },
  HYBRID: { icon: Laptop, label: "Hybrid" },
};

const compensationLabels: Record<string, string> = {
  PAID: "Paid", FREE: "Free", FACILITY_ACCESS: "Facility Access",
};

export default async function CollaborationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const headersList = await headers();
  const currentUserId = headersList.get("x-user-id");

  const collab = await prisma.collaborationOpportunity.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, role: true, bio: true, trustScore: true } },
      applications: {
        include: { user: { select: { id: true, name: true, role: true } } },
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

  if (!collab) notFound();

  const tags = parseTags(collab.tags ?? "");
  const isOwner = currentUserId === collab.user.id;
  const fmt = collab.format ? formatLabels[collab.format] : null;
  const FormatIcon = fmt?.icon ?? MapPin;

  const userApplication = currentUserId
    ? collab.applications.find((a) => a.user.id === currentUserId)
    : null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/collaborations" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Board
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <CollaborationTypeBadge type={collab.collaborationType} />
              <CollaborationStatusBadge status={collab.status} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{collab.title}</h1>
          </div>

          {collab.description && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{collab.description}</p>
            </section>
          )}

          {/* Details grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {collab.format && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><FormatIcon className="h-3.5 w-3.5" /> Format</div>
                <p className="text-sm font-medium text-gray-900">{fmt?.label ?? collab.format}</p>
              </div>
            )}
            {collab.compensation && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><DollarSign className="h-3.5 w-3.5" /> Compensation</div>
                <p className="text-sm font-medium text-gray-900">{compensationLabels[collab.compensation] ?? collab.compensation}</p>
              </div>
            )}
            {collab.preferredDateRange && (
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1"><Calendar className="h-3.5 w-3.5" /> Date Range</div>
                <p className="text-sm font-medium text-gray-900">{collab.preferredDateRange}</p>
              </div>
            )}
          </section>

          {/* Type-specific fields */}
          {collab.collaborationType === "GUEST_LECTURE" && (collab.expectedAudience || collab.department || collab.talkFormat) && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Lecture Details</h2>
              <div className="grid grid-cols-2 gap-3">
                {collab.expectedAudience && <div className="rounded-lg bg-purple-50 p-3"><p className="text-xs text-purple-500">Audience Size</p><p className="text-sm font-medium text-purple-900">{collab.expectedAudience} people</p></div>}
                {collab.department && <div className="rounded-lg bg-purple-50 p-3"><p className="text-xs text-purple-500">Department</p><p className="text-sm font-medium text-purple-900">{collab.department}</p></div>}
                {collab.talkFormat && <div className="rounded-lg bg-purple-50 p-3"><p className="text-xs text-purple-500">Talk Format</p><p className="text-sm font-medium text-purple-900">{collab.talkFormat}</p></div>}
              </div>
            </section>
          )}

          {collab.collaborationType === "SKILL_EXCHANGE" && (collab.requiredSkills || collab.estimatedDuration || collab.deliverables) && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Research / Skill Exchange Details</h2>
              <div className="grid grid-cols-2 gap-3">
                {collab.requiredSkills && <div className="rounded-lg bg-teal-50 p-3"><p className="text-xs text-teal-500">Required Skills</p><p className="text-sm font-medium text-teal-900">{collab.requiredSkills}</p></div>}
                {collab.estimatedDuration && <div className="rounded-lg bg-teal-50 p-3"><p className="text-xs text-teal-500">Duration</p><p className="text-sm font-medium text-teal-900">{collab.estimatedDuration}</p></div>}
                {collab.deliverables && <div className="rounded-lg bg-teal-50 p-3 col-span-2"><p className="text-xs text-teal-500">Deliverables</p><p className="text-sm font-medium text-teal-900">{collab.deliverables}</p></div>}
              </div>
            </section>
          )}

          {collab.collaborationType === "MENTORSHIP" && (collab.frequency || collab.topicArea || collab.commitmentDuration) && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Mentorship Details</h2>
              <div className="grid grid-cols-2 gap-3">
                {collab.frequency && <div className="rounded-lg bg-amber-50 p-3"><p className="text-xs text-amber-500">Frequency</p><p className="text-sm font-medium text-amber-900">{collab.frequency}</p></div>}
                {collab.topicArea && <div className="rounded-lg bg-amber-50 p-3"><p className="text-xs text-amber-500">Topic Area</p><p className="text-sm font-medium text-amber-900">{collab.topicArea}</p></div>}
                {collab.commitmentDuration && <div className="rounded-lg bg-amber-50 p-3"><p className="text-xs text-amber-500">Commitment</p><p className="text-sm font-medium text-amber-900">{collab.commitmentDuration}</p></div>}
              </div>
            </section>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm text-blue-700">{tag}</span>
              ))}
            </div>
          )}

          {/* Feedback (completed only) */}
          {collab.status === "COMPLETED" && collab.feedback.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Feedback</h2>
              <div className="space-y-3">
                {collab.feedback.map((fb) => (
                  <div key={fb.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{fb.reviewer.name}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm text-gray-600">{fb.reviewee.name}</span>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < fb.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                    </div>
                    {fb.comment && <p className="text-sm text-gray-600">{fb.comment}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Poster card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-500 mb-2">Posted by</p>
            <Link href={`/profile/${collab.user.id}`} className="hover:underline">
              <p className="font-semibold text-gray-900">{collab.user.name}</p>
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${collab.user.role === "UNIVERSITY" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                {collab.user.role === "UNIVERSITY" ? "University" : "Nomad"}
              </span>
              <TrustScoreBadge score={collab.user.trustScore} />
            </div>
            {collab.user.bio && <p className="text-xs text-gray-500 mt-2 line-clamp-3">{collab.user.bio}</p>}
          </div>

          {/* Application count */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Users className="h-4 w-4 text-gray-400" />
              <span>{collab.applications.length} application{collab.applications.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Action button */}
          {!isOwner && collab.status === "OPEN" && !userApplication && (
            <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-5 text-center">
              <p className="text-sm text-blue-700 font-medium">Apply/Invite button coming soon</p>
            </div>
          )}

          {userApplication && (
            <div className={`rounded-xl border p-5 text-center ${
              userApplication.status === "ACCEPTED" ? "border-green-200 bg-green-50" :
              userApplication.status === "REJECTED" ? "border-red-200 bg-red-50" :
              "border-yellow-200 bg-yellow-50"
            }`}>
              <p className={`text-sm font-medium ${
                userApplication.status === "ACCEPTED" ? "text-green-700" :
                userApplication.status === "REJECTED" ? "text-red-700" :
                "text-yellow-700"
              }`}>
                Your application: {userApplication.status}
              </p>
            </div>
          )}

          {/* Owner: application management */}
          {isOwner && collab.applications.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Applications</h3>
              <div className="space-y-3">
                {collab.applications.map((app) => (
                  <div key={app.id} className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <Link href={`/profile/${app.user.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                        {app.user.name}
                      </Link>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        app.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                        app.status === "REJECTED" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    {app.message && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{app.message}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
