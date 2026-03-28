# studio — Spec 001

STATUS: PARTIAL
TESTED: 35/35
PASS: 11
FAIL: 24
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Page Overview & Layout
#### Layout
- [ ] FAIL: Main layout uses a 256px left sidebar (`w-64`), flex editor column, a collapsible ResearchSidebar rail, and a 320px right panel (`w-80`)
- [ ] FAIL: Height fills viewport: `h-[calc(100vh-7rem)]`
- [ ] FAIL: Right panel can be replaced by the Reference Sidebar or Comment Sidebar
- [x] PASS: All columns visible on desktop
- [x] PASS: Layout responsive at different viewport widths

### Left Sidebar
#### Document Title
- [ ] FAIL: Editable title input at top of sidebar
- [x] PASS: Title updates on change and triggers save
- [ ] FAIL: Title input has no placeholder in the current implementation
#### Mode Toggle
- [ ] FAIL: "Write" button switches to Draft/Write mode
- [ ] FAIL: "Learn" button switches to Learn/Guide mode
- [ ] FAIL: Active mode button is visually highlighted
- [ ] FAIL: Mode persists during session
#### Project Selector
- [ ] FAIL: Dropdown shows user's projects (if multiple exist)
- [x] PASS: Selecting a project switches document context
- [x] PASS: Document content loads for selected project
#### Navigation Links
- [ ] FAIL: "My Library" link navigates to library
- [x] PASS: "Literature Search" link navigates to research
#### References Section
- [x] PASS: Header shows "References (X)" with count
- [ ] FAIL: Top 5 cited references displayed
- [ ] FAIL: "View all X references" expandable link
- [ ] FAIL: Empty state: "Use Cmd+Shift+C to add citations"
- [x] PASS: Reference preview cards are display-only in the left sidebar summary
#### AI Credits
- [x] PASS: Usage bar displayed at sidebar bottom
- [x] PASS: Shows tokens used vs. tokens limit
- [x] PASS: Bar fills proportionally to usage
- [ ] FAIL: Falls back to `0 / 50000` if usage stats fail to load

### Draft Mode (Write Mode)
- [ ] FAIL: Header renders when `isLearnMode` is false
- [ ] FAIL: Three AI intensity buttons displayed:
- [ ] FAIL: Active intensity button visually highlighted
- [ ] FAIL: Switching intensity updates AI behavior
- [ ] FAIL: Default intensity is "collaborate"

### Learn / Guide Mode
- [ ] FAIL: Header renders when `isLearnMode` is true
- [ ] FAIL: Emerald green header with text: "Guide Mode — I won't write for you — I'll teach you how"
#### Document Type Picker
- [ ] FAIL: "Select document type" default text
- [ ] FAIL: Clicking opens picker with 7 document types:
