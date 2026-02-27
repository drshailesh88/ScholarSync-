// =============================================================================
// Figure & Table Auto-Numbering Utility
// Walks all slides in order, assigns sequential Figure/Table numbers,
// and provides cross-reference resolution for text blocks.
// =============================================================================

import type { ContentBlock } from "@/types/presentation";

/** A slide-like object with contentBlocks and a sortOrder for ordering */
export interface NumberableSlide {
  sortOrder?: number;
  contentBlocks: ContentBlock[];
}

/**
 * Walks all slides in sortOrder, walks contentBlocks in array order.
 * For chart/image/diagram blocks: assigns figureLabel = "Figure N"
 * For table blocks: assigns figureLabel = "Table N"
 *
 * Returns a new array of slides with updated blocks (does NOT mutate the input).
 */
export function autoNumberFiguresAndTables<T extends NumberableSlide>(
  slides: T[]
): T[] {
  let figureCount = 0;
  let tableCount = 0;

  // Sort by sortOrder if present, otherwise preserve array order
  const sorted = [...slides].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );

  return sorted.map((slide) => {
    const updatedBlocks = slide.contentBlocks.map((block) => {
      if (
        block.type === "chart" ||
        block.type === "image" ||
        block.type === "diagram"
      ) {
        figureCount++;
        return {
          ...block,
          figureLabel: `Figure ${figureCount}`,
        };
      }
      if (block.type === "table") {
        tableCount++;
        return {
          ...block,
          figureLabel: `Table ${tableCount}`,
        };
      }
      return block;
    });

    return {
      ...slide,
      contentBlocks: updatedBlocks as ContentBlock[],
    };
  });
}

/**
 * Cross-reference regex pattern.
 * Matches {fig:N} and {tbl:N} tokens in text.
 */
const CROSS_REF_REGEX = /\{(fig|tbl):(\d+)\}/g;

/**
 * Resolves cross-reference tokens in a text string.
 * Replaces {fig:N} with "Figure N" and {tbl:N} with "Table N".
 *
 * Returns an array of segments (text or styled reference) for React rendering.
 */
export interface CrossRefSegment {
  type: "text" | "figure_ref" | "table_ref";
  content: string;
  number?: number;
}

export function resolveCrossReferences(text: string): CrossRefSegment[] {
  const segments: CrossRefSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(CROSS_REF_REGEX)) {
    const matchIndex = match.index!;

    // Add preceding text
    if (matchIndex > lastIndex) {
      segments.push({
        type: "text",
        content: text.slice(lastIndex, matchIndex),
      });
    }

    const refType = match[1]; // "fig" or "tbl"
    const refNum = parseInt(match[2], 10);

    if (refType === "fig") {
      segments.push({
        type: "figure_ref",
        content: `Figure ${refNum}`,
        number: refNum,
      });
    } else {
      segments.push({
        type: "table_ref",
        content: `Table ${refNum}`,
        number: refNum,
      });
    }

    lastIndex = matchIndex + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  // If no refs found, return the original text as a single segment
  if (segments.length === 0) {
    segments.push({ type: "text", content: text });
  }

  return segments;
}

/**
 * Simple string replacement for non-React contexts (e.g., PPTX export).
 * Replaces {fig:N} with "Figure N" and {tbl:N} with "Table N".
 */
export function resolveCrossReferencesPlain(text: string): string {
  return text.replace(CROSS_REF_REGEX, (_match, type: string, num: string) => {
    return type === "fig" ? `Figure ${num}` : `Table ${num}`;
  });
}
