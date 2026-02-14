# ScholarSync — Paper Fetching Pipeline Overhaul
# Autonomous Terminal Prompt
# Run with: claude --dangerously-skip-permissions

You are building 14 improvements to ScholarSync's paper fetching pipeline. This is a Next.js 16 App Router project at the current working directory. Read the full PRD at `.taskmaster/docs/prd-paper-fetching.txt` before starting.

## METHODOLOGY

Use the Ralph Wiggum Loop: Build → Verify → Fix → Repeat.
- After each file: run `npx tsc --noEmit` to catch type errors immediately
- After all files: run `npm run build` for full production build
- Fix ALL errors before moving to the next phase
- Do NOT skip verification steps

## CRITICAL RULES

1. **AI Models:** ALL AI calls use `getModel()`, `getSmallModel()`, or `getBigModel()` from `src/lib/ai/models.ts`. NEVER hardcode model names like "claude-sonnet-4-20250514".
2. **Auth:** ALL server actions and DB-touching functions call `getCurrentUserId()` from `src/lib/auth.ts`.
3. **No new packages** unless absolutely necessary. Use built-in `fetch`, regex for XML parsing. Do NOT install fast-xml-parser, cheerio, or any XML library.
4. **Existing patterns:** Match the code style in existing files. Use Drizzle ORM patterns from `src/lib/actions/papers.ts`. Use CSS class patterns from `src/app/globals.css` (glass-panel, text-ink, bg-surface, bg-brand, etc.).
5. **Icons:** Phosphor Icons ONLY (`@phosphor-icons/react`).
6. **TypeScript:** Strict mode. No `any`. All functions typed.
7. **Imports:** Use `@/` path aliases. Never relative paths beyond `./` for same-directory imports.
8. **Error handling:** All API routes return proper JSON error responses with appropriate HTTP status codes. All external API calls have try/catch with retry logic.
9. **No over-engineering:** Build exactly what the PRD specifies. No extra features, no extra abstractions.

## EXISTING CODE TO READ FIRST

Before writing any code, read these files to understand existing patterns:

```
src/lib/ai/models.ts              # AI model abstraction (getModel, getSmallModel, getBigModel)
src/lib/auth.ts                   # getCurrentUserId() with Clerk + dev fallback
src/lib/db/index.ts               # Drizzle DB client
src/lib/db/schema/core.ts         # papers table, projectPapers, paperChunks, etc.
src/lib/db/schema/editor.ts       # userReferences table (~line 418)
src/lib/db/schema/enums.ts        # paperSourceEnum and other enums
src/lib/actions/papers.ts         # Current savePaper(), getUserPapers()
src/app/api/search/pubmed/route.ts        # Current PubMed search (to rewrite)
src/app/api/search/semantic-scholar/route.ts  # Current S2 search (to update)
src/app/(app)/research/page.tsx   # Current research page (to rewrite)
src/app/globals.css               # Theme CSS variables and utility classes
src/components/ui/glass-panel.tsx  # GlassPanel component
src/components/ui/badge.tsx        # Badge component
```

## EXECUTION PLAN

### Phase 1: Types and Utilities (no external calls)

**Step 1.1 — Unified Search Type**
Create `src/types/search.ts`:
- `UnifiedSearchResult` interface with ALL fields from the PRD
- `EvidenceLevel` type
- `SearchFilters` interface
- `SearchResponse` interface (results array + total + pagination metadata)

**Step 1.2 — Evidence Level Scoring**
Create `src/lib/search/evidence-level.ts`:
- `getEvidenceLevel(studyType)` → returns `{ level, label, color }`
- `mapPubMedPublicationType(pubType)` → returns standardized study type string
- `mapS2PublicationType(pubType)` → returns standardized study type string
- `mapOpenAlexType(type)` → returns standardized study type string

**Step 1.3 — Deduplication**
Create `src/lib/search/dedup.ts`:
- `normalizeTitle(title)` → lowercase, strip punctuation, collapse whitespace, truncate to 150 chars
- `isSamePaper(a, b)` → DOI match → PMID match → S2 ID match → normalized title+year match
- `deduplicateResults(results)` → returns deduplicated array, merging metadata from duplicates

