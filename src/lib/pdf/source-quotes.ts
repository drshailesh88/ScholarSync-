import type { SourceQuote } from "./types";

/**
 * Creates a source quote record from a PDF selection.
 */
export function createSourceQuote(
  paperId: string,
  pageNumber: number,
  quotedText: string,
  startOffset: number,
  endOffset: number,
  sectionName?: string
): SourceQuote {
  return {
    id: `sq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    paperId,
    pageNumber,
    sectionName,
    startOffset,
    endOffset,
    quotedText,
    usedIn: [],
  };
}

/**
 * Adds a usage reference to a source quote.
 */
export function addUsageToQuote(
  quote: SourceQuote,
  type: SourceQuote["usedIn"][number]["type"],
  referenceId?: string
): SourceQuote {
  return {
    ...quote,
    usedIn: [...quote.usedIn, { type, referenceId }],
  };
}

/**
 * Formats a source quote for display in AI chat responses.
 */
export function formatSourceQuoteForDisplay(quote: SourceQuote): string {
  let display = `Source: Page ${quote.pageNumber}`;
  if (quote.sectionName) display += `, ${quote.sectionName}`;
  display += `\n"${quote.quotedText}"`;
  return display;
}
