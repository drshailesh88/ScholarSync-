# Studio — Feature Doc Gaps

**Original doc:** `STUDIO_FEATURES_TESTING.md`
**Original checkbox count:** 214
**Features found in UI:** 286
**Features found in source code:** 350
**Missing from doc:** 136
**Completeness of original doc:** 61.1%

## Missing Features

### Detailed QA Coverage
- [ ] Actual document-hook behavior for project loading, initial section selection, title debouncing, content auto-save, and localStorage draft fallback
- [ ] Save-indicator state details including icon differences between `saved`, `idle with lastSavedAt`, `unsaved`, and `error`
- [ ] Real sidebar replacement priority between Reference Sidebar, Comment Sidebar, and the standard right-panel tabs
- [ ] Citation insertion flow details: selection capture, bibliography auto-insertion, temporary success notice, and research-origin citation events
- [ ] Chat lifecycle details for conversation creation, streaming assistant messages, message persistence calls, auto-scroll, and current non-persistence on refresh
- [ ] Actual Research tab behavior as a launcher into the external Research Sidebar rather than an embedded search experience
- [ ] Embedded IntegrityPanel behavior in the Checks tab, including its shorter-form UI and paid-feature locks
- [ ] Export implementation details showing PDF opens a new window and Word currently downloads a `.doc` file with a sanitized title
- [ ] Learn-mode gating for the stage tracker and the fact that stage/document-type state is local UI state only
- [ ] Route-level loading and error boundary copy

## Features in doc that DON'T EXIST in the app
- The title input does not show a placeholder when empty in the current implementation.
- Write/Learn mode does not persist across refreshes unless the URL explicitly includes `?mode=learn`.
- The Export dropdown does not currently dismiss on outside click.
- The right-panel `Research` tab does not render inline search results; it launches the external Research Sidebar.
- The right-panel `Checks` tab does not render the full `/compliance` page UI; it renders the compact `IntegrityPanel`.
- PDF export does not directly download a PDF from Studio; it opens returned HTML in a new window.
- Word export currently downloads a `.doc` file, not `.docx`.
- Chat history is not restored after page refresh in the current Studio route.
