# feeds — Spec 007

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
- [ ] Successful import uses `alert(...)` to show imported/skipped/failed counts
- [ ] Successful import refreshes subscriptions through `useFeedStore.getState().loadSubscriptions()`
- [ ] Failed import uses `alert(data.error || "Import failed")`
- [ ] Import handler clears the file input value after handling the selected file
- [ ] `Mark all read` in the header always calls `markAllRead()` for the current store state without requiring a confirmation dialog
- [ ] Sort segmented control contains exactly `Newest`, `Oldest`, and `Relevance`
- [ ] Clicking `Newest` sets `sortBy = "newest"` and `sortDir = "desc"`
- [ ] Clicking `Oldest` sets `sortBy = "oldest"` and `sortDir = "asc"`
- [ ] Clicking `Relevance` sets `sortBy = "relevance"` while preserving the current `sortDir`
- [ ] Layout control buttons expose visible tooltips/titles `List`, `Card`, and `Magazine`
- [ ] Layout control is icon-only; the labels are not rendered inline in the header
- [ ] Add Feed button sets `showAddModal = true`
- [ ] Error banner shows the store error string and a `Dismiss` text button
- [ ] Dismissing the error banner calls `clearError()` and removes the banner
- [ ] Feed sidebar is hidden below the `lg` breakpoint
- [ ] Reading pane / copilot column is hidden below the `xl` breakpoint
- [ ] Reading pane / copilot column is not shown at all until an article is selected
- [ ] Feed sidebar `All Articles`, `Unread`, and `Starred` buttons clear both `selectedFeedId` and `selectedFolder`
- [ ] `All Articles` is treated as selected only when both `selectedFeedId` and `selectedFolder` are null
- [ ] Folder buttons set `selectedFolder` and clear `selectedFeedId`
- [ ] Feed-item buttons set `selectedFeedId` and do not automatically change `viewFilter`
- [ ] Sidebar groups subscriptions by exact `sub.folder` string; empty folder values fall into the ungrouped `FEEDS` section
- [ ] Folder unread totals are recalculated by summing `sub.unreadCount` across that folder's feeds
- [ ] Feed-item favicon falls back to `getFaviconUrl(siteUrl || feedUrl)` when no explicit `faviconUrl` is stored
- [ ] Broken favicon images are hidden by setting `display: none` on error
- [ ] Muted feeds render at reduced opacity via `opacity-50`
- [ ] Mute/unmute control is visually hidden until the row is hovered
- [ ] Mute/unmute clicks stop propagation and do not select the feed row
- [ ] Mute/unmute flow is not optimistic in the store; it PATCHes `/api/feeds/{id}` then reloads subscriptions
- [ ] Pending mute state disables only the currently mutating mute button
- [ ] Selecting a feed, folder, or view filter resets article pagination to page 0 and triggers a fresh article reload
- [ ] `ArticleList` loads available journals once on mount through `loadJournals()`
- [ ] Article skeleton state shows exactly 5 `SkeletonCard`s when the first page is loading
- [ ] Empty article state renders `No articles` only when loading is false and the article list is empty
- [ ] `Load more` button is shown only when `hasMore` is true
