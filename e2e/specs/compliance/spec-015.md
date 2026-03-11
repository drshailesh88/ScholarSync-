# compliance — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Quick Test Workflows
#### IntegrityPanel — Additional Details (`src/components/integrity/IntegrityPanel.tsx`)
- [ ] IntegrityPanel writing suggestions use `Quotes` icon (10px, brand) as bullet prefix instead of `border-l` styling
- [ ] CollapsibleSection locked upgrade text reads `"Upgrade to unlock →"` with arrow symbol
- [ ] IntegrityPanel CircularGauge label is `"Human Score"` (main page derives label from `overallRisk` as Low/Moderate/High Risk)
- [ ] IntegrityPanel Plagiarism section icon color: `similarityScore < 15` → emerald, `< 30` → amber, `>= 30` → red-400
- [ ] IntegrityPanel Citations section icon color: `issues.length === 0` → emerald, otherwise → amber
- [ ] IntegrityPanel Plagiarism summary format: `"{similarityScore}% similar · {matches.length} sources"` when available, `"Paid feature"` when null
- [ ] IntegrityPanel Citations summary format: `"{verified}/{total} verified · {issues.length} issues"` when available, `"Paid feature"` when null
#### loading.tsx (`src/app/(app)/compliance/loading.tsx`)
- [ ] Uses `Skeleton` component imported from `@/components/ui/skeleton`
- [ ] Layout matches main page height: `h-[calc(100vh-7rem)]`
- [ ] Header row: back-button skeleton `h-8 w-8 rounded-lg`, title skeleton `h-6 w-36`
- [ ] Content area: single skeleton `flex-1 rounded-2xl` filling remaining height
- [ ] Footer row: word-count skeleton `h-4 w-20` (left), button skeleton `h-12 w-44 rounded-xl` (right)
#### error.tsx (`src/app/(app)/compliance/error.tsx`)
- [ ] Uses `ErrorDisplay` component from `@/components/ui/error-display`
- [ ] Passes `error` object and `reset` function (as `onRetry`) to `ErrorDisplay`
- [ ] Title: `"Integrity check unavailable"` — Message: `"We couldn't load the compliance tools. Please try again."`
#### Batch API Route — Additional Details (`/api/integrity-check/batch`)
- [ ] Batch name defaults to `Batch ${new Date().toLocaleDateString()}` when `name` field is absent from form data
- [ ] Batch processing uses hardcoded `plan: "pro"` for all files regardless of user's actual plan
- [ ] Extracted text under 50 characters treated as failure with same scanned-PDF error message
- [ ] Batch GET returns 400 with `"Batch ID required"` when `?id=` param is missing
- [ ] Batch GET returns 400 with `"Invalid batch ID"` when `?id=` is not a valid integer
- [ ] Batch GET returns 404 with `"Batch not found"` for non-existent or unauthorized batches (checks `batch.userId !== userId`)
- [ ] Batch GET response shape: `{ batch: { id, name, fileCount, completedCount, status, createdAt }, checks: [{ id, fileName, wordCount, aiScore, plagiarismScore, status, errorMessage, fullResult, createdAt }] }`
- [ ] Batch flaggedPassages filter uses `humanProbability < 40` threshold (differs from main check route's `< 50`)
- [ ] Batch `completedCount` is updated in DB after each file processes (success or failure)
- [ ] Batch overall status set to `"completed"` only after all files have been processed
#### Client-Side Details (additional page.tsx observations)
- [ ] Download report filename uses client-side `new Date().toISOString().slice(0, 10)` — this is the browser's current date, not `result.checkedAt`
- [ ] Copyleaks poll useEffect calls `poll()` immediately once before setting `setInterval(poll, 5000)` — there is no initial 5-second delay
- [ ] Sparkline SVG viewBox width is computed as `Math.max(history.length * 40, 200)` with constant height `60`
- [ ] Sparkline data point x-position formula: `i * 40 + 20`; y-position formula: `60 - (h.aiScore ?? 50) * 0.55`
#### Accessibility Gaps
- [ ] Tab buttons (Check/History) have no `role="tab"` and no `aria-selected` attribute
- [ ] Tab content areas have no `role="tabpanel"` attribute
- [ ] Source mode buttons (From Document / Paste Text) have no `role` or `aria` attributes
- [ ] View mode buttons (Inline / Split) have no `role` or `aria` attributes
- [ ] No `aria-live` region for dynamic content changes (results loading, error messages, score updates)
- [ ] No screen reader announcement when check completes or fails
