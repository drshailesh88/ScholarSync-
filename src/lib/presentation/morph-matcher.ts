import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Morph Matcher — computes stable IDs for matching elements across slides
// ---------------------------------------------------------------------------

/**
 * Simple string hash (djb2) that produces a stable numeric hash.
 */
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Derive a match key for a content block based on its type and data signature.
 * Returns null if the block type is not matchable.
 */
function getBlockMatchKey(block: ContentBlock): string | null {
  const data = block.data as Record<string, unknown>;

  switch (block.type) {
    case "text": {
      const text = typeof data.text === "string" ? data.text : "";
      const prefix = text.slice(0, 20);
      return prefix.length > 0 ? `text:${prefix}` : null;
    }
    case "image": {
      const url = typeof data.url === "string" ? data.url : "";
      return url.length > 0 ? `image:${url}` : null;
    }
    case "bullets": {
      const items = Array.isArray(data.items) ? data.items : [];
      const sig = items.slice(0, 3).map((item: unknown) =>
        typeof item === "string" ? item.slice(0, 15) : ""
      ).join("|");
      return sig.length > 0 ? `bullets:${sig}` : null;
    }
    case "chart": {
      const chartType = typeof data.chartType === "string" ? data.chartType : "";
      const title = typeof data.title === "string" ? data.title.slice(0, 20) : "";
      return `chart:${chartType}:${title}`;
    }
    case "code": {
      const code = typeof data.code === "string" ? data.code.slice(0, 30) : "";
      return code.length > 0 ? `code:${code}` : null;
    }
    case "table": {
      const headers = Array.isArray(data.headers) ? data.headers : [];
      const sig = headers.slice(0, 4).map((h: unknown) =>
        typeof h === "string" ? h.slice(0, 10) : ""
      ).join("|");
      return sig.length > 0 ? `table:${sig}` : null;
    }
    case "quote": {
      const text = typeof data.text === "string" ? data.text.slice(0, 20) : "";
      return text.length > 0 ? `quote:${text}` : null;
    }
    case "math": {
      const expr = typeof data.expression === "string" ? data.expression.slice(0, 30) : "";
      return expr.length > 0 ? `math:${expr}` : null;
    }
    case "stat_result": {
      const label = typeof data.label === "string" ? data.label.slice(0, 20) : "";
      return label.length > 0 ? `stat:${label}` : null;
    }
    default:
      return null;
  }
}

/**
 * Generate a stable morphId from a match key.
 */
function morphIdFromKey(type: string, matchKey: string): string {
  return `morph-${type}-${djb2Hash(matchKey)}`;
}

interface SlideForMorph {
  title?: string | null;
  subtitle?: string | null;
  contentBlocks: ContentBlock[];
}

/**
 * Compute morphIds for every block in a slide.
 * Returns a Map from block index → morphId.
 * Title and subtitle get special fixed IDs.
 */
export function computeMorphIds(
  slide: SlideForMorph
): Map<number, string> {
  const ids = new Map<number, string>();

  slide.contentBlocks.forEach((block, index) => {
    const matchKey = getBlockMatchKey(block);
    if (matchKey) {
      ids.set(index, morphIdFromKey(block.type, matchKey));
    }
  });

  return ids;
}

export interface MorphPair {
  fromIndex: number;
  toIndex: number;
  morphId: string;
}

/**
 * Find matching block pairs between two slides.
 * Blocks match when they share the same morphId (type + data signature).
 * Each block participates in at most one pair (first match wins).
 */
export function findMorphPairs(
  fromSlide: SlideForMorph,
  toSlide: SlideForMorph
): MorphPair[] {
  const fromIds = computeMorphIds(fromSlide);
  const toIds = computeMorphIds(toSlide);
  const pairs: MorphPair[] = [];
  const usedTo = new Set<number>();

  // Also match title/subtitle
  if (fromSlide.title && toSlide.title) {
    pairs.push({
      fromIndex: -1, // sentinel for title
      toIndex: -1,
      morphId: "morph-title",
    });
  }
  if (fromSlide.subtitle && toSlide.subtitle) {
    pairs.push({
      fromIndex: -2, // sentinel for subtitle
      toIndex: -2,
      morphId: "morph-subtitle",
    });
  }

  for (const [fromIdx, fromMorphId] of fromIds) {
    for (const [toIdx, toMorphId] of toIds) {
      if (usedTo.has(toIdx)) continue;
      if (fromMorphId === toMorphId) {
        pairs.push({ fromIndex: fromIdx, toIndex: toIdx, morphId: fromMorphId });
        usedTo.add(toIdx);
        break;
      }
    }
  }

  return pairs;
}

/**
 * Get the morphId for title element.
 */
export const MORPH_TITLE_ID = "morph-title";

/**
 * Get the morphId for subtitle element.
 */
export const MORPH_SUBTITLE_ID = "morph-subtitle";
