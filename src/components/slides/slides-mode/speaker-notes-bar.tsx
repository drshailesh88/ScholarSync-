"use client";

import { useState } from "react";
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";

export function SpeakerNotesBar() {
  const [expanded, setExpanded] = useState(false);
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  if (!activeSlide) return null;

  return (
    <div className="border-t border-border bg-surface">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-1.5 text-xs text-ink-muted hover:text-ink transition-colors"
      >
        {expanded ? <CaretDown size={10} /> : <CaretUp size={10} />}
        Speaker Notes
      </button>
      {expanded && (
        <div className="px-4 pb-3">
          <textarea
            value={activeSlide.speakerNotes}
            onChange={(e) =>
              updateSlide(activeSlide.id, { speakerNotes: e.target.value })
            }
            placeholder="Click to add speaker notes..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
          />
        </div>
      )}
    </div>
  );
}
