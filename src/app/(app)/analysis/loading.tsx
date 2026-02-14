export default function AnalysisLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-36 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Text Area Skeleton */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 rounded-2xl border border-border bg-surface p-6 animate-pulse">
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded mt-4" />
            <div className="h-4 w-4/5 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>

        {/* Metrics Bar Skeleton */}
        <div className="flex items-center gap-4 px-4 py-2.5 rounded-xl bg-muted/50 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-20 bg-muted rounded" />
          ))}
        </div>

        {/* Bottom Bar Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          <div className="h-11 w-40 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
