# compliance — Spec 003

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Split / Diff View
#### Highlighting Rules
- [ ] Text rendered in `font-serif` with relaxed leading

### Report Panel — AI Content Detection
#### Header
- [ ] **Title** — "AI Content Detection"
- [ ] **Engine label** — "Binoculars + LLM" or "LLM Heuristic" in `text-[10px] text-ink-muted`
#### Score Display
- [ ] **CircularGauge** — 110px size, shows `humanScore` value
- [ ] **Gauge label** — "Low Risk", "Moderate Risk", or "High Risk" based on `overallRisk`
- [ ] **Score summary** — "Human: {X}%" left, "AI: {X}%" right
#### Per-Paragraph Breakdown
- [ ] **Header** — "Paragraph {N}" with human probability percentage
- [ ] Probability color:
- [ ] **ProgressBar** — visual bar colored to match probability thresholds
- [ ] **Suggestion** — if present, shown in `text-[10px] text-ink-muted`
- [ ] **Humanize button** — appears for paragraphs with `<40%` human probability (see section 17)

### Report Panel — Plagiarism Check
- [ ] **Section title** — "Plagiarism Check", separated by top border
- [ ] **Similarity score** — percentage, color-coded:
#### Plan Gating
- [ ] **Free tier** — shows amber notice: "Upgrade to a paid plan for plagiarism scanning."
- [ ] **Paid tier with no matches** — "No plagiarism concerns detected across {N} sources."
- [ ] **Paid tier with matches** — shows sources scanned count + match list
#### Match Display (per match)
- [ ] **Similarity percentage** — color-coded by severity (high=red, medium=amber, low=emerald)
- [ ] **Severity badge** — pill with severity label (high/medium/low)
- [ ] **Excerpt** — italic, max 2 lines (`line-clamp-2`)
- [ ] **Source title** — with year if available
- [ ] **DOI link** — `text-brand`, opens in new tab via `https://doi.org/{doi}`
- [ ] **"Add Citation" button** — BookOpen icon (12px), copies formatted citation to clipboard
- [ ] **"Paraphrase" button** — PenNib icon (12px), triggers AI paraphrase (see section 18)

### Report Panel — Citation Audit
- [ ] **Section title** — "Citation Audit", separated by top border
- [ ] **Verified count** — "{verified}/{total} verified" in `text-xs text-ink-muted`
#### Results Display
- [ ] **All verified** — "All citations verified successfully." in emerald
- [ ] **Issues list** — up to 8 issues displayed

### Report Panel — Self-Plagiarism
- [ ] **Section title** — "Self-Plagiarism", separated by top border
- [ ] **Overlap score** — percentage, color-coded:
#### Matched Documents
- [ ] **Date** — `toLocaleDateString()` in `text-[10px] text-ink-muted`
- [ ] **Similarity** — percentage in amber, `text-xs font-medium`
- [ ] **Excerpt** — italic, max 2 lines (`line-clamp-2`)

### Report Panel — External Source Matching (Copyleaks)
- [ ] **Section title** — "External Source Matching", separated by top border
#### Completed Results
- [ ] **Score** — percentage, color-coded (>30% red, >10% amber, otherwise emerald)
- [ ] **ProgressBar** — colored to match score thresholds
