# Integrity Check Phase 2 — Build Prompt

> Paste this into a new Claude Code session. Start by creating a new branch: `git checkout -b feature/integrity-check-phase2`

## Project Context

This is ScholarSync, a Next.js 15 App Router application for academic researchers. Stack:
- **Framework:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **DB:** PostgreSQL via Drizzle ORM (`src/lib/db/schema/editor.ts`)
- **Auth:** Clerk (`src/lib/auth.ts`) with `DEV_USER_ID` fallback for local dev
- **AI:** Vercel AI SDK with Anthropic provider (`src/lib/ai/models.ts`)
- **Rate limiting:** Upstash (`src/lib/rate-limit.ts`)

## What Already Exists (DO NOT rebuild)

The integrity check system is fully built and working on `feature/presentation-engine-v2`. These files exist:

### API Routes
- `src/app/api/integrity-check/route.ts` — Main POST endpoint. Accepts `{ text, mode, sources, projectId, documentId }`. Calls `runIntegrityCheck()`, persists results to DB, returns `IntegrityCheckResult`.
- `src/app/api/integrity-check/humanize/route.ts` — POST. Accepts `{ text, context? }`. Uses Claude Haiku to rewrite flagged paragraphs. Returns `{ rewritten, changes[] }`.
- `src/app/api/integrity-check/paraphrase/route.ts` — POST. Accepts `{ text, sourceTitle, sourceDoi?, sourceYear? }`. Returns `{ paraphrased, citationSuggestion }`.
- `src/app/api/integrity-check/report/route.ts` — POST. Accepts full `IntegrityCheckResult`. Generates Markdown report. Returns with `Content-Disposition: attachment`.
- `src/app/api/integrity-check/history/route.ts` — GET. `?limit=20&offset=0`. Returns `{ checks, total }` filtered by userId.

### Core Engine (`src/lib/integrity/`)
- `types.ts` — All TypeScript interfaces: `IntegrityCheckResult`, `AIDetectionResult`, `AIParagraphResult` (with `sentences`), `PlagiarismResult`, `CitationAuditResult`, `SelfPlagiarismResult`, `IntegrityCheckInput`.
- `index.ts` — Orchestrator. Dispatches to engines based on user plan. Free = AI detection only. Paid = all engines in parallel.
- `ai-detection.ts` — Dual-engine: LLM-heuristic (always) + Binoculars (paid users). Per-paragraph analysis with per-sentence `sentences[]` array. Flags explaining WHY text appears AI-generated.
- `plagiarism-engine.ts` — K-shingling + MinHash. Queries Crossref, Semantic Scholar, OpenAlex. Exports: `tokenize`, `createShingles`, `computeMinHash`, `estimateJaccard`.
- `citation-audit.ts` — DOI verification via Crossref API. PMID verification via PubMed E-utilities. Returns verified/unverified citations with issues.
- `self-plagiarism.ts` — Queries user's recent 20 integrity checks from DB, computes MinHash similarity, flags matches above 20% threshold.

### UI
- `src/app/(app)/compliance/page.tsx` — Main page. Tabs: Check / History. Input mode: From Document / Paste Text. Result view: Inline / Split. Features: sentence-level highlighting with tooltips, humanize button per paragraph, download report, Live (realtime) toggle, history with sparkline trend.
- `src/components/integrity/DiffView.tsx` — Two-column synced-scroll comparison view.
- `src/hooks/useRealtimeIntegrity.ts` — Debounced (2s) realtime AI score hook.

### DB Schema (`src/lib/db/schema/editor.ts`)
The `integrityChecks` table has columns: id, userId, projectId (nullable), documentId, checkType, contentChecked, wordCount, plagiarismScore, plagiarismMatches, plagiarismEngine, aiScore, aiDetectionDetails, aiDetectionEngine, flaggedPassages, sourceMatches, createdAt.

## IMPORTANT: Branding

"ScholarSync" is a CODENAME. The final product name is NOT decided. All user-facing strings must pull from a config constant, not be hardcoded. Create this if it doesn't exist:

