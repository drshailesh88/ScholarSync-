# Systematic Review — Competitive Leap Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close every critical competitive gap and build features no competitor offers — making ScholarSync's systematic review engine unmatchable in the market.

**Architecture:** The systematic review engine follows a 3-layer architecture: Zustand store (client) → API routes (auth + Zod validation + ownership check) → library modules (business logic + DB + AI). All new features follow this same pattern. Real-time collaboration uses Liveblocks (already integrated for presentations). PDF processing uses existing `react-pdf` + `pdf-parse` stack. Meta-analysis extensions build on the pure-TypeScript engine in `meta-analysis.ts`.

**Tech Stack:** Next.js 15 App Router, Drizzle ORM (PostgreSQL), Vercel AI SDK (`generateObject`/`generateText`), Zustand, Liveblocks (real-time), react-pdf/pdf-parse (PDFs), `docx` library (DOCX export), Vitest (testing).

**Source of truth:** Gap analysis from competitive research (Feb 2026) against 15+ competitors including Covidence, Rayyan, Elicit, otto-SR, ASReview, DistillerSR, Nested Knowledge, Silvi AI, Laser AI.

---

## Phase 1: Multi-Reviewer Collaboration (CRITICAL — blocks adoption)

**Why:** Cochrane requires independent dual screening by human reviewers. Covidence, Rayyan, DistillerSR all support multi-user teams. Without this, no institution will adopt us. This is the #1 blocker.

**Existing infrastructure we can leverage:**
- Liveblocks already integrated (`src/lib/liveblocks/config.ts`) with presence, cursors, broadcasting
- `institution_memberships` table exists with roles (student/supervisor/admin/faculty)
- `supervisor_assignments` table exists (supervisor ↔ student ↔ project)
- `document_shares` table exists with permission levels (view/comment/edit)
- `screening_decisions.decidedBy` enum already has `"user" | "ai" | "collaborator"`
- `getCurrentUserId()` returns Clerk user ID

### Task 1.1: Add `project_collaborators` table and API

**Files:**
- Modify: `src/lib/db/schema/systematic.ts`
- Modify: `src/lib/db/schema/relations.ts`
- Create: `src/app/api/systematic-review/collaborators/route.ts`
- Create: `src/lib/systematic-review/collaboration.ts`

**Schema addition:**
```sql
CREATE TABLE project_collaborators (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'reviewer',  -- 'owner' | 'reviewer' | 'extractor' | 'statistician' | 'viewer'
  invited_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  UNIQUE(project_id, user_id)
);
```

**Library module (`collaboration.ts`):**
- `inviteCollaborator(projectId, email, role)` — lookup user by email, insert row
- `getProjectCollaborators(projectId)` — list all collaborators with roles
- `removeCollaborator(projectId, userId)` — delete row
- `updateCollaboratorRole(projectId, userId, newRole)` — change role
- `canAccessProject(projectId, userId)` — returns boolean (owner OR collaborator)
- `getProjectRole(projectId, userId)` — returns role string or null

**API route:** Standard auth + Zod validation pattern. GET (list), POST (invite), PUT (update role), DELETE (remove).

**Important:** Update ALL existing API routes that check project ownership (`eq(projects.user_id, userId)`) to also check `project_collaborators`. Create a shared helper `verifyProjectAccess(projectId, userId)` that checks both owner and collaborator status.

```bash
git commit -m "feat: add project collaborators — invite, roles, shared access"
```

---

### Task 1.2: Multi-reviewer screening with independent decisions

**Files:**
- Modify: `src/lib/db/schema/systematic.ts` — alter `screening_decisions` unique constraint
- Modify: `src/lib/systematic-review/dual-screening.ts`
- Modify: `src/app/api/systematic-review/screening-queue/route.ts`
- Modify: `src/components/systematic-review/ScreeningPanel.tsx`

**Current limitation:** `screening_decisions` has UNIQUE on `(projectId, paperId, stage)` — only ONE decision per paper per stage. Must change to UNIQUE on `(projectId, paperId, stage, decidedBy)` or add a `reviewer_id` column.

**Schema change:**
```sql
ALTER TABLE screening_decisions ADD COLUMN reviewer_id TEXT REFERENCES users(id);
-- Drop old unique constraint, add new one:
UNIQUE(project_id, paper_id, stage, reviewer_id)
```

