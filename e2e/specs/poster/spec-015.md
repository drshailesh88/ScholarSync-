# poster — Spec 015

STATUS: PENDING
TESTED: 0/19
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Error Handling & Edge Cases
#### API Route Implementation Details
- [ ] `projectId` is validated as `z.number().int().positive().optional()` (must be a positive integer if provided)
#### ProgressItem & Success Icon Details
- [ ] ProgressItem loading state text uses `text-brand` color
- [ ] ProgressItem done state text uses `text-ink` color
- [ ] ProgressItem error state text uses `text-red-500` color
- [ ] ProgressItem pending state text uses `text-ink-muted` color
- [ ] ProgressItem done state `Check` icon uses `weight="bold"` with `text-green-500`
- [ ] Generation success banner `Check` icon uses `weight="bold"`
#### Error Message Exact Strings
- [ ] Non-OK preprocess HTTP response throws `"Preprocessing failed"`
- [ ] Missing response body reader throws `"No response body"`
- [ ] Non-OK generate HTTP response throws `"Poster generation failed"`
- [ ] Preprocess catch fallback error message is `"Preprocessing failed"`
- [ ] Generate catch fallback error message is `"Generation failed"`
#### POSTER_SIZES pdfPoints Dimensions
- [ ] Each poster size in `POSTER_SIZES` defines a `pdfPoints` object with `width` and `height` in PDF point units
- [ ] `a0_portrait` pdfPoints: width 2384, height 3370
- [ ] `a0_landscape` pdfPoints: width 3370, height 2384
- [ ] `a1_portrait` pdfPoints: width 1684, height 2384
- [ ] `a1_landscape` pdfPoints: width 2384, height 1684
- [ ] `48x36` pdfPoints: width 3456, height 2592
- [ ] `36x24` pdfPoints: width 2592, height 1728
