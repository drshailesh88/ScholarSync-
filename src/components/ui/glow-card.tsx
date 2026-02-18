import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";

interface GlowCardProps {
  title: string;
  description: string;
  icon: Icon;
  className?: string;
}

export function GlowCard({
  title,
  description,
  icon: IconComponent,
  className,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 cursor-pointer group",
        className
      )}
    >
      <div className="w-12 h-12 rounded bg-accent-muted flex items-center justify-center text-brand mb-4 group-hover:scale-110 transition-transform">
        <IconComponent size={24} />
      </div>
      <h3 className="font-semibold text-lg text-ink mb-2">{title}</h3>
      <p className="text-ink-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}
