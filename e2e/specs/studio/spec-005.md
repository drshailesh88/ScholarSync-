# studio — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Integrity Panel (Checks Tab)
#### Section 2: Plagiarism
- [x] PASS: DOI link (if available, opens in new tab)
- [x] PASS: Locked for free tier — shows lock icon + upgrade message
#### Section 3: Citations
- [x] PASS: BookmarkSimple icon (emerald if clean, amber if issues)
- [x] PASS: Summary: `X/Y verified · Z issues` or "Paid feature"
- [x] PASS: No issues: green success "All citations verified"
- [x] PASS: Issue cards (up to 8):
- [x] PASS: Severity icon: XCircle (red), Warning (amber), CheckCircle (blue)
- [x] PASS: Issue message text
- [x] PASS: Reference number if applicable
- [x] PASS: Verified references list (up to 10):
- [x] PASS: CheckCircle (verified) or XCircle (failed)
- [x] PASS: Citation index in brackets `[1]`
- [x] PASS: Reference title
- [x] PASS: Locked for free tier
#### Section 4: Writing Quality
- [x] PASS: TextAa icon (blue)
- [x] PASS: Summary: `Grade X.X · Y passive`
- [x] PASS: Stats:
- [x] PASS: Suggestions section (if any):
- [x] PASS: List of improvement suggestions with quote icons
#### API
- [x] PASS: `POST /api/integrity-check` called on "Run" button
- [x] PASS: Request: `{ text: string (max 50KB), sources?: [...] }`
- [x] PASS: Response populates all 4 sections
- [x] PASS: Handles API errors gracefully

### Citation Dialog
- [x] PASS: Opens via slash command `Cite` or the left-sidebar `+` button
- [x] PASS: Modal overlay with close (X) button top-right
- [x] PASS: Title: "Insert Citation" with BookOpen icon
#### Tab 1: Your References (search)
- [x] PASS: Search input: "Search references or paste DOI/PMID..."
- [x] PASS: Identifier detection banner appears if DOI/PMID typed:
- [x] PASS: Text: `Resolve {IDENTIFIER}: {value}`
- [x] PASS: Resolve button
- [x] PASS: Reference list with checkboxes:
- [x] PASS: Each shows title (truncated), authors, year, journal
- [x] PASS: Citation number badge `[N]` if already in document
- [x] PASS: Blue checkbox when selected
- [x] PASS: Empty: "No references yet. Add one using DOI/PMID or manual entry."
