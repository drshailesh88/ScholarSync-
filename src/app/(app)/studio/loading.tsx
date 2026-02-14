export default function StudioLoading() {
  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 -mt-0">
      {/* Left Sidebar Skeleton */}
      <aside className="w-64 shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="px-4 py-4 border-b border-border">
          <div className="h-5 w-40 bg-muted rounded animate-pulse mb-3" />
          <div className="flex p-0.5 bg-muted rounded-lg animate-pulse">
            <div className="flex-1 h-8 rounded-md" />
            <div className="flex-1 h-8 rounded-md" />
          </div>
        </div>

        <nav className="px-3 py-3 space-y-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-full rounded-lg bg-muted animate-pulse"
            />
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-border">
          <div className="h-3 w-24 bg-muted rounded animate-pulse mb-3" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 animate-pulse"
              >
                <div className="w-3.5 h-3.5 rounded bg-muted mt-0.5" />
                <div className="flex-1">
                  <div className="h-3 w-full bg-muted rounded mb-1" />
                  <div className="h-2 w-16 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto px-4 py-4 border-t border-border">
          <div className="h-2 w-full bg-muted rounded-full animate-pulse" />
          <div className="h-3 w-20 bg-muted rounded animate-pulse mt-2" />
        </div>
      </aside>

      {/* Center Editor Skeleton */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
          <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          <div className="h-7 w-20 rounded-lg bg-muted animate-pulse" />
        </div>
        <div className="flex-1 bg-surface p-8">
          <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
            <div className="h-8 w-2/3 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded mt-6" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded mt-6" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        </div>
      </main>

      {/* Right AI Panel Skeleton */}
      <aside className="w-80 shrink-0 border-l border-border bg-surface flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-8 flex-1 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 px-4 py-3 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 w-full bg-muted rounded mb-2" />
              <div className="h-3 w-2/3 bg-muted rounded" />
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-border">
          <div className="flex gap-2">
            <div className="flex-1 h-9 rounded-xl bg-muted animate-pulse" />
            <div className="w-9 h-9 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      </aside>
    </div>
  );
}
