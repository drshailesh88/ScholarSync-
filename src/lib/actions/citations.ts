"use server";

import {
  formatCitation as _formatCitation,
  formatInTextCitation as _formatInTextCitation,
  generateBibTeX as _generateBibTeX,
  type PaperData,
  type CitationStyle,
} from "@/lib/citations";

/**
 * Server action: format a full bibliography citation.
 */
export async function formatCitationAction(
  paper: PaperData,
  style: CitationStyle
): Promise<string> {
  return _formatCitation(paper, style);
}

/**
 * Server action: format an in-text (parenthetical) citation.
 */
export async function formatInTextAction(
  paper: PaperData,
  style: CitationStyle
): Promise<string> {
  return _formatInTextCitation(paper, style);
}

/**
 * Server action: return all citation formats at once for a paper.
 * Useful for the citation modal so we can fetch everything in one call.
 */
export async function getAllCitationFormats(paper: PaperData): Promise<{
  apa: { full: string; inText: string };
  mla: { full: string; inText: string };
  chicago: { full: string; inText: string };
  vancouver: { full: string; inText: string };
  harvard: { full: string; inText: string };
  bibtex: string;
}> {
  const styles: CitationStyle[] = ["apa", "mla", "chicago", "vancouver", "harvard"];
  const result: Record<string, { full: string; inText: string }> = {};

  for (const style of styles) {
    result[style] = {
      full: _formatCitation(paper, style),
      inText: _formatInTextCitation(paper, style),
    };
  }

  return {
    ...result,
    bibtex: _generateBibTeX(paper),
  } as {
    apa: { full: string; inText: string };
    mla: { full: string; inText: string };
    chicago: { full: string; inText: string };
    vancouver: { full: string; inText: string };
    harvard: { full: string; inText: string };
    bibtex: string;
  };
}
