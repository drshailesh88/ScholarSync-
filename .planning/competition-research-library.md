# Competition & Inspiration Research: ScholarSync Library Module
**Date:** 2026-04-01
**Competitors analyzed:** 3 (Matter, Readwise Reader, Instapaper)
**Inspirations analyzed:** 3 (ScholarSync Editor [Linear + Bear DNA], Arc Browser, Landing Page palette)

---

## COMPETITORS

### 1. Matter — "The ultimate reading client for the open web"
**URL:** https://hq.getmatter.com
**Positioning:** Power readers who consume newsletters, RSS feeds, and web articles. iOS-first.
**Pricing:** Free tier + Premium ~$8/mo or $60-80/yr. Free: unlimited library, save, parse. Premium: HD TTS, AI co-reader, highlights, integrations, send-to-Kindle.

**Feature Inventory:**
| Feature | They Have It | We Plan It | Priority |
|---------|:-:|:-:|---------|
| Single unified queue | ✅ | ✅ | Must match |
| Full-text search | ✅ | ✅ | Must match |
| Tags / organization | ✅ | ✅ (workflow states) | Our advantage — states > tags |
| Highlighting (low-friction) | ✅ | ✅ | Must match |
| Audio / TTS | ✅ | ❌ | Defer — not core to research |
| Newsletter ingestion | ✅ | ❌ | Consider later |
| RSS feeds | ✅ | ❌ | Consider later |
| Kindle export | ✅ | ❌ | Consider later |
| Bulk actions (select, archive, tag) | ✅ | ✅ | Must match |
| Archive / delete distinction | ✅ | ✅ | Must match |
| Offline reading | ✅ | ❌ | Consider |
| Co-reader / social highlights | ✅ | ❌ | Not planned |
| Trust/evidence tier display | ❌ | ✅ | **Our advantage** |
| Citation generation (6 formats) | ❌ | ✅ | **Our advantage** |
| Project-aware organization | ❌ | ✅ | **Our advantage** |
| Notebook/synthesis handoff | ❌ | ✅ | **Our advantage** |
| Editor/draft integration | ❌ | ✅ | **Our advantage** |
| Academic paper support | ❌ | ✅ | **Our advantage** |
| PDF upload + viewer | ❌ | ✅ | **Our advantage** |
| Source provenance tracking | ❌ | ✅ | **Our advantage** |

**UX Teardown:**
- **Landing screen:** Single filterable/sortable queue. Mental model: "Everything unread lives here."
- **Navigation:** Bottom tabs (mobile). Queue is the primary surface.
- **Progressive disclosure:** Reading surface stays visually quiet; library/secondary menus carry complexity. Power features hidden in long-press, overflow menus.
- **Cognitive load:** Calm. One dominant action per screen. Aggressive reduction of UI noise.
- **Onboarding:** Feature-dense — save, listen, highlight, tag, export, Kindle all communicated upfront. Risk of first-run overload.
- **Reading view:** High legibility, simple typographic controls, minimized chrome, content-first. "Reading screen should feel like attention, not software."
- **Audio:** First-class parallel consumption mode with synchronized highlighting, multi-language, fluid switch between reading and listening.
- **Highlighting:** Direct long-press-and-drag. Apple Pencil support. Eliminates "multi-step highlighting flow." Annotation feels like continuation of reading, not interruption.

**Infrastructure:**
- Frontend: Next.js (React)
- Backend: AWS (likely Python/Django)
- Hosting: Netlify (marketing) + AWS (API)
- CDN: Netlify Edge
- Auth: Custom (email/password + Apple/Google SSO)
- Payments: Not detected externally (likely in-app IAP)
- Analytics: None detected on marketing site
- Error tracking: None detected on marketing site

**Strengths:**
- Single queue with excellent management tools (reorder, triage, filter, shuffle, bulk edit)
- Continuity of reading — save → find → open → switch to audio → highlight → search later → tag → export
- Audio as genuine parallel mode, not checkbox accessibility
- Restraint — reading surface protected from feature complexity
- Designs for fragmented attention (context-switching between reading and listening)

