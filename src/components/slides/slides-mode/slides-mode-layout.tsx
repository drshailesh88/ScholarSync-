"use client";

import { useEffect, type MouseEvent as ReactMouseEvent, useState } from "react";
import { createRoot } from "react-dom/client";
import { useSlidesStore } from "@/stores/slides-store";
import { SlideFilmstrip } from "./slide-filmstrip";
import { SlideCanvasWYSIWYG } from "../wysiwyg/slide-canvas-wysiwyg";
import { SlidesToolbar } from "./slides-toolbar";
import { SpeakerNotesBar } from "./speaker-notes-bar";
import { PropertiesPanel } from "./properties-panel";
import { SlidesAgentPanel } from "../agent/slides-agent-panel";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock } from "@/types/presentation";

import { FindReplaceDialog } from "../shared/find-replace-dialog";
import { SlideSorterView } from "../shared/slide-sorter-view";
import { registerGlobalShortcuts } from "../shared/keyboard-shortcuts";
import {
  HandoutExportDialog,
  type HandoutExportOptions,
} from "../shared/handout-export-dialog";
import {
  PresenceBridgeSlot,
} from "../shared/collaboration-slots";

// Lazy-loaded panels from existing presentation components
import { CommentsPanel, useCommentCounts } from "@/components/presentation/comments-panel";
import { VersionHistoryPanel } from "@/components/presentation/version-history-panel";
import { AnalyticsPanel } from "@/components/presentation/analytics-panel";
import { DefensePrepPanel } from "@/components/presentation/defense-prep-panel";
import { AccessibilityPanel } from "../shared/accessibility-panel";
import { SlideRendererV2 } from "../shared/slide-renderer-v2";
import {
  downloadBlob,
  exportAllSlidesAsZip,
  exportSlideAsPNG,
  exportSlideAsSVG,
} from "@/lib/presentation/slide-image-export";

