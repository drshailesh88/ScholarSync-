import { Skeleton } from "@/components/ui/skeleton";

export default function SlidesNewLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48 rounded-xl" />
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  );
}
