import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  color?: string;
  className?: string;
  showText?: boolean;
}

export function ProgressBar({
  value,
  max,
  label,
  color,
  className,
  showText = true,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isUnlimited = max < 0;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-muted">{label}</span>
        {showText && (
          <span className="text-ink font-medium">
            {value.toLocaleString()}
            {isUnlimited ? " (Unlimited)" : ` / ${max.toLocaleString()}`}
          </span>
        )}
      </div>
      <div className="h-2 rounded-full bg-surface-raised overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: isUnlimited ? "30%" : `${percentage}%`,
            backgroundColor: color || "var(--brand)",
          }}
        />
      </div>
    </div>
  );
}