**Dual-screening logic changes:**
- `recordHumanDecision` now accepts `reviewerId` (from `getCurrentUserId()`)
- Each reviewer's decision stored independently
- `getScreeningQueue` filters to show only papers the current user hasn't screened
- New function: `getReviewerProgress(projectId, reviewerId)` — how many this reviewer has screened
- New function: `detectConflicts(projectId, stage)` — find papers where reviewer1 ≠ reviewer2
- New function: `resolveConflict(projectId, paperId, stage, resolution, resolvedBy)` — third-reviewer override

**ScreeningPanel changes:**
- Show "Your Progress: X/Y screened" per reviewer
- Conflict resolution panel: list disagreements, show both decisions, allow third-reviewer decision
- Blinded mode hides other reviewer's decisions (already partially implemented)

```bash
git commit -m "feat: multi-reviewer independent screening with conflict resolution"
```

---

### Task 1.3: Real-time presence and activity feed

**Files:**
- Create: `src/hooks/use-collaborative-review.ts`
- Modify: `src/app/(app)/systematic-review/[projectId]/page.tsx`
- Create: `src/components/systematic-review/CollaboratorPresence.tsx`
- Create: `src/components/systematic-review/ActivityFeed.tsx`

**Liveblocks integration:**
- Create a `RoomProvider` wrapper for SR projects (room ID: `sr-project-{projectId}`)
- Presence type: `{ userId, name, avatar, color, activeTab, currentPaperId }`
- Show colored avatars of who's online in the project header
- Show which tab each collaborator is on
- Broadcast events: `decision-made`, `extraction-complete`, `rob2-assessed`
- Activity feed sidebar: real-time log of "Alice screened Paper #42 as Include", "Bob completed RoB 2 for Paper #17"

```bash
git commit -m "feat: real-time collaborator presence and activity feed via Liveblocks"
```

---

### Task 1.4: Audit trail

**Files:**
- Create: `src/lib/systematic-review/audit-trail.ts`
- Modify: `src/lib/db/schema/systematic.ts` — add `sr_audit_log` table

**Schema:**
```sql
CREATE TABLE sr_audit_log (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,          -- 'screen', 'extract', 'rob2_assess', 'resolve_conflict', 'import', 'export', 'config_change'
  entity_type TEXT NOT NULL,     -- 'paper', 'decision', 'extraction', 'config'
  entity_id INTEGER,
  details JSONB,                 -- action-specific metadata
  ai_involved BOOLEAN DEFAULT FALSE,  -- RAISE compliance: was AI used?
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_audit_log_project ON sr_audit_log(project_id);
```

**Functions:**
- `logAuditEvent(projectId, userId, action, entityType, entityId, details, aiInvolved)`
- `getAuditLog(projectId, options: { limit, offset, action?, userId? })`
- `exportAuditLog(projectId)` — CSV export for RAISE compliance

**Integration:** Add `logAuditEvent` calls to all existing functions that mutate data: `recordHumanDecision`, `assessRiskOfBias`, `runMetaAnalysis`, paper import, etc.

```bash
git commit -m "feat: audit trail for all SR actions — RAISE compliance"
```

---

## Phase 2: Full-Text PDF Processing (CRITICAL — blocks full-text screening)

**Why:** Full-text screening is Phase 2 of every SR. Elicit extracts data from PDFs at 94-99% accuracy. Covidence has in-app PDF viewing. Without PDF processing, reviewers must leave the app.

**Existing infrastructure:**
- `react-pdf` v10.3.0 already installed with full PDF viewer component
- `PDFHighlightLayer.tsx` exists for highlighting
- `pdf-parse` v2 for text extraction
- `papers.pdf_storage_path` stores GCS paths
- `extractPdfText()` already chunks PDFs and stores in `paper_chunks`

### Task 2.1: In-app PDF viewer for screening

**Files:**
- Create: `src/components/systematic-review/ScreeningPDFViewer.tsx`
- Modify: `src/components/systematic-review/ScreeningPanel.tsx`

**Component:**
- Split-pane layout: PDF viewer on left (70%), screening controls on right (30%)
- Reuse existing `PDFViewer` component from `src/components/ui/pdf-viewer.tsx`
- Add AI-highlighted passages: when paper has `paper_chunks`, highlight the chunks that match inclusion/exclusion criteria
- "Jump to relevant section" buttons based on AI screening reasons
- Full-text exclusion reason capture (dropdown + free text)
- Stage toggle: title/abstract view ↔ full-text view

