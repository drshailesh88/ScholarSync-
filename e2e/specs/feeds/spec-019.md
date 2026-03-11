# feeds — Spec 019

STATUS: PENDING
TESTED: 0/28
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Feed Store — Additional Details (feed-store.ts)
- [ ] `loadJournals` failure is silent
- [ ] `setSelectedArticle` also loads article note via `loadArticleNote(articleId)`
- [ ] `clearCopilot` sets `copilotOpen = false` — changing articles auto-closes copilot panel
- [ ] Chat history filters out `system` role messages before sending to API
- [ ] Chat sends prior messages minus the just-added user message: `history.slice(0, -1)`
- [ ] `sendCopilotMessage` clears `copilotSuggestions` to `[]` when user sends any message
- [ ] Related-papers intent fallthrough: if related fetch fails, chat endpoint still fires
- [ ] `RELATED_PAPERS_INTENT` regex: `/\b(related papers|similar papers|similar articles|more like this|find related)\b/i`
- [ ] `withRelatedSuggestion()` only appends "Find related papers" if no existing suggestion matches the intent regex
- [ ] `formatRelatedPapersSummary()` with papers: "I found {n} related papers via {sourceLabel}."
- [ ] `formatRelatedPapersSummary()` without papers: "I couldn't find related papers for this article. Try a broader topic search."
- [ ] Source label map: `s2_recommendations` → "Semantic Scholar recommendations", `s2_search` → "Semantic Scholar search", else "PubMed search"
- [ ] `summarizeArticle` sends full article metadata: title, authors, abstractSnippet, doi, pubmedId, journal, volume, issue, publishedAt (ISO), link
- [ ] `summarizeArticle` error sets store `error` (global banner, not copilot-local)
- [ ] Standard chat error sets store `error` (global banner, not copilot-local)
- [ ] `findRelatedPapers` failure does NOT set store error (silent clear of loading state)
#### Keyboard Shortcuts — Additional Edge Cases (page.tsx)
- [ ] `j` does nothing when at last article (`currentIndex >= articles.length - 1`)
- [ ] `k` does nothing when at first article (`currentIndex <= 0`)
- [ ] `o` does nothing when `selectedArticleId` is falsy (no article selected)
- [ ] `s` accesses `toggleStar` via `useFeedStore.getState()` (not from destructured state)
- [ ] `c` does nothing if article not found in `articles` array for `selectedArticleId`
- [ ] `a` reads live `copilotOpen` state via `useFeedStore.getState()` to toggle
#### Shared UI Details
- [ ] Shared `EmptyState` wraps the icon in a `w-16 h-16 rounded-2xl bg-surface-raised` container and renders the icon at 32px
#### Feed Sidebar
- [ ] Feed mute/unmute button starts hidden with `opacity-0` and only becomes visible on row hover via `group-hover:opacity-100`
- [ ] Magazine-view favicons hide broken images with `onError={() => currentTarget.style.display = "none"}` just like sidebar and card-view favicons
#### Feed Store
- [ ] `unsubscribe()` removes the subscription from local state only after the DELETE request succeeds; it is not optimistic
- [ ] Closing Copilot through `closeCopilot()` only sets `copilotOpen = false` and preserves messages/source state for the same selected article
- [ ] Re-selecting the same article id does not clear Copilot state because `clearCopilot()` only runs when `articleId !== prev`
