# Execution Prompt — Issue #19: Tracer Bullet
## Domain Registry + Medicine Config + Search Route Integration

Read this entire prompt before writing any code. This is a detailed execution plan for Issue #19.

## CONTEXT

You are implementing the Domain Registry foundation for ScholarSync's multi-domain expansion. Read these files for full context:
- `docs/multi-domain/MASTER_CONTEXT.md` — architecture overview
- `docs/multi-domain/GRILL_DECISIONS.md` — all 23 design decisions

## CRITICAL SAFETY RULE

The medicine search experience MUST NOT CHANGE. After your work, a search with `?domain=medicine` (or no domain param at all) must produce **byte-identical results** to the current behavior. You are extracting existing hardcoded values into a config object — not rewriting logic.

## WHAT TO BUILD (in this exact order)

### Step 1: Create the DomainConfig type definition

Create file: `src/lib/search/domains/types.ts`

```typescript
// This is the core type. Every domain-aware file reads from this.
// See docs/multi-domain/GRILL_DECISIONS.md for why each field exists.

export type DomainId =
  | "medicine"
  | "biology"
  | "physics"
  | "chemistry"
  | "computer_science"
  | "engineering"
  | "mathematics"
  | "social_sciences"
  | "economics"
  | "psychology"
  | "law"
  | "humanities"
  | "education"
  | "environmental"
  | "multidisciplinary";

export type SourceId =
  | "pubmed"
  | "semantic_scholar"
  | "openalex"
  | "clinical_trials"
  | "arxiv";

export interface EvidenceHierarchyEntry {
  level: string;
  label: string;
  studyTypes: string[];
  color: string;
}

export interface StudyTypePattern {
  studyType: string;
  /** Stored as strings. Compile to RegExp at runtime with new RegExp(pattern, 'i') */
  patterns: string[];
  titleOnly?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface SynonymEntry {
  /** Stored as string. Compile to RegExp at runtime with new RegExp(pattern, 'i') */
  pattern: string;
  synonyms: string[];
  mesh?: string;
}

export interface PerspectiveTemplate {
  name: string;
  description: string;
  /** Templates with ${topic} placeholder for interpolation */
  queryTemplates: string[];
  expectedStudyTypes: string[];
}

export interface ResearchFramework {
  name: string;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
  }>;
}

export interface GuidanceContext {
  targetReader: string;
  reportingGuidelines: string[];
  writingConventions: string;
  documentTypes: string[];
}

export interface CalloutType {
  id: string;
  label: string;
}

export interface DomainConfig {
  // ── Identity ──
  id: DomainId;
  label: string;
  description: string;

  // ── Search Sources ──
  sources: SourceId[];

  // ── Query Augmentation ──
  personas: {
    librarian: string;
    researcher: string;
    textbook: string;
  };
  querySyntaxHints: string;
  queryExample: string;

  // ── Evidence Hierarchy ──
  evidenceHierarchy: EvidenceHierarchyEntry[];

  // ── Study Type Detection ──
  studyTypePatterns: StudyTypePattern[];

  // ── Filters (UI) ──
  filterOptions: FilterOption[];

  // ── Query Expansion ──
  synonymMap: SynonymEntry[];

  // ── Deep Research ──
  useProvenDeepResearch: boolean;
  perspectiveTemplates: PerspectiveTemplate[];

  // ── Research Framework ──
  researchFramework: ResearchFramework | null;

  // ── Learn Mode / Guide ──
  useProvenGuidance: boolean;
  guidanceContext: GuidanceContext | null;

  // ── Journal Feeds ──
  journalCategories: string[];
  feedsSummaryPrompt: string;

  // ── Presentation ──
  presentationStudyDesigns: string[];
  calloutType: CalloutType;
  posterTemplates: string[];

  // ── Feature Flags ──
  features: {
    systematicReview: boolean;
    picoExtraction: boolean;
    clinicalTrialsSearch: boolean;
    presentationTypes: string[];
    journalFeeds: boolean;
  };
}
```

### Step 2: Create the medicine domain config

Create file: `src/lib/search/domains/medicine.ts`

Extract ALL current hardcoded values from the codebase into this config. Here are the exact values to use — these come directly from the current code:

