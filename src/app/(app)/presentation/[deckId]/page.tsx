"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  getDeck,
  updateDeck,
  createSlide,
  updateSlide as updateSlideAction,
  deleteSlide as deleteSlideAction,
} from "@/lib/actions/presentations";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";

import { SlideOutlineSidebar, type SidebarSlide } from "@/components/presentation/slide-outline-sidebar";
import { SlideCanvas } from "@/components/presentation/slide-canvas";
import { DesignPanel } from "@/components/presentation/design-panel";
import { SlideToolbar } from "@/components/presentation/slide-toolbar";
import { SpeakerNotesPanel } from "@/components/presentation/speaker-notes-panel";
import { AiToolsDropdown } from "@/components/presentation/ai-tools-dropdown";
import { CoachPanel } from "@/components/presentation/coach-panel";

export default function DeckEditorPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = Number(params.deckId);

  const [deck, setDeck] = useState<any>(null);
  const [slides, setSlides] = useState<any[]>([]);
  const [activeSlideId, setActiveSlideId] = useState<number | null>(null);
  const [themeKey, setThemeKey] = useState("modern");
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | undefined>();
  const [isEditing, setIsEditing] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Save timer for debouncing
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  async function loadDeck() {
    try {
      const data = await getDeck(deckId);
      if (!data) {
        router.push("/presentation");
        return;
      }
      setDeck(data);
      setSlides(data.slides);
      setThemeKey(data.theme ?? "modern");
      setThemeConfig(data.themeConfig as ThemeConfig | undefined);
      if (data.slides.length > 0) {
        setActiveSlideId(data.slides[0].id);
      }
    } catch (err) {
      console.error("Failed to load deck:", err);
      router.push("/presentation");
    } finally {
      setLoading(false);
    }
  }

  const activeSlide = slides.find((s) => s.id === activeSlideId);

  const debouncedSaveSlide = useCallback(
    (slideId: number, data: any) => {
      if (saveTimer) clearTimeout(saveTimer);
      const timer = setTimeout(async () => {
        await updateSlideAction(slideId, data);
      }, 800);
      setSaveTimer(timer);
    },
    [saveTimer]
  );

  function updateLocalSlide(slideId: number, data: Partial<any>) {
    setSlides((prev) =>
      prev.map((s) => (s.id === slideId ? { ...s, ...data } : s))
    );
    debouncedSaveSlide(slideId, data);
  }

  async function handleAddSlide() {
    const newOrder = slides.length;
    const slide = await createSlide({
      deckId,
      sortOrder: newOrder,
      layout: "title_content",
      title: "New Slide",
      contentBlocks: [
        { type: "text", data: { text: "Click to add content", style: "body" } },
      ],
    });
    setSlides((prev) => [...prev, slide]);
    setActiveSlideId(slide.id);
  }

  async function handleDeleteSlide(slideId: number) {
    await deleteSlideAction(slideId);
    setSlides((prev) => {
      const filtered = prev.filter((s) => s.id !== slideId);
      if (activeSlideId === slideId && filtered.length > 0) {
        setActiveSlideId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveSlideId(null);
      }
      return filtered;
    });
  }

  function handleThemeChange(key: string, config: ThemeConfig) {
    setThemeKey(key);
    setThemeConfig(config);
    updateDeck(deckId, { theme: key, themeConfig: config });
  }

  function handleLayoutChange(layout: SlideLayout) {
    if (!activeSlideId) return;
    updateLocalSlide(activeSlideId, { layout });
  }

  function getExportPayload() {
    return {
      title: deck?.title ?? "Presentation",
      themeConfig: themeConfig ?? PRESET_THEMES[themeKey],
      slides: slides.map((s) => ({
        title: s.title ?? "",
        subtitle: s.subtitle ?? "",
        layout: s.layout ?? "title_content",
        contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
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
      a.download = `${deck?.title ?? "Presentation"}.pptx`;
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
      a.download = `${deck?.title ?? "Presentation"}_handout.pdf`;
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

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-7rem)] -m-6 -mt-0 items-center justify-center">
        <div className="text-sm text-ink-muted">Loading presentation...</div>
      </div>
    );
  }

  const sidebarSlides: SidebarSlide[] = slides.map((s) => ({
    id: s.id,
    sortOrder: s.sortOrder,
    layout: s.layout,
    title: s.title,
    subtitle: s.subtitle,
    contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
  }));

  return (
    <div className="flex h-[calc(100vh-7rem)] -m-6 -mt-0">
      {/* Left sidebar */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 p-3 border-b border-border">
          <Link
            href="/presentation"
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <h2 className="text-xs font-medium text-ink truncate max-w-[160px]">
            {deck?.title}
          </h2>
        </div>
        <SlideOutlineSidebar
          slides={sidebarSlides}
          activeSlideId={activeSlideId}
          themeKey={themeKey}
          themeConfig={themeConfig}
          onSelectSlide={setActiveSlideId}
          onAddSlide={handleAddSlide}
          onDeleteSlide={handleDeleteSlide}
        />
      </div>

      {/* Center: Canvas */}
      <main className="flex-1 flex flex-col overflow-hidden bg-surface-raised/30">
        <SlideToolbar
          isEditing={isEditing}
          exporting={exporting}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onExportPptx={handleExportPptx}
          onExportPdf={handleExportPdf}
        />

        <SlideCanvas
          slideId={activeSlideId}
          title={activeSlide?.title}
          subtitle={activeSlide?.subtitle}
          layout={activeSlide?.layout}
          contentBlocks={(activeSlide?.contentBlocks as ContentBlock[]) ?? []}
          themeKey={themeKey}
          themeConfig={themeConfig}
          isEditing={isEditing}
          onUpdateTitle={(title) =>
            activeSlideId && updateLocalSlide(activeSlideId, { title })
          }
          onUpdateSubtitle={(subtitle) =>
            activeSlideId && updateLocalSlide(activeSlideId, { subtitle })
          }
          onUpdateContentBlocks={(contentBlocks) =>
            activeSlideId && updateLocalSlide(activeSlideId, { contentBlocks })
          }
        />

        <SpeakerNotesPanel
          notes={activeSlide?.speakerNotes ?? ""}
          onChange={(speakerNotes) =>
            activeSlideId && updateLocalSlide(activeSlideId, { speakerNotes })
          }
        />
      </main>

      {/* Right sidebar */}
      <DesignPanel
        activeThemeKey={themeKey}
        activeLayout={activeSlide?.layout}
        onThemeChange={handleThemeChange}
        onLayoutChange={handleLayoutChange}
        aiToolsSlot={
          activeSlide ? (
            <AiToolsDropdown
              title={activeSlide.title}
              subtitle={activeSlide.subtitle}
              contentBlocks={(activeSlide.contentBlocks as ContentBlock[]) ?? []}
              speakerNotes={activeSlide.speakerNotes}
              onApply={(blocks, notes) => {
                if (activeSlideId) {
                  updateLocalSlide(activeSlideId, {
                    contentBlocks: blocks,
                    ...(notes && { speakerNotes: notes }),
                  });
                }
              }}
            />
          ) : undefined
        }
        coachSlot={
          <CoachPanel
            deckId={deckId}
            audienceType={deck?.audienceType ?? "general"}
            slides={slides.map((s) => ({
              id: s.id,
              title: s.title,
              subtitle: s.subtitle,
              layout: s.layout,
              contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
              speakerNotes: s.speakerNotes,
            }))}
            onNavigateToSlide={setActiveSlideId}
          />
        }
      />
    </div>
  );
}
