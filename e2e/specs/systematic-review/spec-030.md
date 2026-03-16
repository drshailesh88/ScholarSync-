# systematic-review — Spec 030

STATUS: PARTIAL
TESTED: 35/35
PASS: 3
FAIL: 32
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Screening PDF Viewer — Full Component Details
- [ ] FAIL: Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason
- [x] PASS: 11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`
- [ ] FAIL: Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`
- [ ] FAIL: Exclusion reason format when free text provided: `{dropdown}: {freeText}`
- [ ] FAIL: `Confirm Exclusion` button in red (bg-red-500)
- [ ] FAIL: AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`
- [ ] FAIL: AI decision badge color-coded same as screening decisions (emerald/red/amber)
- [ ] FAIL: AI decision text: `Decision: {aiDecision}`
- [ ] FAIL: Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`
- [ ] FAIL: Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)
- [ ] FAIL: Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || "p."}{pageNumber ?? "?"}` label text with no inserted separator
- [ ] FAIL: High-relevance passages: label `High-relevance passages` with Highlighter icon
- [ ] FAIL: High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown
- [ ] FAIL: Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling
- [ ] FAIL: Chunk text preview truncated at 150 characters
- [ ] FAIL: Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons
- [ ] FAIL: Paper metadata footer: shows `Previous reason:` when `screeningReason` exists
- [ ] FAIL: Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain
- [ ] FAIL: Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`
- [ ] FAIL: Chunk load failure is silent (does not block viewer)
- [ ] FAIL: PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs
#### API Routes — Undocumented Endpoints
- [ ] FAIL: `GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project
- [ ] FAIL: `POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars
- [ ] FAIL: `PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`
- [ ] FAIL: `PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400
- [ ] FAIL: `DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param
- [ ] FAIL: Alerts POST/GET verify project ownership via user_id check; returns 404 if not found
- [ ] FAIL: `GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project
- [x] PASS: `POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction
- [ ] FAIL: `GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references
- [x] PASS: `POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers
- [ ] FAIL: `POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`
- [ ] FAIL: `GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers
- [ ] FAIL: `GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files
- [ ] FAIL: `POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing
