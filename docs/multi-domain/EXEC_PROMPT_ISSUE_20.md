# Execution Prompt — Issue #20: arXiv Source Adapter

Read this entire prompt before writing any code.

## CONTEXT

You are building an arXiv source adapter for ScholarSync. It must follow the EXACT same pattern as the existing source adapters. Read these files as your template:
- `src/lib/search/sources/pubmed.ts` — the pattern to follow
- `src/lib/search/sources/semantic-scholar.ts` — another example
- `src/lib/http/circuit-breaker.ts` — you'll use `createCircuitBreaker`
- `src/lib/http/resilient-fetch.ts` — you'll use `resilientFetch`
- `src/types/search.ts` — `UnifiedSearchResult` type (note: it already has an `arxivId` field)
- `docs/multi-domain/MASTER_CONTEXT.md` — project context

## WHAT TO BUILD

### Step 1: Create the arXiv source adapter

Create file: `src/lib/search/sources/arxiv.ts`

**API details:**
- Base URL: `http://export.arxiv.org/api/query`
- Method: GET
- Returns: Atom XML (NOT JSON)
- No API key needed
- Rate limit: max 4 requests/second. Add a 1-second base delay to `resilientFetch` to respect this.

**Query parameters:**
- `search_query` — the search query. Format: `all:{query}` for broad search. For category filtering: `(all:{query})+AND+(cat:{category1}+OR+cat:{category2})`
- `start` — offset (0-indexed)
- `max_results` — number of results to return (max 100)
- `sortBy` — one of: `relevance`, `lastUpdatedDate`, `submittedDate`
- `sortOrder` — `descending` (always use this)

**Response parsing (Atom XML):**
The response is XML. Do NOT add an XML parsing library. Use regex-based extraction (same approach PubMed uses for its XML). The key elements to extract from each `<entry>`:

```xml
<entry>
  <id>http://arxiv.org/abs/2301.12345v2</id>
  <title>Paper Title Here</title>
  <summary>Abstract text here</summary>
  <published>2023-01-15T00:00:00Z</published>
  <updated>2023-06-20T00:00:00Z</updated>
  <author><name>Author Name</name></author>
  <author><name>Another Author</name></author>
  <arxiv:doi xmlns:arxiv="http://arxiv.org/schemas/atom">10.1234/example</arxiv:doi>
  <link href="http://arxiv.org/abs/2301.12345v2" rel="alternate" type="text/html"/>
  <link href="http://arxiv.org/pdf/2301.12345v2" title="pdf" rel="related" type="application/pdf"/>
  <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="cs.AI"/>
  <category term="cs.AI"/>
  <category term="cs.LG"/>
</entry>
```

Total results is in: `<opensearch:totalResults>12345</opensearch:totalResults>`

**Mapping to UnifiedSearchResult:**

```typescript
{
  title: // from <title>, trim whitespace, collapse newlines
  authors: // from <author><name> elements
  journal: // format as "arXiv:{primaryCategory}" e.g. "arXiv:cs.AI"
  year: // from <published> date, extract year
  doi: // from <arxiv:doi> if present, otherwise undefined
  arxivId: // from <id>, strip "http://arxiv.org/abs/" prefix
  abstract: // from <summary>, trim whitespace, collapse newlines
  citationCount: 0,  // arXiv doesn't provide this
  isOpenAccess: true, // ALL arXiv papers are open access
  openAccessPdfUrl: // from <link title="pdf"> href
  publicationTypes: ["preprint"],
  fieldsOfStudy: // from <category term="..."> elements
  studyType: "preprint",
  sources: ["arxiv"],
}
```

**Function signature:**

```typescript
interface ArxivSearchOptions {
  maxResults?: number;  // default 20, max 100
  start?: number;       // offset, default 0
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate";  // default "relevance"
  categories?: string[];  // e.g. ["cs.AI", "hep-th"] — optional category filter
  yearStart?: number;
  yearEnd?: number;
}

export async function searchArxiv(
  query: string,
  options?: ArxivSearchOptions
): Promise<{ results: UnifiedSearchResult[]; total: number }>
```

