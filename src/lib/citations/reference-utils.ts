/**
 * Utility functions for reference data conversion and normalization.
 */
import type { Reference, CSLItem, Author } from "@/types/citation";

/**
 * Detect identifier type from a string.
 */
export function detectIdentifierType(
  identifier: string
): "doi" | "pmid" | "pmcid" | "url" | "unknown" {
  const trimmed = identifier.trim();

  // DOI patterns
  if (trimmed.startsWith("10.") || trimmed.includes("doi.org/")) {
    return "doi";
  }

  // PMCID
  if (/^PMC\d+$/i.test(trimmed)) {
    return "pmcid";
  }

  // PMID (pure digits, 1-8 chars)
  if (/^\d{1,8}$/.test(trimmed)) {
    return "pmid";
  }

  // URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return "url";
  }

  return "unknown";
}

/**
 * Extract a clean DOI from various input formats.
 */
export function extractDoi(input: string): string | null {
  // Direct DOI
  if (input.startsWith("10.")) return input.trim();

  // From URL
  const doiMatch = input.match(/(?:doi\.org\/|dx\.doi\.org\/)(10\.\S+)/i);
  if (doiMatch) return doiMatch[1].replace(/[\s)}\]]+$/, "");

  return null;
}

/**
 * Convert a CrossRef API response work item to a Reference object.
 */
export function crossrefToReference(
  work: Record<string, unknown>,
  documentId: string
): Reference {
  const id = `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const authors: Author[] = ((work.author as { given?: string; family?: string }[]) || []).map((a: { given?: string; family?: string }) => ({
    given: a.given || "",
    family: a.family || "Unknown",
  }));

  const title = Array.isArray(work.title)
    ? (work.title as string[])[0]
    : (work.title as string) || "Untitled";

  const journal = Array.isArray(work["container-title"])
    ? (work["container-title"] as string[])[0]
    : (work["container-title"] as string | undefined);

  const issued = work.issued as { "date-parts"?: number[][] } | undefined;
  const published = work.published as { "date-parts"?: number[][] } | undefined;
  const year =
    issued?.["date-parts"]?.[0]?.[0] ||
    published?.["date-parts"]?.[0]?.[0] ||
    null;

  const cslData: CSLItem = {
    id,
    type: mapCrossrefType(work.type as string | undefined) || "article-journal",
    title,
    author: authors.map((a) => ({ given: a.given, family: a.family })),
    "container-title": journal || undefined,
    volume: (work.volume as string) || undefined,
    issue: (work.issue as string) || undefined,
    page: (work.page as string) || undefined,
    DOI: (work.DOI as string) || undefined,
    publisher: (work.publisher as string) || undefined,
    abstract: (work.abstract as string) || undefined,
  };

  if (year) {
    cslData.issued = { "date-parts": [[year]] };
  }

  const abstractStr = work.abstract as string | undefined;

  return {
    id,
    documentId,
    type: mapCrossrefType(work.type as string | undefined) === "book" ? "book" : "article",
    title,
    authors,
    year: year || 0,
    journal: journal || undefined,
    volume: (work.volume as string) || undefined,
    issue: (work.issue as string) || undefined,
    pages: (work.page as string) || undefined,
    doi: (work.DOI as string) || undefined,
    publisher: (work.publisher as string) || undefined,
    abstract: abstractStr
      ? abstractStr.replace(/<[^>]+>/g, "")
      : undefined,
    dateAdded: new Date().toISOString(),
    cslData,
  };
}

/**
 * Build CSL-JSON data from a Reference object.
 */
export function referenceToCsl(ref: Reference): CSLItem {
  if (ref.cslData?.title) return { ...ref.cslData, id: ref.id };

  const csl: CSLItem = {
    id: ref.id,
    type: mapReferenceTypeToCsl(ref.type),
    title: ref.title,
    author: ref.authors.map((a) => ({
      given: a.given,
      family: a.family,
    })),
  };

  if (ref.journal) csl["container-title"] = ref.journal;
  if (ref.volume) csl.volume = ref.volume;
  if (ref.issue) csl.issue = ref.issue;
  if (ref.pages) csl.page = ref.pages;
  if (ref.doi) csl.DOI = ref.doi;
  if (ref.pmid) csl.PMID = ref.pmid;
  if (ref.url) csl.URL = ref.url;
  if (ref.publisher) csl.publisher = ref.publisher;
  if (ref.year) {
    csl.issued = { "date-parts": [[ref.year]] };
  }

  return csl;
}

function mapCrossrefType(type: string | undefined): string {
  const map: Record<string, string> = {
    "journal-article": "article-journal",
    "book-chapter": "chapter",
    "proceedings-article": "paper-conference",
    monograph: "book",
    book: "book",
    report: "report",
    thesis: "thesis",
  };
  return map[type || ""] || "article-journal";
}

function mapReferenceTypeToCsl(type: Reference["type"]): string {
  const map: Record<string, string> = {
    article: "article-journal",
    book: "book",
    chapter: "chapter",
    website: "webpage",
    guideline: "report",
    conference: "paper-conference",
    thesis: "thesis",
    preprint: "article",
    other: "article",
  };
  return map[type] || "article-journal";
}
