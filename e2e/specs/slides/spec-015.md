# slides — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Slide Renderer V2
- [ ] Image export
- [ ] Supports all layout types
- [ ] Applies theme via ThemeProvider
- [ ] Renders master slide fixed blocks and placeholders
- [ ] Handles card background (solid, gradient, image + overlay)
- [ ] Shows slide numbers
- [ ] Renders institution kit (logo, footer, name)
- [ ] Block animation CSS stylesheet applied

### Undo / Redo System
- [ ] Cmd+Z undoes the last canvas/slide change
- [ ] Cmd+Y / Cmd+Shift+Z redoes
- [ ] Undo/redo disabled when inside text editing
- [ ] Undo/redo scoped to slides store state changes

### Visualize Popover
- [ ] Cmd+Shift+V toggles the visualize popover
- [ ] Provides AI-powered visualization of selected content
- [ ] Only activates when not in an editable text target

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] `/slides` loads decks via `getUserDecks()` and normalizes missing fields to fallback values before rendering
- [ ] Slides list ignores deck-load errors silently and still exits the loading state
- [ ] Slides list loading state is a centered spinner only, not skeleton cards
- [ ] Header subtitle on `/slides` reads `Create, import, and manage your slide decks`
- [ ] Primary create CTA label on `/slides` is `Create New`
- [ ] Import CTA label on `/slides` is `Import Presentation`
- [ ] Import flow uses a hidden file input triggered by the header button and the empty-state button
- [ ] Import accepts `.pptx` extension and PowerPoint MIME type through the native file input `accept` attribute
- [ ] Import preview is rendered inline on the page beneath the header rather than in a modal dialog
- [ ] Import state card remains visible whenever `importPhase !== "idle"` or a preview/error exists
- [ ] Import state card header text is always `Import Presentation`
- [ ] Import state card includes a close `X` button that fully resets import phase, preview, and error state
- [ ] Import phase copy changes between parsing, ready, importing, and idle-with-error states
- [ ] Import progress chips are labeled `Extracting preview` and `Creating deck`
- [ ] Active import chip shows a spinning `CircleNotch`; completed chip shows a static dot
- [ ] Selecting a non-`.pptx` file shows `Please upload a .pptx file`
- [ ] Selecting a file over the max size shows `File exceeds 50MB limit`
- [ ] Selecting a password-protected deck shows `Password-protected files are not supported`
- [ ] Generic PPTX parse failures show `Could not read this file. Is it a valid PowerPoint presentation?`
- [ ] While parsing, the import card shows a large inline loading row with text `Parsing PowerPoint structure and extracting slide previews...`
