# slides — Spec 023

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### API Routes — Validation & Error Handling
- [ ] `/api/slides/import-pptx` returns 401 `{ error: "Unauthorized" }` for unauthenticated users
- [ ] `/api/slides/import-pptx` returns 400 `{ error: "Please upload a .pptx file" }` when no file or wrong type
- [ ] `/api/slides/import-pptx` returns 400 `{ error: "File exceeds 50MB limit" }` for oversized files
- [ ] `/api/slides/import-pptx` returns 400 `{ error: "Password-protected files are not supported" }` for encrypted PPTX
- [ ] `/api/slides/import-pptx` returns 500 `{ error: "Import failed" }` on unexpected server error
- [ ] `/api/slides/import-pptx` creates deck with description `Imported from {filename}` plus optional theme name
- [ ] `/api/slides/import-pptx` processes image assets via `storeImportedSlideAsset` and patches image block URLs
- [ ] `/api/slides/import-pptx` appends `Presentation contains no slides` to warnings when `slideCount === 0`
- [ ] All three API routes enforce rate limiting via `checkRateLimit` before processing
#### Slides Toolbar — Collaboration Avatars
- [ ] Toolbar renders `CollaborationAvatarsSlot` between the A11y button and the Present button
- [ ] Avatars slot is imported from `collaboration-slots` as `AvatarsSlot`
#### Properties Panel — Block Property Editor Guard
- [ ] `BlockPropertyEditor` is shown when exactly one block is selected AND the block type is NOT `text`, `bullets`, or `quote`
- [ ] Single-block alignment buttons are disabled when the selected block has no `position` property
#### Mode Selector — Visual Details
- [ ] `ModeSelector` renders two buttons: `Slides` and `Create` (not `Slides Mode` / `Create Mode`)
- [ ] Active mode button has classes `bg-brand text-white shadow-sm`
- [ ] Each mode button includes an inline SVG icon (slides grid icon for Slides, star icon for Create)
#### New Presentation Wizard — Progress Dots
- [ ] Wizard shows 3 progress dots at the top center (for topic, audience, theme steps)
- [ ] Active step dot is `bg-brand`, completed steps are `bg-brand/40`, future steps are `bg-border`
- [ ] During generating step, the third dot shows as active (`bg-brand`)
#### New Presentation Wizard — Audience Descriptions
- [ ] Each audience option shows a description beneath the label: `General audience presentation`, `Academic conference talk`, `Dissertation or thesis defense`, `Paper review meeting`, `Teaching or lecture`, `Funding proposal`, `Poster presentation`
- [ ] Audience options are rendered in a `grid-cols-2` layout (7 options = one orphan cell)
- [ ] Selected audience card has `border-brand bg-brand/5`
#### New Presentation Wizard — Back Navigation
- [ ] Audience step includes a `Back` button that returns to topic step
- [ ] Theme step includes a `Back` button that returns to audience step
- [ ] Topic step has no Back button
#### New Presentation Wizard — Generating Step Text
- [ ] Generating step sub-text is `Setting up your deck and generating initial slides...`
- [ ] Create button during generation shows spinner + `Creating...` (not `Create Presentation`)
#### Import State Card — Phase Copy Details
- [ ] Parsing phase copy: `Extracting slide structure and preview content...`
- [ ] Ready phase copy: `Preview the extracted slides before importing them into ScholarSync.`
- [ ] Importing phase copy: `Uploading assets and creating the imported deck...`
- [ ] Idle-with-error copy: `The selected file could not be imported.`
#### Export — All-Slides ZIP Additional Details
- [ ] Export-all-PNG timeout before capture is 120ms (after 2 animation frames + `document.fonts.ready`)
- [ ] Export-all-PNG sorts slides by `sortOrder` before rendering
- [ ] Export-all-PNG uses `createRoot` from `react-dom/client` for off-screen rendering
- [ ] After export-all-PNG completes, root is unmounted and container is removed from DOM
