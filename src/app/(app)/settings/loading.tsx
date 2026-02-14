import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      <aside className="w-64 shrink-0 glass-panel rounded-2xl p-4">
        <Skeleton className="h-5 w-16 mb-4 mx-3" />
        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </aside>
      <div className="flex-1 space-y-6 max-w-2xl">
        <Skeleton className="h-7 w-40" />
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
