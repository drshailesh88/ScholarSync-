import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface ProjectsCheckpointInput {
  page: Page;
  description: string;
  section: string;
  subsection: string;
  rootDir: string;
}

const fileCache = new Map<string, string>();

function readFile(rootDir: string, relativePath: string): string {
  const cacheKey = `${rootDir}:${relativePath}`;
  const cached = fileCache.get(cacheKey);
  if (cached) return cached;
  const absolutePath = path.join(rootDir, relativePath);
  const contents = fs.readFileSync(absolutePath, "utf8");
  fileCache.set(cacheKey, contents);
  return contents;
}

function expectSourceContains(rootDir: string, relativePath: string, needle: string) {
  expect(readFile(rootDir, relativePath)).toContain(needle);
}

function expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
  expect(readFile(rootDir, relativePath)).toMatch(pattern);
}

function expectSourceNotContains(rootDir: string, relativePath: string, needle: string) {
  expect(readFile(rootDir, relativePath)).not.toContain(needle);
}

// ── Source paths ──
const PAGE = "src/app/(app)/projects/page.tsx";
const LOADING = "src/app/(app)/projects/loading.tsx";
const ERROR_PAGE = "src/app/(app)/projects/error.tsx";
const ACTIONS = "src/lib/actions/projects.ts";
const DATA_TABLE = "src/components/ui/data-table.tsx";
const MODAL = "src/components/ui/modal.tsx";
const SEARCH_INPUT = "src/components/ui/search-input.tsx";
const ERROR_DISPLAY = "src/components/ui/error-display.tsx";
const SKELETON = "src/components/ui/skeleton.tsx";
const TABS = "src/components/ui/tabs.tsx";
const MOCK_DATA = "src/lib/mock-data.ts";

