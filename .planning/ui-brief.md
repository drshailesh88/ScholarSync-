# UI Brief: ScholarSync Explore Module
**Date:** 2026-03-31
**Source:** UI interview + competition research + UX brief + existing codebase audit
**Status:** COMPLETE — ready for frontend development

---

## Design Identity
- **Vibe in 3 words:** Calm, tasteful, trustworthy
- **Inspired by:** Kagi's search structure + Readwise Reader's card pattern + Bear's warm restraint
- **Not like:** Perplexity (black box), Google (cluttered with ads), Adobe (overwhelming toolbars)

---

## Typography

- **UI font:** DM Sans — warm geometric sans-serif, already used across the app
- **Content/reading font:** Source Serif 4 — for synthesis text and long-form content
- **Mono font:** JetBrains Mono — for keyboard shortcuts in overlay and code-like elements

### Type Scale for Explore

| Element | Size | Weight | Font | Color |
|---|---|---|---|---|
| Search bar input | 16px | 400 | DM Sans | `--ink` |
| Search bar placeholder | 16px | 400 | DM Sans | `--ink-muted` |
| Tab labels (inactive) | 14px | 400 | DM Sans | `--ink-muted` |
| Tab labels (active) | 14px | 600 | DM Sans | `--ink` |
| Filter pill text | 13px | 400 | DM Sans | `--ink` |
| Filter pill text (active) | 13px | 500 | DM Sans | `--brand` |
| Stats line | 13px | 400 | DM Sans | `--ink-muted` |
| Result title | 17px | 500 | DM Sans | `--ink` (link behavior) |
| URL breadcrumb | 13px | 400 | DM Sans | `--brand` |
| Snippet text | 14px | 400 | DM Sans | `--ink-muted` |
| Snippet bold (search terms) | 14px | 700 | DM Sans | `--ink-muted` |
| Metadata (author, source) | 13px | 400 | DM Sans | `--ink-muted` |
| Date text | 10px | 500 | DM Sans | `--ink-muted` |
| Synthesis heading | 15px | 600 | DM Sans | `--ink` |
| Synthesis body | 15px | 400 | Source Serif 4 | `--ink` |
| Synthesis citations | 13px | 500 | DM Sans | varies (trust tier color) |
| Keyboard shortcut keys | 13px | 400 | JetBrains Mono | `--ink-muted` |
| Keyboard shortcut labels | 13px | 400 | DM Sans | `--ink` |

### Line Height
- Body text: 1.5 (comfortable reading)
- Result titles: 1.3 (tighter, scannable)
- Synthesis body: 1.6 (airy, editorial feel with Source Serif 4)
- UI elements (tabs, pills, metadata): 1.2 (compact)

---

## Color Palette

### Light Mode (existing tokens — DO NOT CHANGE)

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#FAFAF8` | Page background |
| `--surface` | `#FAFAF8` | Same as background |
| `--surface-raised` | `#F0F0EC` | Hover states, filter pill backgrounds, card hover |
| `--ink` | `rgb(55,53,47)` | Primary text, result titles |
| `--ink-muted` | `rgba(55,53,47,0.5)` | Secondary text, snippets, metadata, dates |
| `--border` | `rgba(55,53,47,0.08)` | Borders (not used as result separators) |
| `--border-subtle` | `rgba(55,53,47,0.04)` | Very subtle borders |
| `--brand` | `#6D28D9` | Active tab underline, URL breadcrumbs, active filter text |
| `--brand-hover` | `#5B21B6` | Brand on hover |
| `--glass` | `rgba(255,255,255,0.85)` | Search bar glass-morphism |
| `--glass-border` | `rgba(0,0,0,0.06)` | Search bar border |
| `--glow` | `#6D28D9` | Focus ring on search bar |

### Dark Mode (existing tokens — DO NOT CHANGE)

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#1C1B1A` | Page background |
| `--surface-raised` | `#2A2826` | Hover states, filter pill backgrounds |
| `--ink` | `#EDEBE8` | Primary text |
| `--ink-muted` | `#A8A29E` | Secondary text |
| `--border` | `rgba(255,255,255,0.10)` | Borders |
| `--brand` | `#8B7BF4` | Active states |
| `--glass` | `rgba(28,27,26,0.85)` | Search bar glass |

### Trust Indicator Colors (NEW — Explore-specific)

| Tier | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Government/Institutional | `#16A34A` (green-600) | `#4ADE80` (green-400) | .gov, .edu, WHO, NHS |
| Major Journalism / Q1 Journal | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | NYT, Reuters, NEJM, Lancet |
| Community / Forum | `#D97706` (amber-600) | `#FBBF24` (amber-400) | Reddit, HackerNews, forums |
| Other / Unknown | `rgba(55,53,47,0.2)` | `rgba(255,255,255,0.15)` | Blogs, unknown domains |

These appear ONLY as 3px left-border on result cards. Not as text, not as badges, not as icons.

### Semantic Colors (existing, for toasts/errors)

| Purpose | Light | Dark |
|---|---|---|
| Success | `#16A34A` | `#4ADE80` |
| Error | `#DC2626` | `#F87171` |
| Warning | `#D97706` | `#FBBF24` |
| Info | `#2563EB` | `#60A5FA` |

---

## Spacing

### Base Unit: 8px

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | 4px | Tight gaps (icon to text, pill internal padding vertical) |
| `--space-sm` | 8px | Standard small gaps |
| `--space-md` | 16px | Standard gaps, page side padding on mobile |
| `--space-lg` | 24px | Result card gap (20-24px range), section gaps |
| `--space-xl` | 32px | Large section gaps |
| `--space-2xl` | 48px | Page-level vertical spacing |
| `--space-3xl` | 64px | Major section breaks |

### Layout Dimensions

| Element | Value |
|---|---|
| Results column max-width | 780px |
| Results column alignment | Left-aligned within centered container |
| Page max-width (container) | 1200px |
| Page side padding (desktop) | 16px min, auto-centered |
| Page side padding (mobile) | 16px |
| Result card gap | 24px (spacing only, NO lines) |
| Search bar max-width (landing) | 640px |
| Search bar max-width (results header) | 560px |
| Search bar height | 48px |
| Tab gap | 16px between tabs |
| Filter pill gap | 8px between pills |

---

## Components

### Search Bar
- **Shape:** Pill (border-radius: 24px)
- **Height:** 48px
- **Background:** Glass-morphism (`glass-panel` class — `backdrop-filter: blur(16px)`, `--glass` background, `--glass-border` border)
- **Border:** 1px solid `--glass-border`
- **Focus state:** `--glow` ring (`box-shadow: 0 0 0 2px var(--glow)`)
- **Placeholder:** "Explore..." in `--ink-muted`, 16px, weight 400
- **Search icon:** Phosphor `MagnifyingGlass`, 18px, `--ink-muted`, right side
- **Clear button:** Phosphor `X`, appears when text entered
- **History icon:** Phosphor `Clock`, left of search bar or right side, `--ink-muted`

### Tabs
- **Style:** Text-only, no icons, no backgrounds, no borders
- **Active state:** 2px bottom border in `--brand`, text weight 600, color `--ink`
- **Inactive state:** No border, weight 400, color `--ink-muted`
- **Spacing:** 16px gap between tab labels, 8px vertical padding per tab
- **Hover:** Color transitions to `--ink` (not brand)
- **Tab bar bottom border:** None (spacing separates tabs from filter pills)
- **Overflow (mobile):** Horizontal scroll, no wrapping

### Filter Pills
- **Shape:** Pill (border-radius: 16px)
- **Height:** 30-32px
- **Padding:** 4px 12px
- **Default state:** Background `--surface-raised`, text `--ink`, border 1px `--border`
- **Active/selected state:** Text changes to `--brand` + background gets subtle purple tint (`rgba(109,40,217,0.06)` in light, `rgba(139,123,244,0.1)` in dark)
- **Dropdown chevron:** Phosphor `CaretDown`, 10px, 4px left margin from text
- **Hover:** Background darkens slightly

