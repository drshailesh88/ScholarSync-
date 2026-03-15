# settings — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Loading & Error States
#### Error State (`error.tsx`)
- [ ] **Message** — "We couldn't load your settings. Please try again."
- [ ] **Warning icon** — `WarningCircle` (32px) in red
- [ ] **Retry button** — label text `Try Again` with `ArrowCounterClockwise` icon (16px)
- [ ] **Sentry capture** — error is captured to Sentry if error prop provided
#### Page Loading State
- [ ] **Loading flag** — `loading` state is `true` during initial data fetch
- [ ] Fetches both `getUser()` and `getUserUsageStats()` on mount
- [ ] Populates all form fields from fetched user data once loaded

### Quick Test Workflow
#### Page State and Navigation
- [ ] Initial client-side data load shows a centered "Loading settings..." message before tab content renders
- [ ] Only one tab panel is rendered at a time based on `activeTab`; switching sidebar tabs swaps the main content area in place
- [ ] Account header falls back to the display name `User` and a blank email when user data is missing
#### Account Tab
- [ ] Research interest chips reject duplicate values in addition to blank values
- [ ] Successfully adding a research interest chip clears the chip input
- [ ] Successful profile saves update the visible account header values from the returned server response
#### Billing Tab
- [ ] Current plan heading is derived from the user plan and rendered as `{Plan} Plan` (for example, `Free Plan`)
- [ ] Invoice history uses a blank actions-column header and renders a text `Download` button in every invoice row
#### Usage Tab
- [ ] Usage summary section includes the heading "This Month at a Glance"
- [ ] Usage widgets fall back to `0` usage and a `10,000` token limit when usage stats are unavailable
#### Preferences Tab
- [ ] Preferences save only persists `preferred_language` and `default_citation_style`
- [ ] Editor font size is a local page-state control defaulting to `16`, separate from the saved preference payload
- [ ] Preferences includes a second `ThemeToggle` inside the tab in addition to the app-shell theme toggle
#### Detailed QA Coverage
- [ ] `activeTab` defaults to `account` on first client render
- [ ] `fontSize` defaults to `"16"` on first client render
- [ ] Initial page state keeps `loading` true until both `getUser()` and `getUserUsageStats()` finish
- [ ] While `loading` is true, the page shows the centered text `Loading settings...`
- [ ] Initial data load calls `getUser()` and `getUserUsageStats()` in parallel with `Promise.all`
- [ ] If the initial fetch throws, the page logs `Failed to fetch user data:` to the console
- [ ] If the initial fetch throws, the page still exits loading state and renders the settings UI with fallback values
- [ ] Fetched `full_name` hydrates both the account summary heading and the Full Name input
- [ ] Fetched `preferred_language` hydrates the Preferred Language select
- [ ] Fetched `default_citation_style` hydrates the Default Citation Format select
- [ ] Fetched `research_interests` only hydrate into chips when the value is an array of strings
- [ ] Missing usage data falls back to `0` usage counts and a `10,000` token limit
- [ ] Sidebar title `Settings` is rendered above the tab buttons
- [ ] `My Account` is the active sidebar button on first render
- [ ] Clicking `My Account` shows the `My Account` content pane without changing the route
