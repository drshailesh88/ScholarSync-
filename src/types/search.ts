import type { SourceStatus } from "@/lib/search/source-status";

export type { SourceStatus, SourceStatusKind } from "@/lib/search/source-status";

export type EvidenceLevel = "I" | "II" | "III" | "IV" | "V";

export interface UnifiedSearchResult {
  // Identifiers
  doi?: string;
  pmid?: string;
  s2Id?: string;
  openalexId?: string;
  arxivId?: string;
  url?: string;
  domain?: string;
  publishedAt?: string;
  sourceLabel?: string;
  platform?: string;
  community?: string;
  engagement?: string;

  // Core metadata
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract?: string;
  tldr?: string;

  // Metrics
  citationCount: number;
  influentialCitationCount?: number;
  referenceCount?: number;

  // Classification
  studyType?: string;
  evidenceLevel?: EvidenceLevel;
  publicationTypes: string[];
  meshTerms?: string[];
  fieldsOfStudy?: string[];
  concepts?: string[];

  // Access
  isOpenAccess: boolean;
  openAccessPdfUrl?: string | null;

  // Journal quality (enriched from Scimago data)
  journalQuartile?: "Q1" | "Q2" | "Q3" | "Q4" | null;
  journalImpactProxy?: number | null; // Cites per doc (2 years)

  // Clinical trial fields (only populated for ClinicalTrials.gov results)
  nctId?: string;
  trialStatus?: string;
  trialPhase?: string;

  // Provenance
  sources: string[];
  rrfScore?: number;
  rerankScore?: number;
  trustTier?: "government" | "major_journalism" | "community" | "other";
  domainPreferenceLevel?: "mute" | "lower" | "neutral" | "higher" | "prefer";

  // PICO (if extracted)
  pico?: {
    population: string;
    intervention: string;
    comparison: string;
    outcome: string;
  };
}

export interface SearchFilters {
  yearStart?: number;
  yearEnd?: number;
  studyTypes?: string[];
  openAccessOnly?: boolean;
  minCitations?: number;
}

export interface SearchResponse {
  results: UnifiedSearchResult[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
  sourceCounts: Record<string, number>;
  /**
   * Per-source health. A source absent from this map (or marked "ok" with zero
   * results) returned a genuine empty set; any other status means the source
   * was degraded and its zero count must not be read as "no results".
   */
  sourceStatuses?: Record<string, SourceStatus>;
  searxngUnavailable?: boolean;
  augmentedQueries?: {
    pubmed: string;
    semanticScholar: string;
    openAlex: string;
  };
}
