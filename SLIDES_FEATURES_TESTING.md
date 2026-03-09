# ScholarSync — Slides (PowerPoint Mode) Feature Testing Checklist

> **Scope:** Features on the Slides / PowerPoint mode **only** (excludes AI mode and Gamma mode).
> Generated from source code in `src/components/slides/`, `src/components/presentation/`, `src/stores/slides-store.ts`, and related modules.

---

## 1. Deck List Page (`/slides`)

- [ ] Page loads and displays existing decks
- [ ] "New Presentation" button navigates to `/slides/new`
- [ ] **PPTX Import:**
  - [ ] "Import PPTX" button opens file picker
  - [ ] Accepts `.pptx` files up to 50 MB
  - [ ] Rejects files over 50 MB with error message
  - [ ] Detects password-protected files and shows warning
  - [ ] Shows import preview with up to 6 slide thumbnails
  - [ ] Displays import warnings (unsupported features, etc.)
  - [ ] "Confirm Import" creates a new deck from the PPTX
  - [ ] Cancel dismisses the import dialog
- [ ] Each deck card shows title, thumbnail, slide count
- [ ] Click a deck to open it in the slides editor

---

## 2. New Presentation Wizard (`/slides/new`)

### Step 1 — Topic
- [ ] Text input for presentation topic
- [ ] Topic field is required before advancing

### Step 2 — Audience
- [ ] 7 audience type options displayed:
  - [ ] General
  - [ ] Conference
  - [ ] Thesis Defense
  - [ ] Journal Club
  - [ ] Classroom
  - [ ] Grant Presentation
  - [ ] Poster Session
- [ ] Selecting an audience type highlights it
- [ ] Can proceed to next step after selection

### Step 3 — Theme
- [ ] 8 preset themes displayed with previews
- [ ] Clicking a theme selects it (visual highlight)
- [ ] "Create" button submits and generates the deck
- [ ] After creation, redirects to the slides editor
- [ ] Initial title slide is created immediately; remaining slides generate in background

---

## 3. Workspace Layout

- [ ] Three-panel layout: Filmstrip (left) | Canvas (center) | Properties Panel (right)
- [ ] Speaker Notes bar at the bottom (collapsible)
- [ ] Canvas rulers toggle on/off
- [ ] Grid overlay toggle on/off
- [ ] Top toolbar with mode controls, save status, present button

---

## 4. Slide Filmstrip (Left Panel)

### Slide Thumbnails
- [ ] All slides displayed as thumbnails with slide numbers
- [ ] Active slide has a highlighted border
- [ ] Clicking a thumbnail activates that slide
- [ ] Shift+Click toggles multi-slide selection
- [ ] Hidden slides appear at 50% opacity with an eye-slash icon
- [ ] Regenerating slides show "Regenerating..." status label
- [ ] Collaboration presence dots shown per slide

### Drag-to-Reorder
- [ ] Drag handle appears on hover (6-dot icon)
- [ ] Dragging a slide reorders it in the filmstrip
- [ ] Drop target highlights correctly
- [ ] Reorder persists after release

### Add Slide
- [ ] "+ Add Slide" button at bottom of filmstrip
- [ ] New slide inserted after active slide

### Filmstrip Context Menu (Right-Click)
- [ ] **New Slide** — inserts after the right-clicked slide
- [ ] **Duplicate Slide** — creates a copy
- [ ] **Copy Slide** — copies to clipboard
- [ ] **Cut Slide** — copies and removes (disabled if only 1 slide)
- [ ] **Paste Slide** — pastes from clipboard (disabled if clipboard empty)
- [ ] **Move to Beginning** — moves slide to position 1
- [ ] **Move to End** — moves slide to last position
- [ ] **Regenerate with AI...** — opens regenerate dialog
- [ ] **Regenerate Selected Slides...** — batch regenerate (multi-select)
- [ ] **Hide Slide** — toggles hidden flag
- [ ] **Change Layout...** — submenu with all standard layouts
- [ ] **Apply Master...** — submenu with "No Master" + all masters
- [ ] **Export as PNG HD** — exports current slide as PNG (Shift+Click = 3x scale)
- [ ] **Export as SVG** — exports current slide as SVG
- [ ] **Delete Slide** — removes slide (disabled if only 1 slide, red/danger style)

---

## 5. WYSIWYG Canvas (Center Panel)

### Title & Subtitle Editing
- [ ] Click on title text to enter inline edit mode
- [ ] Click on subtitle text to enter inline edit mode
- [ ] Changes save on blur / click away
- [ ] Master slide placeholder prompts shown when empty

### Block Selection
- [ ] Click a block to select it (blue selection outline)
- [ ] Shift+Click to add/remove from multi-selection
- [ ] Click on canvas background deselects all blocks
- [ ] Marquee/rubber-band selection by dragging on empty canvas area
- [ ] Tab cycles to next block; Shift+Tab cycles to previous
- [ ] Cmd+A selects all blocks on the active slide
- [ ] Escape deselects all (or exits editing mode first)

### Block Editing
- [ ] Double-click a text/bullets/quote block to enter inline edit mode
- [ ] Editing state tracked globally (for keyboard shortcuts awareness)
- [ ] Click outside the editing block to exit edit mode
- [ ] Escape exits edit mode

### Block Positioning (Drag & Resize)
- [ ] Drag blocks to reposition them on the canvas
- [ ] Resize handles on selected blocks
- [ ] Multi-block group move (drag one selected block, all move together)
- [ ] Grid snap when `snapToGrid` is enabled
- [ ] Position values in percentage-based coordinates (0–100)

