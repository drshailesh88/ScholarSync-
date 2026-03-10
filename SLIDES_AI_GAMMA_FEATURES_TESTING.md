# ScholarSync — Slides AI Mode & Gamma (Create) Mode Feature Testing Checklist

> **Scope:** Features in the AI Agent panels (Slides Mode) and the entire Gamma / Create Mode experience.
> Excludes the standard PowerPoint-style Slides Mode features (covered in `SLIDES_FEATURES_TESTING.md`).
> Generated from source code in `src/components/slides/agent/`, `src/components/slides/gamma-mode/`, `src/components/presentation/`, and related modules.

---

## PART 1: MODE SELECTION & SWITCHING

---

### 1. Mode Selector Toggle

- [ ] Mode selector displayed in toolbar with two buttons: "Slides" and "Create"
- [ ] Active mode highlighted with brand-colored background + white text
- [ ] Inactive mode shows muted text, hover highlights
- [ ] Clicking "Slides" switches to PowerPoint-style editing
- [ ] Clicking "Create" switches to Gamma card-based editing
- [ ] Mode persists across navigation within the deck

### 2. Mode Selection Screen (First-Time Entry)

- [ ] Full-screen mode selection displayed for new decks
- [ ] "How do you want to work?" heading with subtitle "You can switch anytime"
- [ ] **Slides Mode card:**
  - [ ] Slide-layout icon (16x16 rounded, brand colors)
  - [ ] "Slides Mode" title
  - [ ] "Click and build like PowerPoint" description
  - [ ] Hover: border → brand, background → brand/5
- [ ] **Create Mode card:**
  - [ ] Star icon (brand colors)
  - [ ] "Create Mode" title
  - [ ] "AI builds it, you refine" description
  - [ ] Hover: same interaction as Slides card
- [ ] Selecting either mode navigates to the appropriate editor

---

## PART 2: AI AGENT (SLIDES MODE)

---

### 3. Slides Agent Panel (`slides-agent-panel.tsx`)

#### Panel Header
- [ ] "AI Chat" label with Sparkle icon
- [ ] Panel opens as right sidebar in Slides Mode
- [ ] Toggled via right panel selector (properties → agent)

#### Context Indicator
- [ ] Badge showing selected block type with icon:
  - [ ] Text/Bullets/Quote/Callout → TextAa icon
  - [ ] Chart → ChartBar icon
  - [ ] Image/Illustration → Image icon
  - [ ] Table → Table icon
  - [ ] No block selected → shows slide-level context
- [ ] Context updates when selection changes

#### Quick Action Chips
- [ ] **Default actions** (no block or unknown block):
  - [ ] "Improve this slide"
  - [ ] "Add more detail"
  - [ ] "Simplify"
  - [ ] "Add citations"
  - [ ] "Fix formatting"
  - [ ] "Suggest visual"
- [ ] **Text block actions** (text, bullets, quote, callout):
  - [ ] "Rewrite"
  - [ ] "Shorten"
  - [ ] "Expand"
  - [ ] "Academic tone"
  - [ ] "Fix formatting"
  - [ ] "Add citations"
- [ ] **Chart block actions:**
  - [ ] "Change chart type"
  - [ ] "Add labels"
  - [ ] "Simplify data"
  - [ ] "Improve colors"
  - [ ] "Add title"
  - [ ] "Convert to table"
- [ ] **Image block actions:**
  - [ ] "Generate image"
  - [ ] "Suggest alternative"
  - [ ] "Add caption"
  - [ ] "Resize"
  - [ ] "Add border"
  - [ ] "Replace with diagram"
- [ ] **Table block actions:**
  - [ ] "Add row"
  - [ ] "Add column"
  - [ ] "Simplify"
  - [ ] "Add caption"
  - [ ] "Improve formatting"
  - [ ] "Convert to chart"
- [ ] Clicking a chip sends the action as a message

#### Chat Interface
- [ ] Message history area with auto-scroll on new messages
- [ ] User messages styled differently from assistant messages
- [ ] **Streaming text display:**
  - [ ] Text reveals progressively (word-by-word, ~20ms per word)
  - [ ] Animated cursor during streaming
- [ ] Up to 50 messages cached in history
- [ ] Loading spinner during API call
- [ ] Error messages displayed on failure

#### Suggested Changes
- [ ] AI responses can include suggested changes to slide/block
- [ ] "Apply" button to apply a single suggested change
- [ ] "Apply to All" button to apply all suggestions
- [ ] Applied changes marked with checkmark icon
- [ ] Changes update the slide in the store

#### Input Area
- [ ] Auto-resizing textarea
- [ ] Focuses on mount
- [ ] Enter sends message
- [ ] Shift+Enter adds new line
- [ ] Send button (PaperPlaneRight icon)

#### Slash Commands
- [ ] `/learn` — enters research mode
- [ ] `/draft` — content generation mode
- [ ] `/visual` — visual suggestion mode
- [ ] `/illustrate` — illustration mode

#### API Integration
- [ ] Endpoint: `/api/slides/agent`
- [ ] Sends: mode, prompt, deckId, slides data, activeSlideId, selected block context, chat history, audienceType
- [ ] Response includes message + optional suggestedChanges

---

### 4. AI Tools Dropdown (Properties Panel)

- [ ] Located in Properties Panel under "AI Tools" heading
- [ ] **14 AI actions with icons and descriptions:**
  1. [ ] Shorten Text
  2. [ ] Expand Content
  3. [ ] Rephrase
  4. [ ] Suggest Image
  5. [ ] Add Citations
  6. [ ] Improve Bullets
  7. [ ] Regenerate Slide
  8. [ ] Add Math
  9. [ ] Add Diagram
  10. [ ] Add Chart
  11. [ ] Strengthen Evidence
  12. [ ] Simplify Language
  13. [ ] Add Speaker Notes
  14. [ ] Translate
- [ ] Loading spinner on active action
- [ ] Other actions disabled during processing
- [ ] Error message display
- [ ] Results applied directly to slide via `onApply()` callback
- [ ] API endpoint: `/api/presentations/edit-slide`

---

### 5. Coach Panel (Properties Panel)

#### Running the Coach
- [ ] "Run Coach" button to start evaluation
- [ ] Loading state during evaluation
- [ ] Error display on failure

#### Overall Score
- [ ] Score displayed (0–10 scale)
- [ ] Visual score display

#### Dimension Scores (with progress bars)
- [ ] **Structure** (blue)
- [ ] **Evidence** (cyan)
- [ ] **Narrative** (green)
- [ ] **Design** (amber)
- [ ] **Audience Fit** (red)

#### Suggestions
- [ ] Up to 5 suggestions displayed, sorted by priority
- [ ] Priority coloring: high (red), medium (yellow), low (green)
- [ ] Each suggestion shows actionable text

#### Slide Insights
- [ ] Per-slide breakdown with slide number and title
- [ ] Issues list (red)
- [ ] Strengths list (green)
- [ ] Click a slide insight to navigate to that slide

#### Re-evaluate
- [ ] "Re-evaluate" button to refresh scores after changes

#### API Integration
- [ ] Endpoint: `/api/presentations/coach`
- [ ] Sends: deckId, audienceType, all slides data
- [ ] Returns: overallScore, 5 dimension scores, suggestions[], slideInsights[]

---

### 6. Slide Regenerate Dialog (Filmstrip Context Menu)