```bash
git commit -m "feat: in-app PDF viewer for full-text screening with AI highlights"
```

---

### Task 2.2: Automatic PDF retrieval

**Files:**
- Create: `src/lib/systematic-review/pdf-retrieval.ts`
- Modify: `src/app/api/systematic-review/import/route.ts`

**Logic:**
- After paper import, attempt auto-retrieval:
  1. Check `papers.pdf_url` — if populated, fetch directly
  2. Try Unpaywall API (`https://api.unpaywall.org/v2/{doi}?email=...`) for open-access PDFs
  3. Try Semantic Scholar API (`GET /paper/{s2Id}?fields=openAccessPdf`)
  4. Try PubMed Central (`https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi?id={pmcid}`)
- Store retrieved PDF in GCS, update `papers.pdf_storage_path` and `papers.pdf_url`
- Auto-extract text via `extractPdfText()` after retrieval
- Track retrieval status per paper: `not_attempted | retrieved | not_available`

```bash
git commit -m "feat: auto-retrieve open-access PDFs from Unpaywall, S2, PMC"
```

---

### Task 2.3: AI data extraction from PDFs with source linking

**Files:**
- Modify: `src/lib/systematic-review/data-extraction.ts`
- Modify: `src/components/systematic-review/DataExtractionPanel.tsx`

**Enhancement:**
- When extracting, use `paper_chunks` (already stored) to provide full-text context to AI
- AI returns: `{ value, confidence, sourceChunkId, sourceQuote }` per field
- UI: side-by-side view — extracted value on left, source passage highlighted on right
- Click any extracted value to jump to the source passage in the PDF viewer
- Human can verify/edit with the source visible

```bash
git commit -m "feat: AI extraction from full-text with source passage linking"
```

---

## Phase 3: Multi-Tool Risk of Bias (covers non-RCT studies)

**Why:** ~60% of SRs include non-RCT studies. Covidence supports RoB 2, ROBINS-I, Newcastle-Ottawa, QUADAS-2. We only have RoB 2. Without ROBINS-I, we can't support the majority of reviews.

### Task 3.1: ROBINS-I tool for non-randomized studies

**Files:**
- Create: `src/lib/systematic-review/robins-i-assessment.ts`
- Modify: `src/app/api/systematic-review/rob2/route.ts` — rename to `/rob/route.ts` or add `tool` param
- Create: `src/components/systematic-review/ROBINSIPanel.tsx`
- Modify: `src/app/(app)/systematic-review/[projectId]/page.tsx`

**ROBINS-I has 7 domains:**
1. Bias due to confounding
2. Bias in selection of participants
3. Bias in classification of interventions
4. Bias due to deviations from intended interventions
5. Bias due to missing data
6. Bias in measurement of outcomes
7. Bias in selection of the reported result

**Judgments:** Low risk / Moderate risk / Serious risk / Critical risk / No information

**Implementation mirrors RoB 2 pattern:**
- `assessROBINSI(paperId, projectId, title, textContent)` — AI fills all 7 domains
- Store in `risk_of_bias` table (same table, domain names distinguish tool)
- Traffic-light visualization (green/yellow/orange/red/grey)
- Auto-detect study design from paper metadata to suggest correct tool

```bash
git commit -m "feat: ROBINS-I risk of bias tool for non-randomized studies"
```

---

### Task 3.2: QUADAS-2 for diagnostic accuracy studies

**Files:**
- Create: `src/lib/systematic-review/quadas2-assessment.ts`
- Create: `src/components/systematic-review/QUADAS2Panel.tsx`

**QUADAS-2 has 4 domains (each with risk of bias + applicability concern):**
1. Patient selection
2. Index test
3. Reference standard
4. Flow and timing

**Same storage pattern as RoB 2/ROBINS-I.** AI pre-fills signaling questions.

```bash
git commit -m "feat: QUADAS-2 assessment for diagnostic accuracy studies"
```

---

### Task 3.3: Unified RoB dashboard with auto-tool detection

**Files:**
- Create: `src/components/systematic-review/UnifiedRoBPanel.tsx`
- Modify: `src/app/(app)/systematic-review/[projectId]/page.tsx` — replace `rob2` tab with unified `rob` tab

