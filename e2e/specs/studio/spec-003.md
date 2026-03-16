# studio — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Slash Commands
#### Academic Content Commands
- [x] PASS: Image opens a file picker and inserts an uploaded image
- [x] PASS: Abstract inserts the structured `Background / Methods / Results / Conclusion` template
- [x] PASS: Figure Caption inserts the next auto-numbered figure label
- [x] PASS: Table Caption inserts the next auto-numbered table label
- [x] PASS: Footnote prompts for text and inserts a footnote
- [x] PASS: Word Count posts section counts into the chat panel
- [x] PASS: Menu navigable with Arrow Up/Down
- [x] PASS: Enter selects highlighted command
- [x] PASS: Escape closes menu
- [x] PASS: Menu positions correctly relative to cursor

### AI Chat Panel (Chat & Learn Tab)
#### Chat Messages
- [x] PASS: User messages appear on one side
- [x] PASS: Assistant messages appear on opposite side
- [x] PASS: Messages render plain text content
- [x] PASS: Streaming responses update incrementally
- [x] PASS: Loading spinner shows during response generation
#### Chat Input
- [x] PASS: Input field with contextual placeholder:
- [x] PASS: Submit via Enter key
- [x] PASS: Submit via Send button
- [x] PASS: Empty input cannot be submitted
- [x] PASS: Input clears after submission
#### Chat Errors
- [x] PASS: Error displays in amber warning box
- [x] PASS: Error text from `chatError` state
- [x] PASS: Error clears on next successful message
#### AI Behavior by Mode
- [x] PASS: Write mode: AI acts as research assistant
- [x] PASS: Learn mode: AI uses Socratic method, refuses to write content directly
- [x] PASS: AI behavior adapts to selected guide stage in Learn mode
- [x] PASS: AI behavior adapts to draft intensity in Write mode

### Research Tab
- [x] PASS: Tab labeled "Research" in right panel
- [x] PASS: "Open Literature Research Panel" button opens `ResearchSidebar`
- [x] PASS: Instruction text: "Or press Cmd+Shift+L to toggle"
#### Quick PubMed Search
- [x] PASS: Search input with placeholder: "Quick search PubMed..."
- [x] PASS: "Search" button submits query
- [x] PASS: Search opens the external `ResearchSidebar`; the right-panel launcher does not render inline results
#### Research Sidebar
- [x] PASS: Full panel with literature discovery
- [x] PASS: 3 sub-tabs for different search/browse modes
