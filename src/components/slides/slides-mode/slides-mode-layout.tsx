"use client";

import { useState } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import { SlideFilmstrip } from "./slide-filmstrip";
import { SlideCanvasWYSIWYG } from "../wysiwyg/slide-canvas-wysiwyg";
import { SlidesToolbar } from "./slides-toolbar";
import { SpeakerNotesBar } from "./speaker-notes-bar";
import { PropertiesPanel } from "./properties-panel";
import { SlidesAgentPanel } from "../agent/slides-agent-panel";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock } from "@/types/presentation";

// Lazy-loaded panels from existing presentation components
import { CommentsPanel, useCommentCounts } from "@/components/presentation/comments-panel";
import { VersionHistoryPanel } from "@/components/presentation/version-history-panel";
import { AnalyticsPanel } from "@/components/presentation/analytics-panel";
import { DefensePrepPanel } from "@/components/presentation/defense-prep-panel";

export function SlidesModeLayout() {
  const [exporting, setExporting] = useState(false);

  const deckId = useSlidesStore((s) => s.deckId);
  const title = useSlidesStore((s) => s.title);
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const rightPanel = useSlidesStore((s) => s.rightPanel);
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const loadDeck = useSlidesStore((s) => s.loadDeck);

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

  async function handleExportPdf() {
    setExporting(true);
    try {
      const res = await fetch("/api/export/presentation-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getExportPayload()),
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
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top toolbar */}
      <SlidesToolbar
        onExportPptx={handleExportPptx}
        onExportPdf={handleExportPdf}
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
      </div>
    </div>
  );
}
