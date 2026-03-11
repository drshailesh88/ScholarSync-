# dashboard — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Palette input placeholder is `Type a command or search...`
- [ ] `ESC` keyboard hint is hidden on extra-small screens and shown from `sm` upward
- [ ] Navigation command list includes Dashboard, Studio, Literature Search, Notebook, Library, Archive, Compliance, Presentation, and Settings
- [ ] `Toggle Theme` action switches between dark and light with `setTheme(theme === "dark" ? "light" : "dark")`
- [ ] `New Project` action routes to `/projects`, not directly to a create modal
- [ ] Running any command closes the palette before executing the router/theme action
- [ ] Stats icon containers use `w-9 h-9 rounded-lg` (smaller than action card icon containers which are `w-12 h-12`)
- [ ] Stats icons render at `size={18}` (smaller than action card icons at `size={24}`)
- [ ] Each stat card icon + number are in a `flex items-center gap-3 mb-2` row
- [ ] When `project.status` is null or falsy, status defaults to `"drafting"` badge (line 262: `|| "drafting"`)
- [ ] Status badge labels are exact strings: `"Planning"`, `"Drafting"`, `"Reviewing"`, `"Completed"`, `"Archived"`
- [ ] Project title has `truncate` class (text-overflow ellipsis on long titles)
- [ ] FileText icon in project rows uses `size={20}`
- [ ] ArrowRight icon in row arrow affordance uses `size={14}`
- [ ] Project document icon transitions from `text-ink-muted` to `text-ink` on row hover via `group-hover:text-ink`
- [ ] Empty manuscripts state padding is `p-8`
- [ ] MagnifyingGlass icon in search rows uses `size={16}`
- [ ] Search metadata line joins values with ` · ` (middle dot) separator: `{count} results · {time}` or `No results · {time}`
- [ ] Empty search state padding is `p-6`
- [ ] Recent Activity section header contains NO action link (unlike Recent Searches which has "Search →")
- [ ] ClockCounterClockwise icon in activity rows uses `size={16}`
- [ ] `formatActivityAction()` is reused for BOTH `action` field AND `entity_type` field formatting
- [ ] Recent Searches + Recent Activity side-by-side breakpoint is `lg:grid-cols-2` (1024px+), single column below
- [ ] ThemeToggle is a **segmented pill control** with two labeled buttons, not a single icon toggle
- [ ] Light mode button shows Sun icon with label `"Daylight"`
- [ ] Dark mode button shows Moon icon with label `"Night"`
- [ ] Active theme segment has `bg-surface text-ink shadow-sm` styling
- [ ] Inactive theme segment has `text-ink-muted hover:text-ink` styling
- [ ] ThemeToggle icons use `size={14}` with `weight="fill"` when active, `"regular"` when inactive
- [ ] ThemeToggle renders a skeleton placeholder (`h-9 w-[156px] rounded-full bg-surface-raised`) before client mount to prevent hydration mismatch
- [ ] ThemeToggle uses `useSyncExternalStore` for SSR-safe mounting detection
- [ ] Desktop sidebar width is `w-64` (256px)
- [ ] Mobile overlay backdrop has `backdrop-blur-sm` blur effect
- [ ] Sidebar logo area has `h-20` height with `border-b border-border-subtle`
- [ ] Nav section labels (WORKSPACE, LIBRARY, TOOLS) use `text-[10px]` font size with `text-ink-muted/60` opacity
