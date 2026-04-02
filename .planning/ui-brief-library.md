# UI Brief: ScholarSync Library Module
**Date:** 2026-04-01
**Source:** UI interview + competition research + UX brief + Editor design DNA extraction
**Status:** COMPLETE — ready for frontend development

---

## Design Identity
- **Vibe in 3 words:** Quiet authority, editorial
- **Inspired by:** Editor's warm editorial aesthetic + Arc's sidebar-as-workspace intelligence + Reader's keyboard-first power + Bear's calm restraint + Linear's clarity and decisiveness
- **Not like:** Dashboard software, bookmark managers, Notion-lite, noisy second-brain apps, startup AI demos, student tools

---

## Typography

### Font Families
- **Heading font:** Source Serif 4 — warm, academic, editorial. Used for reader-view content and detail page titles. NOT for list/card scanning surfaces.
- **Body/UI font:** DM Sans — clean, approachable, precise. Used for all UI chrome: sidebar, filters, cards, metadata, command bar, table view.
- **Monospace font:** JetBrains Mono — for DOIs, citation snippets, BibTeX/RIS blocks, keyboard shortcut hints.

### Font Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---------|------|------|--------|-------------|----------------|-------|
| Source card title | DM Sans | 15px | 500 | 1.35-1.4 | normal | Sans, not serif — cards are scanning surfaces |
| Card metadata line | DM Sans | 13px | 400 | 1.45 | normal | |
| Reader page content | Source Serif 4 | 17px | 400 | 1.78 | 0.005em | Matches Editor exactly |
| Reader page title | Source Serif 4 | 28-32px | 600 | 1.2-1.25 | -0.01em | Should feel like entering the source |
| Command bar input | DM Sans | 16px | 400 | 1.5 | normal | Slightly larger than form fields |
| Sidebar nav items | DM Sans | 13px | 400 | 1.4 | normal | Matches Editor sidebar |
| Sidebar section labels | DM Sans | 10px | 600 | 1.2 | 0.08em | Uppercase, for sidebar only |
| Home section headers | DM Sans | 13px | 600 | 1.4 | normal | **Sentence case**, not uppercase — calmer, more Bear-like |
| Table view cells | DM Sans | 13px | 400 | 1.4 | normal | |
| Small/caption text | DM Sans | 12px | 400 | 1.35 | normal | |
| DOIs / citations | JetBrains Mono | 12-13px | 400 | 1.5 | normal | |

### Key Typography Rules
- **Card titles = DM Sans (sans).** Serif titles across long lists feel fussy and slow scanning.
- **Reader/detail titles = Source Serif 4 (serif).** Immersion surfaces use serif.
- **Home section headers = sentence case.** "Recently saved" not "RECENTLY SAVED". Uppercase belongs in sidebar chrome only.
- **Font weights used:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold — sparingly, reader H1 only)

---

## Color Palette

### Core System (inherited from Editor — do NOT override)

**Light Mode**
```
--bg:              #FAFAF8    /* warm cream */
--background:      #FAFAF8
--surface:         #FAFAF8
--surface-raised:  #F0F0EC    /* slightly darker surface */
--ink:             rgb(55, 53, 47)        /* warm charcoal */
--ink-muted:       rgba(55, 53, 47, 0.5)  /* 50% */
--ink-faint:       rgba(55, 53, 47, 0.35) /* 35% */
--border:          rgba(55, 53, 47, 0.08) /* 8% — extremely subtle */
--border-subtle:   rgba(55, 53, 47, 0.04) /* 4% */
--glass:           rgba(255, 255, 255, 0.85)
--glass-border:    rgba(0, 0, 0, 0.06)
```

**Dark Mode**
```
--bg:              #1C1B1A    /* deep charcoal */
--background:      #1C1B1A
--surface:         #1C1B1A
--surface-raised:  #2A2826
--ink:             #EDEBE8    /* warm off-white */
--ink-muted:       #A8A29E
--border:          rgba(255, 255, 255, 0.10)
--border-subtle:   rgba(255, 255, 255, 0.06)
--glass:           rgba(28, 27, 26, 0.85)
--glass-border:    rgba(255, 255, 255, 0.08)
```

### Brand Colors (global — unchanged)
```
/* Light */
--brand:           #6D28D9    /* purple — global CTAs, primary actions */
--brand-hover:     #5B21B6

/* Dark */
--brand:           #8B7BF4    /* lighter purple for dark mode */
--brand-hover:     #A09AF7
```

