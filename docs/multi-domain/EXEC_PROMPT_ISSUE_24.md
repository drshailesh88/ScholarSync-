# Execution Prompt — Issue #24: Guide/Learn Mode + Presentation + Poster Domain Branching

Read this entire prompt before writing any code. Pull latest from main first.

## CONTEXT

The Domain Registry is in the codebase. This issue adds domain branching to the guide/learn mode (the biggest single file change), presentation module, and poster generator. Same protection pattern as deep research: medicine+biology use the proven hardcoded path.

Read these files:
- `src/lib/search/domains/medicine.ts` — medicine config
- `src/lib/ai/prompts/guide.ts` — the 550-line medical guide prompt (DO NOT MODIFY for medicine path)
- `src/lib/ai/prompts/presentation.ts` — presentation prompts
- `src/components/presentation/generation-wizard.tsx` — audience type selector
- `src/types/poster.ts` — poster templates
- `src/lib/ai/audio-overview.ts` — audio overview
- `src/lib/ai/prompts/draft.ts` — draft mode
- `docs/multi-domain/GRILL_DECISIONS.md` — decisions #17, #18, #20, #21

## CRITICAL SAFETY RULE

**Medicine and biology guide prompts stay EXACTLY as they are.** The 550-line guide.ts with CARE checklists, CONSORT, STROBE, PICO coaching, Indian medical education context — ALL of it stays untouched for medicine/biology users. Same branching pattern:

```typescript
if (!domain || domain.useProvenGuidance) {
  // Existing 550-line guide prompt — zero changes
} else {
  // Config-driven guidance from domain.guidanceContext
}
```

## WHAT TO BUILD

### Step 1: Modify guide.ts (Learn Mode)

File: `src/lib/ai/prompts/guide.ts`

This is the biggest file. The existing function that builds the guide system prompt needs a domain branch:

1. Add `domain?: DomainConfig` parameter to the function that generates the guide prompt
2. At the TOP, check `domain?.useProvenGuidance !== false` (or `!domain || domain.useProvenGuidance`)
3. If proven path: return EXACTLY the current prompt. No changes. Not even reformatting.
4. If config-driven path: build a prompt from `domain.guidanceContext`:

```typescript
function buildConfigDrivenGuidePrompt(domain: DomainConfig): string {
  const ctx = domain.guidanceContext!;
  return `You are ScholarSync's AI research mentor for ${domain.label} researchers.

Your role is to TEACH users how to write scholarly manuscripts, not to write for them.

TARGET READER: ${ctx.targetReader}

CORE PRINCIPLES:
- Socratic questioning: ask before telling
- Never fabricate citations, statistics, or data
- Evidence is sacred — always ground advice in published conventions
- Academic precision is non-negotiable

REPORTING GUIDELINES for this field:
${ctx.reportingGuidelines.length > 0 ? ctx.reportingGuidelines.map(g => `- ${g}`).join("\n") : "- Follow the conventions of your target journal"}

WRITING CONVENTIONS:
${ctx.writingConventions}

AVAILABLE DOCUMENT TYPES:
${ctx.documentTypes.map(dt => `- ${dt}`).join("\n")}

For each document type, guide the user through:
1. UNDERSTAND — Clarify the research question and audience
2. PLAN — Select target venue, understand required structure
3. OUTLINE — Section-by-section outline
4. DRAFT — Help with writing, offer sentence starters (NOT complete sentences)
5. REVISE — Structured feedback using field conventions
6. POLISH — Abstract formatting, title selection, ethical requirements`;
}
```

This is ~30 lines vs the 550-line medical prompt. That's fine — other domains will get richer guidance as we build out the content in Issue #25. The structure is here; the content grows over time.

### Step 2: Modify presentation generation-wizard.tsx

File: `src/components/presentation/generation-wizard.tsx`

Currently has hardcoded `AUDIENCE_OPTIONS` including "patient_case" and "grand_rounds."

1. Accept domain config (via prop or context)
2. Filter audience options by `domain.features.presentationTypes`:

```typescript
const AUDIENCE_OPTIONS_ALL = [
  { key: "general", label: "General" },
  { key: "thesis_defense", label: "Thesis Defense" },
  { key: "conference", label: "Conference" },
  { key: "journal_club", label: "Journal Club" },
  { key: "classroom", label: "Classroom" },
  { key: "grant_presentation", label: "Grant Presentation" },
  { key: "poster_session", label: "Poster Session" },
  { key: "systematic_review", label: "Systematic Review" },
  { key: "patient_case", label: "Patient Case" },
  { key: "grand_rounds", label: "Grand Rounds" },
  { key: "lab_meeting", label: "Lab Meeting" },
  { key: "departmental_seminar", label: "Departmental Seminar" },
];

// Filter to only show types configured for this domain
const audienceOptions = domain
  ? AUDIENCE_OPTIONS_ALL.filter(opt => domain.features.presentationTypes.includes(opt.key))
  : AUDIENCE_OPTIONS_ALL;  // Show all if no domain (backward compat)
```

Also add the new audience types ("lab_meeting", "departmental_seminar") to the master list — they won't show for medicine users because medicine's `presentationTypes` config doesn't include them.

### Step 3: Modify presentation pre-processor

