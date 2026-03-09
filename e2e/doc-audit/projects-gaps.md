# Projects — Feature Doc Gaps

**Original doc:** `PROJECTS_FEATURES_TESTING.md`
**Original checkbox count:** 145
**Features found in UI:** 151
**Features found in source code:** 157
**Missing from doc:** 12
**Completeness of original doc:** 92.4%

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

## Features in doc that DON'T EXIST in the app
- The grid-card top accent bar is currently a fixed brand-colored strip, not a bar derived from project type or status.
- The generated doc does not distinguish between the route-level skeleton loader and the page component's own centered spinner while `getProjects()` is fetching.
- Successful project creation does not route directly to `/studio/{id}`; the live page sends users to `/editor/new?project={id}`.
