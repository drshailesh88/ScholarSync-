import { Skeleton } from "@/components/ui/skeleton";

export default function ComplianceLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-6 w-36" />
        </div>
      </div>
      <Skeleton className="flex-1 rounded-2xl" />
      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-44 rounded-xl" />
      </div>
    </div>
  );
}
