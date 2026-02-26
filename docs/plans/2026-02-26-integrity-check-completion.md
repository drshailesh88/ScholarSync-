# Integrity Check System Completion Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the broken Compliance page and build all missing integrity features (humanize, paraphrase, report export, history, self-plagiarism, sentence-level highlights, side-by-side diff) to make ScholarSync's integrity system market-leading.

**Architecture:** The integrity system has three working backend engines (AI detection with Binoculars, plagiarism via shingling+MinHash, citation audit). The Compliance page (`/compliance`) is the main UI but crashes because it expects a flat response shape while the API returns a nested `IntegrityCheckResult`. We fix the page to consume the real API, then add the missing features as new API routes and UI components.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, Tailwind CSS, Drizzle ORM (PostgreSQL), Anthropic Claude API (ai-sdk), Phosphor Icons, Replicate API.

---

## Task 1: Fix Compliance Page — Wire to Real API Response

**Files:**
- Modify: `src/app/(app)/compliance/page.tsx`

**What's broken:** The page defines a local `IntegrityResult` interface with `paragraphAnalysis` and `plagiarismIndicators` fields. The API returns `IntegrityCheckResult` with `aiDetection.paragraphs` and `plagiarism.matches`. Line 412 crashes: `result.paragraphAnalysis.find(...)`.

**Step 1:** Replace the local `IntegrityResult` interface with the real `IntegrityCheckResult` import from `@/lib/integrity/types`. Update all field references:

| Old (broken) | New (correct) |
|---|---|
| `result.humanScore` | `result.aiDetection.humanScore` |
| `result.aiScore` | `result.aiDetection.aiScore` |
| `result.overallRisk` | `result.aiDetection.overallRisk` |
| `result.paragraphAnalysis` | `result.aiDetection.paragraphs` |
| `result.plagiarismIndicators` | `result.plagiarism?.matches ?? []` |
| `result.writingQuality` | `result.writingQuality` (same) |

Also map plagiarism match shape: `PlagiarismMatch` has `excerpt`, `source`, `similarity`, `severity` — adapt the JSX to render `match.source.title` instead of `match.concern`, and `(match.similarity * 100).toFixed(0) + "% match"` for the score.

