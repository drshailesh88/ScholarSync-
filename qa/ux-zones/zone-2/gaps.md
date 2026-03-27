# Zone 2: Editor Canvas — Gap Analysis

> Compared against: Bear (dark clean surface), Notion (full-width, selection toolbar)
> Date: 2026-03-27

## Summary

The canvas is already mostly clean (no card borders, transparent background, seamless surface). The main gaps are selection highlight colors and minor polish.

## Gaps Found

### 1. Selection Colors Are Brand Purple (Priority: HIGH)
- **Current:** `::selection` uses `rgba(109, 40, 217, 0.2)` — brand purple tint
- **Reference:** Google Docs uses a soft blue; Notion uses a subtle warm highlight
- **Fix:** Light mode → soft blue `rgba(66, 133, 244, 0.2)`, dark mode → muted indigo `rgba(99, 102, 241, 0.3)`
- Define as CSS custom properties for easy theming

### 2. Redundant padding-bottom (Priority: LOW)
- **Current:** `padding-bottom: 40vh` appears on BOTH `.academic-editor-content` AND `.ProseMirror`
- **Fix:** Keep only on `.ProseMirror`, remove from outer class to avoid double-spacing

### 3. Canvas wrapper in editor page (Priority: LOW)
- **Current:** Editor page uses `bg-surface` on the editor container — this is correct
- No card borders or shadows detected — Bear-like seamless canvas already achieved
- No changes needed for canvas cleanness

## Dimensions Already at Target
- No card border/shadow — canvas is seamless (`background: transparent` on page column)
- Max-width 720px centered — comfortable reading width
- Generous padding (px-6 = 24px, py-8 = 32px) — adequate
- Empty state placeholder already present and well-styled
- Focus state has no visible border change — only caret visible
