# poster — Spec 005

STATUS: PARTIAL
TESTED: 35/35
PASS: 19
FAIL: 16
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Content Block Types
#### Callout Types
- [x] PASS: `callout` block renders `info` type correctly
- [x] PASS: `callout` block renders `warning` type correctly
- [x] PASS: `callout` block renders `success` type correctly
- [x] PASS: `callout` block renders `finding` type correctly
- [x] PASS: `callout` block renders `limitation` type correctly
- [x] PASS: `callout` block renders `methodology` type correctly
- [x] PASS: `callout` block renders `clinical` type correctly
- [x] PASS: `stat_result` block renders formatted statistical results
- [x] PASS: `bibliography` block renders reference entries
- [x] PASS: `timeline` block renders sequential events
- [x] PASS: `divider` block renders as a horizontal rule

### Export PDF
- [x] PASS: Clicking "Export PDF" sends POST request to `/api/export/poster-pdf`
- [x] PASS: Downloaded file is named `{title}_poster.pdf` with the poster's title
- [x] PASS: PDF download initiates automatically after successful response
- [ ] FAIL: Export handles special characters in title for filename

### API — POST /api/posters/generate
#### Error Codes
- [ ] FAIL: API requires authentication (returns 401 without valid auth)
- [ ] FAIL: API enforces rate limiting
- [ ] FAIL: Title shorter than 1 character returns 400
- [ ] FAIL: Title longer than 500 characters returns 400
- [ ] FAIL: preprocessedData shorter than 1 character returns 400
- [ ] FAIL: preprocessedData longer than 200,000 characters returns 400
- [ ] FAIL: preprocessedData is sliced to 60,000 characters before AI processing
- [x] PASS: Missing `posterSize` returns 400
- [ ] FAIL: Missing `gridLayout` returns 400
- [ ] FAIL: Default `themeKey` is "modern" when not provided
- [ ] FAIL: Valid request creates a deck successfully
- [ ] FAIL: Deck status transitions: created -> processing -> completed
- [ ] FAIL: AI model used is `claude-sonnet-4-20250514`
- [x] PASS: Response contains `deckId`, `sectionCount`, and `posterData`
- [ ] FAIL: Metadata is stored in slide 0
- [ ] FAIL: Section slides are created correctly
- [ ] FAIL: Server errors return 500 with error details

### Types & Data Structures
#### PosterGridLayout
- [x] PASS: All 6 PosterSize values are defined in `src/types/poster.ts`
- [x] PASS: All 4 PosterGridLayout values are defined in `src/types/poster.ts`
- [x] PASS: Poster size dimensions match the specification
