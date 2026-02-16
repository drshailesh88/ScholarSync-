export default function ResearchLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Main search area */}
      <div className="flex-1 overflow-y-auto pr-2">
        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 h-12 rounded-2xl bg-surface border border-border animate-pulse" />
            <div className="w-24 h-12 rounded-2xl bg-muted animate-pulse" />
          </div>

          {/* Filter Chips Skeleton */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-20 rounded-full bg-muted animate-pulse"
                />
              ))}
            </div>
            <div className="h-7 w-24 rounded-lg bg-muted animate-pulse" />
          </div>
        </div>

        {/* Results Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-5 animate-pulse"
            >
              <div className="h-4 w-3/4 bg-muted rounded mb-3" />
              <div className="h-3 w-1/2 bg-muted rounded mb-2" />
              <div className="h-3 w-2/3 bg-muted rounded mb-3" />
              <div className="h-3 w-full bg-muted rounded mb-1" />
              <div className="h-3 w-5/6 bg-muted rounded mb-4" />
              <div className="flex items-center gap-2">
                <div className="h-7 w-16 rounded-lg bg-muted" />
                <div className="h-7 w-16 rounded-lg bg-muted" />
                <div className="h-5 w-14 rounded-full bg-muted" />
                <div className="h-5 w-10 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
