import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function ResearchLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-12 w-full rounded-xl mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
