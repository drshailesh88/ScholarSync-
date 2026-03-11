# slides-ai — Spec 008

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 12. Card Sparkle Menu (Per-Card AI Actions)
- [ ] Each action displayed with icon + label
- [ ] Click triggers AI call to `/api/slides/chat`
- [ ] Loading spinner overlay covers the card during processing (absolute inset-0)
- [ ] Loading state disables further clicks
- [ ] Changes applied directly to slide (title, contentBlocks, speakerNotes, layout)
- [ ] Menu closes on outside click or Escape
#### 13. Card Background Picker
- [ ] Image icon button appears on hover of active card
- [ ] Opens a popover panel
- [ ] 12 preset color swatches (white, grays, blacks, pastels)
- [ ] Theme colors merged in
- [ ] Custom color picker
- [ ] Each swatch: 6x6 circle with check mark on selection
- [ ] Image URL text input is always shown
- [ ] Image position + overlay controls only appear after an image URL is entered
- [ ] **None** — no image
- [ ] **Top** — image above content (Rows icon)
- [ ] **Left** — image on left (Columns icon)
- [ ] **Right** — image on right (Columns flipped)
- [ ] **Fill** — full background (ArrowsOutSimple icon)
- [ ] Active option: brand/10 background + brand/30 border
- [ ] **Overlay Type:** None | Frosted | Faded | Clear (segmented buttons)
- [ ] Active: brand background + white text
- [ ] **Overlay Intensity slider** (0–100%) — shows current value
- [ ] **Overlay Color picker** — defaults to black (#000000)
- [ ] Clears all background settings to theme default
#### 14. Theme Customizer (Gamma Mode)
- [ ] Opens as dropdown from toolbar Theme button (320px wide)
- [ ] 4-column grid of theme swatches
- [ ] Each swatch shows: background color, primary color bar, text lines preview, theme name
- [ ] Active theme: brand border + ring + check mark badge
- [ ] Hover: scale 1.05
- [ ] Clicking a preset applies it globally
- [ ] Primary color picker with theme color swatches
- [ ] Background color picker
- [ ] Text color picker
- [ ] Accent color picker
