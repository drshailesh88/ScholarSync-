# Settings — Feature Doc Gaps

**Original doc:** `SETTINGS_FEATURES_TESTING.md`
**Original checkbox count:** 87
**Features found in UI:** 154
**Features found in source code:** 176
**Missing from doc:** 89
**Completeness of original doc:** 49.4%

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

### Detailed QA Coverage
- [ ] `activeTab` defaults to `account` on first client render
- [ ] `fontSize` defaults to `"16"` on first client render
- [ ] Initial page state keeps `loading` true until both `getUser()` and `getUserUsageStats()` finish
- [ ] While `loading` is true, the page shows the centered text `Loading settings...`
- [ ] Initial data load calls `getUser()` and `getUserUsageStats()` in parallel with `Promise.all`
- [ ] If the initial fetch throws, the page logs `Failed to fetch user data:` to the console and still exits loading state
- [ ] Fetched `full_name` hydrates both the account summary heading and the Full Name input
- [ ] Fetched `research_interests` hydrate into chips only when the value is an array of strings
- [ ] Sidebar `My Account` tab is active by default and tab clicks swap panes without route navigation
- [ ] Account summary heading falls back to `User` when `full_name` is null
- [ ] Account summary email falls back to an empty string when no email is available
- [ ] `Verified Student` badge is always rendered on the account tab in the current implementation
- [ ] Full Name, Specialty / Institution, Country, Bio, and ORCID inputs are controlled fields with no `required` or `maxLength` attributes
- [ ] Bio textarea uses `rows={3}` and `resize-none`
- [ ] Research interests are added with Enter or the `Plus` button, trim whitespace, reject duplicates, and clear the input on success
- [ ] Research-interest chip edits are local until `Save Changes` is clicked
- [ ] `Save Changes` is enabled even when nothing is dirty and is disabled only while `saving`
- [ ] Account save uses a text-only `Saving...` label, not a spinner
- [ ] Account save feedback is inline text next to the button, not a toast
- [ ] Account save messages auto-clear after 3 seconds
- [ ] Account save payload includes `full_name`, `specialty`, `country`, `bio`, `research_interests`, and `orcid_id`
- [ ] Successful account saves update the local `user` summary state
- [ ] Billing heading is `Plans & Billing` and current plan title is rendered as `{Plan} Plan`
- [ ] Free plan renders plain `Free`; basic/pro render price plus muted `/month`
- [ ] Billing token quota uses `toLocaleString("en-IN")`
- [ ] `ACTIVE` badge is fixed in the current plan card
- [ ] `Manage Plan`, `Update`, and invoice `Download` buttons have no loading or disabled states in the page component
- [ ] Invoice actions-column header is blank
- [ ] Usage tab renders `This Month at a Glance` above the 2x2 summary grid
- [ ] AI Tokens uses `var(--brand)` while Plagiarism Checks uses `#f59e0b`
- [ ] Deep Searches shows `{value} (Unlimited)` and a fixed 30% progress fill
- [ ] Summary cards render a label, bold value, and helper line as separate rows
- [ ] Preferences tab renders a local `Theme` section with a `ThemeToggle`
- [ ] `ThemeToggle` shows a placeholder pill before mount
- [ ] Clicking `Daylight` stores `theme=light` and removes the `dark` class from `<html>`
- [ ] Clicking `Night` stores `theme=dark` and restores the `dark` class on `<html>`
- [ ] Theme changes apply immediately and persist after refresh
- [ ] Active theme buttons use filled icons plus `bg-surface text-ink shadow-sm`
- [ ] Editor Font Size options are `14`, `16`, `18`, and `20`, but the value is only local page state
- [ ] Editor Font Size is not persisted by `Save Preferences`
- [ ] Citation Format initializes from `user.default_citation_style` or `apa7`
- [ ] Preferred Language initializes from `user.preferred_language` or `en`
- [ ] `Save Preferences` is enabled even when nothing is dirty and is disabled only while `savingPrefs`
- [ ] Preferences save uses a text-only `Saving...` label, not a spinner
- [ ] Preferences feedback is inline text next to the button and auto-clears after 3 seconds
- [ ] Preferences save payload includes only `preferred_language` and `default_citation_style`
- [ ] Saved citation-format and language values persist after a page refresh

## Features in doc that DON'T EXIST in the app
- The `Log Out` button is currently rendered without a click handler, so the live page does not perform sign-out from this button alone.
- `Manage Plan`, `Update`, and invoice `Download` buttons are present in the UI but are not wired to billing flows on this page component.
- Invoice dates render in the live table as `1 Feb 2026` / `1 Jan 2026` / `1 Dec 2025`, not in a zero-padded `MMM DD, YYYY` format.
- Saving preferences does not persist editor font size, and the current page does not reload saved font-size state on refresh.
