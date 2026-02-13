import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass-panel rounded-2xl", className)} {...props}>
      {children}
    </div>
  );
}
