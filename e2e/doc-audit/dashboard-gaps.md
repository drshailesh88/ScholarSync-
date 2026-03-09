# Dashboard — Feature Doc Gaps

**Original doc:** `DASHBOARD_FEATURES_TESTING.md`
**Original checkbox count:** 131
**Features found in UI:** 171
**Features found in source code:** 214
**Missing from doc:** 67
**Completeness of original doc:** 61.2%

## Missing Features

### Detailed QA Coverage
- [ ] `DashboardPage` is server-rendered and passes four data props into `DashboardClient`
- [ ] `getDashboardData()` ensures the user exists, then runs all dashboard queries in parallel
- [ ] Recent-projects, recent-searches, and recent-activity queries are capped at 4, 5, and 8 rows respectively
- [ ] Dashboard stats include extra usage fields that are not yet rendered by this page
- [ ] `DashboardClient` runs `migrateLocalDocuments()` on mount and logs migration failures to the console
- [ ] Action cards are driven by a config array and are rendered as `Link` elements, not imperative buttons
- [ ] Action card icon containers are 48px rounded squares with `size={24}` icons
- [ ] Stats cards are hard-coded panels using `glass-panel rounded-2xl p-5 border border-border`
- [ ] Active Manuscripts rows navigate with `router.push(`/studio/${project.id}`)`
- [ ] `formatProjectType(null)` falls back to `Project`
- [ ] `formatRelativeTime(null)` falls back to `Never`
- [ ] Reviewing status currently uses the `active` badge variant
- [ ] Recent Searches rows show `No results` when `result_count` is null
- [ ] Search/activity rows have hover styling but no click navigation in the current implementation
- [ ] Activity metadata omits the separator when `entity_type` is missing
- [ ] Header greeting comes from `getGreeting()` and changes by time of day
- [ ] Notification bell is presentational only in the current implementation
- [ ] Sidebar active matching supports nested routes through `pathname.startsWith(...)`
- [ ] Sidebar footer conditionally renders `ClerkUserButton` or a fallback placeholder
- [ ] Command palette is closed by default and toggled by both `Cmd+K` and `Ctrl+K`
- [ ] Palette `New Project` action routes to `/projects`
- [ ] Palette commands close the palette before executing their action

## Features in doc that DON'T EXIST in the app
- Recent Searches rows are not clickable in the current implementation.
- Recent Activity rows are not clickable in the current implementation.
- The notification bell in the header does not currently open a notifications panel.
- The command-palette `New Project` action does not open a project-creation dialog; it routes to `/projects`.
