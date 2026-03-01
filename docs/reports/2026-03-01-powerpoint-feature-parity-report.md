# PowerPoint Feature Parity Report

**Date:** 2026-03-01
**Tested by:** Automated browser testing (Playwright) + manual code review
**Branch:** `claude/slides-generation-pipeline-RL9z3`
**Scope:** ScholarSync Presentation Engine (Slides Mode + Create/Gamma Mode)

---

## Executive Summary

ScholarSync's presentation engine is **functional and solid for basic academic use cases**. All 18 block types render correctly, presenter mode works with the V2 layout engine, and export to both PPTX and PDF works. However, there are **significant feature parity gaps** compared to PowerPoint that would impact users building real clinical/academic presentations.

**Bugs Found & Fixed This Session:** 6 bugs, all fixed and committed.

---

## Part 1: What Works Well

### Core Features (All Verified Working)
- Deck creation wizard (title, description, audience type, theme selection)
- 2 editing modes: Slides (PowerPoint-like WYSIWYG) and Create (Gamma-like cards)
- Mode switching with full data preservation
- 18 block types: Text, Bullets, Quote, Citation, Image, Chart, Table, Equation, Diagram, Code, Callout, Statistic, Bibliography, Timeline, Divider, Toggle, Embed, Nested Card
- 14 themes including 4 journal-specific (NEJM, Lancet, Nature Journal, IEEE)
- 18 layouts including 7 academic-specific (Big Number, Stats, Results, Findings, Methods, Timeline, Refs)
- Presenter mode with keyboard navigation, grid view, speaker notes, spotlight, timer
- Export: PowerPoint (.pptx) and PDF Handout
- Undo/Redo (toolbar buttons + Ctrl+Z/Y)
- Speaker notes editing
- Smart Layouts (10 pre-built templates in Gamma mode)
- AI Tools panel (14 tools: shorten, expand, rephrase, citations, math, diagrams, charts, etc.)
- Coach feature for presentation feedback
- Error handling for invalid deck IDs
- Auto-save indicator

### Academic-Specific Strengths
- KaTeX equation rendering (LaTeX math)
- Statistic blocks with metric + interpretation
- Citation blocks
- Bibliography blocks
- Journal-themed color schemes
- Academic layout presets

---

## Part 2: PowerPoint Feature Parity Gaps

### Priority 1 — Critical for Academic Users

| Gap | PowerPoint Behavior | ScholarSync Current State | Proposed Solution |
|-----|---------------------|---------------------------|-------------------|
| **Text auto-fit/shrink** | Auto-shrinks text to fit container, warns on overflow | Long subtitle text overflows slide bounds (verified: title slide with long description cuts off) | Implement CSS `overflow: hidden` + auto font-size reduction. Detect when content exceeds container height and reduce font-size in steps until it fits. |
| **Editable table cells** | Click any cell to edit inline | Table block renders static placeholder data (Column 1/2/3, Row 1/2). No inline cell editing in WYSIWYG mode. | Add Tiptap table node or custom cell editor. Each cell should be a contenteditable region. |
| **Editable chart data** | Click chart → edit data in spreadsheet popup | Chart block shows default Series 1 A/B/C data. No data editing UI. | Add a chart data editor panel (spreadsheet-like grid) that opens when clicking a chart. Use block properties panel. |
| **Editable statistic values** | N/A (custom) | Statistic block shows default "Metric: 42%, Brief interpretation" — no way to edit values in WYSIWYG | Add property editor for statistic blocks (metric label, value, interpretation text fields in the Design panel). |
| **Image insertion from file** | Insert → Pictures → Browse files | Image block exists but inserts with placeholder only. No file upload flow. | Wire image block insertion to open a file picker, upload to storage (or use base64), and set the image URL on the block. |
| **Slide transitions** | 50+ transition effects (fade, push, wipe, etc.) | No slide transitions in presenter mode | Start with 3-4 basics: None, Fade, Slide Left, Slide Right. Use Framer Motion `variants` on the slide container in presenter mode. |

