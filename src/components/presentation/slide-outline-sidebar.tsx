"use client";

import { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SlideRenderer } from "./slide-renderer";
import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";

export interface SidebarSlide {
  id: number;
  sortOrder: number;
  layout?: SlideLayout | null;
  title?: string | null;
  subtitle?: string | null;
  contentBlocks?: ContentBlock[];
}

interface SlideOutlineSidebarProps {
  slides: SidebarSlide[];
  activeSlideId: number | null;
  themeKey: string;
  themeConfig?: ThemeConfig;
  onSelectSlide: (id: number) => void;
  onAddSlide: () => void;
  onDeleteSlide: (id: number) => void;
}

export function SlideOutlineSidebar({
  slides,
  activeSlideId,
  themeKey,
  themeConfig,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
}: SlideOutlineSidebarProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <aside className="w-64 shrink-0 glass-panel border-r border-border flex flex-col">
      <div className="flex items-center gap-3 p-4 pb-3">
        <h2 className="font-semibold text-ink text-sm">Slides</h2>
        <span className="text-xs text-ink-muted">{slides.length}</span>
        <button
          onClick={onAddSlide}
          className="ml-auto p-1.5 rounded-lg text-brand hover:bg-brand/10 transition-colors"
          title="Add slide"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(slide.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button
              onClick={() => onSelectSlide(slide.id)}
              className={cn(
                "w-full rounded-lg overflow-hidden border-2 transition-all text-left",
                activeSlideId === slide.id
                  ? "border-brand ring-1 ring-brand/30"
                  : "border-border hover:border-brand/40"
              )}
            >
              <div className="pointer-events-none">
                <SlideRenderer
                  title={slide.title}
                  subtitle={slide.subtitle}
                  layout={(slide.layout as SlideLayout) ?? "title_content"}
                  contentBlocks={slide.contentBlocks ?? []}
                  themeKey={themeKey}
                  themeConfig={themeConfig}
                  scale={0.35}
                />
              </div>
              <div className="px-2 py-1.5 bg-surface">
                <p className="text-[10px] text-ink-muted truncate">
                  {idx + 1}. {slide.title || "Untitled"}
                </p>
              </div>
            </button>

            {hoveredId === slide.id && slides.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSlide(slide.id);
                }}
                className="absolute top-1 right-1 p-1 rounded bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete slide"
              >
                <Trash size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
