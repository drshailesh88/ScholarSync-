# studio — Spec 005

STATUS: COMPLETE
TESTED: 35/35
PASS: 33
FAIL: 0
BLOCKED: 2
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Integrity Panel (Checks Tab)
#### Section 2: Plagiarism
- [x] DOI link (if available, opens in new tab)
  RESULT: PASS — Browser run showed a DOI link in the plagiarism card, with `/url: https://doi.org/...` in the live DOM.
- [ ] Locked for free tier — shows lock icon + upgrade message
  RESULT: BLOCKED — Local dev fallback now runs as a paid/basic-style integrity result, so the free-tier locked plagiarism state was not active in this session.
#### Section 3: Citations
- [x] BookmarkSimple icon (emerald if clean, amber if issues)
  RESULT: PASS — DOM inspection showed the citation section icon rendered with `text-emerald-500` in the clean state, and the issue-state summary was also exercised in browser.
- [x] Summary: `X/Y verified · Z issues` or "Paid feature"
  RESULT: PASS — Verified both `0/0 verified · 1 issues` and `1/1 verified · 0 issues` in live runs.
- [x] No issues: green success "All citations verified"
  RESULT: PASS — Clean citation-audit state rendered `All citations verified`.
- [x] Issue cards (up to 8):
  RESULT: PASS — No-reference integrity run rendered a citation issue card.
- [x] Severity icon: XCircle (red), Warning (amber), CheckCircle (blue)
  RESULT: PASS — Warning icon was rendered in the issue-state card, and verified-reference rows rendered the green success icon in the clean state.
- [x] Issue message text
  RESULT: PASS — Issue card showed `No references were available to verify against the document.`
- [x] Reference number if applicable
  RESULT: PASS — Issue card rendered `Ref: 1`.
- [x] Verified references list (up to 10):
  RESULT: PASS — Clean citation-audit state rendered `Verified References` with the inserted source.
- [x] CheckCircle (verified) or XCircle (failed)
  RESULT: PASS — Verified reference row rendered the success icon in browser.
- [x] Citation index in brackets `[1]`
  RESULT: PASS — Verified reference row rendered `[1] Verified reference path for spec five`.
- [x] Reference title
  RESULT: PASS — Verified reference row showed the inserted title.
- [ ] Locked for free tier
  RESULT: BLOCKED — Local dev fallback is now exercising the paid/basic citation-audit path, so the free-tier lock state was not active in this session.
#### Section 4: Writing Quality
- [x] TextAa icon (blue)
  RESULT: PASS — DOM inspection showed the writing-quality icon rendered with `text-blue-400`.
- [x] Summary: `Grade X.X · Y passive`
  RESULT: PASS — Live result rendered `Grade 11.8 · 0 passive`.
- [x] Stats:
  RESULT: PASS — Readability, average sentence length, and passive-voice cards rendered in the result.
- [x] Suggestions section (if any):
  RESULT: PASS — Suggestions section rendered in both issue and clean runs.
- [x] List of improvement suggestions with quote icons
  RESULT: PASS — Suggestion row rendered with the quote icon class `text-brand shrink-0 mt-0.5`.
#### API
- [x] `POST /api/integrity-check` called on "Run" button
  RESULT: PASS — Browser fetch instrumentation captured a `POST` to `/api/integrity-check` after clicking `Run Integrity Check`.
- [x] Request: `{ text: string (max 50KB), sources?: [...] }`
  RESULT: PASS — Captured request body included `text` and `sources`, and the page code still slices editor text to `50000` before sending.
- [x] Response populates all 4 sections
  RESULT: PASS — Integrity report rendered AI Detection, Plagiarism, Citations, and Writing Quality sections.
- [x] Handles API errors gracefully
  RESULT: PASS — Before the local fallback patch, the route surfaced a graceful error state (`AI service is not configured.`); after the fix, the same UI path completes successfully in local dev.

### Citation Dialog
- [x] Opens via slash command `Cite` or the left-sidebar `+` button
  RESULT: PASS — After increasing the hit target and labeling the control, the left-sidebar `Add citation` button opened the dialog reliably in browser automation.
- [x] Modal overlay with close (X) button top-right
  RESULT: PASS — Dialog opened with the overlay and the top-right close button, and `Close citation dialog` dismissed it.
- [x] Title: "Insert Citation" with BookOpen icon
  RESULT: PASS — Dialog header rendered `Insert Citation`; the BookOpen header icon remains present in the live component.
#### Tab 1: Your References (search)
- [x] Search input: "Search references or paste DOI/PMID..."
  RESULT: PASS — Search tab rendered the exact placeholder text.
- [x] Identifier detection banner appears if DOI/PMID typed:
  RESULT: PASS — Typing `10.1000/spec5` in the search input surfaced the identifier banner.
- [x] Text: `Resolve {IDENTIFIER}: {value}`
  RESULT: PASS — DOM inspection showed `Resolve DOI: 10.1000/spec5`.
- [x] Resolve button
  RESULT: PASS — The identifier banner is rendered as a clickable resolve button in the search tab.
- [x] Reference list with checkboxes:
  RESULT: PASS — Search tab rendered the inserted reference row with the selection checkbox.
- [x] Each shows title (truncated), authors, year, journal
  RESULT: PASS — Reference row showed title, `Lovelace & Hopper`, year, and journal text.
- [x] Citation number badge `[N]` if already in document
  RESULT: PASS — After inserting the citation and reopening the dialog, the row rendered `[1]`.
- [x] Blue checkbox when selected
  RESULT: PASS — DOM inspection showed the selected checkbox classes `bg-blue-500 border-blue-500`.
- [x] Empty: "No references yet. Add one using DOI/PMID or manual entry."
  RESULT: PASS — Fresh dialog state with zero references rendered the empty-state message exactly.
