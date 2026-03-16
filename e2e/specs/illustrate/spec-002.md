# illustrate — Spec 002

STATUS: PARTIAL
TESTED: 35/35
PASS: 34
FAIL: 1
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Agent Mode — AI Diagram Generation (`/illustrate/agent`)
#### Template Gallery (Left Sidebar)
- [x] PASS: **Chemistry** category shows 2 templates:
- [x] PASS: Reaction Scheme — Multi-step synthesis
- [x] PASS: Molecular Structure — 2D chemical structures
- [x] PASS: **General** category shows 4 templates:
- [x] PASS: Flowchart — Process flows
- [x] PASS: Table — Data layout
- [x] PASS: Timeline — Chronological events
- [x] PASS: Venn Diagram — Set relationships
- [x] PASS: Clicking a template populates the prompt input with that template's prompt
- [x] PASS: Category filter buttons work correctly
- [x] PASS: Template search/filter updates visible templates
#### Chat Interface
- [x] PASS: User messages appear right-aligned
- [x] PASS: Assistant messages appear left-aligned with diagram preview
- [x] PASS: Error messages display with error styling (red accent)
- [x] PASS: Loading spinner shows during generation
- [x] PASS: Prompt suggestions appear on welcome screen (before first message)
- [x] PASS: Messages persist across page refreshes (last 50 messages via localStorage)
- [x] PASS: Each message has auto-generated ID and timestamp
#### Message Actions
- [x] PASS: "Send to Editor" button appears on assistant messages with diagrams
- [x] PASS: Clicking "Send to Editor" saves SVG to `sessionStorage['scholarsync-illustration-agent-import']`
- [x] PASS: After "Send to Editor", redirects to `/illustrate/editor?import=agent`
- [x] PASS: "Regenerate" button resends previous user prompt
- [x] PASS: Regeneration creates a new request with the same prompt
#### Prompt Input
- [ ] FAIL: Text input field accepts up to 4000 characters
- [x] PASS: Character count or limit indicator visible
- [x] PASS: Submit via "Send" button
- [x] PASS: Submit via Enter key
- [x] PASS: "Stop" button appears during generation
- [x] PASS: "Stop" button aborts the in-flight fetch request
- [x] PASS: Empty prompt cannot be submitted (button disabled or validation shown)
#### Style & Model Selection
- [x] PASS: Style dropdown with options: flat, detailed, schematic, photorealistic
- [x] PASS: Model dropdown with options: pro, flash (Gemini variants)
- [x] PASS: Selected style/model persists during session
- [x] PASS: Style auto-detection from prompt keywords:
- [x] PASS: "detailed", "intricate", "complex" → `detailed`
