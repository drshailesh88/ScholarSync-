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
| Brush | `B` | [ ] Switches to Brush |
| Text | `T` | [ ] Switches to Text |
| Eyedropper | `I` | [ ] Switches to Eyedropper |
| Eraser | `Shift+E` | [ ] Switches to Eraser |
| Scissors | `C` | [ ] Switches to Scissors |
| Measure | `M` | [ ] Switches to Measure |
| Zoom | `Z` | [ ] Switches to Zoom |

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
