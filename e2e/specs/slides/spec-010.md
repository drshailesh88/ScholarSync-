# slides — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Find & Replace Dialog
- [x] PASS: **Replace:**
- [x] PASS: Replace input field
- [x] PASS: Replace current match
- [x] PASS: Replace all matches
- [x] PASS: Close button (X icon)

### Accessibility Panel
- [x] PASS: **Accessibility Score:**
- [x] PASS: Score ring visualization (0–100)
- [x] PASS: Color-coded: green (≥80), yellow (≥50), red (<50)
- [x] PASS: **Issue Categories:**
- [x] PASS: Errors (red, XCircle icon)
- [x] PASS: Warnings (yellow, Warning icon)
- [x] PASS: Info (blue, Info icon)
- [x] PASS: **Issue Cards:**
- [x] PASS: Per-slide issues with slide title context
- [x] PASS: Navigate to slide action
- [x] PASS: Auto-fix action (suggests accessible colors)
- [x] PASS: Uses `checkAccessibility()` and `suggestAccessibleColor()` helpers
- [x] PASS: Checks contrast ratios, alt text, font sizes, etc.

### Presentation / Slideshow Mode
#### Entering Presentation Mode
- [x] PASS: F5 — Start from first slide
- [x] PASS: Shift+F5 — Start from current slide
- [x] PASS: Present button in toolbar
#### Navigation
- [x] PASS: Arrow Right / Click / Space — Next slide or next reveal step
- [x] PASS: Arrow Left — Previous slide
- [x] PASS: Number keys — Quick jump to slide (1.5s buffer for multi-digit)
- [x] PASS: Touch swipe left/right for navigation
- [x] PASS: Escape — Exit presentation mode
#### Slide Transitions
- [x] PASS: **None** — Instant switch
- [x] PASS: **Fade** — Opacity crossfade (0.3s)
- [x] PASS: **Slide** — Horizontal slide with spring physics
- [x] PASS: **Zoom** — Scale in/out (0.28s)
- [x] PASS: **Morph** — Crossfade container + layoutId animation for matching elements
- [x] PASS: Title morphing via `MORPH_TITLE_ID`
- [x] PASS: Subtitle morphing via `MORPH_SUBTITLE_ID`
- [x] PASS: Block morphing via `computeMorphIds()`
#### Block Reveal Animations
- [x] PASS: Blocks animate in based on reveal order
