# editor — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Workspace Shell and Left Rail Details
- [ ] Clicking a project row closes the dropdown and calls `selectProject(id)`
- [ ] Left-rail navigation includes a static `Current Draft` item that is not a link
- [ ] Left-rail navigation includes a link to `/library` labeled `My Library`
- [ ] Left-rail navigation includes a link to `/research` labeled `Literature Search`
- [ ] Left-rail reference section heading shows `References (N)` using the live reference count
- [ ] Left-rail reference `Plus` button opens the citation dialog while preserving the current editor selection
- [ ] When there are no cited sources yet, the left rail shows the helper text `Use Cmd+Shift+C to add citations`
- [ ] Left rail shows at most five cited sources before collapsing the rest behind a secondary CTA
- [ ] `View all N references` button appears only when `references.size > 5`
- [ ] AI Credits progress bar falls back to `0 / 50000` when usage stats are unavailable
#### Studio Write and Learn Mode Controls
- [ ] In Write mode, an `AI Intensity` strip appears above the save/export toolbar
- [ ] Write-mode intensity buttons are `Focus`, `Collaborate`, and `Accelerate`
- [ ] Write-mode default intensity is `Collaborate`
- [ ] Each intensity button exposes the matching description string in its `title` attribute
- [ ] Active `Focus` uses sky styling, active `Collaborate` uses brand styling, and active `Accelerate` uses violet styling
- [ ] Changing draft intensity updates local mode state immediately without waiting for save
- [ ] Write-mode helper line under the buttons updates to the description for the current intensity
- [ ] In Learn mode, the top banner text is `Guide Mode — I won't write for you — I'll teach you how`
- [ ] Learn-mode document-type picker button defaults to `Select document type`
- [ ] Learn-mode document-type picker closes immediately after selecting a type
- [ ] Learn-mode stage tracker is hidden until a guide document type has been chosen
- [ ] Once a guide document type is selected, stage buttons render in the order defined by `GUIDE_STAGES`
- [ ] Active guide stage uses solid emerald styling
- [ ] Completed guide stages use lighter emerald styling
- [ ] Future guide stages use muted styling until selected
#### Studio Save, Local Draft, and Export Details
- [ ] Studio save indicator renders in the center toolbar even before the first save completes
- [ ] Studio `saving` state shows a spinning `CircleNotch` and `Saving...`
- [ ] Studio `saved` state shows a `CloudCheck` icon and `Saved HH:MM`
- [ ] Studio `unsaved` state shows `Unsaved changes`
- [ ] Studio `error` state shows `Save failed`
- [ ] Studio `idle` state with a prior timestamp still renders `Saved HH:MM`
- [ ] `onDirty` writes a fallback JSON draft to `localStorage["scholarsync_studio_draft"]`
- [ ] Local studio draft payload includes `content`, `plainText`, `wordCount`, `timestamp`, and `title`
- [ ] Studio local-draft save failures are swallowed silently when localStorage is full or unavailable
- [ ] Studio export trigger opens a small dropdown menu instead of a modal dialog
