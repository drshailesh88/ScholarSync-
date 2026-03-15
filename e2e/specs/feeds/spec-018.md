# feeds — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Journal Browser (journal-browser.tsx)
- [x] PASS: Journal empty state: `rounded-xl border border-dashed border-border-subtle px-4 py-6 text-center`
- [x] PASS: Subscribe checks both `journal.isSubscribed` property AND URL match against current subscriptions
- [x] PASS: `subscribedUrls` computed via `useMemo` from subscriptions array
- [x] PASS: Suggested feeds hidden when search is active: `hasSearch ? [] : data?.suggestedFeeds ?? []`
- [x] PASS: Browse feeds exclude suggested in browse mode: `feeds.filter((feed) => !feed.isSuggested)`
- [x] PASS: PubMed create feed uses `trimmedSearch` (not raw `search`) as query
- [x] PASS: PubMed success message: green text `text-xs text-green-500`
- [x] PASS: PubMed error message: red text `text-xs text-red-400`
#### Feed Store — Additional Details (feed-store.ts)
- [x] PASS: `showAdvancedFilters` state: boolean, default `false`
- [x] PASS: `loadSubscriptions` clears error at start: `{ isLoadingSubscriptions: true, error: null }`
- [x] PASS: `loadSubscriptions` fetches from `GET /api/feeds` endpoint
- [x] PASS: `loadSubscriptions` error message from `Error` instance or fallback "Failed to load subscriptions"
- [x] PASS: `loadArticles` always sends `sortDir` parameter (even for default "desc")
- [x] PASS: `loadArticles` only sends `sortBy` when NOT "newest" (omits for default to reduce params)
- [x] PASS: `loadArticles` sends `isRead=false` for unread filter, `isStarred=true` for starred filter
- [x] PASS: `subscribe` POSTs to `/api/feeds` with `{ feedUrl }` body
- [x] PASS: `subscribe` re-throws error after setting store error (enables caller catch)
- [x] PASS: `subscribePubMed` POSTs to `/api/feeds` with `{ pubmedQuery: query }` body
- [x] PASS: `subscribePubMed` re-throws error after setting store error
- [x] PASS: `markRead` is fire-and-forget: synchronous optimistic update + `fetch().catch(revert)`
- [x] PASS: `markRead` skips if article already read (`if (!article || article.isRead) return`)
- [x] PASS: `markRead` POSTs to `/api/feeds/articles/${articleId}/read`
- [x] PASS: `toggleStar` POSTs to `/api/feeds/articles/${articleId}/star`
- [x] PASS: `saveToLibrary` POSTs to `/api/feeds/articles/${articleId}/save`
- [x] PASS: `markAllRead` POSTs to `/api/feeds/articles/mark-all-read` with optional `{ feedSourceId }`
- [x] PASS: `markAllRead` on success calls `loadSubscriptions()` to refresh unread counts
- [x] PASS: `loadArticleNote` GETs `/api/feeds/articles/${articleId}/notes`
- [x] PASS: `loadArticleNote` silently returns on non-ok response (no error set)
- [x] PASS: `loadArticleNote` stores empty notes by deleting key from `articleNotes` map
- [x] PASS: `saveArticleNote` trims notes before storing/sending
- [x] PASS: `saveArticleNote` sends `null` to API for empty notes: `{ notes: trimmedNotes || null }`
- [x] PASS: `saveArticleNote` failure is silent (catch block empty)
- [x] PASS: `setLayout` does NOT trigger article reload (only updates layout state)
- [x] PASS: `clearFilters` does NOT reset `searchQuery` (only date and journal)
- [x] PASS: `loadJournals` fetches from `GET /api/feeds/articles/journals`
