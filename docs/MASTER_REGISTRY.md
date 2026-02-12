# ScholarSync - Master UI Registry

> **Last Updated:** 2026-02-11
> **Total Pages:** 12
> **Design System:** Tailwind CSS + Alpine.js + Phosphor Icons
> **Fonts:** Plus Jakarta Sans (UI), Merriweather (editor/serif content)
> **Color Palette:** Indigo (#6366f1) primary, Slate-900 (#0f172a) dark, Sage/Green (#10b981) Learn Mode

---

## Page Index

| # | Page | File | Status | Layout Type |
|---|------|------|--------|-------------|
| 01 | Landing Page | `ui-mockups/01-landing-page.html` | Mockup Complete | Public marketing page |
| 02 | Auth (Sign In/Up) | `ui-mockups/02-auth-page.html` | Mockup Complete | Split-screen auth |
| 03 | Dashboard | `ui-mockups/03-dashboard.html` | Mockup Complete | Sidebar + main content |
| 04 | My Projects | `ui-mockups/04-my-projects.html` | Mockup Complete | Sidebar + table/grid |
| 05 | My Library | `ui-mockups/05-my-library.html` | Mockup Complete | Icon nav + collections sidebar + main |
| 06 | Deep Research | `ui-mockups/06-deep-research.html` | Mockup Complete | Icon nav + search + copilot panel |
| 07 | The Studio (Editor) | `ui-mockups/07-the-studio.html` | Mockup Complete | Nav + sidebar + editor + AI panel |
| 08 | Notebook Mode | `ui-mockups/08-notebook-mode.html` | Mockup Complete | Sources sidebar + chat main |
| 09 | Writing Analysis | `ui-mockups/09-writing-analysis.html` | Mockup Complete | Editor left + analysis panel right |
| 10 | Final Checks (Plagiarism/AI) | `ui-mockups/10-final-checks.html` | Mockup Complete | Editor left + reports right |
| 11 | Slides Generator | `ui-mockups/11-slides-generator.html` | Mockup Complete | Outline + slide canvas + design panel |
| 12 | Settings & Account | `ui-mockups/12-settings.html` | Mockup Complete | Icon nav + settings nav + content |

---

## Detailed Page Breakdown

### 01 - Landing Page
**Purpose:** Marketing/conversion page for new visitors
**Route:** `/` (public)
**Sections:**
- Fixed glass navbar: Logo, Features/Pricing/About links, Sign In, Get Started CTA
- Hero section: Dark bg (slate-950), gradient text headline, two CTAs (Start Free, Watch Demo), floating mockup preview
- Social proof bar: University logos (Stanford, MIT, IIT Bombay, Oxford, AIIMS)
- Features grid: Deep Research (2-col), Learn Mode (1-col), Guided Drafting (3-col dark)
- Pricing section: 3 tiers - Student (Free), Researcher (499/mo), Lab/Team (Custom)
- Footer: Logo, Privacy/Terms/Social links

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "Start Writing for Free" CTA | Navigate to signup | Auth flow |
| "Watch Demo" CTA | Play demo video | Video embed/modal |
| "Get Started" nav button | Navigate to signup | Auth flow |
| "Start Free" pricing | Navigate to signup (free tier) | Auth + free plan |
| "Get Pro" pricing | Navigate to signup + payment | Auth + Razorpay checkout |
| "Contact Sales" pricing | Contact form or email | Email/form handler |

---

### 02 - Auth Page (Sign In / Sign Up)
**Purpose:** User authentication
**Route:** `/auth` or `/login` / `/signup`
**Layout:** 50/50 split - form left, testimonial right (dark panel)
**Components:**
- Toggle between Sign In and Sign Up (Alpine.js `mode` state)
- Google OAuth button ("Continue with Google")
- Email + Password form fields
- Full Name field (signup only)
- Forgot Password link (signin only)
- Testimonial card with star rating on right panel

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "Continue with Google" | OAuth flow | Google OAuth + Convex auth |
| "Sign In" submit | Email/password login | Convex auth |
| "Create Account" submit | Register new user | Convex user creation |
| "Forgot password?" link | Password reset flow | Email reset handler |
| Sign up/Log in toggle | Switch form mode | Client-side only |

---

### 03 - Dashboard
**Purpose:** Home hub after login - overview of activity
**Route:** `/dashboard`
**Layout:** Full sidebar (w-64, dark slate-900) + main content area
**Sidebar Navigation:**
- Dashboard (active), My Projects, My Library, Community
- Tools section: Plagiarism Check, AI Detector
- Credits bar (850/1000 shown), Upgrade Plan link
- User profile: Avatar, name, plan badge, settings gear

**Main Content:**
- Header: Greeting ("Good Morning, Rahul"), search bar, notification bell
- "What do you want to do today?" - 4 action cards:
  - Deep Research (blue) -> Deep Research page
  - Write & Draft (indigo) -> Studio page
  - Learn Mode (green) -> Studio in Learn Mode
  - Final Checks (orange) -> Final Checks page
- Recent Projects table: Document name, type, last edited, status (DRAFTING/COMPLETED/ISSUES FOUND)

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| Deep Research card | Navigate to research | Router |
| Write & Draft card | Navigate to studio | Router + create new project |
| Learn Mode card | Navigate to studio (learn) | Router + mode param |
| Final Checks card | Navigate to checks | Router |
| Search bar | Search projects/papers | Convex query |
| Notification bell | Show notifications | Convex notifications |
| Project row click | Open that project | Router to studio/project |
| Credits bar "Upgrade Plan" | Go to pricing/settings | Router |

---

### 04 - My Projects
**Purpose:** File manager for all user projects
**Route:** `/projects`
**Layout:** Full sidebar + main with tabs
**Features:**
- Header: Title, file count badge, List/Grid view toggle, New Project button
- Tab navigation: All Projects, Research Papers, Learn Sessions
- Filter/search input
- List view: Table with Name, Status, Word Count, Last Edited, actions (edit/delete)
- Grid view: Card layout with preview, title, word count, edit time
- Status badges: DRAFTING (yellow), COMPLETED (green), 2 MATCHES (red)

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "+ New Project" | Create new project | Convex mutation + redirect to Studio |
| Project row click | Open project in Studio | Router |
| Edit icon (pencil) | Open project for editing | Router |
| Delete icon (trash) | Delete project | Convex mutation + confirmation |
| Tab filters | Filter by project type | Client-side filter or Convex query |
| Search input | Filter projects by name | Client-side filter |

---

### 05 - My Library (Reference Manager)
**Purpose:** Zotero/Mendeley-like paper library
**Route:** `/library`
**Layout:** Icon nav (w-16) + Collections sidebar (w-64) + main paper list
**Collections Sidebar:**
- All Papers (142), Favorites (12)
- Folders: Thesis: CRISPR, Biology 101, AI Ethics
- "Upload PDF" button at bottom
- "+ New Collection" button

**Main Area:**
- Search bar: Search by title, author, abstract
- Filter/sort buttons
- Paper cards showing: File type icon (PDF/Web), title, peer review badge, author, journal, year
- Per-paper actions: Cite, Chat with PDF, Favorite, Delete

**Citation Modal (overlay):**
- Format selector: APA 7, MLA 9, Chicago
- Formatted citation text with copy button
- In-text citation with copy button

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "Upload PDF" | File upload | File storage (Convex) + PDF parser |
| "Cite" button | Open citation modal | Client-side formatting |
| "Chat with PDF" | Open notebook/chat with paper | AI chat + PDF context |
| Copy citation | Copy to clipboard | Client-side |
| Favorite (star) | Toggle favorite status | Convex mutation |
| Delete (trash) | Remove from library | Convex mutation |
| Folder navigation | Filter by collection | Convex query |
| "+ New Collection" | Create folder | Convex mutation |

---

### 06 - Deep Research
**Purpose:** PubMed/Semantic Scholar search with AI synthesis
**Route:** `/research`
**Layout:** Icon nav (w-16) + search results + collapsible Copilot panel (w-400)
**Header:**
- Full-width search bar with "Search" button
- Copilot toggle button

**Search Results Area:**
- Filter chips: Last 5 Years, PDF Available (active), High Impact
- TL;DR Synthesis box (AI-generated summary of results, gradient indigo bg)
- Paper result cards: Title, authors, journal, year, method/result tags, PDF badge
- Per-result actions: Ask Copilot, Save, citation count

**Research Copilot Panel (right sidebar):**
- Status indicator (green pulse dot)
- AI Insight section with Yes/No action buttons
- Data Extraction table (auto-extracted data from papers)
- Chat input to ask questions about results

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| Search bar submit | Search PubMed/Semantic | PubMed API + Semantic Scholar API |
| Filter chips | Refine search results | API query params |
| "Ask Copilot" per paper | Send paper to copilot chat | AI context + paper data |
| "Save" per paper | Add to library | Convex mutation |
| "Yes, filter results" | Refine search | Modified API query |
| Data Extraction table | Auto-extracted from papers | AI extraction pipeline |
| Copilot chat input | Ask about search results | AI chat with search context |

---

### 07 - The Studio (Writing Editor)
**Purpose:** Core writing environment - the main product
**Route:** `/studio/:projectId`
**Layout:** Top nav + left sidebar (w-64) + center editor + right AI panel (w-80)
**Top Nav:**
- Logo + Beta badge
- Document title (editable input)
- Write/Learn Mode toggle (Alpine.js state)
- Export button
- User avatar

**Left Sidebar:**
- Current Draft (active), My Library, Deep Research links
- Cited Sources section (cards with PDF/WEB badge, title, author, checkmark)
- AI Credits bar at bottom (850/1000)

**Center Editor (main):**
- Formatting toolbar (Write mode): Text type selector, Bold/Italic/List, AI Rephrase button
- Learn Mode banner (green, shows when Learn mode active): "I won't write for you..."
- Rich text editor (contenteditable, serif font): Title, paragraphs, highlighted text with AI comments, clickable citations
- Placeholder text: "[Start typing or press '/' for AI commands...]"

**Right AI Panel (glass panel):**
- 3 tabs: Chat & Learn, Research, Checks
- Chat tab: AI messages (indigo gradient avatar), user messages, "Yes, draft it" action button, chat input
- Research tab: PubMed/Semantic search, paper results with "Add to Library" button
- Checks tab: AI Detection score (92% human), Plagiarism matches (2 found), "Review Matches" button

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| Write/Learn toggle | Switch editor mode | Client state + different AI behavior |
| Export button | Export to PDF/DOCX | Document generation service |
| AI Rephrase | Rephrase selected text | AI API call |
| '/' commands | AI command palette | AI API call |
| Chat input | Conversational AI help | AI chat API |
| "Yes, draft it" | Insert AI-generated text | AI generation + editor insert |
| Research tab search | Search from within editor | PubMed/Semantic API |
| "Add to Library" | Save paper to library | Convex mutation |
| "Review Matches" | Navigate to Final Checks | Router |
| Citation click (Doudna) | Show citation details | Citation lookup |
| Cited Sources "+ Add" | Add new source | File upload or search |

---

### 08 - Notebook Mode (Chat with Papers)
**Purpose:** NotebookLM-style multi-document chat - ask questions across papers
**Route:** `/notebook/:sessionId`
**Layout:** Sources sidebar (w-80) + full-width chat
**Sources Sidebar:**
- Back arrow to dashboard
- "Notebook Sources" header with file count badge
- Drag-and-drop upload zone
- Source file list with checkboxes (selected/unselected), file size, delete on hover
- "Add Link / URL" button at bottom

**Main Chat Area:**
- Header: "Notebook Chat" title, View Source Notes button, Audio Overview (headphones icon), Share button
- Empty state (hidden in mockup): "Ready to analyze X sources" with suggestion cards (Summarize Key Themes, Find Contradictions)
- Chat messages: User questions (right-aligned, gray bg), AI answers (left, with indigo avatar)
- AI answers include: Numbered lists, inline source citations (clickable badges: "CRISPR-Cas9 Mechanism, p.4")
- Follow-up suggestion chips below AI answers
- Chat input: Textarea with paperclip (attach) and send button
- Disclaimer: "AI can make mistakes. Check important info."

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| Drag-drop upload | Upload files to session | File storage + PDF parsing |
| Source checkbox toggle | Include/exclude source | Client state + AI context |
| "Add Link / URL" | Add web source | URL fetcher + parser |
| Source citation badge | Jump to source page | PDF viewer or highlight |
| Audio Overview (headphones) | Generate audio summary | AI TTS pipeline (future) |
| Chat send | Ask question across papers | AI multi-doc RAG |
| Follow-up chips | Pre-filled follow-up | Auto-fills chat input |
| "View Source Notes" | Show extracted notes | AI extraction view |
| Delete source (trash) | Remove from session | Client state |

---

### 09 - Writing Analysis
**Purpose:** Grammarly-style academic writing quality checker
**Route:** `/analysis/:projectId`
**Layout:** Editor (left, full serif content) + Analysis panel (right, w-400)
**Header:**
- Back arrow to Studio
- "Draft Analysis: [title]" header
- Color-coded legend: Passive Voice (purple), Hard to Read (red), Weak Words (yellow)

**Editor (left):**
- Read-only view of the draft with inline highlights:
  - `.highlight-passive` (purple): Passive voice instances
  - `.highlight-complex` (red): Hard-to-read sentences
  - `.highlight-weak` (yellow): Weak/informal words

**Analysis Panel (right):**
- Academic Score: Circular gauge (72/100), "Needs Improvement" label
- Two tabs: Issues (4) / Detailed Metrics
- Issues tab: Cards for each issue type with:
  - Icon + severity color
  - Description + excerpt
  - AI Fix button ("AI Fix: Split Sentence", or suggested replacement)
- Metrics tab:
  - Readability: Flesch Reading Ease (45.2), Gunning Fog Index (14.0)
  - Vocabulary: Unique Words (24%), Academic Jargon (8%)
  - Tone Analysis: Objectivity (High), Confidence (Medium), Formality (Very High)

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "AI Fix: Split Sentence" | Auto-fix issue | AI rewrite API |
| Suggested fix button | Apply suggestion | Editor mutation |
| "Recalculate" | Re-run analysis | AI analysis pipeline |
| Highlight click | Scroll to/focus issue | Client-side scroll |

---

### 10 - Final Checks (Plagiarism + AI Detection)
**Purpose:** Pre-submission plagiarism and AI content check
**Route:** `/checks/:projectId`
**Layout:** Editor (left) + Combined report panel (right, w-400)
**Header:**
- Back arrow to Studio
- "Final Checks: [filename]" header
- "Download Report" button

**Editor (left):**
- Read-only view with inline highlights:
  - `.highlight-ai` (orange): AI-detected content
  - `.highlight-plag` (red): Plagiarism matches

**Report Panel (right):**
- AI Content Detection section:
  - Semi-circle gauge: 35% AI content
  - Risk level: "Moderate Risk"
  - Per-paragraph breakdown with AI probability
  - "Humanize Text" button per flagged paragraph
- Plagiarism Check section:
  - Similarity score: 14%
  - Matches found: 2
  - Match cards with source, match percentage, excerpt
  - Per-match actions: "Add Citation" or "Paraphrase"

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "Download Report" | Export PDF report | Report generation |
| "Humanize Text" | Rewrite to sound human | AI rewrite API |
| "Add Citation" | Auto-add citation | Citation generator + editor |
| "Paraphrase" | AI paraphrase | AI rewrite API |
| Match card click | Highlight in editor | Client-side scroll |

---

### 11 - Slides Generator (Draft-to-Deck)
**Purpose:** Convert papers/drafts into presentation slides
**Route:** `/slides/:projectId`
**Layout:** Outline sidebar (w-64) + Slide canvas (center) + Design panel (w-72)
**Outline Sidebar:**
- Back arrow to Studio
- "Outline" header + "+ Slide" button
- Slide thumbnails (aspect-ratio 16:9 mini-previews) with click to select
- Slides: Title, Introduction, Methodology (shown in mockup)

**Slide Canvas (center):**
- Toolbar: Text, Image, Layout tools + "Export PPTX" button
- Full 16:9 slide rendering area with editable text blocks (dashed border on hover)
- Auto-save indicator ("Last saved 2m ago")
- Speaker Notes section at bottom (auto-generated, editable textarea)

**Design Panel (right):**
- Theme selector: Modern, Dark, Thesis, Vibrant (grid of 4)
- AI Magic Tools:
  - "Shorten Text" - Turn paragraphs into bullets
  - "Suggest Image" - Find diagrams from paper

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "Export PPTX" | Generate PowerPoint file | PPTX generation library |
| "+ Slide" | Add new slide | Client state |
| Slide thumbnail click | Navigate to slide | Client state |
| Theme buttons | Change slide theme | Client state + re-render |
| "Shorten Text" AI tool | Condense selected text | AI API |
| "Suggest Image" AI tool | Find relevant images | AI + image search |
| Speaker notes edit | Update notes | Auto-save to Convex |
| Text block edit | Edit slide content | Auto-save to Convex |

---

### 12 - Settings & Account
**Purpose:** User settings, billing, usage tracking
**Route:** `/settings`
**Layout:** Icon nav (w-16) + Settings nav sidebar (w-64) + main content
**Settings Nav:**
- My Account, Plans & Billing (default), Usage Tracking, Preferences
- Log Out button at bottom

**Plans & Billing tab:**
- Current plan card: "Researcher Pro Plan" (ACTIVE badge), price, next billing date, Manage button
- Payment Method: Visa ending 4242, Razorpay Secure badge, Update button
- Invoice History: Table with date, description, amount, download invoice link

**Usage Tracking tab:**
- AI Words Generated: 12,450 / 50k (progress bar)
- Deep Searches: 85 / Unlimited (fair usage)
- Plagiarism Checks: 3 / 10 left (progress bar)

**My Account tab:**
- Profile card: Avatar (with camera edit), name, email, "Verified Student" badge
- Profile editing section (placeholder)

**Preferences tab:** (not yet designed)

**Key Buttons & Backend Wiring:**
| Element | Action | Backend |
|---------|--------|---------|
| "Manage" plan button | Open plan management | Razorpay subscription portal |
| "Update" payment | Update card | Razorpay card update |
| "Download Invoice" | Download PDF invoice | Invoice generation |
| "Log Out" | Sign out | Auth signout + redirect |
| Avatar camera button | Upload new photo | File storage |
| Usage bars | Display real-time usage | Convex usage tracking queries |

---

## Navigation Patterns

### Two Sidebar Variants

1. **Full Sidebar (w-64):** Dashboard, My Projects - Shows text labels, used for main navigation
2. **Icon-only Sidebar (w-16):** Deep Research, My Library, Settings - Space-efficient, icon tooltips

### In-Studio Navigation
The Studio has its own nav context:
- Top nav: Logo, doc title, Write/Learn toggle, Export, avatar
- Left sidebar: Current Draft, My Library, Deep Research, Cited Sources
- Right panel: Chat & Learn, Research, Checks tabs

---

## Design Tokens (Shared Across All Pages)

```
Primary: #6366f1 (indigo-500)
Primary Dark: #4f46e5 (indigo-600)
Dark BG: #0f172a (slate-900)
Learn Mode: #10b981 (sage/green-500)
Learn Mode BG: #f1f8f5 (sage-100)
Error/Plagiarism: #ef4444 (red-500)
Warning/AI Detect: #f97316 (orange-500)
Success: #22c55e (green-500)
Font UI: Plus Jakarta Sans
Font Editor: Merriweather (serif)
Icons: Phosphor Icons (ph prefix)
Interactivity: Alpine.js
Styling: Tailwind CSS (CDN)
```

---

## User Flow Summary

```
Landing Page -> Auth (Sign In/Up)
                    |
                    v
              Dashboard
              /    |    \     \
             v     v     v     v
         Projects  Library  Research  Settings
             |       |        |
             v       v        v
           Studio  Notebook  (results feed into Studio/Library)
             |
             +---> Writing Analysis
             +---> Final Checks
             +---> Slides Generator
```
