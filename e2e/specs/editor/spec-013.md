# editor — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Workspace Shell and Left Rail Details
- [x] Clicking a project row closes the dropdown and calls `selectProject(id)`
- [x] Left-rail navigation includes a static `Current Draft` item that is not a link
- [x] Left-rail navigation includes a link to `/library` labeled `My Library`
- [x] Left-rail navigation includes a link to `/research` labeled `Literature Search`
- [x] Left-rail reference section heading shows `References (N)` using the live reference count
- [x] Left-rail reference `Plus` button opens the citation dialog while preserving the current editor selection
- [x] When there are no cited sources yet, the left rail shows the helper text `Use Cmd+Shift+C to add citations`
- [x] Left rail shows at most five cited sources before collapsing the rest behind a secondary CTA
- [x] `View all N references` button appears only when `references.size > 5`
- [x] AI Credits progress bar falls back to `0 / 50000` when usage stats are unavailable
#### Studio Write and Learn Mode Controls
- [x] In Write mode, an `AI Intensity` strip appears above the save/export toolbar
- [x] Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [x] Write-mode default intensity is `Collaborate`
- [x] Each intensity button exposes the matching description string in its `title` attribute
- [x] Active `Focus` uses sky styling, active `Collaborate` uses brand styling, and active `Accelerate` uses violet styling
- [x] Changing draft intensity updates local mode state immediately without waiting for save
- [x] Write-mode helper line under the buttons updates to the description for the current intensity
- [x] In Learn mode, the top banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [x] Learn-mode document-type picker button defaults to `Select document type`
- [x] Learn-mode document-type picker closes immediately after selecting a type
- [x] Learn-mode stage tracker is hidden until a guide document type has been chosen
- [x] Once a guide document type is selected, stage buttons render in the order defined by `GUIDE_STAGES`
- [x] Active guide stage uses solid emerald styling
- [x] Completed guide stages use lighter emerald styling
- [x] Future guide stages use muted styling until selected
#### Studio Save, Local Draft, and Export Details
- [x] Studio save indicator renders in the center toolbar even before the first save completes
- [x] Studio `saving` state shows a spinning `CircleNotch` and `Saving...`
- [x] Studio `saved` state shows a `CloudCheck` icon and `Saved HH:MM`
- [x] Studio `unsaved` state shows `Unsaved changes`
- [x] Studio `error` state shows `Save failed`
- [x] Studio `idle` state with a prior timestamp still renders `Saved HH:MM`
- [x] `onDirty` writes a fallback JSON draft to `localStorage["scholarsync_studio_draft"]`
- [x] Local studio draft payload includes `content`, `plainText`, `wordCount`, `timestamp`, and `title`
- [x] Studio local-draft save failures are swallowed silently when localStorage is full or unavailable
- [x] Studio export trigger opens a small dropdown menu instead of a modal dialog
