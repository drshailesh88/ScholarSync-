# feeds — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### OPML Import & Export
#### Import
- [ ] File input accepts `.opml` and `.xml` files
- [ ] `POST /api/feeds/opml/import` with XML content
- [ ] Response reports: total feeds, imported, skipped, failed
- [ ] Error details for failed imports
- [ ] Subscriptions refresh after import

### Feed Store (Zustand)
#### Key State
- [ ] `subscriptions` — array of user's feed subscriptions
- [ ] `articles` — loaded articles with read/star/save status
- [ ] `selectedFeedId` — currently selected feed (null = all)
- [ ] `selectedFolder` — currently selected folder
- [ ] `viewFilter` — "all" | "unread" | "starred" (default: "unread")
- [ ] `sortBy` — "newest" | "oldest" | "relevance"
- [ ] `layout` — "list" | "card" | "magazine"
- [ ] `selectedArticleId` — article in reading pane
- [ ] `copilotOpen` — AI panel visibility
- [ ] `copilotMessages` — chat history
- [ ] `copilotSourceTier` — full_paper | abstract_only | title_only
- [ ] `totalUnread` — aggregate unread count
- [ ] `hasMore` — pagination flag
- [ ] `page` — current pagination page
#### Key Actions
- [ ] `loadSubscriptions()` / `subscribe()` / `unsubscribe()`
- [ ] `loadArticles()` / `loadMore()`
- [ ] `markRead()` / `markAllRead()` / `toggleStar()` / `saveToLibrary()`
- [ ] `setSelectedFeed()` / `setSelectedFolder()` / `setViewFilter()`
- [ ] `openCopilot()` / `closeCopilot()` / `summarizeArticle()` / `sendCopilotMessage()`
- [ ] `clearFilters()` / `clearSearch()` / `clearCopilot()`

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Feed store defaults to `viewFilter = "unread"`, `sortBy = "newest"`, `sortDir = "desc"`, and `layout = "card"`
- [ ] Feed store does not use zustand persist middleware; page state is refetched fresh after reload
- [ ] Page mount triggers both `loadSubscriptions()` and `loadArticles()` in parallel
- [ ] Empty-state gate is `subscriptions.length === 0 && !isLoadingSubscriptions`; articles alone do not bypass the empty-state screen
- [ ] Header unread helper text renders only when `totalUnread > 0`
- [ ] Export button fetches `/api/feeds/opml/export` and downloads `scholarsync-feeds.opml` only when the response is OK
- [ ] Export failures are silent in the current page UI
- [ ] Import control is a `<label>` wrapping a hidden file input with `accept=".opml,.xml"`
- [ ] Canceling the import file picker leaves the page unchanged
- [ ] Import reads the selected file as text and posts it to `/api/feeds/opml/import` with `Content-Type: application/xml`
