# projects — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Loading & Error States
#### Route-Level Error Boundary (`error.tsx`)
- [ ] Route-level error UI passes `error` and `reset` into `ErrorDisplay`

### Data Fetching & Server Actions
#### Data Ordering
- [ ] Projects returned ordered by `updated_at` DESC (most recent first)
- [ ] New actions that modify a project update `updated_at`, moving it to the top
#### Path Revalidation
- [ ] `createProject` revalidates `/projects` and `/dashboard`
- [ ] `updateProject`, `updateProjectStatus`, `archiveProject`, and `deleteProject` all revalidate `/projects` and `/dashboard`

### Quick Test Workflows
#### View State and Navigation
- [ ] Default `viewMode` is `list` on first render
- [ ] Initial in-component fetch shows a centered `SpinnerGap` loading indicator while `getProjects()` resolves
- [ ] Clicking an entire list row navigates to `/studio/{project_id}` via `DataTable` row click
- [ ] `updated_at` falls back to an em dash (`—`) when a project has no last-edited timestamp
#### Create Project Flow
- [ ] Closing the New Project modal resets all create-form fields back to their defaults
- [ ] Successful project creation redirects to `/editor/new?project={newProjectId}`
#### Grid and Action Behavior
- [ ] Archived projects hide the Archive action button in both list rows and grid cards
- [ ] Grid footer pluralizes resource counts (`1 paper` vs `2 papers`, `1 doc` vs `2 docs`)
- [ ] Inline status and action controls call `stopPropagation()` so they do not trigger row/card navigation
#### Optimistic Recovery
- [ ] Failed delete requests trigger `fetchProjects()` to restore the server state after optimistic removal
- [ ] Failed archive requests trigger `fetchProjects()` to restore the server state after optimistic archiving
- [ ] Failed status updates trigger `fetchProjects()` to restore the server state after optimistic badge changes
- [ ] Closing the Status Update modal clears the stored `statusTarget` project context
- [ ] Mutation failures only log to the console; the page shows no toast, inline alert, or dialog-level error message
#### Detailed QA Coverage
- [ ] `loading` defaults to `true` before the first `getProjects()` call resolves
- [ ] `activeTab` defaults to `all`
- [ ] `search` defaults to an empty string
- [ ] `statusFilter` defaults to `all`
- [ ] `viewMode` defaults to `list`
- [ ] `showNewModal` defaults to `false`
- [ ] `showStatusModal` defaults to `false`
- [ ] Initial page fetch calls `getProjects()` through `fetchProjects()`
- [ ] Initial fetch failure logs `Failed to load projects:` to the console
- [ ] While `loading` is true, the page shows only a centered `SpinnerGap` icon
- [ ] Header count badge displays `projects.length`, not `filtered.length`
- [ ] List/Grid toggle is rendered as a two-button segmented control
- [ ] List toggle is the selected button on first render
- [ ] Selected view button uses `bg-surface-raised text-ink`
- [ ] Unselected view button uses `text-ink-muted` with hover text-color change
- [ ] Clicking `New Project` sets `showNewModal` to `true`