**Weaknesses:**
- Archive easier than delete — assumes users are collectors; many are not
- Parsing quality is existential UX issue (incomplete transfers, popup contamination, inconsistent images)
- Advanced workflow users hit ceiling (limited desktop nativeness, insufficient automation)
- Discoverability suffers from elegance (power features hidden)
- Product proposition can sprawl (read-later + newsletters + feeds + audio + co-reader + Kindle + highlights + tags + search)
- No research-grade provenance or evidence assessment
- No project organization
- No citation system

---

### 2. Readwise Reader — "Read and highlight anything"
**URL:** https://readwise.io/read
**Positioning:** Knowledge workers, PKM enthusiasts, researchers who read across formats and want to retain what they read.
**Pricing:** Readwise Lite: $5.59/mo (annual). Full (includes Reader): $9.99/mo or $12.99/mo monthly. 30-day free trial. No free tier.

**Feature Inventory:**
| Feature | They Have It | We Plan It | Priority |
|---------|:-:|:-:|---------|
| Triage model (Inbox/Later/Archive) | ✅ | ✅ (workflow states) | Our advantage — richer states |
| Filtered Views (saved queries) | ✅ | ✅ | Must match |
| Keyboard-first reading | ✅ | ✅ | Must match |
| Command palette (Cmd+K) | ✅ | ✅ | Must match |
| Full-text offline search | ✅ | ❌ | Consider |
| Highlighting (paragraph focus + H key) | ✅ | ✅ | Must match |
| Export (Markdown, templates, Jinja2) | ✅ | ✅ (citation + notebook) | Different approach |
| Note app integrations (Obsidian, Notion, etc.) | ✅ | ❌ | Consider later |
| PDF/EPUB support | ✅ | ✅ (PDF only) | Partial match |
| YouTube transcript support | ✅ | ❌ | Consider later |
| RSS/newsletter ingestion | ✅ | ❌ | Consider later |
| Daily Digest / spaced repetition | ✅ | ❌ | Consider — different model |
| Ghostreader (AI assistant) | ✅ | ✅ (Reading Room) | Different approach — grounded synthesis |
| Public annotated links / bundles | ✅ | ❌ | Consider |
| Webhooks / API | ✅ | ❌ | Consider later |
| Swipe customization (mobile) | ✅ | ✅ | Should match |
| Undo-first UX (Z key, toasts) | ✅ | ✅ | Must match |
| Trust/evidence tier display | ❌ | ✅ | **Our advantage** |
| Citation generation | ❌ | ✅ | **Our advantage** |
| Project-aware organization | ❌ | ✅ | **Our advantage** |
| Notebook/synthesis handoff | ❌ | ✅ | **Our advantage** |
| Editor/draft integration | ❌ | ✅ | **Our advantage** |
| Source provenance tracking | ❌ | ✅ | **Our advantage** |
| Cross-source evidence comparison | ❌ | ✅ | **Our advantage** |

**UX Teardown:**
- **Landing screen:** Left sidebar (Home, Library, Feed, Search, pinned Views). Library shows Inbox/Later/Archive tabs.
- **Navigation:** Three-column layout on web. Slim icon rail → content list → context panel.
- **Progressive disclosure:** Strong. Status dots (low-noise indicators) instead of badges. Right rail as tutorial in empty states. Command palette as discovery layer.
- **Cognitive load:** Moderate-to-high for new users (many concepts: Library vs Feed, Views, Locations, Shortlist). Low for power users once learned — keyboard shortcuts surface everything.
- **Onboarding:** "Getting Started" doc inserted into Library. Progressive activation through empty states with contextual instructions. Teaches undo (Z), panel hiding ([ and ]), command palette.
- **Reading view:** Three-pane (TOC left, content center, Info/Notebook/Chat right). Paragraph-level keyboard focus. Side panels hideable. Paged scroll option (vertical pagination).
- **Highlighting:** Keyboard H to highlight, T to tag, N to note. Auto-highlighting toggle (Shift+H). Selection → highlight with zero extra clicks when toggled on.

