# Systematic Review Feature — Completion Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the PRISMA-compliant systematic review feature by fixing blockers, wiring placeholder UIs, hardening error handling, adding missing competitive-differentiator features, and writing tests.

**Architecture:** The systematic review engine follows a 3-layer architecture: Zustand store (client state) → API routes (auth + validation + delegation) → library modules (business logic + DB + AI). All 15 library modules and 17 API routes are fully implemented with real code. The work remaining is: 1 migration gap, 2 unwired UI panels, pervasive silent error handling, and 4 missing features from the competitive analysis roadmap.

**Tech Stack:** Next.js 15 App Router, Drizzle ORM (PostgreSQL), Vercel AI SDK (`generateObject`/`generateText`), Zustand, Recharts, Tiptap, TypeScript, Vitest (testing).

**Source of truth for requirements:** `docs/COMPETITIVE-ANALYSIS-AI-SYSTEMATIC-REVIEW-TOOLS.md` Section 8.2 (6 Critical Differentiators) + Section 2 (7-Phase Workflow) + Section 6 (9 Gap Analysis items).

---

## Phase 0: Blockers (Must fix before anything else)

### Task 0.1: Generate missing `search_alerts` migration

The `search_alerts` table (schema table #53) and its two enums (`alert_frequency`, `alert_status`) are defined in `src/lib/db/schema/systematic.ts` but **missing from** `drizzle/0000_calm_calypso.sql`. The entire Living Review feature (alerts API + `living-review.ts`) will crash at runtime without this table.

**Files:**
- Read: `drizzle.config.ts`
- Read: `src/lib/db/schema/systematic.ts:303-324` (searchAlerts definition)
- Generate: `drizzle/XXXX_add_search_alerts.sql` (new migration)
- Read: `drizzle/meta/_journal.json` (verify migration registered)

**Step 1: Generate the migration**

```bash
npx drizzle-kit generate
```

This will detect the drift between the schema (which has `searchAlerts`) and the existing migration (which doesn't) and produce a new migration file.

**Step 2: Verify the generated migration**

Open the newly generated SQL file and confirm it contains:
- `CREATE TYPE "alert_frequency"` enum
- `CREATE TYPE "alert_status"` enum
- `CREATE TABLE "search_alerts"` with all columns from the schema
- Indexes: `idx_search_alerts_project`, `idx_search_alerts_status`
- FK: `project_id → projects(id) ON DELETE CASCADE`

Also check if `presentation_recordings` (from uncommitted `editor.ts` changes) got pulled in. If so, that's fine — it will be needed eventually.

**Step 3: Apply the migration (if local DB is available)**

```bash
npx drizzle-kit migrate
```

**Step 4: Commit**

```bash
git add drizzle/
git commit -m "fix: add missing search_alerts migration for living review feature"
```

---

### Task 0.2: Add missing Drizzle relations for `systematicReviewConfig` and `searchAlerts`

Two tables have no relations defined in `src/lib/db/schema/relations.ts`, which means `db.query.X.findFirst({ with: { ... } })` won't work for them.

**Files:**
- Modify: `src/lib/db/schema/relations.ts`
- Modify: `src/lib/db/schema/relations.ts` (add imports from `./systematic`)

**Step 1: Add the relation definitions**

At the end of `relations.ts`, add:

```typescript
import { systematicReviewConfig, searchAlerts } from "./systematic";

export const systematicReviewConfigRelations = relations(
  systematicReviewConfig,
  ({ one }) => ({
    project: one(projects, {
      fields: [systematicReviewConfig.projectId],
      references: [projects.id],
    }),
  })
);

export const searchAlertsRelations = relations(
  searchAlerts,
  ({ one }) => ({
    project: one(projects, {
      fields: [searchAlerts.projectId],
      references: [projects.id],
    }),
  })
);
```

**Step 2: Commit**

```bash
git add src/lib/db/schema/relations.ts
git commit -m "fix: add Drizzle relations for systematicReviewConfig and searchAlerts"
```

---

### Task 0.3: Resolve uncommitted `editor.ts` schema changes

`src/lib/db/schema/editor.ts` has 33 uncommitted lines adding a `presentationRecordings` table. This is unrelated to systematic review but blocks a clean working state.

**Step 1: Review the diff**

```bash
git diff src/lib/db/schema/editor.ts
```

**Step 2: Stage and commit**

```bash
git add src/lib/db/schema/editor.ts
git commit -m "feat: add presentationRecordings table to editor schema"
```

---

## Phase 1: Wire the Two Placeholder UI Panels

These two components have backend APIs that are fully implemented but the UI never calls them.

### Task 1.1: Wire `RoB2Panel` to the `/api/systematic-review/rob2` API

**Current state:** `RoB2Panel.tsx` (141 lines) accepts `projectId` but prefixes it as `_projectId` (unused). `results` state is `[]` and `_setResults` is never called. No button to trigger assessment. The traffic light table is invisible (conditional on `results.length > 0`).

**Target state:** User selects a paper (or "assess all included papers"), clicks "Run RoB 2 Assessment", sees a loading spinner, then sees a traffic light table with 5 domains per paper, each with judgment + supporting text expandable.

**Files:**
- Modify: `src/components/systematic-review/RoB2Panel.tsx`
- Reference: `src/app/api/systematic-review/rob2/route.ts` (POST for assess, GET for summary)
- Reference: `src/lib/systematic-review/rob2-assessment.ts` (types: `FullRoB2Assessment`, `DomainAssessment`)

**Step 1: Rewrite `RoB2Panel.tsx`**

The component needs:
1. On mount, `GET /api/systematic-review/rob2?projectId=X` to load existing assessments
2. Load included papers from `GET /api/systematic-review/import?projectId=X` (only papers with `include` decision)
3. A paper selector dropdown (or "Assess All" button)
4. `POST /api/systematic-review/rob2` with `{ projectId, paperId }` to run assessment
5. Traffic light table: rows = papers, columns = 5 RoB 2 domains + overall
6. Expandable rows showing supporting text per domain
7. Loading, error, and empty states

**Key API contract (from `rob2/route.ts`):**
- POST body: `{ projectId: number, paperId: number }`
- POST response: `{ assessment: FullRoB2Assessment }` (includes `domains[]` each with `domain`, `judgment`, `supportText`, `signalingQuestions[]`)
- GET params: `?projectId=X`
- GET response: `{ summary: { paperId, paperTitle, domains[], overallJudgment }[] }`

**Step 2: Run dev server and manually test**

Navigate to a systematic review project → Risk of Bias tab → verify the panel loads, shows papers, and can trigger assessment.

**Step 3: Commit**

```bash
git add src/components/systematic-review/RoB2Panel.tsx
git commit -m "feat: wire RoB2Panel to backend API — trigger assessments, display traffic light table"
```

---

### Task 1.2: Wire `DataExtractionPanel` to the `/api/systematic-review/extract` API

**Current state:** `DataExtractionPanel.tsx` (164 lines) has a local-only schema editor (add/remove/edit extraction fields) but never calls the API. `projectId` is unused.

**Target state:** User defines extraction fields, selects papers, clicks "Run Extraction", sees extracted data in a comparison matrix table.

**Files:**
- Modify: `src/components/systematic-review/DataExtractionPanel.tsx`
- Reference: `src/app/api/systematic-review/extract/route.ts` (POST for extract, GET for table)
- Reference: `src/lib/systematic-review/data-extraction.ts` (types: `ExtractionField`, `ExtractionResult`, `PaperExtraction`)

**Step 1: Rewrite `DataExtractionPanel.tsx`**

The component needs:
1. Keep existing schema editor (field name, description, type)
2. Load included papers from `GET /api/systematic-review/import?projectId=X`
3. "Extract" button per paper or "Extract All" button
4. `POST /api/systematic-review/extract` with `{ projectId, paperId, fields[] }` for single or `{ projectId, paperIds[], fields[] }` for batch
5. `GET /api/systematic-review/extract?projectId=X` to load the extraction matrix
6. Render results as a scrollable table: rows = papers, columns = extraction fields, cells = extracted values
7. Editable cells for manual correction (POST to save)
8. Loading, error, and empty states

**Key API contract (from `extract/route.ts`):**
- POST body (single): `{ projectId, paperId, fields: { name, description, fieldType }[] }`
- POST body (batch): `{ projectId, paperIds: number[], fields: { name, description, fieldType }[] }`
- POST response (single): `{ extraction: ExtractionResult }` with `{ fields: { name, value, confidence, sourceQuote }[] }`
- POST response (batch): `{ extractions: ExtractionResult[] }`
- GET params: `?projectId=X`
- GET response: `{ table: { columns[], rows: { paperId, paperTitle, cells[] }[] } }`

**Step 2: Test manually**

**Step 3: Commit**

```bash
git add src/components/systematic-review/DataExtractionPanel.tsx
git commit -m "feat: wire DataExtractionPanel to backend API — extraction trigger, matrix table, editable cells"
```

---

## Phase 2: Error Handling Hardening

The audit found ~15 catch blocks that silently swallow errors. This phase fixes them systematically.

### Task 2.1: Add toast notification system for systematic review errors

**Files:**
- Check: Does the project already have a toast system? (Look for `sonner`, `react-hot-toast`, or a custom toast in `src/components/ui/`)
- If yes: Use the existing toast
- If no: Add `sonner` (lightweight, works well with Next.js App Router)

**Step 1: Identify existing toast infrastructure**

```bash
grep -r "toast\|sonner\|react-hot-toast" src/components/ package.json
```

**Step 2: If no toast exists, install sonner**

```bash
npm install sonner
```

Add `<Toaster />` to the root layout if not already present.

**Step 3: Commit**

```bash
git commit -m "chore: add toast notification infrastructure (if needed)"
```

---

### Task 2.2: Replace silent catch blocks with user-facing error toasts

Apply this to ALL 16 systematic review component files. The pattern:

**Before (current):**
```typescript
} catch {
  // Error handled
}
```

**After:**
```typescript
} catch (err) {
  toast.error("Failed to load papers. Please try again.");
}
```

**Files to modify (all in `src/components/systematic-review/`):**
1. `SearchStrategyPanel.tsx` — line ~55 (generation failure)
2. `PaperImportPanel.tsx` — lines ~74, ~107, ~143 (load/import/upload failures)
3. `ScreeningPanel.tsx` — lines ~92, ~131, ~163, ~179 (queue/decision/batch/priority failures)
4. `PRISMAFlowPanel.tsx` — (generation failure)
5. `SnowballingPanel.tsx` — lines ~116, ~181 (replace `console.error` with toast)
6. `PRISMAChecklistPanel.tsx` — line ~157 (CSV export failure)
7. `ImportExportPanel.tsx` — line ~132 (export failure)
8. `LivingReviewPanel.tsx` — lines ~80, ~124, ~152, ~167 (all 4 `// Silent` catches)
9. `ProtocolPanel.tsx` — line ~168 (export failure)

Also fix in pages:
10. `src/app/(app)/systematic-review/page.tsx` — lines ~63, ~83

**Step 1: Add toast import to each file**

```typescript
import { toast } from "sonner"; // or whatever toast system exists
```

**Step 2: Replace each catch block with appropriate error message**

Use specific messages per operation (not generic "Something went wrong"):
- "Failed to generate search strategy"
- "Failed to import papers from database"
- "Failed to run AI screening"
- "Failed to generate PRISMA flow diagram"
- etc.

**Step 3: Remove `console.error` calls from SnowballingPanel (lines 116, 181)**

Replace with toast.error calls.

**Step 4: Commit**

```bash
git add src/components/systematic-review/ src/app/\(app\)/systematic-review/
git commit -m "fix: replace silent error catches with user-facing toast notifications across systematic review"
```

---

### Task 2.3: Fix `useState` misuse in two components

**Files:**
- Modify: `src/components/systematic-review/PaperImportPanel.tsx` — line ~160
- Modify: `src/components/systematic-review/ProtocolPanel.tsx` — line ~62

**Before (PaperImportPanel):**
```typescript
useState(() => { loadPapers(); });
```

**After:**
```typescript
useEffect(() => { loadPapers(); }, []);
```

**Before (ProtocolPanel):**
```typescript
useState(() => { if (reviewConfig?.protocolRegistration) { setProsperoId(reviewConfig.protocolRegistration); } });
```

**After:**
```typescript
useEffect(() => {
  if (reviewConfig?.protocolRegistration) {
    setProsperoId(reviewConfig.protocolRegistration);
  }
}, [reviewConfig?.protocolRegistration]);
```

**Step 1: Apply fixes**

**Step 2: Commit**

```bash
git add src/components/systematic-review/PaperImportPanel.tsx src/components/systematic-review/ProtocolPanel.tsx
git commit -m "fix: replace useState side-effect misuse with useEffect in PaperImportPanel and ProtocolPanel"
```

---

### Task 2.4: Fix ProtocolPanel export URL length risk

**File:** `src/components/systematic-review/ProtocolPanel.tsx` — lines ~154-155

The current implementation puts the entire protocol JSON in a URL query parameter. For large protocols this will exceed browser URL limits (~2KB-8KB).

**Fix:** Change the export to POST the protocol body and receive the exported content, rather than encoding it in a GET URL.

**Step 1: Modify export handler**

Instead of:
```typescript
const url = `/api/systematic-review/protocol?format=${format}&data=${encodeURIComponent(JSON.stringify(protocol))}`;
window.open(url);
```

Use:
```typescript
const res = await fetch("/api/systematic-review/protocol", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  // Use POST body or a different approach
});
// Create blob and trigger download
```

**Step 2: Commit**

```bash
git add src/components/systematic-review/ProtocolPanel.tsx
git commit -m "fix: use fetch+blob for protocol export instead of URL-encoded query parameter"
```

---

## Phase 3: Remove Dead Code

### Task 3.1: Remove or integrate `PaperReviewLayout.tsx`

**Current state:** `PaperReviewLayout.tsx` (279 lines) is a split-pane layout for paper review (PDF left, form right) with keyboard shortcut hints. It is **imported by no other file** in the project. The ScreeningPanel has its own inline paper list instead.

**Decision:** This component was likely intended for a future full-text screening view. Two options:
- **Option A:** Delete it (it's dead code and can be recreated from git history)
- **Option B:** Integrate it into ScreeningPanel as an optional detail view

**Recommended: Option A** — delete it. The ScreeningPanel already has a functional inline view with keyboard shortcuts. If a split-pane view is needed later, it can be rebuilt with the correct API contract.

**Step 1: Delete**

```bash
rm src/components/systematic-review/PaperReviewLayout.tsx
```

**Step 2: Verify no imports break**

```bash
grep -r "PaperReviewLayout" src/
```

**Step 3: Commit**

```bash
git add -A src/components/systematic-review/PaperReviewLayout.tsx
git commit -m "chore: remove unused PaperReviewLayout component (dead code)"
```

---

### Task 3.2: Clean up minor code issues

**Files:**
- `src/components/systematic-review/ForestPlot.tsx` — lines ~349-363: Remove redundant ternary in axis labels (both branches return the same values)
- `src/components/systematic-review/FunnelPlot.tsx` — line ~65: Remove unused `maxSE` variable
- `src/components/systematic-review/MetaAnalysisPanel.tsx` — line ~10: Remove unused `DownloadSimple` import
- `src/components/systematic-review/PaperImportPanel.tsx` — line ~11: Remove unused `Eye` import

**Step 1: Apply all 4 cleanups**

**Step 2: Commit**

```bash
git add src/components/systematic-review/
git commit -m "chore: remove unused variables, imports, and redundant ternaries in systematic review components"
```

---

## Phase 4: Missing Features (from Competitive Analysis Roadmap)

These are features explicitly called out in `docs/COMPETITIVE-ANALYSIS-AI-SYSTEMATIC-REVIEW-TOOLS.md` Sections 2, 6, and 8 that have no corresponding implementation.

### Task 4.1: Add GRADE Certainty of Evidence Assessment

**Source:** Competitive Analysis §2 Phase 5 ("Certainty of Evidence — Assess overall certainty using frameworks like GRADE"), §6 (gap analysis — no competitor does AI-assisted GRADE).

**What GRADE is:** The Grading of Recommendations, Assessment, Development, and Evaluation framework rates certainty of evidence across 5 domains: risk of bias, inconsistency, indirectness, imprecision, and publication bias. Output is a rating per outcome: High / Moderate / Low / Very Low.

**Files:**
- Create: `src/lib/systematic-review/grade-assessment.ts`
- Create: `src/app/api/systematic-review/grade/route.ts`
- Create: `src/components/systematic-review/GRADEPanel.tsx`
- Modify: `src/lib/systematic-review/index.ts` (add re-exports)
- Modify: `src/app/(app)/systematic-review/[projectId]/page.tsx` (add GRADE tab)
- Modify: `src/stores/systematic-review-store.ts` (add "grade" to `WorkflowTab` type)

**Library module (`grade-assessment.ts`):**
- `assessGRADE(projectId, outcome)` — AI-powered assessment across 5 domains using project's meta-analysis results + RoB 2 summary + study data
- `getGRADESummary(projectId)` — returns all outcomes with their certainty ratings
- `exportGRADETable(projectId)` — generates a Summary of Findings (SoF) table in HTML/CSV
- Types: `GRADEDomain`, `GRADEAssessment`, `CertaintyRating`, `SoFTable`

**API route (`grade/route.ts`):**
- POST: Run GRADE assessment for a specific outcome
- GET: Retrieve all GRADE assessments for a project

**UI component (`GRADEPanel.tsx`):**
- Outcome selector (from meta-analysis results)
- "Assess Certainty" button
- Summary of Findings table with downgrade/upgrade annotations
- Expandable rationale per domain
- Export as CSV

**Implementation approach:**
- Use `generateObject` with a GRADE-specific prompt that references the project's existing meta-analysis results (`getMetaAnalysisResults`) and RoB 2 summary (`getProjectRoB2Summary`)
- Store results in a new `grade_assessments` table (add to schema + generate migration)
- Or store in `metaAnalysisResults.studyData` JSONB if we want to avoid a new table

**Step 1: Write the library module**
**Step 2: Write the API route**
**Step 3: Write the UI panel**
**Step 4: Add the tab to the workflow page**
**Step 5: Test manually**
**Step 6: Commit**

```bash
git add src/lib/systematic-review/grade-assessment.ts src/app/api/systematic-review/grade/ src/components/systematic-review/GRADEPanel.tsx src/app/\(app\)/systematic-review/\[projectId\]/page.tsx src/stores/systematic-review-store.ts src/lib/systematic-review/index.ts
git commit -m "feat: add GRADE certainty of evidence assessment — AI-powered rating across 5 domains with SoF table"
```

---

### Task 4.2: Add Subgroup and Sensitivity Analysis to Meta-Analysis

**Source:** Competitive Analysis §2 Phase 6 ("Subgroup and sensitivity analyses"), §6.3 ("No tool offers AI-assisted meta-analysis computation").

**Files:**
- Modify: `src/lib/systematic-review/meta-analysis.ts` (add `runSubgroupAnalysis`, `runSensitivityAnalysis`)
- Modify: `src/app/api/systematic-review/meta-analysis/route.ts` (add subgroup/sensitivity endpoints)
- Modify: `src/components/systematic-review/MetaAnalysisPanel.tsx` (add subgroup/sensitivity tabs)
- Modify: `src/lib/systematic-review/index.ts` (re-export new functions)

**Subgroup analysis (`runSubgroupAnalysis`):**
- Takes: study data + grouping variable (e.g., "age_group", "study_design")
- Groups studies by the variable
- Runs meta-analysis per subgroup
- Computes test for subgroup differences (chi-squared)
- Returns: per-subgroup pooled effects + between-subgroup heterogeneity

**Sensitivity analysis (`runSensitivityAnalysis`):**
- Leave-one-out: Re-runs meta-analysis N times, each time excluding one study
- Returns: array of { excludedStudy, pooledEffect, CI, I² } to show how each study influences the result
- Influence plot: bar chart of change in pooled effect when each study is removed

**UI additions to MetaAnalysisPanel:**
- New sub-tabs within MetaAnalysisPanel: "Main Analysis" | "Subgroup" | "Sensitivity"
- Subgroup tab: dropdown to select grouping variable, renders forest plot per subgroup
- Sensitivity tab: leave-one-out table + influence plot

**Step 1-6: Implement, test, commit**

```bash
git commit -m "feat: add subgroup and leave-one-out sensitivity analysis to meta-analysis engine"
```

---

### Task 4.3: Add Manuscript Draft Generation

**Source:** Competitive Analysis §2 Phase 7 ("Manuscript draft generation"), §7 item 14 ("AI-generated synthesis narratives — first drafts of results sections with citations").

**Files:**
- Create: `src/lib/systematic-review/manuscript-generator.ts`
- Create: `src/app/api/systematic-review/manuscript/route.ts`
- Create: `src/components/systematic-review/ManuscriptPanel.tsx`
- Modify: `src/app/(app)/systematic-review/[projectId]/page.tsx` (add Manuscript tab)
- Modify: `src/stores/systematic-review-store.ts` (add "manuscript" to `WorkflowTab`)

**Library module (`manuscript-generator.ts`):**
- `generateManuscriptSection(projectId, section, options)` — generates one IMRAD section at a time
- Sections: "introduction", "methods", "results", "discussion", "abstract"
- For each section, gathers relevant project data:
  - Introduction: protocol PICO + search strategy rationale
  - Methods: protocol, search dates, databases, screening criteria, RoB 2 tool used, statistical methods
  - Results: PRISMA flow counts, screening summary, RoB 2 summary, meta-analysis results, GRADE ratings
  - Discussion: synthesis of findings, limitations, implications
  - Abstract: structured abstract following PRISMA 2020 abstract checklist
- Returns: Markdown text with inline citations `[Author, Year]` mapped to included papers
- `exportManuscriptDraft(projectId)` — combines all sections into a single document

**UI component (`ManuscriptPanel.tsx`):**
- Section-by-section generation with preview
- Editable output (textarea or inline Tiptap)
- "Generate All Sections" button
- Copy to clipboard / Export as DOCX
- Option to "Open in Studio" (navigate to the main editor with the draft pre-loaded)

**Step 1-6: Implement, test, commit**

```bash
git commit -m "feat: add AI manuscript draft generation — IMRAD sections with citations from review data"
```

---

### Task 4.4: Add Blinded Review Mode to Screening

**Source:** Competitive Analysis §4 Feature Matrix (Rayyan, Covidence, Silvi all have blinded review), §8.4 UX Patterns ("Blinded review + unblind — maintains rigor; prevents anchoring bias").

**Files:**
- Modify: `src/lib/systematic-review/dual-screening.ts` (add blinding logic)
- Modify: `src/app/api/systematic-review/screening-queue/route.ts` (add blind mode query param)
- Modify: `src/components/systematic-review/ScreeningPanel.tsx` (add blind mode toggle)
- Modify: `src/stores/systematic-review-store.ts` (add `blindedMode` flag)

**What blinded review means:**
- When enabled, Reviewer B cannot see Reviewer A's (or AI's) decision while screening
- The screening queue hides existing decisions from other reviewers
- After both reviewers complete, an "Unblind" button reveals all decisions and highlights conflicts
- This prevents anchoring bias (seeing the AI said "include" makes the human more likely to agree)

**Implementation:**
- Add `blindedMode: boolean` to `systematicReviewConfig.settings` JSONB
- In `getScreeningQueue`, when `blinded=true`, don't return existing `aiDecision` or `otherReviewerDecision` fields
- In `ScreeningPanel`, add a toggle switch "Blinded Mode" that hides the AI decision column
- Add an "Unblind & Resolve Conflicts" button that fetches the full unblinded queue

**Step 1-4: Implement, test, commit**

```bash
git commit -m "feat: add blinded review mode to screening — hide AI/other reviewer decisions until unblinding"
```

---

## Phase 5: Tests

### Task 5.1: Unit tests for `meta-analysis.ts` (pure math, no DB/AI)

This is the highest-value test target because it's pure TypeScript math with no external dependencies. Incorrect statistics = retracted papers.

**Files:**
- Create: `src/lib/systematic-review/__tests__/meta-analysis.test.ts`

**Test cases:**
1. `computeEffectSize` — verify log-OR, log-RR, SMD calculations against known values
2. `computeFixedEffectsMeta` — verify inverse-variance weighting against Cochrane handbook examples
3. `computeRandomEffectsMeta` — verify DerSimonian-Laird tau² calculation
4. `eggerTest` — verify with known asymmetric dataset
5. `trimAndFill` — verify imputed studies count
6. Edge cases: single study, all identical effects, zero-event studies

**Step 1: Write tests with known reference values**

Use published meta-analysis examples from the Cochrane Handbook or Borenstein et al. "Introduction to Meta-Analysis" as test oracles.

```bash
npx vitest run src/lib/systematic-review/__tests__/meta-analysis.test.ts
```

**Step 2: Commit**

```bash
git commit -m "test: add unit tests for meta-analysis engine — effect sizes, pooling, heterogeneity, publication bias"
```

---

### Task 5.2: Unit tests for `prisma-checklist.ts` (pure logic, no DB)

**Files:**
- Create: `src/lib/systematic-review/__tests__/prisma-checklist.test.ts`

**Test cases:**
1. `PRISMA_2020_ITEMS` — verify all 27 items present with correct item numbers
2. `verifyPRISMACompliance` — mock the AI response, verify all 27 items appear in output
3. `exportChecklistCSV` — verify CSV format, header row, all 27 data rows

---

### Task 5.3: Unit tests for `reference-formats.ts` (pure parsing, no DB/AI)

**Files:**
- Create: `src/lib/systematic-review/__tests__/reference-formats.test.ts`

**Test cases:**
1. `parseRIS` — parse a known RIS string, verify parsed fields
2. `parseBibTeX` — parse a known BibTeX entry
3. `generateRIS` — round-trip: parse → generate → parse → verify identical
4. `generateBibTeX` — same round-trip
5. `generateEndNoteXML` — verify XML structure
6. `generateCSV` — verify header + data rows
7. Edge cases: missing fields, Unicode authors, DOIs with special characters

---

### Task 5.4: Unit tests for `screening-engine.ts` (mock AI, verify consensus logic)

**Files:**
- Create: `src/lib/systematic-review/__tests__/screening-engine.test.ts`

**Test cases:**
1. Unanimous include → include
2. Unanimous exclude → exclude
3. 2 include + 1 exclude → include (majority)
4. 2 exclude + 1 include → exclude (majority)
5. 1 include + 1 exclude + 1 maybe → manual_review (conflict)
6. Batch processing — verify parallel execution

Mock `generateObject` to return predetermined agent decisions.

---

### Task 5.5: Unit tests for `search-strategy.ts` (verify formatting)

**Files:**
- Create: `src/lib/systematic-review/__tests__/search-strategy.test.ts`

**Test cases:**
1. `formatForCochrane` — verify `.mp.` suffix, no field tags
2. `formatForEmbase` — verify `/exp` explosion terms, Emtree format
3. Edge cases: empty PICO fields, special characters in terms

---

## Phase 6: Future Features (Lower Priority)

These are from the competitive analysis "Emerging Demands" section and V2 Strategy Plan. They should be deferred until Phases 0-5 are complete.

### Task 6.1: PROSPERO-Format Protocol Export
- The protocol builder exists but doesn't export in PROSPERO's specific registration format
- Add a structured export matching PROSPERO's field requirements

### Task 6.2: Grey Literature & Preprint Search
- Add medRxiv, bioRxiv, and WHO ICTRP as search sources in `paper-import.ts`
- Competitive Analysis §6.9

### Task 6.3: Multilingual Screening
- Add language detection to screening engine
- Support non-English abstracts with translation
- Competitive Analysis §6.8

### Task 6.4: RevMan/Stata Export
- Export meta-analysis data in RevMan 5 XML format
- Export in Stata `.dta` format
- Competitive Analysis §2 Phase 7

### Task 6.5: Integrate with V2 Multi-Agent Architecture
- When the V2 GVR (Generator-Verifier-Reviser) architecture is built (per `SCHOLARSYNC_V2_PLAN.md`), the systematic review's screening engine and data extraction should be refactored to use the Analysis Team's claim verification loop

---

## Execution Summary

| Phase | Tasks | Estimated Complexity | Can Parallelize? |
|-------|-------|---------------------|-----------------|
| **Phase 0: Blockers** | 0.1, 0.2, 0.3 | Low | Yes — all 3 independent |
| **Phase 1: Wire UIs** | 1.1, 1.2 | Medium | Yes — independent panels |
| **Phase 2: Error Handling** | 2.1, 2.2, 2.3, 2.4 | Low | 2.1 first, then 2.2-2.4 in parallel |
| **Phase 3: Dead Code** | 3.1, 3.2 | Low | Yes |
| **Phase 4: New Features** | 4.1, 4.2, 4.3, 4.4 | High | 4.1+4.2 parallel, 4.3+4.4 parallel |
| **Phase 5: Tests** | 5.1-5.5 | Medium | Yes — all independent |
| **Phase 6: Future** | 6.1-6.5 | High | Deferred |

**Total: 21 tasks across 6 phases (Phase 6 deferred).**

**Recommended execution order:**
1. Phase 0 (all 3 in parallel) — unblock everything
2. Phase 1 + Phase 3 (in parallel) — wire UIs + clean dead code
3. Phase 2 — harden error handling
4. Phase 4 (4.1+4.2 parallel, then 4.3+4.4 parallel) — new features
5. Phase 5 (all 5 in parallel) — tests
