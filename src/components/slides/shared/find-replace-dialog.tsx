"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  MagnifyingGlass,
  ArrowUp,
  ArrowDown,
  X,
} from "@phosphor-icons/react";
import { useSlidesStore, type SlideState } from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MatchLocation {
  slideId: number;
  field: "title" | "subtitle" | "speakerNotes" | "blockData";
  /** Index into slide.contentBlocks (only for blockData) */
  blockIndex?: number;
  /** The key within block.data that matched (only for blockData) */
  dataKey?: string;
  /** Character offset of the match within the field value */
  charIndex: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Collect every string-valued property from a content block's `data`,
 * returning tuples of [key, value].
 */
function extractSearchableBlockFields(
  block: ContentBlock
): [string, string][] {
  const results: [string, string][] = [];
  const data = block.data as Record<string, unknown>;
  for (const [key, val] of Object.entries(data)) {
    if (typeof val === "string") {
      results.push([key, val]);
    }
  }
  return results;
}

function findAllMatches(
  slides: SlideState[],
  query: string,
  caseSensitive: boolean
): MatchLocation[] {
  if (!query) return [];

  const matches: MatchLocation[] = [];
  const q = caseSensitive ? query : query.toLowerCase();

  for (const slide of slides) {
    // Helper to scan a string field
    const scan = (
      text: string,
      field: MatchLocation["field"],
      blockIndex?: number,
      dataKey?: string
    ) => {
      const haystack = caseSensitive ? text : text.toLowerCase();
      let start = 0;
      while (true) {
        const idx = haystack.indexOf(q, start);
        if (idx === -1) break;
        matches.push({ slideId: slide.id, field, blockIndex, dataKey, charIndex: idx });
        start = idx + 1;
      }
    };

    scan(slide.title, "title");
    scan(slide.subtitle, "subtitle");
    scan(slide.speakerNotes, "speakerNotes");

    slide.contentBlocks.forEach((block, bi) => {
      for (const [key, val] of extractSearchableBlockFields(block)) {
        scan(val, "blockData", bi, key);
      }
    });
  }

  return matches;
}

function applyReplace(
  slides: SlideState[],
  match: MatchLocation,
  query: string,
  replacement: string,
  caseSensitive: boolean
): Partial<SlideState> | null {
  const slide = slides.find((s) => s.id === match.slideId);
  if (!slide) return null;

  const replaceIn = (text: string, charIndex: number): string => {
    // Verify the match is still there (in case of concurrent edits)
    const segment = text.slice(charIndex, charIndex + query.length);
    const matches = caseSensitive
      ? segment === query
      : segment.toLowerCase() === query.toLowerCase();
    if (!matches) return text;
    return text.slice(0, charIndex) + replacement + text.slice(charIndex + query.length);
  };

  switch (match.field) {
    case "title":
      return { title: replaceIn(slide.title, match.charIndex) };
    case "subtitle":
      return { subtitle: replaceIn(slide.subtitle, match.charIndex) };
    case "speakerNotes":
      return { speakerNotes: replaceIn(slide.speakerNotes, match.charIndex) };
    case "blockData": {
      if (match.blockIndex === undefined || !match.dataKey) return null;
      const block = slide.contentBlocks[match.blockIndex];
      if (!block) return null;
      const data = block.data as Record<string, unknown>;
      const val = data[match.dataKey];
      if (typeof val !== "string") return null;
      const newBlocks = [...slide.contentBlocks];
      newBlocks[match.blockIndex] = {
        ...block,
        data: { ...data, [match.dataKey]: replaceIn(val, match.charIndex) },
      } as ContentBlock;
      return { contentBlocks: newBlocks };
    }
    default:
      return null;
  }
}

function replaceAllOccurrences(
  text: string,
  query: string,
  replacement: string,
  caseSensitive: boolean
): string {
  if (!query) return text;
  const flags = caseSensitive ? "g" : "gi";
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(escaped, flags), replacement);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FindReplaceDialog() {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useSlidesStore((s) => s.slides);
  const setShowFindReplace = useSlidesStore((s) => s.setShowFindReplace);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  const findInputRef = useRef<HTMLInputElement>(null);

  // Wrappers that reset currentIndex when search params change
  const handleFindChange = useCallback((value: string) => {
    setFindText(value);
    setCurrentIndex(0);
  }, []);

  const handleCaseToggle = useCallback((value: boolean) => {
    setCaseSensitive(value);
    setCurrentIndex(0);
  }, []);

  // Compute matches
  const matches = findAllMatches(slides, findText, caseSensitive);
  const totalMatches = matches.length;

  // Clamp currentIndex
  const safeIndex = totalMatches === 0 ? 0 : Math.min(currentIndex, totalMatches - 1);

  // Navigate to the current match's slide
  useEffect(() => {
    if (totalMatches > 0 && matches[safeIndex]) {
      setActiveSlide(matches[safeIndex].slideId);
    }
  }, [safeIndex, totalMatches, matches, setActiveSlide]);

  // Auto-focus the find input on mount
  useEffect(() => {
    findInputRef.current?.focus();
  }, []);

  const goNext = useCallback(() => {
    if (totalMatches === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalMatches);
  }, [totalMatches]);

  const goPrev = useCallback(() => {
    if (totalMatches === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalMatches) % totalMatches);
  }, [totalMatches]);

  const handleReplace = useCallback(() => {
    if (totalMatches === 0 || !findText) return;
    const match = matches[safeIndex];
    if (!match) return;

    const currentSlides = useSlidesStore.getState().slides;
    const patch = applyReplace(currentSlides, match, findText, replaceText, caseSensitive);
    if (patch) {
      updateSlide(match.slideId, patch);
    }
    // After replacing, the match list shifts — keep index or move to next
    // (the match array will recompute on next render)
  }, [totalMatches, findText, replaceText, caseSensitive, matches, safeIndex, updateSlide]);

  const handleReplaceAll = useCallback(() => {
    if (totalMatches === 0 || !findText) return;

    const currentSlides = useSlidesStore.getState().slides;
    // Group replacements by slide to batch updates
    const slideIds = [...new Set(matches.map((m) => m.slideId))];

    for (const slideId of slideIds) {
      const slide = currentSlides.find((s) => s.id === slideId);
      if (!slide) continue;

      const patch: Partial<SlideState> = {};

      // Replace in top-level string fields
      patch.title = replaceAllOccurrences(slide.title, findText, replaceText, caseSensitive);
      patch.subtitle = replaceAllOccurrences(slide.subtitle, findText, replaceText, caseSensitive);
      patch.speakerNotes = replaceAllOccurrences(slide.speakerNotes, findText, replaceText, caseSensitive);

      // Replace in content blocks
      const newBlocks = slide.contentBlocks.map((block) => {
        const data = block.data as Record<string, unknown>;
        let changed = false;
        const newData: Record<string, unknown> = { ...data };
        for (const [key, val] of Object.entries(data)) {
          if (typeof val === "string") {
            const replaced = replaceAllOccurrences(val, findText, replaceText, caseSensitive);
            if (replaced !== val) {
              newData[key] = replaced;
              changed = true;
            }
          }
        }
        return changed ? ({ ...block, data: newData } as ContentBlock) : block;
      });
      patch.contentBlocks = newBlocks;

      updateSlide(slideId, patch);
    }

    setCurrentIndex(0);
  }, [totalMatches, findText, replaceText, caseSensitive, matches, updateSlide]);

  const handleClose = useCallback(() => {
    setShowFindReplace(false);
  }, [setShowFindReplace]);

  // Keyboard shortcuts inside the dialog
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "Enter") {
        if (e.shiftKey) {
          goPrev();
        } else {
          goNext();
        }
      }
    },
    [handleClose, goNext, goPrev]
  );

  return (
    <div
      className="fixed top-16 right-4 z-50 w-80 bg-surface border border-border rounded-xl shadow-lg p-4"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <MagnifyingGlass size={16} />
          Find & Replace
        </div>
        <button
          onClick={handleClose}
          className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Close find & replace"
        >
          <X size={14} />
        </button>
      </div>

      {/* Find input */}
      <div className="space-y-2">
        <div className="relative">
          <input aria-label="Text input"
            ref={findInputRef}
            type="text"
            value={findText}
            onChange={(e) => handleFindChange(e.target.value)}
            placeholder="Find..."
            className="w-full px-3 py-1.5 text-sm bg-surface-raised border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Replace input */}
        <input aria-label="Text input"
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with..."
          className="w-full px-3 py-1.5 text-sm bg-surface-raised border border-border rounded-lg text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      {/* Options row */}
      <div className="flex items-center gap-3 mt-3">
        <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer select-none">
          <input aria-label="Checkbox"
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => handleCaseToggle(e.target.checked)}
            className="rounded border-border"
          />
          Case sensitive
        </label>

        {/* Match count */}
        <span className="ml-auto text-xs text-ink-muted">
          {totalMatches === 0
            ? findText
              ? "No matches"
              : "\u00A0"
            : `${safeIndex + 1} of ${totalMatches}`}
        </span>
      </div>

      {/* Navigation + actions */}
      <div className="flex items-center gap-1.5 mt-3">
        <button
          onClick={goPrev}
          disabled={totalMatches === 0}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Previous match (Shift+Enter)"
          aria-label="Previous match"
        >
          <ArrowUp size={14} />
        </button>
        <button
          onClick={goNext}
          disabled={totalMatches === 0}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Next match (Enter)"
          aria-label="Next match"
        >
          <ArrowDown size={14} />
        </button>

        <div className="flex-1" />

        <button
          onClick={handleReplace}
          disabled={totalMatches === 0}
          className="px-2.5 py-1 text-xs font-medium rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised border border-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Replace
        </button>
        <button
          onClick={handleReplaceAll}
          disabled={totalMatches === 0}
          className="px-2.5 py-1 text-xs font-medium rounded-lg text-white bg-brand hover:bg-brand/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Replace All
        </button>
      </div>
    </div>
  );
}
