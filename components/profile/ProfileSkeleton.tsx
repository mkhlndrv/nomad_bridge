export default function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
        <div className="h-24 w-24 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="flex gap-2 items-center">
            <div className="h-7 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 w-12 bg-gray-200 rounded-full" />
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Skills skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 w-20 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* Activity skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
              <div className="mx-auto mb-2 h-10 w-10 bg-gray-200 rounded-full" />
              <div className="h-8 w-8 mx-auto bg-gray-200 rounded" />
              <div className="h-3 w-16 mx-auto mt-1 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