### Block Z-Order
- [ ] Cmd+] — Bring Forward
- [ ] Cmd+Shift+] — Bring to Front
- [ ] Cmd+[ — Send Backward
- [ ] Cmd+Shift+[ — Send to Back

### Block Lock/Unlock
- [ ] Cmd+L — Toggle lock on selected block
- [ ] Locked blocks cannot be moved, resized, or deleted
- [ ] Lock/unlock icons displayed on locked blocks

### Block Clipboard
- [ ] Cmd+C — Copy selected block(s)
- [ ] Cmd+X — Cut selected block(s)
- [ ] Cmd+V — Paste block(s) from clipboard
- [ ] Delete/Backspace — Delete selected block(s) (respects lock)

### Canvas Context Menu (Right-Click on block)
- [ ] Context menu appears at cursor position
- [ ] Contains block-specific actions (copy, cut, delete, z-order, lock)
- [ ] Submenu support with hover-reveal
- [ ] Escape or click outside closes the menu
- [ ] Scroll closes the menu

### Slide Regenerate Dialog
- [ ] Opened from context menu "Regenerate with AI..."
- [ ] Instruction text input
- [ ] Tone selector (RegenerateTone)
- [ ] Submit regenerates the slide content
- [ ] Dialog closes on cancel or after successful regeneration

### Canvas Rulers
- [ ] Toggle rulers on/off from canvas controls
- [ ] Show percentage-based coordinates (switchable unit: percent)
- [ ] Mouse position indicator on rulers tracks cursor
- [ ] Selected block bounds highlighted on rulers

### Grid Overlay
- [ ] Toggle grid on/off
- [ ] Configurable grid size
- [ ] Snap-to-grid toggle
- [ ] Grid renders as dotted overlay on the canvas

### Animation Preview on Canvas
- [ ] Preview button in animation timeline triggers on-canvas preview
- [ ] Blocks animate in sequence according to their animation settings
- [ ] Preview state resets after completion

---

## 6. Block Types (Insert Menu)

### Content Blocks
- [ ] **Text** — Rich text block with body/heading styles
- [ ] **Bullets** — Ordered/unordered list block
- [ ] **Quote** — Quote with attribution
- [ ] **Shape** — Vector shapes with submenu of shape types:
  - [ ] Rectangles, circles, triangles, arrows, stars, hearts, etc.
  - [ ] Line shapes (no fill, stroke only)
  - [ ] Shape type submenu grouped by category
- [ ] **Citation** — Claim text + source reference
- [ ] **Divider** — Horizontal separator (solid style)
- [ ] **Toggle** — Expandable/collapsible content section
- [ ] **Nested Card** — Sub-section card with nested content blocks

### Media Blocks
- [ ] **Image** — Image with alt text and suggestion field
- [ ] **Chart** — Bar, line, pie charts with labels + datasets
- [ ] **Table** — Headers + rows grid
- [ ] **Infographic** — Process flow, comparison, and other infographic types
- [ ] **Illustration** — SVG-based scientific illustration with caption
- [ ] **Media** — Video/audio embed (URL, autoplay, loop, muted options)
- [ ] **Embed** — Generic URL embed (iframe)

### Academic Blocks
- [ ] **Equation (Math)** — LaTeX math expression with display mode
- [ ] **Diagram** — Mermaid syntax diagram (flowchart, sequence, etc.)
- [ ] **Code** — Syntax-highlighted code block with language selector
- [ ] **Callout** — Info/warning/error callout box
- [ ] **Statistic** — Key metric with label, value, interpretation
- [ ] **Bibliography** — Reference list with citation style
- [ ] **Timeline** — Timeline entries with dates, labels, status

---

## 7. Insert Menu

- [ ] Opens from toolbar button (anchored to button position)
- [ ] Search bar with live filtering ("Search blocks...")
- [ ] Blocks organized by category: Content | Media | Academic
- [ ] Category headers shown
- [ ] Keyboard navigation: Arrow Up/Down to move, Enter to insert
- [ ] Escape closes the menu
- [ ] Click outside closes the menu
- [ ] Shape block shows expandable submenu with shape grid (4 columns)
- [ ] Shape categories: geometric shapes grouped by type
- [ ] AI Visualize button (sparkle icon) for diagram, infographic, chart types
- [ ] Empty state: "No blocks found" when search yields no results

---

## 8. Block Inserter (Canvas)

- [ ] "+" inserter button on the canvas for quick block insertion
- [ ] Inserts block at a default position on the slide
- [ ] Uses `createDefaultBlock()` factory with type-specific defaults

---

## 9. Properties Panel (Right Panel)

### Design / Animation Tab Toggle
- [ ] Two tabs: "Design" and "Animation"
- [ ] Switching tabs shows the corresponding section

### Selection Section (Single Block)
- [ ] Shows "Align selected block to canvas" controls
- [ ] 6 alignment buttons: Left, Center, Right, Top, Middle, Bottom
- [ ] **Rotation** controls:
  - [ ] Numeric input (0–360 degrees)
  - [ ] Quick-set buttons: 0°, 90°, 180°, 270°
  - [ ] Flip Horizontal button
  - [ ] Flip Vertical button

### Selection Section (Multi-Block: 2+ blocks)
- [ ] Shows count of selected blocks (e.g., "3 blocks selected")
- [ ] "Delete All" button (red/danger)
- [ ] **Align** — 6 buttons: Left, Center, Right, Top, Middle, Bottom
- [ ] **Distribute** — Horizontal and Vertical (disabled if < 3 blocks)

### Block Properties
- [ ] Shown when exactly one non-text block is selected
- [ ] `BlockPropertyEditor` renders type-specific controls
- [ ] Properties vary by block type (chart data, image URL, code language, etc.)

### Background Section
- [ ] **Background Type toggle:** Solid | Gradient | Image
- [ ] **Solid:** Color picker with theme color swatches
- [ ] **Gradient:** Gradient editor with:
  - [ ] Type selector (linear)
  - [ ] Angle control
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

### Theme Section
- [ ] Theme picker with preset themes
- [ ] Clicking a theme applies it globally to the deck
- [ ] Active theme is highlighted

### Branding (Institution Kit)
- [ ] Institution Name text input
- [ ] Footer Text input
- [ ] Logo URL input
- [ ] Values persist across the deck

### Layout Section
- [ ] Layout picker with visual layout options
- [ ] Changing layout updates the active slide immediately
- [ ] Active layout is highlighted

### Slide Master Section
- [ ] Dropdown to select a master (or "No Master")
- [ ] Applying a master also sets the slide's layout
- [ ] "Edit Masters" button opens the Master Editor modal

### Transition Section
- [ ] 5 transition options: None, Fade, Slide, Zoom, Morph
- [ ] Morph tooltip: "Automatically animates matching elements between slides"
- [ ] Active transition highlighted per slide
- [ ] "Apply to All Slides" button
- [ ] Note: "Slides without a transition use the global default"

### AI Tools Section
- [ ] AI Tools dropdown for active slide
- [ ] Operates on slide's title, subtitle, content blocks, speaker notes
- [ ] "Apply" callback updates the slide

### Coach Section
- [ ] Coach panel with deck-wide analysis
- [ ] Uses audience type for context
- [ ] "Navigate to Slide" action from coach suggestions

### Animation Tab
- [ ] **Preset selector:** Sequential Build, Fade All, Stagger, Results Reveal, None
- [ ] "Apply Preset" button — applies selected preset to active slide
- [ ] "Clear All" button — removes all animations from active slide
- [ ] **Reveal Summary:**
  - [ ] Animated blocks count
  - [ ] Reveal steps count
  - [ ] Orders list
  - [ ] Note: "Per-block timing is edited from block properties or the timeline"

---

## 10. Animation Timeline (Below Canvas)

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

---

## 11. Theme Engine

- [ ] `ThemeProvider` wraps slides in CSS custom properties
- [ ] CSS variables exposed:
  - [ ] `--slide-primary`, `--slide-secondary`, `--slide-bg`, `--slide-text`
  - [ ] `--slide-accent`, `--slide-surface`, `--slide-border`
  - [ ] `--slide-code-bg`, `--slide-callout-bg`
  - [ ] `--slide-gradient-from`, `--slide-gradient-to`
  - [ ] `--slide-font`, `--slide-heading-font`
- [ ] `isDarkTheme()` correctly identifies dark backgrounds
- [ ] All block renderers inherit theme variables

---

## 12. Custom Theme Builder

- [ ] Opens as a modal dialog
- [ ] **Color Pickers:**
  - [ ] Primary Color
  - [ ] Secondary Color
  - [ ] Background Color
  - [ ] Text Color
  - [ ] Accent Color
  - [ ] Surface Color
  - [ ] Border Color
  - [ ] Code Background
  - [ ] Callout Background
- [ ] **Font Selectors:**
  - [ ] Body Font (12 options: Inter, Arial, Helvetica, Times New Roman, Georgia, Palatino, Garamond, Courier New, Montserrat, Roboto, Playfair Display, Merriweather)
  - [ ] Heading Font (same options)
- [ ] **Font Size Scale:** Compact, Default, Large
- [ ] **Border Radius:** None, SM, MD, LG, XL
- [ ] **Shadow Style:** None, Subtle, Medium, Dramatic
- [ ] **Card Spacing:** Compact, Comfortable, Spacious
- [ ] **Border Style:** None, Subtle, Strong
- [ ] Theme name input
- [ ] Live preview updates as values change
- [ ] Save applies theme to the deck

---

## 13. Slide Master Editor

- [ ] Opens as a modal from Properties Panel "Edit Masters"
- [ ] List of existing masters in sidebar
- [ ] "New Master" button creates a master with defaults
- [ ] **Master settings:**
  - [ ] Name input
  - [ ] Layout picker (from standard layouts)
  - [ ] Show Slide Number toggle
  - [ ] Show Footer toggle
- [ ] **Fixed Blocks:**
  - [ ] Add/remove fixed blocks (logo, watermark, etc.)
  - [ ] Position editor (x, y, width, height in %)
- [ ] **Placeholders:**
  - [ ] Add/remove placeholder regions
  - [ ] Position editor for each placeholder
  - [ ] Placeholder prompt text
- [ ] Live preview with `SlideRendererV2`
- [ ] Delete Master button (with Trash icon)
- [ ] Changes apply to all slides using that master

---

## 14. Context Menu System

- [ ] Context menu appears at cursor position on right-click
- [ ] Menu auto-positions to stay within viewport bounds
- [ ] Animated entrance (scale + opacity transition)
- [ ] **Item types:**
  - [ ] Regular items with icon, label, optional shortcut
  - [ ] Divider lines
  - [ ] Danger items (red text)
  - [ ] Disabled items (grayed out, non-interactive)
  - [ ] Submenu items (caret-right icon, hover to reveal)
- [ ] Click outside closes the menu
- [ ] Escape closes the menu
- [ ] Scroll closes the menu

---

## 15. Speaker Notes Bar (Bottom)

- [ ] Collapsed by default (shows "Speaker Notes" toggle button)
- [ ] Click to expand/collapse (caret icon toggles)
- [ ] Textarea for typing speaker notes
- [ ] Placeholder: "Click to add speaker notes..."
- [ ] Notes auto-save to the active slide
- [ ] 3-row default height, non-resizable

---

## 16. Find & Replace Dialog

- [ ] Triggered by Cmd+F keyboard shortcut
- [ ] Toggles on/off (Cmd+F again closes)
- [ ] **Search fields scanned:**
  - [ ] Slide title
  - [ ] Slide subtitle
  - [ ] Speaker notes
  - [ ] All string-valued block data properties
- [ ] **Match navigation:**
  - [ ] Up/Down arrows cycle through matches
  - [ ] Match count displayed
  - [ ] Navigates to the slide containing the active match
- [ ] **Case sensitivity toggle**
- [ ] **Replace:**
  - [ ] Replace input field
  - [ ] Replace current match
  - [ ] Replace all matches
- [ ] Close button (X icon)

---

## 17. Accessibility Panel

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

---

## 18. Presentation / Slideshow Mode

### Entering Presentation Mode
- [ ] F5 — Start from first slide
- [ ] Shift+F5 — Start from current slide
- [ ] Present button in toolbar

### Navigation
- [ ] Arrow Right / Click / Space — Next slide or next reveal step
- [ ] Arrow Left — Previous slide
- [ ] Number keys — Quick jump to slide (1.5s buffer for multi-digit)
- [ ] Touch swipe left/right for navigation
- [ ] Escape — Exit presentation mode

### Slide Transitions
- [ ] **None** — Instant switch
- [ ] **Fade** — Opacity crossfade (0.3s)
- [ ] **Slide** — Horizontal slide with spring physics
- [ ] **Zoom** — Scale in/out (0.28s)
- [ ] **Morph** — Crossfade container + layoutId animation for matching elements
  - [ ] Title morphing via `MORPH_TITLE_ID`
  - [ ] Subtitle morphing via `MORPH_SUBTITLE_ID`
  - [ ] Block morphing via `computeMorphIds()`

### Block Reveal Animations
- [ ] Blocks animate in based on reveal order
- [ ] Click advances to next reveal step
- [ ] Auto-triggered steps play automatically after click-triggered steps
- [ ] Reveal order resets when changing slides
- [ ] Animation sequencer computes timing from block animation metadata
- [ ] Step counter shows current step / total click steps

### Presenter View
- [ ] Toggle presenter panel on/off
- [ ] **Current slide preview** (large)
- [ ] **Next slide preview**
- [ ] **Speaker notes** with markdown rendering (ReactMarkdown + remarkGfm)
- [ ] **Notes font size:** Small, Medium, Large
- [ ] **Timer:**
  - [ ] Elapsed time counter
  - [ ] Pause/Resume toggle
- [ ] **Screen modes:**
  - [ ] Normal
  - [ ] Black screen (Moon icon)
  - [ ] White screen (Sun icon)
- [ ] **Slide counter** — "Slide X of Y"
- [ ] **Jump to slide** — Number input or typed number buffer

### Hidden Slides
- [ ] Hidden slides are filtered out of the visible slides array
- [ ] Presenter can only navigate through visible slides

---

## 19. Keyboard Shortcuts (Global)

### File & View
- [ ] `Cmd+S` — Save (prevents browser default)
- [ ] `Cmd+F` — Toggle Find & Replace dialog
- [ ] `Cmd+Shift+V` — Toggle Visualize Popover (when not in editable target)

### Presentation
- [ ] `F5` — Present from beginning
- [ ] `Shift+F5` — Present from current slide
- [ ] `Escape` — Exit editing → Deselect all → Exit presenting (cascading)

### Undo / Redo
- [ ] `Cmd+Z` — Undo (when not editing text)
- [ ] `Cmd+Y` or `Cmd+Shift+Z` — Redo (when not editing text)

### Selection
- [ ] `Cmd+A` — Select all blocks on active slide
- [ ] `Tab` — Cycle to next block
- [ ] `Shift+Tab` — Cycle to previous block

### Z-Order
- [ ] `Cmd+]` — Bring Forward
- [ ] `Cmd+Shift+]` — Bring to Front
- [ ] `Cmd+[` — Send Backward
- [ ] `Cmd+Shift+[` — Send to Back

### Block Operations
- [ ] `Cmd+L` — Toggle Lock on selected block
- [ ] `Cmd+G` — Group (TODO/placeholder)
- [ ] `Cmd+Shift+G` — Ungroup (TODO/placeholder)
- [ ] `Delete` / `Backspace` — Delete selected blocks (respects lock)

### Slide Operations
- [ ] `Cmd+Shift+D` — Duplicate active slide
- [ ] `Cmd+C` — Copy block (if block selected) or copy slide (if no block selected)
- [ ] `Cmd+X` — Cut selected block(s)
- [ ] `Cmd+V` — Paste block (if blocks in clipboard) or paste slide

### Navigation
- [ ] `Home` — Jump to first slide
- [ ] `End` — Jump to last slide
- [ ] `PageUp` — Previous slide
- [ ] `PageDown` — Next slide

### Smart Target Detection
- [ ] Shortcuts disabled when typing in INPUT, TEXTAREA, or contentEditable elements
- [ ] Undo/Redo disabled when editing a block
- [ ] Z-order shortcuts only work when block is selected (not "select all")

---

## 20. Slide Background System

### Background Types
- [ ] **Solid Color** — Single color from ColorPicker
- [ ] **Gradient** — Linear gradient with configurable angle and color stops
- [ ] **Image** — Background image with URL

### Image Position Options
- [ ] Cover
- [ ] Contain
- [ ] Top
- [ ] Center
- [ ] Bottom

### Overlay System
- [ ] **None** — No overlay
- [ ] **Frosted** — Frosted glass effect
- [ ] **Faded** — Semi-transparent color overlay
- [ ] Overlay Intensity slider (0–100%)
- [ ] Overlay Color picker
- [ ] Overlay style correctly renders in both editor and presenter

### Per-Slide Override
- [ ] Each slide can override the theme background
- [ ] "Reset to Theme Default" removes the override
- [ ] Background changes reflect in filmstrip thumbnails

---

## 21. Alignment & Layout Engine

### Single Block → Canvas Alignment
- [ ] Align Left (x = 0)
- [ ] Align Center (x = 50 - width/2)
- [ ] Align Right (x = 100 - width)
- [ ] Align Top (y = 0)
- [ ] Align Middle (y = 50 - height/2)
- [ ] Align Bottom (y = 100 - height)
- [ ] Clamped to stay within canvas bounds

### Multi-Block Alignment (2+ blocks)
- [ ] Align Left — all blocks to leftmost edge
- [ ] Align Center — all blocks to horizontal center of bounding box
- [ ] Align Right — all blocks to rightmost edge
- [ ] Align Top — all blocks to topmost edge
- [ ] Align Middle — all blocks to vertical center of bounding box
- [ ] Align Bottom — all blocks to bottommost edge

### Distribution (3+ blocks)
- [ ] Distribute Horizontally — equal center spacing
- [ ] Distribute Vertically — equal center spacing
- [ ] Disabled when fewer than 3 blocks selected
- [ ] First and last positions anchored; middle blocks redistributed

### Slide Layout Engine
- [ ] `computeLayout()` calculates regions for slide layouts
- [ ] `regionToCSS()` converts regions to CSS positioning
- [ ] Multiple layout types supported (title_content, two_column, etc.)

---

## 22. Collaboration Features

- [ ] **Presence Dots** — shown on filmstrip slides (`PresenceDotsSlot`)
- [ ] **Remote Cursors** — rendered on canvas (`RemoteCursorsSlot`)
- [ ] Collaboration slots integrate with collaboration provider
- [ ] Multi-user editing awareness on slides

---

## 23. Export Options

### Slide Image Export (from Filmstrip Context Menu)
- [ ] **PNG Export:**
  - [ ] Default 2x scale
  - [ ] Shift+Click for 3x scale (HD)
  - [ ] Renders slide at 1920px width via offscreen `SlideRendererV2`
  - [ ] Waits for fonts to load before capture
  - [ ] Downloads with filename: `{DeckTitle}_slide_{number}_{SlideTitle}.png`
- [ ] **SVG Export:**
  - [ ] Exports as SVG markup
  - [ ] Downloads with `.svg` extension

### Handout Export Dialog
- [ ] Opens from export controls
- [ ] **Layout options:**
  - [ ] Full Slide — 1 per page, landscape
  - [ ] 2 Slides — Portrait, stacked
  - [ ] 3 Slides + Notes — Slides left, notes right
  - [ ] 6 Slides — Grid layout
  - [ ] Outline — Text-based outline
- [ ] **Options:**
  - [ ] Include slide numbers toggle
  - [ ] Include header toggle
  - [ ] Include speaker notes toggle
  - [ ] Paper size: Letter / A4
- [ ] Export button with loading state
- [ ] Close button

---

## 24. Color Picker

- [ ] Color input field
- [ ] Visual color picker interface
- [ ] Theme color swatches (primary, secondary, accent, text, background)
- [ ] Configurable placement (e.g., "right")
- [ ] Used throughout: background, overlay, custom theme builder, master editor

---

## 25. Gradient Editor

- [ ] Gradient type (linear)
- [ ] Angle control
- [ ] Color stops with position
- [ ] Add/remove color stops
- [ ] Theme color quick picks
- [ ] Live preview of gradient

---

## 26. Inline Text Editing (WYSIWYG Blocks)

### Editable Text Block
- [ ] Double-click to enter edit mode
- [ ] ContentEditable text editing
- [ ] Text formatting options available during editing
- [ ] Exit edit on Escape or click outside

### Editable Bullets Block
- [ ] Double-click to edit bullet items
- [ ] Add/remove bullet points
- [ ] Toggle ordered/unordered

### Editable Table Block
- [ ] Click cells to edit content
- [ ] Add/remove rows and columns
- [ ] Cell text editing

---

## 27. Slide Renderer V2

- [ ] Renders slides with full fidelity in all contexts:
  - [ ] Canvas WYSIWYG editor
  - [ ] Filmstrip thumbnails
  - [ ] Presenter mode
  - [ ] Image export
- [ ] Supports all layout types
- [ ] Applies theme via ThemeProvider
- [ ] Renders master slide fixed blocks and placeholders
- [ ] Handles card background (solid, gradient, image + overlay)
- [ ] Shows slide numbers
- [ ] Renders institution kit (logo, footer, name)
- [ ] Block animation CSS stylesheet applied

---

## 28. Undo / Redo System

- [ ] Cmd+Z undoes the last canvas/slide change
- [ ] Cmd+Y / Cmd+Shift+Z redoes
- [ ] Undo/redo disabled when inside text editing
- [ ] Undo/redo scoped to slides store state changes

---

## 29. Visualize Popover

- [ ] Cmd+Shift+V toggles the visualize popover
- [ ] Provides AI-powered visualization of selected content
- [ ] Only activates when not in an editable text target

---

## 30. Quick Test Workflows

### Workflow A: Create and Edit a Deck
1. [ ] Navigate to `/slides/new`
2. [ ] Enter topic, select audience, pick theme
3. [ ] Deck creates and opens in editor
4. [ ] Click a slide in filmstrip → canvas shows that slide
5. [ ] Double-click title to edit → type new title
6. [ ] Open insert menu → add a Chart block
7. [ ] Drag chart to reposition
8. [ ] Open Properties Panel → change background to gradient
9. [ ] Cmd+S to save

### Workflow B: Presentation Mode
1. [ ] Open a deck with multiple slides
2. [ ] Press F5 to present from beginning
3. [ ] Arrow Right to advance slides
4. [ ] Verify transitions (fade, slide, zoom, morph)
5. [ ] Check block reveal animations step through
6. [ ] Toggle presenter view → see notes + timer + next slide
7. [ ] Press Escape to exit

### Workflow C: PPTX Import
1. [ ] Go to `/slides`
2. [ ] Click Import PPTX
3. [ ] Select a `.pptx` file
4. [ ] Review preview (up to 6 slides shown)
5. [ ] Confirm import → deck created with imported slides
6. [ ] Verify slides render correctly in editor

### Workflow D: Reorder & Manage Slides
1. [ ] Drag slides in filmstrip to reorder
2. [ ] Right-click → Duplicate Slide
3. [ ] Right-click → Hide Slide → verify dimmed in filmstrip
4. [ ] Right-click → Change Layout → pick a layout
5. [ ] Cmd+Shift+D to duplicate active slide
6. [ ] Delete a slide from context menu

### Workflow E: Animation Setup
1. [ ] Select a block on a slide
2. [ ] Go to Properties Panel → Animation tab
3. [ ] Select "Sequential Build" preset → Apply Preset
4. [ ] Check Animation Timeline shows bars
5. [ ] Drag bars to adjust timing
6. [ ] Click Preview to see animation
7. [ ] Present the slide to verify animations play correctly

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] `/slides` loads decks via `getUserDecks()` and normalizes missing fields to fallback values before rendering
- [ ] Slides list ignores deck-load errors silently and still exits the loading state
- [ ] Slides list loading state is a centered spinner only, not skeleton cards
- [ ] Header subtitle on `/slides` reads `Create, import, and manage your slide decks`
- [ ] Primary create CTA label on `/slides` is `Create New`
- [ ] Import CTA label on `/slides` is `Import Presentation`
- [ ] Import flow uses a hidden file input triggered by the header button and the empty-state button
- [ ] Import accepts `.pptx` extension and PowerPoint MIME type through the native file input `accept` attribute
- [ ] Import preview is rendered inline on the page beneath the header rather than in a modal dialog
- [ ] Import state card remains visible whenever `importPhase !== "idle"` or a preview/error exists
- [ ] Import state card header text is always `Import Presentation`
- [ ] Import state card includes a close `X` button that fully resets import phase, preview, and error state
- [ ] Import phase copy changes between parsing, ready, importing, and idle-with-error states
- [ ] Import progress chips are labeled `Extracting preview` and `Creating deck`
- [ ] Active import chip shows a spinning `CircleNotch`; completed chip shows a static dot
- [ ] Selecting a non-`.pptx` file shows `Please upload a .pptx file`
- [ ] Selecting a file over the max size shows `File exceeds 50MB limit`
- [ ] Selecting a password-protected deck shows `Password-protected files are not supported`
- [ ] Generic PPTX parse failures show `Could not read this file. Is it a valid PowerPoint presentation?`
- [ ] While parsing, the import card shows a large inline loading row with text `Parsing PowerPoint structure and extracting slide previews...`
- [ ] Successful PPTX preview shows title, slide count, optional theme name, and original filename in a summary card
- [ ] Slide preview cards show slide index, layout label, and image count only when `imageCount > 0`
- [ ] Slide preview text is clamped to three lines in the import preview
- [ ] Import preview shows only the first six extracted slide previews even when more exist
- [ ] Import warnings are capped to the first three visible rows plus a `+N more warnings` summary line
- [ ] Ready-state primary import button label is `Import into ScholarSync`
- [ ] Importing-state primary import button label changes to `Importing...`
- [ ] Secondary import action label is `Choose another file`
- [ ] Successful import redirects directly to `/slides/{deckId}`
- [ ] Failed import after preview returns to `ready` phase and preserves the preview card
- [ ] Empty state on `/slides` is a dashed border panel rather than a plain centered message
- [ ] Empty-state helper copy explicitly mentions creating a new deck or importing an existing PowerPoint presentation
- [ ] Non-empty deck cards use a generic `Presentation` icon placeholder, not a real slide thumbnail preview
- [ ] Slides list cards show only title, slide count, theme name, and updated date
- [ ] Slides list card delete button is hover-revealed and positioned in the top-right corner
- [ ] Slides list delete failures are ignored silently after confirmation
- [ ] `/slides/new` uses step names `topic`, `audience`, `theme`, and `generating` rather than a generic wizard index
- [ ] `/slides/new` starts with `step = "topic"`, `audienceType = "general"`, and `themeKey = "modern"`
- [ ] Topic-step title is `What's your presentation about?`
- [ ] Topic-step helper copy says `Give it a title and optionally describe the content`
- [ ] Topic-step title input is autofocus-enabled
- [ ] Topic-step description textarea uses four rows
- [ ] Topic-step `Next` is disabled only when trimmed title is empty
- [ ] Audience-step title is `Who's your audience?`
- [ ] Audience-step helper copy says it helps tailor language, depth, and style
- [ ] Audience-step renders exactly seven audience options in a 2-column grid
- [ ] Audience option labels are `General`, `Conference`, `Thesis Defense`, `Journal Club`, `Classroom`, `Grant`, and `Poster`
- [ ] Theme-step title is `Pick a theme`
- [ ] Theme-step helper copy says the theme can be changed anytime in the editor
- [ ] Theme-step theme list is limited to the first eight keys from `PRESET_THEMES`
- [ ] Theme-step preview tiles show only abstract bars and the capitalized theme key label
- [ ] Theme-step primary CTA label is `Create Presentation`
- [ ] Clicking `Create Presentation` immediately switches the route to the `generating` step before server work completes
- [ ] Generating step shows a spinner ring plus heading `Creating your presentation`
- [ ] Creating a slides deck calls `createDeck` with title, optional description, and audience only; no theme is persisted at deck creation time
- [ ] Initial title slide is created as `title_slide` with a subtitle-style text block instead of using the slide `subtitle` field
- [ ] Initial title slide body text is description content or fallback text `Click to add subtitle`
- [ ] After the initial slide is created, the route redirects to `/slides/{deckId}` without waiting for AI generation
- [ ] Background AI generation is only triggered when description text is non-empty
- [ ] Background generation posts to `/api/slides/generate-stream` with `deckId`, `title`, `description`, `audienceType`, and `themeKey`
- [ ] Background generation failures are swallowed and do not interrupt deck creation or navigation
- [ ] New-deck creation failures show inline error text `Failed to create presentation. Please try again.` and return the wizard to the `theme` step
- [ ] `/slides/[deckId]` rejects invalid numeric params locally and shows inline red text `Invalid deck ID`
- [ ] Valid deck IDs mount `CollaborationProvider` with empty initial deck meta and then load the real deck through `SlidesWorkspace`
- [ ] `SlidesWorkspace` shows a centered spinner and `Loading presentation...` while `loadDeck(deckId)` is running
- [ ] `SlidesWorkspace` error state shows red text `Deck not found or access denied.` plus a `Back to presentations` link
- [ ] Empty decks do not open directly into the slides editor; they first show `ModeSelectionScreen`
- [ ] `ModeSelectionScreen` title is `How do you want to work?`
- [ ] Mode-selection helper copy says `You can switch anytime with the toggle`
- [ ] Mode-selection cards are `Slides Mode` and `Create Mode`
- [ ] `Slides Mode` card helper text is `Click and build like PowerPoint`
- [ ] `Create Mode` card helper text is `AI builds it, you refine`
- [ ] Once a deck has at least one slide, mode selection is skipped on later loads
- [ ] `SlidesWorkspace` wraps the editor in `ThemeProvider theme={themeConfig}`
- [ ] Presenter mode in `SlidesWorkspace` filters out hidden slides before constructing the presenter slide list
- [ ] Presenter start index is derived from the currently active non-hidden slide, falling back to 0
- [ ] Presenter mode fallback is a full-screen black overlay with `Loading presenter mode...`
- [ ] `SlidesModeLayout` registers global keyboard shortcuts on mount
- [ ] `SlidesModeLayout` keeps export state local with a single `exporting` boolean shared across all export actions
- [ ] `SlidesModeLayout` opens a handout-export dialog for PDF instead of exporting immediately
- [ ] Current-slide PNG export looks up the canvas via `[data-testid="slide-ruler-surface"]`
- [ ] Shift+Click on PNG export raises output scale from 2x to 3x
- [ ] Current-slide PNG filenames are sanitized to `{safeTitle}_slide_{slideNumber}.png`
- [ ] Current-slide SVG filenames are sanitized to `{safeTitle}_slide_{slideNumber}.svg`
- [ ] Export-all-PNG renders hidden off-screen `SlideRendererV2` instances for every slide before zipping them
- [ ] Export-all-PNG waits for two animation frames, `document.fonts.ready`, and an additional timeout before capture
- [ ] Export-all-PNG downloads `{safeTitle}_slides_png.zip`
- [ ] Export errors for PNG/SVG/ZIP are logged to console only
- [ ] The slides layout always renders `PresenceBridgeSlot` above the workspace
- [ ] Right-side panels in slides mode are controlled exclusively through `rightPanel` store state
- [ ] `Comments`, `Versions`, `Analytics`, `Defense`, and `Accessibility` panels each mount as separate right-side panes rather than tabs inside the properties panel
- [ ] `VersionHistoryPanel` compare callback is a no-op in `SlidesModeLayout`
- [ ] `CommentsPanel` in slides mode passes a no-op `onUnresolvedCountChange`
- [ ] `SlidesToolbar` starts with `Design` selected because `rightPanel` defaults to `"properties"` in the store
- [ ] Toolbar mode toggle uses `ModeSelector` with `Slides` and `Create` buttons, not generic text tabs
- [ ] Toolbar `Insert` button opens `InsertMenu` anchored to the button ref
- [ ] Toolbar `Visualize` button opens `VisualizePopover` anchored to the sparkle button ref
- [ ] Choosing `Visualize` from `InsertMenu` closes the insert menu and opens the visualize popover with an initial block type
- [ ] Undo availability includes either populated `_undoStack` or a pending coalesced undo snapshot
- [ ] Toolbar `View` options are hover-revealed via CSS group hover, not click toggled
- [ ] `Snap to Grid` checkbox is disabled whenever `showGrid` is false
- [ ] Save indicator shows icon-only idle state using `FloppyDisk`
- [ ] Save indicator `saving` state is spinner plus `Saving...`
- [ ] Save indicator `saved` state is green check plus `Saved`
- [ ] Save indicator `error` state is red warning plus `Save error`
- [ ] Toolbar exposes labeled `Agent` and icon-only `Defense`, `Comments`, `Analytics`, `Version history`, and `A11y` toggles
- [ ] Toolbar includes `Generate All Images` bulk action with inline progress text and progress bar
- [ ] `Generate All Images` shows `No empty image placeholders found.` when there are no image blocks lacking URLs
- [ ] Bulk image generation processes image blocks with concurrency limit 5
- [ ] Bulk image generation updates only placeholder image blocks by merging generated image data into block paths
- [ ] Toolbar `Share` button only sets store state `showSharePanel = true`
- [ ] Toolbar `Present` button sets `isPresenting = true` in the slides store
- [ ] Export menu is shown on hover of the `Export` button, not click
- [ ] Export menu includes `PowerPoint (.pptx)`, `PDF Handout`, `PNG (Current Slide)`, `PNG (All Slides as ZIP)`, and `SVG (Current Slide)`
- [ ] Export menu advertises `HD (Shift+Click)` helper text for both PNG actions
- [ ] `SlideFilmstrip` width is fixed at `w-48`, not `w-64`
- [ ] Filmstrip stores context-menu target slide id separately from active slide id
- [ ] Right-clicking a non-selected slide first selects it before opening the context menu
- [ ] Context-menu `selectedContextSlideIds` expands to all selected slides only when the right-clicked slide is already part of the multi-selection
- [ ] Filmstrip context menu offers `No Master` plus dynamic masters under `Apply Master...`
- [ ] Applying a master also sets the slide layout to `master.layout`
- [ ] Filmstrip `Hide Slide` toggles the slide `hidden` boolean rather than permanently removing it
- [ ] Regenerate dialog title changes between `Regenerate This Slide` and `Regenerate Selected Slides` based on target count
- [ ] Filmstrip PNG/SVG context-menu export renders the slide off-screen using `SlideRendererV2` before capture
- [ ] Filmstrip context-menu PNG export filename includes zero-padded slide number and sanitized slide title
- [ ] Shift+Click also raises the PNG scale in the filmstrip context-menu export path
- [ ] Slide click with `Shift` toggles slide selection and also activates that slide
- [ ] Add-slide button inserts after `activeSlideId` when available, otherwise appends at the end
- [ ] Hidden slides render an extra top-right dark pill with `EyeSlash` icon above the thumbnail
- [ ] Speaker notes bar is collapsed by default
- [ ] Speaker notes toggle shows `CaretUp` when collapsed and `CaretDown` when expanded
- [ ] Speaker notes textarea placeholder is `Click to add speaker notes...`
- [ ] Speaker notes bar is hidden entirely when there is no active slide
- [ ] `PropertiesPanel` starts on the `design` tab
- [ ] `PropertiesPanel` can switch between `design` and `animation` tabs using local component state
- [ ] Properties panel computes effective slide transition as `activeSlide.transition ?? transition`
- [ ] Properties panel derives background type as `solid`, `gradient`, or `image` from `cardBackground`
- [ ] Changing background type to `gradient` seeds a default linear gradient when none exists yet
- [ ] Changing background type back to `solid` clears both gradient and image URL state
- [ ] Properties panel supports institution-kit updates through `setInstitutionKit`
- [ ] Accessibility panel computes issues from `checkAccessibility(slides, themeConfig)` and reruns when `runId` changes
- [ ] Accessibility panel score ring changes color bands based on score thresholds

### Actual Current Behavior Corrections
- [ ] The slides list does not render true deck thumbnails; it shows a generic `Presentation` icon placeholder inside a 16:9 box
- [ ] PPTX import does not open a modal dialog; it expands an inline import workflow card within the `/slides` page
- [ ] The create flow on `/slides/new` does not generate remaining slides in the background unless a non-empty description is provided
- [ ] `/slides/new` does not persist the selected theme to `createDeck`; `themeKey` is only used by the optional background generation request
- [ ] `/slides/[deckId]` with an invalid param shows inline `Invalid deck ID` text instead of redirecting away
- [ ] Empty slides decks show a mode-selection screen before the three-panel workspace appears
- [ ] The visible slides-mode filmstrip is `w-48`, not the `w-64` width described in the original checklist
- [ ] The slides toolbar does include a visible save-status indicator; it is not missing
- [ ] The slides toolbar `Share` button only flips store state in the current layout; `SlidesModeLayout` does not render a share panel from that state
- [ ] PDF export in slides mode is a configurable handout dialog, not a one-click direct download
- [ ] Export dropdowns on the toolbar are hover-driven, not click-to-open

---

*Document generated from source code analysis. Last updated: 2026-03-09.*