```typescript
import type { DomainConfig } from "./types";

export const medicineDomain: DomainConfig = {
  id: "medicine",
  label: "Medicine & Health Sciences",
  description: "Clinical medicine, public health, biomedical research",

  sources: ["pubmed", "semantic_scholar", "openalex", "clinical_trials"],

  personas: {
    librarian: "You are a medical librarian. Convert the user's research question into optimized search queries for different academic databases.\n\nFor PubMed: Use MeSH terms with [MeSH] tags, Boolean operators (AND, OR), field tags ([tiab] for title/abstract, [pt] for publication type). Be specific and structured.\nFor Semantic Scholar: Use natural language that captures the conceptual meaning. Be descriptive, not Boolean.\nFor OpenAlex: Use natural language keywords. Include synonyms.\n\nAlso suggest appropriate filters (year range, publication types) based on the query context.",
    researcher: "You are a medical research strategist specializing in comprehensive literature search.",
    textbook: "You are a medical textbook. Write a brief, factual 2-3 sentence answer to this research question. Use precise medical terminology. Do not hedge or qualify — state facts directly as a textbook would.",
  },

  querySyntaxHints: "For PubMed: Use MeSH terms with [MeSH] tags, Boolean operators (AND, OR), field tags ([tiab] for title/abstract, [pt] for publication type). Be specific and structured.\nFor Semantic Scholar: Use natural language that captures the conceptual meaning. Be descriptive, not Boolean.\nFor OpenAlex: Use natural language keywords. Include synonyms.",

  queryExample: 'User: "What are the effects of SGLT2 inhibitors on heart failure outcomes?"\nPubMed: ("Sodium-Glucose Transporter 2 Inhibitors"[MeSH] OR empagliflozin OR dapagliflozin) AND "Heart Failure"[MeSH] AND ("treatment outcome"[MeSH] OR mortality OR hospitalization)\nSemantic Scholar: SGLT2 inhibitor effects on heart failure outcomes mortality hospitalization\nOpenAlex: sodium glucose cotransporter 2 inhibitors heart failure outcomes clinical trials',

  evidenceHierarchy: [
    { level: "I", label: "Systematic Review / Meta-Analysis", studyTypes: ["meta_analysis", "systematic_review"], color: "emerald" },
    { level: "II", label: "Randomized Controlled Trial", studyTypes: ["rct"], color: "sky" },
    { level: "III", label: "Cohort / Observational Study", studyTypes: ["cohort", "observational"], color: "amber" },
    { level: "IV", label: "Case Report / Case Series", studyTypes: ["case_control", "case_report"], color: "orange" },
    { level: "V", label: "Expert Opinion / Other", studyTypes: ["review", "editorial", "letter", "other"], color: "slate" },
  ],

  studyTypePatterns: [],  // Will be populated in Slice 4 when study-type-detector is refactored

  filterOptions: [
    { value: "meta_analysis", label: "Meta-Analysis" },
    { value: "systematic_review", label: "Systematic Review" },
    { value: "rct", label: "Randomized Controlled Trial" },
    { value: "cohort", label: "Cohort Study" },
    { value: "case_control", label: "Case-Control Study" },
    { value: "observational", label: "Observational Study" },
    { value: "case_report", label: "Case Report" },
    { value: "review", label: "Review" },
    { value: "guideline", label: "Clinical Guideline" },
  ],

  synonymMap: [
    { pattern: "sglt2\\s*inhibitor", synonyms: ["empagliflozin", "dapagliflozin", "canagliflozin", "sotagliflozin", "ertugliflozin"], mesh: "Sodium-Glucose Transporter 2 Inhibitors" },
    { pattern: "heart\\s*failure", synonyms: ["HFrEF", "HFpEF", "HFmrEF", "reduced ejection fraction", "preserved ejection fraction"], mesh: "Heart Failure" },
    { pattern: "ace\\s*inhibitor", synonyms: ["enalapril", "ramipril", "lisinopril", "captopril", "perindopril"], mesh: "Angiotensin-Converting Enzyme Inhibitors" },
    { pattern: "angiotensin.*receptor.*blocker|arb\\b", synonyms: ["valsartan", "losartan", "candesartan", "irbesartan", "telmisartan"], mesh: "Angiotensin Receptor Antagonists" },
    { pattern: "beta[\\s-]*blocker", synonyms: ["metoprolol", "carvedilol", "bisoprolol", "atenolol", "propranolol"], mesh: "Adrenergic beta-Antagonists" },
    { pattern: "statin(?:s)?\\b", synonyms: ["atorvastatin", "rosuvastatin", "simvastatin", "pravastatin"], mesh: "Hydroxymethylglutaryl-CoA Reductase Inhibitors" },
    { pattern: "glp[\\s-]*1.*agonist", synonyms: ["semaglutide", "liraglutide", "dulaglutide", "tirzepatide"], mesh: "Glucagon-Like Peptide-1 Receptor Agonists" },
    { pattern: "type\\s*2\\s*diabetes|t2dm", synonyms: ["diabetes mellitus type 2", "T2DM", "non-insulin-dependent diabetes"], mesh: "Diabetes Mellitus, Type 2" },
  ],

  useProvenDeepResearch: true,
  perspectiveTemplates: [],  // Not used — medicine uses hardcoded path

  researchFramework: {
    name: "PICO",
    fields: [
      { id: "population", label: "Population", placeholder: "e.g., adults with Type 2 diabetes" },
      { id: "intervention", label: "Intervention", placeholder: "e.g., SGLT2 inhibitors" },
      { id: "comparison", label: "Comparison", placeholder: "e.g., placebo or standard care" },
      { id: "outcome", label: "Outcome", placeholder: "e.g., cardiovascular mortality" },
    ],
  },

  useProvenGuidance: true,
  guidanceContext: null,  // Not used — medicine uses hardcoded 550-line guide prompt

  journalCategories: [
    "General Medicine", "Cardiology", "Surgery", "Pediatrics", "Oncology",
    "Neurology", "Psychiatry", "Radiology", "Orthopedics", "Dermatology",
    "Ophthalmology", "ENT", "Obstetrics & Gynecology", "Emergency Medicine",
    "Anesthesiology", "Infectious Disease", "Pharmacology", "Public Health",
    "Basic Sciences", "Evidence-Based Medicine",
  ],

  feedsSummaryPrompt: "Generate a clinical summary in exactly 3 sentences:\n1. What was studied (population, intervention/exposure)\n2. What was found (primary outcome, key statistics)\n3. What it means for clinical practice (significance)\n\nKeep language accessible to a medical student. Include key numbers (HR, OR, p-values, NNT).\nDo NOT start with \"This study...\" — lead with the finding.\nThen output exactly 3 suggested follow-up questions.",

  presentationStudyDesigns: "RCT|cohort|cross-sectional|case-control|systematic review|meta-analysis|qualitative|mixed-methods|other",

  calloutType: { id: "clinical", label: "Clinical Relevance" },

  posterTemplates: ["clinical_research", "basic_science", "systematic_review"],

  features: {
    systematicReview: true,
    picoExtraction: true,
    clinicalTrialsSearch: true,
    presentationTypes: [
      "thesis_defense", "conference", "journal_club", "classroom",
      "general", "grant_presentation", "poster_session",
      "systematic_review", "patient_case", "grand_rounds",
    ],
    journalFeeds: true,
  },
};
```

