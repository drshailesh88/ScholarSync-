# ScholarSync User Journey Documentation (Comprehensive)

## 1) Product-wide journey map (presentation-ready)

This document maps all user-visible journeys currently represented in the app routes and workspace modules. It is designed to be slide-friendly: each section can be converted into one or more presentation slides.

### 1.1 Core product pillars

ScholarSync currently supports these major user outcomes:

1. **Discover evidence** (Literature Search, Deep Research, Journal Feeds).
2. **Think with evidence** (Notebook, source-grounded chat, extraction, verification).
3. **Write outputs** (Studio drafting + LaTeX workspace).
4. **Validate quality** (Compliance checks, integrity history, humanize/paraphrase loops).
5. **Communicate results** (Slides + Presentation builders, exports, presenter mode, sharing).
6. **Run rigorous evidence workflows** (Systematic review pipeline with PRISMA/RoB/meta-analysis/exports).

---

## 2) Platform entry and orientation journeys

### 2.1 Marketing and authentication journey

**Who:** New users.

**Flow:**
- User lands on marketing home (`/`).
- User authenticates with sign-in or sign-up routes.
- Authenticated user enters app shell and workspace routes.

**Routes:**
- `/`
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`

### 2.2 Onboarding journey

**Who:** First-time authenticated users.

**Flow:**
- User selects specialty and primary goals (writing, search, checks, presentations, learning).
- User is introduced to feature set (search, studio, citations, checks).
- Profile data is persisted and user continues into workspace.

**Primary route:** `/onboarding`

### 2.3 Dashboard “intent selection” journey

**Who:** Returning users.

**Flow:**
- User opens dashboard and chooses primary intent card:
  - Literature Search
  - Write & Draft (Studio)
  - Learn Mode
  - Final Checks
- User reviews usage stats, recent projects, recent searches, and recent activity.
- User jumps directly to the chosen module.

**Primary route:** `/dashboard`

---

## 3) Global workspace navigation journey

The app sidebar defines persistent workspace pathways:

- **Workspace:** Dashboard, Studio, LaTeX Editor, Literature Search, Deep Research, Notebook
- **Library:** Papers, Journal Feed, Archive
- **Tools:** Systematic Review, Compliance, Presentation, Settings

This means a user can continuously switch workflows without leaving the authenticated shell.

---

## 4) End-to-end cross-module user journeys (key slide-ready scenarios)

## 4.1 “Search → Save → Synthesize → Write” journey

1. User runs multi-source literature query in **Literature Search** (`/research`).
2. User applies filters/sorting and saves relevant papers.
3. User opens **Notebook** (`/notebook`) to chat with selected papers and capture source-grounded notes.
4. User moves to **Studio** (`/studio`) or **LaTeX** (`/latex/:projectId`) for manuscript drafting.
5. User exports outputs or continues iterative edits.

## 4.2 “Deep Research report → Library → Presentation” journey

1. User enters a topic and mode (quick/standard/deep/exhaustive) in **Deep Research** (`/deep-research`).
2. User confirms/edits perspectives in plan-preview stage.
3. User runs streaming deep-research execution.
4. User saves outputs to library.
5. User creates deck via **Slides** or **Presentation** module and presents/exports.

## 4.3 “Draft quality gate before submission” journey

1. User drafts in Studio/LaTeX.
2. User opens **Compliance** (`/compliance`) for plagiarism + AI detection checks.
3. User inspects inline/split views, history, and real-time check mode.
4. User uses humanize/paraphrase loops with citation support.
5. User returns to draft and finalizes.

## 4.4 “Systematic review publication pipeline” journey

1. User creates systematic review project (`/systematic-review`).
2. User configures strategy and imports references.
3. User executes screening and full-text decisions.
4. User completes extraction + risk of bias + meta-analysis/NMA + GRADE.
5. User generates PRISMA artifacts and manuscript/export outputs.

## 4.5 “AI-generated presentation from research” journey

1. User creates new deck from `/presentation/new` (AI mode or manual mode).
2. User edits deck in `/presentation/:deckId` with slides, design panel, AI tools, speaker notes.
3. User runs coaching/defense-prep/comments/version history/recordings.
4. User shares deck and exports PPTX/PDF.

---

## 5) Module-by-module detailed user journeys

## 5.1 Studio (AI writing workspace)

**Route:** `/studio`

### Primary journeys
- Start a blank draft and write with auto-save.
- Switch modes for guidance intensity and drafting strategy.
- Use chat panel for iterative generation and clarification.
- Open research sidebar, add references, and insert citations.
- Run checks tab inline while drafting.

### Key user actions
- Create or continue document sessions.
- Export to DOC/PDF where available.
- Toggle reference sidebar and research tools.
- Use “Chat & Learn / Research / Checks” right panel tabs.

### Value
A single drafting cockpit for ideation, drafting, citation-aware writing, and quality checks.

## 5.2 Literature Search (Google Docs-like search + copilot experience)

**Route:** `/research`

### Primary journeys
- Query across multiple scholarly sources (PubMed/Semantic Scholar/OpenAlex/clinical trials).
- Refine by filters (study type, impact, recency, PDF availability, etc.).
- Sort by relevance, citations, year, evidence level.
- Save papers to library.
- Ask copilot to synthesize/compare discovered papers.
- Reopen session state for ongoing search iteration.

### Value
Acts as a broad “research search console” for discovery and curation before writing.

## 5.3 Deep Research (agentic multi-step synthesis)

**Route:** `/deep-research`

### Primary journeys
- Enter topic and pick research mode depth.
- Generate perspective plan (plan-preview stage).
- Confirm perspectives and execute full streamed pipeline.
- Monitor progress stages and evolving sections.
- Save outputs to library and export final reports.
- Resume from past sessions.

### Value
A long-form automated synthesis workflow for users who want higher-depth evidence scans.

## 5.4 Notebook (source-grounded Q&A + extraction)

**Route:** `/notebook`

### Primary journeys
- Start conversation in research or learn mode.
- Attach paper sources (from library, PDF upload, URL ingest).
- Ask grounded questions and inspect cited passages.
- Review structured extraction cards (PICO/effect/risk fields) and verify.
- Share notebook session and generate audio overviews.

### Value
Converts documents and papers into an interactive reasoning workspace.

## 5.5 LaTeX module (paper writing workspace)

**Routes:**
- `/latex`
- `/latex/new`
- `/latex/:projectId`

### Primary journeys
- Create paper from template + compiler choice.
- Manage files in tree, edit source, preview output.
- Compile on demand with retries and diagnostics.
- Use inline AI tools, slash commands, comments, and collaboration.
- Manage figures/images and sync between source and preview.

### Value
Production writing environment for users requiring LaTeX-native workflows.

## 5.6 Slides module (rapid deck building)

**Routes:**
- `/slides`
- `/slides/new`
- `/slides/:deckId`

### Primary journeys
- Create deck via wizard (topic → audience → theme).
- Import existing `.pptx` for continuation.
- Choose editing mode (slides mode or gamma/create mode).
- Build slides with rich blocks and theme engine.
- Launch presenter mode.

### Value
Fast creation/import editing flow for slide-first users.

## 5.7 Presentation module (advanced deck editor)

**Routes:**
- `/presentation`
- `/presentation/new`
- `/presentation/:deckId`
- `/presentation/audience`

### Primary journeys
- Start manual or AI-generated presentation.
- Build/edit slide structure and content blocks.
- Use design panel, layout picker, theme changes.
- Collaborate with comments and version history.
- Use coach/agent/defense prep panels.
- Record sessions, track analytics, share decks.
- Export to PPTX and handout PDF.

### Value
Full-featured presentation suite for academic and defense scenarios.

## 5.8 Systematic Review module (PRISMA pipeline)

**Routes:**
- `/systematic-review`
- `/systematic-review/:projectId`

### Primary journeys
- Create/manage review projects.
- Configure protocol/PICO/search strategy.
- Import references and run screening queues.
- Generate PRISMA flow/checklists.
- Perform unified risk-of-bias workflows.
- Run extraction/meta-analysis/NMA/GRADE.
- Draft manuscript artifacts and export deliverables.
- Collaborate with real-time activity feed.

### Value
End-to-end structured evidence synthesis workflow.

## 5.9 Papers Library and Journal Feed

**Routes:**
- `/library`
- `/feeds`

### Primary journeys
- View and manage saved papers.
- Organize reading pipeline.
- Browse feed items, mark read/star/save.
- Attach notes and use copilot summarize/related/chat helpers.
- Import/export OPML for feed portability.

### Value
Ongoing knowledge base and alerting hub.

## 5.10 Compliance (integrity + AI detection)

**Route:** `/compliance`

### Primary journeys
- Paste/upload draft text for checks.
- Run plagiarism/AI detection.
- Use inline/split review modes.
- Track historical check runs.
- Enable real-time monitoring mode.
- Use humanize/paraphrase assistance and citation copy.

### Value
Submission readiness and originality assurance.

## 5.11 Illustration and poster workflows

**Routes:**
- `/illustrate`
- `/illustrate/editor`
- `/illustrate/editor/:id`
- `/illustrate/agent`
- `/illustrate/credits`
- `/poster/new`
- `/poster/:posterId`

### Primary journeys
- Generate scientific illustrations.
- Edit visual assets in dedicated editor.
- Use icon search/generation and save assets.
- Create and refine posters from prompts/source content.

### Value
Visual communication support for manuscripts and talks.

## 5.12 Archive, projects, and settings

**Routes:**
- `/projects`
- `/settings`

### Primary journeys
- Create and classify projects (article/review/thesis/meta-analysis etc.).
- Filter/search/switch list-grid/archive views.
- Update lifecycle state (planning → drafting → reviewing → completed/archived).
- Manage account, billing, usage, preferences, theme, sign-out.

### Value
Portfolio management + account operations.

---

## 6) Live presentation and sharing journeys

## 6.1 Live session journey

**Routes:**
- `/live`
- `/live/:code`

**Flow:**
- Presenter starts a live session.
- Audience joins via code.
- Session streams and synchronized state run through live endpoints.

## 6.2 Share link journey

**Routes:**
- `/share/:token`
- `/share/notebook/:token`

**Flow:**
- Owner creates shareable artifacts.
- Recipient opens tokenized view without full workspace navigation.

---

## 7) API capability map by user-facing intent (for architecture slides)

### 7.1 Search and evidence retrieval
- Unified search and provider-specific search endpoints.
- Citation resolution and export endpoints.
- Paper save/fetch/pdf routes.

### 7.2 Writing and editing augmentation
- Chat, synthesize, precision-edit, extract-facts/PICO, humanize/paraphrase.
- LaTeX compile/autofix/synctex/comments/versioning/image management.

### 7.3 Presentation and slide generation
- Deck generation/agent/edit/coach/defense prep.
- Media/image/visual generation and PPTX import.
- Export (PPTX, PDF, presentation handout PDF).

### 7.4 Systematic-review orchestration
- Search strategy, screening, extraction, RoB (ROB2/ROBINS-I/QUADAS2), AMSTAR2.
- Meta-analysis/NMA/GRADE, PRISMA flow/checklist, PROSPERO/protocol/manuscript export.
- Import/export references and living review alert routes.

### 7.5 Collaboration, sharing, and billing
- Liveblocks auth/webhook, live session stream, analytics tracking.
- Billing subscription/order/verification/webhook.

---

## 8) Suggested slide deck structure (ready-to-use)

1. **ScholarSync capability overview** (6 pillars)
2. **Global navigation and module map**
3. **Primary user personas + goals**
4. **Journey A: Search → Notebook → Writing**
5. **Journey B: Deep Research → Presentation**
6. **Journey C: LaTeX authoring lifecycle**
7. **Journey D: Systematic review pipeline**
8. **Journey E: Compliance gate before submission**
9. **Journey F: Slides/Presentation creation paths**
10. **Cross-module handoffs and data continuity**
11. **Sharing, live sessions, and collaboration**
12. **API capability map by user intent**

---

## 9) Complete user-route inventory (UI pages)

### Marketing/Auth
- `/`
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`

