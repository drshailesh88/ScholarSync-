# Projects — Feature Doc Gaps

**Original doc:** `PROJECTS_FEATURES_TESTING.md`
**Original checkbox count:** 145
**After Codex pass 1:** 233 checks
**After Claude Code pass 2:** 293 checks (60 new)
**Behavior corrections in pass 2:** 6

## Missing Features

### View State and Navigation
- [ ] Default `viewMode` is `list` on first render
- [ ] Initial in-component fetch shows a centered `SpinnerGap` loading indicator while `getProjects()` resolves
- [ ] Clicking an entire list row navigates to `/studio/{project_id}` via `DataTable` row click
- [ ] `updated_at` falls back to an em dash (`—`) when a project has no last-edited timestamp

### Create Project Flow
- [ ] Closing the New Project modal resets all create-form fields back to their defaults
- [ ] Successful project creation redirects to `/editor/new?project={newProjectId}`

### Grid and Action Behavior
- [ ] Archived projects hide the Archive action button in both list rows and grid cards
- [ ] Grid footer pluralizes resource counts (`1 paper` vs `2 papers`, `1 doc` vs `2 docs`)

### Optimistic Recovery
- [ ] Failed delete requests trigger `fetchProjects()` to restore the server state after optimistic removal
- [ ] Failed archive requests trigger `fetchProjects()` to restore the server state after optimistic archiving
- [ ] Failed status updates trigger `fetchProjects()` to restore the server state after optimistic badge changes
- [ ] Closing the Status Update modal clears the stored `statusTarget` project context

### Detailed QA Coverage
- [ ] `loading` defaults to `true`; `activeTab` defaults to `all`; `search` starts empty; `statusFilter` starts as `all`; and `viewMode` starts as `list`
- [ ] Initial fetch goes through `fetchProjects()` and logs `Failed to load projects:` on failure
- [ ] Loading state is a centered `SpinnerGap`, distinct from the route-level skeleton loader
- [ ] Header count badge shows total `projects.length`, not the filtered count
- [ ] View toggle is a two-button segmented control with list selected by default
- [ ] Filtering is entirely client-side via the memoized `filtered` array
- [ ] Search matching is case-insensitive against `p.title`
- [ ] Status filter options are exactly all, planning, drafting, reviewing, completed, and archived
- [ ] List view is rendered through `DataTable` and makes the entire row navigate to `/studio/{id}`
- [ ] Name column renders type icon plus truncated title
- [ ] Type column falls back to `Project` for null or unmapped types
- [ ] Status column is a button with hover-only `CaretDown`
- [ ] Action buttons use `title` attributes: `Edit project`, `Archive project`, and `Delete project`
- [ ] Archived rows and cards hide the Archive action
- [ ] Grid layout uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] Grid top accent bar is fixed `bg-brand`, not data-driven
- [ ] Grid subtitle is `{type} · {lastEdited}` and footer pluralizes paper/doc counts
- [ ] New Project modal defaults are empty name, `review_article` type, empty target journal, empty deadline, and `vancouver` citation style
- [ ] Project Name input has `autoFocus`
- [ ] Closing the create modal resets every field to its default value
- [ ] Create payload omits empty `target_journal` and `deadline`
- [ ] Successful creation routes to `/editor/new?project={id}` after closing the modal
- [ ] Failed creation logs `Failed to create project:` and leaves the modal open
- [ ] Opening the status modal copies the selected project into `statusTarget` and initializes `pendingStatus`
- [ ] Status pipeline renders planning, drafting, reviewing, completed, then archived in a separate section
- [ ] Selected status option shows a trailing `Selected` label
- [ ] `Update Status` is disabled when no status change is pending
- [ ] Failed status updates log an error and re-fetch projects
- [ ] Delete, archive, and status update all mutate local state optimistically before awaiting the server
- [ ] Zero-state renders only when there are no projects at all; filtered-empty renders only when projects exist but filters remove all matches
- [ ] Filtered-empty state has no clear-filters action in the current implementation
- [ ] `formatDate(null)` returns an em dash (`—`)

## Features in doc that DON'T EXIST in the app
- The grid-card top accent bar is currently a fixed brand-colored strip, not a bar derived from project type or status.
- The generated doc does not distinguish between the route-level skeleton loader and the page component's own centered spinner while `getProjects()` is fetching.
- Successful project creation does not route directly to `/studio/{id}`; the live page sends users to `/editor/new?project={id}`.

## Pass 2 — New Coverage Areas

### Behavior Corrections
1. Grid card bar is fixed `bg-brand`, not accent by type/status (Section 6)
2. `Project.id` is `number` not `string` (Section 15)
3. Loading section conflates route-level skeleton with component-level spinner (Section 14)
4. Enter key only submits from Project Name input, not the whole form (Section 9)
5. "Updating..." text never visible — modal closes before re-render (Section 10)
6. Fetch failure shows empty state, not error UI — catch block handles it (Section 14)

### New Sections Added
- Route-level loading.tsx (6 checks)
- Route-level error.tsx with Sentry reporting (6 checks)
- Modal component behavior (6 checks)
- Fallback behaviors for getIcon/getStatus (2 checks)
- Grid card vs list view differences (5 checks)
- Create modal form layout details (6 checks)
- DataTable internals (4 checks)
- Server action internals (5 checks)
- Timing and state edge cases (3 checks)
- formatRelativeTime specifics (5 checks)
- Styling details (8 checks)
- Components referenced but not rendered directly (4 checks)
