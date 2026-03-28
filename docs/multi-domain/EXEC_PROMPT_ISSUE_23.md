# Execution Prompt — Issue #23: Deep Research + RAG/Notebook + Feeds Copilot Domain Branching

Read this entire prompt before writing any code. Pull latest from main first.

## CONTEXT

The Domain Registry is in the codebase. This issue adds domain branching to the deep research engine, RAG modules, and feeds copilot. The CRITICAL rule: medicine and biology deep research pipelines must remain EXACTLY as they are — hardcoded, proven, untouched.

Read these files:
- `src/lib/search/domains/medicine.ts` — medicine config (reference)
- `src/lib/deep-research/perspectives.ts` — current medical perspectives (DO NOT MODIFY for medicine)
- `src/lib/deep-research/engine.ts` — the deep research engine
- `src/lib/deep-research/synthesis.ts` — synthesis logic
- `src/lib/rag/query-enhancer.ts` — RAG query enhancement
- `src/lib/rag/hyde.ts` — HyDE module
- `src/lib/rag/source-summarizer.ts` — source summarization
- `src/app/api/feeds/copilot/summarize/route.ts` — feeds summarizer
- `docs/multi-domain/GRILL_DECISIONS.md` — decisions #13, #14, #17

## CRITICAL SAFETY RULE — READ THIS TWICE

The medicine deep research pipeline has been validated against Gemini and competing tools and found to be SUPERIOR. The founder explicitly requires:

**When domain is "medicine" or "biology": run the EXACT current code path. No config indirection. No reading from DomainConfig. The same functions, same prompts, same sources, same synthesis. ZERO changes.**

**When domain is anything else: read from DomainConfig (perspectiveTemplates, personas, feedsSummaryPrompt).**

The implementation is a simple branch at the top of each function:

```typescript
if (!domain || domain.id === "medicine" || domain.id === "biology") {
  // Run EXISTING code path — no changes whatsoever
} else {
  // New config-driven path
}
```

## WHAT TO BUILD

### Step 1: Modify the deep research engine

File: `src/lib/deep-research/engine.ts`

1. Add `domain?: DomainConfig` parameter to the main entry function
2. At the TOP of the function, add the branch:

```typescript
import type { DomainConfig } from "@/lib/search/domains/types";

// At the top of the main function:
const useProvenPath = !domain || domain.useProvenDeepResearch;
```

