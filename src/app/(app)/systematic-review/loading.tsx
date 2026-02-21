import { Skeleton } from "@/components/ui/skeleton";

export default function SystematicReviewLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded" />
        ))}
      </div>
      <Skeleton className="flex-1 rounded-2xl" />
    </div>
  );
}
