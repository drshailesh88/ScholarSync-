# poster — Spec 015

STATUS: PASS
TESTED: 19/19
PASS: 19
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### API Route Implementation Details
- [x] PASS: `projectId` is validated as `z.number().int().positive().optional()` (must be a positive integer if provided)
#### ProgressItem & Success Icon Details
- [x] PASS: ProgressItem loading state text uses `text-brand` color
- [x] PASS: ProgressItem done state text uses `text-ink` color
- [x] PASS: ProgressItem error state text uses `text-red-500` color
- [x] PASS: ProgressItem pending state text uses `text-ink-muted` color
- [x] PASS: ProgressItem done state `Check` icon uses `weight="bold"` with `text-green-500`
- [x] PASS: Generation success banner `Check` icon uses `weight="bold"`
#### Error Message Exact Strings
- [x] PASS: Non-OK preprocess HTTP response throws `"Preprocessing failed"`
- [x] PASS: Missing response body reader throws `"No response body"`
- [x] PASS: Non-OK generate HTTP response throws `"Poster generation failed"`
- [x] PASS: Preprocess catch fallback error message is `"Preprocessing failed"`
- [x] PASS: Generate catch fallback error message is `"Generation failed"`
#### POSTER_SIZES pdfPoints Dimensions
- [x] PASS: Each poster size in `POSTER_SIZES` defines a `pdfPoints` object with `width` and `height` in PDF point units
- [x] PASS: `a0_portrait` pdfPoints: width 2384, height 3370
- [x] PASS: `a0_landscape` pdfPoints: width 3370, height 2384
- [x] PASS: `a1_portrait` pdfPoints: width 1684, height 2384
- [x] PASS: `a1_landscape` pdfPoints: width 2384, height 1684
- [x] PASS: `48x36` pdfPoints: width 3456, height 2592
- [x] PASS: `36x24` pdfPoints: width 2592, height 1728