**Features:**
- Auto-detect study design from `papers.study_type` field
- Suggest appropriate tool: RCT → RoB 2, Observational → ROBINS-I, Diagnostic → QUADAS-2
- User can override tool selection
- Summary visualization: grouped traffic-light table showing all papers, all tools
- `robvis`-style summary bar charts (proportion of low/some concerns/high per domain)

```bash
git commit -m "feat: unified RoB dashboard with auto-tool detection and summary plots"
```

---

## Phase 4: Statistical Modernization (match Cochrane 2025 standards)

**Why:** Cochrane RevMan (January 2025) now defaults to REML + HKSJ + prediction intervals. Our DerSimonian-Laird is considered methodologically outdated. Papers using DL face reviewer criticism.

### Task 4.1: REML estimator for tau²

**Files:**
- Modify: `src/lib/systematic-review/meta-analysis.ts`
- Modify: `src/lib/systematic-review/__tests__/meta-analysis.test.ts`

**Algorithm:** REML (Restricted Maximum Likelihood) uses iterative Fisher scoring:
```
tau²_new = tau²_old + [P'WPW - trace(P'W)] / [P'WPWP'W]
where P = I - X(X'WX)^{-1}X'W, W = diag(1/(vi + tau²))
```
Convergence when |tau²_new - tau²_old| < 1e-5.

**Add to meta-analysis.ts:**
- `computeREML(studies: StudyEffect[]): { tau2: number; converged: boolean; iterations: number }`
- Modify `computeRandomEffectsMeta` to accept `method: "DL" | "REML"` parameter (default "REML")
- Backward-compatible: existing callers still work

**Tests:** Compare REML output against known R `metafor` results for benchmark datasets.

```bash
git commit -m "feat: REML tau² estimator for random-effects meta-analysis"
```

---

### Task 4.2: Knapp-Hartung/HKSJ confidence intervals

**Files:**
- Modify: `src/lib/systematic-review/meta-analysis.ts`
- Modify: `src/lib/systematic-review/__tests__/meta-analysis.test.ts`

**Formula:**
```
q_HKSJ = (1 / (k-1)) * Σ w_i * (y_i - θ_hat)²
SE_HKSJ = sqrt(q_HKSJ) * SE_DL
CI: θ_hat ± t_{k-1, α/2} * SE_HKSJ
```
Uses t-distribution with k-1 df instead of normal distribution.

**Add:** `computeHKSJ(studies, pooledEffect, tau2)` → adjusted SE and CI using t-distribution.
**Modify:** `computeRandomEffectsMeta` to accept `ci: "wald" | "hksj"` parameter.

```bash
git commit -m "feat: Knapp-Hartung confidence intervals for random-effects meta-analysis"
```

---

### Task 4.3: Prediction intervals

**Files:**
- Modify: `src/lib/systematic-review/meta-analysis.ts`
- Modify: `src/components/systematic-review/ForestPlot.tsx`
- Modify: `src/lib/systematic-review/__tests__/meta-analysis.test.ts`

**Formula:**
```
PI: θ_hat ± t_{k-2, α/2} * sqrt(SE² + tau²)
```

**Add:**
- `computePredictionInterval(pooledEffect, se, tau2, k)` → `{ lower, upper }`
- Return prediction interval alongside confidence interval in meta-analysis output
- ForestPlot: render prediction interval as a wider, dashed diamond below the pooled diamond

```bash
git commit -m "feat: prediction intervals for random-effects meta-analysis"
```

---

## Phase 5: Network Meta-Analysis (MASSIVE differentiator — no web tool has this)

**Why:** NMA compares multiple interventions simultaneously. Only R packages (`netmeta`, `gemtc`) and MetaInsight support this. No major SR platform integrates NMA natively. Building this gives us an unassailable competitive moat.

### Task 5.1: NMA core engine — graph-theoretical approach

**Files:**
- Create: `src/lib/systematic-review/network-meta-analysis.ts`
- Create: `src/lib/systematic-review/__tests__/network-meta-analysis.test.ts`

**Data structures:**
```typescript
interface NMAStudy {
  studyId: string;
  treatment1: string;
  treatment2: string;
  effect: number;      // log-scale
  se: number;
  n1?: number;
  n2?: number;
}

interface NMAResult {
  treatments: string[];
  leagueTable: number[][];       // k x k matrix of relative effects
  leagueTableCI: { lower: number; upper: number }[][];
  pScores: { treatment: string; score: number }[];
  inconsistency: { comparison: string; direct: number; indirect: number; diff: number; pValue: number }[];
  networkGeometry: { nodes: { id: string; size: number }[]; edges: { source: string; target: string; weight: number }[] };
}
```

