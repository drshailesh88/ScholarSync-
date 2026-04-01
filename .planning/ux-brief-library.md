# UX Brief: ScholarSync Library Module
**Date:** 2026-04-01
**Source:** UX interview + competition research (Matter, Readwise Reader, Instapaper) + design inspiration extraction (Editor, Arc Browser, Landing Page)
**Status:** COMPLETE — ready for UI brief and frontend development

---

## App Identity

- **Vibe:** Quiet authority — intelligent, elegant, calm, powerful, premium. "Part editor's desk, part research studio, part trusted archive."
- **Personality:** Well-read, organized, understated, discerning, helpful without hovering, slightly editorial in taste. More Financial Times than Product Hunt.
- **Core feeling:** "I can think here. I trust what I save here. This app respects the seriousness of what I'm doing."
- **Not like:** Roam (compulsive collecting), Notion with AI sprayed on, Pinterest for links, dopamine dashboard, student homework tool, noisy second-brain app, startup AI demo, generic productivity app, bookmark manager, read-later inbox, file manager, Excel sheet, database, folder cemetery, social content app
- **Product voice:** Terse, exact, adult, confident. Not enthusiastic, not "helpful companion," not therapy-bot warm. Example: "24 results. 6 from your library." NOT "Awesome, we found some great results for you!"
- **Primary user:** Newsletter writer / essayist / long-form writer who turns saved sources into publishable output every week. Secondary: policy analyst preparing briefs. Tertiary: clinician reviewing sources. This ordering forces Library to be broad, not paper-first.
- **Device priority:** Desktop-first. Library is a deep-work surface. Pages must still be loadable on mobile phones.
- **Color mode default:** Light (matches Editor, warm cream #FAFAF8). Dark mode available, one click away, remembers user choice.

## Design DNA (from inspirations)

- **ScholarSync Editor:** Stealing warm editorial aesthetic — Source Serif 4 + DM Sans typography, #FAFAF8 cream bg, purple brand accent (#6D28D9), glass panels, 720px content column, spring-curve animations, spacious density
- **Arc Browser:** Stealing sidebar-as-workspace, project-as-Space with color accents, command palette (Cmd+K), quick-peek on click, three-tier hierarchy (global > project-pinned > ephemeral), progressive disclosure via doing, opinionated defaults
- **Readwise Reader:** Stealing keyboard-first interaction (H/T/N shortcuts), undo-first UX (Z key + toasts), filtered views as saved queries, status dots as low-noise indicators, three-pane reading concept (adapted to single-column + collapsible workbench)
- **Bear:** Stealing calm, restraint, breathing room, editorial typography, sense of personal space
- **Linear:** Stealing clarity, decisiveness, one strong primary action, clean hierarchy, confidence in what user should do next
- **Matter:** Stealing reading surface restraint (reading screen = attention, not software), frictionless highlighting, premium editorial feel

## Navigation

### App-level sidebar behavior
- **Auto-collapse when Library opens** (matches Editor behavior). User opts in to see sidebar by hovering/clicking icon.
- Rationale: No distraction during deep work. If people want the sidebar, they move to the icon and open it.

### Library internal navigation — Three Layers

**Layer 1: Left sidebar (Places — "What part of my library am I entering?")**
- Inbox
- Core
- Background
- Archived
- All Sources
- Projects (expandable, each project listed)
- Trash

**Layer 2: Top header/subnav (Lenses — "What kind of material am I looking at?")**
- All / Papers / Web / PDFs / Highlights
- If project is active: project name pill, project-scoped tabs (Sources / Highlights / Citations)

**Layer 3: Results toolbar (Filters — "How do I narrow what I'm seeing right now?")**
- Search
- Sort
- Project filter (if not already scoped)
- Year range
- Source type
- Trust tier
- Unread / has notes
- Clear filters
- Bulk actions (when items selected)

**Organizing principle:** "Is this a Place, a Lens, or a Filter?" Place → sidebar. Lens → top subnav. Filter → toolbar.

### URL-backed navigation
All navigation state must be URL-backed:
- `/library/inbox`
- `/library/core`
- `/library/archived`
- `/library/projects/[id]`
- `/library/inbox?type=web&sort=recent`
- `/library/projects/12?type=papers&yearMin=2020`

Shareable, back-button works, state survives refresh.

### Project switching
- **Feels like a context switch, not a filter application.** Like walking into another room of the same building.
- Prominent project context switcher in header: `All Library` or `Project Atlas`
- On switch: URL changes, page title changes, result set changes, sidebar counts update, search placeholder changes to "Search in Project Atlas..."
- **Stays stable:** sidebar structure, content tabs, search/action placement, layout
- **Resets:** free-text search query, ad hoc filters (year, study type)
- **Preserves:** content type tab, view density, display preferences
- Always provide: visible "All Library" option, breadcrumb/project pill, clean way to jump between recent projects

---

## Library Module Decisions

### Empty State (First Open)
- **Model:** Invitation into the mature Library, not an empty version of it
- **Feeling:** "A beautiful room waiting for the first book on the shelf"
- **Left sidebar:** Show structure in quiet/zero-state form (Inbox 0, Core 0, Archived 0, Projects 0). Do NOT show dead collections or "New Collection" as first action.
- **Main panel:** Single centered hero state with Library chrome temporarily muted

**Content:**
- Title: **"Start your library with one good source"**
- Subtitle: "Bring in an article, paper, or PDF. We'll keep it organized and ready for reading, highlighting, and writing."
- Three primary actions (in this order):
  1. **Explore sources** (drives full product loop: search → save → library)
  2. **Paste a link**
  3. **Upload PDF**
- Helper text: "Supports web articles, academic papers, PDFs, and sources saved from Explore."
- Secondary strip: **Save → Read → Highlight → Use in Notebook / Cite in Draft**
- Optional: One ghosted example source card (title, domain, trust label, note count, highlight count)

**Do NOT show:** full filter bar, year filters, study type filters, empty sort dropdown, collections, lots of zeros, "create collection," big empty table, multiple tabs that do nothing

### Top 3 Actions (by importance)
1. **Re-find and resume a saved source quickly** — the most visible thing on screen. A prominent command-style search bar: "Search sources, notes, highlights, and citations." NOT "filter this page."
2. **Open, read, and annotate a source** — frictionless open → read → highlight → note → return later. This makes people stay.
3. **Triage sources between workflow states** — move items between Inbox → Core → Background → Archived. Stronger than collections.

Actions 4-6 (important but not top-level):
4. Send to Reading Room / cite in Editor (downstream action, matters after source earns its place)
5. Filter by project (context, not heroic action)
6. Traditional filter controls (secondary, never dominate first screen)

### Library Home Screen
**Principle:** Home is for momentum. Not completeness, not taxonomy, not administration.

**Structure:**
```
┌─────────────────────────────────────────────────────┐
│ Command Bar: "Search sources, notes, highlights..."  │
├───────────────────────────┬─────────────────────────┤
│ Main Column               │ Secondary Rail          │
│                           │                         │
│ 1. Continue Reading       │ 5. Ready to Cite        │
│    (1-3 items, resume)    │    (citation-ready,     │
│                           │     not yet cited)       │
│ 2. For Your Active        │                         │
│    Project                │ 6. Recently Highlighted │
│    (project name, 2-4     │    (snippet, source,    │
│     items, counts)        │     jump back)          │
│                           │                         │
│ 3. Needs Review           │ 7. Sent to Notebook     │
│    (unread, high-signal,  │    (trace/status)       │
│     never opened)         │                         │
│                           │                         │
│ 4. Recently Saved         │                         │
│    (5-7 items max)        │                         │
├───────────────────────────┴─────────────────────────┤
│ Sidebar: Workflow states (Inbox, Core, Background,   │
│          Archived, Projects, All Sources, Trash)     │
└─────────────────────────────────────────────────────┘
```

Archived does NOT appear on home screen. It belongs in sidebar navigation only.

### Source Cards
**Hierarchy for default list card:**
1. Title
2. Workflow state (Inbox/Core/Background/Archived)
3. Source / domain / journal
4. Read / unread status
5. Project it belongs to
6. Trust / evidence tier indicator
7. Date saved
8. Snippet / abstract preview (1-2 lines max)
9. Publication date
10. Authors (muted, secondary)
11. Source type (often redundant if iconography is strong)
12. Highlight count (better in detail view)

**Default card layout:**
```
Line 1: Title
Line 2: Source/journal · Project · Workflow state
Line 3: Unread/Reading/Read · saved 3d ago · trust tier
Line 4: (optional) One-line snippet
```

**For papers specifically:** Journal, workflow state, read status, project, saved date. Authors in muted text or expanded row. Do NOT lead with citation count.

**For web/news/discussion:** Domain/publication, workflow state, read status, project, saved date, trust tier, one-line snippet.

**Demoted from current cards:** Authors, citation count, study type — belong in detail view, not universal card hierarchy.

### Opening Sources for Deep Reading
- **Primary action (card click/Enter):** Navigate to full detail page (`/library/item/[id]`)
- **Secondary action (eye icon / Space key):** Click-to-preview popover (NOT hover — hover is annoying for serious work, doesn't exist on touch)
- **Escape hatch:** "Open original" opens source URL externally
- **Modal retired from primary reading.** Current PDF overlay modal is demoted.
- **External new tab retired as default for web sources.** Web sources open in internal reader, not browser tab.

**Rule:** All saved sources are internal-first. The web/original source is external-second.

**Preview contents (click-to-peek):**
- Title, source/journal/domain, project, workflow state, read status, trust tier
- One-line snippet/abstract
- Actions: Open fully, Archive, Add to project, Send to Reading Room

### Source Detail / Reader Page
**Layout: Option C — Single-column with collapsible right workbench**

```
┌─────────────────────────────────────────────────────┐
│ Header: breadcrumb · title · source · state · actions│
├─────────────────────────────────┬───────────────────┤
│                                 │ Right Workbench   │
│   Reading Column (720px)        │ (collapsible)     │
│   centered                      │                   │
│                                 │ Tabs:             │
│   [content with inline          │ - Notes           │
│    highlights]                  │ - Metadata        │
│                                 │ - Highlights      │
│                                 │ - (Chat later)    │
│                                 │                   │
├─────────────────────────────────┴───────────────────┤
│ (No permanent left TOC pane — use floating/jump menu)│
└─────────────────────────────────────────────────────┘
```

**Three reading modes:**
1. **Focus mode** (default on open): Right panel hidden, header minimized, text centered, maximum calm
2. **Working mode:** Right workbench open, user highlights, writes notes, checks metadata
3. **Synthesis handoff mode:** Selected highlights/summary ready to send to Reading Room or Editor

**Top header bar (compact, sticky):**
- Breadcrumb: Library / Project / Source
- Source title, origin (domain/journal)
- Workflow state
- Quick actions: mark Core, archive, cite, send to Reading Room, open original

**Reading column:**
- Web sources: cleaned article content, title/subtitle, author/publication/date, reading progress, inline highlights
- Papers: same shell — abstract + metadata at top, toggle between Abstract / Full text / PDF
- One shell across source types. Differences only in content rendering.

**Right workbench panel:**
- Slides in, default closed
- Tabs: Notes, Metadata, Highlights, (Chat later)
- Notes linked to highlights: highlight text → note in workbench, clicking note jumps to source, clicking highlight opens related note

**TOC:** Not a permanent left rail. Use floating "Contents" button or jump menu in header.

**Principle:** "The source detail page should feel like a reading page first and a research workspace second, with the workspace always one gesture away."

### Workflow States

**4 primary states (mutually exclusive — every source has exactly one):**

| State | Meaning | Icon |
|-------|---------|------|
| **Inbox** | Saved, not yet triaged | inbox tray |
| **Core** | Important source for current project/question | pin |
| **Background** | Useful context, not central evidence | layers |
| **Archived** | Done for now, preserved but out of active flow | archive box |

**4 derived badges (NOT mutually exclusive — a source can have several):**

| Badge | Meaning | Icon |
|-------|---------|------|
| **Unread / In Progress / Read** | Reading progress status | dot / open book |
| **Annotated** | Has highlights or notes | pencil |
| **Cited** | Explicitly cited in writing | quote marks |
| **In Notebook** | Attached to Reading Room / notebook | notebook |

**Important distinctions:**
- "Reading" is NOT a primary state — it's activity status (derived from recently opened + not finished). Surfaces in "Continue reading" on home.
- "Annotated" is NOT a primary state — it's a derived badge. A source can be Core AND Annotated AND Cited.
- "Cited" ≠ "In Notebook" — citing in writing is different from attaching to a notebook.
- "Unread" ≠ "Inbox" — Inbox = not triaged. Unread = not read. A source can be Core + Unread.

**State machine:**
- On save → Inbox + Unread
- After opening → stays Inbox, read status becomes In Progress or Read
- After triage → user chooses Core or Background
- Later → can become Archived
- Badges accumulate: Annotated, In Notebook, Cited

**Sidebar shows:** Only primary states (Inbox, Core, Background, Archived, All Sources)
**Filters/chips show:** Badges (Unread/In Progress/Read, Annotated, Cited, In Notebook, Project, Source type, Trust tier)

### Bulk Actions

**Ship first (front and center in contextual bar):**
1. Move to state
2. Add to project
3. Send to Reading Room

**Ship next (under "More" overflow):**
4. Export citations
5. Mark read / unread
6. Delete

**Deprioritized:** Tag (workflow states + projects + source type + trust tier reduce need for tags)

**Bulk action bar:** Clean contextual bar when items selected: `Move to… | Add to project | Send to Reading Room | More ▾`

**Mixed selections:** Bulk actions work on mixed paper + web selections when semantically valid. Export citations may be limited to citation-ready sources.

### Command Palette (Cmd+K)

**Grouped results, in this order:**
1. **Sources** (search by title)
2. **Highlights & Notes** (search by highlight/note text)
3. **Projects** (fast project switching)
4. **Commands** (Go to Library, Go to Explore, Upload PDF, Open Trash, Toggle view mode, etc.)
5. **Search in Explore** (fallback: "Search in Explore for '…'")

**NOT in default results:** Full text of saved sources (too noisy in mixed results)

**Full-text search:** Available as explicit secondary mode — press modifier, tab into "Full text" filter, or select filter chip inside Cmd+K.

**Principle:** Cmd+K should feel like a sharp command surface, not a messy search engine.

### Quick-Peek Preview
- **Trigger:** Click only (eye icon on card, or Space/Shift+Enter on focused card). NOT hover.
- **Format:** Lightweight popover or side peek
- **Contents:** Title, source/journal/domain, project, workflow state, read status, trust tier, one-line snippet, actions (Open fully, Archive, Add to project, Send to Reading Room)
- **One click from preview → full detail page**

---

## Content Density

- **Default:** Spacious-comfortable (editorial list, not oversized cards). Title + essential metadata + one-line snippet + clear action affordances + enough spacing to feel premium.
- **Alternate:** Compact (user toggle, top-right of results area). For scanning, triage, bulk work. Still shows title, source/journal, state, read status, project. No snippet by default. Actions on hover/selection.
- **Persisted:** Per user. Never auto-switches based on item count.
- **Rule:** Two honest densities, both fully usable. Detail page for real depth. Do NOT use expand/collapse per row.

## List Behavior
- **Pattern:** Load more button. Show first 20-30 items, then "Show 20 more" with counter: "20 of 143 sources shown"
- **Technical:** Virtualization under the hood if needed for performance
- **NOT infinite scroll** (Library is not a feed), **NOT pagination** (page numbers are arbitrary and feel like a database)
- Same behavior when search/filters are active.

## View Modes
- **List** (default): Best for mixed source types, reading-oriented, premium editorial tone
- **Table** (secondary toggle): Dense, sortable, power-user mode for large libraries, bulk triage, metadata scanning
- **No Grid** (sources are text objects, not visual), **No Board** (too niche, too early, pushes toward task-management feel)
- **Both views share same source model:** title, source/journal, workflow state, read status, project, trust tier, saved date
- **Table columns:** Open question — needs founder input on default visible columns and whether columns are user-configurable

---

## Motion and Feedback

### Save from Explore
**Layered feedback (all three, in order):**
1. **Animated button** → transforms to checkmark + "Saved" (instant, local)
2. **Toast with action** → "Saved to Library" with `Add to Project` · `Open` (2.5-4 seconds)
   - Context-aware: if inside a project, "Saved to Project Atlas" with `Open source`
3. **Sidebar badge update** (ambient, background)

### State Transitions (Inbox → Core)
**Card animation + Undo toast:**
- In filtered view (e.g., viewing Inbox): card slides/fades out of list + toast "Moved to Core — Undo"
- In All Sources view: card stays in place, state badge updates + toast "Moved to Core — Undo"
- Rule: Animate when item leaves current view. Update in place when it still belongs.

### Deletion
**Move to Trash + Undo toast:**
- Card fades/slides out
- Toast for 5-8 seconds: "Moved to Trash — Undo"
- Bulk: "5 sources moved to Trash — Undo"
- Trash retention: 30 days, sidebar destination, allows restore
- Permanent delete: Only from Trash, with confirmation dialog
- No confirmation dialog for normal single-item delete (too bureaucratic)

### Loading States (priority order)
1. **Optimistic / cached first** — for filter/sort/project changes, keep current results visible, update quietly
2. **Skeleton cards** — for first open, new project scope, loading more. Library-shaped skeletons (icon + title + metadata lines + action row)
3. **Spinner** — only for tiny local waits (button action, upload, citation formatting). Never for replacing the whole list.

**Rule:** Never collapse the interface unless you truly have nothing to show.

---

## Section F: Competition Research Open Questions — Resolved

| # | Question | Answer |
|---|----------|--------|
| F1 | Audio/TTS | **Defer in Library V1.** Build TTS in Reading Room first. Design reader page so audio can slot in later. |
| F2 | Offline support | **Not needed.** Users mostly work online. |
| F3 | Newsletter/RSS | **Separate module** (Feedly clone). Not in Library. |
| F4 | Mobile vs desktop | **Desktop-first.** Pages must still load on mobile. |
| F5 | Content formats V1 | Papers + web sources + PDF upload + TXT + PUB. No EPUB. |
| F6 | Public sharing | **No for V1.** Too many privacy/permission edge cases. |
| F7 | External export | **Not required V1.** Library → Reading Room → Editor is enough. Add basic export option. |
| F8 | Reading progress | **Yes, important.** Keep lightweight (Unread / In Progress / Read). |
| F9 | Highlight colors | **1 default color V1.** Optionally 1 secondary "important" style. No rainbow. Tags available. |
| F10 | Auto-archive | **Suggest, don't auto-move.** Surface suggestions for unused sources after N weeks. Never move automatically. |
| F11 | Content immutability | **Freeze snapshot at save time AND offer manual refresh.** |
| F12 | "From your library" in Explore | **Prominent.** Top of results, just under search bar. Compact: 3-5 items + "View all." Not side panel, not subtle badge. |

---

## Rules (extracted from interview)

1. **Library is a working archive, not storage.** Not bookmarks, not read-later, not a database. A place where saved things gain meaning and stay usable.
2. **Home is for momentum.** The home screen answers: what should I resume, what matters for my current project, what deserves attention next. Everything else supports those three.
3. **Re-find and resume is the #1 job.** The command bar is more important than any list, filter, or card.
4. **All saved sources are internal-first.** Deep reading opens detail pages, not external tabs or modals.
5. **The reading page is a reading page first, workspace second.** Default to focus mode. Workbench is one gesture away.
6. **4 primary states, 4 derived badges.** States are mutually exclusive places. Badges accumulate. Never conflate them.
7. **Project is context, not a filter.** Switching projects is a context switch (URL changes, heading changes, search re-scopes), not applying a dropdown filter.
8. **Place / Lens / Filter.** Every control belongs to exactly one of these layers. Place → sidebar. Lens → top subnav. Filter → toolbar.
9. **Never auto-rearrange.** No auto-compact, no auto-archive. Suggest, don't force. Serious products don't rearrange themselves behind the user's back.
10. **Cards answer: what is this, where is it from, where does it sit in my workflow, have I worked on it, what project does it belong to.** Workflow state and read status rank above authors and citation count.
11. **Deletion is forgiving.** Trash with 30-day retention. Undo toast for immediate recovery. Permanent delete only from Trash with confirmation.
12. **Never collapse the interface unless you truly have nothing to show.** Optimistic UI first, skeletons second, spinners third.
13. **Build for people who take ideas seriously.** If a design choice makes the app louder, trendier, or more "AI product-ish," it is probably wrong.

---

## Open Questions

- [ ] **Table view columns:** Which columns visible by default? User-configurable (show/hide)?
- [ ] **Keyboard shortcuts for reader page:** Beyond Cmd+K, what shortcuts for the detail reader? (H highlight, N note, Esc close panel, [ ] toggle workbench?)
- [ ] **"Needs review" algorithm:** What signals determine "high-signal unused sources"? Trust tier? Source type? Metadata completeness?
- [ ] **Reading progress tracking implementation:** Scroll-position based? Manual mark? Time-on-page?
- [ ] **Library module accent color:** What color from the product differentiation palette represents Library?

---

*Feeds into: `.planning/decisions/2026-04-01-library-module-redesign.md` and `.planning/competition-research-library.md`*
*Next: Run `/playbook:ui-brief` to define the visual language, or `/write-a-prd` to create the formal PRD.*
