# studio — Spec 001

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Page Overview & Layout
#### Layout
- [ ] Main layout uses a 256px left sidebar (`w-64`), flex editor column, a collapsible ResearchSidebar rail, and a 320px right panel (`w-80`)
- [ ] Height fills viewport: `h-[calc(100vh-7rem)]`
- [ ] Right panel can be replaced by the Reference Sidebar or Comment Sidebar
- [ ] All columns visible on desktop
- [ ] Layout responsive at different viewport widths

### Left Sidebar
#### Document Title
- [ ] Editable title input at top of sidebar
- [ ] Title updates on change and triggers save
- [ ] Title input has no placeholder in the current implementation
#### Mode Toggle
- [ ] "Write" button switches to Draft/Write mode
- [ ] "Learn" button switches to Learn/Guide mode
- [ ] Active mode button is visually highlighted
- [ ] Mode persists during session
#### Project Selector
- [ ] Dropdown shows user's projects (if multiple exist)
- [ ] Selecting a project switches document context
- [ ] Document content loads for selected project
#### Navigation Links
- [ ] "My Library" link navigates to library
- [ ] "Literature Search" link navigates to research
#### References Section
- [ ] Header shows "References (X)" with count
- [ ] Top 5 cited references displayed
- [ ] "View all X references" expandable link
- [ ] Empty state: "Use Cmd+Shift+C to add citations"
- [ ] Reference preview cards are display-only in the left sidebar summary
#### AI Credits
- [ ] Usage bar displayed at sidebar bottom
- [ ] Shows tokens used vs. tokens limit
- [ ] Bar fills proportionally to usage
- [ ] Falls back to `0 / 50000` if usage stats fail to load

### Draft Mode (Write Mode)
- [ ] Header renders when `isLearnMode` is false
- [ ] Three AI intensity buttons displayed:
- [ ] Active intensity button visually highlighted
- [ ] Switching intensity updates AI behavior
- [ ] Default intensity is "collaborate"

### Learn / Guide Mode
- [ ] Header renders when `isLearnMode` is true
- [ ] Emerald green header with text: "Guide Mode — I won't write for you — I'll teach you how"
#### Document Type Picker
- [ ] "Select document type" default text
- [ ] Clicking opens picker with 7 document types:
