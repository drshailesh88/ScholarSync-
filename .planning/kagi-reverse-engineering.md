# Kagi → ScholarSync Explore: Complete UX Reverse-Engineering
**Date:** 2026-03-31
**Source:** Kagi help docs, community CSS repos, UX teardowns, screenshots
**Purpose:** Every Kagi page/interaction mapped to ScholarSync Explore equivalent
**Design System:** Uses ScholarSync's existing tokens (globals.css), NOT Kagi's colors

---

## DESIGN SYSTEM MAPPING

### Colors (ScholarSync existing — DO NOT CHANGE)

| Token | Light | Dark | Kagi Equivalent |
|---|---|---|---|
| `--background` | `#FAFAF8` | `#1C1B1A` | `#FAF6F1` / `#1A1A2E` |
| `--surface-raised` | `#F0F0EC` | `#2A2826` | `#FFFFFF` / `#252540` |
| `--ink` | `rgb(55,53,47)` | `#EDEBE8` | `#1A1A1A` / `#E8E8E8` |
| `--ink-muted` | `rgba(55,53,47,0.5)` | `#A8A29E` | `#888888` / `#777777` |
| `--brand` | `#6D28D9` | `#8B7BF4` | `#E6A44E` (orange) |
| `--border` | `rgba(55,53,47,0.08)` | `rgba(255,255,255,0.10)` | `#E8E3DC` / `#333350` |

### Typography (ScholarSync existing — DO NOT CHANGE)

| Role | Font | Kagi Equivalent |
|---|---|---|
| Sans | DM Sans | Inter |
| Serif | Source Serif 4 | N/A |
| Mono | JetBrains Mono | SF Mono |

### Typography Scale for Explore (adapted from Kagi)

| Element | Size | Weight | Color |
|---|---|---|---|
| Result title | 17px | 500 (medium) | `--ink` as link color |
| URL/breadcrumb | 13px | 400 | `--brand` (purple, our accent) |
| Snippet | 14px | 400 | `--ink-muted` |
| Source/author metadata | 13px | 400 | `--ink-muted` |
| Tab labels | 14px | 400 (inactive) / 600 (active) | `--ink-muted` / `--ink` |
| Filter pill labels | 13px | 400 | `--ink` |
| Synthesis text | 15px | 400 | `--ink` |

### Spacing (adapted from Kagi)

| Element | Value |
|---|---|
| Result gap | 20-24px |
| Search bar height | 44-48px |
| Search bar border-radius | 24px (pill) |
| Tab gap | 16px |
| Filter pill height | 30-32px |
| Filter pill border-radius | 16px (pill) |
| Filter pill gap | 8px |
| Page max-width (results column) | 780px |
| Page side margins | 16px min, auto-centered |
| Result card padding | 16px vertical |

---

## PAGE 1: EXPLORE LANDING (Pre-Search)

### Kagi Reference
- Logo centered, large
- Search bar centered below logo, pill-shaped, placeholder "Let's fetch..."
- Tabs below search bar: All | Images | Videos | News | Podcasts | Maps | More
- Filter pills below tabs: Scope ▾ | Region ▾ | Order By ▾ | Time ▾ | Options ▾ | Advanced
- Privacy notice at bottom (dismissible)
- Nothing else. No feed. No trending. No recommendations.

### ScholarSync Explore Adaptation

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                     [ScholarSync Logo]                        │
│                                                              │
│         ┌──────────────────────────────────────┐             │
│         │  Explore...                        🔍 │             │
│         └──────────────────────────────────────┘             │
│                                                              │
│    Academic    Web    News    Discussions    More ⋮    ✕ Close│
│    ─────────                                                 │
│                                                              │
│    Scope ▾    Order By ▾    Time ▾    Options ▾    Advanced   │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Elements:**
1. **ScholarSync logo** — centered, our existing logo
2. **Search bar** — centered, pill-shaped (24px radius), 44-48px height, placeholder "Explore..."
3. **Tabs** — text-only, no icons, no decoration, no count badges. Active tab has 2px underline in `--brand` color. Default tab: "Academic"
4. **Filter pills** — appear below tabs. Small pill-shaped dropdowns. Hidden by default until user clicks "Close" is removed (Kagi shows them by default when "Search Options Always Open" is enabled)
5. **Nothing else** — no feed, no trending, no recent searches visible. History behind a dedicated click (sidebar or menu). Kagi model.

