"use client";

import { CircleNotch } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  REGENERATE_TONE_OPTIONS,
  type RegenerateTone,
} from "@/lib/slides/regenerate";

interface SlideRegenerateFormProps {
  slideTitles: string[];
  instruction: string;
  tone: RegenerateTone;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  submitLabel?: string;
  onInstructionChange: (value: string) => void;
  onToneChange: (value: RegenerateTone) => void;
  onCancel?: () => void;
  onSubmit: () => void | Promise<void>;
}

export function SlideRegenerateForm({
  slideTitles,
  instruction,
  tone,
  error,
  disabled = false,
  loading = false,
  submitLabel = "Regenerate",
  onInstructionChange,
  onToneChange,
  onCancel,
  onSubmit,
}: SlideRegenerateFormProps) {
  const slideLabel =
    slideTitles.length === 1
      ? slideTitles[0] || "Untitled slide"
      : `${slideTitles.length} slides selected`;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (disabled || loading) return;
        void onSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
          {slideTitles.length === 1 ? "Current Slide" : "Selected Slides"}
        </label>
        <div className="mt-1 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-ink">
          <div className="truncate">{slideLabel}</div>
          {slideTitles.length > 1 ? (
            <div className="mt-1 text-[11px] text-ink-muted">
              {slideTitles.slice(0, 3).join(" | ")}
              {slideTitles.length > 3 ? " | ..." : ""}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="slide-regenerate-instruction"
          className="text-[10px] font-medium uppercase tracking-wider text-ink-muted"
        >
          How should this slide be different?
        </label>
        <textarea aria-label="Regeneration instructions"
          id="slide-regenerate-instruction"
          value={instruction}
          onChange={(event) => onInstructionChange(event.target.value)}
          disabled={disabled || loading}
          rows={4}
          placeholder="Example: Focus more on clinical implications and reduce the number of bullets."
          className="mt-1 w-full resize-none rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
          Tone
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {/* empty state: renders nothing when no data */}
          {REGENERATE_TONE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={disabled || loading}
              onClick={() => onToneChange(option.value)}
              className={cn(
                "rounded-lg border px-3 py-2 text-left text-xs transition-colors",
                tone === option.value
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border text-ink-muted hover:border-brand/40 hover:bg-surface-raised hover:text-ink",
                (disabled || loading) && "cursor-not-allowed opacity-60"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="text-xs text-red-500">{error}</p> : null}

      <div className="flex justify-end gap-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-border px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={disabled || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <CircleNotch size={14} className="animate-spin" /> : null}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