### App workspace
- `/dashboard`
- `/onboarding`
- `/studio`
- `/editor/[id]`
- `/research`
- `/deep-research`
- `/notebook`
- `/latex`
- `/latex/new`
- `/latex/[projectId]`
- `/slides`
- `/slides/new`
- `/slides/[deckId]`
- `/presentation`
- `/presentation/new`
- `/presentation/[deckId]`
- `/presentation/audience`
- `/systematic-review`
- `/systematic-review/[projectId]`
- `/library`
- `/feeds`
- `/compliance`
- `/projects`
- `/settings`
- `/illustrate`
- `/illustrate/editor`
- `/illustrate/editor/[id]`
- `/illustrate/agent`
- `/illustrate/credits`
- `/poster/new`
- `/poster/[posterId]`

### Share/Live
- `/live`
- `/live/[code]`
- `/share/[token]`
- `/share/notebook/[token]`

---

## 10) Notes for product/GTM teams

- There are **two deck creation families** (`/slides` and `/presentation`) that can be positioned differently:
  - **Slides** = faster creation/import + mode-based editing.
  - **Presentation** = advanced controls, analytics, comments, defense prep.
- LaTeX + Studio gives dual writing pathways (WYSIWYG-like and source-first).
- Research is now multi-layered:
  - **Literature Search** (fast query/filters/copilot),
  - **Deep Research** (agentic long-form synthesis),
  - **Notebook** (document-grounded reasoning).