### Step 3: Create the multidisciplinary domain config

Create file: `src/lib/search/domains/multidisciplinary.ts`

```typescript
import type { DomainConfig } from "./types";

export const multidisciplinaryDomain: DomainConfig = {
  id: "multidisciplinary",
  label: "Multidisciplinary / Not Sure",
  description: "Search across all scientific disciplines",

  sources: ["pubmed", "semantic_scholar", "openalex", "clinical_trials"],
  // Note: arxiv will be added here once the arXiv adapter is built (Issue #20)

  personas: {
    librarian: "You are an interdisciplinary research librarian. Convert the user's research question into optimized search queries for different academic databases.\n\nFor PubMed: Use appropriate subject terms and Boolean operators.\nFor Semantic Scholar: Use natural language that captures the conceptual meaning.\nFor OpenAlex: Use concept-based keywords with synonyms.\n\nAlso suggest appropriate filters (year range, publication types) based on the query context.",
    researcher: "You are an interdisciplinary research strategist specializing in comprehensive literature search across all academic fields.",
    textbook: "You are an academic reference work. Write a brief, factual 2-3 sentence answer to this research question. Use precise terminology. Do not hedge or qualify — state facts directly.",
  },

  querySyntaxHints: "For PubMed: Use subject terms and Boolean operators.\nFor Semantic Scholar: Use natural language, conceptual descriptions.\nFor OpenAlex: Use concept-based keywords with synonyms.",

  queryExample: "",

  evidenceHierarchy: [
    { level: "I", label: "Systematic Review / Meta-Analysis", studyTypes: ["meta_analysis", "systematic_review"], color: "emerald" },
    { level: "II", label: "Peer-Reviewed Journal Article", studyTypes: ["journal_article", "rct"], color: "sky" },
    { level: "III", label: "Conference Proceedings / Preprint", studyTypes: ["conference_paper", "preprint", "cohort", "observational"], color: "amber" },
    { level: "IV", label: "Thesis / Technical Report", studyTypes: ["thesis", "technical_report", "case_report", "case_control"], color: "orange" },
    { level: "V", label: "Working Paper / Other", studyTypes: ["working_paper", "review", "editorial", "letter", "other"], color: "slate" },
  ],

  studyTypePatterns: [],
  filterOptions: [
    { value: "meta_analysis", label: "Meta-Analysis / Systematic Review" },
    { value: "journal_article", label: "Journal Article" },
    { value: "conference_paper", label: "Conference Paper" },
    { value: "preprint", label: "Preprint" },
    { value: "review", label: "Review" },
    { value: "other", label: "Other" },
  ],

  synonymMap: [],

  useProvenDeepResearch: false,
  perspectiveTemplates: [
    {
      name: "Foundational Research",
      description: "Core theoretical and empirical foundations",
      queryTemplates: ["${topic} foundational research theory", "${topic} seminal papers landmark studies"],
      expectedStudyTypes: ["journal_article", "review"],
    },
    {
      name: "Recent Advances",
      description: "Latest developments and breakthroughs",
      queryTemplates: ["${topic} recent advances 2024 2025", "${topic} latest developments novel approaches"],
      expectedStudyTypes: ["journal_article", "preprint"],
    },
    {
      name: "Methodology",
      description: "Research methods and approaches",
      queryTemplates: ["${topic} methodology research methods", "${topic} experimental design analytical framework"],
      expectedStudyTypes: ["journal_article"],
    },
    {
      name: "Review & Synthesis",
      description: "Survey papers and literature reviews",
      queryTemplates: ["${topic} review survey state of the art", "${topic} systematic review meta-analysis"],
      expectedStudyTypes: ["meta_analysis", "systematic_review", "review"],
    },
    {
      name: "Applications & Impact",
      description: "Practical applications and real-world impact",
      queryTemplates: ["${topic} applications practical impact", "${topic} implementation real-world deployment"],
      expectedStudyTypes: ["journal_article"],
    },
  ],

  researchFramework: null,

  useProvenGuidance: false,
  guidanceContext: {
    targetReader: "researcher or graduate student",
    reportingGuidelines: [],
    writingConventions: "Use precise academic language. Follow the conventions of your target journal.",
    documentTypes: ["original_article", "review_article", "thesis", "book_chapter", "letter"],
  },

  journalCategories: ["Multidisciplinary"],

  feedsSummaryPrompt: "Generate a research summary in exactly 3 sentences:\n1. What was studied (topic, scope, methodology)\n2. What was found (key results and significance)\n3. What it means for the field (implications)\n\nKeep language accessible to a graduate student. Include key statistics where available.\nDo NOT start with \"This study...\" — lead with the finding.\nThen output exactly 3 suggested follow-up questions.",

  presentationStudyDesigns: "empirical|theoretical|computational|experimental|survey|review|mixed-methods|other",

  calloutType: { id: "highlight", label: "Key Point" },

  posterTemplates: ["basic_science", "engineering"],

  features: {
    systematicReview: false,
    picoExtraction: false,
    clinicalTrialsSearch: false,
    presentationTypes: [
      "thesis_defense", "conference", "classroom",
      "general", "grant_presentation", "poster_session",
    ],
    journalFeeds: true,
  },
};
```

