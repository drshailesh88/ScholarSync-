# slides-ai — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 8. Gamma Toolbar
- [ ] Escape cancels and reverts
- [ ] Blur commits the change
- [ ] Green dot = saved/idle
- [ ] Yellow pulsing dot = saving
- [ ] Red dot = error
- [ ] Tooltip shows status text
- [ ] Shows "X cards" (or "1 card" for singular)
- [ ] Updates dynamically as cards are added/removed
- [ ] Palette icon + theme name + caret
- [ ] Click opens `ThemeCustomizer` dropdown (320px wide)
- [ ] Click outside closes dropdown
- [ ] (See Section 13 for ThemeCustomizer details)
- [ ] Export icon + "Export" label + caret
- [ ] **Export PPTX:**
- [ ] PowerPoint logo icon
- [ ] Spinner during export
- [ ] Downloads `.pptx` file with sanitized title
- [ ] **Export PDF:**
- [ ] PDF icon
- [ ] Spinner during export
- [ ] Downloads `.pdf` file
- [ ] **Continue in Slides Mode:**
- [ ] MonitorPlay icon
- [ ] Confirmation dialog: "Switch to Slides view? Your cards will be displayed as fixed-ratio slides."
- [ ] Switches mode on confirm
- [ ] Export button disabled during export (shows spinner)
- [ ] Sparkle icon + "Agent" label
- [ ] Active state: brand/10 background, brand text, filled sparkle icon
- [ ] Inactive state: default border, muted text, regular sparkle icon
- [ ] Click toggles the right-side Agent Panel
- [ ] Play icon + "Present" label
- [ ] Brand-colored background (always visible)
- [ ] Launches presentation mode
#### 9. Card Outline Sidebar (Left Panel)
- [ ] "Outline" label in uppercase, small font
- [ ] Each card shows:
