"use client";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Lucide or Phosphor icon component */
  icon: React.ComponentType<{ size?: number; className?: string }>;
  /** Serif title displayed with sr-panel-title */
  title: string;
  /** Description text below the title */
  description: string;
  /** Primary CTA button label */
  actionLabel?: string;
  /** Primary CTA click handler */
  onAction?: () => void;
  /** Optional tip line shown below the CTA */
  tip?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  tip,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-raised text-ink-muted">
        <Icon size={28} className="text-ink-muted" />
      </div>

      <h2 className="sr-panel-title mb-2">{title}</h2>

      <p className="max-w-md text-sm text-ink-muted mb-6">{description}</p>

      {actionLabel && onAction && (
        <button className="sr-btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}

      {tip && (
        <p className="mt-4 text-xs text-ink-muted/70 max-w-sm italic">{tip}</p>
      )}
    </div>
  );
}
