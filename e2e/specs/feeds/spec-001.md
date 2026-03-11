# feeds — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Page Overview & Layout
#### Layout
- [ ] Three-column layout: Sidebar (w-56) | Article List (flex) | Reader/Copilot (420px)
- [ ] Sidebar hidden on mobile, visible on `lg` breakpoint
- [ ] Reader/Copilot hidden on mobile, visible on `xl` breakpoint
- [ ] Responsive stacking on smaller viewports
#### Empty State (No Subscriptions)
- [ ] RSS icon displayed
- [ ] Title: "Your Journal Feed is empty"
- [ ] Description: "Subscribe to medical journals, PubMed searches, or any RSS feed to stay current with the latest research."
- [ ] "Add Your First Feed" action button

### Header Controls
- [ ] Title: "Journal Feed"
- [ ] Unread badge: "{totalUnread} unread article(s)"
#### Error Banner
- [ ] Red background (red-500/10) when error present
- [ ] Error text displayed
- [ ] Dismiss button (X) clears error

### Feed Sidebar
#### View Filters
- [ ] "FILTER" header with FunnelSimple icon
- [ ] **All Articles** — RSS icon, shows all articles
- [ ] **Unread** — Circle icon (brand color), filters to unread only
- [ ] **Starred** — Star icon (filled when selected), filters to starred
- [ ] Active filter visually highlighted
#### Folder Groups
- [ ] Subscriptions grouped by folder name
- [ ] Folder header shows: folder name + unread count (right-aligned)
- [ ] Clicking folder filters articles to that folder
- [ ] Selected folder: `bg-surface-raised`, `text-ink`
- [ ] Unselected hover: `text-ink-muted` → `text-ink`
#### Feed Items (within folders or ungrouped)
- [ ] Favicon (4×4) + truncated feed name
- [ ] Unread badge (small pill, brand background) if unread > 0
- [ ] Clicking selects that feed (filters articles)
#### Mute Toggle
- [ ] Mute button appears on hover (Bell/BellSlash icon)
- [ ] Click toggles mute state via `PATCH /api/feeds/{id}`
- [ ] Optimistic UI update
- [ ] Muted feeds: BellSlash icon shown
#### Ungrouped Feeds
- [ ] "FEEDS" header (uppercase)
- [ ] Same FeedItem layout as folder feeds

### Article List
- [ ] Article search bar at top
- [ ] Articles render based on selected layout mode
#### Loading State
- [ ] 5 skeleton cards displayed while loading
