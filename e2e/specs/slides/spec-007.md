# slides — Spec 007

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Properties Panel (Right Panel)
#### Animation Tab
- [x] PASS: **Preset selector:** Sequential Build, Fade All, Stagger, Results Reveal, None
- [x] PASS: "Apply Preset" button — applies selected preset to active slide
- [x] PASS: "Clear All" button — removes all animations from active slide
- [x] PASS: **Reveal Summary:**
- [x] PASS: Animated blocks count
- [x] PASS: Reveal steps count
- [x] PASS: Orders list
- [x] PASS: Note: "Per-block timing is edited from block properties or the timeline"

### Animation Timeline (Below Canvas)
- [x] PASS: Collapsible section with "Animation Timeline" header
- [x] PASS: Shows count of animated blocks
- [x] PASS: **Preview button** — plays animation sequence preview
- [x] PASS: "Previewing..." state while running (button disabled)
- [x] PASS: **Timeline track:**
- [x] PASS: Time axis with second markers (0s, 1s, 2s, etc.)
- [x] PASS: Order column showing reveal order numbers
- [x] PASS: Colored bars for each animated block
- [x] PASS: Bar width = duration; bar position = delay
- [x] PASS: Selected block's bar has ring highlight
- [x] PASS: Click bar to select corresponding block
- [x] PASS: **Drag interactions:**
- [x] PASS: Drag bar horizontally to change delay
- [x] PASS: Drag bar vertically to change reveal order
- [x] PASS: Drag left edge to resize start (adjust delay + duration)
- [x] PASS: Drag right edge to resize end (adjust duration)
- [x] PASS: Grid rows with dashed borders for order lanes
- [x] PASS: Color-coded bars cycle through 8 colors

### Theme Engine
- [x] PASS: `ThemeProvider` wraps slides in CSS custom properties
- [x] PASS: CSS variables exposed:
- [x] PASS: `--slide-primary`, `--slide-secondary`, `--slide-bg`, `--slide-text`
- [x] PASS: `--slide-accent`, `--slide-surface`, `--slide-border`
- [x] PASS: `--slide-code-bg`, `--slide-callout-bg`
- [x] PASS: `--slide-gradient-from`, `--slide-gradient-to`
- [x] PASS: `--slide-font`, `--slide-heading-font`
- [x] PASS: `isDarkTheme()` correctly identifies dark backgrounds
- [x] PASS: All block renderers inherit theme variables
