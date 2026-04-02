import { Suspense } from "react";
import { Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import VenueCard from "@/components/facilities/VenueCard";
import VenueFilterBar from "@/components/facilities/VenueFilterBar";

export const metadata = { title: "Campus Venues — NomadBridge" };
export const dynamic = "force-dynamic";

export default async function VenueDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [];
  if (sp.type) conditions.push({ type: sp.type });
  if (sp.university) conditions.push({ university: sp.university });
  if (sp.maxPrice) {
    const max = parseFloat(sp.maxPrice);
    if (max === 0) {
      conditions.push({ pricePerHour: 0 });
    } else {
      conditions.push({ pricePerHour: { lte: max } });
    }
  }
  if (sp.search) {
    conditions.push({
      OR: [
        { name: { contains: sp.search } },
        { university: { contains: sp.search } },
        { description: { contains: sp.search } },
      ],
    });
  }

  const facilities = await prisma.facility.findMany({
    where: conditions.length > 0 ? { AND: conditions } : undefined,
    orderBy: { name: "asc" },
    take: 20,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campus Venues</h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse university facilities available for booking — all venues use a request-based system
        </p>
      </div>

      <div className="mb-6">
        <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100 rounded-lg" />}>
          <VenueFilterBar />
        </Suspense>
      </div>

      {facilities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No venues found</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Try adjusting your filters or check back later for new venues
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f) => (
            <VenueCard
              key={f.id}
              id={f.id}
              name={f.name}
              university={f.university}
              type={f.type}
              description={f.description}
              location={f.location}
              capacity={f.capacity}
              pricePerHour={f.pricePerHour}
              operatingHours={f.operatingHours}
              amenities={f.amenities}
              available={f.available}
            />
          ))}
        </div>
      )}
    </div>
  );
}
