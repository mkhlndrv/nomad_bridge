import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookingRequestForm from "@/components/facilities/BookingRequestForm";

export const metadata = { title: "Request Venue — NomadBridge" };

export default async function BookingRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const facility = await prisma.facility.findUnique({
    where: { id },
    select: { id: true, name: true, university: true, available: true },
  });

  if (!facility || !facility.available) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Request a Booking</h1>
      <p className="text-sm text-gray-500 mb-6">
        Submit a booking request for {facility.name} at {facility.university}
      </p>
      <BookingRequestForm facilityId={facility.id} facilityName={facility.name} />
    </main>
  );
}
