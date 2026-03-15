# systematic-review — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Search Strategy Panel
#### Generate Search Strategy
- [x] PASS: **Disabled while loading** — button not clickable during API call
#### Strategy Results
- [x] PASS: **Estimated PubMed count** — shows estimated number of results
- [x] PASS: **PICO blocks** — each PICO element rendered as a block with terms
- [x] PASS: **MeSH terms** — displayed with green color coding within blocks
- [x] PASS: **Free-text terms** — displayed with blue color coding within blocks
- [x] PASS: **Full search string** — complete PubMed query string displayed
- [x] PASS: **Copy button** — copies the full search string to clipboard
- [x] PASS: **Suggested filters** — additional filters shown with amber color coding
#### CTA
- [x] PASS: **"Import Papers Using This Strategy" button** — transitions to import tab with strategy pre-loaded
- [x] PASS: **Tab switch** — clicking the CTA switches active tab to `import`
- [x] PASS: **Strategy carried over** — generated strategy available in import panel

### Paper Import Panel
#### Source Selection
- [x] PASS: **Source toggle/selector** — UI to pick which database to search
- [x] PASS: **Multiple sources** — can switch between sources
#### Search Configuration
- [x] PASS: **Custom search input** — free-text search query field
- [x] PASS: **Use generated strategy** — option to use the strategy from Search Strategy tab
- [x] PASS: **Max results config** — configurable limit (default: 100)
- [x] PASS: **Max results input** — numeric input or dropdown for result limit
#### Paper Results
- [x] PASS: **Paper list** — results displayed in a scrollable list
- [x] PASS: **Expand/collapse** — each paper entry can be expanded for details
- [x] PASS: **Paper metadata** — title, authors, abstract, year, journal
- [x] PASS: **Selection** — papers can be selected/deselected for import
#### PDF Upload
- [x] PASS: **PDF upload area** — drag-and-drop or click to upload PDFs
- [x] PASS: **File processing** — uploaded PDFs processed and added to review
#### Duplicate Detection
- [x] PASS: **Duplicate detection** — system identifies duplicate papers across sources
- [x] PASS: **Duplicate indicators** — duplicates visually flagged
- [x] PASS: **Duplicate resolution** — mechanism to keep/remove duplicates
#### API
- [x] PASS: `POST /api/systematic-review/import-references` — imports selected references
- [x] PASS: `GET /api/systematic-review/import-references` — retrieves imported references

### Screening Panel
#### Criteria Management
- [x] PASS: **"Define Inclusion/Exclusion Criteria" button** — Plus icon, opens criteria editor
- [x] PASS: **Inclusion criteria** — list of inclusion rules
- [x] PASS: **Exclusion criteria** — list of exclusion rules
- [x] PASS: **Add criteria** — new criteria can be added
- [x] PASS: **Edit criteria** — existing criteria editable
- [x] PASS: **Delete criteria** — criteria can be removed
#### Screening Modes
- [x] PASS: **Mode toggle** — UI to switch between Human, AI, and Compare modes