### Library Module Accent (NEW — library-local only)
```
/* Light */
--library-accent:        #4A7AB5    /* muted blue — depth, trust, archive */
--library-accent-hover:  #3D6A9E
--library-accent-tint:   rgba(74, 122, 181, 0.08)  /* 8% for subtle backgrounds */
--library-accent-dot:    rgba(74, 122, 181, 0.7)    /* for dots/badges */

/* Dark */
--library-accent:        #6B9FD4
--library-accent-hover:  #7DB0E0
--library-accent-tint:   rgba(107, 159, 212, 0.10)
--library-accent-dot:    rgba(107, 159, 212, 0.7)
```

**Usage rule:** Purple = global brand/primary CTAs. Muted blue = Library-local accents (subnav active, section accents, Core state, selected rows, reader details). Never use library accent for primary buttons.

### Workflow State Colors

| State | Dot Color (Light) | Dot Color (Dark) | Badge Tint (Light) | Badge Tint (Dark) | Feel |
|-------|-------------------|-------------------|--------------------|--------------------|------|
| **Inbox** | rgba(55,53,47, 0.35) | rgba(237,235,232, 0.35) | rgba(55,53,47, 0.04) | rgba(255,255,255, 0.04) | Neutral stone — unsorted |
| **Core** | #4A7AB5 | #6B9FD4 | rgba(74,122,181, 0.08) | rgba(107,159,212, 0.08) | Library accent blue — important |
| **Background** | #8E99A4 | #A0AAB4 | rgba(142,153,164, 0.06) | rgba(160,170,180, 0.06) | Muted slate — clearly secondary |
| **Archived** | rgba(55,53,47, 0.20) | rgba(237,235,232, 0.20) | rgba(55,53,47, 0.02) | rgba(255,255,255, 0.02) | Faded neutral — ghosted |

**Treatment:** Colored dot (6px) + text label. NOT pill badges, NOT left borders, NOT icon+text. Calm and scannable.

### Trust Tier Colors (inherited from Explore)
```
--trust-government:  #16A34A (light) / #4ADE80 (dark)
--trust-journalism:  #2563EB (light) / #60A5FA (dark)
--trust-community:   #D97706 (light) / #FBBF24 (dark)
```

**Treatment in Library cards:** Small colored dot (4px) + short label in metadata row. NOT full left border (too loud for Library). Detail page gets fuller trust display.

### Semantic Colors (inherited)
```
--success:   #15803D (light) / #4ADE80 (dark)
--error:     #DC2626 (light) / #F87171 (dark)
--warning:   #F59E0B
--info:      #3B82F6
```

### Highlight Color
```
--highlight:         #FEF08A (light) / rgba(250, 204, 21, 0.25) (dark)
--highlight-important: rgba(74, 122, 181, 0.15) (light) / rgba(107, 159, 212, 0.20) (dark)
```
V1: 1 default yellow highlight + 1 optional "important" highlight (library accent blue tint). No rainbow.

---

## Spacing

### Base Unit
- **8px base unit** (comfortable — between tight Linear 4px and spacious Bear 16px)
- Scale: 4, 8, 12, 16, 24, 32, 48, 64

### Library-Specific Spacing

| Context | Gap | Notes |
|---------|-----|-------|
| Card-to-card (list default) | 12px | Comfortable scanning |
| Card-to-card (compact mode) | 8px | Tighter for power users |
| Card-to-card (home featured) | 16px | More breathing room for editorial sections |
| Home section-to-section | 24-32px | Spacing only, no dividers |
| Within-card padding | 12px 16px | Horizontal more generous than vertical |
| Sidebar item vertical | 8px | Matches Editor |
| Sidebar item horizontal | 12px | Matches Editor |
| Results toolbar controls | 8px gap | Between filter chips/controls |
| Reader page top padding | 40px | Matches Editor |
| Reader page bottom padding | 80px | Matches Editor |
| Reader content column | 720px max | Matches Editor |

### Section Separation
- **Spacing only.** No divider lines between home sections. No tinted section backgrounds.
- Section header → 12-16px gap → content block → 24-32px gap → next section
- Reserved for special use: background tint for featured hero block or active project module

