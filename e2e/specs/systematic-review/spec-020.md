# systematic-review — Spec 020

STATUS: PARTIAL
TESTED: 35/35
PASS: 0
FAIL: 35
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Data Extraction Panel
- [ ] FAIL: Papers with available chunk data show a `Full-text` chip with tooltip `Full-text PDF chunks available`
- [ ] FAIL: Papers without full-text chunks and with abstract length under 50 show `Insufficient text content for extraction`
- [ ] FAIL: Per-paper `Extract` button is disabled while that paper is extracting
- [ ] FAIL: Per-paper `Extract` button is disabled while a batch extraction is running
- [ ] FAIL: Per-paper `Extract` button is disabled for papers with no chunks and fewer than 50 abstract characters
- [ ] FAIL: Per-paper action label changes from `Extract` to `Re-extract` once either live or persisted extraction data exists
- [ ] FAIL: Abstract-only single-paper extraction error includes the paper title and exact text `does not have enough text content for extraction (minimum 50 characters).`
- [ ] FAIL: Batch extraction error for no eligible papers is `No papers have enough text content for extraction. Upload PDFs or ensure papers have abstracts.`
- [ ] FAIL: Full-text extraction is preferred when the checkbox is enabled and the paper has saved chunks
- [ ] FAIL: Abstract-only extraction falls back to `paper.abstract || ""` rather than another derived text source
- [ ] FAIL: Extraction results panel stays hidden until persisted results or live results exist, or the saved table is still loading
- [ ] FAIL: Results panel helper text says `Click any value to view source passage`
- [ ] FAIL: Saved-table loading message is `Loading extraction data...`
- [ ] FAIL: Result-table first column header is `Paper`
- [ ] FAIL: Result columns are the union of persisted extraction columns and the current schema field names
- [ ] FAIL: Missing result cells render as `--`
- [ ] FAIL: Source-link styling only appears when a cell has both `sourceChunkId` and matching chunk data loaded
- [ ] FAIL: Clicking a linked extraction value opens the side-by-side source passage viewer instead of inline expanding the row
- [ ] FAIL: Quote-only fallback opens the side panel with a synthetic chunk when a source quote exists but no chunk link is available
- [ ] FAIL: Edit icon for a result cell is hover-only rather than always visible
- [ ] FAIL: Inline result edit supports `Enter` to save the edited value
- [ ] FAIL: Inline result edit supports `Escape` to cancel the edit
- [ ] FAIL: Inline result edits only mutate in-memory `liveExtractions` state and do not issue a persistence request
- [ ] FAIL: Source side panel header shows the field name in brand styling above the paper title
- [ ] FAIL: Source side panel metadata shows section chip when `sectionType` exists
- [ ] FAIL: Source side panel metadata shows `Page {n}` only when `pageNumber` exists
- [ ] FAIL: Source side panel metadata always shows `Chunk #{chunkIndex + 1}`
- [ ] FAIL: Source side panel close control is an `X` icon in the header
- [ ] FAIL: No-results helper card title is `How AI Extraction Works`
- [ ] FAIL: No-results helper card step 1 says the user defines columns and descriptions
- [ ] FAIL: No-results helper card step 2 says AI reads full text or abstract and extracts matching data points
- [ ] FAIL: No-results helper card step 3 says every extraction links to the source passage
- [ ] FAIL: No-results helper card step 4 says the human verifies and edits with the source visible side-by-side
#### Meta-Analysis Panel
- [ ] FAIL: Meta-analysis panel defaults `analysisName` to `Primary Analysis`
- [ ] FAIL: Meta-analysis panel defaults `effectType` to `OR`