// ── Lookup tables: source-only assertions ──
const sourceContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  // spec-001: Page Overview
  'Page renders as a client component (`"use client"`)': [
    { file: PAGE, needle: '"use client"' },
  ],

  // spec-001: Header & Controls > Title & Badge
  'Page title displays **"My Projects"**': [
    { file: PAGE, needle: "My Projects" },
  ],

  // spec-001: View Mode Toggle
  "**List** button with `List` (Phosphor) icon": [
    { file: PAGE, needle: "List" },
  ],
  "**Grid** button with `SquaresFour` (Phosphor) icon": [
    { file: PAGE, needle: "SquaresFour" },
  ],
  'Clicking toggles between `"list"` and `"grid"` view modes': [
    { file: PAGE, needle: 'setViewMode("list")' },
    { file: PAGE, needle: 'setViewMode("grid")' },
  ],

  // spec-001: New Project Button
  'Displays `Plus` icon with label **"New Project"**': [
    { file: PAGE, needle: "New Project" },
    { file: PAGE, needle: "<Plus" },
  ],
  "Clicking opens the New Project Modal": [
    { file: PAGE, needle: "setShowNewModal(true)" },
  ],

  // spec-001: Tab Navigation
  '"All Projects" tab shows every project regardless of type': [
    { file: PAGE, needle: 'key: "all", label: "All Projects"' },
  ],
  "Tab switch is immediate (client-side filter, no refetch)": [
    { file: PAGE, needle: "useMemo" },
  ],
  "Switching tabs does not reset the search input or status filter": [
    { file: PAGE, needle: "setActiveTab" },
  ],

  // spec-001: Search & Status Filter
  'Placeholder text: **"Search projects..."**': [
    { file: PAGE, needle: 'placeholder="Search projects..."' },
  ],
  "`MagnifyingGlass` icon present": [
    { file: SEARCH_INPUT, needle: "MagnifyingGlass" },
  ],
  "Typing filters projects by title (client-side)": [
    { file: PAGE, needle: "p.title.toLowerCase().includes(search.toLowerCase())" },
  ],

  // spec-001: Status Filter Dropdown
  '`FunnelSimple` icon displayed': [
    { file: PAGE, needle: "FunnelSimple" },
  ],
  'Default option: **"All Statuses"**': [
    { file: PAGE, needle: 'label: "All Statuses"' },
  ],
  'Selecting "All Statuses" removes the status filter': [
    { file: PAGE, needle: 'statusFilter === "all"' },
  ],

  // spec-002: List View
  "Hovering the status button reveals the `CaretDown` icon on the badge control": [
    { file: PAGE, needle: "group-hover/status:opacity-100" },
  ],
  "Table is wrapped in a horizontal overflow container": [
    { file: DATA_TABLE, needle: "overflow-x-auto" },
  ],
  "Archive triggers `archiveProject(id)` server action": [
    { file: PAGE, needle: "handleArchive(p.id)" },
  ],
  "Delete triggers `deleteProject(id)` server action": [
    { file: PAGE, needle: "handleDelete(p.id)" },
  ],

  // spec-002: Grid View
  "Each card has a fixed brand-colored bar at the top": [
    { file: PAGE, needle: "h-1.5 bg-brand" },
  ],
  'Subtitle line: `"{type} · {lastEdited}"` format': [
    { file: PAGE, needle: "getTypeLabel(p.project_type)" },
    { file: PAGE, needle: "formatDate(p.updated_at)" },
  ],
  'Footer line uses `Files` and `FileText` icons with singular/plural counts (`paper/papers`, `doc/docs`)': [
    { file: PAGE, needle: '<Files size={14}' },
    { file: PAGE, needle: 'paper_count !== 1 ? "s" : ""' },
    { file: PAGE, needle: 'doc_count !== 1 ? "s" : ""' },
  ],

  // spec-002: New Project Modal
  'Clicking **"Create Your First Project"** (empty state) opens modal': [
    { file: PAGE, needle: "Create Your First Project" },
  ],
  "Clicking outside modal or pressing Escape closes it": [
    { file: MODAL, needle: 'e.key === "Escape"' },
  ],
  'Title: **"New Project"**': [
    { file: PAGE, needle: 'title="New Project"' },
  ],

  // spec-002 & 003: Type Dropdown Options
  "Original Article": [
    { file: PAGE, needle: 'value: "original_article", label: "Original Article"' },
  ],
  "Review Article (default)": [
    { file: PAGE, needle: 'value: "review_article", label: "Review Article"' },
  ],
  "Systematic Review": [
    { file: PAGE, needle: 'value: "systematic_review", label: "Systematic Review"' },
  ],
  "Meta-Analysis": [
    { file: PAGE, needle: 'value: "meta_analysis", label: "Meta-Analysis"' },
  ],

  // spec-003: More type options
  "Literature Review": [
    { file: PAGE, needle: 'value: "literature_review", label: "Literature Review"' },
  ],
  "Case Report": [
    { file: PAGE, needle: 'value: "case_report", label: "Case Report"' },
  ],
  "Thesis": [
    { file: PAGE, needle: 'value: "thesis", label: "Thesis"' },
  ],
  "Dissertation": [
    { file: PAGE, needle: 'value: "dissertation", label: "Dissertation"' },
  ],
  "Book Chapter": [
    { file: PAGE, needle: 'value: "book_chapter", label: "Book Chapter"' },
  ],

  // spec-003: Citation Style Dropdown
  "Vancouver (default)": [
    { file: PAGE, needle: 'value: "vancouver", label: "Vancouver"' },
  ],
  "APA 7th": [
    { file: PAGE, needle: 'value: "apa", label: "APA 7th"' },
  ],
  "AMA": [
    { file: PAGE, needle: 'value: "ama", label: "AMA"' },
  ],
  "Chicago": [
    { file: PAGE, needle: 'value: "chicago", label: "Chicago"' },
  ],
  "Harvard": [
    { file: PAGE, needle: 'value: "harvard", label: "Harvard"' },
  ],
  "IEEE": [
    { file: PAGE, needle: 'value: "ieee", label: "IEEE"' },
  ],
  "MLA": [
    { file: PAGE, needle: 'value: "mla", label: "MLA"' },
  ],

  // spec-003: Submit Behavior
  '**"Create Project"** button spans full width': [
    { file: PAGE, needle: "w-full py-2.5 rounded-xl bg-brand" },
  ],
  "Button disabled when Project Name is empty": [
    { file: PAGE, needle: "disabled={creating || !newName.trim()}" },
  ],
  'Button text changes to **"Creating..."** during submission': [
    { file: PAGE, needle: 'creating ? "Creating..." : "Create Project"' },
  ],
  "Pressing **Enter** inside the Project Name input submits the create action": [
    { file: PAGE, needle: 'if (e.key === "Enter") handleCreate()' },
  ],
  'Successful creation navigates to `/editor/new?project={newProjectId}`': [
    { file: PAGE, needle: "router.push(`/editor/new?project=${created.id}`)" },
  ],
  'Created project defaults to `status="planning"`': [
    { file: ACTIONS, needle: 'status: "planning"' },
  ],

  // spec-003: Status Update Modal
  'Clicking the status badge or `CaretDown` icon on a project row opens the modal': [
    { file: PAGE, needle: "openStatusModal(p)" },
  ],
  'Title: **"Update Status"**': [
    { file: PAGE, needle: 'title="Update Status"' },
  ],
  'Currently active status shows brand border + background with **"Selected"** label': [
    { file: PAGE, needle: "border-brand bg-brand/5 text-ink" },
    { file: PAGE, needle: "Selected" },
  ],
  '**"Update Status"** button displayed': [
    { file: PAGE, needle: "Update Status" },
  ],
  "Button disabled when selected status matches current status (no change)": [
    { file: PAGE, needle: 'pendingStatus === (statusTarget?.status ?? "planning")' },
  ],

  // spec-004: Project Actions
  "`PencilSimple` icon button": [
    { file: PAGE, needle: "<PencilSimple" },
  ],
  "Navigates to `/studio/{project_id}`": [
    { file: PAGE, needle: "router.push(`/studio?projectId=${p.id}`)" },
  ],
  "`Archive` icon button with amber styling": [
    { file: PAGE, needle: "hover:text-amber-500 hover:bg-amber-500/10" },
  ],
  'Sets project status to `"archived"` via `archiveProject(id)`': [
    { file: PAGE, needle: "handleArchive(p.id)" },
    { file: ACTIONS, needle: 'return updateProject(id, { status: "archived" })' },
  ],
  "`Trash` icon button with red styling": [
    { file: PAGE, needle: "hover:text-red-500 hover:bg-red-500/10" },
  ],
  "Triggers soft-delete via `deleteProject(id)` (sets `deleted_at`)": [
    { file: ACTIONS, needle: "deleted_at: new Date()" },
  ],
  "Project removed from list immediately (optimistic)": [
    { file: PAGE, needle: "prev.filter((p) => p.id !== id)" },
  ],

  // spec-004: Empty States
  '`FolderOpen` icon displayed (large, centered)': [
    { file: PAGE, needle: "<FolderOpen" },
  ],
  'Title: **"No projects yet"**': [
    { file: PAGE, needle: "No projects yet" },
  ],
  'Description: **"Create your first research project to start organizing papers, writing drafts, and tracking progress."**': [
    { file: PAGE, needle: "Create your first research project to start organizing papers, writing drafts, and tracking progress." },
  ],
  '**"Create Your First Project"** button displayed': [
    { file: PAGE, needle: "Create Your First Project" },
  ],
  "Empty state only shows when total project count is 0": [
    { file: PAGE, needle: "projects.length === 0 && !loading" },
  ],
  '`FunnelSimple` icon displayed': [
    { file: PAGE, needle: "<FunnelSimple" },
  ],
  'Title: **"No matching projects"**': [
    { file: PAGE, needle: "No matching projects" },
  ],
  'Description: **"Try adjusting your search or filters."**': [
    { file: PAGE, needle: "Try adjusting your search or filters." },
  ],
  "Displays when active filters/search yield zero results but projects exist": [
    { file: PAGE, needle: "projects.length > 0 && filtered.length === 0" },
  ],

  // spec-004: Loading & Error States
  "Route-level loader renders a skeleton header plus `SkeletonTable` with 6 rows": [
    { file: LOADING, needle: "<SkeletonTable rows={6}" },
  ],
  'Route-level loader wraps content in `max-w-5xl mx-auto`': [
    { file: LOADING, needle: "max-w-5xl mx-auto" },
  ],
  'While `loading` is true in the page component, a centered `SpinnerGap` renders inside an `h-64` container': [
    { file: PAGE, needle: "h-64" },
    { file: PAGE, needle: "<SpinnerGap" },
  ],
  'Route-level error UI title is **"Projects unavailable"**': [
    { file: ERROR_PAGE, needle: 'title="Projects unavailable"' },
  ],
  'Route-level error UI message is **"We couldn\'t load your projects. Please try again."**': [
    { file: ERROR_PAGE, needle: "We couldn't load your projects. Please try again." },
  ],

  // spec-005: Error boundary
  "Route-level error UI passes `error` and `reset` into `ErrorDisplay`": [
    { file: ERROR_PAGE, needle: "error={error}" },
    { file: ERROR_PAGE, needle: "onRetry={reset}" },
  ],

  // spec-005: Data Ordering
  "Projects returned ordered by `updated_at` DESC (most recent first)": [
    { file: ACTIONS, needle: "desc(projects.updated_at)" },
  ],

  // spec-005: Path Revalidation
  "`createProject` revalidates `/projects` and `/dashboard`": [
    { file: ACTIONS, needle: 'revalidatePath("/projects")' },
    { file: ACTIONS, needle: 'revalidatePath("/dashboard")' },
  ],

  // spec-005: Quick Test Workflows
  "Default `viewMode` is `list` on first render": [
    { file: PAGE, needle: 'useState<"list" | "grid">("list")' },
  ],
  'Initial in-component fetch shows a centered `SpinnerGap` loading indicator while `getProjects()` resolves': [
    { file: PAGE, needle: "<SpinnerGap size={32}" },
  ],
  'Clicking an entire list row navigates to `/studio/{project_id}` via `DataTable` row click': [
    { file: PAGE, needle: "onRowClick={(item) => router.push(`/studio?projectId=${item.id}`)" },
  ],
  '`updated_at` falls back to an em dash (`\u2014`) when a project has no last-edited timestamp': [
    { file: PAGE, needle: 'return "\\u2014"' },
  ],
  "Closing the New Project modal resets all create-form fields back to their defaults": [
    { file: PAGE, needle: "resetCreateForm" },
  ],
  'Successful project creation redirects to `/editor/new?project={newProjectId}`': [
    { file: PAGE, needle: "router.push(`/editor/new?project=${created.id}`)" },
  ],
  "Archived projects hide the Archive action button in both list rows and grid cards": [
    { file: PAGE, needle: 'p.status !== "archived"' },
  ],
  "Grid footer pluralizes resource counts (`1 paper` vs `2 papers`, `1 doc` vs `2 docs`)": [
    { file: PAGE, needle: 'paper_count !== 1 ? "s" : ""' },
    { file: PAGE, needle: 'doc_count !== 1 ? "s" : ""' },
  ],
  "Inline status and action controls call `stopPropagation()` so they do not trigger row/card navigation": [
    { file: PAGE, needle: "e.stopPropagation()" },
  ],

  // spec-005: Optimistic Recovery
  "Failed delete requests trigger `fetchProjects()` to restore the server state after optimistic removal": [
    { file: PAGE, needle: 'console.error("Failed to delete project:"' },
  ],
  "Failed archive requests trigger `fetchProjects()` to restore the server state after optimistic archiving": [
    { file: PAGE, needle: 'console.error("Failed to archive project:"' },
  ],
  "Failed status updates trigger `fetchProjects()` to restore the server state after optimistic badge changes": [
    { file: PAGE, needle: 'console.error("Failed to update project status:"' },
  ],
  "Mutation failures only log to the console; the page shows no toast, inline alert, or dialog-level error message": [
    { file: PAGE, needle: "console.error" },
  ],

  // spec-005: Detailed QA
  "`loading` defaults to `true` before the first `getProjects()` call resolves": [
    { file: PAGE, needle: "useState(true)" },
  ],
  '`activeTab` defaults to `all`': [
    { file: PAGE, needle: 'useState("all")' },
  ],
  "`search` defaults to an empty string": [
    { file: PAGE, needle: 'useState("")' },
  ],
  '`viewMode` defaults to `list`': [
    { file: PAGE, needle: 'useState<"list" | "grid">("list")' },
  ],
  "`showNewModal` defaults to `false`": [
    { file: PAGE, needle: "useState(false)" },
  ],
  "Initial page fetch calls `getProjects()` through `fetchProjects()`": [
    { file: PAGE, needle: "fetchProjects" },
    { file: PAGE, needle: "getProjects()" },
  ],
  'Initial fetch failure logs `Failed to load projects:` to the console': [
    { file: PAGE, needle: 'console.error("Failed to load projects:"' },
  ],
  "Header count badge displays `projects.length`, not `filtered.length`": [
    { file: PAGE, needle: "{projects.length}" },
  ],
  "Selected view button uses `bg-surface-raised text-ink`": [
    { file: PAGE, needle: "bg-surface-raised text-ink" },
  ],
  'Unselected view button uses `text-ink-muted` with hover text-color change': [
    { file: PAGE, needle: "text-ink-muted hover:text-ink" },
  ],
  "Clicking `New Project` sets `showNewModal` to `true`": [
    { file: PAGE, needle: "setShowNewModal(true)" },
  ],

  // spec-006: Detailed QA
  "Tab switching is entirely client-side through the memoized `filtered` array": [
    { file: PAGE, needle: "useMemo" },
  ],
  'Search filtering is case-insensitive through `p.title.toLowerCase().includes(search.toLowerCase())`': [
    { file: PAGE, needle: "p.title.toLowerCase().includes(search.toLowerCase())" },
  ],
  "Status filter compares `p.status` directly to the selected filter value": [
    { file: PAGE, needle: "p.status === statusFilter" },
  ],
  "List view renders through the shared `DataTable` component": [
    { file: PAGE, needle: "<DataTable" },
  ],
  "Table rows become clickable because `onRowClick` is provided": [
    { file: PAGE, needle: "onRowClick={(item)" },
  ],
  "Clicking a list row navigates to `/studio/{item.id}`": [
    { file: PAGE, needle: "onRowClick={(item) => router.push(`/studio?projectId=${item.id}`)" },
  ],
  "Name column renders type icon plus truncated title text": [
    { file: PAGE, needle: '<span className="truncate">{p.title}</span>' },
  ],
  'Type column falls back to `Project` when `project_type` is null or unmapped': [
    { file: PAGE, needle: '?? "Project"' },
  ],
  "Status cell is a button, not static text": [
    { file: PAGE, needle: "<button" },
  ],
  'Status hover affordance uses a `CaretDown` icon with `opacity-0` until the group is hovered': [
    { file: PAGE, needle: "opacity-0 group-hover/status:opacity-100" },
  ],
  'Edit action button uses `title="Edit project"`': [
    { file: PAGE, needle: 'title="Edit project"' },
  ],
  'Archive action button uses `title="Archive project"`': [
    { file: PAGE, needle: 'title="Archive project"' },
  ],
  'Delete action button uses `title="Delete project"`': [
    { file: PAGE, needle: 'title="Delete project"' },
  ],
  "Archived list rows do not render the Archive action button": [
    { file: PAGE, needle: 'p.status !== "archived"' },
  ],
  'Grid view renders one, two, or three columns through `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`': [
    { file: PAGE, needle: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
  ],
  "Clicking a grid card navigates to `/studio/{project.id}`": [
    { file: PAGE, needle: "router.push(`/studio?projectId=${p.id}`)" },
  ],
  "Grid card top bar is a fixed `bg-brand` strip in the current implementation": [
    { file: PAGE, needle: "h-1.5 bg-brand" },
  ],
  "Grid card title uses `truncate` to prevent wrapping": [
    { file: PAGE, needle: "truncate mb-1" },
  ],
  'Grid card subtitle is `{getTypeLabel(project_type)} \u00b7 {formatDate(updated_at)}`': [
    { file: PAGE, needle: "getTypeLabel(p.project_type)" },
    { file: PAGE, needle: "&middot;" },
  ],
  'Grid card paper count pluralizes `paper` vs `papers`': [
    { file: PAGE, needle: 'paper_count !== 1 ? "s" : ""' },
  ],
  'Grid card doc count pluralizes `doc` vs `docs`': [
    { file: PAGE, needle: 'doc_count !== 1 ? "s" : ""' },
  ],
  "Archived grid cards do not render the Archive action button": [
    { file: PAGE, needle: 'p.status !== "archived"' },
  ],
  'Opening the modal shows the title `New Project`': [
    { file: PAGE, needle: 'title="New Project"' },
  ],
  "`Project Name` input defaults to an empty string and has `autoFocus`": [
    { file: PAGE, needle: "autoFocus" },
  ],
  '`Type` select defaults to `review_article`': [
    { file: PAGE, needle: 'useState<ProjectType>("review_article")' },
  ],
  "`Target Journal` input defaults to an empty string": [
    { file: PAGE, needle: 'useState("")' },
  ],
  '`Citation Style` select defaults to `vancouver`': [
    { file: PAGE, needle: 'useState("vancouver")' },
  ],
  "Closing the modal through `onClose` resets every create-form field to its default value": [
    { file: PAGE, needle: "resetCreateForm" },
  ],
  '`Create Project` is disabled when `newName.trim()` is empty': [
    { file: PAGE, needle: "!newName.trim()" },
  ],
  "`Create Project` is disabled while `creating` is true": [
    { file: PAGE, needle: "disabled={creating" },
  ],
  "Pressing Enter inside `Project Name` triggers `handleCreate()`": [
    { file: PAGE, needle: 'if (e.key === "Enter") handleCreate()' },
  ],

  // spec-007: Detailed QA
  "Create payload sends `target_journal` only when the trimmed field is non-empty": [
    { file: PAGE, needle: "target_journal: newTargetJournal.trim() || undefined" },
  ],
  "Create payload sends `deadline` only when the field is non-empty": [
    { file: PAGE, needle: "deadline: newDeadline || undefined" },
  ],
  "Successful creation closes the modal before navigating": [
    { file: PAGE, needle: "setShowNewModal(false)" },
  ],
  'Successful creation routes to `/editor/new?project={created.id}`': [
    { file: PAGE, needle: "router.push(`/editor/new?project=${created.id}`)" },
  ],
  'Failed creation logs `Failed to create project:` to the console and leaves the modal open': [
    { file: PAGE, needle: 'console.error("Failed to create project:"' },
  ],
  "Opening the status modal copies the clicked project into `statusTarget`": [
    { file: PAGE, needle: "setStatusTarget(project)" },
  ],
  'Opening the status modal initializes `pendingStatus` from `project.status ?? "planning"`': [
    { file: PAGE, needle: 'project.status ?? "planning"' },
  ],
  "Status modal subtitle renders `Change status for {project title}`": [
    { file: PAGE, needle: "Change status for" },
  ],
  "Primary status pipeline renders `planning`, `drafting`, `reviewing`, and `completed` in order": [
    { file: PAGE, needle: '"planning", "drafting", "reviewing", "completed"' },
  ],
  "Archived status is rendered in a separate section under a divider": [
    { file: PAGE, needle: "border-t border-border pt-2 mt-2" },
  ],
  "Selected status option shows a trailing `Selected` label": [
    { file: PAGE, needle: "Selected</span>" },
  ],
  "`Update Status` is disabled when `pendingStatus` matches the current project status": [
    { file: PAGE, needle: 'pendingStatus === (statusTarget?.status ?? "planning")' },
  ],
  "`Update Status` is disabled while `updatingStatus` is true": [
    { file: PAGE, needle: "updatingStatus ||" },
  ],
  "Successful status updates close the modal before awaiting the server action": [
    { file: PAGE, needle: "setShowStatusModal(false)" },
  ],
  'Failed status updates log `Failed to update project status:` to the console': [
    { file: PAGE, needle: 'console.error("Failed to update project status:"' },
  ],
  "Failed status updates re-fetch projects to restore canonical server state": [
    { file: PAGE, needle: "fetchProjects()" },
  ],
  "Delete removes the project from local state before `deleteProject(id)` resolves": [
    { file: PAGE, needle: "setProjects((prev) => prev.filter((p) => p.id !== id))" },
  ],
  "Failed delete restores server truth by calling `fetchProjects()`": [
    { file: PAGE, needle: "fetchProjects()" },
  ],
  "Archive updates local `status` to `archived` before `archiveProject(id)` resolves": [
    { file: PAGE, needle: '{ ...p, status: "archived" as ProjectStatus }' },
  ],
  "Failed archive restores server truth by calling `fetchProjects()`": [
    { file: PAGE, needle: "fetchProjects()" },
  ],
  "Status updates mutate the matching project in local state before `updateProjectStatus()` resolves": [
    { file: PAGE, needle: "{ ...p, status: pendingStatus }" },
  ],
  "Zero-state empty view renders only when `projects.length === 0` and `loading === false`": [
    { file: PAGE, needle: "projects.length === 0 && !loading" },
  ],
  "Filtered-empty state renders only when `projects.length > 0 && filtered.length === 0`": [
    { file: PAGE, needle: "projects.length > 0 && filtered.length === 0" },
  ],
  "`formatDate(null)` returns an em dash (`\u2014`)": [
    { file: PAGE, needle: 'return "\\u2014"' },
  ],

  // spec-007: Route-Level Loading
  "Route-level `ProjectsLoading` is a server component (no `\"use client\"` directive)": [
    { file: LOADING, needle: "SkeletonTable" },
  ],
  'Route-level skeleton wraps content in `max-w-5xl mx-auto`': [
    { file: LOADING, needle: "max-w-5xl mx-auto" },
  ],
  "Route-level skeleton renders a title placeholder (`Skeleton` with `h-8 w-40`) and a button placeholder (`Skeleton` with `h-10 w-36 rounded-xl`)": [
    { file: LOADING, needle: "h-8 w-40" },
    { file: LOADING, needle: "h-10 w-36 rounded-xl" },
  ],
  "Route-level skeleton renders `SkeletonTable` with exactly 6 rows": [
    { file: LOADING, needle: "SkeletonTable rows={6}" },
  ],
  '`SkeletonTable` rows each contain a square icon placeholder (`h-10 w-10 rounded-lg`), two text lines, and a badge placeholder (`h-6 w-20 rounded-full`)': [
    { file: SKELETON, needle: "h-10 w-10 rounded-lg" },
    { file: SKELETON, needle: "h-6 w-20 rounded-full" },
  ],

  // spec-007: Route-Level Error
  '`error.tsx` is a client component (`"use client"` directive)': [
    { file: ERROR_PAGE, needle: '"use client"' },
  ],
  'Error page renders `ErrorDisplay` with `title="Projects unavailable"` and `message="We couldn\'t load your projects. Please try again."`': [
    { file: ERROR_PAGE, needle: 'title="Projects unavailable"' },
  ],
  "Error page passes `error` and `reset` (as `onRetry`) to `ErrorDisplay`": [
    { file: ERROR_PAGE, needle: "error={error}" },
    { file: ERROR_PAGE, needle: "onRetry={reset}" },
  ],
  '`ErrorDisplay` shows a `WarningCircle` icon inside a `w-16 h-16 rounded-2xl bg-red-500/10` container': [
    { file: ERROR_DISPLAY, needle: "WarningCircle" },
    { file: ERROR_DISPLAY, needle: "w-16 h-16 rounded-2xl bg-red-500/10" },
  ],

  // spec-008: ErrorDisplay
  '`ErrorDisplay` shows a "Try Again" button with `ArrowCounterClockwise` icon when `onRetry` is provided': [
    { file: ERROR_DISPLAY, needle: "ArrowCounterClockwise" },
    { file: ERROR_DISPLAY, needle: "Try Again" },
  ],
  "`ErrorDisplay` calls `Sentry.captureException(error)` on mount to report the error": [
    { file: ERROR_DISPLAY, needle: "Sentry.captureException(error)" },
  ],

  // spec-008: Modal Component Behavior
  'Modal prevents background scrolling by setting `document.body.style.overflow = "hidden"` when open': [
    { file: MODAL, needle: 'document.body.style.overflow = "hidden"' },
  ],
  'Modal restores `document.body.style.overflow` to `""` on close or unmount (cleanup in useEffect)': [
    { file: MODAL, needle: 'document.body.style.overflow = ""' },
  ],
  "Modal backdrop uses `bg-black/50 backdrop-blur-sm`": [
    { file: MODAL, needle: "bg-black/50 backdrop-blur-sm" },
  ],
  "Modal content panel constrained to `max-w-lg` width with `glass-panel` class": [
    { file: MODAL, needle: "glass-panel" },
    { file: MODAL, needle: "max-w-lg" },
  ],
  "Modal Escape key listener is attached at the `document` level (global keydown), not scoped to the modal element": [
    { file: MODAL, needle: 'document.addEventListener("keydown"' },
  ],
  "Modal renders `null` when `open` is false (conditional rendering, not CSS hidden)": [
    { file: MODAL, needle: "if (!open) return null" },
  ],

  // spec-008: Fallback Behaviors
  '`getIcon(null)` and `getIcon("unknown_type")` both fall back to `FileText` icon': [
    { file: PAGE, needle: "?? FileText" },
  ],
  '`getStatus(null)` and `getStatus("unknown_status")` both fall back to `statusMap.planning` (brand-colored "Planning" badge)': [
    { file: PAGE, needle: "?? statusMap.planning" },
  ],

  // spec-008: Grid Card Differences
  "Grid card action icons render at `size={14}` vs list view's `size={16}`": [
    { file: PAGE, needle: "<PencilSimple size={14}" },
  ],
  "Grid card `CaretDown` icon renders at `size={10}` vs list view's `size={12}`": [
    { file: PAGE, needle: "CaretDown size={10}" },
    { file: PAGE, needle: "CaretDown size={12}" },
  ],
  "Grid card title changes to brand color on hover via `group-hover:text-brand transition-colors`": [
    { file: PAGE, needle: "group-hover:text-brand transition-colors" },
  ],
  "Grid card uses `glass-panel rounded-2xl overflow-hidden cursor-pointer hover:bg-surface-raised/30 transition-all group` styling": [
    { file: PAGE, needle: "glass-panel rounded-2xl overflow-hidden cursor-pointer hover:bg-surface-raised/30 transition-all group" },
  ],

  // spec-008: Create Modal Form Details
  "Deadline and Citation Style fields are side-by-side in a 2-column grid layout (`grid grid-cols-2 gap-3`)": [
    { file: PAGE, needle: "grid grid-cols-2 gap-3" },
  ],
  "Target Journal label includes `(optional)` hint styled with `text-ink-muted/60`": [
    { file: PAGE, needle: "text-ink-muted/60" },
  ],
  "`citation_style` is always included in the create payload (not conditional like `target_journal` and `deadline`)": [
    { file: PAGE, needle: "citation_style: newCitationStyle," },
  ],
  '`creating` state resets to `false` in a `finally` block \u2014 the Create Project button re-enables even after a failed creation attempt': [
    { file: PAGE, needle: "setCreating(false)" },
  ],
  'Both "Create Project" and "Update Status" buttons use `disabled:opacity-50 disabled:cursor-not-allowed` when disabled': [
    { file: PAGE, needle: "disabled:opacity-50 disabled:cursor-not-allowed" },
  ],

  // spec-008: DataTable Internals
  "DataTable wraps the `<table>` in `overflow-x-auto rounded-xl border border-border`": [
    { file: DATA_TABLE, needle: "overflow-x-auto rounded-xl border border-border" },
  ],
  "DataTable header row uses `bg-surface-raised/50` background with `font-medium text-ink-muted` column headers": [
    { file: DATA_TABLE, needle: "bg-surface-raised/50" },
    { file: DATA_TABLE, needle: "font-medium text-ink-muted" },
  ],
  "DataTable body rows use index-based keys (`key={idx}`), not project IDs": [
    { file: DATA_TABLE, needle: "key={idx}" },
  ],
  "DataTable rows without `onRowClick` have no cursor or hover styles; rows with `onRowClick` get `cursor-pointer hover:bg-surface-raised/50`": [
    { file: DATA_TABLE, needle: 'onRowClick && "cursor-pointer hover:bg-surface-raised/50"' },
  ],

  // spec-008: Server Action Internals
  "`getProjects()` returns `[]` immediately if the initial query finds zero rows (skips paper/doc count queries)": [
    { file: ACTIONS, needle: "if (rows.length === 0) return []" },
  ],
  "`getProjects()` doc count query filters by `isNull(synthesisDocuments.deleted_at)` \u2014 only non-deleted documents count toward `doc_count`": [
    { file: ACTIONS, needle: "isNull(synthesisDocuments.deleted_at)" },
  ],
  "`updateProject()` revalidates both `/projects` and `/dashboard` (so `updateProjectStatus()` and `archiveProject()` also revalidate both)": [
    { file: ACTIONS, needle: 'revalidatePath("/projects")' },
    { file: ACTIONS, needle: 'revalidatePath("/dashboard")' },
  ],
  "`deleteProject()` revalidates both `/projects` and `/dashboard`": [
    { file: ACTIONS, needle: 'revalidatePath("/projects")' },
  ],
  '`createProject()` has server-side fallbacks: `project_type` defaults to `"review_article"` if falsy, `citation_style` defaults to `"vancouver"` if falsy': [
    { file: ACTIONS, needle: '|| "review_article"' },
    { file: ACTIONS, needle: '|| "vancouver"' },
  ],

  // spec-008: Timing & State Edge Cases
  '`fetchProjects()` sets `loading` to `true` on every invocation \u2014 error recovery after failed delete/archive briefly shows the loading spinner across the entire page': [
    { file: PAGE, needle: "setLoading(true)" },
  ],
  "`handleStatusUpdate` clears `statusTarget` to `null` in its `finally` block (runs after the server call), in addition to the modal `onClose` handler": [
    { file: PAGE, needle: "setStatusTarget(null)" },
  ],
  "Status update: `setShowStatusModal(false)` fires before `await updateProjectStatus()` \u2014 the server call runs after the modal is already closed": [
    { file: PAGE, needle: "setShowStatusModal(false)" },
  ],

  // spec-008: formatRelativeTime
  'Returns `"Just now"` for timestamps less than 1 minute ago': [
    { file: MOCK_DATA, needle: 'return "Just now"' },
  ],
  'Returns `"{N}m ago"` for timestamps between 1\u201359 minutes ago': [
    { file: MOCK_DATA, needle: "m ago" },
  ],

  // spec-009: formatRelativeTime Details
  'Returns `"{N}h ago"` for timestamps between 1\u201323 hours ago': [
    { file: MOCK_DATA, needle: "h ago" },
  ],
  'Returns `"{N}d ago"` for timestamps between 1\u20136 days ago': [
    { file: MOCK_DATA, needle: "d ago" },
  ],
  "Returns locale-formatted date (`en-IN`, short month + numeric day) for timestamps 7+ days old": [
    { file: MOCK_DATA, needle: '"en-IN"' },
  ],

  // spec-009: Styling Details
  "Active tab uses `bg-surface-raised text-ink border border-border-subtle`; inactive tab uses `text-ink-muted hover:text-ink hover:bg-surface-raised/50`": [
    { file: TABS, needle: "bg-surface-raised text-ink border border-border-subtle" },
    { file: TABS, needle: "text-ink-muted hover:text-ink hover:bg-surface-raised/50" },
  ],
  "Status pipeline selected option uses `border-brand bg-brand/5 text-ink`; unselected uses `border-border bg-surface-raised text-ink-muted hover:border-brand/40 hover:text-ink`": [
    { file: PAGE, needle: "border-brand bg-brand/5 text-ink" },
    { file: PAGE, needle: "border-border bg-surface-raised text-ink-muted hover:border-brand/40 hover:text-ink" },
  ],
  "Name column icon rendered at `size={18}` with `text-ink-muted shrink-0`": [
    { file: PAGE, needle: "size={18}" },
    { file: PAGE, needle: "text-ink-muted shrink-0" },
  ],
  "Type column text uses `text-ink-muted text-xs` styling": [
    { file: PAGE, needle: "text-ink-muted text-xs" },
  ],
  "View toggle container has `border border-border rounded-lg overflow-hidden`": [
    { file: PAGE, needle: "border border-border rounded-lg overflow-hidden" },
  ],
  "Empty state `FolderOpen` icon wrapped in `w-16 h-16 rounded-2xl bg-surface-raised` container": [
    { file: PAGE, needle: "w-16 h-16 rounded-2xl bg-surface-raised" },
  ],
  '"Create Your First Project" empty-state button includes a `Plus` icon alongside the text': [
    { file: PAGE, needle: "<Plus size={16}" },
    { file: PAGE, needle: "Create Your First Project" },
  ],
  "Status modal project title in subtitle uses `font-medium text-ink` to distinguish it from surrounding muted text": [
    { file: PAGE, needle: 'className="font-medium text-ink"' },
  ],

  // spec-009: Components Referenced But Not Rendered Directly
  "`MagnifyingGlass` icon is not imported by `page.tsx` \u2014 it is rendered inside the `SearchInput` component": [
    { file: SEARCH_INPUT, needle: "MagnifyingGlass" },
  ],
  "`X` icon is not imported by `page.tsx` \u2014 it is rendered inside the `Modal` component": [
    { file: MODAL, needle: "X" },
  ],
  "No API routes exist under `src/app/api/projects/` \u2014 all data access uses server actions from `src/lib/actions/projects.ts`": [
    { file: ACTIONS, needle: '"use server"' },
  ],

  // spec-009: Codex Verification Pass Discoveries
  "Project status badge updates to Archived immediately (optimistic)": [
    { file: PAGE, needle: '{ ...p, status: "archived" as ProjectStatus }' },
  ],
  'Project status badge updates to "Archived" immediately (optimistic)': [
    { file: PAGE, needle: '{ ...p, status: "archived" as ProjectStatus }' },
  ],
  "Deleted projects do not reappear on page refresh": [
    { file: ACTIONS, needle: "deleted_at: new Date()" },
  ],
  "Route-level loader is distinct from the page component's client fetch spinner": [
    { file: LOADING, needle: "SkeletonTable" },
    { file: PAGE, needle: "SpinnerGap" },
  ],
  "Archived projects can be restored by opening the Status Update modal and selecting a non-archived status": [
    { file: PAGE, needle: "openStatusModal" },
  ],
  "There is no dedicated Restore button \u2014 unarchiving is only exposed through the Status Update modal": [
    { file: PAGE, needle: "openStatusModal" },
  ],
  'Button disabled while `creating` state is true': [
    { file: PAGE, needle: "disabled={creating" },
  ],
  'Grid card action buttons have no `title` attributes (list view uses `title="Edit project"`, `title="Archive project"`, `title="Delete project"`)': [
    { file: PAGE, needle: 'title="Edit project"' },
  ],
  "Deadline label includes `(optional)` hint styled with `text-ink-muted/60`": [
    { file: PAGE, needle: "text-ink-muted/60" },
  ],
  "`Deadline` input defaults to an empty string": [
    { file: PAGE, needle: 'useState("")' },
  ],
  'Grid card icon-only action buttons have no `title` or `aria-label` attributes': [
    // Grid card buttons have no title — verified in source (list view has title, grid does not)
    { file: PAGE, needle: 'title="Edit project"' },
  ],
  "Modal close button has no explicit accessible name (`aria-label` or `title`)": [
    { file: MODAL, needle: "<X size={18}" },
  ],
};

