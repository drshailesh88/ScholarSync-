// ============================================================================
// Reference Import Library — BibTeX, RIS, CSL-JSON, DOI parsing via citation-js
// Server-only: do NOT import this file in "use client" components.
// ============================================================================

import { Cite } from "@citation-js/core";
import "@citation-js/plugin-csl";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-ris";
import "@citation-js/plugin-doi";

import type { ParsedReference, ReferenceType } from "./types";

// Re-export types for convenience
export type { ParsedReference, ReferenceType } from "./types";
// Re-export the client-safe formatter
export { formatReferencesAsContent } from "./format";

// ---------------------------------------------------------------------------
// CSL type -> ReferenceType mapping
// ---------------------------------------------------------------------------

function mapCslType(cslType: string | undefined): ReferenceType {
  if (!cslType) return "other";
  const t = cslType.toLowerCase();
  if (
    t === "article-journal" ||
    t === "article-magazine" ||
    t === "article-newspaper" ||
    t === "article"
  )
    return "article";
  if (t === "book" || t === "monograph") return "book";
  if (t === "chapter") return "chapter";
  if (t === "paper-conference" || t.includes("conference") || t.includes("proceedings"))
    return "conference";
  if (t.includes("thesis") || t.includes("dissertation")) return "thesis";
  return "other";
}

// ---------------------------------------------------------------------------
// Format author from CSL-JSON author object
// ---------------------------------------------------------------------------

function formatAuthor(author: {
  family?: string;
  given?: string;
  literal?: string;
}): string {
  if (author.literal) return author.literal;
  if (author.family && author.given) {
    const initials = author.given
      .split(/[\s.-]+/)
      .filter(Boolean)
      .map((n: string) => n[0] + ".")
      .join(" ");
    return `${author.family}, ${initials}`;
  }
  if (author.family) return author.family;
  return "Unknown";
}

// ---------------------------------------------------------------------------
// Extract year from CSL-JSON date-parts
// ---------------------------------------------------------------------------

function extractYear(
  issued: { "date-parts"?: number[][] } | undefined
): number {
  if (issued?.["date-parts"]?.[0]?.[0]) {
    return issued["date-parts"][0][0];
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Map a single CSL-JSON entry to ParsedReference
// ---------------------------------------------------------------------------

function cslToReference(
  item: Record<string, unknown>,
  index: number
): ParsedReference {
  const authors = Array.isArray(item.author)
    ? (item.author as { family?: string; given?: string; literal?: string }[]).map(
        formatAuthor
      )
    : [];

  const year = extractYear(
    item.issued as { "date-parts"?: number[][] } | undefined
  );

  return {
    id:
      (item.id as string) ||
      (item.DOI as string) ||
      `ref-${index}-${Date.now()}`,
    title: (item.title as string) || "Untitled",
    authors,
    year,
    journal:
      (item["container-title"] as string) ||
      (item["journal-abbreviation"] as string) ||
      undefined,
    doi: (item.DOI as string) || undefined,
    abstract: (item.abstract as string) || undefined,
    type: mapCslType(item.type as string | undefined),
    volume: (item.volume as string) || undefined,
    issue: (item.issue as string) || undefined,
    pages: (item.page as string) || undefined,
    publisher: (item.publisher as string) || undefined,
    url: (item.URL as string) || undefined,
    rawCsl: item,
  };
}

// ---------------------------------------------------------------------------
// Public Parsers
// ---------------------------------------------------------------------------

/**
 * Parse a BibTeX string into an array of ParsedReference objects.
 */
export function parseBibTeX(bibtexString: string): ParsedReference[] {
  if (!bibtexString.trim()) return [];

  const cite = new Cite(bibtexString);
  const data = cite.get({
    format: "real",
    type: "json",
    style: "csl",
  }) as Record<string, unknown>[];

  return data.map((item: Record<string, unknown>, i: number) => cslToReference(item, i));
}

/**
 * Parse an RIS string into an array of ParsedReference objects.
 */
export function parseRIS(risString: string): ParsedReference[] {
  if (!risString.trim()) return [];

  const cite = new Cite(risString);
  const data = cite.get({
    format: "real",
    type: "json",
    style: "csl",
  }) as Record<string, unknown>[];

  return data.map((item: Record<string, unknown>, i: number) => cslToReference(item, i));
}

/**
 * Parse CSL-JSON (array or object) into ParsedReference[].
 */
export function parseCslJson(
  json: Record<string, unknown>[] | Record<string, unknown>
): ParsedReference[] {
  const items = Array.isArray(json) ? json : [json];
  return items.map((item: Record<string, unknown>, i: number) => cslToReference(item, i));
}

/**
 * Resolve a DOI to a ParsedReference via citation-js.
 */
export async function resolveDoiToReference(
  doi: string
): Promise<ParsedReference | null> {
  try {
    const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//, "").trim();
    if (!cleanDoi) return null;

    const cite = await Cite.async(cleanDoi);
    const data = cite.get({
      format: "real",
      type: "json",
      style: "csl",
    }) as Record<string, unknown>[];

    if (data.length === 0) return null;
    return cslToReference(data[0], 0);
  } catch {
    return null;
  }
}

/**
 * Auto-detect format and parse any supported reference string.
 * Supports BibTeX, RIS, DOI, CSL-JSON.
 */
export function parseAny(input: string): ParsedReference[] {
  if (!input.trim()) return [];

  // Try to detect CSL-JSON
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed) || (typeof parsed === "object" && parsed !== null)) {
      return parseCslJson(parsed as Record<string, unknown>[] | Record<string, unknown>);
    }
  } catch {
    // Not JSON, continue
  }

  // Let citation-js auto-detect (handles BibTeX, RIS, etc.)
  const cite = new Cite(input);
  const data = cite.get({
    format: "real",
    type: "json",
    style: "csl",
  }) as Record<string, unknown>[];

  return data.map((item: Record<string, unknown>, i: number) => cslToReference(item, i));
}
