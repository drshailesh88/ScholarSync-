"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  Export,
  FilePdf,
  ImageSquare,
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
  ArrowUUpLeft,
  ArrowUUpRight,
  MagnifyingGlass,
  GridFour,
  Eye,
  Eyeglasses,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore, type RightPanel, type SaveStatus } from "@/stores/slides-store";
import { ModeSelector } from "../mode-selector";
import { createDefaultBlock } from "../blocks";
import { InsertMenu } from "../shared/insert-menu";
import { AvatarsSlot as CollaborationAvatarsSlot } from "../shared/collaboration-slots";
import type { ContentBlock } from "@/types/presentation";

interface SlidesToolbarProps {
  onExportPptx: () => void;
  onExportPdf: () => void;
  onExportPng: (event?: ReactMouseEvent<HTMLButtonElement>) => void;
  onExportAllPng: (event?: ReactMouseEvent<HTMLButtonElement>) => void;
  onExportSvg: () => void;
  exporting: boolean;
}

export function SlidesToolbar({
  onExportPptx,
  onExportPdf,
  onExportPng,
  onExportAllPng,
  onExportSvg,
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
  const undo = useSlidesStore((s) => s.undo);
  const redo = useSlidesStore((s) => s.redo);
  const undoAvailable = useSlidesStore((s) => s._undoStack.length > 0 || s._pendingUndoBefore !== null);
  const redoAvailable = useSlidesStore((s) => s._redoStack.length > 0);
  const showFindReplace = useSlidesStore((s) => s.showFindReplace);
  const setShowFindReplace = useSlidesStore((s) => s.setShowFindReplace);
  const setShowSlideSorter = useSlidesStore((s) => s.setShowSlideSorter);
  const showRulers = useSlidesStore((s) => s.showRulers);
  const setShowRulers = useSlidesStore((s) => s.setShowRulers);
  const showGrid = useSlidesStore((s) => s.showGrid);
  const setShowGrid = useSlidesStore((s) => s.setShowGrid);
  const snapToGrid = useSlidesStore((s) => s.snapToGrid);
  const setSnapToGrid = useSlidesStore((s) => s.setSnapToGrid);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const insertButtonRef = useRef<HTMLButtonElement>(null);

  function togglePanel(panel: RightPanel) {
    setRightPanel(rightPanel === panel ? null : panel);
  }

  function handleInsert(type: ContentBlock["type"], dataOverride?: Record<string, unknown>) {
    if (!activeSlide) return;
    const block = createDefaultBlock(type, dataOverride);
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
          ref={insertButtonRef}
          onClick={() => setShowInsertMenu(!showInsertMenu)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <Plus size={14} />
          Insert
        </button>
        <InsertMenu
          isOpen={showInsertMenu}
          anchorRef={insertButtonRef}
          onInsert={handleInsert}
          onClose={() => setShowInsertMenu(false)}
        />
      </div>

      {/* Undo/Redo + Find */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={undo}
          disabled={!undoAvailable}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
        >
          <ArrowUUpLeft size={14} />
        </button>
        <button
          onClick={redo}
          disabled={!redoAvailable}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
        >
          <ArrowUUpRight size={14} />
        </button>
        <button
          onClick={() => setShowFindReplace(!showFindReplace)}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            showFindReplace
              ? "bg-brand/10 text-brand"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
          title="Find & Replace (Ctrl+F)"
          aria-label="Find and replace"
        >
          <MagnifyingGlass size={14} />
        </button>
        <button
          onClick={() => setShowSlideSorter(true)}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="Slide Sorter View"
          aria-label="Slide sorter view"
        >
          <GridFour size={14} />
        </button>
      </div>

      <div className="relative group/view">
        <button
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="View options"
          aria-label="View options"
        >
          <Eye size={14} />
          View
        </button>
        <div className="absolute left-0 top-full mt-1 hidden min-w-44 rounded-xl border border-border bg-surface p-1 shadow-lg z-50 group-hover/view:block">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-ink hover:bg-surface-raised">
            <input
              type="checkbox"
              checked={showRulers}
              onChange={() => setShowRulers(!showRulers)}
            />
            Rulers
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-ink hover:bg-surface-raised">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={() => setShowGrid(!showGrid)}
            />
            Grid
          </label>
          <label
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
              showGrid
                ? "cursor-pointer text-ink hover:bg-surface-raised"
                : "cursor-not-allowed text-ink-muted/70"
            )}
          >
            <input
              type="checkbox"
              checked={snapToGrid}
              disabled={!showGrid}
              onChange={() => setSnapToGrid(!snapToGrid)}
            />
            Snap to Grid
          </label>
        </div>
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
        aria-label="Defense"
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
        aria-label="Comments"
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
        aria-label="Analytics"
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
        aria-label="Version history"
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "versions"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <ClockCounterClockwise size={14} />
      </button>

      <button
        onClick={() => togglePanel("accessibility")}
        className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
          rightPanel === "accessibility"
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
        title="Accessibility Checker"
      >
        <Eyeglasses size={14} />
        A11y
      </button>

      <div className="w-px h-5 bg-border mx-1" />

      {/* Collaboration avatars — shows who is in the room */}
      <CollaborationAvatarsSlot />

      <button
        onClick={() => setIsPresenting(true)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
      >
        <Presentation size={14} />
        Present
      </button>

      <button
        onClick={() => setShowSharePanel(true)}
        aria-label="Share"
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
        <div className="absolute right-0 top-full mt-1 w-56 bg-surface border border-border rounded-xl shadow-lg z-50 p-1 hidden group-hover:block">
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
          <div className="my-1 h-px bg-border" />
          <button
            onClick={(event) => onExportPng(event)}
            disabled={exporting}
            className="w-full flex items-start gap-2 px-3 py-2 rounded-lg text-xs text-ink hover:bg-surface-raised transition-colors"
          >
            <ImageSquare size={12} className="mt-0.5 shrink-0" />
            <span className="flex flex-col items-start text-left leading-tight">
              <span>PNG (Current Slide)</span>
              <span className="text-[10px] text-ink-muted">HD (Shift+Click)</span>
            </span>
          </button>
          <button
            onClick={(event) => onExportAllPng(event)}
            disabled={exporting}
            className="w-full flex items-start gap-2 px-3 py-2 rounded-lg text-xs text-ink hover:bg-surface-raised transition-colors"
          >
            <ImageSquare size={12} className="mt-0.5 shrink-0" />
            <span className="flex flex-col items-start text-left leading-tight">
              <span>PNG (All Slides as ZIP)</span>
              <span className="text-[10px] text-ink-muted">HD (Shift+Click)</span>
            </span>
          </button>
          <button
            onClick={onExportSvg}
            disabled={exporting}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink hover:bg-surface-raised transition-colors"
          >
            <Export size={12} /> SVG (Current Slide)
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
