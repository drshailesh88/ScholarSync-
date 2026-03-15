# deep-research — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Citations Panel
#### Citation Entries
- [x] PASS: Evidence level badge (colored dot + label)
- [x] PASS: Click citation entry to navigate in report
- [x] PASS: Auto-scroll to highlighted citation
#### Links per Citation
- [x] PASS: Citation-panel rows do not render DOI, PubMed, PDF, or OA links inline
- [x] PASS: DOI / PubMed / PDF links appear only in the tooltip and report references list when the corresponding source fields exist

### Citation Markers & Tooltips
#### Inline Markers
- [x] PASS: `[N]` rendered as superscript blue clickable markers (10px), not anchor links
- [x] PASS: Range expansion: `[5-8]` → `[5]`, `[6]`, `[7]`, `[8]`
- [x] PASS: Comma-separated: `[5,12,30]` → individual markers
- [x] PASS: Click marker scrolls to reference in Citations Panel
#### Tooltip (on Hover)
- [x] PASS: Fixed position (z-50)
- [x] PASS: Shows:
- [x] PASS: Paper title
- [x] PASS: Authors (with "et al." truncation)
- [x] PASS: Journal and year
- [x] PASS: Citation count
- [x] PASS: Evidence badge with study design
- [x] PASS: Abstract (line-clamp-3)
- [x] PASS: Links: DOI, PubMed, PDF
- [x] PASS: Open-access `OA` label
- [x] PASS: Tooltip positions correctly relative to marker
- [x] PASS: Tooltip dismisses on mouse leave

### Evidence Level System
- [x] PASS: Evidence level auto-assigned based on study type keywords
- [x] PASS: Badge shows study design text (if available)
- [x] PASS: Colors consistent across Citations Panel, tooltips, and report

### Export System
#### Markdown Export (.md)
- [x] PASS: Download icon button
- [x] PASS: Downloads as `{topic}_report.md`
- [x] PASS: Contains full markdown report text
#### PDF Export
- [x] PASS: Converts markdown to HTML
- [x] PASS: Calls `POST /api/export/pdf`
- [x] PASS: Downloads as `{topic}_report.pdf`
- [x] PASS: Loading spinner during generation
- [x] PASS: Error state shows red background on failure
#### Copy to Clipboard
- [x] PASS: Converts markdown to rich HTML with inline styles
- [x] PASS: Formatting preserved for Google Docs / Word paste
- [x] PASS: Inline styles include:
