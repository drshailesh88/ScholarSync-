# Zone 5: Left Panel (Sidebar) — Gap Analysis

> Compared against: VSCode (collapse), Notion (expanded sidebar, workspace), Linear (icon consistency)
> Date: 2026-03-27

## Summary

The sidebar is already well-architected with collapse/expand mechanism, section grouping, active/hover states, user profile with dropdown, and smooth 200ms animation. The gaps are polish-level refinements.

## Gaps Found

### 1. Active Indicator Uses White Accent (Priority: MEDIUM)
- **Current:** Left border accent is `rgba(255,255,255,0.3)` — blends into dark sidebar
- **Reference:** VSCode uses a bright accent color (blue/purple) for the active indicator
- **Fix:** Change to `var(--glow)` (brand purple) for stronger visual feedback

### 2. Nav Item Vertical Spacing Slightly Tight (Priority: LOW)
- **Current:** `padding: 7px 12px` per nav item (~34px total height)
- **Reference:** Linear uses ~40-44px per item for more spacious feel
- **Fix:** Increase to `padding: 8px 12px` for slightly more breathing room

### 3. Default Expanded Width Slightly Narrow (Priority: LOW)
- **Current:** 224px default
- **Reference:** Notion/Linear use ~240-260px for comfortable label display
- **Fix:** Increase SIDEBAR_DEFAULT to 248px

## Dimensions Already at Target
- **Collapsed state:** 48px, icons centered, tooltips on hover — matches VSCode
- **Expand/collapse animation:** 200ms ease-in-out — smooth
- **Section grouping:** CREATE, RESEARCH, AUDIT headers — matches Notion
- **Hover states:** Subtle white 6% background — appropriate
- **User profile:** Avatar + name + dropdown with theme/settings — matches Notion
- **Collapse toggle:** CaretLeft/CaretRight button at bottom — functional
- **Dark background:** #1E1D1C charcoal — premium feel
- **Scrollbar:** 4px thin, subtle — refined
