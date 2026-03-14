# feeds — Spec 008

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
- [ ] `loadMore()` is a no-op when `hasMore` is false or `isLoadingArticles` is already true
- [ ] `loadMore()` increments `page` before calling `loadArticles(false)`
- [ ] Article API requests always send `perPage=30`
- [ ] Fresh article loads clear `articles`, reset `page` to `0`, and clear `selectedArticleId`
- [ ] Append-mode article loads keep the current `selectedArticleId`
- [ ] Search input updates `searchQuery` and immediately triggers `loadArticles()`
- [ ] Search clear button appears only when `searchQuery` is non-empty
- [ ] Search clear button calls `setSearchQuery("")`; it does not use the separate `clearSearch()` store action
- [ ] Filters button blue-dot indicator appears only when a date or journal filter is active
- [ ] Advanced filters can be opened even when no filters are active
- [ ] `Clear all filters` resets date-from, date-to, and journal only; it does not clear search text or collapse the filter panel
- [ ] Advanced sort buttons normalize `published` and `added` into feed-store sort modes rather than preserving a separate stored value
- [ ] Selecting `Title` in advanced sort normalizes store `sortBy` to `relevance`
- [ ] Header sort segmented control and advanced sort buttons can represent different labels for the same underlying store state
- [ ] Search-bar sort toggle flips only between `newest` and `oldest`; it never switches to or from `relevance`
- [ ] Selecting an article calls `setSelectedArticle(article.id)` and clears copilot state if the article changed
- [ ] Selecting a new unread article optimistically marks it read and decrements `totalUnread`
- [ ] If the background `markRead` request fails, the article is reverted to unread and `totalUnread` increments back
- [ ] `j` keyboard shortcut selects the next article only when focus is not inside an input or textarea
- [ ] `k` keyboard shortcut selects the previous article only when focus is not inside an input or textarea
- [ ] `/` keyboard shortcut focuses the first input whose placeholder contains `Search`
- [ ] `o` keyboard shortcut opens the selected article's `link` in a new tab only when that link exists
- [ ] `s` keyboard shortcut toggles star on the selected article through the store
- [ ] `c` keyboard shortcut opens the citation modal for the selected article
- [ ] `a` keyboard shortcut toggles the copilot panel only when an article is selected
- [ ] Article reader empty state text is exactly `Select an article to read`
- [ ] Reader journal-info row omits itself entirely when journal, volume, and issue are all absent
- [ ] Reader published-date row always includes reading-time text computed from `abstractSnippet`
- [ ] Reader `Save` button does not disable while `saveToLibrary()` is in flight
- [ ] Successful `saveToLibrary()` marks `isSavedToLibrary = true` and stores `savedPaperId`
- [ ] Failed `saveToLibrary()` sets store `error` and returns `null`
- [ ] Reader `AI` button calls the passed `onOpenCopilot()` and does not itself select the article
- [ ] Reader `Open Original` button is hidden when `article.link` is absent
- [ ] Reader `Abstract` section is hidden when `abstractSnippet` is empty
- [ ] Reader DOI section is hidden when `article.doi` is absent
