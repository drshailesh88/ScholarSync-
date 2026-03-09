# ScholarSync Compliance (Integrity Check) Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Compliance / Integrity Check page (`/compliance`).
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Page Header & Navigation](#2-page-header--navigation)
3. [Source Mode Selection](#3-source-mode-selection)
4. [Document Mode — Input](#4-document-mode--input)
5. [Paste Mode — Input](#5-paste-mode--input)
6. [Realtime Integrity Toggle](#6-realtime-integrity-toggle)
7. [Run Integrity Check](#7-run-integrity-check)
8. [Results View — View Mode Toggle](#8-results-view--view-mode-toggle)
9. [Inline Results View](#9-inline-results-view)
10. [Split / Diff View](#10-split--diff-view)
11. [Report Panel — AI Content Detection](#11-report-panel--ai-content-detection)
12. [Report Panel — Plagiarism Check](#12-report-panel--plagiarism-check)
13. [Report Panel — Citation Audit](#13-report-panel--citation-audit)
14. [Report Panel — Self-Plagiarism](#14-report-panel--self-plagiarism)
15. [Report Panel — External Source Matching (Copyleaks)](#15-report-panel--external-source-matching-copyleaks)
16. [Report Panel — Writing Quality](#16-report-panel--writing-quality)
17. [Humanize Text](#17-humanize-text)
18. [Paraphrase & Add Citation](#18-paraphrase--add-citation)
19. [Download Report](#19-download-report)
20. [History Tab](#20-history-tab)
21. [IntegrityPanel Component (Studio Embed)](#21-integritypanel-component-studio-embed)
22. [DiffView Component](#22-diffview-component)
23. [Realtime Integrity Hook](#23-realtime-integrity-hook)
24. [API Endpoints](#24-api-endpoints)
25. [Engine Internals](#25-engine-internals)
26. [Error Handling & Edge Cases](#26-error-handling--edge-cases)
27. [Quick Test Workflows](#27-quick-test-workflows)

---

## 1. Page Overview

| Attribute | Value |
|-----------|-------|
| **Route** | `/compliance` |
| **Component** | `CompliancePage` (`src/app/(app)/compliance/page.tsx`, ~1006 lines) |
| **Back link** | `/studio` |
| **Layout height** | `calc(100vh - 7rem)` |
| **Key dependencies** | `IntegrityCheckResult` types, `DiffView`, `useRealtimeIntegrity`, `CircularGauge`, `ProgressBar` |

### Key Source Files

| File | Purpose |
|------|---------|
| `src/app/(app)/compliance/page.tsx` | Main page component |
| `src/components/integrity/IntegrityPanel.tsx` | Compact panel (used in Studio sidebar) |
| `src/components/integrity/DiffView.tsx` | Side-by-side original vs. annotated view |
| `src/hooks/useRealtimeIntegrity.ts` | Live AI detection hook (debounced) |
| `src/lib/integrity/types.ts` | All shared TypeScript types |
| `src/lib/integrity/index.ts` | Orchestrator (dispatches to engines) |
| `src/lib/integrity/ai-detection.ts` | AI Detection engine |
| `src/lib/integrity/plagiarism-engine.ts` | Plagiarism engine (k-shingling + MinHash) |
| `src/lib/integrity/citation-audit.ts` | Citation verification engine |
| `src/lib/integrity/self-plagiarism.ts` | Self-plagiarism engine |
| `src/lib/copyleaks.ts` | Copyleaks API client |

---

## 2. Page Header & Navigation

- [ ] **Back arrow** — ArrowLeft icon, links to `/studio`
- [ ] **Title** — "Integrity Check" displayed as `font-semibold text-ink`
- [ ] **Tab toggle** — two buttons: "Check" and "History"
  - [ ] "Check" tab is active by default, styled `bg-brand text-white`
  - [ ] "History" tab shows ClockCounterClockwise icon (13px) before label
  - [ ] Clicking a tab switches `pageTab` state between `"check"` and `"history"`
  - [ ] Inactive tab styled `text-ink-muted hover:text-ink`

---

## 3. Source Mode Selection

Visible only when on the Check tab and no result is showing.

- [ ] **Two-button toggle**: "From Document" / "Paste Text"
- [ ] "From Document" shows FileText icon (14px)
- [ ] Active button styled `bg-brand text-white`, inactive `text-ink-muted hover:text-ink`
- [ ] Clicking "From Document" sets `sourceMode` to `"document"`, loads active project document
- [ ] Clicking "Paste Text" sets `sourceMode` to `"paste"`, shows editable textarea

---

## 4. Document Mode — Input

Active when `sourceMode === "document"`.

### Project Selector
- [ ] **Label** — "Project:" in `text-xs text-ink-muted`
- [ ] **Dropdown button** — displays selected project title (truncated at 200px) with CaretDown icon
- [ ] **Dropdown menu** — glass-panel, 224px wide, max-height 240px with overflow scroll, z-50
- [ ] Items highlight `bg-brand/10 text-brand font-medium` when selected
- [ ] Clicking outside closes dropdown (mousedown listener on `document`)
- [ ] Projects loaded via `listProjectsForAnalysis()` on mount
- [ ] First project auto-selected if none is chosen

### Document Display
- [ ] **Document title** — shown as "Document: **{title}**" next to project selector
- [ ] **Textarea** — read-only, displays document content from `activeDoc.plainText`
- [ ] **Placeholder** — "Document content loaded from your project..."
- [ ] Textarea styled with `glass-panel font-serif`, focus ring `ring-brand/40`

### Loading States
- [ ] **Loading** — CircleNotch spinner (28px) + "Loading document..."
- [ ] **No document** — FileText icon (32px) + "No document found. Write something in the Studio first, or switch to paste mode."

---

## 5. Paste Mode — Input

Active when `sourceMode === "paste"`.

- [ ] **Textarea** — editable, accepts user paste/typing
- [ ] **Placeholder** — "Paste your text here to check for AI-generated content, plagiarism indicators, and writing quality..."
- [ ] Textarea fills available height (`flex-1`), non-resizable
- [ ] **Word count** — displayed below textarea: `"{N} words"` in `text-xs text-ink-muted`
- [ ] Word count updates on every keystroke (splits by whitespace)

---

## 6. Realtime Integrity Toggle

Visible only in paste mode, before results.

- [ ] **Button** — Lightning icon (13px), label "Live"
- [ ] Enabled state: `bg-brand/10 text-brand border-brand/30`, Lightning icon weight `"fill"`
- [ ] Disabled state: `text-ink-muted border-border`, Lightning icon weight `"regular"`
- [ ] Clicking toggles `realtimeEnabled` state
- [ ] When enabled and a score exists, shows score as colored percentage:
  - `>60%` — emerald (green)
  - `>40%` — amber
  - `<=40%` — orange
- [ ] When loading, shows CircleNotch spinner (10px) next to label
- [ ] Realtime uses `useRealtimeIntegrity` hook with 2-second debounce
- [ ] Hook requires minimum 100 characters, minimum 10 character change between checks
- [ ] Realtime is active only when `realtimeEnabled && !result` (disabled once full check runs)

---

## 7. Run Integrity Check

- [ ] **Button** — "Run Integrity Check" with Sparkle icon (16px)
- [ ] Styled `bg-brand text-white`, `rounded-xl`, `px-6 py-3`
- [ ] Disabled when `loading` or text < 50 characters (opacity 50%)
- [ ] While running: button text changes to "Analyzing..."
- [ ] Minimum 50 characters required — shows error "Please enter at least 50 characters of text to analyze." if under
- [ ] Request has 30-second abort timeout
- [ ] Error messages displayed as `text-xs text-red-500` below textarea
- [ ] On timeout: "The check took too long. Please try again with shorter text."
- [ ] On network error: "Failed to connect to the analysis service. Please try again."
- [ ] Text split into paragraphs on `\n\n+` before display

---

## 8. Results View — View Mode Toggle

Visible only when results exist.

- [ ] **Inline / Split toggle** — two-button toggle group
  - [ ] "Inline" button — plain text
  - [ ] "Split" button — SplitHorizontal icon (13px) + label
  - [ ] Active styled `bg-brand text-white`, inactive `text-ink-muted hover:text-ink`
- [ ] **Download Report button** — DownloadSimple icon (16px) + "Download Report"
  - Styled with border, rounded-xl, hover `bg-surface-raised`
- [ ] **"Check New Text" link** — top-left of inline results, resets all state (result, paragraphs, copyleaks, humanize, paraphrase)

---

## 9. Inline Results View

Left panel (flex-1) when `viewMode === "inline"`.

- [ ] **Glass panel** container, rounded-2xl, padding 32px
- [ ] **Engine badge** — if Binoculars engine, shows purple pill "Binoculars" top-right
- [ ] **Document title** — if from a document, shown top-right in `text-ink-muted`

### Paragraph Rendering
Each paragraph displays with a colored left border based on AI probability:

| AI Probability | Left Border | Background |
|---------------|-------------|------------|
| > 60% AI | `border-orange-500` | `bg-orange-500/10` |
| 30-60% AI | `border-amber-300` | `bg-amber-500/5` |
| <= 30% AI | `border-emerald-400` | none |

- [ ] Paragraphs with sentence-level breakdown highlight individual sentences:
  - `<30% human` — `bg-red-500/15`
  - `30-60% human` — `bg-amber-500/10`
  - Each sentence has hover title showing human probability percentage
- [ ] **Flags** — shown below paragraph as "Flags: {comma-separated}" in `text-[10px] text-ink-muted`
- [ ] **Humanize result** — appears inline below flagged paragraphs (see section 17)

---

## 10. Split / Diff View

Active when `viewMode === "split"`. Uses the `DiffView` component.

### Layout
- [ ] **Two columns** side by side with 16px gap
- [ ] Left column: "Original Text" header (uppercase, tracking-wide)
- [ ] Right column: "Annotated" header with legend

### Legend (right column header)
- [ ] **AI (high)** — red swatch (`bg-red-500/15`)
- [ ] **AI (med)** — amber swatch (`bg-amber-500/10`)
- [ ] **Plagiarism** — red swatch with underline (`bg-red-500/10 underline decoration-red-500`)

### Highlighting Rules

| Condition | Style |
|-----------|-------|
| Human probability < 30% | `bg-red-500/15` |
| Human probability 30-60% | `bg-amber-500/10` |
| Plagiarism match overlap | `bg-red-500/10 underline decoration-red-500` |

- [ ] Citation issues render as inline Warning icons (12px, filled):
  - Error severity: `text-red-500`
  - Warning severity: `text-amber-500`
  - Info severity: `text-blue-400`
- [ ] **Synchronized scrolling** — scrolling one column scrolls the other (via `requestAnimationFrame` sync guard)
- [ ] Both columns render inside `rounded-xl border border-border-subtle bg-surface-raised` containers
- [ ] Text rendered in `font-serif` with relaxed leading

---

## 11. Report Panel — AI Content Detection

Right sidebar panel (384px / `w-96`, glass-panel, rounded-2xl).

### Header
- [ ] **Title** — "AI Content Detection"
- [ ] **Engine label** — "Binoculars + LLM" or "LLM Heuristic" in `text-[10px] text-ink-muted`

### Score Display
- [ ] **CircularGauge** — 110px size, shows `humanScore` value
- [ ] **Gauge label** — "Low Risk", "Moderate Risk", or "High Risk" based on `overallRisk`
- [ ] **Score summary** — "Human: {X}%" left, "AI: {X}%" right

### Per-Paragraph Breakdown
Each paragraph in `result.aiDetection.paragraphs`:
- [ ] **Header** — "Paragraph {N}" with human probability percentage
- [ ] Probability color:
  - `<40%` — orange
  - `40-70%` — amber
  - `>=70%` — emerald
- [ ] **ProgressBar** — visual bar colored to match probability thresholds
- [ ] **Suggestion** — if present, shown in `text-[10px] text-ink-muted`
- [ ] **Humanize button** — appears for paragraphs with `<40%` human probability (see section 17)

---

## 12. Report Panel — Plagiarism Check

- [ ] **Section title** — "Plagiarism Check", separated by top border
- [ ] **Similarity score** — percentage, color-coded:
  - `>30%` — red
  - `15-30%` — amber
  - `<=15%` — emerald

### Plan Gating
- [ ] **Free tier** — shows amber notice: "Upgrade to a paid plan for plagiarism scanning."
- [ ] **Paid tier with no matches** — "No plagiarism concerns detected across {N} sources."
- [ ] **Paid tier with matches** — shows sources scanned count + match list

### Match Display (per match)
- [ ] **Similarity percentage** — color-coded by severity (high=red, medium=amber, low=emerald)
- [ ] **Severity badge** — pill with severity label (high/medium/low)
- [ ] **Excerpt** — italic, max 2 lines (`line-clamp-2`)
- [ ] **Source title** — with year if available
- [ ] **DOI link** — `text-brand`, opens in new tab via `https://doi.org/{doi}`
- [ ] **"Add Citation" button** — BookOpen icon (12px), copies formatted citation to clipboard
  - Shows Check icon + "Copied!" for 2 seconds after click
- [ ] **"Paraphrase" button** — PenNib icon (12px), triggers AI paraphrase (see section 18)

---

## 13. Report Panel — Citation Audit

Visible only when `result.citationAudit` is not null (paid tier).

- [ ] **Section title** — "Citation Audit", separated by top border
- [ ] **Verified count** — "{verified}/{total} verified" in `text-xs text-ink-muted`

### Results Display
- [ ] **All verified** — "All citations verified successfully." in emerald
- [ ] **Issues list** — up to 8 issues displayed
  - Each issue shows a colored dot indicator:
    - Error: `bg-red-500`
    - Warning: `bg-amber-500`
    - Info: `bg-blue-400`
  - Issue message in `text-[10px] text-ink`
  - Reference identifier shown as "Ref: {reference}" if present

---

## 14. Report Panel — Self-Plagiarism

Visible only when `result.selfPlagiarism` has matched documents.

- [ ] **Section title** — "Self-Plagiarism", separated by top border
- [ ] **Overlap score** — percentage, color-coded:
  - `>30%` — amber
  - `<=30%` — emerald

### Matched Documents
Each matched document:
- [ ] **Date** — `toLocaleDateString()` in `text-[10px] text-ink-muted`
- [ ] **Similarity** — percentage in amber, `text-xs font-medium`
- [ ] **Excerpt** — italic, max 2 lines (`line-clamp-2`)

---

## 15. Report Panel — External Source Matching (Copyleaks)

- [ ] **Section title** — "External Source Matching", separated by top border

### States

| State | Display | Test |
|-------|---------|------|
| **Not configured** | "Configure Copyleaks API keys for additional source matching." | [ ] Verify message when `copyleaksAvailable === false` |
| **Idle** | "Run External Scan" button with MagnifyingGlass icon | [ ] Button appears, clicking triggers scan |
| **Loading** | Spinning circle + "Scanning sources... This may take a minute." | [ ] Spinner animates |
| **Completed, no matches** | "No matching sources found." in emerald | [ ] Verify after scan |
| **Completed, with matches** | Score + ProgressBar + source list | [ ] Sources render correctly |

### Completed Results
- [ ] **Score** — percentage, color-coded (>30% red, >10% amber, otherwise emerald)
- [ ] **ProgressBar** — colored to match score thresholds
- [ ] **Source list** — each source shows:
  - Linked title (opens `src.url` in new tab)
  - Match percentage (color-coded)
  - Matched text excerpt (italic, max 2 lines)

### Polling Behavior
- [ ] After scan submission, polls `/api/copyleaks` with `action: "results"` every 5 seconds
- [ ] Polling stops on status `"completed"` or `"error"`
- [ ] Polling interval cleaned up on unmount
- [ ] 503 response marks Copyleaks as unavailable

---

## 16. Report Panel — Writing Quality

- [ ] **Section title** — "Writing Quality", separated by top border

### Stats Grid (2 columns + 1 full-width)

| Stat | Display | Test |
|------|---------|------|
| **Passive Voice** | Count, large font | [ ] Matches `writingQuality.passiveVoiceCount` |
| **Avg Words/Sentence** | Decimal, large font | [ ] Matches `writingQuality.averageSentenceLength` |
| **Readability Level** | "Grade {X}", full width | [ ] Matches `writingQuality.readabilityGrade` |

### Suggestions
- [ ] Listed below stats when present
- [ ] Each suggestion in `text-xs text-ink-muted` with left brand-colored border (`border-l-2 border-brand/30`)
- [ ] Preceded by "Suggestions" label in `text-xs font-medium text-ink-muted`

---

## 17. Humanize Text

- [ ] **Trigger** — "Humanize Text" button on paragraphs with `<40%` human probability
- [ ] **Loading state** — CircleNotch spinner (10px) + "Humanizing..."
- [ ] **Completed state** — button text changes to checkmark + "Humanized"
- [ ] **API** — `POST /api/integrity-check/humanize` with paragraph text (10-5000 chars)
- [ ] **Inline result** — displayed below paragraph in results view:
  - Green container (`bg-emerald-500/5 border-emerald-500/20`)
  - Label: "Humanized Version:" in emerald
  - Rewritten text in `text-xs text-ink leading-relaxed`
  - Change chips — each change as a small pill (`bg-emerald-500/10 text-emerald-400`)
- [ ] Results stored per paragraph index in `humanizeResults` state

---

## 18. Paraphrase & Add Citation

### Add Citation
- [ ] **Button** — BookOpen icon (12px) + "Add Citation"
- [ ] Styled `text-brand bg-brand/10 hover:bg-brand/20`
- [ ] Copies formatted string: `"{Title} ({Year}). DOI: {doi}"` to clipboard
- [ ] **Feedback** — icon changes to Check (12px), text changes to "Copied!" for 2 seconds

### Paraphrase
- [ ] **Button** — PenNib icon (12px) + "Paraphrase"
- [ ] Styled `text-ink-muted bg-surface-raised`
- [ ] **Loading state** — CircleNotch spinner (12px) + "Paraphrasing..."
- [ ] **API** — `POST /api/integrity-check/paraphrase` with text, `sourceTitle` (required), optional `sourceDoi`
- [ ] **Inline result** — displayed below the match:
  - Blue container (`bg-blue-500/5 border-blue-500/20`)
  - Label: "Paraphrased:" in blue
  - Paraphrased text in `text-xs text-ink leading-relaxed`
  - Citation suggestion shown as "Citation: {suggestion}" in `text-[9px] text-ink-muted`
- [ ] Results stored per match index in `paraphraseResults` state

---

## 19. Download Report

- [ ] **Button** — DownloadSimple icon (16px) + "Download Report" (visible in results view header)
- [ ] **API** — `POST /api/integrity-check/report`
- [ ] **Payload** — sends `result`, `text`, and `documentTitle`
- [ ] **Response** — Markdown file, content-type `text/markdown`
- [ ] **Filename** — `integrity-report-YYYY-MM-DD.md`
- [ ] **Download mechanism** — creates Blob URL, creates ephemeral `<a>` element, triggers click, revokes URL

### Report Contents
- [ ] Header with document title, date, word count, tier
- [ ] Overall Scores table (human score, AI risk, plagiarism similarity, citations verified, readability grade)
- [ ] AI Detection section with per-paragraph breakdown table
- [ ] Plagiarism Detection section with matched sources table (if paid)
- [ ] Citation Audit section with issues list (if paid)
- [ ] Writing Quality section with metrics table and suggestions
- [ ] Footer with generation timestamp

---

## 20. History Tab

Accessed by clicking the "History" tab in the page header.

- [ ] **History loaded on tab switch** — fetches `GET /api/integrity-check/history?limit=20`
- [ ] **Loading state** — CircleNotch spinner (24px brand), centered
- [ ] **Empty state** — "No integrity checks found. Run your first check to see history here."

### Sparkline Trend
- [ ] Visible only when `>=2` history entries exist
- [ ] SVG polyline showing AI score trend over recent checks
- [ ] Dots at each data point (3px radius, brand fill)
- [ ] Label: "AI Score Trend (recent checks)"
- [ ] Data displayed in chronological order (reversed from API's desc order)

### History List
Each entry displayed as a row (`bg-surface-raised rounded-lg p-3`):

| Column | Display | Test |
|--------|---------|------|
| **Date** | `toLocaleDateString()` | [ ] Correct date format |
| **Word count** | "{N} words" or "? words" | [ ] Shows count or fallback |
| **Engine badge** | Purple pill if engine present | [ ] Badge shows engine name |
| **AI Score** | "AI: {X}%" colored: >50% orange, else emerald | [ ] Correct color threshold |
| **Plagiarism Score** | "Plag: {X}%" colored: >15% red, else emerald | [ ] Correct color threshold |

---

## 21. IntegrityPanel Component (Studio Embed)

Compact version used in the Studio page's "Checks" tab.

**File**: `src/components/integrity/IntegrityPanel.tsx`

### Props

| Prop | Type | Description |
|------|------|-------------|
| `getEditorText` | `() => string` | Returns current editor text |
| `sources` | `Array<{title?, doi?, pmid?, authors?, year?}>` | Optional document sources |

### States

| State | Display | Test |
|-------|---------|------|
| **Idle** | ShieldCheck icon (24px), title "Integrity Check", description, "Run Integrity Check" button | [ ] Renders correctly |
| **Running** | CircleNotch spinner (32px brand), "Analyzing Document...", "Running AI detection, plagiarism scan, and citation verification." | [ ] Spinner animates |
| **Error** | Warning icon (28px red), error message, "Retry" button with ArrowClockwise icon | [ ] Error message shown, retry works |
| **Done** | Full results layout | [ ] All sections render |

### Results Layout
- [ ] **Header** — "Integrity Report" label + "Re-run" link (ArrowClockwise icon)
- [ ] **CircularGauge** — 90px, shows `humanScore`
- [ ] **Free tier notice** — amber banner with Lock icon: "Free tier -- AI detection only. Upgrade for plagiarism scanning and citation verification."

### Four Collapsible Sections (all expanded by default)

| Section | Icon | Summary Format | Test |
|---------|------|----------------|------|
| **AI Detection** | Robot (14px, color by score) | "{X}% human -- {risk} risk -- Binoculars" | [ ] Correct values |
| **Plagiarism** | MagnifyingGlass (14px, color by score) | "{X}% similar -- {N} sources" or "Paid feature" | [ ] Locked when null |
| **Citations** | BookmarkSimple (14px, color by issues) | "{verified}/{total} verified -- {N} issues" or "Paid feature" | [ ] Locked when null |
| **Writing Quality** | TextAa (14px blue) | "Grade {X} -- {N} passive" | [ ] Always visible |

### Locked Section State
- [ ] Shows Lock icon (14px) in header instead of summary
- [ ] Expanded content: Lock icon (14px) + "Available on paid plans" + "Upgrade to unlock" link

### Collapsible Behavior
- [ ] CaretDown (10px) when expanded, CaretRight (10px) when collapsed
- [ ] Click header to toggle
- [ ] All four sections default to expanded

---

## 22. DiffView Component

**File**: `src/components/integrity/DiffView.tsx`

### Props

| Prop | Type | Description |
|------|------|-------------|
| `paragraphs` | `string[]` | Document paragraphs |
| `result` | `IntegrityCheckResult` | Full integrity check result |

### Synchronized Scrolling
- [ ] Uses `useRef` for left/right panels
- [ ] `isSyncing` guard prevents infinite scroll loops
- [ ] Scroll sync uses `requestAnimationFrame`

### Sentence-Level Rendering
- [ ] When `aiAnalysis.sentences` array exists and is non-empty, renders sentence-by-sentence
- [ ] Each sentence gets background based on paragraph's `humanProbability`
- [ ] Gaps between sentences (non-analyzed text) rendered plain
- [ ] Plagiarism overlap check: `sentenceText.includes(m.excerpt) || m.excerpt.includes(sentenceText)`

### Paragraph-Level Rendering (fallback)
- [ ] Used when no sentence breakdown available
- [ ] Plagiarism highlights applied via `applyPlagiarismHighlights` — finds excerpt substrings and wraps in highlighted spans
- [ ] Ranges sorted by start position, non-overlapping

---

## 23. Realtime Integrity Hook

**File**: `src/hooks/useRealtimeIntegrity.ts`

### Configuration

| Constant | Value | Purpose |
|----------|-------|---------|
| `DEBOUNCE_MS` | 2000 | Milliseconds to wait after text change |
| `MIN_TEXT_LENGTH` | 100 | Minimum characters before checking |
| `MIN_CHANGE_LENGTH` | 10 | Minimum character change from last check |

### Behavior
- [ ] Returns `{ score: number | null, loading: boolean, error: string | null }`
- [ ] Calls `POST /api/integrity-check` with `mode: "ai_detection"`
- [ ] Extracts `aiDetection.humanScore` from response
- [ ] Cancels in-flight requests via `AbortController` when new check starts
- [ ] Ignores `AbortError` (not treated as error)
- [ ] Cleans up on unmount (aborts controller, clears timer)
- [ ] Skips check if text unchanged by less than `MIN_CHANGE_LENGTH` characters (except first check)

---

## 24. API Endpoints

### POST `/api/integrity-check`

| Field | Validation | Notes |
|-------|-----------|-------|
| `text` | 50-50,000 chars | Required |
| `mode` | `"full" \| "ai_detection" \| "plagiarism" \| "citation_audit"` | Default: `"full"` |
| `sources` | Array of `{title?, doi?, pmid?, authors?, year?}` | Optional |
| `projectId` | Positive integer | Optional |
| `documentId` | Positive integer | Optional |

- [ ] Returns 401 if not authenticated
- [ ] Rate limited (20/hr via `RATE_LIMITS.analysis`)
- [ ] Returns 503 if AI not configured
- [ ] Returns 400 with validation errors on bad input
- [ ] Persists results to `integrityChecks` DB table (non-fatal if DB save fails)
- [ ] Plan gating: free users get AI detection only; paid users get all engines

### GET `/api/integrity-check/history`

| Param | Default | Validation |
|-------|---------|-----------|
| `limit` | 20 | 1-100 |
| `offset` | 0 | >= 0 |

- [ ] Returns `{ checks: [...], total: number }`
- [ ] Ordered by `createdAt` descending
- [ ] Each check includes: id, createdAt, aiScore, plagiarismScore, wordCount, engine, checkType, projectId

### POST `/api/integrity-check/humanize`

| Field | Validation |
|-------|-----------|
| `text` | 10-5,000 chars |
| `context` | Max 2,000 chars, optional |

- [ ] Returns `{ rewritten: string, changes: string[] }`
- [ ] Uses small model (Claude Haiku) with structured output
- [ ] System prompt instructs to vary sentence lengths, reduce hedging, use active voice, preserve citations

### POST `/api/integrity-check/paraphrase`

| Field | Validation |
|-------|-----------|
| `text` | 10-5,000 chars |
| `sourceTitle` | Required, min 1 char |
| `sourceDoi` | Optional |
| `sourceYear` | Optional positive integer |

- [ ] Returns `{ paraphrased: string, citationSuggestion: string }`
- [ ] Uses small model (Claude Haiku) with structured output
- [ ] System prompt: rewrite to reduce plagiarism similarity while maintaining integrity

### POST `/api/integrity-check/report`

| Field | Validation |
|-------|-----------|
| `result` | Full `IntegrityCheckResult` object |
| `text` | Min 1 char |
| `documentTitle` | Optional (defaults to "Untitled") |

- [ ] Returns `text/markdown` with `Content-Disposition: attachment`
- [ ] Filename: `integrity-report-YYYY-MM-DD.md`

### POST `/api/integrity-check/batch`

| Field | Validation |
|-------|-----------|
| `files` | Multipart form-data, PDF or DOCX |
| `name` | Optional batch name |

- [ ] Max 5MB per file
- [ ] Max 30 files per batch
- [ ] Allowed types: PDF, DOCX (by MIME type or extension)
- [ ] Empty files rejected
- [ ] Creates batch record, processes files in background
- [ ] Returns `{ batchId, fileCount, status: "processing" }`
- [ ] 60-second timeout per file (extraction + check)
- [ ] Failed files saved with error message (e.g., scanned PDF)
- [ ] GET endpoint: fetch batch status by `?id=` query param

### POST `/api/copyleaks`

| Field | Validation |
|-------|-----------|
| `action` | `"scan"` or `"results"` |
| `text` | 50-50,000 chars (for scan) |
| `scanId` | String (for results) |

- [ ] Returns 503 if `COPYLEAKS_EMAIL` or `COPYLEAKS_API_KEY` not configured
- [ ] Rate limited via `RATE_LIMITS.analysis`

---

## 25. Engine Internals

### Orchestrator (`src/lib/integrity/index.ts`)

| User Plan | Engines Run |
|-----------|-------------|
| **Free** | AI Detection (LLM-heuristic only) |
| **Paid** (basic, pro, institutional) | AI Detection (LLM-heuristic + Binoculars) + Plagiarism + Citation Audit |
| **Any authenticated user** | Self-Plagiarism (if `userId` present, mode full or plagiarism) |

- [ ] Engines run in parallel via `Promise.all`
- [ ] Each engine has `.catch()` fallback returning safe defaults (non-fatal)

### AI Detection Engine
- [ ] **LLM-heuristic** — free tier, always runs
- [ ] **Binoculars** — paid tier only, runs on Replicate GPU
- [ ] **Blend** — 60% heuristic / 40% Binoculars when both available
- [ ] Computes `TextStatistics`: avgSentenceLength, sentenceLengthStdDev, typeTokenRatio, passiveVoicePercent, readabilityGrade, hedgingPhraseCount, formulaicTransitionDensity, paragraphLengthStdDev, repetitiveSentenceOpeningRatio, markdownHeadingCount

### Plagiarism Engine
- [ ] **Algorithm** — k-shingling (k=5) + MinHash (128 hashes)
- [ ] **Sources** — Crossref + Semantic Scholar scholarly databases
- [ ] **Severity** — based on Jaccard similarity score

### Citation Audit Engine
- [ ] **DOI verification** — via Crossref API
- [ ] **PMID verification** — via PubMed API
- [ ] **Uncited claim detection** — 14+ regex patterns for factual assertions
- [ ] Issue types: `unverified_doi`, `invalid_doi`, `missing_citation`, `hallucinated_ref`, `broken_pmid`

### Self-Plagiarism Engine
- [ ] **Algorithm** — MinHash against user's previous 20 checks
- [ ] **Threshold** — similarity >= 0.2 to flag as a match

### Writing Quality (derived from AI stats)
Suggestions generated when:
- [ ] Avg sentence length > 28 words
- [ ] Sentence length std dev < 3 (too uniform)
- [ ] Passive voice > 30%
- [ ] Type-token ratio < 0.35
- [ ] Hedging phrases > 5
- [ ] Readability grade > 16

---

## 26. Error Handling & Edge Cases

### Input Validation
- [ ] Text under 50 chars — error message, button disabled
- [ ] Text over 50,000 chars — API returns validation error
- [ ] Empty document in document mode — shows empty state with FileText icon

### API Errors
- [ ] 401 — not authenticated
- [ ] 400 — validation errors returned with field details
- [ ] 429 — rate limit exceeded (20 checks/hour)
- [ ] 503 — AI service not configured
- [ ] 500 — generic server error

### Network Errors
- [ ] 30-second abort timeout on main check
- [ ] AbortError shown as timeout message
- [ ] Non-abort errors shown as generic connection failure
- [ ] Humanize/paraphrase failures silently ignored (no error displayed)

### Copyleaks Edge Cases
- [ ] Missing API keys — returns 503, sets `copyleaksAvailable = false`
- [ ] Polling cleanup on unmount
- [ ] Polling stops on completion or error status

### State Reset
- [ ] "Check New Text" link resets: result, paragraphs, copyleaksResult, copyleaksScanId, copyleaksAvailable, humanizeResults, paraphraseResults
- [ ] Switching source mode resets document loading state

---

## 27. Quick Test Workflows

### Basic Integrity Check Flow
1. [ ] Navigate to `/compliance`
2. [ ] Verify header shows "Integrity Check" with Check/History tabs
3. [ ] Verify "From Document" is selected by default
4. [ ] Switch to "Paste Text" mode
5. [ ] Paste 100+ words of text
6. [ ] Verify word count updates
7. [ ] Click "Run Integrity Check"
8. [ ] Wait for results (up to 30 seconds)
9. [ ] Verify CircularGauge renders with human score
10. [ ] Review per-paragraph breakdown in right panel

### Document Mode Flow
1. [ ] Select "From Document" mode
2. [ ] If projects exist, verify project dropdown works
3. [ ] Verify document content loads into read-only textarea
4. [ ] Verify document title shown
5. [ ] Run integrity check
6. [ ] Verify results match document content

### Realtime Check Flow
1. [ ] Switch to "Paste Text" mode
2. [ ] Enable "Live" toggle
3. [ ] Paste/type 100+ characters
4. [ ] Verify Lightning icon fills and score appears after ~2 seconds
5. [ ] Verify score color coding (green/amber/orange)
6. [ ] Run full check — verify realtime disables

### Inline vs Split View
1. [ ] After getting results, verify default is "Inline"
2. [ ] Click "Split" — verify two-column DiffView renders
3. [ ] Scroll one column — verify other scrolls in sync
4. [ ] Verify legend shows AI (high), AI (med), Plagiarism
5. [ ] Switch back to "Inline" — verify inline view renders

### Humanize Flow
1. [ ] Get results with at least one paragraph < 40% human
2. [ ] Click "Humanize Text" on that paragraph
3. [ ] Verify "Humanizing..." spinner
4. [ ] Verify green inline result with rewritten text and change chips
5. [ ] Verify button changes to checkmark "Humanized"

### Plagiarism & Paraphrase Flow
1. [ ] Get results with plagiarism matches (requires paid plan)
2. [ ] Verify match card shows similarity %, severity badge, excerpt, source title
3. [ ] Click "Add Citation" — verify clipboard + "Copied!" feedback
4. [ ] Click "Paraphrase" — verify "Paraphrasing..." spinner
5. [ ] Verify blue inline result with paraphrased text and citation suggestion

### Download Report Flow
1. [ ] After getting results, click "Download Report"
2. [ ] Verify `.md` file downloads with correct date in filename
3. [ ] Open file — verify it contains all sections (AI, plagiarism, citations, quality)

### History Flow
1. [ ] Click "History" tab
2. [ ] If no checks exist, verify empty state message
3. [ ] If checks exist, verify list renders with date, words, engine badge, scores
4. [ ] Verify sparkline trend appears when >= 2 entries
5. [ ] Verify AI score color (>50% orange, else green)
6. [ ] Verify plagiarism score color (>15% red, else green)

### External Source Matching (Copyleaks) Flow
1. [ ] After getting results, scroll to "External Source Matching"
2. [ ] If not configured, verify configuration message
3. [ ] Click "Run External Scan"
4. [ ] Verify loading state: "Scanning sources... This may take a minute."
5. [ ] Wait for results (polls every 5 seconds)
6. [ ] Verify score, progress bar, and source list render

### Error Handling
1. [ ] Try running check with < 50 characters — verify error message and disabled button
2. [ ] Disconnect network — run check — verify "Failed to connect" error
3. [ ] Verify "Check New Text" link resets all state cleanly

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI implementation and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] Initial page state sets `sourceMode = "document"`, `pageTab = "check"`, `viewMode = "inline"`, `realtimeEnabled = false`, and both result/history payloads empty
- [ ] Source-mode toggle and realtime toggle are hidden once a full `result` exists
- [ ] Project-list request runs on mount and again whenever `selectedProjectId` changes because the loader effect depends on that state
- [ ] Project-list load failures are silent and leave the selector hidden when no projects are available
- [ ] Project dropdown button falls back to `Select project` when no project is selected
- [ ] Project dropdown is rendered only in document mode and only when `projects.length > 0`
- [ ] Clicking a project option updates `selectedProjectId` and immediately closes the dropdown
- [ ] Outside-click handling for the project dropdown uses a `mousedown` listener on `document`
- [ ] Switching into document mode clears the page-level `error` state before fetching the active document
- [ ] Document fetch runs only while `sourceMode === "document"`
- [ ] Successful document fetch sets both `activeDoc` and `inputText = activeDoc.plainText`
- [ ] Failed document fetch clears `activeDoc` and `inputText` without showing a user-facing fetch error
- [ ] Switching from document mode to paste mode does not clear `inputText`; the currently loaded document text remains available for editing
- [ ] Document-mode textarea is explicitly `readOnly`
- [ ] Paste-mode textarea is editable and uses the same shared `inputText` state as document mode
- [ ] Textarea placeholder switches between the document-mode and paste-mode helper copy based on `sourceMode`
- [ ] Word count is always shown beneath the textarea, including document mode
- [ ] Document-mode word-count row appends `from {documentTitle}` when `activeDoc` exists
- [ ] Word count is calculated from `inputText.split(/\\s+/).filter(Boolean).length`
- [ ] Realtime `Live` toggle is rendered only in paste mode before a full result exists
- [ ] Realtime toggle score pill is shown only when realtime is enabled and `realtimeResult.score` is non-null
- [ ] Realtime toggle color coding uses `>60` green, `>40` amber, and `<=40` orange
- [ ] Realtime hook waits 2 seconds after typing before firing
- [ ] Realtime hook does not run until text length reaches at least 100 characters
- [ ] Realtime hook skips reruns when the new text length differs by fewer than 10 characters from the last checked text
- [ ] Realtime hook posts `{ mode: "ai_detection" }` to `/api/integrity-check`
- [ ] Realtime hook aborts any in-flight request before starting a new one
- [ ] Realtime hook stores `aiDetection.humanScore` as the displayed percentage
- [ ] Realtime hook errors are not surfaced anywhere in the page UI
- [ ] Disabling Live hides the score display but does not explicitly clear the last computed realtime score from hook state
- [ ] `Run Integrity Check` button is disabled whenever `loading` is true or trimmed text length is under 50 characters
- [ ] Clicking `Run Integrity Check` with fewer than 50 characters sets the exact error `Please enter at least 50 characters of text to analyze.`
- [ ] Starting a full check clears the previous page-level error
- [ ] Full checks split `inputText` into `paragraphs` using blank-line boundaries before sending the request
- [ ] Full-check request posts `{ text: inputText, mode: "full" }` to `/api/integrity-check`
- [ ] Full-check timeout aborts after 30 seconds
- [ ] Non-OK full-check responses surface `data.error` when present before falling back to `Integrity check failed. Please try again.`
- [ ] Timeout errors surface `The check took too long. Please try again with shorter text.`
- [ ] Non-timeout fetch failures surface `Failed to connect to the analysis service. Please try again.`
- [ ] Successful full checks populate `result` and switch the page into results mode without clearing `inputText`
- [ ] Results mode always shows the Inline/Split toggle and Download Report button in the top-right header
- [ ] `Check New Text` resets `result`, `paragraphs`, `copyleaksResult`, `copyleaksScanId`, `copyleaksAvailable`, `humanizeResults`, and `paraphraseResults`
- [ ] `Check New Text` does not clear `inputText`, `sourceMode`, `pageTab`, `viewMode`, or `copiedCitation`
- [ ] Inline results header shows the `Binoculars` badge only when `result.aiDetection.engine === "binoculars"`
- [ ] Inline results header shows the active document title only when `activeDoc` exists
- [ ] Paragraph card background and left-border styling are driven by AI probability thresholds derived from `100 - humanProbability`
- [ ] Paragraphs without sentence-level analysis render the raw paragraph text with paragraph-level highlighting only
- [ ] Paragraphs with sentence-level analysis apply the same paragraph-level `humanProbability` tooltip to every sentence span
- [ ] Sentence-level highlight titles read `Human probability: {N}%`
- [ ] Flag text renders only when `analysis.flags.length > 0`
- [ ] Humanized output block renders only after a successful humanize request for that paragraph index
- [ ] Humanized output block title reads `Humanized Version:`
- [ ] Humanized change tags render one chip per `changes[]` entry
- [ ] Humanize button appears only for paragraphs with `humanProbability < 40`
- [ ] While humanize is in flight for a paragraph, the button shows a spinner plus `Humanizing...`
- [ ] After a successful humanize call, the button label changes to `✓ Humanized`
- [ ] Humanize failures fail silently and leave no inline error message
- [ ] Split view uses the shared `DiffView` component with the frozen `paragraphs` array from the last check
- [ ] `DiffView` synchronizes left/right scroll positions using a request-animation-frame guard
- [ ] `DiffView` plagiarism highlights are applied only when the exact matched excerpt is found within the rendered paragraph text
- [ ] `DiffView` citation issues render as inline `Warning` icons with severity-based colors
- [ ] `DiffView` right-column legend always shows `AI (high)`, `AI (med)`, and `Plagiarism`
- [ ] AI Content Detection header shows `Binoculars + LLM` only for the binoculars engine and `LLM Heuristic` otherwise
- [ ] Circular gauge value is `result.aiDetection.humanScore`
- [ ] Circular gauge label is derived from `overallRisk` as `Low Risk`, `Moderate Risk`, or `High Risk`
- [ ] Score summary always shows `Human: {X}%` on the left and `AI: {X}%` on the right
- [ ] Paragraph cards in the AI panel are ordered by `result.aiDetection.paragraphs`
- [ ] Paragraph probability text uses orange below 40, amber below 70, and emerald at 70 or above
- [ ] Progress-bar colors mirror the same paragraph probability thresholds
- [ ] Plagiarism section shows an upgrade prompt when `result.plagiarism` is absent
- [ ] Built-in plagiarism summary badge color uses red above 30, amber above 15, and green at 15 or below
- [ ] Built-in plagiarism `No concerns` state includes the `sourcesScanned` count in the success sentence
- [ ] Each plagiarism match card shows excerpt, source title, optional source year, optional DOI link, and two actions
- [ ] `Add Citation` copies a plain-text citation string composed from source title, optional year, and optional DOI
- [ ] `Add Citation` uses `navigator.clipboard.writeText(...)` with no visible failure handling
- [ ] `Add Citation` feedback switches to `Copied!` for 2 seconds, then resets
- [ ] Paraphrase requests post `text`, `sourceTitle`, and optional `sourceDoi` to `/api/integrity-check/paraphrase`
- [ ] While paraphrasing is in flight, the button shows a spinner plus `Paraphrasing...`
- [ ] Successful paraphrase output renders `Paraphrased:` plus a `Citation:` helper line
- [ ] Paraphrase failures fail silently and leave no inline error
- [ ] Citation Audit section is omitted entirely when `result.citationAudit` is missing
- [ ] Citation Audit issue list is truncated to the first 8 issues
- [ ] Citation Audit issue cards show `Ref: ...` only when `issue.reference` exists
- [ ] Self-Plagiarism section renders only when `matchedDocuments.length > 0`
- [ ] Self-Plagiarism score color changes to amber only when `selfSimilarityScore > 30`
- [ ] Self-Plagiarism excerpt cards show locale-formatted `checkedAt` date text
- [ ] `Run External Scan` resets `copyleaksResult` and `copyleaksScanId` before starting a new request
- [ ] External source scan posts `{ action: "scan", text: inputText }` to `/api/copyleaks`
- [ ] A `503` Copyleaks response sets `copyleaksAvailable = false` and shows the configuration message
- [ ] Non-503 non-OK Copyleaks scan failures fail silently and return the section to its idle button state
- [ ] After a scan starts successfully, the page stores `scanId` and marks Copyleaks as available
- [ ] Copyleaks polling starts immediately after `scanId` is set and repeats every 5 seconds
- [ ] Copyleaks polling stops automatically when status becomes `completed` or `error`
- [ ] Copyleaks polling errors are swallowed and do not surface to the UI
- [ ] Completed Copyleaks results render score text, a color-coded progress bar, and source cards
- [ ] Copyleaks completed state with zero sources shows `No matching sources found.`
- [ ] Copyleaks source title links open in a new tab and are truncated to roughly 70% width of the row
- [ ] Copyleaks `error` status does not show a dedicated error message; the section falls back to the idle button on the next render branch
- [ ] Writing Quality metric cards always render Passive Voice, Avg Words/Sentence, and Grade blocks
- [ ] Readability and average-sentence-length values are formatted with `toFixed(1)`
- [ ] Writing suggestions section is hidden when `result.writingQuality.suggestions.length === 0`
- [ ] Download Report posts the current `result`, `inputText`, and optional `documentTitle` to `/api/integrity-check/report`
- [ ] Downloaded filename format is `integrity-report-YYYY-MM-DD.md`
- [ ] Download failures fail silently with no toast or inline error
- [ ] Switching to the History tab triggers a fresh fetch from `/api/integrity-check/history?limit=20`
- [ ] History tab shows a centered spinner while `historyLoading` is true
- [ ] History empty state reads `No integrity checks found. Run your first check to see history here.`
- [ ] History sparkline is rendered only when at least 2 history entries exist
- [ ] History sparkline plots `aiScore ?? 50` for each reversed history entry
- [ ] History row word count falls back to `? words` when `wordCount` is null
- [ ] History engine pill renders only when `h.engine` is truthy
- [ ] History AI score uses orange text above 50 and green text otherwise
- [ ] History plagiarism score uses red text above 15 and green text otherwise
- [ ] Route-level `loading.tsx` renders a back-button skeleton, title skeleton, one large content skeleton, and a footer row with word-count/button skeletons
- [ ] Route-level error boundary title reads `Integrity check unavailable`
- [ ] Route-level error boundary message reads `We couldn't load the compliance tools. Please try again.`

### Actual Current Behavior Corrections
- [ ] Switching source mode to `Paste Text` does not clear the current text; it keeps whatever was already loaded into `inputText`
- [ ] Realtime integrity scoring uses the human-score percentage from the AI detector, not a separate AI-risk metric
- [ ] Realtime integrity errors are currently silent in the page UI
- [ ] `Check New Text` is a partial reset and does not restore the source-mode selection to `From Document`
- [ ] Copyleaks scan failures other than `503` do not show a dedicated error state in the current implementation
- [ ] History entries are read-only summaries; the current page does not let the user reopen or diff a historical report
