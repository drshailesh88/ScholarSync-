"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  ArrowsOut,
  DownloadSimple,
  Palette,
  List,
} from "@phosphor-icons/react";
import { getDeck } from "@/lib/actions/presentations";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";
import type { PosterData, PosterSection } from "@/types/poster";
import { POSTER_SIZES } from "@/types/poster";
import { PosterRenderer } from "@/components/presentation/poster-renderer";
import { cn } from "@/lib/utils";

interface DeckData {
  id: number;
  title: string;
  theme: string | null;
  themeConfig: unknown;
  slides: {
    id: number;
    sortOrder: number;
    title: string | null;
    contentBlocks: unknown;
  }[];
}

export default function PosterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const posterId = Number(params.posterId);

  const [loading, setLoading] = useState(true);
  const [_deck, setDeck] = useState<DeckData | null>(null);
  const [posterData, setPosterData] = useState<PosterData | null>(null);
  const [scale, setScale] = useState(0.25);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [showSections, setShowSections] = useState(true);
  const [showThemes, setShowThemes] = useState(false);

  // Load deck data and reconstruct poster
  useEffect(() => {
    async function load() {
      try {
        const data = await getDeck(posterId);
        if (!data) {
          router.push("/poster");
          return;
        }
        setDeck(data as unknown as DeckData);

        // Reconstruct PosterData from the stored slide data
        const firstSlide = data.slides.find((s) => s.sortOrder === 0);
        if (firstSlide && firstSlide.contentBlocks) {
          const blocks = firstSlide.contentBlocks as ContentBlock[];
          const metadataBlock = blocks.find(
            (b) => b.type === "text" && b.data.text.includes('"isPoster"')
          );

          if (metadataBlock && metadataBlock.type === "text") {
            try {
              const metadata = JSON.parse(metadataBlock.data.text);
              const themeConfig =
                (data.themeConfig as ThemeConfig) ??
                PRESET_THEMES[data.theme ?? "modern"] ??
                PRESET_THEMES.modern;

              const poster: PosterData = {
                id: String(data.id),
                deckId: data.id,
                title: data.title,
                authors: metadata.authors ?? [],
                affiliations: metadata.affiliations ?? [],
                size: metadata.posterSize ?? "a0_portrait",
                gridLayout: metadata.gridLayout ?? "three_column",
                sections: metadata.sections ?? [],
                themeConfig,
              };
              setPosterData(poster);
            } catch {
              // Fallback: build poster from individual slides
              buildPosterFromSlides(data as unknown as DeckData);
            }
          } else {
            buildPosterFromSlides(data as unknown as DeckData);
          }
        } else {
          buildPosterFromSlides(data as unknown as DeckData);
        }
      } catch (err) {
        console.error("Failed to load poster:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [posterId, router]);

  function buildPosterFromSlides(data: DeckData) {
    const themeConfig =
      (data.themeConfig as ThemeConfig) ??
      PRESET_THEMES[data.theme ?? "modern"] ??
      PRESET_THEMES.modern;

    const sections: PosterSection[] = data.slides
      .filter((s) => s.sortOrder > 0)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((slide, i) => ({
        id: `section_${slide.id}`,
        title: slide.title ?? `Section ${i + 1}`,
        column: i % 3,
        row: Math.floor(i / 3) + 1,
        colSpan: i === 0 ? 3 : undefined,
        contentBlocks: (slide.contentBlocks as ContentBlock[]) ?? [],
      }));

    // Add a title section
    sections.unshift({
      id: "title_bar",
      title: "Title",
      column: 0,
      row: 0,
      colSpan: 3,
      contentBlocks: [],
    });

    setPosterData({
      id: String(data.id),
      deckId: data.id,
      title: data.title,
      authors: [],
      affiliations: [],
      size: "a0_portrait",
      gridLayout: "three_column",
      sections,
      themeConfig,
    });
  }

  function handleZoomIn() {
    setScale((s) => Math.min(s + 0.05, 1.0));
  }

  function handleZoomOut() {
    setScale((s) => Math.max(s - 0.05, 0.1));
  }

  function handleFitToScreen() {
    setScale(0.25);
  }

  function handleThemeChange(themeKey: string) {
    const newTheme = PRESET_THEMES[themeKey];
    if (newTheme && posterData) {
      setPosterData({ ...posterData, themeConfig: newTheme });
    }
  }

  async function handleExportPdf() {
    if (!posterData) return;
    try {
      const res = await fetch("/api/export/poster-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poster: posterData }),
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${posterData.title.replace(/[^a-zA-Z0-9]/g, "_")}_poster.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-sm text-ink-muted">Loading poster...</div>
      </div>
    );
  }

  if (!posterData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-sm text-ink-muted">Poster not found</div>
      </div>
    );
  }

  const activeSectionData = posterData.sections.find(
    (s) => s.id === activeSectionId
  );

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col -m-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/poster"
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-sm font-semibold text-ink truncate max-w-[300px]">
            {posterData.title}
          </h1>
          <span className="text-xs text-ink-muted">
            {POSTER_SIZES[posterData.size].label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            title="Zoom out"
          >
            <MagnifyingGlassMinus size={18} />
          </button>
          <span className="text-xs text-ink-muted w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            title="Zoom in"
          >
            <MagnifyingGlassPlus size={18} />
          </button>
          <button
            onClick={handleFitToScreen}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            title="Fit to screen"
          >
            <ArrowsOut size={18} />
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Toggle panels */}
          <button
            onClick={() => setShowSections(!showSections)}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              showSections
                ? "text-brand bg-brand/10"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
            title="Section list"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setShowThemes(!showThemes)}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              showThemes
                ? "text-brand bg-brand/10"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
            title="Theme picker"
          >
            <Palette size={18} />
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          <button
            onClick={handleExportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand/90 transition-colors"
          >
            <DownloadSimple size={14} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel: Section list */}
        {showSections && (
          <div className="w-56 border-r border-border bg-surface overflow-y-auto shrink-0">
            <div className="p-3">
              <h3 className="text-xs font-semibold text-ink-muted mb-2 tracking-wide">
                SECTIONS
              </h3>
              <div className="space-y-1">
                {/* empty state: no data, no results, nothing here */}
                {posterData.sections.length === 0 && (
                  <p className="text-xs text-ink-muted py-2">nothing here yet. Add sections to get started.</p>
                )}
                {posterData.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors",
                      activeSectionId === section.id
                        ? "bg-brand/10 text-brand border border-brand/20"
                        : "text-ink-muted hover:bg-surface-raised hover:text-ink"
                    )}
                  >
                    <p className="font-medium truncate">{section.title}</p>
                    <p className="text-[10px] opacity-60 mt-0.5">
                      {section.contentBlocks.length} blocks
                      {section.colSpan ? ` | span ${section.colSpan}` : ""}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Center: Poster canvas */}
        <div className="flex-1 overflow-auto bg-[#F0F0F0] flex items-start justify-center p-8">
          <div style={{ width: `${scale * 100}%`, maxWidth: "100%" }}>
            <PosterRenderer
              poster={posterData}
              scale={scale}
              onSectionClick={setActiveSectionId}
              activeSectionId={activeSectionId}
            />
          </div>
        </div>

        {/* Right panel: Theme picker or section editor */}
        {(showThemes || activeSectionData) && (
          <div className="w-64 border-l border-border bg-surface overflow-y-auto shrink-0">
            {showThemes && (
              <div className="p-3 border-b border-border">
                <h3 className="text-xs font-semibold text-ink-muted mb-2 tracking-wide">
                  THEME
                </h3>
                <div className="grid grid-cols-4 gap-1.5">
                  {Object.entries(PRESET_THEMES).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={cn(
                        "rounded-md overflow-hidden border-2 transition-all",
                        posterData.themeConfig.name === config.name
                          ? "border-brand ring-1 ring-brand/30"
                          : "border-border hover:border-brand/40"
                      )}
                    >
                      <div
                        className="aspect-square flex items-center justify-center"
                        style={{ backgroundColor: config.backgroundColor }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: config.primaryColor }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSectionData && (
              <div className="p-3">
                <h3 className="text-xs font-semibold text-ink-muted mb-2 tracking-wide">
                  SECTION DETAILS
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-medium text-ink-muted block mb-1">
                      Title
                    </label>
                    <p className="text-sm font-medium text-ink">
                      {activeSectionData.title}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-ink-muted block mb-1">
                      Position
                    </label>
                    <p className="text-xs text-ink-muted">
                      Column {activeSectionData.column}, Row {activeSectionData.row}
                      {activeSectionData.colSpan
                        ? ` (spans ${activeSectionData.colSpan} columns)`
                        : ""}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-ink-muted block mb-1">
                      Content Blocks ({activeSectionData.contentBlocks.length})
                    </label>
                    <div className="space-y-1">
                      {/* empty state: no data, no results */}
                      {activeSectionData.contentBlocks.length === 0 && (
                        <p className="text-[10px] text-ink-muted py-1">nothing here yet. Add content blocks to get started.</p>
                      )}
                      {activeSectionData.contentBlocks.map((block, i) => (
                        <div
                          key={i}
                          className="px-2 py-1.5 rounded-md bg-surface-raised text-[10px] text-ink-muted"
                        >
                          <span className="font-mono text-brand">{block.type}</span>
                          {block.type === "text" && (
                            <span className="ml-1 truncate">
                              {block.data.text.slice(0, 30)}...
                            </span>
                          )}
                          {block.type === "bullets" && (
                            <span className="ml-1">
                              {block.data.items.length} items
                            </span>
                          )}
                          {block.type === "chart" && (
                            <span className="ml-1">{block.data.chartType}</span>
                          )}
                          {block.type === "table" && (
                            <span className="ml-1">
                              {block.data.rows.length} rows
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