**Core algorithm (Rücker 2012 graph-theoretical approach):**
1. Build adjacency matrix A from studies (edge weights = inverse variance)
2. Compute Laplacian L = D - A (D = diagonal degree matrix)
3. Compute Moore-Penrose pseudoinverse L⁺
4. NMA estimates: θ_ij = L⁺_ii - L⁺_ij - L⁺_ji + L⁺_jj
5. Variance of θ_ij = L⁺_ii + L⁺_jj - 2*L⁺_ij

**Functions:**
- `buildNetworkGraph(studies: NMAStudy[])` — adjacency, Laplacian
- `computeNMA(studies: NMAStudy[], model: "fixed" | "random")` → NMAResult
- `computeLeagueTable(treatments, L_plus)` — all pairwise comparisons
- `computePScores(treatments, leagueTable, leagueTableSE)` — P-scores for ranking
- `testInconsistency(studies, nmaResult)` — node-splitting for each closed loop

```bash
git commit -m "feat: network meta-analysis engine — Laplacian graph-theoretical approach"
```

---

### Task 5.2: NMA visualizations

**Files:**
- Create: `src/components/systematic-review/NetworkPlot.tsx`
- Create: `src/components/systematic-review/LeagueTable.tsx`
- Create: `src/components/systematic-review/NMAForestPlot.tsx`

**NetworkPlot:** SVG force-directed graph. Nodes = treatments (size ∝ total sample). Edges = direct comparisons (thickness ∝ number of studies). Colors for treatment categories.

**LeagueTable:** k×k matrix. Upper triangle: effect estimates. Lower triangle: 95% CI. Diagonal: treatment names. Color-coded by statistical significance.

**NMAForestPlot:** All comparisons against a reference treatment. Forest plot with diamonds and CIs.

```bash
git commit -m "feat: NMA visualizations — network plot, league table, forest plot"
```

---

### Task 5.3: NMA panel and API

**Files:**
- Create: `src/app/api/systematic-review/nma/route.ts`
- Create: `src/components/systematic-review/NMAPanel.tsx`
- Modify: `src/stores/systematic-review-store.ts` — add "nma" to WorkflowTab
- Modify: `src/app/(app)/systematic-review/[projectId]/page.tsx` — add NMA tab
- Modify: `src/lib/systematic-review/index.ts` — re-export NMA functions

**NMAPanel features:**
- Study input table: study ID, treatment 1, treatment 2, effect, SE
- Import from existing pairwise meta-analysis data
- Reference treatment selector
- Model selection: fixed/random
- Results tabs: League Table | Network Plot | Forest Plot | Inconsistency | Rankings
- P-score ranking table with bar chart
- Export league table as CSV

```bash
git commit -m "feat: NMA panel with full UI — league table, network plot, rankings"
```

---

## Phase 6: Export & Interoperability

**Why:** Cochrane authors MUST use RevMan. GRADEpro is the standard for GRADE. DOCX is required for journal submission. Without these exports, we can't reach the largest SR communities.

### Task 6.1: DOCX manuscript export

**Files:**
- Create: `src/app/api/systematic-review/manuscript-export/route.ts`
- Modify: `src/components/systematic-review/ManuscriptPanel.tsx`

**Uses existing `docx` library (v9.5.2).** Follow pattern from `src/app/api/export/docx/route.ts`.

- Convert manuscript markdown sections to DOCX paragraphs
- Include: title page, abstract, IMRAD sections, references, PRISMA checklist appendix
- Proper heading hierarchy (H1-H4)
- Table support for Summary of Findings
- Journal-agnostic formatting (Times New Roman 12pt, double-spaced)

```bash
git commit -m "feat: DOCX export for manuscript drafts"
```

---

### Task 6.2: RevMan data export

**Files:**
- Create: `src/lib/systematic-review/revman-export.ts`
- Modify: `src/components/systematic-review/ImportExportPanel.tsx`

**RevMan CSV data package format:**
- Study characteristics CSV (author, year, design, population, intervention, comparator, outcome)
- Risk of bias CSV (study, domain, judgment, support)
- Outcome data CSV (study, events_treatment, total_treatment, events_control, total_control)
- Characteristics of excluded studies CSV

