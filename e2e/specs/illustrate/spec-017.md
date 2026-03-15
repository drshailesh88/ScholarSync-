# illustrate — Spec 017

STATUS: PASS
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Mode — Chat History, Preview, and Message Actions
- [x] PASS: Empty chat state helper text ends with "Try asking me to:"
- [x] PASS: Empty chat state renders 4 suggestion buttons
- [x] PASS: Suggestion button "Create a CONSORT flow diagram for a clinical trial" sends immediately when clicked
- [x] PASS: Suggestion button "Generate a forest plot for meta-analysis" sends immediately when clicked
- [x] PASS: Suggestion button "Design a biological pathway diagram" sends immediately when clicked
- [x] PASS: Suggestion button "Build a PRISMA flowchart for systematic review" sends immediately when clicked
- [x] PASS: User message role label is "You"
- [x] PASS: Assistant message role label is "FINNISH"
- [x] PASS: Message timestamp is formatted with 2-digit hour and minute via `toLocaleTimeString`
- [x] PASS: Assistant typing state shows text "Generating diagram..."
- [x] PASS: Chat container auto-scrolls to the bottom whenever messages or loading state change
- [x] PASS: Generated-diagram message renders action buttons labeled Edit, Export, Regenerate, and Copy SVG
- [x] PASS: Edit button title is "Edit in canvas editor"
- [x] PASS: Edit button stores SVG under `sessionStorage['scholarsync-illustration-agent-import']` when no override callback is provided
- [x] PASS: Edit button redirects to `/illustrate/editor?import=agent`
- [x] PASS: Export dropdown button label is "Export"
- [x] PASS: Export dropdown closes when clicking outside the dropdown wrapper
- [x] PASS: Export SVG action downloads filename `diagram-{messageId}.svg`
- [x] PASS: Export PNG action renders the SVG onto a temporary canvas before download
- [x] PASS: Export PNG action downloads filename `diagram-{messageId}.png`
- [x] PASS: PNG export paints a white background before drawing the SVG
- [x] PASS: Regenerate button only resends when the message immediately before the target assistant message is a user message
- [x] PASS: Copy SVG button writes raw SVG text to `navigator.clipboard`
- [x] PASS: Copy SVG button text changes to "Copied!" after successful copy
- [x] PASS: Copy SVG success visual state lasts about 2 seconds before returning to "Copy SVG"
- [x] PASS: Copy SVG failure logs to console and does not show a toast in the current component
- [x] PASS: Preview pane is rendered only when both `showPreviewPane` and `currentDiagram` are truthy
- [x] PASS: Preview pane header title is "Preview"
- [x] PASS: Preview-pane close button title is "Close preview"
- [x] PASS: Closing the preview pane only flips local component state and does not clear `currentDiagram`
- [x] PASS: Agent route does not expose a visible control to reopen the right preview pane after it is closed
- [x] PASS: Inline `DiagramPreview` zoom starts at 100%
- [x] PASS: `DiagramPreview` zoom-in button disables at 400%
- [x] PASS: `DiagramPreview` zoom-out button disables at 25%
- [x] PASS: `DiagramPreview` fit button resets zoom back to 100%
