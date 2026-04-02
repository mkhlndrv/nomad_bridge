export default function EventsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-72 bg-gray-200 rounded mt-2" />
        </div>
        <div className="h-9 w-32 bg-gray-200 rounded-lg" />
      </div>
      <div className="mb-6 space-y-3">
        <div className="h-10 w-full bg-gray-200 rounded-lg" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-gray-100 overflow-hidden bg-white">
            <div className="h-36 bg-gray-200" />
            <div className="p-4 space-y-2.5">
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="space-y-1.5">
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
