# Feeds — Feature Doc Gaps

**Original doc:** `FEEDS_FEATURES_TESTING.md`
**Original checkbox count:** 185
**Features found in UI:** 248
**Features found in source code:** 309
**Missing from doc:** 124
**Completeness of original doc:** 59.9%

## Missing Features

### Detailed QA Coverage
- [ ] Real store defaults for unread-first filtering, newest sorting, card layout, and non-persisted session behavior
- [ ] Exact import/export mechanics, including hidden file input behavior, `alert(...)` feedback, and silent export failures
- [ ] Feed-selection and folder-selection reset rules, plus the distinction between optimistic article actions and non-optimistic mute toggling
- [ ] Immediate search/filter reload behavior, pagination reset behavior, and the mismatch between advanced-sort labels and normalized legacy store sort values
- [ ] Article-selection side effects for optimistic mark-read, note loading, and copilot-state clearing
- [ ] Reader details such as hidden sections, no in-flight save button disable, and note autosave/blur-save timing
- [ ] Add Feed modal button-enable rules, Enter-key handling, and inline modal error rendering
- [ ] Copilot summary caching, related-paper intent interception, source-tier badge gating, and current failure handling
- [ ] Route-level loading and error boundary copy

## Features in doc that DON'T EXIST in the app
- Default view is not `All Articles`; the live store defaults to `Unread`.
- Search is not debounced in the current implementation; every change triggers `loadArticles()`.
- `Clear all filters` does not clear the search query.
- Advanced sort choices do not preserve separate `Added` and `Title` states in the store; they normalize back into the legacy sort modes.
- Import/export feedback uses `alert(...)` or silent failure rather than toast notifications.
- Feed mute/unmute is not optimistic in the current implementation; the sidebar waits for the PATCH and then reloads subscriptions.
- Copilot/related-paper fetch failures generally do not render a dedicated inline error panel in the copilot column.
