# studio — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Research Tab
#### Research Sidebar
- [ ] Results can be saved to library
- [ ] Papers can be cited directly

### Integrity Panel (Checks Tab)
- [ ] Tab labeled "Checks" in right panel
#### Idle State
- [ ] Shield icon displayed
- [ ] Title: "Integrity Check"
- [ ] Description text explaining the feature
- [ ] "Run Integrity Check" button (brand colored)
#### Running State
- [ ] Spinning circle animation
- [ ] Text: "Analyzing Document..."
- [ ] Subtext: "Running AI detection, plagiarism scan, and citation verification."
#### Error State
- [ ] Warning icon
- [ ] Error message displayed
- [ ] "Retry" button with ArrowClockwise icon
#### Results State
- [ ] Header: "Integrity Report" with "Re-run" button
- [ ] Circular gauge showing Human Score (0–100%)
#### Section 1: AI Detection
- [ ] Robot icon (color by score: emerald ≥80%, amber ≥50%, red <50%)
- [ ] Summary: `{humanScore}% human · {overallRisk} risk`
- [ ] Expandable with chevron
- [ ] Stats grid (2 columns):
- [ ] Flagged Paragraphs (top 5):
- [ ] Paragraph excerpt displayed
- [ ] AI probability percentage shown
- [ ] Flags listed as bullets
- [ ] Suggestion shown if available
- [ ] Available on free tier
#### Section 2: Plagiarism
- [ ] MagnifyingGlass icon (emerald <15%, amber <30%, red ≥30%)
- [ ] Summary: `X% similar · Y sources` or "Paid feature"
- [ ] Expandable section
- [ ] "Scanned Z scholarly sources" text
- [ ] No matches: green success "No significant matches found"
- [ ] Match cards (up to 5):
- [ ] Similarity percentage (colored)
- [ ] Severity badge: high / medium / low
- [ ] Excerpt quote
- [ ] Source title with year
