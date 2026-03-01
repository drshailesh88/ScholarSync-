"use client";

import { useSlidesStore } from "@/stores/slides-store";
import { ThemePicker } from "@/components/presentation/theme-picker";
import { LayoutPicker } from "@/components/presentation/layout-picker";
import { AiToolsDropdown } from "@/components/presentation/ai-tools-dropdown";
import { CoachPanel } from "@/components/presentation/coach-panel";
import { BlockPropertyEditor } from "./block-property-editor";
import type { ContentBlock, SlideLayout, ThemeConfig, InstitutionKit } from "@/types/presentation";

const TRANSITION_OPTIONS: { value: "none" | "fade" | "slide" | "zoom"; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fade", label: "Fade" },
  { value: "slide", label: "Slide" },
  { value: "zoom", label: "Zoom" },
];

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
  const transition = useSlidesStore((s) => s.transition);
  const setTransition = useSlidesStore((s) => s.setTransition);
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const setInstitutionKit = useSlidesStore((s) => s.setInstitutionKit);

  const updateKit = (partial: Partial<InstitutionKit>) => {
    setInstitutionKit({ ...(institutionKit ?? {}), ...partial });
  };

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

        {/* Branding (Institution Kit) */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Branding
          </h3>
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-ink-muted block mb-0.5">Institution Name</label>
              <input
                type="text"
                value={institutionKit?.name ?? ""}
                onChange={(e) => updateKit({ name: e.target.value })}
                placeholder="e.g. Harvard Medical School"
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted block mb-0.5">Footer Text</label>
              <input
                type="text"
                value={institutionKit?.footerText ?? ""}
                onChange={(e) => updateKit({ footerText: e.target.value })}
                placeholder="e.g. Confidential — Do Not Distribute"
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted block mb-0.5">Logo URL</label>
              <input
                type="text"
                value={institutionKit?.logoUrl ?? ""}
                onChange={(e) => updateKit({ logoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full text-xs px-2 py-1.5 border border-border rounded-md bg-surface text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-brand"
              />
            </div>
          </div>
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

        {/* Transition */}
        <div>
          <h3 className="text-xs font-semibold text-ink mb-2 uppercase tracking-wider">
            Transition
          </h3>
          <div className="flex gap-1.5">
            {TRANSITION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTransition(opt.value)}
                className={`px-2.5 py-1.5 text-xs rounded-md border transition-colors ${
                  transition === opt.value
                    ? "border-brand bg-brand/10 text-brand font-medium"
                    : "border-border text-ink-muted hover:border-brand/50 hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
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