File: `src/lib/ai/prompts/presentation.ts`

1. Add `domain?: DomainConfig` parameter to `getPreProcessorSystemPrompt()`
2. Replace the hardcoded study design enum with:

```typescript
const studyDesigns = domain?.presentationStudyDesigns
  ?? "RCT|cohort|cross-sectional|case-control|systematic review|meta-analysis|qualitative|mixed-methods|other";
```

3. Replace the hardcoded callout type "clinical" with:

```typescript
const calloutTypes = domain
  ? `info|warning|success|finding|limitation|methodology|${domain.calloutType.id}`
  : "info|warning|success|finding|limitation|methodology|clinical";
```

DO NOT change the slide block type system, the layout types, or any other part of the presentation prompt.

### Step 4: Modify poster templates

File: `src/types/poster.ts` (or wherever `POSTER_TEMPLATES` is defined)

1. Add a `domain` field to each template:

```typescript
clinical_research: { ..., domains: ["medicine", "biology"] },
basic_science: { ..., domains: ["medicine", "biology", "physics", "chemistry", "environmental"] },
systematic_review: { ..., domains: ["medicine", "biology", "psychology"] },
engineering: { ..., domains: ["engineering", "computer_science", "mathematics"] },
```

2. Export a function to get templates for a domain:

```typescript
export function getPosterTemplatesForDomain(domain?: DomainConfig): PosterTemplate[] {
  if (!domain) return Object.values(POSTER_TEMPLATES);  // Show all (backward compat)

  return Object.entries(POSTER_TEMPLATES)
    .filter(([key]) => domain.posterTemplates.includes(key))
    .map(([, template]) => template);
}
```

### Step 5: Cosmetic fixes

**File: `src/lib/ai/audio-overview.ts`**

Find the string "medical student" and change it to "student":
```typescript
// BEFORE:
"The listener is a medical student studying these papers"
// AFTER:
"The listener is a student studying these papers"
```

If the current code doesn't have this exact string (the earlier exploration showed it might already be neutral), search for any "medical" reference and make it generic. If there are none, skip this file.

**File: `src/lib/ai/prompts/draft.ts`**

Find any reference to "ICMJE" and make it generic:
```typescript
// BEFORE (if it exists):
"Follow ICMJE recommendations"
// AFTER:
"Follow the reporting guidelines of your target journal"
```

Search for "clinical data" and make it generic:
```typescript
// BEFORE:
"Never fabricate citations, statistics, or clinical data"
// AFTER:
"Never fabricate citations, statistics, or data"
```

These are one-word changes. If the exact strings don't exist, search for the closest match and adjust minimally.

### Step 6: Write tests

Create file: `src/lib/ai/__tests__/domain-guide.test.ts`

Test:
1. Guide prompt with medicine domain returns the existing hardcoded prompt (contains "CARE checklist" or "PICO" — verify a known string)
2. Guide prompt with undefined domain returns the existing hardcoded prompt (backward compat)
3. Guide prompt with multidisciplinary domain returns config-driven prompt (contains "research mentor for Multidisciplinary")
4. Guide prompt with a custom guidanceContext includes the target reader and reporting guidelines

Create file: `src/components/presentation/__tests__/domain-filtering.test.ts`

Test:
1. With medicine config: audience options include "grand_rounds" and "patient_case"
2. With a physics-like config (presentationTypes without grand_rounds): "grand_rounds" is NOT in the list
3. With undefined domain: all options shown (backward compat)
4. Poster templates: medicine config shows "clinical_research", physics config does not

## WHAT NOT TO DO

- DO NOT modify the existing 550-line medical guide prompt content
- DO NOT restructure guide.ts — just add the branch at the top
- DO NOT change presentation slide block types or layout system
- DO NOT modify presentation generation logic — only the config inputs
- DO NOT add dependencies

## FILE SUMMARY

| Action | File |
|--------|------|
| MODIFY | `src/lib/ai/prompts/guide.ts` (add domain branch, config-driven path) |
| MODIFY | `src/components/presentation/generation-wizard.tsx` (filter audience types) |
| MODIFY | `src/lib/ai/prompts/presentation.ts` (domain-aware study designs + callout) |
| MODIFY | `src/types/poster.ts` (add domain tags, filter function) |
| MODIFY | `src/lib/ai/audio-overview.ts` (cosmetic: "medical student" → "student") |
| MODIFY | `src/lib/ai/prompts/draft.ts` (cosmetic: ICMJE → generic, clinical data → data) |
| CREATE | `src/lib/ai/__tests__/domain-guide.test.ts` |
| CREATE | `src/components/presentation/__tests__/domain-filtering.test.ts` |

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. All existing guide/presentation tests pass unchanged
3. New tests pass
4. CRITICAL: Medicine guide prompt is IDENTICAL to before (check for "CARE checklist" string in output)

## COMMIT MESSAGE

```
feat: add domain branching to guide, presentation, and poster modules

- Guide/Learn mode: medicine+biology use proven 550-line prompt, others use config-driven guidance
- Presentation audience types filtered by domain config
- Presentation study designs and callout types read from domain config
- Poster templates tagged by domain and filtered
- Audio overview and draft mode cosmetic generalization
- 8 new tests

Implements #24
```
