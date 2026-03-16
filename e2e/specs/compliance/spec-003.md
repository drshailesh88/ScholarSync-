# compliance — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Split / Diff View
#### Highlighting Rules
- [x] PASS: Text rendered in `font-serif` with relaxed leading

### Report Panel — AI Content Detection
#### Header
- [x] PASS: **Title** — "AI Content Detection"
- [x] PASS: **Engine label** — "Binoculars + LLM" or "LLM Heuristic" in `text-[10px] text-ink-muted`
#### Score Display
- [x] PASS: **CircularGauge** — 110px size, shows `humanScore` value
- [x] PASS: **Gauge label** — "Low Risk", "Moderate Risk", or "High Risk" based on `overallRisk`
- [x] PASS: **Score summary** — "Human: {X}%" left, "AI: {X}%" right
#### Per-Paragraph Breakdown
- [x] PASS: **Header** — "Paragraph {N}" with human probability percentage
- [x] PASS: Probability color:
- [x] PASS: **ProgressBar** — visual bar colored to match probability thresholds
- [x] PASS: **Suggestion** — if present, shown in `text-[10px] text-ink-muted`
- [x] PASS: **Humanize button** — appears for paragraphs with `<40%` human probability (see section 17)

### Report Panel — Plagiarism Check
- [x] PASS: **Section title** — "Plagiarism Check", separated by top border
- [x] PASS: **Similarity score** — percentage, color-coded:
#### Plan Gating
- [x] PASS: **Free tier** — shows amber notice: "Upgrade to a paid plan for plagiarism scanning."
- [x] PASS: **Paid tier with no matches** — "No plagiarism concerns detected across {N} sources."
- [x] PASS: **Paid tier with matches** — shows sources scanned count + match list
#### Match Display (per match)
- [x] PASS: **Similarity percentage** — color-coded by severity (high=red, medium=amber, low=emerald)
- [x] PASS: **Severity badge** — pill with severity label (high/medium/low)
- [x] PASS: **Excerpt** — italic, max 2 lines (`line-clamp-2`)
- [x] PASS: **Source title** — with year if available
- [x] PASS: **DOI link** — `text-brand`, opens in new tab via `https://doi.org/{doi}`
- [x] PASS: **"Add Citation" button** — BookOpen icon (12px), copies formatted citation to clipboard
- [x] PASS: **"Paraphrase" button** — PenNib icon (12px), triggers AI paraphrase (see section 18)

### Report Panel — Citation Audit
- [x] PASS: **Section title** — "Citation Audit", separated by top border
- [x] PASS: **Verified count** — "{verified}/{total} verified" in `text-xs text-ink-muted`
#### Results Display
- [x] PASS: **All verified** — "All citations verified successfully." in emerald
- [x] PASS: **Issues list** — up to 8 issues displayed

### Report Panel — Self-Plagiarism
- [x] PASS: **Section title** — "Self-Plagiarism", separated by top border
- [x] PASS: **Overlap score** — percentage, color-coded:
#### Matched Documents
- [x] PASS: **Date** — `toLocaleDateString()` in `text-[10px] text-ink-muted`
- [x] PASS: **Similarity** — percentage in amber, `text-xs font-medium`
- [x] PASS: **Excerpt** — italic, max 2 lines (`line-clamp-2`)

### Report Panel — External Source Matching (Copyleaks)
- [x] PASS: **Section title** — "External Source Matching", separated by top border
#### Completed Results
- [x] PASS: **Score** — percentage, color-coded (>30% red, >10% amber, otherwise emerald)
- [x] PASS: **ProgressBar** — colored to match score thresholds