**Step 2:** Add the Citation Audit section to the results panel (it's in the API but the compliance page never renders it). Add a new `<section>` between Plagiarism and Writing Quality showing `result.citationAudit?.issues` and `result.citationAudit?.verifiedReferences`.

**Step 3:** Add engine badge — show "Binoculars" or "LLM Heuristic" next to the AI score based on `result.aiDetection.engine`.

**Step 4:** Verify in browser — paste text, run check, confirm results render without crash.

**Step 5:** Commit: `fix: wire compliance page to real IntegrityCheckResult API shape`

---

## Task 2: Implement "Humanize Text" API + UI

**Files:**
- Create: `src/app/api/integrity-check/humanize/route.ts`
- Modify: `src/app/(app)/compliance/page.tsx` (wire button)

**Step 1:** Create the humanize API route. It accepts `{ text: string, paragraphIndex: number }` and uses Claude to rewrite the paragraph in a more human style while preserving meaning:

```typescript
// POST /api/integrity-check/humanize
// Request: { text: string, context?: string }
// Response: { rewritten: string, changes: string[] }
```

Use `generateObject` with the small model. System prompt: "Rewrite this academic paragraph to sound more naturally human-written. Vary sentence lengths, reduce hedging phrases, use active voice where appropriate, and maintain academic rigor. Do NOT change the meaning or remove citations."

**Step 2:** Wire the "Humanize Text" button in the compliance page. On click, call the API with the paragraph text. Show a loading spinner on the button, then display the rewritten text in a diff-style view below the paragraph (original strikethrough, rewritten in green).

**Step 3:** Add a "Copy" button and "Apply" button to accept the rewrite.

**Step 4:** Verify in browser — flag a paragraph, click Humanize, see rewrite.

**Step 5:** Commit: `feat: add humanize text API and wire to compliance page`

---

## Task 3: Implement "Paraphrase" for Plagiarism Matches

**Files:**
- Create: `src/app/api/integrity-check/paraphrase/route.ts`
- Modify: `src/app/(app)/compliance/page.tsx` (wire button)

**Step 1:** Create the paraphrase API route. Accepts `{ text: string, sourceTitle: string, sourceDoi?: string }`. Uses Claude to rewrite the passage to reduce similarity while citing the source properly:

```typescript
// POST /api/integrity-check/paraphrase
// Request: { text: string, sourceTitle: string, sourceDoi?: string }
// Response: { paraphrased: string, citationSuggestion: string }
```

System prompt: "Rewrite this passage to express the same ideas in original language. Add a proper citation to the source. The goal is to reduce plagiarism similarity while maintaining academic integrity."

**Step 2:** Wire the "Paraphrase" button in the plagiarism match cards. On click, call API with the matched excerpt and source info. Display result inline.

**Step 3:** Wire the "Add Citation" button — generate a citation string from the source metadata and copy to clipboard.

**Step 4:** Verify in browser.

**Step 5:** Commit: `feat: add paraphrase and citation suggestion for plagiarism matches`

---

## Task 4: Implement "Download Report" Export

**Files:**
- Create: `src/app/api/integrity-check/report/route.ts`
- Modify: `src/app/(app)/compliance/page.tsx` (wire button)

**Step 1:** Create the report API route. Accepts the full `IntegrityCheckResult` as POST body and returns a formatted Markdown report:

```typescript
// POST /api/integrity-check/report
// Request: { result: IntegrityCheckResult, documentTitle?: string, text: string }
// Response: text/markdown body (downloadable)
```

The report includes:
- Header with document title, date, overall scores
- AI Detection section: human score, engine used, per-paragraph breakdown
- Plagiarism section: similarity score, matched sources table
- Citation Audit section: verified/unverified counts, issues list
- Writing Quality section: readability, passive voice, suggestions

**Step 2:** Wire the "Download Report" button. On click, POST to the API, receive markdown, trigger browser download as `.md` file. Also add a "Download PDF" option that generates a simple HTML-to-PDF via `window.print()` with a print-optimized stylesheet.

**Step 3:** Verify — run check, click download, confirm file downloads with correct content.

**Step 4:** Commit: `feat: add integrity report export as Markdown and PDF`

---

## Task 5: Integrity Check History API + UI

**Files:**
- Create: `src/app/api/integrity-check/history/route.ts`
- Modify: `src/app/(app)/compliance/page.tsx` (add history tab)
- Modify: `src/app/api/integrity-check/route.ts` (always persist results)

**Step 1:** Modify the main integrity-check route to ALWAYS persist results (currently only persists when `projectId` is provided). Generate a projectId-less save path: store with `userId` field added to `integrityChecks` or create a lightweight `integrity_check_logs` approach using the existing table with nullable projectId.

**Step 2:** Create history API route:

```typescript
// GET /api/integrity-check/history?limit=20&offset=0
// Response: { checks: Array<{ id, createdAt, humanScore, aiScore, plagiarismScore, wordCount, engine }>, total: number }
```

**Step 3:** Add a "History" tab/toggle to the Compliance page header. When active, show a list of past checks with date, scores, and word count. Clicking a row loads that result.

**Step 4:** Add a sparkline or trend chart showing AI score over time (simple SVG, no library needed).

**Step 5:** Verify in browser — run 2-3 checks, switch to history, see them listed.

**Step 6:** Commit: `feat: add integrity check history with trend visualization`

---

## Task 6: Self-Plagiarism Detection

**Files:**
- Create: `src/lib/integrity/self-plagiarism.ts`
- Modify: `src/lib/integrity/index.ts` (add to orchestrator)
- Modify: `src/lib/integrity/types.ts` (add types)
- Modify: `src/app/api/integrity-check/route.ts` (pass userId)
- Modify: `src/app/(app)/compliance/page.tsx` (render results)

**Step 1:** Create `self-plagiarism.ts`. It queries the user's previous `integrityChecks` entries from the DB, extracts their `contentChecked` text, and runs shingling comparison against the current text:

```typescript
export async function runSelfPlagiarismCheck(
  text: string,
  userId: string,
): Promise<SelfPlagiarismResult>
```

Reuse the existing `createShingles`, `computeMinHash`, `estimateJaccard` functions from `plagiarism-engine.ts` — extract them into a shared `shingling-utils.ts` if needed.

**Step 2:** Add `SelfPlagiarismResult` to types:

```typescript
export interface SelfPlagiarismResult {
  selfSimilarityScore: number;
  matchedDocuments: Array<{
    checkId: number;
    checkedAt: string;
    similarity: number;
    excerpt: string;
  }>;
}
```

**Step 3:** Add to orchestrator — run in parallel with other engines. Only run for paid users.

**Step 4:** Add UI section in compliance page between plagiarism and citations.

**Step 5:** Commit: `feat: add self-plagiarism detection against user's prior documents`

---

## Task 7: Sentence-Level Highlighting

**Files:**
- Modify: `src/lib/integrity/ai-detection.ts` (add sentence-level data)
- Modify: `src/lib/integrity/types.ts` (add sentence type)
- Modify: `src/app/(app)/compliance/page.tsx` (render sentence highlights)

**Step 1:** Add sentence-level data to the AI detection output. In `runLLMHeuristicDetection`, after getting paragraph results, split each flagged paragraph into sentences and assign the paragraph's score to each sentence. Add to `AIParagraphResult`:

```typescript
sentences?: Array<{
  text: string;
  startOffset: number;
  endOffset: number;
}>;
```

**Step 2:** Update the compliance page text display to render individual sentences with color-coded backgrounds instead of entire paragraphs. Use `<mark>` elements with severity-based colors:
- `humanProbability < 30`: red highlight (`bg-red-500/15`)
- `humanProbability 30-60`: amber highlight (`bg-amber-500/10`)
- `humanProbability > 60`: no highlight

**Step 3:** Add hover tooltips on highlighted sentences showing the probability and flags.

**Step 4:** Verify — run check, see individual sentences highlighted.

**Step 5:** Commit: `feat: add sentence-level highlighting to compliance page`

---

## Task 8: Side-by-Side Diff View

**Files:**
- Create: `src/components/integrity/DiffView.tsx`
- Modify: `src/app/(app)/compliance/page.tsx` (add diff toggle)

**Step 1:** Create a `DiffView` component that shows original text on the left and annotated text on the right. The right side shows:
- AI-detected passages with orange/red underlines
- Plagiarism-matched passages with red background
- Citation issues with warning icons inline

**Step 2:** Add a "Split View" / "Inline View" toggle to the compliance page header. Default is inline (current), split shows the DiffView.

**Step 3:** The diff view uses a scrollable two-column layout with synced scrolling (both panels scroll together).

**Step 4:** Commit: `feat: add side-by-side diff view for integrity results`

---

## Task 9: Real-Time Integrity Checking

**Files:**
- Create: `src/hooks/useRealtimeIntegrity.ts`
- Modify: `src/app/(app)/compliance/page.tsx` (add realtime toggle)

**Step 1:** Create a custom hook `useRealtimeIntegrity` that debounces text changes (2-second delay) and runs a lightweight AI-detection-only check (no plagiarism/citation — too slow for realtime):

```typescript
export function useRealtimeIntegrity(text: string, enabled: boolean) {
  // Returns: { score: number | null, loading: boolean }
  // Debounces text, calls /api/integrity-check with mode="ai_detection"
  // Only fires when text > 100 chars and changes significantly
}
```

**Step 2:** Add a "Live Check" toggle switch to the compliance page. When enabled, show a small floating indicator with the current AI score that updates as the user types in paste mode.

**Step 3:** Ensure the realtime check cancels in-flight requests when text changes (use AbortController).

**Step 4:** Commit: `feat: add real-time AI detection with debounced checking`

---

## Task 10: Final Integration & Playwright Verification

**Files:**
- Modify: `src/app/(app)/compliance/page.tsx` (polish)

**Step 1:** Final UI polish — ensure all sections have consistent spacing, loading states, and error handling.

**Step 2:** Run full Playwright test:
1. Navigate to `/compliance`
2. Switch to "Paste Text" mode
3. Paste sample academic text (the CRISPR text from earlier)
4. Click "Run Integrity Check"
5. Verify results render: AI score gauge, paragraph breakdown, plagiarism section, citation section, writing quality
6. Click "Humanize Text" on a flagged paragraph
7. Click "Download Report"
8. Switch to History tab, verify past checks visible
9. Take screenshot of final state

**Step 3:** Commit: `feat: complete integrity check system — all 10 features implemented`

---

## Execution Dependencies

```
Task 1 (fix compliance page) ← MUST be first, everything depends on it
Task 2 (humanize) ← independent after Task 1
Task 3 (paraphrase) ← independent after Task 1
Task 4 (report export) ← independent after Task 1
Task 5 (history) ← independent after Task 1
Task 6 (self-plagiarism) ← depends on Task 5 (needs history data)
Task 7 (sentence highlights) ← independent after Task 1
Task 8 (diff view) ← depends on Task 7 (needs sentence data)
Task 9 (realtime) ← independent after Task 1
Task 10 (final test) ← depends on ALL above
```

**Parallelizable after Task 1:** Tasks 2, 3, 4, 5, 7, 9 are all independent.
