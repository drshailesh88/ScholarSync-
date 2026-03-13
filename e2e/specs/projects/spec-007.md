# projects — Spec 007

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
- [x] PASS: Create payload sends `target_journal` only when the trimmed field is non-empty
- [x] PASS: Create payload sends `deadline` only when the field is non-empty
- [x] PASS: Successful creation closes the modal before navigating
- [x] PASS: Successful creation routes to `/editor/new?project={created.id}`
- [x] PASS: Failed creation logs `Failed to create project:` to the console and leaves the modal open
- [x] PASS: Opening the status modal copies the clicked project into `statusTarget`
- [x] PASS: Opening the status modal initializes `pendingStatus` from `project.status ?? "planning"`
- [x] PASS: Status modal subtitle renders `Change status for {project title}`
- [x] PASS: Primary status pipeline renders `planning`, `drafting`, `reviewing`, and `completed` in order
- [x] PASS: Archived status is rendered in a separate section under a divider
- [x] PASS: Selected status option shows a trailing `Selected` label
- [x] PASS: `Update Status` is disabled when `pendingStatus` matches the current project status
- [x] PASS: `Update Status` is disabled while `updatingStatus` is true
- [x] PASS: Successful status updates close the modal before awaiting the server action
- [x] PASS: Failed status updates log `Failed to update project status:` to the console
- [x] PASS: Failed status updates re-fetch projects to restore canonical server state
- [x] PASS: Delete removes the project from local state before `deleteProject(id)` resolves
- [x] PASS: Failed delete restores server truth by calling `fetchProjects()`
- [x] PASS: Archive updates local `status` to `archived` before `archiveProject(id)` resolves
- [x] PASS: Failed archive restores server truth by calling `fetchProjects()`
- [x] PASS: Status updates mutate the matching project in local state before `updateProjectStatus()` resolves
- [x] PASS: Zero-state empty view renders only when `projects.length === 0` and `loading === false`
- [x] PASS: Filtered-empty state renders only when `projects.length > 0 && filtered.length === 0`
- [x] PASS: Filtered-empty state does not render a clear-filters button in the current implementation
- [x] PASS: `formatDate(null)` returns an em dash (`—`)
#### Route-Level Loading (loading.tsx)
- [x] PASS: Route-level `ProjectsLoading` is a server component (no `"use client"` directive)
- [x] PASS: Route-level skeleton wraps content in `max-w-5xl mx-auto`
- [x] PASS: Route-level skeleton renders a title placeholder (`Skeleton` with `h-8 w-40`) and a button placeholder (`Skeleton` with `h-10 w-36 rounded-xl`)
- [x] PASS: Route-level skeleton renders `SkeletonTable` with exactly 6 rows
- [x] PASS: Route-level skeleton is distinct from the page component's own `SpinnerGap` loading spinner
- [x] PASS: `SkeletonTable` rows each contain a square icon placeholder (`h-10 w-10 rounded-lg`), two text lines, and a badge placeholder (`h-6 w-20 rounded-full`)
#### Route-Level Error (error.tsx)
- [x] PASS: `error.tsx` is a client component (`"use client"` directive)
- [x] PASS: Error page renders `ErrorDisplay` with `title="Projects unavailable"` and `message="We couldn't load your projects. Please try again."`
- [x] PASS: Error page passes `error` and `reset` (as `onRetry`) to `ErrorDisplay`
- [x] PASS: `ErrorDisplay` shows a `WarningCircle` icon inside a `w-16 h-16 rounded-2xl bg-red-500/10` container
