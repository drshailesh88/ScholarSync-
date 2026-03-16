# research — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Evidence Level Mapping
- [x] PASS: `getEvidenceLevel()` maps `meta_analysis` and `systematic_review` to Level I
- [x] PASS: `getEvidenceLevel()` maps `rct` to Level II
- [x] PASS: `getEvidenceLevel()` maps `cohort` and `observational` to Level III
- [x] PASS: `getEvidenceLevel()` maps `case_control` and `case_report` to Level IV
- [x] PASS: `getEvidenceLevel()` maps all other study types (including `review`, `other`, and unknown values) to Level V
- [x] PASS: `mapPubMedPublicationType()` maps "clinical trial" publications to `rct` study type
- [x] PASS: `mapPubMedPublicationType()` maps a bare "review" (that doesn't match "systematic review") to `review` study type, which then maps to Level V
- [x] PASS: `mapS2PublicationType()` maps `editorial` and `letter` to `other` study type
#### Dedup & Rank Fusion Internals
- [x] PASS: `isSamePaper()` checks identity in order: DOI match (case-insensitive), then PMID match, then S2 ID match, then normalized title + year match
- [x] PASS: `normalizeTitle()` lowercases, strips all non-alphanumeric characters except spaces, normalizes whitespace, trims, and truncates to 150 characters
- [x] PASS: `mergeMetadata()` keeps the primary paper's fields and fills in missing values from the secondary paper — primary always wins for populated fields
- [x] PASS: `mergeMetadata()` takes `Math.max(primary.citationCount || 0, secondary.citationCount || 0)` — the higher citation count always wins
- [x] PASS: `mergeMetadata()` merges `publicationTypes`, `fieldsOfStudy`, and `concepts` arrays via Set-based deduplication
- [x] PASS: `mergeMetadata()` prefers primary `meshTerms` when it has entries (`primary.meshTerms?.length`), otherwise falls back to secondary
- [x] PASS: RRF contribution formula is `1 / (k + rank + 1)` where `k` defaults to `60` and `rank` is the 0-indexed position in the source list
- [x] PASS: RRF output is sorted by accumulated `rrfScore` descending before pagination
#### Cohere Reranking Internals
- [x] PASS: Cohere rerank documents are constructed by concatenating `${title}. ${abstract || tldr || ""}` for each result
- [x] PASS: Cohere rerank request uses `resilientFetch` with `timeout: 10000` (10s) and `maxRetries: 2`
- [x] PASS: Cohere rerank request sends `return_documents: false` — only index + relevance_score are returned
- [x] PASS: Cohere reranked results have `rerankScore` set from the Cohere `relevance_score` field
#### Save Paper Data Flow
- [x] PASS: `handleSave(result)` forwards `abstract`, `mesh_terms`, `publication_types`, `fields_of_study`, `study_type`, `evidence_level`, `influential_citation_count`, and `reference_count` to the `savePaper()` server action — not just title, authors, journal, year, doi, source
- [x] PASS: `handleSave(result)` sends `pubmed_id: result.pmid` and `semantic_scholar_id: result.s2Id` as separate identifier fields
- [x] PASS: `handleSave(result)` sends `citation_count: result.citationCount` — not `citations` or `citationCount`
- [x] PASS: `handleSave(result)` derives `open_access_url` from `result.openAccessPdfUrl || undefined` — the `|| undefined` ensures `null` is converted to `undefined`
#### Type Definitions & Response Shapes
- [x] PASS: `UnifiedSearchResult` type includes `openalexId?: string` field for OpenAlex-originated results
- [x] PASS: `UnifiedSearchResult` type includes clinical trial fields: `nctId?: string`, `trialStatus?: string`, `trialPhase?: string` — only populated for ClinicalTrials.gov results
- [x] PASS: `UnifiedSearchResult` type includes `rerankScore?: number` field, populated only when Cohere reranking is active
- [x] PASS: `UnifiedSearchResult` type includes optional `pico` object with `population`, `intervention`, `comparison`, `outcome` string fields
- [x] PASS: `SearchResponse.augmentedQueries` type includes `pubmed`, `semanticScholar`, `openAlex` keys but NOT a ClinicalTrials variant — ClinicalTrials always receives the raw user query
- [x] PASS: `EvidenceLevel` type is defined as the exact union `"I" | "II" | "III" | "IV" | "V"`
- [x] PASS: `UnifiedSearchResult.journalQuartile` type is `"Q1" | "Q2" | "Q3" | "Q4" | null`
- [x] PASS: `SearchFilters` interface includes `minCitations?: number` field, currently unused by the research page UI
#### Page Layout & CSS Behavior
- [x] PASS: Page layout uses `h-[calc(100vh-7rem)]` as the overall container height constraint
- [x] PASS: Main content area uses `overflow-y-auto pr-2` for scrolling within the fixed-height container
- [x] PASS: Active filter chip styling: `bg-brand/10 text-brand border-brand/30`
