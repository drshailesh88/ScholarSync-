# ScholarSync — Comprehensive User Journey Documentation

> **Version:** 1.1
> **Branch:** `claude/user-journey-documentation-xRBfo`
> **Date:** 2026-03-13
> **Scope:** All user-facing modules, flows, and interactions across the entire application.
> **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Zustand, TipTap, CodeMirror, Fabric.js, Liveblocks, Clerk, Drizzle ORM + PostgreSQL/pgvector, Cloudflare R2, Razorpay

---

## Table of Contents

1. [Overview & Application Architecture](#1-overview--application-architecture)
2. [Authentication & Onboarding Journey](#2-authentication--onboarding-journey)
3. [Dashboard Journey](#3-dashboard-journey)
4. [Studio (Writing) Journey](#4-studio-writing-journey)
5. [Literature Search Journey](#5-literature-search-journey)
6. [Notebook (AI Research Assistant) Journey](#6-notebook-ai-research-assistant-journey)
7. [Deep Research Journey](#7-deep-research-journey)
8. [Library Journey](#8-library-journey)
9. [Slides Module Journey](#9-slides-module-journey)
10. [Presentation Module Journey (AI-Powered)](#10-presentation-module-journey-ai-powered)
11. [LaTeX Editor Journey](#11-latex-editor-journey)
12. [Systematic Review Journey](#12-systematic-review-journey)
13. [Illustration Module Journey](#13-illustration-module-journey)
14. [Journal Feed Journey](#14-journal-feed-journey)
15. [Writing Analysis Journey](#15-writing-analysis-journey)
16. [Compliance & Integrity Check Journey](#16-compliance--integrity-check-journey)
17. [Settings Journey](#17-settings-journey)
18. [Projects Journey](#18-projects-journey)
19. [Poster Creation Journey](#19-poster-creation-journey)
20. [Cross-Module Integration Flows](#20-cross-module-integration-flows)
21. [Keyboard Shortcuts & Power-User Flows](#21-keyboard-shortcuts--power-user-flows)
22. [Billing & Subscription Journey](#22-billing--subscription-journey)
23. [Public Sharing & Live Presentation Journey](#23-public-sharing--live-presentation-journey)
24. [Editor Module Journey](#24-editor-module-journey)
25. [Slide Modes: Gamma & Agent](#25-slide-modes-gamma--agent)

---

## 1. Overview & Application Architecture

ScholarSync is an AI-powered academic research and writing platform. It is built as a multi-module Next.js application organized around the following core capability pillars:

| Pillar | Modules |
|---|---|
| **Discovery** | Literature Search, Deep Research, Journal Feed, Notebook |
| **Writing** | Studio (AI Writing), LaTeX Editor |
| **Presentation** | Slides (Custom Builder), Presentation (AI Generator), Poster Creator |
| **Illustration** | Illustrate (Scientific Figure Generator) |
| **Quality & Compliance** | Writing Analysis, Compliance & Integrity Check, Systematic Review |
| **Organization** | Library, Projects, Settings |

### Navigation Structure

The primary navigation is a persistent left sidebar (on the `(app)` layout) providing access to:

- Dashboard
- The Studio (writing editor)
- Editor (standalone document editor)
- Literature Search
- Notebook
- Deep Research
- Library
- Slides
- Presentation
- Poster Creator
- LaTeX Editor
- Systematic Review
- Illustrate
- Journal Feed
- Analysis
- Compliance
- Projects
- Settings

**Route groups:**

| Group | Path prefix | Purpose |
|-------|-------------|---------|
| Authenticated App | `/` (app group) | All user-facing features |
| Authentication | `/sign-in`, `/sign-up` | Clerk auth pages |
| Marketing | `/` | Landing page |
| Public Sharing | `/share/[token]`, `/share/notebook/[token]` | Shared content viewers |
| Live Sessions | `/live/[code]` | Live audience presentation mode |
| Audience View | `/presentation/audience` | Audience-facing presentation view |

---

## 2. Authentication & Onboarding Journey

### 2.1 Sign-Up Flow

```
Marketing Page (/)
  → "Get Started" / "Sign Up" button
    → /sign-up
      → Clerk-powered registration form
        → Enter email address
        → Enter password (or OAuth: Google, etc.)
        → Email verification (if required)
          → Verification link clicked
            → Redirects to /onboarding
```

### 2.2 Sign-In Flow

```
Marketing Page (/)
  → "Sign In" button
    → /sign-in
      → Clerk authentication form
        → Enter email + password
        → OR: Sign in with Google / SSO
          → Successful auth → redirects to /dashboard
```

### 2.3 Onboarding Flow (4-Step Wizard)

Triggered automatically on first login.

```
/onboarding — Step 0: Welcome
  → Enter full name (e.g. "Dr. Rahul Sharma")
  → Enter institution (e.g. "AIIMS New Delhi")
  → Click "Continue"

  → Step 1: Research Interests
    → Select one or more medical/academic specialties from a grid:
      Internal Medicine, Surgery, Pediatrics, Cardiology, Radiology,
      Pathology, Pharmacology, Microbiology, Psychiatry, ENT, etc.
    → Click "Continue" (requires at least 1 selection)

  → Step 2: Goals
    → Select one or more goals:
      - Write Research Papers
      - Search Literature
      - Check Plagiarism & AI
      - Create Presentations
      - Learn Research Methods
    → Click "Continue" (requires at least 1 selection)

  → Step 3: Feature Tour
    → Read overview of 5 key ScholarSync features:
      1. Literature Search (282M+ papers)
      2. The Studio (AI editor)
      3. Citation Manager (10,000+ styles)
      4. Final Checks (plagiarism + AI detection)
      5. Slides Generator
    → Click "Start Using ScholarSync"
      → Profile saved to database
      → Onboarding marked complete via API
        → Redirects to /dashboard
```

### 2.4 Sign-Out Flow

```
Settings page → Left sidebar → "Log Out" button
  → Clerk SignOutButton triggers
  → Redirects to / (marketing homepage)
```

---

## 3. Dashboard Journey

**Route:** `/dashboard`

The dashboard is the home hub showing recent activity and quick-access stats.

```
/dashboard
  ├── Recent Projects grid
  │     → Click a project card → opens the Studio at that project's document
  ├── Stats cards
  │     → Total papers saved
  │     → Citations added
  │     → Words written
  │     → AI usage
  ├── Recent Searches list
  │     → Click a search → reopens /research with that query pre-filled
  └── Recent Activity feed
        → Timestamped list of actions (papers saved, docs created, etc.)
```

**Quick Actions available from the dashboard:**
- Navigate to any module via the sidebar
- Open a recent project directly

---

## 4. Studio (Writing) Journey

**Route:** `/studio`

The Studio is the core AI-powered writing editor — analogous to a Google Docs environment with an integrated AI assistant. It is built on the TipTap rich-text editor.

### 4.1 Opening the Studio

```
Sidebar → "Studio"  OR  Dashboard → Recent Project card
  → /studio (loads last active project)
  → /studio?projectId=123 (loads specific project)
  → /studio?mode=learn (opens in Guide/Learn mode)
```

### 4.2 Write Mode vs. Learn Mode

The top of the left sidebar has a toggle:

```
[ Write ]  [ Learn ]
```

**Write Mode (Draft Mode):**
- User focuses on writing; AI assists with drafting
- AI Intensity selector appears in the editor toolbar:
  - **Focus** (sky blue): Minimal AI help; user-directed writing
  - **Collaborate** (brand): Balanced AI collaboration
  - **Accelerate** (violet): AI takes a more active drafting role
- The AI Chat panel on the right responds as a draft assistant

**Learn / Guide Mode:**
- AI does NOT write for the user — it teaches
- User selects a **document type**:
  - Research Paper, Case Report, Thesis, Review Article, etc.
- AI walks through **writing stages** (progress tracker):
  - Understand → Plan → Draft → Revise → Submit
- The right panel shows a Socratic tutor that challenges thinking

### 4.3 Document Management

```
Left sidebar
  ├── Document title (inline editable text field)
  ├── Write / Learn toggle
  ├── Project selector dropdown (if multiple projects exist)
  │     → Select different project → document switches
  ├── Navigation links:
  │     → My Library
  │     → Literature Search
  └── References section
        → Shows in-text citations added so far
        → "+" button to add a new citation
        → "View all N references" → opens Reference Sidebar
```

### 4.4 Editing Flow

```
TipTap rich-text editor (center)
  → Rich formatting toolbar (Bold, Italic, Headings, Lists, etc.)
  → Slash commands:
      /continue  → AI continues the paragraph
      /summarize → AI summarizes selected text
      /find-sources → opens Research sidebar with current context
      /cite       → prompts for citation insertion
      /integrity-check → switches to Checks tab
  → Keyboard shortcut: Cmd+Shift+C → opens Citation Dialog
  → Keyboard shortcut: Cmd+Shift+R → toggles Reference Sidebar
  → Auto-save: debounces 2000ms, saves to database
  → localStorage fallback draft (survives crashes)
  → Save status indicator: Saving… / Saved HH:MM / Unsaved changes / Save failed
```

### 4.5 Citation Workflow (Studio)

```
Trigger: Cmd+Shift+C  OR  "/" → /cite  OR  "+" in References sidebar
  → Citation Dialog opens
    → Search PubMed / Semantic Scholar for papers
    → OR paste a DOI / URL
    → OR select from existing library
    → Select one or more papers
    → Click "Insert Citation"
      → Inline citation node inserted at cursor position
      → Bibliography node auto-appended at document end if not present
      → Citation notice: "Citation inserted" (2.5s)
```

### 4.6 AI Chat Panel (Right Side)

```
Right panel → "Chat & Learn" tab
  → Type message → Send (Enter or button)
  → AI responds with streaming text (real-time)
  → Conversation persisted to database
  → Context-aware: respects Write/Learn mode + intensity/stage
```

### 4.7 Research Tab (Studio)

```
Right panel → "Research" tab
  → "Open Literature Research Panel" button
    → Slides open the ResearchSidebar overlay
  → OR: Quick PubMed search box
    → Type query + Search
      → Opens Research sidebar with results
  → Keyboard shortcut: Cmd+Shift+L → toggles Research sidebar
```

### 4.8 Checks Tab (Studio)

```
Right panel → "Checks" tab
  → IntegrityPanel embedded inline
  → Run plagiarism & AI-detection check on current document text
  → Results shown inline (see Compliance journey for details)
```

### 4.9 Reference Sidebar

```
Toggle via: Cmd+Shift+R  OR  "View all N references" link
  → Full-width panel slides over the AI panel
  → Lists all references added to current document
  → Search & filter references
  → Add citation button → opens Citation Dialog
  → Remove individual references
  → Close → returns to AI panel
```

### 4.10 Export Workflow

```
Top toolbar → "Export" dropdown
  ├── Export as PDF
  │     → /api/export/pdf POST
  │     → HTML rendered in new browser tab (print-ready)
  └── Export as Word (.doc)
        → /api/export/docx POST
        → .doc file downloaded to local machine
```

---

## 5. Literature Search Journey

**Route:** `/research`

A unified academic literature search engine querying multiple sources: PubMed, Semantic Scholar, OpenAlex, ClinicalTrials.gov, and more.

### 5.1 Search Flow

```
/research
  → Search bar at top
  → Type query (e.g. "metformin type 2 diabetes RCT")
  → Press Enter or click Search
    → Unified search across:
        PubMed, Semantic Scholar, OpenAlex, Clinical Trials, Unpaywall
    → Results displayed with:
        - Paper title
        - Authors
        - Journal & year
        - Evidence level badge (I, II, III, IV, V)
        - Citation count
        - Study type tag
        - Open Access badge (if available)
        - Abstract snippet
    → Sort options: Relevance, Date, Citations
    → Filter options: Evidence Level, Year Range, Study Type, Source
```

### 5.2 Paper Actions

For each search result:

```
Paper card
  ├── "Save to Library" → saves paper to user's library
  ├── "Add to Notebook" → adds as source to current Notebook conversation
  ├── "View PDF" → opens PDF viewer (if available via Unpaywall or user upload)
  ├── "Open in Studio" → saves paper + opens Studio to cite it
  ├── "Cite" → opens Citation Dialog for that paper
  └── DOI link → opens paper on publisher site in new tab
```

### 5.3 AI Synthesis Panel

```
After search results load:
  → "AI Synthesis" panel (right side or modal)
    → AI generates:
        - Key themes across results
        - Consensus findings
        - Research gaps
        - Evidence quality summary
    → "Open in Studio" → exports synthesis to current Studio document
```

### 5.4 Recent Searches

```
Left sidebar / history
  → Lists recent search queries
  → Click to re-run a past search
```

### 5.5 Evidence-Level Filtering

```
Results list → Filter by Evidence Level:
  Level I   – Systematic reviews / Meta-analyses
  Level II  – RCTs
  Level III – Cohort / Case-control studies
  Level IV  – Case series / Case reports
  Level V   – Expert opinion / Editorials
```

---

## 6. Notebook (AI Research Assistant) Journey

**Route:** `/notebook`

The Notebook is a Google NotebookLM-style module: a chat interface grounded in user-uploaded papers and sources.

### 6.1 Starting a Conversation

```
/notebook
  → New conversation panel
  → "Attach Sources" options:
      ├── Upload PDF → extract text + save to library
      ├── Add from Library → select existing saved papers
      ├── Paste a URL → web page ingested as source
      └── Add by DOI/search → search and attach
  → Type question in chat input
  → Send → AI answers grounded in attached sources (RAG)
  → AI response streams in real-time
```

### 6.2 Chat Features

```
Chat panel
  ├── Follow-up suggestion chips
  │     → AI auto-generates 3-5 follow-up question chips after each answer
  │     → Click chip → sends that question automatically
  ├── Source attribution
  │     → Citations with [1], [2] etc. referencing attached sources
  ├── Thumbs up/down feedback on each AI message
  ├── Copy message button
  ├── Audio Overview
  │     → "Headphones" icon → generates text-to-speech audio summary
  │     → Uses OpenAI TTS
  └── Share dialog
        → Generate shareable link to the conversation
```

### 6.3 Past Conversations

```
Left sidebar / conversation history
  → Lists past Notebook conversations with titles
  → Click → loads that conversation + its sources
  → Delete → removes conversation
```

### 6.4 Source Notes Panel

```
"Sources" tab or notes icon
  → Per-source notes panel
  → Add personal annotations for each attached source
  → Notes stored per-conversation
```

### 6.5 Evidence Extraction

```
For each paper source:
  → "Extract Evidence" button
    → PICO extraction: Population, Intervention, Comparison, Outcome
    → Structured data extracted and shown in Evidence Table
    → "Verify" button → AI re-verifies each extracted data point
    → Export Evidence Table to CSV
```

### 6.6 Highlights & Annotations

```
PDF viewer (if source has PDF):
  → Highlight text → save as annotation
  → Annotations stored per paper
  → Access via /api/research/highlights
```

---

## 7. Deep Research Journey

**Route:** `/deep-research`

An autonomous multi-perspective research synthesis engine that searches across multiple academic databases and generates comprehensive reports.

### 7.1 Starting Deep Research

```
/deep-research
  → Input field: "What would you like to research?"
  → Example: "Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
  → Select Research Mode:
      ├── Quick   (Zap icon)     – Fast synthesis, ~2-3 min
      ├── Standard (Search icon) – Balanced depth, ~5-8 min
      ├── Deep    (Layers icon)  – Thorough analysis, ~10-15 min
      └── Exhaustive (Database) – Maximum coverage, ~20-30 min
  → Press Enter or "Start Deep Research"
```

### 7.2 Research Plan Phase

```
Phase 1: Plan Preview
  → AI generates a multi-perspective research plan
  → Shows planned "perspectives" (research angles):
      e.g. Clinical Efficacy, Safety Profile, Mechanisms, Cost-effectiveness
  → User can:
      ├── Confirm plan → execute research with these perspectives
      ├── Regenerate plan → generate alternative perspectives
      └── Stop / Abort → cancel and return to idle
```

### 7.3 Research Execution Phase

```
Phase 2: Running
  → Progress Stepper (left panel) showing stages:
      1. Search Round 1 – initial literature search
      2. Citation Traversal – follows citation chains
      3. Search Round 2 – expanded search based on findings
      4. Full-Text Extraction – retrieves and reads papers
      5. Data Extraction – extracts structured data
      6. Synthesis (Perspectives) – per-perspective synthesis
      7. Synthesis (Summary) – overall synthesis
      8. Tables – generates evidence tables
      9. Critique – identifies gaps and contradictions
  → Streaming content (right panel) shows sections being written in real-time
  → Abort button available at any time
```

### 7.4 Research Report

```
Phase 3: Done
  → Full research report rendered (Markdown)
  → Topic + mode header
  → Total sources analyzed count
  → Sections: Introduction, Perspectives, Evidence Summary, Tables, Gaps, Contradictions
  → Export options:
      ├── Copy Markdown
      ├── Download as PDF
      └── Open in Studio (sends to writing editor)
  → "Save to Library" button
      → Saves research session with topic, mode, sources, key findings
  → "Start New Research" → resets to idle state
```

### 7.5 Past Research Sessions

```
Idle state (bottom of page):
  → "Past Research Sessions" component
  → Lists saved sessions with topic + date
  → Click → reloads that session's report
  → Delete session option
```

---

## 8. Library Journey

**Route:** `/library`

The library is the user's personal repository of all saved academic papers.

### 8.1 Library Views

```
/library
  ├── Collections sidebar (left)
  │     ├── All Papers (count)
  │     ├── Favorites (starred papers)
  │     └── Custom collections (by collection name)
  └── Papers list (main)
        → Each paper shows:
            - Source icon (PDF upload vs. web source)
            - Title
            - Authors
            - Journal + Year
            - Citation count
            - Study type tag
```

### 8.2 Adding Papers

```
From Library page:
  → Left sidebar → "Upload PDF" button
    → File picker → select .pdf
    → PDF processed:
        1. Metadata extracted (title, authors, abstract)
        2. Paper record created
        3. PDF uploaded to cloud storage
        4. Full processing pipeline: extract → chunk → embed (for RAG)
    → Paper appears in library

From Research page:
  → "Save to Library" on any search result

From Notebook:
  → Papers attached as sources are saved automatically
```

### 8.3 Searching & Filtering

```
Search bar: text search across title, authors, abstract
Sort options:
  - Recently Added
  - Title A-Z
  - Citation Count
  - Year
Filters:
  - Project (dropdown: filter papers by project)
  - Study Type (dropdown: RCT, Meta-Analysis, etc.)
  - Year range (from/to number inputs)
  - Clear Filters button (appears when filters are active)
```

### 8.4 Paper Actions

```
Each paper card:
  ├── "Cite" button
  │     → Opens Citation Modal
  │         → Tab selector: APA 7 / MLA 9 / Chicago / Vancouver / Harvard / BibTeX
  │         → Full citation displayed
  │         → Copy Citation button
  │         → Copy In-Text button (for parenthetical citations)
  │
  ├── "Cite in Editor" button
  │     → Saves citation to sessionStorage
  │     → Navigates to /editor/new with citation pre-queued
  │
  ├── "View PDF" button (if PDF available)
  │     → Opens full-screen PDF viewer overlay
  │     → Can navigate pages, zoom, scroll
  │
  ├── DOI link → opens publisher page in new tab
  │
  ├── ★ Favorite toggle
  │     → Optimistic UI update
  │     → Toggles paper into/out of Favorites collection
  │
  └── 🗑 Delete button
        → Removes paper from library
        → Optimistic UI update (instant removal)
```

---

## 9. Slides Module Journey

**Route:** `/slides`, `/slides/new`, `/slides/[deckId]`

A manual slide deck builder with import/export capabilities.

### 9.1 Slide Deck List Page

```
/slides
  → Shows grid of existing decks
  → Each deck card:
      - Slide thumbnail (16:9 aspect ratio placeholder)
      - Title
      - Slide count
      - Theme name
      - Last updated date
      - Hover: delete button appears
  → "Create New" button → /slides/new
  → "Import Presentation" button → PowerPoint import flow
```

### 9.2 Create New Slide Deck

```
/slides/new
  → Creation form / wizard
  → Enter deck title
  → Select theme
  → Select audience type
  → Generate or start blank
    → Redirects to /slides/[deckId] (slide editor)
```

### 9.3 PowerPoint Import Flow

```
Slides list page → "Import Presentation" button
  → File picker opens (accepts .pptx only, max 50MB)
  → Parsing phase (status: "Extracting preview")
      → Progress chips: "Extracting preview" → "Creating deck"
      → Extracts slide structure: titles, layout types, image counts, preview text
  → Ready phase: Preview shown
      → Deck title
      → Slide count + theme name + file name
      → Grid of up to 6 slide previews showing:
          - Slide index
          - Layout type (e.g. TITLE_SLIDE, CONTENT_SLIDE)
          - Image count
          - Title text
          - Preview text (truncated)
      → Import warnings (if any limitations detected)
      → "Import into ScholarSync" button
          → Uploads to /api/slides/import-pptx
          → Deck created → redirects to /slides/[deckId]
      → "Choose another file" button (restart import)
      → Close (X) button → cancels import
  → Error states:
      - Not a .pptx file
      - File exceeds 50MB
      - Password-protected file
      - Corrupt/invalid file
```

### 9.4 Slide Editor

```
/slides/[deckId]
  → Split-pane editor:
      ├── Left panel: slide thumbnails / outline
      ├── Center: current slide canvas
      │     → Click elements to select
      │     → Edit text inline
      │     → Drag to reposition
      │     → Resize handles on elements
      ├── Right panel: element properties / styling
  → Toolbar:
      ├── Add slide
      ├── Delete slide
      ├── Duplicate slide
      ├── Reorder slides (drag)
      ├── Theme selector
      ├── Add text block
      ├── Add image
      ├── Add chart/graph
  → Export:
      ├── Download as PPTX
      └── Export as PDF
```

### 9.5 Delete Deck

```
Deck card (on list page) → Hover → Delete icon (top right)
  → Confirm dialog: "Delete this presentation?"
  → Confirmed → deck removed from list
```

---

## 10. Presentation Module Journey (AI-Powered)

**Route:** `/presentation`, `/presentation/new`, `/presentation/[deckId]`

The AI-powered presentation generator: turns research papers, topics, or documents into fully designed slide decks.

### 10.1 Presentation List Page

```
/presentation
  → Grid of existing AI-generated decks
  → Each deck card:
      - Color preview using deck theme (primary color strip at top)
      - Title in theme's primary color
      - Slide count
      - Last updated date
      - "AI" sparkle badge (if AI-generated)
      - Hover: delete button
  → "New Presentation" button → /presentation/new
```

### 10.2 Creating a New AI Presentation

```
/presentation/new
  → Step 1: Choose Source
      ├── Research Paper (upload PDF or select from library)
      ├── Enter Topic (free text)
      ├── Paste Abstract
      └── Upload Document

  → Step 2: Configure Presentation
      ├── Presentation title
      ├── Select Theme:
      │     modern / academic / minimal / vibrant / dark / clinical / etc.
      ├── Audience Type:
      │     General / Medical / Conference / Grant Committee / Students
      ├── Number of slides (slider or input)
      └── Tone: Professional / Conversational / Technical

  → Step 3: Preprocessing (if paper uploaded)
      → /api/presentations/preprocess
      → Extracts key content, sections, data from the document

  → "Generate Presentation" → /api/presentations/generate
      → AI generates slide-by-slide content
      → Streaming progress shown
      → Each slide: title, bullet points, speaker notes, visual suggestions

  → On completion → redirects to /presentation/[deckId]
```

### 10.3 Presentation Viewer / Editor

```
/presentation/[deckId]
  → Full-screen presentation view
  ├── Slide canvas: rendered slide with theme applied
  ├── Slide navigator (left panel): thumbnails
  ├── Speaker notes panel (bottom)
  └── Actions toolbar:
        ├── Edit Slide → /api/presentations/edit-slide
        │     → Click on any slide element → AI rewrites it
        ├── Regenerate Slide → re-generates the entire slide with AI
        ├── Add Slide
        ├── Delete Slide
        ├── Present Mode → full-screen slideshow
        └── Export:
              ├── Export as PPTX → /api/export/pptx
              └── Export as PDF → /api/export/presentation-pdf
```

### 10.4 Presentation Agent

```
/api/presentations/agent
  → Conversational slide editing
  → "Edit this slide: make it more visual"
  → "Add a slide about methodology after slide 3"
  → AI processes the instruction and modifies the deck
```

### 10.5 Presentation Coach

```
/api/presentations/coach
  → Practice mode
  → User speaks/types through slides
  → AI evaluates delivery, pacing, clarity
  → Feedback on each slide's talking points
```

### 10.6 Defense Prep

```
/api/presentations/defense-prep
  → Generates Q&A preparation for thesis/viva defense
  → Anticipates committee questions
  → Provides model answers based on slide content
```

---

## 11. LaTeX Editor Journey

**Route:** `/latex`, `/latex/new`, `/latex/[projectId]`

A full collaborative LaTeX writing environment with live compile-and-preview, AI assistance, and version control.

### 11.1 LaTeX Project List

```
/latex
  → Grid of existing LaTeX projects
  → Each project card:
      - Article icon
      - Project title
      - Last modified date
      - Compiler type (pdflatex / xelatex / lualatex)
      - Hover: delete button
  → "New Paper" button → /latex/new
```

### 11.2 Creating a New LaTeX Project

```
/latex/new
  → New project form:
      ├── Project title
      ├── Select journal template:
      │     → 1000+ journal templates (IEEE, Elsevier, Springer, etc.)
      │     → Search/filter by journal name
      ├── Compiler selection: pdflatex / xelatex / lualatex
      ├── Starting template: Blank / Research Article / Review / Thesis / etc.
      └── "Create Project" → /latex/[projectId]
```

### 11.3 LaTeX Editor Interface

```
/latex/[projectId]
  ← Three-pane layout: →

  Left Panel: File Tree
    ├── main.tex (primary file)
    ├── references.bib
    ├── figures/ (folder)
    │     → Upload images: /api/latex/images
    ├── Other .tex files
    └── "New File" button

  Center Panel: Code Editor (CodeMirror)
    ├── Syntax highlighting for LaTeX
    ├── Line numbers
    ├── AI Autocomplete:
    │     → Triggered on typing / Tab
    │     → /api/latex/complete
    │     → Inline ghost-text suggestions
    ├── Inline Editing:
    │     → Select text → "AI Edit" tooltip
    │     → /api/latex/inline-edit
    │     → Rewrites selected LaTeX with AI instruction
    ├── Spell Check:
    │     → /api/latex/spell-check
    │     → Red underline for spelling errors
    ├── Compile button → /api/latex/compile
    ├── Auto-fix button:
    │     → /api/latex/auto-fix
    │     → AI detects and fixes compilation errors
    └── Track Changes:
          → /api/latex/track-changes
          → View diff between versions

  Right Panel: PDF Preview
    ├── Live PDF preview after compilation
    ├── SyncTeX support:
    │     → Click in editor → jumps to corresponding PDF location
    │     → Click in PDF → jumps to corresponding source line
    │     → /api/latex/synctex
    └── Zoom / pan controls
```

### 11.4 AI Draft Chat

```
LaTeX editor → "AI Draft" / chat panel
  → /api/latex/draft-chat
  → Conversational AI for LaTeX writing help
  → Context-aware of current document
  → Examples:
      - "Write the methods section for a clinical trial"
      - "Add a table comparing baseline characteristics"
      - "Fix the bibliography format for Vancouver style"
```

### 11.5 Citation Search in LaTeX

```
LaTeX editor → Citation panel / \cite{} trigger
  → /api/latex/cite-search
  → Search PubMed and existing .bib file
  → Select paper → inserts \cite{key} in editor
  → Updates references.bib automatically
```

### 11.6 Comments & Collaboration

```
LaTeX editor → Comments panel
  → Add inline comment on a line:
      → /api/latex/comments (POST)
  → View all comments:
      → /api/latex/comments (GET)
  → Resolve/delete comment:
      → /api/latex/comments/[commentId] (PATCH/DELETE)
  → Real-time collaboration via Liveblocks
      → Multiple users editing simultaneously
      → Presence indicators showing collaborators
      → Cursors shown for other users
```

### 11.7 Version History

```
LaTeX editor → "History" / Version control panel
  → Lists all saved versions with timestamps
  → /api/latex/versions (GET)
  → Click version → view that version's content
  → "Restore" button:
      → /api/latex/versions/[versionId]/restore
      → Replaces current content with that version
  → Delete version
```

### 11.8 Image Management

```
LaTeX editor → "Figures" panel
  → Upload image: /api/latex/images (POST)
  → View all project images: /api/latex/images/list
  → Click image → inserts \includegraphics{...} in editor
  → Delete image
```

### 11.9 Compilation

```
Compile button
  → /api/latex/compile
  → Returns:
      ├── Success: PDF binary → shown in preview panel
      └── Error: LaTeX log with error messages
            → Auto-fix option: /api/latex/auto-fix
                → AI analyzes errors and suggests/applies fixes
                → Re-compiles automatically
```

---

## 12. Systematic Review Journey

**Route:** `/systematic-review`, `/systematic-review/[projectId]`

A PRISMA 2020-compliant systematic review pipeline with AI-powered screening, data extraction, risk of bias assessment, and meta-analysis.

### 12.1 Creating a Systematic Review Project

```
/systematic-review
  → Existing projects shown as cards with:
      - Title
      - Current stage badge (color-coded):
          search_strategy / screening / full_text_screening /
          data_extraction / risk_of_bias / meta_analysis / reporting
      - Paper count
      - Screening progress % bar
  → "New Review" button
    → Title input: "e.g. Metformin vs Sulfonylureas for T2DM: A Systematic Review"
    → Press Enter or "Create Review"
      → Project created → opens project page
```

### 12.2 Systematic Review Project Pipeline

```
/systematic-review/[projectId]
  → Full pipeline with stage navigation tabs/sidebar

  Stage 1: Search Strategy
    → Define PICO framework:
        Population, Intervention, Comparison, Outcome
    → Protocol builder:
        → AI assists in building the formal review protocol
    → Define search strings for:
        PubMed, Cochrane Central, ClinicalTrials.gov, etc.
    → Execute searches (search connectors):
        → /lib/systematic-review/search-connectors/clinicaltrials-gov.ts
        → /lib/systematic-review/search-connectors/cochrane-central.ts
    → Snowballing (citation chaining):
        → Forward/backward citation tracking
        → /lib/systematic-review/snowballing.ts

  Stage 2: Screening (Title/Abstract)
    → Papers listed for screening
    → For each paper: Include / Exclude / Maybe
    → Dual screening support:
        → Two reviewers assigned
        → /lib/systematic-review/dual-screening.ts
    → AI-assisted screening:
        → Active learning: AI pre-ranks papers by relevance
        → /lib/systematic-review/active-learning.ts
    → Consensus resolution for conflicts between reviewers

  Stage 3: Full-Text Screening
    → Filtered papers from Stage 2
    → Upload or link full-text PDFs
    → Apply inclusion/exclusion criteria in detail
    → Record reason for exclusion

  Stage 4: Data Extraction
    → Standardized data extraction forms
    → /lib/systematic-review/data-extraction.ts
    → AI-assisted extraction from PDFs
    → Extract: sample sizes, outcomes, effect sizes, etc.
    → Audit trail for all extraction decisions
    → /lib/systematic-review/audit-trail.ts

  Stage 5: Risk of Bias Assessment
    → Multiple assessment tools available:
        ├── RoB 2 (for RCTs): /lib/systematic-review/rob2-assessment.ts
        ├── ROBINS-I (for non-randomized studies): robins-i-assessment.ts
        ├── QUADAS-2 (diagnostic accuracy): quadas2-assessment.ts
        ├── Newcastle-Ottawa Scale: newcastle-ottawa.ts
        └── PROBAST (prediction models): probast-assessment.ts

  Stage 6: Meta-Analysis
    → Statistical meta-analysis: /lib/systematic-review/meta-analysis.ts
    → Network meta-analysis: /lib/systematic-review/network-meta-analysis.ts
    → Visualizations:
        ├── Forest plots
        ├── Funnel plots
        ├── L'Abbé plots
        ├── Galbraith plots
        └── PRISMA flow diagram: /lib/systematic-review/prisma-flow.ts
    → Heterogeneity statistics (I², Q-test, tau²)
    → Sensitivity analysis / meta-regression
    → Cumulative meta-analysis

  Stage 7: Reporting
    → PRISMA 2020 checklist: /lib/systematic-review/prisma-checklist.ts
    → AMSTAR-2 quality assessment: amstar2-checklist.ts
    → MOOSE checklist (observational studies): moose-checklist.ts
    → Evidence quality:
        ├── GRADE assessment: /lib/systematic-review/grade-assessment.ts
        └── CERQUAL (qualitative): cerqual-assessment.ts
    → Manuscript generation: /lib/systematic-review/manuscript-generator.ts
    → Export options:
        ├── RevMan 5 format: /lib/systematic-review/revman-export.ts
        ├── CSV / Excel data export
        └── Reference formats: APA, Vancouver, BibTeX, RIS, etc.
```

### 12.3 Living Review

```
Settings for the review:
  → Enable "Living Review" mode
  → /lib/systematic-review/living-review.ts
  → Automated alerts when new papers matching search criteria are published
  → Periodic re-screening suggestions
  → Version-controlled review history
```

### 12.4 Collaboration

```
Review project → Collaborators panel
  → Invite co-reviewers by email
  → Role assignment: Lead Reviewer / Co-Reviewer / Observer
  → Real-time collaboration via Liveblocks
  → Screening assignments distributed across team
  → Conflict resolution workflow
  → /lib/systematic-review/collaboration.ts
```

### 12.5 Evidence Gap Map

```
Analysis section:
  → /lib/systematic-review/evidence-gap-map.ts
  → Visual matrix showing evidence density across interventions and outcomes
  → Identifies under-researched areas
```

---

## 13. Illustration Module Journey

**Route:** `/illustrate`, `/illustrate/editor`, `/illustrate/editor/[id]`, `/illustrate/agent`, `/illustrate/credits`

A scientific figure and illustration generator tailored for academic papers.

### 13.1 Illustrate Landing Page

```
/illustrate
  → Welcome/landing component
  → Options:
      ├── "Create New Illustration" → /illustrate/editor
      ├── "Open Existing" → /illustrate/editor/[id]
      └── "Use AI Agent" → /illustrate/agent
```

### 13.2 Illustration Editor

```
/illustrate/editor  OR  /illustrate/editor/[id]

  Multi-store architecture:
    - editorStore: canvas state, selected elements
    - layerStore: layer management (order, visibility, lock)
    - exportStore: export settings and formats
    - conversationStore: AI chat history
    - useAgentStore: AI agent state

  Canvas:
    ├── Create/edit vector-based scientific figures
    ├── Shapes, lines, arrows, text labels
    ├── Color palettes appropriate for scientific publication
    ├── Grid alignment tools
    └── Zoom / pan

  Left panel: Layer manager
    → Add layer
    → Rename layer
    → Toggle visibility (eye icon)
    → Lock layer
    → Reorder (drag)
    → Delete layer

  Right panel: Element properties
    → Selected element: position, size, color, stroke, opacity
    → Text: font, size, weight, alignment

  AI Generation:
    → /api/illustration/generate
    → Text prompt: "Draw a cell signaling pathway showing mTOR activation"
    → AI generates SVG/canvas elements
    → Results appear on canvas; can edit further

  Icons library:
    → /api/illustration/icons
    → /api/illustration/icons/search — search icon library
    → /api/illustration/icons/generate — AI-generate custom icon
    → Insert icon into canvas

  Export:
    → Export as SVG
    → Export as PNG (high-DPI)
    → Export as PDF
    → /api/illustration/save — save to user account
```

### 13.3 AI Agent Mode

```
/illustrate/agent
  → Chat-based figure creation
  → /api/illustration/agent/chat
  → User describes figure in natural language:
      "Create a bar chart comparing drug efficacy at 3 doses with error bars"
  → Agent iteratively creates and refines the illustration
  → Conversation history maintained
  → "Apply to canvas" → transfers result to editor
```

### 13.4 Credits

```
/illustrate/credits
  → Shows remaining AI generation credits
  → Usage history
  → Upgrade options
```

---

## 14. Journal Feed Journey

**Route:** `/feeds`

A Google Reader-style academic journal RSS/Atom feed reader with AI Copilot.

### 14.1 Adding Feeds

```
/feeds → "Add Feed" button
  → AddFeedModal opens
  ├── Option A: Enter RSS/Atom URL directly
  ├── Option B: Search by journal name
  │     → /api/feeds/discover — searches for journal feeds
  │     → /api/feeds/detect  — auto-detects feed URL from journal website
  └── Option C: Search PubMed journals
        → /api/feeds/pubmed — finds PubMed journal feeds
        → Subscribe → feed added to sidebar
```

### 14.2 Managing Subscriptions

```
Left sidebar: Feed list
  ├── All Articles (aggregated view)
  ├── Starred
  └── Per-feed subscriptions (with unread count badges)
        → Click feed → filters article list to that feed
        → Right-click / options:
            - Unsubscribe → /api/feeds/[id] (DELETE)
            - Mark all read
```

### 14.3 OPML Import/Export

```
Header toolbar:
  ├── Export → downloads scholarsync-feeds.opml
  │     → /api/feeds/opml/export
  └── Import → file picker (.opml or .xml)
        → /api/feeds/opml/import
        → Reports: "Imported N feeds, N already subscribed, N failed"
        → Reloads subscriptions
```

### 14.4 Reading Articles

```
Article list (center panel)
  → Layout options: List / Card / Magazine
  → Sort by: Newest / Oldest / Relevance
  → Click article → opens in Article Reader (right panel)

Article Reader panel:
  ├── Article title + metadata
  ├── Full text / abstract display
  ├── "Open Original" → opens in new tab
  ├── Read/Unread toggle
  ├── Star (save) toggle → /api/feeds/articles/[id]/star
  ├── Save → /api/feeds/articles/[id]/save
  ├── Notes → /api/feeds/articles/[id]/notes (add personal notes)
  ├── Cite → opens CitationModal
  │     → Generates APA/MLA/etc. citation for the article
  ├── Related articles → /api/feeds/articles/[id]/related
  └── "AI Copilot" button → opens Copilot panel
```

### 14.5 AI Copilot Panel

```
Article selected → "AI Copilot" button (or 'a' keyboard shortcut)
  → CopilotPanel opens (replaces article reader)

  ├── Summarize → /api/feeds/copilot/summarize
  │     → AI generates structured summary:
  │         Background / Methods / Results / Conclusion
  │
  ├── Related papers → /api/feeds/copilot/related
  │     → Finds semantically similar papers
  │
  └── Chat about this article → /api/feeds/copilot/chat
        → Type question → streaming AI answer grounded in article text
        → "How does this apply to pediatric patients?"
```

### 14.6 Keyboard Shortcuts (Feed Reader)

| Key | Action |
|-----|--------|
| `j` | Next article |
| `k` | Previous article |
| `o` | Open article in browser |
| `s` | Star / unstar article |
| `c` | Cite article |
| `a` | Toggle AI Copilot |
| `/` | Focus search input |

### 14.7 Mark All Read

```
Header → "Mark all read" button
  → /api/feeds/articles/mark-all-read (POST)
  → All unread articles marked as read
  → Unread count badge clears
```

---

## 15. Writing Analysis Journey

**Route:** `/analysis`

An AI-powered writing quality analyzer with readability scoring, AI content detection, and writing improvement suggestions.

### 15.1 Opening the Analyzer

```
/analysis
  → Source mode selector:
      ├── "From Document": loads text from active Studio project
      └── "Paste Text": manual text entry
```

### 15.2 Document Source Mode

```
Source Mode: From Document
  → Project selector dropdown (if multiple projects)
  → Active document text loads automatically (read-only textarea)
  → Shows: project name + document title
  → "N words" word count
```

### 15.3 Paste Text Mode

```
Source Mode: Paste Text
  → Editable textarea
  → Paste or type text directly
  → Word count updates live
```

### 15.4 Instant Client-Side Analysis (Live)

```
As text is entered/loaded (debounced 500ms):
  → Right panel instantly shows:
      ├── Circular readability gauge (Flesch Reading Ease score)
      ├── Readability label: Excellent / Good / Needs Improvement / Poor
      ├── Counts: Words / Sentences / Paragraphs
      ├── Readability scores:
      │     - Flesch-Kincaid Grade Level
      │     - Gunning Fog Index
      │     - Flesch Reading Ease
      │     - Average Sentence Length
      ├── Writing quality badges:
      │     - Passive Voice count
      │     - Weasel Words count
      │     - Adverbs count
      │     - Complex Sentences count
      └── Issues list (up to 10 shown, +N more):
            - Passive voice instances
            - Weasel word usage
            - Complex sentence suggestions
```

### 15.5 AI-Powered Full Analysis

```
"Analyze Writing" button (requires ≥50 characters)
  → /api/integrity-check (POST)
  → Full analysis returns:
      ├── AI Detection results:
      │     - Human Score %
      │     - AI Score %
      │     - Overall Risk: low / medium / high
      │     - Per-paragraph breakdown with human probability
      ├── Writing quality suggestions (AI-generated)
      ├── Plagiarism indicators with similarity %
      └── Readability grade
```

### 15.6 Results View

```
After analysis completes:
  → Left: document text with color-coded paragraphs:
      - Red border:   AI-generated / low human probability (<40%)
      - Yellow border: mixed content (40-70%)
      - Green border:  human-written (>70%)
  → Each paragraph shows flags (if any)
  → Right panel: Analysis sidebar
      ├── Circular gauge for overall readability
      ├── Tabs:
      │     ├── Issues tab:
      │     │     - AI suggestions (purple cards)
      │     │     - Writing issues from write-good library
      │     │     - Plagiarism indicators (red/yellow/gray)
      │     └── Detailed Metrics tab:
      │           - Readability section
      │           - Writing quality section
      │           - AI Detection section
      │           - Per-paragraph breakdown table
      └── "← Analyze New Text" → resets to input mode
```

---

## 16. Compliance & Integrity Check Journey

**Route:** `/compliance`

Advanced plagiarism detection using Copyleaks integration, AI content detection, humanization tools, and real-time integrity monitoring.

### 16.1 Opening Compliance

```
/compliance
  → Source mode: "From Document" or "Paste Text" (same as Analysis)
  → Project selector for document mode
```

### 16.2 Integrity Check Flow

```
Text loaded/pasted → "Run Integrity Check" button
  → /api/integrity-check (full analysis)
  → Results:
      ├── Overall plagiarism score
      ├── AI detection score
      └── Per-paragraph breakdown

  → Copyleaks integration:
      → /api/copyleaks
      → Deep web-wide plagiarism scan
      → Returns:
          - Overall similarity score %
          - Source matches with URLs and % similarity
          - Highlighted matching text excerpts
```

### 16.3 Batch Upload

```
/compliance → "Batch Upload" option
  → /api/integrity-check/batch
  → Upload multiple documents at once
  → Queued processing
  → Results per document in a table
```

### 16.4 Humanize Tool

```
Integrity check results → "Humanize" tab or button
  → /api/integrity-check/humanize
  → Selects AI-flagged paragraphs
  → AI rewrites them to sound more human
  → Side-by-side comparison: original vs. humanized
  → Accept individual changes or all
```

### 16.5 Paraphrase Tool

```
Select text in document → "Paraphrase" option
  → /api/integrity-check/paraphrase
  → AI generates alternative phrasing
  → Multiple options shown
  → Accept/reject individual paraphrases
```

### 16.6 Real-Time Integrity (Live Mode)

```
/compliance → "Live" toggle / useRealtimeIntegrity hook
  → /api/live-session/[sessionId]/stream
  → Server-Sent Events stream
  → As user types in the editor:
      → Paragraphs analyzed in real-time
      → Color indicators update continuously
      → No need to manually run check
```

### 16.7 Diff View

```
After edits:
  → "Show Diff" / DiffView component
  → Side-by-side: original vs. current text
  → Changes highlighted (additions green, removals red)
```

### 16.8 Integrity Check History

```
/compliance → "History" tab
  → /api/integrity-check/history
  → List of all past checks with:
      - Date/time
      - Document title
      - Score achieved
      - Click to view full report
```

### 16.9 Report Download

```
After integrity check:
  → "Download Report" button
  → /api/integrity-check/report
  → PDF report generated with:
      - Executive summary
      - Plagiarism sources list
      - AI detection breakdown
      - Per-paragraph analysis
```

---

## 17. Settings Journey

**Route:** `/settings`

User preferences, account management, billing, and usage tracking.

### 17.1 Account Settings

```
/settings → "My Account" tab
  → Profile card:
      - Avatar (initials placeholder)
      - Name
      - Email (from Clerk auth)
      - "Verified Student" badge
  → Editable fields:
      - Full Name
      - Specialty / Institution
      - Country
      - Bio (textarea)
      - Research Interests (chip-style tag input):
          → Type interest + Enter or "+" button to add
          → X on chip to remove
      - ORCID iD (researcher identifier)
  → "Save Changes" button → /api/user/profile (PATCH)
  → Success/error feedback message (auto-clears after 3s)
```

### 17.2 Plans & Billing

```
/settings → "Plans & Billing" tab
  → Current plan section:
      - Plan name (Free / Basic / Pro)
      - Monthly price (₹0 / ₹1,000 / ₹2,500)
      - Token quota display
      - "Active" badge
      - "Manage Plan" button → /api/billing/subscription
  → Payment method:
      - Card display (last 4 digits)
      - "Razorpay Secure" label
      - "Update" button → Razorpay payment flow
  → Invoice history table:
      - Date, Description, Amount
      - "Download" button per invoice
```

### 17.3 Billing / Payment Flow

```
Upgrade plan:
  → "Manage Plan" → select new plan
  → /api/billing/create-order → Razorpay order created
  → Razorpay checkout modal opens
  → User completes payment (card / UPI / net banking)
  → /api/billing/verify-payment → payment verified
  → Plan updated → usage limits refreshed
  → /api/billing/webhook → handles Razorpay webhooks for async events
```

### 17.4 Usage Tracking

```
/settings → "Usage Tracking" tab
  → Progress bars:
      - AI Tokens: [used] of [limit] tokens/month
      - Deep Searches: [used] (unlimited / fair use)
      - Plagiarism Checks: [used] of [limit] per month
  → "This Month at a Glance" grid:
      - Tokens Used
      - Searches
      - Plagiarism Checks
      - Exports
```

### 17.5 Preferences

```
/settings → "Preferences" tab
  → Theme: Light / Dark / System (ThemeToggle component)
  → Editor Font Size: 14px / 16px (default) / 18px / 20px
  → Default Citation Format: APA 7 / MLA 9 / Chicago 17 / Vancouver
  → Preferred Language: English / Hindi / Spanish / French / German /
                         Portuguese / Chinese / Japanese / Korean
  → "Save Preferences" → /api/user/profile (PATCH)
  → Success/error feedback
```

---

## 18. Projects Journey

**Route:** `/projects`

Organizes research work into projects that link documents, papers, and analyses together.

```
/projects
  → Grid of existing projects
  → Each project card:
      - Project title
      - Description
      - Paper count
      - Document count
      - Created/updated date

  → "New Project" button
    → Name + description
    → Create → project appears in list

  → Click project:
    → Project detail view:
        ├── Linked papers (from library)
        ├── Studio documents
        ├── LaTeX files
        └── Notes

  → Delete project

  Projects are referenced across the app:
    - Library: filter papers by project
    - Studio: associate documents with projects
    - Analysis: select project for document analysis
    - Settings: usage stats per project
```

---

## 19. Poster Creation Journey

**Route:** `/poster/new`, `/poster/[posterId]`

AI-powered academic conference poster generator.

### 19.1 Creating a Poster

```
/poster/new
  → Select source:
      ├── Upload research paper (PDF)
      ├── Enter abstract text
      └── Select from library
  → Configure:
      ├── Poster size: A0 / A1 / custom dimensions
      ├── Orientation: Portrait / Landscape
      ├── Color theme
      └── Layout template: Classic / Modern / Minimal
  → "Generate Poster"
    → /api/posters/generate
    → AI creates structured poster layout:
        - Title + authors + institution
        - Introduction / Background
        - Methods
        - Results (with figures placeholders)
        - Conclusion
        - References
    → Redirects to /poster/[posterId]
```

### 19.2 Poster Editor

```
/poster/[posterId]
  → Visual canvas editor
  ├── Click any section → edit text inline
  ├── Upload figures into placeholder boxes
  ├── Adjust layout (drag sections)
  ├── Change colors/fonts
  └── Export:
        ├── Export as PDF (print-ready, high DPI)
        └── Export as PNG
```

---

## 20. Cross-Module Integration Flows

These are key journeys that span multiple modules:

### 20.1 Research → Write Pipeline

```
/research
  → Search for papers on a topic
  → Save papers to library
  → Click "Open in Studio" on a synthesis
    → Redirects to /studio
    → Synthesis text pasted or cited in document
  → Continue writing with references available
  → Check writing quality via /analysis
```

### 20.2 Library → Notebook Pipeline

```
/library
  → Browse saved papers
  → Select papers
  → "Open in Notebook" / add to new conversation
    → /notebook opens with papers as sources
  → Chat with AI grounded in those papers
  → Copy AI answer → paste into /studio
```

### 20.3 Research → Presentation Pipeline

```
/research  OR  /deep-research
  → Find / synthesize research
  → Save to library
  → Go to /presentation/new
  → Select "From Library" papers as source
  → AI generates presentation
  → Edit in /presentation/[deckId]
  → Export as PPTX
```

### 20.4 LaTeX → Notebook → Compliance Pipeline

```
Write paper in /latex/[projectId]
  → Compile draft
  → Open /notebook
    → Upload draft PDF as source
    → Ask "What are the weaknesses of my methodology?"
    → Revise based on feedback
  → Export revised LaTeX
  → Run /compliance check on final draft
  → Download compliance report
  → Submit manuscript
```

### 20.5 Systematic Review → Studio Pipeline

```
/systematic-review/[projectId]
  → Complete all 7 stages through to reporting
  → Manuscript Generator: generates draft manuscript
  → "Open in Studio" or export as .docx
    → /studio opens with generated manuscript
  → Polish with AI assistance
  → Integrity check before submission
```

### 20.6 Feeds → Library Pipeline

```
/feeds
  → Browse journal articles in feed
  → Find interesting paper
  → Click "Save" on article
    → Paper added to /library
  → Open in /notebook for deep analysis
```

### 20.7 Illustrate → LaTeX/Studio Pipeline

```
/illustrate/editor
  → Create scientific figure (pathway diagram, chart, etc.)
  → Export as PNG/SVG
  → Import into /latex (via LaTeX images panel)
    → \includegraphics{figure.png} inserted
  OR
  → Insert into /studio document
    → Image uploaded to document
```

---

## 21. Keyboard Shortcuts & Power-User Flows

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` / `Ctrl+K` | Open Command Palette (quick navigation, search, actions) |

### Studio Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+C` | Open Citation Dialog |
| `Cmd+Shift+R` | Toggle Reference Sidebar |
| `Cmd+Shift+L` | Toggle Literature Research Sidebar |
| `/` in editor | Open slash command menu |
| `/continue` | AI continues writing |
| `/summarize` | AI summarizes selection |
| `/find-sources` | Open research sidebar |
| `/cite` | Insert citation |
| `/integrity-check` | Switch to Checks tab |

### Feed Reader Shortcuts

| Key | Action |
|-----|--------|
| `j` | Next article |
| `k` | Previous article |
| `o` | Open in browser |
| `s` | Star/unstar |
| `c` | Cite article |
| `a` | Toggle AI Copilot |
| `/` | Focus search |

### Deep Research Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Start research (from input field) |

---

## 22. Billing & Subscription Journey

### 22.1 Plan Tiers

| Plan | Price | Tokens | Plagiarism Checks |
|------|-------|--------|-------------------|
| Free | ₹0/month | 10,000 tokens | 3/month |
| Basic | ₹1,000/month | Higher limit | 10/month |
| Pro | ₹2,500/month | Highest limit | 50/month |

All plans include unlimited literature searches (fair use policy applies).

### 22.2 Upgrade Flow

```
Settings → Plans & Billing tab
  → OR: any feature with usage limit → "Upgrade" prompt
  → "Manage Plan" button
    → Plan selection UI
    → Select new tier
    → /api/billing/create-order
    → Razorpay checkout modal:
        → Credit/debit card
        → UPI
        → Net banking
        → Wallets
    → Payment completed
    → /api/billing/verify-payment
    → Plan updated in database
    → Redirected back to Settings
    → Token/check limits refreshed
```

### 22.3 Billing Webhooks

```
Razorpay events → /api/billing/webhook
  → payment.captured → activate plan
  → subscription.activated → confirm subscription
  → subscription.cancelled → downgrade to free
  → payment.failed → notify user
```

---

## 23. Public Sharing & Live Presentation Journey

### 23.1 Sharing a Notebook

```
/notebook → Share icon (top bar)
  → NotebookShareDialog opens
  → Generate shareable link
  → Optional: set password protection
  → Copy link
  → Recipient visits /share/notebook/[token]
      → Password prompt (if protected)
      → Read-only notebook viewer with sources
      → Sources listed, chat messages visible
      → Cannot edit (view-only)
```

### 23.2 Sharing a Presentation

```
/presentation/[deckId] → "Share" button
  → Generate public link: /share/[token]
  → Optional: password protection
  → Optional: time-limited link
  → Viewer can see slide deck in read-only mode
  → Can navigate slides, but cannot edit
```

### 23.3 Live Presentation Mode (Audience)

```
Presenter: /presentation/[deckId] → "Present Live" button
  → Creates a live session code (e.g. ABC-123)
  → /api/live-session is created
  → Presenter controls: next slide, previous slide, pointer

Audience: /live/[code]
  → Enter session code
  → OR follow shared link
  → Slides sync in real-time with presenter's current slide
  → /api/live-session/[sessionId]/stream (Server-Sent Events)
  → Audience can see: current slide, slide number, progress
  → Audience CANNOT control navigation

Presenter: /presentation/audience
  → View audience-facing display
  → Laser pointer visible to all audience members
  → Timer overlay
  → Q&A mode: audience can submit questions
```

### 23.4 Presentation Recording

```
/presentation/[deckId] → "Record" button
  → Recording modal opens
  → Selects microphone + optional screen capture
  → Presenter goes through slides while recording
  → Recording uploaded: /api/recordings/upload
  → Stored to Cloudflare R2
  → Shareable recording link generated
  → Playback with synchronized slide navigation
```

---

## 24. Editor Module Journey

**Route:** `/editor`, `/editor/[id]`

The Editor is a standalone document editor (separate from the Studio). It provides the same TipTap-based rich text editing for specific use cases like "Cite in Editor" flow from the Library.

### 24.1 Opening the Editor

```
/editor          → new blank document
/editor/new      → new document (with optional pending citation from sessionStorage)
/editor/[id]     → open specific document by ID
```

### 24.2 Pending Citation Flow

```
Library → "Cite in Editor" button on a paper
  → sessionStorage.setItem("scholarsync_pending_citation", { paperId, title })
  → Navigates to /editor/new
  → Editor detects pending citation
  → Automatically inserts the citation at cursor
  → sessionStorage cleared
```

### 24.3 Editor Features

The Editor shares the core TipTap editing capabilities with the Studio:

```
/editor/[id]
  ├── Full rich-text formatting toolbar
  ├── Slash commands (/cite, /continue, /summarize, etc.)
  ├── Bibliography node (auto-appended when citing)
  ├── Auto-save to database with debounce
  ├── Version history
  ├── Comments & annotations
  ├── Export: PDF / DOCX
  └── Back to Studio link
```

---

## 25. Slide Modes: Gamma & Agent

The Slides module supports three distinct editing interfaces, selectable within `/slides/[deckId]`.

### 25.1 Slides Mode (Classic WYSIWYG)

```
/slides/[deckId] → "Slides" mode tab
  → Traditional presentation editor
  → Left: slide thumbnail filmstrip
  → Center: 16:9 slide canvas (pixel-accurate)
  → Right: Properties panel
  → Click to select elements → resize/move/edit
  → Element types: text, image, shape, chart, table, math, code
  → Block types (30+ available):
      Text, Bullets, Numbered List, Two-Column, Image, Video
      Chart (Bar, Line, Pie, Scatter, Forest Plot)
      Math (KaTeX), Code Block, Diagram (Mermaid), Citation
      Table, Statistics Card, Infographic, Timeline, Quote
      Callout, Divider, Shape, Icon
  → Slide layout templates: Title, Content, Two-Column, Blank,
      Image-Left, Image-Right, Full-Image, Section Header, etc.
  → Master slides: global header/footer/branding
  → Animation system:
      → Per-element entrance animations
      → Exit animations
      → Emphasis effects
      → Animation timeline panel
  → Theme engine:
      → 10+ preset themes
      → Custom theme builder (colors, fonts, background)
      → Real-time preview
```

### 25.2 Agent Mode (AI-Drafting Interface)

```
/slides/[deckId] → "Agent" mode tab
  → AI-first slide creation
  → Sub-modes:

  Draft Mode:
    → Chat interface with AI
    → "Draft 10 slides about GLP-1 agonists in T2DM"
    → AI generates slide outlines → reviewed → accepted
    → Individual slides can be refined iteratively

  Learn Mode:
    → Socratic coaching for creating educational slides
    → AI asks: "What is your target audience?"
    → AI guides slide structure decisions

  Visual Mode:
    → AI suggests and generates visual elements
    → "Add a diagram showing the mechanism of action"
    → Image generation for backgrounds / visuals
    → /api/slides/generate-image

  Illustration Mode:
    → Embedded illustration tool
    → Create scientific figures inline
    → Insert into current slide
```

### 25.3 Gamma Mode (Card-Based Interface)

```
/slides/[deckId] → "Gamma" mode tab
  → Modern card-based UI (inspired by Gamma.app)
  → Slides displayed as vertical scrolling cards
  → Spotlight editing: click card → enters focused edit mode
  → Drag to reorder cards
  → "+" button between cards → insert new slide
  → AI suggestions for each card:
      → Rephrase content
      → Add supporting statistics
      → Suggest better layout
  → Real-time collaboration cursors
```

### 25.4 Slide Collaboration Features

```
/slides/[deckId] with multiple users:
  → Invite collaborators via email → role assignment
  → Real-time presence: avatar stack in toolbar
  → Live cursors: see where collaborators are editing
  → Comment threads: attach comments to specific slides
  → Version history: full diff between versions
  → Conflict resolution: operational transforms
  → "Go to collaborator" → jumps to their current slide
```

---

## Appendix: API Endpoint Summary by Module

| Module | Key API Routes |
|--------|---------------|
| Auth | Clerk (managed), `/api/onboarding/complete` |
| Studio | `/api/chat`, `/api/export/pdf`, `/api/export/docx` |
| Research | `/api/search/unified`, `/api/search/pubmed`, `/api/search/semantic-scholar`, `/api/search/openalex`, `/api/search/clinical-trials` |
| Notebook | `/api/rag-chat`, `/api/extract-pdf-advanced`, `/api/research/pdf-chat`, `/api/research/synthesize`, `/api/audio-overview` |
| Deep Research | `/api/deep-research/plan`, `/api/deep-research/execute`, `/api/deep-research/save`, `/api/deep-research/sessions/*` |
| Library | `/api/papers/save`, `/api/papers/[id]/pdf`, `/api/citations/export` |
| Editor | `/api/export/pdf`, `/api/export/docx` |
| Slides | `/api/slides/*`, `/api/export/pptx` |
| Presentation | `/api/presentations/generate`, `/api/presentations/edit-slide`, `/api/presentations/agent`, `/api/presentations/coach`, `/api/presentations/defense-prep` |
| LaTeX | `/api/latex/*` (compile, complete, auto-fix, cite-search, versions, images, comments, synctex, draft-chat, inline-edit, spell-check, track-changes) |
| Systematic Review | `/api/systematic-review/*` |
| Illustration | `/api/illustration/generate`, `/api/illustration/icons/*`, `/api/illustration/save`, `/api/illustration/agent/chat` |
| Feeds | `/api/feeds/*`, `/api/feeds/articles/*`, `/api/feeds/copilot/*`, `/api/feeds/opml/*` |
| Analysis | `/api/integrity-check` |
| Compliance | `/api/integrity-check/*`, `/api/copyleaks`, `/api/live-session/*` |
| Billing | `/api/billing/create-order`, `/api/billing/verify-payment`, `/api/billing/webhook`, `/api/billing/subscription` |
| Posters | `/api/posters/generate` |
| Sharing/Live | `/api/live-session/*`, `/api/recordings/upload` |
| References | `/api/references/parse`, `/api/references/resolve`, `/api/references/search-pubmed`, `/api/references/zotero` |

---

*This document covers all user-facing journeys as of the codebase state on 2026-03-13. New modules or feature additions should be reflected in updates to this document.*