- [ ] Opens from filmstrip right-click → "Regenerate with AI..."
- [ ] Also available as "Regenerate Selected Slides..." for multi-select
- [ ] **Dialog UI:**
  - [ ] Title shows "Regenerate This Slide" or "Regenerate Selected Slides"
  - [ ] Lists slide titles being regenerated
  - [ ] Instruction text input (freeform prompt)
  - [ ] Tone selector (RegenerateTone enum)
  - [ ] "Regenerate" submit button
  - [ ] Close/cancel button
- [ ] On submit, regenerates slide content via store action
- [ ] Dialog closes after successful regeneration

---

## PART 3: GAMMA (CREATE) MODE

---

### 7. Gamma Mode Layout

- [ ] Three-panel layout when slides exist:
  - [ ] Left: Card Outline Sidebar (w-56)
  - [ ] Center: Card Stack (flex-1, scrollable)
  - [ ] Right: AI Agent Panel (w-360, conditional on `agentPanelOpen`)
- [ ] When no slides exist: shows Outline Generator wizard instead
- [ ] Gamma Toolbar at top (fixed)

---

### 8. Gamma Toolbar

#### Mode Selector (left)
- [ ] "Slides" / "Create" toggle (same as Section 1)
- [ ] Switching from Create to Slides mode via Export menu shows confirmation dialog

#### Editable Title
- [ ] Click to enter edit mode (inline input with brand underline)
- [ ] Max width 300px, text truncated
- [ ] Enter commits the title change
- [ ] Escape cancels and reverts
- [ ] Blur commits the change

#### Save Status Dot
- [ ] Green dot = saved/idle
- [ ] Yellow pulsing dot = saving
- [ ] Red dot = error
- [ ] Tooltip shows status text

#### Card Count
- [ ] Shows "X cards" (or "1 card" for singular)
- [ ] Updates dynamically as cards are added/removed

#### Theme Picker Dropdown
- [ ] Palette icon + theme name + caret
- [ ] Click opens `ThemeCustomizer` dropdown (320px wide)
- [ ] Click outside closes dropdown
- [ ] (See Section 13 for ThemeCustomizer details)

#### Export Dropdown
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

#### Agent Toggle Button
- [ ] Sparkle icon + "Agent" label
- [ ] Active state: brand/10 background, brand text, filled sparkle icon
- [ ] Inactive state: default border, muted text, regular sparkle icon
- [ ] Click toggles the right-side Agent Panel

#### Present Button
- [ ] Play icon + "Present" label
- [ ] Brand-colored background (always visible)
- [ ] Launches presentation mode

---

### 9. Card Outline Sidebar (Left Panel)

#### Outline Header
- [ ] "Outline" label in uppercase, small font

#### Card Items
- [ ] Each card shows:
  - [ ] Drag handle (6-dot icon, visible on hover)
  - [ ] Card number (index + 1)
  - [ ] Truncated title (max 20 chars + "…")
- [ ] Active card: brand/10 background, brand text, bold font
- [ ] Inactive cards: default text, hover → surface-raised background

#### Drag-to-Reorder
- [ ] Drag handle appears on hover
- [ ] Dragging reorders cards with dnd-kit
- [ ] Pointer sensor with 5px activation distance
- [ ] Keyboard sensor for accessibility
- [ ] Dragging card shows opacity-50

#### Card Actions (3-dot Menu)
- [ ] 3-dot button visible on hover
- [ ] **Duplicate** — creates exact copy of the card
- [ ] **Delete** — removes card (disabled if only 1 card, red text)
- [ ] Menu closes on outside click

#### Insert Buttons
- [ ] Small "+" button appears between cards on hover
- [ ] Click inserts a new blank card at that position
- [ ] Opacity transition: invisible → visible on hover

#### Add Card Button (Bottom)
- [ ] "Add card" button at bottom of sidebar
- [ ] Plus icon + label
- [ ] Inserts after the last card

---

### 10. Card Stack (Center Panel)

#### Card Rendering
- [ ] Cards displayed as vertically scrollable stack
- [ ] Max width 3xl, centered horizontally
- [ ] Gap between cards (gap-2)
- [ ] Responsive padding (px-4 → px-8 → px-16)

#### Card Styling
- [ ] Each card has:
  - [ ] Rounded corners (xl)
  - [ ] Shadow (base)
  - [ ] Active card: blue border + ring effect
  - [ ] Primary-colored accent bar at top (1px)
  - [ ] Background from `cardBackground` or theme default

#### Background Image Handling
- [ ] **Image positions:**
  - [ ] `none` — no image shown
  - [ ] `top` — image above content
  - [ ] `left` — image on left side
  - [ ] `right` — image on right side
  - [ ] `background` — full card background
- [ ] Overlay types: frosted (backdrop blur), faded (gradient), clear (light tint)
- [ ] Overlay intensity controls opacity

#### Card Interaction
- [ ] Click to activate a card
- [ ] Active card shows `CardEditor` (inline editing)
- [ ] Inactive cards show read-only content

#### Hover Controls (Active Card)
- [ ] **Sparkle Menu** (CardSparkleMenu) — AI quick actions
- [ ] **Background Picker** (CardBackgroundButton) — per-card styling

#### Insert Between Cards
- [ ] "+" button appears between cards on hover
- [ ] Click adds a new blank card at that position

#### Empty State
- [ ] "Add your first card" button with PlusCircle icon
- [ ] Dashed border, hover transitions to brand colors

---

### 11. Card Editor (Inline Editing)

#### Title Editing
- [ ] Click title to enter edit mode (Tiptap `EditableTextBlock`)
- [ ] HTML stripped — stored as plain text
- [ ] Placeholder: "Card title..."
- [ ] Styled with theme heading font and primary color

#### Subtitle Editing
- [ ] Editable when card is active
- [ ] `EditableTextBlock` with subtitle style
- [ ] Placeholder: "Subtitle..."

#### Content Block Editing
- [ ] **Text blocks** — inline Tiptap rich text editing
  - [ ] Supports style variants: title, subtitle, body, caption
  - [ ] Custom font family, font size, and color
- [ ] **Bullets blocks** — inline Tiptap bullets editing
  - [ ] Toggle ordered/unordered
  - [ ] Add/remove bullet points
- [ ] **All other blocks** — rendered read-only via BLOCK_REGISTRY

