import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function NotebookLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      <aside className="w-72 shrink-0 glass-panel rounded-2xl p-4">
        <Skeleton className="h-5 w-24 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface-raised/50">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </aside>
      <div className="flex-1 glass-panel rounded-2xl p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <SkeletonText lines={6} />
      </div>
    </div>
  );
}
