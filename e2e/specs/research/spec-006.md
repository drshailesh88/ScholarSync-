# research — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `Save & Cite` routes to `/editor/new` after `handleSave(...)` resolves
- [x] PASS: Because `handleSave(...)` swallows save errors, `Save & Cite` still redirects even if the save operation failed
- [x] PASS: `Similar` button is rendered only for results with an `s2Id`
- [x] PASS: `Similar` button switches to `Finding...` with a spinning `CircleNotch` icon while recommendations load
- [x] PASS: Similar-paper requests call `/api/search/s2-recommendations?paperId={s2Id}&limit=5&paperTitle={encodedTitle}`
- [x] PASS: Retrying Similar clears prior error and empty markers for that paper before the next request
- [x] PASS: Once a similar-results list is loaded for a paper, clicking `Similar` again does not refetch because cached results short-circuit the handler
- [x] PASS: Similar-paper error state reads `Couldn't load similar papers.` and shows a `Retry` action
- [x] PASS: Similar-paper empty state reads `No similar papers found for this article.`
- [x] PASS: Similar-paper result cards render title, `journal · year`, optional citation count, and a `Save` button only
- [x] PASS: Evidence-level badge is rendered only when `r.evidenceLevel` exists
- [x] PASS: Evidence-level fallback styling defaults to Level V colors for unrecognized values
- [x] PASS: Open-access badge text reads `Open Access`
- [x] PASS: High-relevance helper text renders on the far right only when `rrfScore >= 1.0`
- [x] PASS: `rrfScore >= 1.5` shows `High relevance`; `rrfScore` between `1.0` and `1.49` shows `Relevant`
- [x] PASS: Pagination uses `Previous` and `Next` buttons, not an infinite scroll or load-more control
- [x] PASS: Previous button is disabled on page 0
- [x] PASS: Next button is disabled when `hasMore` is false
- [x] PASS: Pagination status text reads `Page {current} of {total}`
- [x] PASS: Clicking Previous or Next reruns `handleSearch(...)` with the adjacent page number
- [x] PASS: Floating research-copilot toggle button is fixed at the bottom-right corner of the viewport
- [x] PASS: Floating copilot button is visible even before any search has run
- [x] PASS: Floating copilot button changes from glass styling to solid brand styling when the sidebar is open
- [x] PASS: Copilot sidebar renders only while `showCopilot` is true
- [x] PASS: Copilot sidebar header reads `Research Copilot`
- [x] PASS: Copilot sidebar header includes a pulsing `AI` status indicator
- [x] PASS: Copilot welcome card is shown only when there are no chat messages yet
- [x] PASS: Copilot welcome card copy promises search across PubMed, Semantic Scholar, and OpenAlex
- [x] PASS: Chat request transport uses `/api/research-agent`
- [x] PASS: Copilot input placeholder reads `Ask about papers, topics, methods...`
- [x] PASS: Copilot send button is disabled when the input is blank or while a response is streaming/submitted
- [x] PASS: Successful copilot submit clears the input field immediately after `sendMessage(...)`
- [x] PASS: Copilot message rendering concatenates only `text` parts and ignores non-text message parts
- [x] PASS: Copilot loading helper reads `Searching...`
- [x] PASS: Closing the copilot sidebar hides it without clearing the existing in-memory chat messages for that render cycle