### Content Widths
- **Reader/detail page:** 720px centered (matches Editor)
- **Library list area:** fluid, fills available space minus sidebar
- **Command palette modal:** 560-640px centered
- **Quick-peek popover:** 360-400px

---

## Layout

### Library Sidebar
- **Width:** 224px fixed (narrower than Editor's 248px default)
- **Not resizable in V1** (simpler items don't need range)
- **Background:** same as Editor sidebar — #1E1D1C (warm charcoal)
- **Collapsible:** yes, auto-collapses when Library opens (matches Editor behavior)
- **Nav items:** 13px DM Sans, rgba(255,255,255,0.5) inactive, active = 3px left border in library accent blue + rgba(255,255,255,0.95)
- **Section labels:** 10px uppercase, rgba(255,255,255,0.25), 0.08em letter-spacing

### Right Workbench Panel (Detail Page)
- **Width:** ~320px
- **Background:** surface-raised (#F0F0EC light / #2A2826 dark) — slightly raised, NOT glass
- **Border:** 1px border-left in --border color
- **Collapsible:** yes, default closed (focus mode)
- **Animation:** slide-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) — spring curve from Editor

---

## Components

### Source Cards
- **Style:** Flat, bordered (no shadow)
- **Border:** 1px solid --border (8% opacity)
- **Border radius:** 6px (matches Editor default)
- **Background:** --surface (seamless with page)
- **Hover:** background shifts to --surface-raised, no lift/shadow theatrics
- **Transition:** background 0.15s ease
- **Selected state:** --library-accent-tint background + 1px --library-accent border

### Workflow State Badges
- **Style:** Colored dot (6px circle) + text label
- **Dot:** border-radius 50%, colors per state table above
- **Text:** 12px DM Sans, weight 500, color matches dot but slightly muted
- **NOT pills, NOT left borders, NOT icon+text**

### Trust Tier Indicators (on cards)
- **Style:** Small dot (4px) + short text label in metadata row
- **Placement:** within card metadata line, after source/journal
- **NOT full left border** (too loud for Library's calm tone)

### Read Status Indicator
- **Unread:** bold title weight (500 → 600) + small unread dot
- **In Progress:** normal weight + subtle progress indicator
- **Read:** normal weight, slightly muted title

### Buttons
- **Primary CTA:** solid filled, --brand purple background, white text
- **Secondary:** outline, --border, --ink text
- **Tertiary/ghost:** no background, no border, --ink-muted text, hover → --ink
- **Mix rule:** primary = solid, secondary = outline, tertiary = ghost

### Input Fields
- **Style:** bordered (1px --border, border-radius 6px)
- **Background:** transparent (light) or slightly raised (dark)
- **Focus:** border transitions to --brand or --library-accent
- **Placeholder:** --ink-muted

### Command Palette (Cmd+K)
- **Style:** Centered overlay modal
- **Width:** 560-640px
- **Background:** --surface with glass effect (backdrop-filter blur 16px, 85% opacity)
- **Border:** 1px --glass-border
- **Border radius:** 12px (slightly more rounded — this is a premium, floating surface)
- **Shadow:** 0 16px 48px rgba(0,0,0,0.12) light / 0 16px 48px rgba(0,0,0,0.4) dark
- **Backdrop:** dim overlay rgba(0,0,0,0.3) light / rgba(0,0,0,0.5) dark
- **Animation:** fade-in 150ms + scale from 0.97 → 1.0 (matches Editor selection toolbar pattern)
- **Input:** 16px DM Sans, full-width, no visible border (just the modal border)
- **Result groups:** separated by 8px gap + group header (12px DM Sans semibold, --ink-muted)

### Quick-Peek Popover
- **Style:** floating card, glass panel
- **Width:** 360-400px
- **Background:** --glass
- **Border:** 1px --glass-border
- **Border radius:** 8px
- **Shadow:** 0 8px 24px rgba(0,0,0,0.08) light / 0 8px 24px rgba(0,0,0,0.3) dark
- **Animation:** fade-in 150ms + translateY(4px) → 0 (matches Editor selection toolbar)

### Table View
- **Header:** 13px DM Sans semibold, --ink-muted, border-bottom 2px
- **Cells:** 13px DM Sans regular, 8px 14px padding
- **Row hover:** --surface-raised background
- **Selected row:** --library-accent-tint background
- **Borders:** bottom border only per row, --border-subtle
- **Style matches Editor academic table pattern**

### Icons
- **Library:** Phosphor Icons (duotone) — matches Editor
- **Size:** 18px sidebar / 16px toolbar-cards / 14px inline-small
- **Color:** --ink-muted inactive, --ink hover, --brand or --library-accent active
- **Home section icons:** small (14-16px), --ink-muted, monochrome — recognition without noise

### Scrollbar (Library sidebar & panels)
- **Width:** 4px
- **Track:** transparent
- **Thumb:** rgba(255,255,255,0.12) / rgba(0,0,0,0.08), border-radius 4px
- **Thumb hover:** rgba(255,255,255,0.2) / rgba(0,0,0,0.15)

---

## Motion

### Navigation
- **Route transitions:** instant (< 50ms). No crossfade, no slide for page navigation.
- **Project switch:** content updates in-place, counts animate with subtle number transition

### Card Interactions
- **Card hover:** background shift 0.15s ease
- **Card click → detail page:** instant navigation (no animation needed)
- **State change (Inbox → Core):** card slides/fades out 200ms ease if leaving current filtered view. Stays in place with badge update if in All Sources view.
- **Delete:** card fades out 200ms ease

### Panels
- **Right workbench slide-in:** 250ms cubic-bezier(0.34, 1.56, 0.64, 1) — spring curve
- **Right workbench slide-out:** 200ms cubic-bezier(0.4, 0, 0.2, 1) — standard ease
- **Command palette appear:** 150ms fade-in + scale(0.97 → 1.0)
- **Quick-peek appear:** 150ms fade-in + translateY(4px → 0)
- **Sidebar collapse/expand:** 200ms cubic-bezier(0.4, 0, 0.2, 1)

### Feedback
- **Save button morph:** 0.15s ease, transforms to checkmark
- **Toast appear:** 150ms slide-up + fade-in, auto-dismiss 3-5 seconds
- **Undo toast:** 200ms slide-up, persists 5-8 seconds
- **Selection toolbar:** 150ms fade-in + translateY(4px) + scale(0.97)

### Loading
- **Skeleton shimmer:** subtle pulse animation, 1.5s ease-in-out infinite
- **Optimistic updates:** no visible loading state for filter/sort changes
- **Progress line:** thin 2px bar at top for background fetches (--library-accent color)

### Active States
- **Button press:** 0.08s transition, scale(0.98) — matches Editor's snappy active feel
- **Nav item active:** transition all 0.2s ease

---

## Imagery

### Empty States
- **Style:** Ghosted example card — a preview of what a populated library looks like
- **NO illustrations, NO geometric filler art, NO onboarding SaaS decoration**
- **Hero text:** Source Serif 4, 28-32px, centered
- **Action buttons:** prominent, well-spaced, DM Sans
- **Ghosted card:** --ink at ~15% opacity, showing title/domain/trust/note-count shape
- **Feeling:** "A beautiful room waiting for its first source"

### Home Section Icons
- **Style:** Subtle, muted, monochrome Phosphor icons per section
- **Size:** 14-16px
- **Color:** --ink-muted (never loud, never colored per section)
- **Mapping:**
  - Continue reading → BookOpen
  - For your active project → Folder / FolderOpen
  - Needs review → Clock / Stack
  - Recently saved → DownloadSimple / FloppyDisk
  - Ready to cite → Quotes
  - Recently highlighted → HighlighterCircle
  - Sent to notebook → Notebook

---

## CSS Variables Template

```css
:root {
  /* Typography */
  --font-heading: 'Source Serif 4', 'Merriweather', Georgia, serif;
  --font-body: 'DM Sans', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-size-base: 15px;
  --font-size-reader: 17px;
  --font-size-small: 13px;
  --font-size-caption: 12px;
  --font-size-cmd: 16px;
  --font-size-detail-title: 30px;
  --line-height-base: 1.4;
  --line-height-reader: 1.78;
  --line-height-tight: 1.2;

  /* Colors - Light (inherited from Editor globals) */
  --bg: #FAFAF8;
  --surface: #FAFAF8;
  --surface-raised: #F0F0EC;
  --ink: rgb(55, 53, 47);
  --ink-muted: rgba(55, 53, 47, 0.5);
  --ink-faint: rgba(55, 53, 47, 0.35);
  --border: rgba(55, 53, 47, 0.08);
  --border-subtle: rgba(55, 53, 47, 0.04);
  --brand: #6D28D9;
  --brand-hover: #5B21B6;

  /* Library-specific accent */
  --library-accent: #4A7AB5;
  --library-accent-hover: #3D6A9E;
  --library-accent-tint: rgba(74, 122, 181, 0.08);

  /* Workflow states */
  --state-inbox: rgba(55, 53, 47, 0.35);
  --state-inbox-tint: rgba(55, 53, 47, 0.04);
  --state-core: #4A7AB5;
  --state-core-tint: rgba(74, 122, 181, 0.08);
  --state-background: #8E99A4;
  --state-background-tint: rgba(142, 153, 164, 0.06);
  --state-archived: rgba(55, 53, 47, 0.20);
  --state-archived-tint: rgba(55, 53, 47, 0.02);

  /* Highlights */
  --highlight: #FEF08A;
  --highlight-important: rgba(74, 122, 181, 0.15);

  /* Spacing */
  --space-unit: 8px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
  --space-4xl: 64px;

  /* Card gaps */
  --card-gap: 12px;
  --card-gap-compact: 8px;
  --card-gap-featured: 16px;
  --section-gap: 28px;

  /* Layout */
  --sidebar-width: 224px;
  --content-max: 720px;
  --workbench-width: 320px;
  --cmd-palette-width: 600px;
  --peek-width: 380px;

  /* Shape */
  --radius: 6px;
  --radius-lg: 8px;
  --radius-cmd: 12px;
  --shadow-none: none;
  --shadow-cmd: 0 16px 48px rgba(0, 0, 0, 0.12);
  --shadow-peek: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* Motion */
  --transition-instant: 0.08s ease;
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-appear: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --bg: #1C1B1A;
  --surface: #1C1B1A;
  --surface-raised: #2A2826;
  --ink: #EDEBE8;
  --ink-muted: #A8A29E;
  --ink-faint: rgba(237, 235, 232, 0.35);
  --border: rgba(255, 255, 255, 0.10);
  --border-subtle: rgba(255, 255, 255, 0.06);
  --brand: #8B7BF4;
  --brand-hover: #A09AF7;

  --library-accent: #6B9FD4;
  --library-accent-hover: #7DB0E0;
  --library-accent-tint: rgba(107, 159, 212, 0.10);

  --state-inbox: rgba(237, 235, 232, 0.35);
  --state-inbox-tint: rgba(255, 255, 255, 0.04);
  --state-core: #6B9FD4;
  --state-core-tint: rgba(107, 159, 212, 0.08);
  --state-background: #A0AAB4;
  --state-background-tint: rgba(160, 170, 180, 0.06);
  --state-archived: rgba(237, 235, 232, 0.20);
  --state-archived-tint: rgba(255, 255, 255, 0.02);

  --highlight: rgba(250, 204, 21, 0.25);
  --highlight-important: rgba(107, 159, 212, 0.20);

  --shadow-cmd: 0 16px 48px rgba(0, 0, 0, 0.4);
  --shadow-peek: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

---

## Component Quick Reference

| Component | Background | Border | Radius | Shadow | Hover |
|-----------|-----------|--------|--------|--------|-------|
| Source card | --surface | 1px --border | 6px | none | bg → --surface-raised |
| Source card (selected) | --library-accent-tint | 1px --library-accent | 6px | none | — |
| Command palette | --glass | 1px --glass-border | 12px | --shadow-cmd | — |
| Quick-peek | --glass | 1px --glass-border | 8px | --shadow-peek | — |
| Workbench panel | --surface-raised | 1px-left --border | 0 | none | — |
| Toolbar button | transparent | none | 6px | none | bg → --surface-raised |
| Toolbar button (active) | --library-accent-tint | none | 6px | none | — |
| Sidebar nav item | transparent | none | 6px | none | bg → rgba(255,255,255,0.06) |
| Sidebar nav (active) | rgba(255,255,255,0.08) | 3px-left --library-accent | 6px | none | — |
| Table row | transparent | bottom 1px --border-subtle | 0 | none | bg → --surface-raised |
| Table row (selected) | --library-accent-tint | bottom 1px --border-subtle | 0 | none | — |

---

*Feeds into: `.planning/ux-brief-library.md`, `.planning/decisions/2026-04-01-library-module-redesign.md`, `.planning/competition-research-library.md`*
*Next: Run `/write-a-prd` to create the formal PRD, or start building with these specs.*