3. Where the engine calls source search functions (currently `searchPubMed` and `searchSemanticScholar`):
   - If `useProvenPath`: call EXACTLY as current (no changes)
   - If NOT `useProvenPath`: call sources based on `domain.sources` array. Import `searchArxiv` (if it exists from Issue #20) and `searchOpenAlex`. Map source IDs to search functions:

```typescript
const SOURCE_FUNCTIONS: Record<string, Function> = {
  pubmed: searchPubMed,
  semantic_scholar: searchSemanticScholar,
  openalex: searchOpenAlex,
  // arxiv: searchArxiv,  // uncomment when Issue #20 is merged
};

const sourceFns = useProvenPath
  ? [searchPubMed, searchSemanticScholar]  // EXACT current behavior
  : domain!.sources
      .filter(id => SOURCE_FUNCTIONS[id])
      .map(id => SOURCE_FUNCTIONS[id]);
```

4. Where the engine generates perspectives:
   - If `useProvenPath`: use EXISTING perspective generation (no changes)
   - If NOT `useProvenPath`: use `domain.perspectiveTemplates` to generate perspectives

DO NOT restructure the engine. DO NOT extract the medical logic into a separate function. The existing code stays in place with an if/else wrapping the domain-specific parts.

### Step 2: Modify perspectives.ts (ONLY the config-driven path)

File: `src/lib/deep-research/perspectives.ts`

Add a NEW exported function for config-driven perspective generation:

```typescript
import type { DomainConfig, PerspectiveTemplate } from "@/lib/search/domains/types";

/**
 * Generate perspectives from domain config templates.
 * ONLY used for non-medicine/biology domains.
 * Medicine/biology use the existing hardcoded generatePerspectives() function.
 */
export function generateDomainPerspectives(
  topic: string,
  domain: DomainConfig
): Perspective[] {
  if (domain.perspectiveTemplates.length === 0) {
    // Fallback: generic academic perspectives
    return generateGenericPerspectives(topic);
  }

  return domain.perspectiveTemplates.map(template => ({
    name: template.name,
    description: template.description,
    queries: template.queryTemplates.map(qt =>
      qt.replace(/\$\{topic\}/g, topic)
    ),
    expectedStudyTypes: template.expectedStudyTypes,
  }));
}

function generateGenericPerspectives(topic: string): Perspective[] {
  return [
    {
      name: "Foundational Research",
      description: "Core theoretical and empirical foundations",
      queries: [`${topic} foundational research theory`, `${topic} seminal papers`],
      expectedStudyTypes: ["journal_article", "review"],
    },
    {
      name: "Recent Advances",
      description: "Latest developments and breakthroughs",
      queries: [`${topic} recent advances 2024 2025`, `${topic} latest developments`],
      expectedStudyTypes: ["journal_article", "preprint"],
    },
    {
      name: "Methodology",
      description: "Research methods and approaches",
      queries: [`${topic} methodology research methods`, `${topic} experimental design`],
      expectedStudyTypes: ["journal_article"],
    },
    {
      name: "Review & Synthesis",
      description: "Survey papers and literature reviews",
      queries: [`${topic} review survey state of the art`, `${topic} systematic review`],
      expectedStudyTypes: ["review", "meta_analysis"],
    },
    {
      name: "Applications & Impact",
      description: "Practical applications and real-world impact",
      queries: [`${topic} applications practical impact`, `${topic} real-world deployment`],
      expectedStudyTypes: ["journal_article"],
    },
  ];
}
```

DO NOT modify the existing `generatePerspectives()` function. Add new functions alongside it.

### Step 3: Modify RAG modules

**File: `src/lib/rag/query-enhancer.ts`**

1. Add `domain?: DomainConfig` parameter
2. Replace hardcoded persona:
```typescript
const persona = domain?.personas.librarian ?? "You are a medical research librarian. Generate query variations that use different terminology, synonyms, and phrasings. Focus on medical synonyms (e.g., 'heart attack' → 'myocardial infarction', 'blood thinners' → 'anticoagulants').";
```

**File: `src/lib/rag/hyde.ts`**

1. Add `domain?: DomainConfig` parameter
2. Replace hardcoded persona:
```typescript
const persona = domain?.personas.textbook ?? "You are a medical textbook. Write a brief, factual 2-3 sentence answer to this research question. Use precise medical terminology. Do not hedge or qualify — state facts directly as a textbook would.";
```

**File: `src/lib/rag/source-summarizer.ts`**

1. Add `domain?: DomainConfig` parameter
2. Replace hardcoded extraction hint:
```typescript
const extractionHint = domain
  ? `Summarize the key findings from this research excerpt relevant to ${domain.label}.`
  : "If the excerpts are from a clinical trial, mention the intervention, population, and key findings. If from a systematic review, mention the number of included studies and main conclusions.";
```

For all three: DO NOT change function logic, return types, or calling patterns. Only the persona/prompt string changes.

### Step 4: Modify feeds copilot summarize

File: `src/app/api/feeds/copilot/summarize/route.ts`

1. The route needs to know the user's domain. Read it from the authenticated user's profile, or accept it as a query parameter.
2. Replace the hardcoded clinical summary prompt with:

```typescript
const summaryPrompt = domain?.feedsSummaryPrompt ?? `Generate a clinical summary in exactly 3 sentences:
1. What was studied (population, intervention/exposure)
2. What was found (primary outcome, key statistics)
3. What it means for clinical practice (significance)

Keep language accessible to a medical student. Include key numbers (HR, OR, p-values, NNT).
Do NOT start with "This study..." — lead with the finding.
Then output exactly 3 suggested follow-up questions.`;
```

If getting the user's domain from the database is complex, accept `?domain=` as a query parameter for now. The frontend will pass it.

### Step 5: Thread domain through callers

Find where `query-enhancer`, `hyde`, and `source-summarizer` are called and pass the domain config. These are likely called from:
- RAG chat route (`/api/rag-chat` or similar)
- Notebook chat route
- Deep research engine

For each callsite:
1. Check if domain config is available (it should be if the route accepts `?domain=`)
2. Pass it as the new parameter
3. If domain isn't available at the callsite, pass `undefined` (falls back to medical behavior)

### Step 6: Write tests

Create file: `src/lib/deep-research/__tests__/domain-branching.test.ts`

Test:
1. With medicine domain: perspectives function returns existing medical perspectives (hardcoded path)
2. With multidisciplinary domain: `generateDomainPerspectives()` returns generic perspectives
3. With a domain that has custom perspectiveTemplates: returns those templates with topic interpolated
4. `${topic}` placeholder is correctly replaced in query templates

Create file: `src/lib/rag/__tests__/domain-personas.test.ts`

Test:
1. query-enhancer with undefined domain uses medical persona (backward compat)
2. query-enhancer with multidisciplinary domain uses the config persona
3. hyde with undefined domain uses "medical textbook" (backward compat)
4. hyde with multidisciplinary domain uses config persona
5. source-summarizer with undefined domain mentions "clinical trial" (backward compat)
6. source-summarizer with a domain uses domain-specific hint

## WHAT NOT TO DO

- DO NOT modify any existing function that runs in the medicine/biology path
- DO NOT extract medical prompts into config — they stay hardcoded
- DO NOT restructure the deep research engine architecture
- DO NOT modify rank-fusion, dedup, rerank, or any search infrastructure
- DO NOT modify the unified search route
- DO NOT add dependencies

## FILE SUMMARY

| Action | File |
|--------|------|
| MODIFY | `src/lib/deep-research/engine.ts` (add domain branch) |
| MODIFY | `src/lib/deep-research/perspectives.ts` (add generateDomainPerspectives) |
| MODIFY | `src/lib/rag/query-enhancer.ts` (add domain param, read persona) |
| MODIFY | `src/lib/rag/hyde.ts` (add domain param, read persona) |
| MODIFY | `src/lib/rag/source-summarizer.ts` (add domain param, read hint) |
| MODIFY | `src/app/api/feeds/copilot/summarize/route.ts` (read domain, use config prompt) |
| MAYBE MODIFY | RAG chat routes (thread domain to RAG functions) |
| CREATE | `src/lib/deep-research/__tests__/domain-branching.test.ts` |
| CREATE | `src/lib/rag/__tests__/domain-personas.test.ts` |

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. All existing deep research tests pass unchanged
3. All existing RAG tests pass unchanged
4. New tests pass
5. CRITICAL: Manually verify that medicine deep research output is identical to before (no config indirection in the medicine path)

## COMMIT MESSAGE

```
feat: add domain branching to deep research, RAG, and feeds copilot

- Deep research: medicine+biology use proven hardcoded path, others use config-driven perspectives
- RAG query-enhancer, hyde, source-summarizer read personas from domain config
- Feeds copilot reads summary prompt from domain config
- Generic academic perspectives fallback for domains without templates
- All changes backward-compatible — medicine path UNTOUCHED
- 10 new tests

Implements #23
```