#### Block Selection
- [ ] Click a block to select it (ring-2 ring-brand/40 + brand/5 background)
- [ ] Hover on unselected blocks shows ring-1 ring-border
- [ ] Click event stopped from propagating (doesn't deselect card)

#### Add Block Button
- [ ] Appears at bottom of active card
- [ ] Opens Block Inserter Menu (see Section 14)

#### Empty State
- [ ] "Click here to start typing, or type / for commands"
- [ ] Italic, muted text

---

### 12. Card Sparkle Menu (Per-Card AI Actions)

#### Trigger
- [ ] Sparkle icon button appears on hover of active card
- [ ] Button: 8x8 background, rounded-lg, surface-raised/80

#### Dropdown Menu (8 Actions)
1. [ ] **Improve writing** — "Enhance polish and professionalism"
2. [ ] **Shorten** — "Condense to essentials"
3. [ ] **Expand** — "Add detail and supporting points"
4. [ ] **Add citations** — "Insert academic references"
5. [ ] **Add speaker notes** — "Generate presenter talking points"
6. [ ] **Simplify language** — "Make general-audience friendly"
7. [ ] **Make more visual** — "Suggest visuals/diagrams"
8. [ ] **Regenerate card** — "Complete content refresh"

#### Behavior
- [ ] Each action displayed with icon + label
- [ ] Click triggers AI call to `/api/slides/chat`
- [ ] Loading spinner overlay covers the card during processing (absolute inset-0)
- [ ] Loading state disables further clicks
- [ ] Changes applied directly to slide (title, contentBlocks, speakerNotes, layout)
- [ ] Menu closes on outside click or Escape

---

### 13. Card Background Picker

#### Trigger
- [ ] Image icon button appears on hover of active card
- [ ] Opens a popover panel

#### Color Selection
- [ ] 12 preset color swatches (white, grays, blacks, pastels)
- [ ] Theme colors merged in
- [ ] Custom color picker
- [ ] Each swatch: 6x6 circle with check mark on selection

#### Image Background
- [ ] Image URL text input
- [ ] Shows only when URL is entered

#### Image Position Selector (5 Options)
- [ ] **None** — no image
- [ ] **Top** — image above content (Rows icon)
- [ ] **Left** — image on left (Columns icon)
- [ ] **Right** — image on right (Columns flipped)
- [ ] **Fill** — full background (ArrowsOutSimple icon)
- [ ] Active option: brand/10 background + brand/30 border

#### Overlay Controls (when image + position set)
- [ ] **Overlay Type:** None | Frosted | Faded | Clear (segmented buttons)
  - [ ] Active: brand background + white text
- [ ] **Overlay Intensity slider** (0–100%) — shows current value
- [ ] **Overlay Color picker** — defaults to black (#000000)

#### Reset Button
- [ ] Clears all background settings to theme default

---

### 14. Theme Customizer (Gamma Mode)

- [ ] Opens as dropdown from toolbar Theme button (320px wide)

#### Presets
- [ ] 4-column grid of theme swatches
- [ ] Each swatch shows: background color, primary color bar, text lines preview, theme name
- [ ] Active theme: brand border + ring + check mark badge
- [ ] Hover: scale 1.05
- [ ] Clicking a preset applies it globally

#### Colors
- [ ] Primary color picker with theme color swatches
- [ ] Background color picker
- [ ] Text color picker
- [ ] Accent color picker
- [ ] Editing any color marks theme as "custom"

#### Fonts
- [ ] **Heading font** dropdown (10 options):
  - [ ] Inter, Poppins, Roboto, Playfair Display, Merriweather, Source Sans 3, Lora, Fira Sans, Nunito, Space Grotesk
- [ ] **Body font** dropdown (same 10 options)

#### Roundness (Segmented Control)
- [ ] None | Sm | Md | Lg | Xl

#### Borders (Segmented Control)
- [ ] None | Subtle | Strong

#### Shadows (Segmented Control)
- [ ] None | Subtle | Medium | Dramatic

#### Card Spacing (Segmented Control)
- [ ] Compact | Comfortable | Spacious

#### Behavior
- [ ] Max height 70vh with scrollable content
- [ ] All changes apply immediately (live preview)
- [ ] Custom edits set themeKey to "custom"

---

### 15. Gamma Agent Panel (Right Panel Chat)

#### Panel Header
- [ ] Close button to hide the panel

#### Quick Action Chips (shown on empty state)
- [ ] "Restructure deck"
- [ ] "Shorten all slides"
- [ ] "Add citations everywhere"
- [ ] "Improve flow"
- [ ] "Translate to..."
- [ ] "Make more visual"
- [ ] Click populates input and focuses

#### Chat Interface
- [ ] Message history with auto-scroll
- [ ] **User messages:** brand background, right-aligned, rounded-br-sm
- [ ] **AI messages:** surface-raised background, left-aligned, rounded-bl-sm
- [ ] Loading state: "Thinking..." with spinner

#### Input Area
- [ ] Multiline textarea (rows=1, grows)
- [ ] Placeholder: "Ask the AI to change your deck..."
- [ ] Send button (brand background, paper plane icon)
- [ ] Enter sends message; Shift+Enter for new line

#### API Integration
- [ ] Endpoint: `/api/slides/chat`
- [ ] Sends: deckId, message, simplified slides data, activeSlideId, audienceType
- [ ] Response: `{ summary, modifiedSlides[], newSlides[] }`
- [ ] **Direct application:** changes applied immediately to store
  - [ ] Modified slides: updates title, contentBlocks, speakerNotes, layout
  - [ ] New slides: added to the deck

---

### 16. Outline Generator (4-Step Wizard)

Shown when Gamma mode is entered with no existing slides.

#### Step 1: Prompt Input
- [ ] **Title input** (required, red asterisk)
- [ ] **Description textarea** — "Describe your topic, key points, or paste an abstract..."
- [ ] **Audience selector** — 10 audience types with icons:
  1. [ ] General (UsersThree)
  2. [ ] Conference (MicrophoneStage)
  3. [ ] Thesis Defense (GraduationCap)
  4. [ ] Journal Club (MagnifyingGlass)
  5. [ ] Classroom (Chalkboard)
  6. [ ] Grant (Certificate)
  7. [ ] Poster Session (Presentation)
  8. [ ] Systematic Review (MagnifyingGlass)
  9. [ ] Patient Case (Stethoscope)
  10. [ ] Grand Rounds (FirstAid)
- [ ] **Card count slider** (3–20 cards)
- [ ] "Generate Outline" button (Sparkle icon)
- [ ] Loading spinner during generation

#### Step 2: Outline Editor
- [ ] Grid of editable outline cards
- [ ] Each card row shows:
  - [ ] Card title input (editable)
  - [ ] Bullet point inputs (editable, add/remove)
  - [ ] Move up button (disabled at position 1)
  - [ ] Move down button (disabled at last position)
  - [ ] Delete button (disabled if only 1 card)
- [ ] "Add another card" button at bottom
- [ ] Back button → returns to Step 1
- [ ] "Choose Theme" button → advances to Step 3

#### Step 3: Theme Selection
- [ ] 4-column grid of large theme swatches (120x72px)
- [ ] Theme name label on each swatch
- [ ] Selected theme: brand border + ring + check mark
- [ ] Hover: scale 1.03 effect
- [ ] Back button → returns to Step 2
- [ ] "Create Presentation" button → starts generation (Step 4)

#### Step 4: Generation
- [ ] Spinner + "Creating your presentation" message
- [ ] Status messages stream in:
  - [ ] "Setting up theme..."
  - [ ] "Generating your presentation..."
  - [ ] "Loading your deck..."
- [ ] Streaming from `/api/slides/generate-stream` (newline-delimited JSON)
- [ ] Stream events: status, images, complete, error
- [ ] On completion, slides load into the editor

#### API Integration
- [ ] `/api/slides/outline` — generates outline from prompt
- [ ] `/api/slides/generate-stream` — streams full deck generation

---

### 17. Smart Layout Templates

- [ ] 10 pre-built layout templates:
  1. [ ] **Bullets** — Header + bullet list
  2. [ ] **Two Columns** — Side-by-side comparison table
  3. [ ] **Timeline** — Timeline block with phases (completed, in-progress, upcoming)
  4. [ ] **Steps** — Numbered ordered bullet list
  5. [ ] **Big Number** — Stat result block + description text
  6. [ ] **Chart** — Chart block + figure caption
  7. [ ] **Quote** — Quote block + context text
  8. [ ] **Key Finding** — Callout block (type: "finding") + text
  9. [ ] **Methodology** — Flowchart diagram + text
  10. [ ] **Image + Text** — Image block + description

#### Smart Layout Picker
- [ ] Floating panel appears in block inserter menu
- [ ] Dashed border entry with icon + label + description
- [ ] Click replaces active slide's contentBlocks with template
- [ ] Auto-closes after selection

---

### 18. Block Inserter Menu (Gamma Mode)

- [ ] Opens from "Add Block" button at bottom of active card
- [ ] Search bar at top (sticky)
- [ ] **Smart Layouts** entry (dashed border, special styling)
- [ ] **Block categories:**
  - [ ] **Content:** Text, Bullets, Quote, Shape, Citation, Divider, Toggle, Nested Card
  - [ ] **Media & Data:** Image, Chart, Table, Infographic, Illustration, Media, Embed
  - [ ] **Academic:** Equation, Diagram, Code, Callout, Statistic, Bibliography, Timeline
- [ ] Category headers in uppercase
- [ ] Items listed with hover highlight
- [ ] Click inserts block via `createDefaultBlock(type)`
- [ ] Escape or click outside closes menu

---

### 19. Gamma-Specific Block Types

#### Embed Block
- [ ] **Supported services:**
  - [ ] YouTube → auto-converts to embed URL
  - [ ] Vimeo → auto-converts to embed URL
  - [ ] Figma → embed with share URL
  - [ ] Google Docs/Sheets → pub URL conversion
  - [ ] Twitter/X → link fallback (no iframe)
  - [ ] Generic → direct URL in iframe
- [ ] Aspect ratio options: 16:9, 4:3, 1:1
- [ ] Optional title above embed
- [ ] Lazy loading iframes
- [ ] Sandbox: `allow-scripts allow-same-origin`
- [ ] Empty state: "No embed URL provided" with globe icon

#### Nested Card Block
- [ ] Clickable header with Cards icon + title + chevron
- [ ] Collapse/expand with Framer Motion animation (250ms)
- [ ] Nested blocks rendered via BLOCK_REGISTRY
- [ ] Visual nesting: darker background, divider on expand
- [ ] Default state: collapsed

#### Toggle Block
- [ ] Clickable header with rotating chevron
- [ ] Content rendered from HTML (dangerouslySetInnerHTML)
- [ ] `defaultOpen` prop (defaults false)
- [ ] Framer Motion expand/collapse animation
- [ ] Left padding for visual hierarchy

---

### 20. Spotlight Mode (Presentation Feature)

#### Entering Spotlight
- [ ] Activated from presentation controls
- [ ] Progressive reveal: one block at a time

#### Spotlight Overlay UI
- [ ] **Indicator bar** (top center):
  - [ ] Flashlight icon (amber)
  - [ ] "Spotlight N / Total" counter
  - [ ] Up arrow button (disabled at first block)
  - [ ] Down arrow button (disabled at last block)
  - [ ] Close (X) button
  - [ ] Black/70 background with backdrop blur, pill shape

#### Progress Dots (right side)
- [ ] Vertical column of dots
- [ ] Active dot: accent color, scale 1.25
- [ ] Past dots: white/30
- [ ] Future dots: white/10
- [ ] Clickable to jump to any block

#### Block Visibility States
- [ ] Current block: opacity-100, scale-100
- [ ] Past blocks: opacity-30
- [ ] Future blocks: opacity-10, blur-sm

#### Keyboard Shortcuts
- [ ] Arrow Down — next block
- [ ] Arrow Up — previous block
- [ ] Escape — exit spotlight mode
- [ ] Shortcuts disabled when input/textarea focused

#### Animations
- [ ] Framer Motion entrance/exit (opacity, 0.3s)
- [ ] Block wrapper transitions (opacity, blur, scale)

---

### 21. Export (Gamma Mode)

#### PPTX Export
- [ ] POST to `/api/export/pptx`
- [ ] Sends: title, slides (mapped from SlideState), themeConfig
- [ ] Downloads as `.pptx` file
- [ ] Filename: sanitized title (non-alphanumeric → underscore)
- [ ] Loading spinner during export

#### PDF Export
- [ ] POST to `/api/export/presentation-pdf`
- [ ] Same payload format as PPTX
- [ ] Downloads as `.pdf` file
- [ ] Loading spinner during export

#### Error Handling
- [ ] Alert shown on export failure
- [ ] Export button re-enabled after error

---

### 22. Agent State Management (Slides Store)

- [ ] `agentMode`: "learn" | "draft" | "visual" | "illustrate"
- [ ] `agentChatHistory`: array of `AgentChatMessage`
  - [ ] Each message: id, role, content, timestamp, suggestedChanges?, applied?
- [ ] `addAgentChatMessage(msg)` — adds to history
- [ ] `markChatMessageApplied(msgId)` — marks changes as applied
- [ ] `clearAgentChatHistory()` — clears all messages
- [ ] `agentPanelOpen`: boolean — controls Gamma agent panel visibility
- [ ] `setAgentPanelOpen(v)` — toggle agent panel
- [ ] `rightPanel` options include "agent" alongside properties, comments, etc.

---

## PART 4: QUICK TEST WORKFLOWS

---

### Workflow A: AI Agent Chat in Slides Mode
1. [ ] Open a deck in Slides mode
2. [ ] Select a text block on a slide
3. [ ] Open Agent panel (right panel → Agent)
4. [ ] Verify quick actions show TEXT_ACTIONS (Rewrite, Shorten, etc.)
5. [ ] Click "Rewrite" chip → message sent, response streams in
6. [ ] Verify suggested changes appear with "Apply" button
7. [ ] Click "Apply" → block content updates
8. [ ] Type a custom message and press Enter
9. [ ] Verify response and any new suggestions

### Workflow B: Coach Evaluation
1. [ ] Open a deck with multiple slides
2. [ ] Open Properties Panel → Coach section
3. [ ] Click "Run Coach"
4. [ ] Wait for evaluation to complete
5. [ ] Verify overall score (0–10) and 5 dimension scores displayed
6. [ ] Check suggestions list (sorted by priority)
7. [ ] Click a slide insight → navigates to that slide
8. [ ] Make changes, then click "Re-evaluate"

### Workflow C: Gamma Mode — Create from Scratch
1. [ ] Go to `/slides/new` or enter Create mode for a deck with no slides
2. [ ] Outline Generator wizard appears
3. [ ] Enter title + description, select audience, set card count to 8
4. [ ] Click "Generate Outline" → outline cards appear
5. [ ] Edit card titles and bullet points
6. [ ] Move a card up/down, delete one, add a new one
7. [ ] Click "Choose Theme" → select a theme
8. [ ] Click "Create Presentation" → generation streams
9. [ ] Verify cards load in the Card Stack editor

### Workflow D: Gamma Mode — Edit Cards
1. [ ] Open a deck in Create mode with existing cards
2. [ ] Click a card to activate it
3. [ ] Edit the title inline
4. [ ] Double-click a text block → edit text
5. [ ] Click "Add Block" → insert a Chart block
6. [ ] Hover the card → click Sparkle menu → "Shorten"
7. [ ] Verify AI processes and updates the card
8. [ ] Hover the card → click Background picker → set image background
9. [ ] Change overlay to "Frosted" with 60% intensity

### Workflow E: Gamma Agent Panel — Deck-Wide Changes
1. [ ] Open a deck in Create mode
2. [ ] Click "Agent" button in toolbar → panel opens
3. [ ] Click "Restructure deck" chip
4. [ ] Verify message sent, "Thinking..." appears
5. [ ] AI responds with summary, slides are modified
6. [ ] Type "Add a conclusions card" → Enter
7. [ ] Verify new card added to the deck
8. [ ] Close agent panel via toggle button

### Workflow F: Export from Gamma Mode
1. [ ] Open a deck in Create mode with cards
2. [ ] Click Export dropdown → "Export PPTX"
3. [ ] Verify spinner appears, file downloads
4. [ ] Click Export → "Export PDF"
5. [ ] Verify PDF downloads
6. [ ] Click Export → "Continue in Slides Mode"
7. [ ] Confirm dialog → mode switches to Slides

### Workflow G: Spotlight Mode
1. [ ] Open a deck and enter presentation mode
2. [ ] Activate Spotlight mode
3. [ ] Verify first block highlighted, others dimmed
4. [ ] Press Arrow Down → spotlight moves to next block
5. [ ] Click a progress dot → jumps to that block
6. [ ] Press Escape → exits spotlight mode

### Workflow H: Smart Layouts
1. [ ] Open a deck in Create mode
2. [ ] Activate a card
3. [ ] Click "Add Block" → open inserter menu
4. [ ] Click "Smart Layouts" entry
5. [ ] Select "Timeline" template
6. [ ] Verify card content replaced with timeline layout blocks

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were
> missing from the original document generated by Claude Code.

### Detailed QA Coverage
- [ ] `SlidesAgentPanel` reads context from `getActiveSlide()`, `getSelectedBlock()`, and `getPrimarySelectedBlockIndex()` on every render instead of caching selection locally
- [ ] Slides agent quick-action set is derived from the selected block type and recalculates when selection changes
- [ ] Slides agent context badge icon returns `null` when no recognized block type is selected
- [ ] Slides agent input is focused on mount via `inputRef.current?.focus()`
- [ ] Slides agent textarea auto-resizes up to 120px height while typing
- [ ] Sending a slides-agent message resets the textarea height back to `auto`
- [ ] Slides agent ignores send attempts when `deckId` is missing
- [ ] Slides agent trims whitespace and ignores empty prompts
- [ ] Slash command parsing only maps `/learn ` to `learn` and `/draft ` to `draft`
- [ ] `/visual ` and `/illustrate ` are kept in `chat` mode and passed through as prompt text hints
- [ ] Slides agent includes only the last 10 chat messages in the API request context
- [ ] In chat mode, slides agent sends `slides`, `activeSlideId`, `audienceType`, and `chatHistory` with the prompt
- [ ] When a block is selected, slides agent also sends `selectedBlockIndex`, `selectedBlockType`, and serialized `selectedBlockContent`
- [ ] In legacy `learn` and `draft` modes, slides agent sends `slideContent` for the active slide instead of full block context
- [ ] Slides agent normalizes `/learn` responses by appending a `Suggested papers:` list when `papers` are returned
- [ ] Slides agent normalizes `/draft` responses by converting generated content blocks into one slide-level suggested change targeting the active slide
- [ ] Slides agent simulates streaming locally by revealing assistant text word-by-word with a ~20ms delay
- [ ] While simulated streaming is in progress, assistant text is held in `streamedText` and not yet added to `agentChatHistory`
- [ ] Slides agent request failures surface as an assistant chat message with `Something went wrong: ... Please try again.`
- [ ] Applying a suggested block-level change replaces only the targeted block index inside that slide’s `contentBlocks`
- [ ] Applying a suggested slide-level change calls `updateSlide(change.slideId, slideChanges)` directly
- [ ] Single-change apply filters suggestions down to the active slide when one is active
- [ ] `Apply to All` uses the full suggested-change list without active-slide filtering
- [ ] Applied suggestion sets are tracked by `markApplied(msgId)` in store-backed chat history
- [ ] `agentChatHistory` is capped to the last 50 messages through the slides store
- [ ] `GammaModeLayout` opens `OutlineGenerator` whenever `slides.length === 0`, regardless of whether create mode was entered from the full-screen selector or the toolbar toggle
- [ ] Gamma layout right panel width is `w-[360px]`, not a generic `w-80`
- [ ] `GammaToolbar` title button shows `Untitled Deck` when the deck title is empty
- [ ] Entering gamma-toolbar title edit mode seeds `titleDraft` from the latest store title before focusing the input
- [ ] Gamma-toolbar title edits commit only when the trimmed draft is non-empty and changed from the current title
- [ ] Pressing `Escape` in gamma-toolbar title edit restores the original title and exits edit mode
- [ ] Gamma-toolbar save dot uses `title={status === "idle" ? "saved" : status}` for its native tooltip text
- [ ] Gamma-toolbar card count uses singular/plural card wording automatically
- [ ] Theme dropdown in gamma toolbar is click-open with click-outside dismissal handled by a reusable `Dropdown` wrapper
- [ ] Theme dropdown width is fixed at `320px`
- [ ] Export dropdown in gamma toolbar is click-open with click-outside dismissal handled by the same `Dropdown` wrapper
- [ ] Gamma export button swaps to a spinner and `Exporting...` while any export is in progress
- [ ] Gamma export failure surfaces via `alert(msg)` rather than inline panel error UI
- [ ] `Continue in Slides Mode` always closes the export dropdown before showing the browser confirmation dialog
- [ ] Switching from Gamma to Slides mode requires confirming the exact prompt `Switch to Slides view? Your cards will be displayed as fixed-ratio slides.`
- [ ] Gamma toolbar `Agent` button toggles `agentPanelOpen` in store and changes styling based on open state
- [ ] Gamma toolbar `Present` button uses a filled `Play` icon and sets `isPresenting = true`
- [ ] `OutlineGenerator` step names are `prompt`, `outline`, `theme`, and `generating`
- [ ] Outline-generator prompt step starts with `cardCount = 8`, `audience = "general"`, and `selectedTheme = "modern"`
- [ ] Prompt-step title label includes a visible red asterisk for required input
- [ ] Pressing `Enter` in the outline-generator title input triggers `handleGenerateOutline()` only when title is non-empty
- [ ] Prompt-step audience picker renders ten audience options in a 5-column grid
- [ ] Prompt-step audience icons switch to `duotone` weight only for the active audience
- [ ] Prompt-step card-count slider allows values from 3 to 20
- [ ] Generate-outline CTA label changes to `Generating outline...` while the outline request is in flight
- [ ] Successful outline generation immediately persists `audience` to the slides store via `setAudienceType(audience)`
- [ ] Outline-generation failures remain on the prompt step and show the returned or fallback error text in a red inline alert
- [ ] Outline editor header shows live card count with singular/plural text
- [ ] Outline cards use hover-revealed move-up, move-down, and remove controls in the top-right corner
- [ ] Outline-card remove button is disabled when there is only one outline card left
- [ ] Outline-card titles are plain inputs with placeholder `Card title`
- [ ] Outline-card bullet inputs use placeholder `Key point`
- [ ] Outline-card `Add point` appends an empty bullet string to the current card
- [ ] Outline-step `Add another card` appends a new card titled `New Card` with one bullet `Key point`
- [ ] Outline-step `Back` clears any prior error text before returning to the prompt step
- [ ] Outline-step `Choose Theme` is disabled when the outline array is empty
- [ ] Theme-selection step renders every key from `PRESET_THEMES`, not a limited subset
- [ ] Selected theme in `ThemeSwatchLarge` shows a brand check badge in the top-right corner
- [ ] Theme-step primary CTA label is `Create Presentation`
- [ ] Starting full Gamma deck generation immediately sets step to `generating` before the stream request returns
- [ ] Gamma deck generation serializes the outline into a numbered `Card N: Title` text outline before sending it as `description`
- [ ] Gamma deck generation persists the selected theme to store through `setTheme(selectedTheme, PRESET_THEMES[selectedTheme])` before requesting the stream
- [ ] Gamma deck generation stream reads newline-delimited JSON objects from `/api/slides/generate-stream`
- [ ] Gamma generation stream updates `generationProgress` from each event’s `message` field
- [ ] Gamma generation stream throws immediately when an event of type `error` is received
- [ ] After the stream completes, Gamma generation sets progress text to `Loading your deck...` and calls `loadDeck(deckId)`
- [ ] Gamma deck generation failures return the wizard to the `outline` step rather than keeping the user on the generating screen
- [ ] `GammaAgentPanel` quick-action chips only prefill the input text; they do not auto-send the command
- [ ] Gamma agent header close button calls `setAgentPanelOpen(false)` directly
- [ ] Gamma agent send is disabled while loading or when the trimmed input is empty
- [ ] Gamma agent API payload always sends `deckId`, `message`, `slides`, `activeSlideId`, and `audienceType`
- [ ] Gamma agent applies `modifiedSlides` by patching existing slides and `newSlides` by calling `addSlide()` first, then `updateSlide()`
- [ ] Gamma agent adds assistant summary text even when the response modified slides successfully with no visible UI diff summary beyond that message
- [ ] Gamma agent error responses are converted into assistant chat bubbles instead of a separate inline alert
- [ ] `CardOutlineSidebar` truncates card titles over 20 characters with an ellipsis character
- [ ] Card-outline row action menu is opened by a `DotsThree` button, not a context menu/right-click
- [ ] Card-outline row menu contains only `Duplicate` and `Delete`
- [ ] Card-outline delete is disabled when the deck contains only one slide/card
- [ ] Card-outline insert-between `+` buttons are hover/focus-revealed between cards
- [ ] Card-outline footer button label is `Add card`
- [ ] `CardStack` empty state shows a dashed border button with `Add your first card`
- [ ] Card stack uses `setActiveSlide(slide.id)` on click and also supports keyboard activation with `Enter` or `Space`
- [ ] Only the active Gamma card shows per-card action buttons for background and sparkle menus
- [ ] Card-stack end-of-list insert button remains visible below the final card

### Actual Current Behavior Corrections
- [ ] In Slides-mode AI chat, quick-action chips do not always send immediately in every context described by the original doc; the panel builds the outgoing request differently for `chat`, `learn`, and `draft` modes
- [ ] `/visual` and `/illustrate` are not separate backend modes in `SlidesAgentPanel`; they stay in `chat` mode and are sent as prompt text
- [ ] Gamma quick-action chips only populate the input field; they do not dispatch the request until the user sends it
- [ ] Gamma mode does not show the three-panel card layout when a deck has zero slides; it shows the outline generator instead
- [ ] Gamma export errors use `alert()` rather than inline toast/banner UI
- [ ] Switching from Gamma to Slides mode is gated by a browser confirmation dialog, not an inline custom modal
- [ ] The Gamma right-side agent panel is controlled by `agentPanelOpen`, not by `rightPanel`
- [ ] The card-outline sidebar menu is a small local dropdown with `Duplicate` and `Delete`, not a full context menu with filmstrip-style actions

---

## Re-Audit Discoveries (Claude Code Pass 2)

### SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)

- [ ] Loading state displays centered spinner (brand border, transparent top) with text "Loading presentation..."
- [ ] Error state displays "Deck not found or access denied." in red-500 with "Back to presentations" link to `/slides`
- [ ] `PresenterMode` is lazy-loaded via `React.lazy` with Suspense fallback showing "Loading presenter mode..." on a full-screen black background
- [ ] Presenter mode filters out slides where `hidden === true` before passing to `PresenterMode`
- [ ] Presenter mode starts at the index of the current `activeSlideId` within the visible slides (falls back to 0)
- [ ] Entire workspace is wrapped in `<ThemeProvider theme={themeConfig}>` so theme context propagates to all children
- [ ] Mode selection screen is shown only when `slides.length === 0` AND user has not yet chosen a mode; existing decks with slides skip it automatically
- [ ] Presenter receives `masters`, `themeKey`, `themeConfig`, and `transition` from the store

### Slides Store — Additional State & Defaults (`slides-store.ts`)

- [ ] Default `agentMode` is `"draft"`, not `"learn"`
- [ ] Default `transition` is `"fade"`
- [ ] Default `themeKey` is `"modern"` and `themeConfig` is `PRESET_THEMES.modern`
- [ ] `RightPanel` full type union: `"properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | "accessibility" | null`
- [ ] `loadDeck` clears `agentChatHistory` to empty array on every deck load
- [ ] `loadDeck` sets `activeSlideId` to the first slide's ID and `selectedSlideIds` to a Set of that ID
- [ ] `setActiveSlide` clears `selectedBlockIndices`, `allBlocksSelected`, and `editingBlockIndex`
- [ ] `addSlide` creates a slide with title `"New Slide"` and one text block `{ type: "text", data: { text: "Click to add content", style: "body" } }`
- [ ] `duplicateSlide` appends `" (copy)"` to the original slide's title
- [ ] `deleteSlide` is optimistic: removes from local state first, reverts all state on server failure
- [ ] `reorderSlides` is optimistic: applies new order locally, reverts on server failure
- [ ] Undo stack is capped at `MAX_UNDO_HISTORY = 50` entries
- [ ] Undo coalesces rapid changes to the same slide within a 500ms debounce window, keeping the original before-state
- [ ] Calling `undo()` or `redo()` flushes any pending debounced undo entry first
- [ ] Any new edit clears the redo stack
- [ ] Save debounce: `_debouncedSave` waits 800ms of inactivity, then `saveStatus` goes `"saving"` → `"saved"` → (1500ms later) `"idle"`
- [ ] Save is skipped if the slide was deleted during the debounce window
- [ ] `customThemes` support: `addCustomTheme(key, config)` and `deleteCustomTheme(key)` persisted via `updateDeck`
- [ ] `institutionKit` support: `setInstitutionKit(kit)` for branding
- [ ] `gridSize` clamped between 1 and 100, defaults to 5
- [ ] Store exposes `showFindReplace`, `showSlideSorter`, `showRulers`, `showGrid`, `snapToGrid`, `showVisualizePopover`, `showSharePanel` boolean toggles
- [ ] Block clipboard: `copyBlock()` deep-clones selected blocks, `cutBlock()` copies then deletes, `pasteBlock()` inserts after last selected block
- [ ] `clipboardSlide` for slide-level copy/paste: `copySlide(id)` strips `id` and `sortOrder`, `pasteSlide()` creates after active slide
- [ ] `regenerateSlide` tracks in-progress IDs via `regeneratingSlideIds` Set, adds on start, removes in `finally`
- [ ] `regenerateSlide` sends context: `{ prevSlideTitle, nextSlideTitle, deckTitle, audienceType }`
- [ ] `replaceAllSlides` preserves `activeSlideId` if found in new slides, otherwise falls back to first

### SlidesModeLayout — Additional Panels & Exports (`slides-mode-layout.tsx`)

- [ ] Slides mode agent panel width is `w-80` (320px), not `w-[360px]` like Gamma mode
- [ ] Global keyboard shortcuts registered on mount via `registerGlobalShortcuts(useSlidesStore)`
- [ ] `PresenceBridgeSlot` rendered for real-time collaboration sync
- [ ] PDF export opens `HandoutExportDialog` first, with options: `layout`, `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes`, `paperSize`
- [ ] PDF filename pattern: `${title}_handout.pdf`
- [ ] PNG single-slide export at 2x scale by default, 3x when Shift key held during click
- [ ] SVG single-slide export via `exportSlideAsSVG`
- [ ] All-slides PNG export: renders off-screen at 1920px width, waits for fonts, then zips as `${title}_slides_png.zip`
- [ ] Right panel renders `DefensePrepPanel` when `rightPanel === "defense"`
- [ ] Right panel renders `AccessibilityPanel` when `rightPanel === "accessibility"`
- [ ] Right panel renders `VersionHistoryPanel` when `rightPanel === "versions"`, which calls `loadDeck(deckId)` on restore
- [ ] Right panel renders `AnalyticsPanel` when `rightPanel === "analytics"`
- [ ] `FindReplaceDialog` shown as overlay when `showFindReplace` is true
- [ ] `SlideSorterView` shown as overlay when `showSlideSorter` is true

### API Route Validation & Error Shapes

#### `/api/slides/agent`
- [ ] Request validated by Zod: `prompt` max 4000 chars, `slides` max 100 items, `chatHistory` max 20 entries
- [ ] `mode` validated as `z.enum(["learn", "draft", "chat"])`
- [ ] 401 response: `{ error: "Unauthorized" }`
- [ ] 400 response: `{ error: "Invalid request body", details: <fieldErrors> }`
- [ ] 500 response: `{ error: "Agent operation failed" }`
- [ ] Uses model `"claude-sonnet-4-20250514"` for all modes
- [ ] Rate limited via `checkRateLimit(userId, "presentations", RATE_LIMITS.ai)`

#### `/api/slides/chat`
- [ ] Request validated by Zod: `message` max 4000 chars, `slides` max 100 items, `deckId` required positive int
- [ ] 401 response: `{ error: "Unauthorized" }`
- [ ] 400 response: `{ error: "Invalid request body", details: <fieldErrors> }`
- [ ] 500 response: `{ error: "Chat operation failed" }`
- [ ] Uses model `"claude-sonnet-4-20250514"`

#### `/api/slides/outline`
- [ ] Request validated by Zod: `title` max 500 chars, `description` max 5000, `cardCount` min 3 max 30 (server allows up to 30, UI limits to 20)
- [ ] 500 response: `{ error: "Failed to generate outline" }`
- [ ] System prompt instructs: "First card should be a title card", "Last card should be a summary/conclusion", "Each card should have 2-4 bullet points"

#### `/api/slides/generate-stream`
- [ ] Request validated by Zod: `audienceType` is enum-validated (10 exact values), `slideCount` max 30
- [ ] Response `Content-Type: application/x-ndjson; charset=utf-8`
- [ ] Stream events include `{ type: "images", current: N, total: N, message: "Generating images... (N/N)" }`
- [ ] Stream `complete` event includes `{ slideCount, generatedImages }`
- [ ] 500 response: `{ error: "Generation failed" }`

#### `/api/slides/regenerate`
- [ ] `instruction` max 4000 chars, `tone` min 1 max 100 chars
- [ ] Returns 404 `{ error: "Deck not found" }` or `{ error: "Slide not found" }` when resources missing
- [ ] RegenerateTone values: `"keep_similar"`, `"more_detailed"`, `"more_concise"`, `"different_approach"` (from `src/lib/slides/regenerate.ts`)
- [ ] Response validated against `generatedSlideSchema` with 18 allowed layout enum values
- [ ] 500 response: `{ error: "Slide regeneration failed" }`

#### `/api/presentations/edit-slide`
- [ ] Uses model `"claude-haiku-4-5-20251001"` (smaller model for speed)
- [ ] `action` field min 1 char, `contentBlocks` min 1 item
- [ ] Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`
- [ ] 500 response: `{ error: "Slide editing failed" }`

#### `/api/presentations/coach`
- [ ] `slides` array validated min 1, max 100
- [ ] `audienceType` is enum-validated (same 10 values as generate-stream)
- [ ] Response `suggestions` include `autoFixAvailable: boolean` per suggestion
- [ ] 500 response: `{ error: "Coach evaluation failed" }`

#### `/api/export/pptx`
- [ ] Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right", footerText }`
- [ ] Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
- [ ] Uses 4 slide masters: `"BRANDED"`, `"TITLE_MASTER"`, `"SECTION_MASTER"`, `"CONTENT_MASTER"`
- [ ] Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
- [ ] 400 response includes `{ error: "At least one slide is required" }` for empty slides array

#### `/api/export/presentation-pdf`
- [ ] `layout` validated as enum: `"full_slide" | "two_up" | "three_up_notes" | "six_up" | "outline"` (default `"full_slide"`)
- [ ] `paperSize` validated as `"letter" | "a4"` (default `"letter"`)
- [ ] `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true
- [ ] Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
- [ ] Filename pattern: `${safeTitle}_handout.pdf`

### Gamma Export Helper (`export-deck.ts`)

- [ ] Only PPTX format receives `themeConfig` in the request body; PDF does not
- [ ] Fallback title for empty titles: `"Untitled Deck"` in request, `"deck"` in filename
- [ ] Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, "_")`
- [ ] Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)

### SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)

- [ ] Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line "Clicking a chip sends the action as a message")
- [ ] Input placeholder changes dynamically: `"Edit this ${selectedBlockType} block..."` when block selected, `"Ask the AI to change your slides..."` otherwise
- [ ] Suggested changes panel header shows `"N change suggested"` / `"N changes suggested"` with singular/plural
- [ ] "Apply to All" button only rendered when `msg.suggestedChanges.length > 1`
- [ ] "Apply" button uses `ArrowRight` icon (size 10), "Apply to All" uses `ArrowsOutSimple` icon (size 10)
- [ ] Empty state (no messages, not loading, no stream) shows centered text: "Ask the AI to modify your slides, or pick a quick action above." and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`
- [ ] Send button `aria-label="Send message"`
- [ ] Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`
- [ ] User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]
- [ ] Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]

### GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)

- [ ] Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`
- [ ] Header label is `"AI Agent"` with Sparkle icon size 16 weight fill (not "AI Chat" as in Slides mode)
- [ ] Error message format: `"Something went wrong: ${err.message}. Please try again."`
- [ ] Fallback assistant message when API returns no summary: `"Changes applied."`
- [ ] Input textarea `rows={1}`, no auto-resize (unlike Slides agent which auto-resizes)
- [ ] Input `aria-label="Send message"` on send button
- [ ] Empty state prompt text: `"Ask the AI to modify your entire deck, or pick a quick action:"`
- [ ] Input focused on mount via `useEffect` with `inputRef.current?.focus()`

### CardSparkleMenu — Additional Details (`card-sparkle-menu.tsx`)

- [ ] Dropdown has `"AI Actions"` header (10px uppercase tracking-wider ink-muted) above the action list
- [ ] Each action constructs a slide-specific prompt via `buildMessage(slideId)` with exact instructions (e.g., "Improve the writing quality of slide ID ${id}. Make it more polished and professional.")
- [ ] Sparkle menu errors are silently swallowed — `catch {}` block with no user-facing error message
- [ ] Loading overlay shows `"AI is working..."` text alongside spinner (not just spinner)
- [ ] Dropdown has `role="menu"`, each action button has `role="menuitem"`
- [ ] Trigger button has `aria-label="AI card actions"` and `aria-expanded={open}`
- [ ] Trigger button uses `ImageSquare` icon (not just `Sparkle`) — correction: trigger IS `Sparkle`, `ImageSquare` is the background button

### CardBackgroundPicker — Additional Details (`card-background-picker.tsx`)

- [ ] Exactly 12 preset color hex values: `#ffffff`, `#f8fafc`, `#f1f5f9`, `#e2e8f0`, `#1e293b`, `#0f172a`, `#fef2f2`, `#fef9c3`, `#ecfdf5`, `#eff6ff`, `#f5f3ff`, `#fdf2f8`
- [ ] Theme colors (primary, background, surface, text) are prepended to presets and deduplicated via `Set`
- [ ] Custom color uses a `ColorPicker` component (not a raw color input)
- [ ] "Right" image position icon is `Columns` with `style={{ transform: "scaleX(-1)" }}` to mirror it
- [ ] Overlay type controls only show when `imageUrl` is set AND `imagePosition !== "none"`
- [ ] Overlay intensity and color controls only show when `overlayType !== "none"`
- [ ] Overlay intensity defaults to `50` (shown as `50%`)
- [ ] Overlay color defaults to `#000000`
- [ ] Reset button text: `"Reset to default"` (clears `cardBackground` to `undefined`)
- [ ] Picker width is `w-72` (288px)
- [ ] `CardBackgroundButton` closes on `Escape` keypress
- [ ] `CardBackgroundButton` trigger has `aria-label="Card background settings"` and `aria-expanded`
- [ ] Trigger icon is `ImageSquare` (not just "Image icon")

