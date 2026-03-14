# slides — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Presentation / Slideshow Mode
#### Block Reveal Animations
- [ ] Click advances to next reveal step
- [ ] Auto-triggered steps play automatically after click-triggered steps
- [ ] Reveal order resets when changing slides
- [ ] Animation sequencer computes timing from block animation metadata
- [ ] Step counter shows current step / total click steps
#### Presenter View
- [ ] Toggle presenter panel on/off
- [ ] **Current slide preview** (large)
- [ ] **Next slide preview**
- [ ] **Speaker notes** with markdown rendering (ReactMarkdown + remarkGfm)
- [ ] **Notes font size:** Small, Medium, Large
- [ ] **Timer:**
- [ ] Elapsed time counter
- [ ] Pause/Resume toggle
- [ ] **Screen modes:**
- [ ] Normal
- [ ] Black screen (Moon icon)
- [ ] White screen (Sun icon)
- [ ] **Slide counter** — "Slide X of Y"
- [ ] **Jump to slide** — Number input or typed number buffer
#### Hidden Slides
- [ ] Hidden slides are filtered out of the visible slides array
- [ ] Presenter can only navigate through visible slides

### Keyboard Shortcuts (Global)
#### File & View
- [ ] `Cmd+S` — Save (prevents browser default)
- [ ] `Cmd+F` — Toggle Find & Replace dialog
- [ ] `Cmd+Shift+V` — Toggle Visualize Popover (when not in editable target)
#### Presentation
- [ ] `F5` — Present from beginning
- [ ] `Shift+F5` — Present from current slide
- [ ] `Escape` — Exit editing → Deselect all → Exit presenting (cascading)
#### Undo / Redo
- [ ] `Cmd+Z` — Undo (when not editing text)
- [ ] `Cmd+Y` or `Cmd+Shift+Z` — Redo (when not editing text)
#### Selection
- [ ] `Cmd+A` — Select all blocks on active slide
- [ ] `Tab` — Cycle to next block
- [ ] `Shift+Tab` — Cycle to previous block
#### Z-Order
- [ ] `Cmd+]` — Bring Forward
- [ ] `Cmd+Shift+]` — Bring to Front
- [ ] `Cmd+[` — Send Backward
