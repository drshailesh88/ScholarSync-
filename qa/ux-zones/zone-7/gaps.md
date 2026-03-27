# Zone 7: Theme Polish — Gap Analysis

> Date: 2026-03-27

## Summary

The theme system is well-designed with CSS custom properties for all core tokens. Light mode uses warm off-white (#FAFAF8) with warm dark ink, while dark mode uses warm charcoal (#1C1B1A) with off-white text. The main gaps were hardcoded light-mode colors in toolbar CSS that don't adapt to dark mode.

## Gaps Fixed

### 1. Formatting Toolbar Hardcoded Colors (Priority: HIGH)
- **Before:** `.ss-formatting-toolbar button` used `rgba(55, 53, 47, ...)` — hardcoded light ink
- **Before:** `.ss-formatting-toolbar` border used `rgba(0, 0, 0, 0.06)` — hardcoded black
- **Before:** `.ss-formatting-toolbar button.active` used `#6D28D9` — hardcoded brand
- **Fix:** All replaced with `var(--ink-muted)`, `var(--ink)`, `var(--brand)`, `var(--border-color)`, `var(--border-subtle)`

### 2. Toolbar Button Hierarchy Hardcoded Colors (Priority: MEDIUM)
- **Before:** `.ss-toolbar-primary` used `rgb(55, 53, 47)` — hardcoded light ink
- **Before:** `.ss-toolbar-secondary` used `rgba(55, 53, 47, 0.45/0.7)` — hardcoded
- **Fix:** Replaced with `var(--ink)` and `var(--ink-muted)`

### 3. Highlight Mark Missing Dark Mode (Priority: MEDIUM)
- **Before:** `<mark>` used `#fef08a` (bright yellow) — too bright for dark mode
- **Fix:** Added `.dark .academic-editor-content mark` with `rgba(250, 204, 21, 0.25)` for subtle dark mode highlight

## Already at Target
- **Light mode backgrounds:** Warm off-white (#FAFAF8) — premium, Bear-like
- **Dark mode backgrounds:** Warm charcoal (#1C1B1A) — comfortable
- **Surface hierarchy:** Background → surface-raised provides visual depth in both modes
- **Text contrast:** Light ink `rgb(55,53,47)` on #FAFAF8 — passes WCAG AA
- **Dark text:** #E8E6E3 on #1C1B1A — passes WCAG AA, off-white (not pure white) for comfort
- **Selection colors:** Already themed via `--editor-selection` custom property
- **Borders:** Already use `var(--border-color)` everywhere
- **Blockquote:** Already has dark mode override (Zone 1)
- **Chat bubbles:** Already has dark mode variant (Zone 6)
- **No theme flash:** Uses `@custom-variant dark` with class-based detection
