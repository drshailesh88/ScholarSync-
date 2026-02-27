"use client";

import { useState } from "react";
import {
  Play,
  Stack,
  Rows,
  Eye,
  Prohibit,
  Check,
  CircleNotch,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ANIMATION_PRESETS } from "@/lib/presentation/animation-presets";
import type { AnimationPresetKey, ContentBlock } from "@/types/presentation";
import { applyAnimationPreset } from "@/lib/presentation/animation-presets";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnimationPickerProps {
  /** Currently active preset key (if any) */
  activePreset?: AnimationPresetKey;
  /** Content blocks of the current slide (used to apply preset) */
  currentSlideBlocks: ContentBlock[];
  /** Called when the user applies a preset to the current slide */
  onApplyToSlide: (blocks: ContentBlock[], presetKey: AnimationPresetKey) => void;
  /** Called when the user applies a preset to all slides */
  onApplyToAll: (presetKey: AnimationPresetKey) => void;
}

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const PRESET_ICONS: Record<AnimationPresetKey, React.ReactNode> = {
  sequential_build: <Stack size={16} weight="bold" />,
  fade_all: <Eye size={16} weight="bold" />,
  stagger: <Rows size={16} weight="bold" />,
  results_reveal: <Play size={16} weight="bold" />,
  none: <Prohibit size={16} weight="bold" />,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AnimationPicker({
  activePreset,
  currentSlideBlocks,
  onApplyToSlide,
  onApplyToAll,
}: AnimationPickerProps) {
  const [selected, setSelected] = useState<AnimationPresetKey>(activePreset ?? "none");
  const [applyingAll, setApplyingAll] = useState(false);

  function handleApplyToSlide() {
    const updated = applyAnimationPreset(currentSlideBlocks, selected);
    onApplyToSlide(updated, selected);
  }

  function handleApplyToAll() {
    setApplyingAll(true);
    // Give the parent time to process all slides
    onApplyToAll(selected);
    setTimeout(() => setApplyingAll(false), 600);
  }

  return (
    <div className="space-y-3">
      {/* Preset grid */}
      <div className="grid grid-cols-1 gap-1.5">
        {ANIMATION_PRESETS.map((preset) => {
          const isActive = selected === preset.key;
          return (
            <button
              key={preset.key}
              onClick={() => setSelected(preset.key)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all",
                isActive
                  ? "bg-brand/10 text-brand border border-brand/30"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised border border-transparent hover:border-border"
              )}
            >
              <span className={cn("shrink-0", isActive ? "text-brand" : "text-ink-muted")}>
                {PRESET_ICONS[preset.key]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">{preset.label}</p>
                <p className="text-[10px] opacity-60 truncate">{preset.description}</p>
              </div>
              {isActive && (
                <Check size={14} weight="bold" className="text-brand shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleApplyToSlide}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
        >
          Apply to Slide
        </button>
        <button
          onClick={handleApplyToAll}
          disabled={applyingAll}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-colors",
            "border border-brand/40 text-brand hover:bg-brand/5",
            applyingAll && "opacity-60 cursor-not-allowed"
          )}
        >
          {applyingAll ? (
            <CircleNotch size={12} className="animate-spin" />
          ) : null}
          Apply to All
        </button>
      </div>
    </div>
  );
}
