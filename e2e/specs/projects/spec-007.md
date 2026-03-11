# projects — Spec 007

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
- [ ] Create payload sends `target_journal` only when the trimmed field is non-empty
- [ ] Create payload sends `deadline` only when the field is non-empty
- [ ] Successful creation closes the modal before navigating
- [ ] Successful creation routes to `/editor/new?project={created.id}`
- [ ] Failed creation logs `Failed to create project:` to the console and leaves the modal open
- [ ] Opening the status modal copies the clicked project into `statusTarget`
- [ ] Opening the status modal initializes `pendingStatus` from `project.status ?? "planning"`
- [ ] Status modal subtitle renders `Change status for {project title}`
- [ ] Primary status pipeline renders `planning`, `drafting`, `reviewing`, and `completed` in order
- [ ] Archived status is rendered in a separate section under a divider
- [ ] Selected status option shows a trailing `Selected` label
- [ ] `Update Status` is disabled when `pendingStatus` matches the current project status
- [ ] `Update Status` is disabled while `updatingStatus` is true
- [ ] Successful status updates close the modal before awaiting the server action
- [ ] Failed status updates log `Failed to update project status:` to the console
- [ ] Failed status updates re-fetch projects to restore canonical server state
- [ ] Delete removes the project from local state before `deleteProject(id)` resolves
- [ ] Failed delete restores server truth by calling `fetchProjects()`
- [ ] Archive updates local `status` to `archived` before `archiveProject(id)` resolves
- [ ] Failed archive restores server truth by calling `fetchProjects()`
- [ ] Status updates mutate the matching project in local state before `updateProjectStatus()` resolves
- [ ] Zero-state empty view renders only when `projects.length === 0` and `loading === false`
- [ ] Filtered-empty state renders only when `projects.length > 0 && filtered.length === 0`
- [ ] Filtered-empty state does not render a clear-filters button in the current implementation
- [ ] `formatDate(null)` returns an em dash (`—`)
#### Route-Level Loading (loading.tsx)
- [ ] Route-level `ProjectsLoading` is a server component (no `"use client"` directive)
- [ ] Route-level skeleton wraps content in `max-w-5xl mx-auto`
- [ ] Route-level skeleton renders a title placeholder (`Skeleton` with `h-8 w-40`) and a button placeholder (`Skeleton` with `h-10 w-36 rounded-xl`)
- [ ] Route-level skeleton renders `SkeletonTable` with exactly 6 rows
- [ ] Route-level skeleton is distinct from the page component's own `SpinnerGap` loading spinner
- [ ] `SkeletonTable` rows each contain a square icon placeholder (`h-10 w-10 rounded-lg`), two text lines, and a badge placeholder (`h-6 w-20 rounded-full`)
#### Route-Level Error (error.tsx)
- [ ] `error.tsx` is a client component (`"use client"` directive)
- [ ] Error page renders `ErrorDisplay` with `title="Projects unavailable"` and `message="We couldn't load your projects. Please try again."`
- [ ] Error page passes `error` and `reset` (as `onRetry`) to `ErrorDisplay`
- [ ] `ErrorDisplay` shows a `WarningCircle` icon inside a `w-16 h-16 rounded-2xl bg-red-500/10` container