### Priority 2 — Important for Professional Use

| Gap | PowerPoint Behavior | ScholarSync Current State | Proposed Solution |
|-----|---------------------|---------------------------|-------------------|
| **Master slides / templates** | Slide master defines shared header/footer/logo | Each slide is independent. No master slide concept. | Add a "master slide" config per deck (logo position, footer text, page numbers, header). Apply as overlay in renderer. |
| **Animations within slides** | Appear, fade in, fly in for individual elements | No element-level animations | Add per-block animation settings (appear, fade, fly in) triggered by click/auto in presenter mode. Store as `animation` field on ContentBlock. |
| **Copy-paste slides** | Ctrl+C/V to duplicate slides, or between decks | Can duplicate cards in Gamma mode (context menu). No cross-deck copy. | Add Ctrl+C/V for slides in the thumbnail sidebar. For cross-deck, use clipboard API with slide JSON serialization. |
| **Drag to reorder slides** | Drag thumbnails to reorder | dnd-kit infrastructure exists in Gamma outline. Slides mode thumbnail sidebar has no drag reorder. | Wire up dnd-kit `SortableContext` on the slide thumbnail list in Slides mode. The Gamma outline already has the pattern to copy. |
| **Text formatting toolbar** | Bold/italic/underline/color/size accessible via toolbar | Tiptap handles formatting but no visible formatting toolbar in WYSIWYG canvas. Users must use keyboard shortcuts. | Add a floating toolbar (bubble menu) that appears on text selection with B/I/U/color/size/alignment buttons. Tiptap's `BubbleMenu` extension. |
| **Find & Replace** | Ctrl+H to find/replace across all slides | Not implemented | Add a find/replace dialog that searches across all slide contentBlocks. Use zustand store to iterate slides and update matching text. |
| **Slide notes printing** | Print slides with notes in handout format | PDF Handout exports (works) but unclear if notes are included | Verify notes appear in PDF handout. If not, add notes rendering to the PDF generation pipeline. |

### Priority 3 — Nice to Have

| Gap | PowerPoint Behavior | ScholarSync Current State | Proposed Solution |
|-----|---------------------|---------------------------|-------------------|
| **Shapes and arrows** | Insert shapes (rectangles, circles, arrows, connectors) | No shape primitives | Add a Shape block type with preset shapes. Use SVG rendering. Start with rectangle, circle, arrow, line. |
| **SmartArt / process diagrams** | Built-in process, cycle, hierarchy diagrams | Diagram block exists (Mermaid) but no visual SmartArt equivalent | The Mermaid diagram block already covers flowcharts. Consider adding visual presets (process → steps, hierarchy → org chart) as Mermaid templates. |
| **Slide sorter view** | Dedicated view showing all slides as thumbnails | Grid view exists in presenter mode only | Add a slide sorter as an editing view (grid of thumbnails with drag reorder). Could reuse the presenter grid UI. |
| **Custom fonts** | Upload and use any font | Fixed to theme font families | Allow font override per block or per deck. Use Google Fonts API for font loading. |
| **Video embedding** | Insert video files or YouTube/Vimeo links | Embed block exists but shows "No embed URL provided" — no UI to enter URL | Add URL input field for embed blocks. Support YouTube/Vimeo iframe embedding. |
| **Grouping objects** | Select multiple objects and group them | Single-block selection only | Complex feature. Defer unless user demand is high. |
| **Zoom to section** | Section headers that allow jumping to slide groups | Section layout exists but no navigation grouping | Add section markers that appear in the outline and allow keyboard shortcut jumping. |
| **Export to Google Slides** | Save as Google Slides format | Only PPTX and PDF | Use Google Slides API for export. Lower priority since PPTX imports into Google Slides. |
| **Presenter view dual-screen** | Shows notes + next slide on presenter's screen, slides on audience screen | Single-screen presenter with notes toggle | Use `window.open()` to create audience window showing slides only, while main window shows presenter view with notes + next slide preview. |
| **Collaboration / co-editing** | Real-time co-editing (PowerPoint Online) | Liveblocks integration exists on the branch but not wired to slides | Wire Liveblocks room to the slides zustand store for real-time collaboration. |

