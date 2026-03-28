# Execution Prompt — Issue #22: Search Pipeline Domain-Aware

Read this entire prompt before writing any code. Pull latest from main first — Issue #19 (Domain Registry) has been merged.

## CONTEXT

The Domain Registry is now in the codebase. `getDomainConfig(domainId)` returns a `DomainConfig` object. The unified search route already reads `?domain=` and threads the config to query augmentation and evidence classification. This issue completes the remaining search pipeline consumers.

Read these files:
- `src/lib/search/domains/types.ts` — the DomainConfig type
- `src/lib/search/domains/medicine.ts` — the medicine config (your reference for what values look like)
- `src/app/api/search/unified/route.ts` — already threads domain config
- `docs/multi-domain/GRILL_DECISIONS.md` — design decisions

## CRITICAL SAFETY RULE

All changes must be backward-compatible. When the medicine config is passed, behavior must be IDENTICAL to current behavior. Use the pattern: `domain?.field ?? <current hardcoded value>`.

## WHAT TO BUILD

### Step 1: Modify study-type-detector.ts

File: `src/lib/search/study-type-detector.ts`

Currently has hardcoded regex patterns for medical study types. Add a new function that accepts domain config:

```typescript
import type { DomainConfig } from "@/lib/search/domains/types";

/**
 * Detect study type using domain-specific patterns.
 * Falls back to the existing hardcoded medical patterns if no domain config provided.
 */
export function detectStudyTypeForDomain(
  title: string,
  abstract: string | undefined,
  domain?: DomainConfig
): string {
  if (!domain || domain.studyTypePatterns.length === 0) {
    // Use existing detectStudyType logic (the current hardcoded function)
    return detectStudyType(title, abstract);
  }

  const text = `${title} ${abstract || ""}`.toLowerCase();
  const titleLower = title.toLowerCase();

  for (const entry of domain.studyTypePatterns) {
    for (const patternStr of entry.patterns) {
      const regex = new RegExp(patternStr, "i");
      if (entry.titleOnly) {
        if (regex.test(titleLower)) return entry.studyType;
      } else {
        if (regex.test(text)) return entry.studyType;
      }
    }
  }

  return "other";
}
```

DO NOT modify the existing `detectStudyType()` or `enrichStudyTypes()` functions. Add the new function alongside them.

### Step 2: Modify query-expander.ts

File: `src/lib/search/query-expander.ts`

Currently has a hardcoded `SYNONYM_MAP` with 8 medical drug class entries. Add a domain-aware version:

```typescript
import type { DomainConfig, SynonymEntry as DomainSynonymEntry } from "@/lib/search/domains/types";

/**
 * Expand query using domain-specific synonym map.
 * Falls back to the hardcoded medical SYNONYM_MAP if no domain config provided.
 */
export function expandQueryForDomain(query: string, domain?: DomainConfig): QueryExpansion {
  if (!domain || domain.synonymMap.length === 0) {
    return expandQuery(query);  // Existing function, unchanged
  }

  const expansions: { term: string; synonyms: string[] }[] = [];

  for (const entry of domain.synonymMap) {
    const regex = new RegExp(entry.pattern, "i");
    if (regex.test(query)) {
      const termMatch = query.match(regex);
      expansions.push({
        term: termMatch ? termMatch[0] : "unknown",
        synonyms: entry.synonyms,
      });
    }
  }

  if (expansions.length === 0) {
    return { original: query, supplementary: null, expansions: [] };
  }

  const allSynonyms = expansions.flatMap((e) => e.synonyms);
  const coreTerms = extractCoreTerms(query);
  const supplementary = `(${allSynonyms.join(" OR ")}) AND (${coreTerms.join(" AND ")})`;

  return { original: query, supplementary, expansions };
}
```

DO NOT modify the existing `expandQuery()` function or the `SYNONYM_MAP` constant.

### Step 3: Modify plan-generator.ts

File: `src/lib/research/plan-generator.ts`

The system prompt currently says "You are a medical librarian assistant." Make it domain-aware:

1. Add `domain?: DomainConfig` parameter to the main function
2. Replace the hardcoded persona with `domain?.personas.librarian ?? <current hardcoded persona>`
3. If `domain?.researchFramework` exists, mention the framework in the prompt (e.g., "Use the PICO framework" for medicine, nothing for physics)

DO NOT change the output schema, the model selection, or any other logic.

### Step 4: Modify research-tools.ts

File: `src/lib/ai/tools/research-tools.ts`

The tool descriptions currently say "Search PubMed for biomedical papers." Make descriptions domain-aware:

