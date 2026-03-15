# slides — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Properties Panel (Right Panel)
#### Background Section
- [x] PASS: Color stops editor
- [x] PASS: Uses theme colors as quick picks
- [x] PASS: **Image:**
- [x] PASS: URL input
- [x] PASS: Preview thumbnail
- [x] PASS: Image Position selector: Cover, Contain, Top, Center, Bottom
- [x] PASS: **Overlay** (shared across all types):
- [x] PASS: Overlay type: None, Frosted, Faded
- [x] PASS: Intensity slider (0–100%) when overlay active
- [x] PASS: Overlay color picker when overlay active
- [x] PASS: "Reset to Theme Default" button
#### Theme Section
- [x] PASS: Theme picker with preset themes
- [x] PASS: Clicking a theme applies it globally to the deck
- [x] PASS: Active theme is highlighted
#### Branding (Institution Kit)
- [x] PASS: Institution Name text input
- [x] PASS: Footer Text input
- [x] PASS: Logo URL input
- [x] PASS: Values persist across the deck
#### Layout Section
- [x] PASS: Layout picker with visual layout options
- [x] PASS: Changing layout updates the active slide immediately
- [x] PASS: Active layout is highlighted
#### Slide Master Section
- [x] PASS: Dropdown to select a master (or "No Master")
- [x] PASS: Applying a master also sets the slide's layout
- [x] PASS: "Edit Masters" button opens the Master Editor modal
#### Transition Section
- [x] PASS: 5 transition options: None, Fade, Slide, Zoom, Morph
- [x] PASS: Morph tooltip: "Automatically animates matching elements between slides"
- [x] PASS: Active transition highlighted per slide
- [x] PASS: "Apply to All Slides" button
- [x] PASS: Note: "Slides without a transition use the global default"
#### AI Tools Section
- [x] PASS: AI Tools dropdown for active slide
- [x] PASS: Operates on slide's title, subtitle, content blocks, speaker notes
- [x] PASS: "Apply" callback updates the slide
#### Coach Section
- [x] PASS: Coach panel with deck-wide analysis
- [x] PASS: Uses audience type for context
- [x] PASS: "Navigate to Slide" action from coach suggestions