### Step 4: Create the domain registry (getDomainConfig)

Create file: `src/lib/search/domains/registry.ts`

```typescript
import type { DomainConfig, DomainId } from "./types";
import { medicineDomain } from "./medicine";
import { multidisciplinaryDomain } from "./multidisciplinary";

const domainRegistry: Record<string, DomainConfig> = {
  medicine: medicineDomain,
  multidisciplinary: multidisciplinaryDomain,
  // Additional domains will be added in Issue #25 (Content Curation)
};

/**
 * Get the domain configuration for a given domain ID.
 * Defaults to "medicine" if the domain is null, undefined, or unknown.
 *
 * This is the SINGLE entry point for all domain config lookups.
 * Resolve once at the route level and thread the config down.
 */
export function getDomainConfig(domainId?: string | null): DomainConfig {
  if (!domainId) return domainRegistry.medicine;
  return domainRegistry[domainId] ?? domainRegistry.medicine;
}

/**
 * Get all registered domain IDs (for onboarding picker, etc.)
 */
export function getRegisteredDomains(): DomainId[] {
  return Object.keys(domainRegistry) as DomainId[];
}

/**
 * Check if a domain ID is registered
 */
export function isDomainRegistered(domainId: string): boolean {
  return domainId in domainRegistry;
}
```

