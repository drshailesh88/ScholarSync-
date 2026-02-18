import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="w-8 h-8 rounded bg-brand flex items-center justify-center">
        <span className="font-serif text-white font-bold text-lg leading-none">S</span>
      </div>
      <span className="font-serif font-semibold tracking-tight text-shell-active">
        ScholarSync
      </span>
    </div>
  );
}
