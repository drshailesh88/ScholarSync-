# systematic-review — Spec 003

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Search Strategy Panel
#### Generate Search Strategy
- [ ] **Disabled while loading** — button not clickable during API call
#### Strategy Results
- [ ] **Estimated PubMed count** — shows estimated number of results
- [ ] **PICO blocks** — each PICO element rendered as a block with terms
- [ ] **MeSH terms** — displayed with green color coding within blocks
- [ ] **Free-text terms** — displayed with blue color coding within blocks
- [ ] **Full search string** — complete PubMed query string displayed
- [ ] **Copy button** — copies the full search string to clipboard
- [ ] **Suggested filters** — additional filters shown with amber color coding
#### CTA
- [ ] **"Import Papers Using This Strategy" button** — transitions to import tab with strategy pre-loaded
- [ ] **Tab switch** — clicking the CTA switches active tab to `import`
- [ ] **Strategy carried over** — generated strategy available in import panel

### Paper Import Panel
#### Source Selection
- [ ] **Source toggle/selector** — UI to pick which database to search
- [ ] **Multiple sources** — can switch between sources
#### Search Configuration
- [ ] **Custom search input** — free-text search query field
- [ ] **Use generated strategy** — option to use the strategy from Search Strategy tab
- [ ] **Max results config** — configurable limit (default: 100)
- [ ] **Max results input** — numeric input or dropdown for result limit
#### Paper Results
- [ ] **Paper list** — results displayed in a scrollable list
- [ ] **Expand/collapse** — each paper entry can be expanded for details
- [ ] **Paper metadata** — title, authors, abstract, year, journal
- [ ] **Selection** — papers can be selected/deselected for import
#### PDF Upload
- [ ] **PDF upload area** — drag-and-drop or click to upload PDFs
- [ ] **File processing** — uploaded PDFs processed and added to review
#### Duplicate Detection
- [ ] **Duplicate detection** — system identifies duplicate papers across sources
- [ ] **Duplicate indicators** — duplicates visually flagged
- [ ] **Duplicate resolution** — mechanism to keep/remove duplicates
#### API
- [ ] `POST /api/systematic-review/import-references` — imports selected references
- [ ] `GET /api/systematic-review/import-references` — retrieves imported references

### Screening Panel
#### Criteria Management
- [ ] **"Define Inclusion/Exclusion Criteria" button** — Plus icon, opens criteria editor
- [ ] **Inclusion criteria** — list of inclusion rules
- [ ] **Exclusion criteria** — list of exclusion rules
- [ ] **Add criteria** — new criteria can be added
- [ ] **Edit criteria** — existing criteria editable
- [ ] **Delete criteria** — criteria can be removed
#### Screening Modes
- [ ] **Mode toggle** — UI to switch between Human, AI, and Compare modes
