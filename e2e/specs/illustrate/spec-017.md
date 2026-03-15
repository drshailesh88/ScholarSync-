# illustrate — Spec 017

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Quick Test Workflows
#### Agent Mode — Chat History, Preview, and Message Actions
- [ ] Empty chat state helper text ends with "Try asking me to:"
- [ ] Empty chat state renders 4 suggestion buttons
- [ ] Suggestion button "Create a CONSORT flow diagram for a clinical trial" sends immediately when clicked
- [ ] Suggestion button "Generate a forest plot for meta-analysis" sends immediately when clicked
- [ ] Suggestion button "Design a biological pathway diagram" sends immediately when clicked
- [ ] Suggestion button "Build a PRISMA flowchart for systematic review" sends immediately when clicked
- [ ] User message role label is "You"
- [ ] Assistant message role label is "FINNISH"
- [ ] Message timestamp is formatted with 2-digit hour and minute via `toLocaleTimeString`
- [ ] Assistant typing state shows text "Generating diagram..."
- [ ] Chat container auto-scrolls to the bottom whenever messages or loading state change
- [ ] Generated-diagram message renders action buttons labeled Edit, Export, Regenerate, and Copy SVG
- [ ] Edit button title is "Edit in canvas editor"
- [ ] Edit button stores SVG under `sessionStorage['scholarsync-illustration-agent-import']` when no override callback is provided
- [ ] Edit button redirects to `/illustrate/editor?import=agent`
- [ ] Export dropdown button label is "Export"
- [ ] Export dropdown closes when clicking outside the dropdown wrapper
- [ ] Export SVG action downloads filename `diagram-{messageId}.svg`
- [ ] Export PNG action renders the SVG onto a temporary canvas before download
- [ ] Export PNG action downloads filename `diagram-{messageId}.png`
- [ ] PNG export paints a white background before drawing the SVG
- [ ] Regenerate button only resends when the message immediately before the target assistant message is a user message
- [ ] Copy SVG button writes raw SVG text to `navigator.clipboard`
- [ ] Copy SVG button text changes to "Copied!" after successful copy
- [ ] Copy SVG success visual state lasts about 2 seconds before returning to "Copy SVG"
- [ ] Copy SVG failure logs to console and does not show a toast in the current component
- [ ] Preview pane is rendered only when both `showPreviewPane` and `currentDiagram` are truthy
- [ ] Preview pane header title is "Preview"
- [ ] Preview-pane close button title is "Close preview"
- [ ] Closing the preview pane only flips local component state and does not clear `currentDiagram`
- [ ] Agent route does not expose a visible control to reopen the right preview pane after it is closed
- [ ] Inline `DiagramPreview` zoom starts at 100%
- [ ] `DiagramPreview` zoom-in button disables at 400%
- [ ] `DiagramPreview` zoom-out button disables at 25%
- [ ] `DiagramPreview` fit button resets zoom back to 100%
