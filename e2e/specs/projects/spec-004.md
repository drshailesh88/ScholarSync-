# projects — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Project Actions
#### Edit (Navigate to Studio)
- [x] PASS: `PencilSimple` icon button
- [x] PASS: Navigates to `/studio/{project_id}`
- [x] PASS: Navigation happens without page reload (client-side routing)
#### Archive
- [x] PASS: `Archive` icon button with amber styling
- [x] PASS: Sets project status to `"archived"` via `archiveProject(id)`
- [x] PASS: Project status badge updates to "Archived" immediately (optimistic)
- [x] PASS: Archived projects remain visible (filterable via status filter)
- [x] PASS: Revalidates relevant paths
#### Delete
- [x] PASS: `Trash` icon button with red styling
- [x] PASS: Triggers soft-delete via `deleteProject(id)` (sets `deleted_at`)
- [x] PASS: Project removed from list immediately (optimistic)
- [x] PASS: Deleted projects do not reappear on page refresh
- [x] PASS: No confirmation dialog mentioned (verify if one should exist)

### Optimistic Updates
- [x] PASS: UI does not flash or flicker during optimistic updates
- [x] PASS: If an API call fails after an optimistic update, the UI state is corrected

### Empty States
#### No Projects (Zero State)
- [x] PASS: `FolderOpen` icon displayed (large, centered)
- [x] PASS: Title: **"No projects yet"**
- [x] PASS: Description: **"Create your first research project to start organizing papers, writing drafts, and tracking progress."**
- [x] PASS: **"Create Your First Project"** button displayed
- [x] PASS: Button opens the New Project Modal
- [x] PASS: Empty state only shows when total project count is 0
#### Filtered Empty (No Matches)
- [x] PASS: `FunnelSimple` icon displayed
- [x] PASS: Title: **"No matching projects"**
- [x] PASS: Description: **"Try adjusting your search or filters."**
- [x] PASS: Displays when active filters/search yield zero results but projects exist
- [x] PASS: Clearing filters restores the project list

### Loading & Error States
#### Route-Level Loading (`loading.tsx`)
- [x] PASS: Route-level loader renders a skeleton header plus `SkeletonTable` with 6 rows
- [x] PASS: Route-level loader wraps content in `max-w-5xl mx-auto`
- [x] PASS: Route-level loader is distinct from the page component's client fetch spinner
#### In-Component Loading (`page.tsx`)
- [x] PASS: While `loading` is true in the page component, a centered `SpinnerGap` renders inside an `h-64` container
- [x] PASS: No flash of the empty state occurs before the client fetch finishes
#### Fetch Failure Handling
- [x] PASS: A caught `getProjects()` failure logs `Failed to load projects:` and then falls through to the zero-state because `projects` remains `[]`
- [x] PASS: Route-level `error.tsx` is not used for caught client-side fetch failures
#### Route-Level Error Boundary (`error.tsx`)
- [x] PASS: Route-level error UI title is **"Projects unavailable"**
- [x] PASS: Route-level error UI message is **"We couldn't load your projects. Please try again."**
