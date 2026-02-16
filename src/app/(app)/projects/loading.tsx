import { Skeleton, SkeletonTable } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>
      <SkeletonTable rows={6} />
    </div>
  );
}
