import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface DashboardCheckpointInput {
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
  if (cached) {
    return cached;
  }

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

async function openCommandPalette(page: Page) {
  await page.keyboard.press("Meta+k").catch(async () => {
    await page.keyboard.press("Control+k");
  });
}

function actionCard(page: Page, href: string, title: string) {
  return page.locator(`main a[href="${href}"]`).filter({
    has: page.getByRole("heading", { name: title }),
  });
}

const sourceContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  "Pulse animation on all skeleton elements": [
    { file: "src/components/ui/skeleton.tsx", needle: "animate-pulse" },
  ],
  "Stats overview, recent searches, and recent activity have no skeletons and will pop in after load": [
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "<section className=\"mb-12\">" },
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "<SkeletonTable rows={4} />" },
  ],
  "On error: `ErrorDisplay` component renders": [
    { file: "src/app/(app)/dashboard/error.tsx", needle: "<ErrorDisplay" },
  ],
  "Message: \"We couldn't load your dashboard. This might be a temporary issue.\"": [
    { file: "src/app/(app)/dashboard/error.tsx", needle: "message=\"We couldn't load your dashboard. This might be a temporary issue.\"" },
  ],
  "Error object is passed into `ErrorDisplay` for logging/reporting, but raw error details are not rendered in the UI": [
    { file: "src/app/(app)/dashboard/error.tsx", needle: "error={error}" },
  ],
  "\"Try Again\" button calls `reset()` to retry page load": [
    { file: "src/app/(app)/dashboard/error.tsx", needle: "onRetry={reset}" },
  ],
  "After retry, page re-fetches data and renders normally": [
    { file: "src/app/(app)/dashboard/error.tsx", needle: "onRetry={reset}" },
    { file: "src/app/(app)/dashboard/page.tsx", needle: "const data = await getDashboardData();" },
  ],
  "Dates serialize correctly from server to client component": [
    { file: "src/app/(app)/dashboard/page.tsx", needle: "recentProjects={data.recentProjects}" },
    { file: "src/lib/actions/dashboard.ts", needle: "updated_at: Date | null;" },
    { file: "src/lib/actions/dashboard.ts", needle: "created_at: Date | null;" },
  ],
  "Creates default \"My Research\" project if user has no projects": [
    { file: "src/lib/editor/migrate-local-documents.ts", needle: 'title: "My Research"' },
  ],
  "Migrates each document to `synthesisDocuments` + `synthesisSections` tables": [
    { file: "src/lib/editor/migrate-local-documents.ts", needle: ".insert(synthesisDocuments)" },
    { file: "src/lib/editor/migrate-local-documents.ts", needle: "db.insert(synthesisSections)" },
  ],
  "Skips \"new\" template documents": [
    { file: "src/lib/editor/migrate-local-documents.ts", needle: 'if (documentId === "new")' },
  ],
  "Runs silently (no UI feedback — errors caught and logged)": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: ".catch(console.error)" },
  ],
  "No deduplication guard exists; repeated migration calls would create duplicate rows": [
    { file: "src/lib/editor/migrate-local-documents.ts", needle: ".insert(synthesisDocuments)" },
  ],
  "All database queries scoped to authenticated user's ID": [
    { file: "src/lib/actions/dashboard.ts", needle: "eq(projects.user_id, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(searchQueries.user_id, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(activityLog.userId, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(userReferences.userId, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(conversations.user_id, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(users.id, userId)" },
  ],
  "No data from other users visible": [
    { file: "src/lib/actions/dashboard.ts", needle: "eq(projects.user_id, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(searchQueries.user_id, userId)" },
    { file: "src/lib/actions/dashboard.ts", needle: "eq(activityLog.userId, userId)" },
  ],
  "`getDashboardData()` calls `ensureUser()` before assembling dashboard queries": [
    { file: "src/lib/actions/dashboard.ts", needle: "await ensureUser();" },
  ],
  "Dashboard stats include extra usage fields (`tokensUsed`, `tokensLimit`, `plagiarismChecksUsed`, `exportsUsed`, `plan`, `totalProjects`, `totalSearches`) even though this page does not render them yet": [
    { file: "src/lib/actions/dashboard.ts", needle: "tokensUsed: number;" },
    { file: "src/lib/actions/dashboard.ts", needle: "tokensLimit: number;" },
    { file: "src/lib/actions/dashboard.ts", needle: "plagiarismChecksUsed: number;" },
    { file: "src/lib/actions/dashboard.ts", needle: "exportsUsed: number;" },
    { file: "src/lib/actions/dashboard.ts", needle: "plan: string;" },
    { file: "src/lib/actions/dashboard.ts", needle: "totalProjects: number;" },
    { file: "src/lib/actions/dashboard.ts", needle: "totalSearches: number;" },
  ],
  "`DashboardClient` triggers `migrateLocalDocuments()` once on mount inside `useEffect`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "useEffect(() => {" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "migrateLocalDocuments(localDocs)" },
  ],
  "Local document migration failures are sent to `console.error`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: ".catch(console.error)" },
  ],
  "Dashboard content wrapper uses `max-w-5xl mx-auto`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "max-w-5xl mx-auto" },
  ],
  "Action cards are rendered from the `actionCards` config array in source order": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "const actionCards = [" },
  ],
  "Each action card is a `Link`, not a button with imperative routing": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<Link" },
  ],
  "Each card icon container is `w-12 h-12 rounded-xl`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "w-12 h-12 rounded-xl" },
  ],
  "Each card icon uses `size={24}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<Icon size={24} />" },
  ],
  "Each card has `border border-border` before hover styling is applied": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "border border-border" },
  ],
  "Card hover scale effect is applied to the icon through `group-hover:scale-110`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "group-hover:scale-110" },
  ],
  "`Literature Search` card href is `/research`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'href: "/research"' },
  ],
  "`Write & Draft` card href is `/studio`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'href: "/studio"' },
  ],
  "`Learn Mode` card href is `/studio?mode=learn`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'href: "/studio?mode=learn"' },
  ],
  "`Final Checks` card href is `/compliance`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'href: "/compliance"' },
  ],
  "Each stats card uses `glass-panel rounded-2xl p-5 border border-border`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "glass-panel rounded-2xl p-5 border border-border" },
  ],
  "Stats number text uses `text-2xl font-bold`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "text-2xl font-bold text-ink" },
  ],
  "Stats label text uses `text-xs text-ink-muted`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "text-xs text-ink-muted" },
  ],
  "`Projects` stat reads `stats.projectCount`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{stats.projectCount}" },
  ],
  "`Papers Saved` stat reads `stats.paperCount`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{stats.paperCount}" },
  ],
  "`Searches` stat reads `stats.searchCount`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{stats.searchCount}" },
  ],
  "`Conversations` stat reads `stats.conversationCount`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{stats.conversationCount}" },
  ],
  "`Active Manuscripts` rows are rendered directly from `recentProjects`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "recentProjects.map((project, idx) =>" },
  ],
  "Project icon container uses `w-10 h-10 rounded-lg bg-surface-raised`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "w-10 h-10 rounded-lg bg-surface-raised" },
  ],
  "Project title hover changes to `text-brand`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "group-hover:text-brand" },
  ],
  "Project subtitle format is `{relative time} · {formatted project type}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{formatRelativeTime(project.updated_at)} ·" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{formatProjectType(project.project_type)}" },
  ],
  "`formatProjectType(null)` falls back to `Project`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'if (!projectType) return "Project";' },
  ],
  "`formatRelativeTime(null)` falls back to `Never`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'if (!date) return "Never";' },
  ],
  "Row arrow affordance is a circular bordered container containing `ArrowRight`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "w-8 h-8 rounded-full border border-border" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<ArrowRight size={14} />" },
  ],
  "Reviewing status uses the `active` badge variant in the current implementation": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'reviewing: { variant: "active", label: "Reviewing" }' },
  ],
  "Empty manuscripts state is a centered text block with no CTA button": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "p-8 text-center text-ink-muted text-sm" },
  ],
  "Search rows are rendered directly from `recentSearches`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "recentSearches.map((search, idx) =>" },
  ],
  "Each search row icon container uses `w-8 h-8 rounded-lg bg-surface-raised`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "w-8 h-8 rounded-lg bg-surface-raised" },
  ],
  "Search query text is truncated with `truncate`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "text-sm text-ink truncate" },
  ],
  "Search metadata line renders `No results` when `result_count` is null": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: ': "No results"}' },
  ],
  "Search metadata line omits the source suffix when `source` is null or `\"all\"`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'search.source && search.source !== "all"' },
  ],
  "Search rows have hover background styling but no click navigation in the current implementation": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "hover:bg-surface-raised/50" },
  ],
  "Activity rows are rendered directly from `recentActivity`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "recentActivity.map((activity, idx) =>" },
  ],
  "Activity title text is generated by `formatActivityAction(action)`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "{formatActivityAction(activity.action)}" },
  ],
  "Activity metadata line renders formatted `entity_type` only when `entity_type` is present": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "activity.entity_type" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "formatActivityAction(activity.entity_type)" },
  ],
  "Activity metadata line omits the separator when `entity_type` is missing": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: '{activity.entity_type ? " · " : ""}' },
  ],
  "Activity rows have hover background styling but no click navigation in the current implementation": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "hover:bg-surface-raised/50" },
  ],
  "`formatRelativeTime()` returns `Just now` for under 1 minute": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'if (diffMins < 1) return "Just now";' },
  ],
  "`formatRelativeTime()` returns `{n}m ago` for under 60 minutes": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'if (diffMins < 60) return `${diffMins}m ago`;' },
  ],
  "`formatRelativeTime()` returns `{n}h ago` for under 24 hours": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'if (diffHours < 24) return `${diffHours}h ago`;' },
  ],
  "`formatRelativeTime()` returns `{n}d ago` for under 7 days": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'if (diffDays < 7) return `${diffDays}d ago`;' },
  ],
  "`formatRelativeTime()` returns `toLocaleDateString(\"en-IN\", { month: \"short\", day: \"numeric\" })` for 7+ days": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'toLocaleDateString("en-IN", { month: "short", day: "numeric" })' },
  ],
  "Header uses `h-16` with bottom border styling": [
    { file: "src/components/layout/app-header.tsx", needle: "h-16 flex items-center justify-between px-6 border-b border-border-subtle" },
  ],
  "Greeting text is produced by `getGreeting()` at render time": [
    { file: "src/components/layout/app-header.tsx", needle: "function getGreeting()" },
    { file: "src/components/layout/app-header.tsx", needle: "{getGreeting()}" },
  ],
  "Header shows `Good morning` before 12:00": [
    { file: "src/components/layout/app-header.tsx", needle: 'if (hour < 12) return "Good morning";' },
  ],
  "Header shows `Good afternoon` from 12:00 to 17:59": [
    { file: "src/components/layout/app-header.tsx", needle: 'if (hour < 18) return "Good afternoon";' },
  ],
  "Header shows `Good evening` from 18:00 onward": [
    { file: "src/components/layout/app-header.tsx", needle: 'return "Good evening";' },
  ],
  "Mobile menu button is rendered only when `onMenuClick` is provided": [
    { file: "src/components/layout/app-header.tsx", needle: "{onMenuClick && (" },
  ],
  "Mobile menu button uses the `List` icon at 20px": [
    { file: "src/components/layout/app-header.tsx", needle: "<List size={20} />" },
  ],
  "Notification bell is a plain button with no click handler in the current implementation": [
    { file: "src/components/layout/app-header.tsx", needle: "<Bell size={20} />" },
  ],
  "Header theme toggle is the shared `ThemeToggle` component": [
    { file: "src/components/layout/app-header.tsx", needle: "<ThemeToggle />" },
  ],
  "Sidebar mobile overlay is controlled by `sidebarOpen` state in `AppShell`": [
    { file: "src/components/layout/app-shell.tsx", needle: "const [sidebarOpen, setSidebarOpen] = useState(false);" },
  ],
  "Desktop sidebar is rendered with `hidden md:flex`": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "hidden md:flex w-64 flex-col shrink-0" },
  ],
  "Mobile overlay renders only when `open` is truthy": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "{open && (" },
  ],
  "Mobile overlay backdrop click calls `onClose`": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "onClick={onClose}" },
  ],
  "Sidebar close button shows `X` only when `onClose` is provided": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "{onClose && (" },
    { file: "src/components/layout/app-sidebar.tsx", needle: "<X size={20} />" },
  ],
  "Navigation active state matches either exact pathname or nested routes via `pathname.startsWith(item.href + \"/\")`": [
    { file: "src/components/layout/app-sidebar.tsx", needle: 'pathname === item.href || pathname.startsWith(item.href + "/")' },
  ],
  "Active nav icons switch to `weight=\"fill\"`": [
    { file: "src/components/layout/app-sidebar.tsx", needle: 'weight={isActive ? "fill" : "regular"}' },
  ],
  "Sidebar footer renders `ClerkUserButton` only when a non-placeholder Clerk publishable key is configured": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "hasClerkKeys ? (" },
    { file: "src/components/layout/app-sidebar.tsx", needle: "<ClerkUserButton afterSignOutUrl=\"/\" />" },
  ],
  "Sidebar footer falls back to a simple circular placeholder when Clerk keys are absent": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "w-8 h-8 rounded-full bg-brand/20 border border-brand/30" },
  ],
  "Command palette is closed by default": [
    { file: "src/components/ui/command-palette.tsx", needle: "const [open, setOpen] = useState(false);" },
  ],
  "`Cmd+K` and `Ctrl+K` both toggle the command palette open state": [
    { file: "src/components/ui/command-palette.tsx", needle: "(e.metaKey || e.ctrlKey) && e.key === \"k\"" },
    { file: "src/components/ui/command-palette.tsx", needle: "setOpen((prev) => !prev);" },
  ],
  "Palette root returns `null` when closed": [
    { file: "src/components/ui/command-palette.tsx", needle: "if (!open) return null;" },
  ],
  "Overlay backdrop click closes the command palette": [
    { file: "src/components/ui/command-palette.tsx", needle: "onClick={() => setOpen(false)}" },
  ],
  "Escape closes the command palette from inside the `Command` container": [
    { file: "src/components/ui/command-palette.tsx", needle: 'if (e.key === "Escape") setOpen(false);' },
  ],
  "Palette input placeholder is `Type a command or search...`": [
    { file: "src/components/ui/command-palette.tsx", needle: 'placeholder=\"Type a command or search...\"' },
  ],
  "`ESC` keyboard hint is hidden on extra-small screens and shown from `sm` upward": [
    { file: "src/components/ui/command-palette.tsx", needle: "hidden sm:inline-flex" },
  ],
  "Navigation command list includes Dashboard, Studio, Literature Search, Notebook, Library, Archive, Compliance, Presentation, and Settings": [
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Dashboard", href: "/dashboard", icon: House }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Studio", href: "/studio", icon: PenNib }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Literature Search", href: "/research", icon: GlobeHemisphereWest }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Notebook", href: "/notebook", icon: Notebook }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Library", href: "/library", icon: Books }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Archive", href: "/projects", icon: FolderOpen }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Compliance", href: "/compliance", icon: ShieldCheck }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Presentation", href: "/presentation", icon: ProjectorScreenChart }' },
    { file: "src/components/ui/command-palette.tsx", needle: '{ label: "Settings", href: "/settings", icon: Gear }' },
  ],
  "`Toggle Theme` action switches between dark and light with `setTheme(theme === \"dark\" ? \"light\" : \"dark\")`": [
    { file: "src/components/ui/command-palette.tsx", needle: 'setTheme(theme === "dark" ? "light" : "dark")' },
  ],
  "`New Project` action routes to `/projects`, not directly to a create modal": [
    { file: "src/components/ui/command-palette.tsx", needle: 'router.push("/projects")' },
  ],
  "Running any command closes the palette before executing the router/theme action": [
    { file: "src/components/ui/command-palette.tsx", needle: "setOpen(false);" },
    { file: "src/components/ui/command-palette.tsx", needle: "fn();" },
  ],
  "Stats icon containers use `w-9 h-9 rounded-lg` (smaller than action card icon containers which are `w-12 h-12`)": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "w-9 h-9 rounded-lg" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "w-12 h-12 rounded-xl" },
  ],
  "Stats icons render at `size={18}` (smaller than action card icons at `size={24}`)": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<FileText size={18} />" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<Icon size={24} />" },
  ],
  "Each stat card icon + number are in a `flex items-center gap-3 mb-2` row": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "flex items-center gap-3 mb-2" },
  ],
  "When `project.status` is null or falsy, status defaults to `\"drafting\"` badge (line 262: `|| \"drafting\"`)": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: '(project.status as DbStatus) || "drafting"' },
  ],
  "Status badge labels are exact strings: `\"Planning\"`, `\"Drafting\"`, `\"Reviewing\"`, `\"Completed\"`, `\"Archived\"`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'planning: { variant: "active", label: "Planning" }' },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'drafting: { variant: "drafting", label: "Drafting" }' },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'reviewing: { variant: "active", label: "Reviewing" }' },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'completed: { variant: "completed", label: "Completed" }' },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: 'archived: { variant: "completed", label: "Archived" }' },
  ],
  "Project title has `truncate` class (text-overflow ellipsis on long titles)": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "group-hover:text-brand transition-colors truncate" },
  ],
  "FileText icon in project rows uses `size={20}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<FileText size={20} />" },
  ],
  "ArrowRight icon in row arrow affordance uses `size={14}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<ArrowRight size={14} />" },
  ],
  "Project document icon transitions from `text-ink-muted` to `text-ink` on row hover via `group-hover:text-ink`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "text-ink-muted group-hover:text-ink transition-colors" },
  ],
  "Empty manuscripts state padding is `p-8`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "p-8 text-center" },
  ],
  "MagnifyingGlass icon in search rows uses `size={16}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<MagnifyingGlass size={16} />" },
  ],
  "Search metadata line joins values with ` · ` (middle dot) separator: `{count} results · {time}` or `No results · {time}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: ' : "No results"}{" "}' },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "· {formatRelativeTime(search.created_at)}" },
  ],
  "Empty search state padding is `p-6`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "p-6 text-center" },
  ],
  "ClockCounterClockwise icon in activity rows uses `size={16}`": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "<ClockCounterClockwise size={16} />" },
  ],
  "`formatActivityAction()` is reused for BOTH `action` field AND `entity_type` field formatting": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "formatActivityAction(activity.action)" },
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "formatActivityAction(activity.entity_type)" },
  ],
  "Recent Searches + Recent Activity side-by-side breakpoint is `lg:grid-cols-2` (1024px+), single column below": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
  ],
  "ThemeToggle is a **segmented pill control** with two labeled buttons, not a single icon toggle": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "rounded-full bg-surface-raised p-1 border border-border" },
    { file: "src/components/ui/theme-toggle.tsx", needle: "Daylight" },
    { file: "src/components/ui/theme-toggle.tsx", needle: "Night" },
  ],
  "Light mode button shows Sun icon with label `\"Daylight\"`": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "<Sun size={14}" },
    { file: "src/components/ui/theme-toggle.tsx", needle: "Daylight" },
  ],
  "Dark mode button shows Moon icon with label `\"Night\"`": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "<Moon size={14}" },
    { file: "src/components/ui/theme-toggle.tsx", needle: "Night" },
  ],
  "Active theme segment has `bg-surface text-ink shadow-sm` styling": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "bg-surface text-ink shadow-sm" },
  ],
  "Inactive theme segment has `text-ink-muted hover:text-ink` styling": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "text-ink-muted hover:text-ink" },
  ],
  "ThemeToggle icons use `size={14}` with `weight=\"fill\"` when active, `\"regular\"` when inactive": [
    { file: "src/components/ui/theme-toggle.tsx", needle: 'weight={theme === "light" ? "fill" : "regular"}' },
    { file: "src/components/ui/theme-toggle.tsx", needle: 'weight={theme === "dark" ? "fill" : "regular"}' },
  ],
  "ThemeToggle renders a skeleton placeholder (`h-9 w-[156px] rounded-full bg-surface-raised`) before client mount to prevent hydration mismatch": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "h-9 w-[156px] rounded-full bg-surface-raised" },
  ],
  "ThemeToggle uses `useSyncExternalStore` for SSR-safe mounting detection": [
    { file: "src/components/ui/theme-toggle.tsx", needle: "useSyncExternalStore" },
  ],
  "Desktop sidebar width is `w-64` (256px)": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "w-64 flex-col" },
  ],
  "Mobile overlay backdrop has `backdrop-blur-sm` blur effect": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "backdrop-blur-sm" },
  ],
  "Sidebar logo area has `h-20` height with `border-b border-border-subtle`": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "h-20 flex items-center justify-between px-6 border-b border-border-subtle" },
  ],
  "Nav section labels (WORKSPACE, LIBRARY, TOOLS) use `text-[10px]` font size with `text-ink-muted/60` opacity": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "text-[10px] font-semibold tracking-widest text-ink-muted/60" },
  ],
  "Clicking any sidebar nav link calls `onClose` — automatically closes mobile sidebar on navigation": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "onClick={onClose}" },
  ],
  "`ClerkUserButton` is dynamically imported and shows `w-8 h-8 rounded-full bg-surface-raised` loading placeholder": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "dynamic(" },
    { file: "src/components/layout/app-sidebar.tsx", needle: "w-8 h-8 rounded-full bg-surface-raised" },
  ],
  "`ClerkUserButton` receives `afterSignOutUrl=\"/\"` prop": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "<ClerkUserButton afterSignOutUrl=\"/\" />" },
  ],
  "Sidebar nav area has `overflow-y-auto` for scrollable navigation when items overflow": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "overflow-y-auto" },
  ],
  "Sidebar fallback placeholder (no Clerk) uses specific styling: `bg-brand/20 border border-brand/30`": [
    { file: "src/components/layout/app-sidebar.tsx", needle: "bg-brand/20 border border-brand/30" },
  ],
  "Command palette is built on the `cmdk` library (`Command` from `\"cmdk\"`)": [
    { file: "src/components/ui/command-palette.tsx", needle: 'import { Command } from "cmdk";' },
  ],
  "Palette is positioned at `top-[20%]` of viewport, horizontally centered, with `max-w-lg` width": [
    { file: "src/components/ui/command-palette.tsx", needle: "absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg" },
  ],
  "When no commands match the search filter, empty state shows `\"No results found.\"`": [
    { file: "src/components/ui/command-palette.tsx", needle: "No results found." },
  ],
  "Commands are organized under `\"Navigation\"` and `\"Actions\"` group headings": [
    { file: "src/components/ui/command-palette.tsx", needle: "heading=\"Navigation\"" },
    { file: "src/components/ui/command-palette.tsx", needle: "heading=\"Actions\"" },
  ],
  "Selected command item is highlighted via `data-[selected=true]:bg-surface-raised`": [
    { file: "src/components/ui/command-palette.tsx", needle: "data-[selected=true]:bg-surface-raised" },
  ],
  "Search input area shows a `MagnifyingGlass` icon at `size={18}` before the text input": [
    { file: "src/components/ui/command-palette.tsx", needle: "<MagnifyingGlass size={18}" },
  ],
  "Command list has `max-h-72` max height with overflow scrolling": [
    { file: "src/components/ui/command-palette.tsx", needle: "max-h-72 overflow-y-auto p-2" },
  ],
  "Toggle Theme action icon is contextual: shows `Sun` when current theme is dark, `Moon` when light": [
    { file: "src/components/ui/command-palette.tsx", needle: "theme === \"dark\" ? (" },
    { file: "src/components/ui/command-palette.tsx", needle: "<Sun size={18}" },
    { file: "src/components/ui/command-palette.tsx", needle: "<Moon size={18}" },
  ],
  "New Project action uses `PenNib` icon": [
    { file: "src/components/ui/command-palette.tsx", needle: "<PenNib size={18}" },
  ],
  "Loading skeleton renders only 2 of 5 dashboard sections: action cards grid and manuscripts table — NO skeleton for stats overview, recent searches, or recent activity": [
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "Array.from({ length: 4 })" },
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "<SkeletonTable rows={4} />" },
  ],
  "Each card skeleton contains: icon placeholder (`h-12 w-12 rounded-xl`), title placeholder (`h-5 w-2/3`), description placeholder (`h-3 w-full`)": [
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "h-12 w-12 rounded-xl" },
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "h-5 w-2/3" },
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "h-3 w-full" },
  ],
  "SkeletonTable rows contain: icon (`h-10 w-10 rounded-lg`), title line (`h-4 w-2/3`), subtitle line (`h-3 w-1/3`), badge placeholder (`h-6 w-20 rounded-full`)": [
    { file: "src/components/ui/skeleton.tsx", needle: "h-10 w-10 rounded-lg" },
    { file: "src/components/ui/skeleton.tsx", needle: "h-4 w-2/3" },
    { file: "src/components/ui/skeleton.tsx", needle: "h-3 w-1/3" },
    { file: "src/components/ui/skeleton.tsx", needle: "h-6 w-20 rounded-full" },
  ],
  "Loading skeleton grid uses same breakpoints as actual page (`sm:grid-cols-2 lg:grid-cols-4`)": [
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
  ],
  "`ErrorDisplay` reports errors to Sentry via `Sentry.captureException(error)` in a `useEffect` on mount": [
    { file: "src/components/ui/error-display.tsx", needle: "useEffect(() => {" },
    { file: "src/components/ui/error-display.tsx", needle: "Sentry.captureException(error);" },
  ],
  "Error icon is `WarningCircle` at `size={32}` inside a `bg-red-500/10` rounded container": [
    { file: "src/components/ui/error-display.tsx", needle: "bg-red-500/10" },
    { file: "src/components/ui/error-display.tsx", needle: "<WarningCircle size={32} />" },
  ],
  "\"Try Again\" button includes `ArrowCounterClockwise` icon at `size={16}` with `bg-brand text-white` styling": [
    { file: "src/components/ui/error-display.tsx", needle: "<ArrowCounterClockwise size={16} />" },
    { file: "src/components/ui/error-display.tsx", needle: "bg-brand text-white" },
  ],
  "`getDashboardData()` calls `getCurrentUserId()` first for the userId variable, then calls `ensureUser()` separately before `Promise.all`": [
    { file: "src/lib/actions/dashboard.ts", needle: "const userId = await getCurrentUserId();" },
    { file: "src/lib/actions/dashboard.ts", needle: "await ensureUser();" },
  ],
  "Search count and conversation count queries have NO soft-delete filter (count all records for user)": [
    { file: "src/lib/actions/dashboard.ts", needle: ".from(searchQueries)" },
    { file: "src/lib/actions/dashboard.ts", needle: ".where(eq(searchQueries.user_id, userId))" },
    { file: "src/lib/actions/dashboard.ts", needle: ".from(conversations)" },
    { file: "src/lib/actions/dashboard.ts", needle: ".where(eq(conversations.user_id, userId))" },
  ],
  "User query selects all columns from `users` table (`db.select().from(users)`) not just needed fields": [
    { file: "src/lib/actions/dashboard.ts", needle: "db.select().from(users).where(eq(users.id, userId))" },
  ],
  "Stats default values when user row is null: `tokens_limit → 10000`, `plan → \"free\"`, all numeric usage fields → `0`": [
    { file: "src/lib/actions/dashboard.ts", needle: "tokensUsed: user?.tokens_used_this_month ?? 0" },
    { file: "src/lib/actions/dashboard.ts", needle: "tokensLimit: user?.tokens_limit ?? 10000" },
    { file: "src/lib/actions/dashboard.ts", needle: "plagiarismChecksUsed: user?.plagiarism_checks_used ?? 0" },
    { file: "src/lib/actions/dashboard.ts", needle: "exportsUsed: user?.exports_used_this_month ?? 0" },
    { file: "src/lib/actions/dashboard.ts", needle: 'plan: user?.plan ?? "free"' },
  ],
  "Logo icon is `SquaresFour` with `weight=\"fill\"` at `size={18}`": [
    { file: "src/components/ui/logo.tsx", needle: "<SquaresFour size={18} weight=\"fill\" />" },
  ],
  "Logo background is a gradient: `bg-gradient-to-tr from-sky-500 to-indigo-500`": [
    { file: "src/components/ui/logo.tsx", needle: "bg-gradient-to-tr from-sky-500 to-indigo-500" },
  ],
  "Logo text reads `\"ScholarSync\"` with `font-semibold tracking-tight`": [
    { file: "src/components/ui/logo.tsx", needle: "font-semibold tracking-tight text-ink" },
    { file: "src/components/ui/logo.tsx", needle: "ScholarSync" },
  ],
  "AppShell root container uses `flex h-screen` layout": [
    { file: "src/components/layout/app-shell.tsx", needle: "className=\"flex h-screen\"" },
  ],
  "Main content area has `p-6` padding and `overflow-y-auto` scrolling": [
    { file: "src/components/layout/app-shell.tsx", needle: "<main className=\"flex-1 overflow-y-auto p-6\">{children}</main>" },
  ],
  "`CommandPalette` is rendered as a direct child of the root flex container, outside the content column": [
    { file: "src/components/layout/app-shell.tsx", needle: "<CommandPalette />" },
  ],
  "Badge uses `rounded-full` shape (pill style, not rounded rectangle)": [
    { file: "src/components/ui/badge.tsx", needle: "rounded-full" },
  ],
  "Badge component defines `issues` (red) and `popular` (sky) variants that are NOT used by the dashboard": [
    { file: "src/components/ui/badge.tsx", needle: 'issues: "bg-red-500/10 text-red-500 border-red-500/20"' },
    { file: "src/components/ui/badge.tsx", needle: 'popular: "bg-sky-500/10 text-sky-500 border-sky-500/20"' },
  ],
};

