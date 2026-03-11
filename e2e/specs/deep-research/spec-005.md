# deep-research — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/deep-research
MODULE: deep-research

---
### Export System
#### Copy to Clipboard
- [ ] Headings: font-size (24–14px), font-weight, margins
- [ ] Paragraphs: line-height 1.6, color #333
- [ ] Tables: border-collapse, cell padding, borders (#ccc)
- [ ] Blockquotes: 3px left border (#ccc), italic
- [ ] Superscript citations: 10px, color #2563eb
- [ ] Shows "Copied" confirmation for 2 seconds
- [ ] Fallback to plain text on older browsers
#### BibTeX Export (.bib)
- [ ] Downloads as `{topic}_references.bib`
- [ ] Citation key format: `{firstAuthorFirstSegment}{year}{firstTitleWord}` (lowercase), with fallback `ref{n}`
- [ ] Fields: author, title, journal, year, doi, pmid, abstract
- [ ] All sources included
#### RIS Export (.ris)
- [ ] Downloads as `{topic}_references.ris`
- [ ] Fields: TY, TI, AU (per author), JO, PY, DO, AN, AB, UR, ER
- [ ] Compatible with Mendeley / EndNote
- [ ] All sources included

### Save to Library
- [ ] Button visible in `done` state header
- [ ] States:
- [ ] Calls `POST /api/deep-research/save`
- [ ] Disabled if not logged in or research incomplete
- [ ] Error tooltip appears on failure
- [ ] Auto-disables after successful save
- [ ] Saved session appears in Past Research on next visit

### Open in Studio
- [ ] Export option: "Open in Studio"
- [ ] Calls `POST /api/deep-research/open-in-studio`
- [ ] Process:
- [ ] Redirects to `/studio?projectId={projectId}`
- [ ] Loading spinner during creation
- [ ] Error state with retry capability

### Legacy Report View
- [ ] Fallback for reports without markdown format
- [ ] Renders card-based display with sections:

### Research Engine & Backends
#### Multi-Source Search
- [ ] PubMed search returns results
- [ ] Semantic Scholar search returns results
- [ ] OpenAlex search returns results
- [ ] Results deduplicated across sources
#### Citation Graph Traversal
- [ ] Forward citations fetched via Semantic Scholar API
