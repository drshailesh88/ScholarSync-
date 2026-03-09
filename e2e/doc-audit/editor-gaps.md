# Editor — Feature Doc Gaps

**Original doc:** `EDITOR_FEATURES_TESTING.md`
**Original checkbox count:** 231
**Features found in UI:** 389
**Features found in source code:** 485
**Missing from doc:** 254
**Completeness of original doc:** 47.6%

## Missing Features

### Route-Level Loading and Error States
- [ ] `/studio` has a dedicated route-level skeleton loading screen before the workspace renders
- [ ] `/studio` has a route-level error display titled `Studio unavailable`
- [ ] `/editor/[id]` has a route-level error display titled `Editor unavailable`
- [ ] `/editor/[id]` is also wrapped in a React `EditorErrorBoundary` that shows reload and project-navigation actions after runtime crashes

### Editor Header and Save-State Details
- [ ] Editor title input uses the placeholder `Untitled Manuscript` and is disabled while loading
- [ ] Document-type dropdown renders exactly four current options and uses an overlay backdrop to dismiss
- [ ] Save-state chip has distinct `saving`, `saved`, `unsaved`, `error`, `offline`, and `local` presentations
- [ ] Pending citation notice is sourced from `sessionStorage["scholarsync_pending_citation"]`, consumes the key immediately, and auto-dismisses after 5 seconds
- [ ] Browser `beforeunload` protection is active while save status is `unsaved` or `saving`

### AcademicEditor Shell Details
- [ ] `AcademicEditor` mounts `TopBar`, `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, and `FootnoteSection` together inside the editor shell
- [ ] Heading placeholders differ by level, and paragraph placeholders read `Start writing, or type / for commands...`
- [ ] `Cmd/Ctrl+S` flushes pending debounced saves immediately
- [ ] Initial outline generation only persists when at least two headings exist
- [ ] TopBar word-count popover has a real empty state of `No section headings yet.`

### Comment and Reference Sidebars
- [ ] Comment sidebar has explicit `all`, `unresolved`, and `resolved` filters with local-storage-backed reloads after every mutation
- [ ] Pending inline comments show a quoted-text banner and disable `Add Comment` until non-whitespace content exists
- [ ] Reference sidebar splits cited and uncited references, exposes four sort orders, confirms deletions with `window.confirm`, and can auto-scroll to a reference on the `scholarsync:scroll-to-reference` event

### Version History and Export
- [ ] Version History is a right-side panel with prompt-based manual naming, confirm-based restore, and JSON preview modal behavior
- [ ] Editor export uses a modal with default `DOCX`, checked page-number and double-space options, and `window.print()` for PDF
- [ ] Studio export is a two-option dropdown backed by `/api/export/pdf` and `/api/export/docx`, not the same modal export component

### Studio Workspace and AI Panel
- [ ] Studio reads `projectId` and `mode=learn` from the query string on first render
- [ ] Studio left rail contains title editing, Write/Learn mode toggle, optional project selector, reference summary, and AI Credits progress
- [ ] Write mode exposes three intensity presets with distinct colors and descriptions
- [ ] Learn mode hides the stage tracker until a guide document type is selected
- [ ] Chat panel request bodies differ between draft and learn mode and show specific error strings for failed responses, missing streams, and generic request failures

### Detailed QA Coverage
- [ ] Editor header overflow button is visible but unwired in the current implementation
- [ ] Link popover uses `window.open` for outbound navigation and keeps edit mode inline inside the popover
- [ ] Citation insertion auto-appends a bibliography node when one does not already exist
- [ ] Studio `onDirty` writes fallback draft JSON to `localStorage["scholarsync_studio_draft"]`
- [ ] Studio reference summary shows only the first five cited sources before exposing `View all N references`
- [ ] Studio AI panel is replaced entirely by the reference sidebar or comment sidebar when either is open
- [ ] Studio research quick-search ignores blank queries
- [ ] `KeyboardShortcutsDialog` documents `Cmd + /` for comments, while the editor route actually toggles comments through custom event wiring

## Features in doc that DON'T EXIST in the app
- The current app tree does not have a dedicated `/editor/new` route file; the live editor routes are `/editor/[id]` and `/studio`.
- The editor header `DotsThree` overflow button is present visually but does not open a menu or trigger any action.
- Studio export does not use the editor-page `ExportDialog`; it is a simple dropdown with PDF and Word actions.
- Version-history preview does not render historical rich text; it shows raw JSON in a `<pre>` block.
- Studio export does not currently close on outside click because no backdrop or document-level close handler is wired in the page component.
