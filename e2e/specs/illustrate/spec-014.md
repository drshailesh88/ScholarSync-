# illustrate — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Error Handling & Edge Cases
#### Toast Notifications
- [ ] **Warning** (orange) — Non-critical issues (e.g., "Large file may be slow")
- [ ] **Error** (red) — Failed operations (e.g., "Failed to load diagram")
- [ ] Toasts auto-dismiss after ~3000ms
- [ ] Multiple toasts stack without overlap
#### Canvas Edge Cases
- [ ] Pathfinder operations on incompatible objects show error toast
- [ ] Clipping mask with < 2 objects shows error
- [ ] Compound path on non-path objects shows error
- [ ] Very large images (> 4000×4000) handled gracefully
- [ ] Canvas with 100+ objects remains responsive
- [ ] Empty canvas export produces valid (empty) file
#### File Operations
- [ ] Opening non-supported file format shows error
- [ ] Opening corrupted `.finnish` file shows error with recovery option
- [ ] Save on empty canvas produces valid file
- [ ] Import of malformed SVG shows error
#### Agent Mode Edge Cases
- [ ] Empty prompt submission prevented
- [ ] Prompt exceeding 4000 characters truncated or prevented
- [ ] Network error during generation shows error message in chat
- [ ] Aborting generation mid-stream recovers cleanly
- [ ] Rapid successive prompts handled without race conditions
#### Accessibility
- [ ] All interactive elements reachable via Tab key
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels on toolbar buttons, menu items, panels
- [ ] Screen reader can announce tool changes and selections
- [ ] Color contrast meets WCAG AA for all text and controls
- [ ] Alt text present on decorative and informational images

### Quick Test Workflows
#### Welcome Page — Detailed Behavior
- [ ] Header shows FINNISH logo lockup with icon at the top-left of `/illustrate`
- [ ] Welcome page has no secondary nav links or settings controls in the header
- [ ] Hero tagline text reads "Create professional diagrams, flowcharts, and scientific illustrations with AI assistance or precision manual tools."
- [ ] "Create with AI" card description reads "Describe what you want and let AI generate it for you"
- [ ] "Open Editor" card description reads "Use professional tools for precise manual editing"
- [ ] Action cards are rendered as `Link` elements, not custom button divs
- [ ] Recent Diagrams section header shows "View all" link only when at least 1 recent diagram exists
- [ ] "View all" link in Recent Diagrams routes to `/illustrate/editor`
- [ ] Recent Diagrams list is truncated to the first 6 parsed items from `localStorage['finnish-recent-diagrams']`
- [ ] Recent diagram card has `role="button"` and `tabIndex=0`
