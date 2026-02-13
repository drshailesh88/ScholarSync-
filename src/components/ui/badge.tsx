import { cn } from "@/lib/utils";

type BadgeVariant = "drafting" | "completed" | "issues" | "active" | "popular";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  drafting: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  issues: "bg-red-500/10 text-red-500 border-red-500/20",
  active: "bg-brand/10 text-brand border-brand/20",
  popular: "bg-sky-500/10 text-sky-500 border-sky-500/20",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