```typescript
// src/lib/config/branding.ts
export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "ScholarSync",
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE ?? "Academic Integrity Platform",
} as const;
```

Use `BRAND.name` in all reports, UI headers, and generated content. NEVER hardcode "ScholarSync" in user-facing output.

---

## WHAT TO BUILD (4 Features)

### Feature 1: Retracted Paper Alerts (in Citation Audit)

**Goal:** During citation audit, check every verified DOI against the Retraction Watch database. If a cited paper has been retracted, flag it with the retraction date and reason.

**Data source:** Retraction Watch data is available two ways:
1. **Crossref API** (already used in citation-audit.ts): `GET https://api.crossref.org/v1/works/{doi}` — check if the response contains `update-to` with `type: "retraction"`.
2. **CSV dataset:** `git clone https://gitlab.com/crossref/retraction-watch-data` — contains a CSV file with ~63,000 retracted papers. Fields include: DOI, RetractionDate, RetractionNature, Reason, OriginalPaperDate, etc.

**Implementation approach:**
1. Create a new file `src/lib/integrity/retraction-watch.ts`.
2. Download the Retraction Watch CSV and create a PostgreSQL table `retracted_papers` with columns: `doi` (primary key, text), `retraction_date` (date), `retraction_nature` (text), `reason` (text), `original_paper_date` (date), `journal` (text), `title` (text).
3. Write a seed script (`src/lib/integrity/seed-retractions.ts`) that parses the CSV and upserts into the table. This runs once manually and can be re-run to update.
4. In `citation-audit.ts`, after DOI verification succeeds, also query the `retracted_papers` table. If found, add to the citation issue: `{ type: "retracted", doi, retractionDate, reason }`.
5. Update `CitationAuditResult` in `types.ts` to include retraction info in issues.
6. Update the compliance page UI to show retraction warnings with a distinct red alert style.

**Testing:** Use known retracted DOIs to test. Examples:
- `10.1016/S0140-6736(97)11096-0` — Wakefield's retracted autism/MMR paper
- `10.1126/science.aaa8415` — Retracted STAP cells paper

### Feature 2: Predatory Journal Detection (in Citation Audit)

**Goal:** During citation audit, check if any cited paper is published in a journal/publisher on Beall's List.

**Data source:** Beall's List is at https://beallslist.net/. It has two pages:
- Publishers: https://beallslist.net/ (main page lists predatory publishers)
- Standalone journals: https://beallslist.net/standalone-journals/

**Implementation approach:**
1. Create `src/lib/integrity/predatory-journals.ts`.
2. Manually curate (or scrape once) the lists into a JSON file: `src/lib/integrity/data/predatory-publishers.json` and `src/lib/integrity/data/predatory-journals.json`. These are simple string arrays. ~1,500 publishers + ~2,000 journals.
3. During citation audit, after DOI verification, extract the publisher name and journal name from Crossref metadata (the Crossref API returns `publisher` and `container-title` fields).
4. Check against the predatory lists (case-insensitive substring match).
5. If match: add to citation issue: `{ type: "predatory_journal", publisher, journal, listSource: "Beall's List" }`.
6. Use advisory language in the UI: "This journal appears on Beall's List of potentially predatory publishers. Verify the journal's peer review process before citing."

**Important:** Some legitimate journals appear on Beall's List. Use "potentially predatory" language, never "is predatory."

### Feature 3: PDF Report Export

**Goal:** Replace the current Markdown report download with a professional PDF report.

**Library:** Use `@react-pdf/renderer` (install: `npm install @react-pdf/renderer`).

**Implementation approach:**
1. Create `src/lib/integrity/pdf-report.tsx` — React PDF components that render the integrity report.
2. Modify `src/app/api/integrity-check/report/route.ts` to accept a `?format=pdf` query param (default: `pdf`, also support `md` for backward compat).
3. The PDF layout should include:
   - Header with BRAND.name and date
   - Overall scores section (AI %, plagiarism %, citations verified)
   - AI Detection section with per-paragraph breakdown and risk colors
   - Plagiarism section with matched sources
   - Citation Audit section (including retracted paper warnings and predatory journal flags)
   - Self-Plagiarism section
   - Writing Quality metrics
   - Footer with generation timestamp
