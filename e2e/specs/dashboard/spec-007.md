# dashboard — Spec 007

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
- [x] PASS: Palette input placeholder is `Type a command or search...`
- [x] PASS: `ESC` keyboard hint is hidden on extra-small screens and shown from `sm` upward
- [x] PASS: Navigation command list includes Dashboard, Studio, Literature Search, Notebook, Library, Archive, Compliance, Presentation, and Settings
- [x] PASS: `Toggle Theme` action switches between dark and light with `setTheme(theme === "dark" ? "light" : "dark")`
- [x] PASS: `New Project` action routes to `/projects`, not directly to a create modal
- [x] PASS: Running any command closes the palette before executing the router/theme action
- [x] PASS: Stats icon containers use `w-9 h-9 rounded-lg` (smaller than action card icon containers which are `w-12 h-12`)
- [x] PASS: Stats icons render at `size={18}` (smaller than action card icons at `size={24}`)
- [x] PASS: Each stat card icon + number are in a `flex items-center gap-3 mb-2` row
- [x] PASS: When `project.status` is null or falsy, status defaults to `"drafting"` badge (line 262: `|| "drafting"`)
- [x] PASS: Status badge labels are exact strings: `"Planning"`, `"Drafting"`, `"Reviewing"`, `"Completed"`, `"Archived"`
- [x] PASS: Project title has `truncate` class (text-overflow ellipsis on long titles)
- [x] PASS: FileText icon in project rows uses `size={20}`
- [x] PASS: ArrowRight icon in row arrow affordance uses `size={14}`
- [x] PASS: Project document icon transitions from `text-ink-muted` to `text-ink` on row hover via `group-hover:text-ink`
- [x] PASS: Empty manuscripts state padding is `p-8`
- [x] PASS: MagnifyingGlass icon in search rows uses `size={16}`
- [x] PASS: Search metadata line joins values with ` · ` (middle dot) separator: `{count} results · {time}` or `No results · {time}`
- [x] PASS: Empty search state padding is `p-6`
- [x] PASS: Recent Activity section header contains NO action link (unlike Recent Searches which has "Search →")
- [x] PASS: ClockCounterClockwise icon in activity rows uses `size={16}`
- [x] PASS: `formatActivityAction()` is reused for BOTH `action` field AND `entity_type` field formatting
- [x] PASS: Recent Searches + Recent Activity side-by-side breakpoint is `lg:grid-cols-2` (1024px+), single column below
- [x] PASS: ThemeToggle is a **segmented pill control** with two labeled buttons, not a single icon toggle
- [x] PASS: Light mode button shows Sun icon with label `"Daylight"`
- [x] PASS: Dark mode button shows Moon icon with label `"Night"`
- [x] PASS: Active theme segment has `bg-surface text-ink shadow-sm` styling
- [x] PASS: Inactive theme segment has `text-ink-muted hover:text-ink` styling
- [x] PASS: ThemeToggle icons use `size={14}` with `weight="fill"` when active, `"regular"` when inactive
- [x] PASS: ThemeToggle renders a skeleton placeholder (`h-9 w-[156px] rounded-full bg-surface-raised`) before client mount to prevent hydration mismatch
- [x] PASS: ThemeToggle uses `useSyncExternalStore` for SSR-safe mounting detection
- [x] PASS: Desktop sidebar width is `w-64` (256px)
- [x] PASS: Mobile overlay backdrop has `backdrop-blur-sm` blur effect
- [x] PASS: Sidebar logo area has `h-20` height with `border-b border-border-subtle`
- [x] PASS: Nav section labels (WORKSPACE, LIBRARY, TOOLS) use `text-[10px]` font size with `text-ink-muted/60` opacity
