# projects — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Loading & Error States
#### Route-Level Error Boundary (`error.tsx`)
- [x] PASS: Route-level error UI passes `error` and `reset` into `ErrorDisplay`

### Data Fetching & Server Actions
#### Data Ordering
- [x] PASS: Projects returned ordered by `updated_at` DESC (most recent first)
- [x] PASS: New actions that modify a project update `updated_at`, moving it to the top
#### Path Revalidation
- [x] PASS: `createProject` revalidates `/projects` and `/dashboard`
- [x] PASS: `updateProject`, `updateProjectStatus`, `archiveProject`, and `deleteProject` all revalidate `/projects` and `/dashboard`

### Quick Test Workflows
#### View State and Navigation
- [x] PASS: Default `viewMode` is `list` on first render
- [x] PASS: Initial in-component fetch shows a centered `SpinnerGap` loading indicator while `getProjects()` resolves
- [x] PASS: Clicking an entire list row navigates to `/studio/{project_id}` via `DataTable` row click
- [x] PASS: `updated_at` falls back to an em dash (`—`) when a project has no last-edited timestamp
#### Create Project Flow
- [x] PASS: Closing the New Project modal resets all create-form fields back to their defaults
- [x] PASS: Successful project creation redirects to `/editor/new?project={newProjectId}`
#### Grid and Action Behavior
- [x] PASS: Archived projects hide the Archive action button in both list rows and grid cards
- [x] PASS: Grid footer pluralizes resource counts (`1 paper` vs `2 papers`, `1 doc` vs `2 docs`)
- [x] PASS: Inline status and action controls call `stopPropagation()` so they do not trigger row/card navigation
#### Optimistic Recovery
- [x] PASS: Failed delete requests trigger `fetchProjects()` to restore the server state after optimistic removal
- [x] PASS: Failed archive requests trigger `fetchProjects()` to restore the server state after optimistic archiving
- [x] PASS: Failed status updates trigger `fetchProjects()` to restore the server state after optimistic badge changes
- [x] PASS: Closing the Status Update modal clears the stored `statusTarget` project context
- [x] PASS: Mutation failures only log to the console; the page shows no toast, inline alert, or dialog-level error message
#### Detailed QA Coverage
- [x] PASS: `loading` defaults to `true` before the first `getProjects()` call resolves
- [x] PASS: `activeTab` defaults to `all`
- [x] PASS: `search` defaults to an empty string
- [x] PASS: `statusFilter` defaults to `all`
- [x] PASS: `viewMode` defaults to `list`
- [x] PASS: `showNewModal` defaults to `false`
- [x] PASS: `showStatusModal` defaults to `false`
- [x] PASS: Initial page fetch calls `getProjects()` through `fetchProjects()`
- [x] PASS: Initial fetch failure logs `Failed to load projects:` to the console
- [x] PASS: While `loading` is true, the page shows only a centered `SpinnerGap` icon
- [x] PASS: Header count badge displays `projects.length`, not `filtered.length`
- [x] PASS: List/Grid toggle is rendered as a two-button segmented control
- [x] PASS: List toggle is the selected button on first render
- [x] PASS: Selected view button uses `bg-surface-raised text-ink`
- [x] PASS: Unselected view button uses `text-ink-muted` with hover text-color change
- [x] PASS: Clicking `New Project` sets `showNewModal` to `true`
