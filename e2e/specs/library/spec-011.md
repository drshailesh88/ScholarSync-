# library — Spec 011

STATUS: PENDING
TESTED: 0/30
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/library
MODULE: library

---
### Quick Test Workflows
#### Server Action Additional Details
- [ ] `savePaper` creates userReference with `isFavorite: false` as default (papers.ts:465)
- [ ] `savePaper` uses `onConflictDoNothing()` on userReference insert, silently deduplicating user-paper links (papers.ts:467)
- [ ] `savePaper` auto-triggers background `autoChunkPaper` + `embedPaperChunks` for papers with abstract or tldr (papers.ts:472-487)
- [ ] `savePaper` auto-triggers background `queuePdfProcessing` for papers with DOI or `open_access_url` (papers.ts:494-502)
- [ ] `toggleFavorite` server action verifies both `refId` AND `userId` match before updating — prevents cross-user mutations (papers.ts:577-583)
- [ ] `removePaper` server action verifies both `refId` AND `userId` match before soft-deleting (papers.ts:596-602)
- [ ] `getAllCitationFormats` is a server action (not API route) — called via React Server Action protocol from client (citations.ts:1)
- [ ] `getAllCitationFormats` iterates all five non-BibTeX styles in a `for` loop, generating both `full` and `inText` for each; BibTeX is generated separately via `_generateBibTeX` (citations.ts:43-56)
#### Components Referenced But Not Rendered
- [ ] Sections 12 (Citation Dialog) and 13 (Reference Store) describe shared components NOT imported or rendered by `/library/page.tsx` — they are Studio/Editor features only
- [ ] Section 14 describes `POST /api/references/resolve` which is called by the Citation Dialog component, not by the Library page itself
- [ ] Original section 5 claims infinite scroll — not implemented; Library renders a flat scrollable column via `overflow-y-auto` (page.tsx:405)
#### Accessibility & Shared UI
- [ ] Citation tabs are rendered by the shared `Tabs` component, which uses plain `<button>` elements without `role="tablist"`, `role="tab"`, or `aria-selected`
- [ ] Active citation tab styling is `bg-surface-raised text-ink border border-border-subtle`; inactive tabs use `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
- [ ] The shared `Modal` component used for citations does not set `role="dialog"` or `aria-modal`
- [ ] The shared `Modal` close button has no `aria-label`
- [ ] Search input relies on placeholder text only; it has no associated `<label>` or `aria-label`
- [ ] Project, Study Type, and year filter controls have no explicit `<label>` or `aria-label`
- [ ] Favorite and delete icon-only buttons have no `aria-label` or `title`
#### Edge Cases & Cleanup
- [ ] Search debounce effect clears its pending timeout in cleanup via `return () => clearTimeout(timer)`
- [ ] Custom collection names are keyed and matched by the raw string value; names differing only by case or whitespace are treated as separate collections
- [ ] Special characters in collection names are rendered verbatim with no slugging or normalization layer
- [ ] Upload concurrency is gated only by the disabled `Upload PDF` trigger button, preventing a second sidebar-initiated upload while `uploading` is true
- [ ] If `/api/papers/{paperId}/pdf` fails after `savePaper(...)` succeeds, the paper record remains saved and the page still refreshes papers + metadata without rollback
#### Async Edge Cases & Authorization
- [ ] `fetchPapers()` has no request-cancellation or sequence guard, so slower older responses can overwrite newer search/filter results if requests resolve out of order
- [ ] `openCiteModal()` has no request-cancellation or sequencing guard, so citation results from an earlier paper can overwrite a later-opened modal if responses resolve out of order
- [ ] `copied` feedback state is not reset on modal open or tab switch, so `Copied!` can linger briefly across a quick reopen or citation-style change until its 2-second timer clears
- [ ] `findExistingPaper()` only performs normalized title deduplication when BOTH `title` and `year` are present; title-only duplicates are not collapsed by that fallback path
- [ ] `POST /api/papers/[id]/pdf` accepts any uploaded `File` object and does not validate PDF MIME type or `.pdf` extension before storage
- [ ] `GET /api/papers/[id]/pdf` authenticates the requester but does not verify a `userReferences` ownership link before serving redirects or streamed PDF content
- [ ] `POST /api/papers/[id]/pdf` authenticates the requester but does not verify paper ownership before allowing a PDF upload to that paper ID
