import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function PresentationLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <Skeleton className="h-8 w-56 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
