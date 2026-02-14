export default function SettingsLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Settings Nav Sidebar Skeleton */}
      <aside className="w-64 shrink-0 rounded-2xl border border-border bg-surface p-4 flex flex-col">
        <div className="h-5 w-16 bg-muted rounded animate-pulse px-3 mb-4" />
        <nav className="flex-1 space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg animate-pulse"
            >
              <div className="w-5 h-5 rounded bg-muted" />
              <div className="h-4 w-28 bg-muted rounded" />
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg animate-pulse mt-4">
          <div className="w-5 h-5 rounded bg-muted" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      </aside>

      {/* Settings Content Skeleton */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 max-w-2xl">
          <div className="h-6 w-36 bg-muted rounded animate-pulse" />

          {/* Form Card Skeleton */}
          <div className="rounded-2xl border border-border bg-surface p-6 animate-pulse">
            {/* Profile Header Skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-muted" />
              <div>
                <div className="h-5 w-32 bg-muted rounded mb-2" />
                <div className="h-4 w-48 bg-muted rounded mb-1" />
                <div className="h-5 w-28 rounded-full bg-muted" />
              </div>
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
              <div>
                <div className="h-3 w-20 bg-muted rounded mb-1.5" />
                <div className="h-9 w-full bg-muted rounded-lg" />
              </div>
              <div>
                <div className="h-3 w-20 bg-muted rounded mb-1.5" />
                <div className="h-9 w-full bg-muted rounded-lg" />
              </div>
              <div className="h-9 w-28 bg-muted rounded-xl" />
            </div>
          </div>

          {/* Second Card Skeleton */}
          <div className="rounded-2xl border border-border bg-surface p-6 animate-pulse">
            <div className="h-4 w-32 bg-muted rounded mb-4" />
            <div className="space-y-4">
              <div>
                <div className="h-3 w-16 bg-muted rounded mb-1.5" />
                <div className="h-9 w-48 bg-muted rounded-lg" />
              </div>
              <div>
                <div className="h-3 w-28 bg-muted rounded mb-1.5" />
                <div className="h-9 w-48 bg-muted rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
