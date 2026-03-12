# dashboard — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Recent Activity
#### Empty State
- [x] PASS: When no activity: "No activity yet. Your research actions will appear here."
#### Activity Rows (max 8)
- [x] PASS: ClockCounterClockwise icon on each row
- [x] PASS: Action type displayed (converted from snake_case to Title Case)
- [x] PASS: Entity type displayed
- [x] PASS: Creation time displayed (relative format)
- [x] PASS: Separator lines between rows
- [x] PASS: Hover: background color changes

### App Shell — Sidebar Navigation
- [x] PASS: Sidebar visible on `md:` breakpoint and above
- [x] PASS: Sidebar hidden on mobile (overlay mode)
- [x] PASS: Logo at top of sidebar
#### Navigation Sections
- [x] PASS: Active page has highlighted styling
- [x] PASS: User button (Clerk) at bottom of sidebar
- [x] PASS: Mobile: hamburger menu opens sidebar overlay
- [x] PASS: Mobile: clicking outside overlay closes sidebar

### App Shell — Header
- [x] PASS: Dynamic greeting based on time of day:
- [x] PASS: "Good morning" (before noon)
- [x] PASS: "Good afternoon" (noon–6pm)
- [x] PASS: "Good evening" (after 6pm)
- [x] PASS: Notification bell icon displayed (placeholder)
- [x] PASS: Theme toggle button works (light ↔ dark)
- [x] PASS: Header spans full width above content area

### Command Palette
- [x] PASS: Opens with `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- [x] PASS: Search input for filtering commands
- [x] PASS: Navigation commands available: Dashboard, Studio, Literature Search, Notebook, Library, Archive, Compliance, Presentation, Settings
- [x] PASS: Quick actions available: Toggle theme, New Project
- [x] PASS: Typing filters visible commands
- [x] PASS: Enter selects highlighted command
- [x] PASS: Arrow keys navigate options
- [x] PASS: Escape closes palette
- [x] PASS: Clicking outside closes palette

### Loading State
- [x] PASS: Skeleton UI displays while server data loads
- [x] PASS: Skeleton for action cards section header
- [x] PASS: 4 skeleton cards in grid (matching action cards layout)
- [x] PASS: Skeleton for projects section header
- [x] PASS: SkeletonTable with 4 rows (icon, content, badge placeholders)
