import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { FileText, Ticket, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "My Bookings — NomadBridge" };
export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  OPEN: "Open",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

const statusColors: Record<string, string> = {
  OPEN: "bg-green-100 text-green-700",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export default async function MyBookingsPage() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");
  if (!userId) redirect("/");

  const requests = await prisma.bookingRequest.findMany({
    where: { userId },
    include: {
      facility: { select: { id: true, name: true, university: true, type: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const activeRequests = requests.filter((r) =>
    ["OPEN", "UNDER_REVIEW"].includes(r.status)
  );
  const confirmedBookings = requests.filter((r) => r.status === "APPROVED");
  const pastRequests = requests.filter((r) =>
    ["REJECTED", "CANCELLED"].includes(r.status)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My Bookings</h1>
      <p className="text-sm text-gray-500 mb-6">Track your venue booking requests and confirmed events</p>

      {/* Lifecycle legend */}
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-8">
        <p className="text-xs text-gray-500 mb-2 font-medium">Request Lifecycle</p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-medium">Open</span>
          <ArrowRight className="h-3 w-3 text-gray-400" />
          <span className="rounded-full bg-yellow-100 text-yellow-700 px-2 py-0.5 font-medium">Under Review</span>
          <ArrowRight className="h-3 w-3 text-gray-400" />
          <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 font-medium">Approved</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 font-medium">Rejected</span>
        </div>
      </div>

      {/* Active Requests */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" /> Active Requests
        </h2>
        {activeRequests.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No active requests</p>
        ) : (
          <div className="space-y-3">
            {activeRequests.map((req) => (
              <div key={req.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{req.eventTitle}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <Link href={`/facilities/${req.facility.id}`} className="text-blue-600 hover:underline">
                        {req.facility.name}
                      </Link>
                      {" · "}{req.facility.university}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(req.proposedDate).toLocaleDateString("en-US", { timeZone: "Asia/Bangkok" })} · {req.startTime}–{req.endTime} · {req.expectedAttendance} people
                    </p>
                    <p className="text-xs text-blue-600 mt-1">{req.interestCount} interested</p>
                  </div>
                  <span className={`shrink-0 ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[req.status]}`}>
                    {statusLabels[req.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Confirmed Bookings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Ticket className="h-5 w-5 text-gray-400" /> Confirmed Bookings
        </h2>
        {confirmedBookings.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No confirmed bookings</p>
        ) : (
          <div className="space-y-3">
            {confirmedBookings.map((req) => (
              <div key={req.id} className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{req.eventTitle}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {req.facility.name} · {req.facility.university}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(req.proposedDate).toLocaleDateString("en-US", { timeZone: "Asia/Bangkok" })} · {req.startTime}–{req.endTime}
                    </p>
                  </div>
                  <span className="shrink-0 ml-2 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium">
                    Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Requests */}
      {pastRequests.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Past Requests</h2>
          <div className="space-y-3">
            {pastRequests.map((req) => (
              <div key={req.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 opacity-75">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">{req.eventTitle}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{req.facility.name}</p>
                    {req.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">Reason: {req.rejectionReason}</p>
                    )}
                  </div>
                  <span className={`shrink-0 ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[req.status]}`}>
                    {statusLabels[req.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
