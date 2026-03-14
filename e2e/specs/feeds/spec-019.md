# feeds — Spec 019

STATUS: PARTIAL
TESTED: 28/28
PASS: 25
FAIL: 3
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Feed Store — Additional Details (feed-store.ts)
- [x] PASS: `loadJournals` failure is silent
- [x] PASS: `setSelectedArticle` also loads article note via `loadArticleNote(articleId)`
- [x] PASS: `clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel
- [x] PASS: Chat history filters out `system` role messages before sending to API
- [x] PASS: Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`
- [x] PASS: `sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message
- [ ] FAIL: Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires
- [x] PASS: `RELATED_PAPERS_INTENT` regex: `/\b(related papers|similar papers|similar articles|more like this|find related)\b/i`
- [x] PASS: `withRelatedSuggestion()` only appends "Find related papers" if no existing suggestion matches the intent regex
- [x] PASS: `formatRelatedPapersSummary()` with papers: "I found {n} related papers via {sourceLabel}."
- [x] PASS: `formatRelatedPapersSummary()` without papers: "I couldn't find related papers for this article. Try a broader topic search."
- [x] PASS: Source label map: `s2_recommendations` → "Semantic Scholar recommendations", `s2_search` → "Semantic Scholar search", else "PubMed search"
- [x] PASS: `summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link
- [x] PASS: `summarizeArticle` error sets store `error` (global banner, not copilot-local)
- [x] PASS: Standard chat error sets store `error` (global banner, not copilot-local)
- [x] PASS: `findRelatedPapers` failure does NOT set store error (silent clear of loading state)
#### Keyboard Shortcuts — Additional Edge Cases (page.tsx)
- [ ] FAIL: `j` does nothing when at last article (`currentIndex >= articles.length - 1`)
- [ ] FAIL: `k` does nothing when at first article (`currentIndex <= 0`)
- [x] PASS: `o` does nothing when `selectedArticleId` is falsy (no article selected)
- [x] PASS: `s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)
- [x] PASS: `c` does nothing if article not found in `articles` array for `selectedArticleId`
- [x] PASS: `a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle
#### Shared UI Details
- [x] PASS: Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px
#### Feed Sidebar
- [x] PASS: Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`
- [x] PASS: Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = "none"}` just like sidebar and card-view favicons
#### Feed Store
- [x] PASS: `unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic
- [x] PASS: Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article
- [x] PASS: Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`
