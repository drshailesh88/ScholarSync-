# Gamma Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the skeleton Chat Mode into a full Gamma.app-style card-based AI presentation builder ("Create Mode"), achieving feature parity with Gamma's core experience.

**Architecture:** Reuse existing Tiptap v3 editor (already installed with 20+ extensions, slash commands, bubble menus) as the per-card content editor. Cards are fluid-height, scrollable, and rendered via existing `SlideRendererV2` with a new `fluid` prop. All new code goes in `src/components/slides/gamma-mode/`. Existing Slides Mode (`slides-mode/`) is untouched. Shared store (`slides-store.ts`) gets minimal extensions.

**Tech Stack:** Tiptap v3 (existing), @dnd-kit/core + @dnd-kit/sortable (new install), Framer Motion (existing), Zustand (existing), Vercel AI SDK (existing), Phosphor Icons (existing).

**Design Doc:** `docs/plans/2026-03-01-gamma-mode-design.md`

---

## Phase 1: Foundation — Card Editor + Navigation

### Task 1: Install dnd-kit and rename mode types

**Files:**
- Modify: `package.json` (add @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities)
- Modify: `src/stores/slides-store.ts:32` (rename WorkspaceMode)
- Modify: `src/components/slides/mode-selector.tsx:4,30-42` (rename labels)

**Step 1: Install dnd-kit**

Run: `cd /Users/shaileshsingh/ScholarSync && npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`

**Step 2: Rename WorkspaceMode in store**

In `src/stores/slides-store.ts`, change line 32:
```ts
// Before:
export type WorkspaceMode = "slides" | "chat";
// After:
export type WorkspaceMode = "slides" | "create";
```

Update default mode on line 173:
```ts
// Before:
mode: "slides",
// After: (keep as "slides" — no change needed since "slides" is still the default)
mode: "slides",
```

**Step 3: Update mode selector labels**

In `src/components/slides/mode-selector.tsx`, change the second button label from "Chat" to "Create" (line 37-42). Change the `onClick` from `"chat"` to `"create"`.

Update `ModeSelectionScreen` descriptions:
- "Slides Mode" → "Click and build like PowerPoint" (keep as-is)
- "Chat Mode" → "Create Mode" with description "Describe and watch it build" (keep as-is or refine to "AI builds it, you refine")

**Step 4: Update workspace routing**

In `src/components/slides/slides-workspace.tsx`, line 104:
```ts
// Before:
{mode === "slides" ? <SlidesModeLayout /> : <ChatModeLayout />}
// After:
{mode === "slides" ? <SlidesModeLayout /> : <GammaModeLayout />}
```

Update the import to reference the new component (will be created in Task 2).

**Step 5: Commit**

```bash
git add -A && git commit -m "refactor: rename chat mode to create mode, install dnd-kit"
```

---

### Task 2: Create GammaModeLayout shell

**Files:**
- Create: `src/components/slides/gamma-mode/gamma-mode-layout.tsx`
- Delete: `src/components/slides/chat-mode/chat-mode-layout.tsx` (after new file works)
- Modify: `src/components/slides/slides-workspace.tsx` (update import)

**Step 1: Create the gamma-mode directory and layout file**

Create `src/components/slides/gamma-mode/gamma-mode-layout.tsx`:

```tsx
"use client";

import { useSlidesStore } from "@/stores/slides-store";
import { ModeSelector } from "../mode-selector";

export function GammaModeLayout() {
  const mode = useSlidesStore((s) => s.mode);
  const setMode = useSlidesStore((s) => s.setMode);
  const slides = useSlidesStore((s) => s.slides);
  const setIsPresenting = useSlidesStore((s) => s.setIsPresenting);

  return (
    <div className="flex flex-col h-full">
      {/* Top toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface shrink-0">
        <ModeSelector mode={mode} onModeChange={setMode} />
        <div className="flex-1" />
        <span className="text-xs text-ink-muted">
          {slides.length} card{slides.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setIsPresenting(true)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
        >
          Present
        </button>
      </div>

      {/* Three-panel layout: Sidebar | Card Stack | Agent Panel */}
      <div className="flex-1 flex min-h-0">
        {/* Left sidebar — card outline (Task 4) */}
        <div className="w-56 shrink-0 border-r border-border bg-surface overflow-y-auto p-3">
          <p className="text-xs text-ink-muted">Card outline (TODO)</p>
        </div>

        {/* Center — scrollable card stack (Task 3) */}
        <div className="flex-1 overflow-y-auto bg-surface-raised/30">
          <p className="text-sm text-ink-muted text-center py-20">Card stack (TODO)</p>
        </div>

        {/* Right panel — AI agent (Phase 2) */}
        {/* Will be toggled on/off */}
      </div>
    </div>
  );
}
```