**Information Architecture (key concept):**
- **One flat database + views as saved queries** — Filtered Views = "smart folders." Avoids folder taxonomy paralysis.
- **Two ingestion lanes:** Library (manually curated, high signal) vs Feed (pushed content, low signal). Prevents RSS/newsletters from polluting curated queue.
- **Content-type as metadata, not navigation silo** — documents share behaviors (tagging, search, export) regardless of format.

**Three-Pane Reading Layout:**
```
┌──────────┬─────────────────────────────┬────────────┐
│ Left     │ Center                      │ Right      │
│ - TOC    │ [paragraph focus indicator] │ Tabs: Info │
│ - Hilts  │ Reading column (720-780px)  │   Notebook │
│          │                             │   Chat     │
└──────────┴─────────────────────────────┴────────────┘
```

**Interaction Patterns:**
| Pattern | What | Why |
|---|---|---|
| Command palette | Cmd/Ctrl+K: search + execute any action | Shortcut discovery, reduces UI clutter |
| Keyboard focus indicator | Arrow keys move paragraph-by-paragraph | Read + annotate without mouse |
| Auto-highlighting toggle | Selection → highlight instantly | Faster annotation |
| Undo-first UX | Z undo + toast undo + shake undo | Move fast with low fear |
| Split views | Tabs by Location or Seen within a view | Simple mental model in advanced filtering |
| Bulk actions | Shift+B acts on everything in list | Replaces multiselect in many cases |

**Infrastructure:**
- Frontend: React SPA (Vite-built), Django templates for marketing
- Backend: Python / Django / Gunicorn
- Hosting: Render.com behind Cloudflare
- CDN: Cloudflare
- Auth: Custom Django auth
- Payments: Stripe
- Analytics: GTM + Google Analytics
- Error tracking: New Relic + Rollbar + Sentry
- PDF viewer: PDFTron (Apryse)

**Strengths:**
- Workflow design, not aesthetic polish — explicit triage, saved-query views, keyboard acceleration, export-first
- "Everything is a document" uniformity across formats
- Content immutability — stores content as-is, privileges annotation stability over "latest version"
- URL-based dedup with green dot for re-saved URLs
- Local-first web app with offline support and configurable caching
- Power user rails: command palette, focus indicator, filtered views, bulk actions

**Weaknesses:**
- No multi-color highlights (tags used as substitute)
- PDF highlights can't span pages
- Extension highlights sometimes don't overlay in Reader
- Limited desktop nativeness / Shortcuts support
- Tag system split: document tags vs highlight tags are separate, no inheritance
- No research-grade provenance or trust assessment
- No project-scoped organization
- No citation generation
- No synthesis/notebook grounded in source set (Ghostreader is general AI, not bounded corpus)
- Can feel overwhelming for non-power users

---

### 3. Instapaper — "Save Anything. Read Anywhere."
**URL:** https://instapaper.com
**Positioning:** Casual-to-moderate readers who want simple read-later across devices.
**Pricing:** Free tier + Premium at $5.99/mo or $59.99/yr. Free: basic save & read. Premium: full-text search, speed reading, unlimited highlights, TTS, send-to-Kindle.

**Feature Inventory:**
| Feature | They Have It | We Plan It | Priority |
|---------|:-:|:-:|---------|
| Save from browser | ✅ | ✅ (via Explore) | Different capture model |
| Clean article view | ✅ | ✅ | Must match quality |
| Offline reading | ✅ | ❌ | Consider |
| Multi-device sync | ✅ | ✅ | Must match |
| Highlighting | ✅ | ✅ | Must match — and exceed |
| Notes on highlights | ✅ | ✅ | Must match |
| Speed reading | ✅ | ❌ | Not planned |
| Kindle/Kobo export | ✅ | ❌ | Consider later |
| Full-text search (premium) | ✅ | ✅ | Must match |
| Folders | ✅ | ✅ (workflow states) | Our advantage |
| Archive | ✅ | ✅ | Must match |
| TTS | ✅ | ❌ | Consider |
| Trust/evidence display | ❌ | ✅ | **Our advantage** |
| Citation generation | ❌ | ✅ | **Our advantage** |
| Project organization | ❌ | ✅ | **Our advantage** |
| Academic paper support | ❌ | ✅ | **Our advantage** |
| PDF support | ❌ | ✅ | **Our advantage** |
| Notebook/synthesis | ❌ | ✅ | **Our advantage** |
| Editor integration | ❌ | ✅ | **Our advantage** |
| Source provenance | ❌ | ✅ | **Our advantage** |

