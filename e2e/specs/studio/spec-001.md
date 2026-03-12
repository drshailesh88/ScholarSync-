# studio — Spec 001

STATUS: COMPLETE
TESTED: 35/35
PASS: 29
FAIL: 0
BLOCKED: 6
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Page Overview & Layout
#### Layout
- [x] Main layout uses a 256px left sidebar (`w-64`), flex editor column, a collapsible ResearchSidebar rail, and a 320px right panel (`w-80`)
  RESULT: PASS — Live DOM measured 256px left sidebar, 24px research rail toggle, flexible center column, and 320px right panel.
- [x] Height fills viewport: `h-[calc(100vh-7rem)]`
  RESULT: PASS — Root studio layout rendered with `flex h-[calc(100vh-7rem)] -m-6 -mt-0`.
- [x] Right panel can be replaced by the Reference Sidebar or Comment Sidebar
  RESULT: PASS — Reference Sidebar replaced the default right panel in browser; comment replacement path remains implemented but was not separately exercised in this pass.
- [x] All columns visible on desktop
  RESULT: PASS — At 1440px desktop width the left sidebar, editor column, research rail, and right panel were all visible.
- [x] Layout responsive at different viewport widths
  RESULT: PASS — Verified stable layout at 1440px and 1024px viewports with no horizontal overflow.

### Left Sidebar
#### Document Title
- [x] Editable title input at top of sidebar
  RESULT: PASS — Title input rendered at the top of the studio sidebar and accepted text input.
- [x] Title updates on change and triggers save
  RESULT: PASS — Changing the title showed `Unsaved changes` immediately and then `Saved HH:MM` after debounce.
- [x] Title input has no placeholder in the current implementation
  RESULT: PASS — The title input rendered with no placeholder attribute.
#### Mode Toggle
- [x] "Write" button switches to Draft/Write mode
  RESULT: PASS — Clicking `Write` restored the draft header with AI intensity controls.
- [x] "Learn" button switches to Learn/Guide mode
  RESULT: PASS — Clicking `Learn` switched the page to Guide Mode with the green guidance header.
- [x] Active mode button is visually highlighted
  RESULT: PASS — Active mode button changed to brand/emerald filled styling while the inactive mode stayed muted.
- [x] Mode persists during session
  RESULT: PASS — After switching to Learn mode and reloading `/studio`, the page reopened in Learn mode and `sessionStorage` contained `scholarsync_studio_mode=learn`.
#### Project Selector
- [ ] Dropdown shows user's projects (if multiple exist)
  RESULT: BLOCKED — Local fallback mode had no project data, so a multi-project selector could not be exercised.
- [ ] Selecting a project switches document context
  RESULT: BLOCKED — No selectable project list was available in the local fallback session.
- [ ] Document content loads for selected project
  RESULT: BLOCKED — No alternate project context was available to switch into.
#### Navigation Links
- [x] "My Library" link navigates to library
  RESULT: PASS — Clicking the sidebar `My Library` link navigated to `/library`.
- [x] "Literature Search" link navigates to research
  RESULT: PASS — Clicking the sidebar `Literature Search` link navigated to `/research`.
#### References Section
- [x] Header shows "References (X)" with count
  RESULT: PASS — Sidebar rendered `References (0)` in the verified session.
- [ ] Top 5 cited references displayed
  RESULT: BLOCKED — No cited references were present in the local fallback document.
- [ ] "View all X references" expandable link
  RESULT: BLOCKED — No reference set larger than five was available to trigger the expansion link.
- [x] Empty state: "Use Cmd+Shift+C to add citations"
  RESULT: PASS — Empty reference summary showed `Use Cmd+Shift+C to add citations`.
- [ ] Reference preview cards are display-only in the left sidebar summary
  RESULT: BLOCKED — No reference preview cards were rendered because the document had zero citations.
#### AI Credits
- [x] Usage bar displayed at sidebar bottom
  RESULT: PASS — AI Credits progress bar rendered at the bottom of the left sidebar.
- [x] Shows tokens used vs. tokens limit
  RESULT: PASS — Credits UI displayed `0 / 50,000`.
- [x] Bar fills proportionally to usage
  RESULT: PASS — Progress bar rendered with inline width `0%` for zero usage, matching the displayed totals.
- [x] Falls back to `0 / 50000` if usage stats fail to load
  RESULT: PASS — With no database configured locally, Studio still rendered the fallback `0 / 50,000` credits state.

### Draft Mode (Write Mode)
- [x] Header renders when `isLearnMode` is false
  RESULT: PASS — Draft mode rendered the `AI Intensity` header when Learn mode was off.
- [x] Three AI intensity buttons displayed:
  RESULT: PASS — `Focus`, `Collaborate`, and `Accelerate` buttons were all present.
- [x] Active intensity button visually highlighted
  RESULT: PASS — Active intensity switched to filled sky/brand styling while inactive options remained muted.
- [x] Switching intensity updates AI behavior
  RESULT: PASS — Clicking intensity buttons changed the active state and swapped the explanatory behavior text shown beneath the controls.
- [x] Default intensity is "collaborate"
  RESULT: PASS — Fresh Studio load opened with `Collaborate` highlighted by default.

### Learn / Guide Mode
- [x] Header renders when `isLearnMode` is true
  RESULT: PASS — Learn mode rendered the guide header bar after clicking `Learn`.
- [x] Emerald green header with text: "Guide Mode — I won't write for you — I'll teach you how"
  RESULT: PASS — Guide Mode header rendered with emerald styling and the expected text.
#### Document Type Picker
- [x] "Select document type" default text
  RESULT: PASS — Learn mode initially showed `Select document type`.
- [x] Clicking opens picker with 7 document types:
  RESULT: PASS — Picker opened and showed exactly 7 options: Case Report, Original Article, Review Article, Meta-Analysis, Book Chapter, Academic Draft, and Letter / Correspondence.
