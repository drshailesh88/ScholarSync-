# ScholarSync Slides Rebuild — Complete Implementation Plan

## Vision: "Looks PowerPoint, Feels Gamma"

A dual-mode academic presentation maker:
- **Slides Mode**: PowerPoint-like canvas with filmstrip, toolbar, right-panel properties + agent
- **Chat Mode**: Gamma-like conversational interface with live preview
- Toggle between modes seamlessly; same data model underneath

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     SHARED DATA MODEL                           │
│  Deck → Slides → ContentBlocks → Theme                         │
│  (Zustand store: useSlidesStore)                                │
└───────────────────────┬─────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼                           ▼
   SLIDES MODE                  CHAT MODE
   (PowerPoint UX)             (Gamma UX)
   ┌──────────────┐          ┌──────────────┐
   │ Filmstrip    │          │ Chat panel   │
   │ Canvas 16:9  │          │ Live preview │
   │ Properties + │          │ Mini strip   │
   │ Agent panel  │          │              │
   └──────────────┘          └──────────────┘
          │                           │
          └─────────────┬─────────────┘
                        ▼
              ┌──────────────────┐
              │  BLOCK RENDERERS │  (shared by both modes)
              │  Text, Chart,    │
              │  Table, Math,    │
              │  Diagram, Code,  │
              │  Citation, etc.  │
              └──────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     Presenter      Exporter       Agent
     (reveal.js)   (PPTX/PDF)   (Learn/Draft)
