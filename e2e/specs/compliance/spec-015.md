# compliance — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)
- [x] PASS: IntegrityPanel writing suggestions use `Quotes` icon (10px, brand) as bullet prefix instead of `border-l` styling
- [x] PASS: CollapsibleSection locked upgrade text reads `"Upgrade to unlock →"` with arrow symbol
- [x] PASS: IntegrityPanel CircularGauge label is `"Human Score"` (main page derives label from `overallRisk` as Low/Moderate/High Risk)
- [x] PASS: IntegrityPanel Plagiarism section icon color: `similarityScore < 15` → emerald, `< 30` → amber, `>= 30` → red-400
- [x] PASS: IntegrityPanel Citations section icon color: `issues.length === 0` → emerald, otherwise → amber
- [x] PASS: IntegrityPanel Plagiarism summary format: `"{similarityScore}% similar · {matches.length} sources"` when available, `"Paid feature"` when null
- [x] PASS: IntegrityPanel Citations summary format: `"{verified}/{total} verified · {issues.length} issues"` when available, `"Paid feature"` when null
#### loading.tsx (`src/app/(app)/compliance/loading.tsx`)
- [x] PASS: Uses `Skeleton` component imported from `@/components/ui/skeleton`
- [x] PASS: Layout matches main page height: `h-[calc(100vh-7rem)]`
- [x] PASS: Header row: back-button skeleton `h-8 w-8 rounded-lg`, title skeleton `h-6 w-36`
- [x] PASS: Content area: single skeleton `flex-1 rounded-2xl` filling remaining height
- [x] PASS: Footer row: word-count skeleton `h-4 w-20` (left), button skeleton `h-12 w-44 rounded-xl` (right)
#### error.tsx (`src/app/(app)/compliance/error.tsx`)
- [x] PASS: Uses `ErrorDisplay` component from `@/components/ui/error-display`
- [x] PASS: Passes `error` object and `reset` function (as `onRetry`) to `ErrorDisplay`
- [x] PASS: Title: `"Integrity check unavailable"` — Message: `"We couldn't load the compliance tools. Please try again."`
#### Batch API Route — Additional Details (`/api/integrity-check/batch`)
- [x] PASS: Batch name defaults to `Batch ${new Date().toLocaleDateString()}` when `name` field is absent from form data
- [x] PASS: Batch processing uses hardcoded `plan: "pro"` for all files regardless of user's actual plan
- [x] PASS: Extracted text under 50 characters treated as failure with same scanned-PDF error message
- [x] PASS: Batch GET returns 400 with `"Batch ID required"` when `?id=` param is missing
- [x] PASS: Batch GET returns 400 with `"Invalid batch ID"` when `?id=` is not a valid integer
- [x] PASS: Batch GET returns 404 with `"Batch not found"` for non-existent or unauthorized batches (checks `batch.userId !== userId`)
- [x] PASS: Batch GET response shape: `{ batch: { id, name, fileCount, completedCount, status, createdAt }, checks: [{ id, fileName, wordCount, aiScore, plagiarismScore, status, errorMessage, fullResult, createdAt }] }`
- [x] PASS: Batch flaggedPassages filter uses `humanProbability < 40` threshold (differs from main check route's `< 50`)
- [x] PASS: Batch `completedCount` is updated in DB after each file processes (success or failure)
- [x] PASS: Batch overall status set to `"completed"` only after all files have been processed
#### Client-Side Details (additional page.tsx observations)
- [x] PASS: Download report filename uses client-side `new Date().toISOString().slice(0, 10)` — this is the browser's current date, not `result.checkedAt`
- [x] PASS: Copyleaks poll useEffect calls `poll()` immediately once before setting `setInterval(poll, 5000)` — there is no initial 5-second delay
- [x] PASS: Sparkline SVG viewBox width is computed as `Math.max(history.length * 40, 200)` with constant height `60`
- [x] PASS: Sparkline data point x-position formula: `i * 40 + 20`; y-position formula: `60 - (h.aiScore ?? 50) * 0.55`
#### Accessibility Gaps
- [x] PASS: Tab buttons (Check/History) have no `role="tab"` and no `aria-selected` attribute
- [x] PASS: Tab content areas have no `role="tabpanel"` attribute
- [x] PASS: Source mode buttons (From Document / Paste Text) have no `role` or `aria` attributes
- [x] PASS: View mode buttons (Inline / Split) have no `role` or `aria` attributes
- [x] PASS: No `aria-live` region for dynamic content changes (results loading, error messages, score updates)
- [x] PASS: No screen reader announcement when check completes or fails
