"use client";

import { Plus } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import { SlideThumbnail } from "../shared/slide-thumbnail";

export function SlideFilmstrip() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const deleteSlide = useSlidesStore((s) => s.deleteSlide);

  return (
    <div className="w-48 shrink-0 flex flex-col border-r border-border bg-surface">
      {/* Slide list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {slides.map((slide, index) => (
          <SlideThumbnail
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            layout={slide.layout}
            contentBlocks={slide.contentBlocks}
            themeKey={themeKey}
            themeConfig={themeConfig}
            isActive={slide.id === activeSlideId}
            slideNumber={index + 1}
            onClick={() => setActiveSlide(slide.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              // Context menu handling — for now just delete on right-click
              if (slides.length > 1 && confirm("Delete this slide?")) {
                deleteSlide(slide.id);
              }
            }}
          />
        ))}
      </div>

      {/* Add slide button */}
      <div className="p-2 border-t border-border">
        <button
          onClick={() => addSlide(activeSlideId ?? undefined)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-border text-xs text-ink-muted hover:text-brand hover:border-brand/40 transition-colors"
        >
          <Plus size={12} />
          Add Slide
        </button>
      </div>
    </div>
  );
}
