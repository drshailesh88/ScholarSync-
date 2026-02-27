"use client";

import { useState, useMemo } from "react";
import { X, ArrowLeft, ArrowRight, Minus, Plus, PencilSimple, Equals } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SlideRenderer } from "@/components/presentation/slide-renderer";
import {
  computeDeckDiff,
  extractTextFromBlocks,
  computeTextDiff,
} from "@/lib/presentation/version-diff";
import type { SlideDiff, TextDiffSegment } from "@/lib/presentation/version-diff";
import type { VersionSnapshot } from "@/lib/actions/versions";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VersionDiffViewerProps {
  snapshotA: VersionSnapshot;
  snapshotB: VersionSnapshot;
  labelA: string;
  labelB: string;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Status badge colors
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<
  SlideDiff["status"],
  { border: string; bg: string; label: string; icon: React.ReactNode }
> = {
  added: {
    border: "border-green-500",
    bg: "bg-green-500/10",
    label: "Added",
    icon: <Plus size={10} weight="bold" className="text-green-600" />,
  },
  removed: {
    border: "border-red-500",
    bg: "bg-red-500/10",
    label: "Removed",
    icon: <Minus size={10} weight="bold" className="text-red-500" />,
  },
  modified: {
    border: "border-amber-500",
    bg: "bg-amber-500/10",
    label: "Modified",
    icon: <PencilSimple size={10} weight="bold" className="text-amber-600" />,
  },
  unchanged: {
    border: "border-border",
    bg: "bg-surface",
    label: "Unchanged",
    icon: <Equals size={10} className="text-ink-muted" />,
  },
};

// ---------------------------------------------------------------------------
// Inline text diff display
// ---------------------------------------------------------------------------

function InlineTextDiff({ segments }: { segments: TextDiffSegment[] }) {
  return (
    <span>
      {segments.map((seg, i) => {
        if (seg.type === "same") {
          return <span key={i}>{seg.text}</span>;
        }
        if (seg.type === "added") {
          return (
            <span
              key={i}
              className="bg-green-200 text-green-900 rounded-sm px-0.5"
            >
              {seg.text}
            </span>
          );
        }
        return (
          <span
            key={i}
            className="bg-red-200 text-red-900 line-through rounded-sm px-0.5"
          >
            {seg.text}
          </span>
        );
      })}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Slide detail diff panel
// ---------------------------------------------------------------------------

function SlideDetailDiff({
  diff,
  snapshotA,
  snapshotB,
}: {
  diff: SlideDiff;
  snapshotA: VersionSnapshot;
  snapshotB: VersionSnapshot;
}) {
  const slideA = diff.slideId != null ? snapshotA.slides.find((s) => s.id === diff.slideId) : null;
  const slideB = diff.slideId != null ? snapshotB.slides.find((s) => s.id === diff.slideId) : null;

  if (diff.status === "unchanged") {
    return (
      <p className="text-xs text-ink-muted py-4 text-center">
        No changes in this slide.
      </p>
    );
  }

  if (diff.status === "added") {
    return (
      <div className="space-y-2 py-2">
        <p className="text-[10px] font-medium text-green-600">
          New slide added
        </p>
        {slideB && (
          <div className="text-xs text-ink space-y-1">
            <p><span className="text-ink-muted">Title:</span> {slideB.title ?? "Untitled"}</p>
            <p><span className="text-ink-muted">Layout:</span> {slideB.layout ?? "default"}</p>
          </div>
        )}
      </div>
    );
  }

  if (diff.status === "removed") {
    return (
      <div className="space-y-2 py-2">
        <p className="text-[10px] font-medium text-red-500">
          Slide removed
        </p>
        {slideA && (
          <div className="text-xs text-ink space-y-1">
            <p><span className="text-ink-muted">Title:</span> {slideA.title ?? "Untitled"}</p>
            <p><span className="text-ink-muted">Layout:</span> {slideA.layout ?? "default"}</p>
          </div>
        )}
      </div>
    );
  }

  // Modified slide — show detailed changes
  const changes: React.ReactNode[] = [];

  if (diff.titleChanged && slideA && slideB) {
    const titleDiff = computeTextDiff(
      slideA.title ?? "",
      slideB.title ?? ""
    );
    changes.push(
      <div key="title" className="space-y-0.5">
        <p className="text-[10px] font-medium text-ink-muted">Title</p>
        <p className="text-xs leading-relaxed">
          <InlineTextDiff segments={titleDiff} />
        </p>
      </div>
    );
  }

  if (diff.subtitleChanged && slideA && slideB) {
    const subtitleDiff = computeTextDiff(
      slideA.subtitle ?? "",
      slideB.subtitle ?? ""
    );
    changes.push(
      <div key="subtitle" className="space-y-0.5">
        <p className="text-[10px] font-medium text-ink-muted">Subtitle</p>
        <p className="text-xs leading-relaxed">
          <InlineTextDiff segments={subtitleDiff} />
        </p>
      </div>
    );
  }

  if (diff.layoutChanged && slideA && slideB) {
    changes.push(
      <div key="layout" className="space-y-0.5">
        <p className="text-[10px] font-medium text-ink-muted">Layout</p>
        <p className="text-xs">
          <span className="bg-red-200 text-red-900 line-through rounded-sm px-0.5">
            {slideA.layout}
          </span>{" "}
          <span className="bg-green-200 text-green-900 rounded-sm px-0.5">
            {slideB.layout}
          </span>
        </p>
      </div>
    );
  }

  if (diff.speakerNotesChanged && slideA && slideB) {
    const notesDiff = computeTextDiff(
      slideA.speakerNotes ?? "",
      slideB.speakerNotes ?? ""
    );
    changes.push(
      <div key="notes" className="space-y-0.5">
        <p className="text-[10px] font-medium text-ink-muted">Speaker Notes</p>
        <p className="text-xs leading-relaxed">
          <InlineTextDiff segments={notesDiff} />
        </p>
      </div>
    );
  }

  // Content block changes
  const blockChanges = diff.contentBlockChanges.filter(
    (c) => c.status !== "unchanged"
  );
  if (blockChanges.length > 0 && slideA && slideB) {
    const oldBlocks = (Array.isArray(slideA.contentBlocks) ? slideA.contentBlocks : []) as Record<string, unknown>[];
    const newBlocks = (Array.isArray(slideB.contentBlocks) ? slideB.contentBlocks : []) as Record<string, unknown>[];

    changes.push(
      <div key="content-blocks" className="space-y-1.5">
        <p className="text-[10px] font-medium text-ink-muted">
          Content Blocks ({blockChanges.length} changed)
        </p>
        {blockChanges.map((bc) => {
          const oldBlock = bc.blockIndex < oldBlocks.length ? oldBlocks[bc.blockIndex] : null;
          const newBlock = bc.blockIndex < newBlocks.length ? newBlocks[bc.blockIndex] : null;
          const oldText = oldBlock ? extractTextFromBlocks([oldBlock]) : "";
          const newText = newBlock ? extractTextFromBlocks([newBlock]) : "";

          return (
            <div
              key={bc.blockIndex}
              className={cn(
                "rounded-lg px-2 py-1.5 text-xs",
                bc.status === "added" && "bg-green-500/10 border border-green-500/20",
                bc.status === "removed" && "bg-red-500/10 border border-red-500/20",
                bc.status === "modified" && "bg-amber-500/10 border border-amber-500/20"
              )}
            >
              <span className="text-[10px] font-medium text-ink-muted">
                Block {bc.blockIndex + 1} — {bc.status}
              </span>
              {bc.status === "modified" && oldText && newText && (
                <p className="mt-1 leading-relaxed">
                  <InlineTextDiff
                    segments={computeTextDiff(oldText, newText)}
                  />
                </p>
              )}
              {bc.status === "added" && newText && (
                <p className="mt-1 text-green-700">{newText}</p>
              )}
              {bc.status === "removed" && oldText && (
                <p className="mt-1 text-red-600 line-through">{oldText}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="space-y-3 py-2">{changes}</div>;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function VersionDiffViewer({
  snapshotA,
  snapshotB,
  labelA,
  labelB,
  onClose,
}: VersionDiffViewerProps) {
  const [selectedSlideIdx, setSelectedSlideIdx] = useState<number | null>(null);

  const deckDiff = useMemo(
    () => computeDeckDiff(snapshotA, snapshotB),
    [snapshotA, snapshotB]
  );

  const selectedDiff =
    selectedSlideIdx !== null ? deckDiff.slideDiffs[selectedSlideIdx] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-surface rounded-2xl shadow-2xl w-[95vw] max-w-6xl h-[85vh] flex flex-col overflow-hidden border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-ink">Version Comparison</h2>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="px-2 py-0.5 bg-surface-raised rounded-md border border-border">
                {labelA}
              </span>
              <ArrowRight size={12} />
              <span className="px-2 py-0.5 bg-surface-raised rounded-md border border-border">
                {labelB}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stats badges */}
            <div className="flex items-center gap-2 text-[10px]">
              {deckDiff.stats.added > 0 && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 font-medium">
                  <Plus size={8} weight="bold" /> {deckDiff.stats.added} added
                </span>
              )}
              {deckDiff.stats.removed > 0 && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-medium">
                  <Minus size={8} weight="bold" /> {deckDiff.stats.removed}{" "}
                  removed
                </span>
              )}
              {deckDiff.stats.modified > 0 && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-medium">
                  <PencilSimple size={8} weight="bold" />{" "}
                  {deckDiff.stats.modified} modified
                </span>
              )}
              {deckDiff.stats.unchanged > 0 && (
                <span className="text-ink-muted">
                  {deckDiff.stats.unchanged} unchanged
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body: Split view */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left side — Version A */}
          <div className="flex-1 flex flex-col border-r border-border">
            <div className="px-4 py-2 border-b border-border bg-surface-raised/30">
              <div className="flex items-center gap-2">
                <ArrowLeft size={12} className="text-ink-muted" />
                <span className="text-xs font-medium text-ink">{labelA}</span>
                <span className="text-[10px] text-ink-muted">
                  ({snapshotA.slides.length} slides)
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-3 content-start">
              {deckDiff.slideDiffs.map((diff, idx) => {
                const slide =
                  diff.status === "added"
                    ? null
                    : snapshotA.slides.find((s) => s.id === diff.slideId);
                const style = STATUS_STYLES[diff.status];
                const isSelected = selectedSlideIdx === idx;

                if (diff.status === "added") {
                  return (
                    <div
                      key={`a-${idx}`}
                      className="aspect-video rounded-lg border-2 border-dashed border-green-500/30 bg-green-500/5 flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedSlideIdx(idx)}
                    >
                      <span className="text-[10px] text-green-600 font-medium">
                        Added in {labelB}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={`a-${idx}`}
                    className={cn(
                      "relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all",
                      style.border,
                      isSelected && "ring-2 ring-brand ring-offset-1"
                    )}
                    onClick={() => setSelectedSlideIdx(idx)}
                  >
                    <SlideRenderer
                      title={slide?.title}
                      subtitle={slide?.subtitle}
                      layout={slide?.layout as "title_content" | undefined}
                      contentBlocks={
                        (slide?.contentBlocks as ContentBlock[]) ?? []
                      }
                      scale={0.25}
                    />
                    <div
                      className={cn(
                        "absolute top-1 left-1 flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] font-medium",
                        style.bg
                      )}
                    >
                      {style.icon}
                      {style.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side — Version B */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-2 border-b border-border bg-surface-raised/30">
              <div className="flex items-center gap-2">
                <ArrowRight size={12} className="text-ink-muted" />
                <span className="text-xs font-medium text-ink">{labelB}</span>
                <span className="text-[10px] text-ink-muted">
                  ({snapshotB.slides.length} slides)
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-3 content-start">
              {deckDiff.slideDiffs.map((diff, idx) => {
                const slide =
                  diff.status === "removed"
                    ? null
                    : snapshotB.slides.find((s) => s.id === diff.slideId);
                const style = STATUS_STYLES[diff.status];
                const isSelected = selectedSlideIdx === idx;

                if (diff.status === "removed") {
                  return (
                    <div
                      key={`b-${idx}`}
                      className="aspect-video rounded-lg border-2 border-dashed border-red-500/30 bg-red-500/5 flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedSlideIdx(idx)}
                    >
                      <span className="text-[10px] text-red-500 font-medium">
                        Removed from {labelA}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={`b-${idx}`}
                    className={cn(
                      "relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all",
                      style.border,
                      isSelected && "ring-2 ring-brand ring-offset-1"
                    )}
                    onClick={() => setSelectedSlideIdx(idx)}
                  >
                    <SlideRenderer
                      title={slide?.title}
                      subtitle={slide?.subtitle}
                      layout={slide?.layout as "title_content" | undefined}
                      contentBlocks={
                        (slide?.contentBlocks as ContentBlock[]) ?? []
                      }
                      scale={0.25}
                    />
                    <div
                      className={cn(
                        "absolute top-1 left-1 flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] font-medium",
                        style.bg
                      )}
                    >
                      {style.icon}
                      {style.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Selected slide detail diff */}
        {selectedDiff && (
          <div className="border-t border-border bg-surface-raised/30 max-h-[30vh] overflow-y-auto px-5 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-ink">
                  Slide Details
                </span>
                <span
                  className={cn(
                    "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium",
                    STATUS_STYLES[selectedDiff.status].bg
                  )}
                >
                  {STATUS_STYLES[selectedDiff.status].icon}
                  {STATUS_STYLES[selectedDiff.status].label}
                </span>
                {selectedDiff.oldTitle && (
                  <span className="text-[10px] text-ink-muted">
                    &quot;{selectedDiff.oldTitle}&quot;
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedSlideIdx(null)}
                className="text-[10px] text-ink-muted hover:text-ink transition-colors"
              >
                Close details
              </button>
            </div>
            <SlideDetailDiff
              diff={selectedDiff}
              snapshotA={snapshotA}
              snapshotB={snapshotB}
            />
          </div>
        )}
      </div>
    </div>
  );
}