**Step 1.4 — Rank Fusion**
Create `src/lib/search/rank-fusion.ts`:
- `reciprocalRankFusion(resultLists, k=60)` → returns merged, deduplicated, RRF-scored array
- Uses `isSamePaper()` from dedup.ts for cross-source matching
- Uses metadata merging for papers appearing in multiple sources
- Each result gets `rrfScore` and `sources` array

**Step 1.5 — Reranker (optional/graceful)**
Create `src/lib/search/rerank.ts`:
- `rerankResults(query, results, topN)` → returns reranked array
- Checks `process.env.COHERE_API_KEY` — if missing, returns results unchanged (no-op)
- Calls Cohere Rerank v2 API with title + abstract as document text
- Adds `rerankScore` to each result

**Verify Phase 1:** `npx tsc --noEmit` — fix all errors before proceeding.

---

### Phase 2: Schema Updates

**Step 2.1 — Update papers table in `src/lib/db/schema/core.ts`**

Add new columns to the papers table definition (add these AFTER the existing `metadata` column, BEFORE `created_at`):
```typescript
mesh_terms: jsonb("mesh_terms").default([]),
publication_types: jsonb("publication_types").default([]),
fields_of_study: jsonb("fields_of_study").default([]),
evidence_level: text("evidence_level"),
open_access_url: text("open_access_url"),
influential_citation_count: integer("influential_citation_count").default(0),
reference_count: integer("reference_count").default(0),
```

Add unique constraint to `semantic_scholar_id`:
Change `semantic_scholar_id: text("semantic_scholar_id")` to `semantic_scholar_id: text("semantic_scholar_id").unique()`

Add indexes to the papers table's index array:
```typescript
index("idx_papers_doi").on(table.doi),
index("idx_papers_pubmed_id").on(table.pubmed_id),
index("idx_papers_s2_id").on(table.semantic_scholar_id),
index("idx_papers_year").on(table.year),
```

**Step 2.2 — Update paperSourceEnum in `src/lib/db/schema/enums.ts`**
Add "openalex" to the paperSourceEnum if not already present. Check the existing enum values first.

**Step 2.3 — Update `userReferences` table in `src/lib/db/schema/editor.ts`**
Add unique constraint if not already present:
```typescript
unique("user_references_user_paper_unique").on(table.userId, table.paperId)
```

**Verify Phase 2:** `npx tsc --noEmit` — fix all errors before proceeding.

---

### Phase 3: API Route Rewrites

**Step 3.1 — Rewrite PubMed route: `src/app/api/search/pubmed/route.ts`**

Complete rewrite. Key changes:
- Keep ESearch for PMIDs + total count
- Replace ESummary with EFetch (XML): `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id={pmids}&rettype=xml&retmode=xml&tool=scholarsync&email=contact@scholarsync.com`
- Parse XML using REGEX (do NOT install xml parser packages). Extract:
  - `<ArticleTitle>` text content
  - `<Abstract><AbstractText>` — handle structured abstracts (multiple AbstractText with Label attribute). Concatenate as "LABEL: text. " for each section.
  - `<Author>` — extract `<LastName>` and `<ForeName>`, format as "LastName ForeName"
  - `<Journal><Title>` or `<ISOAbbreviation>`
  - `<PubDate><Year>` or `<PubDate><MedlineDate>` (extract first 4-digit year)
  - `<ArticleId IdType="doi">` and `<ArticleId IdType="pubmed">`
  - `<PublicationType>` — collect all into array
  - `<MeshHeading><DescriptorName>` — collect all into array, note MajorTopicYN
- Add `fetchWithRetry(url, maxRetries=3, baseDelay=400)` helper with exponential backoff
- Accept `page` query param for pagination: `retstart = page * maxResults`
- Return `UnifiedSearchResult[]` shape with all new fields