```bash
git commit -m "feat: RevMan CSV data package export for Cochrane reviews"
```

---

### Task 6.3: PROSPERO submission helper

**Files:**
- Modify: `src/lib/systematic-review/protocol-builder.ts`
- Create: `src/components/systematic-review/PROSPEROExport.tsx`

**PROSPERO requires 22 mandatory fields.** Map from our `systematic_review_config`:
- Title, review question, PICO elements, search strategy, databases, eligibility criteria, study designs, data extraction approach, quality assessment tool, synthesis methods, dissemination plans, timeline, funding, conflicts of interest

**Generate a pre-filled PROSPERO form (downloadable as structured text/HTML) that users can paste into PROSPERO's web form.**

```bash
git commit -m "feat: PROSPERO registration helper — auto-populate 22 mandatory fields"
```

---

## Phase 7: Search Strategy Enhancement

**Why:** Cochrane requires MEDLINE + Embase + CENTRAL at minimum. We only search PubMed, S2, OpenAlex. Missing Embase alone can miss 10-15% of relevant studies. PRESS checklist for search quality validation is entirely manual.

### Task 7.1: Additional database connectors

**Files:**
- Modify: `src/lib/systematic-review/paper-import.ts`
- Create: `src/lib/systematic-review/search-connectors/cochrane-central.ts`
- Create: `src/lib/systematic-review/search-connectors/clinicaltrials-gov.ts`

**Add:**
- Cochrane CENTRAL via Cochrane Library API (free for search, returns trial metadata)
- ClinicalTrials.gov via their v2 API (`https://clinicaltrials.gov/api/v2/studies`)
- Track per-source result counts for PRISMA-S compliance

```bash
git commit -m "feat: add Cochrane CENTRAL and ClinicalTrials.gov search connectors"
```

---

### Task 7.2: PRESS checklist validation

**Files:**
- Create: `src/lib/systematic-review/press-validation.ts`
- Create: `src/components/systematic-review/PRESSChecklistPanel.tsx`

**PRESS (Peer Review of Electronic Search Strategies) 2015 — 6 elements:**
1. Translation of research question (PICO elements present?)
2. Boolean operators and proximity operators (correct AND/OR/NOT usage?)
3. Subject headings (appropriate MeSH/Emtree terms?)
4. Text word searching (synonyms, truncation, spelling variants?)
5. Spelling, syntax, line numbers (syntax errors, typos?)
6. Limits and filters (appropriate date, language, study design filters?)

**AI-powered validation:** Feed the search strategy to the AI with PRESS criteria, return per-element assessment with specific suggestions.

```bash
git commit -m "feat: PRESS checklist — AI-powered search strategy peer review"
```

---

## Phase 8: Advanced Reporting

### Task 8.1: AMSTAR 2 self-assessment

**Files:**
- Create: `src/lib/systematic-review/amstar2-checklist.ts`
- Create: `src/components/systematic-review/AMSTAR2Panel.tsx`

**AMSTAR 2 has 16 items (7 critical).** AI checks the review against each item. Critical domain failures downgrade overall confidence to "Critically low." This gives authors a pre-submission quality check.

```bash
git commit -m "feat: AMSTAR 2 pre-submission self-assessment"
```

---

### Task 8.2: Evidence gap map

**Files:**
- Create: `src/lib/systematic-review/evidence-gap-map.ts`
- Create: `src/components/systematic-review/EvidenceGapMap.tsx`

**Interactive matrix:**
- Rows: Interventions (from extracted data)
- Columns: Outcomes (from extracted data)
- Cells: colored bubbles showing number of studies, effect direction, certainty level
- Click cell to drill down to individual studies
- Export as interactive HTML or static image

```bash
git commit -m "feat: interactive evidence gap map — intervention × outcome matrix"
```

---

### Task 8.3: PRISMA extensions (PRISMA-S, PRISMA-NMA)

**Files:**
- Modify: `src/lib/systematic-review/prisma-checklist.ts`
- Modify: `src/components/systematic-review/PRISMAChecklistPanel.tsx`

**Add:**
- PRISMA-S (16 items for search reporting) — auto-populated from search execution data
- PRISMA-NMA (extends base PRISMA for network meta-analysis) — adds 5 NMA-specific items

```bash
git commit -m "feat: PRISMA-S and PRISMA-NMA extension checklists"
```

---

## Phase 9: Validation & Benchmarking