Create file: `src/lib/search/domains/index.ts`

```typescript
export { getDomainConfig, getRegisteredDomains, isDomainRegistered } from "./registry";
export type {
  DomainConfig,
  DomainId,
  SourceId,
  EvidenceHierarchyEntry,
  StudyTypePattern,
  FilterOption,
  SynonymEntry,
  PerspectiveTemplate,
  ResearchFramework,
  GuidanceContext,
  CalloutType,
} from "./types";
```

### Step 5: Modify query-augment.ts to read from config

File to modify: `src/lib/ai/query-augment.ts`

Change the function signature to accept a DomainConfig parameter. Replace the hardcoded system prompt with the config's persona. **Keep the schema, the timeout, and the generateObject call EXACTLY as they are.**

The ONLY change is:
1. Add `domain?: DomainConfig` parameter to `augmentQuery()`
2. Replace the hardcoded system string with `domain?.personas.librarian ?? <current hardcoded string>`
3. Import the DomainConfig type

DO NOT change the schema, the model, the timeout, or any other logic.

### Step 6: Modify evidence-level.ts to read from config

File to modify: `src/lib/search/evidence-level.ts`

Add a new function that uses domain config:

```typescript
import type { DomainConfig, EvidenceHierarchyEntry } from "@/lib/search/domains/types";

/**
 * Get evidence level from domain config hierarchy.
 * Falls back to the hardcoded medical hierarchy if no config provided.
 */
export function getDomainEvidenceLevel(
  studyType: string,
  domain?: DomainConfig
): { level: string; label: string; color: string } {
  if (!domain) {
    return getEvidenceLevel(studyType);  // Existing function, unchanged
  }

  for (const entry of domain.evidenceHierarchy) {
    if (entry.studyTypes.includes(studyType)) {
      return { level: entry.level, label: entry.label, color: entry.color };
    }
  }

  // Fallback to lowest level in the domain's hierarchy
  const lowest = domain.evidenceHierarchy[domain.evidenceHierarchy.length - 1];
  return lowest
    ? { level: lowest.level, label: lowest.label, color: lowest.color }
    : { level: "V", label: "Other", color: "slate" };
}
```

DO NOT modify the existing `getEvidenceLevel()`, `mapPubMedPublicationType()`, `mapS2PublicationType()`, `mapClinicalTrialPhase()`, or `mapOpenAlexType()` functions. They stay exactly as they are. The new function is ADDITIVE.

### Step 7: Modify unified/route.ts to accept domain parameter

File to modify: `src/app/api/search/unified/route.ts`

Changes (and ONLY these changes):

1. Add import: `import { getDomainConfig } from "@/lib/search/domains";`
2. After parsing query params, add: `const domain = getDomainConfig(searchParams.get("domain"));`
3. Pass domain to augmentQuery: change `augmentQuery(q)` to `augmentQuery(q, domain)`
4. In the evidence level step (Step 5 in the route), change `getEvidenceLevel(result.studyType)` to `getDomainEvidenceLevel(result.studyType, domain)`
5. Add the domain import for getDomainEvidenceLevel

