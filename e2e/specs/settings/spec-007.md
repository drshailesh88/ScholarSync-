# settings — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/settings
MODULE: settings

---
### Quick Test Workflow
#### Detailed QA Coverage
- [ ] Plagiarism limit is derived from `plan` as `3` for free, `10` for basic, and `50` for pro
- [ ] Preferences tab renders a local `Theme` section label above the page-level `ThemeToggle`
- [ ] Before client mount, `ThemeToggle` renders a placeholder pill instead of real buttons
- [ ] Theme toggle contains exactly two buttons: `Daylight` and `Night`
- [ ] Clicking `Daylight` calls `setTheme("light")`
- [ ] Clicking `Night` calls `setTheme("dark")`
- [ ] When `Daylight` is active, the Daylight button uses `bg-surface text-ink shadow-sm`
- [ ] When `Night` is active, the Night button uses `bg-surface text-ink shadow-sm`
- [ ] Inactive theme buttons use `text-ink-muted` styling
- [ ] Active theme icons switch to `weight="fill"` and inactive icons use `weight="regular"`
- [ ] Clicking `Daylight` sets the `<html>` class list to the light theme state and stores `theme=light` in localStorage
- [ ] Clicking `Night` sets the `<html>` class list to the dark theme state and stores `theme=dark` in localStorage
- [ ] Theme changes apply immediately and do not require clicking `Save Preferences`
- [ ] Theme choice persists after a page refresh through `next-themes` storage
- [ ] `Editor Font Size` label is rendered above the first preferences select
- [ ] Editor Font Size select options are exactly `14px`, `16px (Default)`, `18px`, and `20px`
- [ ] Editor Font Size select defaults to `16`
- [ ] Changing Editor Font Size updates only the local `fontSize` state in this page component
- [ ] Editor Font Size is not included in the `handleSavePreferences` payload
- [ ] `Default Citation Format` select initializes from `user.default_citation_style` or falls back to `apa7`
- [ ] Citation Format options are `APA 7th Edition`, `MLA 9th Edition`, `Chicago 17th`, and `Vancouver`
- [ ] `Preferred Language` select initializes from `user.preferred_language` or falls back to `en`
- [ ] Preferred Language options are `English`, `Hindi`, `Spanish`, `French`, `German`, `Portuguese`, `Chinese`, `Japanese`, and `Korean`
- [ ] `Save Preferences` is enabled on initial render even when no select value has changed
- [ ] `Save Preferences` is disabled only while `savingPrefs` is true
- [ ] While saving preferences, the button label changes from `Save Preferences` to `Saving...`
- [ ] Preferences save uses text-only loading feedback with no spinner icon
- [ ] Successful preferences saves render the inline message `Preferences saved successfully.` next to the button
- [ ] Failed preferences saves render the inline message `Failed to save preferences. Please try again.` next to the button
- [ ] Preferences success/error feedback auto-clears after 3 seconds through `showSaveMessage`
- [ ] Preferences save payload includes only `preferred_language` and `default_citation_style`
- [ ] Successful preferences saves update the local `user` state for `preferred_language` and `default_citation_style`
- [ ] Saved citation-format and language values persist after a page refresh
#### Log Out Button (page.tsx:270–273)
- [ ] Log Out button has NO `onClick` handler — clicking it performs no action in the current implementation
- [ ] Log Out button hover state shows `bg-red-500/10` translucent red background
