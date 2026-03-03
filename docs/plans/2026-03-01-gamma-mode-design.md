# Gamma Mode Design — Card-Based AI Presentation Builder

**Date:** 2026-03-01
**Branch:** `claude/slides-generation-pipeline-RL9z3`
**Status:** APPROVED

## Overview

Rebuild the "Chat Mode" in the slides workspace into a full Gamma.app-style card-based presentation editor ("Create Mode"). Users get two modes when opening a presentation:

- **Slides** — PowerPoint-like WYSIWYG editor (DONE, untouched)
- **Create** — Gamma-like card-based editor with AI generation (THIS DESIGN)

Users can create in either mode, switch between them, and export to PPTX from both.

## Architecture

### Open-Source Stack

| Layer | Library | License | Stars |
|-------|---------|---------|-------|
| Card content editor | Tiptap v3 (ALREADY INSTALLED) | MIT | 28k |
| Card reordering | @dnd-kit/sortable (new install) | MIT | 14k |
| Card rendering | Custom SlideRendererV2 (existing) | — | — |
| Presentation mode | Existing PresenterMode | — | — |
| Export | Existing PptxGenJS + pdf-lib | — | — |
| AI generation | Vercel AI SDK (existing) | — | — |

**Why Tiptap v3:** Already installed with 20+ extensions (StarterKit, Table, Image, Link, Suggestion for slash commands, BubbleMenu, etc.). Already used in `src/components/editor/` with slash commands, citation nodes, bibliography nodes. Reuse existing infrastructure — zero new editor framework to learn.

**Why not Plate.js:** Would add a second editor framework (Slate-based) alongside existing Tiptap (ProseMirror-based). Wasteful.
**Why not BlockNote:** MPL-2.0 license (file-level copyleft).
**Why not Editor.js:** Not React-native.

### File Structure

```
src/components/slides/
├── gamma-mode/                    ← NEW
│   ├── gamma-mode-layout.tsx      ← Main layout: sidebar + card stack + agent panel
│   ├── card-stack.tsx             ← Scrollable vertical card list
│   ├── card-editor.tsx            ← Single card: Plate.js editor inside themed wrapper
│   ├── card-outline-sidebar.tsx   ← Left sidebar: card list, reorder (dnd-kit), add between
│   ├── gamma-toolbar.tsx          ← Top bar: title, theme, present, export, mode toggle
│   ├── gamma-agent-panel.tsx      ← Right panel: AI chat for deck-wide operations
│   ├── card-sparkle-menu.tsx      ← Per-card AI menu (Cmd+E or sparkle icon)
│   ├── outline-generator.tsx      ← Prompt → editable outline → generate
│   ├── smart-layout-picker.tsx    ← Pre-designed layout patterns
│   ├── theme-customizer.tsx       ← Deep theme editing
│   ├── card-background-picker.tsx ← Accent image position + overlay controls
│   ├── embed-block.tsx            ← YouTube/Figma/Google Sheets embeds
│   ├── toggle-block.tsx           ← Expandable/collapsible accordion block
│   ├── spotlight-mode.tsx         ← Progressive reveal for presenter mode
│   └── plate-config.ts           ← Plate.js plugin configuration
├── shared/                        ← REUSE (minimal changes)
├── slides-mode/                   ← UNTOUCHED
├── chat-mode/                     ← DELETE (replaced by gamma-mode/)
├── blocks/                        ← REUSE
└── slides-workspace.tsx           ← Update mode routing
```

### Store Changes

`slides-store.ts`:
- Rename `WorkspaceMode` from `"slides" | "chat"` to `"slides" | "create"`
- Add card-specific state: `cardScrollPosition`, `outlineStep`, `agentPanelOpen`
- All existing slide operations remain compatible

### Database

No schema changes. Cards are stored as slides in the existing `slides` table. The `layout` field distinguishes card-style layouts from fixed-ratio layouts.

### API Endpoints

| Endpoint | Status | Purpose |
|----------|--------|---------|
| `POST /api/slides/chat` | EXTEND | Per-card AI operations, deck-wide agent |
| `POST /api/slides/outline` | NEW | Generate editable outline from prompt |
| `POST /api/slides/generate-stream` | EXISTING | Generate slides from outline |
| `POST /api/slides/upload-image` | EXISTING | Image upload for cards |
| `POST /api/slides/agent` | EXISTING | Deck-wide AI operations |

## Feature Breakdown

### Gamma Feature Map

| Gamma Feature | Our Implementation | Phase |
|--------------|-------------------|-------|
| Card-based editor | Plate.js in fluid-height wrappers | 1 |
| Scrollable card stack | Vertical scroll container with card list | 1 |
| Slash command block inserter | Plate.js built-in slash menu | 1 |
| Card sidebar with reorder | dnd-kit sortable list | 1 |
| AI outline generation | Prompt → editable outline → theme → generate | 2 |
| Per-card AI sparkle | Floating menu with AI quick actions | 2 |
| Agent panel (deck-wide AI) | Right-side chat panel for bulk operations | 2 |
| Smart layouts | 10 pre-built patterns (timeline, funnel, columns, etc.) | 3 |
| Theme customization | Color, font, roundness, shadows, borders | 3 |
| Card backgrounds + accent images | 5 positions with overlay options | 3 |
| Toggle/accordion blocks | Expandable/collapsible sections | 4 |
| Embed blocks | Auto-detect YouTube/Figma/Sheets URLs | 4 |
| Nested cards | Cards within cards for drill-down | 4 |
| Spotlight mode | Progressive reveal in presenter mode | 5 |
| Quick edit in presentation | Press E to edit while presenting | 5 |
| Export to PPTX from Create mode | Convert fluid cards → fixed slides → PPTX | 6 |
| Switch to Slides mode | Convert card deck ↔ slide deck | 6 |

### What We Don't Build

- Custom font upload (theme system handles this)
- Polls/voting (not needed for academic context)
- Custom domains / web publishing (out of scope)
- Public API (standing decision)
- Workspace templates / Remix (premature)
- Follow mode (defer to future)
- Social format export from Create mode (already exists in Slides mode)

## Existing Files Changed

Only minimal edits to existing files:

| File | Change |
|------|--------|
| `slides-workspace.tsx` | Route `create` mode to `GammaModeLayout` |
| `slides-store.ts` | Rename mode value, add card state fields |
| `mode-selector.tsx` | Rename "Chat" → "Create" label |
| `shared/slide-renderer-v2.tsx` | Add `fluid?: boolean` prop |
| `shared/theme-engine.tsx` | Extend theme customization types |
| `src/types/presentation.ts` | Add toggle, embed, nested_card, footnote block types |

**Zero changes to `slides-mode/` directory (PowerPoint mode).**

## Phase Plan

1. **Foundation** — Card editor, navigation, Plate.js integration, sidebar
2. **AI Generation** — Outline generator, per-card AI, agent panel
3. **Smart Layouts + Themes** — Layout patterns, theme customizer, card backgrounds
4. **Interactive Blocks** — Toggles, embeds, nested cards, footnotes
5. **Presentation Enhancements** — Spotlight mode, quick edit, scroll navigation
6. **Bridge to Slides Mode** — PPTX export from Create mode, mode switching

## Reference Projects

- **presentation-ai** (MIT, 2.5k stars) — Same stack, study AI pipeline
- **Presenton** (Apache 2.0, 4.1k stars) — Study generation + export
- **open-gamma** (ComposioHQ) — Study agent-driven generation
- **Plate.js docs** — https://platejs.org/
- **dnd-kit docs** — https://dndkit.com/