DO NOT change the source fan-out logic yet (that's Issue #22). The route still calls all 4 sources. We're only threading the config to query augmentation and evidence classification in this slice.

DO NOT change rate limiting, pagination, sorting, reranking, journal quality enrichment, or any other step.

### Step 8: Write tests

Create file: `src/lib/search/domains/__tests__/registry.test.ts`

Test these behaviors:
1. `getDomainConfig("medicine")` returns a config with id "medicine"
2. `getDomainConfig("multidisciplinary")` returns a config with id "multidisciplinary"
3. `getDomainConfig(undefined)` returns medicine config (default)
4. `getDomainConfig(null)` returns medicine config (default)
5. `getDomainConfig("nonexistent")` returns medicine config (fallback)
6. Medicine config has all required fields (sources, personas, evidenceHierarchy, etc.)
7. Medicine config sources include "pubmed", "semantic_scholar", "openalex", "clinical_trials"
8. Medicine evidence hierarchy has exactly 5 levels (I through V)
9. Medicine evidence hierarchy level I includes "meta_analysis" and "systematic_review"
10. `getDomainEvidenceLevel("meta_analysis", medicineDomain)` returns level "I" with color "emerald"
11. `getDomainEvidenceLevel("rct", medicineDomain)` returns level "II" with color "sky"
12. `getDomainEvidenceLevel("unknown_type", medicineDomain)` returns the lowest level (fallback)
13. `getDomainEvidenceLevel("meta_analysis", undefined)` uses the existing hardcoded function (backward compat)

Use vitest. Follow the existing test patterns in `src/lib/search/__tests__/`.

## WHAT NOT TO DO

- DO NOT modify `rank-fusion.ts`, `dedup.ts`, `rerank.ts`, `journal-quality.ts` — these are domain-free
- DO NOT modify `study-type-detector.ts` or `query-expander.ts` — those are Issue #22
- DO NOT modify `FilterPanel.tsx` — that's Issue #22
- DO NOT modify any deep research, RAG, guide, presentation, or poster files
- DO NOT add database migrations — that's Issue #21
- DO NOT create domain configs for physics, CS, etc. — that's Issue #25
- DO NOT modify the source fan-out in the unified route — the 4-source hardcoded fan-out stays for now (Issue #22 will make it domain-driven)
- DO NOT add any new dependencies to package.json
- DO NOT change the existing `getEvidenceLevel()` function — add a new `getDomainEvidenceLevel()` alongside it
- DO NOT change the augmentedQuerySchema or its field names

## FILE SUMMARY

| Action | File |
|--------|------|
| CREATE | `src/lib/search/domains/types.ts` |
| CREATE | `src/lib/search/domains/medicine.ts` |
| CREATE | `src/lib/search/domains/multidisciplinary.ts` |
| CREATE | `src/lib/search/domains/registry.ts` |
| CREATE | `src/lib/search/domains/index.ts` |
| MODIFY | `src/lib/ai/query-augment.ts` (add domain param, read persona from config) |
| MODIFY | `src/lib/search/evidence-level.ts` (add getDomainEvidenceLevel function) |
| MODIFY | `src/app/api/search/unified/route.ts` (add ?domain= param, thread config) |
| CREATE | `src/lib/search/domains/__tests__/registry.test.ts` |

## VERIFICATION AFTER COMPLETION

Run these commands and confirm they pass:
1. `npx tsc --noEmit` — zero TypeScript errors
2. `npx eslint src/lib/search/domains/` — zero lint errors
3. `npx vitest run src/lib/search/domains/` — all new tests pass
4. `npx vitest run src/lib/search/__tests__/` — all existing search tests pass

## COMMIT MESSAGE

```
feat: add Domain Registry foundation with medicine config

- DomainConfig type with 15 supported domains
- Medicine config extracted from hardcoded values (zero behavior change)
- Multidisciplinary config as generic fallback
- getDomainConfig() resolves config by domain ID, defaults to medicine
- Unified search route accepts ?domain= parameter
- Query augmentation reads persona from config
- Evidence classification reads hierarchy from config
- 13 unit tests for registry and evidence level mapping

Implements #19
```
