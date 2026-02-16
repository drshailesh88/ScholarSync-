export default function ProjectsLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-32 bg-muted rounded animate-pulse" />
          <div className="h-6 w-8 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <div className="w-9 h-9 bg-muted" />
            <div className="w-9 h-9 bg-muted" />
          </div>
          <div className="h-9 w-32 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-28 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>

      {/* Search Skeleton */}
      <div className="h-10 w-full max-w-md rounded-xl bg-surface border border-border animate-pulse mb-6" />

      {/* Project Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-surface overflow-hidden animate-pulse"
          >
            <div className="h-1.5 bg-muted" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-muted" />
                  <div className="h-5 w-16 rounded-full bg-muted" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded bg-muted" />
                  <div className="w-6 h-6 rounded bg-muted" />
                </div>
              </div>
              <div className="h-5 w-3/4 bg-muted rounded mb-2" />
              <div className="h-3 w-1/2 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
