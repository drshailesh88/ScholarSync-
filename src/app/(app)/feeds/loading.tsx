import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function FeedsLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between mb-4 px-1">
        <Skeleton className="h-7 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>
      <div className="flex gap-4 flex-1 min-h-0">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="glass-panel rounded-2xl p-3 h-full">
            <div className="space-y-1">
              {/* empty state: renders nothing when no data */}
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </aside>
        <div className="flex-1 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
