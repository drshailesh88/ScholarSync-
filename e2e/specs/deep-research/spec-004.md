# deep-research — Spec 004

STATUS: PARTIAL
TESTED: 35/35
PASS: 9
FAIL: 26
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Citations Panel
#### Citation Entries
- [x] PASS: Evidence level badge (colored dot + label)
- [ ] FAIL: Click citation entry to navigate in report
- [ ] FAIL: Auto-scroll to highlighted citation
#### Links per Citation
- [ ] FAIL: Citation-panel rows do not render DOI, PubMed, PDF, or OA links inline
- [x] PASS: DOI / PubMed / PDF links appear only in the tooltip and report references list when the corresponding source fields exist

### Citation Markers & Tooltips
#### Inline Markers
- [ ] FAIL: `[N]` rendered as superscript blue clickable markers (10px), not anchor links
- [ ] FAIL: Range expansion: `[5-8]` → `[5]`, `[6]`, `[7]`, `[8]`
- [x] PASS: Comma-separated: `[5,12,30]` → individual markers
- [x] PASS: Click marker scrolls to reference in Citations Panel
#### Tooltip (on Hover)
- [ ] FAIL: Fixed position (z-50)
- [ ] FAIL: Shows:
- [ ] FAIL: Paper title
- [ ] FAIL: Authors (with "et al." truncation)
- [ ] FAIL: Journal and year
- [ ] FAIL: Citation count
- [x] PASS: Evidence badge with study design
- [ ] FAIL: Abstract (line-clamp-3)
- [ ] FAIL: Links: DOI, PubMed, PDF
- [ ] FAIL: Open-access `OA` label
- [ ] FAIL: Tooltip positions correctly relative to marker
- [ ] FAIL: Tooltip dismisses on mouse leave

### Evidence Level System
- [ ] FAIL: Evidence level auto-assigned based on study type keywords
- [ ] FAIL: Badge shows study design text (if available)
- [x] PASS: Colors consistent across Citations Panel, tooltips, and report

### Export System
#### Markdown Export (.md)
- [ ] FAIL: Download icon button
- [x] PASS: Downloads as `{topic}_report.md`
- [x] PASS: Contains full markdown report text
#### PDF Export
- [ ] FAIL: Converts markdown to HTML
- [x] PASS: Calls `POST /api/export/pdf`
- [ ] FAIL: Downloads as `{topic}_report.pdf`
- [ ] FAIL: Loading spinner during generation
- [ ] FAIL: Error state shows red background on failure
#### Copy to Clipboard
- [ ] FAIL: Converts markdown to rich HTML with inline styles
- [ ] FAIL: Formatting preserved for Google Docs / Word paste
- [ ] FAIL: Inline styles include:
