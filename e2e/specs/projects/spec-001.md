# projects — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Page Overview & Layout
#### Layout
- [ ] Page renders as a client component (`"use client"`)
- [ ] All sections visible after data loads
- [ ] Header, tabs, search/filter row, and project listing all render in order
- [ ] Responsive layout adapts to viewport size

### Header & Controls
#### Title & Badge
- [ ] Page title displays **"My Projects"**
- [ ] Badge next to title shows total project count
- [ ] Badge count updates when projects are added or removed
#### View Mode Toggle
- [ ] **List** button with `List` (Phosphor) icon
- [ ] **Grid** button with `SquaresFour` (Phosphor) icon
- [ ] Active mode is visually highlighted
- [ ] Clicking toggles between `"list"` and `"grid"` view modes
- [ ] Selected mode persists during session (state-based)
#### New Project Button
- [ ] Displays `Plus` icon with label **"New Project"**
- [ ] Clicking opens the New Project Modal
- [ ] Button visible at all times regardless of project count

### Tab Navigation
- [ ] All four tabs render in a horizontal row
- [ ] Active tab is visually distinguished from inactive tabs
- [ ] Clicking a tab filters the project list to matching types
- [ ] "All Projects" tab shows every project regardless of type
- [ ] Tab switch is immediate (client-side filter, no refetch)
- [ ] Tab works in combination with search and status filter
- [ ] Switching tabs does not reset the search input or status filter

### Search & Status Filter
#### Search Input
- [ ] Placeholder text: **"Search projects..."**
- [ ] `MagnifyingGlass` icon present
- [ ] Typing filters projects by title (client-side)
- [ ] Clearing the input restores the full filtered list
- [ ] Works in combination with active tab and status filter
#### Status Filter Dropdown
- [ ] `FunnelSimple` icon displayed
- [ ] Default option: **"All Statuses"**
- [ ] Dropdown lists all five statuses: Planning, Drafting, Reviewing, Completed, Archived
- [ ] Selecting a status filters projects to that status only
- [ ] Selecting "All Statuses" removes the status filter
- [ ] Works in combination with active tab and search input
#### Combined Filtering
- [ ] Tab + Search + Status all compound correctly
- [ ] Example: "Articles" tab + search "crispr" + status "drafting" = only articles matching "crispr" with drafting status
