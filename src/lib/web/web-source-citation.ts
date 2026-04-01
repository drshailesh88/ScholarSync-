/**
 * Web source citation formatting.
 * Converts web source metadata + optional highlight text into a citable reference
 * compatible with the existing CitationNode in the editor.
 */

export interface WebSourceCitationData {
  id: number;
  title: string;
  url: string;
  domain: string;
  author?: string | null;
  publishDate?: Date | string | null;
  highlightText?: string | null;
}

/**
 * Format a web source as an APA-style reference (default for web content).
 */
export function formatWebSourceCitation(source: WebSourceCitationData): string {
  const author = source.author || source.domain;
  const year = getYear(source.publishDate);
  const yearStr = year ? ` (${year})` : " (n.d.)";

  return `${author}${yearStr}. ${source.title}. Retrieved from ${source.url}`;
}

/**
 * Format a web source as an in-text citation.
 */
export function formatWebSourceInText(source: WebSourceCitationData): string {
  const author = source.author
    ? source.author.split(",")[0].trim()
    : source.domain;
  const year = getYear(source.publishDate);
  return `(${author}, ${year || "n.d."})`;
}

/**
 * Build a reference snapshot for the editor's CitationNode.
 * This is stored inline in the document so citations survive source deletion.
 */
export function buildWebSourceReferenceSnapshot(
  source: WebSourceCitationData
): {
  type: "web_source";
  id: number;
  title: string;
  url: string;
  author: string;
  year: number | null;
  highlightText: string | null;
} {
  return {
    type: "web_source",
    id: source.id,
    title: source.title,
    url: source.url,
    author: source.author || source.domain,
    year: getYear(source.publishDate),
    highlightText: source.highlightText || null,
  };
}

function getYear(date?: Date | string | null): number | null {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  return isNaN(d.getTime()) ? null : d.getFullYear();
}
