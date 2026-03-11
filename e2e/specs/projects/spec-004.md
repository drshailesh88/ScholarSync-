# projects — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Project Actions
#### Edit (Navigate to Studio)
- [ ] `PencilSimple` icon button
- [ ] Navigates to `/studio/{project_id}`
- [ ] Navigation happens without page reload (client-side routing)
#### Archive
- [ ] `Archive` icon button with amber styling
- [ ] Sets project status to `"archived"` via `archiveProject(id)`
- [ ] Project status badge updates to "Archived" immediately (optimistic)
- [ ] Archived projects remain visible (filterable via status filter)
- [ ] Revalidates relevant paths
#### Delete
- [ ] `Trash` icon button with red styling
- [ ] Triggers soft-delete via `deleteProject(id)` (sets `deleted_at`)
- [ ] Project removed from list immediately (optimistic)
- [ ] Deleted projects do not reappear on page refresh
- [ ] No confirmation dialog mentioned (verify if one should exist)

### Optimistic Updates
- [ ] UI does not flash or flicker during optimistic updates
- [ ] If an API call fails after an optimistic update, the UI state is corrected

### Empty States
#### No Projects (Zero State)
- [ ] `FolderOpen` icon displayed (large, centered)
- [ ] Title: **"No projects yet"**
- [ ] Description: **"Create your first research project to start organizing papers, writing drafts, and tracking progress."**
- [ ] **"Create Your First Project"** button displayed
- [ ] Button opens the New Project Modal
- [ ] Empty state only shows when total project count is 0
#### Filtered Empty (No Matches)
- [ ] `FunnelSimple` icon displayed
- [ ] Title: **"No matching projects"**
- [ ] Description: **"Try adjusting your search or filters."**
- [ ] Displays when active filters/search yield zero results but projects exist
- [ ] Clearing filters restores the project list

### Loading & Error States
#### Route-Level Loading (`loading.tsx`)
- [ ] Route-level loader renders a skeleton header plus `SkeletonTable` with 6 rows
- [ ] Route-level loader wraps content in `max-w-5xl mx-auto`
- [ ] Route-level loader is distinct from the page component's client fetch spinner
#### In-Component Loading (`page.tsx`)
- [ ] While `loading` is true in the page component, a centered `SpinnerGap` renders inside an `h-64` container
- [ ] No flash of the empty state occurs before the client fetch finishes
#### Fetch Failure Handling
- [ ] A caught `getProjects()` failure logs `Failed to load projects:` and then falls through to the zero-state because `projects` remains `[]`
- [ ] Route-level `error.tsx` is not used for caught client-side fetch failures
#### Route-Level Error Boundary (`error.tsx`)
- [ ] Route-level error UI title is **"Projects unavailable"**
- [ ] Route-level error UI message is **"We couldn't load your projects. Please try again."**
