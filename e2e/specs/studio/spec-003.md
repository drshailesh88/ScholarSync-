# studio — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Slash Commands
#### Academic Content Commands
- [ ] Image opens a file picker and inserts an uploaded image
- [ ] Abstract inserts the structured `Background / Methods / Results / Conclusion` template
- [ ] Figure Caption inserts the next auto-numbered figure label
- [ ] Table Caption inserts the next auto-numbered table label
- [ ] Footnote prompts for text and inserts a footnote
- [ ] Word Count posts section counts into the chat panel
- [ ] Menu navigable with Arrow Up/Down
- [ ] Enter selects highlighted command
- [ ] Escape closes menu
- [ ] Menu positions correctly relative to cursor

### AI Chat Panel (Chat & Learn Tab)
#### Chat Messages
- [ ] User messages appear on one side
- [ ] Assistant messages appear on opposite side
- [ ] Messages render plain text content
- [ ] Streaming responses update incrementally
- [ ] Loading spinner shows during response generation
#### Chat Input
- [ ] Input field with contextual placeholder:
- [ ] Submit via Enter key
- [ ] Submit via Send button
- [ ] Empty input cannot be submitted
- [ ] Input clears after submission
#### Chat Errors
- [ ] Error displays in amber warning box
- [ ] Error text from `chatError` state
- [ ] Error clears on next successful message
#### AI Behavior by Mode
- [ ] Write mode: AI acts as research assistant
- [ ] Learn mode: AI uses Socratic method, refuses to write content directly
- [ ] AI behavior adapts to selected guide stage in Learn mode
- [ ] AI behavior adapts to draft intensity in Write mode

### Research Tab
- [ ] Tab labeled "Research" in right panel
- [ ] "Open Literature Research Panel" button opens `ResearchSidebar`
- [ ] Instruction text: "Or press Cmd+Shift+L to toggle"
#### Quick PubMed Search
- [ ] Search input with placeholder: "Quick search PubMed..."
- [ ] "Search" button submits query
- [ ] Search opens the external `ResearchSidebar`; the right-panel launcher does not render inline results
#### Research Sidebar
- [ ] Full panel with literature discovery
- [ ] 3 sub-tabs for different search/browse modes
