# Planning Session: Library Module Redesign — From Utility Page to Crown Jewel
**Date:** 2026-04-01
**Source:** AI planning conversation (multi-round deep dive)
**Status:** captured

## Context
Library module works but was built without product design, UX architecture, or information architecture decisions. With Explore now expanded beyond medicine to general population, Library must be elevated to match Explore's quality and become the "custody and reuse layer" in a coherent research operating system. The goal is to make Library so good that deep workers (writers, researchers, newsletter authors, essayists, book authors) default to ScholarSync over Google, Instapaper, and Readwise Reader.

## Key Decisions Made

1. **Library is NOT a read-later app — it is a research source system.** Rationale: Competing with Instapaper/Readwise on "save and read later" is a losing position. The differentiation is "save things to think with" not "save things to read later." Rejected: making Library a better Instapaper clone, feature-parity chasing with Reader.

2. **Three modules = three phases of one research system, not three pages.** Explore = acquisition. Library = custody. Reading Room = synthesis. The user journey is find → keep → think → write. Rejected: treating modules as independent tools, making Library "look like Explore."

3. **Library needs a product model, not just better UI.** Current Library is a single oversized client page owning papers data, web-source data, filters, uploads, citations, PDF viewer, favorites, collections, deletes, archiving, and rendering all at once. It's a screen, not a module. Rejected: cosmetic restyling without architectural change.

4. **Library should be multiple surfaces, not one page.** Three target surfaces:
   - `/library` — command center (recent saves, pinned collections, reading queue, project-linked subsets, workflow states)
   - `/library/papers/[id]` — paper workspace (metadata, abstract, PDF/OA view, citation tools, notes, project links, related items)
   - `/library/sources/[id]` — web-source reader (extracted content, highlights, notes, trust context, project links, archive state)
   Rejected: keeping everything as modals/overlays on one list page.

5. **Replace collections/folders with workflow states.** Use states like: Inbox, Reading now, Core evidence, Background, Annotated, Cited, Archived, Unread, Needs review. Rejected: manual collections, favorites-only organization, "New Collection" button without product model.

6. **Projects should be the organizing spine, not collections.** A project gives context to active questions, preferred domains, saved searches, selected sources, notebooks, drafts, citations. The navigation model should be: Global (Home, Projects, Library, Settings) → Inside Project (Discover, Sources, Notebook, Draft). Rejected: flat app-wide navbar of disconnected tools.

7. **Unified source model across papers and web sources.** One canonical Source entity with `source_kind` (paper/web/news/discussion/pdf/transcript/video), not two parallel systems awkwardly sharing a page. Rejected: keeping papers and web sources as completely separate data models with different UX.

