# research — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `Save & Cite` routes to `/editor/new` after `handleSave(...)` resolves
- [ ] Because `handleSave(...)` swallows save errors, `Save & Cite` still redirects even if the save operation failed
- [ ] `Similar` button is rendered only for results with an `s2Id`
- [ ] `Similar` button switches to `Finding...` with a spinning `CircleNotch` icon while recommendations load
- [ ] Similar-paper requests call `/api/search/s2-recommendations?paperId={s2Id}&limit=5&paperTitle={encodedTitle}`
- [ ] Retrying Similar clears prior error and empty markers for that paper before the next request
- [ ] Once a similar-results list is loaded for a paper, clicking `Similar` again does not refetch because cached results short-circuit the handler
- [ ] Similar-paper error state reads `Couldn't load similar papers.` and shows a `Retry` action
- [ ] Similar-paper empty state reads `No similar papers found for this article.`
- [ ] Similar-paper result cards render title, `journal · year`, optional citation count, and a `Save` button only
- [ ] Evidence-level badge is rendered only when `r.evidenceLevel` exists
- [ ] Evidence-level fallback styling defaults to Level V colors for unrecognized values
- [ ] Open-access badge text reads `Open Access`
- [ ] High-relevance helper text renders on the far right only when `rrfScore >= 1.0`
- [ ] `rrfScore >= 1.5` shows `High relevance`; `rrfScore` between `1.0` and `1.49` shows `Relevant`
- [ ] Pagination uses `Previous` and `Next` buttons, not an infinite scroll or load-more control
- [ ] Previous button is disabled on page 0
- [ ] Next button is disabled when `hasMore` is false
- [ ] Pagination status text reads `Page {current} of {total}`
- [ ] Clicking Previous or Next reruns `handleSearch(...)` with the adjacent page number
- [ ] Floating research-copilot toggle button is fixed at the bottom-right corner of the viewport
- [ ] Floating copilot button is visible even before any search has run
- [ ] Floating copilot button changes from glass styling to solid brand styling when the sidebar is open
- [ ] Copilot sidebar renders only while `showCopilot` is true
- [ ] Copilot sidebar header reads `Research Copilot`
- [ ] Copilot sidebar header includes a pulsing `AI` status indicator
- [ ] Copilot welcome card is shown only when there are no chat messages yet
- [ ] Copilot welcome card copy promises search across PubMed, Semantic Scholar, and OpenAlex
- [ ] Chat request transport uses `/api/research-agent`
- [ ] Copilot input placeholder reads `Ask about papers, topics, methods...`
- [ ] Copilot send button is disabled when the input is blank or while a response is streaming/submitted
- [ ] Successful copilot submit clears the input field immediately after `sendMessage(...)`
- [ ] Copilot message rendering concatenates only `text` parts and ignores non-text message parts
- [ ] Copilot loading helper reads `Searching...`
- [ ] Closing the copilot sidebar hides it without clearing the existing in-memory chat messages for that render cycle
