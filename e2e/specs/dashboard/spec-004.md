# dashboard — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Loading State
- [ ] Pulse animation on all skeleton elements
- [ ] Stats overview, recent searches, and recent activity have no skeletons and will pop in after load

### Error Handling
- [ ] Error boundary wraps dashboard page
- [ ] On error: `ErrorDisplay` component renders
- [ ] Title: "Dashboard unavailable"
- [ ] Message: "We couldn't load your dashboard. This might be a temporary issue."
- [ ] Error object is passed into `ErrorDisplay` for logging/reporting, but raw error details are not rendered in the UI
- [ ] "Try Again" button calls `reset()` to retry page load
- [ ] After retry, page re-fetches data and renders normally

### Data Fetching & Server Actions
- [ ] `getDashboardData()` runs server-side on page load
- [ ] 8 parallel database queries via `Promise.all()`:
- [ ] Dates serialize correctly from server to client component
- [ ] Data scoped to authenticated user only (no cross-user leaks)

### Document Migration
- [ ] `migrateLocalDocuments()` called on dashboard mount via `useEffect`
- [ ] Dashboard mount currently calls `migrateLocalDocuments()` with zero arguments
- [ ] Creates default "My Research" project if user has no projects
- [ ] Migrates each document to `synthesisDocuments` + `synthesisSections` tables
- [ ] Skips "new" template documents
- [ ] Runs silently (no UI feedback — errors caught and logged)
- [ ] Runs only once per page load
- [ ] No deduplication guard exists; repeated migration calls would create duplicate rows

### Authentication & Access Control
- [ ] Unauthenticated users redirected to `/sign-in`
- [ ] Authentication checked via `getCurrentUserId()` in layout
- [ ] Clerk session token verified from `__session` cookie
- [ ] All database queries scoped to authenticated user's ID
- [ ] No data from other users visible

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `page.tsx` exports `dynamic = "force-dynamic"`
- [ ] `DashboardPage` awaits `getDashboardData()` on the server before rendering the client component
- [ ] `DashboardPage` passes `recentProjects`, `stats`, `recentSearches`, and `recentActivity` as separate props to `DashboardClient`
- [ ] `getDashboardData()` calls `ensureUser()` before assembling dashboard queries
- [ ] `getDashboardData()` runs recent-projects, counts, recent-searches, recent-activity, and user queries in parallel with `Promise.all`
- [ ] Recent projects query is limited to 4 records
- [ ] Recent searches query is limited to 5 records
- [ ] Recent activity query is limited to 8 records
- [ ] Dashboard stats include extra usage fields (`tokensUsed`, `tokensLimit`, `plagiarismChecksUsed`, `exportsUsed`, `plan`, `totalProjects`, `totalSearches`) even though this page does not render them yet
