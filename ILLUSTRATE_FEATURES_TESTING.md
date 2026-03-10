# ScholarSync — Illustrate (FINNISH) Feature Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Illustrate / FINNISH scientific illustration editor (`/illustrate`, `/illustrate/editor`, `/illustrate/editor/[id]`, `/illustrate/agent`, `/illustrate/credits`).
> **Generated**: March 2026
> **Source**: `src/app/(app)/illustrate/`, `src/components/illustration/`, related stores, hooks, and API routes.

---

## Table of Contents

1. [Welcome Page](#1-welcome-page-illustrate)
2. [Agent Mode — AI Diagram Generation](#2-agent-mode--ai-diagram-generation-illustrateagent)
3. [Editor — Workspace Layout](#3-editor--workspace-layout-illustrateeditor)
4. [MenuBar](#4-menubar)
5. [Toolbar](#5-toolbar)
6. [Canvas — Drawing & Interaction](#6-canvas--drawing--interaction)
7. [Right Panel — Layers Tab](#7-right-panel--layers-tab)
8. [Right Panel — Properties Tab](#8-right-panel--properties-tab)
9. [Right Panel — Icons Tab](#9-right-panel--icons-tab)
10. [Right Panel — Style Tab (Hand-Drawn Effects)](#10-right-panel--style-tab-hand-drawn-effects)
11. [Right Panel — Journal Tab](#11-right-panel--journal-tab)
12. [Status Bar](#12-status-bar)
13. [Rulers & Guides](#13-rulers--guides)
14. [Export Dialog](#14-export-dialog)
15. [Scientific Shape Generator](#15-scientific-shape-generator)
16. [AI Image Generation Tool](#16-ai-image-generation-tool)
17. [Background Removal Tool](#17-background-removal-tool)
18. [Save & Persistence System](#18-save--persistence-system)
19. [Keyboard Shortcuts](#19-keyboard-shortcuts)
20. [Credits Page](#20-credits-page-illustratecredits)
21. [Error Handling & Edge Cases](#21-error-handling--edge-cases)
22. [Quick Test Workflows](#22-quick-test-workflows)

---

## 1. Welcome Page (`/illustrate`)

| Page | Route | Purpose |
|------|-------|---------|
| **Welcome / Landing** | `/illustrate` | Entry point — recent diagrams, quick templates, and navigation to Agent or Editor mode |

### Layout

```
┌───────────────────────────────────────────────────────────┐
│  FINNISH Logo + Navigation                                │
├───────────────────────────────────────────────────────────┤
│  Hero Section — Title + Tagline                          │
├────────────────────────┬──────────────────────────────────┤
│  "Create with AI" Card │  "Open Editor" Card             │
├────────────────────────┴──────────────────────────────────┤
│  Recent Diagrams (up to 6)                               │
├───────────────────────────────────────────────────────────┤
│  Quick Templates (4 categories)                          │
└───────────────────────────────────────────────────────────┘
```

### Hero Section
- [ ] Gradient title "Scientific Illustration Made Simple" renders correctly
- [ ] Tagline text displays below the title

### Action Cards
- [ ] "Create with AI" card visible with correct icon
- [ ] Clicking "Create with AI" navigates to `/illustrate/agent`
- [ ] "Open Editor" card visible with correct icon
- [ ] Clicking "Open Editor" navigates to `/illustrate/editor`
- [ ] Hover state shows elevation and accent border
- [ ] Keyboard activation with Enter/Space on focused card

### Recent Diagrams
- [ ] Section displays up to 6 recent diagrams from `localStorage['finnish-recent-diagrams']`
- [ ] Each card shows thumbnail (or placeholder if none)
- [ ] Each card shows diagram name
- [ ] Relative date displays correctly: "Today", "Yesterday", "N days ago"
- [ ] Clicking a card navigates to `/illustrate/editor/{diagramId}`
- [ ] Keyboard accessible (Tab + Enter)
- [ ] Empty state shown when no recent diagrams exist
- [ ] Section hidden or shows message when localStorage is empty

### Quick Templates
- [ ] 4 template cards displayed: Flowchart, Sequence, Scientific, Annotation
- [ ] Each card shows category icon and label
- [ ] Clicking a template navigates to `/illustrate/agent?template={templateId}`
- [ ] Hover state shows visual feedback
- [ ] Grid layout responsive at different viewport widths

### Accessibility
- [ ] All interactive elements have ARIA labels
- [ ] Tab navigation reaches every card and link
- [ ] Focus indicator visible on all interactive elements
- [ ] Role attributes set on action cards

---

## 2. Agent Mode — AI Diagram Generation (`/illustrate/agent`)

| Page | Route | Purpose |
|------|-------|---------|
| **Agent Mode** | `/illustrate/agent` | Chat-based AI diagram generation with template gallery and preview pane |

### Layout

```
┌──────────┬─────────────────────────────────┬────────────────┐
│ Template │  Chat History + Prompt Input     │  Diagram       │
│ Gallery  │                                  │  Preview Pane  │
│ (left)   │                                  │  (right)       │
│          │                                  │                │
└──────────┴─────────────────────────────────┴────────────────┘
```

### Template Gallery (Left Sidebar)
- [ ] Sidebar renders with template categories
- [ ] Sidebar can be collapsed/expanded via toggle button
- [ ] **Medicine** category shows 3 templates:
  - [ ] CONSORT — Clinical trial flow diagrams
  - [ ] PRISMA — Systematic review flows
  - [ ] Forest Plot — Meta-analysis visualization
- [ ] **Biology** category shows 3 templates:
  - [ ] Pathway — Biological signaling cascades
  - [ ] Cell Diagram — Cellular structure
  - [ ] Phylogenetic Tree — Evolutionary relationships
- [ ] **Chemistry** category shows 2 templates:
  - [ ] Reaction Scheme — Multi-step synthesis
  - [ ] Molecular Structure — 2D chemical structures
- [ ] **General** category shows 4 templates:
  - [ ] Flowchart — Process flows
  - [ ] Table — Data layout
  - [ ] Timeline — Chronological events
  - [ ] Venn Diagram — Set relationships
- [ ] Clicking a template populates the prompt input with that template's prompt
- [ ] Category filter buttons work correctly
- [ ] Template search/filter updates visible templates

### Chat Interface
- [ ] User messages appear right-aligned
- [ ] Assistant messages appear left-aligned with diagram preview
- [ ] Error messages display with error styling (red accent)
- [ ] Loading spinner shows during generation
- [ ] Prompt suggestions appear on welcome screen (before first message)
- [ ] Messages persist across page refreshes (last 50 messages via localStorage)
- [ ] Each message has auto-generated ID and timestamp

### Message Actions
- [ ] "Send to Editor" button appears on assistant messages with diagrams
- [ ] Clicking "Send to Editor" saves SVG to `sessionStorage['scholarsync-illustration-agent-import']`
- [ ] After "Send to Editor", redirects to `/illustrate/editor?import=agent`
- [ ] "Regenerate" button resends previous user prompt
- [ ] Regeneration creates a new request with the same prompt

### Prompt Input
- [ ] Text input field accepts up to 4000 characters
- [ ] Character count or limit indicator visible
- [ ] Submit via "Send" button
- [ ] Submit via Enter key
- [ ] "Stop" button appears during generation
- [ ] "Stop" button aborts the in-flight fetch request
- [ ] Empty prompt cannot be submitted (button disabled or validation shown)

### Style & Model Selection
- [ ] Style dropdown with options: flat, detailed, schematic, photorealistic
- [ ] Model dropdown with options: pro, flash (Gemini variants)
- [ ] Selected style/model persists during session
- [ ] Style auto-detection from prompt keywords:
  - [ ] "detailed", "intricate", "complex" → `detailed`
  - [ ] "schematic", "technical", "diagram" → `schematic`
  - [ ] "realistic", "photorealistic", "lifelike" → `photorealistic`
  - [ ] Default fallback → `flat`

### Domain Detection (21+ Domains)
- [ ] Cardiology detected: heart, cardiac, coronary, ECG, arrhythmia
- [ ] Neurology detected: brain, neural, neuron, synapse, dementia, Alzheimer
- [ ] Pulmonology detected: lung, pulmonary, respiratory, alveoli, asthma
- [ ] Gastroenterology detected: stomach, intestine, liver, pancreas
- [ ] Endocrinology detected: hormone, thyroid, diabetes, insulin, metabolism
- [ ] Nephrology detected: kidney, renal, dialysis, ureter
- [ ] Hematology/Oncology detected: blood, leukemia, cancer, tumor, hemoglobin
- [ ] Infectious Disease detected: virus, bacteria, infection, antibiotic, pathogen
- [ ] Additional domains (Orthopedics, Dermatology, Ophthalmology, Physics, Chemistry, etc.) detected correctly
- [ ] Domain passed to API in request body

### Preview Pane (Right Sidebar)
- [ ] Preview pane visible when diagram is generated
- [ ] SVG renders correctly in the preview area
- [ ] Zoom controls work (range: 25%–400%)
- [ ] Zoom in/out buttons increment/decrement correctly
- [ ] Close button collapses preview pane
- [ ] Preview pane toggle button restores collapsed pane

### Generation Backends
- [ ] `auto` mode — intelligently selects backend based on prompt
- [ ] `mermaid` backend — produces Mermaid diagram syntax
- [ ] `svg` backend — produces direct SVG markup
- [ ] `gemini` backend — AI image generation + vectorization
- [ ] All backends return valid renderable content

### API Request (`POST /api/illustration/generate`)
- [ ] Request includes: `prompt`, `backend`, `domain`, `style`, `geminiModel`
- [ ] Optional fields: `slideContext`, `existingDiagram`
- [ ] Response returns `illustration.content` (SVG or Mermaid string)
- [ ] Response includes `illustration.backend`, `illustration.format`
- [ ] Error response returns `error` and optional `details` fields

### State Management (`useAgentStore`)
- [ ] Messages array persists (last 50) via localStorage
- [ ] `currentDiagram` stores current SVG
- [ ] `isLoading` toggles correctly during generation
- [ ] `selectedCategory` persists
- [ ] `previewZoom` updates on zoom controls (25–400)
- [ ] `isSidebarCollapsed` toggles on sidebar collapse

---

## 3. Editor — Workspace Layout (`/illustrate/editor`)

| Page | Route | Purpose |
|------|-------|---------|
| **Editor** | `/illustrate/editor` | Full Fabric.js canvas editor for scientific illustrations |
| **Editor (load)** | `/illustrate/editor/[id]` | Loads an existing diagram by ID from localStorage |

### Layout

```
┌───────────────────────────────────────────────────────────────┐
│  MenuBar (File, Edit, View, Object, Insert, Image, Help)     │
├─────┬──────────────────────────────────────────┬──────────────┤
│     │  ┌─ Horizontal Ruler ──────────────┐     │              │
│  T  │  │                                 │     │  Right Panel │
│  o  │  │  Canvas (Fabric.js)             │     │  (Layers,    │
│  o  │  │                                 │     │  Properties, │
│  l  │  │                                 │     │  Icons,      │
│  b  │  │                                 │     │  Style,      │
│  a  │  └─────────────────────────────────┘     │  Journal)    │
│  r  │  Vertical Ruler (left of canvas)         │              │
├─────┴──────────────────────────────────────────┴──────────────┤
│  Status Bar (tool, selection, coordinates, zoom)              │
└───────────────────────────────────────────────────────────────┘
```

- [ ] Three-region layout: Toolbar (left) | Canvas (center) | Right Panel (right)
- [ ] MenuBar spans full width at top
- [ ] Status Bar spans full width at bottom
- [ ] Rulers display on top and left of canvas (toggleable)
- [ ] Layout is responsive and panels resize appropriately

### Loading Existing Diagrams (`/illustrate/editor/[id]`)
- [ ] Loading spinner shows while diagram data is retrieved
- [ ] Diagram loads from `localStorage['finnish-diagram-{id}']`
- [ ] Toast notification on successful load
- [ ] Error toast if diagram ID not found
- [ ] Canvas populates with saved objects

### Import from Agent Mode
- [ ] When URL contains `?import=agent`, checks sessionStorage
- [ ] SVG from `sessionStorage['scholarsync-illustration-agent-import']` imports into canvas
- [ ] SessionStorage entry cleared after successful import
- [ ] Toast notification on successful import
- [ ] Error handling if sessionStorage is empty or SVG is invalid

---

## 4. MenuBar

### File Menu
- [ ] **New** (`Ctrl+N`) — Shows confirm dialog, clears canvas on confirm
- [ ] **Open** (`Ctrl+O`) — Opens file picker for `.finnish`, `.json`, `.svg` files
- [ ] **Place Image** (`Ctrl+Shift+P`) — Opens file picker for image files
- [ ] **Canvas Size** — Opens document settings dialog (width, height, background color)
- [ ] **Save** (`Ctrl+S`) — Downloads as `diagram.finnish`
- [ ] **Save As** (`Ctrl+Shift+S`) — Prompts for filename, then downloads
- [ ] **Export** (`Ctrl+E`) — Opens Export dialog
- [ ] **Quick Export — SVG** — Downloads SVG immediately
- [ ] **Quick Export — PNG** — Downloads PNG immediately
- [ ] **Quick Export — PNG @2x** — Downloads PNG at 2× scale
- [ ] **Recent Files** — Disabled placeholder item

### Edit Menu
- [ ] **Undo** (`Ctrl+Z`) — Enabled only when `history.past.length > 0`
- [ ] **Redo** (`Ctrl+Y`) — Enabled only when `history.future.length > 0`
- [ ] **Cut** (`Ctrl+X`) — Copies and deletes selected objects
- [ ] **Copy** (`Ctrl+C`) — Copies selected objects to clipboard
- [ ] **Paste** (`Ctrl+V`) — Pastes from clipboard to canvas
- [ ] **Delete** (`Del`) — Removes selected objects
- [ ] **Select All** (`Ctrl+A`) — Selects all canvas objects
- [ ] **Deselect** (`Esc`) — Clears selection
- [ ] **Group** (`Ctrl+G`) — Groups 2+ selected objects (disabled if < 2 selected)
- [ ] **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group

### View Menu
- [ ] **Zoom In** (`+`) — Increments zoom by 0.1
- [ ] **Zoom Out** (`-`) — Decrements zoom by 0.1
- [ ] **Zoom to 100%** (`Ctrl+0`) — Resets viewport to 1.0
- [ ] **Fit to Window** (`Ctrl+1`) — Fits all objects in view
- [ ] **Zoom presets**: 50%, 100%, 150%, 200% — Each sets zoom to value
- [ ] **Show Grid** (`Ctrl+'`) — Toggles `gridVisible`
- [ ] **Snap to Grid** (`Ctrl+Shift+;`) — Toggles `snapToGrid`
- [ ] **Show Rulers** (`Ctrl+R`) — Toggles ruler visibility
- [ ] **Show Guides** (`Ctrl+Shift+R`) — Toggles guide visibility

### Object Menu
- [ ] **Bring to Front** (`Ctrl+Shift+]`) — Moves selected to top z-index
- [ ] **Bring Forward** (`Ctrl+]`) — Increases z-index by 1
- [ ] **Send Backward** (`Ctrl+[`) — Decreases z-index by 1
- [ ] **Send to Back** (`Ctrl+Shift+[`) — Moves selected to bottom z-index
- [ ] **Flip Horizontal** (`Shift+H`) — Flips selection horizontally
- [ ] **Flip Vertical** (`Shift+V`) — Flips selection vertically
- [ ] **Group** (`Ctrl+G`) — Groups selected objects
- [ ] **Ungroup** (`Ctrl+Shift+G`) — Ungroups selected group
- [ ] **Make Clipping Mask** (`Ctrl+7`) — Requires 2+ objects selected
- [ ] **Release Clipping Mask** (`Ctrl+Alt+7`) — Requires single clipped group
- [ ] **Make Compound Path** (`Ctrl+8`) — Requires 2+ path objects
- [ ] **Release Compound Path** (`Ctrl+Alt+8`) — Requires single compound path
- [ ] **Offset Path** — Prompts for distance (positive = outward, negative = inward)
- [ ] **Pathfinder — Unite** — Combines shapes into one
- [ ] **Pathfinder — Subtract** — Cuts bottom shape from top
- [ ] **Pathfinder — Intersect** — Keeps only overlapping area
- [ ] **Pathfinder — Exclude** — XOR: keeps non-overlapping areas

### Insert Menu
- [ ] **DNA Helix** (`Ctrl+Shift+D`) — Inserts DNA helix shape
- [ ] **Cell Membrane** (`Ctrl+Shift+M`) — Inserts cell membrane shape
- [ ] **Cell Layer / Tissue** — Inserts tissue layer shape
- [ ] **Neuron** — Inserts neuron shape
- [ ] **Mitochondria** — Inserts mitochondria shape
- [ ] **Pathway Arrows** — Inserts pathway arrow set
- [ ] **All Scientific Shapes** (`Ctrl+Shift+S`) — Opens full shape generator panel

### Image Menu
- [ ] **AI Generate Image** (`Ctrl+Shift+A`) — Opens AIGenerationTool dialog
- [ ] **Remove Background** (`Ctrl+Shift+B`) — Opens BackgroundRemovalTool dialog
- [ ] **Adjustments** — Submenu items (Brightness/Contrast, Hue/Saturation, Levels) shown as disabled
- [ ] **Filters** — Submenu items (Blur, Sharpen, Add Noise) shown as disabled

### Help Menu
- [ ] **Keyboard Shortcuts** (`Ctrl+/`) — Displays toast/dialog listing all shortcuts
- [ ] **Documentation** — Opens `https://finnish.dev/docs` in new tab
- [ ] **About FINNISH** — Shows version info toast/dialog

---

## 5. Toolbar

### Tool Selection
| Tool | Shortcut | Test |
|------|----------|------|
| Select | `V` | [ ] Activates default selection mode |
| Direct Select | `A` | [ ] Activates point/node editing mode |
| Hand | `H` | [ ] Activates canvas pan mode |
| Rectangle | `R` | [ ] Draws rectangles on drag |
| Ellipse | `E` | [ ] Draws ellipses/circles on drag |
| Polygon | — | [ ] Opens sides config popup (3–24, default 6) |
| Star | — | [ ] Opens points config popup (3–24, default 5) |
| Line | `L` | [ ] Draws straight lines |
| Arrow | — | [ ] Draws directional arrows |
| Pen | `P` | [ ] Creates bezier curves (click to place points) |
| Brush | `B` | [ ] Activates freehand drawing mode |
| Text | `T` | [ ] Creates text object on click |
| Eyedropper | `I` | [ ] Samples color from canvas object |
| Eraser | `Shift+E` | [ ] Deletes portions of paths |
| Scissors | `C` | [ ] Cuts paths at click point |
| Measure | `M` | [ ] Measures distance between two points |
| Zoom | `Z` | [ ] Click to zoom in, Alt+click to zoom out |

### Toolbar UI
- [ ] Active tool is visually highlighted
- [ ] Tooltips display on hover with tool name and shortcut
- [ ] Polygon config popup appears on Polygon tool selection
  - [ ] Sides input accepts values 3–24
  - [ ] Input updates `polygonSides` in store
- [ ] Star config popup appears on Star tool selection
  - [ ] Points input accepts values 3–24
  - [ ] Input updates `starPoints` in store
- [ ] Scientific Shapes button opens shape generator panel
- [ ] Keyboard shortcuts activate corresponding tools

---

## 6. Canvas — Drawing & Interaction

### Shape Drawing
- [ ] Rectangle tool: click-drag creates rectangle on canvas
- [ ] Ellipse tool: click-drag creates ellipse on canvas
- [ ] Polygon tool: click-drag creates polygon with configured sides
- [ ] Star tool: click-drag creates star with configured points
- [ ] Line tool: click-drag creates straight line
- [ ] Arrow tool: click-drag creates line with arrowhead

### Path Drawing
- [ ] Pen tool: click to place anchor points
- [ ] Pen tool: click-drag to create bezier curves with control handles
- [ ] Pen tool: click on first point to close path
- [ ] Brush tool: freehand drawing with natural brush strokes (perfect-freehand)
- [ ] Rough.js hand-drawn style toggle applies to drawn shapes

### Text
- [ ] Text tool: click on canvas creates a new text object
- [ ] Double-click text object to enter inline editing
- [ ] Text editing supports typing, selection, delete
- [ ] Text properties update live during editing (font, size, color)

### Selection & Manipulation
- [ ] Click to select a single object
- [ ] Click on empty space to deselect
- [ ] `Ctrl/Cmd`+click to add/remove from multi-selection
- [ ] Drag to move selected objects
- [ ] Corner handles resize objects proportionally
- [ ] Side handles resize non-proportionally
- [ ] Rotation handle rotates object (visible above selection)
- [ ] Double-click group to enter group editing

### Navigation
- [ ] Scroll wheel zooms in/out
- [ ] `Space`+drag pans canvas
- [ ] Middle mouse button drag pans canvas
- [ ] Hand tool (`H`) enables pan mode on any drag

### Drag & Drop
- [ ] Drag image from desktop onto canvas inserts it
- [ ] Supported image formats: PNG, JPG, SVG
- [ ] Paste image from clipboard (`Ctrl+V`) inserts onto canvas

### History (Undo/Redo)
- [ ] Each object modification pushes state to history
- [ ] `Ctrl+Z` undoes last action
- [ ] `Ctrl+Y` redoes last undone action
- [ ] History limited to 50 states
- [ ] History clears on "New" canvas

### Grid & Snap
- [ ] Grid overlay renders when `gridVisible` is true
- [ ] Grid size configurable (default 20px)
- [ ] Objects snap to grid lines when `snapToGrid` is true
- [ ] Snap behavior applies during drag/resize/create

---

## 7. Right Panel — Layers Tab

- [ ] Lists all canvas objects in hierarchical tree view
- [ ] Object names/types displayed (Rectangle, Ellipse, Text, Group, etc.)
- [ ] Clicking a layer entry selects the corresponding object on canvas
- [ ] Selected object's layer entry is highlighted
- [ ] **Visibility toggle** (eye icon):
  - [ ] Click to hide object on canvas
  - [ ] Click again to show
  - [ ] Hidden objects display dimmed in layer list
- [ ] **Lock toggle** (lock icon):
  - [ ] Click to lock object (prevent selection/move)
  - [ ] Click again to unlock
  - [ ] Locked objects show lock indicator
- [ ] **Drag-to-reorder**: dragging a layer entry changes z-order
- [ ] Groups show expandable children
- [ ] Layer order matches visual z-order on canvas

---

## 8. Right Panel — Properties Tab

### Transform Properties
- [ ] **X** — Numeric input for horizontal position
- [ ] **Y** — Numeric input for vertical position
- [ ] **Width** — Numeric input for object width
- [ ] **Height** — Numeric input for object height
- [ ] **Rotation** — Numeric input for rotation angle (degrees)
- [ ] Editing any field updates the object live on canvas
- [ ] Values update when object is dragged/resized on canvas

### Appearance
- [ ] **Fill** — Color picker for object fill
- [ ] **Stroke** — Color picker for stroke/border color
- [ ] **Stroke Width** — Numeric input
- [ ] **Opacity** — Slider 0%–100%
- [ ] Changes apply immediately to selected object

### Alignment Tools
- [ ] Align Left — Aligns selected objects to left edge
- [ ] Align Center (H) — Centers objects horizontally
- [ ] Align Right — Aligns to right edge
- [ ] Align Top — Aligns to top edge
- [ ] Align Center (V) — Centers objects vertically
- [ ] Align Bottom — Aligns to bottom edge
- [ ] Distribute Horizontally — Equal horizontal spacing
- [ ] Distribute Vertically — Equal vertical spacing
- [ ] Alignment requires 2+ selected objects (or aligns to canvas)

### Text Properties (visible when text is selected)
- [ ] Font family picker
- [ ] Font size input
- [ ] Font weight selector (normal, bold)
- [ ] Text alignment (left, center, right, justify)
- [ ] Line height input
- [ ] Text color (may use fill color control)

### Effects
- [ ] **Shadow** — Toggle shadow on/off
  - [ ] Shadow X offset
  - [ ] Shadow Y offset
  - [ ] Shadow blur radius
  - [ ] Shadow color picker
  - [ ] Shadow opacity
- [ ] **Blur** — Blur amount slider
- [ ] **Blend Mode** — Dropdown (normal, multiply, screen, overlay, etc.)

### Gradient Editor
- [ ] Toggle between solid fill and gradient fill
- [ ] Linear gradient mode
- [ ] Radial gradient mode
- [ ] Gradient bar with draggable color stops
- [ ] Add/remove color stops
- [ ] Gradient presets available

### No Selection State
- [ ] Properties tab shows empty/instructional state when nothing selected
- [ ] Message like "Select an object to view properties"

---

## 9. Right Panel — Icons Tab

- [ ] Icon search input with text filtering
- [ ] Multiple icon library sources available:
  - [ ] Tabler Icons
  - [ ] Health Icons
  - [ ] Science Icons
  - [ ] Icon Park
  - [ ] Simple Icons
- [ ] Icon categories filter/browse
- [ ] Icons display in a grid with preview
- [ ] Click or drag an icon to insert it on canvas
- [ ] Inserted icon is a vector object (editable)
- [ ] Search updates results dynamically as user types

### API Integration
- [ ] `GET /api/illustration/icons/search` — Search across libraries
- [ ] `GET /api/illustration/icons/route` — List available icons
- [ ] `POST /api/illustration/icons/generate` — Generate custom icons

---

## 10. Right Panel — Style Tab (Hand-Drawn Effects)

- [ ] **Hand-Drawn Toggle** — Enables/disables Rough.js rendering
- [ ] **Roughness** slider — Range 0 (clean) to 2+ (sketchy)
  - [ ] Value 0 = smooth, vector-clean lines
  - [ ] Value 2+ = very rough, hand-drawn look
- [ ] **Bowing** control — Line curvature amount
- [ ] **Fill Pattern** dropdown — 6 options:
  - [ ] Solid
  - [ ] Hachure
  - [ ] Cross-hatch
  - [ ] Dots
  - [ ] Zigzag
  - [ ] Dashed
- [ ] **Stroke Width** control
- [ ] **Apply to Selection** button — Applies current settings to selected objects
- [ ] Settings preview updates live as sliders change
- [ ] Rough.js style persists on save/export

---

## 11. Right Panel — Journal Tab

- [ ] Journal preset selector displays available presets
- [ ] Presets format figures for academic publication standards
- [ ] Selecting a preset applies formatting (margins, caption style, etc.)
- [ ] Caption/annotation support for figure labeling
- [ ] Preview of formatted output

---

## 12. Status Bar

### Left Section
- [ ] Current tool badge displays (e.g., "Select", "Pen", "Rectangle")
- [ ] Tool badge updates immediately on tool switch
- [ ] Selection count shows when objects are selected (e.g., "3 objects")

### Right Section
- [ ] Canvas dimensions display (e.g., "800×600")
- [ ] Mouse coordinates (X, Y) update in real time as cursor moves
- [ ] Zoom percentage displayed (e.g., "100%")
- [ ] `+` button increments zoom
- [ ] `-` button decrements zoom
- [ ] Clicking zoom percentage resets to 100%

---

## 13. Rulers & Guides

### Rulers
- [ ] Horizontal ruler renders across top of canvas
- [ ] Vertical ruler renders along left side of canvas
- [ ] Rulers toggle with `Ctrl+R` or View menu
- [ ] Ruler unit toggle button in corner (px ↔ pt)
- [ ] Ruler markings update on zoom/pan
- [ ] Current cursor position highlighted on rulers

### Guides
- [ ] Drag from horizontal ruler to create a horizontal guide
- [ ] Drag from vertical ruler to create a vertical guide
- [ ] Guides render as colored lines across the full canvas
- [ ] Guides toggle visibility with `Ctrl+Shift+R`
- [ ] Object snap to guide lines when dragging near them
- [ ] Snap indicator appears when object snaps to guide
- [ ] Double-click guide to edit position numerically
- [ ] Drag guide off canvas to delete it
- [ ] "Clear All Guides" option available

---

## 14. Export Dialog

- [ ] Opens via `Ctrl+E` or File → Export
- [ ] Tab-based interface: PNG | SVG | PDF | PowerPoint | LaTeX

### PNG Options
- [ ] DPI selector: 72, 150, 300 (default 300)
- [ ] Quality slider: 0–100 (default 90)
- [ ] Background option: transparent or white
- [ ] Export button downloads PNG file
- [ ] @2x quick export produces double-resolution PNG

### SVG Options
- [ ] Optimize checkbox (minify paths)
- [ ] Minify checkbox (compress SVG code)
- [ ] Embed Fonts checkbox
- [ ] Export button downloads SVG file
- [ ] Exported SVG renders correctly in browsers and vector editors

### PDF Options
- [ ] Page Size: A4, Letter, A3, Custom
- [ ] Orientation: Portrait, Landscape
- [ ] Margins: Top, Right, Bottom, Left numeric inputs
- [ ] Export button downloads PDF file

### PowerPoint (PPTX) Options
- [ ] Layout: 16:9, 16:10, 4:3, Custom
- [ ] Resolution multiplier: 1×–4×
- [ ] Background: white, transparent
- [ ] Center image on slide checkbox
- [ ] Title and author text fields
- [ ] Export button downloads PPTX file

### LaTeX (TikZ) Options
- [ ] Standalone document checkbox
- [ ] Include preamble checkbox
- [ ] TikZ code preview area
- [ ] Copy button copies TikZ code to clipboard
- [ ] Export button downloads `.tex` file

---

## 15. Scientific Shape Generator

- [ ] Opens via Insert menu → All Scientific Shapes (`Ctrl+Shift+S`)
- [ ] Panel lists available scientific shapes:
  - [ ] DNA Helix
  - [ ] Cell Membrane
  - [ ] Cell Layer / Tissue
  - [ ] Neuron
  - [ ] Mitochondria
  - [ ] Pathway Arrows
- [ ] Each shape has configurable parameters (scale, color, detail level)
- [ ] Live preview updates as parameters change
- [ ] "Insert" button adds shape to canvas at center
- [ ] Inserted shapes are editable vector objects
- [ ] Quick insert via keyboard shortcuts:
  - [ ] `Ctrl+Shift+D` inserts DNA Helix directly
  - [ ] `Ctrl+Shift+M` inserts Cell Membrane directly

---

## 16. AI Image Generation Tool

- [ ] Opens via Image menu → AI Generate Image (`Ctrl+Shift+A`)
- [ ] Text prompt input for describing desired image
- [ ] Model selection (e.g., FLUX Pro, FLUX Realism)
- [ ] Image size/quality configuration
- [ ] API key configuration field (for fal.ai)
- [ ] "Generate" button starts AI image generation
- [ ] Progress indicator during generation
- [ ] Generated image displayed as preview
- [ ] "Add to Canvas" button inserts generated image onto canvas
- [ ] Error handling for invalid prompts, API failures, missing keys
- [ ] Cancel button to abort generation

---

## 17. Background Removal Tool

- [ ] Opens via Image menu → Remove Background (`Ctrl+Shift+B`)
- [ ] Requires an image to be selected on canvas (or prompts image upload)
- [ ] Uses MediaPipe for client-side background removal
- [ ] Before/after preview of background removal
- [ ] "Apply" button replaces original image with background-removed version
- [ ] "Export" options for saving the result separately
- [ ] Processing indicator while MediaPipe runs
- [ ] Error handling for unsupported image formats

---

## 18. Save & Persistence System

### Manual Save
- [ ] `Ctrl+S` triggers save — downloads `diagram.finnish` file
- [ ] `Ctrl+Shift+S` triggers Save As — prompts for filename
- [ ] `.finnish` format stores canvas JSON (objects, viewport, settings)
- [ ] `.json` format also supported for open/save

### File Open
- [ ] `Ctrl+O` opens file picker
- [ ] Accepts `.finnish`, `.json`, `.svg` files
- [ ] Loading a file replaces current canvas content
- [ ] Confirm dialog shown if canvas has unsaved changes

### Recent Diagrams Tracking
- [ ] Saved diagrams added to `localStorage['finnish-recent-diagrams']`
- [ ] Entry format: `{ id, name, thumbnail (data URL), updatedAt (timestamp) }`
- [ ] Maximum of 6 recent entries stored
- [ ] Oldest entries removed when limit exceeded
- [ ] Recent list updates on every save

### Diagram Storage
- [ ] Individual diagrams stored in `localStorage['finnish-diagram-{id}']`
- [ ] Canvas JSON includes all objects, groups, viewport state
- [ ] Thumbnails generated as PNG data URLs for recent list

### API Save
- [ ] `POST /api/illustration/save` — Saves diagram to database
- [ ] Request includes diagram data, name, metadata

---

## 19. Keyboard Shortcuts

### File Operations
| Action | Shortcut | Test |
|--------|----------|------|
| New | `Ctrl+N` | [ ] Opens confirm dialog, clears canvas |
| Open | `Ctrl+O` | [ ] Opens file picker |
| Place Image | `Ctrl+Shift+P` | [ ] Opens image file picker |
| Save | `Ctrl+S` | [ ] Downloads .finnish file |
| Save As | `Ctrl+Shift+S` | [ ] Prompts filename, downloads |
| Export | `Ctrl+E` | [ ] Opens Export dialog |

### Tool Selection
| Tool | Shortcut | Test |
|------|----------|------|
| Select | `V` | [ ] Switches to Select tool |
| Direct Select | `A` | [ ] Switches to Direct Select |
| Hand | `H` | [ ] Switches to Hand/Pan |
| Rectangle | `R` | [ ] Switches to Rectangle |
| Ellipse | `E` | [ ] Switches to Ellipse |
| Line | `L` | [ ] Switches to Line |
| Pen | `P` | [ ] Switches to Pen |
| Brush | — | [ ] No default global Brush shortcut is registered in `useKeyboardShortcuts`, even though the toolbar button advertises `B` |
| Text | `T` | [ ] Switches to Text |
| Eyedropper | `I` | [ ] Switches to Eyedropper |
| Eraser | `Shift+E` | [ ] Switches to Eraser |
| Scissors | `C` | [ ] Switches to Scissors |
| Measure | `M` | [ ] Switches to Measure |
| Zoom | — | [ ] No default global Zoom shortcut is registered in `useKeyboardShortcuts`, even though the toolbar button advertises `Z` |

### Editing
| Action | Shortcut | Test |
|--------|----------|------|
| Undo | `Ctrl+Z` | [ ] Reverts last change |
| Redo | `Ctrl+Y` | [ ] Re-applies undone change |
| Cut | `Ctrl+X` | [ ] Copies + deletes selected |
| Copy | `Ctrl+C` | [ ] Copies selected to clipboard |
| Paste | `Ctrl+V` | [ ] Pastes from clipboard |
| Delete | `Del` | [ ] Removes selected objects |
| Select All | `Ctrl+A` | [ ] Selects all objects |
| Deselect | `Esc` | [ ] Clears selection |
| Group | `Ctrl+G` | [ ] Groups selected objects |
| Ungroup | `Ctrl+Shift+G` | [ ] Ungroups selected group |

### Object Operations
| Action | Shortcut | Test |
|--------|----------|------|
| Bring to Front | `Ctrl+Shift+]` | [ ] Moves to top z-index |
| Bring Forward | `Ctrl+]` | [ ] Increments z-index |
| Send Backward | `Ctrl+[` | [ ] Decrements z-index |
| Send to Back | `Ctrl+Shift+[` | [ ] Moves to bottom z-index |
| Flip Horizontal | `Shift+H` | [ ] Mirrors horizontally |
| Flip Vertical | `Shift+V` | [ ] Mirrors vertically |
| Make Clipping Mask | `Ctrl+7` | [ ] Creates clipping mask |
| Release Clipping Mask | `Ctrl+Alt+7` | [ ] Releases clipping mask |
| Make Compound Path | `Ctrl+8` | [ ] Combines into compound path |
| Release Compound Path | `Ctrl+Alt+8` | [ ] Splits compound path |

### Scientific & Image
| Action | Shortcut | Test |
|--------|----------|------|
| DNA Helix | `Ctrl+Shift+D` | [ ] Inserts DNA helix |
| Cell Membrane | `Ctrl+Shift+M` | [ ] Inserts cell membrane |
| All Shapes | `Ctrl+Shift+S` | [ ] Opens shape generator |
| AI Generate | `Ctrl+Shift+A` | [ ] Opens AI generation tool |
| Remove Background | `Ctrl+Shift+B` | [ ] Opens bg removal tool |

### View
| Action | Shortcut | Test |
|--------|----------|------|
| Zoom In | `+` | [ ] Increases zoom by 0.1 |
| Zoom Out | `-` | [ ] Decreases zoom by 0.1 |
| Zoom to 100% | `Ctrl+0` | [ ] Resets zoom to 1.0 |
| Fit to Window | `Ctrl+1` | [ ] Fits content in view |
| Show Grid | `Ctrl+'` | [ ] Toggles grid overlay |
| Snap to Grid | `Ctrl+Shift+;` | [ ] Toggles snap behavior |
| Show Rulers | `Ctrl+R` | [ ] Toggles rulers |
| Show Guides | `Ctrl+Shift+R` | [ ] Toggles guides |
| Keyboard Shortcuts | `Ctrl+/` | [ ] Shows shortcuts reference |

---

## 20. Credits Page (`/illustrate/credits`)

| Page | Route | Purpose |
|------|-------|---------|
| **Credits** | `/illustrate/credits` | Attribution and licensing info for libraries and assets |

### Scientific Illustrations
- [ ] SciDraw-style attribution (CC-BY) displayed
- [ ] Bioicons attribution (CC-BY) displayed
- [ ] Servier Medical Art attribution (CC-BY 4.0) displayed

### Icon Libraries
- [ ] Tabler Icons (MIT) credited
- [ ] Health Icons (CC0) credited
- [ ] Science Icons (MIT) credited
- [ ] Icon Park (Apache 2.0) credited
- [ ] Simple Icons (CC0) credited

### Software Libraries
- [ ] Fabric.js (MIT) credited
- [ ] Paper.js (MIT) credited
- [ ] Rough.js (MIT) credited
- [ ] KaTeX (MIT) credited
- [ ] Mermaid (MIT) credited
- [ ] jsPDF (MIT) credited
- [ ] pptxgenjs (MIT) credited
- [ ] MediaPipe (Apache 2.0) credited

### UI & Layout
- [ ] Attribution cards display with license badges
- [ ] License badges color-coded by license type
- [ ] External links open in new tab (`target="_blank"`)
- [ ] Layout responsive on mobile viewports
- [ ] Back/home navigation link works
- [ ] Page accessible via keyboard navigation

---

## 21. Error Handling & Edge Cases

### Error Boundary
- [ ] React Error Boundary wraps entire editor
- [ ] Unhandled errors render fallback UI instead of white screen
- [ ] Fallback UI includes "Reset" button
- [ ] Clicking "Reset" recovers the editor to a working state

### Toast Notifications
- [ ] **Info** (blue) — Status messages (e.g., "Diagram loaded")
- [ ] **Success** (green) — Completed operations (e.g., "Exported as PNG")
- [ ] **Warning** (orange) — Non-critical issues (e.g., "Large file may be slow")
- [ ] **Error** (red) — Failed operations (e.g., "Failed to load diagram")
- [ ] Toasts auto-dismiss after ~3000ms
- [ ] Multiple toasts stack without overlap

### Canvas Edge Cases
- [ ] Pathfinder operations on incompatible objects show error toast
- [ ] Clipping mask with < 2 objects shows error
- [ ] Compound path on non-path objects shows error
- [ ] Very large images (> 4000×4000) handled gracefully
- [ ] Canvas with 100+ objects remains responsive
- [ ] Empty canvas export produces valid (empty) file

### File Operations
- [ ] Opening non-supported file format shows error
- [ ] Opening corrupted `.finnish` file shows error with recovery option
- [ ] Save on empty canvas produces valid file
- [ ] Import of malformed SVG shows error

### Agent Mode Edge Cases
- [ ] Empty prompt submission prevented
- [ ] Prompt exceeding 4000 characters truncated or prevented
- [ ] Network error during generation shows error message in chat
- [ ] Aborting generation mid-stream recovers cleanly
- [ ] Rapid successive prompts handled without race conditions

### Accessibility
- [ ] All interactive elements reachable via Tab key
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels on toolbar buttons, menu items, panels
- [ ] Screen reader can announce tool changes and selections
- [ ] Color contrast meets WCAG AA for all text and controls
- [ ] Alt text present on decorative and informational images

---

## 22. Quick Test Workflows

### A. Agent → Editor Flow
1. [ ] Navigate to `/illustrate`
2. [ ] Click "Create with AI" card
3. [ ] Verify navigation to `/illustrate/agent`
4. [ ] Select "CONSORT" template from Medicine category
5. [ ] Verify prompt is pre-filled
6. [ ] Click "Send" to generate diagram
7. [ ] Wait for generation to complete
8. [ ] Verify SVG renders in preview pane
9. [ ] Click "Send to Editor"
10. [ ] Verify redirect to `/illustrate/editor?import=agent`
11. [ ] Verify SVG appears on editor canvas

### B. Manual Drawing & Export
1. [ ] Navigate to `/illustrate/editor`
2. [ ] Press `R` to activate Rectangle tool
3. [ ] Draw a rectangle on canvas
4. [ ] Press `E` to activate Ellipse tool
5. [ ] Draw an ellipse overlapping the rectangle
6. [ ] Press `V` to switch to Select tool
7. [ ] Click rectangle — verify properties panel shows transform values
8. [ ] Change fill color in properties — verify canvas updates
9. [ ] Press `Ctrl+A` to select all
10. [ ] Press `Ctrl+G` to group
11. [ ] Press `Ctrl+E` to open Export dialog
12. [ ] Select PNG tab, set DPI 300, click Export
13. [ ] Verify PNG file downloads

### C. Scientific Illustration
1. [ ] Navigate to `/illustrate/editor`
2. [ ] Press `Ctrl+Shift+D` to insert DNA Helix
3. [ ] Verify shape appears on canvas
4. [ ] Open Style tab in right panel
5. [ ] Enable hand-drawn mode
6. [ ] Adjust roughness to ~1.5
7. [ ] Select hachure fill pattern
8. [ ] Click "Apply to Selection"
9. [ ] Verify shape renders with hand-drawn effect
10. [ ] Export as SVG via File → Quick Export → SVG
11. [ ] Verify SVG file downloads and renders correctly

### D. Guides & Precision Layout
1. [ ] Toggle rulers on (`Ctrl+R`)
2. [ ] Toggle guides on (`Ctrl+Shift+R`)
3. [ ] Drag from top ruler to create a horizontal guide at ~200px
4. [ ] Drag from left ruler to create a vertical guide at ~300px
5. [ ] Draw a rectangle near the guide intersection
6. [ ] Verify rectangle snaps to guide lines
7. [ ] Move rectangle away, then back — verify snap indicator appears
8. [ ] Drag guide off canvas — verify it is deleted
9. [ ] Toggle grid on (`Ctrl+'`)
10. [ ] Toggle snap to grid on (`Ctrl+Shift+;`)
11. [ ] Draw a shape — verify it snaps to grid points

### E. Undo/Redo & History
1. [ ] Draw 3 shapes on canvas (rectangle, ellipse, line)
2. [ ] Press `Ctrl+Z` — verify last shape removed
3. [ ] Press `Ctrl+Z` — verify second shape removed
4. [ ] Press `Ctrl+Y` — verify second shape restored
5. [ ] Press `Ctrl+Y` — verify third shape restored
6. [ ] Delete all shapes, undo all deletions — verify full restoration
7. [ ] Verify Edit menu Undo/Redo items enable/disable correctly

### F. Grouping, Masking & Pathfinder
1. [ ] Create 3 overlapping shapes
2. [ ] Select all (`Ctrl+A`)
3. [ ] Group (`Ctrl+G`) — verify group in Layers tab
4. [ ] Ungroup (`Ctrl+Shift+G`) — verify objects separated
5. [ ] Select 2 shapes
6. [ ] Make Clipping Mask (`Ctrl+7`) — verify masking applied
7. [ ] Release Clipping Mask (`Ctrl+Alt+7`) — verify objects restored
8. [ ] Select 2 overlapping rectangles
9. [ ] Object → Pathfinder → Unite — verify shapes merged
10. [ ] Undo — verify original shapes restored

### G. Save, Close, Reopen
1. [ ] Create several objects on canvas
2. [ ] Press `Ctrl+S` — verify `.finnish` file downloads
3. [ ] Press `Ctrl+N` — confirm dialog appears — confirm
4. [ ] Verify canvas is cleared
5. [ ] Press `Ctrl+O` — select the saved `.finnish` file
6. [ ] Verify all objects restore exactly as saved
7. [ ] Check Layers tab — all objects present

### H. Template to Publication
1. [ ] Navigate to `/illustrate/agent`
2. [ ] Select "Flowchart" from General templates
3. [ ] Type "Add a decision diamond for p < 0.05"
4. [ ] Generate and send to editor
5. [ ] In editor, open Journal tab
6. [ ] Select a publication preset
7. [ ] Verify figure formatting applied
8. [ ] Export as PDF with A4, portrait, 10mm margins
9. [ ] Verify PDF downloads with correct layout

### I. Credits Page Verification
1. [ ] Navigate to `/illustrate/credits`
2. [ ] Verify all three sections display (Illustrations, Icons, Software)
3. [ ] Click an external link — verify opens in new tab
4. [ ] Verify license badges display with correct text
5. [ ] Navigate back to `/illustrate` — verify link works

### J. Error Recovery
1. [ ] In editor, attempt File → Open with a `.txt` file — verify error toast
2. [ ] Attempt pathfinder Unite with a single object — verify error message
3. [ ] In agent mode, submit prompt and immediately click "Stop" — verify clean state
4. [ ] Disconnect network, attempt generation — verify error message in chat
5. [ ] Reconnect and retry — verify generation succeeds

---

*Generated from source code in `src/app/(app)/illustrate/`, `src/components/illustration/`, and related modules — March 2026*

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Welcome Page — Detailed Behavior
- [ ] Header shows FINNISH logo lockup with icon at the top-left of `/illustrate`
- [ ] Welcome page has no secondary nav links or settings controls in the header
- [ ] Hero tagline text reads "Create professional diagrams, flowcharts, and scientific illustrations with AI assistance or precision manual tools."
- [ ] "Create with AI" card description reads "Describe what you want and let AI generate it for you"
- [ ] "Open Editor" card description reads "Use professional tools for precise manual editing"
- [ ] Action cards are rendered as `Link` elements, not custom button divs
- [ ] Recent Diagrams section header shows "View all" link only when at least 1 recent diagram exists
- [ ] "View all" link in Recent Diagrams routes to `/illustrate/editor`
- [ ] Recent Diagrams list is truncated to the first 6 parsed items from `localStorage['finnish-recent-diagrams']`
- [ ] Recent diagram card has `role="button"` and `tabIndex=0`
- [ ] Recent diagram card `aria-label` includes both diagram name and relative last-edited text
- [ ] Recent diagram thumbnail renders `img` when `thumbnail` exists and falls back to file icon when missing
- [ ] Recent diagram thumbnail image is decorative with empty `alt` and `aria-hidden="true"`
- [ ] Relative date formatter falls back to locale date string after 7 or more days
- [ ] Empty Recent Diagrams state shows exact text "No recent diagrams. Create your first one!"
- [ ] Quick Templates grid label is "Quick templates" via `aria-label`
- [ ] Quick template card `aria-label` includes both template name and description
- [ ] Quick template cards navigate to `/illustrate/agent?template={id}` even though the agent page itself does not consume that query param in the current route component
- [ ] Welcome-page template cards expose only icon and name text; description is used in accessibility label rather than shown visibly
- [ ] Welcome-page keyboard activation helper triggers on `Enter` and Space and prevents default on Space

### Agent Mode — Hydration, Layout, and Sidebar
- [ ] `/illustrate/agent` shows a three-column skeleton before client hydration completes
- [ ] Hydration skeleton includes placeholder left sidebar, chat area, and preview pane blocks
- [ ] Agent mode is wrapped in an `ErrorBoundary` with full-screen illustration fallback UI
- [ ] Template sidebar title reads "Templates"
- [ ] Sidebar collapse button title is "Collapse sidebar"
- [ ] Collapsed sidebar replaces the full template list with a single expand button
- [ ] Collapsed sidebar expand button title is "Expand sidebar"
- [ ] Template search input placeholder reads "Search templates..."
- [ ] Category tabs are hidden whenever template search query is non-empty
- [ ] Template search matches against template `name` and `description`
- [ ] Template search pulls from all templates across categories instead of only the selected category
- [ ] Empty template-search state shows exact text "No templates found"
- [ ] Sidebar footer helper text reads "Click a template to populate the prompt"
- [ ] Selected category default is `medicine`
- [ ] Selected category persists via `finnish-agent-storage`
- [ ] Sidebar collapsed state does not persist across refresh because `isSidebarCollapsed` is not included in store partialization
- [ ] Template search text does not persist across refresh because it is component-local state
- [ ] Category tabs shown in the live sidebar are Medicine, Biology, Chemistry, and General
- [ ] Medicine category contains exactly 3 built-in templates in the store
- [ ] Biology category contains exactly 3 built-in templates in the store
- [ ] Chemistry category contains exactly 2 built-in templates in the store
- [ ] General category contains exactly 4 built-in templates in the store
- [ ] Template card click calls `onSelectTemplate(template.prompt)` directly
- [ ] Template click sends the prompt immediately in the current route instead of prefilling the textarea for later edit

### Agent Mode — Prompt Input and Generation Flow
- [ ] Prompt input is a multiline `textarea`, not a single-line input
- [ ] Prompt input placeholder reads "Describe the diagram you want to create..."
- [ ] Prompt input starts empty on initial render
- [ ] Prompt input auto-resizes with content up to 200px height
- [ ] Prompt input is disabled while generation is in progress
- [ ] Send button is disabled when trimmed textarea value is empty
- [ ] Send button becomes enabled as soon as textarea contains non-whitespace text
- [ ] Clicking Send trims leading and trailing whitespace before request submission
- [ ] Successful send clears the textarea value immediately after dispatch
- [ ] Successful send resets textarea inline height back to auto
- [ ] Pressing Enter without Shift submits the prompt
- [ ] Pressing Shift+Enter inserts a newline instead of submitting
- [ ] While generating, the Send button is replaced by a Stop button
- [ ] Stop button title is "Stop generation"
- [ ] Stop button calls `AbortController.abort()` on the in-flight request
- [ ] Aborting generation clears loading state without appending a cancellation assistant message
- [ ] Prompt input footer hint reads "Press Enter to send, Shift + Enter for new line"
- [ ] Live prompt input does not expose a visible character counter
- [ ] Live prompt input does not enforce a local 4000-character limit in the component
- [ ] Live prompt input does not expose a style dropdown in the chat composer
- [ ] Live prompt input does not expose a model dropdown in the chat composer
- [ ] Agent request body always sets `backend: 'auto'`
- [ ] Agent request body defaults `geminiModel` to `flash` when no override is provided
- [ ] Style inference upgrades to `detailed` when prompt includes `detailed`, `intricate`, or `complex`
- [ ] Style inference upgrades to `schematic` when prompt includes `schematic`, `technical`, or `diagram`
- [ ] Style inference upgrades to `photorealistic` when prompt includes `realistic`, `photorealistic`, or `lifelike`
- [ ] Style falls back to `flat` when none of the style keywords are found
- [ ] Domain detection runs before the `/api/illustration/generate` request is sent
- [ ] Error response appends an assistant message beginning with "Sorry, I encountered an error:"
- [ ] Error assistant message is marked with `isError: true`
- [ ] Successful assistant response text includes caption when `illustration.caption` is present
- [ ] Successful assistant response appends vectorization hint when `illustration.vectorized` is true
- [ ] Successful assistant response appends editable path count when `illustration.pathCount` is provided
- [ ] Mermaid backend responses append "You can edit the diagram structure in the Editor mode."
- [ ] Gemini backend responses append "The raster preview is available for reference."

### Agent Mode — Chat History, Preview, and Message Actions
- [ ] Empty chat state shows welcome title "Welcome to FINNISH"
- [ ] Empty chat state helper text ends with "Try asking me to:"
- [ ] Empty chat state renders 4 suggestion buttons
- [ ] Suggestion button "Create a CONSORT flow diagram for a clinical trial" sends immediately when clicked
- [ ] Suggestion button "Generate a forest plot for meta-analysis" sends immediately when clicked
- [ ] Suggestion button "Design a biological pathway diagram" sends immediately when clicked
- [ ] Suggestion button "Build a PRISMA flowchart for systematic review" sends immediately when clicked
- [ ] User message role label is "You"
- [ ] Assistant message role label is "FINNISH"
- [ ] Message timestamp is formatted with 2-digit hour and minute via `toLocaleTimeString`
- [ ] Assistant typing state shows text "Generating diagram..."
- [ ] Chat container auto-scrolls to the bottom whenever messages or loading state change
- [ ] Generated-diagram message renders action buttons labeled Edit, Export, Regenerate, and Copy SVG
- [ ] Edit button title is "Edit in canvas editor"
- [ ] Edit button stores SVG under `sessionStorage['scholarsync-illustration-agent-import']` when no override callback is provided
- [ ] Edit button redirects to `/illustrate/editor?import=agent`
- [ ] Export dropdown button label is "Export"
- [ ] Export dropdown closes when clicking outside the dropdown wrapper
- [ ] Export SVG action downloads filename `diagram-{messageId}.svg`
- [ ] Export PNG action renders the SVG onto a temporary canvas before download
- [ ] Export PNG action downloads filename `diagram-{messageId}.png`
- [ ] PNG export paints a white background before drawing the SVG
- [ ] Regenerate button only resends when the message immediately before the target assistant message is a user message
- [ ] Copy SVG button writes raw SVG text to `navigator.clipboard`
- [ ] Copy SVG button text changes to "Copied!" after successful copy
- [ ] Copy SVG success visual state lasts about 2 seconds before returning to "Copy SVG"
- [ ] Copy SVG failure logs to console and does not show a toast in the current component
- [ ] Preview pane is rendered only when both `showPreviewPane` and `currentDiagram` are truthy
- [ ] Preview pane header title is "Preview"
- [ ] Preview-pane close button title is "Close preview"
- [ ] Closing the preview pane only flips local component state and does not clear `currentDiagram`
- [ ] Agent route does not expose a visible control to reopen the right preview pane after it is closed
- [ ] Inline `DiagramPreview` zoom starts at 100%
- [ ] `DiagramPreview` zoom-in button disables at 400%
- [ ] `DiagramPreview` zoom-out button disables at 25%
- [ ] `DiagramPreview` fit button resets zoom back to 100%
- [ ] `DiagramPreview` supports Ctrl/Cmd + mouse wheel zooming between 25% and 400%
- [ ] `DiagramPreview` sanitizes SVG by stripping `<script>` nodes and `on*` attributes before rendering
- [ ] Agent store `previewZoom` exists but is not wired to the live `DiagramPreview` zoom controls
- [ ] Messages persist across refresh, but `currentDiagram` does not persist because it is omitted from store partialization

### Editor Routes and Workspace Initialization
- [ ] `/illustrate/editor` and `/illustrate/editor/[id]` both lazy-load the editor with SSR disabled
- [ ] Dynamic editor route fallback text is exactly "Loading editor..."
- [ ] Editor is wrapped in both `ToastProvider` and `CanvasProvider`
- [ ] Editor is wrapped in an `ErrorBoundary` with illustration-specific fallback messaging
- [ ] Initial loading overlay shows "Initializing editor..." before canvas readiness
- [ ] Loading existing diagram overlay shows "Loading diagram..." when store loading is true after canvas is ready
- [ ] New editor session shows info toast "Editor ready. Start creating!" after canvas initialization
- [ ] Initial canvas width is clamped between 600 and 1200 pixels from viewport-derived available width
- [ ] Initial canvas height is clamped between 400 and 900 pixels from viewport-derived available height
- [ ] Editor route with `?import=agent` reads pending SVG from session storage only after canvas is ready
- [ ] Successful agent import removes the session storage key after import completes
- [ ] Successful agent import shows success toast "Imported diagram from Agent mode"
- [ ] Failed agent import shows error toast "Failed to import agent diagram"
- [ ] Loading `/illustrate/editor/[id]` reads `localStorage['finnish-diagram-{id}']`
- [ ] Successful diagram load shows success toast `Loaded diagram: {name || id}`
- [ ] Missing local diagram shows warning toast `Diagram "{id}" not found`
- [ ] Missing local diagram does not redirect away from the current route in the current implementation
- [ ] Diagram load exception shows error toast "Failed to load diagram"
- [ ] Scientific text toolbar becomes visible only for a single selected text-like object (`i-text`, `textbox`, or `text`)
- [ ] Scientific text toolbar hides again when selection becomes empty or multi-select

### Editor Menus, Toolbar, and Status Bar — Detailed Cases
- [ ] File > Open creates a temporary hidden file input rather than using a persistent visible upload control
- [ ] File > Open file picker accept string is `.finnish,.json,.svg`
- [ ] File > Open shows info toast `Loading "{file.name}"...` before file parsing begins
- [ ] File > Open parses selected file as JSON text regardless of extension
- [ ] Opening a raw SVG file from the File menu fails JSON parsing and shows the invalid-format error toast in the current implementation
- [ ] File > Open success toast reads `Opened "{file.name}" successfully`
- [ ] File > Open failure toast reads `Invalid file format. Please select a valid .finnish, .json, or .svg file.`
- [ ] File > Save menu action downloads `diagram.finnish`
- [ ] File > Save menu action success toast reads `Diagram saved as "diagram.finnish"`
- [ ] `Ctrl+S` save shortcut also downloads `diagram.finnish` but uses toast text `Saved: diagram.finnish`
- [ ] File > Save failure toast reads `Failed to save diagram. Please try again.`
- [ ] File > Save As menu action prompts with default value `diagram.finnish`
- [ ] File > Save As menu action appends `.finnish` when the entered filename omits the extension
- [ ] File > Save As menu action success toast reads `Saved as "{finalFilename}"`
- [ ] `Ctrl+Shift+S` shortcut save-as path shows toast `Saved: {filename}` using the raw prompt string instead of the final appended download name
- [ ] File > Recent Files submenu is static placeholder content rather than a live recent-file list
- [ ] File > Recent Files includes disabled rows `diagram-1.finnish`, `flowchart.finnish`, and `No recent files`
- [ ] Image menu includes disabled placeholder items `Crop Image` and `Resize Image`
- [ ] Help > Keyboard Shortcuts currently shows a long-lived toast summary rather than opening the richer `ShortcutsHelp` modal component
- [ ] Help > Keyboard Shortcuts toast stays visible for about 10 seconds
- [ ] Help > About FINNISH shows toast text beginning `FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool.`
- [ ] Help > About FINNISH toast stays visible for about 8 seconds
- [ ] Help > Documentation opens `https://finnish.dev/docs` in a new tab
- [ ] Toolbar root has `role="toolbar"` and `aria-orientation="vertical"`
- [ ] Toolbar keyboard navigation supports `ArrowUp`, `ArrowDown`, `Home`, and `End` for moving focus between toolbar buttons
- [ ] Polygon config popup opens only when the Polygon tool is clicked while already active
- [ ] Polygon sides input clamps values to 3 through 24 in the store
- [ ] Star config popup opens only when the Star tool is clicked while already active
- [ ] Star points input clamps values to 3 through 24 in the store
- [ ] Scientific Shapes toolbar button label is "Scientific Shapes"
- [ ] Status bar shows selection value `None` when no objects are selected
- [ ] Status bar zoom reset button `aria-label` includes the current zoom percentage
- [ ] Status bar zoom-in increments by 10%
- [ ] Status bar zoom-out decrements by 10%
- [ ] Status bar zoom reset restores store zoom and viewport transform to defaults
- [ ] Ruler-corner unit toggle title is `Ruler units: {UNIT} (click to toggle)`

### Editor File Import, Canvas Interaction, and Toast Outcomes
- [ ] Creating a new document shows browser confirm text `Create new document? Unsaved changes will be lost.`
- [ ] Confirming New clears the canvas and shows info toast `New document created`
- [ ] Cancelling New leaves current canvas state intact
- [ ] Hidden Place Image picker accepts `.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml`
- [ ] Unsupported image file selection shows error toast `Unsupported image file. Use PNG, JPG, or SVG.`
- [ ] Successful image file placement from picker shows success toast `Placed image: {file.name}`
- [ ] Pasting supported image data from clipboard shows success toast `Pasted image from clipboard`
- [ ] Image-import failure shows error toast `Failed to import image`
- [ ] Canvas drag-over sets `dropEffect` to `copy`
- [ ] Canvas drag-leave ignores internal child transitions so the active dropzone does not flicker off while moving within the canvas area
- [ ] Dropping without a supported image file shows error toast `Drop a PNG, JPG, or SVG image file.`
- [ ] Canvas drop imports only the first supported image file from the dropped file list
- [ ] Export success toast text is format-specific for PNG, PDF, SVG, PowerPoint, and LaTeX
- [ ] Export failure toast reads `Export failed. Please try again.`
- [ ] Document settings modal confirm shows success toast `Canvas updated to {w}x{h}`
- [ ] Hand-drawn apply-to-selection path only runs when hand-drawn mode is enabled
- [ ] Right panel active tab defaults to `layers`
- [ ] Right panel tab labels are Layers, Properties, Icons, Style, and Journal
- [ ] Right panel Properties tab lazy-load is wrapped in its own nested error boundary
- [ ] Right panel icon insertion centers the inserted icon and scales it to about 64px max dimension
- [ ] Right panel icon insertion success toast reads `Added "{icon.name}" to canvas`
- [ ] Right panel icon insertion failure toast reads `Failed to add icon to canvas`
- [ ] Right panel icon insertion shows warning toast when canvas is not ready

### Save, Persistence, and API Reality
- [ ] Live editor route does not write recent diagrams into `localStorage['finnish-recent-diagrams']` during Save or Save As in the current implementation
- [ ] Live editor route does not write `localStorage['finnish-diagram-{id}']` during Save or Save As in the current implementation
- [ ] Welcome page recent-diagram list depends on pre-existing localStorage entries from elsewhere rather than current editor Save actions
- [ ] `POST /api/illustration/save` requires an authenticated user and returns 401 JSON error when auth lookup fails
- [ ] `POST /api/illustration/save` applies the `illustrations` write rate limit before parsing the request body
- [ ] `POST /api/illustration/save` validates `title` with `min(1)` and `max(500)`
- [ ] `POST /api/illustration/save` returns 400 with flattened field errors when validation fails
- [ ] `POST /api/illustration/save` currently returns a mock success payload with a random numeric `id`
- [ ] `POST /api/illustration/save` returns echoed illustration fields plus `createdAt` and `updatedAt`
- [ ] `POST /api/illustration/save` does not create a durable database record in the current implementation

### Credits Page — Detailed Behavior
- [ ] Credits header logo links to `/`
- [ ] Credits-page "Back to Home" link also routes to `/`
- [ ] Credits page title reads "Credits & Attribution"
- [ ] Credits subtitle begins "FINNISH is built on the shoulders of giants."
- [ ] Credits page renders exactly 3 content sections: Scientific Illustrations, Icon Libraries, and Software Libraries
- [ ] Scientific Illustrations section title includes "(CC-BY - Attribution Required)"
- [ ] Attribution cards gain accent border and upward translate hover effect
- [ ] Attribution card license badge color changes based on license family returned by `getLicenseBadgeStyle`
- [ ] Attribution link text shows the raw external URL
- [ ] Attribution links use `target="_blank"` with `rel="noopener noreferrer"`
- [ ] Credits footer text reads "Built with ♥ for the scientific community"
- [ ] Credits footer second line reads "FINNISH - Scientific Illustration Made Simple"

### Actual Current Behavior Corrections
- The live agent route does not show style/model dropdowns in the chat composer; style inference happens implicitly from prompt text.
- Template clicks in the live agent sidebar send the prompt immediately; they do not prefill the textarea first.
- The right preview pane can be closed, but the current route does not expose a restore/open-preview button afterward.
- `previewZoom` exists in the Zustand store, but the live preview component uses local `zoom` state instead.
- The welcome-page quick-template query string is generated, but the current `/illustrate/agent` route component does not read `?template=` and pre-seed the prompt.
- File > Open advertises `.svg` support in the picker, but the current handler parses the selected file as JSON and rejects raw SVG files.
- The current editor Save/Save As flows download files locally; they do not update recent-diagram localStorage entries in the live route.
- `POST /api/illustration/save` is a placeholder mock endpoint in the current source tree, not a finished persistent save path.
- Help > Keyboard Shortcuts currently shows a toast summary; it does not open the richer `ShortcutsHelp` modal component that exists elsewhere in the codebase.

## Re-Audit Discoveries (Codex Pass 2)

### Fabric.js Canvas Internals
- [ ] `Canvas` initializes Fabric with `width`, `height`, `backgroundColor`, `selection: true`, `preserveObjectStacking: true`, `renderOnAddRemove: true`, `stopContextMenu: true`, and `fireRightClick: true`
- [ ] The live canvas initialization does not pass Fabric `selectionColor`, `selectionBorderColor`, or `selectionLineWidth`
- [ ] `useCanvas()` throws `useCanvas must be used within a CanvasProvider` when consumed outside the provider
- [ ] `CanvasProvider.clearCanvas()` clears all objects and resets the Fabric background color to `#ffffff`
- [ ] `CanvasProvider.importSVG()` uses `loadSVGFromString`, groups all parsed SVG objects with `util.groupSVGElements`, scales the group to fit within 90% of canvas width and height, and centers it on the canvas
- [ ] `CanvasProvider.selectAll()` filters out grid objects before constructing the `ActiveSelection`
- [ ] `CanvasProvider.copy()` stores serialized `obj.toObject()` payloads in memory only; it does not use the system clipboard
- [ ] `CanvasProvider.paste()` re-enlivens each serialized object independently, offsets each pasted object by `+20` left and `+20` top, and logs `Failed to paste object:` on per-object failure
- [ ] `CanvasProvider.zoomToFit()` ignores grid objects, fits the remaining content into 90% of the canvas viewport, and clamps the resulting zoom to a maximum of `2`
- [ ] `CanvasProvider.setZoom()` clamps requested zoom between `0.1` and `10`
- [ ] `CanvasProvider.centerView()` resets the viewport transform to `[1, 0, 0, 1, 0, 0]` instead of computing a content-aware center point
- [ ] Grid rendering is implemented as an overlay via `registerGridOverlay()` and not as persisted Fabric line objects
- [ ] Grid overlay registration adds `before:render` and `after:render` listeners, clears the top context before each render, and removes those listeners during cleanup
- [ ] Grid overlay lines use color `rgba(200, 200, 200, 0.3)` and 1px crisp-line drawing on the top canvas context
- [ ] Grid spacing is calculated as `gridSize * zoom`, with offsets derived from `viewportTransform[4]` and `viewportTransform[5]`
- [ ] Snap-to-grid snaps `left` and `top` to the nearest multiple of the current `gridSize`; it does not snap width, height, or rotation
- [ ] Guide snapping uses a hard threshold of `5` pixels and checks object left edge, center, and right edge or top edge, center, and bottom edge against guide positions
- [ ] `selection:created` and `selection:updated` both forward `e.selected` into the editor selection callback
- [ ] `selection:cleared` forwards an empty array into the editor selection callback
- [ ] The live canvas does not register a Fabric `object:selected` listener; selection state is driven by `selection:created` and `selection:updated`
- [ ] `object:modified` pushes history only when `shouldPushHistoryForEvent('object:modified', _isDrawing)` returns true, so in-progress drawing updates are excluded
- [ ] Hand-pan behavior updates `viewportTransform[4]` and `viewportTransform[5]` from pointer deltas in client coordinates and mirrors those values into the editor store pan state
- [ ] Status-bar zoom buttons and editor-store zoom clamp between `0.1` and `10`, while the agent preview zoom/store clamp to `25` through `400`, so zoom bounds are not uniform across illustrate

### Shape Defaults and Object Lifecycle
- [ ] The rendered editor has no dedicated `circle` creation tool; ellipse creation uses Fabric `Ellipse`
- [ ] The rendered editor has no dedicated `textbox` creation tool; the Text tool creates Fabric `IText`, and `textbox` support only applies to loaded or imported objects
- [ ] Rectangle draw start creates a Fabric rect with `width: 0`, `height: 0`, `fill: 'rgba(0, 120, 212, 0.1)'`, `stroke: '#0078d4'`, `strokeWidth: 2`, `selectable: false`, and `evented: false`
- [ ] Ellipse draw start creates a Fabric ellipse with `rx: 0`, `ry: 0`, `fill: 'rgba(0, 120, 212, 0.1)'`, `stroke: '#0078d4'`, `strokeWidth: 2`, `selectable: false`, and `evented: false`
- [ ] Line draw start creates a Fabric line whose `x1`, `y1`, `x2`, and `y2` all start at the pointer position, with `fill: undefined`, `stroke: '#0078d4'`, `strokeWidth: 2`, `selectable: false`, and `evented: false`
- [ ] Arrow draw start reuses the line defaults during drag, then finalizes into a Fabric `Group` containing the line plus a triangle arrowhead
- [ ] The arrowhead defaults to `width: 15`, `height: 15`, `fill: '#0078d4'`, and `angle = atan2(...) * 180 / Math.PI + 90`
- [ ] Polygon draw start creates a Fabric polygon from `generatePolygonPoints(0, 0, 0, polygonSides)`, so the initial radius is `0`
- [ ] Star draw start creates a Fabric polygon from `generateStarPoints(0, 0, 0, 0, starPoints)`, so both outer and inner radii start at `0`
- [ ] Polygon and star drawing use the same default `fill`, `stroke`, and `strokeWidth` as rect/ellipse, and holding `Shift` forces the radius to `max(abs(dx), abs(dy))`
- [ ] Star drawing fixes the inner radius to exactly `outerRadius * 0.5`
- [ ] None of the live shape-tool constructors explicitly set `opacity`, so opacity falls through to Fabric defaults until edited later
- [ ] The Text tool creates `IText` with literal content `Type here`, `width: 200`, `fontFamily: 'Arial'`, `fontSize: 16`, `fill: '#333333'`, `lineHeight: 1.16`, and `charSpacing: 0`
- [ ] Eyedropper sampling reads object fill when the pointer is over an object and falls back to the canvas background color when it is not
- [ ] Eyedropper apply mode writes the sampled color back to the `fill` property of the previously selected objects, fires `object:modified`, shows info toast `Color sampled: {HEX}`, and returns the active tool to Select
- [ ] Brush activation shows info toast `Loading brush engine...` if the freehand module has not finished lazy-loading
- [ ] Rough auto-conversion on shape finalize only applies to freshly drawn rectangle, ellipse, and line objects; polygon, star, arrow, and text are not auto-converted
- [ ] `convertObjectToRough()` only supports object types `rect`, `ellipse`, and `line`

### Properties Panel
- [ ] With no active selection, the Properties tab shows exact empty-state text `Select an object to edit its properties`
- [ ] Transform field synchronization listens to `selection:created`, `selection:updated`, `selection:cleared`, `object:moving`, `object:scaling`, `object:rotating`, and `object:modified`
- [ ] Transform field synchronization is deferred through `setTimeout(..., 40)` and clears that timeout during effect cleanup
- [ ] Mixed transform values render as the literal glyph `—`
- [ ] X, Y, W, H, Rotation, and Opacity are all text inputs, not native `type="number"` controls
- [ ] Invalid numeric transform input is ignored on change, the draft text remains visible until blur, and the underlying Fabric property is not updated until the value parses
- [ ] Focusing a mixed-value transform field clears the draft string instead of pre-filling a sentinel value
- [ ] Aspect-ratio lock toggles `lockUniScaling` on the selected objects and fires `object:modified`
- [ ] The common shape Appearance section exposes fill mode buttons `Solid`, `Linear`, and `Radial`
- [ ] Solid fill uses a color picker, while linear and radial fill modes delegate to `GradientEditor`
- [ ] Shape stroke controls expose a color picker, a slider plus number input for width `1..20`, dash presets `Solid`, `Dashed`, `Dotted`, `Dash-Dot`, and `Long Dash`, line-cap options `butt`, `round`, `square`, and line-join options `miter`, `round`, `bevel`
- [ ] Rect-only corner-radius controls include a slider plus number input from `0` to the computed safe max and four per-corner fields labeled `Top Left`, `Top Right`, `Bottom Right`, and `Bottom Left`
- [ ] All four rect corner fields still write the same uniform Fabric `rx/ry` value because the implementation does not support independent per-corner radii
- [ ] Line objects expose only Appearance color plus the shared Stroke controls; there is no fill editor for lines
- [ ] Text and textbox objects expose a Character panel with Font picker, Weight select, font size `1..999`, Bold/Italic/Underline/Strikethrough buttons, align buttons `Left`, `Center`, `Right`, `Justify`, line height `0.5..3`, character spacing `-200..1000`, fill color, stroke color, and stroke width `0..20`
- [ ] Character panel weight options are `Light (300)`, `Regular (400)`, `Medium (500)`, `Semi-Bold (600)`, `Bold (700)`, and `Black (900)`
- [ ] Image objects expose only read-only Width, Height, and Aspect ratio display rows; the live panel does not expose crop, recolor, or filter controls for images
- [ ] Group objects expose only a single `Ungroup` action in their type-specific section
- [ ] Unknown single-object types show exact fallback text `No editable properties for this object type`
- [ ] Multi-select mode shows Transform, Align, Pathfinder, Effects, a count label like `{n} objects selected`, helper text `Mixed values are shown as —`, and common lock/clipping indicators
- [ ] Align controls only render when at least 2 objects are selected, and Distribute controls only render when at least 3 objects are selected
- [ ] Pathfinder controls only render when at least 2 objects are selected
- [ ] The Common Actions lock button label switches between `🔒 Unlock` and `🔓 Lock`
- [ ] Brush settings appear whenever the active tool is Brush, even if no object is selected
- [ ] Brush settings expose Preset select values `Pen`, `Marker`, `Highlighter`, `Brush`, and `Calligraphy`, size `1..100`, thinning `0..1` step `0.05`, smoothing `0..1` step `0.05`, streamline `0..1` step `0.05`, a color picker, and opacity `0..1` step `0.05`

### Export Pipeline
- [ ] `ExportDialog` defaults to the `png` tab, resets its filename and local error state every time the dialog opens, and closes on `Escape` via a document-level keydown listener
- [ ] Clicking the export overlay closes the dialog only when `e.target === e.currentTarget` and `isExporting` is false
- [ ] The export button label changes from `Export` to `Exporting...` while `isExporting` is true
- [ ] `FormatTabs` exposes exactly five formats with labels and descriptions: `PNG / Raster image`, `SVG / Vector graphic`, `PDF / Document`, `PPTX / PowerPoint`, and `LaTeX / TikZ code`
- [ ] PNG export settings expose DPI presets `72`, `150`, `300`, and `600`, quality range `1..100`, and background choices `transparent` and `white`
- [ ] SVG export settings expose toggles for `Optimize SVG`, `Minify Output`, and `Embed Fonts`
- [ ] PDF export settings expose page sizes `A4`, `Letter`, and `Custom`, orientation `Portrait` or `Landscape`, custom width and height clamped to `50..1000` mm, and per-edge margins clamped to `0..100` mm
- [ ] PPTX export settings expose layouts `16:9`, `16:10`, `4:3`, and `Custom`, resolution choices `1x`, `2x`, and `4x`, background `white` or `transparent`, `centerImage`, plus optional title and author
- [ ] LaTeX export settings expose `standalone` and `includePreamble` toggles plus a TikZ preview textarea
- [ ] The LaTeX preview copy button enters a copied-success state for `2000` ms before resetting
- [ ] Editor-mode export hardcodes the basename `diagram` for every format, so the editable filename field in `ExportDialog` is currently ignored by the actual export handler
- [ ] Editor-mode PNG export uses `exportAsPng()` with `scale = dpi / 72`
- [ ] Editor-mode PNG export maps `background: 'transparent'` to `backgroundColor: undefined` and any non-transparent choice to `#ffffff`
- [ ] The PNG quality slider value is collected in the dialog but ignored by the editor export handler
- [ ] Editor-mode SVG export passes only `minify` and `embedFonts` into `exportAsSvg()`, and the helper currently ignores those options internally
- [ ] The SVG `optimize` toggle is UI-only in the current editor flow; it is never consumed by the export helper
- [ ] `exportAsSvg()` prepends an XML declaration and downloads a serialized clone of the SVG but does not actually implement optimization, minification, font embedding, or text-to-path conversion
- [ ] Editor-mode PDF export passes page size, orientation, and margins into `exportAsPdf()`
- [ ] `exportAsPdf()` uses a local `svg2pdf` stub that only warns and resolves when the full SVG-to-PDF library is not installed
- [ ] Editor-mode PPTX export calls `exportAsPptx(canvas, 'diagram', ...)` and therefore rasterizes the Fabric canvas instead of exporting vectors
- [ ] `exportAsPptx()` converts the canvas to a PNG data URL using `canvas.toDataURL({ format: 'png', quality, multiplier })`
- [ ] PPTX export defaults to slide layout `16x9`, multiplier `2`, quality `1`, company `FINNISH`, subject `Scientific Illustration`, and slide padding `0.5` inches
- [ ] PPTX export normalizes background `transparent` to an undefined slide background and `white` to hex `FFFFFF`
- [ ] Editor-mode LaTeX export does not generate or download a `.tex` file; it only shows success toast `LaTeX code ready!`
- [ ] The live editor export path has no empty-canvas guard and will still attempt to export the serialized empty canvas SVG
- [ ] Editor-mode export appends the temporary SVG element to `document.body` and removes it only on the success path; an exception before cleanup leaves no `finally` block to guarantee removal

### Scientific Shapes
- [ ] The scientific shapes panel exposes exactly 15 generator categories: `dna`, `membrane`, `cellLayer`, `arrow`, `neuron`, `mitochondria`, `nucleus`, `ribosome`, `vesicle`, `virus`, `bacteria`, `golgi`, `er`, `microtubule`, and `protein`
- [ ] DNA defaults are `length: 200`, `basePairs: 10`, `twist: 36`, `width: 40`, `style: 'simple'`, `showBasePairs: true`, `stroke: '#3B82F6'`, and `strokeWidth: 2`
- [ ] Membrane defaults are `length: 300`, `phospholipidCount: 15`, `bilayer: true`, `showHeadGroups: true`, `showTails: true`, `stroke: '#6B7280'`, and `fill: '#FEF3C7'`
- [ ] Cell-layer defaults are `rows: 2`, `columns: 5`, `cellWidth: 40`, `cellHeight: 50`, `cellType: 'cuboidal'`, `showNuclei: true`, `junctions: true`, `stroke: '#6B7280'`, and `fill: '#FEF3C7'`
- [ ] Scientific arrow defaults are `type: 'activation'`, `curved: false`, `start: { x: 10, y: 50 }`, `end: { x: 190, y: 50 }`, `stroke: '#374151'`, and `strokeWidth: 2`
- [ ] Neuron defaults are `type: 'pyramidal'`, `dendrites: 5`, `axonLength: 150`, `showMyelin: true`, `stroke: '#374151'`, and `fill: '#FEF3C7'`
- [ ] Mitochondria defaults are `width: 120`, `height: 60`, `cristaCount: 5`, `showMatrix: true`, `stroke: '#374151'`, and `fill: '#FEF3C7'`
- [ ] Nucleus defaults are `diameter: 100`, `pores: 8`, `envelopeStyle: 'solid'`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#e2e8f0'`
- [ ] Ribosome defaults are `size: 60`, `subunits: 'both'`, `showRna: true`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#fcd34d'`
- [ ] Vesicle defaults are `diameter: 80`, `cargo: 'dots'`, `membraneStyle: 'solid'`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#c4b5fd'`
- [ ] Virus defaults are `diameter: 100`, `type: 'icosahedral'`, `spikeLength: 15`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#10b981'`
- [ ] Bacteria defaults are `type: 'bacillus'`, `length: 100`, `width: 40`, `flagella: 2`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#34d399'`
- [ ] Golgi defaults are `size: 120`, `cisternae: 5`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#f472b6'`
- [ ] ER defaults are `type: 'rough'`, `size: 120`, `branches: 5`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#fbbf24'`
- [ ] Microtubule defaults are `length: 200`, `protofilaments: 13`, `showDimer: false`, `stroke: '#4a5568'`, and `strokeWidth: 2`
- [ ] Protein defaults are `type: 'alpha-helix'`, `length: 150`, `strands: 3`, `stroke: '#4a5568'`, `strokeWidth: 2`, and `fill: '#60a5fa'`
- [ ] Scientific shape previews are rendered with raw SVG strings through `dangerouslySetInnerHTML`
- [ ] Scientific shape insertion rasterizes the generated SVG through `Blob` plus `FabricImage.fromURL()` instead of inserting editable vector paths
- [ ] Inserted scientific shapes are scaled to fit within 60% of the current canvas width and height and then centered
- [ ] Successful scientific-shape insertion closes the panel but does not show a toast
- [ ] Scientific-shape insertion failures are only logged to `console.error('Failed to insert shape:', error)`

### Icon Panel
- [ ] Icon search input placeholder is exactly `Search all icons...`
- [ ] Icon search debounces query emission by `200` ms
- [ ] Pressing `Escape` in the icon search field clears the current query, and pressing `Escape` again when already empty blurs the input
- [ ] Search results label renders as `{n} result(s) for "{inputValue}"`
- [ ] The icon panel header title is exactly `Icon Library`
- [ ] The icon panel count label uses `{iconCounts.total} icons`
- [ ] Main icon categories are `All`, `Medical`, `Science`, `General`, and `Brands`
- [ ] Personal icon categories are `Favorites`, `Recent`, and `Collections`
- [ ] The quick-access button label is `Recent ({recentIconIds.length})`
- [ ] Category browsing loads only `health`, `science`, `iconpark`, and `simple` library collections into the visible panel dataset
- [ ] Global icon search additionally queries `bioicons`, `bioicons-full`, and `scidraw`, so some searchable icons are not reachable through category browsing alone
- [ ] `searchAllIcons('')` returns an empty result set instead of all icons
- [ ] Search results merge `searchAllIcons(query)` with a local fuzzy search over icon names, de-duplicate the combined list, and cap visible results at `100`
- [ ] Recent empty state text is `No recent icons. Select an icon to add it here.`
- [ ] Search empty state text is `No icons matching "{searchQuery}"`
- [ ] Favorites empty state text is `No favorites yet. Click the heart icon on any icon to save it here.`
- [ ] Collections-empty text with a selected collection is `This collection is empty.`
- [ ] Collections-empty text without a selected collection is `Select a collection or create a new one.`
- [ ] Collections panel empty-state helper is `No collections yet. Create one to organize your icons!`
- [ ] Generic category empty-state text is `No icons in this category`
- [ ] The help text below icon actions reads `Click to select, then Insert to add to canvas`
- [ ] AI icon generation is only offered when the search query is non-empty, the current results list is empty, and `isAIGenerationAvailable()` returns true
- [ ] The AI icon generation button label changes from `Generate AI Icon` to `Generating...` while the request is in flight
- [ ] AI icon generation calls `generateIconFromQuery(searchQuery, { size: 64, style: 'outline' })`
- [ ] AI icon generation failure text is `Failed to generate icon. Please try again.`
- [ ] The collection-create prompt text is `Enter collection name:`
- [ ] The collection-delete confirm text is `Delete collection "{collection.name}"?`
- [ ] `IconPreview` shows exact empty-state text `Hover over an icon to preview`
- [ ] `IconPreview` waits `50` ms before scraping the rendered `<svg>` from React-component icons for copy/tint actions
- [ ] Copy-SVG success UI in `IconPreview` resets after `2000` ms
- [ ] Right-panel icon insertion warns `Cannot add icon: canvas not ready` when the editor canvas or SVG payload is missing
- [ ] Right-panel icon insertion warns `No valid objects found in SVG` when Fabric parses zero non-null SVG objects
- [ ] Right-panel icon insertion groups parsed SVG objects, scales the group so the max dimension becomes `64`, centers it using `(canvasWidth - 64) / 2` and `(canvasHeight - 64) / 2`, and sets `name: icon.name`

### Style, Journal, and Layers Panels
- [ ] The Style tab is hand-drawn-style controls only; journal presets are not implemented inside `StylePanel`
- [ ] Style toggle only mutates the hand-drawn settings object; existing canvas objects do not change until `Apply to Selection` runs
- [ ] Hand-drawn presets are `clean` (`roughness: 0`, `bowing: 0`, `fillStyle: 'solid'`), `sketch` (`roughness: 1`, `bowing: 1`, `fillStyle: 'hachure'`), and `rough` (`roughness: 2`, `bowing: 1.5`, `fillStyle: 'cross-hatch'`)
- [ ] Hand-drawn roughness slider range is `0..3` step `0.1`
- [ ] Hand-drawn bowing slider range is `0..3` step `0.1`
- [ ] Hand-drawn stroke-width slider range is `0.5..8` step `0.5`
- [ ] Hand-drawn fill patterns are exactly `solid`, `hachure`, `cross-hatch`, `dots`, `zigzag`, and `dashed`
- [ ] `Apply to Selection` is disabled whenever there is no current selection or hand-drawn mode is disabled
- [ ] `settingsToRoughOptions()` maps the style panel to Rough.js with `roughness`, `bowing`, `strokeWidth`, `fillStyle`, and optional `seed`
- [ ] The separate Journal tab provides figure-label, scale-bar, panel-letter, copyright, color-convention, and accessibility tools; it is not a theme/style preset tab
- [ ] Layer store persistence key is `finnish-layer-store`
- [ ] Layer store persists only `layers`, `activeLayerId`, and `isPanelExpanded`
- [ ] The initial persisted layer stack contains exactly one layer with `id: 'default'`, `name: 'Layer'`, `visible: true`, `locked: false`, `objects: []`, and `order: 0`
- [ ] Layers panel empty-state text is `No layers yet`
- [ ] Layers panel empty-state helper text is `Click + to add a layer`
- [ ] New layers default to `Layer {layers.length + 1}`
- [ ] Layer delete confirm text is exactly `Delete this layer?`
- [ ] Deleting the only remaining layer is silently blocked in the store and does not show an error or warning
- [ ] Layer rename starts on double-click, commits on `Enter`, cancels on `Escape`, and also commits on blur
- [ ] Visibility button titles are `Hide layer` and `Show layer`
- [ ] Lock button titles are `Unlock layer` and `Lock layer`
- [ ] Layer rows are rendered in reversed order so the highest-order layer appears first in the panel
- [ ] Layer drag reordering uses native HTML5 drag events and `reorderLayers(reorderedIds)`; it does not move Fabric object z-order on the canvas
- [ ] The live Layers panel is not synchronized with Fabric object membership, selection, visibility, or lock state on the canvas

### Agent Route and Agent Store
- [ ] `POST /api/illustration/generate` validates `prompt` with `.min(1).max(4000)`, `backend` as `mermaid | svg | gemini | auto`, `style` as `flat | detailed | schematic | photorealistic`, `geminiModel` as `pro | flash`, optional `domain`, optional `slideContext`, and optional `existingDiagram`
- [ ] Auth lookup failure in `/api/illustration/generate` returns `401` with JSON `{ error: "Unauthorized" }`
- [ ] The generate route applies the `illustrations` AI rate limit immediately after auth and returns the limiter response directly when blocked
- [ ] Validation failure returns `400` with JSON `{ error: "Invalid request", details: parseResult.error.flatten().fieldErrors }`
- [ ] Backend `auto` mode calls `detectBestBackend(prompt, domain)` and logs `Auto-selected backend: {selectedBackend}`
- [ ] Mermaid generation strips fenced-code wrappers like ```mermaid and ```json and also replaces smart quotes before returning content
- [ ] Mermaid generation extracts `syntax` from a JSON payload when the model responds with JSON and unescapes `\\n` back into newlines
- [ ] Gemini generation throws `GEMINI_API_KEY not configured` when the API key is unavailable
- [ ] Gemini vectorization uses `pngToEditableSVG(..., { colorCount, minColorRatio: 0.02, filterSpeckle: 4, simplify: true })` where `colorCount` is `16` for `flat`, `32` for `detailed`, and `16` for `schematic` or `photorealistic`
- [ ] Gemini unavailability during explicit or auto Gemini selection falls back to the SVG backend only when the thrown error message mentions `GEMINI_API_KEY`
- [ ] SVG-backend failures fall back to Mermaid generation
- [ ] The success response normalizes output to `illustration.content`, `illustration.backend`, `illustration.format`, `illustration.caption`, and `illustration.domain`, plus optional `pathCount`, `colorPalette`, `rasterPreview`, and `vectorized`
- [ ] Route-level failure returns `500` with JSON `{ error: "Illustration generation failed", details: error.message || "Unknown error" }`
- [ ] Agent store persistence key is `finnish-agent-storage`
- [ ] Agent store initial state is `messages: []`, `isLoading: false`, `currentDiagram: null`, `selectedCategory: 'medicine'`, `templateSearchQuery: ''`, `isSidebarCollapsed: false`, and `previewZoom: 100`
- [ ] Agent store persists only the last 50 messages plus `selectedCategory`
- [ ] Agent store does not persist `isLoading`, `currentDiagram`, `templateSearchQuery`, `isSidebarCollapsed`, or `previewZoom`
- [ ] `addMessage()` generates ids in the shape `msg_{Date.now()}_{random}` and stamps `timestamp` with `new Date().toISOString()`
- [ ] `addMessage()` updates `currentDiagram` only when the newly added message contains a `diagram`
- [ ] `updateMessage()` shallow-merges updates into the matching message id and does not recompute `currentDiagram`
- [ ] `clearMessages()` clears both `messages` and `currentDiagram`
- [ ] `setPreviewZoom()` clamps values between `25` and `400`

### Editor Store and Keyboard Shortcuts
- [ ] Editor-store history depth is capped at `50` serialized JSON states
- [ ] Undo and redo store full serialized canvas JSON strings, not command-level patches
- [ ] Editor store is not persisted, so zoom, pan, tool, selection, guides, and history reset on refresh
- [ ] The clipboard used by `CanvasProvider` lives in provider memory, while the `useKeyboardShortcuts` copy/paste path uses `window.__finnishClipboard`; clipboard state is not stored in `editorStore`
- [ ] Grid defaults are `gridVisible: true`, `snapToGrid: false`, and `gridSize: 20`
- [ ] Guide defaults are `showRulers: true`, `showGuides: true`, and empty horizontal and vertical guide arrays
- [ ] `addGuide()` rounds guide positions to 2 decimals, clamps them to non-negative values, and ignores duplicate positions
- [ ] `setGridSize()` ignores zero or negative values
- [ ] Pressing `Space` temporarily switches the active tool to Hand on keydown and restores the previous tool on keyup
- [ ] `Ctrl/Cmd+N` triggers New
- [ ] `Ctrl/Cmd+O` triggers Open
- [ ] `Ctrl/Cmd+S` triggers Save
- [ ] `Ctrl/Cmd+Shift+S` triggers Save As
- [ ] `Ctrl/Cmd+E` triggers Export
- [ ] `Ctrl/Cmd+Shift+B` opens Background Removal
- [ ] `Ctrl/Cmd+Shift+A` opens AI Generate Image
- [ ] `Ctrl/Cmd+Shift+P` opens Place Image
- [ ] `Ctrl/Cmd+Z` triggers Undo
- [ ] `Ctrl/Cmd+Shift+Z` triggers Redo
- [ ] `Ctrl/Cmd+Y` also triggers Redo
- [ ] `Ctrl/Cmd+C` copies the current Fabric selection into `window.__finnishClipboard`
- [ ] `Ctrl/Cmd+V` pastes from `window.__finnishClipboard`
- [ ] `Ctrl/Cmd+X` cuts via copy plus delete
- [ ] `Ctrl/Cmd+A` selects all non-grid objects
- [ ] `Delete` and `Backspace` delete the current Fabric selection except while Direct Select is active
- [ ] `Escape` clears the current selection
- [ ] `V` switches to Select
- [ ] `H` switches to Hand
- [ ] `R` switches to Rectangle
- [ ] `E` switches to Ellipse
- [ ] `Shift+E` switches to Eraser
- [ ] `L` switches to Line
- [ ] `A` switches to Direct Select
- [ ] `Shift+A` switches to Arrow
- [ ] `P` switches to Pen
- [ ] `T` switches to Text
- [ ] `I` switches to Eyedropper
- [ ] `C` switches to Scissors
- [ ] `M` switches to Measure
- [ ] Numeric shortcuts `1` through `8` map to Select, Hand, Rectangle, Ellipse, Line, Arrow, Pen, and Text respectively
- [ ] `+` and `=` zoom in by `0.1`
- [ ] `-` zooms out by `0.1`
- [ ] `Ctrl/Cmd+0` resets the viewport
- [ ] `Ctrl/Cmd+1` triggers zoom-to-fit
- [ ] `Ctrl/Cmd+'` toggles grid visibility
- [ ] `Ctrl/Cmd+Shift+;` toggles snap-to-grid
- [ ] `Ctrl/Cmd+R` toggles rulers
- [ ] `Ctrl/Cmd+Shift+R` toggles guides
- [ ] `Ctrl/Cmd+G` groups the current selection
- [ ] `Ctrl/Cmd+Shift+G` ungroups the selected group
- [ ] `Ctrl/Cmd+7` makes a clipping mask
- [ ] `Ctrl/Cmd+Alt+7` releases a clipping mask
- [ ] `Ctrl/Cmd+8` makes a compound path
- [ ] `Ctrl/Cmd+Alt+8` releases a compound path
- [ ] `Shift+H` flips the current selection horizontally
- [ ] `Shift+V` flips the current selection vertically
- [ ] While the Eraser tool is active, `[` decreases eraser size and `]` increases eraser size
- [ ] While the point-editing overlay is active, `Delete` or `Backspace` removes the selected anchor points and fires `object:modified`
- [ ] While the scientific text toolbar is open, `Escape` closes the toolbar
- [ ] Inline layer rename input commits on `Enter` and cancels on `Escape`

### Drag, Drop, Guides, and Toast System
- [ ] Supported image imports are `image/png`, `image/jpeg`, `image/jpg`, and `image/svg+xml`, plus filenames ending with `.png`, `.jpg`, `.jpeg`, or `.svg`
- [ ] Dropped or pasted images are always centered on the canvas by `centerImageOnCanvas()`; drop coordinates are not used for placement
- [ ] Imported images are scaled down only when their source width exceeds 50% of the canvas width
- [ ] Drag-and-drop import scans `event.dataTransfer.files` and picks the first supported image file; additional supported files in the same drop are ignored
- [ ] Guide dragging uses window-level `pointermove` and `pointerup` listeners and cleans both up when the drag ends or the component unmounts
- [ ] Dragging a horizontal guide back above the canvas overlay deletes it when `localY < 0`
- [ ] Dragging a vertical guide back left of the canvas overlay deletes it when `localX < 0`
- [ ] Double-clicking a horizontal guide prompts `Set horizontal guide position (px)`
- [ ] Double-clicking a vertical guide prompts `Set vertical guide position (px)`
- [ ] Toast provider defaults each toast to duration `5000`, keeps at most `5` visible toasts, and makes them dismissible by default
- [ ] Toast manual dismiss waits `200` ms before removing the toast from state so the exit animation can finish
- [ ] `Editor ready. Start creating!` is an info toast with explicit duration `3000`
- [ ] Help > Keyboard Shortcuts uses an info toast with duration `10000`
- [ ] Help > About FINNISH uses an info toast with duration `8000`
- [ ] Canvas eyedropper sampling uses an info toast `Color sampled: {HEX}`
- [ ] Canvas brush lazy-load uses an info toast `Loading brush engine...`
- [ ] Properties-panel pathfinder warning toast is `Select at least 2 objects for pathfinder operations`
- [ ] Properties-panel pathfinder failure toasts are `Operation produced no result`, `Unable to convert one or more selected objects for pathfinder`, and `Pathfinder operation failed` or the thrown message
- [ ] Right-panel icon insertion warning toast `No valid objects found in SVG` exists in the live code even though Pass 1 did not enumerate it
- [ ] There is no Yjs collaboration provider, awareness/cursor sync, or conflict-resolution layer wired into the rendered illustrate routes

### Behavior Corrections (Pass 2)
- The live editor does not configure Fabric selection highlight colors or border widths; any doc text claiming custom `selectionColor`, `selectionBorderColor`, or `selectionLineWidth` is inaccurate.
- The rendered editor has no dedicated circle tool and no dedicated textbox tool; ellipse creation uses `Ellipse`, and text creation uses `IText`.
- Scientific shapes are inserted as raster `FabricImage` objects generated from SVG blobs, not as editable vector groups or paths.
- The Layers panel is not connected to Fabric canvas object ordering, visibility, or locking; it is a separate persisted UI list.
- The Style tab does not contain journal style presets; journal tooling lives in the separate Journal tab, and export-time journal presets live in `ExportDialog`.
- The Export dialog filename field is currently ignored by the live export handler, which always exports as `diagram.*`.
- PNG export collects a quality slider in the UI, but the live editor export handler does not use that value.
- SVG export toggles for optimize, minify, and embed fonts are largely UI-only in the current implementation; the helper serializes the SVG but does not implement those transforms.
- The main editor export handler still only reports `LaTeX code ready!`, but the `LaTeXOptions` panel separately renders a `Download .tex` button that downloads `diagram.tex`.
- Drag-and-drop image placement is not pointer-relative; all imported images are centered on the canvas.
- The icon browser exposes more libraries to search than to browse, so category browsing is not a complete representation of the searchable icon set.
- No illustrate collaboration provider or Yjs-based real-time sync layer is present in the rendered code path.

### Components Referenced But Not Rendered
- `ShortcutsHelp` exists in `src/components/illustration/ShortcutsHelp.tsx`, is referenced by exports and docs, but is not imported by the rendered illustrate routes.
- `ImportDialog` exists in `src/components/illustration/ImportDialog`, but no rendered illustrate page imports it.
- `NewFromTemplate` exists in `src/components/illustration/NewFromTemplate`, but no rendered illustrate page imports it.
- `IconBrowser` exists in `src/components/illustration/IconBrowser`, but the live editor imports `IconPicker` instead.
- `JournalPresets` exists in `src/components/illustration/JournalPresets.tsx`, but no rendered illustrate page imports it.
- `shapes/ShapeGeneratorModal` exists in `src/components/illustration/shapes`, but the live editor uses `tools/ShapeGeneratorPanel` instead.

## Re-Audit Discoveries (Claude Code Pass 3)

### MenuBar Operation Toast Messages (`MenuBar.tsx`)
- [ ] Flip selection with no objects selected shows warning toast `Select at least 1 object to flip`
- [ ] Flip operation calls `toggleObjectFlip()` for each selected object and fires `object:modified` event
- [ ] Offset Path prompt reads `Offset distance in pixels (positive = outward, negative = inward):` with default value `10`
- [ ] Offset Path with selection count ≠ 1 shows warning toast `Select exactly 1 path or line`
- [ ] Offset Path success toast reads `Offset path created (${distance}px)`
- [ ] Offset Path supports both `FabricPath` and `Line` object types
- [ ] Clipping mask creation with < 2 objects shows warning toast `Select at least 2 objects. Topmost object will be used as clip shape.`
- [ ] Clipping mask creation success toast reads `Clipping mask created`
- [ ] Release clipping mask on non-clipped object shows warning toast `Select a clipped group to release its clipping mask.`
- [ ] Release clipping mask success toast reads `Clipping mask released`
- [ ] Compound path creation with < 2 objects shows warning toast `Select at least 2 paths to create a compound path.`
- [ ] Compound path creation success toast reads `Compound path created`
- [ ] Release compound path on non-compound object shows warning toast `Select a compound path to release it.`
- [ ] Release compound path success toast reads `Compound path released`
- [ ] `canReleaseClippingMask` checks `activeSelection.length === 1 && isClippingMaskGroup(activeSelection[0])`
- [ ] `canReleaseCompoundPath` checks `activeSelection.length === 1 && isCompoundPath(activeSelection[0])`
- [ ] MenuBar click-outside detection uses `mousedown` event on `document`, not `click`
- [ ] Help > About FINNISH full toast text is `FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool. Built with React, Fabric.js, and Zustand.`

### Quick Export vs Export Dialog Toast Messages
- [ ] MenuBar Quick Export SVG success toast reads `Exported as SVG`
- [ ] MenuBar Quick Export PNG success toast reads `Exported as PNG`
- [ ] MenuBar Quick Export PNG @2x success toast reads `Exported as PNG @2x`
- [ ] MenuBar Quick Export PNG @2x download filename is `diagram@2x.png`
- [ ] Export Dialog PNG export success toast reads `PNG exported successfully!`
- [ ] Export Dialog SVG export success toast reads `SVG exported successfully!`
- [ ] Export Dialog PDF export success toast reads `PDF exported successfully!`
- [ ] Export Dialog PPTX export success toast reads `PowerPoint exported successfully!`
- [ ] Quick Export and Export Dialog produce different toast messages for the same format

### Scientific Text Toolbar (`ScientificTextToolbar.tsx`)
- [ ] Toolbar header title text is `Scientific Text`
- [ ] Close button title attribute is `Close toolbar`
- [ ] `activeTab` state is initialized to `'greek'` with no setter function exposed, so only Greek letters are ever displayed
- [ ] Superscripts tab (16 symbols), Subscripts tab (15 symbols), and Math Symbols tab (21 symbols) exist in source code but are unreachable dead code
- [ ] Quick-format buttons `x²` (superscript) and `x₂` (subscript) ARE rendered and functional
- [ ] Lowercase Greek letters section title is `Greek Letters (Lowercase)` showing 23 letters (α through ω)
- [ ] Uppercase Greek letters section title is `Greek Letters (Uppercase)` showing 8 letters (Γ, Δ, Θ, Λ, Σ, Φ, Ψ, Ω)
- [ ] Symbol grid uses `gridTemplateColumns: 'repeat(8, 1fr)'` layout
- [ ] Symbol buttons use `fontFamily: 'Times New Roman, serif'`
- [ ] Symbol button hover: background changes to `var(--accent-primary)` with white text
- [ ] Toolbar positioned absolutely with z-index `1000`, min-width `280px`, max-height `400px`, overflowY `auto`
- [ ] `insertSymbol` for IText inserts at cursor position via `insertChars`; for Textbox it appends to text
- [ ] `insertSymbol` fires `object:modified` event after insertion
- [ ] `applySuperscript` calls `setSuperscript(0.6)` on the active text object
- [ ] `applySubscript` calls `setSubscript(0.6)` on the active text object

### Error Boundary Details (`ErrorBoundary.tsx`)
- [ ] Default fallback title is `Something went wrong` (not scope-specific)
- [ ] Scope-specific fallback title follows pattern `${scope} failed to load`
- [ ] Default fallback description is `An unexpected error occurred. Try resetting this section or reload the page.`
- [ ] Error message appended in parentheses after description when present: ` (${error.message})`
- [ ] Fallback container has `role="alert"` and `aria-live="assertive"`
- [ ] Primary action button text is `Try Again` (not "Reset" as documented in Section 21)
- [ ] `Reload Page` button appears ONLY in `fullScreen` mode
- [ ] Error details section visible ONLY when `process.env.NODE_ENV === 'development'`
- [ ] Error details toggle button text: `Show Error Details` / `Hide Error Details`
- [ ] Error details display: error name, message, stack trace, and component stack
- [ ] ErrorBoundary supports `resetKeys` prop — auto-resets when any key value changes
- [ ] Inline (non-fullScreen) error container has min-height `280px` with border-radius `12px`

### Toolbar Accessibility and Structure (`Toolbar.tsx`)
- [ ] Tool buttons are organized into 7 named groups with visual dividers between groups
- [ ] Group aria-labels: `Selection`, `Shapes`, `Lines`, `Draw`, `Text`, `Utility`, `Scientific Shapes`
- [ ] Each tool group uses `role="group"` with its respective aria-label
- [ ] Tool buttons have `aria-pressed` attribute reflecting active state
- [ ] Tool buttons have `data-tool-label` attribute set to the tool label
- [ ] Toolbar width derives from CSS custom property `var(--toolbar-width, 48px)`
- [ ] Shape config popups positioned at `position: 'absolute', left: '100%', top: '50%'` relative to their button
- [ ] Polygon/star numeric input validated with `Number.isFinite(value)` before store update

### Right Panel Tab Accessibility (`RightPanel.tsx`)
- [ ] Tab buttons use `role="tab"` with `aria-selected` attribute
- [ ] Tab button id follows pattern `tab-${tab.id}`
- [ ] Tab button `aria-controls` follows pattern `panel-${tab.id}`
- [ ] Tab content area uses `role="tabpanel"` with `aria-labelledby` matching the active tab id
- [ ] Tab content area id follows pattern `panel-${activeTab}`
- [ ] Right panel sidebar width derives from CSS custom property `var(--sidebar-width, 280px)`
- [ ] Canvas dimensions default to 800×600 in icon insertion fallback when canvas size is unavailable

### PointEditingOverlay Visuals and Interaction (`PointEditingOverlay.tsx`)
- [ ] Anchor point visual: border `#0f172a`, background `#ffffff`, cursor `move`
- [ ] Selected anchor: background `#1d4ed8`
- [ ] Handle point visual: border `#0284c7`, background `#bae6fd`, borderRadius `50%`, cursor `crosshair`
- [ ] Guide lines between anchor and handle: stroke color `#94a3b8`
- [ ] Holding `Alt` key during handle drag toggles `mirrorOpposite` behavior for independent handle control
- [ ] Click on path segment adds new anchor point when click is within `8px / zoom` threshold of nearest segment
- [ ] Shift+click on anchor adds or removes it from multi-selection set
- [ ] Double-click on anchor point toggles smooth/corner state via `toggleAnchorSmooth()`
- [ ] Double-click on overlay background exits point editing mode via `onExit()` callback
- [ ] Anchor and handle interactive divs have no `role` or `aria-label` attributes (accessibility gap)
- [ ] Drag state tracks two types: `'anchor'` (translates points) and `'handle'` (moves bezier control)

### Canvas Internals (`Canvas.tsx`)
- [ ] Canvas elements have `data-testid="illustrator-canvas-stage"` on container and `data-testid="illustrator-canvas"` on canvas
- [ ] `ConnectorManager` is initialized during canvas setup and disposed during cleanup via `connectorManagerRef`
- [ ] Custom `_isDrawing` flag is set on canvas: `(canvas as DrawingFlagCanvas)._isDrawing = false`
- [ ] Eraser, Scissors, and Measure tools are implemented as separate class instances (`EraserTool`, `ScissorsTool`, `MeasureTool`) stored in refs
- [ ] Freehand drawing module is lazy-loaded via dynamic import with promise caching in `freehandModulePromiseRef`
- [ ] Rough.js module is lazy-loaded via dynamic import with promise caching in `roughModulePromiseRef`
- [ ] Measurement overlay renders when `activeTool === ToolType.MEASURE && measurementOverlay !== null`
- [ ] Eyedropper preview overlay renders when `activeTool === ToolType.EYEDROPPER && eyedropperPreview.visible`
- [ ] Eraser cursor overlay renders when `activeTool === ToolType.ERASER && eraserCursor.visible`
- [ ] `mouse:dblclick` only reacts while `activeTool === ToolType.DIRECT_SELECT`; double-clicking empty canvas exits point-editing mode, and non-empty targets are ignored
- [ ] Connector color default is `#6366f1`

### CanvasContext Operation Details (`CanvasContext.tsx`)
- [ ] `ungroupSelected()` applies group transforms (angle, scaleX, scaleY adjustments) to each child item before removing the group and re-adding items individually
- [ ] `makeClippingMask()`, `releaseClippingMask()`, `makeCompoundPath()`, and `releaseCompoundPath()` all fire `canvas.fire('object:modified', { target })` after completion
- [ ] `subscribeToCanvasEvents()` provides a generic event subscription helper that returns an unsubscribe function for cleanup

### EditorMode Lazy Loading and State (`EditorMode.tsx`)
- [ ] EditorMode lazy-loads 7 components via `React.lazy()`: ExportDialog, BackgroundRemovalTool, AIGenerationTool, ShapeGeneratorPanel, FigurePanelGenerator, DocumentSettings, RightPanel
- [ ] `figurePanelGeneratorOpen` state controls Figure Panel Generator dialog visibility
- [ ] `isCanvasDragActive` state applies inline box-shadow `inset 0 0 0 2px var(--accent-primary)` to canvas area during drag
- [ ] Welcome toast `Editor ready. Start creating!` appears ONLY when no `id` prop is passed (new documents), not when loading existing diagrams
- [ ] Export handler creates a temporary SVG element with `position: 'absolute', left: '-9999px'` appended to `document.body`

### Status Bar Display Details (`StatusBar.tsx`)
- [ ] Selection count uses pluralization: `${selectionCount} object${selectionCount !== 1 ? 's' : ''}`
- [ ] `toolDisplayNames` map includes entries for `Pencil`, `Bracket`, `Callout`, `Dimension`, `Connector`, and `Text on Path` (ToolType enum values that are not exposed as toolbar buttons)
- [ ] Default tool display name when `activeTool` is not found in map: `'Select'`
- [ ] Zoom percentage displayed as `Math.round(zoom * 100)` followed by `%`

### Export Options Panel Details
- [ ] PNG DPI descriptions: `Screen/Web` (72), `Standard` (150), `Print Quality` (300), `High Resolution` (600)
- [ ] PNG quality slider has text hints: `Smaller file` (left) and `Better quality` (right)
- [ ] PNG panel shows estimated output dimensions calculated as `(800 * dpi) / 72` and estimated file size in KB
- [ ] SVG Optimize description: `Remove unnecessary elements and attributes`
- [ ] SVG Minify description: `Remove whitespace for smaller file size`
- [ ] SVG Embed Fonts description: `Convert text to paths for consistent display`
- [ ] SVG panel renders feature tags: `Scalable`, `Editable`, `Optimized`, `Minified`; `Editable` tag is active only when `embedFonts` is false
- [ ] PPTX slide layout dimensions: 16:9 (10″×5.625″), 16:10 (10″×6.25″), 4:3 (10″×7.5″)
- [ ] PPTX resolution descriptions: `Standard` (1x), `High quality` (2x), `Ultra HD` (4x)
- [ ] PPTX centering description: `Automatically center the illustration with padding`
- [ ] PPTX title placeholder: `Cell Biology Diagrams`; author placeholder: `Dr. Jane Smith`
- [ ] LaTeX Standalone description: `Generate complete compilable .tex file`
- [ ] LaTeX Include Preamble description: `Add TikZ package imports and libraries`
- [ ] LaTeX panel renders a `Download .tex` button that creates a Blob and downloads `diagram.tex` independently of the main Export button
- [ ] LaTeX help text: `Compile with: pdflatex diagram.tex`
- [ ] Export dialog filename label is `Filename` with placeholder `Enter filename`
- [ ] Export dialog shows `Journal Preset` selector for png, svg, and pdf formats only
- [ ] Default journal preset option text: `None (no journal preset)`
- [ ] Export dialog renders both `Cancel` and `Export` / `Exporting...` buttons
- [ ] Export dialog close button has `aria-label="Close dialog"`

### Journal Figure Panel Details (`JournalFigurePanel.tsx`)
- [ ] Figure label style options: `Fig. 1`, `Figure 1`, `(a)`, `A`
- [ ] Scale bar unit options: `nm`, `μm`, `mm`, `cm`, `m`
- [ ] Panel letter auto-increments to next letter after each insertion (e.g., A → B → C)
- [ ] `ColorConventionManager` applies standardized color conventions to canvas objects via `handleApplyConventions`
- [ ] Color blind simulation types: `Deuteranopia (green-blind)`, `Protanopia (red-blind)`, `Tritanopia (blue-blind)`
- [ ] Accessibility check success text is `Colors appear sufficiently distinct for the selected simulation type.`
- [ ] Accessibility check fallback text is `Consider using patterns or textures alongside colors to convey information.`

### Icon Grid Virtualization (`IconGrid.tsx`)
- [ ] Icon grid implements scroll-based virtualization with `visibleRange` state tracking start and end indexes
- [ ] Row height calculated as `showNames ? iconSize + 32 : iconSize + 8`
- [ ] Spacer elements above and below visible range maintain scroll position during virtualization
- [ ] Truncation message: `Showing {N} of {total} icons. Scroll to load more.`
- [ ] Icon card title format: `${icon.name} (${icon.library})`
- [ ] Icon card `aria-label` format: `Icon: ${icon.name}`

### Icon Preview Details (`IconPreview.tsx`)
- [ ] 16 preset tint colors available in `commonColors` array
- [ ] Icon tinting via `applyTint()` replaces `currentColor`, `fill`, and `stroke` attributes in SVG
- [ ] SVG extraction from React component icons uses `50ms` setTimeout delay before DOM scraping
- [ ] Library license information displayed per icon in preview details
- [ ] Keywords display truncates to 8 and shows a bare `+N` indicator when more keywords remain

### Effects Panel Ranges (`EffectsPanel.tsx`)
- [ ] Shadow blur range: `0` to `50`
- [ ] Shadow X and Y offset range: `-50` to `50`
- [ ] Blur approximation range: `0` to `20`
- [ ] Full blend mode list: `source-over`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`

### Gradient Editor Details (`GradientEditor.tsx`)
- [ ] Linear gradient angle presets: 0°, 45°, 90°, 135°, 180°
- [ ] Radial gradient center positioning via `cx` / `cy` percentage values

### API Route: `/api/illustration/icons` (GET)
- [ ] No authentication required on this endpoint
- [ ] No rate limiting applied
- [ ] Input validation: requires `.svg` extension, rejects names containing `..` or `/`
- [ ] Error for missing name: `{ error: "Missing 'name' parameter" }` (400)
- [ ] Error for unsafe name: `{ error: "Invalid icon name" }` (400)
- [ ] Response `Content-Type: image/svg+xml` with `Cache-Control: public, max-age=31536000, immutable`
- [ ] Production: serves from R2 bucket at path `icons/bioicons/{name}`
- [ ] Development: serves from local `.data/icons/bioicons/{name}` directory
- [ ] Dev 404 message: `Icon not found (run upload script first)`; production 404: `Icon not found`

### API Route: `/api/illustration/icons/search` (GET)
- [ ] No rate limiting applied (unlike other illustration API routes)
- [ ] Query parameter `q` is optional; empty/missing returns empty results
- [ ] `expand_synonyms` parameter: boolean, default `true`
- [ ] `include_scores` parameter: boolean, default `false`
- [ ] Scoring algorithm: `100` (exact name match), `50` (starts-with), `25` (contains), `20` (category match), `30`/`15`/`10` (keyword exact/starts/contains), `3` (synonym match)
- [ ] Response includes `expanded_terms` array when `expand_synonyms` is true
- [ ] Category `medical` matches libraries `health`, `bioicons`, `bioicons-full`, or categories `anatomy`, `equipment`, `diagnostics`, `conditions`, `services`, and `biology`

### API Route: `/api/illustration/icons/generate` (POST)
- [ ] Schema: `name` (1–100 chars), `style` (`flat`/`outline`/`filled`/`minimal`), `category` (`scientific`/`medical`/`ui`/`arrows`/`shapes`)
- [ ] `color` is optional, `size` range 16–512 (default 64), `useGemini` boolean (default false)
- [ ] Rate limited with `RATE_LIMITS.ai`
- [ ] Response includes `metadata.pathCount` and `metadata.palette`
- [ ] `extractSVG()` strips markdown code block wrappers before returning SVG
- [ ] `cleanSVG()` adds `xmlns` and `viewBox` attributes to malformed SVGs
- [ ] Gemini generation failure falls back to LLM-based SVG generation

### API Route: `/api/illustration/save` (POST) — Full Schema
- [ ] Schema includes optional fields: `description`, `svgContent`, `canvasJson` (any), `mermaidSyntax`, `domain`, `sourceBackend`, `sourcePrompt`, `width` (number), `height` (number)
- [ ] Mock success response includes `userId` field alongside echoed illustration data

### API Route: `/api/illustration/generate` (POST) — Additional Details
- [ ] `traceGeneration()` called for observability tracing with `tier`, `modelId`, `feature`, `userId`
- [ ] Gemini vectorization `colorCount` is `16` for `flat`, `32` for `detailed`, and `16` again for `schematic` or `photorealistic`

### Editor Store Details (`editorStore.ts`)
- [ ] Editor store uses `subscribeWithSelector` middleware
- [ ] Editor store devtools name is `finnish-editor-store`
- [ ] `selectObjects(objectIds)` action replaces entire selection array
- [ ] `addToSelection(objectId)` action appends to selection array
- [ ] `removeFromSelection(objectId)` action filters from selection array

### Behavior Corrections (Pass 3)
1. **PDF page sizes**: The original doc (Section 14, line 631) lists "A4, Letter, A3, Custom" but `PDFOptions.tsx` provides only A4, Letter, and Custom — there is no A3 option.
2. **PNG quality minimum**: The original doc (Section 14, line 618) says quality "0–100" but `PNGOptions.tsx` uses range `1–100` (minimum 1, not 0).
3. **Error boundary button text**: Section 21 (line 860) says fallback UI includes a "Reset" button, but `ErrorBoundary.tsx` renders `Try Again` as the primary button text. A separate `Reload Page` button appears only in fullScreen mode.
4. **Error boundary description**: The default description is generic: `An unexpected error occurred. Try resetting this section or reload the page.` — not illustration-specific as implied by line 1154.
5. **Scientific text toolbar tabs**: The toolbar declares three tabs (`greek`, `scripts`, `math`) but `activeTab` is `useState('greek')` with no setter exposed. Only Greek letters and the x²/x₂ format buttons are visible; Superscripts (16), Subscripts (15), and Math Symbols (21) tabs are unreachable dead code.
6. **LaTeX download capability**: Line 1370 states "Editor-mode LaTeX export does not generate or download a .tex file" — this is true for the main Export button flow, but `LaTeXOptions.tsx` renders its own `Download .tex` button that independently creates a Blob and downloads `diagram.tex`. Both paths coexist in the UI.
7. **Quick Export vs Export Dialog divergence**: Quick Export and Export Dialog produce different toast messages for the same format (e.g., Quick Export PNG shows `Exported as PNG` while Export Dialog shows `PNG exported successfully!`). The doc does not distinguish between these two export paths.

### Components Referenced But Not Rendered (Additions)
- `ChartTool` exists in `src/components/illustration/tools/ChartTool.tsx` but is not imported by any rendered illustrate page.
- `PlotlyChartPanel` exists in `src/components/illustration/tools/PlotlyChartPanel.tsx` but is not imported by any rendered illustrate page.
- `conversationStore` exists in `src/stores/illustration/conversationStore.ts` (persistence key `finnish-conversation`) but is not imported by any rendered illustrate component.
- `exportStore` exists in `src/stores/illustration/exportStore.ts` but is not imported by any rendered illustrate component.
- `useLayerSync` hook exists in `src/hooks/illustration/useLayerSync.ts` but is not imported by any rendered illustrate component.
- `useDiagramGenerator` hook exists in `src/hooks/illustration/useDiagramGenerator.ts` but is not imported by any rendered illustrate component.
- `useToolSwitching` hook exists in `src/hooks/illustration/useToolSwitching.ts` but is not imported by any rendered illustrate component.
- `/api/illustration/agent/chat` route exists in `src/app/api/illustration/agent/chat/route.ts` but is not called by any rendered illustrate component (AgentMode calls `/api/illustration/generate` instead).

## Re-Audit Discoveries (Claude Code Pass 4)

### AI Image Generation Tool — Full UI Details (`AIGenerationTool.tsx`)
- [ ] Panel title text is `AI Image Generation` preceded by a SparklesIcon SVG
- [ ] Close button has `aria-label="Close"`
- [ ] API key is persisted to `localStorage['finnish_fal_api_key']`
- [ ] API key input is `type="password"` with placeholder `Enter your fal.ai API key`
- [ ] API key section is shown only when `!isApiKeyConfigured`; once configured, it hides
- [ ] API key hint links to `https://fal.ai/dashboard/keys` with `target="_blank"` and `rel="noopener noreferrer"`
- [ ] API key label text is `fal.ai API Key` preceded by KeyIcon
- [ ] `configureFalClient(apiKey)` is called in useEffect; failure sets `isApiKeyConfigured` to false
- [ ] Prompt textarea placeholder is `e.g., Human heart anatomy with labeled chambers and valves, detailed cross-section view`
- [ ] Prompt textarea is disabled during generation (`generatingState.isGenerating`)
- [ ] Style options are 5 buttons in a 3-column grid: `Clean Vector`, `Detailed`, `Sketch`, `Diagram`, `Realistic`
- [ ] Style option values are `clean`, `detailed`, `sketch`, `diagram`, `photorealistic`
- [ ] Default style is `clean` (not `flat` as in the agent mode API)
- [ ] Style buttons are disabled during generation
- [ ] Size options in dropdown: `Square (1024x1024)`, `Landscape 4:3`, `Portrait 4:3`, `Landscape 16:9`, `Portrait 16:9`
- [ ] Size option values: `square_hd`, `landscape_4_3`, `portrait_4_3`, `landscape_16_9`, `portrait_16_9`
- [ ] Default size is `square_hd`
- [ ] Model options in dropdown: `Fast (~$0.008)`, `Quality (~$0.012)`, `Pro (~$0.03)`
- [ ] Model option values: `fal-ai/flux/schnell`, `fal-ai/flux/dev`, `fal-ai/flux-pro`
- [ ] Default model is `fal-ai/flux/schnell`
- [ ] Cost estimate info box text: `Estimated cost: $X.XXX per image (averageTime)`
- [ ] Empty prompt error message: `Please enter a prompt`
- [ ] Missing API key error message: `Please enter your fal.ai API key`
- [ ] Generic generation error message: `Failed to generate image. Please try again.`
- [ ] `ImageGenerationError` instances use their own `.message` instead of generic fallback
- [ ] Progress bar shows during generation with status text and percentage (`Math.round(progress * 100)%`)
- [ ] Initial progress status text is `Starting...`; completion status text is `Complete!`
- [ ] Single image result renders as one full-width preview; multiple images render in 2-column grid
- [ ] Multiple image previews are selectable via click (sets `selectedImageIndex`)
- [ ] Selected image gets blue border (`borderColor: var(--accent-primary)`, `borderWidth: 2px`)
- [ ] Result stats show: `width x heightpx`, `Seed: {seed}`, `Generated in {seconds}s`
- [ ] Generate button disabled when `isGenerating || !prompt.trim() || !isApiKeyConfigured`
- [ ] Generate button text toggles: `Generate Image` → `Generating...`
- [ ] After result: two buttons appear — `New Generation` (secondary) and `Apply to Canvas` (primary with CheckIcon)
- [ ] Apply to Canvas scales image to fit 80% of canvas dimensions, capped at scale 1.0
- [ ] Apply to Canvas centers image, adds to canvas, sets as active object, then calls `onClose`
- [ ] Apply to Canvas failure error: `Failed to add image to canvas. Please try again.`
- [ ] `handleReset` clears prompt, result, selectedImageIndex, and generatingState
- [ ] Object URL from blob is revoked after FabricImage creation via `URL.revokeObjectURL`

### Background Removal Tool — Full UI Details (`BackgroundRemovalTool.tsx`)
- [ ] Panel title text is `Background Removal` preceded by a MagicWandIcon SVG
- [ ] Close button has `aria-label="Close"`
- [ ] Browser support check via `isBackgroundRemovalSupported()` renders error if unsupported
- [ ] Unsupported browser error text: `Background removal is not supported in this browser. Please use a modern browser with WebAssembly support.`
- [ ] Drop zone has `role="button"`, `tabIndex={0}`, and `aria-label="Drop zone for image upload"`
- [ ] Drop zone default text: `Drag & drop an image, or` followed by styled `browse` link
- [ ] Drop zone drag-active text: `Drop your image here`
- [ ] Supported formats text below drop zone: `PNG, JPG, WebP up to 10MB`
- [ ] Privacy info box text: `AI-powered background removal runs entirely in your browser. No data is sent to any server.`
- [ ] Hidden file input accepts: `image/png,image/jpeg,image/webp`
- [ ] Non-image file error: `Please select an image file (PNG, JPG, WebP)`
- [ ] Processing stages: `loading-model` → `Loading AI model...`, `processing` → `Removing background...`, `encoding` → `Encoding result...`, `complete` → `Complete!`, null → `Processing...`
- [ ] Preview shows side-by-side: `ORIGINAL` label (left) and `RESULT` label (right)
- [ ] Result placeholder text before processing: `Click "Remove Background"`
- [ ] Result placeholder text during processing: `Processing...`
- [ ] Result preview image background uses checkerboard pattern (transparency indicator)
- [ ] Generic processing error: `Failed to remove background. Please try again.`
- [ ] `BackgroundRemovalError` instances use their own `.message`
- [ ] Result stats show: `Size: width x heightpx`, `Processed in {time}`, `Output: {fileSize}`
- [ ] `formatFileSize` outputs bytes as `B`, `KB`, or `MB`
- [ ] `formatTime` outputs ms as `Nms` or `N.Ns`
- [ ] Before processing: `Reset` button (secondary, disabled during processing) and `Remove Background` button (primary, with MagicWandIcon)
- [ ] After processing: `Reset` button and `Apply to Canvas` button (primary, with CheckIcon)
- [ ] Processing button text toggles: `Remove Background` → `Processing...`
- [ ] Apply to Canvas scales to 80% of canvas, capped at 1.0, centers, sets active
- [ ] Apply to Canvas failure error: `Failed to add image to canvas. Please try again.`
- [ ] useEffect cleanup revokes both `originalPreview` and `resultPreview` URLs on unmount
- [ ] File input value is reset to `''` after each selection to allow re-selecting same file

### Document Settings Dialog — Full Details (`DocumentSettings.tsx`, `document-settings.ts`)
- [ ] Dialog has `role="dialog"`, `aria-modal="true"`, `aria-label="Document settings"`
- [ ] Clicking backdrop (outside dialog) calls `onCancel`
- [ ] Dialog header text is `Document Settings`
- [ ] Canvas presets: `A4` (2480×3508), `A3` (3508×4960), `Letter` (2550×3300), `1080 x 1080 (Instagram)` (1080×1080), `1920 x 1080 (HD)` (1920×1080), `Custom`
- [ ] Preset select has `id="canvas-preset-select"` with associated `<label>`
- [ ] Orientation toggle buttons: `Portrait` and `Landscape`
- [ ] Changing orientation swaps width and height values
- [ ] Width input has `id="canvas-width-input"`, `type="number"`, `min={1}`
- [ ] Height input has `id="canvas-height-input"`, `type="number"`, `min={1}`
- [ ] Manually editing width or height auto-sets preset to `custom`
- [ ] Background color input has `id="canvas-background-input"`, `type="color"`
- [ ] Default background color constant is `#ffffff`
- [ ] `handleConfirm` clamps width and height to `Math.max(1, Math.round(value))`
- [ ] Footer buttons: `Cancel` and `Apply`
- [ ] `detectPreset` auto-identifies the matching preset and orientation from initial dimensions on open
- [ ] `clampCanvasDimension` returns fallback (default 1) for non-finite values
- [ ] Selecting `custom` preset does not change width/height; only non-custom presets update dimensions

### Figure Panel Generator — Full Details (`FigurePanelGenerator.tsx`)
- [ ] Dialog title text is `Figure Panel Layout`
- [ ] 9 layout presets in 3-column grid: `1x1` (Single panel), `1x2` (Two panels side by side), `2x1` (Two panels stacked), `2x2` (Four panel grid), `2x3` (Six panel grid), `3x2` (Six panel vertical), `3x3` (Nine panel grid), `2x4` (Eight panel grid), `4x2` (Eight panel vertical)
- [ ] Each preset button shows a mini visual grid preview matching its rows×cols
- [ ] Default config: rows=2, cols=2, panelWidth=150, panelHeight=150, gap=20, showLabels=true, labelPosition=`top-left`, labelFontSize=24, strokeWidth=2, strokeColor=`#000000`, fillColor=`#ffffff`
- [ ] Label position options: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `center`
- [ ] Labels use uppercase letters A through Z (max 26 panels)
- [ ] Labels are IText objects with `fontFamily: 'Arial'`, `fontWeight: 'bold'`
- [ ] Panel rectangles use Fabric `Rect` objects with configured fill, stroke, and strokeWidth
- [ ] Generated panels are centered on canvas using `(canvasWidth / 2 - totalWidth / 2)`
- [ ] Number inputs clamp values between `min` (default 1) and `max` (default 1000)
- [ ] Footer has `Cancel` and `Generate Panels` buttons

### Character Panel — Full Details (`CharacterPanel.tsx`)
- [ ] Font weight options: `Light (300)`, `Regular (400)`, `Medium (500)`, `Semi-Bold (600)`, `Bold (700)`, `Black (900)`
- [ ] Text alignment options: `left`, `center`, `right`, `justify`
- [ ] `charSpacing` property is exposed for character spacing control
- [ ] `lineHeight` property is exposed for line height control
- [ ] `underline` and `linethrough` (strikethrough) toggles are exposed
- [ ] `fontStyle` toggle for italic (`italic` vs normal)
- [ ] Fill color and stroke color with stroke width controls are text-specific
- [ ] Selection-aware: reads `getSelectionStyles()` for partial text formatting

### Keyboard Shortcuts — Additional Details (`useKeyboardShortcuts.ts`)
- [ ] Shortcuts are ignored when `target.tagName === 'INPUT'`, `'TEXTAREA'`, or `target.isContentEditable`
- [ ] Space key handler checks `!e.repeat` to prevent re-triggering on held Space
- [ ] Tool shortcuts are skipped when ctrlOrCmd is pressed (`category === 'tool' && !shortcut.ctrlOrCmd && ctrlOrCmd`)
- [ ] `Backspace` key also triggers delete (in addition to `Delete`)
- [ ] `B` key shortcut for Brush tool is NOT registered in default shortcuts (only PEN, not BRUSH)
- [ ] `Z` key shortcut for Zoom tool is NOT registered in default shortcuts
- [ ] `getShortcutDisplayString` detects Mac via `navigator.platform.toUpperCase().indexOf('MAC')` and renders `Cmd` instead of `Ctrl`, `Option` instead of `Alt`
- [ ] `getShortcutDisplayString` formats special keys: Space→`Space`, Delete→`Del`, Backspace→`Delete` (Mac) or `Backspace`
- [ ] Paste offsets pasted objects by +20px left and +20px top from original position
- [ ] Copy serializes objects via `obj.toObject()` into `window.__finnishClipboard` array
- [ ] Paste uses `fabric.util.enlivenObjects` to deserialize clipboard data
- [ ] `groupSelected` creates group with `name: 'Group'`
- [ ] `ungroupSelected` calls `_restoreObjectsState()` before re-adding individual items
- [ ] Hook returns `{ shortcuts, enabled, isSpacePressed }` for external consumers

### ToolType Enum — Complete Values (`types/index.ts`)
- [ ] ToolType enum has 23 values: SELECT, DIRECT_SELECT, PEN, PENCIL, BRUSH, LINE, RECTANGLE, ELLIPSE, POLYGON, STAR, ARROW, BRACKET, CALLOUT, DIMENSION, CONNECTOR, TEXT, TEXT_ON_PATH, HAND, ZOOM, EYEDROPPER, ERASER, SCISSORS, MEASURE
- [ ] BRACKET, CALLOUT, DIMENSION, CONNECTOR, PENCIL, and TEXT_ON_PATH are defined in enum but have no toolbar buttons or keyboard shortcuts
- [ ] DiagramType union has 11 values: `flowchart`, `sequence`, `class`, `entity-relationship`, `state`, `gantt`, `pie`, `mindmap`, `timeline`, `scientific`, `custom`
- [ ] ExportDPI type allows exactly 4 values: `72 | 150 | 300 | 600`
- [ ] BlendMode type lists 12 modes: `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`
- [ ] ExportStage type has 6 stages: `preparing`, `rendering`, `optimizing`, `encoding`, `complete`, `error`

### Behavior Corrections (Pass 4)
1. **Brush keyboard shortcut**: Section 19 documented `B` as a live Brush shortcut, but `useKeyboardShortcuts.ts` does NOT register a plain `B` key handler. The toolbar still advertises `B` in its tooltip metadata.
2. **Zoom keyboard shortcut**: Section 19 documented `Z` as a live Zoom shortcut, but `useKeyboardShortcuts.ts` does NOT register a plain `Z` key handler. The toolbar still advertises `Z` in its tooltip metadata.
3. **Document Settings presets**: Section 4 (line 268) describes Canvas Size dialog as "width, height, background color" but omits the 6 preset options (A4, A3, Letter, Instagram, HD, Custom) and the Portrait/Landscape orientation toggle.
4. **AI Generation style options**: Section 16 describes styles as "FLUX Pro, FLUX Realism" but `AIGenerationTool.tsx` uses `Clean Vector`, `Detailed`, `Sketch`, `Diagram`, `Realistic` — these are IllustrationStyle values passed to `generateScientificDiagram`, NOT the same as agent mode's flat/detailed/schematic/photorealistic.
5. **AI Generation model options**: Section 16 does not specify the three FLUX model tiers: schnell (Fast), dev (Quality), flux-pro (Pro) with their cost estimates.
6. **Paste offset**: Section 6 and 19 did not mention that pasted objects are offset by +20px left and +20px top from their original position.

## Codex Verification Pass Discoveries

- [ ] `AIGenerationTool` stores `imageSize` and `model` in component state, but `handleGenerate()` still calls `generateScientificDiagram(prompt, style, undefined, onProgress)` and does not pass either value into the generation request
- [ ] `BackgroundRemovalTool` gives the drop zone `role="button"` and `tabIndex={0}`, but it does not register any `onKeyDown` handler for Enter or Space keyboard activation
- [ ] `ExportDialog` registers its Escape handler on `document`, and pressing Escape while the dialog is open calls `onClose()` even if `isExporting` is true
- [ ] `ExportDialog` blocks backdrop clicks while `isExporting`, but the Escape-key path does not check `isExporting`
- [ ] `FigurePanelGenerator` closes on backdrop click via `onClick={onClose}`, but it has no Escape-key listener
- [ ] `IconSearch` debounces `onSearch` by `200` ms by default, clears the query on Escape when text is present, and blurs the input on Escape when the field is already empty
- [ ] `PropertiesPanel` empty state text is exactly `Select an object to edit its properties`
- [ ] `PropertiesPanel` debounces transform-panel resync by `40` ms with `window.setTimeout`, clears any pending timeout before rescheduling, and clears the timeout again on unmount
- [ ] `LayersPanel` refuses to delete the last remaining layer by returning early in the panel handler before the confirm dialog is shown
- [ ] `LayersPanel` renaming autofocuses and selects the layer-name input on entry, commits on Enter or blur, and restores the original name on Escape
