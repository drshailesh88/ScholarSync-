import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingLoading() {
  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          {/* empty state: renders nothing when no data */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-1 rounded-full flex-1" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-2xl" />
        <div className="flex items-center justify-between mt-6">
          <Skeleton className="h-10 w-20 rounded-xl" />
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
