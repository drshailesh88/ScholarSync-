# projects — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Tab switching is entirely client-side through the memoized `filtered` array
- [x] PASS: Search filtering is case-insensitive through `p.title.toLowerCase().includes(search.toLowerCase())`
- [x] PASS: Status filter compares `p.status` directly to the selected filter value
- [x] PASS: Search input and status filter remain unchanged when view mode changes
- [x] PASS: Search input and status filter remain unchanged when tabs change
- [x] PASS: Status filter select includes exactly six options: all, planning, drafting, reviewing, completed, archived
- [x] PASS: List view renders through the shared `DataTable` component
- [x] PASS: Table rows become clickable because `onRowClick` is provided
- [x] PASS: Clicking a list row navigates to `/studio/{item.id}`
- [x] PASS: Name column renders type icon plus truncated title text
- [x] PASS: Type column falls back to `Project` when `project_type` is null or unmapped
- [x] PASS: Status cell is a button, not static text
- [x] PASS: Status hover affordance uses a `CaretDown` icon with `opacity-0` until the group is hovered
- [x] PASS: Edit action button uses `title="Edit project"`
- [x] PASS: Archive action button uses `title="Archive project"`
- [x] PASS: Delete action button uses `title="Delete project"`
- [x] PASS: Archived list rows do not render the Archive action button
- [x] PASS: Grid view renders one, two, or three columns through `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [x] PASS: Clicking a grid card navigates to `/studio/{project.id}`
- [x] PASS: Grid card top bar is a fixed `bg-brand` strip in the current implementation
- [x] PASS: Grid card title uses `truncate` to prevent wrapping
- [x] PASS: Grid card subtitle is `{getTypeLabel(project_type)} · {formatDate(updated_at)}`
- [x] PASS: Grid card paper count pluralizes `paper` vs `papers`
- [x] PASS: Grid card doc count pluralizes `doc` vs `docs`
- [x] PASS: Archived grid cards do not render the Archive action button
- [x] PASS: Opening the modal shows the title `New Project`
- [x] PASS: `Project Name` input defaults to an empty string and has `autoFocus`
- [x] PASS: `Type` select defaults to `review_article`
- [x] PASS: `Target Journal` input defaults to an empty string
- [x] PASS: `Deadline` input defaults to an empty string
- [x] PASS: `Citation Style` select defaults to `vancouver`
- [x] PASS: Closing the modal through `onClose` resets every create-form field to its default value
- [x] PASS: `Create Project` is disabled when `newName.trim()` is empty
- [x] PASS: `Create Project` is disabled while `creating` is true
- [x] PASS: Pressing Enter inside `Project Name` triggers `handleCreate()`