### CardEditor — Additional Details (`card-editor.tsx`)

- [ ] Subtitle is editable in active state via `EditableTextBlock` with `style="subtitle"` and placeholder `"Subtitle..."`
- [ ] Non-active cards show `"Untitled Card"` when title is empty
- [ ] Empty state (active card, 0 content blocks): italic muted text `"Click here to start typing, or type / for commands"`
- [ ] Text block inline editing supports `fontFamily`, `fontSize`, and `color` properties from block data
- [ ] Bullets block editing passes `ordered` flag to toggle ordered/unordered lists

### CardStack — Additional Details (`card-stack.tsx`)

- [ ] Insert buttons between cards show `"Add card"` text label alongside the Plus icon (not just "+")
- [ ] Active card border is `border-brand ring-1 ring-brand/30` (ring-1, not ring-2 as documented in Section 10)
- [ ] Card accent bar is `h-1` (4px), not `1px` as stated in original doc
- [ ] Side images (left/right) take `w-2/5` of card width with `min-h-[200px]`
- [ ] Background image frosted overlay uses `backdropFilter: blur(${intensity / 10}px)` where intensity is `overlayIntensity ?? 50`
- [ ] Card wrapper uses `role="button" tabIndex={0}` for accessibility

### OutlineGenerator — Additional Details (`outline-generator.tsx`)

