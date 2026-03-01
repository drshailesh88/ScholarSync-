"use client";

import { useRef, useCallback } from "react";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import { BLOCK_REGISTRY } from "@/components/slides/blocks";

export function CardStack() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const themeConfig = useSlidesStore((s) => s.themeConfig);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddSlide = useCallback(
    async (afterId?: number) => {
      await addSlide(afterId);
    },
    [addSlide],
  );

  // Empty state
  if (slides.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center overflow-y-auto">
        <button
          onClick={() => handleAddSlide()}
          className="flex flex-col items-center gap-3 px-8 py-6 rounded-xl border-2 border-dashed border-border hover:border-brand hover:bg-brand/5 transition-colors group"
        >
          <PlusCircle
            size={40}
            weight="duotone"
            className="text-ink-muted group-hover:text-brand transition-colors"
          />
          <span className="text-sm font-medium text-ink-muted group-hover:text-brand transition-colors">
            Add your first card
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-16"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        {slides.map((slide, index) => {
          const isActive = slide.id === activeSlideId;

          return (
            <div key={slide.id} className="flex flex-col items-center">
              {/* Card */}
              <button
                type="button"
                onClick={() => setActiveSlide(slide.id)}
                className={`
                  w-full text-left rounded-xl shadow-md transition-all duration-150
                  border-2 overflow-hidden cursor-pointer
                  ${isActive ? "border-brand ring-1 ring-brand/30" : "border-transparent hover:border-border"}
                `}
                style={{
                  backgroundColor:
                    themeConfig.surfaceColor ?? themeConfig.backgroundColor,
                  color: themeConfig.textColor,
                }}
              >
                {/* Accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                />

                {/* Card body */}
                <div className="p-6 md:p-8">
                  {/* Title */}
                  {slide.title && (
                    <h2
                      className="text-xl md:text-2xl font-bold mb-4 leading-tight"
                      style={{
                        color: themeConfig.primaryColor,
                        fontFamily:
                          themeConfig.headingFontFamily ??
                          themeConfig.fontFamily ??
                          undefined,
                      }}
                    >
                      {slide.title}
                    </h2>
                  )}

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p
                      className="text-sm md:text-base mb-4 opacity-70"
                      style={{
                        fontFamily: themeConfig.fontFamily ?? undefined,
                      }}
                    >
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Content blocks */}
                  {slide.contentBlocks.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {slide.contentBlocks.map((block, blockIndex) => {
                        const entry = BLOCK_REGISTRY[block.type];
                        if (!entry) return null;
                        const Renderer = entry.render;
                        return (
                          <Renderer
                            key={blockIndex}
                            data={
                              block.data as Record<string, unknown>
                            }
                            theme={themeConfig}
                            scale={1}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </button>

              {/* Insert button between cards */}
              {index < slides.length - 1 && (
                <InsertButton
                  onClick={() => handleAddSlide(slide.id)}
                />
              )}
            </div>
          );
        })}

        {/* Insert button at the end */}
        <div className="flex justify-center pt-2 pb-8">
          <InsertButton onClick={() => handleAddSlide(slides[slides.length - 1]?.id)} />
        </div>
      </div>
    </div>
  );
}

/** Small "+" button that appears on hover between cards */
function InsertButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="group flex items-center justify-center w-full py-1">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
          opacity-0 group-hover:opacity-100 focus:opacity-100
          text-ink-muted hover:text-brand hover:bg-brand/10
          transition-all duration-150"
      >
        <Plus size={14} weight="bold" />
        <span>Add card</span>
      </button>
    </div>
  );
}
