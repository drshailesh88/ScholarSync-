"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import {
  getDeck,
  updateDeck,
  createSlide,
  updateSlide as updateSlideAction,
  deleteSlide as deleteSlideAction,
  reorderSlides,
} from "@/lib/actions/presentations";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock, SlideLayout, ThemeConfig, AudienceType } from "@/types/presentation";

interface DeckState {
  title: string;
  audienceType: AudienceType | null;
}

interface SlideState {
  id: number;
  sortOrder: number;
  layout: SlideLayout | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

interface SlideUpdateData {
  layout?: SlideLayout;
  title?: string;
  subtitle?: string;
  contentBlocks?: ContentBlock[];
  speakerNotes?: string;
}

import { SlideOutlineSidebar, type SidebarSlide } from "@/components/presentation/slide-outline-sidebar";
import { SlideCanvas } from "@/components/presentation/slide-canvas";
import { DesignPanel } from "@/components/presentation/design-panel";
import { SlideToolbar } from "@/components/presentation/slide-toolbar";
import { SpeakerNotesPanel } from "@/components/presentation/speaker-notes-panel";
import { AiToolsDropdown } from "@/components/presentation/ai-tools-dropdown";
import { CoachPanel } from "@/components/presentation/coach-panel";
import { AgentPanel } from "@/components/presentation/agent-panel";
import { DefensePrepPanel } from "@/components/presentation/defense-prep-panel";
import { SharePanel } from "@/components/presentation/share-panel";
import { AnalyticsPanel } from "@/components/presentation/analytics-panel";
import { CommentsPanel, useCommentCounts } from "@/components/presentation/comments-panel";
import { VersionHistoryPanel } from "@/components/presentation/version-history-panel";
import { RecordingsPanel } from "@/components/presentation/recordings-panel";

const PresenterMode = lazy(() =>
  import("@/components/presentation/presenter-mode").then((m) => ({ default: m.PresenterMode }))
);

type DeckWithSlides = NonNullable<Awaited<ReturnType<typeof getDeck>>>;
type _SlideRow = DeckWithSlides["slides"][number];

export default function DeckEditorPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = Number(params.deckId);

