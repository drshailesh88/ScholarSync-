# dashboard — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Recent Activity
#### Empty State
- [ ] When no activity: "No activity yet. Your research actions will appear here."
#### Activity Rows (max 8)
- [ ] ClockCounterClockwise icon on each row
- [ ] Action type displayed (converted from snake_case to Title Case)
- [ ] Entity type displayed
- [ ] Creation time displayed (relative format)
- [ ] Separator lines between rows
- [ ] Hover: background color changes

### App Shell — Sidebar Navigation
- [ ] Sidebar visible on `md:` breakpoint and above
- [ ] Sidebar hidden on mobile (overlay mode)
- [ ] Logo at top of sidebar
#### Navigation Sections
- [ ] Active page has highlighted styling
- [ ] User button (Clerk) at bottom of sidebar
- [ ] Mobile: hamburger menu opens sidebar overlay
- [ ] Mobile: clicking outside overlay closes sidebar

### App Shell — Header
- [ ] Dynamic greeting based on time of day:
- [ ] "Good morning" (before noon)
- [ ] "Good afternoon" (noon–6pm)
- [ ] "Good evening" (after 6pm)
- [ ] Notification bell icon displayed (placeholder)
- [ ] Theme toggle button works (light ↔ dark)
- [ ] Header spans full width above content area

### Command Palette
- [ ] Opens with `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- [ ] Search input for filtering commands
- [ ] Navigation commands available: Dashboard, Studio, Literature Search, Notebook, Library, Archive, Compliance, Presentation, Settings
- [ ] Quick actions available: Toggle theme, New Project
- [ ] Typing filters visible commands
- [ ] Enter selects highlighted command
- [ ] Arrow keys navigate options
- [ ] Escape closes palette
- [ ] Clicking outside closes palette

### Loading State
- [ ] Skeleton UI displays while server data loads
- [ ] Skeleton for action cards section header
- [ ] 4 skeleton cards in grid (matching action cards layout)
- [ ] Skeleton for projects section header
- [ ] SkeletonTable with 4 rows (icon, content, badge placeholders)
