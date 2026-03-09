# Settings — Feature Doc Gaps

**Original doc:** `SETTINGS_FEATURES_TESTING.md`
**Original checkbox count:** 87
**Features found in UI:** 96
**Features found in source code:** 100
**Missing from doc:** 13
**Completeness of original doc:** 87.0%

## Missing Features

### Page State and Navigation
- [ ] Initial client-side data load shows a centered "Loading settings..." message before tab content renders
- [ ] Only one tab panel is rendered at a time based on `activeTab`; switching sidebar tabs swaps the main content area in place
- [ ] Account header falls back to the display name `User` and a blank email when user data is missing

### Account Tab
- [ ] Research interest chips reject duplicate values in addition to blank values
- [ ] Successfully adding a research interest chip clears the chip input
- [ ] Successful profile saves update the visible account header values from the returned server response

### Billing Tab
- [ ] Current plan heading is derived from the user plan and rendered as `{Plan} Plan` (for example, `Free Plan`)
- [ ] Invoice history uses a blank actions-column header and renders a text `Download` button in every invoice row

### Usage Tab
- [ ] Usage summary section includes the heading "This Month at a Glance"
- [ ] Usage widgets fall back to `0` usage and a `10,000` token limit when usage stats are unavailable

### Preferences Tab
- [ ] Preferences save only persists `preferred_language` and `default_citation_style`
- [ ] Editor font size is a local page-state control defaulting to `16`, separate from the saved preference payload
- [ ] Preferences includes a second `ThemeToggle` inside the tab in addition to the app-shell theme toggle

## Features in doc that DON'T EXIST in the app
- The `Log Out` button is currently rendered without a click handler, so the live page does not perform sign-out from this button alone.
- `Manage Plan`, `Update`, and invoice `Download` buttons are present in the UI but are not wired to billing flows on this page component.
- Invoice dates render in the live table as `1 Feb 2026` / `1 Jan 2026` / `1 Dec 2025`, not in a zero-padded `MMM DD, YYYY` format.
- Saving preferences does not persist editor font size, and the current page does not reload saved font-size state on refresh.
