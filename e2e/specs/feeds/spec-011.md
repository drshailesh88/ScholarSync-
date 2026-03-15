# feeds — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Header Specifics (page.tsx)
- [x] PASS: Error banner dismiss button is text "Dismiss" (NOT an X icon) — styled `text-red-400 hover:text-red-300 text-xs font-medium`
- [x] PASS: Header `setSortBy("relevance")` sets `sortDir = "desc"` (not "asc")
#### Loading Skeleton (loading.tsx)
- [x] PASS: Loading skeleton header: 1 title skeleton (`h-7 w-40`) + 2 button skeletons (`h-9 w-28 rounded-xl`)
- [x] PASS: Loading skeleton uses identical height constraint `h-[calc(100vh-7rem)]` as actual page
- [x] PASS: Sidebar skeleton: `glass-panel rounded-2xl p-3 h-full` with 8 rows (`h-9 rounded-lg`)
- [x] PASS: Sidebar skeleton hidden below `lg` breakpoint (matches actual sidebar)
- [x] PASS: Article area: 6 `SkeletonCard` components in `space-y-2` layout
#### Error Boundary (error.tsx)
- [x] PASS: Error boundary uses `ErrorDisplay` shared UI component
- [x] PASS: ErrorDisplay shows `WarningCircle` icon (32px) in `bg-red-500/10` container
- [x] PASS: ErrorDisplay "Try Again" button includes `ArrowCounterClockwise` icon
- [x] PASS: ErrorDisplay calls `Sentry.captureException(error)` on mount when error is present
- [x] PASS: Error boundary maps `reset` prop to `onRetry` callback on ErrorDisplay
#### Empty State (feed-empty-state.tsx)
- [x] PASS: Empty state uses `EmptyState` shared UI component
- [x] PASS: EmptyState title styling: `text-lg font-semibold text-ink mb-2`
- [x] PASS: EmptyState description styling: `text-sm text-ink-muted max-w-sm mb-6`
- [x] PASS: EmptyState action button styling: `bg-brand text-white text-sm font-medium hover:bg-brand-hover`
#### Feed Sidebar Rendering (feed-sidebar.tsx)
- [x] PASS: Sidebar panel: `glass-panel rounded-2xl h-full overflow-y-auto p-3`
- [x] PASS: Filter section has bottom border: `border-b border-border-subtle` with `mb-3 pb-3`
- [x] PASS: "FILTER" header styled: `text-[10px] font-semibold tracking-widest text-ink-muted/60`
- [x] PASS: View filter buttons: `w-full px-3 py-2 rounded-lg text-sm font-medium`
- [x] PASS: "All Articles" uses `Rss` icon (16px)
- [x] PASS: "Unread" uses `Circle` icon with `weight="fill"` and `className="text-brand"` always
- [x] PASS: "Starred" uses `Star` icon; weight is `"fill"` ONLY when `viewFilter === "starred" && isAllSelected`
- [x] PASS: View filter active highlighting requires BOTH `viewFilter === f.key` AND `isAllSelected` (selecting a specific feed/folder removes filter highlight)
- [x] PASS: View filter buttons call `setSelectedFeed(null)` AND `setSelectedFolder(null)` in addition to `setViewFilter()`
- [x] PASS: Folder header: `uppercase tracking-wider text-xs font-semibold`
- [x] PASS: Folder child feeds indented with `ml-2` wrapper div
- [x] PASS: FeedItem name derived from `sub.displayName || sub.feedSource.title`
- [x] PASS: FeedItem unread badge: `text-[10px] font-medium tabular-nums px-1.5 py-0.5 rounded-full bg-brand/10 text-brand`
- [x] PASS: FeedItem mute button title attribute: "Unmute" when `sub.isMuted`, "Mute" when not
- [x] PASS: FeedItem mute button disabled styling: `disabled:opacity-40`
- [x] PASS: FeedItem click uses `sub.feedSourceId` for `setSelectedFeed()` (NOT `sub.id`)
- [x] PASS: Mute PATCH URL uses `sub.id` (subscription id, different from feedSourceId)
- [x] PASS: Mute PATCH body: `{ isMuted: !sub.isMuted }`
- [x] PASS: Folder unread count: `text-[10px] tabular-nums text-ink-muted` right-aligned
