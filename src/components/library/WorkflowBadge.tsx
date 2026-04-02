"use client";

import type { WorkflowState } from "@/lib/library";
import { cn } from "@/lib/utils";

const STATE_CONFIG: Record<WorkflowState, { label: string; colorVar: string }> = {
  inbox: { label: "Inbox", colorVar: "var(--state-inbox)" },
  core: { label: "Core", colorVar: "var(--state-core)" },
  background: { label: "Background", colorVar: "var(--state-background)" },
  archived: { label: "Archived", colorVar: "var(--state-archived)" },
};

export function WorkflowBadge({
  state,
  className,
}: {
  state: WorkflowState;
  className?: string;
}) {
  const config = STATE_CONFIG[state];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", className)}>
      <span
        className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: config.colorVar }}
      />
      <span className="text-ink-muted">{config.label}</span>
    </span>
  );
}
