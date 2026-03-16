# slides-ai — Spec 008

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 12. Card Sparkle Menu (Per-Card AI Actions)
- [x] PASS: Each action displayed with icon + label
- [x] PASS: Click triggers AI call to `/api/slides/chat`
- [x] PASS: Loading spinner overlay covers the card during processing (absolute inset-0)
- [x] PASS: Loading state disables further clicks
- [x] PASS: Changes applied directly to slide (title, contentBlocks, speakerNotes, layout)
- [x] PASS: Menu closes on outside click or Escape
#### 13. Card Background Picker
- [x] PASS: Image icon button appears on hover of active card
- [x] PASS: Opens a popover panel
- [x] PASS: 12 preset color swatches (white, grays, blacks, pastels)
- [x] PASS: Theme colors merged in
- [x] PASS: Custom color picker
- [x] PASS: Each swatch: 6x6 circle with check mark on selection
- [x] PASS: Image URL text input is always shown
- [x] PASS: Image position + overlay controls only appear after an image URL is entered
- [x] PASS: **None** — no image
- [x] PASS: **Top** — image above content (Rows icon)
- [x] PASS: **Left** — image on left (Columns icon)
- [x] PASS: **Right** — image on right (Columns flipped)
- [x] PASS: **Fill** — full background (ArrowsOutSimple icon)
- [x] PASS: Active option: brand/10 background + brand/30 border
- [x] PASS: **Overlay Type:** None | Frosted | Faded | Clear (segmented buttons)
- [x] PASS: Active: brand background + white text
- [x] PASS: **Overlay Intensity slider** (0–100%) — shows current value
- [x] PASS: **Overlay Color picker** — defaults to black (#000000)
- [x] PASS: Clears all background settings to theme default
#### 14. Theme Customizer (Gamma Mode)
- [x] PASS: Opens as dropdown from toolbar Theme button (320px wide)
- [x] PASS: 4-column grid of theme swatches
- [x] PASS: Each swatch shows: background color, primary color bar, text lines preview, theme name
- [x] PASS: Active theme: brand border + ring + check mark badge
- [x] PASS: Hover: scale 1.05
- [x] PASS: Clicking a preset applies it globally
- [x] PASS: Primary color picker with theme color swatches
- [x] PASS: Background color picker
- [x] PASS: Text color picker
- [x] PASS: Accent color picker
