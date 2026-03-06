# Journal Feed — Feedly Parity Audit

## Audit Date: 2026-03-06

## Methodology

For each Feedly feature, we verify:
- **Code exists**: The module/function/component implementing it is present
- **Tests pass**: At least one parity test validates the behavior
- **Type-safe**: `tsc --noEmit` passes with the feature code

## Parity Checklist

| # | Feedly Feature | Priority | Status | Evidence (test IDs / files) | Notes |
|---|---|---|---|---|---|
| 1 | Subscribe to RSS feed by URL | Must work | ✅ Covered | JF-P01, JF-P03, JF-P04; `feed-parser.ts`, `actions/feeds.ts:subscribeFeed`, `api/feeds/route.ts` | Parser + action + API route all present |
| 2 | Subscribe to Atom feed by URL | Must work | ✅ Covered | JF-P02, JF-P03, JF-P04; `feed-parser.ts` Atom branch | Same subscribe flow, parser handles both formats |
| 3 | Auto-discover feed from website URL | Must work | ✅ Covered | JF-P05, JF-P06, JF-P07; `feed-discovery.ts`, `api/feeds/detect/route.ts` | HTML link-tag parsing + direct feed detection |
| 4 | Unread/read status per user | Must work | ✅ Covered | JF-P08, JF-P11; `schema/feeds.ts:userArticleStatus.isRead`, `feed-store.ts:markRead` | Per-user via userId+articleId composite key |
| 5 | Mark single article as read | Must work | ✅ Covered | JF-P09, JF-P10, JF-P11; `actions/feeds.ts:markArticleRead`, `api/feeds/articles/[id]/read/route.ts` | Idempotent upsert |
| 6 | Mark all as read (global) | Must work | ✅ Covered | JF-P12, JF-P13, JF-P14; `actions/feeds.ts:markAllRead()`, `api/feeds/articles/mark-all-read/route.ts` | Called with no feedSourceId = global |
| 7 | Mark all as read (per feed) | Must work | ✅ Covered | JF-P12, JF-P13, JF-P14; `actions/feeds.ts:markAllRead(feedSourceId)` | Optional feedSourceId parameter filters to one feed |
| 8 | Star/save articles | Must work | ✅ Covered | JF-P15, JF-P16, JF-P17, JF-P18; `actions/feeds.ts:toggleArticleStar`, `api/feeds/articles/[id]/star/route.ts` | Toggle with optimistic UI |
| 9 | Unstar articles | Must work | ✅ Covered | JF-P16, JF-P18; same toggle function reverses starred state | `toggleArticleStar` handles both star and unstar |
| 10 | Folder organization for feeds | Must work | ✅ Covered | JF-P19, JF-P20, JF-P21; `schema/feeds.ts:userFeedSubscriptions.folder`, `actions/feeds.ts:updateSubscription` | Folder column on subscriptions + filter in store |
| 11 | Filter view: All / Unread / Starred | Must work | ✅ Covered | JF-P22, JF-P23; `feed-store.ts:ViewFilter`, `setViewFilter` | Three-option type: "all" / "unread" / "starred" |
| 12 | Browse feeds by category/topic | Must work | ✅ Covered | JF-P24, JF-P25, JF-P26; `journal-feeds.ts` (75 entries), `actions/feeds.ts:getCuratedFeeds`, `api/feeds/discover/route.ts` | Category + specialty + search filtering |
| 13 | Unread count per feed | Must work | ✅ Covered | JF-P27, JF-P29; `actions/feeds.ts:getSubscriptions` computes per-feed unreadCount | SQL count of unread articles per feed source |
| 14 | Total unread count | Must work | ✅ Covered | JF-P27, JF-P28; `actions/feeds.ts:getSubscriptions` returns totalUnread, store tracks it | Summed across all subscriptions |
| 15 | Article preview with snippet | Must work | ✅ Covered | JF-P30, JF-P31; `schema/feeds.ts:feedArticles.abstractSnippet`, `feed-parser.ts` strips HTML | Max 500 chars, HTML tags removed |
| 16 | Open article in original site | Must work | ✅ Covered | JF-P32, JF-P33, JF-P34; `schema/feeds.ts:feedArticles.link`, `article-reader.tsx` "Open Original" button | `target="_blank"` with ArrowSquareOut icon |
| 17 | Feed health monitoring (error/dead) | Must work | ✅ Covered | JF-P35, JF-P36; `schema/feeds.ts:feedSources.status/consecutiveFailures/lastError`, `enums.ts:feedStatusEnum` | 410 = dead, 10+ failures = error status |
| 18 | Keyboard shortcuts (j/k/o/s) | Must work | ✅ Covered | JF-P37; `feeds/page.tsx` keydown handler for j/k/o/s | j=next, k=prev, o=open original, s=star |
| 19 | Mobile responsive layout | Must work | ✅ Covered | JF-P38; `feeds/page.tsx` uses `hidden lg:block`, `hidden xl:block` | Sidebar hidden on mobile, reader panel on XL only |
| 20 | Background feed refresh (cron) | Must work | ✅ Covered | JF-P39, JF-P40, JF-P41; `api/cron/fetch-feeds/route.ts`, `feed-fetcher.ts:fetchDueFeeds` | Interval-based with CRON_SECRET auth |
| 21 | PubMed search as feed | Must work | ✅ Covered | JF-P42, JF-P43; `pubmed-feed.ts:createPubMedSearchFeed`, `api/feeds/pubmed/route.ts` | UNIQUE to ScholarSync — uses NCBI eUtils WebEnv |
| 22 | Save article to academic Library | Must work | ✅ Covered | JF-P44, JF-P45; `save-to-library.ts:saveFeedArticleToLibrary`, `api/feeds/articles/[id]/save/route.ts` | UNIQUE to ScholarSync — creates paper + userReference |
| 23 | DOI dedup when saving to Library | Must work | ✅ Covered | JF-P44, JF-P46; `save-to-library.ts` DOI+PMID dedup logic, `enums.ts:paperSourceEnum` includes "feed" | UNIQUE — checks DOI then PMID before creating |
| 24 | Pre-curated journal directory | Must work | ✅ Covered | JF-P47, JF-P48; `data/journal-feeds.ts` (75 entries incl NEJM, Lancet, JAMA, BMJ) | UNIQUE to ScholarSync — static directory |
| 25 | OPML import/export | Phase 2 | ⏳ Deferred | | Standard RSS feature |
| 26 | Full-text search across articles | Phase 2 | ⏳ Deferred | | Requires FTS index |
| 27 | One-click citation from article | Phase 2 | ⏳ Deferred | | Wire citation-js |
| 28 | AI article summaries | Phase 2 | ⏳ Deferred | | Uses AI SDK |
| 29 | Smart recommendations | Phase 2 | ⏳ Deferred | | Uses SPECTER2 |
| 30 | Team/shared feed boards | Phase 2 | ⏳ Deferred | | Multi-user feature |
| 31 | Email digest of unread articles | Phase 2 | ⏳ Deferred | | Notification system |
| 32 | Feedly AI (priority intelligence) | Skip | ❌ Out of scope | | Feedly Pro feature |
| 33 | Newsletter/email integration | Skip | ❌ Out of scope | | Not academic use case |
| 34 | Social media feed tracking | Skip | ❌ Out of scope | | Not academic use case |
| 35 | Browser extension | Skip | ❌ Out of scope | | Separate project |
| 36 | Power search with operators | Phase 2 | ⏳ Deferred | | Boolean search on articles |

## Summary

| Category | Count |
|----------|-------|
| Must work — Covered | 24 / 24 |
| Must work — Missing | 0 / 24 |
| Phase 2 — Deferred | 8 |
| Skip — Out of scope | 4 |

## Gaps Requiring Immediate Action

None. All 24 "Must work" items are covered with code + tests.

## Phase 2 Roadmap (prioritized)

1. **OPML import/export** — most-requested RSS feature, straightforward XML conversion
2. **One-click citation** — leverages existing citation-js dependency
3. **Full-text search** — requires pg_trgm or FTS index on feedArticles
4. **AI summaries** — leverages existing AI SDK integration
5. **Power search with operators** — Boolean search on article fields
6. **Smart recommendations** — leverages planned SPECTER2 embedding pipeline
7. **Email digest** — requires notification infrastructure
8. **Team boards** — requires collaboration system
