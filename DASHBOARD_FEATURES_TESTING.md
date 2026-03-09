# ScholarSync — Dashboard Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Dashboard page (`/dashboard`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/dashboard/`, `src/lib/actions/dashboard.ts`, `src/components/layout/`, and related modules.

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Action Cards](#2-action-cards)
3. [Stats Overview](#3-stats-overview)
4. [Active Manuscripts (Recent Projects)](#4-active-manuscripts-recent-projects)
5. [Recent Searches](#5-recent-searches)
6. [Recent Activity](#6-recent-activity)
7. [App Shell — Sidebar Navigation](#7-app-shell--sidebar-navigation)
8. [App Shell — Header](#8-app-shell--header)
9. [Command Palette](#9-command-palette)
10. [Loading State](#10-loading-state)
11. [Error Handling](#11-error-handling)
12. [Data Fetching & Server Actions](#12-data-fetching--server-actions)
13. [Document Migration](#13-document-migration)
14. [Authentication & Access Control](#14-authentication--access-control)
15. [Quick Test Workflows](#15-quick-test-workflows)

---

## 1. Page Overview

| Page | Route | Purpose |
|------|-------|---------|
| **Dashboard** | `/dashboard` | Hub landing page — quick actions, stats, recent projects, searches, and activity |

### Layout

```
┌───────────┬──────────────────────────────────────────────────┐
│           │  App Header (greeting, notifications, theme)     │
│  Sidebar  ├──────────────────────────────────────────────────┤
│           │  Action Cards (4-column grid)                    │
│  (nav)    ├──────────────────────────────────────────────────┤
│           │  Stats Overview (4 stat cards)                   │
│           ├──────────────────────────────────────────────────┤
│           │  Active Manuscripts (recent projects list)       │
│           ├────────────────────────┬─────────────────────────┤
│           │  Recent Searches       │  Recent Activity        │
└───────────┴────────────────────────┴─────────────────────────┘
```

- [ ] Page renders with all sections visible
- [ ] `force-dynamic` — always fetches fresh data on load
- [ ] Content constrained to `max-w-5xl` width
- [ ] Responsive: stacks to single column on mobile

---

## 2. Action Cards

- [ ] Section title "What do you want to do today?" displayed
- [ ] Grid layout: 1 column mobile → 2 columns tablet → 4 columns desktop

### Card: Literature Search (sky accent)
- [ ] Icon: GlobeHemisphereWest with `bg-sky-500/10` background
- [ ] Title: "Literature Search"
- [ ] Description: "Query 200M+ academic papers. Extract consensus."
- [ ] Click navigates to `/research`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-sky-500/30`
- [ ] Icon scales up on hover

### Card: Write & Draft (indigo accent)
- [ ] Icon: PenNib with `bg-indigo-500/10` background
- [ ] Title: "Write & Draft"
- [ ] Description: "Open the luminous studio. Start writing with focus."
- [ ] Click navigates to `/studio`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-indigo-500/30`

### Card: Learn Mode (emerald accent)
- [ ] Icon: GraduationCap with `bg-emerald-500/10` background
- [ ] Title: "Learn Mode"
- [ ] Description: "Socratic AI tutor. Think critically, learn deeply."
- [ ] Click navigates to `/studio?mode=learn`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-emerald-500/30`

### Card: Final Checks (amber accent)
- [ ] Icon: ShieldCheck with `bg-amber-500/10` background
- [ ] Title: "Final Checks"
- [ ] Description: "Run plagiarism and AI-detection compliance audits."
- [ ] Click navigates to `/compliance`
- [ ] Hover: -translate-y-1 (moves UP), glow shadow, `border-amber-500/30`

### Common Card Behavior
- [ ] Glass-panel styling (`glass-panel rounded-2xl`)
- [ ] Smooth `transition-all` on hover
- [ ] Cursor pointer on hover
- [ ] All four cards render at equal height

---

## 3. Stats Overview

- [ ] Section title "Your Research at a Glance" displayed
- [ ] Grid layout: 2 columns mobile → 4 columns (`sm:` breakpoint, 640px+)

| Stat | Icon | Accent | Source Field | Test |
|------|------|--------|--------------|------|
| Projects | FileText | indigo | `stats.projectCount` | [ ] Displays correct count |
| Papers Saved | Books | sky | `stats.paperCount` | [ ] Displays correct count |
| Searches | MagnifyingGlass | emerald | `stats.searchCount` | [ ] Displays correct count |
| Conversations | ChatCircleDots | amber | `stats.conversationCount` | [ ] Displays correct count |

- [ ] Each card shows large bold number
- [ ] Each card shows label text below number
- [ ] Glass-panel styling on each card
- [ ] Icons render with correct accent color background
- [ ] Stats show `0` for new users (not blank or error)

---

## 4. Active Manuscripts (Recent Projects)

- [ ] Section title "Active Manuscripts" displayed
- [ ] "View Archive →" link in header navigates to `/projects`
- [ ] Glass-panel container wraps the project list

### Empty State
- [ ] When no projects exist: "No projects yet. Create your first manuscript to get started."

### Project Rows (max 4)
- [ ] Each row shows document icon
- [ ] Each row shows project title (font-serif)
- [ ] Each row shows relative time (e.g., "2h ago", "3d ago")
- [ ] Each row shows project type (converted from snake_case to Title Case)
- [ ] Each row shows status badge with correct variant:
  | Status | Badge Variant | Test |
  |--------|---------------|------|
  | planning | active | [ ] Correct badge color |
  | drafting | drafting (amber) | [ ] Correct badge color |
  | reviewing | active | [ ] Correct badge color |
  | completed | completed (emerald) | [ ] Correct badge color |
  | archived | completed (emerald) | [ ] Correct badge color |
- [ ] Each row shows right-arrow icon
- [ ] Clicking a row navigates to `/studio/{project.id}`
- [ ] Hover: background color changes, text color changes
- [ ] Separator lines between rows (not after last row)

### Relative Time Formatting
- [ ] < 60 seconds → "Just now"
- [ ] < 60 minutes → "Nm ago" (e.g., "5m ago")
- [ ] < 24 hours → "Nh ago" (e.g., "2h ago")
- [ ] < 7 days → "Nd ago" (e.g., "3d ago")
- [ ] ≥ 7 days → Date string (e.g., "Jan 15")

---

## 5. Recent Searches

- [ ] Section title "Recent Searches" displayed
- [ ] "Search →" link in header navigates to `/research`
- [ ] Glass-panel container

### Empty State
- [ ] When no searches: "No searches yet. Start exploring academic papers."

### Search Rows (max 5)
- [ ] MagnifyingGlass icon on each row
- [ ] Original query text displayed
- [ ] Result count shown (e.g., "42 results")
- [ ] Creation time displayed (relative format)
- [ ] Source shown if not "all"
- [ ] Separator lines between rows
- [ ] Hover: background color changes

---

## 6. Recent Activity

- [ ] Section title "Recent Activity" displayed
- [ ] Glass-panel container
- [ ] Bottom grid: side-by-side with Recent Searches on desktop, stacked on mobile

### Empty State
- [ ] When no activity: "No activity yet. Your research actions will appear here."

### Activity Rows (max 8)
- [ ] ClockCounterClockwise icon on each row
- [ ] Action type displayed (converted from snake_case to Title Case)
- [ ] Entity type displayed
- [ ] Creation time displayed (relative format)
- [ ] Separator lines between rows
- [ ] Hover: background color changes

---

## 7. App Shell — Sidebar Navigation

- [ ] Sidebar visible on `md:` breakpoint and above
- [ ] Sidebar hidden on mobile (overlay mode)
- [ ] Logo at top of sidebar

### Navigation Sections

**WORKSPACE (6 items)**
| Item | Route | Test |
|------|-------|------|
| Dashboard | `/dashboard` | [ ] Navigates correctly, shows active state |
| Studio | `/studio` | [ ] Navigates correctly |
| LaTeX Editor | `/latex` | [ ] Navigates correctly |
| Literature Search | `/research` | [ ] Navigates correctly |
| Deep Research | `/deep-research` | [ ] Navigates correctly |
| Notebook | `/notebook` | [ ] Navigates correctly |

**LIBRARY (3 items)**
| Item | Route | Test |
|------|-------|------|
| Papers | `/library` | [ ] Navigates correctly |
| Journal Feed | `/feeds` | [ ] Navigates correctly |
| Archive | `/projects` | [ ] Navigates correctly |

**TOOLS (4 items)**
| Item | Route | Test |
|------|-------|------|
| Systematic Review | `/systematic-review` | [ ] Navigates correctly |
| Compliance | `/compliance` | [ ] Navigates correctly |
| Presentation | `/presentation` | [ ] Navigates correctly |
| Settings | `/settings` | [ ] Navigates correctly |

- [ ] Active page has highlighted styling
- [ ] User button (Clerk) at bottom of sidebar
- [ ] Mobile: hamburger menu opens sidebar overlay
- [ ] Mobile: clicking outside overlay closes sidebar

---

## 8. App Shell — Header

- [ ] Dynamic greeting based on time of day:
  - [ ] "Good morning" (before noon)
  - [ ] "Good afternoon" (noon–6pm)
  - [ ] "Good evening" (after 6pm)
- [ ] Notification bell icon displayed (placeholder)
- [ ] Theme toggle button works (light ↔ dark)
- [ ] Header spans full width above content area

---

## 9. Command Palette

- [ ] Opens with `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- [ ] Search input for filtering commands
- [ ] Navigation commands to all major features listed
- [ ] Quick actions available: Toggle theme, New Project
- [ ] Typing filters visible commands
- [ ] Enter selects highlighted command
- [ ] Arrow keys navigate options
- [ ] Escape closes palette
- [ ] Clicking outside closes palette

---

## 10. Loading State

- [ ] Skeleton UI displays while server data loads
- [ ] Skeleton for action cards section header
- [ ] 4 skeleton cards in grid (matching action cards layout)
- [ ] Skeleton for projects section header
- [ ] SkeletonTable with 4 rows (icon, content, badge placeholders)
- [ ] Pulse animation on all skeleton elements
- [ ] No layout shift when real content replaces skeleton

---

## 11. Error Handling

- [ ] Error boundary wraps dashboard page
- [ ] On error: `ErrorDisplay` component renders
- [ ] Title: "Dashboard unavailable"
- [ ] Message: "We couldn't load your dashboard. This might be a temporary issue."
- [ ] Error details shown from error object
- [ ] "Try Again" button calls `reset()` to retry page load
- [ ] After retry, page re-fetches data and renders normally

---

## 12. Data Fetching & Server Actions

- [ ] `getDashboardData()` runs server-side on page load
- [ ] 8 parallel database queries via `Promise.all()`:
  | Query | Table | Limit | Test |
  |-------|-------|-------|------|
  | Recent projects | `projects` | 4 | [ ] Returns non-deleted, ordered by `updated_at` DESC |
  | Project count | `projects` | — | [ ] Correct total count |
  | Papers saved | `userReferences` | — | [ ] Correct count |
  | Search count | `searchQueries` | — | [ ] Correct count |
  | Conversation count | `conversations` | — | [ ] Correct count |
  | Recent searches | `searchQueries` | 5 | [ ] Ordered by `created_at` DESC |
  | Recent activity | `activityLog` | 8 | [ ] Ordered by `createdAt` DESC |
  | User data | `users` | 1 | [ ] Returns plan, token usage |
- [ ] Dates serialize correctly from server to client component
- [ ] Data scoped to authenticated user only (no cross-user leaks)

---

## 13. Document Migration

- [ ] `migrateLocalDocuments()` called on dashboard mount via `useEffect`
- [ ] Reads documents from localStorage (if any exist)
- [ ] Creates default "My Research" project if user has no projects
- [ ] Migrates each document to `synthesisDocuments` + `synthesisSections` tables
- [ ] Skips "new" template documents
- [ ] Runs silently (no UI feedback — errors caught and logged)
- [ ] Runs only once per page load
- [ ] Already-migrated documents are not re-migrated

---

## 14. Authentication & Access Control

- [ ] Unauthenticated users redirected to `/sign-in`
- [ ] Authentication checked via `getCurrentUserId()` in layout
- [ ] Clerk session token verified from `__session` cookie
- [ ] All database queries scoped to authenticated user's ID
- [ ] No data from other users visible

---

## 15. Quick Test Workflows

### A. Fresh User Dashboard
1. [ ] Sign up as new user
2. [ ] Navigate to `/dashboard`
3. [ ] Verify all stats show `0`
4. [ ] Verify "No projects yet" empty state
5. [ ] Verify "No searches yet" empty state
6. [ ] Verify "No activity yet" empty state
7. [ ] Verify all 4 action cards render and are clickable

### B. Action Card Navigation
1. [ ] Click "Literature Search" → verify `/research` loads
2. [ ] Navigate back to dashboard
3. [ ] Click "Write & Draft" → verify `/studio` loads
4. [ ] Navigate back to dashboard
5. [ ] Click "Learn Mode" → verify `/studio?mode=learn` loads
6. [ ] Navigate back to dashboard
7. [ ] Click "Final Checks" → verify `/compliance` loads

### C. Project Interaction
1. [ ] Create a project via Studio
2. [ ] Navigate to `/dashboard`
3. [ ] Verify project appears in Active Manuscripts
4. [ ] Verify title, status badge, relative time display
5. [ ] Click the project row → verify `/studio/{id}` opens
6. [ ] Click "View Archive →" → verify `/projects` loads

### D. Stats Accumulation
1. [ ] Perform a search on `/research`
2. [ ] Save a paper to library
3. [ ] Start a conversation
4. [ ] Navigate to `/dashboard`
5. [ ] Verify Projects count reflects created projects
6. [ ] Verify Papers Saved count incremented
7. [ ] Verify Searches count incremented
8. [ ] Verify Conversations count incremented

### E. Loading & Error States
1. [ ] Navigate to `/dashboard` — verify skeleton UI shows briefly
2. [ ] Simulate server error (e.g., DB down)
3. [ ] Verify error boundary renders with "Dashboard unavailable"
4. [ ] Click "Try Again" — verify retry attempt

### F. Responsive Layout
1. [ ] View dashboard at desktop width (≥1024px) — verify 4-column grids
2. [ ] View at tablet width (~768px) — verify 2-column grids
3. [ ] View at mobile width (<640px) — verify single column, sidebar hidden
4. [ ] Open sidebar on mobile — verify overlay mode
5. [ ] Click outside sidebar — verify it closes

### G. Command Palette
1. [ ] Press `Cmd+K` — verify palette opens
2. [ ] Type "studio" — verify filtered results
3. [ ] Press Enter — verify navigation to Studio
4. [ ] Re-open palette, press Escape — verify it closes

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage

#### Server/Data Wiring
- [ ] `page.tsx` exports `dynamic = "force-dynamic"`
- [ ] `DashboardPage` awaits `getDashboardData()` on the server before rendering the client component
- [ ] `DashboardPage` passes `recentProjects`, `stats`, `recentSearches`, and `recentActivity` as separate props to `DashboardClient`
- [ ] `getDashboardData()` calls `ensureUser()` before assembling dashboard queries
- [ ] `getDashboardData()` runs recent-projects, counts, recent-searches, recent-activity, and user queries in parallel with `Promise.all`
- [ ] Recent projects query is limited to 4 records
- [ ] Recent searches query is limited to 5 records
- [ ] Recent activity query is limited to 8 records
- [ ] Dashboard stats include extra usage fields (`tokensUsed`, `tokensLimit`, `plagiarismChecksUsed`, `exportsUsed`, `plan`, `totalProjects`, `totalSearches`) even though this page does not render them yet

#### Client Initialization
- [ ] `DashboardClient` triggers `migrateLocalDocuments()` once on mount inside `useEffect`
- [ ] Local document migration failures are sent to `console.error`
- [ ] Dashboard content wrapper uses `max-w-5xl mx-auto`

#### Action Cards
- [ ] Action cards are rendered from the `actionCards` config array in source order
- [ ] Each action card is a `Link`, not a button with imperative routing
- [ ] Each card icon container is `w-12 h-12 rounded-xl`
- [ ] Each card icon uses `size={24}`
- [ ] Each card has `border border-border` before hover styling is applied
- [ ] Card hover scale effect is applied to the icon through `group-hover:scale-110`
- [ ] `Literature Search` card href is `/research`
- [ ] `Write & Draft` card href is `/studio`
- [ ] `Learn Mode` card href is `/studio?mode=learn`
- [ ] `Final Checks` card href is `/compliance`

#### Stats Cards
- [ ] Stats cards are hard-coded as four panels rather than mapped from a config array
- [ ] Each stats card uses `glass-panel rounded-2xl p-5 border border-border`
- [ ] Stats number text uses `text-2xl font-bold`
- [ ] Stats label text uses `text-xs text-ink-muted`
- [ ] `Projects` stat reads `stats.projectCount`
- [ ] `Papers Saved` stat reads `stats.paperCount`
- [ ] `Searches` stat reads `stats.searchCount`
- [ ] `Conversations` stat reads `stats.conversationCount`

#### Active Manuscripts Section
- [ ] `Active Manuscripts` rows are rendered directly from `recentProjects`
- [ ] Each project row uses `router.push(`/studio/${project.id}`)` on click
- [ ] Project icon container uses `w-10 h-10 rounded-lg bg-surface-raised`
- [ ] Project title hover changes to `text-brand`
- [ ] Project subtitle format is `{relative time} · {formatted project type}`
- [ ] `formatProjectType(null)` falls back to `Project`
- [ ] `formatRelativeTime(null)` falls back to `Never`
- [ ] Row arrow affordance is a circular bordered container containing `ArrowRight`
- [ ] Reviewing status uses the `active` badge variant in the current implementation
- [ ] Empty manuscripts state is a centered text block with no CTA button

#### Recent Searches Section
- [ ] Search rows are rendered directly from `recentSearches`
- [ ] Each search row icon container uses `w-8 h-8 rounded-lg bg-surface-raised`
- [ ] Search query text is truncated with `truncate`
- [ ] Search metadata line renders `No results` when `result_count` is null
- [ ] Search metadata line omits the source suffix when `source` is null or `"all"`
- [ ] Search rows have hover background styling but no click navigation in the current implementation

#### Recent Activity Section
- [ ] Activity rows are rendered directly from `recentActivity`
- [ ] Activity title text is generated by `formatActivityAction(action)`
- [ ] Activity metadata line renders formatted `entity_type` only when `entity_type` is present
- [ ] Activity metadata line omits the separator when `entity_type` is missing
- [ ] Activity rows have hover background styling but no click navigation in the current implementation

#### Relative Time Helper
- [ ] `formatRelativeTime()` returns `Just now` for under 1 minute
- [ ] `formatRelativeTime()` returns `{n}m ago` for under 60 minutes
- [ ] `formatRelativeTime()` returns `{n}h ago` for under 24 hours
- [ ] `formatRelativeTime()` returns `{n}d ago` for under 7 days
- [ ] `formatRelativeTime()` returns `toLocaleDateString("en-IN", { month: "short", day: "numeric" })` for 7+ days

#### App Header
- [ ] Header uses `h-16` with bottom border styling
- [ ] Greeting text is produced by `getGreeting()` at render time
- [ ] Header shows `Good morning` before 12:00
- [ ] Header shows `Good afternoon` from 12:00 to 17:59
- [ ] Header shows `Good evening` from 18:00 onward
- [ ] Mobile menu button is rendered only when `onMenuClick` is provided
- [ ] Mobile menu button uses the `List` icon at 20px
- [ ] Notification bell is a plain button with no click handler in the current implementation
- [ ] Header theme toggle is the shared `ThemeToggle` component

#### Sidebar
- [ ] Sidebar mobile overlay is controlled by `sidebarOpen` state in `AppShell`
- [ ] Desktop sidebar is rendered with `hidden md:flex`
- [ ] Mobile overlay renders only when `open` is truthy
- [ ] Mobile overlay backdrop click calls `onClose`
- [ ] Sidebar close button shows `X` only when `onClose` is provided
- [ ] Navigation active state matches either exact pathname or nested routes via `pathname.startsWith(item.href + "/")`
- [ ] Active nav icons switch to `weight="fill"`
- [ ] Sidebar footer renders `ClerkUserButton` only when a non-placeholder Clerk publishable key is configured
- [ ] Sidebar footer falls back to a simple circular placeholder when Clerk keys are absent

#### Command Palette
- [ ] Command palette is closed by default
- [ ] `Cmd+K` and `Ctrl+K` both toggle the command palette open state
- [ ] Palette root returns `null` when closed
- [ ] Overlay backdrop click closes the command palette
- [ ] Escape closes the command palette from inside the `Command` container
- [ ] Palette input placeholder is `Type a command or search...`
- [ ] `ESC` keyboard hint is hidden on extra-small screens and shown from `sm` upward
- [ ] Navigation command list includes Dashboard, Studio, Literature Search, Notebook, Library, Archive, Compliance, Presentation, and Settings
- [ ] `Toggle Theme` action switches between dark and light with `setTheme(theme === "dark" ? "light" : "dark")`
- [ ] `New Project` action routes to `/projects`, not directly to a create modal
- [ ] Running any command closes the palette before executing the router/theme action

*Generated from source code in `src/app/(app)/dashboard/`, `src/lib/actions/dashboard.ts`, and related modules — March 2026*