### Filter Dropdown Menus
- **Border-radius:** 12px
- **Background:** `--surface` (not glass — solid background for readability)
- **Border:** 1px solid `--border`
- **Shadow:** `0 4px 16px rgba(0,0,0,0.08)` (light) / `0 4px 16px rgba(0,0,0,0.3)` (dark)
- **Item height:** 36px
- **Item padding:** 8px 16px
- **Hover item:** Background `--surface-raised`
- **Active/checked item:** Phosphor `Check` icon in `--brand` color
- **Separator:** 1px `--border-subtle` line

### Result Cards
- **Background:** Transparent (no card background, just content on page background)
- **Trust indicator:** 3px left border, full height of card content area, colored by trust tier
- **Padding:** 0 left (border IS the left edge), 0 right
- **Separator:** Spacing only (24px gap), NO lines between cards
- **Hover state:** Background changes to `--surface-raised` with `0 2px 8px rgba(0,0,0,0.04)` shadow lift
- **Selected state (keyboard nav):** Background `--surface-raised`, subtle `--brand` left glow

**Card layout:**
```
[3px trust border] [16px padding] Title text (17px/500)                    [+] [···]
                   [16px padding] 🌐 domain.com > breadcrumb > path
                   [16px padding] Author Name · Organization
                   [16px padding] Snippet text in muted color, 2-3 lines
                                  max, search terms in bold...         2026
```

- **Save icon (+):** Phosphor `Plus` (outline, 16px) → transforms to Phosphor `Check` (filled, 16px) on save. Color: `--ink-muted` default, `--brand` on hover, `--brand` filled when saved.
- **"..." menu icon:** Phosphor `DotsThreeVertical`, 16px, `--ink-muted`
- **Favicon:** 16px × 16px, border-radius 2px, inline with URL breadcrumb
- **Year/date:** Plain text, 10px, weight 500, `--ink-muted`, right-aligned on the snippet line. NO pill, NO background.

### Actions Menu (from "..." click)
- **Same styling as filter dropdowns** — 12px radius, shadow, solid background
- **Item height:** 36px
- **Keyboard shortcut labels:** Right-aligned, JetBrains Mono 12px, `--ink-muted`
- **Destructive items (Block, Delete):** Text in error red
- **Separator lines** between action groups

### Synthesis Block
- **Background:** `--surface-raised` with 1px `--border` border
- **Border-radius:** 12px
- **Padding:** 16px 20px
- **Heading:** "Research Brief" (or TBD copy), 15px DM Sans weight 600
- **Body:** Source Serif 4, 15px, weight 400, line-height 1.6
- **Citations:** `[1]` `[2]` as small inline markers, colored by trust tier of the cited source
- **Collapse/expand:** Phosphor `CaretUp` / `CaretDown`, right-aligned, `--ink-muted`
- **Loading state:** Shimmer/skeleton in the block while streaming

### Source Info Panel
- **Trigger:** Click shield icon (Phosphor `Shield`, 16px, `--ink-muted`)
- **Style:** Inline expansion below the result (not a modal, not a sidebar)
- **Background:** `--surface-raised`
- **Border-radius:** 8px
- **Border:** 1px `--border`
- **Padding:** 12px 16px
- **Personalization controls:** 5 radio-style buttons: Block / Lower / Normal / Higher / Pin
- **Close:** Phosphor `X` top-right, or click shield again

### Toast Notifications
- **Position:** Bottom-center of viewport
- **Background:** `--ink` (dark text color as background — inverted)
- **Text:** `--background` (light color as text — inverted)
- **Border-radius:** 8px
- **Padding:** 8px 16px
- **Animation:** Fade in (150ms), auto-dismiss after 2 seconds, fade out (150ms)
- **Shadow:** `0 4px 12px rgba(0,0,0,0.15)`

