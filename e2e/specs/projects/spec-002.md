# projects — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Search & Status Filter
#### Combined Filtering
- [x] PASS: Clearing all filters shows every project

### List View
#### Row Behavior
- [x] PASS: Each row represents one project
- [x] PASS: Rows render in order from API (updated_at DESC)
- [x] PASS: Hovering the status button reveals the `CaretDown` icon on the badge control
- [x] PASS: Clicking the status badge/caret opens the Status Update Modal
- [x] PASS: Table is wrapped in a horizontal overflow container
#### Action Buttons (per row)
- [x] PASS: Edit navigates correctly to the studio page for that project
- [x] PASS: Archive triggers `archiveProject(id)` server action
- [x] PASS: Delete triggers `deleteProject(id)` server action
- [x] PASS: All actions target the correct project ID

### Grid View
#### Card Layout
- [x] PASS: Projects displayed in a responsive grid of cards
- [x] PASS: Each card has a fixed brand-colored bar at the top
#### Card Content
- [x] PASS: **Type icon** displayed on card
- [x] PASS: **Status badge** displayed on card
- [x] PASS: **Project title** prominent
- [x] PASS: Subtitle line: `"{type} · {lastEdited}"` format
- [x] PASS: Footer line uses `Files` and `FileText` icons with singular/plural counts (`paper/papers`, `doc/docs`)
- [x] PASS: Cards are clickable or have clear navigation affordance
#### Grid Behavior
- [x] PASS: Grid adapts columns based on viewport width
- [x] PASS: Cards share a consistent structure, while final height remains content-driven
- [x] PASS: Filtering/search/tabs work identically in grid view as in list view

### Project Type Icons
- [x] PASS: All 13 project types map to exactly one of the 5 icon groups
- [x] PASS: Icons render at appropriate size in both list and grid views

### Status Badges
- [x] PASS: Badges display the correct text label
- [x] PASS: Badge color matches the status mapping
- [x] PASS: Badges appear consistently in both list rows and grid cards

### New Project Modal
#### Modal Trigger
- [x] PASS: Clicking **"New Project"** button opens modal
- [x] PASS: Clicking **"Create Your First Project"** (empty state) opens modal
- [x] PASS: Modal has `X` close button
- [x] PASS: Clicking outside modal or pressing Escape closes it
#### Modal Header
- [x] PASS: Title: **"New Project"**
#### Type Dropdown Options
- [x] PASS: Original Article
- [x] PASS: Review Article (default)
- [x] PASS: Systematic Review
- [x] PASS: Meta-Analysis