**Decisions:**
- Tabs replace Kagi's All/Images/Videos/News with: **Academic | Web | News | Discussions | More**
- "More" contains: Images, Videos, Podcasts (future tabs)
- "Scope" replaces Kagi's "Lens" — same dropdown behavior
- Filter pills only appear AFTER first search (not on landing page) unless user enables "Always Show Filters" in settings
- The landing page is aggressively minimal

---

## PAGE 2: SEARCH RESULTS (Post-Search)

### Kagi Reference
- Search bar moves to top-left header (smaller)
- Tabs stay below search bar
- Filter pills below tabs
- Quick Answer button available (click or press `q`)
- Single column of results, left-aligned
- Each result: favicon + title (link) + URL breadcrumb + snippet
- Shield icon right-aligned per result
- "..." menu per result
- 30-50 results per page, paginated
- Grouped results from same domain (toggleable)
- Related Searches widget at bottom (toggleable)
- Share This Search button at bottom

### ScholarSync Explore Adaptation

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] [═══════════════════════════════════════════════] 🔍   │
│                                                              │
│ Academic    Web    News    Discussions    More ⋮              │
│ ─────────                                                    │
│ Scope ▾    Order By ▾    Time ▾    Options ▾    Advanced      │
│                                                              │
│ ┌ Synthesize ─────────────────────────────────────────────┐  │
│ │ Click to generate a synthesis of these results          │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                              │
│ ● Title of First Result                           🛡 ···    │
│   source.com > path > page                                   │
│   Snippet text showing the most relevant excerpt from        │
│   this page, with search terms in bold...                    │
│                                                              │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│                                                              │
│ ● Title of Second Result                          🛡 ···    │
│   nejm.org > doi > 10.1056                                   │
│   Another snippet with relevant content from this            │
│   source, truncated at two lines...                          │
│                                                              │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│                                                              │
│ ● Title of Third Result                           🛡 ···    │
│   who.int > publications > report-2025                       │
│   Dr. Jane Smith · World Health Organization                 │
│   Snippet text here...                                       │
│                                                              │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│                                                              │
│ [More results...]                          Showing 1-20 of 87│
└──────────────────────────────────────────────────────────────┘
```

### Result Card Anatomy

Each result follows Kagi's pattern but adapted for ScholarSync:

**Per-result elements (top to bottom):**
1. **Trust indicator** — colored dot (●) before title. Colors: green = government/institutional, blue = major journalism/Q1 journal, amber = community/forum, gray = other. Small, 8px, subtle.
2. **Title** — clickable link, 17px, weight 500, color `--ink`. Opens the source page.
3. **Shield icon** (🛡) — right-aligned, opens Source Info panel (see Page 4)
4. **"..." menu** — right-aligned, opens actions menu (see below)
5. **URL breadcrumb** — 13px, `--brand` color (purple), breadcrumb format: `domain.com > path > page`
6. **Author/Source line** (when available) — 13px, `--ink-muted`, shows author name + organization
7. **Snippet** — 14px, `--ink-muted`, 2 lines max, search terms in bold (weight 700)
8. **Separator** — subtle 1px line in `--border` color, 20-24px gap to next result

**What is NOT shown by default (progressive disclosure):**
- No abstract (click to expand or go to page)
- No citation count
- No evidence level badges (trust dot replaces this)
- No journal quartile
- No action buttons (hidden until hover)
- No tags or MeSH terms

### Per-Tab Result Differences

**Academic tab:**
- URL breadcrumb shows journal name instead of URL path: `The Lancet > Vol 403 > 2024`
- Author line always shown: `Smith JA, Chen B, et al.`
- Trust dot color = evidence level: green (Level I), blue (Level II), amber (Level III), orange (Level IV), gray (Level V)

**Web tab:**
- Standard URL breadcrumb
- Author shown when detectable
- Trust dot = domain authority tier: green (government .gov, .edu), blue (major news outlet), gray (other)

**News tab:**
- Publication name + relative date: `Reuters · 3 hours ago`
- Trust dot = outlet tier

**Discussions tab:**
- Platform + community: `Reddit · r/medicine`
- Engagement: `▲ 847 · 234 comments`
- Trust dot = not applicable (gray for all)

### Hover Behavior

On **desktop hover** over a result card:
- Subtle background change to `--surface-raised`
- "..." menu appears (if not already visible)
- Action icons fade in: **Save** button (bookmark icon) appears

On **mobile** (no hover):
- "..." menu always visible
- Tap card area to select/highlight
- Tap title to navigate to source

### "..." Actions Menu (per result)

Adapted from Kagi's three-dot menu + Readwise Reader's action menu:

| Action | Keyboard Shortcut | Notes |
|---|---|---|
| Save to Library | `S` | Quick save to default library |
| Save to Project... | `Shift+S` | Opens project picker |
| Cite in Draft | `C` | Only if a draft is open |
| Open Original | `O` | Opens source page in new tab |
| Summarize Page | `Shift+Q` | Uses Universal Summarizer |
| Ask About Page | `A` | Opens agent chat with page context |
| More from this source | — | Re-searches scoped to domain |
| Block this source | `B` | Removes from future results |
| Copy Link | `Shift+C` | Copies URL to clipboard |

---

## PAGE 3: SYNTHESIS (On-Demand)

### Kagi Reference
- Quick Answer: click button or press `q`
- Appears below search bar, above results
- AI-generated summary with source citations
- Can be auto-triggered on `?` queries (toggleable)

### ScholarSync Explore Adaptation

**Before clicking "Synthesize":**
```
┌ Synthesize ──────────────────────────────────────────────┐
│ ✨ Click to generate a synthesis of these results        │
└──────────────────────────────────────────────────────────┘
```

A subtle, collapsed bar above results. One line. Click or press `Q` to generate.

**After clicking "Synthesize":**
```
┌ Synthesis ───────────────────────────────────────────────┐
│                                                          │
│ Strong evidence from 8 meta-analyses supports SGLT2      │
│ inhibitor use in HFrEF, with consistent reduction in     │
│ cardiovascular death [●1, ●2] and heart failure          │
│ hospitalization [●3]. The DAPA-HF and EMPEROR-Reduced    │
│ trials established the class effect [●4, ●5]. Recent     │
│ evidence from DELIVER extends benefits to HFpEF [●6].    │
│                                                          │
│ One area of conflicting evidence is the effect on renal  │
│ outcomes in patients without diabetes [●7, ●8].          │
│                                                          │
│                                              [Collapse ▲]│
└──────────────────────────────────────────────────────────┘
```

**Synthesis details:**
- Citation markers [●1] use colored dots matching the trust indicator of the cited source
- Click a citation → scrolls to that result in the list below
- Collapsible (click "Collapse" or press `Q` again)
- Streams in word-by-word while generating (shows progress)
- Cost-controlled: only fires when user explicitly requests

---

## PAGE 4: SOURCE INFO PANEL (Trust & Personalization)

### Kagi Reference
- Shield icon on every result
- Panel shows: ad/tracker count, popularity ranking, HTTPS status, response speed
- Personalization controls: Block / Lower / Normal / Higher / Pin (5-level)
- Small Web indicator (Doggo icon)
- SlopStop report button

### ScholarSync Explore Adaptation

Clicking the shield (🛡) icon on any result opens an inline panel:

```
┌─ Source Info ─────────────────────────────────────────┐
│                                                       │
│  nejm.org                                             │
│  The New England Journal of Medicine                  │
│                                                       │
│  Trust Tier:  ●●●●● Government/Institutional         │
│  Domain Type: Academic Journal                        │
│  Impact:      Q1 (IF 176.1)                          │
│  Open Access: Yes (Gold)                              │
│  Trackers:    0                                       │
│                                                       │
│  ── Personalization ──────────────────────────────    │
│  ○ Block  ○ Lower  ● Normal  ○ Higher  ○ Pin        │
│                                                       │
│  [Report as low-quality]                              │
└───────────────────────────────────────────────────────┘
```

**Fields per source type:**

| Field | Academic | Web | News | Discussions |
|---|---|---|---|---|
| Trust tier | Evidence level (I-V) | Domain authority | Outlet tier | Platform |
| Domain type | Journal / Preprint / Repository | Gov / News / Blog / Wiki | Wire / Local / Opinion | Forum / Social |
| Impact | Journal IF / Quartile | — | — | — |
| Open Access | Yes/No | — | — | — |
| Citation count | Yes | — | — | Upvotes |
| Trackers | Yes | Yes | Yes | Yes |
| Personalization | Yes (5 levels) | Yes | Yes | Yes |

---

## PAGE 5: SCOPE DROPDOWN (replaces Kagi "Lens")

### Kagi Reference
- Lens dropdown in filter bar
- Shows: Fediverse Forums, News 360, Usenet/Archive, Kagi Documentation, Academic, Forums, Programming, PDFs
- "Edit" at bottom to manage lenses
- Created in Settings > Lenses with: name, region, included/excluded domains, keywords, filetype, date range

### ScholarSync Explore Adaptation

**Scope dropdown contents:**

```
┌─ Scope ▾ ────────────────┐
│                           │
│  All Sources              │  ← default
│  ──────────────────────── │
│  Academic Papers          │  ← built-in
│  Web & Reports            │  ← built-in
│  News                     │  ← built-in
│  Discussions              │  ← built-in
│  ──────────────────────── │
│  Clinical Trials Only     │  ← user-created
│  Top Cardiology Journals  │  ← user-created
│  Government Sources       │  ← user-created
│  ──────────────────────── │
│  Edit Scopes...           │  ← opens settings
│                           │
└───────────────────────────┘
```

**Scope creation form (in Settings > Scopes):**

| Field | Description |
|---|---|
| Name | Scope display name |
| Source types | Checkboxes: Academic, Web, News, Discussions |
| Included domains | Up to 10 (e.g., nejm.org, thelancet.com) |
| Excluded domains | Up to 10 (e.g., pinterest.com, quora.com) |
| Included keywords | Up to 5 |
| Excluded keywords | Up to 5 |
| Date range | From/To date pickers |
| Region | Dropdown |
| Share | Toggle shareable link on/off |

**Key difference from Kagi:** Scopes work across ALL tabs (Academic, Web, News, Discussions). A scope like "Top Cardiology Journals" would affect the Academic tab specifically, while "Government Sources" would affect the Web tab.

---

## PAGE 6: ORDER BY DROPDOWN

### Kagi Reference
Default, Recency, Website, Ad/Trackers Count, Ascending/Descending

### ScholarSync Explore Adaptation

```
┌─ Order By ▾ ─────────────┐
│                           │
│  ● Default (Quality)      │
│  ○ Recency                │
│  ○ Citation Count         │  ← Academic tab only
│  ○ Source Trust            │
│  ──────────────────────── │
│  ○ Ascending              │
│  ○ Descending             │
│                           │
└───────────────────────────┘
```

"Source Trust" as a sort option — directly inspired by Kagi's "Ad/Trackers Count" sort. Surfaces trust-based ranking without putting badges on every card.

---

## PAGE 7: TIME DROPDOWN

### Kagi Reference
All, Past 24h, Past Week, Past Month, Past Year, Custom date range

### ScholarSync Explore Adaptation (identical)

```
┌─ Time ▾ ─────────────────┐
│                           │
│  ● Any time               │
│  ○ Past 24 hours          │
│  ○ Past week              │
│  ○ Past month             │
│  ○ Past year              │
│  ──────────────────────── │
│  From: [dd/mm/yyyy]       │
│  To:   [dd/mm/yyyy]       │
│                           │
└───────────────────────────┘
```

---

## PAGE 8: OPTIONS DROPDOWN

### Kagi Reference
Verbatim toggle, Personalized toggle

### ScholarSync Explore Adaptation

```
┌─ Options ▾ ──────────────┐
│                           │
│  □ Exact match only       │  ← Kagi's "Verbatim"
│  □ Use my preferences     │  ← Kagi's "Personalized"
│  □ Open access only       │  ← Academic-specific
│  □ Exclude preprints      │  ← Academic-specific
│                           │
└───────────────────────────┘
```

---

## PAGE 9: ADVANCED SEARCH MODAL

### Kagi Reference
Modal with: all these words, exact phrase, any of these, none of these, region, last update, date range, site/domain, terms appearing, file type

### ScholarSync Explore Adaptation

```
┌─ Advanced Search ────────────────────────────────────┐
│                                                       │
│  Find sources with...                                 │
│                                                       │
│  all these words:     [________________________]      │
│  this exact phrase:   [________________________]      │
│  any of these words:  [________________________]      │
│  none of these words: [________________________]      │
│                                                       │
│  ── Then narrow your results by... ──────────────     │
│                                                       │
│  region:         [India (IN)              ▾]          │
│  date range:     [From ___] [To ___]                  │
│  site or domain: [________________________]           │
│  source type:    [Any                     ▾]          │
│  study type:     [Any                     ▾]          │  ← Academic only
│  author:         [________________________]           │
│                                                       │
│              [Cancel]  [Build Search]                 │
└───────────────────────────────────────────────────────┘
```

---

## PAGE 10: KEYBOARD SHORTCUTS OVERLAY

### Kagi Reference
Press `?` → scrollable overlay showing all shortcuts

### ScholarSync Explore Adaptation

Press `?` on the Explore page:

```
┌─ Keyboard Shortcuts ─────────────────────────────────┐
│                                                       │
│  NAVIGATION                                           │
│  j / ↓        Move to next result                     │
│  k / ↑        Move to previous result                 │
│  Enter        Open highlighted result                 │
│  /            Focus search bar                        │
│  Escape       Clear highlight / close panel           │
│                                                       │
│  TABS                                                 │
│  1            Academic tab                            │
│  2            Web tab                                 │
│  3            News tab                                │
│  4            Discussions tab                         │
│  ]            Next tab                                │
│  [            Previous tab                            │
│                                                       │
│  ACTIONS                                              │
│  s            Save to Library                         │
│  S (shift)    Save to Project...                      │
│  c            Cite in Draft                           │
│  o            Open original page                      │
│  q            Toggle Synthesis                        │
│  i            Open Source Info panel                   │
│  b            Block this source                       │
│  ?            This help screen                        │
│                                                       │
│  BULK                                                 │
│  x            Select/deselect result                  │
│  Shift+↑/↓   Extend selection                         │
│  Cmd+A        Select all                              │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## PAGE 11: SETTINGS (Explore-specific)

### Kagi Reference
Settings split into: General, Appearance, Search, Widgets, AI, Personalized Results, Advanced

### ScholarSync Explore Settings (under app Settings > Explore)

**Search Behavior:**
| Setting | Options |
|---|---|
| Search suggestions | On / Off |
| Show filter bar by default | On / Off |
| Group results from same domain | On / Off |
| Result snippet length | Short / Long |
| Default tab | Academic / Web / News / Discussions |
| Open links in new tab | On / Off |

**Scopes:**
| Setting | Options |
|---|---|
| Manage scopes | Create / Edit / Delete / Toggle active |
| Share scope | Toggle shareable link |

**Synthesis:**
| Setting | Options |
|---|---|
| Auto-synthesize on `?` queries | On / Off |
| Synthesis model | Default / Available models |

**Source Preferences:**
| Setting | Options |
|---|---|
| View ranked sources | List of boosted/blocked domains |
| Add domain rule | Domain + Block/Lower/Normal/Higher/Pin |
| Community rankings | View most-promoted/blocked domains |

---

## INTERACTION MODEL SUMMARY

### User Flow: Complete Search Session

```
1. User navigates to Explore
2. Sees: logo + search bar + tabs + filter pills. Nothing else.
3. Types query, hits Enter
4. Results appear instantly in single column
5. Tabs show which source types are active (Academic is default)
6. User scans results (title + snippet + trust dot)
7. User presses j/k to navigate, or scrolls
8. User hovers a result → Save button + "..." appear
9. User clicks "..." → actions menu with keyboard shortcuts
10. User presses `s` → saved to library (subtle toast: "Saved")
11. User presses `q` → synthesis generates at top
12. User clicks shield → source info panel with trust details
13. User switches tab (click "News" or press `3`)
14. Results swap instantly (no animation)
15. User clicks "Scope ▾" → changes to "Government Sources"
16. Results re-filter to government domains only
17. User clicks result title → opens source page in new tab
```

### What Kagi Does That We DO NOT Adapt

| Kagi Feature | Why We Skip It |
|---|---|
| Images/Videos/Maps tabs | Not relevant for evidence-based writing (future consideration) |
| Custom CSS editor | Too much customization surface for V1 |
| Bangs (`!`) and Snaps (`@`) | Power-user feature, defer |
| Redirects (regex URL rewriting) | Over-engineered for our use case |
| SlopStop (AI content detection) | Our trust scoring handles this differently |
| Kagi Companions (mascot) | Brand-specific |
| Privacy Pass | Not needed for our auth model |
| Universal Summarizer standalone | We have synthesis; no separate tool needed |

### What We ADD That Kagi Doesn't Have

| ScholarSync Feature | Why |
|---|---|
| Save to Library / Save to Project | Workspace integration — our core differentiator |
| Cite in Draft | Direct writing workflow connection |
| Trust indicator dots on results | Source quality visible at scan level |
| Evidence level in Source Info | Academic-specific quality metric |
| Per-tab result card variations | Different metadata for papers vs news vs discussions |
| Agent integration ("Ask about page") | Our AI agent can discuss any source |

---

## READWISE READER PATTERNS USED (Cards Only)

From the Readwise teardown, we borrow for the result card:

1. **Thumbnail optional, right-aligned** — favicon (16px) inline with metadata, NOT large thumbnails
2. **Metadata row** — source + author + reading time, separated by `·`, small muted text
3. **Hover reveals actions** — "..." menu + Save icon appear on hover only
4. **Keyboard shortcuts shown in menu** — every action has a shortcut label (S, O, C, B)
5. **Subtle 1px separators** — between results, using `--border` color
6. **Unread/new indicator** — small colored dot for new results (if re-visiting a search)

What we DON'T borrow from Readwise:
- Right panel (rejected — too cluttered)
- Three-state triage (Inbox/Later/Archive) — not our model
- Reading progress indicator — not relevant for search results
- Dark-first design — we're light-first

---

## RESPONSIVE BEHAVIOR

### Desktop (>1024px)
- Results column: 780px max-width, centered
- Full tab bar visible
- All filter pills visible
- Hover interactions enabled

### Tablet (768-1024px)
- Results column: full width minus 32px padding
- Tabs may scroll horizontally
- Filter pills scroll horizontally

### Mobile (<768px)
- Results column: full width minus 24px padding
- Tabs scroll horizontally
- Filter pills scroll horizontally (one row)
- "..." menu always visible (no hover on touch)
- Search bar full width
- Source Info panel becomes a bottom sheet
- Synthesis collapsible by default

---

---

## CORRECTIONS FROM LIVE CHROME TEARDOWN (2026-03-31)

Cross-referenced with firsthand Kagi screenshots captured via `claude --chrome`.

### New details discovered:

1. **Heart/Save icon per result** — Kagi shows a heart (♡) icon on EVERY result card, alongside the "..." menu. Not hover-only — always visible. **Adaptation:** Use a bookmark icon (🔖) always visible on each result for quick-save. This is our "Save to Library" primary action.

2. **Date in rounded pill badge** — Dates appear as small grey rounded pills (e.g., "Mar 24, 2026"), not inline text. More scannable than plain text dates. **Adaptation:** Use same pill treatment for dates on result cards.

3. **Stats line with timing** — "18 relevant results in 1.22s. All results from external indexes." + "71% unique Kagi results". **Adaptation:** Show "23 results in 0.8s — via PubMed, SearXNG, OpenAlex" to communicate multi-source quality.

4. **Grouped/indented results** — Same-domain results appear indented under primary result, without repeating favicon/domain. Toggleable in settings. **Adaptation:** Group papers from same journal; group news from same outlet. Toggleable.

5. **Lens active indicator** — Green toggle circle appears inside the Scope pill when a lens/scope is active. Green checkmark next to active lens in dropdown. **Adaptation:** Use `--brand` purple indicator when a custom Scope is active.

6. **Control Center** — Hamburger menu opens slide-in panel from right edge. Contains: Settings, Support, Theme toggle (Default/Light/Dark segmented), Safe Search toggle, Session info, Status (green dot + "All Services Operational"), Sign Out. **Adaptation:** Our existing sidebar handles most of this; consider a light "quick settings" slide-in for Explore-specific toggles.

7. **Lens management page** — "Active Lenses (8/20)" counter with max limit. Drag handles (6-dot grip) for reorder. Purple on/off toggles. Pencil edit icon. "Create New" button top-right. **Adaptation:** Scope management at `/settings/scopes` with identical pattern.

8. **Academic lens metadata** — When Academic lens is active, results show: "by [Author] · [Year] · Cited by [N]" inline. **Adaptation:** Our Academic tab already does this — confirmed correct approach.

9. **Quick Answer "Show More"** — After the AI summary, there's a "Show More" expandable chevron for extended content. **Adaptation:** Our synthesis block should have the same collapse/expand behavior.

10. **Share icon** — Arrow icon in the tab bar for sharing search results via link. **Adaptation:** Add "Share this search" to our "..." overflow or as a subtle icon.

### Updated Result Card Anatomy (post-Chrome teardown):

```
[●] Title of the Result (purple/link color)              [♡] [···]
    [🌐] domain.com > breadcrumb > path
    [Mar 2026] Snippet text showing relevant excerpt with
    search terms in bold weight...
```

Elements left-to-right, top-to-bottom:
- Trust dot (●) — colored by source quality tier
- Title — clickable link, 17px, weight 500
- Save icon (♡/🔖) — always visible, right side
- "..." menu — always visible, right side
- Favicon (🌐) — 16px, inline with URL
- URL breadcrumb — 13px, --brand color
- Date pill — grey rounded badge, right-aligned on snippet line
- Snippet — 14px, --ink-muted, 2-3 lines, bold search terms

---

## NEXT STEPS

1. Build Figma wireframes from this spec (use `figma-generate-design` skill)
2. Create component library: SearchBar, ResultCard, TabBar, FilterPills, ScopeDropdown, SourceInfoPanel, SynthesisBlock, KeyboardOverlay
3. Write PRD for Explore module V1
4. Implementation plan using tracer-bullet vertical slices
