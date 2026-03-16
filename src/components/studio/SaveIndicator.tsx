"use client";

import { Check, CircleNotch, CloudCheck, Warning } from "@phosphor-icons/react";
import type { SaveStatus } from "@/hooks/use-studio-document";

export function SaveIndicator({
  status,
  lastSavedAt,
}: {
  status: SaveStatus;
  lastSavedAt: Date | null;
}) {
  switch (status) {
    case "saving":
      return (
        <span className="flex items-center gap-1 text-[10px] text-ink-muted">
          <CircleNotch size={12} className="text-brand animate-spin" />
          Saving...
        </span>
      );
    case "saved":
      return (
        <span className="flex items-center gap-1 text-[10px] text-ink-muted">
          <CloudCheck size={12} className="text-emerald-500" />
          Saved{" "}
          {lastSavedAt
            ? lastSavedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </span>
      );
    case "unsaved":
      return (
        <span className="flex items-center gap-1 text-[10px] text-amber-400">
          <CircleNotch size={12} />
          Unsaved changes
        </span>
      );
    case "error":
      return (
        <span className="flex items-center gap-1 text-[10px] text-red-400">
          <Warning size={12} />
          Save failed
        </span>
      );
    default:
      if (lastSavedAt) {
        return (
          <span className="flex items-center gap-1 text-[10px] text-ink-muted">
            <Check size={12} className="text-emerald-500" />
            Saved{" "}
            {lastSavedAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      }
      return <span />;
  }
}
