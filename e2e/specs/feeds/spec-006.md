# feeds — Spec 006

STATUS: PARTIAL
TESTED: 35/35
PASS: 28
FAIL: 7
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### OPML Import & Export
#### Import
- [x] PASS: File input accepts `.opml` and `.xml` files
- [x] PASS: `POST /api/feeds/opml/import` with XML content
- [ ] FAIL: Response reports: total feeds, imported, skipped, failed
- [ ] FAIL: Error details for failed imports
- [ ] FAIL: Subscriptions refresh after import

### Feed Store (Zustand)
#### Key State
- [x] PASS: `subscriptions` — array of user's feed subscriptions
- [x] PASS: `articles` — loaded articles with read/star/save status
- [x] PASS: `selectedFeedId` — currently selected feed (null = all)
- [x] PASS: `selectedFolder` — currently selected folder
- [x] PASS: `viewFilter` — "all" | "unread" | "starred" (default: "unread")
- [x] PASS: `sortBy` — "newest" | "oldest" | "relevance"
- [x] PASS: `layout` — "list" | "card" | "magazine"
- [x] PASS: `selectedArticleId` — article in reading pane
- [x] PASS: `copilotOpen` — AI panel visibility
- [x] PASS: `copilotMessages` — chat history
- [x] PASS: `copilotSourceTier` — full_paper | abstract_only | title_only
- [x] PASS: `totalUnread` — aggregate unread count
- [x] PASS: `hasMore` — pagination flag
- [x] PASS: `page` — current pagination page
#### Key Actions
- [x] PASS: `loadSubscriptions()` / `subscribe()` / `unsubscribe()`
- [x] PASS: `loadArticles()` / `loadMore()`
- [x] PASS: `markRead()` / `markAllRead()` / `toggleStar()` / `saveToLibrary()`
- [ ] FAIL: `setSelectedFeed()` / `setSelectedFolder()` / `setViewFilter()`
- [x] PASS: `openCopilot()` / `closeCopilot()` / `summarizeArticle()` / `sendCopilotMessage()`
- [x] PASS: `clearFilters()` / `clearSearch()` / `clearCopilot()`

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Feed store defaults to `viewFilter = "unread"`, `sortBy = "newest"`, `sortDir = "desc"`, and `layout = "card"`
- [x] PASS: Feed store does not use zustand persist middleware; page state is refetched fresh after reload
- [x] PASS: Page mount triggers both `loadSubscriptions()` and `loadArticles()` in parallel
- [ ] FAIL: Empty-state gate is `subscriptions.length === 0 && !isLoadingSubscriptions`; articles alone do not bypass the empty-state screen
- [x] PASS: Header unread helper text renders only when `totalUnread > 0`
- [x] PASS: Export button fetches `/api/feeds/opml/export` and downloads `scholarsync-feeds.opml` only when the response is OK
- [ ] FAIL: Export failures are silent in the current page UI
- [x] PASS: Import control is a `<label>` wrapping a hidden file input with `accept=".opml,.xml"`
- [ ] FAIL: Canceling the import file picker leaves the page unchanged
- [x] PASS: Import reads the selected file as text and posts it to `/api/feeds/opml/import` with `Content-Type: application/xml`