- [ ] Prompt step header: Sparkle icon (28px, duotone) in a `w-14 h-14 rounded-2xl bg-brand/10` container
- [ ] Prompt step title: `"Create a new presentation"`
- [ ] Prompt step subtitle: `"Describe your topic and we will generate an editable outline you can refine before creating slides."`
- [ ] Title input placeholder: `"e.g. The Role of CRISPR in Gene Therapy"`
- [ ] Description label includes `"(optional)"` in faint text
- [ ] Audience picker active state: `border-brand bg-brand/5 text-brand`
- [ ] Card count slider label shows `"Cards: ${cardCount}"`
- [ ] Outline step header: `"Edit your outline"` with `PencilSimple` icon (20px, duotone)
- [ ] Outline step subtitle: `"Reorder, add, remove, or edit cards and bullet points before generating."`
- [ ] Outline card number shown as brand circle badge at top-left (`-top-2.5 -left-2.5 w-6 h-6`)
- [ ] Outline card remove button has red hover: `hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500`
- [ ] Outline card list scrollable: `max-h-[50vh] overflow-y-auto`
- [ ] Individual bullet remove buttons show on group-hover with red styling
- [ ] Theme step title: `"Pick a theme"`
- [ ] Theme step subtitle: `"Select a visual style for your presentation. You can change this later."`
- [ ] Theme step swatches use `flex flex-wrap justify-center gap-3` — NOT a 4-column grid as stated in original doc