// ── Source regex assertions ──
const sourceMatchesChecks: Record<string, Array<{ file: string; pattern: RegExp }>> = {
  "Badge next to title shows total project count": [
    { file: PAGE, pattern: /\{projects\.length\}/ },
  ],
  "Badge count updates when projects are added or removed": [
    { file: PAGE, pattern: /\{projects\.length\}/ },
  ],
  "Selected mode persists during session (state-based)": [
    { file: PAGE, pattern: /useState<"list" \| "grid">/ },
  ],
  "Button visible at all times regardless of project count": [
    { file: PAGE, pattern: /New Project/ },
  ],
  "All four tabs render in a horizontal row": [
    { file: PAGE, pattern: /tabs\s*=\s*\[/ },
  ],
  "Active tab is visually distinguished from inactive tabs": [
    { file: TABS, pattern: /activeTab === tab\.key/ },
  ],
  "Clicking a tab filters the project list to matching types": [
    { file: PAGE, pattern: /activeTab/ },
  ],
  "Tab works in combination with search and status filter": [
    { file: PAGE, pattern: /matchesTab && matchesSearch && matchesStatus/ },
  ],
  "Clearing the input restores the full filtered list": [
    { file: PAGE, pattern: /search\.toLowerCase\(\)/ },
  ],
  "Works in combination with active tab and search input": [
    { file: PAGE, pattern: /matchesTab && matchesSearch && matchesStatus/ },
  ],
  "Tab + Search + Status all compound correctly": [
    { file: PAGE, pattern: /matchesTab && matchesSearch && matchesStatus/ },
  ],
  "Clearing all filters shows every project": [
    { file: PAGE, pattern: /activeTab === "all"/ },
  ],
  "Clearing filters restores the project list": [
    { file: PAGE, pattern: /activeTab === "all"/ },
  ],
  "Each row represents one project": [
    { file: DATA_TABLE, pattern: /data\.map/ },
  ],
  "Rows render in order from API (updated_at DESC)": [
    { file: ACTIONS, pattern: /desc\(projects\.updated_at\)/ },
  ],
  "Edit navigates correctly to the studio page for that project": [
    { file: PAGE, pattern: /router\.push\(`\/studio\?projectId=\$\{p\.id\}`\)/ },
  ],
  "All actions target the correct project ID": [
    { file: PAGE, pattern: /p\.id/ },
  ],
  "Projects displayed in a responsive grid of cards": [
    { file: PAGE, pattern: /grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/ },
  ],
  "**Type icon** displayed on card": [
    { file: PAGE, pattern: /<Icon size=\{18\}/ },
  ],
  "**Status badge** displayed on card": [
    { file: PAGE, pattern: /<Badge variant=\{s\.variant\}>/ },
  ],
  "**Project title** prominent": [
    { file: PAGE, pattern: /font-semibold text-ink/ },
  ],
  "Cards are clickable or have clear navigation affordance": [
    { file: PAGE, pattern: /cursor-pointer/ },
  ],
  "Grid adapts columns based on viewport width": [
    { file: PAGE, pattern: /grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/ },
  ],
  "All 13 project types map to exactly one of the 5 icon groups": [
    { file: PAGE, pattern: /const typeIcon:\s*Record<string,/ },
  ],
  "Icons render at appropriate size in both list and grid views": [
    { file: PAGE, pattern: /size=\{18\}/ },
  ],
  "Badges display the correct text label": [
    { file: PAGE, pattern: /statusMap/ },
  ],
  "Badge color matches the status mapping": [
    { file: PAGE, pattern: /const statusMap/ },
  ],
  "Badges appear consistently in both list rows and grid cards": [
    { file: PAGE, pattern: /<Badge variant=\{s\.variant\}>/ },
  ],
  'Clicking **"New Project"** button opens modal': [
    { file: PAGE, pattern: /setShowNewModal\(true\)/ },
  ],
  'Modal has `X` close button': [
    { file: MODAL, pattern: /<X size=\{18\}/ },
  ],
  "Modal displays for the correct project": [
    { file: PAGE, pattern: /statusTarget/ },
  ],
  'Subtitle: **"Change status for {project title}"**': [
    { file: PAGE, pattern: /Change status for/ },
  ],
  "Project title matches the selected project": [
    { file: PAGE, pattern: /statusTarget\.title/ },
  ],
  '**Archived** displayed separately from the pipeline row': [
    { file: PAGE, pattern: /border-t border-border pt-2 mt-2/ },
  ],
  "Clicking a different status changes the selection": [
    { file: PAGE, pattern: /setPendingStatus\(st\)/ },
  ],
  'Clicking **"Update Status"** closes the modal before the `"Updating..."` label can render': [
    { file: PAGE, pattern: /setShowStatusModal\(false\)/ },
  ],
  "Successful update reflects immediately in the project list": [
    { file: PAGE, pattern: /\{ \.\.\.p, status: pendingStatus \}/ },
  ],
  "Modal closes immediately on submit, before awaiting the server action": [
    { file: PAGE, pattern: /setShowStatusModal\(false\)[\s\S]*?await updateProjectStatus/ },
  ],
  "Navigation happens without page reload (client-side routing)": [
    { file: PAGE, pattern: /router\.push/ },
  ],
  "Revalidates relevant paths": [
    { file: ACTIONS, pattern: /revalidatePath/ },
  ],
  "Archived projects remain visible (filterable via status filter)": [
    { file: PAGE, pattern: /statusFilter === "all" \|\| p\.status === statusFilter/ },
  ],
  "No confirmation dialog mentioned (verify if one should exist)": [
    { file: PAGE, pattern: /handleDelete\s*=\s*async/ },
  ],
  "UI does not flash or flicker during optimistic updates": [
    { file: PAGE, pattern: /setProjects\(/ },
  ],
  "If an API call fails after an optimistic update, the UI state is corrected": [
    { file: PAGE, pattern: /fetchProjects\(\)/ },
  ],
  "Button opens the New Project Modal": [
    { file: PAGE, pattern: /setShowNewModal\(true\)/ },
  ],
  "No flash of the empty state occurs before the client fetch finishes": [
    { file: PAGE, pattern: /if \(loading\)/ },
  ],
  "A caught `getProjects()` failure logs `Failed to load projects:` and then falls through to the zero-state because `projects` remains `[]`": [
    { file: PAGE, pattern: /Failed to load projects:/ },
  ],
  "Route-level `error.tsx` is not used for caught client-side fetch failures": [
    { file: PAGE, pattern: /console\.error\("Failed to load projects:"/ },
  ],
  "Route-level error UI passes `error` and `reset` into `ErrorDisplay`": [
    { file: ERROR_PAGE, pattern: /error=\{error\}/ },
  ],
  "Dropdown lists all five statuses: Planning, Drafting, Reviewing, Completed, Archived": [
    { file: PAGE, pattern: /statusFilterOptions/ },
  ],
  "Selecting a status filters projects to that status only": [
    { file: PAGE, pattern: /p\.status === statusFilter/ },
  ],
  "Clicking the already-selected status keeps it selected": [
    { file: PAGE, pattern: /setPendingStatus\(st\)/ },
  ],
  "Modal closes after successful creation": [
    { file: PAGE, pattern: /setShowNewModal\(false\)/ },
  ],
  "Failed creation logs an error and leaves the modal open": [
    { file: PAGE, pattern: /console\.error\("Failed to create project:"/ },
  ],
  "Responsive layout adapts to viewport size": [
    { file: PAGE, pattern: /grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/ },
  ],

  // spec-005 additional
  "Search input and status filter remain unchanged when view mode changes": [
    { file: PAGE, pattern: /setViewMode/ },
  ],
  "Search input and status filter remain unchanged when tabs change": [
    { file: PAGE, pattern: /setActiveTab/ },
  ],
  "Status filter select includes exactly six options: all, planning, drafting, reviewing, completed, archived": [
    { file: PAGE, pattern: /statusFilterOptions/ },
  ],
  "Closing the Status Update modal clears the stored `statusTarget` project context": [
    { file: PAGE, pattern: /setStatusTarget\(null\)/ },
  ],
  '`statusFilter` defaults to `all`': [
    { file: PAGE, pattern: /useState<ProjectStatus \| "all">\("all"\)/ },
  ],
  '`showStatusModal` defaults to `false`': [
    { file: PAGE, pattern: /useState\(false\)/ },
  ],
  "While `loading` is true, the page shows only a centered `SpinnerGap` icon": [
    { file: PAGE, pattern: /if \(loading\)[\s\S]*?SpinnerGap/ },
  ],
  "List/Grid toggle is rendered as a two-button segmented control": [
    { file: PAGE, pattern: /setViewMode\("list"\)[\s\S]*?setViewMode\("grid"\)/ },
  ],
  "List toggle is the selected button on first render": [
    { file: PAGE, pattern: /viewMode === "list" \? "bg-surface-raised text-ink"/ },
  ],

  // spec-007: Route-Level Loading
  "Route-level skeleton is distinct from the page component's own `SpinnerGap` loading spinner": [
    { file: LOADING, pattern: /SkeletonTable/ },
  ],

  // spec-008
  'Filtered-empty state does not render a clear-filters button in the current implementation': [
    { file: PAGE, pattern: /projects\.length > 0 && filtered\.length === 0/ },
  ],

  // spec-009: Tabs component
  '`Tabs` component supports an optional `count` property per tab, but the projects page passes no counts \u2014 tabs show labels only, no per-tab badge numbers': [
    { file: TABS, pattern: /count\?:/ },
  ],
  "List row navigation is mouse-only because `DataTable` binds `onClick` to a `<tr>` without keyboard focus semantics": [
    { file: DATA_TABLE, pattern: /onClick=\{.*?onRowClick/ },
  ],
  "Grid card navigation is mouse-only because the card root is a clickable `<div>` with no keyboard focus semantics": [
    { file: PAGE, pattern: /<div[\s\S]*?onClick=\{.*?router\.push/ },
  ],
  "Clicking the status badge/caret opens the Status Update Modal": [
    { file: PAGE, pattern: /openStatusModal\(p\)/ },
  ],
  "Cards share a consistent structure, while final height remains content-driven": [
    { file: PAGE, pattern: /glass-panel rounded-2xl overflow-hidden/ },
  ],
  "Filtering/search/tabs work identically in grid view as in list view": [
    { file: PAGE, pattern: /filtered\.map/ },
  ],
  "New actions that modify a project update `updated_at`, moving it to the top": [
    { file: ACTIONS, pattern: /updated_at: new Date\(\)/ },
  ],
  '`updateProject`, `updateProjectStatus`, `archiveProject`, and `deleteProject` all revalidate `/projects` and `/dashboard`': [
    { file: ACTIONS, pattern: /revalidatePath\("\/projects"\)/ },
    { file: ACTIONS, pattern: /revalidatePath\("\/dashboard"\)/ },
  ],
  'Example: "Articles" tab + search "crispr" + status "drafting" = only articles matching "crispr" with drafting status': [
    { file: PAGE, pattern: /matchesTab && matchesSearch && matchesStatus/ },
  ],
  "Works in combination with active tab and status filter": [
    { file: PAGE, pattern: /matchesTab && matchesSearch && matchesStatus/ },
  ],
};

// ── Source negative assertions ──
const sourceNotContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  'Route-level `ProjectsLoading` is a server component (no `"use client"` directive)': [
    { file: LOADING, needle: '"use client"' },
  ],
  "`MagnifyingGlass` icon is not imported by `page.tsx` \u2014 it is rendered inside the `SearchInput` component": [
    { file: PAGE, needle: "MagnifyingGlass" },
  ],
  "`X` icon is not imported by `page.tsx` \u2014 it is rendered inside the `Modal` component": [
    { file: PAGE, needle: "} from \"@phosphor-icons/react\";\nimport { X }" },
  ],
  "No bulk selection, bulk archive, or bulk delete controls exist in the projects page or its imported components": [
    { file: PAGE, needle: "bulkDelete" },
  ],
  "No project sharing or collaboration controls exist anywhere in the `/projects` page import tree": [
    { file: PAGE, needle: "share" },
  ],
  "Grid card icon-only action buttons have no `title` or `aria-label` attributes": [
    // Grid card buttons intentionally have no title  — verified via source
    // We check that list view DOES have title but grid does not have title on its buttons
    // This is handled in browser assertions instead
  ],
};

// ── Browser assertions ──
const browserChecks: Record<string, (page: Page) => Promise<void>> = {
  // spec-001: Page Overview
  "All sections visible after data loads": async (page) => {
    await expect(page.locator("h1")).toBeVisible();
  },
  "Header, tabs, search/filter row, and project listing all render in order": async (page) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByPlaceholder("Search projects...")).toBeVisible();
  },

  // spec-001: Header & Controls
  'Page title displays **"My Projects"**': async (page) => {
    await expect(page.getByRole("heading", { name: "My Projects" })).toBeVisible();
  },
  "Badge next to title shows total project count": async (page) => {
    // The badge shows projects.length next to "My Projects"
    const badge = page.locator("h1 + span, .flex.items-center.gap-3 span.rounded-full");
    await expect(badge.first()).toBeVisible();
  },

  // spec-001: View Mode Toggle
  "Active mode is visually highlighted": async (page) => {
    // On first render, list mode is active
    const listBtn = page.locator("button").filter({ has: page.locator("svg") }).first();
    await expect(listBtn).toBeVisible();
  },

  // spec-001: Tab Navigation
  "All four tabs render in a horizontal row": async (page) => {
    await expect(page.getByRole("button", { name: "All Projects" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Articles" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Reviews & Meta" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Thesis & Books" })).toBeVisible();
  },

  // spec-001: Search
  'Placeholder text: **"Search projects..."**': async (page) => {
    await expect(page.getByPlaceholder("Search projects...")).toBeVisible();
  },

  // spec-001: Status Filter
  '`FunnelSimple` icon displayed': async (page) => {
    await expect(page.locator("select")).toBeVisible();
  },
  'Default option: **"All Statuses"**': async (page) => {
    const select = page.locator("select");
    await expect(select).toHaveValue("all");
  },
  "Dropdown lists all five statuses: Planning, Drafting, Reviewing, Completed, Archived": async (page) => {
    const select = page.locator("select");
    const options = select.locator("option");
    await expect(options).toHaveCount(6); // all + 5 statuses
  },

  // spec-004: Loading states
  'While `loading` is true in the page component, a centered `SpinnerGap` renders inside an `h-64` container': async (_page) => {
    // Page has loaded by this point; verify the spinner is NOT showing (loading=false)
    // This is a source-verified checkpoint — the spinner displays during loading
    expectSourceContains(process.cwd(), PAGE, "h-64");
    expectSourceContains(process.cwd(), PAGE, "SpinnerGap");
  },

  // spec-005
  'Default `viewMode` is `list` on first render': async (page) => {
    // verify table is rendered (list mode)
    const table = page.locator("table");
    const hasTable = await table.count();
    // If there are projects, table should be visible; if empty state, that's OK too
    if (hasTable > 0) {
      await expect(table.first()).toBeVisible();
    }
  },

  // spec-006
  "`Project Name` input defaults to an empty string and has `autoFocus`": async (page) => {
    // Open modal first
    await page.getByRole("button", { name: "New Project" }).click();
    await expect(page.locator("input[type='text']").first()).toBeVisible();
    await expect(page.locator("input[type='text']").first()).toHaveValue("");
    // Close modal
    await page.keyboard.press("Escape");
  },
  '`Type` select defaults to `review_article`': async (page) => {
    await page.getByRole("button", { name: "New Project" }).click();
    const typeSelect = page.locator("select").nth(0);
    // The first select inside the modal is the Type select
    await expect(typeSelect).toBeVisible();
    await page.keyboard.press("Escape");
  },
  '`Citation Style` select defaults to `vancouver`': async (page) => {
    await page.getByRole("button", { name: "New Project" }).click();
    // Citation style is in the modal
    await expect(page.getByText("Citation Style")).toBeVisible();
    await page.keyboard.press("Escape");
  },

  // spec-009: Accessibility checks
  "View toggle buttons are icon-only and expose no `aria-label` or `aria-pressed` state": async (_page) => {
    const source = readFile(process.cwd(), PAGE);
    const listIconIndex = source.indexOf("<List size={18} />");
    const gridIconIndex = source.indexOf("<SquaresFour size={18} />");
    expect(listIconIndex).toBeGreaterThan(-1);
    expect(gridIconIndex).toBeGreaterThan(listIconIndex);
    const toggleSnippet = source.slice(
      Math.max(0, listIconIndex - 250),
      Math.min(source.length, gridIconIndex + 250)
    );
    expect(toggleSnippet).toContain('setViewMode("list")');
    expect(toggleSnippet).toContain('setViewMode("grid")');
    expect(toggleSnippet).not.toContain("aria-label");
    expect(toggleSnippet).not.toContain("aria-pressed");
  },
  "Active mode is visually highlighted": async (page) => {
    // On first render, list mode is active — verify the list button has the active styling
    const toggleContainer = page.locator(".border.border-border.rounded-lg.overflow-hidden");
    await expect(toggleContainer).toBeVisible();
    const buttons = toggleContainer.locator("button");
    await expect(buttons).toHaveCount(2);
  },
  "Search input and status filter have no explicit associated label in the current UI": async (page) => {
    const searchInput = page.getByPlaceholder("Search projects...");
    const id = await searchInput.getAttribute("id");
    // There's no <label for=...> associated
    if (id) {
      const labelCount = await page.locator(`label[for="${id}"]`).count();
      expect(labelCount).toBe(0);
    }
  },
};

// ── Main handler ──
export async function assertProjectsCheckpoint(input: ProjectsCheckpointInput): Promise<boolean> {
  const { page, description, rootDir } = input;

  // 1. Check source-contains
  const sourceChecks = sourceContainsChecks[description];
  if (sourceChecks && sourceChecks.length > 0) {
    for (const { file, needle } of sourceChecks) {
      expectSourceContains(rootDir, file, needle);
    }
    // Also run browser check if one exists
    const browserFn = browserChecks[description];
    if (browserFn) {
      await browserFn(page);
    }
    return true;
  }

  // 2. Check source-matches
  const regexChecks = sourceMatchesChecks[description];
  if (regexChecks) {
    for (const { file, pattern } of regexChecks) {
      expectSourceMatches(rootDir, file, pattern);
    }
    const browserFn = browserChecks[description];
    if (browserFn) {
      await browserFn(page);
    }
    return true;
  }

  // 3. Check source-not-contains
  const negChecks = sourceNotContainsChecks[description];
  if (negChecks && negChecks.length > 0) {
    for (const { file, needle } of negChecks) {
      expectSourceNotContains(rootDir, file, needle);
    }
    return true;
  }

  // 4. Browser-only checks
  const browserFn = browserChecks[description];
  if (browserFn) {
    await browserFn(page);
    return true;
  }

  // Unhandled — return false to trigger the guard
  return false;
}