**Step 2: Wire into workspace**

In `src/components/slides/slides-workspace.tsx`, replace ChatModeLayout import:
```ts
// Before:
import { ChatModeLayout } from "./chat-mode/chat-mode-layout";
// After:
import { GammaModeLayout } from "./gamma-mode/gamma-mode-layout";
```

And update the render (already done conceptually in Task 1 Step 4).

**Step 3: Delete old chat-mode directory**

```bash
rm -rf src/components/slides/chat-mode/
```

**Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: create gamma-mode layout shell, remove old chat-mode"
```

---

### Task 3: Build CardStack — scrollable card container

**Files:**
- Create: `src/components/slides/gamma-mode/card-stack.tsx`
- Modify: `src/components/slides/gamma-mode/gamma-mode-layout.tsx` (wire it in)

**Step 1: Create the card stack component**

Create `src/components/slides/gamma-mode/card-stack.tsx`:

This renders all slides as fluid-height cards in a vertical scroll container. Each card is a themed container with:
- A visible card boundary (rounded corners, shadow, max-width)
- A "+" button between cards to insert new ones
- Click-to-select behavior (sets activeSlideId)
- Active card highlight (blue border)

Key implementation:
```tsx
"use client";

import { useRef } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import { Plus } from "@phosphor-icons/react";

