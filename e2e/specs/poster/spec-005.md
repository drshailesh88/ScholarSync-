# poster — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/poster
MODULE: poster

---
### Content Block Types
#### Callout Types
- [ ] `callout` block renders `info` type correctly
- [ ] `callout` block renders `warning` type correctly
- [ ] `callout` block renders `success` type correctly
- [ ] `callout` block renders `finding` type correctly
- [ ] `callout` block renders `limitation` type correctly
- [ ] `callout` block renders `methodology` type correctly
- [ ] `callout` block renders `clinical` type correctly
- [ ] `stat_result` block renders formatted statistical results
- [ ] `bibliography` block renders reference entries
- [ ] `timeline` block renders sequential events
- [ ] `divider` block renders as a horizontal rule

### Export PDF
- [ ] Clicking "Export PDF" sends POST request to `/api/export/poster-pdf`
- [ ] Downloaded file is named `{title}_poster.pdf` with the poster's title
- [ ] PDF download initiates automatically after successful response
- [ ] Export handles special characters in title for filename

### API — POST /api/posters/generate
#### Error Codes
- [ ] API requires authentication (returns 401 without valid auth)
- [ ] API enforces rate limiting
- [ ] Title shorter than 1 character returns 400
- [ ] Title longer than 500 characters returns 400
- [ ] preprocessedData shorter than 1 character returns 400
- [ ] preprocessedData longer than 200,000 characters returns 400
- [ ] preprocessedData is sliced to 60,000 characters before AI processing
- [ ] Missing `posterSize` returns 400
- [ ] Missing `gridLayout` returns 400
- [ ] Default `themeKey` is "modern" when not provided
- [ ] Valid request creates a deck successfully
- [ ] Deck status transitions: created -> processing -> completed
- [ ] AI model used is `claude-sonnet-4-20250514`
- [ ] Response contains `deckId`, `sectionCount`, and `posterData`
- [ ] Metadata is stored in slide 0
- [ ] Section slides are created correctly
- [ ] Server errors return 500 with error details

### Types & Data Structures
#### PosterGridLayout
- [ ] All 6 PosterSize values are defined in `src/types/poster.ts`
- [ ] All 4 PosterGridLayout values are defined in `src/types/poster.ts`
- [ ] Poster size dimensions match the specification
