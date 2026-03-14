# deep-research — Spec 005

STATUS: PARTIAL
TESTED: 35/35
PASS: 6
FAIL: 29
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Export System
#### Copy to Clipboard
- [ ] FAIL: Headings: font-size (24–14px), font-weight, margins
- [ ] FAIL: Paragraphs: line-height 1.6, color #333
- [x] PASS: Tables: border-collapse, cell padding, borders (#ccc)
- [ ] FAIL: Blockquotes: 3px left border (#ccc), italic
- [ ] FAIL: Superscript citations: 10px, color #2563eb
- [ ] FAIL: Shows "Copied" confirmation for 2 seconds
- [ ] FAIL: Fallback to plain text on older browsers
#### BibTeX Export (.bib)
- [ ] FAIL: Downloads as `{topic}_references.bib`
- [ ] FAIL: Citation key format: `{firstAuthorFirstSegment}{year}{firstTitleWord}` (lowercase), with fallback `ref{n}`
- [ ] FAIL: Fields: author, title, journal, year, doi, pmid, abstract
- [ ] FAIL: All sources included
#### RIS Export (.ris)
- [x] PASS: Downloads as `{topic}_references.ris`
- [ ] FAIL: Fields: TY, TI, AU (per author), JO, PY, DO, AN, AB, UR, ER
- [ ] FAIL: Compatible with Mendeley / EndNote
- [ ] FAIL: All sources included

### Save to Library
- [x] PASS: Button visible in `done` state header
- [ ] FAIL: States:
- [x] PASS: Calls `POST /api/deep-research/save`
- [x] PASS: Disabled if not logged in or research incomplete
- [ ] FAIL: Error tooltip appears on failure
- [ ] FAIL: Auto-disables after successful save
- [ ] FAIL: Saved session appears in Past Research on next visit

### Open in Studio
- [x] PASS: Export option: "Open in Studio"
- [ ] FAIL: Calls `POST /api/deep-research/open-in-studio`
- [ ] FAIL: Process:
- [ ] FAIL: Redirects to `/studio?projectId={projectId}`
- [ ] FAIL: Loading spinner during creation
- [ ] FAIL: Error state with retry capability

### Legacy Report View
- [ ] FAIL: Fallback for reports without markdown format
- [ ] FAIL: Renders card-based display with sections:

### Research Engine & Backends
#### Multi-Source Search
- [ ] FAIL: PubMed search returns results
- [ ] FAIL: Semantic Scholar search returns results
- [ ] FAIL: OpenAlex search returns results
- [ ] FAIL: Results deduplicated across sources
#### Citation Graph Traversal
- [ ] FAIL: Forward citations fetched via Semantic Scholar API
