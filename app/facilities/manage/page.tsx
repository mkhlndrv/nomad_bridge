import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { BarChart3, Clock, CheckCircle, Calendar } from "lucide-react";

export const metadata = { title: "Venue Manager Dashboard — NomadBridge" };
export const dynamic = "force-dynamic";

export default async function VenueManagerDashboardPage() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  if (!userId) redirect("/facilities");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role !== "VENUE_MANAGER") redirect("/facilities");

  // Get all facilities managed by this user
  const facilities = await prisma.facility.findMany({
    where: { managerId: userId },
    select: { id: true, name: true },
  });

  const facilityIds = facilities.map((f) => f.id);

  // Get all booking requests for managed facilities
  const requests = await prisma.bookingRequest.findMany({
    where: { facilityId: { in: facilityIds } },
    include: {
      user: { select: { id: true, name: true, trustScore: true } },
      facility: { select: { id: true, name: true, interestThreshold: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Compute stats
  const totalRequests = requests.length;
  const pendingReview = requests.filter((r) => r.status === "UNDER_REVIEW").length;
  const approvedThisMonth = requests.filter((r) => {
    const now = new Date();
    return r.status === "APPROVED" && r.updatedAt.getMonth() === now.getMonth() && r.updatedAt.getFullYear() === now.getFullYear();
  }).length;
  const upcomingApproved = requests.filter((r) => r.status === "APPROVED" && new Date(r.proposedDate) > new Date()).length;

  // Group by status
  const grouped: Record<string, typeof requests> = {};
  for (const req of requests) {
    if (!grouped[req.status]) grouped[req.status] = [];
    grouped[req.status].push(req);
  }

  const statusOrder = ["UNDER_REVIEW", "OPEN", "APPROVED", "REJECTED", "CANCELLED"];
  const statusLabels: Record<string, string> = {
    UNDER_REVIEW: "Under Review",
    OPEN: "Open (Gathering Interest)",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled",
  };
  const statusColors: Record<string, string> = {
    UNDER_REVIEW: "border-yellow-300 bg-yellow-50",
    OPEN: "border-green-300 bg-green-50",
    APPROVED: "border-blue-300 bg-blue-50",
    REJECTED: "border-red-300 bg-red-50",
    CANCELLED: "border-gray-300 bg-gray-50",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Venue Manager Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage booking requests for your {facilities.length} venue{facilities.length !== 1 ? "s" : ""}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <BarChart3 className="h-5 w-5 text-gray-400 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
          <p className="text-xs text-gray-500">Total Requests</p>
        </div>
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
          <Clock className="h-5 w-5 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-yellow-700">{pendingReview}</p>
          <p className="text-xs text-yellow-600">Awaiting Review</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm">
          <CheckCircle className="h-5 w-5 text-green-500 mb-2" />
          <p className="text-2xl font-bold text-green-700">{approvedThisMonth}</p>
          <p className="text-xs text-green-600">Approved This Month</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <Calendar className="h-5 w-5 text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-blue-700">{upcomingApproved}</p>
          <p className="text-xs text-blue-600">Upcoming Events</p>
        </div>
      </div>

      {/* Grouped requests */}
      <div className="space-y-8">
        {statusOrder.map((status) => {
          const items = grouped[status] ?? [];
          return (
            <section key={status}>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-gray-900">{statusLabels[status]}</h2>
                {items.length > 0 && (
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {items.length}
                  </span>
                )}
              </div>
              {items.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No requests in this category</p>
              ) : (
                <div className="space-y-3">
                  {items.map((req) => (
                    <div key={req.id} className={`rounded-lg border p-4 ${statusColors[status] ?? "border-gray-200 bg-white"}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{req.eventTitle}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {req.facility.name} · by {req.user.name} · {req.interestCount} interested
                          </p>
                          {req.eventDescription && (
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{req.eventDescription}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(req.proposedDate).toLocaleDateString("en-US", { timeZone: "Asia/Bangkok" })} · {req.startTime}–{req.endTime} · {req.expectedAttendance} attendees
                          </p>
                        </div>
                        <span className={`shrink-0 ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                          req.status === "UNDER_REVIEW" ? "bg-yellow-100 text-yellow-700" :
                          req.status === "OPEN" ? "bg-green-100 text-green-700" :
                          req.status === "APPROVED" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {statusLabels[req.status] ?? req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