### Advanced Search Modal
- **Overlay:** `rgba(0,0,0,0.5)` backdrop
- **Modal background:** `--surface`
- **Border-radius:** 16px
- **Border:** 1px `--border`
- **Shadow:** `0 8px 32px rgba(0,0,0,0.2)`
- **Padding:** 24px
- **Max-width:** 560px
- **Input fields:** Bordered style (1px `--border`, border-radius 8px, height 40px, padding 8px 12px)
- **Buttons:** "Cancel" = ghost (text only), "Build Search" = solid `--brand` background, white text, border-radius 8px, padding 8px 16px

### Keyboard Shortcuts Overlay
- **Trigger:** Press `?`
- **Style:** Centered modal with overlay (same as Advanced Search styling)
- **Layout:** Two columns — left: shortcut keys, right: descriptions
- **Key badges:** JetBrains Mono 12px, `--surface-raised` background, 1px `--border`, border-radius 4px, padding 2px 6px
- **Scrollable** if content exceeds viewport

---

## Icons

- **Library:** Phosphor Icons (`@phosphor-icons/react`) — already used across the app
- **Weight:** Regular (outline) by default, Bold for emphasis, Fill for active/selected states
- **Size:** 16px for inline icons, 18px for search bar icon, 20px for primary actions
- **Color:** `--ink-muted` default, `--brand` on hover/active, `--ink` for primary actions

### Icon Inventory for Explore

| Context | Icon | Phosphor Name | Weight |
|---|---|---|---|
| Search | `MagnifyingGlass` | Regular | 18px |
| Clear search | `X` | Regular | 16px |
| History | `Clock` | Regular | 16px |
| Save to Library | `Plus` | Regular → Bold on hover | 16px |
| Saved (confirmed) | `Check` | Bold | 16px |
| Actions menu | `DotsThreeVertical` | Regular | 16px |
| Open original | `ArrowSquareOut` | Regular | 16px |
| Cite in draft | `Quotes` | Regular | 16px |
| Source info / trust | `Shield` | Regular | 16px |
| Block source | `Prohibit` | Regular | 16px |
| Copy link | `Copy` | Regular | 16px |
| Summarize | `Sparkle` | Regular | 16px |
| Ask about page | `ChatCircle` | Regular | 16px |
| Dropdown chevron | `CaretDown` | Regular | 10px |
| Collapse/expand | `CaretUp` / `CaretDown` | Regular | 14px |
| Close | `X` | Regular | 16px |
| Tab: Academic | None (text only) | — | — |
| Tab: Web | None (text only) | — | — |
| Tab: News | None (text only) | — | — |
| Tab: Discussions | None (text only) | — | — |

---

## Motion

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Tab switching | 0ms | None | Instant content swap |
| Filter dropdown open | 0ms | None | Instant appearance |
| Result hover background | 100ms | ease | Subtle background transition |
| Result hover shadow | 100ms | ease | `0 2px 8px rgba(0,0,0,0.04)` lift |
| Save icon fill | 150ms | ease-out | Outline → filled transition |
| Toast appear | 150ms | ease-out | Fade in from bottom |
| Toast dismiss | 150ms | ease-in | Fade out |
| Toast auto-dismiss | 2000ms | — | Timer before fade out |
| Modal overlay | 100ms | ease | Backdrop fade in |
| Synthesis streaming | — | — | Word-by-word, no animation on text itself |
| Keyboard nav highlight | 0ms | None | Instant highlight move |

---

## Shadows

| Context | Value (Light) | Value (Dark) |
|---|---|---|
| Result card (default) | None | None |
| Result card (hover) | `0 2px 8px rgba(0,0,0,0.04)` | `0 2px 8px rgba(0,0,0,0.2)` |
| Dropdown menus | `0 4px 16px rgba(0,0,0,0.08)` | `0 4px 16px rgba(0,0,0,0.3)` |
| Modals | `0 8px 32px rgba(0,0,0,0.2)` | `0 8px 32px rgba(0,0,0,0.4)` |
| Toast | `0 4px 12px rgba(0,0,0,0.15)` | `0 4px 12px rgba(0,0,0,0.3)` |
| Search bar focus | `0 0 0 2px var(--glow)` | `0 0 0 2px var(--glow)` |
| Everything else | None | None |

