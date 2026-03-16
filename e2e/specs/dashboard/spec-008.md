# dashboard — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Clicking any sidebar nav link calls `onClose` — automatically closes mobile sidebar on navigation
- [x] PASS: `ClerkUserButton` is dynamically imported and shows `w-8 h-8 rounded-full bg-surface-raised` loading placeholder
- [x] PASS: `ClerkUserButton` receives `afterSignOutUrl="/"` prop
- [x] PASS: Sidebar nav area has `overflow-y-auto` for scrollable navigation when items overflow
- [x] PASS: Sidebar fallback placeholder (no Clerk) uses specific styling: `bg-brand/20 border border-brand/30`
- [x] PASS: Command palette is built on the `cmdk` library (`Command` from `"cmdk"`)
- [x] PASS: Palette is positioned at `top-[20%]` of viewport, horizontally centered, with `max-w-lg` width
- [x] PASS: When no commands match the search filter, empty state shows `"No results found."`
- [x] PASS: Commands are organized under `"Navigation"` and `"Actions"` group headings
- [x] PASS: Selected command item is highlighted via `data-[selected=true]:bg-surface-raised`
- [x] PASS: Command palette does NOT include Deep Research, LaTeX Editor, Journal Feed, or Systematic Review (these are sidebar-only navigation items)
- [x] PASS: Search input area shows a `MagnifyingGlass` icon at `size={18}` before the text input
- [x] PASS: Command list has `max-h-72` max height with overflow scrolling
- [x] PASS: Toggle Theme action icon is contextual: shows `Sun` when current theme is dark, `Moon` when light
- [x] PASS: New Project action uses `PenNib` icon
- [x] PASS: Loading skeleton renders only 2 of 5 dashboard sections: action cards grid and manuscripts table — NO skeleton for stats overview, recent searches, or recent activity
- [x] PASS: Each card skeleton contains: icon placeholder (`h-12 w-12 rounded-xl`), title placeholder (`h-5 w-2/3`), description placeholder (`h-3 w-full`)
- [x] PASS: SkeletonTable rows contain: icon (`h-10 w-10 rounded-lg`), title line (`h-4 w-2/3`), subtitle line (`h-3 w-1/3`), badge placeholder (`h-6 w-20 rounded-full`)
- [x] PASS: Loading skeleton grid uses same breakpoints as actual page (`sm:grid-cols-2 lg:grid-cols-4`)
- [x] PASS: `ErrorDisplay` reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` on mount
- [x] PASS: Error icon is `WarningCircle` at `size={32}` inside a `bg-red-500/10` rounded container
- [x] PASS: "Try Again" button includes `ArrowCounterClockwise` icon at `size={16}` with `bg-brand text-white` styling
- [x] PASS: `getDashboardData()` calls `getCurrentUserId()` first for the userId variable, then calls `ensureUser()` separately before `Promise.all`
- [x] PASS: Recent projects query includes `isNull(projects.deleted_at)` soft-delete filter
- [x] PASS: Paper count query includes `isNull(userReferences.deletedAt)` soft-delete filter
- [x] PASS: Search count and conversation count queries have NO soft-delete filter (count all records for user)
- [x] PASS: User query selects all columns from `users` table (`db.select().from(users)`) not just needed fields
- [x] PASS: Stats default values when user row is null: `tokens_limit → 10000`, `plan → "free"`, all numeric usage fields → `0`
- [x] PASS: Logo icon is `SquaresFour` with `weight="fill"` at `size={18}`
- [x] PASS: Logo background is a gradient: `bg-gradient-to-tr from-sky-500 to-indigo-500`
- [x] PASS: Logo text reads `"ScholarSync"` with `font-semibold tracking-tight`
- [x] PASS: AppShell root container uses `flex h-screen` layout
- [x] PASS: Main content area has `p-6` padding and `overflow-y-auto` scrolling
- [x] PASS: `CommandPalette` is rendered as a direct child of the root flex container, outside the content column
- [x] PASS: Badge uses `rounded-full` shape (pill style, not rounded rectangle)