XML parsing approach (regex, NOT a parser library):
```typescript
// Extract individual articles
const articles = xml.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || [];

// For each article, extract fields with regex:
const titleMatch = article.match(/<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/);
const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';

// For structured abstracts:
const abstractTexts = [...article.matchAll(/<AbstractText(?:\s+Label="([^"]*)")?[^>]*>([\s\S]*?)<\/AbstractText>/g)];
const abstract = abstractTexts.map(m => m[1] ? `${m[1]}: ${m[2].replace(/<[^>]*>/g, '').trim()}` : m[2].replace(/<[^>]*>/g, '').trim()).join(' ');

// For MeSH terms:
const meshMatches = [...article.matchAll(/<DescriptorName[^>]*>([\s\S]*?)<\/DescriptorName>/g)];
const meshTerms = meshMatches.map(m => m[1].trim());

// For publication types:
const pubTypeMatches = [...article.matchAll(/<PublicationType[^>]*>([\s\S]*?)<\/PublicationType>/g)];
const publicationTypes = pubTypeMatches.map(m => m[1].trim());
```

**Step 3.2 — Update S2 route: `src/app/api/search/semantic-scholar/route.ts`**

Update existing file:
- Expand fields string to include: `publicationTypes,openAccessPdf,fieldsOfStudy,isOpenAccess,referenceCount,influentialCitationCount`
- Update S2Paper interface to match new fields
- Add retry with exponential backoff, respecting Retry-After header
- Add `offset`, `yearStart`, `yearEnd` query params
- Add year filter to S2 URL: `&year={yearStart}-{yearEnd}` when provided
- Map results to `UnifiedSearchResult` shape

**Step 3.3 — Create OpenAlex route: `src/app/api/search/openalex/route.ts`**

New file. GET endpoint.
- URL: `https://api.openalex.org/works?search={query}&per_page={limit}&page={page}&mailto=contact@scholarsync.com`
- Add filters: `publication_year:{yearStart}-{yearEnd}`, `is_oa:true`, `type:{type}`
- Reconstruct abstracts from inverted index format
- Extract: title, authors (from authorships[].author.display_name), journal (from primary_location.source.display_name), year, DOI, concepts, cited_by_count, is_oa, open_access.oa_url
- Map to `UnifiedSearchResult`

**Step 3.4 — Create Unpaywall route: `src/app/api/search/unpaywall/route.ts`**

New file. GET endpoint.
- URL: `https://api.unpaywall.org/v2/{doi}?email=contact@scholarsync.com`
- Accept `doi` query param (or comma-separated list of DOIs for batch)
- Return: `{ doi: string, pdfUrl: string | null, isOpenAccess: boolean }`
- Handle 404 (paper not found) gracefully — return `{ pdfUrl: null }`

**Step 3.5 — Create S2 Recommendations route: `src/app/api/search/s2-recommendations/route.ts`**

New file. Supports both GET and POST.
- GET: `?paperId={s2Id}&limit=10` → calls `https://api.semanticscholar.org/recommendations/v1/papers/forpaper/{paperId}?limit={limit}&fields=title,authors,year,abstract,citationCount,journal,tldr,externalIds,url,publicationTypes,openAccessPdf,fieldsOfStudy`
- POST: `{ positivePaperIds: string[], negativePaperIds?: string[], limit?: number }` → calls `POST https://api.semanticscholar.org/recommendations/v1/papers/` with same fields
- Map results to `UnifiedSearchResult`

**Verify Phase 3:** `npx tsc --noEmit` — fix all errors.

---

### Phase 4: Query Augmentation + Unified Search

**Step 4.1 — Query Augmentation: `src/lib/ai/query-augment.ts`**

```typescript
import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { z } from "zod";

const augmentedQuerySchema = z.object({
  pubmedQuery: z.string(),
  semanticScholarQuery: z.string(),
  openAlexQuery: z.string(),
  suggestedFilters: z.object({
    yearStart: z.number().optional(),
    yearEnd: z.number().optional(),
    publicationTypes: z.array(z.string()).optional(),
  }),
});

export async function augmentQuery(userQuery: string) {
  const { object } = await generateObject({
    model: getSmallModel(),
    schema: augmentedQuerySchema,
    system: `You are a medical librarian. Convert the user's research question into optimized search queries for different academic databases.

For PubMed: Use MeSH terms with [MeSH] tags, Boolean operators (AND, OR), field tags ([tiab] for title/abstract, [pt] for publication type). Be specific and structured.
For Semantic Scholar: Use natural language that captures the conceptual meaning. Be descriptive, not Boolean.
For OpenAlex: Use natural language keywords. Include synonyms.

