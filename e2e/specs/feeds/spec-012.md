# feeds — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Feed Sidebar Rendering (feed-sidebar.tsx)
- [ ] Selected feed item: `bg-surface-raised text-ink font-medium`
- [ ] Unselected feed item: `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
#### Article List Rendering (article-list.tsx)
- [ ] Skeleton condition: `isLoading && articles.length === 0` (only on first-page load)
- [ ] Empty condition: `!isLoading && articles.length === 0`
- [ ] Card component dynamically selected: `layout === "list"` → ArticleCardList, `"magazine"` → ArticleCardMagazine, else ArticleCard
- [ ] Article spacing: magazine `space-y-4`, list/card `space-y-1`
- [ ] Load more button: `w-full py-2 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-raised disabled:opacity-50`
- [ ] Load more container: `pt-3 pb-1 shrink-0`
- [ ] List view `ArticleCardList` does NOT accept `onCite`/`onAI` props — no action buttons possible in list layout
#### Article Card — Card View (article-card.tsx)
- [ ] ArticleCard root element is a `<button>` (not div)
- [ ] Unread dot color: `bg-brand` (design-system brand token, not hard-coded blue)
- [ ] Source title reads from `article.feedSourceTitle` field
- [ ] Favicon fallback: `article.feedSourceFaviconUrl || getFaviconUrl(article.feedSourceSiteUrl ?? article.link ?? "")`
- [ ] `formatRelativeTime()` outputs: "just now" (<1 min), "{n}m ago", "{n}h ago", "{n}d ago", or `toLocaleDateString()` (≥30 days)
- [ ] Abstract snippet truncated to first 120 characters + "..." in card view only (magazine shows full text)
- [ ] Snippet only rendered when `article.abstractSnippet` is truthy
- [ ] Snippet styling: `text-xs text-ink-muted/70 line-clamp-2`
- [ ] Action row parent div has `onClick={(e) => e.stopPropagation()}` to prevent card selection
- [ ] Star button title attribute: "Unstar" when starred, "Star" when not
- [ ] Star icon color when starred: `text-yellow-500 hover:text-yellow-400` (text color only, no background)
- [ ] Save button title attribute: "Saved" when saved, "Save to Library" when not
- [ ] Save icon color when saved: `text-brand` (no background)
- [ ] Cite button has its own inline `e.stopPropagation()` in onClick
- [ ] AI button has its own inline `e.stopPropagation()` in onClick
- [ ] DOI link is an `<a>` element (not button), opens `https://doi.org/${article.doi}`
- [ ] DOI link text: "DOI" (not the actual doi value)
- [ ] DOI link has its own `e.stopPropagation()` on click
- [ ] DOI link only shown when `article.doi` is truthy
#### Article Card — List View (article-card-list.tsx)
- [ ] List view root element is a `<button>`
- [ ] List view unread styling: `font-medium` on the entire button row
- [ ] List view read styling: `text-ink-muted` on the entire button row
- [ ] Read article spacer: empty `<span>` with `w-2 h-2 shrink-0 aria-hidden="true"` (preserves alignment)
- [ ] Title truncated via `truncate` (single-line ellipsis, not line-clamp)
- [ ] Feed name visibility: `hidden md:inline` (hidden on small screens, visible from md breakpoint)
- [ ] Reading time visibility: `hidden lg:inline` (hidden below lg breakpoint)
