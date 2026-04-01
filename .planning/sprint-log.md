# Sprint Log
## Session started: 2026-04-01
## Phase: 6 — Content Extraction + Annotation (Reading & Highlighting)
## Current requirement: 1-4. Content extractor + extraction trigger + migration + highlight actions
## Status: BUILDING
## Attempt: 1/5
## Session: new
## Files changed: []
## Last test result: N/A
## Failing test: N/A
## Notes: Starting Phase 6. Building data layer first (reqs 1,2,4,7,8), then UI (3,5,6), then citations (9), then tests (10).

## Requirements checklist:
- [ ] 1. Create `src/lib/web/content-extractor.ts` using Jina Reader
- [ ] 2. Background extraction job: triggered on save, extracts content, updates `content_html` + `content_plain`
- [ ] 3. Build Web Source Reader view (clean rendered HTML from snapshot)
- [ ] 4. Run database migration for `web_source_highlights` table
- [ ] 5. Implement highlighting on web content (text selection → color picker → save)
- [ ] 6. Implement notes on highlights
- [ ] 7. Implement general notes on web source
- [ ] 8. Reuse existing annotation color enum (yellow, green, red, blue, purple)
- [ ] 9. Make highlights citable in editor drafts
- [ ] 10. Write tests: content extraction, highlight CRUD, notes, citation integration
