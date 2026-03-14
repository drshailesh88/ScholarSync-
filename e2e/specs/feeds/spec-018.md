# feeds — Spec 018

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Journal Browser (journal-browser.tsx)
- [ ] Journal empty state: `rounded-xl border border-dashed border-border-subtle px-4 py-6 text-center`
- [ ] Subscribe checks both `journal.isSubscribed` property AND URL match against current subscriptions
- [ ] `subscribedUrls` computed via `useMemo` from subscriptions array
- [ ] Suggested feeds hidden when search is active: `hasSearch ? [] : data?.suggestedFeeds ?? []`
- [ ] Browse feeds exclude suggested in browse mode: `feeds.filter((feed) => !feed.isSuggested)`
- [ ] PubMed create feed uses `trimmedSearch` (not raw `search`) as query
- [ ] PubMed success message: green text `text-xs text-green-500`
- [ ] PubMed error message: red text `text-xs text-red-400`
#### Feed Store — Additional Details (feed-store.ts)
- [ ] `showAdvancedFilters` state: boolean, default `false`
- [ ] `loadSubscriptions` clears error at start: `{ isLoadingSubscriptions: true, error: null }`
- [ ] `loadSubscriptions` fetches from `GET /api/feeds` endpoint
- [ ] `loadSubscriptions` error message from `Error` instance or fallback "Failed to load subscriptions"
- [ ] `loadArticles` always sends `sortDir` parameter (even for default "desc")
- [ ] `loadArticles` only sends `sortBy` when NOT "newest" (omits for default to reduce params)
- [ ] `loadArticles` sends `isRead=false` for unread filter, `isStarred=true` for starred filter
- [ ] `subscribe` POSTs to `/api/feeds` with `{ feedUrl }` body
- [ ] `subscribe` re-throws error after setting store error (enables caller catch)
- [ ] `subscribePubMed` POSTs to `/api/feeds` with `{ pubmedQuery: query }` body
- [ ] `subscribePubMed` re-throws error after setting store error
- [ ] `markRead` is fire-and-forget: synchronous optimistic update + `fetch().catch(revert)`
- [ ] `markRead` skips if article already read (`if (!article || article.isRead) return`)
- [ ] `markRead` POSTs to `/api/feeds/articles/${articleId}/read`
- [ ] `toggleStar` POSTs to `/api/feeds/articles/${articleId}/star`
- [ ] `saveToLibrary` POSTs to `/api/feeds/articles/${articleId}/save`
- [ ] `markAllRead` POSTs to `/api/feeds/articles/mark-all-read` with optional `{ feedSourceId }`
- [ ] `markAllRead` on success calls `loadSubscriptions()` to refresh unread counts
- [ ] `loadArticleNote` GETs `/api/feeds/articles/${articleId}/notes`
- [ ] `loadArticleNote` silently returns on non-ok response (no error set)
- [ ] `loadArticleNote` stores empty notes by deleting key from `articleNotes` map
- [ ] `saveArticleNote` trims notes before storing/sending
- [ ] `saveArticleNote` sends `null` to API for empty notes: `{ notes: trimmedNotes || null }`
- [ ] `saveArticleNote` failure is silent (catch block empty)
- [ ] `setLayout` does NOT trigger article reload (only updates layout state)
- [ ] `clearFilters` does NOT reset `searchQuery` (only date and journal)
- [ ] `loadJournals` fetches from `GET /api/feeds/articles/journals`