---

## Border Radius Scale

| Context | Value |
|---|---|
| Search bar | 24px (full pill) |
| Filter pills | 16px (pill) |
| Buttons (primary) | 8px |
| Input fields | 8px |
| Dropdown menus | 12px |
| Modals | 16px |
| Synthesis block | 12px |
| Source info panel | 8px |
| Toast | 8px |
| Favicons | 2px |
| Keyboard shortcut badges | 4px |

---

## Imagery and Personality
- **Style:** None — pure functional UI. Content is the visual.
- **Empty states:** Text-only with a single call-to-action. No illustrations. "Search for sources to get started."
- **Mascot/branding:** ScholarSync logo on the landing page. No mascot.

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| >1024px (desktop) | Full layout, 780px results column, hover interactions, all pills visible |
| 768-1024px (tablet) | Full width, tabs scroll horizontally, pills scroll horizontally |
| <768px (mobile) | Full width - 32px padding, tabs scroll, pills scroll, "..." always visible, source info becomes bottom sheet, search bar full width |

---

## CSS Variables Template (Explore-specific additions)

```css
:root {
  /* Explore — Trust Indicator Colors */
  --trust-government: #16A34A;
  --trust-journalism: #2563EB;
  --trust-community: #D97706;
  --trust-other: rgba(55, 53, 47, 0.2);

  /* Explore — Component Dimensions */
  --explore-search-height: 48px;
  --explore-search-radius: 24px;
  --explore-search-max-width-landing: 640px;
  --explore-search-max-width-results: 560px;
  --explore-results-max-width: 780px;
  --explore-results-gap: 24px;
  --explore-pill-height: 32px;
  --explore-pill-radius: 16px;
  --explore-tab-gap: 16px;
  --explore-pill-gap: 8px;

  /* Explore — Typography */
  --explore-title-size: 17px;
  --explore-title-weight: 500;
  --explore-snippet-size: 14px;
  --explore-meta-size: 13px;
  --explore-url-size: 13px;
  --explore-date-size: 10px;
  --explore-tab-size: 14px;
  --explore-pill-size: 13px;
  --explore-synthesis-size: 15px;

  /* Explore — Trust Border */
  --explore-trust-border-width: 3px;

  /* Explore — Shadows */
  --explore-shadow-hover: 0 2px 8px rgba(0, 0, 0, 0.04);
  --explore-shadow-dropdown: 0 4px 16px rgba(0, 0, 0, 0.08);
  --explore-shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.2);
  --explore-shadow-toast: 0 4px 12px rgba(0, 0, 0, 0.15);

  /* Explore — Motion */
  --explore-transition-hover: 100ms ease;
  --explore-transition-save: 150ms ease-out;
  --explore-transition-toast: 150ms ease;
  --explore-toast-duration: 2000ms;

  /* Explore — Active Filter Tint */
  --explore-pill-active-bg: rgba(109, 40, 217, 0.06);
  --explore-pill-active-text: var(--brand);
}

.dark {
  --trust-government: #4ADE80;
  --trust-journalism: #60A5FA;
  --trust-community: #FBBF24;
  --trust-other: rgba(255, 255, 255, 0.15);

  --explore-shadow-hover: 0 2px 8px rgba(0, 0, 0, 0.2);
  --explore-shadow-dropdown: 0 4px 16px rgba(0, 0, 0, 0.3);
  --explore-shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.4);
  --explore-shadow-toast: 0 4px 12px rgba(0, 0, 0, 0.3);

  --explore-pill-active-bg: rgba(139, 123, 244, 0.1);
  --explore-pill-active-text: var(--brand);
}
```

---

## Next Steps
1. Run `/write-a-prd` — create the PRD for Explore module V1 as a GitHub Issue
2. Run `/prd-to-plan` — break PRD into tracer-bullet vertical slices
3. Phase 4.3: Figma wireframes from UX Brief + UI Brief
4. Phase 4.4: Code from design
