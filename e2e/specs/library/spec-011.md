# library — Spec 011

STATUS: PASS
TESTED: 30/30
PASS: 30
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Server Action Additional Details
- [x] PASS: `savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)
- [x] PASS: `savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)
- [x] PASS: `savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)
- [x] PASS: `savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)
- [x] PASS: `toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)
- [x] PASS: `removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)
- [x] PASS: `getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)
- [x] PASS: `getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)
#### Components Referenced But Not Rendered
- [x] PASS: Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only
- [x] PASS: Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself
- [x] PASS: Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)
#### Accessibility & Shared UI
- [x] PASS: Citation tabs are rendered by the shared `Tabs` component, which uses plain `<button>` elements without `role="tablist"`, `role="tab"`, or `aria-selected`
- [x] PASS: Active citation tab styling is `bg-surface-raised text-ink border border-border-subtle`; inactive tabs use `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
- [x] PASS: The shared `Modal` component used for citations does not set `role="dialog"` or `aria-modal`
- [x] PASS: The shared `Modal` close button has no `aria-label`
- [x] PASS: Search input relies on placeholder text only; it has no associated `<label>` or `aria-label`
- [x] PASS: Project, Study Type, and year filter controls have no explicit `<label>` or `aria-label`
- [x] PASS: Favorite and delete icon-only buttons have no `aria-label` or `title`
#### Edge Cases & Cleanup
- [x] PASS: Search debounce effect clears its pending timeout in cleanup via `return () => clearTimeout(timer)`
- [x] PASS: Custom collection names are keyed and matched by the raw string value; names differing only by case or whitespace are treated as separate collections
- [x] PASS: Special characters in collection names are rendered verbatim with no slugging or normalization layer
- [x] PASS: Upload concurrency is gated only by the disabled `Upload PDF` trigger button, preventing a second sidebar-initiated upload while `uploading` is true
- [x] PASS: If `/api/papers/{paperId}/pdf` fails after `savePaper(...)` succeeds, the paper record remains saved and the page still refreshes papers + metadata without rollback
#### Async Edge Cases & Authorization
- [x] PASS: `fetchPapers()` has no request-cancellation or sequence guard, so slower older responses can overwrite newer search/filter results if requests resolve out of order
- [x] PASS: `openCiteModal()` has no request-cancellation or sequencing guard, so citation results from an earlier paper can overwrite a later-opened modal if responses resolve out of order
- [x] PASS: `copied` feedback state is not reset on modal open or tab switch, so `Copied!` can linger briefly across a quick reopen or citation-style change until its 2-second timer clears
- [x] PASS: `findExistingPaper()` only performs normalized title deduplication when BOTH `title` and `year` are present; title-only duplicates are not collapsed by that fallback path
- [x] PASS: `POST /api/papers/[id]/pdf` accepts any uploaded `File` object and does not validate PDF MIME type or `.pdf` extension before storage
- [x] PASS: `GET /api/papers/[id]/pdf` authenticates the requester but does not verify a `userReferences` ownership link before serving redirects or streamed PDF content
- [x] PASS: `POST /api/papers/[id]/pdf` authenticates the requester but does not verify paper ownership before allowing a PDF upload to that paper ID
