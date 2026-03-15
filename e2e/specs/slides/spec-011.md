# slides — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Presentation / Slideshow Mode
#### Block Reveal Animations
- [x] PASS: Click advances to next reveal step
- [x] PASS: Auto-triggered steps play automatically after click-triggered steps
- [x] PASS: Reveal order resets when changing slides
- [x] PASS: Animation sequencer computes timing from block animation metadata
- [x] PASS: Step counter shows current step / total click steps
#### Presenter View
- [x] PASS: Toggle presenter panel on/off
- [x] PASS: **Current slide preview** (large)
- [x] PASS: **Next slide preview**
- [x] PASS: **Speaker notes** with markdown rendering (ReactMarkdown + remarkGfm)
- [x] PASS: **Notes font size:** Small, Medium, Large
- [x] PASS: **Timer:**
- [x] PASS: Elapsed time counter
- [x] PASS: Pause/Resume toggle
- [x] PASS: **Screen modes:**
- [x] PASS: Normal
- [x] PASS: Black screen (Moon icon)
- [x] PASS: White screen (Sun icon)
- [x] PASS: **Slide counter** — "Slide X of Y"
- [x] PASS: **Jump to slide** — Number input or typed number buffer
#### Hidden Slides
- [x] PASS: Hidden slides are filtered out of the visible slides array
- [x] PASS: Presenter can only navigate through visible slides

### Keyboard Shortcuts (Global)
#### File & View
- [x] PASS: `Cmd+S` — Save (prevents browser default)
- [x] PASS: `Cmd+F` — Toggle Find & Replace dialog
- [x] PASS: `Cmd+Shift+V` — Toggle Visualize Popover (when not in editable target)
#### Presentation
- [x] PASS: `F5` — Present from beginning
- [x] PASS: `Shift+F5` — Present from current slide
- [x] PASS: `Escape` — Exit editing → Deselect all → Exit presenting (cascading)
#### Undo / Redo
- [x] PASS: `Cmd+Z` — Undo (when not editing text)
- [x] PASS: `Cmd+Y` or `Cmd+Shift+Z` — Redo (when not editing text)
#### Selection
- [x] PASS: `Cmd+A` — Select all blocks on active slide
- [x] PASS: `Tab` — Cycle to next block
- [x] PASS: `Shift+Tab` — Cycle to previous block
#### Z-Order
- [x] PASS: `Cmd+]` — Bring Forward
- [x] PASS: `Cmd+Shift+]` — Bring to Front
- [x] PASS: `Cmd+[` — Send Backward
