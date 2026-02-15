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
  work: any,
  documentId: string
): Reference {
  const id = `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const authors: Author[] = (work.author || []).map((a: any) => ({
    given: a.given || "",
    family: a.family || "Unknown",
  }));

  const title = Array.isArray(work.title)
    ? work.title[0]
    : work.title || "Untitled";

  const journal = Array.isArray(work["container-title"])
    ? work["container-title"][0]
    : work["container-title"];

  const year =
    work.issued?.["date-parts"]?.[0]?.[0] ||
    work.published?.["date-parts"]?.[0]?.[0] ||
    null;

  const cslData: CSLItem = {
    id,
    type: mapCrossrefType(work.type) || "article-journal",
    title,
    author: authors.map((a) => ({ given: a.given, family: a.family })),
    "container-title": journal || undefined,
    volume: work.volume || undefined,
    issue: work.issue || undefined,
    page: work.page || undefined,
    DOI: work.DOI || undefined,
    publisher: work.publisher || undefined,
    abstract: work.abstract || undefined,
  };

  if (year) {
    cslData.issued = { "date-parts": [[year]] };
  }

  return {
    id,
    documentId,
    type: mapCrossrefType(work.type) === "book" ? "book" : "article",
    title,
    authors,
    year: year || 0,
    journal: journal || undefined,
    volume: work.volume || undefined,
    issue: work.issue || undefined,
    pages: work.page || undefined,
    doi: work.DOI || undefined,
    publisher: work.publisher || undefined,
    abstract: work.abstract
      ? work.abstract.replace(/<[^>]+>/g, "")
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
