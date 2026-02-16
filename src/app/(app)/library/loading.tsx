export default function LibraryLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Collections Sidebar Skeleton */}
      <aside className="w-64 shrink-0 rounded-2xl border border-border bg-surface p-4 flex flex-col">
        <div className="h-3 w-20 bg-muted rounded animate-pulse mb-3 mx-2" />

        <nav className="space-y-0.5 flex-1">
          {["All Papers", "Favorites"].map((label, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-lg animate-pulse"
            >
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-6 bg-muted rounded" />
            </div>
          ))}

          <div className="border-t border-border my-2" />

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-lg animate-pulse"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted" />
                <div className="h-4 w-20 bg-muted rounded" />
              </div>
              <div className="h-3 w-6 bg-muted rounded" />
            </div>
          ))}
        </nav>

        <div className="space-y-2 pt-3 border-t border-border">
          <div className="h-9 w-full bg-muted rounded-lg animate-pulse" />
          <div className="h-9 w-full bg-muted rounded-lg animate-pulse" />
        </div>
      </aside>

      {/* Papers List Skeleton */}
      <div className="flex-1 overflow-y-auto">
        {/* Filter Bar Skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-10 rounded-xl bg-surface border border-border animate-pulse" />
          <div className="w-40 h-10 rounded-xl bg-muted animate-pulse" />
        </div>

        {/* Paper Cards Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-4 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                  <div className="h-3 w-1/2 bg-muted rounded mb-1" />
                  <div className="h-3 w-1/3 bg-muted rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 ml-14">
                <div className="h-7 w-14 rounded-lg bg-muted" />
                <div className="h-7 w-7 rounded-lg bg-muted" />
                <div className="h-7 w-7 rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