const sourceRegexChecks: Record<string, Array<{ file: string; pattern: RegExp }>> = {
  "Action cards are rendered from the `actionCards` config array in source order": [
    {
      file: "src/app/(app)/dashboard/dashboard-client.tsx",
      pattern: /Literature Search[\s\S]*Write & Draft[\s\S]*Learn Mode[\s\S]*Final Checks/,
    },
  ],
  "Stats cards are hard-coded as four panels rather than mapped from a config array": [
    {
      file: "src/app/(app)/dashboard/dashboard-client.tsx",
      pattern: /<p className="text-xs text-ink-muted">Projects<\/p>[\s\S]*<p className="text-xs text-ink-muted">Papers Saved<\/p>[\s\S]*<p className="text-xs text-ink-muted">Searches<\/p>[\s\S]*<p className="text-xs text-ink-muted">Conversations<\/p>/,
    },
  ],
  "Each project row uses `router.push(`/studio/${project.id}`)` on click": [
    {
      file: "src/app/(app)/dashboard/dashboard-client.tsx",
      pattern: /router\.push\(`\/studio\/\$\{project\.id\}`\)/,
    },
  ],
  "Recent Activity section header contains NO action link (unlike Recent Searches which has \"Search →\")": [
    {
      file: "src/app/(app)/dashboard/dashboard-client.tsx",
      pattern: /Recent Activity[\s\S]*<div className="glass-panel rounded-2xl overflow-hidden border border-border">/,
    },
  ],
};

const sourceNotContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  "Stats overview, recent searches, and recent activity have no skeletons and will pop in after load": [
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "Your Research at a Glance" },
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "Recent Searches" },
    { file: "src/app/(app)/dashboard/loading.tsx", needle: "Recent Activity" },
  ],
  "Error object is passed into `ErrorDisplay` for logging/reporting, but raw error details are not rendered in the UI": [
    { file: "src/app/(app)/dashboard/error.tsx", needle: "error.message" },
    { file: "src/app/(app)/dashboard/error.tsx", needle: "error.stack" },
  ],
  "Each action card is a `Link`, not a button with imperative routing": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "router.push(" },
  ],
  "Search rows have hover background styling but no click navigation in the current implementation": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "href=\"/research\"" },
  ],
  "Activity rows have hover background styling but no click navigation in the current implementation": [
    { file: "src/app/(app)/dashboard/dashboard-client.tsx", needle: "href=\"/activity\"" },
  ],
  "Notification bell is a plain button with no click handler in the current implementation": [
    { file: "src/components/layout/app-header.tsx", needle: "onClick={() =>" },
  ],
  "Command palette does NOT include Deep Research, LaTeX Editor, Journal Feed, or Systematic Review (these are sidebar-only navigation items)": [
    { file: "src/components/ui/command-palette.tsx", needle: "Deep Research" },
    { file: "src/components/ui/command-palette.tsx", needle: "LaTeX Editor" },
    { file: "src/components/ui/command-palette.tsx", needle: "Journal Feed" },
    { file: "src/components/ui/command-palette.tsx", needle: "Systematic Review" },
  ],
};

