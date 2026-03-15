# dashboard — Spec 002

STATUS: PARTIAL
TESTED: 35/35
PASS: 29
FAIL: 6
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Stats Overview
- [x] PASS: Glass-panel styling on each card
- [x] PASS: Icons render with correct accent color background
- [x] PASS: Stats show `0` for new users (not blank or error)

### Active Manuscripts (Recent Projects)
- [ ] FAIL: Section title "Active Manuscripts" displayed
- [ ] FAIL: "View Archive →" link in header navigates to `/projects`
- [x] PASS: Glass-panel container wraps the project list
#### Empty State
- [x] PASS: When no projects exist: "No projects yet. Create your first manuscript to get started."
#### Project Rows (max 4)
- [x] PASS: Each row shows document icon
- [x] PASS: Each row shows project title (font-serif)
- [x] PASS: Each row shows relative time (e.g., "2h ago", "3d ago")
- [x] PASS: Each row shows project type (converted from snake_case to Title Case)
- [x] PASS: Each row shows status badge with correct variant:
- [x] PASS: Each row shows right-arrow icon
- [ ] FAIL: Clicking a row navigates to `/studio/{project.id}`
- [x] PASS: Hover: background color changes, text color changes
- [x] PASS: Separator lines between rows (not after last row)
#### Relative Time Formatting
- [x] PASS: < 60 seconds → "Just now"
- [x] PASS: < 60 minutes → "Nm ago" (e.g., "5m ago")
- [x] PASS: < 24 hours → "Nh ago" (e.g., "2h ago")
- [x] PASS: < 7 days → "Nd ago" (e.g., "3d ago")
- [x] PASS: ≥ 7 days → Date string (e.g., "Jan 15")

### Recent Searches
- [ ] FAIL: Section title "Recent Searches" displayed
- [ ] FAIL: "Search →" link in header navigates to `/research`
- [x] PASS: Glass-panel container
#### Empty State
- [x] PASS: When no searches: "No searches yet. Start exploring academic papers."
#### Search Rows (max 5)
- [x] PASS: MagnifyingGlass icon on each row
- [x] PASS: Original query text displayed
- [x] PASS: Result count shown (e.g., "42 results")
- [x] PASS: Creation time displayed (relative format)
- [x] PASS: Source shown if not "all"
- [x] PASS: Separator lines between rows
- [x] PASS: Hover: background color changes

### Recent Activity
- [ ] FAIL: Section title "Recent Activity" displayed
- [x] PASS: Glass-panel container
- [x] PASS: Bottom grid: side-by-side with Recent Searches on desktop, stacked on mobile
