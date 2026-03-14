# feeds — Spec 001

STATUS: PARTIAL
TESTED: 35/35
PASS: 12
FAIL: 23
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Page Overview & Layout
#### Layout
- [x] PASS: Three-column layout: Sidebar (w-56) | Article List (flex) | Reader/Copilot (420px)
- [x] PASS: Sidebar hidden on mobile, visible on `lg` breakpoint
- [x] PASS: Reader/Copilot hidden on mobile, visible on `xl` breakpoint
- [ ] FAIL: Responsive stacking on smaller viewports
#### Empty State (No Subscriptions)
- [ ] FAIL: RSS icon displayed
- [x] PASS: Title: "Your Journal Feed is empty"
- [ ] FAIL: Description: "Subscribe to medical journals, PubMed searches, or any RSS feed to stay current with the latest research."
- [ ] FAIL: "Add Your First Feed" action button

### Header Controls
- [x] PASS: Title: "Journal Feed"
- [x] PASS: Unread badge: "{totalUnread} unread article(s)"
#### Error Banner
- [ ] FAIL: Red background (red-500/10) when error present
- [ ] FAIL: Error text displayed
- [ ] FAIL: Dismiss button (X) clears error

### Feed Sidebar
#### View Filters
- [ ] FAIL: "FILTER" header with FunnelSimple icon
- [ ] FAIL: **All Articles** — RSS icon, shows all articles
- [ ] FAIL: **Unread** — Circle icon (brand color), filters to unread only
- [ ] FAIL: **Starred** — Star icon (filled when selected), filters to starred
- [ ] FAIL: Active filter visually highlighted
#### Folder Groups
- [x] PASS: Subscriptions grouped by folder name
- [ ] FAIL: Folder header shows: folder name + unread count (right-aligned)
- [ ] FAIL: Clicking folder filters articles to that folder
- [x] PASS: Selected folder: `bg-surface-raised`, `text-ink`
- [x] PASS: Unselected hover: `text-ink-muted` → `text-ink`
#### Feed Items (within folders or ungrouped)
- [ ] FAIL: Favicon (4×4) + truncated feed name
- [ ] FAIL: Unread badge (small pill, brand background) if unread > 0
- [ ] FAIL: Clicking selects that feed (filters articles)
#### Mute Toggle
- [x] PASS: Mute button appears on hover (Bell/BellSlash icon)
- [ ] FAIL: Click toggles mute state via `PATCH /api/feeds/{id}`
- [ ] FAIL: Optimistic UI update
- [x] PASS: Muted feeds: BellSlash icon shown
#### Ungrouped Feeds
- [ ] FAIL: "FEEDS" header (uppercase)
- [ ] FAIL: Same FeedItem layout as folder feeds

### Article List
- [x] PASS: Article search bar at top
- [ ] FAIL: Articles render based on selected layout mode
#### Loading State
- [ ] FAIL: 5 skeleton cards displayed while loading
