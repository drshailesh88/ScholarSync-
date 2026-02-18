import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-surface border border-border rounded", className)} {...props}>
      {children}
    </div>
  );
}
