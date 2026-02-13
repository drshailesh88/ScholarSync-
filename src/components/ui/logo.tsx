import { SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white">
        <SquaresFour size={18} weight="fill" />
      </div>
      <span className="font-semibold tracking-tight text-ink">
        ScholarSync
      </span>
    </div>
  );
}
