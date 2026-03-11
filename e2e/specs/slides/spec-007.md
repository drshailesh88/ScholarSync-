# slides — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Properties Panel (Right Panel)
#### Animation Tab
- [ ] **Preset selector:** Sequential Build, Fade All, Stagger, Results Reveal, None
- [ ] "Apply Preset" button — applies selected preset to active slide
- [ ] "Clear All" button — removes all animations from active slide
- [ ] **Reveal Summary:**
- [ ] Animated blocks count
- [ ] Reveal steps count
- [ ] Orders list
- [ ] Note: "Per-block timing is edited from block properties or the timeline"

### Animation Timeline (Below Canvas)
- [ ] Collapsible section with "Animation Timeline" header
- [ ] Shows count of animated blocks
- [ ] **Preview button** — plays animation sequence preview
- [ ] "Previewing..." state while running (button disabled)
- [ ] **Timeline track:**
- [ ] Time axis with second markers (0s, 1s, 2s, etc.)
- [ ] Order column showing reveal order numbers
- [ ] Colored bars for each animated block
- [ ] Bar width = duration; bar position = delay
- [ ] Selected block's bar has ring highlight
- [ ] Click bar to select corresponding block
- [ ] **Drag interactions:**
- [ ] Drag bar horizontally to change delay
- [ ] Drag bar vertically to change reveal order
- [ ] Drag left edge to resize start (adjust delay + duration)
- [ ] Drag right edge to resize end (adjust duration)
- [ ] Grid rows with dashed borders for order lanes
- [ ] Color-coded bars cycle through 8 colors

### Theme Engine
- [ ] `ThemeProvider` wraps slides in CSS custom properties
- [ ] CSS variables exposed:
- [ ] `--slide-primary`, `--slide-secondary`, `--slide-bg`, `--slide-text`
- [ ] `--slide-accent`, `--slide-surface`, `--slide-border`
- [ ] `--slide-code-bg`, `--slide-callout-bg`
- [ ] `--slide-gradient-from`, `--slide-gradient-to`
- [ ] `--slide-font`, `--slide-heading-font`
- [ ] `isDarkTheme()` correctly identifies dark backgrounds
- [ ] All block renderers inherit theme variables