4. Return with `Content-Type: application/pdf` and `Content-Disposition: attachment; filename="integrity-report-YYYY-MM-DD.pdf"`.
5. Update the "Download Report" button in compliance page to download PDF by default.

**Note on Vercel compatibility:** `@react-pdf/renderer` works in Node.js serverless functions. It does NOT require Puppeteer or a browser. It renders directly to a PDF buffer.

### Feature 4: Batch Upload Processing

**Goal:** Allow users to upload multiple files (PDF/DOCX) and run integrity checks on all of them.

**Libraries:** `pdf-parse` for PDF text extraction, `mammoth` for DOCX. Check if already in package.json; install if not.

**Implementation approach:**

1. **DB:** Add a new table `integrity_batches` in `src/lib/db/schema/editor.ts`:
   - `id` (serial primary key)
   - `userId` (text, FK to users)
   - `name` (text, e.g., "Assignment 3 submissions")
   - `fileCount` (integer)
   - `completedCount` (integer, default 0)
   - `status` (text: "processing" | "completed" | "failed")
   - `createdAt` (timestamp)

   Add `batchId` (nullable integer, FK to integrity_batches) to the existing `integrityChecks` table.

2. **API — Create batch:** `POST /api/integrity-check/batch` — Accepts multipart form with files + batch name. Validates file types (PDF, DOCX only). Limit: 10 files per batch for Basic plan, 30 for Pro. Max 5MB per file. Returns `{ batchId, fileCount }`.

3. **API — Process batch:** After creating the batch record, process files sequentially (not parallel — to avoid API rate limits and control costs). For each file:
   - Extract text (pdf-parse or mammoth)
   - If text extraction fails (scanned PDF, corrupted file), mark that check as `failed` with an error message
   - Run `runIntegrityCheck()` with the extracted text
   - Persist result to `integrityChecks` with the `batchId`
   - Increment `completedCount` on the batch record

   Use a simple loop with `await` — no job queue needed for v1.

4. **API — Get batch status:** `GET /api/integrity-check/batch/:id` — Returns batch metadata + array of results (or partial results if still processing).

5. **UI:** Add a "Batch Upload" tab or button on the compliance page:
   - File drop zone (accept .pdf, .docx)
   - Show upload progress, then processing progress (file 3/10 complete...)
   - Results table: filename, word count, AI score, plagiarism score, status
   - Click a row to expand full results
   - "Download All Reports" button → ZIP of individual PDFs

**Edge cases to handle:**
- Scanned/image PDFs → `pdf-parse` returns empty string → show "Could not extract text from this file (may be scanned/image-based)"
- Files > 5MB → reject with clear error
- Empty files → reject
- Encrypted/password-protected PDFs → reject with clear error
- Timeout: if a single file takes > 60 seconds to process, mark it as failed and continue with the next

---

## Run Order

Build in this order because each builds on the previous:
1. **Branding config** (10 min) — Create `src/lib/config/branding.ts`, update existing report route and compliance page header to use it.
2. **Feature 1: Retracted papers** (half day) — DB table, seed script, integrate into citation-audit.ts, update UI.
3. **Feature 2: Predatory journals** (half day) — JSON data files, integrate into citation-audit.ts, update UI.
4. **Feature 3: PDF report** (1 day) — Install @react-pdf/renderer, build PDF layout, update report route, update download button.
5. **Feature 4: Batch upload** (1.5 days) — DB migration, file upload API, processing loop, batch status API, UI.

After each feature, run `npx tsc --noEmit` to check for type errors, and test manually in the browser.

## Git Strategy

- Branch: `feature/integrity-check-phase2` (create from `main`)
- Commit after each feature is complete and verified
- Do NOT merge — other branches have active work. This branch stays independent until merge session.
