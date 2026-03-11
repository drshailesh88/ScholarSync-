# research — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Save, Cite, History, And Result Edge Cases
- [ ] `getRecentSearches()` serializes `searchedAt` as an ISO string and falls back to `""` when no timestamp is present
- [ ] `getUserPapers(collection?)` returns paper metadata plus `refId`, `isFavorite`, `collection`, `notes`, `tags`, and `addedAt`
- [ ] `savePaper()` de-duplicates in this order: DOI, PMID, Semantic Scholar ID, then normalized title+year
- [ ] `savePaper()` only enriches an existing paper with missing metadata fields or higher citation-related counts; it does not blindly overwrite populated values
- [ ] New-paper inserts default `authors` to `[]` when the caller omits them
- [ ] New-paper inserts copy `open_access_url` into `pdf_url`
- [ ] `savePaper()` creates the user-reference row in collection `"All Papers"` with `isFavorite: false`
- [ ] User-reference creation uses `.onConflictDoNothing()`, so duplicate saves do not throw when the paper is already in the user library
- [ ] `savePaper()` always calls `revalidatePath("/library")` after the user-reference insert path
- [ ] `savePaper()` only queues chunking/embedding work when the saved paper has an abstract or TL;DR
- [ ] `savePaper()` only queues PDF processing when the saved paper has a DOI or `open_access_url`
- [ ] `handleSave(result)` chooses the outgoing `source` field as `"pubmed"` first, `"semantic_scholar"` second, and `"openalex"` otherwise based on `result.sources`
- [ ] `handleSave(result)` forwards `open_access_url: result.openAccessPdfUrl || undefined` to the server action
- [ ] `Save & Cite` writes only citation metadata into `scholarsync_pending_citation`; it does not persist a saved library `paperId`
- [ ] When `result.doi` or `result.pmid` is `undefined`, `JSON.stringify(...)` omits that key from the stored `scholarsync_pending_citation` payload
- [ ] Result author rows still render an empty `<p>` when `authors[]` is empty
- [ ] Result metadata rows still render the separator format `{journal} · {year}` even when `journal` is blank or `year` is `0`
- [ ] Result citation text is omitted when `citationCount` is `0` because the render branch checks truthiness rather than nullability
- [ ] Result cards omit the abstract block completely when `abstract` is falsy
- [ ] Result cards omit the TL;DR block completely when `tldr` is falsy
- [ ] Result cards omit the DOI metadata link completely when `doi` is falsy
- [ ] Result cards omit the Similar button completely when `s2Id` is falsy
- [ ] Similar-result save buttons do not have a disabled visual state even when `handleSave(...)` will immediately no-op because the paper is already saved or currently saving
- [ ] Similar-result cards omit authors, DOI, abstract, TL;DR, evidence badges, open-access badges, and relevance text even when those fields exist on the recommended paper
#### Behavior Corrections (Pass 2)
- [ ] The live `/research` route does not render a before-search empty-state string like `Search for academic papers...`; it renders recent searches, recently saved papers, suggestion chips, and a `Loading your history...` helper
- [ ] The live `/research` route does not disable the main `Search` button when the query input is empty; the button is disabled only while `loading` is true
- [ ] The live `/research` route does not support `Shift+Enter` multiline query entry because the primary search field is a single-line `<input>`
- [ ] The live `/research` route does not apply explicit `min` or `max` attributes to the `From` and `To` year inputs
- [ ] The live copilot sidebar does not auto-scroll to the newest message in the current implementation
- [ ] The live copilot request path does not send current search results, filters, or saved-paper IDs into `/api/research-agent`; only the chat transcript is sent by the page
- [ ] The live AI synthesis panel does not show an inline failure banner or retry button; failed synthesis requests simply make the panel disappear
- [ ] The live augmented-query disclosure labels the Semantic Scholar variant as `S2:`, not `Semantic Scholar:`
#### Components Referenced But Not Rendered
- [ ] `src/components/research/SearchInput.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResultsTable.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
- [ ] `src/components/research/ResultRow.tsx` exists in the codebase but is not imported by `src/app/(app)/research/page.tsx`