### ThemeCustomizer — Additional Details (`theme-customizer.tsx`)

- [ ] `SegmentedControl` uses `role="radiogroup"` with `aria-checked` on each option
- [ ] Small theme swatches are `64x36px` (not large cards)
- [ ] Small theme swatch check badge is in BOTTOM-RIGHT corner (`bottom-0.5 right-0.5 w-3.5 h-3.5`), not top-right
- [ ] Section headings use `"mt-3 mb-1.5 first:mt-0"` spacing

### SmartLayoutPicker — Additional Details (`smart-layout-picker.tsx`)

- [ ] Layout picker uses a 2-column grid (`grid-cols-2 gap-2`) with max-h-96 overflow-y-auto
- [ ] Header shows `"Smart Layouts"` title with subtitle `"Replace this card's content with a pre-built layout"`
- [ ] Each smart layout maps to a `SlideLayout` via `LAYOUT_MAP` (e.g., `two_column → "two_column"`, `chart_with_caption → "chart_slide"`)
- [ ] Picker closes on Escape and click-outside

### ModeSelector — Additional Details (`mode-selector.tsx`)

- [ ] Mode toggle buttons use inline SVG icons (not Phosphor icon components)
- [ ] "Slides" SVG: rectangle with vertical divider line; "Create" SVG: star outline path
- [ ] `ModeSelectionScreen` subtitle text: `"You can switch anytime with the toggle"` (not just "You can switch anytime")
- [ ] Mode selection cards are `w-64` with `p-8 rounded-2xl`
- [ ] Mode selection icon containers: `w-16 h-16 rounded-xl bg-brand/10`