```

---

## File Structure (New + Modified)

```
src/
├── stores/
│   └── slides-store.ts                    [NEW] Central Zustand store for slides workspace
│
├── components/slides/                     [NEW] All new slides components
│   ├── slides-workspace.tsx               [NEW] Top-level workspace with mode toggle
│   ├── mode-selector.tsx                  [NEW] Initial mode selection + toggle button
│   │
│   ├── slides-mode/                       [NEW] PowerPoint-like mode
│   │   ├── slides-mode-layout.tsx         [NEW] Filmstrip + Canvas + Right panel
│   │   ├── slide-filmstrip.tsx            [NEW] Left panel with thumbnails
│   │   ├── slide-canvas-editor.tsx        [NEW] 16:9 canvas with click-to-edit
│   │   ├── slide-element.tsx              [NEW] Selectable/editable element on canvas
│   │   ├── properties-panel.tsx           [NEW] Right panel: theme/layout/element props
│   │   ├── slides-toolbar.tsx             [NEW] Top ribbon: File, Edit, Insert, Design, etc.
│   │   ├── insert-menu.tsx                [NEW] Insert dropdown (Text, Chart, Table, etc.)
│   │   ├── context-menu.tsx               [NEW] Right-click menu with AI actions
│   │   └── speaker-notes-bar.tsx          [NEW] Bottom bar for speaker notes
│   │
│   ├── chat-mode/                         [NEW] Gamma-like mode
│   │   ├── chat-mode-layout.tsx           [NEW] Chat left + Preview right
│   │   ├── chat-panel.tsx                 [NEW] Conversation UI
│   │   ├── live-preview.tsx               [NEW] Slide preview with mini filmstrip
│   │   └── chat-message.tsx               [NEW] Message bubble with insertable content
│   │
│   ├── agent/                             [NEW] Agent panel (Learn + Draft modes)
│   │   ├── slides-agent-panel.tsx         [NEW] Agent panel container with mode tabs
│   │   ├── learn-mode.tsx                 [NEW] Research advisor for current slide
│   │   └── draft-mode.tsx                 [NEW] Content generator with insertable blocks
│   │
│   ├── blocks/                            [NEW] Modular block renderers
│   │   ├── index.ts                       [NEW] Block registry + factory
│   │   ├── text-block.tsx                 [NEW] Text/title/subtitle/caption
│   │   ├── bullets-block.tsx              [NEW] Ordered/unordered lists
│   │   ├── chart-block.tsx                [NEW] Recharts-based charts
│   │   ├── table-block.tsx                [NEW] Editable table
│   │   ├── image-block.tsx                [NEW] Image with caption
│   │   ├── math-block.tsx                 [NEW] KaTeX rendering
│   │   ├── diagram-block.tsx              [NEW] Mermaid diagrams
│   │   ├── code-block.tsx                 [NEW] Syntax highlighted code
│   │   ├── citation-block.tsx             [NEW] Inline citation
│   │   ├── callout-block.tsx              [NEW] Callout box
│   │   ├── stat-block.tsx                 [NEW] Statistical result
│   │   ├── bibliography-block.tsx         [NEW] Reference list
│   │   ├── timeline-block.tsx             [NEW] Timeline entries
│   │   ├── quote-block.tsx                [NEW] Styled blockquote
│   │   └── divider-block.tsx              [NEW] Divider line
│   │
│   ├── shared/                            [NEW] Shared between both modes
│   │   ├── slide-renderer-v2.tsx          [NEW] Modular renderer using block registry
│   │   ├── slide-layout-engine.tsx        [NEW] Smart layout system (constraint-based)
│   │   ├── theme-engine.tsx               [NEW] CSS custom properties + theme application
│   │   └── slide-thumbnail.tsx            [NEW] Thumbnail renderer for filmstrip/preview
│   │
│   └── generation/                        [NEW] Rebuilt generation wizard
│       ├── generation-flow.tsx            [NEW] Prompt → Outline → Theme → Generate
│       ├── prompt-input.tsx               [NEW] Clean prompt text area
│       ├── outline-editor.tsx             [NEW] Drag-to-reorder outline preview
│       └── theme-selector.tsx             [NEW] Visual theme picker
│
├── app/(app)/slides/                      [NEW] New route for slides workspace
│   ├── page.tsx                           [NEW] Slides listing page
│   ├── new/page.tsx                       [NEW] New presentation (generation flow)
│   └── [deckId]/page.tsx                  [NEW] Slides workspace (dual-mode editor)
│
├── app/api/slides/                        [NEW] New API routes
│   ├── agent/route.ts                     [NEW] Slides agent (Learn + Draft)
│   ├── chat/route.ts                      [NEW] Chat mode streaming
│   └── generate-stream/route.ts           [NEW] Streaming slide generation
│
├── components/presentation/               [KEEP] Existing components (unchanged)
│   └── (all existing files preserved)
│
├── types/presentation.ts                  [MODIFY] Fix field mismatches in prompts
└── lib/ai/prompts/presentation.ts         [MODIFY] Fix 5 bugs in AI prompt field names
```

---

## Phase 0: Fix Critical Bugs

**7 bugs that break the current system. All fixable in 2 files.**

### Bug 1: AutoTrigger uses useState instead of useEffect
**File**: `src/components/presentation/generation-wizard.tsx:688-695`
**Problem**: `useState(() => { setTimeout(...) })` runs the initializer but the cleanup return is ignored (useState doesn't clean up). This means generation never auto-fires reliably.
**Fix**: Change to `useEffect`:
```tsx
function AutoTrigger({ onTrigger }: { onTrigger: () => void }) {
  useEffect(() => {
    const t = setTimeout(onTrigger, 500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
```

### Bug 2: Math blocks — AI says "latex", renderer expects "expression"
**File**: `src/lib/ai/prompts/presentation.ts:122`
**Problem**: Prompt tells AI to generate `{ "latex": "E = mc^2" }` but `MathData` type expects `{ "expression": "E = mc^2", "displayMode": true }`.
**Fix**: Change prompt line 122 from:
```
{ "type": "math", "data": { "latex": "E = mc^2", "caption": "..." } }
```
to:
```
{ "type": "math", "data": { "expression": "E = mc^2", "displayMode": true, "caption": "..." } }
```

### Bug 3: Diagram blocks — AI says "mermaid", renderer expects "syntax"
**File**: `src/lib/ai/prompts/presentation.ts:123`
**Problem**: Prompt tells AI `{ "mermaid": "graph TD; A-->B;" }` but `DiagramData` expects `{ "syntax": "graph TD; A-->B;", "diagramType": "flowchart" }`.
**Fix**: Change prompt line 123 from:
```
{ "type": "diagram", "data": { "mermaid": "graph TD; A-->B;", "caption": "..." } }
```
to:
```
{ "type": "diagram", "data": { "syntax": "graph TD; A-->B;", "diagramType": "flowchart", "caption": "..." } }
```

### Bug 4: Callout blocks — AI says "variant", renderer expects "type"
**File**: `src/lib/ai/prompts/presentation.ts:125`
**Problem**: Prompt says `{ "variant": "info|warning|success|tip" }` but `CalloutData` expects `{ "type": "info|warning|success|finding|limitation|methodology|clinical" }`. Also "tip" is not a valid enum value.
**Fix**: Change to:
```
{ "type": "callout", "data": { "type": "info|warning|success|finding|limitation|methodology|clinical", "title": "Optional", "text": "..." } }
```

### Bug 5: Timeline blocks — AI says "events", renderer expects "entries"
**File**: `src/lib/ai/prompts/presentation.ts:128`
**Problem**: Prompt says `{ "events": [{ "date": "...", "title": "...", "description": "..." }] }` but `TimelineData` expects `{ "entries": [{ "label": "...", "date": "...", "description": "...", "status": "..." }] }`. Also "title" should be "label".
**Fix**: Change to:
```
{ "type": "timeline", "data": { "entries": [{ "label": "...", "date": "...", "description": "...", "status": "completed|in_progress|upcoming" }], "title": "..." } }
```

### Bug 6: Bibliography blocks — AI says "text", renderer expects "formatted"
**File**: `src/lib/ai/prompts/presentation.ts:127`
**Problem**: Prompt says `{ "entries": [{ "text": "APA-style reference" }] }` but `BibliographyData` expects `{ "entries": [{ "id": ..., "formatted": "...", "doi": "..." }], "style": "apa" }`.
**Fix**: Change to:
```
{ "type": "bibliography", "data": { "entries": [{ "id": 1, "formatted": "APA-style reference", "doi": "10.xxxx/xxxxx" }], "style": "apa|mla|chicago|vancouver|harvard" } }
```

### Bug 7: Coach route missing 5 audience types in Zod enum
**File**: `src/app/api/presentations/coach/route.ts:14`
**Problem**: `z.enum(["thesis_defense", "conference", "journal_club", "classroom", "general"])` is missing `grant_presentation`, `poster_session`, `systematic_review`, `patient_case`, `grand_rounds`.
**Fix**: Add all 10 audience types to the enum.

---

## Phase 1: Shared Infrastructure

### Task 1.1: Zustand Store — `useSlidesStore`
**File**: `src/stores/slides-store.ts`

Central state management replacing the 15+ useState calls in the current page.tsx.

```typescript
interface SlidesStore {
  // Deck
  deckId: number | null;
  title: string;
  audienceType: AudienceType;
  themeKey: string;
  themeConfig: ThemeConfig;

  // Slides
  slides: SlideState[];
  activeSlideId: number | null;
  activeSlide: SlideState | null; // computed

  // Mode
  mode: "slides" | "chat";
  setMode: (mode: "slides" | "chat") => void;

  // Right panel
  rightPanel: "properties" | "agent" | "comments" | "versions" | "analytics" | "defense" | null;
  setRightPanel: (panel: SlidesStore["rightPanel"]) => void;

  // Agent
  agentMode: "learn" | "draft";
  setAgentMode: (mode: "learn" | "draft") => void;

  // Actions
  loadDeck: (deckId: number) => Promise<void>;
  setActiveSlide: (id: number) => void;
  updateSlide: (id: number, data: Partial<SlideState>) => void;
  addSlide: (afterId?: number) => Promise<void>;
  deleteSlide: (id: number) => Promise<void>;
  reorderSlides: (ids: number[]) => Promise<void>;
  setTheme: (key: string, config: ThemeConfig) => void;

  // Save
  saveStatus: "idle" | "saving" | "saved" | "error";
  debouncedSave: (slideId: number, data: Partial<SlideState>) => void;
}
```

### Task 1.2: Block Registry
**File**: `src/components/slides/blocks/index.ts`

Maps block types to their renderer + editor components:
```typescript
export const BLOCK_REGISTRY: Record<ContentBlock["type"], {
  render: React.ComponentType<{ data: any; theme: ThemeConfig; scale?: number }>;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  defaultData: () => any;
}> = { ... };
```

### Task 1.3: Theme Engine
**File**: `src/components/slides/shared/theme-engine.tsx`

Converts ThemeConfig to CSS custom properties applied to slide containers:
```typescript
export function getThemeCSSVars(theme: ThemeConfig): React.CSSProperties;
export function ThemeProvider({ theme, children }: { theme: ThemeConfig; children: React.ReactNode });
```

### Task 1.4: Layout Engine
**File**: `src/components/slides/shared/slide-layout-engine.tsx`

Constraint-based layout system that maps SlideLayout + ContentBlock[] to positioned elements:
```typescript
interface LayoutResult {
  regions: {
    id: string;
    x: number; y: number; width: number; height: number;
    blocks: ContentBlock[];
  }[];
}

export function computeLayout(layout: SlideLayout, blocks: ContentBlock[]): LayoutResult;
```

16 layouts → each defines named regions (title, content, left, right, chart, etc.) with percentage-based positioning.

---

## Phase 2: Modular Block Renderers

**Replace the 2,072-line monolithic SlideRenderer with one component per block type.**

Each block renderer handles:
1. **Display mode** — Read-only rendering for preview/presenter
2. **Edit mode** — Click-to-edit inline editing (for Slides Mode)

### Block Components (15 files)

| Block | Renderer | Edit Interaction | Library |
|-------|----------|-----------------|---------|
| `text-block.tsx` | Styled text by style prop | Click → TipTap inline editor | TipTap |
| `bullets-block.tsx` | Ordered/unordered list | Click item to edit, +/- buttons | TipTap |
| `chart-block.tsx` | Recharts chart | Click → data editor sidebar | Recharts |
| `table-block.tsx` | HTML table with theme styling | Click cell to edit | Native |
| `image-block.tsx` | Image with caption | Click → replace/upload/Unsplash | Native |
| `math-block.tsx` | KaTeX rendered | Click → LaTeX input | KaTeX |
| `diagram-block.tsx` | Mermaid rendered | Click → Mermaid editor | Mermaid |
| `code-block.tsx` | Syntax highlighted | Click → CodeMirror | CodeMirror (already installed) |
| `citation-block.tsx` | Styled citation pill | Click → edit source/DOI | Native |
| `callout-block.tsx` | Colored callout box | Click → edit text, pick type | Native |
| `stat-block.tsx` | Large stat display | Click → edit value/CI/p | Native |
| `bibliography-block.tsx` | Reference list | Auto-generated from citations | Native |
| `timeline-block.tsx` | Vertical timeline | Click entry to edit | Native |
| `quote-block.tsx` | Blockquote with attribution | Click → edit text | Native |
| `divider-block.tsx` | Styled hr | Click → pick style | Native |

### New Slide Renderer V2
**File**: `src/components/slides/shared/slide-renderer-v2.tsx`

```tsx
export function SlideRendererV2({ slide, theme, scale, isEditing, onBlockUpdate }: Props) {
  const layout = computeLayout(slide.layout, slide.contentBlocks);

  return (
    <ThemeProvider theme={theme}>
      <div className="aspect-video relative" style={{ fontSize: `${scale * 16}px` }}>
        {/* Title region */}
        <SlideTitle title={slide.title} subtitle={slide.subtitle} theme={theme} />

        {/* Content regions from layout engine */}
        {layout.regions.map(region => (
          <div key={region.id} style={regionToCSS(region)}>
            {region.blocks.map((block, i) => {
              const Renderer = BLOCK_REGISTRY[block.type].render;
              return <Renderer key={i} data={block.data} theme={theme} />;
            })}
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
}
```

---

## Phase 3: Slides Mode (PowerPoint UX)

### Task 3.1: Workspace Layout
**File**: `src/components/slides/slides-mode/slides-mode-layout.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│  [Slides Mode ● ○ Chat Mode]   toolbar buttons...           │
├────────┬─────────────────────────────────┬───────────────────┤
│ Film-  │                                 │ Properties /      │
│ strip  │      16:9 Canvas                │ Agent panel       │
│ (left) │      (center)                   │ (right)           │
│        │                                 │                   │
│        │  [Speaker notes bar]            │                   │
├────────┴─────────────────────────────────┴───────────────────┤
```

### Task 3.2: Slide Filmstrip
**File**: `src/components/slides/slides-mode/slide-filmstrip.tsx`

- Vertical list of slide thumbnails (uses `SlideRendererV2` at 0.15 scale)
- Active slide highlighted
- Drag-to-reorder (use `@dnd-kit/core` — already available as peer of existing drag libs)
- Right-click context menu: Duplicate, Delete, Add After, Move Up/Down
- Slide numbers
- Comment count badges

### Task 3.3: Slide Canvas Editor
**File**: `src/components/slides/slides-mode/slide-canvas-editor.tsx`

The center panel. Fixed 16:9 aspect ratio canvas.

- Uses `SlideRendererV2` in edit mode
- Click a text element → inline TipTap editor activates
- Click a chart → chart data editor opens in right panel
- Click empty area → deselect all
- Title/subtitle editable directly on canvas (click to type)
- Visual grid/snap guides when dragging (optional, Phase 2)

### Task 3.4: Properties Panel (Right Side)
**File**: `src/components/slides/slides-mode/properties-panel.tsx`

Context-sensitive:
- **Nothing selected**: Theme picker, slide layout picker, deck settings
- **Text selected**: Font family, size, color, alignment, bold/italic
- **Chart selected**: Chart type picker, data editor, axis labels
- **Image selected**: Replace, crop controls, alt text
- **Any block**: Delete, duplicate, move up/down

### Task 3.5: Top Toolbar (Ribbon-Style)
**File**: `src/components/slides/slides-mode/slides-toolbar.tsx`

```
[File▾] [Edit▾] [Insert▾] [Design▾] [Transitions▾] [Present] [Share] [Export▾]
 B I U  │ Font▾ │ Size▾ │ Align │ ✨ AI Assist │ Mode toggle
```

- **File**: New, Open Recent, Save Copy, Download PPTX/PDF
- **Edit**: Undo, Redo, Copy, Paste, Delete Slide
- **Insert**: Text Box, Chart, Table, Image, Equation, Diagram, Code, Citation, Callout, Divider, Timeline
- **Design**: Theme gallery, custom colors, institutional branding
- **Transitions**: Slide transitions (fade, slide, zoom, morph) — maps to themeConfig.slideTransition
- **Present**: Launch presenter mode
- **Share**: Share panel
- **Export**: PPTX, PDF, PNG

### Task 3.6: Context Menu (Right-Click)
**File**: `src/components/slides/slides-mode/context-menu.tsx`

Right-click on any element:
- Cut / Copy / Paste / Delete
- **AI Rewrite** → submenu: Simplify, Expand, Make Formal, Make Concise
- **AI Enhance** → submenu: Add Citation, Add Data, Suggest Image
- Bring to Front / Send to Back
- Convert Block Type (e.g., bullets → table)

### Task 3.7: Speaker Notes Bar
**File**: `src/components/slides/slides-mode/speaker-notes-bar.tsx`

Collapsible bar at the bottom of the canvas. Plain text editor for speaker notes. Auto-saves.

---

## Phase 4: Chat Mode (Gamma UX)

### Task 4.1: Chat Mode Layout
**File**: `src/components/slides/chat-mode/chat-mode-layout.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│  [○ Slides Mode  ● Chat Mode]   [Present] [Share] [Export]   │
├──────────────────────────┬───────────────────────────────────┤
│  Chat conversation       │  Live preview                     │
│  (scrollable messages)   │  (current slide rendered)         │
│                          │                                   │
│  [input box]   [Send]    │  ◄ 3/12 ►  [mini filmstrip]     │
└──────────────────────────┴───────────────────────────────────┘
```

### Task 4.2: Chat Panel
**File**: `src/components/slides/chat-mode/chat-panel.tsx`

- Streaming chat with AI via `/api/slides/chat`
- User messages and AI responses
- AI responses include rendered slide previews inline
- Quick action buttons above input: "Add a slide about...", "Restyle the deck", "Restructure"
- Supports natural language commands: "Make slide 5 more visual", "Add a chart to slide 3"

### Task 4.3: Live Preview
**File**: `src/components/slides/chat-mode/live-preview.tsx`

- Renders the current slide using `SlideRendererV2` at ~0.6 scale
- Mini filmstrip below for quick navigation (horizontal, small thumbnails)
- Slide counter and navigation arrows
- Updates in real-time as AI modifies slides

### Task 4.4: Chat API Route
**File**: `src/app/api/slides/chat/route.ts`

Streaming endpoint that:
1. Receives user message + full deck context (current slides, theme, active slide)
2. Interprets the intent (modify slide, add slide, restyle, restructure, answer question)
3. Streams back both text response and structured slide modifications
4. Returns modified slide data as JSON in the stream

---

## Phase 5: Agent Panel (Learn + Draft)

### Task 5.1: Agent Panel Container
**File**: `src/components/slides/agent/slides-agent-panel.tsx`

Tabs: `[Learn] [Draft]`
- Lives in the right panel of Slides Mode (toggled via toolbar button)
- In Chat Mode, agent functionality is built into the chat itself

### Task 5.2: Learn Mode
**File**: `src/components/slides/agent/learn-mode.tsx`

**Slide-aware research advisor.** Reads the active slide's content and suggests:
- Relevant papers to cite (uses `/api/search/pubmed` and `/api/search/unified`)
- Missing studies the presentation should reference
- Counterarguments to address
- Methodology papers relevant to the approach on this slide

UI:
- "For this slide" header showing current slide title
- AI-generated paper suggestions with title, authors, year, relevance explanation
- "Search for more" input to ask about specific subtopics
- Each suggestion has [Add Citation] button that inserts a citation block

### Task 5.3: Draft Mode
**File**: `src/components/slides/agent/draft-mode.tsx`

**Content generator for slides.** User describes what they need, agent generates insertable content.

UI:
- Chat input: "Create a comparison table of 3 ML models"
- Agent responds with rendered preview of the content block(s)
- Each response has buttons: [Insert into Current Slide] [Insert as New Slide] [Copy]
- Supports: text, bullets, charts, tables, citations, callouts, stat results
- Context-aware: knows the deck topic, current slide, and audience type

### Task 5.4: Agent API Route
**File**: `src/app/api/slides/agent/route.ts`

Handles both Learn and Draft modes:
- **Learn**: Takes active slide content → returns paper suggestions with relevance scores
- **Draft**: Takes user prompt + deck context → returns ContentBlock[] ready for insertion

---

## Phase 6: Generation Flow Rebuild

### Task 6.1: Generation Flow
**File**: `src/components/slides/generation/generation-flow.tsx`

New 4-step flow:

**Step 1: Prompt**
- Clean text area: "What's this presentation about?"
- Or: "Blank deck" for manual creation
- Source selector below (papers, documents, text, deep research) — reuse existing `SourceSelector`

**Step 2: Outline Preview**
- AI generates section outline from prompt/source
- Drag-to-reorder sections
- Click to rename sections
- +/- buttons to add/remove sections
- Each section shows: title, suggested layout, estimated content

**Step 3: Theme Selection**
- Visual grid of themes (reuse PRESET_THEMES)
- Click to preview (shows first slide with theme applied)
- Institutional branding option

**Step 4: Generate**
- Streaming generation (slides appear one-by-one)
- Live preview of each slide as it generates
- Progress bar
- "Open in Slides Mode" / "Open in Chat Mode" buttons when done

### Task 6.2: Streaming Generation API
**File**: `src/app/api/slides/generate-stream/route.ts`

Server-sent events that stream slides one at a time:
```
event: slide
data: { "index": 0, "slide": { ... } }

event: slide
data: { "index": 1, "slide": { ... } }

event: done
data: { "deckId": 123, "totalSlides": 12 }
```

---

## Phase 7: Presenter Mode + Export

### Task 7.1: Keep existing presenter mode
The existing `presenter-mode.tsx` (693 lines) works. Wire it to use `SlideRendererV2` instead of the old renderer. No other changes needed.

### Task 7.2: Export improvements
- PPTX: Already uses PptxGenJS. Ensure new block types map correctly.
- PDF: Already has endpoint. Ensure it uses the new renderer.
- PNG: Add per-slide PNG export.

---

## Test Plan

### Unit Tests

**File**: `src/stores/__tests__/slides-store.test.ts`
```
- loadDeck: loads deck and sets state correctly
- setActiveSlide: updates activeSlideId and computes activeSlide
- updateSlide: updates slide in state and triggers debounced save
- addSlide: appends slide and sets it active
- deleteSlide: removes slide and selects next
- reorderSlides: reorders and persists
- setTheme: updates themeKey and themeConfig
- setMode: toggles between slides/chat
- setRightPanel: sets panel, null closes
```

**File**: `src/components/slides/blocks/__tests__/block-registry.test.ts`
```
- all 15 block types registered
- each block type has render, label, icon, defaultData
- defaultData() returns valid ContentBlock data for each type
```

**File**: `src/components/slides/shared/__tests__/slide-layout-engine.test.ts`
```
- title_slide: returns single centered region
- title_content: returns title region + content region
- two_column: returns title + left + right regions
- three_column: returns title + 3 column regions
- chart_slide: returns title + chart region + optional content
- all 16 layouts: returns valid LayoutResult
- empty blocks: handles gracefully
```

**File**: `src/components/slides/shared/__tests__/theme-engine.test.ts`
```
- getThemeCSSVars: returns all required CSS custom properties
- handles missing optional fields (surfaceColor, gradientFrom, etc.)
- all 14 preset themes produce valid CSS vars
```

**File**: `src/components/slides/blocks/__tests__/text-block.test.ts`
```
- renders text content
- applies correct style (title/subtitle/body/caption)
- applies theme fonts and colors
```

**File**: `src/components/slides/blocks/__tests__/chart-block.test.ts`
```
- renders bar chart with labels and datasets
- renders line, pie, scatter, area, radar charts
- handles empty datasets gracefully
- applies theme colors to chart
```

**File**: `src/components/slides/blocks/__tests__/math-block.test.ts`
```
- renders valid LaTeX expression
- handles displayMode true/false
- renders caption when provided
- handles invalid LaTeX gracefully (shows error, not crash)
```

**File**: `src/components/slides/blocks/__tests__/diagram-block.test.ts`
```
- renders valid Mermaid syntax
- handles invalid syntax gracefully
- renders caption
```

**File**: `src/components/slides/blocks/__tests__/citation-block.test.ts`
```
- renders citation text and source
- renders DOI link when provided
- renders authors and year
```

**File**: `src/components/slides/blocks/__tests__/callout-block.test.ts`
```
- renders all 7 callout types with correct colors
- renders title when provided
- renders text content
```

**File**: `src/components/slides/blocks/__tests__/stat-block.test.ts`
```
- renders label, value
- renders CI when provided
- renders p-value when provided
- renders interpretation
```

**File**: `src/components/slides/blocks/__tests__/bibliography-block.test.ts`
```
- renders list of formatted references
- renders DOI links
- handles empty entries
```

**File**: `src/components/slides/blocks/__tests__/timeline-block.test.ts`
```
- renders entries with label, date, description
- renders status indicators (completed/in_progress/upcoming)
- renders title when provided
```

### Integration Tests

**File**: `src/components/slides/shared/__tests__/slide-renderer-v2.test.ts`
```
- renders a complete slide with mixed block types
- applies theme to all blocks
- handles all 16 layouts
- handles empty contentBlocks
- handles missing title/subtitle
```

**File**: `src/components/slides/__tests__/slides-workspace.test.ts`
```
- renders in slides mode by default
- mode toggle switches to chat mode
- mode toggle preserves slide state
- right panel toggles correctly
```

**File**: `src/lib/ai/prompts/__tests__/presentation-prompts.test.ts`
```
- getSlideGeneratorSystemPrompt: all block type examples match ContentBlock types
- math block example has "expression" field (not "latex")
- diagram block example has "syntax" field (not "mermaid")
- callout block example has "type" field (not "variant")
- timeline block example has "entries" field (not "events")
- bibliography block example has "formatted" field (not "text")
- all audience types produce valid guidance
```

**File**: `src/app/api/presentations/__tests__/coach-route.test.ts`
```
- accepts all 10 audience types
- rejects invalid audience type
- returns valid CoachEvaluation shape
```

### End-to-End Tests (Playwright)

**File**: `e2e/slides.spec.ts`
```
- create new presentation via generation flow
- switch between slides mode and chat mode
- edit slide title by clicking on canvas
- add new slide via filmstrip
- delete slide via right-click
- reorder slides via drag
- change theme
- open presenter mode
- export to PPTX
```

---

## Implementation Order

```
Phase 0  ─── Fix 7 bugs                          [~1 hour]
Phase 1  ─── Store + Block Registry + Engines     [~1 day]
Phase 2  ─── 15 Block Renderers                   [~1 day]
Phase 3  ─── Slides Mode (PowerPoint UX)          [~2 days]
Phase 4  ─── Chat Mode (Gamma UX)                 [~1 day]
Phase 5  ─── Agent Panel (Learn + Draft)           [~1 day]
Phase 6  ─── Generation Flow Rebuild               [~1 day]
Phase 7  ─── Presenter + Export wiring             [~0.5 day]
Tests    ─── Unit + Integration + E2E              [throughout]
```

**Total new files**: ~45
**Total new lines**: ~6,000-8,000
**Files modified**: 3 (prompts, coach route, generation wizard)
**Files replaced**: 0 (old components kept at /presentation route, new at /slides route)

---

## Key Design Decisions

1. **New /slides route, not replacing /presentation**: The existing presentation feature keeps working at `/presentation`. The new dual-mode workspace lives at `/slides`. This lets us build incrementally without breaking anything.

2. **Zustand store, not useState soup**: The current page.tsx has 15+ useState calls. A Zustand store makes state accessible from any component without prop drilling.

3. **Block registry pattern**: Instead of a 2,072-line switch statement, each block type is a self-contained component. Adding a new block type = adding one file + one registry entry.

4. **Constraint-based layouts**: Users pick a layout (title_content, two_column, etc.) and the layout engine positions blocks. Users can nudge within constraints but can't create ugly slides.

5. **Same data model**: Both Slides Mode and Chat Mode read/write the same SlideState[] in the Zustand store. Switching modes is a view change, not a data migration.

6. **Existing components preserved**: All 47 existing presentation components remain untouched. They continue to work at the `/presentation` route. The new system at `/slides` is additive.
