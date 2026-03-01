"use client";

import { useSlidesStore } from "@/stores/slides-store";
import { ThemePicker } from "@/components/presentation/theme-picker";
import { LayoutPicker } from "@/components/presentation/layout-picker";
import { AiToolsDropdown } from "@/components/presentation/ai-tools-dropdown";
import { CoachPanel } from "@/components/presentation/coach-panel";
import { BlockPropertyEditor } from "./block-property-editor";
import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";

export function PropertiesPanel() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const selectedBlockIndex = useSlidesStore((s) => s.selectedBlockIndex);
  const selectedBlock = useSlidesStore((s) => s.getSelectedBlock());
  const slides = useSlidesStore((s) => s.slides);
  const deckId = useSlidesStore((s) => s.deckId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const setTheme = useSlidesStore((s) => s.setTheme);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);

  // Show block-specific editor when a non-text block is selected
  const showBlockEditor =
    selectedBlockIndex !== null &&
    selectedBlock !== null &&
    !["text", "bullets", "quote"].includes(selectedBlock.type);

  return (
    <aside className="w-72 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto">
      <div className="p-4 space-y-5">
        {/* Block Properties — shown when a non-text block is selected */}
        {showBlockEditor && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Block Properties
            </h3>
            <BlockPropertyEditor />
          </div>
        )}

        {/* Theme */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Theme
          </h3>
          <ThemePicker
            activeKey={themeKey}
            onChange={(key: string, config: ThemeConfig) => setTheme(key, config)}
          />
        </div>

        {/* Layout */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Layout
          </h3>
          <LayoutPicker
            active={activeSlide?.layout ?? "title_content"}
            onChange={(layout: SlideLayout) => {
              if (activeSlide) updateSlide(activeSlide.id, { layout });
            }}
          />
        </div>

        {/* AI Tools */}
        {activeSlide && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              AI Tools
            </h3>
            <AiToolsDropdown
              title={activeSlide.title}
              subtitle={activeSlide.subtitle}
              contentBlocks={activeSlide.contentBlocks}
              speakerNotes={activeSlide.speakerNotes}
              onApply={(blocks: ContentBlock[], notes?: string) => {
                updateSlide(activeSlide.id, {
                  contentBlocks: blocks,
                  ...(notes && { speakerNotes: notes }),
                });
              }}
            />
          </div>
        )}

        {/* Coach */}
        {deckId && (
          <div>
            <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
              Coach
            </h3>
            <CoachPanel
              deckId={deckId}
              audienceType={audienceType}
              slides={slides.map((s) => ({
                id: s.id,
                title: s.title,
                subtitle: s.subtitle,
                layout: s.layout,
                contentBlocks: s.contentBlocks,
                speakerNotes: s.speakerNotes,
              }))}
              onNavigateToSlide={setActiveSlide}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
