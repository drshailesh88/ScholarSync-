# systematic-review — Spec 003

STATUS: PARTIAL
TESTED: 35/35
PASS: 14
FAIL: 21
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Search Strategy Panel
#### Generate Search Strategy
- [ ] FAIL: **Disabled while loading** — button not clickable during API call
#### Strategy Results
- [ ] FAIL: **Estimated PubMed count** — shows estimated number of results
- [ ] FAIL: **PICO blocks** — each PICO element rendered as a block with terms
- [ ] FAIL: **MeSH terms** — displayed with green color coding within blocks
- [ ] FAIL: **Free-text terms** — displayed with blue color coding within blocks
- [x] PASS: **Full search string** — complete PubMed query string displayed
- [ ] FAIL: **Copy button** — copies the full search string to clipboard
- [ ] FAIL: **Suggested filters** — additional filters shown with amber color coding
#### CTA
- [x] PASS: **"Import Papers Using This Strategy" button** — transitions to import tab with strategy pre-loaded
- [x] PASS: **Tab switch** — clicking the CTA switches active tab to `import`
- [x] PASS: **Strategy carried over** — generated strategy available in import panel

### Paper Import Panel
#### Source Selection
- [x] PASS: **Source toggle/selector** — UI to pick which database to search
- [ ] FAIL: **Multiple sources** — can switch between sources
#### Search Configuration
- [ ] FAIL: **Custom search input** — free-text search query field
- [x] PASS: **Use generated strategy** — option to use the strategy from Search Strategy tab
- [ ] FAIL: **Max results config** — configurable limit (default: 100)
- [ ] FAIL: **Max results input** — numeric input or dropdown for result limit
#### Paper Results
- [ ] FAIL: **Paper list** — results displayed in a scrollable list
- [ ] FAIL: **Expand/collapse** — each paper entry can be expanded for details
- [x] PASS: **Paper metadata** — title, authors, abstract, year, journal
- [x] PASS: **Selection** — papers can be selected/deselected for import
#### PDF Upload
- [ ] FAIL: **PDF upload area** — drag-and-drop or click to upload PDFs
- [x] PASS: **File processing** — uploaded PDFs processed and added to review
#### Duplicate Detection
- [ ] FAIL: **Duplicate detection** — system identifies duplicate papers across sources
- [ ] FAIL: **Duplicate indicators** — duplicates visually flagged
- [ ] FAIL: **Duplicate resolution** — mechanism to keep/remove duplicates
#### API
- [x] PASS: `POST /api/systematic-review/import-references` — imports selected references
- [x] PASS: `GET /api/systematic-review/import-references` — retrieves imported references

### Screening Panel
#### Criteria Management
- [x] PASS: **"Define Inclusion/Exclusion Criteria" button** — Plus icon, opens criteria editor
- [x] PASS: **Inclusion criteria** — list of inclusion rules
- [x] PASS: **Exclusion criteria** — list of exclusion rules
- [ ] FAIL: **Add criteria** — new criteria can be added
- [ ] FAIL: **Edit criteria** — existing criteria editable
- [ ] FAIL: **Delete criteria** — criteria can be removed
#### Screening Modes
- [ ] FAIL: **Mode toggle** — UI to switch between Human, AI, and Compare modes
