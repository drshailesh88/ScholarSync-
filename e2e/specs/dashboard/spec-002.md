# dashboard — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Stats Overview
- [ ] Glass-panel styling on each card
- [ ] Icons render with correct accent color background
- [ ] Stats show `0` for new users (not blank or error)

### Active Manuscripts (Recent Projects)
- [ ] Section title "Active Manuscripts" displayed
- [ ] "View Archive →" link in header navigates to `/projects`
- [ ] Glass-panel container wraps the project list
#### Empty State
- [ ] When no projects exist: "No projects yet. Create your first manuscript to get started."
#### Project Rows (max 4)
- [ ] Each row shows document icon
- [ ] Each row shows project title (font-serif)
- [ ] Each row shows relative time (e.g., "2h ago", "3d ago")
- [ ] Each row shows project type (converted from snake_case to Title Case)
- [ ] Each row shows status badge with correct variant:
- [ ] Each row shows right-arrow icon
- [ ] Clicking a row navigates to `/studio/{project.id}`
- [ ] Hover: background color changes, text color changes
- [ ] Separator lines between rows (not after last row)
#### Relative Time Formatting
- [ ] < 60 seconds → "Just now"
- [ ] < 60 minutes → "Nm ago" (e.g., "5m ago")
- [ ] < 24 hours → "Nh ago" (e.g., "2h ago")
- [ ] < 7 days → "Nd ago" (e.g., "3d ago")
- [ ] ≥ 7 days → Date string (e.g., "Jan 15")

### Recent Searches
- [ ] Section title "Recent Searches" displayed
- [ ] "Search →" link in header navigates to `/research`
- [ ] Glass-panel container
#### Empty State
- [ ] When no searches: "No searches yet. Start exploring academic papers."
#### Search Rows (max 5)
- [ ] MagnifyingGlass icon on each row
- [ ] Original query text displayed
- [ ] Result count shown (e.g., "42 results")
- [ ] Creation time displayed (relative format)
- [ ] Source shown if not "all"
- [ ] Separator lines between rows
- [ ] Hover: background color changes

### Recent Activity
- [ ] Section title "Recent Activity" displayed
- [ ] Glass-panel container
- [ ] Bottom grid: side-by-side with Recent Searches on desktop, stacked on mobile
