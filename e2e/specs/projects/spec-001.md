# projects — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Page Overview & Layout
#### Layout
- [x] PASS: Page renders as a client component (`"use client"`)
- [x] PASS: All sections visible after data loads
- [x] PASS: Header, tabs, search/filter row, and project listing all render in order
- [x] PASS: Responsive layout adapts to viewport size

### Header & Controls
#### Title & Badge
- [x] PASS: Page title displays **"My Projects"**
- [x] PASS: Badge next to title shows total project count
- [x] PASS: Badge count updates when projects are added or removed
#### View Mode Toggle
- [x] PASS: **List** button with `List` (Phosphor) icon
- [x] PASS: **Grid** button with `SquaresFour` (Phosphor) icon
- [x] PASS: Active mode is visually highlighted
- [x] PASS: Clicking toggles between `"list"` and `"grid"` view modes
- [x] PASS: Selected mode persists during session (state-based)
#### New Project Button
- [x] PASS: Displays `Plus` icon with label **"New Project"**
- [x] PASS: Clicking opens the New Project Modal
- [x] PASS: Button visible at all times regardless of project count

### Tab Navigation
- [x] PASS: All four tabs render in a horizontal row
- [x] PASS: Active tab is visually distinguished from inactive tabs
- [x] PASS: Clicking a tab filters the project list to matching types
- [x] PASS: "All Projects" tab shows every project regardless of type
- [x] PASS: Tab switch is immediate (client-side filter, no refetch)
- [x] PASS: Tab works in combination with search and status filter
- [x] PASS: Switching tabs does not reset the search input or status filter

### Search & Status Filter
#### Search Input
- [x] PASS: Placeholder text: **"Search projects..."**
- [x] PASS: `MagnifyingGlass` icon present
- [x] PASS: Typing filters projects by title (client-side)
- [x] PASS: Clearing the input restores the full filtered list
- [x] PASS: Works in combination with active tab and status filter
#### Status Filter Dropdown
- [x] PASS: `FunnelSimple` icon displayed
- [x] PASS: Default option: **"All Statuses"**
- [x] PASS: Dropdown lists all five statuses: Planning, Drafting, Reviewing, Completed, Archived
- [x] PASS: Selecting a status filters projects to that status only
- [x] PASS: Selecting "All Statuses" removes the status filter
- [x] PASS: Works in combination with active tab and search input
#### Combined Filtering
- [x] PASS: Tab + Search + Status all compound correctly
- [x] PASS: Example: "Articles" tab + search "crispr" + status "drafting" = only articles matching "crispr" with drafting status
