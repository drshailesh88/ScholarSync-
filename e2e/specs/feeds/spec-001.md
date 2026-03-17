# feeds — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Page Overview & Layout
#### Layout
- [x] PASS: Three-column layout: Sidebar (w-56) | Article List (flex) | Reader/Copilot (420px)
- [x] PASS: Sidebar hidden on mobile, visible on `lg` breakpoint
- [x] PASS: Reader/Copilot hidden on mobile, visible on `xl` breakpoint
- [x] PASS: Responsive stacking on smaller viewports
#### Empty State (No Subscriptions)
- [x] PASS: RSS icon displayed
- [x] PASS: Title: "Your Journal Feed is empty"
- [x] PASS: Description: "Subscribe to medical journals, PubMed searches, or any RSS feed to stay current with the latest research."
- [x] PASS: "Add Your First Feed" action button

### Header Controls
- [x] PASS: Title: "Journal Feed"
- [x] PASS: Unread badge: "{totalUnread} unread article(s)"
#### Error Banner
- [x] PASS: Red background (red-500/10) when error present
- [x] PASS: Error text displayed
- [x] PASS: Dismiss button (X) clears error

### Feed Sidebar
#### View Filters
- [x] PASS: "FILTER" header with FunnelSimple icon
- [x] PASS: **All Articles** — RSS icon, shows all articles
- [x] PASS: **Unread** — Circle icon (brand color), filters to unread only
- [x] PASS: **Starred** — Star icon (filled when selected), filters to starred
- [x] PASS: Active filter visually highlighted
#### Folder Groups
- [x] PASS: Subscriptions grouped by folder name
- [x] PASS: Folder header shows: folder name + unread count (right-aligned)
- [x] PASS: Clicking folder filters articles to that folder
- [x] PASS: Selected folder: `bg-surface-raised`, `text-ink`
- [x] PASS: Unselected hover: `text-ink-muted` → `text-ink`
#### Feed Items (within folders or ungrouped)
- [x] PASS: Favicon (4×4) + truncated feed name
- [x] PASS: Unread badge (small pill, brand background) if unread > 0
- [x] PASS: Clicking selects that feed (filters articles)
#### Mute Toggle
- [x] PASS: Mute button appears on hover (Bell/BellSlash icon)
- [x] PASS: Click toggles mute state via `PATCH /api/feeds/{id}`
- [x] PASS: Optimistic UI update
- [x] PASS: Muted feeds: BellSlash icon shown
#### Ungrouped Feeds
- [x] PASS: "FEEDS" header (uppercase)
- [x] PASS: Same FeedItem layout as folder feeds

### Article List
- [x] PASS: Article search bar at top
- [x] PASS: Articles render based on selected layout mode
#### Loading State
- [x] PASS: 5 skeleton cards displayed while loading