**UX Teardown:**
- **Landing screen:** Simple list of saved articles. Minimal UI.
- **Navigation:** Sidebar with folders. Very simple hierarchy.
- **Progressive disclosure:** Extreme — almost nothing visible. One dominant action (save), one dominant view (list), one dominant interaction (read).
- **Cognitive load:** Very low. "One dominant action, zero confusion."
- **Onboarding:** Minimal. Save something, it appears, you read it, done.
- **Reading view:** Clean, comfortable, customizable themes/fonts. Content-first. Minimal chrome.

**Infrastructure:**
- Frontend: Server-rendered HTML + jQuery (no SPA framework)
- Backend: Python / Tornado
- Hosting: Self-hosted / VPS (likely AWS)
- CDN: AWS CloudFront
- Auth: Custom + reCAPTCHA
- Payments: Stripe
- Analytics: GA4
- Error tracking: Rollbar

**Strengths:**
- Radical simplicity. One job, done well.
- Calm reading experience — the gold standard for "reading should feel like reading"
- Broad device support (iOS, Android, Kindle, Kobo)
- Extremely low cognitive load
- Fast, lightweight, no bloat

**Weaknesses:**
- Architecturally frozen — server-rendered HTML + jQuery, minimal frontend investment
- No power user features (no keyboard shortcuts, no command palette, no views)
- No bulk actions
- Weak organization (basic folders only)
- No academic/research features whatsoever
- No integration ecosystem
- No AI features
- Feels like a 2012 product maintained, not evolved

---

## FEATURE PARITY MATRIX

| Feature | Matter | Reader | Instapaper | ScholarSync (Planned) |
|---------|:-:|:-:|:-:|:-:|
| **Core Reading** | | | | |
| Save from web | ✅ | ✅ | ✅ | ✅ (via Explore) |
| Clean article reader | ✅ | ✅ | ✅ | ✅ (detail page) |
| PDF support | ❌ | ✅ | ❌ | ✅ |
| EPUB support | ❌ | ✅ | ❌ | ❌ |
| Audio/TTS | ✅ | ✅ | ✅ (premium) | ❌ |
| Offline reading | ✅ | ✅ | ✅ | ❌ |
| **Organization** | | | | |
| Tags | ✅ | ✅ | ❌ | ✅ |
| Folders/collections | ❌ | ❌ (views) | ✅ | ❌ (workflow states) |
| Filtered views (saved queries) | ✅ (sort/filter) | ✅ | ❌ | ✅ |
| Workflow states | ❌ | ✅ (3 states) | ❌ | ✅ (7+ states) |
| Project-aware organization | ❌ | ❌ | ❌ | ✅ |
| **Annotation** | | | | |
| Highlighting | ✅ | ✅ | ✅ (premium) | ✅ |
| Notes on highlights | ✅ | ✅ | ✅ | ✅ |
| Keyboard annotation | ❌ | ✅ | ❌ | ✅ |
| **Research-Grade** | | | | |
| Trust/evidence tiers | ❌ | ❌ | ❌ | ✅ |
| Citation generation | ❌ | ❌ | ❌ | ✅ |
| Source provenance | ❌ | ❌ | ❌ | ✅ |
| Academic paper metadata | ❌ | ❌ | ❌ | ✅ |
| Cross-source comparison | ❌ | ❌ | ❌ | ✅ |
| **Workflow Integration** | | | | |
| Notebook/synthesis handoff | ❌ | ❌ | ❌ | ✅ |
| Editor/draft integration | ❌ | ❌ | ❌ | ✅ |
| Cite-in-editor | ❌ | ❌ | ❌ | ✅ |
| "From your library" in search | ❌ | ❌ | ❌ | ✅ |
| **Power User** | | | | |
| Command palette | ❌ | ✅ | ❌ | ✅ |
| Keyboard-first reading | ❌ | ✅ | ❌ | ✅ |
| Bulk actions | ✅ | ✅ | ❌ | ✅ |
| Undo-first UX | ❌ | ✅ | ❌ | ✅ |
| Export (Markdown/notes) | ✅ (Kindle) | ✅ (templates) | ✅ (Kindle) | ✅ (citation + notebook) |

