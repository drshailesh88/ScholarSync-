# settings — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Detailed QA Coverage
- [x] PASS: Plagiarism limit is derived from `plan` as `3` for free, `10` for basic, and `50` for pro
- [x] PASS: Preferences tab renders a local `Theme` section label above the page-level `ThemeToggle`
- [x] PASS: Before client mount, `ThemeToggle` renders a placeholder pill instead of real buttons
- [x] PASS: Theme toggle contains exactly two buttons: `Daylight` and `Night`
- [x] PASS: Clicking `Daylight` calls `setTheme("light")`
- [x] PASS: Clicking `Night` calls `setTheme("dark")`
- [x] PASS: When `Daylight` is active, the Daylight button uses `bg-surface text-ink shadow-sm`
- [x] PASS: When `Night` is active, the Night button uses `bg-surface text-ink shadow-sm`
- [x] PASS: Inactive theme buttons use `text-ink-muted` styling
- [x] PASS: Active theme icons switch to `weight="fill"` and inactive icons use `weight="regular"`
- [x] PASS: Clicking `Daylight` sets the `<html>` class list to the light theme state and stores `theme=light` in localStorage
- [x] PASS: Clicking `Night` sets the `<html>` class list to the dark theme state and stores `theme=dark` in localStorage
- [x] PASS: Theme changes apply immediately and do not require clicking `Save Preferences`
- [x] PASS: Theme choice persists after a page refresh through `next-themes` storage
- [x] PASS: `Editor Font Size` label is rendered above the first preferences select
- [x] PASS: Editor Font Size select options are exactly `14px`, `16px (Default)`, `18px`, and `20px`
- [x] PASS: Editor Font Size select defaults to `16`
- [x] PASS: Changing Editor Font Size updates only the local `fontSize` state in this page component
- [x] PASS: Editor Font Size is not included in the `handleSavePreferences` payload
- [x] PASS: `Default Citation Format` select initializes from `user.default_citation_style` or falls back to `apa7`
- [x] PASS: Citation Format options are `APA 7th Edition`, `MLA 9th Edition`, `Chicago 17th`, and `Vancouver`
- [x] PASS: `Preferred Language` select initializes from `user.preferred_language` or falls back to `en`
- [x] PASS: Preferred Language options are `English`, `Hindi`, `Spanish`, `French`, `German`, `Portuguese`, `Chinese`, `Japanese`, and `Korean`
- [x] PASS: `Save Preferences` is enabled on initial render even when no select value has changed
- [x] PASS: `Save Preferences` is disabled only while `savingPrefs` is true
- [x] PASS: While saving preferences, the button label changes from `Save Preferences` to `Saving...`
- [x] PASS: Preferences save uses text-only loading feedback with no spinner icon
- [x] PASS: Successful preferences saves render the inline message `Preferences saved successfully.` next to the button
- [x] PASS: Failed preferences saves render the inline message `Failed to save preferences. Please try again.` next to the button
- [x] PASS: Preferences success/error feedback auto-clears after 3 seconds through `showSaveMessage`
- [x] PASS: Preferences save payload includes only `preferred_language` and `default_citation_style`
- [x] PASS: Successful preferences saves update the local `user` state for `preferred_language` and `default_citation_style`
- [x] PASS: Saved citation-format and language values persist after a page refresh
#### Log Out Button (page.tsx:270–273)
- [x] PASS: Log Out button has NO `onClick` handler — clicking it performs no action in the current implementation
- [x] PASS: Log Out button hover state shows `bg-red-500/10` translucent red background
