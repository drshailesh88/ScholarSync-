# research — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/research
MODULE: research

---
### Quick Test Workflows
#### Source Adapter Normalization
- [ ] ClinicalTrials results always set `journal` to the sponsor organization name or `"ClinicalTrials.gov"` when no organization is present
- [ ] ClinicalTrials results always set `publicationTypes` to `["clinical_trial_registration"]`
- [ ] ClinicalTrials results always set `isOpenAccess` to `true`
- [ ] ClinicalTrials result abstracts concatenate brief summary, `Phase: ...`, and `Status: ...` with ` | ` separators when those pieces exist
- [ ] Similar-paper recommendation fallback runs a Semantic Scholar title search only when the direct recommendation API returns zero papers and the caller provided `paperTitle`
- [ ] Similar-paper title-search fallback excludes the original paper ID before slicing the result list back to the requested limit
#### Copilot Panel And Research-Agent Internals
- [ ] Copilot submit uses a normal `<form>` submit path, so pressing `Enter` in the copilot text input triggers `handleChatSubmit(...)`
- [ ] Copilot submit does not support multi-line drafting because the input is a single-line `<input type="text">`
- [ ] Copilot submit trims whitespace with `chatInput.trim()` before deciding whether the request is allowed
- [ ] Copilot submit returns early without calling `sendMessage(...)` when `chatLoading` is already true
- [ ] `chatLoading` is true for both `chatStatus === "submitted"` and `chatStatus === "streaming"`
- [ ] The `/research` page clears the copilot input immediately after calling `sendMessage({ text: chatInput })`
- [ ] The `/research` page does not persist copilot messages in `sessionStorage`
- [ ] The `/research` page does not persist `showCopilot` open/closed state across refresh
- [ ] The `/research` page does not pass the current search results, filters, or saved-paper IDs into `useChat(...)` as extra agent context
- [ ] Copilot message rendering ignores any non-text `msg.parts` emitted by the AI SDK and drops messages whose concatenated text content is empty
- [ ] The current copilot panel has no `useEffect` auto-scroll-to-bottom behavior for new messages
- [ ] Research-agent requests are validated against a schema that allows between `1` and `50` messages
- [ ] Research-agent request schema caps each message `content` string at `50000` characters
- [ ] Research-agent schema optionally accepts `context.savedPaperIds`, but the current `/research` page never sends that context field
- [ ] When `context.savedPaperIds.length > 0`, the research-agent system prompt appends `The user has {N} papers saved in their library.`
- [ ] Research-agent streaming stops automatically when `stepCountIs(12)` is reached
- [ ] Invalid research-agent request bodies return HTTP 400 with `Invalid request. Messages are required.`
- [ ] Unhandled research-agent failures return HTTP 500 with `Research agent failed`
- [ ] `searchPubMed` tool responses are truncated to the first `maxResults` items even if the underlying adapter returned more
- [ ] `searchPubMed` tool trims each returned author list to the first 3 authors
- [ ] `searchPubMed` tool trims each returned abstract to the first 300 characters
- [ ] `searchSemanticScholar` tool includes `citationCount`, `tldr`, `studyType`, and `evidenceLevel` in each tool result
- [ ] `searchOpenAlex` tool includes `isOpenAccess` and at most 5 concept strings in each tool result
- [ ] `getPaperDetails` checks Semantic Scholar by raw `s2Id` first, by `DOI:{doi}` second, and by `PMID:{pmid}` third
- [ ] `getPaperDetails` falls back to `searchPubMed(pmid, { maxResults: 1 })` only when Semantic Scholar lookup by PMID returns no paper
- [ ] `getPaperDetails` returns `{ error: "Provide at least one identifier" }` when called with no DOI, PMID, or S2 ID
- [ ] `findSimilarPapers` tool only returns title, first 3 authors, year, journal, doi, s2Id, citationCount, and tldr for each recommended paper
- [ ] `savePaperToLibrary` tool requires a `source` string and returns only `{ success: true, paperId }` on success
#### AI Synthesis Panel Internals
- [ ] AI synthesis fingerprint uses the exact format `{query}::{top5 titles joined by |}`
