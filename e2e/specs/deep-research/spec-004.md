# deep-research — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Citations Panel
#### Citation Entries
- [ ] Evidence level badge (colored dot + label)
- [ ] Click citation entry to navigate in report
- [ ] Auto-scroll to highlighted citation
#### Links per Citation
- [ ] Citation-panel rows do not render DOI, PubMed, PDF, or OA links inline
- [ ] DOI / PubMed / PDF links appear only in the tooltip and report references list when the corresponding source fields exist

### Citation Markers & Tooltips
#### Inline Markers
- [ ] `[N]` rendered as superscript blue clickable markers (10px), not anchor links
- [ ] Range expansion: `[5-8]` → `[5]`, `[6]`, `[7]`, `[8]`
- [ ] Comma-separated: `[5,12,30]` → individual markers
- [ ] Click marker scrolls to reference in Citations Panel
#### Tooltip (on Hover)
- [ ] Fixed position (z-50)
- [ ] Shows:
- [ ] Paper title
- [ ] Authors (with "et al." truncation)
- [ ] Journal and year
- [ ] Citation count
- [ ] Evidence badge with study design
- [ ] Abstract (line-clamp-3)
- [ ] Links: DOI, PubMed, PDF
- [ ] Open-access `OA` label
- [ ] Tooltip positions correctly relative to marker
- [ ] Tooltip dismisses on mouse leave

### Evidence Level System
- [ ] Evidence level auto-assigned based on study type keywords
- [ ] Badge shows study design text (if available)
- [ ] Colors consistent across Citations Panel, tooltips, and report

### Export System
#### Markdown Export (.md)
- [ ] Download icon button
- [ ] Downloads as `{topic}_report.md`
- [ ] Contains full markdown report text
#### PDF Export
- [ ] Converts markdown to HTML
- [ ] Calls `POST /api/export/pdf`
- [ ] Downloads as `{topic}_report.pdf`
- [ ] Loading spinner during generation
- [ ] Error state shows red background on failure
#### Copy to Clipboard
- [ ] Converts markdown to rich HTML with inline styles
- [ ] Formatting preserved for Google Docs / Word paste
- [ ] Inline styles include:
