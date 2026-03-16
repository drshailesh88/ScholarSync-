"use client";

import { useRef, useCallback } from "react";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import type { CardBackground } from "@/stores/slides-store";
import { CardEditor } from "./card-editor";
import { CardSparkleMenu } from "./card-sparkle-menu";
import { CardBackgroundButton } from "./card-background-picker";

// ---------------------------------------------------------------------------
// Background style helpers
// ---------------------------------------------------------------------------

function buildOverlayCss(bg: CardBackground): string {
  const overlayColor = bg.overlayColor ?? "#000000";
  const intensity = bg.overlayIntensity ?? 50;
  const alpha = intensity / 100;

  switch (bg.overlayType) {
    case "frosted":
      return `linear-gradient(${overlayColor}${Math.round(alpha * 255).toString(16).padStart(2, "0")}, ${overlayColor}${Math.round(alpha * 255).toString(16).padStart(2, "0")})`;
    case "faded":
      return `linear-gradient(to bottom, ${overlayColor}${Math.round(alpha * 0.8 * 255).toString(16).padStart(2, "0")}, transparent)`;
    case "clear":
      return `linear-gradient(${overlayColor}${Math.round(alpha * 0.3 * 255).toString(16).padStart(2, "0")}, ${overlayColor}${Math.round(alpha * 0.3 * 255).toString(16).padStart(2, "0")})`;
    default:
      return "";
  }
}

function buildCardStyle(
  bg: CardBackground | undefined,
  defaultBgColor: string,
  defaultTextColor: string,
): React.CSSProperties {
  const style: React.CSSProperties = {
    backgroundColor: bg?.color ?? defaultBgColor,
    color: defaultTextColor,
  };

  if (bg?.imageUrl && bg.imagePosition === "background") {
    const overlay = bg.overlayType && bg.overlayType !== "none" ? buildOverlayCss(bg) : "";
    style.backgroundImage = overlay
      ? `${overlay}, url(${bg.imageUrl})`
      : `url(${bg.imageUrl})`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }

  return style;
}

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
          const bg = slide.cardBackground;
          const defaultBg = themeConfig.surfaceColor ?? themeConfig.backgroundColor;
          const hasImageTop = bg?.imageUrl && bg.imagePosition === "top";
          const hasImageLeft = bg?.imageUrl && bg.imagePosition === "left";
          const hasImageRight = bg?.imageUrl && bg.imagePosition === "right";
          const hasImageSide = hasImageLeft || hasImageRight;

          return (
            <div key={slide.id} className="flex flex-col items-center">
              {/* Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveSlide(slide.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveSlide(slide.id);
                  }
                }}
                className={`
                  relative w-full text-left rounded-xl shadow-md transition-all duration-150
                  border-2 overflow-hidden cursor-pointer
                  ${isActive ? "border-brand ring-1 ring-brand/30" : "border-transparent hover:border-border"}
                `}
                style={buildCardStyle(bg, defaultBg, themeConfig.textColor)}
              >
                {/* Accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                />

                {/* Per-card action buttons (active card only) */}
                {isActive && (
                  <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
                    <CardBackgroundButton slideId={slide.id} />
                    <CardSparkleMenu slideId={slide.id} />
                  </div>
                )}

                {/* Top image */}
                {hasImageTop && (
                  <div className="w-full h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt=""
                      src={bg!.imageUrl!}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Side image layout or normal body */}
                {hasImageSide ? (
                  <div
                    className={`flex ${hasImageRight ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="w-2/5 shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt=""
                        src={bg!.imageUrl!}
                        className="w-full h-full object-cover min-h-[200px]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardEditor slide={slide} isActive={isActive} />
                    </div>
                  </div>
                ) : (
                  <CardEditor slide={slide} isActive={isActive} />
                )}

                {/* Frosted glass overlay for background images */}
                {bg?.imageUrl &&
                  bg.imagePosition === "background" &&
                  bg.overlayType === "frosted" && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-xl"
                      style={{ backdropFilter: `blur(${(bg.overlayIntensity ?? 50) / 10}px)` }}
                    />
                  )}
              </div>

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
