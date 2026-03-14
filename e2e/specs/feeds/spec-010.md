# feeds — Spec 010

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Route-level error boundary message reads `We couldn't load your feeds. Please try again.`
#### Actual Current Behavior Corrections
- [x] PASS: Default view filter is `Unread`, not `All Articles`.
- [x] PASS: The page-level header always marks all visible feeds read globally; there is no page-level picker for a specific-feed mark-all-read action.
- [x] PASS: Search is not debounced in the current store; each change immediately triggers `loadArticles()`.
- [x] PASS: `Clear all filters` does not clear the search query.
- [x] PASS: Advanced `Sort by` options do not preserve a distinct `Added` or `Title` state in the store; they normalize back into the legacy feed sort modes.
- [x] PASS: Import/export feedback uses `alert(...)` or silent failure, not toast notifications.
- [ ] FAIL: Feed mute/unmute is not optimistic in the current implementation; it waits for a PATCH then reloads subscriptions.
- [x] PASS: Copilot-related fetch failures generally clear loading state without rendering a dedicated inline error panel.
#### Page-Level Rendering Logic (page.tsx)
- [x] PASS: Page container height is `h-[calc(100vh-7rem)]`
- [x] PASS: `hasSubscriptions` check includes `isLoadingSubscriptions` — content layout shown while subscriptions still loading (never flashes empty state during load)
- [x] PASS: CopilotPanel and ArticleReader are mutually exclusive via ternary: when `copilotOpen && selectedArticleId`, CopilotPanel replaces ArticleReader
- [x] PASS: onAI handler in ArticleList sets selected article FIRST, then opens copilot after 50ms `setTimeout` delay
- [x] PASS: `citeArticle` state is `FeedArticleWithStatus | null`; CitationModal visibility controlled by non-null citeArticle
- [x] PASS: CitationModal `onClose` sets `citeArticle` to `null`
- [x] PASS: AddFeedModal `onClose` sets `showAddModal` to `false`
- [x] PASS: Main content area uses `flex gap-4 flex-1 min-h-0`
#### Header Specifics (page.tsx)
- [x] PASS: Header title `text-xl font-bold text-ink`
- [x] PASS: Unread text `text-xs text-ink-muted mt-0.5`
- [x] PASS: Unread text singular form: "1 unread article" (no trailing "s" when `totalUnread === 1`)
- [x] PASS: Export button icon: `Export` from phosphor-icons (not Download)
- [x] PASS: Export button label text: "Export" (visible inline text, not tooltip-only)
- [x] PASS: Import button icon: `Upload` from phosphor-icons
- [x] PASS: Import button label text: "Import" (visible inline text, not tooltip-only)
- [x] PASS: Mark all read icon: `Checks` from phosphor-icons
- [x] PASS: Mark all read label text: "Mark all read" (visible inline)
- [x] PASS: Add Feed button uses `Plus` icon with `weight="bold"`
- [x] PASS: Add Feed button is primary styled: `bg-brand text-white text-sm font-medium`
- [x] PASS: All other header buttons use `text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised`
- [x] PASS: Sort segmented control container: `bg-surface-raised rounded-xl p-0.5`
- [x] PASS: Layout control container: `bg-surface-raised rounded-lg p-0.5` (different rounding from sort)
- [x] PASS: Active sort button styling: `bg-surface text-ink shadow-sm`
- [x] PASS: Inactive sort button styling: `text-ink-muted hover:text-ink`
- [x] PASS: Layout buttons have `aria-label` attributes matching their label values
- [x] PASS: Error banner full styling: `bg-red-500/10 border border-red-500/20 text-red-400 text-sm`
