# Zone 6: Right Panel (Workbench) — Gap Analysis

> Compared against: VSCode (panel tabs), Notion AI (chat floating/sidebar), GDocs (comments panel)
> Date: 2026-03-27

## Summary

The workbench is already well-architected with 3-tab navigation, AI chat with message bubbles, resize handle with constraints, and slide animation. The gaps are polish-level: tab active indicator style, resize handle discoverability, and dark mode chat bubble contrast.

## Gaps Found

### 1. Tab Active Indicator Style (Priority: MEDIUM)
- **Current:** Active tab uses `bg-surface-raised` (filled background) — functional but not VSCode-like
- **Reference:** VSCode uses a bottom border accent (2px brand color) on active tab, no filled bg
- **Fix:** Change active tab to use bottom border accent instead of filled background

### 2. Resize Handle Hit Area (Priority: MEDIUM)
- **Current:** 3px actual hit zone (1px visual + 2px margin) — narrow for discovery
- **Reference:** VSCode uses ~5px hit area with clear cursor feedback
- **Fix:** Widen hit area to 5px and make hover visual more prominent

### 3. Dark Mode Chat Bubble Contrast (Priority: LOW)
- **Current:** Assistant messages use `bg-black/[0.03]` — very faint in light mode, may be invisible in dark
- **Fix:** Add dark mode variant for assistant bubbles

## Dimensions Already at Target
- **Panel animation:** 200ms slide-in/out with opacity — smooth
- **AI chat layout:** Messages top, composer bottom, auto-scroll — matches Copilot Chat
- **User/assistant distinction:** Brand bg for user, subtle bg for assistant — clear
- **Typing indicator:** Animated bouncing dots — professional
- **Resize constraints:** 320-560px with cursor feedback — functional
- **Tab navigation:** 3 tabs with icons — clean
- **Sources/Review tabs:** Functional with sub-tabs — good organization
