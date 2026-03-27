# Zone 3: Progressive Disclosure & Toolbar — Gap Analysis

> Compared against: Bear (minimal bottom bar), Notion (floating toolbar, slash menu)
> Date: 2026-03-27

## Summary

The editor already has strong progressive disclosure architecture:
- TopBar is minimal (undo/redo, mode, word count, save status, badges)
- SelectionToolbar (floating) already implements the Notion pattern
- SlashMenu is already categorized and searchable
- Full formatting toolbar (toolbar.tsx) defaults to hidden in Studio
- No formatting buttons visible by default in AcademicEditor

The main gaps are: no reading time display, no Bear-like bottom info bar in the Editor page, and toolbar button styling could be slightly more muted.

## Gaps Found

### 1. No Reading Time Display (Priority: HIGH)
- **Current:** TopBar shows word count but not reading time
- **Reference:** Bear shows reading time alongside word count in the info panel
- **Fix:** Add reading time calculation next to word count in TopBar

### 2. No Bottom Info Bar in AcademicEditor (Priority: HIGH)
- **Current:** AcademicEditor has no bottom bar; BottomFormattingBar is Studio-only and shows formatting buttons
- **Reference:** Bear has a minimal bottom bar with word count and quick settings
- **Fix:** Add a minimal bottom status bar to AcademicEditor showing word count + reading time

### 3. Toolbar Button Opacity (Priority: LOW)
- **Current:** `text-ink-muted` for inactive buttons — already muted but could be lighter
- **Reference:** Bear uses very faint icons that brighten significantly on hover
- **Fix:** Adjust inactive toolbar button opacity from 0.5 to 0.4

## Dimensions Already at Target
- **Toolbar clutter**: TopBar is already minimal (h-8, no formatting buttons)
- **Floating toolbar**: SelectionToolbar already has Notion-like behavior
- **Slash menu**: Already categorized (BASIC BLOCKS, ACADEMIC, AI TOOLS, DOCUMENT) and searchable
- **All formatting still accessible**: via SelectionToolbar, slash menu, and optional toolbar toggle