**Key differentiator:** ScholarSync Library is the only product combining trust/evidence assessment, citation generation, project-aware organization, notebook/synthesis handoff, and editor integration. No competitor offers even one of these five capabilities.

---

## DESIGN INSPIRATIONS

### 1. ScholarSync Editor (Internal) — Stealing: Typography, color system, warm editorial aesthetic

**Visual DNA:**
- **Layout:** Centered 720px content column with generous padding (40px top, 80px bottom). Resizable sidebar (180-320px, default 248px). Three-region: sidebar + content + optional reference panel (320px).
- **Typography:**
  - Serif body: Source Serif 4 (17px, line-height 1.78, letter-spacing 0.005em) — academic, warm
  - Sans UI: DM Sans (13-14px for UI labels, 12px for small text)
  - Monospace: JetBrains Mono (14px for code)
  - Heading scale: H1 2em/700, H2 1.5em/600, H3 1.25em/600
- **Colors:**
  - Light: bg #FAFAF8 (warm cream), text rgb(55,53,47) (warm charcoal), surface-raised #F0F0EC
  - Dark: bg #1C1B1A (deep charcoal), text #EDEBE8 (warm off-white), surface-raised #2A2826
  - Brand: #6D28D9 (purple), dark mode #8B7BF4 (lighter purple)
  - Borders: rgba-based at 8% opacity (light) / 10% opacity (dark) — extremely subtle
  - Trust colors: Government #16A34A, Journalism #2563EB, Community #D97706
- **Motion:**
  - Standard: 200ms cubic-bezier(0.4, 0, 0.2, 1)
  - Buttons: 0.15s ease (snappy)
  - Active states: 0.08s (instant feel)
  - Spring curve for dramatic actions: 250ms cubic-bezier(0.34, 1.56, 0.64, 1)
  - Selection toolbar: 150ms fade-in with translateY(4px) + scale(0.97)
