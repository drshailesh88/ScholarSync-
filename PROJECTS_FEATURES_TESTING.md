# ScholarSync — Projects Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Projects page (`/projects`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/projects/page.tsx`, `src/lib/actions/projects.ts`, and related modules.

---

## Table of Contents

1. [Page Overview & Layout](#1-page-overview--layout)
2. [Header & Controls](#2-header--controls)
3. [Tab Navigation](#3-tab-navigation)
4. [Search & Status Filter](#4-search--status-filter)
5. [List View](#5-list-view)
6. [Grid View](#6-grid-view)
7. [Project Type Icons](#7-project-type-icons)
8. [Status Badges](#8-status-badges)
9. [New Project Modal](#9-new-project-modal)
10. [Status Update Modal](#10-status-update-modal)
11. [Project Actions](#11-project-actions)
12. [Optimistic Updates](#12-optimistic-updates)
13. [Empty States](#13-empty-states)
14. [Loading & Error States](#14-loading--error-states)
15. [Data Fetching & Server Actions](#15-data-fetching--server-actions)
16. [Quick Test Workflows](#16-quick-test-workflows)

---

## 1. Page Overview & Layout

| Page | Route | Purpose |
|------|-------|---------|
| **Projects** | `/projects` | Research project management — create, organize, track status, and navigate to studio for editing |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  "My Projects"  [count badge]    [List/Grid toggle] [+ New] │
├──────────────────────────────────────────────────────────────┤
│  Tab Bar: All Projects | Articles | Reviews & Meta | Thesis │
├──────────────────────────────────────────────────────────────┤
│  [Search projects...]              [Status Filter dropdown]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Project List (list view)   OR   Project Grid (grid view)    │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- [ ] Page renders as a client component (`"use client"`)
- [ ] All sections visible after data loads
- [ ] Header, tabs, search/filter row, and project listing all render in order
- [ ] Responsive layout adapts to viewport size

---

## 2. Header & Controls

### Title & Badge
- [ ] Page title displays **"My Projects"**
- [ ] Badge next to title shows total project count
- [ ] Badge count updates when projects are added or removed

### View Mode Toggle
- [ ] **List** button with `List` (Phosphor) icon
- [ ] **Grid** button with `SquaresFour` (Phosphor) icon
- [ ] Active mode is visually highlighted
- [ ] Clicking toggles between `"list"` and `"grid"` view modes
- [ ] Selected mode persists during session (state-based)

### New Project Button
- [ ] Displays `Plus` icon with label **"New Project"**
- [ ] Clicking opens the New Project Modal
- [ ] Button visible at all times regardless of project count

---

## 3. Tab Navigation

| Tab Label | State Key | Included Project Types |
|-----------|-----------|----------------------|
| **All Projects** | `"all"` | All types (no filter) |
| **Articles** | `"articles"` | original_article, review_article, case_report, case_series, letter, editorial, short_communication |
| **Reviews & Meta** | `"reviews"` | systematic_review, meta_analysis, literature_review |
| **Thesis & Books** | `"thesis"` | thesis, dissertation, book_chapter |

- [ ] All four tabs render in a horizontal row
- [ ] Active tab visually distinguished (highlighted/underlined)
- [ ] Clicking a tab filters the project list to matching types
- [ ] "All Projects" tab shows every project regardless of type
- [ ] Tab switch is immediate (client-side filter, no refetch)
- [ ] Tab works in combination with search and status filter
- [ ] Switching tabs does not reset the search input or status filter

---

## 4. Search & Status Filter

### Search Input
- [ ] Placeholder text: **"Search projects..."**
- [ ] `MagnifyingGlass` icon present
- [ ] Typing filters projects by title (client-side)
- [ ] Clearing the input restores the full filtered list
- [ ] Works in combination with active tab and status filter

### Status Filter Dropdown
- [ ] `FunnelSimple` icon displayed
- [ ] Default option: **"All Statuses"**
- [ ] Dropdown lists all five statuses: Planning, Drafting, Reviewing, Completed, Archived
- [ ] Selecting a status filters projects to that status only
- [ ] Selecting "All Statuses" removes the status filter
- [ ] Works in combination with active tab and search input

### Combined Filtering
- [ ] Tab + Search + Status all compound correctly
- [ ] Example: "Articles" tab + search "crispr" + status "drafting" = only articles matching "crispr" with drafting status
- [ ] Clearing all filters shows every project

---

## 5. List View

### Table Columns

| Column | Content | Test |
|--------|---------|------|
| **Name** | Project type icon + project title | [ ] Icon matches project type, title is clickable or visible |
| **Type** | Human-readable project type label | [ ] Displays formatted type name |
| **Status** | Status badge + `CaretDown` icon on hover | [ ] Badge color matches status, caret appears on hover |
| **Papers** | `paper_count` value | [ ] Shows correct count |
| **Docs** | `doc_count` value | [ ] Shows correct count |
| **Last Edited** | Relative or formatted `updated_at` date | [ ] Displays readable date |
| **Actions** | Edit, Archive, Delete buttons | [ ] All three action buttons render |

### Row Behavior
- [ ] Each row represents one project
- [ ] Rows render in order from API (updated_at DESC)
- [ ] Hovering a row reveals the `CaretDown` icon on the status badge
- [ ] Clicking the status badge/caret opens the Status Update Modal
- [ ] Table scrolls if many projects exist

### Action Buttons (per row)

| Action | Icon | Behavior | Style |
|--------|------|----------|-------|
| **Edit** | `PencilSimple` | Navigates to `/studio/{id}` | [ ] Default styling |
| **Archive** | `Archive` | Archives the project (sets status to "archived") | [ ] Amber accent |
| **Delete** | `Trash` | Soft-deletes the project | [ ] Red accent |

- [ ] Edit navigates correctly to the studio page for that project
- [ ] Archive triggers `archiveProject(id)` server action
- [ ] Delete triggers `deleteProject(id)` server action
- [ ] All actions target the correct project ID

---

## 6. Grid View

### Card Layout
- [ ] Projects displayed in a responsive grid of cards
- [ ] Each card has a **colored bar** at the top (accent by type/status)

### Card Content
- [ ] **Type icon** displayed on card
- [ ] **Status badge** displayed on card
- [ ] **Project title** prominent
- [ ] Subtitle line: `"{type} · {lastEdited}"` format
- [ ] Footer line: `"{paper_count} papers · {doc_count} docs"` with `Files` and `FileText` icons
- [ ] Cards are clickable or have clear navigation affordance

### Grid Behavior
- [ ] Grid adapts columns based on viewport width
- [ ] Cards have consistent height and alignment
- [ ] Filtering/search/tabs work identically in grid view as in list view

---

## 7. Project Type Icons

| Project Type(s) | Icon | Test |
|-----------------|------|------|
| thesis, dissertation, book_chapter | `BookOpen` | [ ] Correct icon displayed |
| review_article, case_report, case_series, letter, short_communication | `FileText` | [ ] Correct icon displayed |
| original_article, editorial | `Newspaper` | [ ] Correct icon displayed |
| meta_analysis, systematic_review | `Microscope` | [ ] Correct icon displayed |
| literature_review | `GraduationCap` | [ ] Correct icon displayed |

- [ ] All 13 project types map to exactly one of the 5 icon groups
- [ ] Icons render at appropriate size in both list and grid views

---

## 8. Status Badges

| Status | Badge Variant | Color | Test |
|--------|--------------|-------|------|
| **Planning** | `"active"` / brand | Brand accent | [ ] Correct badge styling |
| **Drafting** | amber | Amber | [ ] Correct badge styling |
| **Reviewing** | `"popular"` / sky | Sky blue | [ ] Correct badge styling |
| **Completed** | emerald | Green | [ ] Correct badge styling |
| **Archived** | emerald | Green | [ ] Correct badge styling |

- [ ] Badges display the correct text label
- [ ] Badge color matches the status mapping
- [ ] Badges appear consistently in both list rows and grid cards

---

## 9. New Project Modal

### Modal Trigger
- [ ] Clicking **"New Project"** button opens modal
- [ ] Clicking **"Create Your First Project"** (empty state) opens modal
- [ ] Modal has `X` close button
- [ ] Clicking outside modal or pressing Escape closes it

### Modal Header
- [ ] Title: **"New Project"**

### Form Fields

| Field | Type | Required | Placeholder / Default | Test |
|-------|------|----------|----------------------|------|
| **Project Name** | Text input | Yes | "e.g. CRISPR Literature Review" | [ ] Autofocus on open, required validation |
| **Type** | Dropdown | Yes | Default: `review_article` | [ ] All options listed below available |
| **Target Journal** | Text input | No | "e.g. The Lancet, Nature Medicine" | [ ] Optional, accepts freeform text |
| **Deadline** | Date input | No | (none) | [ ] Date picker functional, optional |
| **Citation Style** | Dropdown | Yes | Default: `vancouver` | [ ] All 7 citation styles listed |

### Type Dropdown Options
- [ ] Original Article
- [ ] Review Article (default)
- [ ] Systematic Review
- [ ] Meta-Analysis
- [ ] Literature Review
- [ ] Case Report
- [ ] Thesis
- [ ] Dissertation
- [ ] Book Chapter

### Citation Style Dropdown Options
- [ ] Vancouver (default)
- [ ] APA 7th
- [ ] AMA
- [ ] Chicago
- [ ] Harvard
- [ ] IEEE
- [ ] MLA

### Submit Behavior
- [ ] **"Create Project"** button spans full width
- [ ] Button disabled when Project Name is empty
- [ ] Button disabled while `creating` state is true
- [ ] Button text changes to **"Creating..."** during submission
- [ ] Pressing **Enter** key submits the form
- [ ] Successful creation redirects to the new project (or refreshes list)
- [ ] Modal closes after successful creation
- [ ] New project appears in the project list
- [ ] Created project defaults to `status="planning"`

---

## 10. Status Update Modal

### Modal Trigger
- [ ] Clicking the status badge or `CaretDown` icon on a project row opens the modal
- [ ] Modal displays for the correct project

### Modal Header
- [ ] Title: **"Update Status"**
- [ ] Subtitle: **"Change status for {project title}"**
- [ ] Project title matches the selected project

### Status Pipeline (4 primary buttons)

| Button | Label | Test |
|--------|-------|------|
| 1 | **Planning** | [ ] Selectable |
| 2 | **Drafting** | [ ] Selectable |
| 3 | **Reviewing** | [ ] Selectable |
| 4 | **Completed** | [ ] Selectable |

- [ ] **Archived** displayed separately from the pipeline row
- [ ] Currently active status shows brand border + background with **"Selected"** label
- [ ] Clicking a different status changes the selection
- [ ] Clicking the already-selected status keeps it selected

### Submit Behavior
- [ ] **"Update Status"** button displayed
- [ ] Button disabled when selected status matches current status (no change)
- [ ] Button text changes to **"Updating..."** during submission
- [ ] Successful update reflects immediately in the project list
- [ ] Modal closes after successful update

---

## 11. Project Actions

### Edit (Navigate to Studio)
- [ ] `PencilSimple` icon button
- [ ] Navigates to `/studio/{project_id}`
- [ ] Navigation happens without page reload (client-side routing)

### Archive
- [ ] `Archive` icon button with amber styling
- [ ] Sets project status to `"archived"` via `archiveProject(id)`
- [ ] Project status badge updates to "Archived" immediately (optimistic)
- [ ] Archived projects remain visible (filterable via status filter)
- [ ] Revalidates relevant paths

### Delete
- [ ] `Trash` icon button with red styling
- [ ] Triggers soft-delete via `deleteProject(id)` (sets `deleted_at`)
- [ ] Project removed from list immediately (optimistic)
- [ ] Deleted projects do not reappear on page refresh
- [ ] No confirmation dialog mentioned (verify if one should exist)

---

## 12. Optimistic Updates

| Action | Optimistic Behavior | Rollback on Failure | Test |
|--------|-------------------|-------------------|------|
| **Delete** | Project removed from state before API call completes | [ ] Verify error handling if API fails |  [ ] Removed instantly from UI |
| **Archive** | Status updates to "archived" in state immediately | [ ] Verify error handling if API fails | [ ] Badge updates instantly |
| **Create** | Redirects to new project on success | N/A (redirect) | [ ] Redirect happens after API success |
| **Status Update** | Status badge updates immediately in state | [ ] Verify error handling if API fails | [ ] Badge updates instantly |

- [ ] UI does not flash or flicker during optimistic updates
- [ ] If an API call fails after an optimistic update, the UI state is corrected

---

## 13. Empty States

### No Projects (Zero State)
- [ ] `FolderOpen` icon displayed (large, centered)
- [ ] Title: **"No projects yet"**
- [ ] Description: **"Create your first research project to start organizing papers, writing drafts, and tracking progress."**
- [ ] **"Create Your First Project"** button displayed
- [ ] Button opens the New Project Modal
- [ ] Empty state only shows when total project count is 0

### Filtered Empty (No Matches)
- [ ] `FunnelSimple` icon displayed
- [ ] Title: **"No matching projects"**
- [ ] Description: **"Try adjusting your search or filters."**
- [ ] Displays when active filters/search yield zero results but projects exist
- [ ] Clearing filters restores the project list

---

## 14. Loading & Error States

### Loading State
- [ ] Skeleton header renders while loading
- [ ] `SkeletonTable` with 6 rows renders while loading
- [ ] Skeleton replaces the project list area entirely
- [ ] No flash of empty state before loading completes
- [ ] Loading state appears on initial page load

### Error State
- [ ] Title: **"Projects unavailable"**
- [ ] Message: **"We couldn't load your projects. Please try again."**
- [ ] Error state renders instead of the project list
- [ ] No partial or broken UI on error
- [ ] Error triggers when `getProjects()` server action fails

---

## 15. Data Fetching & Server Actions

### Server Actions (`src/lib/actions/projects.ts`)

| Action | Signature | Behavior | Test |
|--------|-----------|----------|------|
| `getProjects()` | `() => Project[]` | Returns all non-deleted projects, ordered by `updated_at` DESC; includes `paper_count` and `doc_count` | [ ] Returns correct list |
| `getProject(id)` | `(id: string) => Project` | Returns single project with ownership check | [ ] Rejects if not owner |
| `createProject(data)` | `(data) => Project` | Creates project with `status="planning"`, revalidates `/projects` and `/dashboard` | [ ] Defaults to planning status |
| `updateProject(id, data)` | `(id, data) => Project` | Partial update, sets `updated_at` to current time | [ ] Only updates provided fields |
| `updateProjectStatus(id, status)` | `(id, status) => Project` | Convenience wrapper around `updateProject` | [ ] Updates only status field |
| `deleteProject(id)` | `(id) => void` | Soft-delete: sets `deleted_at` timestamp | [ ] Project hidden from list |
| `archiveProject(id)` | `(id) => void` | Sets `status` to `"archived"` | [ ] Status changes to archived |

### Project Interface

```typescript
interface Project {
  id: string;
  title: string;
  project_type: ProjectType;
  status: ProjectStatus;
  description: string;
  research_question: string;
  target_journal: string;
  deadline: string;
  citation_style: string;
  updated_at: string;
  paper_count: number;
  doc_count: number;
}
```

### Enumerations

**ProjectType** (13 values):
`thesis` | `review_article` | `original_article` | `case_report` | `case_series` | `meta_analysis` | `systematic_review` | `literature_review` | `book_chapter` | `dissertation` | `letter` | `editorial` | `short_communication`

**ProjectStatus** (5 values):
`planning` | `drafting` | `reviewing` | `completed` | `archived`

### Data Ordering
- [ ] Projects returned ordered by `updated_at` DESC (most recent first)
- [ ] New actions that modify a project update `updated_at`, moving it to the top

### Path Revalidation
- [ ] `createProject` revalidates `/projects` and `/dashboard`
- [ ] Other mutations revalidate as appropriate

---

## 16. Quick Test Workflows

### Workflow 1: First-Time User Experience
1. [ ] Navigate to `/projects` with no existing projects
2. [ ] Verify "No projects yet" empty state with `FolderOpen` icon
3. [ ] Click "Create Your First Project"
4. [ ] Fill in project name, select type, optionally set journal/deadline/citation style
5. [ ] Submit and verify redirect or list update
6. [ ] Confirm project appears with status "planning"

### Workflow 2: Create a Project via Header Button
1. [ ] Click "New Project" button in header
2. [ ] Enter name: "Systematic Review of AI in Radiology"
3. [ ] Select type: Systematic Review
4. [ ] Set target journal: "Radiology"
5. [ ] Set citation style: AMA
6. [ ] Set a deadline date
7. [ ] Click "Create Project"
8. [ ] Verify project appears in list with correct type icon (`Microscope`) and planning badge

### Workflow 3: Filter and Search
1. [ ] Create multiple projects of different types and statuses
2. [ ] Switch to "Articles" tab -- only article types visible
3. [ ] Switch to "Reviews & Meta" tab -- only review/meta types visible
4. [ ] Switch to "Thesis & Books" tab -- only thesis/dissertation/book_chapter visible
5. [ ] Return to "All Projects" tab -- all projects visible
6. [ ] Type a search query -- list filters by title
7. [ ] Select a status filter -- list further narrows
8. [ ] Clear search and filter -- full list restored

### Workflow 4: Status Update Pipeline
1. [ ] Find a project with status "planning"
2. [ ] Click the status badge (or hover to reveal `CaretDown`, then click)
3. [ ] Verify Status Update Modal opens with correct project title
4. [ ] Select "Drafting" -- confirm it highlights with "Selected" label
5. [ ] Click "Update Status"
6. [ ] Verify badge changes to amber "Drafting" in project list
7. [ ] Repeat: advance to "Reviewing", then "Completed"
8. [ ] Verify each status badge updates correctly

### Workflow 5: Archive and Delete
1. [ ] Click the `Archive` button on a project row
2. [ ] Verify status immediately changes to "Archived" (optimistic)
3. [ ] Refresh page -- project still visible with "Archived" status
4. [ ] Click the `Trash` button on a project row
5. [ ] Verify project immediately disappears from list (optimistic)
6. [ ] Refresh page -- deleted project does not reappear

### Workflow 6: View Mode Toggle
1. [ ] Default view loads (list or grid based on default)
2. [ ] Click the `SquaresFour` (Grid) toggle button
3. [ ] Verify projects render as cards with colored bars, icons, badges
4. [ ] Verify card subtitle format: "{type} · {lastEdited}"
5. [ ] Verify card footer: "{paper_count} papers · {doc_count} docs"
6. [ ] Click the `List` toggle button
7. [ ] Verify projects render as table rows with all columns
8. [ ] Filters and search work identically in both views

### Workflow 7: Error Recovery
1. [ ] Simulate network failure during `getProjects()`
2. [ ] Verify error state: title "Projects unavailable", message about retrying
3. [ ] Restore network -- refresh page
4. [ ] Verify projects load normally

---

## Icon Reference

| Icon Name | Phosphor Import | Used For |
|-----------|----------------|----------|
| `Plus` | @phosphor-icons/react | New Project button |
| `List` | @phosphor-icons/react | List view toggle |
| `SquaresFour` | @phosphor-icons/react | Grid view toggle |
| `PencilSimple` | @phosphor-icons/react | Edit action |
| `Trash` | @phosphor-icons/react | Delete action |
| `Archive` | @phosphor-icons/react | Archive action |
| `CaretDown` | @phosphor-icons/react | Status badge hover indicator |
| `FileText` | @phosphor-icons/react | Type icon (reviews, cases, letters) |
| `GraduationCap` | @phosphor-icons/react | Type icon (literature review) |
| `BookOpen` | @phosphor-icons/react | Type icon (thesis, dissertation, book chapter) |
| `Microscope` | @phosphor-icons/react | Type icon (meta-analysis, systematic review) |
| `Newspaper` | @phosphor-icons/react | Type icon (original article, editorial) |
| `SpinnerGap` | @phosphor-icons/react | Loading spinner |
| `Files` | @phosphor-icons/react | Paper count in grid card |
| `FunnelSimple` | @phosphor-icons/react | Status filter, filtered empty state |
| `FolderOpen` | @phosphor-icons/react | Zero-state empty icon |
| `MagnifyingGlass` | @phosphor-icons/react | Search input |
| `X` | @phosphor-icons/react | Modal close |

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

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

#### Initial Fetch and Defaults
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

#### Header Controls
- [ ] Header count badge displays `projects.length`, not `filtered.length`
- [ ] List/Grid toggle is rendered as a two-button segmented control
- [ ] List toggle is the selected button on first render
- [ ] Selected view button uses `bg-surface-raised text-ink`
- [ ] Unselected view button uses `text-ink-muted` with hover text-color change
- [ ] Clicking `New Project` sets `showNewModal` to `true`

#### Tabs and Filters
- [ ] Tab switching is entirely client-side through the memoized `filtered` array
- [ ] Search filtering is case-insensitive through `p.title.toLowerCase().includes(search.toLowerCase())`
- [ ] Status filter compares `p.status` directly to the selected filter value
- [ ] Search input and status filter remain unchanged when view mode changes
- [ ] Search input and status filter remain unchanged when tabs change
- [ ] Status filter select includes exactly six options: all, planning, drafting, reviewing, completed, archived

#### List View
- [ ] List view renders through the shared `DataTable` component
- [ ] Table rows become clickable because `onRowClick` is provided
- [ ] Clicking a list row navigates to `/studio/{item.id}`
- [ ] Name column renders type icon plus truncated title text
- [ ] Type column falls back to `Project` when `project_type` is null or unmapped
- [ ] Status cell is a button, not static text
- [ ] Status hover affordance uses a `CaretDown` icon with `opacity-0` until the group is hovered
- [ ] Edit action button uses `title="Edit project"`
- [ ] Archive action button uses `title="Archive project"`
- [ ] Delete action button uses `title="Delete project"`
- [ ] Archived list rows do not render the Archive action button

#### Grid View
- [ ] Grid view renders one, two, or three columns through `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] Clicking a grid card navigates to `/studio/{project.id}`
- [ ] Grid card top bar is a fixed `bg-brand` strip in the current implementation
- [ ] Grid card title uses `truncate` to prevent wrapping
- [ ] Grid card subtitle is `{getTypeLabel(project_type)} · {formatDate(updated_at)}`
- [ ] Grid card paper count pluralizes `paper` vs `papers`
- [ ] Grid card doc count pluralizes `doc` vs `docs`
- [ ] Archived grid cards do not render the Archive action button

#### Create Project Modal Defaults
- [ ] Opening the modal shows the title `New Project`
- [ ] `Project Name` input defaults to an empty string and has `autoFocus`
- [ ] `Type` select defaults to `review_article`
- [ ] `Target Journal` input defaults to an empty string
- [ ] `Deadline` input defaults to an empty string
- [ ] `Citation Style` select defaults to `vancouver`
- [ ] Closing the modal through `onClose` resets every create-form field to its default value
- [ ] `Create Project` is disabled when `newName.trim()` is empty
- [ ] `Create Project` is disabled while `creating` is true
- [ ] Pressing Enter inside `Project Name` triggers `handleCreate()`
- [ ] Create payload sends `target_journal` only when the trimmed field is non-empty
- [ ] Create payload sends `deadline` only when the field is non-empty
- [ ] Successful creation closes the modal before navigating
- [ ] Successful creation routes to `/editor/new?project={created.id}`
- [ ] Failed creation logs `Failed to create project:` to the console and leaves the modal open

#### Status Update Modal
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

#### Archive and Delete Optimism
- [ ] Delete removes the project from local state before `deleteProject(id)` resolves
- [ ] Failed delete restores server truth by calling `fetchProjects()`
- [ ] Archive updates local `status` to `archived` before `archiveProject(id)` resolves
- [ ] Failed archive restores server truth by calling `fetchProjects()`
- [ ] Status updates mutate the matching project in local state before `updateProjectStatus()` resolves

#### Empty and Fallback States
- [ ] Zero-state empty view renders only when `projects.length === 0` and `loading === false`
- [ ] Filtered-empty state renders only when `projects.length > 0 && filtered.length === 0`
- [ ] Filtered-empty state does not render a clear-filters button in the current implementation
- [ ] `formatDate(null)` returns an em dash (`—`)

---

## Re-Audit Discoveries (Claude Code Pass 2)

> Source-verified against every file in the import tree of `src/app/(app)/projects/page.tsx`.

### Behavior Corrections (Pass 2)

1. **Grid card top bar (Section 6, line 164)**: The original doc says _"colored bar at the top (accent by type/status)"_. Incorrect — the bar is always `bg-brand` (fixed brand color), not derived from project type or status. Source: `page.tsx:574`.

2. **Project.id type (Section 15)**: Interface shows `id: string` but source code declares `id: number`. All server action parameters (`getProject`, `deleteProject`, `archiveProject`, etc.) accept `number`. Source: `page.tsx:61`, `projects.ts:85,160,169,180`.

3. **Loading state conflation (Section 14)**: The section describes "Skeleton header" and "SkeletonTable with 6 rows" as the page loading state. Those belong to the route-level `loading.tsx` (Suspense boundary). The page component itself shows a centered `SpinnerGap` spinner inside an `h-64` container while `getProjects()` resolves. These are two distinct loading mechanisms. Source: `page.tsx:446-452`, `loading.tsx:1-13`.

4. **Enter key scope (Section 9)**: "Pressing Enter key submits the form" is only true when focused on the Project Name input (which has the `onKeyDown` handler). Pressing Enter in Target Journal, Deadline, or Citation Style does NOT submit — there is no `<form>` element. Source: `page.tsx:657-659`.

5. **"Updating..." text never visible (Section 10)**: The doc says button text changes to "Updating..." during submission. In practice, `setShowStatusModal(false)` fires in the same event handler before the await. With React 18 batching, the modal is already closed when the re-render occurs — the "Updating..." text is never rendered to the user. Source: `page.tsx:302-308`.

6. **Fetch failure shows empty state, not error UI (Section 14)**: When `getProjects()` fails within the page component, the catch block logs the error and leaves `projects` as `[]`, causing the "No projects yet" empty state to render — NOT the error display. The route-level `error.tsx` only catches uncaught rendering/SSR errors, not caught client-side fetch failures. Source: `page.tsx:203-213`.

### Route-Level Loading (loading.tsx)

- [ ] Route-level `ProjectsLoading` is a server component (no `"use client"` directive)
- [ ] Route-level skeleton wraps content in `max-w-5xl mx-auto`
- [ ] Route-level skeleton renders a title placeholder (`Skeleton` with `h-8 w-40`) and a button placeholder (`Skeleton` with `h-10 w-36 rounded-xl`)
- [ ] Route-level skeleton renders `SkeletonTable` with exactly 6 rows
- [ ] Route-level skeleton is distinct from the page component's own `SpinnerGap` loading spinner
- [ ] `SkeletonTable` rows each contain a square icon placeholder (`h-10 w-10 rounded-lg`), two text lines, and a badge placeholder (`h-6 w-20 rounded-full`)

### Route-Level Error (error.tsx)

- [ ] `error.tsx` is a client component (`"use client"` directive)
- [ ] Error page renders `ErrorDisplay` with `title="Projects unavailable"` and `message="We couldn't load your projects. Please try again."`
- [ ] Error page passes `error` and `reset` (as `onRetry`) to `ErrorDisplay`
- [ ] `ErrorDisplay` shows a `WarningCircle` icon inside a `w-16 h-16 rounded-2xl bg-red-500/10` container
- [ ] `ErrorDisplay` shows a "Try Again" button with `ArrowCounterClockwise` icon when `onRetry` is provided
- [ ] `ErrorDisplay` calls `Sentry.captureException(error)` on mount to report the error

### Modal Component Behavior

- [ ] Modal prevents background scrolling by setting `document.body.style.overflow = "hidden"` when open
- [ ] Modal restores `document.body.style.overflow` to `""` on close or unmount (cleanup in useEffect)
- [ ] Modal backdrop uses `bg-black/50 backdrop-blur-sm`
- [ ] Modal content panel constrained to `max-w-lg` width with `glass-panel` class
- [ ] Modal Escape key listener is attached at the `document` level (global keydown), not scoped to the modal element
- [ ] Modal renders `null` when `open` is false (conditional rendering, not CSS hidden)

### Fallback Behaviors

- [ ] `getIcon(null)` and `getIcon("unknown_type")` both fall back to `FileText` icon
- [ ] `getStatus(null)` and `getStatus("unknown_status")` both fall back to `statusMap.planning` (brand-colored "Planning" badge)

### Grid Card Differences from List View

- [ ] Grid card action buttons have no `title` attributes (list view uses `title="Edit project"`, `title="Archive project"`, `title="Delete project"`)
- [ ] Grid card action icons render at `size={14}` vs list view's `size={16}`
- [ ] Grid card `CaretDown` icon renders at `size={10}` vs list view's `size={12}`
- [ ] Grid card title changes to brand color on hover via `group-hover:text-brand transition-colors`
- [ ] Grid card uses `glass-panel rounded-2xl overflow-hidden cursor-pointer hover:bg-surface-raised/30 transition-all group` styling

### Create Modal Form Details

- [ ] Deadline and Citation Style fields are side-by-side in a 2-column grid layout (`grid grid-cols-2 gap-3`)
- [ ] Target Journal label includes `(optional)` hint styled with `text-ink-muted/60`
- [ ] Deadline label includes `(optional)` hint styled with `text-ink-muted/60`
- [ ] `citation_style` is always included in the create payload (not conditional like `target_journal` and `deadline`)
- [ ] `creating` state resets to `false` in a `finally` block — the Create Project button re-enables even after a failed creation attempt
- [ ] Both "Create Project" and "Update Status" buttons use `disabled:opacity-50 disabled:cursor-not-allowed` when disabled

### DataTable Internals

- [ ] DataTable wraps the `<table>` in `overflow-x-auto rounded-xl border border-border`
- [ ] DataTable header row uses `bg-surface-raised/50` background with `font-medium text-ink-muted` column headers
- [ ] DataTable body rows use index-based keys (`key={idx}`), not project IDs
- [ ] DataTable rows without `onRowClick` have no cursor or hover styles; rows with `onRowClick` get `cursor-pointer hover:bg-surface-raised/50`

### Server Action Internals

- [ ] `getProjects()` returns `[]` immediately if the initial query finds zero rows (skips paper/doc count queries)
- [ ] `getProjects()` doc count query filters by `isNull(synthesisDocuments.deleted_at)` — only non-deleted documents count toward `doc_count`
- [ ] `updateProject()` revalidates both `/projects` and `/dashboard` (so `updateProjectStatus()` and `archiveProject()` also revalidate both)
- [ ] `deleteProject()` revalidates both `/projects` and `/dashboard`
- [ ] `createProject()` has server-side fallbacks: `project_type` defaults to `"review_article"` if falsy, `citation_style` defaults to `"vancouver"` if falsy

### Timing and State Edge Cases

- [ ] `fetchProjects()` sets `loading` to `true` on every invocation — error recovery after failed delete/archive briefly shows the loading spinner across the entire page
- [ ] `handleStatusUpdate` clears `statusTarget` to `null` in its `finally` block (runs after the server call), in addition to the modal `onClose` handler
- [ ] Status update: `setShowStatusModal(false)` fires before `await updateProjectStatus()` — the server call runs after the modal is already closed

### formatRelativeTime Details

- [ ] Returns `"Just now"` for timestamps less than 1 minute ago
- [ ] Returns `"{N}m ago"` for timestamps between 1–59 minutes ago
- [ ] Returns `"{N}h ago"` for timestamps between 1–23 hours ago
- [ ] Returns `"{N}d ago"` for timestamps between 1–6 days ago
- [ ] Returns locale-formatted date (`en-IN`, short month + numeric day) for timestamps 7+ days old

### Styling Details

- [ ] Active tab uses `bg-surface-raised text-ink border border-border-subtle`; inactive tab uses `text-ink-muted hover:text-ink hover:bg-surface-raised/50`
- [ ] Status pipeline selected option uses `border-brand bg-brand/5 text-ink`; unselected uses `border-border bg-surface-raised text-ink-muted hover:border-brand/40 hover:text-ink`
- [ ] Name column icon rendered at `size={18}` with `text-ink-muted shrink-0`
- [ ] Type column text uses `text-ink-muted text-xs` styling
- [ ] View toggle container has `border border-border rounded-lg overflow-hidden`
- [ ] Empty state `FolderOpen` icon wrapped in `w-16 h-16 rounded-2xl bg-surface-raised` container
- [ ] "Create Your First Project" empty-state button includes a `Plus` icon alongside the text
- [ ] Status modal project title in subtitle uses `font-medium text-ink` to distinguish it from surrounding muted text

### Components Referenced But Not Rendered Directly

- [ ] `MagnifyingGlass` icon is not imported by `page.tsx` — it is rendered inside the `SearchInput` component
- [ ] `X` icon is not imported by `page.tsx` — it is rendered inside the `Modal` component
- [ ] `Tabs` component supports an optional `count` property per tab, but the projects page passes no counts — tabs show labels only, no per-tab badge numbers
- [ ] No API routes exist under `src/app/api/projects/` — all data access uses server actions from `src/lib/actions/projects.ts`
