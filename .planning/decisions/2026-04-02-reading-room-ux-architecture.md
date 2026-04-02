# Planning Session: Reading Room UX Architecture & Product Vision
**Date:** 2026-04-02
**Source:** ChatGPT (extended discussion) + Spotify UX teardown analysis
**Status:** captured

## Context
ScholarSync is expanding from a medical-only tool to a universal source-based thinking platform. This planning session established the complete UX architecture, module boundaries, object model, domain pack strategy, and competitive positioning for the Reading Room module — the "crown jewel" of the product. A deep Spotify UX teardown was conducted to extract transferable interaction patterns and identify where ScholarSync must deliberately diverge.

---

## Key Decisions Made

### 1. Product Thesis & Positioning
1. **ScholarSync is a research operating system** — not a collection of utilities. Core journey: find -> keep -> think -> write. Rejected: positioning as AI chat tool, summarizer, or second-brain scrapbook.
2. **The real competitor is the fragmented workflow** (tabs + PDFs + notes + chat + document draft), not Google/ChatGPT/Claude. Rejected: head-to-head AI feature race.
3. **Reading Room headline**: "The Reading Room for evidence-backed synthesis." Core promise: "From saved sources to usable understanding." Rejected: "it summarized my PDFs" framing.
4. **Wedge market**: serious source-based thinkers (journalists, newsletter writers, researchers, policy people, nonfiction authors, clinicians, founders writing memos). Rejected: broad "everyone" targeting.

### 2. Module Boundaries (Four Sequential States)
5. **One source-based thinking system with four states**: Discover (Explore) -> Curate (Library) -> Synthesize (Reading Room) -> Publish (Studio). NOT four separate tools. Rejected: competing sidebar tools, separate products.
6. **Explore owns acquisition** — search, discovery, trust cues, fast save. Should become "question intake system" leading to: answer was enough / save sources / create reading set / open Reading Room.
7. **Library owns custody** — canonical source identity, workflow state, annotations, reuse, citation readiness. The trust layer, not the emotional center.
8. **Reading Room owns synthesis** — bounded source sets, grounded thinking, outputs. THE CROWN JEWEL. Rejected: general note-taking, chat-shaped interface.
9. **Studio owns expression** — writing, citing, publishing. Receives typed Material objects, not raw chat dumps.

