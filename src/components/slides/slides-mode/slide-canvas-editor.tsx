"use client";

import { useSlidesStore } from "@/stores/slides-store";
import { SlideRendererV2 } from "../shared/slide-renderer-v2";
import { ContentBlockEditor } from "@/components/presentation/content-block-editor";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";

interface SlideCanvasEditorProps {
  isEditing: boolean;
}

export function SlideCanvasEditor({ isEditing }: SlideCanvasEditorProps) {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const masters = useSlidesStore((s) => s.masters);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;

  if (!activeSlide) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-ink-muted">Select a slide to start editing</p>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">
          <SlideRendererV2
            title={activeSlide.title}
            subtitle={activeSlide.subtitle}
            layout={activeSlide.layout}
            masterId={activeSlide.masterId}
            masters={masters}
            contentBlocks={activeSlide.contentBlocks}
            cardBackground={activeSlide.cardBackground}
            themeKey={themeKey}
            themeConfig={themeConfig}
            scale={1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-start justify-center p-6 overflow-auto">
      <div className="w-full max-w-4xl">
        {/* Live preview */}
        <div className="rounded-2xl shadow-xl overflow-hidden mb-4">
          <SlideRendererV2
            title={activeSlide.title}
            subtitle={activeSlide.subtitle}
            layout={activeSlide.layout}
            masterId={activeSlide.masterId}
            masters={masters}
            contentBlocks={activeSlide.contentBlocks}
            cardBackground={activeSlide.cardBackground}
            themeKey={themeKey}
            themeConfig={themeConfig}
            scale={1}
          />
        </div>

        {/* Editor panel */}
        <div className="bg-surface rounded-xl border border-border p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">
              Title
            </label>
            <input
              value={activeSlide.title}
              onChange={(e) => updateSlide(activeSlide.id, { title: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="Slide title"
            />
          </div>

          {/* Subtitle (for layouts that show it) */}
          {(activeSlide.layout === "title_slide" ||
            activeSlide.layout === "title_content" ||
            activeSlide.layout === "section_header") && (
            <div>
              <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">
                Subtitle
              </label>
              <input
                value={activeSlide.subtitle}
                onChange={(e) =>
                  updateSlide(activeSlide.id, { subtitle: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Subtitle"
              />
            </div>
          )}

          {/* Content blocks */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-2 block">
              Content Blocks
            </label>
            <ContentBlockEditor
              blocks={activeSlide.contentBlocks}
              theme={theme as ThemeConfig}
              onChange={(blocks: ContentBlock[]) =>
                updateSlide(activeSlide.id, { contentBlocks: blocks })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
