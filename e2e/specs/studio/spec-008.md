# studio — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Without `?mode=learn`, the page defaults to Write mode
- [ ] Left sidebar title input initializes from `docTitle` returned by `useStudioDocument(...)`
- [ ] Title input has no placeholder in the current implementation
- [ ] Typing in the title immediately updates local input state and sets save status to `unsaved`
- [ ] Title saves are debounced by 1 second in `useStudioDocument`
- [ ] Successful title saves set save status to `saved` and refresh `lastSavedAt`
- [ ] Failed title saves set save status to `error` without showing an inline toast
- [ ] Project selector is hidden entirely when the user has 0 or 1 projects
- [ ] Project selector button falls back to `Select project` when no selected project matches
- [ ] Project selector closes when clicking outside because it listens on `mousedown`
- [ ] Selecting the already-active project is a no-op in `selectProject(...)`
- [ ] Selecting a different project clears `initialContent`, clears `document`, resets save status to `idle`, and loads the new project document
- [ ] Initial document load calls `loadStudioDocument(initialProjectId)` once on mount
- [ ] If `loadStudioDocument(...)` returns no document, the editor area shows `Failed to load or create document.`
- [ ] Successful document load sets `docTitle`, `selectedProjectId`, and `initialContent` from the first section with `editor_content`, or falls back to the first section
- [ ] Document loading state shows a spinner plus `Loading document...`
- [ ] Document error state shows a warning icon plus the error string from the hook
- [ ] Save indicator `saving` state uses a spinning `CircleNotch` icon plus `Saving...`
- [ ] Save indicator `saved` state uses `CloudCheck` when status is explicitly `saved`
- [ ] Save indicator `idle` state with `lastSavedAt` uses a `Check` icon and the same `Saved HH:MM` text
- [ ] Save indicator `unsaved` state uses a non-spinning `CircleNotch` icon plus `Unsaved changes`
- [ ] Save indicator `error` state uses a `Warning` icon plus `Save failed`
- [ ] Save indicator shows an empty span when status is idle and there is no `lastSavedAt`
- [ ] Typing inside the editor triggers `handleDirty()` before the debounced DB save fires
- [ ] `handleDirty()` writes a fallback draft into `localStorage` under `scholarsync_studio_draft`
- [ ] Local draft payload includes `content`, `plainText`, `wordCount`, `timestamp`, and `title`
- [ ] Local draft write failures are swallowed silently
- [ ] Debounced content saves send `documentId`, `title`, `editor_content`, `plain_text_content`, `word_count`, and optional `sectionId`
- [ ] Successful content saves can set `activeSectionId` if one was not known yet
- [ ] Content-save failures log `Auto-save failed:` to the console and set save status to `error`
- [ ] Left sidebar always shows `Current Draft` as the active nav item and it is not clickable
- [ ] `My Library` nav link points to `/library`
- [ ] `Literature Search` nav link points to `/research`
- [ ] References header count is the full `references.size` from the reference store
- [ ] Plus button in the References section opens the citation dialog and captures the current editor selection first
