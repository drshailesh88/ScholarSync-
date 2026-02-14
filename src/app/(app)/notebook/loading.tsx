export default function NotebookLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Sources Sidebar Skeleton */}
      <aside className="w-80 shrink-0 rounded-2xl border border-border bg-surface p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-5 w-6 rounded-full bg-muted animate-pulse" />
        </div>

        {/* Upload Area Skeleton */}
        <div className="border-2 border-dashed border-border rounded-xl p-4 mb-3 animate-pulse">
          <div className="h-3 w-40 bg-muted rounded mx-auto mb-1" />
          <div className="h-2 w-24 bg-muted rounded mx-auto" />
        </div>

        {/* Source Files Skeleton */}
        <div className="flex-1 space-y-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg animate-pulse"
            >
              <div className="w-4 h-4 rounded bg-muted" />
              <div className="w-4 h-4 rounded bg-muted" />
              <div className="flex-1">
                <div className="h-3 w-full bg-muted rounded mb-1" />
                <div className="h-2 w-12 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="h-4 w-28 bg-muted rounded animate-pulse" />
        </div>
      </aside>

      {/* Chat Area Skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />

        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-2xl border border-border bg-surface p-6 text-center w-full max-w-md animate-pulse">
            <div className="h-4 w-48 bg-muted rounded mx-auto mb-4" />
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-36 rounded-full bg-muted"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Input Area Skeleton */}
        <div className="mt-2">
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-surface border border-border animate-pulse">
            <div className="w-9 h-9 rounded bg-muted" />
            <div className="flex-1 h-5 bg-muted rounded" />
            <div className="w-9 h-9 rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
