import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function LibraryLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      <aside className="w-64 shrink-0 glass-panel rounded-2xl p-4">
        <Skeleton className="h-4 w-20 mb-4 mx-2" />
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </aside>
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-11 flex-1 rounded-xl" />
          <Skeleton className="h-11 w-40 rounded-xl" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
