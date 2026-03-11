# projects — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Tab switching is entirely client-side through the memoized `filtered` array
- [ ] Search filtering is case-insensitive through `p.title.toLowerCase().includes(search.toLowerCase())`
- [ ] Status filter compares `p.status` directly to the selected filter value
- [ ] Search input and status filter remain unchanged when view mode changes
- [ ] Search input and status filter remain unchanged when tabs change
- [ ] Status filter select includes exactly six options: all, planning, drafting, reviewing, completed, archived
- [ ] List view renders through the shared `DataTable` component
- [ ] Table rows become clickable because `onRowClick` is provided
- [ ] Clicking a list row navigates to `/studio/{item.id}`
- [ ] Name column renders type icon plus truncated title text
- [ ] Type column falls back to `Project` when `project_type` is null or unmapped
- [ ] Status cell is a button, not static text
- [ ] Status hover affordance uses a `CaretDown` icon with `opacity-0` until the group is hovered
- [ ] Edit action button uses `title="Edit project"`
- [ ] Archive action button uses `title="Archive project"`
- [ ] Delete action button uses `title="Delete project"`
- [ ] Archived list rows do not render the Archive action button
- [ ] Grid view renders one, two, or three columns through `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] Clicking a grid card navigates to `/studio/{project.id}`
- [ ] Grid card top bar is a fixed `bg-brand` strip in the current implementation
- [ ] Grid card title uses `truncate` to prevent wrapping
- [ ] Grid card subtitle is `{getTypeLabel(project_type)} · {formatDate(updated_at)}`
- [ ] Grid card paper count pluralizes `paper` vs `papers`
- [ ] Grid card doc count pluralizes `doc` vs `docs`
- [ ] Archived grid cards do not render the Archive action button
- [ ] Opening the modal shows the title `New Project`
- [ ] `Project Name` input defaults to an empty string and has `autoFocus`
- [ ] `Type` select defaults to `review_article`
- [ ] `Target Journal` input defaults to an empty string
- [ ] `Deadline` input defaults to an empty string
- [ ] `Citation Style` select defaults to `vancouver`
- [ ] Closing the modal through `onClose` resets every create-form field to its default value
- [ ] `Create Project` is disabled when `newName.trim()` is empty
- [ ] `Create Project` is disabled while `creating` is true
- [ ] Pressing Enter inside `Project Name` triggers `handleCreate()`
