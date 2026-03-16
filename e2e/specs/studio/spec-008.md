# studio — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Without `?mode=learn`, the page defaults to Write mode
- [x] PASS: Left sidebar title input initializes from `docTitle` returned by `useStudioDocument(...)`
- [x] PASS: Title input has no placeholder in the current implementation
- [x] PASS: Typing in the title immediately updates local input state and sets save status to `unsaved`
- [x] PASS: Title saves are debounced by 1 second in `useStudioDocument`
- [x] PASS: Successful title saves set save status to `saved` and refresh `lastSavedAt`
- [x] PASS: Failed title saves set save status to `error` without showing an inline toast
- [x] PASS: Project selector is hidden entirely when the user has 0 or 1 projects
- [x] PASS: Project selector button falls back to `Select project` when no selected project matches
- [x] PASS: Project selector closes when clicking outside because it listens on `mousedown`
- [x] PASS: Selecting the already-active project is a no-op in `selectProject(...)`
- [x] PASS: Selecting a different project clears `initialContent`, clears `document`, resets save status to `idle`, and loads the new project document
- [x] PASS: Initial document load calls `loadStudioDocument(initialProjectId)` once on mount
- [x] PASS: If `loadStudioDocument(...)` returns no document, the editor area shows `Failed to load or create document.`
- [x] PASS: Successful document load sets `docTitle`, `selectedProjectId`, and `initialContent` from the first section with `editor_content`, or falls back to the first section
- [x] PASS: Document loading state shows a spinner plus `Loading document...`
- [x] PASS: Document error state shows a warning icon plus the error string from the hook
- [x] PASS: Save indicator `saving` state uses a spinning `CircleNotch` icon plus `Saving...`
- [x] PASS: Save indicator `saved` state uses `CloudCheck` when status is explicitly `saved`
- [x] PASS: Save indicator `idle` state with `lastSavedAt` uses a `Check` icon and the same `Saved HH:MM` text
- [x] PASS: Save indicator `unsaved` state uses a non-spinning `CircleNotch` icon plus `Unsaved changes`
- [x] PASS: Save indicator `error` state uses a `Warning` icon plus `Save failed`
- [x] PASS: Save indicator shows an empty span when status is idle and there is no `lastSavedAt`
- [x] PASS: Typing inside the editor triggers `handleDirty()` before the debounced DB save fires
- [x] PASS: `handleDirty()` writes a fallback draft into `localStorage` under `scholarsync_studio_draft`
- [x] PASS: Local draft payload includes `content`, `plainText`, `wordCount`, `timestamp`, and `title`
- [x] PASS: Local draft write failures are swallowed silently
- [x] PASS: Debounced content saves send `documentId`, `title`, `editor_content`, `plain_text_content`, `word_count`, and optional `sectionId`
- [x] PASS: Successful content saves can set `activeSectionId` if one was not known yet
- [x] PASS: Content-save failures log `Auto-save failed:` to the console and set save status to `error`
- [x] PASS: Left sidebar always shows `Current Draft` as the active nav item and it is not clickable
- [x] PASS: `My Library` nav link points to `/library`
- [x] PASS: `Literature Search` nav link points to `/research`
- [x] PASS: References header count is the full `references.size` from the reference store
- [x] PASS: Plus button in the References section opens the citation dialog and captures the current editor selection first