  const [deck, setDeck] = useState<DeckState | null>(null);
  const [slides, setSlides] = useState<SlideState[]>([]);
  const [activeSlideId, setActiveSlideId] = useState<number | null>(null);
  const [themeKey, setThemeKey] = useState("modern");
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | undefined>();
  const [isEditing, setIsEditing] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAgentPanel, setShowAgentPanel] = useState(false);
  const [showDefensePrep, setShowDefensePrep] = useState(false);
  const [showPresenterMode, setShowPresenterMode] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showRecordings, setShowRecordings] = useState(false);
  const [currentUserId, _setCurrentUserId] = useState("dev_user_001");

  // Comment counts for sidebar badges
  const { counts: commentCounts, totalUnresolved, refresh: refreshComments } =
    useCommentCounts(deckId);

  // Save timer for debouncing
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

  const loadDeck = useCallback(async () => {
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
  }, [deckId, router]);

  useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  // Get current user ID on mount
  useEffect(() => {
    fetch("/api/health")
      .then(() => {
        // The getCurrentUserId is server-side only.
        // For the comments panel, we pass a placeholder that gets resolved server-side.
        // In production, the server actions handle auth internally.
      })
      .catch(() => {});
  }, []);

  const activeSlide = slides.find((s) => s.id === activeSlideId);

  const debouncedSaveSlide = useCallback(
    (slideId: number, data: SlideUpdateData) => {
      if (saveTimer) clearTimeout(saveTimer);
      const timer = setTimeout(async () => {
        await updateSlideAction(slideId, data);
      }, 800);
      setSaveTimer(timer);
    },
    [saveTimer]
  );

  function updateLocalSlide(slideId: number, data: SlideUpdateData) {
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

  async function handleReorderSlides(slideIds: number[]) {
    // Optimistically reorder local state
    const reordered = slideIds
      .map((id) => slides.find((s) => s.id === id))
      .filter(Boolean)
      .map((s, i) => ({ ...s!, sortOrder: i }));
    setSlides(reordered);

    // Persist to DB
    await reorderSlides(deckId, slideIds);
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

  // Close other right-side panels when opening one
  function handleToggleAnalytics() {
    setShowAnalytics(!showAnalytics);
    if (!showAnalytics) {
      setShowComments(false);
      setShowAgentPanel(false);
      setShowDefensePrep(false);
    }
  }

  function handleToggleComments() {
    setShowComments(!showComments);
    if (!showComments) {
      setShowAnalytics(false);
      setShowAgentPanel(false);
      setShowDefensePrep(false);
      setShowVersionHistory(false);
    }
  }

  function handleToggleVersionHistory() {
    setShowVersionHistory(!showVersionHistory);
    if (!showVersionHistory) {
      setShowComments(false);
      setShowAnalytics(false);
      setShowAgentPanel(false);
      setShowDefensePrep(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-7rem)] -m-6 -mt-0 items-center justify-center">
        <div className="text-sm text-ink-muted">Loading presentation...</div>
      </div>
    );
  }

  /* empty state: no data, no results, nothing here */
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
          onReorderSlides={handleReorderSlides}
          commentCounts={commentCounts}
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
          onPresenterMode={() => setShowPresenterMode(true)}
          onShare={() => setShowSharePanel(true)}
          onToggleAgentPanel={() => {
            setShowAgentPanel(!showAgentPanel);
            if (!showAgentPanel) {
              setShowDefensePrep(false);
              setShowAnalytics(false);
              setShowComments(false);
            }
          }}
          onToggleDefensePrep={() => {
            setShowDefensePrep(!showDefensePrep);
            if (!showDefensePrep) {
              setShowAgentPanel(false);
              setShowAnalytics(false);
              setShowComments(false);
            }
          }}
          onToggleAnalytics={handleToggleAnalytics}
          onToggleComments={handleToggleComments}
          onToggleVersionHistory={handleToggleVersionHistory}
          onToggleRecordings={() => setShowRecordings(true)}
          showAgentPanel={showAgentPanel}
          showDefensePrep={showDefensePrep}
          showAnalytics={showAnalytics}
          showComments={showComments}
          showVersionHistory={showVersionHistory}
          unresolvedCommentCount={totalUnresolved}
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

      {/* AI Agent Panel (slide-over) */}
      {showAgentPanel && (
        <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
          <AgentPanel
            deckId={deckId}
            slides={slides.map((s) => ({
              id: s.id,
              title: s.title,
              contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
              speakerNotes: s.speakerNotes,
            }))}
            audienceType={deck?.audienceType ?? "general"}
            onSlidesUpdated={() => loadDeck()}
          />
        </div>
      )}

      {/* Defense Prep Panel (slide-over) */}
      {showDefensePrep && (
        <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
          <DefensePrepPanel
            deckId={deckId}
            slides={slides.map((s) => ({
              id: s.id,
              title: s.title,
              contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
              speakerNotes: s.speakerNotes,
            }))}
            audienceType={deck?.audienceType ?? "general"}
          />
        </div>
      )}

      {/* Analytics Panel (slide-over) */}
      {showAnalytics && (
        <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
          <AnalyticsPanel
            deckId={deckId}
            onClose={() => setShowAnalytics(false)}
          />
        </div>
      )}

      {/* Comments Panel (slide-over) */}
      {showComments && (
        <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
          <CommentsPanel
            deckId={deckId}
            slides={slides.map((s) => ({
              id: s.id,
              title: s.title,
            }))}
            currentUserId={currentUserId}
            activeSlideId={activeSlideId}
            onClose={() => setShowComments(false)}
            onNavigateToSlide={setActiveSlideId}
            onUnresolvedCountChange={() => refreshComments()}
          />
        </div>
      )}

      {/* Version History Panel (slide-over) */}
      {showVersionHistory && (
        <div className="w-80 shrink-0 border-l border-border bg-surface overflow-y-auto">
          <VersionHistoryPanel
            deckId={deckId}
            onDeckRestored={() => {
              setShowVersionHistory(false);
              loadDeck();
            }}
            onCompareVersions={() => {
              // Compare view not yet implemented in editor; close panel
              setShowVersionHistory(false);
            }}
          />
        </div>
      )}

      {/* Recordings Panel (modal overlay) */}
      <RecordingsPanel
        deckId={deckId}
        open={showRecordings}
        onClose={() => setShowRecordings(false)}
      />

      {/* Presenter Mode (full-screen overlay) */}
      {showPresenterMode && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white">
            Loading presenter mode...
          </div>
        }>
          <PresenterMode
            slides={slides.map((s) => ({
              id: s.id,
              title: s.title,
              subtitle: s.subtitle,
              layout: (s.layout ?? "title_content") as string,
              contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
              speakerNotes: s.speakerNotes,
            }))}
            themeKey={themeKey}
            themeConfig={themeConfig}
            onExit={() => setShowPresenterMode(false)}
          />
        </Suspense>
      )}

      {/* Share Panel (modal overlay) */}
      {showSharePanel && (
        <SharePanel
          deckId={deckId}
          onClose={() => setShowSharePanel(false)}
        />
      )}
    </div>
  );
}