### 3. Sidebar Redesign (Spotify-Informed)
10. **Restructure from verb-based (11 tools) to noun-based (4 primary nav + user's stuff)**:
    - Home (dashboard), Library (all sources), Reading Room (active reading), Studio (active writing)
    - PROJECTS section + RECENT section
    - Where "missing" tools go: Explore -> Reading Room's Search tab; Deep Research -> Reading Room toggle; Feed -> Home widget; LaTeX -> Studio format selector; Canvas/Poster/Stage -> Studio document types; Systematic Review -> Project type; Integrity Check -> Studio pre-submission action.
    Rejected: keeping 11 sidebar items, adding more tools.
11. **Sidebar-Is-Mine Law**: Left rail shows only user's content (sources, projects, recent). Never app navigation or settings. Rejected: feature menus in sidebar.

### 4. Object Model (Locked)
12. **Nine canonical objects** locked to prevent rewrites:
    - **Source**: from Library, unified contract across documents/web/transcripts
    - **Anchor**: pointer into source (page, heading, timestamp)
    - **ReadingSet**: bounded corpus for one line of thought
    - **Room**: working context over a reading set
    - **Note**: source-adjacent observation (7 types: observation/interpretation/counterpoint/question/quote/evidence/draft seed)
    - **Claim**: candidate assertion, first-class object (not chat message)
    - **Insight**: higher-order interpretation, bridge between reading and writing
    - **Material**: writing-usable object with role/readiness/weight
    - **OutlineNode**: structural writing unit
    Rejected: domain-specific objects in core (PICO, study design, legal holdings go in domain packs).

### 5. Reading Room Architecture
13. **One module, multiple views** — Reader View, Board View, Studio Bridge. NOT separate products. Rejected: separate Notebook + Canvas + Bridge modules.
14. **Five universal work modes**: Orient, Compare, Extract, Challenge, Compose. Work across all domains. Rejected: domain-specific modes as primary.
15. **Layered prompt architecture**: Universal Spine + Work Mode + Posture + Domain Pack + Output Format. Rejected: monolithic prompts, per-feature prompts.
16. **Bounded source sets** — Reading Room starts from explicit reading set, not "all my saved sources." Rejected: vague library access.
17. **First-class claims objects** — claims are structured objects with supporting/conflicting anchors, not just chat messages. Rejected: chat-only synthesis.

### 6. Board View Constraints
18. **Board View is structured, NOT infinite canvas**. Cards, concept groups, relationships, section buckets. Rejected: freeform drag-and-drop, arbitrary connectors, infinite whiteboard (too expensive for solo founder: pan/zoom, collision rules, connectors, selection state, grouping, keyboard systems, undo/redo, persistence, performance, mobile).
19. **Board View is a view of Reading Room**, not a separate product. One room, multiple projections. Rejected: duplicate state between Canvas and Reading Room.

### 7. Studio Handoff
20. **Five typed Material objects flow to Studio**: Evidence Block, Claim Block, Counterpoint Block, Insight Block, Outline Node Block. Each has role-specific insertion actions. Rejected: raw chat, chat history, transcript dumps, vague summaries, room state blobs.
21. **Materials tab** added to existing Studio Workbench (alongside Search, Library, Cited). NOT floating cards over editor. Rejected: "Promoted" naming (says how, not what).
22. **Three material dimensions**: Role (evidence/insight/claim/counterpoint/section), Readiness (think with/shape into prose/insert-ready), Weight (core/useful/optional). Rejected: flat undifferentiated list.
23. **Default grouping by concept** (e.g., Adherence, Mechanism, Conflicting evidence). Alternate: by draft section, weight, or readiness. Rejected: flat ungrouped tray.

### 8. Domain Pack Strategy
24. **Domain packs change**: vocabulary, extraction schemas, trust heuristics, suggested actions, output templates. **Cannot change**: source model, anchor model, reading set, room structure, claim/note/insight objects, truthfulness rules, citation contract.
25. **Expansion order**: General Deep Work + Medicine (now) -> Journalism + Policy (next) -> Business/Strategy (later). Rejected: broad "everyone" packs, creative tools.
26. **Do not broaden by making medicine vague** — turn rigorous medical engine into universal serious-reading engine with medicine as first expert layer.

### 9. Spotify UX Transfer Decisions
27. **15 Design Laws adopted from Spotify teardown**:
    1. Frame Law: shell never changes layout
    2. Two-Template Law: collection view + focused view only
    3. Hover-Reveal Law: max 2 info pieces at rest, actions on hover
    4. Single-Color-Action Law: one accent color for primary action only
    5. Sidebar-Is-Mine Law: user's content only
    6. Progressive Depth Law: most likely action at top, scroll reveals more
    7. No-Explanation Law: if needs tooltip, redesign it
    8. Context-Adaptive Column Law: tables adapt columns to context
    9. Empty-State-Is-Onboarding Law: single CTA, conversational
    10. Skeleton-Before-Spinner Law: content-shaped placeholders, never spinners
    11. Right-Click-Is-Power-User Law: context menu + three-dot, same menu
    12. Ambient Differentiation Law: color from sources for emotional distinction
    13. Flat-Over-Nested Law: flat lists + filters over nested folders
    14. Split-View Exception Law: MUST support split/panel layouts (unlike Spotify)
    15. Calm-Density Gradient Law: density matches task intensity

28. **Eight anti-patterns identified (what NOT to copy from Spotify)**:
    - No full-screen takeover for primary activity (need split views)
    - No single-column main area (need multi-document)
    - Don't treat all items as equal weight (distinguish article from 200-page PDF)
    - Don't omit workspace/canvas metaphor (need multi-source comparison)
    - Don't copy flat library (need lightweight hierarchy)
    - Don't copy passive consumption bias (lean-forward, not lean-back)
    - Don't use dark mode as only mode (light default for reading)
    - Don't copy absence of persistent state (show reading progress, highlight count)

### 10. Three Ingestion Classes (Permanent)
29. **Documents** (PDF, TXT, MD now; DOCX later; EPUB maybe) with page anchors. **Web Pages** (articles, essays, docs, guidelines) with section anchors. **Transcript-bearing Media** (YouTube, podcasts, lectures) with timestamp anchors. All normalize into same Source contract.

### 11. Library vs Reading Room Feel
30. **Library = Bookshelf** (organized, calm, managerial, medium-high density, multiple items visible, cool/neutral, leaning back). **Reading Room = Desk under a lamp** (focused, immersive, intimate, low-medium density, one source dominates, warm tint + light background, leaning forward). Transition should feel like pulling a book from shelf and sitting down.

### 12. Progressive Disclosure for Reading/Thinking
31. **Five escalation levels**: Level 0 (Home: recent + projects), Level 1 (Reading: source + minimal toolbar), Level 2 (Annotating: sidebar panel with annotations/tags/connections), Level 3 (Writing: split view or editor transition), Level 4 (Managing: export, citation, organization, sharing). Each is opt-in escalation, not mode switch.

---

## Open Questions
- [ ] Exact taxonomy and prompting for Board View cards/relationships
- [ ] Whether Counterpoint is v1 or deferred to v2
- [ ] Performance targets for Board View (card limits, interaction latency)
- [ ] Mobile experience for Reader and Board Views
- [ ] Import/export format support beyond current
- [ ] Sharing models for rooms, reading sets, and materials
- [ ] Collaborative use model (if any)
- [ ] Analytics/learning from promoted materials
- [ ] Re-ranking and suggestion algorithms for Materials tray
- [ ] Posture prompt specifics (Analyst, Teacher, Skeptic, Editor — exact prompts)

---

## Constraints & Requirements

### Engineering Constraints (Solo Founder)
- Engineering done in one good pass so founder can focus on distribution and marketing
- Lock permanent architectural decisions NOW, not temporary compromises
- Build core objects and state once, then multiple UIs over same objects
- No infinite canvas first (too expensive: pan/zoom, collision, connectors, selection, grouping, keyboard, undo/redo, persistence, performance, mobile)

### Product Constraints
- Objects before UI: don't invent state in components that should exist in domain model
- Contracts before surfaces: every cross-module action references same source identity
- Stability over novelty: optimize internals stability, not surface novelty
- Do NOT try to be first stop for everything — be first serious stop for deep work

### Quality Constraints
- Medicine is default, never broken
- Sources always traceable, claims always defensible, contradictions always flagged
- No chat dumps into Studio — only typed Materials
- Annotation persistence: highlights -> notes -> claims -> insights -> outline blocks -> Studio (all anchored to source)

---

## Next Steps
- [ ] Lock the 9-object canonical model in code (Source, Anchor, ReadingSet, Room, Note, Claim, Insight, Material, OutlineNode)
- [ ] Unify Source contract across documents, web pages, and transcripts
- [ ] Rewrite notebook base prompts to domain-neutral (move medicine into overlay)
- [ ] Restructure sidebar from 11 tools to 4 primary views + user content
- [ ] Build Reading Room Phase 1: source stack from Library, Reader View, source-adjacent actions, claim capture, promote-to-insight, promote-to-Studio
- [ ] Define Materials tab schema in Studio Workbench
- [ ] Create 8 priority wireframe screens (Home populated, Library project view, Library empty state, Reading Room single source, Reading Room discovery, Studio with workbench, context switch animation, collapsed left rail)

---

## Raw Notes

Three source files preserved in repo root (to be cleaned up after capture):
- `spotifyUX.md` — Full Spotify UX teardown: spatial stability, progressive disclosure, hover-reveal, card patterns, typography hierarchy, gradient headers, filter chips, context menus, skeleton loading, empty states, navigation architecture, transfer matrix to Reading Room, 15 design laws, anti-patterns, proposed left-rail model
- `spotifylessons.md` — Spotify lessons applied to ScholarSync: 5 transferable principles, 5 critical divergences, detailed pattern-to-Reading Room mapping, specific interaction details (spacing, colors, typography), density gradient analysis, Library vs Reading Room emotional registers, 8 priority wireframe screens
- `discussions UX.md` — Extended ChatGPT product discussion: product thesis, module boundaries (Explore/Library/Reading Room/Studio), 9-object canonical model, 5 work modes (Orient/Compare/Extract/Challenge/Compose), layered prompt architecture, domain pack strategy, Board View constraints, Studio Materials handoff (5 typed objects with role/readiness/weight), competitive positioning (vs NotebookLM/Gistr/Lilys/Heptabase/mymind), ingestion classes, execution roadmap (4 phases), database schema changes needed
