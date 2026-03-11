# projects — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Search & Status Filter
#### Combined Filtering
- [ ] Clearing all filters shows every project

### List View
#### Row Behavior
- [ ] Each row represents one project
- [ ] Rows render in order from API (updated_at DESC)
- [ ] Hovering the status button reveals the `CaretDown` icon on the badge control
- [ ] Clicking the status badge/caret opens the Status Update Modal
- [ ] Table is wrapped in a horizontal overflow container
#### Action Buttons (per row)
- [ ] Edit navigates correctly to the studio page for that project
- [ ] Archive triggers `archiveProject(id)` server action
- [ ] Delete triggers `deleteProject(id)` server action
- [ ] All actions target the correct project ID

### Grid View
#### Card Layout
- [ ] Projects displayed in a responsive grid of cards
- [ ] Each card has a fixed brand-colored bar at the top
#### Card Content
- [ ] **Type icon** displayed on card
- [ ] **Status badge** displayed on card
- [ ] **Project title** prominent
- [ ] Subtitle line: `"{type} · {lastEdited}"` format
- [ ] Footer line uses `Files` and `FileText` icons with singular/plural counts (`paper/papers`, `doc/docs`)
- [ ] Cards are clickable or have clear navigation affordance
#### Grid Behavior
- [ ] Grid adapts columns based on viewport width
- [ ] Cards share a consistent structure, while final height remains content-driven
- [ ] Filtering/search/tabs work identically in grid view as in list view

### Project Type Icons
- [ ] All 13 project types map to exactly one of the 5 icon groups
- [ ] Icons render at appropriate size in both list and grid views

### Status Badges
- [ ] Badges display the correct text label
- [ ] Badge color matches the status mapping
- [ ] Badges appear consistently in both list rows and grid cards

### New Project Modal
#### Modal Trigger
- [ ] Clicking **"New Project"** button opens modal
- [ ] Clicking **"Create Your First Project"** (empty state) opens modal
- [ ] Modal has `X` close button
- [ ] Clicking outside modal or pressing Escape closes it
#### Modal Header
- [ ] Title: **"New Project"**
#### Type Dropdown Options
- [ ] Original Article
- [ ] Review Article (default)
- [ ] Systematic Review
- [ ] Meta-Analysis
