# settings — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Loading & Error States
#### Error State (`error.tsx`)
- [x] PASS: **Message** — "We couldn't load your settings. Please try again."
- [x] PASS: **Warning icon** — `WarningCircle` (32px) in red
- [x] PASS: **Retry button** — label text `Try Again` with `ArrowCounterClockwise` icon (16px)
- [x] PASS: **Sentry capture** — error is captured to Sentry if error prop provided
#### Page Loading State
- [x] PASS: **Loading flag** — `loading` state is `true` during initial data fetch
- [x] PASS: Fetches both `getUser()` and `getUserUsageStats()` on mount
- [x] PASS: Populates all form fields from fetched user data once loaded

### Quick Test Workflow
#### Page State and Navigation
- [x] PASS: Initial client-side data load shows a centered "Loading settings..." message before tab content renders
- [x] PASS: Only one tab panel is rendered at a time based on `activeTab`; switching sidebar tabs swaps the main content area in place
- [x] PASS: Account header falls back to the display name `User` and a blank email when user data is missing
#### Account Tab
- [x] PASS: Research interest chips reject duplicate values in addition to blank values
- [x] PASS: Successfully adding a research interest chip clears the chip input
- [x] PASS: Successful profile saves update the visible account header values from the returned server response
#### Billing Tab
- [x] PASS: Current plan heading is derived from the user plan and rendered as `{Plan} Plan` (for example, `Free Plan`)
- [x] PASS: Invoice history uses a blank actions-column header and renders a text `Download` button in every invoice row
#### Usage Tab
- [x] PASS: Usage summary section includes the heading "This Month at a Glance"
- [x] PASS: Usage widgets fall back to `0` usage and a `10,000` token limit when usage stats are unavailable
#### Preferences Tab
- [x] PASS: Preferences save only persists `preferred_language` and `default_citation_style`
- [x] PASS: Editor font size is a local page-state control defaulting to `16`, separate from the saved preference payload
- [x] PASS: Preferences includes a second `ThemeToggle` inside the tab in addition to the app-shell theme toggle
#### Detailed QA Coverage
- [x] PASS: `activeTab` defaults to `account` on first client render
- [x] PASS: `fontSize` defaults to `"16"` on first client render
- [x] PASS: Initial page state keeps `loading` true until both `getUser()` and `getUserUsageStats()` finish
- [x] PASS: While `loading` is true, the page shows the centered text `Loading settings...`
- [x] PASS: Initial data load calls `getUser()` and `getUserUsageStats()` in parallel with `Promise.all`
- [x] PASS: If the initial fetch throws, the page logs `Failed to fetch user data:` to the console
- [x] PASS: If the initial fetch throws, the page still exits loading state and renders the settings UI with fallback values
- [x] PASS: Fetched `full_name` hydrates both the account summary heading and the Full Name input
- [x] PASS: Fetched `preferred_language` hydrates the Preferred Language select
- [x] PASS: Fetched `default_citation_style` hydrates the Default Citation Format select
- [x] PASS: Fetched `research_interests` only hydrate into chips when the value is an array of strings
- [x] PASS: Missing usage data falls back to `0` usage counts and a `10,000` token limit
- [x] PASS: Sidebar title `Settings` is rendered above the tab buttons
- [x] PASS: `My Account` is the active sidebar button on first render
- [x] PASS: Clicking `My Account` shows the `My Account` content pane without changing the route
