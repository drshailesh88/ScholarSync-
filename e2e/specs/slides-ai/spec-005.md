# slides-ai — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 8. Gamma Toolbar
- [x] PASS: Escape cancels and reverts
- [x] PASS: Blur commits the change
- [x] PASS: Green dot = saved/idle
- [x] PASS: Yellow pulsing dot = saving
- [x] PASS: Red dot = error
- [x] PASS: Tooltip shows status text
- [x] PASS: Shows "X cards" (or "1 card" for singular)
- [x] PASS: Updates dynamically as cards are added/removed
- [x] PASS: Palette icon + theme name + caret
- [x] PASS: Click opens `ThemeCustomizer` dropdown (320px wide)
- [x] PASS: Click outside closes dropdown
- [x] PASS: (See Section 13 for ThemeCustomizer details)
- [x] PASS: Export icon + "Export" label + caret
- [x] PASS: **Export PPTX:**
- [x] PASS: PowerPoint logo icon
- [x] PASS: Spinner during export
- [x] PASS: Downloads `.pptx` file with sanitized title
- [x] PASS: **Export PDF:**
- [x] PASS: PDF icon
- [x] PASS: Spinner during export
- [x] PASS: Downloads `.pdf` file
- [x] PASS: **Continue in Slides Mode:**
- [x] PASS: MonitorPlay icon
- [x] PASS: Confirmation dialog: "Switch to Slides view? Your cards will be displayed as fixed-ratio slides."
- [x] PASS: Switches mode on confirm
- [x] PASS: Export button disabled during export (shows spinner)
- [x] PASS: Sparkle icon + "Agent" label
- [x] PASS: Active state: brand/10 background, brand text, filled sparkle icon
- [x] PASS: Inactive state: default border, muted text, regular sparkle icon
- [x] PASS: Click toggles the right-side Agent Panel
- [x] PASS: Play icon + "Present" label
- [x] PASS: Brand-colored background (always visible)
- [x] PASS: Launches presentation mode
#### 9. Card Outline Sidebar (Left Panel)
- [x] PASS: "Outline" label in uppercase, small font
- [x] PASS: Each card shows:
