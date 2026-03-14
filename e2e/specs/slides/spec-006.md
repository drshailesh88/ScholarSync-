# slides — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Properties Panel (Right Panel)
#### Background Section
- [ ] Color stops editor
- [ ] Uses theme colors as quick picks
- [ ] **Image:**
- [ ] URL input
- [ ] Preview thumbnail
- [ ] Image Position selector: Cover, Contain, Top, Center, Bottom
- [ ] **Overlay** (shared across all types):
- [ ] Overlay type: None, Frosted, Faded
- [ ] Intensity slider (0–100%) when overlay active
- [ ] Overlay color picker when overlay active
- [ ] "Reset to Theme Default" button
#### Theme Section
- [ ] Theme picker with preset themes
- [ ] Clicking a theme applies it globally to the deck
- [ ] Active theme is highlighted
#### Branding (Institution Kit)
- [ ] Institution Name text input
- [ ] Footer Text input
- [ ] Logo URL input
- [ ] Values persist across the deck
#### Layout Section
- [ ] Layout picker with visual layout options
- [ ] Changing layout updates the active slide immediately
- [ ] Active layout is highlighted
#### Slide Master Section
- [ ] Dropdown to select a master (or "No Master")
- [ ] Applying a master also sets the slide's layout
- [ ] "Edit Masters" button opens the Master Editor modal
#### Transition Section
- [ ] 5 transition options: None, Fade, Slide, Zoom, Morph
- [ ] Morph tooltip: "Automatically animates matching elements between slides"
- [ ] Active transition highlighted per slide
- [ ] "Apply to All Slides" button
- [ ] Note: "Slides without a transition use the global default"
#### AI Tools Section
- [ ] AI Tools dropdown for active slide
- [ ] Operates on slide's title, subtitle, content blocks, speaker notes
- [ ] "Apply" callback updates the slide
#### Coach Section
- [ ] Coach panel with deck-wide analysis
- [ ] Uses audience type for context
- [ ] "Navigate to Slide" action from coach suggestions
