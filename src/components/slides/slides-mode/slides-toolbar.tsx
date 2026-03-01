"use client";

import { useState } from "react";
import {
  Export,
  FilePdf,
  Presentation,
  Robot,
  Target,
  ShareNetwork,
  ChartBar,
  ChatCircle,
  ClockCounterClockwise,
  Plus,
  FloppyDisk,
  Check,
  CircleNotch,
  Warning,
  Wrench,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore, type RightPanel, type SaveStatus } from "@/stores/slides-store";
import { ModeSelector } from "../mode-selector";
import { BLOCK_REGISTRY, createDefaultBlock } from "../blocks";
import type { ContentBlock } from "@/types/presentation";

interface SlidesToolbarProps {
  onExportPptx: () => void;
  onExportPdf: () => void;
  exporting: boolean;
}

export function SlidesToolbar({
  onExportPptx,
  onExportPdf,
  exporting,
}: SlidesToolbarProps) {
  const mode = useSlidesStore((s) => s.mode);
  const setMode = useSlidesStore((s) => s.setMode);
  const rightPanel = useSlidesStore((s) => s.rightPanel);
  const setRightPanel = useSlidesStore((s) => s.setRightPanel);
  const setIsPresenting = useSlidesStore((s) => s.setIsPresenting);
  const setShowSharePanel = useSlidesStore((s) => s.setShowSharePanel);
  const saveStatus = useSlidesStore((s) => s.saveStatus);
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const [showInsertMenu, setShowInsertMenu] = useState(false);

  function togglePanel(panel: RightPanel) {
    setRightPanel(rightPanel === panel ? null : panel);
  }

  function handleInsert(type: ContentBlock["type"]) {
    if (!activeSlide) return;
    const block = createDefaultBlock(type);
    updateSlide(activeSlide.id, {
      contentBlocks: [...activeSlide.contentBlocks, block],
    });
    setShowInsertMenu(false);
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface">
      {/* Mode toggle */}
      <ModeSelector mode={mode} onModeChange={setMode} />

      <div className="w-px h-5 bg-border mx-1" />

      {/* Properties panel toggle */}
      <button
        onClick={() => togglePanel("properties")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "properties"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <Wrench size={14} />
        Design
      </button>

      {/* Insert menu */}
      <div className="relative">
        <button
          onClick={() => setShowInsertMenu(!showInsertMenu)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <Plus size={14} />
          Insert
        </button>
        {showInsertMenu && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-xl shadow-lg z-50 p-1">
            {Object.entries(BLOCK_REGISTRY).map(([type, entry]) => (
              <button
                key={type}
                onClick={() => handleInsert(type as ContentBlock["type"])}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-ink hover:bg-surface-raised transition-colors text-left"
              >
                <span className="text-ink-muted">{entry.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Save status */}
      <div className="flex items-center gap-1 text-xs text-ink-muted">
        <SaveIndicator status={saveStatus} />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right-side buttons */}
      <button
        onClick={() => togglePanel("agent")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "agent"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <Robot size={14} />
        Agent
      </button>

      <button
        onClick={() => togglePanel("defense")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "defense"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <Target size={14} />
      </button>

      <button
        onClick={() => togglePanel("comments")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "comments"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <ChatCircle size={14} />
      </button>

      <button
        onClick={() => togglePanel("analytics")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "analytics"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <ChartBar size={14} />
      </button>

      <button
        onClick={() => togglePanel("versions")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "versions"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <ClockCounterClockwise size={14} />
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      <button
        onClick={() => setIsPresenting(true)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
      >
        <Presentation size={14} />
        Present
      </button>

      <button
        onClick={() => setShowSharePanel(true)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
      >
        <ShareNetwork size={14} />
      </button>

      {/* Export dropdown */}
      <div className="relative group">
        <button
          disabled={exporting}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
        >
          <Export size={14} />
          Export
        </button>
        <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-xl shadow-lg z-50 p-1 hidden group-hover:block">
          <button
            onClick={onExportPptx}
            disabled={exporting}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink hover:bg-surface-raised transition-colors"
          >
            <Export size={12} /> PowerPoint (.pptx)
          </button>
          <button
            onClick={onExportPdf}
            disabled={exporting}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink hover:bg-surface-raised transition-colors"
          >
            <FilePdf size={12} /> PDF Handout
          </button>
        </div>
      </div>
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  switch (status) {
    case "saving":
      return <><CircleNotch size={12} className="animate-spin" /> Saving...</>;
    case "saved":
      return <><Check size={12} className="text-green-500" /> Saved</>;
    case "error":
      return <><Warning size={12} className="text-red-500" /> Save error</>;
    default:
      return <><FloppyDisk size={12} /></>;
  }
}
