# feeds — Spec 008

STATUS: PARTIAL
TESTED: 35/35
PASS: 31
FAIL: 4
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `loadMore()` is a no-op when `hasMore` is false or `isLoadingArticles` is already true
- [x] PASS: `loadMore()` increments `page` before calling `loadArticles(false)`
- [ ] FAIL: Article API requests always send `perPage=30`
- [x] PASS: Fresh article loads clear `articles`, reset `page` to `0`, and clear `selectedArticleId`
- [x] PASS: Append-mode article loads keep the current `selectedArticleId`
- [x] PASS: Search input updates `searchQuery` and immediately triggers `loadArticles()`
- [x] PASS: Search clear button appears only when `searchQuery` is non-empty
- [x] PASS: Search clear button calls `setSearchQuery("")`; it does not use the separate `clearSearch()` store action
- [ ] FAIL: Filters button blue-dot indicator appears only when a date or journal filter is active
- [ ] FAIL: Advanced filters can be opened even when no filters are active
- [x] PASS: `Clear all filters` resets date-from, date-to, and journal only; it does not clear search text or collapse the filter panel
- [x] PASS: Advanced sort buttons normalize `published` and `added` into feed-store sort modes rather than preserving a separate stored value
- [x] PASS: Selecting `Title` in advanced sort normalizes store `sortBy` to `relevance`
- [x] PASS: Header sort segmented control and advanced sort buttons can represent different labels for the same underlying store state
- [x] PASS: Search-bar sort toggle flips only between `newest` and `oldest`; it never switches to or from `relevance`
- [x] PASS: Selecting an article calls `setSelectedArticle(article.id)` and clears copilot state if the article changed
- [x] PASS: Selecting a new unread article optimistically marks it read and decrements `totalUnread`
- [x] PASS: If the background `markRead` request fails, the article is reverted to unread and `totalUnread` increments back
- [x] PASS: `j` keyboard shortcut selects the next article only when focus is not inside an input or textarea
- [x] PASS: `k` keyboard shortcut selects the previous article only when focus is not inside an input or textarea
- [x] PASS: `/` keyboard shortcut focuses the first input whose placeholder contains `Search`
- [x] PASS: `o` keyboard shortcut opens the selected article's `link` in a new tab only when that link exists
- [x] PASS: `s` keyboard shortcut toggles star on the selected article through the store
- [x] PASS: `c` keyboard shortcut opens the citation modal for the selected article
- [x] PASS: `a` keyboard shortcut toggles the copilot panel only when an article is selected
- [x] PASS: Article reader empty state text is exactly `Select an article to read`
- [ ] FAIL: Reader journal-info row omits itself entirely when journal, volume, and issue are all absent
- [x] PASS: Reader published-date row always includes reading-time text computed from `abstractSnippet`
- [x] PASS: Reader `Save` button does not disable while `saveToLibrary()` is in flight
- [x] PASS: Successful `saveToLibrary()` marks `isSavedToLibrary = true` and stores `savedPaperId`
- [x] PASS: Failed `saveToLibrary()` sets store `error` and returns `null`
- [x] PASS: Reader `AI` button calls the passed `onOpenCopilot()` and does not itself select the article
- [x] PASS: Reader `Open Original` button is hidden when `article.link` is absent
- [x] PASS: Reader `Abstract` section is hidden when `abstractSnippet` is empty
- [x] PASS: Reader DOI section is hidden when `article.doi` is absent
