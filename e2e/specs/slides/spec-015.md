# slides — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Slide Renderer V2
- [x] PASS: Image export
- [x] PASS: Supports all layout types
- [x] PASS: Applies theme via ThemeProvider
- [x] PASS: Renders master slide fixed blocks and placeholders
- [x] PASS: Handles card background (solid, gradient, image + overlay)
- [x] PASS: Shows slide numbers
- [x] PASS: Renders institution kit (logo, footer, name)
- [x] PASS: Block animation CSS stylesheet applied

### Undo / Redo System
- [x] PASS: Cmd+Z undoes the last canvas/slide change
- [x] PASS: Cmd+Y / Cmd+Shift+Z redoes
- [x] PASS: Undo/redo disabled when inside text editing
- [x] PASS: Undo/redo scoped to slides store state changes

### Visualize Popover
- [x] PASS: Cmd+Shift+V toggles the visualize popover
- [x] PASS: Provides AI-powered visualization of selected content
- [x] PASS: Only activates when not in an editable text target

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: `/slides` loads decks via `getUserDecks()` and normalizes missing fields to fallback values before rendering
- [x] PASS: Slides list ignores deck-load errors silently and still exits the loading state
- [x] PASS: Slides list loading state is a centered spinner only, not skeleton cards
- [x] PASS: Header subtitle on `/slides` reads `Create, import, and manage your slide decks`
- [x] PASS: Primary create CTA label on `/slides` is `Create New`
- [x] PASS: Import CTA label on `/slides` is `Import Presentation`
- [x] PASS: Import flow uses a hidden file input triggered by the header button and the empty-state button
- [x] PASS: Import accepts `.pptx` extension and PowerPoint MIME type through the native file input `accept` attribute
- [x] PASS: Import preview is rendered inline on the page beneath the header rather than in a modal dialog
- [x] PASS: Import state card remains visible whenever `importPhase !== "idle"` or a preview/error exists
- [x] PASS: Import state card header text is always `Import Presentation`
- [x] PASS: Import state card includes a close `X` button that fully resets import phase, preview, and error state
- [x] PASS: Import phase copy changes between parsing, ready, importing, and idle-with-error states
- [x] PASS: Import progress chips are labeled `Extracting preview` and `Creating deck`
- [x] PASS: Active import chip shows a spinning `CircleNotch`; completed chip shows a static dot
- [x] PASS: Selecting a non-`.pptx` file shows `Please upload a .pptx file`
- [x] PASS: Selecting a file over the max size shows `File exceeds 50MB limit`
- [x] PASS: Selecting a password-protected deck shows `Password-protected files are not supported`
- [x] PASS: Generic PPTX parse failures show `Could not read this file. Is it a valid PowerPoint presentation?`
- [x] PASS: While parsing, the import card shows a large inline loading row with text `Parsing PowerPoint structure and extracting slide previews...`
