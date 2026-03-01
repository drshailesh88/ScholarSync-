"use client";

import { useState, useRef, useEffect } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type { SaveStatus } from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";
import { ModeSelector } from "../mode-selector";
import { ThemeCustomizer } from "./theme-customizer";
import {
  Play,
  Export,
  FilePdf,
  MicrosoftPowerpointLogo,
  CaretDown,
  Palette,
  Sparkle,
  CircleNotch,
} from "@phosphor-icons/react";
import { exportDeck, type ExportFormat } from "./export-deck";

// ---------------------------------------------------------------------------
// Save status indicator dot
// ---------------------------------------------------------------------------

function SaveDot({ status }: { status: SaveStatus }) {
  const color =
    status === "saved" || status === "idle"
      ? "bg-emerald-500"
      : status === "saving"
        ? "bg-yellow-500 animate-pulse"
        : "bg-red-500";

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${color}`}
      title={status === "idle" ? "saved" : status}
    />
  );
}

// ---------------------------------------------------------------------------
// Dropdown wrapper with click-outside dismiss
// ---------------------------------------------------------------------------

function Dropdown({
  open,
  onClose,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-1 z-50 rounded-xl border border-border bg-surface shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GammaToolbar
// ---------------------------------------------------------------------------

export function GammaToolbar() {
  const mode = useSlidesStore((s) => s.mode);
  const setMode = useSlidesStore((s) => s.setMode);
  const title = useSlidesStore((s) => s.title);
  const setTitle = useSlidesStore((s) => s.setTitle);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const slides = useSlidesStore((s) => s.slides);
  const saveStatus = useSlidesStore((s) => s.saveStatus);
  const setIsPresenting = useSlidesStore((s) => s.setIsPresenting);
  const agentPanelOpen = useSlidesStore((s) => s.agentPanelOpen);
  const setAgentPanelOpen = useSlidesStore((s) => s.setAgentPanelOpen);

  const themeConfig = useSlidesStore((s) => s.themeConfig);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const [themeOpen, setThemeOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState<ExportFormat | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

  // When entering edit mode, seed the draft from the current title and focus
  function startEditingTitle() {
    setTitleDraft(title);
    setIsEditingTitle(true);
    // Focus needs a tick for the input to mount
    requestAnimationFrame(() => titleInputRef.current?.select());
  }

  function commitTitle() {
    setIsEditingTitle(false);
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== title) {
      setTitle(trimmed);
    }
  }

  async function handleExport(format: ExportFormat) {
    if (exporting) return; // prevent double-click
    setExporting(format);
    setExportOpen(false);
    try {
      await exportDeck({ format, slides, title, themeConfig });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Export failed";
      alert(msg);
    } finally {
      setExporting(null);
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2 h-12 border-b border-border bg-surface shrink-0">
      {/* 1. Mode selector */}
      <ModeSelector mode={mode} onModeChange={setMode} />

      {/* 2. Editable title + save dot */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitTitle();
              if (e.key === "Escape") {
                setTitleDraft(title);
                setIsEditingTitle(false);
              }
            }}
            className="text-sm font-medium text-ink bg-transparent border-b border-brand outline-none px-1 py-0.5 min-w-[120px] max-w-[300px] truncate"
          />
        ) : (
          <button
            onClick={startEditingTitle}
            className="text-sm font-medium text-ink hover:text-brand truncate max-w-[300px] px-1 py-0.5 rounded transition-colors"
            title="Click to edit title"
          >
            {title || "Untitled Deck"}
          </button>
        )}
        <SaveDot status={saveStatus} />
      </div>

      {/* 3. Card count */}
      <span className="text-xs text-ink-muted whitespace-nowrap">
        {slides.length} card{slides.length !== 1 ? "s" : ""}
      </span>

      {/* 4. Theme picker */}
      <div className="relative">
        <button
          onClick={() => {
            setThemeOpen(!themeOpen);
            setExportOpen(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink hover:bg-surface-raised border border-border transition-colors"
        >
          <Palette size={14} />
          <span className="hidden sm:inline">
            {PRESET_THEMES[themeKey]?.name ?? "Theme"}
          </span>
          <CaretDown size={10} />
        </button>
        <Dropdown
          open={themeOpen}
          onClose={() => setThemeOpen(false)}
          className="right-0 p-3 w-[320px]"
        >
          <ThemeCustomizer />
        </Dropdown>
      </div>

      {/* 5. Export button */}
      <div className="relative">
        <button
          onClick={() => {
            if (!exporting) {
              setExportOpen(!exportOpen);
              setThemeOpen(false);
            }
          }}
          disabled={!!exporting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink hover:bg-surface-raised border border-border transition-colors disabled:opacity-50"
        >
          {exporting ? (
            <CircleNotch size={14} className="animate-spin" />
          ) : (
            <Export size={14} />
          )}
          <span className="hidden sm:inline">
            {exporting ? "Exporting..." : "Export"}
          </span>
          {!exporting && <CaretDown size={10} />}
        </button>
        <Dropdown
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          className="right-0 w-48"
        >
          <div className="py-1">
            <button
              onClick={() => handleExport("pptx")}
              disabled={!!exporting}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors disabled:opacity-50"
            >
              {exporting === "pptx" ? (
                <CircleNotch size={16} className="animate-spin" />
              ) : (
                <MicrosoftPowerpointLogo size={16} />
              )}
              {exporting === "pptx" ? "Exporting..." : "Export PPTX"}
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={!!exporting}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-ink hover:bg-surface-raised transition-colors disabled:opacity-50"
            >
              {exporting === "pdf" ? (
                <CircleNotch size={16} className="animate-spin" />
              ) : (
                <FilePdf size={16} />
              )}
              {exporting === "pdf" ? "Exporting..." : "Export PDF"}
            </button>
          </div>
        </Dropdown>
      </div>

      {/* 6. Agent toggle */}
      <button
        onClick={() => setAgentPanelOpen(!agentPanelOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
          agentPanelOpen
            ? "bg-brand/10 text-brand border-brand/30"
            : "text-ink hover:bg-surface-raised border-border"
        }`}
      >
        <Sparkle size={14} weight={agentPanelOpen ? "fill" : "regular"} />
        Agent
      </button>

      {/* 7. Present button */}
      <button
        onClick={() => setIsPresenting(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
      >
        <Play size={14} weight="fill" />
        Present
      </button>
    </div>
  );
}
