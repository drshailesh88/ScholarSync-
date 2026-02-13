"use client";

import { cn } from "@/lib/utils";
import { SlideRenderer } from "./slide-renderer";
import { ContentBlockEditor } from "./content-block-editor";
import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";

interface SlideCanvasProps {
  slideId: number | null;
  title?: string | null;
  subtitle?: string | null;
  layout?: SlideLayout | null;
  contentBlocks?: ContentBlock[];
  speakerNotes?: string | null;
  themeKey: string;
  themeConfig?: ThemeConfig;
  isEditing: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateContentBlocks: (blocks: ContentBlock[]) => void;
}

export function SlideCanvas({
  slideId,
  title,
  subtitle,
  layout,
  contentBlocks = [],
  themeKey,
  themeConfig,
  isEditing,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateContentBlocks,
}: SlideCanvasProps) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;

  if (!slideId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-ink-muted">Select a slide to start editing</p>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
          <SlideRenderer
            title={title}
            subtitle={subtitle}
            layout={(layout as SlideLayout) ?? "title_content"}
            contentBlocks={contentBlocks}
            themeKey={themeKey}
            themeConfig={themeConfig}
            scale={1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
      <div className="w-full max-w-3xl">
        {/* Preview */}
        <div className="rounded-2xl shadow-xl overflow-hidden mb-6">
          <SlideRenderer
            title={title}
            subtitle={subtitle}
            layout={(layout as SlideLayout) ?? "title_content"}
            contentBlocks={contentBlocks}
            themeKey={themeKey}
            themeConfig={themeConfig}
            scale={1}
          />
        </div>

        {/* Editor */}
        <div className="space-y-4 bg-surface rounded-xl border border-border p-4">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">Title</label>
            <input
              value={title ?? ""}
              onChange={(e) => onUpdateTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="Slide title"
            />
          </div>

          {(layout === "title_slide" || layout === "title_content" || layout === "section_header") && (
            <div>
              <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">Subtitle</label>
              <input
                value={subtitle ?? ""}
                onChange={(e) => onUpdateSubtitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Subtitle"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-2 block">
              Content Blocks
            </label>
            <ContentBlockEditor
              blocks={contentBlocks}
              theme={theme}
              onChange={onUpdateContentBlocks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