8. **Library must feed back into Explore as active memory.** Explore should search in two directions: outward (web/academic/news) AND inward (user's saved corpus, highlights, notes, notebook outputs, prior search history). "From your library" block should appear at top of Explore results. Rejected: keeping Explore and Library as separate universes joined only by a save button.

9. **Design for re-entry, not just capture.** Library home should open to orientation (continue reading, recently saved, unread but high-signal, active project sources, recently highlighted, unused but high-signal, ready to cite) — NOT a generic list. Rejected: opening to a dumb list of saved things.

10. **The positioning line: "Instapaper saves things to read. Readwise Reader saves things to remember. ScholarSync Library saves things to think with."** Rejected: "AI-powered read-later," "better bookmarks," "prettier article reading."

## Open Questions

- [ ] What is the canonical saved object model implementation? Unified Source table with subtypes, or federated tables with shared identity?
- [ ] What is the exact data model for ProjectSource roles (saved/core/background/excluded/cited)?
- [ ] How should Library search feed into Explore ranking? Embedding similarity? Keyword overlap? Manual tagging?
- [ ] What is the right trust/evidence grammar for non-medical domains (journalism, policy, essays, books)?
- [ ] How should reading progress be tracked and surfaced?
- [ ] What is the notebook ↔ library source-set contract?
- [ ] How to handle "what's new since last search" change detection?
- [ ] Should there be a "reading queue" concept separate from Inbox?
- [ ] What is the migration path from current single-page Library to multi-surface architecture?

## Constraints & Requirements

- Medicine is default. No domain param = current behavior unchanged (existing rule).
- Annealing score must stay FROZEN (>95). 139 E2E tests must pass.
- Backend is ahead of UI — papers already support dedup, enrichment, abstract chunking, embeddings, PDF pipeline, favorites, deletion, project-linked filtering. Web sources already support save state, archive state, extraction, reader content, project linking, highlights, notes, restore, ownership checks. UI must surface this existing capability.
- Must maintain visual grammar compatibility with Explore (trust borders, source breadcrumbs, evidence cues, card grammar) without cloning Explore's layout.
- Save pipeline already connects Explore → Library through `/api/library/save` and `saveWebSource`. Product must reflect that continuity.
- Cross-module actions should reference shared IDs, not clone payloads.
- Every AI output that matters must be promotable into a durable artifact.
- No fake habit mechanics (streaks, badges, gamification). Deep workers hate that.

## Architectural Principles

### State Ownership Boundaries
- **Explore** owns query and ranking state, NOT saved state
- **Library** owns durable source state, NOT conversational state
- **Reading Room** owns notebook state, NOT canonical source state

### Module Communication Model (Commands)
- `saveSource(candidate, projectId?)`
- `archiveSource(sourceId)`
- `attachSourceToProject(sourceId, projectId)`
- `createNotebook(projectId, sourceIds[])`
- `addSourceToNotebook(notebookId, sourceId)`
- `removeSourceFromNotebook(notebookId, sourceId)`
- `createAnnotation(sourceId, notebookId?, payload)`
- `createInsight(notebookId, payload)`
- `sendToDraft(notebookId or sourceIds, mode)`
- `citeSource(sourceId, style)`

### Module Communication Model (Events)
- source saved / source extracted / source ready for chat
- annotation created
- notebook source set changed
- insight promoted to project note
- source cited in draft

### Target Data Model
- **Source** — unified identity with source_kind, canonical URL/external ID, trust/evidence metadata, extraction/chunking/embedding status, dedupe fingerprints, origin query
- **Project** — title, description, preferences, saved searches, active questions
- **ProjectSource** — project_id + source_id + role (saved/core/background/excluded/cited)
- **Notebook** — project_id, title, source set definition, pinned outputs, conversation history
- **NotebookSource** — notebook_id + source_id + inclusion mode (attached/temporary/recommended)
- **Annotation** — source_id, optional notebook_id, highlight text, offsets/anchors, note, tags
- **Claim/Insight** — notebook_id, text, supporting source references, confidence/provenance

## UX Principles (Learned from Instapaper & Readwise Reader)

1. **Frictionless save** — one-click from Explore, instant saved state, clear status after save
2. **Calm reading mode** — when opening a source, UI gets out of the way; real detail pages, good typography, reading progress, clean annotation tools
3. **Progressive disclosure** — list level shows only title/source/date/type/trust cue/1-2 actions; detail level shows full metadata/notes/highlights/projects/notebook usage/citation options
4. **Stable item actions** — predictable action locations for every item type (open, archive, favorite/pin, tag/link to project, add to notebook, cite, delete)
5. **Status-driven organization** — Inbox → Reading now → Core → Background → Annotated → Cited → Archived (not folders)
6. **Excellent search and filtering** — by: unread, project, source type, evidence level, trust tier, publication year, with notes, highlighted, cited in draft, included in notebook

## What NOT to Copy from Competitors

- Do not copy the assumption that all saved things are equivalent (fine for read-later, wrong for research)
- Do not compete on prettier article reading or casual highlight polish alone
- Do not flatten trust/evidence differences between source types

## Emotional Design Targets

Users should feel:
- **Relief:** "I know where this is."
- **Calm:** "I can restart from here."
- **Confidence:** "This source base is solid."
- **Momentum:** "One click and I'm moving again."
- **Ownership:** "This is my thinking system."

## The Habit Loop (Honest, Not Manipulative)

- **Trigger:** Real work moment (starting writing, researching, returning to paused investigation, needing a quote)
- **Action:** Open Library, do one low-friction thing (search corpus, continue reading, open active project, review highlights, send to Reading Room, cite into draft)
- **Reward:** Immediate cognitive payoff ("found it in 5 seconds," "I know what to read next," "my highlights are already here")
- **Investment:** User leaves behind more structure (save, note, highlight, project link, mark as core evidence, cite, add to notebook) — makes next session better

## Next Steps

- [ ] Run `/grill-me` on these decisions to stress-test before building
- [ ] Define concrete route map, core surfaces, state model, and compatibility contract with Explore
- [ ] Create PRD from these decisions via `/write-a-prd`
- [ ] Map current backend capabilities that are already built but not surfaced in UI
- [ ] Design the Library home "re-entry" experience as the hero surface
- [ ] Define the unified Source model migration from current papers + web_sources split
- [ ] Design the "From your library" block for Explore results integration

## Build Priority Order (Recommended)

1. Stop designing Library as one page — create multi-surface architecture
2. Expose hidden backend value already built (extraction, highlights, notes, project links, archive state, provenance)
3. Replace weak manual organization with workflow states
4. Make re-entry the hero ("Continue where you left off" > ten new filters)
5. Create beautiful bridge to Reading Room and Editor
6. Make Library searchable as a first-class corpus inside Explore
7. Add "From your library" block to Explore results
8. Add project-aware search context
9. Show change over time ("What's new since my last search?")
10. Expose contradiction and coverage analysis

## Raw Notes

### Session 1: Deep Dive Assessment

The user requested a deep dive into the Explore and Library modules to understand the gap. Key finding: Explore is a product surface with dedicated feature client (`ExplorePageClient`), explicit product states (landing, searching, unavailable, empty, results, synthesis-open, paginating, history-select, info-panel-open), unified result types, backend with multi-source retrieval, reranking, trust filters, domain preferences, and pagination.

Library is a single oversized client page. It has two coarse modes (papers/web-sources) plus local state. It's a screen, not a module.

The library backend is richer than the library UI. Papers support dedup, enrichment, abstract chunking, embeddings, PDF pipeline queuing, favorites, deletion, project-linked filtering. Web sources support save state, archive state, extraction, reader content storage, project linking, highlights, notes, restore, ownership checks. The UI suppresses most of this capability.

Internal UX contradictions identified:
- Sidebar is papers-first even in web-sources mode
- `activeCollection` only filters papers, not web sources
- Sort control offers `citation_count` and `year` in web-sources mode but backend silently collapses to `date_added`
- "New Collection" button has no behavior
- Page shell uses fixed-height two-pane layout vs Explore's centered progressive search-first surface

The biggest design mistake to avoid: do not try to make Library "look like Explore." Shallow mimicry. The correct goal is continuity, not sameness. Explore = discovery/triage/judgment. Library = retention/re-entry/reading/annotation/citation/reuse. "At par" should mean same interaction quality, visual grammar, trust/evidence language, save-state continuity, and intentionality — not identical layout.

### Session 2: Three-Module Architecture

The modules should be three phases of one research system:
- Explore = acquisition (find)
- Library = custody (keep)
- Reading Room = synthesis (think)
- Editor = production (write)

The roof is not "Explore | Library | Reading Room." The real roof is: Project → Discover, Sources, Notebook, Draft.

Detailed data model proposed (Source, Project, ProjectSource, Notebook, NotebookSource, Annotation, Claim/Insight). Commands and events defined for cross-module communication.

State ownership boundaries defined: Explore should not own durable source state. Reading Room should not own canonical source state. Library should not own conversational state.

### Session 3: Competitive Differentiation

Positioning against Instapaper (clean delayed reading, consumer tool) and Readwise Reader (personal reading pipeline with highlights and resurfacing). Neither is built for evidence quality, project-scoped source sets, citations, notebook-grounded synthesis, research provenance, or movement from source to argument.

The differentiation: "Instapaper saves things to read. Readwise Reader saves things to remember. ScholarSync Library saves things to think with."

Unique strengths to develop: research-grade provenance, project-aware organization, mixed-source normalization (papers + web + news + discussions unified), handoff to Reading Room and Editor.

UX lessons to steal: frictionless save (Reader), calm reading (Instapaper), progressive disclosure (Reader), stable item actions (Reader), inbox/queue states (Reader), excellent search/filtering (Reader).

### Session 4: Crown Jewel Strategy

Five emotional problems Library must solve: fear of losing something important, restart friction, cognitive clutter, identity, momentum to output.

Crown jewel traits: feels inevitable, compounds over time, creates attachment (leaving feels like losing a second brain).

Six pillars: trustworthy capture, magical re-entry, every source feels alive, best return point after Explore, workflow states over folders, absurdly low output friction.

Switch incentive: not prettier cards but project-aware sources, notebook-ready automatically, highlights → reusable notes, citation-ready, remembers why you cared, active research workspace not passive queue.

### Session 5: Habit Formation

The habit loop should be honest (no streaks/badges/gamification). Design for: relief, calm, confidence, momentum, ownership. The trigger is a real work moment, not an artificial nudge. The reward is immediate cognitive payoff. The investment makes the next session better.

Library home should open to orientation, not a list. Sections: continue reading, for your active project, recently saved, recently highlighted, unused but high-signal, ready to cite, sent to notebook, archived.

The strongest product promise: "This is the best place to build and return to your working source base."

The user target feeling: "I don't start here because it has more results than Google. I start here because it understands my work."

---

## Competitive UX Research (Added 2026-04-01)

Deep research teardowns of Matter and Readwise Reader were conducted to extract actionable UX lessons for the Library module redesign.

### Matter Teardown — Key Findings

**What Matter optimizes for:** Capture, triage, consume, annotate, and redistribute knowledge from the web in one system. Not just "read later" — a richer loop: save, listen, highlight, tag, export, revisit.

**Core product decision:** The reading surface stays visually quiet, while the library and secondary menus carry most of the complexity.

**Strongest UX decisions:**
1. **Single, highly filterable and sortable queue** — collapses all sources into one place. Mental model: "Everything unread lives here. I can decide what it means later." Queue only works because management tools (reorder, triage, filter, shuffle, tagging, bulk edit) are first-class.
2. **Continuity of reading** — save quickly, find in one queue, open in clean view, switch to audio when moving, highlight with low friction, search later, tag if needed, export to Kindle, sync highlights.
3. **Reading surface restraint** — high legibility, simple typographic controls, minimized chrome, hidden power features, content-first presentation. "The reading screen should not feel like software. It should feel like attention."
4. **Audio as first-class mode** — not a gimmick. Parallel consumption mode with synchronized highlighting, language detection, and fluid switching between reading and listening. Designs for fragmented attention.
5. **Frictionless highlighting** — direct long-press-and-drag, Apple Pencil support. Recognized that the cost of highlighting is mostly attentional, not mechanical. "Annotation must feel like a continuation of reading, not an interruption of it."

**Weaknesses identified:**
- Archive easier than delete — assumes users are collectors; many are not
- Parsing quality is an existential UX issue (incomplete transfers, popup contamination, inconsistent image handling) — "content ingestion IS UX, not infrastructure"
- Advanced workflow users hit a ceiling (limited desktop nativeness, insufficient automation)
- Discoverability suffers from elegance (power features hidden in long-presses, overflow menus)
- Product proposition can sprawl (read later + newsletter inbox + writer following + audio player + co-reader + Kindle dispatch + highlight sync + tags + search + recommendations)

**Lessons to steal for ScholarSync Library:**
- One inbox, not source-specific tabs (unless users truly think that way)
- Reading surface calmer than library surface
- Highlighting nearly frictionless — anything that breaks flow kills annotation
- Bulk actions are first-class (serious queue needs cleanup tools)
- Retrieval (search and refinding) is product value, not secondary
- Integrations reflect real workflows (not connector spam)
- Decide bias: preservation vs throughput — make the dominant action easy
- Do NOT force a collector's model on a discarder

**Reading surface action priority:**
1. scroll
2. highlight
3. listen
4. save/share/export
5. everything else

### Readwise Reader Teardown — Key Findings

**Core premise:** A reading tool is only valuable if it reliably turns "stuff I might read" into "knowledge I can find again."

**Four structural bets:**
1. Explicit triage model (Library vs Feed, plus Inbox/Later/Archive and optional Shortlist)
2. Keyboard-first interaction on web/desktop
3. Local-first/offline-capable experience with heavy caching and offline search
4. Tight storage + export pipeline where highlights are the atomic unit of value

**Strongest UX decisions:**
1. **One flat database + views as saved queries** — Filtered Views behave like "smart folders." Avoids folder taxonomy paralysis. Content-type as metadata, not navigation silo.
2. **Two ingestion lanes: Library vs Feed** — prevents RSS/newsletters from polluting curated queue. Different UX affordances for "pushed content" vs "pulled content."
3. **Keyboard-centric reading** — arrow-key focus per paragraph, H highlight, T tag, N note, command palette (Cmd/Ctrl+K) exposes nearly every action.
4. **Undo-first UX** — Z undo + toast undo + iOS shake undo. Lets users move fast with low fear.
5. **Progressive activation onboarding** — "doc as tutorial" pattern, contextual empty states, right-side tutorial rails. Cheaper than modal tours.
6. **Content immutability** — stores article content "as-is," privileges annotation stability over "latest version" correctness. URL-based dedup.

**Information architecture:**
- Left sidebar: Home, Library, Feed, Search, pinned Views
- Top bar in list: current category + tab states (Inbox/Later/Archive)
- List items: title, source domain, read time, status dots (unseen/feed/duplicate)
- Right sidebar: instructions/metadata (empty) or Info/Notebook/Chat (reading)

**Three-pane reading layout:**
- Left: TOC + highlights list
- Center: content with paragraph focus indicator
- Right: Info / Notebook / Links / Chat (hideable with [ and ])

**Interaction patterns to adopt:**
| Pattern | Value |
|---|---|
| Command palette | Shortcut discovery, reduces UI clutter |
| Keyboard focus indicator | Read and annotate without mouse |
| Auto-highlighting toggle | Faster annotation, protects copy workflows |
| Undo-first UX | Move fast with low fear |
| Split views (by Location/Seen) | Simple mental model within advanced filtering |
| Public annotated link + bundle | Lightweight collaboration without multi-user editing |

**Weaknesses:**
- No multi-color highlights (tags used as substitute)
- PDF highlights can't span pages
- Highlights from extension sometimes don't overlay in Reader
- Limited desktop nativeness / Shortcuts support
- Tag system splits: document tags vs highlight tags are separate with no inheritance

**Design tokens (recommended starters):**
- Spacing: 4, 8, 12, 16, 24, 32, 48 px
- Reading body: 18px default (14-24px range), line-height 1.55-1.7
- Content column: max 720-780px (wide mode ~960px)
- Light: bg #FFFFFF, text #111; Dark: bg #0B0B0C, text #F2F2F2

### Synthesized Principles for ScholarSync Library

Based on both teardowns plus the earlier planning session:

**What to adopt:**
1. **One unified queue with smart filtering** — not source-type tabs. Workflow states (Inbox/Reading/Core/Background/Annotated/Cited/Archived) as primary organization.
2. **Reading surface as sacred space** — minimal chrome, content-first, hidden power features, calm typography. Reader view should feel like attention, not software.
3. **Frictionless annotation** — highlight with minimal steps, notes attached to highlights, annotations searchable and retrievable across corpus.
4. **Views as saved queries** — avoid folder taxonomy paralysis. Let the system infer structure.
5. **Undo-first UX** — every destructive action needs undo toast + Trash with restore.
6. **Progressive disclosure** — list level: title/source/date/type/trust cue/1-2 actions. Detail level: full metadata/notes/highlights/projects/notebook usage/citation options.
7. **Keyboard-first on desktop** — command palette, paragraph-level focus, shortcut-driven annotation.
8. **Content ingestion quality = UX quality** — parsing failures are trust failures, not edge cases.
9. **Export paths are product value** — citation, notebook handoff, draft insertion, markdown export. Reading tools die when they trap data.

**Where ScholarSync Library DIVERGES from both:**
1. **Research-grade provenance** — neither Matter nor Reader cares about evidence quality, study design, trust tiers, or source reliability scoring. ScholarSync must.
2. **Project-aware organization** — neither product organizes by research project. ScholarSync's projects-as-spine is a genuine differentiator.
3. **Active memory feeding back into search** — neither product uses saved corpus to improve future search results. ScholarSync's "From your library" block in Explore is unique.
4. **Citation-readiness as first-class state** — neither product treats citation generation as central. ScholarSync must make every source one step from being cited.
5. **Notebook/synthesis handoff** — neither product feeds sources into a grounded reasoning surface. ScholarSync's Reading Room integration is the kill shot.
6. **Cross-source evidence comparison** — neither product helps users compare trust levels, find contradictions, or assess evidence quality across saved sources.
7. **Workflow states over triage states** — Reader uses Inbox/Later/Archive (consumption triage). ScholarSync should use Inbox/Reading/Core/Background/Annotated/Cited/Archived (research workflow states).

**The one sentence that captures the competitive gap:**
Matter and Reader help users consume content efficiently. ScholarSync Library should help users build a reusable, project-aware, citation-ready source base for serious thinking and writing.
