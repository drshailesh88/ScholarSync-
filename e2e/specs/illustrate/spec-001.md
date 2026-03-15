# illustrate — Spec 001

STATUS: PARTIAL
TESTED: 27/35
PASS: 0
FAIL: 0
BLOCKED: 27
PAGE: http://localhost:3001/illustrate
MODULE: illustrate

---
### Welcome Page (`/illustrate`)
#### Hero Section
- [ ] Gradient title "Scientific Illustration Made Simple" renders correctly
- [ ] Tagline text displays below the title
#### Action Cards
- [ ] "Create with AI" card visible with correct icon
- [ ] Clicking "Create with AI" navigates to `/illustrate/agent`
- [ ] "Open Editor" card visible with correct icon
- [ ] Clicking "Open Editor" navigates to `/illustrate/editor`
- [ ] Hover state shows elevation and accent border
- [ ] Keyboard activation with Enter/Space on focused card
#### Recent Diagrams
- [ ] Section displays up to 6 recent diagrams from `localStorage['finnish-recent-diagrams']`
- [ ] Each card shows thumbnail (or placeholder if none)
- [ ] Each card shows diagram name
- [ ] Relative date displays correctly: "Today", "Yesterday", "N days ago"
- [ ] Clicking a card navigates to `/illustrate/editor/{diagramId}`
- [ ] Keyboard accessible (Tab + Enter)
- [ ] Empty state shown when no recent diagrams exist
- [ ] Section hidden or shows message when localStorage is empty
#### Quick Templates
- [ ] 4 template cards displayed: Flowchart, Sequence, Scientific, Annotation
- [ ] Each card shows category icon and label
- [ ] Clicking a template navigates to `/illustrate/agent?template={templateId}`
- [ ] Hover state shows visual feedback
- [ ] Grid layout responsive at different viewport widths
#### Accessibility
- [ ] All interactive elements have ARIA labels
- [ ] Tab navigation reaches every card and link
- [ ] Focus indicator visible on all interactive elements
- [ ] Role attributes set on action cards

### Agent Mode — AI Diagram Generation (`/illustrate/agent`)
#### Template Gallery (Left Sidebar)
- [ ] Sidebar renders with template categories
- [ ] Sidebar can be collapsed/expanded via toggle button
- [ ] **Medicine** category shows 3 templates:
- [ ] CONSORT — Clinical trial flow diagrams
- [ ] PRISMA — Systematic review flows
- [ ] Forest Plot — Meta-analysis visualization
- [ ] **Biology** category shows 3 templates:
- [ ] Pathway — Biological signaling cascades
- [ ] Cell Diagram — Cellular structure
- [ ] Phylogenetic Tree — Evolutionary relationships