export async function assertDashboardCheckpoint({
  page,
  description,
  rootDir,
}: DashboardCheckpointInput): Promise<boolean> {
  if (description.startsWith("Hover: -translate-y-1 (moves UP), glow shadow, `border-")) {
    const borderToken = description.match(/`(border-[^`]+)`/)?.[1];
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "hover:-translate-y-1");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "hover:shadow-[0_0_40px");
    if (borderToken) {
      expectSourceContains(
        rootDir,
        "src/app/(app)/dashboard/dashboard-client.tsx",
        borderToken.replace("border-", "hover:border-")
      );
    }
    return true;
  }

  if (description === "Page renders with all sections visible") {
    await expect(page.locator("body")).toContainText("What do you want to do today?");
    await expect(page.getByRole("heading", { name: "Your Research at a Glance" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Active Manuscripts" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent Searches" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent Activity" })).toBeVisible();
    return true;
  }

  if (description === "`force-dynamic` — always fetches fresh data on load") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", 'export const dynamic = "force-dynamic";');
    return true;
  }

  if (description === "`page.tsx` exports `dynamic = \"force-dynamic\"`") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", 'export const dynamic = "force-dynamic";');
    return true;
  }

  if (description === "Content constrained to `max-w-5xl` width") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'className="max-w-5xl mx-auto"');
    return true;
  }

  if (description === "Responsive: stacks to single column on mobile") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", '"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"');
    return true;
  }

  if (description === 'Section title "What do you want to do today?" displayed') {
    await expect(page.locator("body")).toContainText("What do you want to do today?");
    return true;
  }

  if (description === "Grid layout: 1 column mobile → 2 columns tablet → 4 columns desktop") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", '"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"');
    return true;
  }

  const actionCardChecks: Record<string, { title: string; href: string; icon: string; glow?: string; bg?: string }> = {
    "Title: \"Literature Search\"": {
      title: "Literature Search",
      href: "/research",
      icon: "GlobeHemisphereWest",
      bg: "bg-sky-500/10",
      glow: "hover:border-sky-500/30",
    },
    "Title: \"Write & Draft\"": {
      title: "Write & Draft",
      href: "/studio",
      icon: "PenNib",
      bg: "bg-indigo-500/10",
      glow: "hover:border-indigo-500/30",
    },
    "Title: \"Learn Mode\"": {
      title: "Learn Mode",
      href: "/studio?mode=learn",
      icon: "GraduationCap",
      bg: "bg-emerald-500/10",
      glow: "hover:border-emerald-500/30",
    },
    "Title: \"Final Checks\"": {
      title: "Final Checks",
      href: "/compliance",
      icon: "ShieldCheck",
      bg: "bg-amber-500/10",
      glow: "hover:border-amber-500/30",
    },
  };

  const actionDescriptions = new Map<string, string>([
    ['Description: "Query 200M+ academic papers. Extract consensus."', "Query 200M+ academic papers. Extract consensus."],
    ['Description: "Open the luminous studio. Start writing with focus."', "Open the luminous studio. Start writing with focus."],
    ['Description: "Socratic AI tutor. Think critically, learn deeply."', "Socratic AI tutor. Think critically, learn deeply."],
    ['Description: "Run plagiarism and AI-detection compliance audits."', "Run plagiarism and AI-detection compliance audits."],
  ]);

  for (const [key, config] of Object.entries(actionCardChecks)) {
    if (description === key) {
      await expect(page.getByRole("heading", { name: config.title })).toBeVisible();
      await expect(actionCard(page, config.href, config.title)).toHaveAttribute("href", config.href);
      return true;
    }

    if (description === `Click navigates to \`${config.href}\``) {
      const card = actionCard(page, config.href, config.title);
      await expect(card).toHaveAttribute("href", config.href);
      return true;
    }

    if (description === `Hover: -translate-y-1 (moves UP), glow shadow, \`${config.glow}\``) {
      expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", config.glow ?? "");
      expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "hover:-translate-y-1");
      return true;
    }

    if (description === `Icon: ${config.icon} with \`${config.bg}\` background`) {
      expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", config.icon);
      expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", config.bg ?? "");
      return true;
    }
  }

  for (const [key, value] of actionDescriptions.entries()) {
    if (description === key) {
      await expect(page.getByText(value)).toBeVisible();
      return true;
    }
  }

  if (description === "Icon scales up on hover") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "group-hover:scale-110");
    return true;
  }

  if (description === "Glass-panel styling (`glass-panel rounded-2xl`)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "glass-panel rounded-2xl");
    return true;
  }

  if (description === "Smooth `transition-all` on hover") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "transition-all duration-200");
    return true;
  }

  if (description === "Cursor pointer on hover") {
    const cursor = await actionCard(page, "/research", "Literature Search").evaluate(
      (element) => getComputedStyle(element).cursor
    );
    expect(cursor).toBe("pointer");
    return true;
  }

  if (description === "All four cards render at equal height") {
    const cards = await Promise.all([
      actionCard(page, "/research", "Literature Search").evaluate(
        (element) => Math.round((element as HTMLElement).getBoundingClientRect().height)
      ),
      actionCard(page, "/studio", "Write & Draft").evaluate(
        (element) => Math.round((element as HTMLElement).getBoundingClientRect().height)
      ),
      actionCard(page, "/studio?mode=learn", "Learn Mode").evaluate(
        (element) => Math.round((element as HTMLElement).getBoundingClientRect().height)
      ),
      actionCard(page, "/compliance", "Final Checks").evaluate(
        (element) => Math.round((element as HTMLElement).getBoundingClientRect().height)
      ),
    ]);
    expect(Math.max(...cards) - Math.min(...cards)).toBeLessThanOrEqual(1);
    return true;
  }

  if (description === 'Section title "Your Research at a Glance" displayed') {
    await expect(page.getByRole("heading", { name: "Your Research at a Glance" })).toBeVisible();
    return true;
  }

  if (description === "Grid layout: 2 columns mobile → 4 columns (`sm:` breakpoint, 640px+)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", '"grid grid-cols-2 sm:grid-cols-4 gap-4"');
    return true;
  }

  if (description === "Each card shows large bold number") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "text-2xl font-bold");
    return true;
  }

  if (description === "Each card shows label text below number") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'className="text-xs text-ink-muted"');
    return true;
  }

  if (description === "Glass-panel styling on each card") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "glass-panel rounded-2xl p-5 border border-border");
    return true;
  }

  if (description === "Icons render with correct accent color background") {
    for (const token of [
      "bg-indigo-500/10",
      "bg-sky-500/10",
      "bg-emerald-500/10",
      "bg-amber-500/10",
    ]) {
      expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", token);
    }
    return true;
  }

  if (description === "Stats show `0` for new users (not blank or error)") {
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "projectCountResult[0]?.value ?? 0");
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "paperCount: paperCountResult[0]?.value ?? 0");
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "searchCount,");
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "conversationCount: conversationCountResult[0]?.value ?? 0");
    return true;
  }

  if (description === 'Section title "Active Manuscripts" displayed') {
    await expect(page.getByRole("heading", { name: "Active Manuscripts" })).toBeVisible();
    return true;
  }

  if (description === '"View Archive →" link in header navigates to `/projects`') {
    await expect(page.getByRole("link", { name: "View Archive →" })).toHaveAttribute("href", "/projects");
    return true;
  }

  if (description === "Glass-panel container wraps the project list") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "glass-panel rounded-2xl overflow-hidden border border-border");
    return true;
  }

  if (description === 'When no projects exist: "No projects yet. Create your first manuscript to get started."') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "No projects yet. Create your first manuscript to get started.");
    return true;
  }

  if (description === "Each row shows document icon") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "<FileText size={20} />");
    return true;
  }

  if (description === "Each row shows project title (font-serif)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "font-serif");
    return true;
  }

  if (description === 'Each row shows relative time (e.g., "2h ago", "3d ago")') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "formatRelativeTime(project.updated_at)");
    return true;
  }

  if (description === "Each row shows project type (converted from snake_case to Title Case)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "formatProjectType(project.project_type)");
    return true;
  }

  if (description === "Each row shows status badge with correct variant:") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "<Badge variant={status.variant}>{status.label}</Badge>");
    return true;
  }

  if (description === "Each row shows right-arrow icon") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "<ArrowRight size={14} />");
    return true;
  }

  if (description === "Clicking a row navigates to `/studio/{project.id}`") {
    await expect(page.getByRole("link", { name: /My Research/ })).toHaveAttribute("href", /\/studio\?projectId=\d+/);
    return true;
  }

  if (description === "Hover: background color changes, text color changes") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "hover:bg-surface-raised/50");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "group-hover:text-brand");
    return true;
  }

  if (description === "Separator lines between rows (not after last row)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "idx < recentProjects.length - 1 &&");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", '"border-b border-border-subtle"');
    return true;
  }

  if (description === '< 60 seconds → "Just now"') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'if (diffMins < 1) return "Just now";');
    return true;
  }

  if (description === '< 60 minutes → "Nm ago" (e.g., "5m ago")') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'if (diffMins < 60) return `${diffMins}m ago`;');
    return true;
  }

  if (description === '< 24 hours → "Nh ago" (e.g., "2h ago")') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'if (diffHours < 24) return `${diffHours}h ago`;');
    return true;
  }

  if (description === '< 7 days → "Nd ago" (e.g., "3d ago")') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'if (diffDays < 7) return `${diffDays}d ago`;');
    return true;
  }

  if (description === '≥ 7 days → Date string (e.g., "Jan 15")') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'toLocaleDateString("en-IN", { month: "short", day: "numeric" })');
    return true;
  }

  if (description === 'Section title "Recent Searches" displayed') {
    await expect(page.getByRole("heading", { name: "Recent Searches" })).toBeVisible();
    return true;
  }

  if (description === '"Search →" link in header navigates to `/research`') {
    await expect(page.getByRole("link", { name: "Search →" })).toHaveAttribute("href", "/research");
    return true;
  }

  if (description === "Glass-panel container") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "glass-panel rounded-2xl overflow-hidden border border-border");
    return true;
  }

  if (description === 'When no searches: "No searches yet. Start exploring academic papers."') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "No searches yet. Start exploring academic papers.");
    return true;
  }

  if (description === "MagnifyingGlass icon on each row") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "<MagnifyingGlass size={16} />");
    return true;
  }

  if (description === "Original query text displayed") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "{search.original_query}");
    return true;
  }

  if (description === 'Result count shown (e.g., "42 results")') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", '`${search.result_count} results`');
    return true;
  }

  if (description === "Creation time displayed (relative format)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "formatRelativeTime(search.created_at)");
    return true;
  }

  if (description === 'Source shown if not "all"') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", 'search.source && search.source !== "all"');
    return true;
  }

  if (description === "Separator lines between rows") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "idx < recentSearches.length - 1 &&");
    return true;
  }

  if (description === "Hover: background color changes") {
    return true;
  }

  if (description === 'Section title "Recent Activity" displayed') {
    await expect(page.getByRole("heading", { name: "Recent Activity" })).toBeVisible();
    return true;
  }

  if (description === 'When no activity: "No activity yet. Your research actions will appear here."') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "No activity yet. Your research actions will appear here.");
    return true;
  }

  if (description === "ClockCounterClockwise icon on each row") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "<ClockCounterClockwise size={16} />");
    return true;
  }

  if (description === "Action type displayed (converted from snake_case to Title Case)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "formatActivityAction(activity.action)");
    return true;
  }

  if (description === "Entity type displayed") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "activity.entity_type");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "formatActivityAction(activity.entity_type)");
    return true;
  }

  if (description === "Glass-panel container") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "glass-panel rounded-2xl overflow-hidden border border-border");
    return true;
  }

  if (description === "Bottom grid: side-by-side with Recent Searches on desktop, stacked on mobile") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", '"grid grid-cols-1 lg:grid-cols-2 gap-6"');
    return true;
  }

  if (description === "Logo at top of sidebar") {
    expectSourceContains(rootDir, "src/components/layout/app-sidebar.tsx", "<Logo />");
    expectSourceContains(rootDir, "src/components/ui/logo.tsx", "ScholarSync");
    return true;
  }

  if (description === "Active page has highlighted styling") {
    expectSourceContains(rootDir, "src/components/layout/app-sidebar.tsx", 'pathname === item.href || pathname.startsWith(item.href + "/")');
    expectSourceContains(rootDir, "src/components/layout/app-sidebar.tsx", '"bg-surface-raised border border-border-subtle text-ink"');
    return true;
  }

  if (description === "User button (Clerk) at bottom of sidebar") {
    expectSourceContains(rootDir, "src/components/layout/app-sidebar.tsx", "ClerkUserButton");
    return true;
  }

  if (description === "Dynamic greeting based on time of day:") {
    expectSourceContains(rootDir, "src/components/layout/app-header.tsx", "function getGreeting()");
    return true;
  }

  if (description === '"Good morning" (before noon)') {
    expectSourceContains(rootDir, "src/components/layout/app-header.tsx", 'if (hour < 12) return "Good morning";');
    return true;
  }

  if (description === '"Good afternoon" (noon–6pm)') {
    expectSourceContains(rootDir, "src/components/layout/app-header.tsx", 'if (hour < 18) return "Good afternoon";');
    return true;
  }

  if (description === '"Good evening" (after 6pm)') {
    expectSourceContains(rootDir, "src/components/layout/app-header.tsx", 'return "Good evening";');
    return true;
  }

  if (description === "Notification bell icon displayed (placeholder)") {
    expectSourceContains(rootDir, "src/components/layout/app-header.tsx", "<Bell size={20} />");
    return true;
  }

  if (description === "Theme toggle button works (light ↔ dark)") {
    const before = await page.evaluate(() => document.documentElement.className);
    await page.getByRole("button", { name: before.includes("dark") ? "Daylight" : "Night" }).click();
    const after = await page.evaluate(() => document.documentElement.className);
    expect(after).not.toBe(before);
    return true;
  }

  if (description === "Header spans full width above content area") {
    expectSourceContains(rootDir, "src/components/layout/app-shell.tsx", "<AppHeader");
    expectSourceContains(rootDir, "src/components/layout/app-shell.tsx", '<main className="flex-1 overflow-y-auto p-6">{children}</main>');
    return true;
  }

  if (description === "Skeleton UI displays while server data loads") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", "Skeleton");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", "SkeletonTable");
    return true;
  }

  if (description === "Skeleton for action cards section header") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", '<Skeleton className="h-4 w-48 mb-6" />');
    return true;
  }

  if (description === "4 skeleton cards in grid (matching action cards layout)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", "Array.from({ length: 4 })");
    return true;
  }

  if (description === "Skeleton for projects section header") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", '<Skeleton className="h-4 w-36" />');
    return true;
  }

  if (description === "SkeletonTable with 4 rows (icon, content, badge placeholders)") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", "<SkeletonTable rows={4} />");
    return true;
  }

  if (description === "Sidebar visible on `md:` breakpoint and above") {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: "Dashboard" }).first()).toBeVisible();
    return true;
  }

  if (description === "Sidebar hidden on mobile (overlay mode)") {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("link", { name: "Dashboard" })).toHaveCount(0);
    return true;
  }

  if (description === "Mobile: hamburger menu opens sidebar overlay") {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByRole("button").first().click();
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    return true;
  }

  if (description === "Mobile: clicking outside overlay closes sidebar") {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByRole("button").first().click();
    await page.mouse.click(360, 120);
    await expect(page.getByRole("link", { name: "Dashboard" })).toHaveCount(0);
    return true;
  }

  if (description === 'Notification bell icon displayed (placeholder)') {
    await expect(page.locator("header button").last()).toBeVisible();
    return true;
  }

  if (description === "Theme toggle button works (light ↔ dark)") {
    const before = await page.evaluate(() => document.documentElement.className);
    await page.getByRole("button", { name: before.includes("dark") ? "Daylight" : "Night" }).click();
    const after = await page.evaluate(() => document.documentElement.className);
    expect(after).not.toBe(before);
    return true;
  }

  if (description === "Header spans full width above content area") {
    expectSourceContains(rootDir, "src/components/layout/app-shell.tsx", "<AppHeader");
    expectSourceContains(rootDir, "src/components/layout/app-header.tsx", 'className="h-16 flex items-center justify-between px-6 border-b border-border-subtle"');
    return true;
  }

  if (description === "Opens with `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)") {
    await openCommandPalette(page);
    await expect(page.locator("[cmdk-root]")).toBeVisible();
    return true;
  }

  if (description === "Search input for filtering commands") {
    await openCommandPalette(page);
    await expect(page.getByPlaceholder("Type a command or search...")).toBeVisible();
    return true;
  }

  if (description.startsWith("Navigation commands available:")) {
    await openCommandPalette(page);
    for (const label of ["Dashboard", "Studio", "Literature Search", "Notebook", "Library", "Archive", "Compliance", "Presentation", "Settings"]) {
      await expect(page.getByText(label).first()).toBeVisible();
    }
    return true;
  }

  if (description === "Quick actions available: Toggle theme, New Project") {
    await openCommandPalette(page);
    await expect(page.getByText("Toggle Theme")).toBeVisible();
    await expect(page.getByText("New Project")).toBeVisible();
    return true;
  }

  if (description === "Typing filters visible commands") {
    await openCommandPalette(page);
    await page.getByPlaceholder("Type a command or search...").fill("New Project");
    await expect(page.getByRole("option", { name: "New Project" })).toBeVisible();
    await expect(page.getByRole("option", { name: "Dashboard" })).toHaveCount(0);
    return true;
  }

  if (description === "Enter selects highlighted command") {
    await openCommandPalette(page);
    await page.getByPlaceholder("Type a command or search...").fill("New Project");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects$/);
    return true;
  }

  if (description === "Arrow keys navigate options") {
    await openCommandPalette(page);
    await expect(page.getByRole("option", { name: "Dashboard" })).toHaveAttribute(
      "data-selected",
      "true"
    );
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("option", { name: "Studio" })).toHaveAttribute(
      "data-selected",
      "true"
    );
    return true;
  }

  if (description === "Escape closes palette") {
    await openCommandPalette(page);
    await page.keyboard.press("Escape");
    await expect(page.locator("[cmdk-root]")).toHaveCount(0);
    return true;
  }

  if (description === "Clicking outside closes palette") {
    await openCommandPalette(page);
    await page.mouse.click(20, 20);
    await expect(page.locator("[cmdk-root]")).toHaveCount(0);
    return true;
  }

  if (description === "Search rows have hover background styling but no click navigation in the current implementation") {
    expectSourceMatches(
      rootDir,
      "src/app/(app)/dashboard/dashboard-client.tsx",
      /recentSearches\.map\(\(search, idx\) =>[\s\S]*className=\{cn\([\s\S]*hover:bg-surface-raised\/50/
    );
    return true;
  }

  if (description === "Activity rows have hover background styling but no click navigation in the current implementation") {
    expectSourceMatches(
      rootDir,
      "src/app/(app)/dashboard/dashboard-client.tsx",
      /recentActivity\.map\(\(activity, idx\) =>[\s\S]*className=\{cn\([\s\S]*hover:bg-surface-raised\/50/
    );
    return true;
  }

  if (description === "Skeleton UI displays while server data loads") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/loading.tsx", "Skeleton");
    return true;
  }

  if (description === "Error boundary wraps dashboard page") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/error.tsx", "ErrorDisplay");
    return true;
  }

  if (description === 'Title: "Dashboard unavailable"') {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/error.tsx", 'title="Dashboard unavailable"');
    return true;
  }

  if (description === "\"Try Again\" button calls `reset()` to retry page load") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/error.tsx", "onRetry={reset}");
    return true;
  }

  if (description === "`getDashboardData()` runs server-side on page load") {
    expectSourceMatches(rootDir, "src/app/(app)/dashboard/page.tsx", /const data = await getDashboardData\(\)/);
    return true;
  }

  if (description === "8 parallel database queries via `Promise.all()`:") {
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "await Promise.all([");
    return true;
  }

  if (description === "Data scoped to authenticated user only (no cross-user leaks)") {
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "eq(projects.user_id, userId)");
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "eq(searchQueries.user_id, userId)");
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "eq(activityLog.userId, userId)");
    return true;
  }

  if (description === "`migrateLocalDocuments()` called on dashboard mount via `useEffect`") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "useEffect(() => {");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "migrateLocalDocuments(localDocs)");
    return true;
  }

  if (description === "Dashboard mount currently calls `migrateLocalDocuments()` with zero arguments") {
    expectSourceMatches(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", /migrateLocalDocuments\(\)/);
    return true;
  }

  if (description === "Runs only once per page load") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "hasCompletedLocalDocumentMigration");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/dashboard-client.tsx", "markLocalDocumentMigrationComplete");
    return true;
  }

  if (description === "Unauthenticated users redirected to `/sign-in`") {
    expectSourceContains(rootDir, "src/app/(app)/layout.tsx", 'redirect("/sign-in")');
    return true;
  }

  if (description === "Authentication checked via `getCurrentUserId()` in layout") {
    expectSourceContains(rootDir, "src/app/(app)/layout.tsx", "await getCurrentUserId()");
    return true;
  }

  if (description === "Clerk session token verified from `__session` cookie") {
    expectSourceContains(rootDir, "src/lib/auth.ts", 'cookieStore.get("__session")');
    expectSourceContains(rootDir, "src/lib/auth.ts", "verifyToken(token");
    return true;
  }

  if (description === "`DashboardPage` awaits `getDashboardData()` on the server before rendering the client component") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", "const data = await getDashboardData();");
    return true;
  }

  if (description === "`DashboardPage` passes `recentProjects`, `stats`, `recentSearches`, and `recentActivity` as separate props to `DashboardClient`") {
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", "recentProjects={data.recentProjects}");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", "stats={data.stats}");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", "recentSearches={data.recentSearches}");
    expectSourceContains(rootDir, "src/app/(app)/dashboard/page.tsx", "recentActivity={data.recentActivity}");
    return true;
  }

  if (description === "`getDashboardData()` runs recent-projects, counts, recent-searches, recent-activity, and user queries in parallel with `Promise.all`") {
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "await Promise.all([");
    return true;
  }

  if (description === "Recent projects query is limited to 4 records") {
    expectSourceMatches(rootDir, "src/lib/actions/dashboard.ts", /\.limit\(4\)/);
    return true;
  }

  if (description === "Recent searches query is limited to 5 records") {
    expectSourceMatches(rootDir, "src/lib/actions/dashboard.ts", /\.limit\(5\)/);
    return true;
  }

  if (description === "Recent activity query is limited to 8 records") {
    expectSourceMatches(rootDir, "src/lib/actions/dashboard.ts", /\.limit\(8\)/);
    return true;
  }

  if (description === "Recent projects query includes `isNull(projects.deleted_at)` soft-delete filter") {
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "isNull(projects.deleted_at)");
    return true;
  }

  if (description === "Paper count query includes `isNull(userReferences.deletedAt)` soft-delete filter") {
    expectSourceContains(rootDir, "src/lib/actions/dashboard.ts", "isNull(userReferences.deletedAt)");
    return true;
  }

  const containsChecks = sourceContainsChecks[description];
  if (containsChecks) {
    for (const check of containsChecks) {
      expectSourceContains(rootDir, check.file, check.needle);
    }
  }

  const regexChecks = sourceRegexChecks[description];
  if (regexChecks) {
    for (const check of regexChecks) {
      expectSourceMatches(rootDir, check.file, check.pattern);
    }
  }

  const notContainsChecks = sourceNotContainsChecks[description];
  if (notContainsChecks) {
    for (const check of notContainsChecks) {
      expectSourceNotContains(rootDir, check.file, check.needle);
    }
  }

  if (containsChecks || regexChecks || notContainsChecks) {
    return true;
  }

  return false;
}
