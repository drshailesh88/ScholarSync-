# feeds — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Feed Sidebar Rendering (feed-sidebar.tsx)
- [x] PASS: Selected feed item: `bg-surface-raised text-ink font-medium`
- [x] PASS: Unselected feed item: `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
#### Article List Rendering (article-list.tsx)
- [x] PASS: Skeleton condition: `isLoading && articles.length === 0` (only on first-page load)
- [x] PASS: Empty condition: `!isLoading && articles.length === 0`
- [x] PASS: Card component dynamically selected: `layout === "list"` → ArticleCardList, `"magazine"` → ArticleCardMagazine, else ArticleCard
- [x] PASS: Article spacing: magazine `space-y-4`, list/card `space-y-1`
- [x] PASS: Load more button: `w-full py-2 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-raised disabled:opacity-50`
- [x] PASS: Load more container: `pt-3 pb-1 shrink-0`
- [x] PASS: List view `ArticleCardList` does NOT accept `onCite`/`onAI` props — no action buttons possible in list layout
#### Article Card — Card View (article-card.tsx)
- [x] PASS: ArticleCard root element is a `<button>` (not div)
- [x] PASS: Unread dot color: `bg-brand` (design-system brand token, not hard-coded blue)
- [x] PASS: Source title reads from `article.feedSourceTitle` field
- [x] PASS: Favicon fallback: `article.feedSourceFaviconUrl || getFaviconUrl(article.feedSourceSiteUrl ?? article.link ?? "")`
- [x] PASS: `formatRelativeTime()` outputs: "just now" (<1 min), "{n}m ago", "{n}h ago", "{n}d ago", or `toLocaleDateString()` (≥30 days)
- [x] PASS: Abstract snippet truncated to first 120 characters + "..." in card view only (magazine shows full text)
- [x] PASS: Snippet only rendered when `article.abstractSnippet` is truthy
- [x] PASS: Snippet styling: `text-xs text-ink-muted/70 line-clamp-2`
- [x] PASS: Action row parent div has `onClick={(e) => e.stopPropagation()}` to prevent card selection
- [x] PASS: Star button title attribute: "Unstar" when starred, "Star" when not
- [x] PASS: Star icon color when starred: `text-yellow-500 hover:text-yellow-400` (text color only, no background)
- [x] PASS: Save button title attribute: "Saved" when saved, "Save to Library" when not
- [x] PASS: Save icon color when saved: `text-brand` (no background)
- [x] PASS: Cite button has its own inline `e.stopPropagation()` in onClick
- [x] PASS: AI button has its own inline `e.stopPropagation()` in onClick
- [x] PASS: DOI link is an `<a>` element (not button), opens `https://doi.org/${article.doi}`
- [x] PASS: DOI link text: "DOI" (not the actual doi value)
- [x] PASS: DOI link has its own `e.stopPropagation()` on click
- [x] PASS: DOI link only shown when `article.doi` is truthy
#### Article Card — List View (article-card-list.tsx)
- [x] PASS: List view root element is a `<button>`
- [x] PASS: List view unread styling: `font-medium` on the entire button row
- [x] PASS: List view read styling: `text-ink-muted` on the entire button row
- [x] PASS: Read article spacer: empty `<span>` with `w-2 h-2 shrink-0 aria-hidden="true"` (preserves alignment)
- [x] PASS: Title truncated via `truncate` (single-line ellipsis, not line-clamp)
- [x] PASS: Feed name visibility: `hidden md:inline` (hidden on small screens, visible from md breakpoint)
- [x] PASS: Reading time visibility: `hidden lg:inline` (hidden below lg breakpoint)