function sanitizeFilename(input: string): string {
  return input.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function getPngScale(event?: ReactMouseEvent<HTMLButtonElement>): 2 | 3 {
  return event?.shiftKey ? 3 : 2;
}

export function SlidesModeLayout() {
  const [exporting, setExporting] = useState(false);
  const [showHandoutDialog, setShowHandoutDialog] = useState(false);

  useEffect(() => registerGlobalShortcuts(useSlidesStore), []);

  const deckId = useSlidesStore((s) => s.deckId);
  const title = useSlidesStore((s) => s.title);
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const masters = useSlidesStore((s) => s.masters);
  const transition = useSlidesStore((s) => s.transition);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const rightPanel = useSlidesStore((s) => s.rightPanel);
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const loadDeck = useSlidesStore((s) => s.loadDeck);
  const showFindReplace = useSlidesStore((s) => s.showFindReplace);
  const showSlideSorter = useSlidesStore((s) => s.showSlideSorter);
  const setShowSlideSorter = useSlidesStore((s) => s.setShowSlideSorter);
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());

  const { counts: _commentCounts } = useCommentCounts(deckId ?? 0);

  function getExportPayload() {
    return {
      title: title ?? "Presentation",
      themeConfig: themeConfig ?? PRESET_THEMES[themeKey],
      ...(institutionKit && { institutionKit }),
      slides: slides.map((s) => ({
        title: s.title ?? "",
        subtitle: s.subtitle ?? "",
        layout: s.layout ?? "title_content",
        contentBlocks: s.contentBlocks,
        speakerNotes: s.speakerNotes ?? "",
        transition: s.transition ?? transition,
      })),
    };
  }

  async function handleExportPptx() {
    setExporting(true);
    try {
      const res = await fetch("/api/export/pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getExportPayload()),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title ?? "Presentation"}.pptx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PPTX export error:", err);
    } finally {
      setExporting(false);
    }
  }

  function handleExportPdf() {
    setShowHandoutDialog(true);
  }

  async function handleExportHandout(options: HandoutExportOptions) {
    setExporting(true);
    try {
      const res = await fetch("/api/export/presentation-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...getExportPayload(),
          layout: options.layout,
          includeSlideNumbers: options.includeSlideNumbers,
          includeHeader: options.includeHeader,
          includeSpeakerNotes: options.includeSpeakerNotes,
          paperSize: options.paperSize,
        }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title ?? "Presentation"}_handout.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setShowHandoutDialog(false);
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setExporting(false);
    }
  }

  function getCurrentSlideElement(): HTMLElement | null {
    const surface = document.querySelector<HTMLElement>('[data-testid="slide-ruler-surface"]');
    if (!surface) return null;
    return (surface.firstElementChild as HTMLElement | null) ?? surface;
  }

  async function handleExportPng(event?: ReactMouseEvent<HTMLButtonElement>) {
    const currentSlideElement = getCurrentSlideElement();
    if (!currentSlideElement || !activeSlide) return;

    setExporting(true);
    try {
      const pngBlob = await exportSlideAsPNG(currentSlideElement, { scale: getPngScale(event) });
      const safeTitle = sanitizeFilename(title ?? "Presentation");
      const slideNumber = activeSlide.sortOrder + 1;
      downloadBlob(pngBlob, `${safeTitle}_slide_${slideNumber}.png`);
    } catch (err) {
      console.error("PNG export error:", err);
    } finally {
      setExporting(false);
    }
  }

  async function handleExportSvg() {
    const currentSlideElement = getCurrentSlideElement();
    if (!currentSlideElement || !activeSlide) return;

    setExporting(true);
    try {
      const svgMarkup = await exportSlideAsSVG(currentSlideElement);
      const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml" });
      const safeTitle = sanitizeFilename(title ?? "Presentation");
      const slideNumber = activeSlide.sortOrder + 1;
      downloadBlob(svgBlob, `${safeTitle}_slide_${slideNumber}.svg`);
    } catch (err) {
      console.error("SVG export error:", err);
    } finally {
      setExporting(false);
    }
  }

  async function handleExportAllPng(event?: ReactMouseEvent<HTMLButtonElement>) {
    if (slides.length === 0) return;

    setExporting(true);
    const sortedSlides = [...slides].sort((a, b) => a.sortOrder - b.sortOrder);
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.pointerEvents = "none";
    container.style.opacity = "0";
    document.body.appendChild(container);

    const root = createRoot(container);

    try {
      root.render(
        <div>
          {sortedSlides.map((slide, index) => (
            <div
              key={slide.id}
              data-slide-export-id={slide.id}
              style={{ width: "1920px", marginBottom: "16px" }}
            >
              <SlideRendererV2
                title={slide.title}
                subtitle={slide.subtitle}
                layout={slide.layout}
                masterId={slide.masterId}
                masters={masters}
                contentBlocks={slide.contentBlocks}
                themeKey={themeKey}
                themeConfig={themeConfig}
                cardBackground={slide.cardBackground}
                institutionKit={institutionKit}
                showSlideNumber
                slideNumber={index + 1}
                className="w-full"
              />
            </div>
          ))}
        </div>
      );

      await waitForNextFrame();
      await waitForNextFrame();
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 120));

      const slideElements: HTMLElement[] = [];
      for (const slide of sortedSlides) {
        const element = container.querySelector<HTMLElement>(
          `[data-slide-export-id="${slide.id}"]`,
        );
        if (element) slideElements.push(element);
      }

      if (slideElements.length === 0) {
        throw new Error("No slides rendered for export");
      }

      const zipBlob = await exportAllSlidesAsZip(
        slideElements,
        sortedSlides.map((slide, index) => slide.title || `Slide_${index + 1}`),
        { format: "png", scale: getPngScale(event) },
      );

      const safeTitle = sanitizeFilename(title ?? "Presentation");
      downloadBlob(zipBlob, `${safeTitle}_slides_png.zip`);
    } catch (err) {
      console.error("All-slides PNG export error:", err);
    } finally {
      root.unmount();
      container.remove();
      setExporting(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Liveblocks presence bridge — syncs store to presence */}
      <PresenceBridgeSlot />

      {/* Top toolbar */}
      <SlidesToolbar
        onExportPptx={handleExportPptx}
        onExportPdf={handleExportPdf}
        onExportPng={handleExportPng}
        onExportAllPng={handleExportAllPng}
        onExportSvg={handleExportSvg}
        exporting={exporting}
      />

      {/* Main area */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Filmstrip */}
        <SlideFilmstrip />

        {/* Center: WYSIWYG Canvas + Speaker notes */}
        <main className="flex-1 flex flex-col overflow-hidden bg-surface-raised/30">
          <SlideCanvasWYSIWYG />
          <SpeakerNotesBar />
        </main>

        {/* Right: Properties or Agent or other panels */}
        {rightPanel === "properties" && <PropertiesPanel />}

        {rightPanel === "agent" && deckId && (
          <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
            <SlidesAgentPanel />
          </div>
        )}

        {rightPanel === "defense" && deckId && (
          <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
            <DefensePrepPanel
              deckId={deckId}
              slides={slides.map((s) => ({
                id: s.id,
                title: s.title,
                contentBlocks: s.contentBlocks as ContentBlock[],
                speakerNotes: s.speakerNotes,
              }))}
              audienceType={audienceType}
            />
          </div>
        )}

        {rightPanel === "comments" && deckId && (
          <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
            <CommentsPanel
              deckId={deckId}
              slides={slides.map((s) => ({ id: s.id, title: s.title }))}
              currentUserId="dev_user_001"
              activeSlideId={activeSlideId}
              onClose={() => useSlidesStore.getState().setRightPanel(null)}
              onNavigateToSlide={setActiveSlide}
              onUnresolvedCountChange={() => {}}
            />
          </div>
        )}

        {rightPanel === "versions" && deckId && (
          <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
            <VersionHistoryPanel
              deckId={deckId}
              onDeckRestored={() => {
                useSlidesStore.getState().setRightPanel(null);
                if (deckId) loadDeck(deckId);
              }}
              onCompareVersions={() => {}}
            />
          </div>
        )}

        {rightPanel === "analytics" && deckId && (
          <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
            <AnalyticsPanel
              deckId={deckId}
              onClose={() => useSlidesStore.getState().setRightPanel(null)}
            />
          </div>
        )}

        {rightPanel === "accessibility" && <AccessibilityPanel />}
      </div>

      {/* Find & Replace overlay */}
      {showFindReplace && <FindReplaceDialog />}
      {showSlideSorter && (
        <SlideSorterView onClose={() => setShowSlideSorter(false)} />
      )}

      {/* Handout export dialog */}
      <HandoutExportDialog
        open={showHandoutDialog}
        onClose={() => setShowHandoutDialog(false)}
        onExport={handleExportHandout}
        exporting={exporting}
      />
    </div>
  );
}
