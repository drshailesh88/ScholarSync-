# studio — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Page Overview & Layout
#### Layout
- [x] PASS: Main layout uses a 256px left sidebar (`w-64`), flex editor column, a collapsible ResearchSidebar rail, and a 320px right panel (`w-80`)
- [x] PASS: Height fills viewport: `h-[calc(100vh-7rem)]`
- [x] PASS: Right panel can be replaced by the Reference Sidebar or Comment Sidebar
- [x] PASS: All columns visible on desktop
- [x] PASS: Layout responsive at different viewport widths

### Left Sidebar
#### Document Title
- [x] PASS: Editable title input at top of sidebar
- [x] PASS: Title updates on change and triggers save
- [x] PASS: Title input has no placeholder in the current implementation
#### Mode Toggle
- [x] PASS: "Write" button switches to Draft/Write mode
- [x] PASS: "Learn" button switches to Learn/Guide mode
- [x] PASS: Active mode button is visually highlighted
- [x] PASS: Mode persists during session
#### Project Selector
- [x] PASS: Dropdown shows user's projects (if multiple exist)
- [x] PASS: Selecting a project switches document context
- [x] PASS: Document content loads for selected project
#### Navigation Links
- [x] PASS: "My Library" link navigates to library
- [x] PASS: "Literature Search" link navigates to research
#### References Section
- [x] PASS: Header shows "References (X)" with count
- [x] PASS: Top 5 cited references displayed
- [x] PASS: "View all X references" expandable link
- [x] PASS: Empty state: "Use Cmd+Shift+C to add citations"
- [x] PASS: Reference preview cards are display-only in the left sidebar summary
#### AI Credits
- [x] PASS: Usage bar displayed at sidebar bottom
- [x] PASS: Shows tokens used vs. tokens limit
- [x] PASS: Bar fills proportionally to usage
- [x] PASS: Falls back to `0 / 50000` if usage stats fail to load

### Draft Mode (Write Mode)
- [x] PASS: Header renders when `isLearnMode` is false
- [x] PASS: Three AI intensity buttons displayed:
- [x] PASS: Active intensity button visually highlighted
- [x] PASS: Switching intensity updates AI behavior
- [x] PASS: Default intensity is "collaborate"

### Learn / Guide Mode
- [x] PASS: Header renders when `isLearnMode` is true
- [x] PASS: Emerald green header with text: "Guide Mode — I won't write for you — I'll teach you how"
#### Document Type Picker
- [x] PASS: "Select document type" default text
- [x] PASS: Clicking opens picker with 7 document types:
