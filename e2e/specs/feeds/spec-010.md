# feeds — Spec 010

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
- [ ] Route-level error boundary message reads `We couldn't load your feeds. Please try again.`
#### Actual Current Behavior Corrections
- [ ] Default view filter is `Unread`, not `All Articles`.
- [ ] The page-level header always marks all visible feeds read globally; there is no page-level picker for a specific-feed mark-all-read action.
- [ ] Search is not debounced in the current store; each change immediately triggers `loadArticles()`.
- [ ] `Clear all filters` does not clear the search query.
- [ ] Advanced `Sort by` options do not preserve a distinct `Added` or `Title` state in the store; they normalize back into the legacy feed sort modes.
- [ ] Import/export feedback uses `alert(...)` or silent failure, not toast notifications.
- [ ] Feed mute/unmute is not optimistic in the current implementation; it waits for a PATCH then reloads subscriptions.
- [ ] Copilot-related fetch failures generally clear loading state without rendering a dedicated inline error panel.
#### Page-Level Rendering Logic (page.tsx)
- [ ] Page container height is `h-[calc(100vh-7rem)]`
- [ ] `hasSubscriptions` check includes `isLoadingSubscriptions` — content layout shown while subscriptions still loading (never flashes empty state during load)
- [ ] CopilotPanel and ArticleReader are mutually exclusive via ternary: when `copilotOpen && selectedArticleId`, CopilotPanel replaces ArticleReader
- [ ] onAI handler in ArticleList sets selected article FIRST, then opens copilot after 50ms `setTimeout` delay
- [ ] `citeArticle` state is `FeedArticleWithStatus | null`; CitationModal visibility controlled by non-null citeArticle
- [ ] CitationModal `onClose` sets `citeArticle` to `null`
- [ ] AddFeedModal `onClose` sets `showAddModal` to `false`
- [ ] Main content area uses `flex gap-4 flex-1 min-h-0`
#### Header Specifics (page.tsx)
- [ ] Header title `text-xl font-bold text-ink`
- [ ] Unread text `text-xs text-ink-muted mt-0.5`
- [ ] Unread text singular form: "1 unread article" (no trailing "s" when `totalUnread === 1`)
- [ ] Export button icon: `Export` from phosphor-icons (not Download)
- [ ] Export button label text: "Export" (visible inline text, not tooltip-only)
- [ ] Import button icon: `Upload` from phosphor-icons
- [ ] Import button label text: "Import" (visible inline text, not tooltip-only)
- [ ] Mark all read icon: `Checks` from phosphor-icons
- [ ] Mark all read label text: "Mark all read" (visible inline)
- [ ] Add Feed button uses `Plus` icon with `weight="bold"`
- [ ] Add Feed button is primary styled: `bg-brand text-white text-sm font-medium`
- [ ] All other header buttons use `text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised`
- [ ] Sort segmented control container: `bg-surface-raised rounded-xl p-0.5`
- [ ] Layout control container: `bg-surface-raised rounded-lg p-0.5` (different rounding from sort)
- [ ] Active sort button styling: `bg-surface text-ink shadow-sm`
- [ ] Inactive sort button styling: `text-ink-muted hover:text-ink`
- [ ] Layout buttons have `aria-label` attributes matching their label values
- [ ] Error banner full styling: `bg-red-500/10 border border-red-500/20 text-red-400 text-sm`
