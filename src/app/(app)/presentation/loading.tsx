export default function PresentationLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-7 w-40 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-10 w-44 rounded-xl bg-muted animate-pulse" />
      </div>

      {/* Deck Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border overflow-hidden animate-pulse"
          >
            {/* Slide Preview Skeleton */}
            <div className="aspect-video bg-muted relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-32 bg-surface rounded" />
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="px-4 py-3 bg-surface">
              <div className="h-4 w-3/4 bg-muted rounded mb-2" />
              <div className="flex items-center gap-3">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