**Resilience:**
- Use `createCircuitBreaker({ service: "arXiv", failureThreshold: 5 })`
- Use `resilientFetch(url, {}, { service: "arXiv", timeout: 15000, baseDelay: 3000 })` — the 3000ms baseDelay respects arXiv's rate limits
- If circuit is open, return `{ results: [], total: 0 }` with a console.warn
- Wrap everything in try/catch. On failure, call `breaker.onFailure()` and return empty results.

**Year filtering:**
arXiv API doesn't support year filtering natively. If `yearStart` or `yearEnd` are provided, filter results AFTER parsing:
```typescript
results = results.filter(r => {
  if (yearStart && r.year < yearStart) return false;
  if (yearEnd && r.year > yearEnd) return false;
  return true;
});
```

### Step 2: Create cached test fixtures

Create file: `src/lib/search/sources/__tests__/arxiv.test.ts`

Test these behaviors:
1. `searchArxiv("quantum entanglement")` returns results with correct field mapping (title, authors, arxivId, etc.)
2. All results have `sources: ["arxiv"]`, `isOpenAccess: true`, `studyType: "preprint"`
3. `arxivId` is correctly extracted (no URL prefix)
4. Category filtering works — `categories: ["cs.AI"]` adds category filter to query
5. Year filtering works — results outside year range are excluded
6. Empty response handling — returns `{ results: [], total: 0 }`
7. Malformed XML handling — returns empty results, doesn't throw
8. Circuit breaker opens after failures — subsequent calls return empty without hitting API
9. PDF link is correctly extracted into `openAccessPdfUrl`
10. DOI is extracted when present, undefined when absent

For tests 1-5 and 9-10, create a cached XML fixture. Create file `src/lib/search/sources/__tests__/fixtures/arxiv-response.xml` with a realistic arXiv Atom response containing 3-5 entries. You can base it on the XML structure above.

Mock `resilientFetch` to return the cached fixture instead of hitting the real API. Follow the mocking pattern used in existing search tests.

### Step 3: Add to source description map

This is a SMALL addition for Issue #22 to use later. Create or update a source descriptions constant that the research-tools can reference:

Add to `src/lib/search/domains/types.ts` (or create a new file `src/lib/search/sources/descriptions.ts`):

```typescript
export const SOURCE_DESCRIPTIONS: Record<string, string> = {
  pubmed: "Search PubMed for biomedical and life sciences literature",
  semantic_scholar: "Search Semantic Scholar for academic papers across all sciences",
  openalex: "Search OpenAlex for scholarly works and metadata",
  clinical_trials: "Search ClinicalTrials.gov for registered clinical trials",
  arxiv: "Search arXiv for preprints in physics, mathematics, computer science, and related fields",
};
```

## WHAT NOT TO DO

- DO NOT add arXiv to any domain config (that's Issue #25)
- DO NOT modify the unified search route (that's Issue #22)
- DO NOT add any XML parsing library — use regex extraction
- DO NOT modify any existing source adapter files
- DO NOT modify package.json

## FILE SUMMARY

| Action | File |
|--------|------|
| CREATE | `src/lib/search/sources/arxiv.ts` |
| CREATE | `src/lib/search/sources/__tests__/arxiv.test.ts` |
| CREATE | `src/lib/search/sources/__tests__/fixtures/arxiv-response.xml` |
| CREATE or UPDATE | `src/lib/search/sources/descriptions.ts` (source description map) |

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. `npx eslint src/lib/search/sources/arxiv.ts` — zero warnings
3. `npx vitest run src/lib/search/sources/__tests__/arxiv.test.ts` — all tests pass
4. `npx vitest run src/lib/search/__tests__/` — existing tests still pass

## COMMIT MESSAGE

```
feat: add arXiv source adapter with circuit breaker and cached tests

- Atom XML parsing for arXiv API responses
- Circuit breaker + resilient fetch with 3s base delay (rate limit compliance)
- Category filtering (cs.AI, hep-th, etc.)
- Year filtering (post-parse)
- 10 unit tests with cached XML fixture
- Source description map for tool descriptions

Implements #20
```