---

## Part 3: Issues Discovered During Testing

### Bugs Fixed (6 total)
1. **Deck creation redirect stuck on spinner** — fire-and-forget fetch pattern → committed
2. **Tiptap duplicate extension warnings** — deduplication fix → committed
3. **Presenter controls disappear on keyboard nav** — auto-hide hook reset → committed
4. **Text blocks show raw HTML tags** — added HTML detection + proper innerHTML rendering → committed
5. **Smart Layout picker doesn't set layout field** — added layout mapping → committed
6. **Duplicate content in presenter mode** — swapped V1→V2 renderer → committed

### Non-Bug Issues Noted
- **Toggle block causes React HTML nesting warnings** (cosmetic, non-blocking)
- **Chart thumbnail renders with width/height -1** (warnings in console, chart still renders correctly in main canvas and presenter)
- **Tiptap select-all behavior** — Ctrl+A + type doesn't reliably replace text in contenteditable fields via automation. Not a user-facing bug (works with real keyboard input) but indicates Tiptap's selection handling could be tighter.
- **"Click to add content" placeholder shows in presenter mode** — should be hidden when presenting (shows editing placeholders to audience)

---

## Part 4: Recommended Implementation Roadmap

### Sprint 1 (Highest Impact, Moderate Effort)
1. **Text auto-fit** — CSS overflow + font size reduction
2. **Inline table editing** — Tiptap table extension or custom cell editor
3. **Chart data editor** — Spreadsheet-like grid in block properties panel
4. **Statistic block property editor** — Text fields for metric/value/interpretation
5. **Image file upload** — File picker → storage → URL
6. **Hide placeholders in presenter mode** — Filter "Click to add" text during presentation

### Sprint 2 (Professional Polish)
7. **Text formatting toolbar** — Tiptap BubbleMenu on text selection
8. **Slide transitions** — Fade/slide with Framer Motion
9. **Slide drag reorder in Slides mode** — Port dnd-kit from Gamma outline
10. **Embed URL input** — Add URL field for embed blocks
11. **Master slides** — Deck-level header/footer/logo configuration

### Sprint 3 (Advanced Features)
12. **Element animations** — Per-block appear/fade/fly-in
13. **Find & Replace** — Cross-slide text search
14. **Dual-screen presenter view** — Separate audience window
15. **Slide sorter editing view** — Grid of editable thumbnails

---

## Part 5: Competitive Context

| Feature | PowerPoint | Google Slides | Gamma | ScholarSync |
|---------|-----------|---------------|-------|-------------|
| Slide editing | Full WYSIWYG | Full WYSIWYG | Card-based | Both modes |
| Templates | 100+ | 30+ | 20+ | 10 Smart Layouts + 18 layout presets |
| Themes | 40+ | 20+ | 15+ | 14 (incl. journal-specific) |
| AI tools | Copilot (paid) | Gemini (limited) | Full AI generation | 14 AI tools + Coach |
| Academic features | Add-ins only | None | None | Native (equations, citations, bibliography, statistics) |
| Export | PPTX, PDF, video | PPTX, PDF | PPTX, PDF | PPTX, PDF |
| Collaboration | Real-time | Real-time | Real-time | Liveblocks (in progress) |
| Presenter mode | Dual-screen | Single | Basic | Full (grid, notes, spotlight, timer) |

**ScholarSync's competitive advantage is the academic-native feature set** — equations, citations, statistics, journal themes, and AI tools for academic content. The feature parity gaps are mostly in general presentation authoring (editing polish, transitions, animations) rather than in the domain-specific features that matter most for the target audience.

---

*Generated from automated testing session on 2026-03-01. All 6 bugs were fixed and verified in the same session.*
