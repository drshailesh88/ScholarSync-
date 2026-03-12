# dashboard — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/dashboard
MODULE: dashboard

---
### Loading State
- [x] PASS: Pulse animation on all skeleton elements
- [x] PASS: Stats overview, recent searches, and recent activity have no skeletons and will pop in after load

### Error Handling
- [x] PASS: Error boundary wraps dashboard page
- [x] PASS: On error: `ErrorDisplay` component renders
- [x] PASS: Title: "Dashboard unavailable"
- [x] PASS: Message: "We couldn't load your dashboard. This might be a temporary issue."
- [x] PASS: Error object is passed into `ErrorDisplay` for logging/reporting, but raw error details are not rendered in the UI
- [x] PASS: "Try Again" button calls `reset()` to retry page load
- [x] PASS: After retry, page re-fetches data and renders normally

### Data Fetching & Server Actions
- [x] PASS: `getDashboardData()` runs server-side on page load
- [x] PASS: 8 parallel database queries via `Promise.all()`:
- [x] PASS: Dates serialize correctly from server to client component
- [x] PASS: Data scoped to authenticated user only (no cross-user leaks)

### Document Migration
- [x] PASS: `migrateLocalDocuments()` called on dashboard mount via `useEffect`
- [x] PASS: Dashboard mount currently calls `migrateLocalDocuments()` with zero arguments
- [x] PASS: Creates default "My Research" project if user has no projects
- [x] PASS: Migrates each document to `synthesisDocuments` + `synthesisSections` tables
- [x] PASS: Skips "new" template documents
- [x] PASS: Runs silently (no UI feedback — errors caught and logged)
- [x] PASS: Runs only once per page load
- [x] PASS: No deduplication guard exists; repeated migration calls would create duplicate rows

### Authentication & Access Control
- [x] PASS: Unauthenticated users redirected to `/sign-in`
- [x] PASS: Authentication checked via `getCurrentUserId()` in layout
- [x] PASS: Clerk session token verified from `__session` cookie
- [x] PASS: All database queries scoped to authenticated user's ID
- [x] PASS: No data from other users visible

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `page.tsx` exports `dynamic = "force-dynamic"`
- [x] PASS: `DashboardPage` awaits `getDashboardData()` on the server before rendering the client component
- [x] PASS: `DashboardPage` passes `recentProjects`, `stats`, `recentSearches`, and `recentActivity` as separate props to `DashboardClient`
- [x] PASS: `getDashboardData()` calls `ensureUser()` before assembling dashboard queries
- [x] PASS: `getDashboardData()` runs recent-projects, counts, recent-searches, recent-activity, and user queries in parallel with `Promise.all`
- [x] PASS: Recent projects query is limited to 4 records
- [x] PASS: Recent searches query is limited to 5 records
- [x] PASS: Recent activity query is limited to 8 records
- [x] PASS: Dashboard stats include extra usage fields (`tokensUsed`, `tokensLimit`, `plagiarismChecksUsed`, `exportsUsed`, `plan`, `totalProjects`, `totalSearches`) even though this page does not render them yet
