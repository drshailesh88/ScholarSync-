# feeds — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Article Notes local textarea state resets when store notes for that article change
- [ ] Article Notes auto-save waits 1 second after the last keystroke before persisting
- [ ] Blurring the notes field flushes any pending unsaved local changes immediately
- [ ] Note saves optimistically update the store before the PUT request resolves
- [ ] Empty notes are stored as `null` to the API and removed from the local `articleNotes` map
- [ ] Notes save failures are silent and rely on a future article reopen to refresh server state
- [ ] `Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call
- [ ] Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh
- [ ] Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty
- [ ] Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty
- [ ] Pressing Enter in the RSS URL input triggers `handleAddUrl()`
- [ ] Pressing Enter in the PubMed query input triggers `handlePubMed()`
- [ ] Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal
- [ ] Add Feed modal error state is rendered as red helper text inside the modal, not a global banner
- [ ] Copilot panel only renders when `copilotOpen` is true and a selected article still exists
- [ ] Copilot panel close button hides the panel but does not deselect the article
- [ ] Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist
- [ ] Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`
- [ ] `Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API
- [ ] Fresh summarize requests POST to `/api/feeds/copilot/summarize`
- [ ] Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry
- [ ] Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists
- [ ] Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming
- [ ] Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true
- [ ] Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely
- [ ] Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`
- [ ] Copilot chat appends an empty assistant message first and streams text chunks into it
- [ ] Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat
- [ ] Copilot input placeholder reads `Ask about this paper...`
- [ ] Copilot input and send button are disabled while `copilotLoading` is true
- [ ] Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`
- [ ] `findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result
- [ ] Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel
- [ ] Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons
- [ ] Route-level error boundary title reads `Journal Feed unavailable`
