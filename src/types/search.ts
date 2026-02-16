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

  // Journal quality (enriched from Scimago data)
  journalQuartile?: "Q1" | "Q2" | "Q3" | "Q4" | null;
  journalImpactProxy?: number | null; // Cites per doc (2 years)

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
  };
  augmentedQueries?: {
    pubmed: string;
    semanticScholar: string;
    openAlex: string;
  };
}
