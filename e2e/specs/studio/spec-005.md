# studio — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Integrity Panel (Checks Tab)
#### Section 2: Plagiarism
- [ ] DOI link (if available, opens in new tab)
- [ ] Locked for free tier — shows lock icon + upgrade message
#### Section 3: Citations
- [ ] BookmarkSimple icon (emerald if clean, amber if issues)
- [ ] Summary: `X/Y verified · Z issues` or "Paid feature"
- [ ] No issues: green success "All citations verified"
- [ ] Issue cards (up to 8):
- [ ] Severity icon: XCircle (red), Warning (amber), CheckCircle (blue)
- [ ] Issue message text
- [ ] Reference number if applicable
- [ ] Verified references list (up to 10):
- [ ] CheckCircle (verified) or XCircle (failed)
- [ ] Citation index in brackets `[1]`
- [ ] Reference title
- [ ] Locked for free tier
#### Section 4: Writing Quality
- [ ] TextAa icon (blue)
- [ ] Summary: `Grade X.X · Y passive`
- [ ] Stats:
- [ ] Suggestions section (if any):
- [ ] List of improvement suggestions with quote icons
#### API
- [ ] `POST /api/integrity-check` called on "Run" button
- [ ] Request: `{ text: string (max 50KB), sources?: [...] }`
- [ ] Response populates all 4 sections
- [ ] Handles API errors gracefully

### Citation Dialog
- [ ] Opens via slash command `Cite` or the left-sidebar `+` button
- [ ] Modal overlay with close (X) button top-right
- [ ] Title: "Insert Citation" with BookOpen icon
#### Tab 1: Your References (search)
- [ ] Search input: "Search references or paste DOI/PMID..."
- [ ] Identifier detection banner appears if DOI/PMID typed:
- [ ] Text: `Resolve {IDENTIFIER}: {value}`
- [ ] Resolve button
- [ ] Reference list with checkboxes:
- [ ] Each shows title (truncated), authors, year, journal
- [ ] Citation number badge `[N]` if already in document
- [ ] Blue checkbox when selected
- [ ] Empty: "No references yet. Add one using DOI/PMID or manual entry."
