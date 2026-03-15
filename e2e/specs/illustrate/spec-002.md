# illustrate — Spec 002

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Agent Mode — AI Diagram Generation (`/illustrate/agent`)
#### Template Gallery (Left Sidebar)
- [ ] **Chemistry** category shows 2 templates:
- [ ] Reaction Scheme — Multi-step synthesis
- [ ] Molecular Structure — 2D chemical structures
- [ ] **General** category shows 4 templates:
- [ ] Flowchart — Process flows
- [ ] Table — Data layout
- [ ] Timeline — Chronological events
- [ ] Venn Diagram — Set relationships
- [ ] Clicking a template populates the prompt input with that template's prompt
- [ ] Category filter buttons work correctly
- [ ] Template search/filter updates visible templates
#### Chat Interface
- [ ] User messages appear right-aligned
- [ ] Assistant messages appear left-aligned with diagram preview
- [ ] Error messages display with error styling (red accent)
- [ ] Loading spinner shows during generation
- [ ] Prompt suggestions appear on welcome screen (before first message)
- [ ] Messages persist across page refreshes (last 50 messages via localStorage)
- [ ] Each message has auto-generated ID and timestamp
#### Message Actions
- [ ] "Send to Editor" button appears on assistant messages with diagrams
- [ ] Clicking "Send to Editor" saves SVG to `sessionStorage['scholarsync-illustration-agent-import']`
- [ ] After "Send to Editor", redirects to `/illustrate/editor?import=agent`
- [ ] "Regenerate" button resends previous user prompt
- [ ] Regeneration creates a new request with the same prompt
#### Prompt Input
- [ ] Text input field accepts up to 4000 characters
- [ ] Character count or limit indicator visible
- [ ] Submit via "Send" button
- [ ] Submit via Enter key
- [ ] "Stop" button appears during generation
- [ ] "Stop" button aborts the in-flight fetch request
- [ ] Empty prompt cannot be submitted (button disabled or validation shown)
#### Style & Model Selection
- [ ] Style dropdown with options: flat, detailed, schematic, photorealistic
- [ ] Model dropdown with options: pro, flash (Gemini variants)
- [ ] Selected style/model persists during session
- [ ] Style auto-detection from prompt keywords:
- [ ] "detailed", "intricate", "complex" → `detailed`