- **Density:** Spacious. Generous whitespace. Designed for focused work.
- **Glass panels:** backdrop-filter blur(16px light / 12px dark), 85% opacity surfaces
- **Sidebar:** Dark charcoal (#1E1D1C) with nav items at rgba(255,255,255,0.5). Active: 3px left border in brand purple. Section labels: 10px uppercase, 0.08em letter-spacing.
- **Icons:** Phosphor Icons primary, 18px sidebar / 16px toolbar / 14px tiny.

**Patterns to Steal for Library:**
1. **Warm cream/charcoal palette** — Library must feel like the same app. Use identical --bg, --surface, --ink, --border tokens.
2. **Source Serif 4 for source titles in detail view** — creates visual continuity with editor. DM Sans for UI chrome.
3. **720px content column for reader view** — proven readable width for detail pages.
4. **Glass panel pattern** — for floating toolbars, command palette, quick-peek overlays.
5. **Purple brand accent for active states** — consistent with sidebar active indicator (3px left border).
6. **Subtle borders (8% opacity)** — avoids harsh visual noise. Library cards should use same border treatment.
7. **Spring-curve animations for appearing panels** — detail page slide-in, command palette open.

---

### 2. Arc Browser — Stealing: Sidebar-as-workspace, Spaces (project contexts), command bar, quick-peek, progressive disclosure

**Visual DNA:**
- **Layout:** Collapsible left sidebar IS the workspace. Content fills remaining space. Sidebar auto-hides for distraction-free mode.
- **Typography:** Clean sans-serif. Hierarchy via weight and size, not color.
- **Colors:** Each Space gets its own theme color. Muted/bright palette, not saturated corporate.
- **Motion:** Smooth, fast, platform-native gestures. Everything feels crafted.
- **Density:** Generous negative space. Soft rounded corners. Mental calm aesthetic.

**Key UX Patterns:**

| Pattern | Arc Implementation | Library Translation |
|---|---|---|
| **Three-tier hierarchy** | Favorites > Pinned > Today | Global tools > Project-pinned sources > Recently saved |
| **Universal command bar** | Cmd+T does everything | Cmd+K searches library + notes + databases + commands |
| **Auto-archiving ephemera** | Today tabs vanish after 12h | Unused sources auto-suggest archival after N weeks |
| **Color-coded contexts** | Each Space has a theme color | Each project gets a subtle color accent |
| **Saveable compositions** | Split views become named tabs | "Reading desk" layouts (paper + notes) saved and nameable |
| **Quick-peek with promotion** | Little Arc popup → promote to full tab | Hover-preview source → one click to open detail page |
| **Progressive disclosure via doing** | 90-second hands-on onboarding | First save triggers contextual guidance |
| **Sidebar as workspace** | Not navigation — IS the workspace | Library sidebar is the research cockpit |
| **Opinionated defaults** | Auto-archive is default | Default to "Inbox" state; user opts into "Core" status |

**Patterns to Steal for Library:**
1. **Sidebar as research cockpit** — show workflow states, active project, recent activity. Answer "where am I in my work?"
2. **Command palette (Cmd+K)** — unified search across library corpus, notes, projects, app commands.
3. **Quick-peek / Little Arc** — hover on source reference → floating preview card → one button to open full detail.
4. **Project-as-Space** — each project gets color accent and filtered library view. Switching projects = switching Spaces.
5. **Three-tier source hierarchy** — Global (all) > Project-pinned (core evidence) > Recent (inbox/ephemeral).
6. **Auto-archive suggestion** — sources saved but unused for N weeks auto-suggest archival.
7. **Progressive onboarding** — first save triggers "Your source is here now" with one-step annotation prompt.

---

### 3. Landing Page Palette — Stealing: Brand color system, warmth, product differentiation colors

**Visual DNA:**
- **Hero:** White → warm cream (#F2F0EB) → card (#E9E5DD) → dark purple (#1E1145)
- **Brand purple:** #6D28D9 primary, #5B21B6 hover, rgba(109,40,217,0.08) tint
- **Ink system:** #241013 base with 65% and 45% opacity variants
- **Product colors:** Amber-700 (Discover), Green-700 (Learn), Blue-700 (Research), Lime-700 (SR), Slate-600 (LaTeX), Cyan-700 (Stage), Red-600 (Canvas)
- **Stat accents:** Deep green (#0a6847), muted blue (#4a7ab5), warm gold (#d4b060), muted rose (#c06090)
- **Gradients:** Purple + blue radial for hero. Violet-300 → Cyan-300 → Purple-200 for CTA text.

**Patterns to Steal for Library:**
1. **Warm background (#FAFAF8)** — not pure white. Matches editorial identity.
2. **Product accent color for Library** — needs its own from the differentiation palette.
3. **Purple as action color only** — CTAs, active states, focus rings. Not decoration.
4. **Ink opacity system** — #241013 base with 65%/45% for text hierarchy in cards.

---

## IDENTITY SYNTHESIS

Blending the inspirations above, ScholarSync Library should feel like:

> **"Library should feel like the Editor's calm, warm editorial aesthetic meets Arc's sidebar-as-workspace intelligence with Readwise Reader's keyboard-first power. Unlike Matter (which feels like a polished consumer reading queue) or Instapaper (which feels like a 2012 bookmark manager), ScholarSync Library should feel like a research cockpit — warm, spacious, deeply organized by project, and always one step from turning a saved source into a cited argument."**

**Derived Design Direction:**

| Dimension | Source | Implementation |
|---|---|---|
| **Layout model** | Editor (720px column) + Arc (sidebar-as-workspace) | Resizable sidebar (workflow states + project nav) + centered content. Detail pages use 720px reading column. |
| **Speed/motion model** | Editor (200ms standard, 0.08s active) | Same timing tokens. Spring curves for panel appearances. Instant feel. |
| **Typography model** | Editor (Source Serif 4 + DM Sans) | Source Serif 4 for source titles and reader view. DM Sans for UI chrome. JetBrains Mono for DOIs. |
| **Density model** | Editor (spacious) + Arc (generous whitespace) | Spacious list items. Progressive disclosure hides metadata until detail view. |
| **Color model** | Landing palette + Editor tokens | Warm cream bg (#FAFAF8), warm charcoal text, purple brand accent. Trust colors (green/blue/amber) for source quality. |
| **Navigation model** | Arc (command palette + sidebar + quick-peek) | Cmd+K command palette. Sidebar as cockpit. Quick-peek for references. Project switching like Arc Spaces. |
| **Interaction model** | Readwise Reader (keyboard + undo-first) | H highlight, T tag, N note. Z undo. Command palette for everything. Bulk actions. |
| **Organization model** | Arc (three-tier) + Reader (views as queries) | Workflow states as primary. Projects as scoping. Saved views as queries. No manual folders. |

---

## CURRENT STATE: ScholarSync Library Module

### Architecture Assessment

The current Library is a **single 881-line monolithic page component** with:
- **24 useState hooks** — view control, data, loading, search, filters, citations, upload, PDF viewing
- **4 useCallback, 5 useEffect, 3 useMemo** — all co-located in one file
- **No sub-routes** — no detail pages, no drill-down. Everything is modals/overlays.
- **Two modes:** Papers and Web Sources, toggled by a switch

### Current Layout
```
┌────────────────────────────────────────────────────┐
│ Collections Sidebar (264px)  │  Main Content       │
├──────────────────────────────┤  Search + Sort       │
│ • Papers/Web toggle          │  Filter row          │
│ • All Papers (count)         │                      │
│ • Favorites (count)          │  Paper/Source Cards   │
│ • Collections (dynamic)     │  (flat list)          │
│ • Upload PDF button          │                      │
│ • New Collection button      │                      │
│   (non-functional)           │                      │
└────────────────────────────────────────────────────┘
```

### What Backend Already Supports (Hidden from UI)
**Papers:** dedup, enrichment, abstract chunking, embeddings, PDF pipeline, favorites, deletion, project-linked filtering, notes, tags
**Web Sources:** save state, archive state, extraction (Readability/Firecrawl), reader content storage, project linking, highlights, notes, restore, ownership checks, trust tier, metadata (rrfScore, rerankScore, platform, engagement)

### Key Gaps vs. Redesign Vision
- No detail pages (everything is modals)
- No workflow states (only favorites + collections)
- No keyboard shortcuts
- No command palette
- No bulk actions
- No URL-persisted filter state
- No pagination
- No reading progress
- No annotation UI in library (highlights stored but hidden)
- Notes and tags stored but not surfaced
- "New Collection" button has no behavior
- Sidebar is papers-first even in web-sources mode
- Sort control offers fake options in web-sources mode

---

## OPEN QUESTIONS FOR UX BRIEF

- [ ] **Audio/TTS**: Both Matter and Reader have TTS. Must-have for V1, or defer?
- [ ] **Offline support**: All competitors offer offline reading. Required for your users?
- [ ] **Newsletter/RSS ingestion**: Matter and Reader ingest newsletters. Needed, or does Explore cover discovery?
- [ ] **Library's product accent color**: Each module has a color on the landing page. What color represents Library?
- [ ] **Mobile-first or desktop-first?**: Reader and Matter are mobile-strong. Editor is desktop-strong. Where does Library live primarily?
- [ ] **Multi-format support**: Reader handles articles, PDFs, EPUBs, videos, podcasts. How many formats for Library V1?
- [ ] **Sharing/collaboration**: Reader has public annotated links. Is source sharing relevant?
- [ ] **Export strategy**: Reader exports to Obsidian/Notion. Your flow is Library → Reading Room → Editor. External export needed too?
- [ ] **Reading progress tracking**: Both competitors track progress. Important, or is read/unread sufficient?
- [ ] **Highlight colors**: Reader has none (uses tags). How many highlight colors/types?
- [ ] **Auto-archive behavior**: Arc auto-archives after 12-24h. Should Library auto-suggest archiving unused sources?
- [ ] **Content immutability vs freshness**: Reader stores as-is. Should Library freeze snapshots or offer "refresh content"?

---

*This research feeds into `.planning/decisions/2026-04-01-library-module-redesign.md`. Next: Run `/ux-brief` to design the UX, or `/grill-me` to stress-test the open questions.*
