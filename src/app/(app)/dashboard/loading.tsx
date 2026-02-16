export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Action Cards Skeleton */}
      <section className="mb-12">
        <div className="h-4 w-56 bg-muted rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface p-6 animate-pulse"
            >
              <div className="w-12 h-12 rounded-xl bg-muted mb-4" />
              <div className="h-4 w-28 bg-muted rounded mb-2" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted rounded mt-1.5" />
            </div>
          ))}
        </div>
      </section>

      {/* Active Manuscripts Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 w-40 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>

        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-5 animate-pulse ${
                i < 3 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-lg bg-muted" />
                <div>
                  <div className="h-4 w-48 bg-muted rounded mb-2" />
                  <div className="h-3 w-32 bg-muted rounded" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-20 bg-muted rounded-full" />
                <div className="w-8 h-8 rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
