# systematic-review — Spec 030

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Screening PDF Viewer — Full Component Details
- [ ] Exclude in full-text mode opens exclusion reason form; in title-abstract mode submits immediately without reason
- [ ] 11 predefined exclusion reasons: `Wrong study design`, `Wrong population`, `Wrong intervention/exposure`, `Wrong comparator`, `Wrong outcome`, `Wrong setting`, `Duplicate`, `Not primary research`, `Not in English`, `Full text unavailable`, `Other`
- [ ] Exclusion form: dropdown selector + free-text textarea with placeholder `Additional details (optional)...`
- [ ] Exclusion reason format when free text provided: `{dropdown}: {freeText}`
- [ ] `Confirm Exclusion` button in red (bg-red-500)
- [ ] AI Assessment section: Robot icon (weight duotone) + heading `AI Assessment`
- [ ] AI decision badge color-coded same as screening decisions (emerald/red/amber)
- [ ] AI decision text: `Decision: {aiDecision}`
- [ ] Relevant Sections heading: Crosshair icon (weight duotone) + `Relevant Sections`
- [ ] Screening reasons shown as bordered cards: inclusion (emerald), exclusion (red)
- [ ] Jump-to-chunk buttons: ArrowFatLineRight icon + `{sectionType || "p."}{pageNumber ?? "?"}` label text with no inserted separator
- [ ] High-relevance passages: label `High-relevance passages` with Highlighter icon
- [ ] High-priority chunks: those with `highlightPriority >= 0.7`, sorted by priority descending, max 8 shown
- [ ] Priority badge: ≥ 0.9 renders in brand styling, < 0.9 in amber styling
- [ ] Chunk text preview truncated at 150 characters
- [ ] Section overview fallback (when no reasons/highlights): `Jump to section:` with section buttons
- [ ] Paper metadata footer: shows `Previous reason:` when `screeningReason` exists
- [ ] Keyboard shortcuts hint: `Esc` Close, `I` Include, `E` Exclude, `U` Uncertain
- [ ] Chunks loaded from `/api/systematic-review/paper-chunks?paperId={}&projectId={}`
- [ ] Chunk load failure is silent (does not block viewer)
- [ ] PDF served via `/api/pdf/serve?path={encodedPath}` for stored PDFs
#### API Routes — Undocumented Endpoints
- [ ] `GET /api/systematic-review/alerts?projectId={id}` — lists search alerts for a project
- [ ] `POST /api/systematic-review/alerts` — creates search alert; Zod validates searchString min 3, max 2000 chars
- [ ] `PUT /api/systematic-review/alerts` — updates alert; action enum: `pause`, `resume`, `update_frequency`, `check_now`
- [ ] `PUT /api/systematic-review/alerts` with `update_frequency` requires `frequency` field or returns 400
- [ ] `DELETE /api/systematic-review/alerts?alertId={id}` — deletes alert by query param
- [ ] Alerts POST/GET verify project ownership via user_id check; returns 404 if not found
- [ ] `GET /api/systematic-review/screening-criteria?projectId={id}` — loads criteria for a project
- [ ] `POST /api/systematic-review/screening-criteria` — replaces all criteria using delete-then-insert transaction
- [ ] `GET /api/systematic-review/export-references?projectId={id}&format={ris|bibtex|endnote|csv}&filter={all|included|excluded}` — exports references
- [ ] `POST /api/systematic-review/manuscript-export` — generates DOCX with academic formatting, section ordering, headers/footers, page numbers
- [ ] `POST /api/systematic-review/pdf-retrieval` — triggers open-access PDF retrieval for specified papers or, when `paperIds` is omitted, all project papers lacking `pdf_storage_path`
- [ ] `GET /api/systematic-review/pdf-retrieval?projectId={id}` — returns retrieval status for all papers
- [ ] `GET /api/systematic-review/revman-export?projectId={id}` — generates RevMan CSV package with 4 files
- [ ] `POST /api/systematic-review/upload` — uploads PDF file, creates paper record, uploads to R2, triggers background processing
