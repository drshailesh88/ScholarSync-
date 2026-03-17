# systematic-review — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### Data Extraction Panel
- [x] PASS: Papers with available chunk data show a `Full-text` chip with tooltip `Full-text PDF chunks available`
- [x] PASS: Papers without full-text chunks and with abstract length under 50 show `Insufficient text content for extraction`
- [x] PASS: Per-paper `Extract` button is disabled while that paper is extracting
- [x] PASS: Per-paper `Extract` button is disabled while a batch extraction is running
- [x] PASS: Per-paper `Extract` button is disabled for papers with no chunks and fewer than 50 abstract characters
- [x] PASS: Per-paper action label changes from `Extract` to `Re-extract` once either live or persisted extraction data exists
- [x] PASS: Abstract-only single-paper extraction error includes the paper title and exact text `does not have enough text content for extraction (minimum 50 characters).`
- [x] PASS: Batch extraction error for no eligible papers is `No papers have enough text content for extraction. Upload PDFs or ensure papers have abstracts.`
- [x] PASS: Full-text extraction is preferred when the checkbox is enabled and the paper has saved chunks
- [x] PASS: Abstract-only extraction falls back to `paper.abstract || ""` rather than another derived text source
- [x] PASS: Extraction results panel stays hidden until persisted results or live results exist, or the saved table is still loading
- [x] PASS: Results panel helper text says `Click any value to view source passage`
- [x] PASS: Saved-table loading message is `Loading extraction data...`
- [x] PASS: Result-table first column header is `Paper`
- [x] PASS: Result columns are the union of persisted extraction columns and the current schema field names
- [x] PASS: Missing result cells render as `--`
- [x] PASS: Source-link styling only appears when a cell has both `sourceChunkId` and matching chunk data loaded
- [x] PASS: Clicking a linked extraction value opens the side-by-side source passage viewer instead of inline expanding the row
- [x] PASS: Quote-only fallback opens the side panel with a synthetic chunk when a source quote exists but no chunk link is available
- [x] PASS: Edit icon for a result cell is hover-only rather than always visible
- [x] PASS: Inline result edit supports `Enter` to save the edited value
- [x] PASS: Inline result edit supports `Escape` to cancel the edit
- [x] PASS: Inline result edits only mutate in-memory `liveExtractions` state and do not issue a persistence request
- [x] PASS: Source side panel header shows the field name in brand styling above the paper title
- [x] PASS: Source side panel metadata shows section chip when `sectionType` exists
- [x] PASS: Source side panel metadata shows `Page {n}` only when `pageNumber` exists
- [x] PASS: Source side panel metadata always shows `Chunk #{chunkIndex + 1}`
- [x] PASS: Source side panel close control is an `X` icon in the header
- [x] PASS: No-results helper card title is `How AI Extraction Works`
- [x] PASS: No-results helper card step 1 says the user defines columns and descriptions
- [x] PASS: No-results helper card step 2 says AI reads full text or abstract and extracts matching data points
- [x] PASS: No-results helper card step 3 says every extraction links to the source passage
- [x] PASS: No-results helper card step 4 says the human verifies and edits with the source visible side-by-side
#### Meta-Analysis Panel
- [x] PASS: Meta-analysis panel defaults `analysisName` to `Primary Analysis`
- [x] PASS: Meta-analysis panel defaults `effectType` to `OR`
