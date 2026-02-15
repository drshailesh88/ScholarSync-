/**
 * Core types for the citation and reference management system.
 */

// ---------------------------------------------------------------------------
// Author
// ---------------------------------------------------------------------------
export interface Author {
  given: string;
  family: string;
}

// ---------------------------------------------------------------------------
// Reference — per-document reference stored in the library
// ---------------------------------------------------------------------------
export interface Reference {
  id: string;
  documentId: string;

  // Core metadata
  type:
    | "article"
    | "book"
    | "chapter"
    | "website"
    | "guideline"
    | "conference"
    | "thesis"
    | "preprint"
    | "other";
  title: string;
  authors: Author[];
  year: number;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  pmcid?: string;
  url?: string;
  publisher?: string;
  abstract?: string;
  keywords?: string[];

  // ScholarSync-specific
  notes?: string;
  tags?: string[];
  pdfUrl?: string;
  dateAdded: string; // ISO timestamp

  // CSL-JSON representation for citeproc processing
  cslData: CSLItem;
}

// ---------------------------------------------------------------------------
// CSL-JSON Item (subset of the CSL-JSON spec relevant to us)
// ---------------------------------------------------------------------------
export interface CSLItem {
  id?: string;
  type: string; // "article-journal", "book", etc.
  title?: string;
  author?: Array<{ given?: string; family: string }>;
  issued?: { "date-parts": number[][] };
  "container-title"?: string;
  volume?: string;
  issue?: string;
  page?: string;
  DOI?: string;
  PMID?: string;
  PMCID?: string;
  URL?: string;
  publisher?: string;
  abstract?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Citation Node Attributes — stored in each Tiptap citation node
// ---------------------------------------------------------------------------
export interface CitationNodeAttrs {
  /** Reference IDs cited at this point (supports multi-citations) */
  referenceIds: string[];

  /** Per-reference overrides (v2 — prefix, suffix, suppress author, etc.) */
  overrides?: {
    [referenceId: string]: {
      prefix?: string;
      suffix?: string;
      suppressAuthor?: boolean;
      locator?: string;
      locatorType?: "page" | "chapter" | "figure" | "table" | "section";
    };
  };
}

// ---------------------------------------------------------------------------
// Citation Style
// ---------------------------------------------------------------------------
export type CitationStyleId =
  | "vancouver"
  | "apa"
  | "ama"
  | "icmje"
  | "harvard"
  | "chicago-author-date"
  | "ieee";

export interface CitationStyleInfo {
  id: CitationStyleId;
  name: string;
  description: string;
  example: string;
  isNumeric: boolean;
}

// ---------------------------------------------------------------------------
// Formatted citation output from CSL processor
// ---------------------------------------------------------------------------
export interface FormattedCitation {
  /** The formatted inline citation text, e.g. "[1]" or "(Smith, 2020)" */
  text: string;
}

export interface FormattedBibliographyEntry {
  id: string;
  html: string;
  text: string;
}

// ---------------------------------------------------------------------------
// API types for DOI/PMID resolution
// ---------------------------------------------------------------------------
export interface ResolveRequest {
  identifier: string;
  identifierType?: "doi" | "pmid" | "pmcid" | "url" | "auto";
}

export interface ResolveResponse {
  success: boolean;
  reference?: Reference;
  source: "crossref" | "pubmed" | "manual";
  confidence: "high" | "medium" | "low";
  error?: string;
}

export interface PubMedSearchRequest {
  query: string;
  filters?: {
    yearFrom?: number;
    yearTo?: number;
    articleType?:
      | "randomized-controlled-trial"
      | "review"
      | "meta-analysis"
      | "guideline"
      | "case-report";
  };
  page?: number;
  pageSize?: number;
}

export interface PubMedSearchResponse {
  results: Reference[];
  totalCount: number;
  page: number;
}