export function CardStack() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        {slides.map((slide, index) => (
          <div key={slide.id}>
            {/* Card */}
            <div
              onClick={() => setActiveSlide(slide.id)}
              className={`rounded-xl shadow-md overflow-hidden cursor-pointer transition-all border-2 ${
                activeSlideId === slide.id
                  ? "border-brand shadow-brand/10"
                  : "border-transparent hover:border-border"
              }`}
              style={{
                backgroundColor: themeConfig.backgroundColor,
                color: themeConfig.textColor,
                fontFamily: themeConfig.fontFamily ?? "Inter, sans-serif",
              }}
            >
              {/* Card content — will be replaced by CardEditor in Task 5 */}
              <div className="p-8 min-h-[200px]">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: themeConfig.primaryColor }}
                >
                  {slide.title || "Untitled Card"}
                </h3>
                {slide.contentBlocks.map((block, bi) => (
                  <div key={bi} className="text-sm opacity-80 mb-1">
                    [{block.type}] {JSON.stringify(block.data).slice(0, 80)}...
                  </div>
                ))}
              </div>
            </div>

            {/* Add card between */}
            <div className="flex justify-center py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addSlide(slide.id);
                }}
                className="group flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-ink-muted opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-surface-raised"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        ))}

        {/* Add card at end */}
        {slides.length === 0 && (
          <button
            onClick={() => addSlide()}
            className="w-full py-20 rounded-xl border-2 border-dashed border-border hover:border-brand/40 text-ink-muted hover:text-brand transition-colors"
          >
            <Plus size={24} className="mx-auto mb-2" />
            <span className="text-sm">Add your first card</span>
          </button>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Wire into GammaModeLayout**

Replace the center placeholder with `<CardStack />`.

**Step 3: Verify build**

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add CardStack — scrollable card container for gamma mode"
```

---

### Task 4: Build CardOutlineSidebar with dnd-kit reorder

**Files:**
- Create: `src/components/slides/gamma-mode/card-outline-sidebar.tsx`
- Modify: `src/components/slides/gamma-mode/gamma-mode-layout.tsx` (wire it in)

**Step 1: Create the outline sidebar**

Create `src/components/slides/gamma-mode/card-outline-sidebar.tsx`:

This shows a compact list of card titles in the left sidebar with:
- dnd-kit sortable drag handles for reordering
- Click to scroll to card
- Active card highlight
- "+" button to add between cards
- Right-click context menu (delete, duplicate)

Use `@dnd-kit/sortable` with `SortableContext` and `useSortable` hook. On drag end, call `useSlidesStore.reorderSlides()`.

**Step 2: Wire into GammaModeLayout**

Replace the left sidebar placeholder.

**Step 3: Verify reorder works**

Manual test: drag a card in sidebar, verify order changes in CardStack.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add CardOutlineSidebar with dnd-kit drag-to-reorder"
```

---

### Task 5: Build CardEditor — Tiptap per-card inline editing

**Files:**
- Create: `src/components/slides/gamma-mode/card-editor.tsx`
- Create: `src/components/slides/gamma-mode/card-tiptap-config.ts`
- Modify: `src/components/slides/gamma-mode/card-stack.tsx` (replace placeholder content)

**Step 1: Create Tiptap config for cards**

Create `src/components/slides/gamma-mode/card-tiptap-config.ts`:

Configure Tiptap with these extensions (all already installed):
- `StarterKit` (paragraphs, headings, bold, italic, lists, blockquotes, code blocks, hard breaks)
- `Underline`, `Superscript`, `Subscript`
- `TextAlign` (left, center, right)
- `Placeholder` ("Type / for commands...")
- `Image` (for inline images)
- `Link`
- `Highlight` (with multicolor)
- `TextStyle`, `Color`, `FontFamily`
- `Table`, `TableRow`, `TableCell`, `TableHeader`
- `TaskList`, `TaskItem`

Add a custom slash-command extension adapted from `src/components/editor/extensions/slash-commands.ts` but with presentation-specific commands (insert chart, image, callout, timeline, etc.).

**Step 2: Create CardEditor component**

Create `src/components/slides/gamma-mode/card-editor.tsx`:

Each card gets its own Tiptap editor instance. The editor:
- Initializes with HTML content derived from `slide.contentBlocks`
- On every update, converts the Tiptap HTML/JSON back to `ContentBlock[]` format
- Syncs to the Zustand store via `updateSlide()`
- Shows a bubble menu on text selection (bold, italic, link, color)
- Shows a floating "+" on empty lines / new blocks
- Has a slash menu (type "/" to insert blocks)
- Renders within the themed card container (inherits card background, fonts)

Key design decision: We need a bidirectional converter between our `ContentBlock[]` format and Tiptap's JSON/HTML. Create helper functions:
- `contentBlocksToTiptap(blocks: ContentBlock[]): JSONContent` — converts our blocks to Tiptap document
- `tiptapToContentBlocks(doc: JSONContent): ContentBlock[]` — converts Tiptap document back to our blocks

This is the most complex component. For blocks that Tiptap can't natively represent (chart, diagram, math, stat_result, timeline, callout), create Tiptap NodeView components that render read-only but can be selected and deleted.

**Step 3: Replace CardStack placeholder with CardEditor**

In `card-stack.tsx`, replace the card content div with `<CardEditor slide={slide} isActive={activeSlideId === slide.id} />`.

**Step 4: Test inline editing**

Manual test: click a card, type text, verify it persists in the store.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add CardEditor with Tiptap inline editing per card"
```

---

### Task 6: Add SlashCommandMenu for card editor

**Files:**
- Create: `src/components/slides/gamma-mode/slash-command-menu.tsx`
- Modify: `src/components/slides/gamma-mode/card-tiptap-config.ts` (add slash extension)

**Step 1: Create slash command menu component**

Adapt from `src/components/editor/slash-commands.tsx` (existing) but with presentation-specific commands:

Categories:
- **Text**: Heading 1, Heading 2, Paragraph, Bullet List, Numbered List, Blockquote
- **Media**: Image (upload/URL), Chart, Table, Divider
- **Academic**: Citation, Math Equation, Code Block, Callout, Timeline, Statistics, Bibliography
- **AI**: Generate content, Improve writing, Add citations, Simplify, Expand

Each command either:
- Inserts a Tiptap-native node (heading, list, paragraph) via Tiptap commands
- Inserts a custom NodeView (chart, math, callout, timeline) that renders our `ContentBlock` inline

**Step 2: Wire slash command extension into card-tiptap-config**

Register the `Suggestion` extension with the `/` trigger character and the command list.

**Step 3: Test**

Manual test: in a card, type `/`, see the command menu, select "Heading 1", verify it inserts.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add slash command menu for card editor"
```

---

### Task 7: Build GammaToolbar

**Files:**
- Create: `src/components/slides/gamma-mode/gamma-toolbar.tsx`
- Modify: `src/components/slides/gamma-mode/gamma-mode-layout.tsx` (replace top bar)

**Step 1: Create the toolbar**

Create `src/components/slides/gamma-mode/gamma-toolbar.tsx`:

Contains:
- Left: Mode selector toggle (Slides / Create)
- Center: Editable deck title (click to edit, debounced save)
- Right: Theme button, Export dropdown (PPTX, PDF), Present button, Agent toggle

The theme button opens a dropdown with the 14 preset themes as color swatches. Selecting one calls `useSlidesStore.setTheme()`.

Export button triggers existing export endpoints (`/api/export/pptx`, `/api/export/presentation-pdf`).

**Step 2: Wire into GammaModeLayout**

Replace the existing top bar with `<GammaToolbar />`.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add GammaToolbar with title edit, theme picker, export, present"
```

---

## Phase 2: AI Generation Pipeline

### Task 8: Build OutlineGenerator — prompt-to-outline flow

**Files:**
- Create: `src/components/slides/gamma-mode/outline-generator.tsx`
- Create: `src/app/api/slides/outline/route.ts`
- Modify: `src/components/slides/gamma-mode/gamma-mode-layout.tsx` (show for empty decks)

**Step 1: Create the outline API endpoint**

Create `src/app/api/slides/outline/route.ts`:

Accepts: `{ title: string, description: string, audienceType: string, cardCount?: number }`
Returns: `{ outline: { title: string, bulletPoints: string[], layout: string }[] }`

Uses `generateText()` with a system prompt that generates a JSON outline of card titles and key bullet points. The user can edit this outline before generation proceeds.

**Step 2: Create OutlineGenerator component**

Three-step flow displayed when a deck has 0 slides in Create mode:
1. **Prompt**: Text area for topic/description + audience picker
2. **Outline**: Editable list of card titles and bullets (add/remove/reorder)
3. **Theme**: Theme picker grid (reuse existing preset grid)
4. **Generate**: Progress indicator while AI generates full cards

On "Generate", call existing `/api/slides/generate-stream` with the edited outline.

**Step 3: Wire into layout**

In `gamma-mode-layout.tsx`, show `<OutlineGenerator />` when `slides.length === 0`, otherwise show the card stack.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add AI outline generator — prompt to editable outline to cards"
```

---

### Task 9: Build GammaAgentPanel — deck-wide AI chat

**Files:**
- Create: `src/components/slides/gamma-mode/gamma-agent-panel.tsx`
- Modify: `src/stores/slides-store.ts` (add `agentPanelOpen` state)
- Modify: `src/components/slides/gamma-mode/gamma-mode-layout.tsx` (toggle right panel)

**Step 1: Add agent panel state to store**

In `slides-store.ts`, add:
```ts
agentPanelOpen: boolean;
setAgentPanelOpen: (v: boolean) => void;
```

**Step 2: Create the agent panel**

Create `src/components/slides/gamma-mode/gamma-agent-panel.tsx`:

A right-side panel (width 360px) with:
- Chat messages list (user + assistant)
- Quick action chips: "Restructure deck", "Shorten all slides", "Add citations everywhere", "Improve flow", "Translate to..."
- Text input at bottom
- Calls existing `/api/slides/chat` endpoint
- On response, applies `modifiedSlides` and `newSlides` to the store

Reuse the message rendering pattern from the deleted `chat-mode-layout.tsx` but with better UX (quick actions, loading states, apply confirmations).

**Step 3: Wire into layout with toggle**

In `gamma-mode-layout.tsx`, add the agent panel as a collapsible right section. Toggle via the Agent button in GammaToolbar.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add GammaAgentPanel — deck-wide AI chat for bulk operations"
```

---

### Task 10: Build CardSparkleMenu — per-card AI actions

**Files:**
- Create: `src/components/slides/gamma-mode/card-sparkle-menu.tsx`
- Modify: `src/components/slides/gamma-mode/card-stack.tsx` (add sparkle to each card)

**Step 1: Create the sparkle menu**

Create `src/components/slides/gamma-mode/card-sparkle-menu.tsx`:

A floating menu that appears on:
- Hovering over the top-right of a card (sparkle icon)
- Pressing Cmd+E while a card is focused

Actions:
- Improve writing
- Shorten / Expand
- Add citations
- Add speaker notes
- Rephrase for audience
- Simplify language
- Translate
- Add visual (suggest image/chart)
- Regenerate card

Each action calls `/api/slides/chat` with the specific card's content and the action type. On response, applies changes to that single card.

**Step 2: Wire into CardStack**

Add `<CardSparkleMenu slideId={slide.id} />` to each card wrapper, positioned absolutely at top-right.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add per-card AI sparkle menu with Cmd+E shortcut"
```

---

## Phase 3: Smart Layouts + Themes

### Task 11: Build SmartLayoutPicker

**Files:**
- Create: `src/components/slides/gamma-mode/smart-layout-picker.tsx`
- Create: `src/components/slides/gamma-mode/smart-layout-templates.ts`

**Step 1: Define smart layout templates**

Create `src/components/slides/gamma-mode/smart-layout-templates.ts`:

10 pre-designed layout patterns, each producing a set of `ContentBlock[]`:
1. **Bullets** — Icon + title + formatted bullet list
2. **Columns** — 2 or 3 column comparison
3. **Timeline** — Horizontal or vertical timeline
4. **Steps** — Numbered step-by-step process
5. **Funnel** — Narrowing funnel visualization
6. **Pyramid** — Hierarchical pyramid
7. **Gallery** — Image grid (2x2 or 3x2)
8. **Icons** — Icon-driven feature list
9. **Arrows** — Flow/process with arrows
10. **Big Number** — Large statistic with context

Each template is a function that returns `ContentBlock[]` with sensible placeholder content.

**Step 2: Create the picker UI**

Create `src/components/slides/gamma-mode/smart-layout-picker.tsx`:

A modal or dropdown showing the 10 layouts as visual thumbnails. On select, inserts the layout's blocks into the active card.

Register as a slash command: `/layout` opens the smart layout picker.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add 10 smart layout templates with picker"
```

---

### Task 12: Build ThemeCustomizer

**Files:**
- Create: `src/components/slides/gamma-mode/theme-customizer.tsx`
- Modify: `src/types/presentation.ts:141-158` (extend ThemeConfig)

**Step 1: Extend ThemeConfig**

Add to `ThemeConfig` interface:
```ts
borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
borderStyle?: "none" | "subtle" | "strong";
shadowStyle?: "none" | "subtle" | "medium" | "dramatic";
cardSpacing?: "compact" | "comfortable" | "spacious";
```

**Step 2: Create the customizer panel**

Create `src/components/slides/gamma-mode/theme-customizer.tsx`:

A panel (opened from GammaToolbar theme button) with:
- **Preset themes**: Grid of 14 presets (existing)
- **Colors**: Primary, secondary, accent, background, text color pickers
- **Fonts**: Heading font + body font dropdowns (from a curated list of Google Fonts available via CDN)
- **Roundness**: Slider or segmented control (none → xl)
- **Borders**: None / subtle / strong
- **Shadows**: None / subtle / medium / dramatic
- **Card spacing**: Compact / comfortable / spacious

All changes call `useSlidesStore.setTheme()` with the updated config. Changes apply in real-time to the card stack.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add theme customizer with colors, fonts, roundness, shadows"
```

---

### Task 13: Build CardBackgroundPicker

**Files:**
- Create: `src/components/slides/gamma-mode/card-background-picker.tsx`
- Modify: `src/stores/slides-store.ts` (add per-card background fields to SlideState)

**Step 1: Extend SlideState**

Add to `SlideState` interface in `slides-store.ts`:
```ts
cardBackground?: {
  color?: string;
  imageUrl?: string;
  imagePosition?: "none" | "top" | "left" | "right" | "background";
  overlayType?: "none" | "frosted" | "faded" | "clear";
  overlayIntensity?: number; // 0-100
  overlayColor?: string;
};
```

**Step 2: Create the background picker**

Create `src/components/slides/gamma-mode/card-background-picker.tsx`:

Appears when clicking on a card's edge/margin area or via right-click context menu:
- Background color picker (theme presets + custom)
- Image URL or upload
- Image position: 5 options with visual icons
- Overlay controls (type + intensity slider)

**Step 3: Apply backgrounds in CardStack rendering**

Update card wrapper in `card-stack.tsx` to use the card's background settings.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add per-card background and accent image picker"
```

---

## Phase 4: Interactive Blocks + Embeds

### Task 14: Add Toggle/Accordion block

**Files:**
- Create: `src/components/slides/gamma-mode/blocks/toggle-block.tsx`
- Modify: `src/types/presentation.ts:120-136` (add toggle to ContentBlock union)
- Modify: `src/components/slides/blocks/index.ts` (register in BLOCK_REGISTRY)

**Step 1: Add ToggleData type**

In `src/types/presentation.ts`, add:
```ts
export interface ToggleData {
  title: string;
  content: string; // HTML content inside the toggle
  defaultOpen?: boolean;
}
```

Add to `ContentBlock` union:
```ts
| (ContentBlockBase & { type: "toggle"; data: ToggleData })
```

**Step 2: Create toggle block renderer**

Both a read-only renderer for the block registry and an interactive Tiptap NodeView for the card editor. The toggle uses `<details>/<summary>` HTML elements with Framer Motion for smooth open/close animation.

**Step 3: Register in BLOCK_REGISTRY**

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add toggle/accordion content block"
```

---

### Task 15: Add Embed block

**Files:**
- Create: `src/components/slides/gamma-mode/blocks/embed-block.tsx`
- Modify: `src/types/presentation.ts` (add embed to ContentBlock union)
- Modify: `src/components/slides/blocks/index.ts` (register)

**Step 1: Add EmbedData type**

```ts
export interface EmbedData {
  url: string;
  embedType?: "youtube" | "vimeo" | "figma" | "google_sheets" | "google_docs" | "twitter" | "generic";
  title?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}
```

**Step 2: Create embed block**

Auto-detect embed type from URL patterns:
- YouTube: `youtube.com/watch`, `youtu.be` → iframe embed
- Vimeo: `vimeo.com` → iframe
- Figma: `figma.com` → iframe
- Google Sheets/Docs: `docs.google.com` → iframe
- Twitter/X: `twitter.com`, `x.com` → embedded tweet (via oembed)
- Generic: Any URL → iframe with fallback to link

Render as responsive iframe within the card.

**Step 3: Add to slash commands**

Add `/embed` command that prompts for a URL, auto-detects type, inserts the block.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add embed block with YouTube, Figma, Sheets auto-detection"
```

---

### Task 16: Add Nested Card block

**Files:**
- Create: `src/components/slides/gamma-mode/blocks/nested-card-block.tsx`
- Modify: `src/types/presentation.ts` (add nested_card to ContentBlock union)
- Modify: `src/components/slides/blocks/index.ts` (register)

**Step 1: Add NestedCardData type**

```ts
export interface NestedCardData {
  title: string;
  contentBlocks: ContentBlock[];
  collapsed?: boolean;
}
```

**Step 2: Create nested card renderer**

Renders as a visually distinct sub-card within a parent card. Click to expand/collapse. In presentation mode, pressing Enter opens/closes nested cards.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add nested card block for drill-down content"
```

---

## Phase 5: Presentation Enhancements

### Task 17: Add Spotlight Mode to presenter

**Files:**
- Create: `src/components/slides/gamma-mode/spotlight-mode.tsx`
- Modify: `src/components/presentation/presenter-mode.tsx` (add spotlight toggle)

**Step 1: Create spotlight overlay**

Create `src/components/slides/gamma-mode/spotlight-mode.tsx`:

When spotlight is active (toggled by pressing `S` in presenter mode):
- Current block/section is at full opacity
- Previous content dims to 30% opacity
- Future/unseen content blurs and fades to 10% opacity
- Clicking any block spotlights it
- Arrow keys advance the spotlight progressively through blocks

Uses CSS transitions for smooth opacity/blur changes.

**Step 2: Integrate into PresenterMode**

Add a spotlight toggle button to `presenter-controls.tsx`. When active, render the spotlight overlay on top of the slide.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add spotlight mode for progressive reveal in presentations"
```

---

### Task 18: Add quick edit in presentation mode

**Files:**
- Modify: `src/components/presentation/presenter-mode.tsx` (add E key handler)

**Step 1: Add edit mode toggle**

When presenting, pressing `E` or clicking a card enters quick-edit mode:
- Shows a simplified Tiptap editor inline on the current slide
- "Done" button exits back to presentation mode
- Changes persist to the store immediately

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add quick edit during presentation (press E)"
```

---

### Task 19: Add card scroll navigation in presenter mode

**Files:**
- Modify: `src/components/presentation/presenter-mode.tsx`

**Step 1: Enhance navigation for card-based decks**

When presenting a deck created in Create mode:
- Left/Right arrows: Move between cards
- Up/Down arrows: Scroll within a card (for long cards)
- Scroll indicator shows position within card
- Progress bar at bottom shows card position in deck

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add card scroll navigation in presenter mode"
```

---

## Phase 6: Bridge to Slides Mode

### Task 20: Export from Create mode to PPTX

**Files:**
- Modify: `src/components/slides/gamma-mode/gamma-toolbar.tsx` (wire export button)
- May need minor adjustments to `/api/export/pptx/route.ts`

**Step 1: Wire export to existing endpoints**

The existing PPTX export at `/api/export/pptx` already handles `ContentBlock[]` format. Wire the export button in GammaToolbar to:
1. Collect all slides from the store
2. POST to `/api/export/pptx` with the full deck data
3. Download the resulting .pptx file

If fluid-height cards need conversion to fixed-ratio slides, add a pre-processing step that splits long cards into multiple slides.

**Step 2: Test export**

Create a deck in Create mode, export to PPTX, open in PowerPoint, verify content.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: wire PPTX and PDF export from gamma mode"
```

---

### Task 21: Add "Continue in Slides Mode" bridge

**Files:**
- Modify: `src/components/slides/gamma-mode/gamma-toolbar.tsx` (add button)
- Modify: `src/stores/slides-store.ts` (mode switch handler)

**Step 1: Add mode switch button**

In GammaToolbar, add a "Open in Slides Mode" option in a dropdown menu. On click:
1. Show confirmation dialog: "Switch to Slides view? Cards will be converted to fixed-ratio slides."
2. On confirm, set `mode: "slides"` in the store
3. The same slides data is already compatible — both modes read from `slides[]`

If needed, normalize card-specific fields (card backgrounds, toggles) into closest slide equivalents.

**Step 2: Commit**

```bash
git add -A && git commit -m "feat: add 'Continue in Slides Mode' bridge between modes"
```

---

### Task 22: Final integration test and cleanup

**Files:**
- All gamma-mode files
- Tests

**Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 2: Build check**

Run: `npx next build`
Expected: Build succeeds

**Step 3: Manual smoke test**

1. Navigate to `/slides/new`, create a new deck
2. Choose "Create" mode
3. Verify OutlineGenerator appears for empty deck
4. Generate from prompt → verify cards appear
5. Click a card → verify inline Tiptap editing works
6. Type `/` → verify slash menu appears
7. Drag cards in sidebar → verify reorder
8. Open Agent panel → send a message → verify cards update
9. Click sparkle on a card → verify AI actions work
10. Change theme → verify all cards update
11. Present → verify cards render in presenter mode
12. Export to PPTX → verify download works
13. Switch to Slides mode → verify deck is intact

**Step 4: Final commit**

```bash
git add -A && git commit -m "feat: gamma mode complete — card-based AI presentation builder"
```

---

## Summary

| Phase | Tasks | Key Deliverables |
|-------|-------|-----------------|
| 1: Foundation | 1-7 | Card stack, sidebar, Tiptap editor, slash commands, toolbar |
| 2: AI Generation | 8-10 | Outline generator, agent panel, per-card sparkle |
| 3: Smart Layouts + Themes | 11-13 | 10 layout templates, theme customizer, card backgrounds |
| 4: Interactive Blocks | 14-16 | Toggles, embeds, nested cards |
| 5: Presentation | 17-19 | Spotlight mode, quick edit, card scroll nav |
| 6: Bridge | 20-22 | PPTX export, mode switch, integration test |

**Total: 22 tasks across 6 phases.**

**Files created:** ~20 new files in `src/components/slides/gamma-mode/`
**Files modified:** ~8 existing files (minimal changes)
**Files deleted:** 1 (`chat-mode/chat-mode-layout.tsx`)
**Files in slides-mode/ touched:** 0