**Why:** The 2025 RAISE guidelines require transparent AI validation. otto-SR published 96.7% sensitivity. Elicit has 94-99% extraction accuracy. Without published benchmarks, institutions won't trust our AI.

### Task 9.1: Screening accuracy simulation framework

**Files:**
- Create: `src/lib/systematic-review/validation/screening-benchmark.ts`
- Create: `src/lib/systematic-review/__tests__/screening-benchmark.test.ts`

**Framework:**
- Take a known labeled dataset (e.g., Cohen dataset, SWIFT dataset, or user's own review)
- Run our triple-agent screening against all papers
- Compute: sensitivity, specificity, precision, recall, F1, work saved over sampling (WSS@95, WSS@100)
- Compare AI decisions against gold-standard labels
- Output: validation report suitable for methods section

```bash
git commit -m "feat: screening accuracy validation framework with standard metrics"
```

---

## Phase 10: Tests for New Features

### Task 10.1: Unit tests for NMA engine

**Files:**
- Create: `src/lib/systematic-review/__tests__/network-meta-analysis.test.ts`

**Test cases:**
1. 3-treatment triangle network — verify Laplacian, L⁺, league table
2. Star network (one reference treatment) — verify P-scores
3. Inconsistency detection — closed loop with known inconsistency
4. Single comparison — degenerates to pairwise
5. Disconnected network — should throw error
6. Known benchmark: reproduce published NMA results

---

### Task 10.2: Unit tests for REML/HKSJ/prediction intervals

**Files:**
- Modify: `src/lib/systematic-review/__tests__/meta-analysis.test.ts`

**Test cases:**
1. REML convergence for well-behaved data
2. REML vs DL comparison (REML generally less biased)
3. HKSJ CI wider than Wald CI for small k
4. Prediction interval wider than CI
5. Known benchmark values from `metafor` R package

---

### Task 10.3: Tests for collaboration and audit trail

**Files:**
- Create: `src/lib/systematic-review/__tests__/collaboration.test.ts`
- Create: `src/lib/systematic-review/__tests__/audit-trail.test.ts`

---

## Execution Order & Dependencies

| Phase | Tasks | Impact | Parallelizable? |
|-------|-------|--------|-----------------|
| **Phase 1: Collaboration** | 1.1 → 1.2 → 1.3, 1.4 | CRITICAL | 1.3 + 1.4 in parallel after 1.2 |
| **Phase 2: PDF Processing** | 2.1, 2.2, 2.3 | CRITICAL | 2.1 + 2.2 in parallel, then 2.3 |
| **Phase 3: Multi-Tool RoB** | 3.1, 3.2, 3.3 | HIGH | 3.1 + 3.2 in parallel, then 3.3 |
| **Phase 4: Stats Modernization** | 4.1 → 4.2 → 4.3 | HIGH | Sequential (each builds on previous) |
| **Phase 5: NMA** | 5.1 → 5.2 → 5.3 | MASSIVE | Sequential (core → viz → UI) |
| **Phase 6: Export** | 6.1, 6.2, 6.3 | HIGH | All parallel |
| **Phase 7: Search** | 7.1, 7.2 | MEDIUM | Parallel |
| **Phase 8: Reporting** | 8.1, 8.2, 8.3 | MEDIUM | All parallel |
| **Phase 9: Validation** | 9.1 | HIGH | Independent |
| **Phase 10: Tests** | 10.1, 10.2, 10.3 | MEDIUM | All parallel |

**Critical path:** Phase 1.1 → 1.2 → 1.3 (collaboration), Phase 4.1 → 4.2 → 4.3 (stats), Phase 5.1 → 5.2 → 5.3 (NMA)

**Recommended execution order:**
1. Phase 1 (1.1 → 1.2 → 1.3+1.4 parallel) — unblocks adoption
2. Phase 4 (4.1 → 4.2 → 4.3) — matches Cochrane standards
3. Phase 2 (2.1+2.2 parallel, then 2.3) — enables full-text workflow
4. Phase 3 (3.1+3.2 parallel, then 3.3) — covers all study designs
5. Phase 5 (5.1 → 5.2 → 5.3) — massive differentiator
6. Phase 6 (6.1+6.2+6.3 parallel) — interoperability
7. Phase 7 + Phase 8 + Phase 9 (all parallel batches) — polish & validation
8. Phase 10 (all parallel) — test coverage

**Total: 27 tasks across 10 phases.**
