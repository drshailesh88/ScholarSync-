# projects — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/projects
MODULE: projects

---
### Quick Test Workflows
#### Route-Level Error (error.tsx)
- [x] PASS: `ErrorDisplay` shows a "Try Again" button with `ArrowCounterClockwise` icon when `onRetry` is provided
- [x] PASS: `ErrorDisplay` calls `Sentry.captureException(error)` on mount to report the error
#### Modal Component Behavior
- [x] PASS: Modal prevents background scrolling by setting `document.body.style.overflow = "hidden"` when open
- [x] PASS: Modal restores `document.body.style.overflow` to `""` on close or unmount (cleanup in useEffect)
- [x] PASS: Modal backdrop uses `bg-black/50 backdrop-blur-sm`
- [x] PASS: Modal content panel constrained to `max-w-lg` width with `glass-panel` class
- [x] PASS: Modal Escape key listener is attached at the `document` level (global keydown), not scoped to the modal element
- [x] PASS: Modal renders `null` when `open` is false (conditional rendering, not CSS hidden)
#### Fallback Behaviors
- [x] PASS: `getIcon(null)` and `getIcon("unknown_type")` both fall back to `FileText` icon
- [x] PASS: `getStatus(null)` and `getStatus("unknown_status")` both fall back to `statusMap.planning` (brand-colored "Planning" badge)
#### Grid Card Differences from List View
- [x] PASS: Grid card action buttons have no `title` attributes (list view uses `title="Edit project"`, `title="Archive project"`, `title="Delete project"`)
- [x] PASS: Grid card action icons render at `size={14}` vs list view's `size={16}`
- [x] PASS: Grid card `CaretDown` icon renders at `size={10}` vs list view's `size={12}`
- [x] PASS: Grid card title changes to brand color on hover via `group-hover:text-brand transition-colors`
- [x] PASS: Grid card uses `glass-panel rounded-2xl overflow-hidden cursor-pointer hover:bg-surface-raised/30 transition-all group` styling
#### Create Modal Form Details
- [x] PASS: Deadline and Citation Style fields are side-by-side in a 2-column grid layout (`grid grid-cols-2 gap-3`)
- [x] PASS: Target Journal label includes `(optional)` hint styled with `text-ink-muted/60`
- [x] PASS: Deadline label includes `(optional)` hint styled with `text-ink-muted/60`
- [x] PASS: `citation_style` is always included in the create payload (not conditional like `target_journal` and `deadline`)
- [x] PASS: `creating` state resets to `false` in a `finally` block — the Create Project button re-enables even after a failed creation attempt
- [x] PASS: Both "Create Project" and "Update Status" buttons use `disabled:opacity-50 disabled:cursor-not-allowed` when disabled
#### DataTable Internals
- [x] PASS: DataTable wraps the `<table>` in `overflow-x-auto rounded-xl border border-border`
- [x] PASS: DataTable header row uses `bg-surface-raised/50` background with `font-medium text-ink-muted` column headers
- [x] PASS: DataTable body rows use index-based keys (`key={idx}`), not project IDs
- [x] PASS: DataTable rows without `onRowClick` have no cursor or hover styles; rows with `onRowClick` get `cursor-pointer hover:bg-surface-raised/50`
#### Server Action Internals
- [x] PASS: `getProjects()` returns `[]` immediately if the initial query finds zero rows (skips paper/doc count queries)
- [x] PASS: `getProjects()` doc count query filters by `isNull(synthesisDocuments.deleted_at)` — only non-deleted documents count toward `doc_count`
- [x] PASS: `updateProject()` revalidates both `/projects` and `/dashboard` (so `updateProjectStatus()` and `archiveProject()` also revalidate both)
- [x] PASS: `deleteProject()` revalidates both `/projects` and `/dashboard`
- [x] PASS: `createProject()` has server-side fallbacks: `project_type` defaults to `"review_article"` if falsy, `citation_style` defaults to `"vancouver"` if falsy
#### Timing and State Edge Cases
- [x] PASS: `fetchProjects()` sets `loading` to `true` on every invocation — error recovery after failed delete/archive briefly shows the loading spinner across the entire page
- [x] PASS: `handleStatusUpdate` clears `statusTarget` to `null` in its `finally` block (runs after the server call), in addition to the modal `onClose` handler
- [x] PASS: Status update: `setShowStatusModal(false)` fires before `await updateProjectStatus()` — the server call runs after the modal is already closed
#### formatRelativeTime Details
- [x] PASS: Returns `"Just now"` for timestamps less than 1 minute ago
- [x] PASS: Returns `"{N}m ago"` for timestamps between 1–59 minutes ago
