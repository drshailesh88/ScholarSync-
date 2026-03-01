"use client";

import { cn } from "@/lib/utils";
import type { WorkspaceMode } from "@/stores/slides-store";

interface ModeSelectorProps {
  mode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-surface-raised p-0.5 border border-border">
      <button
        onClick={() => onModeChange("slides")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
          mode === "slides"
            ? "bg-brand text-white shadow-sm"
            : "text-ink-muted hover:text-ink"
        )}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <line x1="4" y1="1" x2="4" y2="8" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        Slides
      </button>
      <button
        onClick={() => onModeChange("create")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
          mode === "create"
            ? "bg-brand text-white shadow-sm"
            : "text-ink-muted hover:text-ink"
        )}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l1.3 2.6L10 4.4l-2 1.9.5 2.7L6 7.8 3.5 9l.5-2.7-2-1.9 2.7-.8L6 1z" stroke="currentColor" strokeWidth="1.0" fill="none" />
        </svg>
        Create
      </button>
    </div>
  );
}

/**
 * Full-screen mode selection for first-time entry.
 */
export function ModeSelectionScreen({ onSelect }: { onSelect: (mode: WorkspaceMode) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-ink mb-2">How do you want to work?</h2>
        <p className="text-sm text-ink-muted">You can switch anytime with the toggle</p>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => onSelect("slides")}
          className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-border hover:border-brand bg-surface hover:bg-brand/5 transition-all w-64"
        >
          <div className="w-16 h-16 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="4" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2" className="text-brand" />
              <line x1="11" y1="4" x2="11" y2="22" stroke="currentColor" strokeWidth="1.5" className="text-brand" />
              <rect x="14" y="8" width="12" height="3" rx="1" fill="currentColor" className="text-brand/30" />
              <rect x="14" y="13" width="8" height="2" rx="0.5" fill="currentColor" className="text-brand/20" />
              <rect x="14" y="17" width="10" height="2" rx="0.5" fill="currentColor" className="text-brand/20" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
              Slides Mode
            </div>
            <div className="text-xs text-ink-muted mt-1">
              Click and build like PowerPoint
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect("create")}
          className="group flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-border hover:border-brand bg-surface hover:bg-brand/5 transition-all w-64"
        >
          <div className="w-16 h-16 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4l3.5 7 7.5 2.2-5.4 5.2 1.3 7.6L16 22.2 9.1 26l1.3-7.6L5 13.2l7.5-2.2L16 4z" stroke="currentColor" strokeWidth="2" fill="none" className="text-brand" />
              <circle cx="16" cy="15" r="2" fill="currentColor" className="text-brand/40" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
              Create Mode
            </div>
            <div className="text-xs text-ink-muted mt-1">
              AI builds it, you refine
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
