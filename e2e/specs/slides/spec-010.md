# slides — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Find & Replace Dialog
- [ ] **Replace:**
- [ ] Replace input field
- [ ] Replace current match
- [ ] Replace all matches
- [ ] Close button (X icon)

### Accessibility Panel
- [ ] **Accessibility Score:**
- [ ] Score ring visualization (0–100)
- [ ] Color-coded: green (≥80), yellow (≥50), red (<50)
- [ ] **Issue Categories:**
- [ ] Errors (red, XCircle icon)
- [ ] Warnings (yellow, Warning icon)
- [ ] Info (blue, Info icon)
- [ ] **Issue Cards:**
- [ ] Per-slide issues with slide title context
- [ ] Navigate to slide action
- [ ] Auto-fix action (suggests accessible colors)
- [ ] Uses `checkAccessibility()` and `suggestAccessibleColor()` helpers
- [ ] Checks contrast ratios, alt text, font sizes, etc.

### Presentation / Slideshow Mode
#### Entering Presentation Mode
- [ ] F5 — Start from first slide
- [ ] Shift+F5 — Start from current slide
- [ ] Present button in toolbar
#### Navigation
- [ ] Arrow Right / Click / Space — Next slide or next reveal step
- [ ] Arrow Left — Previous slide
- [ ] Number keys — Quick jump to slide (1.5s buffer for multi-digit)
- [ ] Touch swipe left/right for navigation
- [ ] Escape — Exit presentation mode
#### Slide Transitions
- [ ] **None** — Instant switch
- [ ] **Fade** — Opacity crossfade (0.3s)
- [ ] **Slide** — Horizontal slide with spring physics
- [ ] **Zoom** — Scale in/out (0.28s)
- [ ] **Morph** — Crossfade container + layoutId animation for matching elements
- [ ] Title morphing via `MORPH_TITLE_ID`
- [ ] Subtitle morphing via `MORPH_SUBTITLE_ID`
- [ ] Block morphing via `computeMorphIds()`
#### Block Reveal Animations
- [ ] Blocks animate in based on reveal order
