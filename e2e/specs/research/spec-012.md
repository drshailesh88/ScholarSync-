# research — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Save, Cite, History, And Result Edge Cases
- [x] PASS: `getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `""` when no timestamp is present
- [x] PASS: `getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`
- [x] PASS: `savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year
- [x] PASS: `savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values
- [x] PASS: New-paper inserts default `authors` to `[]` when the caller omits them
- [x] PASS: New-paper inserts copy `open_access_url` into `pdf_url`
- [x] PASS: `savePaper()` creates the user-reference row in collection `"All Papers"` with `isFavorite: false`
- [x] PASS: User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library
- [x] PASS: `savePaper()` always calls `revalidatePath("/library")` after the user-reference insert path
- [x] PASS: `savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR
- [x] PASS: `savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`
- [x] PASS: `handleSave(result)` chooses the outgoing `source` field as `"pubmed"` first, `"semantic_scholar"` second, and `"openalex"` otherwise based on `result.sources`
- [x] PASS: `handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action
- [x] PASS: `Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`
- [x] PASS: When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload
- [x] PASS: Result author rows still render an empty `<p>` when `authors[]` is empty
- [x] PASS: Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`
- [x] PASS: Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability
- [x] PASS: Result cards omit the abstract block completely when `abstract` is falsy
- [x] PASS: Result cards omit the TL;DR block completely when `tldr` is falsy
- [x] PASS: Result cards omit the DOI metadata link completely when `doi` is falsy
- [x] PASS: Result cards omit the Similar button completely when `s2Id` is falsy
- [x] PASS: Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving
- [x] PASS: Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper
#### Behavior Corrections (Pass 2)
- [x] PASS: The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper
- [x] PASS: The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true
- [x] PASS: The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`
- [x] PASS: The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs
- [x] PASS: The live copilot sidebar does not auto-scroll to the newest message in the current implementation
- [x] PASS: The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page
- [x] PASS: The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear
- [x] PASS: The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`
#### Components Referenced But Not Rendered
- [x] PASS: `src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [x] PASS: `src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [x] PASS: `src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
