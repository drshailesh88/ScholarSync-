import type { NavigationTarget } from "./types";

/**
 * Creates a navigation target for jumping to a specific page and passage in the PDF.
 */
export function createNavigationTarget(
  pageNumber: number,
  startOffset?: number,
  endOffset?: number
): NavigationTarget {
  return {
    pageNumber,
    highlightSpan:
      startOffset != null && endOffset != null
        ? { startOffset, endOffset }
        : undefined,
  };
}

/**
 * Parses page references from text (e.g., "page 4", "p.5", "(p.4, Methods)").
 * Returns an array of page numbers found.
 */
export function parsePageReferences(text: string): number[] {
  const pattern = /(?:page\s+(\d+)|p\.?\s*(\d+))/gi;
  const pages: number[] = [];
  const seen = new Set<number>();

  let match;
  while ((match = pattern.exec(text)) !== null) {
    const pageNum = parseInt(match[1] || match[2], 10);
    if (!isNaN(pageNum) && !seen.has(pageNum)) {
      seen.add(pageNum);
      pages.push(pageNum);
    }
  }

  return pages;
}

/**
 * Builds a context string from highlighted passages for AI consumption.
 */
export function buildHighlightsContext(
  highlights: Array<{
    pageNumber: number;
    selectedText: string;
    note?: string;
    color: string;
    targetSection?: string;
  }>
): string {
  if (highlights.length === 0) return "";

  let context = "User's highlights and annotations on this paper:\n";
  for (const hl of highlights) {
    context += `\n[Page ${hl.pageNumber}, ${hl.color}`;
    if (hl.targetSection) context += `, Target: ${hl.targetSection}`;
    context += `]\n"${hl.selectedText}"`;
    if (hl.note) context += `\nUser note: "${hl.note}"`;
    context += "\n";
  }

  return context;
}
