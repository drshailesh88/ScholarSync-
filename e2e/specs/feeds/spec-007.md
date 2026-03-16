# feeds — Spec 007

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
- [x] PASS: Successful import uses `alert(...)` to show imported/skipped/failed counts
- [x] PASS: Successful import refreshes subscriptions through `useFeedStore.getState().loadSubscriptions()`
- [x] PASS: Failed import uses `alert(data.error || "Import failed")`
- [x] PASS: Import handler clears the file input value after handling the selected file
- [x] PASS: `Mark all read` in the header always calls `markAllRead()` for the current store state without requiring a confirmation dialog
- [x] PASS: Sort segmented control contains exactly `Newest`, `Oldest`, and `Relevance`
- [x] PASS: Clicking `Newest` sets `sortBy = "newest"` and `sortDir = "desc"`
- [x] PASS: Clicking `Oldest` sets `sortBy = "oldest"` and `sortDir = "asc"`
- [x] PASS: Clicking `Relevance` sets `sortBy = "relevance"` while preserving the current `sortDir`
- [x] PASS: Layout control buttons expose visible tooltips/titles `List`, `Card`, and `Magazine`
- [x] PASS: Layout control is icon-only; the labels are not rendered inline in the header
- [x] PASS: Add Feed button sets `showAddModal = true`
- [x] PASS: Error banner shows the store error string and a `Dismiss` text button
- [x] PASS: Dismissing the error banner calls `clearError()` and removes the banner
- [x] PASS: Feed sidebar is hidden below the `lg` breakpoint
- [x] PASS: Reading pane / copilot column is hidden below the `xl` breakpoint
- [x] PASS: Reading pane / copilot column is not shown at all until an article is selected
- [x] PASS: Feed sidebar `All Articles`, `Unread`, and `Starred` buttons clear both `selectedFeedId` and `selectedFolder`
- [x] PASS: `All Articles` is treated as selected only when both `selectedFeedId` and `selectedFolder` are null
- [x] PASS: Folder buttons set `selectedFolder` and clear `selectedFeedId`
- [x] PASS: Feed-item buttons set `selectedFeedId` and do not automatically change `viewFilter`
- [x] PASS: Sidebar groups subscriptions by exact `sub.folder` string; empty folder values fall into the ungrouped `FEEDS` section
- [x] PASS: Folder unread totals are recalculated by summing `sub.unreadCount` across that folder's feeds
- [x] PASS: Feed-item favicon falls back to `getFaviconUrl(siteUrl || feedUrl)` when no explicit `faviconUrl` is stored
- [x] PASS: Broken favicon images are hidden by setting `display: none` on error
- [x] PASS: Muted feeds render at reduced opacity via `opacity-50`
- [x] PASS: Mute/unmute control is visually hidden until the row is hovered
- [x] PASS: Mute/unmute clicks stop propagation and do not select the feed row
- [x] PASS: Mute/unmute flow is not optimistic in the store; it PATCHes `/api/feeds/{id}` then reloads subscriptions
- [x] PASS: Pending mute state disables only the currently mutating mute button
- [x] PASS: Selecting a feed, folder, or view filter resets article pagination to page 0 and triggers a fresh article reload
- [x] PASS: `ArticleList` loads available journals once on mount through `loadJournals()`
- [x] PASS: Article skeleton state shows exactly 5 `SkeletonCard`s when the first page is loading
- [x] PASS: Empty article state renders `No articles` only when loading is false and the article list is empty
- [x] PASS: `Load more` button is shown only when `hasMore` is true
