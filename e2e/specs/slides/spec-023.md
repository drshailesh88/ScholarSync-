# slides — Spec 023

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### API Routes — Validation & Error Handling
- [x] PASS: `/api/slides/import-pptx` returns 401 `{ error: "Unauthorized" }` for unauthenticated users
- [x] PASS: `/api/slides/import-pptx` returns 400 `{ error: "Please upload a .pptx file" }` when no file or wrong type
- [x] PASS: `/api/slides/import-pptx` returns 400 `{ error: "File exceeds 50MB limit" }` for oversized files
- [x] PASS: `/api/slides/import-pptx` returns 400 `{ error: "Password-protected files are not supported" }` for encrypted PPTX
- [x] PASS: `/api/slides/import-pptx` returns 500 `{ error: "Import failed" }` on unexpected server error
- [x] PASS: `/api/slides/import-pptx` creates deck with description `Imported from {filename}` plus optional theme name
- [x] PASS: `/api/slides/import-pptx` processes image assets via `storeImportedSlideAsset` and patches image block URLs
- [x] PASS: `/api/slides/import-pptx` appends `Presentation contains no slides` to warnings when `slideCount === 0`
- [x] PASS: All three API routes enforce rate limiting via `checkRateLimit` before processing
#### Slides Toolbar — Collaboration Avatars
- [x] PASS: Toolbar renders `CollaborationAvatarsSlot` between the A11y button and the Present button
- [x] PASS: Avatars slot is imported from `collaboration-slots` as `AvatarsSlot`
#### Properties Panel — Block Property Editor Guard
- [x] PASS: `BlockPropertyEditor` is shown when exactly one block is selected AND the block type is NOT `text`, `bullets`, or `quote`
- [x] PASS: Single-block alignment buttons are disabled when the selected block has no `position` property
#### Mode Selector — Visual Details
- [x] PASS: `ModeSelector` renders two buttons: `Slides` and `Create` (not `Slides Mode` / `Create Mode`)
- [x] PASS: Active mode button has classes `bg-brand text-white shadow-sm`
- [x] PASS: Each mode button includes an inline SVG icon (slides grid icon for Slides, star icon for Create)
#### New Presentation Wizard — Progress Dots
- [x] PASS: Wizard shows 3 progress dots at the top center (for topic, audience, theme steps)
- [x] PASS: Active step dot is `bg-brand`, completed steps are `bg-brand/40`, future steps are `bg-border`
- [x] PASS: During generating step, the third dot shows as active (`bg-brand`)
#### New Presentation Wizard — Audience Descriptions
- [x] PASS: Each audience option shows a description beneath the label: `General audience presentation`, `Academic conference talk`, `Dissertation or thesis defense`, `Paper review meeting`, `Teaching or lecture`, `Funding proposal`, `Poster presentation`
- [x] PASS: Audience options are rendered in a `grid-cols-2` layout (7 options = one orphan cell)
- [x] PASS: Selected audience card has `border-brand bg-brand/5`
#### New Presentation Wizard — Back Navigation
- [x] PASS: Audience step includes a `Back` button that returns to topic step
- [x] PASS: Theme step includes a `Back` button that returns to audience step
- [x] PASS: Topic step has no Back button
#### New Presentation Wizard — Generating Step Text
- [x] PASS: Generating step sub-text is `Setting up your deck and generating initial slides...`
- [x] PASS: Create button during generation shows spinner + `Creating...` (not `Create Presentation`)
#### Import State Card — Phase Copy Details
- [x] PASS: Parsing phase copy: `Extracting slide structure and preview content...`
- [x] PASS: Ready phase copy: `Preview the extracted slides before importing them into ScholarSync.`
- [x] PASS: Importing phase copy: `Uploading assets and creating the imported deck...`
- [x] PASS: Idle-with-error copy: `The selected file could not be imported.`
#### Export — All-Slides ZIP Additional Details
- [x] PASS: Export-all-PNG timeout before capture is 120ms (after 2 animation frames + `document.fonts.ready`)
- [x] PASS: Export-all-PNG sorts slides by `sortOrder` before rendering
- [x] PASS: Export-all-PNG uses `createRoot` from `react-dom/client` for off-screen rendering
- [x] PASS: After export-all-PNG completes, root is unmounted and container is removed from DOM