1. Import `SOURCE_DESCRIPTIONS` from `src/lib/search/sources/descriptions.ts` (created in Issue #20) or define it inline if that file doesn't exist yet
2. Add a function that generates tool descriptions based on the domain's source list:

```typescript
export function getToolDescriptionsForDomain(domain?: DomainConfig): ToolDescription[] {
  if (!domain) return getDefaultToolDescriptions();  // Current hardcoded descriptions

  return domain.sources.map(sourceId => ({
    id: sourceId,
    description: SOURCE_DESCRIPTIONS[sourceId] ?? `Search ${sourceId} for academic papers`,
  }));
}
```

If `SOURCE_DESCRIPTIONS` doesn't exist yet (Issue #20 not merged), define it inline in this file.

### Step 5: Modify FilterPanel.tsx

File: `src/components/research/FilterPanel.tsx`

Currently has hardcoded study type filter options (RCT, Meta-Analysis, Cohort, etc.) and source options (PubMed, Semantic Scholar).

1. Accept a `domain?: DomainConfig` prop (or read from a context/hook)
2. Study type filter options: read from `domain?.filterOptions ?? <current hardcoded array>`
3. Source filter options: read from `domain?.sources ?? <current hardcoded sources>`

For the source labels, use a static map:
```typescript
const SOURCE_LABELS: Record<string, string> = {
  pubmed: "PubMed",
  semantic_scholar: "Semantic Scholar",
  openalex: "OpenAlex",
  clinical_trials: "ClinicalTrials.gov",
  arxiv: "arXiv",
};
```

DO NOT change the filter panel layout, styling, or interaction behavior. Only change the DATA it displays.

### Step 6: Wire domain into the unified route for these new consumers

File: `src/app/api/search/unified/route.ts`

The route already has `const domain = getDomainConfig(searchParams.get("domain"));`

Now thread it to the additional consumers:
1. If query expansion is used anywhere in the route, pass domain to `expandQueryForDomain()`
2. If study type detection is called, pass domain to `detectStudyTypeForDomain()`

Check if these functions are called in the route. If not (they may be called inside source adapters or post-processing), just ensure the functions exist and are exported. The actual wiring may happen at a different callsite.

### Step 7: Write tests

Create file: `src/lib/search/__tests__/domain-pipeline.test.ts`

Test:
1. `expandQueryForDomain("SGLT2 inhibitors", medicineDomain)` returns the same expansions as `expandQuery("SGLT2 inhibitors")`
2. `expandQueryForDomain("SGLT2 inhibitors", multidisciplinaryDomain)` returns no expansions (empty synonym map)
3. `expandQueryForDomain("quantum physics", undefined)` falls back to existing behavior
4. `detectStudyTypeForDomain("A randomized controlled trial of...", "", medicineDomain)` returns correct type
5. `detectStudyTypeForDomain("some title", "", multidisciplinaryDomain)` returns "other" (empty patterns)
6. FilterPanel renders medicine filter options when given medicine config
7. FilterPanel renders multidisciplinary filter options when given multidisciplinary config

## WHAT NOT TO DO

- DO NOT modify `rank-fusion.ts`, `dedup.ts`, `rerank.ts`, `journal-quality.ts`
- DO NOT modify any source adapter files (pubmed.ts, semantic-scholar.ts, etc.)
- DO NOT modify the source fan-out logic in the unified route (still hardcoded 4 sources — domain-driven fan-out is a future enhancement)
- DO NOT delete or modify existing functions — add new domain-aware functions alongside them
- DO NOT add dependencies

## FILE SUMMARY

| Action | File |
|--------|------|
| MODIFY | `src/lib/search/study-type-detector.ts` (add detectStudyTypeForDomain) |
| MODIFY | `src/lib/search/query-expander.ts` (add expandQueryForDomain) |
| MODIFY | `src/lib/research/plan-generator.ts` (add domain param, read persona from config) |
| MODIFY | `src/lib/ai/tools/research-tools.ts` (domain-aware tool descriptions) |
| MODIFY | `src/components/research/FilterPanel.tsx` (read filters from config) |
| MAYBE MODIFY | `src/app/api/search/unified/route.ts` (thread domain to new consumers if called here) |
| CREATE | `src/lib/search/__tests__/domain-pipeline.test.ts` |

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. `npx eslint src/lib/search/ src/lib/research/ src/lib/ai/tools/ src/components/research/` — clean
3. `npx vitest run src/lib/search/__tests__/` — all tests pass (existing + new)
4. Manually verify: medicine config produces identical behavior to current

## COMMIT MESSAGE

```
feat: make search pipeline domain-aware (study types, filters, query expansion, tools)

- detectStudyTypeForDomain() reads patterns from domain config
- expandQueryForDomain() reads synonym map from domain config
- plan-generator reads persona from domain config
- research-tools generates descriptions from domain source list
- FilterPanel reads filter options and sources from domain config
- All changes backward-compatible with medicine fallback
- 7 new tests

Implements #22
```
