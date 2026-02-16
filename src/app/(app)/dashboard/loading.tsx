import { Skeleton, SkeletonTable } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <section className="mb-12">
        <Skeleton className="h-4 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 border border-border">
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <SkeletonTable rows={4} />
      </section>
    </div>
  );
}