### BlockInserterMenu — Additional Details (`block-inserter-menu.tsx`)

- [ ] Search input auto-focuses on mount via `inputRef.current?.focus()`
- [ ] Smart Layouts entry hidden when search query is non-empty
- [ ] Empty search results show: `"No blocks found"` centered text
- [ ] Category order is hardcoded: `["content", "media", "academic"]`
- [ ] Category labels: `content → "Content"`, `media → "Media & Data"`, `academic → "Academic"`

### Behavior Corrections (Pass 2)

- [ ] Slides-agent quick-action chips SET INPUT TEXT only and do NOT auto-send; original Section 3 line 96 ("Clicking a chip sends the action as a message") is incorrect for SlidesAgentPanel — behavior matches GammaAgentPanel
- [ ] GammaAgentPanel uses local React `useState` for messages, NOT the store-backed `agentChatHistory` (which is only used by SlidesAgentPanel)
- [ ] ThemeCustomizer small theme swatches (64×36px) show the check badge in the BOTTOM-RIGHT corner, not top-right as stated
- [ ] Outline wizard theme step uses `flex-wrap justify-center gap-3`, not a `4-column grid` as original Section 16 claims
- [ ] Card accent bar in CardStack is `h-1` (4px), not `1px` as original Section 10 claims
- [ ] Active card in CardStack uses `ring-1 ring-brand/30`, not `ring-2` + blue border as original Section 10 claims
- [ ] CardSparkleMenu silently swallows API errors — there is no user-facing error message (original Section 12 says "Error messages displayed on failure" for other panels but sparkle menu has empty `catch {}`)
- [ ] PDF export in Slides mode opens `HandoutExportDialog` with layout/options before downloading (not a direct single-click download like PPTX)
- [ ] Only PPTX export receives `themeConfig` from Gamma mode's `export-deck.ts`; PDF export does not send theme
- [ ] Server-side `cardCount` validation allows up to 30 (`z.number().int().min(3).max(30)`), while UI slider limits to 20
- [ ] No `loading.tsx` or `error.tsx` route-level files exist under `src/app/(app)/slides/`; all loading/error UI is handled within `SlidesWorkspace` component

---

*Document generated from source code analysis. Last updated: 2026-03-10.*
