# feeds — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Article Notes local textarea state resets when store notes for that article change
- [x] PASS: Article Notes auto-save waits 1 second after the last keystroke before persisting
- [x] PASS: Blurring the notes field flushes any pending unsaved local changes immediately
- [x] PASS: Note saves optimistically update the store before the PUT request resolves
- [x] PASS: Empty notes are stored as `null` to the API and removed from the local `articleNotes` map
- [x] PASS: Notes save failures are silent and rely on a future article reopen to refresh server state
- [x] PASS: `Saved` notes indicator is purely local UI state and appears for 2 seconds after each persist call
- [x] PASS: Add Feed modal defaults to the `Add URL` tab each time the component mounts fresh
- [x] PASS: Add Feed modal `Add` button is disabled until `feedUrl.trim()` is non-empty
- [x] PASS: Add Feed modal `Create Feed` button is disabled until `pubmedQuery.trim()` is non-empty
- [x] PASS: Pressing Enter in the RSS URL input triggers `handleAddUrl()`
- [x] PASS: Pressing Enter in the PubMed query input triggers `handlePubMed()`
- [x] PASS: Successful Add URL and PubMed-subscription actions clear only the submitted field, then close the modal
- [x] PASS: Add Feed modal error state is rendered as red helper text inside the modal, not a global banner
- [x] PASS: Copilot panel only renders when `copilotOpen` is true and a selected article still exists
- [x] PASS: Copilot panel close button hides the panel but does not deselect the article
- [x] PASS: Copilot empty state shows `Ask me about this paper` plus helper copy before any messages exist
- [x] PASS: Copilot source badge appears only after summarize/chat populates `copilotSourceTier` and `copilotSourceLabel`
- [x] PASS: `Summarize` checks `copilotSummaryCache` first and reuses cached summary text without hitting the API
- [x] PASS: Fresh summarize requests POST to `/api/feeds/copilot/summarize`
- [x] PASS: Successful summarize stores source tier, source label, suggestions, assistant summary message, and a per-article summary cache entry
- [x] PASS: Suggested follow-up questions are automatically augmented to include `Find related papers` when no similar suggestion already exists
- [x] PASS: Sending a question matching the related-papers intent triggers the related-papers endpoint before chat streaming
- [x] PASS: Related-papers-intent matches set both `copilotLoading` and `relatedPapersLoading` true
- [x] PASS: Successful related-paper intent handling appends an assistant summary message with embedded paper cards and skips the chat endpoint entirely
- [x] PASS: Standard copilot chat posts to `/api/feeds/copilot/chat` with article metadata, prior user/assistant messages, and the new `question`
- [x] PASS: Copilot chat appends an empty assistant message first and streams text chunks into it
- [x] PASS: Copilot loading indicator uses the same three bouncing dots pattern as the main Studio chat
- [x] PASS: Copilot input placeholder reads `Ask about this paper...`
- [x] PASS: Copilot input and send button are disabled while `copilotLoading` is true
- [x] PASS: Changing the selected article clears copilot messages, suggestions, source badge, and related-paper state through `clearCopilot()`
- [x] PASS: `findRelatedPapers()` resets prior related papers before fetching a fresh related-paper result
- [x] PASS: Failed related-paper lookups clear loading state but do not surface a user-facing error inside the copilot panel
- [x] PASS: Route-level `loading.tsx` renders header skeletons, a sidebar skeleton, and 6 article-card skeletons
- [x] PASS: Route-level error boundary title reads `Journal Feed unavailable`
