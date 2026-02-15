export type EvidenceLevel = "I" | "II" | "III" | "IV" | "V";

export interface UnifiedSearchResult {
  // Identifiers
  doi?: string;
  pmid?: string;
  s2Id?: string;
  openalexId?: string;

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

  // Clinical trial fields (only populated for ClinicalTrials.gov results)
  nctId?: string;
  trialStatus?: string;
  trialPhase?: string;

  // Provenance
  sources: string[];
  rrfScore?: number;
  rerankScore?: number;

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
  sourceCounts: {
    pubmed: number;
    semanticScholar: number;
    openAlex: number;
    clinicalTrials: number;
  };
  augmentedQueries?: {
    pubmed: string;
    semanticScholar: string;
    openAlex: string;
  };
}