Also suggest appropriate filters (year range, publication types) based on the query context.`,
    prompt: userQuery,
  });
  return object;
}
```

**Step 4.2 — Unified Search Orchestrator: `src/app/api/search/unified/route.ts`**

GET endpoint. This is the MAIN search endpoint the frontend will call.

Query params: `q`, `page` (default 0), `perPage` (default 20), `yearStart`, `yearEnd`, `studyTypes` (comma-separated), `openAccessOnly` (boolean), `augment` (boolean, default true), `sort` (relevance|citations|year|evidence)

Flow:
1. Parse query params
2. If `augment=true` AND query length > 20 chars, call `augmentQuery()`. Otherwise use raw query for all sources.
3. Fan out to PubMed + S2 + OpenAlex in parallel using `Promise.allSettled`:
   - Call internal route handlers directly (import the fetch logic, don't HTTP call yourself). Actually, since these are API routes, construct internal fetch URLs: `http://localhost:${process.env.PORT || 3000}/api/search/pubmed?q=...`. BUT BETTER: extract the search logic from each route into shared functions in `src/lib/search/sources/` so they can be called directly without HTTP.

   BETTER APPROACH: Create source functions that can be called directly:
   - `src/lib/search/sources/pubmed.ts` — export `searchPubMed(query, options)`
   - `src/lib/search/sources/semantic-scholar.ts` — export `searchSemanticScholar(query, options)`
   - `src/lib/search/sources/openalex.ts` — export `searchOpenAlex(query, options)`

   Then the API routes (`/api/search/pubmed`, etc.) become thin wrappers that call these functions.
   And the unified endpoint calls them directly.

4. Normalize all results to `UnifiedSearchResult`
5. Run `reciprocalRankFusion()` across all source results
6. Run `rerankResults()` if Cohere key available
7. Apply evidence level scoring to all results
8. Apply sort order
9. Apply pagination (slice results)
10. Fire Unpaywall lookups for DOIs in background (don't block response) — actually, for simplicity, skip async Unpaywall in unified endpoint. Users can check OA status from the data already returned by S2 and OpenAlex.

Return:
```typescript
{
  results: UnifiedSearchResult[],
  total: number,
  page: number,
  perPage: number,
  hasMore: boolean,
  sourceCounts: { pubmed: number, semanticScholar: number, openAlex: number },
  augmentedQueries?: { pubmed: string, semanticScholar: string, openAlex: string },
}
```

**IMPORTANT ARCHITECTURE DECISION:** To avoid HTTP self-calls, refactor the search logic:

Create `src/lib/search/sources/` directory:
- `pubmed.ts` — the actual PubMed search logic (ESearch + EFetch + XML parsing)
- `semantic-scholar.ts` — the actual S2 search logic
- `openalex.ts` — the actual OpenAlex search logic
- `unpaywall.ts` — the Unpaywall lookup logic
- `s2-recommendations.ts` — the S2 recommendations logic

Then rewrite the API routes as thin wrappers:
```typescript
// src/app/api/search/pubmed/route.ts
import { searchPubMed } from "@/lib/search/sources/pubmed";
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const results = await searchPubMed(params.get("q")!, { ... });
  return NextResponse.json(results);
}
```

And the unified endpoint imports all source functions directly.

**Verify Phase 4:** `npx tsc --noEmit` — fix all errors.

---

### Phase 5: Research Agent

**Step 5.1 — Create Research Agent: `src/app/api/research-agent/route.ts`**

POST endpoint with streaming response.

Uses `streamText` from `ai` with `tools` parameter and `maxSteps: 12`.

**6 tools:**
1. `searchPubMed` — calls `searchPubMed()` from sources
2. `searchSemanticScholar` — calls `searchSemanticScholar()` from sources
3. `searchOpenAlex` — calls `searchOpenAlex()` from sources
4. `getPaperDetails` — fetches full paper by DOI/PMID/S2ID from any source
5. `findSimilarPapers` — calls S2 Recommendations
6. `savePaperToLibrary` — calls `savePaper()` server action

**System prompt:** Use the phased search strategy from the PRD (Broad Sweep → Assess Coverage → Targeted Search → Synthesize).

**Request body:**
```typescript
{ messages: { role: string; content: string }[], context?: { savedPaperIds?: string[] } }
```

**Response:** Streaming text with tool call results.

---

### Phase 6: PICO Extraction

**Step 6.1 — Create PICO endpoint: `src/app/api/extract-pico/route.ts`**

POST endpoint.
- Body: `{ paperId?: number, abstract: string, title: string }`
- Uses `generateObject` with `getModel()` and the PICO Zod schema from PRD
- If `paperId` provided, stores result in `paper_extractions` table
- Returns the PICO object

---

### Phase 7: Update savePaper() Action

**Step 7.1 — Rewrite `src/lib/actions/papers.ts`**

Update `savePaper()`:
1. Replace DOI-only dedup with `findExistingPaper()` cascade:
   - Check DOI → PMID → S2 ID → normalized title+year
2. When existing paper found, call `enrichExistingPaper()`:
   - Fill missing fields: abstract, tldr, mesh_terms, publication_types, fields_of_study, study_type, evidence_level, open_access_url, citation_count (take max), influential_citation_count, reference_count
   - Add missing identifiers (if saved from PubMed with no S2 ID, and now saving from S2, add the S2 ID)
3. Accept new fields in the input type: mesh_terms, publication_types, fields_of_study, study_type, evidence_level, open_access_url, influential_citation_count, reference_count, s2Id (alias for semantic_scholar_id)

Keep all existing functions (getUserPapers, toggleFavorite, removePaper, searchPapersInLibrary) unchanged.

---

### Phase 8: Research Page UI Overhaul

**Step 8.1 — Rewrite `src/app/(app)/research/page.tsx`**

This is the biggest frontend change. Key requirements:

1. **Single API call** to `/api/search/unified` instead of dual PubMed+S2 calls
2. **Working filter chips:**
   - "Last 5 Years" → adds `yearStart` param
   - "PDF Available" → adds `openAccessOnly=true`
   - "High Impact" → adds sort by citations or minCitations filter
   - "RCTs Only" → adds `studyTypes=rct`
   - "Reviews" → adds `studyTypes=review,systematic_review`
   - "Meta-Analyses" → adds `studyTypes=meta_analysis`
3. **Evidence level badges** on each result card — colored pill (emerald for Level I, sky for II, amber for III, orange for IV, slate for V)
4. **Source badges** — small pills showing "PubMed", "S2", "OpenAlex" for each result
5. **RRF score indicator** — subtle relevance bar or percentage
6. **Pagination** — Previous / Page X of Y / Next buttons at bottom
7. **Sort dropdown** — Relevance, Citations, Year (newest), Evidence Level
8. **"Find Similar" button** on each result card → calls S2 Recommendations and shows results inline or in a modal
9. **"Save" button** wired to savePaper() with full metadata (including new fields)
10. **Research Copilot sidebar** wired to `/api/research-agent`:
    - Use `useChat` hook from `@ai-sdk/react` (already installed)
    - Streaming responses
    - Show agent's tool calls inline (e.g., "Searching PubMed for...", "Found 15 results")
    - Input box at bottom, messages above
    - Pass current search results as context
11. **"Recommended for You" section** — shown when user has 3+ saved papers. Calls POST `/api/search/s2-recommendations` with saved paper S2 IDs.
12. **Augmented query display** — small collapsible section showing what PubMed/S2/OpenAlex queries were generated (helps users learn search strategy)

**UI patterns to match:**
- Use `glass-panel` class for cards
- Use `bg-surface`, `bg-surface-raised`, `text-ink`, `text-ink-muted`, `text-brand`, `bg-brand` CSS vars
- Use `rounded-2xl` for large cards, `rounded-xl` for medium, `rounded-lg` for small
- Use Phosphor icons: MagnifyingGlass, FloppyDisk, ChatCircleDots, Sparkle, ArrowLeft, ArrowRight, Funnel, SortAscending, Star, Lightning, BookOpen, Brain, CaretDown
- Match the existing card layout style with hover states

---

### Phase 9: Final Verification

**Step 9.1 — TypeScript check:**
```bash
npx tsc --noEmit
```
Must be 0 errors.

**Step 9.2 — Production build:**
```bash
npm run build
```
Must complete without errors.

**Step 9.3 — Update .env.example:**
Add:
```
# Optional: Cohere API key for search result reranking
COHERE_API_KEY=
```

**Step 9.4 — Final file inventory check:**
Verify all files exist:
- `src/types/search.ts`
- `src/lib/search/evidence-level.ts`
- `src/lib/search/dedup.ts`
- `src/lib/search/rank-fusion.ts`
- `src/lib/search/rerank.ts`
- `src/lib/search/sources/pubmed.ts`
- `src/lib/search/sources/semantic-scholar.ts`
- `src/lib/search/sources/openalex.ts`
- `src/lib/search/sources/unpaywall.ts`
- `src/lib/search/sources/s2-recommendations.ts`
- `src/lib/ai/query-augment.ts`
- `src/app/api/search/unified/route.ts`
- `src/app/api/search/openalex/route.ts`
- `src/app/api/search/unpaywall/route.ts`
- `src/app/api/search/s2-recommendations/route.ts`
- `src/app/api/research-agent/route.ts`
- `src/app/api/extract-pico/route.ts`
- Updated `src/app/api/search/pubmed/route.ts`
- Updated `src/app/api/search/semantic-scholar/route.ts`
- Updated `src/lib/actions/papers.ts`
- Updated `src/app/(app)/research/page.tsx`
- Updated `src/lib/db/schema/core.ts`

---

## AGENT TEAM STRATEGY

You should use parallel agents where possible:

**Parallel Group 1 (Types + Utilities — no dependencies):**
- Agent A: Create `src/types/search.ts` + `src/lib/search/evidence-level.ts`
- Agent B: Create `src/lib/search/dedup.ts` + `src/lib/search/rank-fusion.ts`
- Agent C: Create `src/lib/search/rerank.ts`

**Parallel Group 2 (Source functions — depend on types):**
- Agent D: Create `src/lib/search/sources/pubmed.ts` + rewrite API route wrapper
- Agent E: Create `src/lib/search/sources/semantic-scholar.ts` + update API route wrapper
- Agent F: Create `src/lib/search/sources/openalex.ts` + create API route wrapper
- Agent G: Create `src/lib/search/sources/unpaywall.ts` + `src/lib/search/sources/s2-recommendations.ts` + API route wrappers

**Sequential (depends on source functions):**
- Step: Update `src/lib/db/schema/core.ts` (schema changes)
- Step: Create `src/lib/ai/query-augment.ts`
- Step: Create `src/app/api/search/unified/route.ts` (imports all source functions)
- Step: Create `src/app/api/research-agent/route.ts` (imports source functions as tools)
- Step: Create `src/app/api/extract-pico/route.ts`
- Step: Update `src/lib/actions/papers.ts`
- Step: Rewrite `src/app/(app)/research/page.tsx`

**Final verification:**
- `npx tsc --noEmit` → 0 errors
- `npm run build` → clean build
- Check all new files exist

## IMPORTANT NOTES

- The project uses Tailwind CSS v4 with CSS custom properties. Theme classes are in `src/app/globals.css`. Use the semantic color names (text-ink, bg-surface, etc.) not raw Tailwind colors.
- The database is PostgreSQL with Drizzle ORM. Connection is in `src/lib/db/index.ts`. Schema is in `src/lib/db/schema/`.
- There is NO database running locally yet. The code must compile and build but database operations will fail at runtime until PostgreSQL is set up. This is fine — just ensure the code is correct.
- The `zod` package is already installed (used by the AI SDK). You can import it directly.
- The `ai` and `@ai-sdk/anthropic` packages are already installed. Import `streamText`, `generateObject`, `tool` from `ai`.
- The `@ai-sdk/react` package is already installed. Import `useChat` from it for the Research Copilot sidebar.
- Do NOT modify any files outside the scope of this PRD. Do not touch the landing page, dashboard, studio, or other pages.
- Do NOT add comments like "// TODO" or "// FIXME". Write complete, working code.
- XML parsing for PubMed: Use regex patterns. The XML is well-structured MEDLINE format. Do NOT install any XML parsing library.

## START

Begin by reading all the files listed in "EXISTING CODE TO READ FIRST", then execute Phase 1 through Phase 9 in order. Use parallel agents for Groups 1 and 2 where the tool supports it. Verify with tsc after each phase.
