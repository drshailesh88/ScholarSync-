# ScholarSync Notebook Page — Complete Feature Inventory & Testing Checklist

> **Purpose**: Manual testing reference for every feature built into the Notebook page (`/notebook`) and the Shared Notebook page (`/share/notebook/[token]`).
> **Generated**: March 2026

---

## Table of Contents

1. [Page Overview](#1-page-overview)
2. [Sources Sidebar](#2-sources-sidebar)
3. [Source Upload & Ingestion](#3-source-upload--ingestion)
4. [URL Ingestion](#4-url-ingestion)
5. [Source File Status & States](#5-source-file-status--states)
6. [Source Selection & Management](#6-source-selection--management)
7. [Notebook Modes](#7-notebook-modes)
8. [Conversation History](#8-conversation-history)
9. [Chat Interface](#9-chat-interface)
10. [Message Streaming & RAG](#10-message-streaming--rag)
11. [Citation System (In-Chat)](#11-citation-system-in-chat)
12. [Source Coverage Report](#12-source-coverage-report)
13. [Sources Cited Panel](#13-sources-cited-panel)
14. [Follow-Up Suggestion Chips](#14-follow-up-suggestion-chips)
15. [Message Actions (Copy & Feedback)](#15-message-actions-copy--feedback)
16. [PICO / Fact Extraction](#16-pico--fact-extraction)
17. [Source Notes Panel](#17-source-notes-panel)
18. [Audio Overview Panel](#18-audio-overview-panel)
19. [Notebook Sharing](#19-notebook-sharing)
20. [Shared Notebook Viewer](#20-shared-notebook-viewer)
21. [Password-Protected Sharing](#21-password-protected-sharing)
22. [PDF Viewer (Citation Jump-to-Source)](#22-pdf-viewer-citation-jump-to-source)
23. [Starter Suggestions (Empty State)](#23-starter-suggestions-empty-state)
24. [Error Handling & Edge Cases](#24-error-handling--edge-cases)
25. [Accessibility](#25-accessibility)
26. [Quick Test Workflows](#26-quick-test-workflows)

---

## 1. Page Overview

The Notebook consists of **two** pages:

| Page | Route | Purpose |
|------|-------|---------|
| **Notebook** | `/notebook` | AI-assisted multi-paper research chat with RAG, extraction, audio overviews, and sharing |
| **Shared Notebook** | `/share/notebook/[token]` | Public read-only view of a shared notebook conversation (optional password gate) |

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│              Chat Header (title, mode badge, toolbar)        │
├──────────┬───────────────────────────────────────────────────┤
│ Sources  │                                                   │
│ Sidebar  │              Chat Messages Area                   │
│ (w-80)   │              (scrollable, flex-1)                 │
│          │                                                   │
│ - Mode   │    ┌──────────────────────────────────────────┐   │
│ - History│    │  Source Coverage Badge                    │   │
│ - Upload │    │  Sources Cited Panel (collapsible)        │   │
│ - Files  │    │  Audio Overview Panel (inline)            │   │
│ - URL    │    │  Chat Input (form)                        │   │
│          │    └──────────────────────────────────────────┘   │
├──────────┴───────────────────────────────────────────────────┤
│  Overlays: Source Notes Panel | PDF Viewer | Share Dialog     │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Sources Sidebar

Left sidebar (w-80) for managing paper sources.

### Header
- [ ] **Back button** — arrow left navigates to `/dashboard`
- [ ] **Title** — "Notebook Sources" with paper count badge
- [ ] **Paper count badge** — displays `files.length` in a pill

### Mode Toggle
- [ ] **Research / Learn toggle** — two-button segmented control with `role="tablist"`
- [ ] Research button shows Lightning icon + "Research"
- [ ] Learn button shows GraduationCap icon + "Learn"
- [ ] Active mode highlighted with brand background + white text
- [ ] Inactive mode shows muted text with hover state

### Upload Area
- [ ] **Drop zone** — dashed border box: "Drag files here or click to upload"
- [ ] **Accepted formats label** — ".pdf, .txt, .md" shown below
- [ ] **Click to upload** — opens file picker (hidden `<input type="file">`)
- [ ] **Multiple file support** — `multiple` attribute on file input

### File List
- [ ] **Scrollable** — `overflow-y-auto` fills remaining sidebar space
- [ ] Each file entry shows:
  - [ ] Checkbox (select/deselect for RAG)
  - [ ] File type icon (FileText for uploads, Globe for URLs)
  - [ ] File name (truncated)
  - [ ] File size / status label
  - [ ] Remove button (X icon, visible on hover)
- [ ] **Hover state** — background highlight on file entry hover

### URL Input
- [ ] **"Add Link / URL" button** — shows LinkSimple icon, toggles URL input
- [ ] **URL input field** — text input with placeholder "https://..."
- [ ] **Enter key** — submits URL
- [ ] **"Add" button** — submits URL
- [ ] **Auto-focuses** on open

---

## 3. Source Upload & Ingestion

### PDF Upload Pipeline
1. [ ] File added to list immediately with "processing" status
2. [ ] `POST /api/extract-pdf` — extracts basic metadata (title, author, pages)
3. [ ] `savePaper()` — saves to library with extracted title and authors
4. [ ] File entry updated with real paper ID and page count
5. [ ] `POST /api/papers/{paperId}/pdf` — stores raw PDF for later viewing
6. [ ] `extractUploadedPdf()` — Docling extraction creates chunks in DB
7. [ ] `POST /api/embed` — generates vector embeddings for chunks
8. [ ] Status transitions: `processing` → `ready` (or `embed_failed` on error)

### Upload Error Handling
- [ ] **Extract failure** — file entry shows "error" status
- [ ] **Zero chunks** — file shows "embed_failed" status
- [ ] **Embedding failure** — file shows "embed_failed" with retry button
- [ ] **File input reset** — input value cleared after upload completes
- [ ] **Per-file error isolation** — one file failure doesn't block others

---

## 4. URL Ingestion

- [ ] **Trigger** — "Add Link / URL" button in sidebar footer
- [ ] File added immediately with "processing" status and URL as name
- [ ] `ingestUrl()` server action called
- [ ] On success: name updated to page title, size shows word count, status → `ready`
- [ ] On failure: size shows error message, status → `error`
- [ ] **Original URL preserved** — stored in `originalUrl` field
- [ ] **URL input cleared** — after submission
- [ ] **URL input hidden** — after submission

---

## 5. Source File Status & States

| Status | Icon Color | Label | Test |
|--------|-----------|-------|------|
| **ready** | Default (FileText) / Blue (Globe) | File size or page count | [ ] Verify normal display |
| **processing** | Amber (animate-pulse) | "Processing..." | [ ] Verify pulsing icon |
| **error** | Red | Error message in size field | [ ] Verify red icon + error text |
| **embed_failed** | Red | "Embedding failed" | [ ] Verify red icon + retry button |

### Retry Embed
- [ ] **Retry button** — appears below "Embedding failed" label
- [ ] Shows ArrowClockwise icon + "Click to retry" text
- [ ] Sets status to "processing" during retry
- [ ] On success: status → `ready`
- [ ] On failure: status → `embed_failed` again

---

## 6. Source Selection & Management

- [ ] **Checkbox per file** — toggles `selected` state
- [ ] **Selected papers** used for RAG retrieval in chat
- [ ] **Unselected papers** excluded from AI queries
- [ ] **Remove button** — X icon, visible on hover, removes file from list
- [ ] **Selected count** — used in empty state text: "Ready to analyze N source(s)"

---

## 7. Notebook Modes

### Research Mode (default)
- [ ] Chat header shows "Notebook Chat"
- [ ] Input placeholder: "Ask about your sources..."
- [ ] Empty state: "Ready to analyze N source(s)" + "Select sources on the left, then ask a question"
- [ ] Starter suggestions: "Summarize Key Themes", "Find Contradictions", "Compare Methodologies"
- [ ] AI provides direct, evidence-grounded responses
- [ ] Follow-up chips styled with neutral surface colors

### Learn Mode
- [ ] Chat header shows "Learn Mode"
- [ ] **Socratic tutoring badge** — amber pill: "Socratic tutoring"
- [ ] Input placeholder: "What do you want to explore?"
- [ ] Empty state: "Learn mode: I'll ask you guiding questions instead of giving direct answers"
- [ ] Starter suggestions: "Quiz me on these papers", "What assumptions should I question?", "Help me find gaps in this research"
- [ ] AI uses Socratic method — asks guiding questions instead of direct answers
- [ ] Follow-up chips styled with amber colors (amber-500/5 background, amber-500/20 border)

### Mode Switching
- [ ] Clicking mode button updates `notebookMode` state
- [ ] Mode persisted in conversation record on creation
- [ ] Mode sent as API parameter (`"notebook"` for research, `"learn"` for learn)
- [ ] Switching modes updates starter suggestions immediately
- [ ] Chat messages preserved when switching modes mid-conversation

---

## 8. Conversation History

### History Dropdown
- [ ] **Toggle button** — ClockCounterClockwise icon + "Past conversations" + caret
- [ ] **Caret direction** — CaretDown when closed, CaretUp when open
- [ ] **Max height** — 32 lines, scrollable overflow
- [ ] **"+ New conversation" button** — brand-colored, starts fresh conversation

### Conversation List
- [ ] Loads up to 20 past notebook conversations on mount
- [ ] Each entry shows conversation title (truncated)
- [ ] **Active conversation** — highlighted with brand/10 background + brand text
- [ ] **Inactive conversations** — muted text with hover highlight
- [ ] **Empty state** — "No past conversations" text
- [ ] **Click to load** — loads full conversation with messages

### Load Conversation
- [ ] Restores all messages with sources
- [ ] Restores paper selection from stored `paper_ids`
- [ ] Restores mode (research/learn) from conversation record
- [ ] Clears follow-up suggestions, coverage report, PDF viewer, overlays
- [ ] Restores sources panel from last assistant message with sources
- [ ] Closes history dropdown after loading

### New Conversation
- [ ] Clears conversation ID
- [ ] Clears all messages
- [ ] Clears sources panel, coverage report, follow-up suggestions
- [ ] Clears PDF viewer, source notes, share dialog, audio overview

---

## 9. Chat Interface

### Message Display
- [ ] **Chat area** — scrollable container with `role="log"` and `aria-live="polite"`
- [ ] **User messages** — right-aligned, surface-raised background, rounded-2xl
- [ ] **Assistant messages** — left-aligned, brand/5 background, rounded-2xl
- [ ] **AI avatar** — 7x7 circle with brand/20 background, Sparkle icon inside
- [ ] **Max width** — 75% of container for both message types
- [ ] **Pre-wrap text** — whitespace preserved, relaxed line-height
- [ ] **Auto-scroll** — scrolls to bottom on new messages via `messagesEndRef`

### Loading State
- [ ] **Bouncing dots** — 3 dots (2x2 rounded-full, brand/40 color)
- [ ] Dots have staggered animation delays (0ms, 150ms, 300ms)
- [ ] AI avatar shown with spinning Sparkle icon during loading
- [ ] brand/5 background bubble wraps the loading dots

### Input Area
- [ ] **Form wrapper** — prevents default submit, calls `sendMessage()`
- [ ] **Paperclip button** — opens file picker for additional uploads
- [ ] **Text input** — full-width, transparent background
- [ ] **Placeholder** — changes based on mode (see Modes section)
- [ ] **Send button** — PaperPlaneRight icon, brand background, rounded-xl
- [ ] **Disabled state** — send button disabled when loading or input is empty
- [ ] **Disclaimer** — "AI can make mistakes. Check important info." centered below input

---

## 10. Message Streaming & RAG

### RAG vs Non-RAG Routing
- [ ] **With selected papers** — sends to `/api/rag-chat` with `paperIds`
- [ ] **Without selected papers** — sends to `/api/chat` (general chat)
- [ ] **Mode parameter** — `"notebook"` for research, `"learn"` for learn mode

### Conversation Persistence
- [ ] **First message** — creates conversation via `createConversation()` with mode, title (first 80 chars), and paper_ids
- [ ] **Subsequent messages** — updates paper_ids if selection changed
- [ ] **User messages** — persisted via `addMessage()` (fire-and-forget)
- [ ] **Assistant messages** — persisted with `retrieved_chunks` for citation replay

### Streaming
- [ ] Response streams via `ReadableStream` reader
- [ ] Text decoded incrementally with `TextDecoder`
- [ ] Message content updated in real-time as chunks arrive
- [ ] **30-second request timeout** — via AbortController
- [ ] **30-second per-chunk stream timeout** — via Promise.race with timeout

### Source Metadata
- [ ] **X-RAG-Sources header** — parsed to extract source metadata
- [ ] Sources set as current sources for panel display
- [ ] Sources panel auto-opens when sources are present

### Coverage Report
- [ ] **X-RAG-Coverage header** — parsed to extract coverage data
- [ ] Coverage report cleared on each new message send

### Error Handling
- [ ] **API error** — "Unable to connect to AI. Please check your AI provider API key configuration."
- [ ] **Request timeout (AbortError)** — "The response timed out. Please try again or ask a simpler question."
- [ ] **Stream timeout** — same timeout message as request timeout
- [ ] **Generic error** — "Something went wrong. Please try again."
- [ ] Stream reader cancelled on timeout/error

---

## 11. Citation System (In-Chat)

### Citation Rendering
- [ ] **Pattern** — `[N]` markers in assistant text parsed and rendered as interactive badges
- [ ] **Badge style** — brand/10 background, brand/20 border, brand text, rounded-md
- [ ] **Badge content** — FilePdf icon + short title + page number (if available)
- [ ] **Short title logic** — truncates at first colon (if within 40 chars) or at 28 chars with "..."
- [ ] **Page label** — shows `, p.N` when page number is available
- [ ] **Tooltip** — full paper title, page number, section type on hover

### Citation Click Behavior
- [ ] **Highlights source** — sets `highlightedSource` index
- [ ] **Web source** — opens original URL in new tab (`_blank`, `noopener,noreferrer`)
- [ ] **PDF source** — opens PDF viewer at cited page number
- [ ] **Closes other overlays** — source notes and share dialog closed on click
- [ ] **Missing source** — gracefully renders raw `[N]` text if source not found

---

## 12. Source Coverage Report

- [ ] **Visibility** — only shown when `totalPapers > 1`
- [ ] **Badge format** — "Sources used: N/M" with optional unused paper list
- [ ] **Color coding**:
  - [ ] Green (green-500/10) — 100% coverage ratio
  - [ ] Amber (amber-500/10) — 50%+ coverage ratio
  - [ ] Red (red-500/10) — below 50% coverage ratio
- [ ] **Unused papers** — shows truncated titles of papers not referenced
- [ ] **Cleared on new message** — reset when user sends a new message

---

## 13. Sources Cited Panel

- [ ] **Toggle button** — BookOpen icon + "Sources cited (N)" + caret
- [ ] **Caret direction** — CaretUp when open, CaretDown when closed
- [ ] **Auto-opens** — when sources arrive from RAG response
- [ ] **Max height** — 40 lines, scrollable overflow
- [ ] **Each source shows**:
  - [ ] Source index badge in brand color: `[N]`
  - [ ] Paper title
  - [ ] Page number (if available): "— Page N"
  - [ ] Section type (if available): ", sectionType"
- [ ] **Highlighted source** — brand/10 background + brand/30 border when highlighted
- [ ] **Normal source** — surface-raised/50 background

---

## 14. Follow-Up Suggestion Chips

### Generation
- [ ] **Trigger** — generated after assistant response ≥ 100 characters
- [ ] **Non-blocking** — generated asynchronously after stream completes
- [ ] **Mode-aware** — research mode gets analytical suggestions, learn mode gets Socratic prompts
- [ ] **3 suggestions** — up to 3 follow-up questions generated
- [ ] **Source-aware** — references paper titles in suggestions
- [ ] **Max 100 characters** per suggestion
- [ ] **Cancellation** — previous suggestion requests cancelled on new message

### Display
- [ ] **Position** — below the last assistant message, left-aligned (ml-10)
- [ ] **Only on last message** — only displayed under the most recent assistant message
- [ ] **Hidden during loading** — not shown while AI is responding
- [ ] **Loading state** — 3 bouncing dots while suggestions generate
- [ ] **Chip style** — rounded-full with border, flex items-center
- [ ] **Icon** — ArrowBendDownRight icon (brand color in research, amber in learn)
- [ ] **Research mode styling** — surface-raised/50 background, border-border, hover → brand/30
- [ ] **Learn mode styling** — amber-500/5 background, amber-500/20 border, hover → amber-500/40
- [ ] **Click action** — sends the suggestion text as a new message

---

## 15. Message Actions (Copy & Feedback)

### Copy Button
- [ ] **Position** — below each assistant message (ml-10)
- [ ] **Icon** — Copy icon (default) / Check icon (after copy, green)
- [ ] **Copies cleaned text** — removes `[N]` citation markers and extra whitespace
- [ ] **2-second confirmation** — shows green check for 2 seconds after copy
- [ ] **Tooltip** — "Copy response"
- [ ] **Aria label** — "Copy response to clipboard"

### Thumbs Up Button
- [ ] **Toggle behavior** — click to activate, click again to deactivate
- [ ] **Active state** — green-500 text, green-500/10 background, filled icon
- [ ] **Inactive state** — ink-muted text, hover shows ink color + surface-raised background
- [ ] **Persists to DB** — calls `submitMessageFeedback()` with rating `1`
- [ ] **Tooltip** — "Helpful response"

### Thumbs Down Button
- [ ] **Toggle behavior** — click to activate, click again to deactivate
- [ ] **Active state** — red-400 text, red-500/10 background, filled icon
- [ ] **Inactive state** — ink-muted text, hover shows ink color + surface-raised background
- [ ] **Persists to DB** — calls `submitMessageFeedback()` with rating `-1`
- [ ] **Tooltip** — "Unhelpful response"

### Mutual Exclusion
- [ ] Selecting thumbs up while thumbs down is active → clears thumbs down
- [ ] Selecting thumbs down while thumbs up is active → clears thumbs up
- [ ] Clicking the same thumb again → clears the rating (sends `null`)

---

## 16. PICO / Fact Extraction

### Extract Facts Button
- [ ] **Visibility** — only on files with `paperId`, `status === "ready"`, not yet extracted
- [ ] **Icon** — Table icon, visible on file entry hover (opacity-0 → opacity-100)
- [ ] **Tooltip** — "Extract PICO data"
- [ ] **Loading state** — CircleNotch spinning icon while extracting

### Extracted State
- [ ] **Green checkmark** — CheckCircle icon replaces extract button
- [ ] **Click to expand** — toggles inline extraction card below file entry
- [ ] **Toggle behavior** — click again to collapse

### Extraction Card
- [ ] **Header** — Table icon (brand) + "Structured Extraction" title
- [ ] **Verification badge** — "Verified" (green, ShieldCheck) or "Verify" button
- [ ] **Grid layout** — 2-column grid: label (brand text) + value
- [ ] **PICO fields displayed** (if non-null):

| Field | Label | Test |
|-------|-------|------|
| Population | Population | [ ] Verify display |
| Intervention | Intervention | [ ] Verify display |
| Comparison | Comparison | [ ] Verify display |
| Outcome | Outcome | [ ] Verify display |
| Sample Size | Sample Size | [ ] Verify with toLocaleString formatting |
| Study Design | Study Design | [ ] Verify display |
| Effect Size | Effect Size | [ ] Verify display |
| P-value | P-value | [ ] Verify display |
| 95% CI | 95% CI | [ ] Verify display |
| Risk of Bias | Risk of Bias | [ ] Verify display |
| Evidence Level | Evidence | [ ] Verify "Level X" formatting |

- [ ] **Key Findings** — separate section with border-t (from `custom_extractions.key_findings`)
- [ ] **Limitations** — separate section with border-t (from `custom_extractions.limitations`)
- [ ] **Empty state** — "No structured data could be extracted." if no fields have values

### Verify Extraction
- [ ] **Verify button** — CheckCircle icon + "Verify" text
- [ ] Calls `verifyExtraction()` server action
- [ ] On success: updates extraction to show "Verified" badge (ShieldCheck, green)
- [ ] Updates local state immediately (optimistic)

---

## 17. Source Notes Panel

Right-side sliding panel showing AI-generated summaries for each paper.

### Opening
- [ ] **"View Source Notes" button** — Notebook icon + text, in chat header toolbar
- [ ] Opens as a fixed overlay with backdrop blur
- [ ] Closes other overlays (PDF viewer, share dialog)
- [ ] **Slide-in animation** — translates from right (200ms)
- [ ] **Backdrop** — black/40 with backdrop-blur-sm, click to close
- [ ] **Escape key** — closes panel
- [ ] **Body scroll lock** — prevents background scrolling while open

### Header
- [ ] **Notebook icon** (brand) + "Source Notes" title
- [ ] **Paper count badge** — "N papers"
- [ ] **Close button** — X icon

### Generate All Banner
- [ ] **Shown when** — papers exist without generated overviews
- [ ] **Text** — "N of M papers need notes generated"
- [ ] **"Generate All" button** — brand text, disabled during generation
- [ ] **Batch processing** — generates in batches of 3 for controlled concurrency

### Paper Cards
- [ ] **Expandable** — click header to toggle expand/collapse
- [ ] **Article icon** — brand/10 background, brand icon
- [ ] **Title** — truncated to 2 lines (line-clamp-2)
- [ ] **Authors** — first 3 authors + "et al." if more
- [ ] **Selected indicator** — unselected papers show "Not selected for chat" (italic, muted)
- [ ] **Sorting** — selected papers sorted before unselected papers

### Paper Card — With Overview
- [ ] **Summary** — AI-generated text summary
- [ ] **Key Topics** — tag pills with Tag icon (brand/10 background, brand text)
- [ ] **Suggested Questions** — clickable questions that send to chat and close panel
  - [ ] Arrow icon + question text
  - [ ] Hover highlights with brand/5 background
- [ ] **Generation timestamp** — "Generated [date]" in small text

### Paper Card — Without Overview
- [ ] **Abstract** — shows paper abstract (line-clamp-3) if available
- [ ] **No abstract** — "No summary available yet."
- [ ] **"Generate Notes" button** — brand text, triggers single paper generation
- [ ] **Generating state** — spinning CircleNotch + "Analyzing paper..."
- [ ] **Generation error** — red error text below generate button

### Loading & Error States
- [ ] **Loading** — centered spinner + "Loading paper notes..."
- [ ] **Error** — centered Warning icon + error message
- [ ] **Empty** — Notebook icon + "No papers loaded yet." + upload hint

---

## 18. Audio Overview Panel

Inline panel for generating and playing AI-synthesized audio summaries.

### Opening
- [ ] **Headphones button** — in chat header toolbar
- [ ] **Disabled** — when no papers are selected (opacity-30, cursor-not-allowed)
- [ ] **Creates conversation** — if no conversation exists yet
- [ ] **Closes other overlays** — PDF viewer, source notes, share dialog

### Panel Layout
- [ ] **Inline** — appears above the chat input area
- [ ] **Header** — Headphones icon (brand) + "Audio Overview" label
- [ ] **Close button** — X icon, pauses audio on close
- [ ] **Escape key** — closes panel

### Audio Length Options (before generating)
- [ ] **3 length options** — segmented buttons:
  - [ ] "Brief (~1 min)"
  - [ ] "Standard (~3 min)" (default)
  - [ ] "Detailed (~5 min)"
- [ ] **Active option** — brand background + white text
- [ ] **Inactive option** — surface-raised background + muted text

### Custom Focus Prompt
- [ ] **Text input** — "Focus on (optional)"
- [ ] **Placeholder** — "e.g., primary endpoint results, methodology comparison..."
- [ ] **Max length** — 500 characters

### Generating State
- [ ] **Auto-generates** on first mount (only once per panel open)
- [ ] **Spinner** — CircleNotch spinning (brand color)
- [ ] **Progress text** — "Creating your audio summary..."
- [ ] **Time estimate** — "Writing script, then synthesizing speech. This usually takes 10-30 seconds."
- [ ] **Header label** — "Generating..." with spinning icon

### Ready / Playback State
- [ ] **Play/Pause button** — circular brand button with Play/Pause icon
- [ ] **Seek slider** — range input (0 to duration, step 0.1)
- [ ] **Time display** — current time (left) and duration (right) in M:SS format
- [ ] **Speed button** — cycles through 1x, 1.25x, 1.5x, 2x
- [ ] **Download button** — DownloadSimple icon, downloads as `audio-overview.mp3`
- [ ] **Transcript toggle** — "Show transcript" / "Hide transcript"
- [ ] **Transcript view** — scrollable box (max-h-32) with pre-wrapped text
- [ ] **Cached badge** — "Cached" in green text when result was from cache
- [ ] **Options toggle** — "Options" link to change length/prompt and regenerate

### Error State
- [ ] **Warning icon** — red-400 color
- [ ] **Error message** — displayed inline
- [ ] **Retry button** — ArrowsClockwise icon + "Retry" text (brand color)

### Regenerate
- [ ] **"Regenerate with new settings" button** — full-width brand button
- [ ] Shown when options panel is open and audio already generated
- [ ] Resets state and triggers new generation

### Audio Events
- [ ] **timeupdate** — updates progress slider and time display
- [ ] **ended** — resets to ready state, rewinds to start
- [ ] **loadedmetadata** — updates duration from actual audio
- [ ] **pause** / **play** — syncs audio state
- [ ] **error** — shows "Unable to play generated audio." error

---

## 19. Notebook Sharing

### Share Button
- [ ] **ShareNetwork icon** — in chat header toolbar
- [ ] **Disabled** — when no conversation exists (opacity-30, cursor-not-allowed)
- [ ] **Closes other overlays** — PDF viewer, source notes

### Share Dialog
- [ ] **Modal overlay** — fixed inset-0, black/50 background, backdrop-blur-sm
- [ ] **Click outside closes** — backdrop click handler
- [ ] **Escape key closes** — keydown event listener
- [ ] **Header** — LinkSimple icon + "Share Notebook"
- [ ] **Close button** — X icon in header

### Public Sharing Toggle
- [ ] **Toggle switch** — custom styled 44px toggle (w-11, h-6)
- [ ] **Label** — "Public sharing"
- [ ] **Description** — "Anyone with the link can view this notebook conversation"
- [ ] **Enable** — calls `enableNotebookSharing()`, generates share URL
- [ ] **Disable** — calls `disableNotebookSharing()`
- [ ] **Loading state** — toggle disabled with opacity-50 during API call

### Share Link (when enabled)
- [ ] **Read-only input** — displays full share URL
- [ ] **Copy button** — brand background, Copy icon + "Copy" text
- [ ] **Copied confirmation** — Check icon + "Copied" for 2 seconds

### Password Protection
- [ ] **Lock icon** + "Password protection (optional)" label
- [ ] **Text input** — placeholder "Leave empty for no password"
- [ ] **Optional** — leaving empty means no password required

### Expiration Date
- [ ] **CalendarBlank icon** + "Expiration date (optional)" label
- [ ] **Date input** — type="date", min set to today
- [ ] **Optional** — leaving empty means no expiration

### Save Settings
- [ ] **"Save Settings" button** — full-width, calls `updateNotebookShareSettings()`
- [ ] **Loading state** — "Saving..." text, disabled button
- [ ] **Loading settings** — "Loading share settings..." centered text on open

---

## 20. Shared Notebook Viewer

Public read-only page at `/share/notebook/[token]`.

### Header
- [ ] **Notebook icon** (brand) + conversation title
- [ ] **Metadata** — "Shared by [owner]" + date + mode indicator
- [ ] **Learn mode indicator** — " · Learn Mode" appended

### Messages
- [ ] **User messages** — right-aligned, white/5 background
- [ ] **Assistant messages** — left-aligned, brand/5 background, sparkle avatar
- [ ] **Citation rendering** — `[N]` markers rendered as read-only styled spans (no click)
- [ ] **Citation badges** — brand/10 background, brand/20 border, brand text
- [ ] **Short title + page label** — same truncation logic as main notebook

### Empty State
- [ ] "This notebook has no messages yet." centered message

### Footer
- [ ] **Border-t** separator
- [ ] "Shared from ScholarSync · AI-assisted research analysis" text

### SEO
- [ ] **Server-side metadata** — title and description generated from conversation
- [ ] **Not found page** — custom 404 for invalid tokens

---

## 21. Password-Protected Sharing

### Password Gate
- [ ] **Full-screen dark page** — centered card (max-w-sm)
- [ ] **Lock icon** — brand-colored circle (w-12, h-12)
- [ ] **Title** — "Password Protected"
- [ ] **Subtitle** — "Enter the password to view this notebook."
- [ ] **Password input** — type="password", auto-focused
- [ ] **"View Notebook" button** — brand background, disabled when empty or loading
- [ ] **Loading state** — "Verifying..." button text
- [ ] **Error display** — red-400 text below input
  - [ ] "Incorrect password. Please try again."
  - [ ] "Something went wrong. Please try again."
- [ ] **Notebook title** — shown at bottom of card
- [ ] **On success** — transitions to SharedNotebookViewer component

---

## 22. PDF Viewer (Citation Jump-to-Source)

- [ ] **Opens on citation click** — when source is a PDF (no originalUrl)
- [ ] **Dynamically loaded** — `next/dynamic` with `ssr: false`
- [ ] **Props** — URL: `/api/papers/{paperId}/pdf`, initialPage, title
- [ ] **Close handler** — sets `pdfViewerState` to null
- [ ] **Overlay** — renders above chat area

### Citation Navigation Logic
- [ ] **URL source** — opens external URL in new tab instead of PDF viewer
- [ ] **PDF source** — opens internal PDF viewer at cited page
- [ ] **Page number** — defaults to 1 if not specified in source metadata

---

## 23. Starter Suggestions (Empty State)

Shown when chat has no messages.

### Research Mode Suggestions
- [ ] "Summarize Key Themes" — clickable chip
- [ ] "Find Contradictions" — clickable chip
- [ ] "Compare Methodologies" — clickable chip

### Learn Mode Suggestions
- [ ] "Quiz me on these papers" — clickable chip
- [ ] "What assumptions should I question?" — clickable chip
- [ ] "Help me find gaps in this research" — clickable chip

### Suggestion Chip Behavior
- [ ] **Style** — rounded-full, brand/10 background, brand text
- [ ] **Hover** — brand/20 background
- [ ] **Click** — sends suggestion text as message via `sendMessage(s)`
- [ ] **Centered layout** — flex-wrap, gap-2, justify-center

### Empty State Container
- [ ] **GlassPanel wrapper** — p-6, text-center
- [ ] **Mode-specific heading text**
- [ ] **Mode-specific subtitle text**

---

## 24. Error Handling & Edge Cases

### Chat Errors
- [ ] **API connection error** — shows inline error message in chat
- [ ] **Timeout** — 30-second request abort, 30-second per-chunk stream timeout
- [ ] **Timeout message** — "The response timed out. Please try again or ask a simpler question."
- [ ] **Generic error** — "Something went wrong. Please try again."
- [ ] **Stream cleanup** — reader cancelled, loading state cleared

### Conversation Errors
- [ ] **Load failure** — console error logged, UI unaffected
- [ ] **Create failure** — caught in sendMessage try/catch
- [ ] **Paper ID update failure** — fire-and-forget (caught silently)
- [ ] **Message persist failure** — fire-and-forget (caught silently)

### Source Upload Errors
- [ ] **Extract PDF failure** — file marked as "error"
- [ ] **Save paper failure** — file marked as "error"
- [ ] **Docling zero chunks** — file marked as "embed_failed"
- [ ] **Embedding failure** — file marked as "embed_failed" with retry option

### Extraction Errors
- [ ] **Fact extraction failure** — error logged, spinner removed
- [ ] **Verify extraction failure** — error logged

### Audio Overview Errors
- [ ] **No papers selected** — error: "Select at least one paper..."
- [ ] **No conversation** — error: "Select papers and start a notebook conversation first."
- [ ] **Generation failure** — shows error message with retry button
- [ ] **Playback failure** — "Playback failed. Please try again."
- [ ] **Audio element error** — "Unable to play generated audio."

### Suggestion Errors
- [ ] **Generation failure** — suggestions silently cleared (empty array)
- [ ] **Stale request** — cancelled if new message sent before completion

---

## 25. Accessibility

- [ ] **ARIA tablist** — mode toggle has `role="tablist"` with `aria-selected` on buttons
- [ ] **Chat log** — `role="log"` with `aria-live="polite"` on messages container
- [ ] **Chat input** — `aria-label="Chat message input"`
- [ ] **Send button** — `aria-label="Send message"`
- [ ] **Upload button** — `aria-label="Upload files"`
- [ ] **Audio overview button** — `aria-label="Audio Overview"`
- [ ] **Share button** — `aria-label="Share notebook"`
- [ ] **Close buttons** — `aria-label="Close source notes"`, `"Close share dialog"`, `"Close audio overview"`
- [ ] **Remove file** — `aria-label="Remove {filename}"`
- [ ] **Extract PICO** — `aria-label="Extract PICO data from {filename}"`
- [ ] **View extraction** — `aria-label="View extraction for {filename}"`
- [ ] **Retry embed** — `aria-label="Retry embedding for {filename}"`
- [ ] **Copy response** — `aria-label="Copy response to clipboard"`
- [ ] **Feedback** — `aria-label="Mark response as helpful"` / `"Mark response as unhelpful"`

---

## 26. Quick Test Workflows

### Workflow A: Basic Research Chat
1. [ ] Navigate to `/notebook`
2. [ ] Verify sources sidebar loads with library papers
3. [ ] Select/deselect papers using checkboxes
4. [ ] Type a question and press Enter (or click send)
5. [ ] Verify streaming response appears word by word
6. [ ] Verify AI avatar and message styling
7. [ ] Verify auto-scroll to bottom
8. [ ] Check sources cited panel auto-opens
9. [ ] Verify follow-up suggestion chips appear after response

### Workflow B: PDF Upload Flow
1. [ ] Click upload area or paperclip button
2. [ ] Select a PDF file
3. [ ] Verify file appears with "Processing..." status (amber pulsing icon)
4. [ ] Wait for processing to complete
5. [ ] Verify status changes to "ready" with page count
6. [ ] Verify file checkbox is checked (selected for RAG)
7. [ ] Ask a question — verify RAG retrieves from the uploaded paper

### Workflow C: URL Ingestion
1. [ ] Click "Add Link / URL" button at sidebar bottom
2. [ ] Paste a URL and press Enter
3. [ ] Verify entry appears with globe icon + "Processing..."
4. [ ] Wait for completion — verify title and word count display
5. [ ] Ask about the URL content — verify RAG response cites it

### Workflow D: Citation Navigation
1. [ ] Send a message that gets RAG-grounded response with citations
2. [ ] Hover a `[N]` citation badge — verify tooltip shows full details
3. [ ] Click a citation for a PDF source — verify PDF viewer opens at correct page
4. [ ] Close PDF viewer — verify it dismisses
5. [ ] Click a citation for a URL source — verify new tab opens with the URL

### Workflow E: PICO Extraction
1. [ ] Hover a file with "ready" status
2. [ ] Click the Table icon (Extract PICO data)
3. [ ] Verify spinner appears during extraction
4. [ ] Verify green checkmark appears after completion
5. [ ] Click checkmark to expand extraction card
6. [ ] Verify PICO fields display in grid format
7. [ ] Click "Verify" button — verify "Verified" badge appears
8. [ ] Click checkmark again — verify card collapses

### Workflow F: Source Notes Panel
1. [ ] Click "View Source Notes" in chat header
2. [ ] Verify panel slides in from right with backdrop
3. [ ] Verify paper cards load with titles and authors
4. [ ] Click "Generate Notes" on a paper without overview
5. [ ] Verify spinner shows, then overview appears with summary + topics + questions
6. [ ] Click a suggested question — verify it sends to chat and panel closes
7. [ ] Press Escape — verify panel closes

### Workflow G: Audio Overview
1. [ ] Select at least one paper
2. [ ] Click headphones button
3. [ ] Verify audio generates automatically (spinner + "Creating your audio summary...")
4. [ ] Verify playback controls appear when ready
5. [ ] Click play — verify audio plays with progress updates
6. [ ] Click speed button — verify cycles through 1x, 1.25x, 1.5x, 2x
7. [ ] Click "Show transcript" — verify transcript text appears
8. [ ] Click download — verify MP3 downloads
9. [ ] Click "Options" — change length to "Detailed" — click "Regenerate with new settings"
10. [ ] Click close (X) — verify audio pauses and panel closes

### Workflow H: Learn Mode
1. [ ] Click "Learn" in mode toggle
2. [ ] Verify "Learn Mode" heading + "Socratic tutoring" badge
3. [ ] Verify starter suggestions change to learn-mode prompts
4. [ ] Click "Quiz me on these papers"
5. [ ] Verify AI asks Socratic questions instead of giving direct answers
6. [ ] Verify follow-up chips use amber styling
7. [ ] Click a follow-up chip — verify it sends as new message

### Workflow I: Sharing
1. [ ] Send at least one message to create a conversation
2. [ ] Click share button (ShareNetwork icon)
3. [ ] Toggle "Public sharing" on — verify share URL generated
4. [ ] Click "Copy" — verify URL copied, button shows "Copied"
5. [ ] Enter a password, set expiration date, click "Save Settings"
6. [ ] Open share URL in incognito browser
7. [ ] Verify password gate appears
8. [ ] Enter correct password — verify conversation displays read-only
9. [ ] Verify citation badges render (non-interactive)
10. [ ] Back in main app — toggle sharing off — verify link becomes inaccessible

### Workflow J: Conversation History
1. [ ] Send messages in the notebook
2. [ ] Click "Past conversations" — verify dropdown opens
3. [ ] Click "+ New conversation" — verify messages clear
4. [ ] Send a new message in the new conversation
5. [ ] Click "Past conversations" again — verify both conversations listed
6. [ ] Click the first conversation — verify its messages and sources restore
7. [ ] Verify mode (research/learn) restores correctly
8. [ ] Verify follow-up suggestions and overlays clear on load

### Workflow K: Feedback & Copy
1. [ ] Receive an assistant response
2. [ ] Click copy button — verify green check appears for 2 seconds
3. [ ] Paste clipboard — verify text has no `[N]` markers
4. [ ] Click thumbs up — verify green highlight
5. [ ] Click thumbs up again — verify deactivated
6. [ ] Click thumbs down — verify red highlight
7. [ ] Click thumbs up — verify thumbs down deactivates, thumbs up activates

---

## Additional Features (Discovered by Codex Audit)

> These features were found in the live UI and source code but were missing from the original document generated by Claude Code.

### Route-Level Loading and Error States
- [ ] `/notebook` has a dedicated route-level loading skeleton with a `w-72` sidebar placeholder and `glass-panel` chat placeholder
- [ ] Notebook loading skeleton does not render the real upload button, history list, or chat input while loading
- [ ] `/notebook` route-level error display title is `Notebook unavailable`
- [ ] `/notebook` route-level error display message is `We couldn't load your notebook. Please try again.`
- [ ] Notebook route-level error screen relies on shared `ErrorDisplay` retry behavior rather than a notebook-specific inline fallback

### Initial Library and Conversation Hydration
- [ ] Notebook sources are hydrated from `getUserPapers()` on first client mount before any new uploads happen
- [ ] Library-backed source rows default to `selected: true`
- [ ] Library-backed source rows show `size: "Library"` until replaced by upload or URL-specific metadata
- [ ] Library-backed source rows set `status: "ready"` immediately on mount
- [ ] Library-backed source rows set `isExtracted` from `paper.is_extracted`
- [ ] Library-backed source rows preserve source URLs via `metadata.sourceUrl` when present
- [ ] Existing extraction records are fetched only for papers where `is_extracted` is true
- [ ] Failed initial paper hydration is swallowed silently in the UI
- [ ] Past conversations are loaded with `getConversations("notebook")` and trimmed to 20 items
- [ ] Conversation summary rows persist `mode` and `updatedAt` in state even though only the title is rendered in the history list

### Sidebar Header and Mode Switch Details
- [ ] Sidebar title is `Notebook Sources`
- [ ] Sidebar paper-count pill always shows the total `files.length`, including unselected and failed sources
- [ ] Back arrow is a link to `/dashboard`, not a button with imperative navigation
- [ ] Notebook mode defaults to `research` on first render
- [ ] Mode toggle container has `role="tablist"` with `aria-label="Notebook mode"`
- [ ] Each mode button uses `role="tab"` and toggles only `aria-selected`, not `tabIndex`
- [ ] Learn mode uses the same brand-colored active background as Research mode in the sidebar toggle
- [ ] Switching notebook mode does not clear existing messages or reset the current conversation by itself

### Conversation History Details
- [ ] History button label is `Past conversations`
- [ ] History toggle is a full-width button with the caret pushed to the far right by `ml-auto`
- [ ] History dropdown max height is `max-h-32`
- [ ] New conversation action appears as the first row inside the expanded history list
- [ ] New conversation action clears `conversationIdRef` back to `null`
- [ ] New conversation action also clears follow-up suggestions, coverage report, PDF viewer, source notes, share dialog, and audio overview state
- [ ] Loading a conversation restores assistant `retrieved_chunks` into the in-memory `sources` field for citation replay
- [ ] Loading a conversation clears all overlay/feature state before restoring the newly loaded conversation state
- [ ] Loading a conversation restores the sources panel from the last assistant message with sources, not from every message
- [ ] Loading a conversation applies stored `paper_ids` by toggling each file row's `selected` flag
- [ ] Loading a conversation sets learn mode only when `convo.mode === "learn"`; all other modes fall back to research
- [ ] Failed conversation loads log `Failed to load conversation:` to the console and do not render inline UI feedback

### Upload and URL Ingestion Details
- [ ] File-upload temp ids use the format `upload_${Date.now()}_${Math.random()}`
- [ ] Uploaded files are appended one-by-one before extraction begins, so earlier files stay visible while later files process
- [ ] Upload rows show formatted byte size first, then swap to page-count text after `/api/extract-pdf` succeeds
- [ ] Upload extraction failure changes only the status to `error` and leaves the existing size label unchanged
- [ ] Uploaded paper titles fall back to the filename with `.pdf` stripped when extracted metadata has no title
- [ ] Uploaded paper authors fall back to an empty array when extracted metadata has no author
- [ ] Raw PDF storage failure logs `PDF storage failed:` to the console and does not block the remaining extraction/embed flow
- [ ] Docling extraction returning zero chunks marks the file `embed_failed` and skips the embedding request
- [ ] Embedding failure reads and logs the response text before marking the file `embed_failed`
- [ ] Upload catch-all failures mark only the affected file row `error`
- [ ] File input is reset to an empty value after the upload loop finishes so the same file can be picked again
- [ ] URL temp ids use the format `url_${Date.now()}`
- [ ] URL rows are added as selected processing rows before `ingestUrl()` returns
- [ ] URL rows use `size: "URL"` before the ingest result arrives
- [ ] URL submission clears the input value and hides the URL composer immediately before awaiting the server action
- [ ] Successful URL ingestion replaces the temporary row name with `result.title`
- [ ] Successful URL ingestion formats word count with `toLocaleString()` before adding `words`
- [ ] URL-ingest failures leave the original URL string as the row title and place the error message into the size field

### File Row Defaults and Actions
- [ ] Sidebar source rows use a shared hover group so extraction/remove actions are hidden until hover
- [ ] URL-backed sources use the `Globe` icon even when they originated from the library rather than from the URL composer in the current session
- [ ] Processing icons animate with `animate-pulse` for both uploaded files and URL rows
- [ ] Error and embed-failed rows both use red icon styling
- [ ] URL rows in ready state show `hostname · size` when the original URL parses successfully
- [ ] URL rows in ready state fall back to `size` alone when hostname parsing fails
- [ ] `embed_failed` rows show the literal subtitle `Embedding failed`, not the original size text
- [ ] Retry-embedding action appears only when `status === "embed_failed"` and `paperId` exists
- [ ] Retry-embedding action text is exactly `Click to retry`
- [ ] Retry-embedding sets status back to `processing` before calling `/api/embed`
- [ ] Source-row remove action deletes the row from local state immediately and has no confirmation dialog
- [ ] Source-row checkbox toggles only local `selected` state until the next message send or audio/share action syncs selections to the conversation

### Extraction Card and Fact Extraction Details
- [ ] Extraction card hides itself entirely when no extraction fields contain truthy values, replacing the body with `No structured data could be extracted.`
- [ ] Extraction header label is `Structured Extraction`
- [ ] Verified extractions show a `ShieldCheck` icon and the text `Verified`
- [ ] Unverified extractions show a `Verify` button instead of a badge
- [ ] Extraction evidence level is displayed as `Level X` when `evidence_level` exists
- [ ] `key_findings` custom extraction is rendered in its own border-top section
- [ ] `limitations` custom extraction is rendered in its own border-top section
- [ ] Extract-facts buttons only appear for rows with `paperId` and `status === "ready"`
- [ ] Extract-facts buttons are replaced by a green `CheckCircle` view button once extraction exists
- [ ] While extraction is in progress for a paper, the action slot shows only a spinning loader and not the extract button
- [ ] Successful fact extraction automatically expands the corresponding inline extraction card
- [ ] Successful fact extraction flips the file row's `isExtracted` flag to true
- [ ] Verify-extraction success mutates only the in-memory extraction map by setting `human_verified: true`
- [ ] Extract-facts and verify failures are console-only and do not show per-row inline error banners

### Chat Header and Overlay Trigger Details
- [ ] Chat header title is `Notebook Chat` in research mode and `Learn Mode` in learn mode
- [ ] Learn-mode badge text is `Socratic tutoring`
- [ ] `View Source Notes` button always remains enabled, even when no sources are selected
- [ ] Clicking `View Source Notes` closes the PDF viewer and share dialog before opening the notes drawer
- [ ] Audio Overview button is disabled when no selected rows have `paperId`
- [ ] Clicking Audio Overview closes the PDF viewer, source notes, and share dialog before attempting generation
- [ ] Share button is disabled until a conversation id exists
- [ ] Clicking Share closes the PDF viewer and source notes before opening the share dialog

### Chat Send, Streaming, and Error Handling Details
- [ ] Sending any message increments `suggestionRequestIdRef` before the request to invalidate stale follow-up suggestions
- [ ] Sending a message clears prior follow-up suggestions, coverage report, and suggestion-loading state before appending the new user message
- [ ] New user message ids use the format `msg_${Date.now()}`
- [ ] When no sources are selected, the notebook uses `/api/chat`; when at least one selected paper id exists, it uses `/api/rag-chat`
- [ ] Conversation creation mode is `learn` in learn mode and `notebook` in research mode
- [ ] Existing conversations update stored `paper_ids` on every send via `updateConversationPaperIds(...)`
- [ ] User messages are persisted with `addMessage(...)` in a fire-and-forget call that does not block streaming
- [ ] Notebook requests abort after 30 seconds via `AbortController`
- [ ] Assistant connection failures append the fixed assistant error `Unable to connect to AI. Please check your AI provider API key configuration.`
- [ ] Missing response bodies stop loading silently without adding a second error bubble
- [ ] Stream read timeouts are handled separately from initial request failures using a per-read 30 second timeout race
- [ ] Stream timeouts append the assistant message `The response timed out. Please try again or ask a simpler question.`
- [ ] Non-timeout runtime failures append the assistant message `Something went wrong. Please try again.`
- [ ] Request cleanup always clears the outer timeout and flips `isLoading` false in `finally`

### RAG Headers, Coverage, and Follow-Up Suggestion Details
- [ ] Notebook reads cited source metadata from the `X-RAG-Sources` response header
- [ ] Parsing valid `X-RAG-Sources` sets both `currentSources` and `showSourcesPanel`
- [ ] Invalid `X-RAG-Sources` JSON is ignored without UI error
- [ ] Notebook reads coverage data from the `X-RAG-Coverage` response header
- [ ] Missing coverage headers explicitly clear any prior coverage report
- [ ] Coverage badge renders only when `coverageReport.totalPapers > 1`
- [ ] Coverage badge uses green styling only for `coverageRatio === 1`
- [ ] Coverage badge uses amber styling for ratios `>= 0.5` and red styling below that threshold
- [ ] Coverage badge truncates unused-paper titles at the first colon when present, otherwise at 30 characters
- [ ] Follow-up suggestions are requested only when the assistant response has at least 100 trimmed characters
- [ ] Follow-up suggestion requests include `responseText`, `sourceTitles`, `userQuery`, and current notebook `mode`
- [ ] Stale follow-up suggestion responses are dropped by comparing `suggestionRequestIdRef`
- [ ] Follow-up suggestion chips render only for the latest assistant message whose id matches `suggestionsForMessageId`
- [ ] Learn-mode suggestion chips switch to amber-tinted styling while research-mode chips use neutral surface styling

### Message Rendering, Copy, and Feedback Details
- [ ] Chat log container uses both `role="log"` and `aria-live="polite"`
- [ ] Assistant citations render only when the message role is `assistant` and the message has a non-empty `sources` array
- [ ] Citation chips show a `FilePdf` icon plus a shortened paper title and optional page label
- [ ] Clicking a citation chip stores its source index in `highlightedSource`
- [ ] Citation-chip tooltip includes page number and section type when present
- [ ] Copy action strips bracketed citation markers like `[1]` before writing to the clipboard
- [ ] Copy action also collapses repeated spaces before copying
- [ ] Copy success shows a green check icon for 2 seconds only on the copied message row
- [ ] Feedback actions allow toggle-off behavior by clicking the already-selected rating again
- [ ] Helpful state uses green tint with `ThumbsUp` `weight="fill"`
- [ ] Unhelpful state uses red tint with `ThumbsDown` `weight="fill"`
- [ ] Feedback submission is attempted only when the message id can be parsed into a positive numeric database id
- [ ] Failed feedback submissions do not roll back local UI state; they only log to the console

### Source Citations Panel and PDF Jump Behavior
- [ ] Sources-cited toggle label is `Sources cited (N)`
- [ ] Sources panel uses `currentSources.length`, so duplicate chunk references can increase the displayed count
- [ ] Highlighted source rows use a brand border/background state tied to `highlightedSource === src.sourceIndex`
- [ ] Clicking a citation to a URL-backed source opens the original URL in a new tab instead of the PDF viewer
- [ ] Clicking a citation to a URL-backed source also clears any existing `pdfViewerState`
- [ ] Clicking a citation to a non-URL source opens the PDF viewer with `/api/papers/{paperId}/pdf`
- [ ] PDF viewer falls back to page `1` when citation metadata has no page number
- [ ] Citation navigation always closes source notes and share dialog first to avoid overlay conflicts

### Source Notes Panel Details
- [ ] Source Notes drawer locks `document.body.style.overflow = "hidden"` while open
- [ ] Source Notes drawer slides in from the right using an `animateIn` flag and transform transitions
- [ ] Source Notes count pill reflects only ready papers loaded into `paperNotes`, not raw sidebar row count
- [ ] When there are zero ready papers, Source Notes empty state says `No papers loaded yet.` and `Upload PDFs in the sidebar to see source notes.`
- [ ] When paper-note loading fails, Source Notes shows `Failed to load paper notes.`
- [ ] `Generate All` banner appears only when at least one loaded note is missing an overview
- [ ] `Generate All` processes missing notes in batches of 3
- [ ] Source Notes sorts selected papers ahead of unselected papers instead of preserving original order
- [ ] Unselected note cards use reduced opacity and the text `Not selected for chat`
- [ ] Generated note cards show a timestamp formatted with month, day, hour, and minute
- [ ] `Ask about this paper` suggestion rows send a notebook message and immediately close the notes drawer
- [ ] Per-paper generate failures render inline red text under that paper's summary block

### Audio Overview Panel Details
- [ ] Audio Overview auto-generates once on first mount using `hasTriggeredRef`
- [ ] Audio Overview enters `error` state immediately when opened with no conversation id or no valid paper ids
- [ ] Audio Overview generation request body includes `conversationId`, normalized unique `paperIds`, `mode`, optional `customPrompt`, and optional non-default `length`
- [ ] Audio Overview displays a `Cached` badge only when the result is cached and controls are available
- [ ] Audio Overview speed button cycles through `1x`, `1.25x`, `1.5x`, and `2x`
- [ ] Transcript is hidden by default after each successful generation
- [ ] Changing conversation id, selected paper ids, mode, custom prompt, or audio length resets the panel back to `idle`
- [ ] Audio Overview options panel is visible by default only in idle state and later via the `Options` link
- [ ] Length choices are `Brief (~1 min)`, `Standard (~3 min)`, and `Detailed (~5 min)`
- [ ] Custom focus prompt input enforces `maxLength={500}`
- [ ] When options are open after a previous generation, the CTA label changes to `Regenerate with new settings`
- [ ] Download action always saves the file as `audio-overview.mp3`
- [ ] Closing the audio panel pauses playback and resets current time to 0 before dismissing
- [ ] Playback failures show `Playback failed. Please try again.`
- [ ] Audio playback element is only mounted once an `audioUrl` exists

### Share Dialog Details
- [ ] Share dialog fetches existing settings on mount and shows `Loading share settings...` while waiting
- [ ] Share dialog closes on Escape in addition to backdrop click and close-button click
- [ ] Share toggle enables sharing by calling `enableNotebookSharing(conversationId)` and stores the returned `shareUrl`
- [ ] Disabling sharing flips only `shareEnabled` false in local state and does not clear the existing `shareUrl` field
- [ ] Share-link input is read-only and rendered only when sharing is enabled and a URL exists
- [ ] Copy-link success swaps button content from `Copy` to `Copied` for 2 seconds
- [ ] Password field placeholder is `Leave empty for no password`
- [ ] Expiration date input minimum is today’s date based on `new Date().toISOString().split("T")[0]`
- [ ] Save Settings persists only password and expiration date; it does not re-enable sharing if sharing is currently off
- [ ] Share-dialog failures are console-only and do not display inline error banners in the dialog UI

### Shared Notebook and Password Gate Details
- [ ] Shared notebook metadata title is `${notebook.title} - ScholarSync` when the share token resolves successfully
- [ ] Missing share tokens fall through `notFound()`
- [ ] Share route renders the password gate only when `notebook.hasPassword` is true
- [ ] Password gate disables submission while loading or when the password input is empty
- [ ] Password gate error for incorrect credentials is `Incorrect password. Please try again.`
- [ ] Password gate generic failure message is `Something went wrong. Please try again.`
- [ ] Successful password verification swaps the gate directly to `SharedNotebookViewer` without route navigation
- [ ] Shared viewer header text is `Shared by {ownerName}` plus a long-form date and optional `· Learn Mode`
- [ ] Shared viewer empty state text is `This notebook has no messages yet.`
- [ ] Shared viewer citation references are rendered as non-clickable pills rather than interactive buttons
- [ ] Shared viewer footer text is `Shared from ScholarSync · AI-assisted research analysis`

### Actual Current Behavior Corrections
- [ ] The live notebook route preloads library papers from `getUserPapers()`; it does not start from an always-empty source list
- [ ] The upload area is clickable and wired to a hidden file input, but there is no implemented drag-and-drop event handling in the page component
- [ ] Source-row remove actions currently delete rows from local state only; they do not call a server-side delete action from this page
- [ ] Notebook mode switching changes UI copy and API mode, but does not itself persist to the conversation until a conversation is created or a message/audio action updates it
- [ ] Sharing is unavailable until a conversation exists because the share button is disabled when `conversationIdRef.current` is null
- [ ] Shared notebook citations are read-only visual labels; there is no PDF jump-to-source interaction in the shared viewer

## Re-Audit Discoveries (Codex Pass 2)

### Upload and URL Ingestion Internals
- [ ] Upload temp ids use the exact format `upload_${Date.now()}_${Math.random()}`
- [ ] Each optimistic upload row is appended with `name: file.name`, `size: formatFileSize(file.size)`, `selected: true`, and `status: "processing"` before any network request starts
- [ ] `/api/extract-pdf` failure changes only the affected upload row to `status: "error"` and preserves the original byte-size subtitle
- [ ] Successful metadata extraction plus `savePaper()` swaps the upload subtitle from formatted bytes to ``${extractData.pages} pages``
- [ ] Uploaded-title fallback strips a trailing `.pdf` case-insensitively via `file.name.replace(/\\.pdf$/i, "")`
- [ ] Uploaded-author fallback is an empty array when `extractData.info?.author` is missing
- [ ] Raw PDF storage runs in a fire-and-forget `fetch(/api/papers/${paperId}/pdf)` branch whose `.catch(...)` only logs `PDF storage failed:`
- [ ] A Docling result with `chunksCreated === 0` logs `Docling extraction produced zero chunks`, marks the row `embed_failed`, and skips the `/api/embed` request via `continue`
- [ ] `/api/embed` non-OK responses are logged with `await embedRes.text()` before the row is marked `embed_failed`
- [ ] Exceptions inside the Docling or embed block log `PDF extraction/embedding failed:` and end with `status: "embed_failed"`
- [ ] Outer upload-pipeline failures mark the row `status: "error"` rather than `embed_failed`
- [ ] File-input reset happens once after the upload loop with `fileInputRef.current.value = ""`; there is no per-file `finally` reset
- [ ] URL temp ids use the exact format `url_${Date.now()}`
- [ ] Each optimistic URL row starts with `name: url`, `size: "URL"`, `selected: true`, `status: "processing"`, and `originalUrl: url`
- [ ] URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`
- [ ] Successful URL ingestion rewrites the temp row with `name: result.title`, `size: \`${result.wordCount.toLocaleString()} words\``, `paperId: result.paperId`, and `status: result.status`
- [ ] URL-ingest failures keep the original URL as the row name and set the subtitle to `error.message` or fallback `Failed to load URL`
- [ ] Ready URL rows prepend a parsed hostname only when `getHostnameLabel(file.originalUrl)` succeeds
- [ ] `getHostnameLabel()` strips a leading `www.` from parsed hosts and returns `null` when `new URL(url)` throws

### RAG Chat Internals
- [ ] Chat routing switches to `/api/rag-chat` only when `selectedPaperIds.length > 0`; otherwise it posts to `/api/chat`
- [ ] Notebook chat request bodies always include `messages` and `mode`, and include `paperIds` only when at least one selected paper id exists
- [ ] Outbound notebook requests use a request-level `AbortController` that aborts after exactly `30_000ms`
- [ ] Non-OK chat responses append an assistant error message with the exact text `Unable to connect to AI. Please check your AI provider API key configuration.`
- [ ] `X-RAG-Sources` header parsing uses `JSON.parse(...)` inside a `try/catch`; parse failures are silently ignored
- [ ] Parsed `X-RAG-Sources` data is copied into `currentSources`, and the cited-sources panel auto-opens only when `sources.length > 0`
- [ ] `X-RAG-Coverage` header parsing also uses `JSON.parse(...)` inside a `try/catch`; malformed JSON leaves the previous UI path intact without an inline error
- [ ] When `X-RAG-Coverage` is absent, the notebook explicitly clears coverage state with `setCoverageReport(null)`
- [ ] Streaming starts only when `res.body?.getReader()` returns a reader; a missing body exits early after `setIsLoading(false)`
- [ ] Each stream read races `reader.read()` against a second `30_000ms` timeout that rejects `new Error("Stream timeout")`
- [ ] The per-read timeout clears its internal timer in both the read success and read failure paths via `readPromise.then(..., ...)`
- [ ] Timeout detection treats both `AbortError` and `Error("Stream timeout")` as timeout-class failures
- [ ] Timeout failures append `The response timed out. Please try again or ask a simpler question.`
- [ ] Non-timeout failures append `Something went wrong. Please try again.`
- [ ] Error cleanup cancels the active reader with `await reader.cancel().catch(() => {})`

### Source Notes Panel Internals
- [ ] Opening the Source Notes drawer sets `animateIn` on a zero-delay `window.setTimeout(..., 0)` tick; closing it resets `animateIn` to `false`
- [ ] Source Notes stores the prior `document.body.style.overflow` value and restores it on cleanup after forcing `overflow = "hidden"`
- [ ] Source Notes fetches notes only for rows where `file.paperId` exists and `file.status === "ready"`
- [ ] When no ready paper ids exist, Source Notes resets to `paperNotes: []`, `loading: false`, and `error: null`
- [ ] Batch-note load failures show the exact panel-level error `Failed to load paper notes.`
- [ ] Escape-to-close is implemented with a `document.addEventListener("keydown", ...)` listener that is removed on cleanup
- [ ] `Generate All` targets only `paperNotes.filter((note) => !note.overview)` rather than regenerating already summarized papers
- [ ] `Generate All` processes missing overviews in sequential batches of exactly `3`
- [ ] Each batch runs `Promise.all(batch.map((note) => handleGenerate(note.paperId)))` before moving to the next batch
- [ ] Paper-note cards are sorted selected-first by mapping selected papers to sort weight `0` and unselected papers to `1`
- [ ] Clicking a suggested `Ask about this paper` question calls `onSendMessage(question)` and then closes the drawer
- [ ] Per-paper note-generation failures render inline red text using `generationErrors.get(paperId)`

### Audio Overview Internals
- [ ] Audio overview auto-generation is guarded by `hasTriggeredRef`, so automatic generation runs only once per panel mount even if options later change
- [ ] Audio overview resets itself to `idle` whenever `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes
- [ ] That reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, and `isCachedResult`
- [ ] Transcript visibility defaults to hidden (`showTranscript === false`) and is also forced back to hidden after successful generation
- [ ] Missing conversation state shows the exact error `Select papers and start a notebook conversation first.`
- [ ] Missing selected-paper state shows the exact error `Select at least one paper to generate an audio overview.`
- [ ] Playback speed cycles through the fixed order `1x → 1.25x → 1.5x → 2x → 1x`
- [ ] `cycleSpeed()` updates both the `speedIndex` state and `audioRef.current.playbackRate`
- [ ] Download always uses the fixed filename `audio-overview.mp3`
- [ ] Closing the panel pauses playback and resets `audio.currentTime = 0` before calling `onClose()`
- [ ] Natural playback end sets audio state back to `ready`, resets `currentTime` to `0`, and rewinds `audio.currentTime = 0`
- [ ] `Regenerate with new settings` hides the options panel first via `setShowOptions(false)` and then triggers a fresh generation

### Share Dialog Internals
- [ ] Share dialog initializes with `loading: true` and renders `Loading share settings...` until `getNotebookShareSettings(conversationId)` settles
- [ ] Share settings are fetched automatically on mount through a `useEffect(() => { loadSettings(); }, [loadSettings])`
- [ ] Share-dialog load failures log `Failed to load share settings:` to the console and do not render inline error text
- [ ] Escape-to-close is handled by a document-level `keydown` listener that is removed on unmount
- [ ] Share toggling calls `enableNotebookSharing(conversationId)` only when `shareEnabled` is currently false
- [ ] Enabling sharing mutates local state with `setShareEnabled(true)` and `setShareUrl(result.shareUrl)`
- [ ] Disabling sharing calls `disableNotebookSharing(conversationId)` and flips only `shareEnabled` to `false` in local state
- [ ] `Save Settings` persists only `{ password: password || null, expiresAt: expiresAt ? new Date(expiresAt) : null }`
- [ ] `Save Settings` does not re-enable sharing, regenerate a token, or refresh the loaded share URL
- [ ] Toggle and save failures are console-only via `Failed to toggle sharing:` and `Failed to save share settings:`

### Shared Notebook Viewer Internals
- [ ] Shared notebook metadata title is generated as `${notebook.title} - ScholarSync`
- [ ] Missing or disabled share tokens call `notFound()` from `src/app/share/notebook/[token]/page.tsx`
- [ ] The share route renders `NotebookPasswordGate` only when `notebook.hasPassword` is true; otherwise it renders `SharedNotebookViewer` directly
- [ ] Password-gate submit is disabled while `loading` is true or while the password field is empty
- [ ] Incorrect password submissions show `Incorrect password. Please try again.`
- [ ] Password-gate catch failures show `Something went wrong. Please try again.`
- [ ] Successful password verification flips local `unlocked` state and swaps directly to `SharedNotebookViewer` without navigation
- [ ] Shared-viewer citations render as `<span>` pills, not `<button>` elements, so they are read-only and non-clickable
- [ ] Shared-viewer citation pills omit the interactive notebook `FilePdf` icon even though they reuse the same short-title and page-label truncation logic

### Conversation History Internals
- [ ] Conversation-history dropdown uses `max-h-32 overflow-y-auto`
- [ ] `startNewConversation()` clears `conversationIdRef.current` plus messages, sources, coverage, follow-up suggestions, PDF viewer, source notes, share dialog, and audio overview state
- [ ] `startNewConversation()` does not clear file-selection state and does not explicitly close the history dropdown
- [ ] `loadConversation()` restores source metadata only from the last assistant message with `sources.length > 0`
- [ ] `loadConversation()` applies stored `paper_ids` by remapping every file row's `selected` flag
- [ ] File rows without `paperId` are forced to `selected: false` when stored `paper_ids` are restored
- [ ] Conversation-mode restoration uses strict learn-mode detection: `convo.mode === "learn"` maps to learn, everything else maps to research
- [ ] Loading an existing conversation closes the history dropdown via `setShowHistory(false)`

### Follow-Up Suggestion Internals
- [ ] Server-side follow-up generation returns `[]` immediately when `responseText.length < 100`
- [ ] Client-side follow-up generation also gates on `assistantMsg.content.trim().length >= 100`
- [ ] Sending a new message increments `suggestionRequestIdRef.current` before any network work starts
- [ ] Suggestion generation records the owning assistant message with `setSuggestionsForMessageId(assistantMsg.id)`
- [ ] `.then(...)`, `.catch(...)`, and `.finally(...)` all reject stale suggestion results by comparing against the captured `suggestionRequestId`
- [ ] Follow-up chips render only when `msg.id === suggestionsForMessageId`, the message is the last assistant message, and `!isLoading`
- [ ] Learn-mode follow-up chips use amber classes while research-mode chips use neutral surface classes
- [ ] Previous follow-up requests are not actually aborted; stale completions are ignored via `suggestionRequestIdRef`

### Chat Message Rendering Internals
- [ ] The main message list uses `role="log"` with `aria-live="polite"` and `aria-label="Chat messages"`
- [ ] Interactive citation pills render a `FilePdf` icon with `size={10}` and `weight="bold"`
- [ ] Citation short-title logic prefers text before the first colon only when that colon appears within the first 40 characters
- [ ] Colon-less long titles are shortened to 28 characters plus the single-character ellipsis `…`
- [ ] Copy-to-clipboard removes bracketed citation markers with `/\\[\\d+\\]/g` and collapses repeated spaces with `/\\s{2,}/g`
- [ ] Copy success resets `copiedMessageId` after exactly `2000ms`
- [ ] Re-clicking an already selected feedback thumb toggles that rating back off by sending `null`
- [ ] Helpful feedback uses green styling plus `weight="fill"` on `ThumbsUp`
- [ ] Unhelpful feedback uses red styling plus `weight="fill"` on `ThumbsDown`
- [ ] Feedback persistence runs only when `parseInt(messageId.replace("msg_", ""), 10)` yields a numeric id greater than `0`

### Extraction Card Internals
- [ ] ExtractionCard does not return `null` when no fields are truthy; it renders the muted fallback text `No structured data could be extracted.`
- [ ] Extraction header text is exactly `Structured Extraction`
- [ ] Human-verified extractions show a green `ShieldCheck` badge labeled `Verified`
- [ ] Unverified extractions show a `Verify` button instead of a badge
- [ ] Evidence level rows render as `Level ${extraction.evidence_level}` when an evidence level exists
- [ ] `custom_extractions.key_findings` and `custom_extractions.limitations` each render in their own bordered section
- [ ] While a paper is being extracted, the file-row action slot shows only a spinning `CircleNotch` and no clickable extract button

### Behavior Corrections (Pass 2)
- [ ] Section 14 says previous follow-up suggestion requests are "cancelled" — the live notebook does not abort them; it only ignores stale completions via `suggestionRequestIdRef`
- [ ] Section 25 claims the close controls include `aria-label="Close audio overview"` — the audio panel close button currently has `title="Close audio overview"` but no `aria-label`
- [ ] The file picker accepts `.pdf`, `.txt`, and `.md`, but `handleFileUpload()` routes every uploaded file through `/api/extract-pdf` and `extractUploadedPdf()`; there is no separate text/markdown ingestion branch in `page.tsx`

### Components Referenced But Not Rendered
- [ ] None — every file under `src/components/notebook` is imported by `/notebook`, `/share/notebook/[token]`, or another rendered notebook component

---

## Re-Audit Discoveries (Claude Code Pass 3)

### `/api/rag-chat/route.ts` — RAG Chat API Internals

- [ ] Request body validated by Zod: `messages` array min(1) max(50), each with `role` enum `["user","assistant","system"]` and `content` string max(50000)
- [ ] `paperIds` validated as optional array of numbers max(50); `mode` optional string; `ragConfig` optional record
- [ ] Authentication failure returns `{ error: "Authentication required." }` with status 401
- [ ] Rate-limited via `checkRateLimit(userId, "rag-chat", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly
- [ ] Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
- [ ] When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers
- [ ] RAG retrieval failure is caught and logged as warning `"RAG retrieval failed, falling back to no-context mode"`; streaming continues without context chunks
- [ ] `streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)
- [ ] Outer catch returns `{ error: "An error occurred while processing your request. Please try again." }` with status 500
- [ ] System prompt base text is `"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions."`
- [ ] Notebook mode appends `" You are in Notebook mode — analyzing uploaded research sources."` to the system prompt
- [ ] System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `"For EVERY factual claim, cite the source number in brackets like [1] or [1][2]."`
- [ ] Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`
- [ ] Fallback answer with zero chunks: `"I couldn't retrieve grounded source passages for that question.\n\nTry selecting more sources or ask a narrower question tied to the uploaded papers."`
- [ ] Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters
- [ ] Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false
- [ ] Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`

### `/api/chat/route.ts` — General Chat API Internals

- [ ] Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)
- [ ] Authentication failure returns `{ error: "Authentication required." }` with status 401
- [ ] Rate-limited via `checkRateLimit(userId, "chat", RATE_LIMITS.ai)`
- [ ] Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
- [ ] AI not configured returns `{ error: "AI service is not configured. Please contact an administrator." }` with status 503
- [ ] Mode `"learn"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`
- [ ] Mode `"notebook"` (research mode) falls through to the standard assistant prompt: `"You are ScholarSync's AI research assistant for medical students..."`
- [ ] Server error returns `{ error: "An unexpected error occurred. Please try again." }` with status 500

### `/api/extract-pdf/route.ts` — PDF Extraction API Internals

- [ ] Max file size limit is 20MB (`20 * 1024 * 1024` bytes)
- [ ] Content-Type must include `"multipart/form-data"` or returns 400 with `{ error: "Content-Type must be multipart/form-data" }`
- [ ] Missing file field returns 400 with `{ error: "No PDF file provided. Include a 'file' field in the form data." }`
- [ ] Non-PDF file returns 400 with `{ error: "Uploaded file must be a PDF" }` — validated by MIME type containing `"pdf"` OR filename ending `.pdf` case-insensitively
- [ ] Oversized file returns 413 with `{ error: "File size exceeds the 20MB limit. Uploaded file is X.XMB." }` showing actual size
- [ ] Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata
- [ ] Server error returns 500 with `{ error: "Failed to extract text from PDF" }`

### `/api/embed/route.ts` — Embed API Internals

- [ ] Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected
- [ ] Validation failure returns 400 with `{ error: "Invalid input", issues: [...] }` including Zod issue details
- [ ] Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat
- [ ] Server error returns 500 with `{ error: "Failed to embed paper" }`

### `/api/extract-facts/route.ts` — Extract Facts API Internals

- [ ] Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`
- [ ] Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: "paperId (number) is required" }`
- [ ] Optional `projectId` parameter accepted in request body
- [ ] Server error returns 500 with `{ error: "Extraction failed" }`

### `/api/audio-overview/route.ts` — Audio Overview API Internals

- [ ] Zod schema: `conversationId` positive int; `paperIds` positive int array min(1) max(25); `mode` enum `["research","learn"]` optional; `customPrompt` string max(500) optional; `length` enum `["brief","default","detailed"]` optional
- [ ] Validation error returns the first Zod issue message as `{ error: message }` with status 400
- [ ] Conversation not found or not owned by user returns 404 with `{ error: "Conversation not found" }`
- [ ] Cache key format: `${mode}:${length}:${customPrompt.slice(0,50)}:${sorted paperIds.join(",")}` — customPrompt changes invalidate the cache
- [ ] No paper overviews available returns 400 with `{ error: "No source notes available. Generate source notes first (View Source Notes panel)." }`
- [ ] Server error returns 500 with `{ error: "Failed to generate audio overview. Please try again." }`
- [ ] GET endpoint streams stored audio files; requires `stream` query parameter with path format `{conversationId}/{audioId}.{extension}`
- [ ] GET validates conversation ownership via user auth and conversation `user_id` match
- [ ] GET returns audio with `Cache-Control: private, max-age=3600` and `Content-Length` headers
- [ ] GET MIME type detection: `mp3→audio/mpeg`, `wav→audio/wav`, `opus→audio/opus`, `aac→audio/aac`, `flac→audio/flac`; unknown extensions default to `audio/mpeg`
- [ ] TTS uses OpenAI provider with voice `"nova"` and format `"mp3"`
- [ ] Audio stored to R2 via `uploadAudioOverview(conversationId, audioId, buffer, extension)`
- [ ] Paper authors normalized: supports string values, objects with `name`/`full_name`/`author` fields; empty strings filtered; sliced to max 5

### `/api/papers/[id]/pdf/route.ts` — PDF Storage & Serving Internals

- [ ] GET tries signed URL first (returns 302 redirect), then direct buffer stream, then falls back to paper's `pdf_url` or `open_access_url`
- [ ] GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename="paper-{id}.pdf"`, `Cache-Control: private, max-age=3600`
- [ ] GET 404 when no PDF found: `{ error: "PDF not found for this paper" }`
- [ ] POST stores PDF to R2, updates paper record with `pdf_storage_path` and `full_text_available: true`, then queues background processing pipeline
- [ ] POST success returns `{ success: true, paperId, storagePath }`
- [ ] POST failure returns 500 with `{ error: "Failed to store PDF file" }`
- [ ] Both GET and POST validate paper ID as digits-only via regex `/^\d+$/`

### PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set

- [ ] Toolbar: page navigation (CaretLeft/CaretRight), page display, zoom controls (MagnifyingGlassPlus/MagnifyingGlassMinus), fit-width (ArrowsOutSimple), title, close (X)
- [ ] Page display format: `"{pageNumber} / {numPages}"` when loaded, `"..."` while loading
- [ ] Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click
- [ ] Zoom display: `"{Math.round(scale * 100)}%"` — e.g., "100%", "125%"
- [ ] Fit-width button resets scale to 1.0 (not a responsive width calculation)
- [ ] Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`
- [ ] Zoom out disabled when `scale <= 0.5`; zoom in disabled when `scale >= 3.0`
- [ ] `initialPage` clamped to valid range on document load: must be `>= 1` and `<= total`; out-of-range or missing values fall back to page 1
- [ ] Document load error with "404", "Not Found", or "Missing" in message shows specific text: `"The original PDF is not available for this paper. It may have been imported from search without a PDF upload."`
- [ ] Other document load errors show the raw `err.message`, falling back to `"Failed to load PDF"`
- [ ] Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `"Failed to load PDF"` heading + error detail text
- [ ] Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `"Loading PDF..."` text
- [ ] Document component error fallback (react-pdf internal error): `"Failed to load PDF document."`
- [ ] Per-page loading state: smaller spinner within the page render area
- [ ] Escape key listener registered only when `onClose` prop is provided; removed on cleanup
- [ ] `role="dialog"`, `aria-modal="true"`, `aria-label` includes title when provided: `"PDF Viewer: {title}"`, otherwise `"PDF Viewer"`
- [ ] Navigation aria-labels: `"Previous page"`, `"Next page"`
- [ ] Zoom aria-labels: `"Zoom out"`, `"Zoom in"`, `"Fit width"`
- [ ] Close button `aria-label="Close PDF viewer"`
- [ ] Title shown in toolbar: truncated with `max-w-[40%]`, hidden on small screens via `hidden sm:block`
- [ ] PDF page rendered with `shadow-xl rounded-lg`; content area has `bg-surface/50` background
- [ ] Returns `null` when neither `url` nor `file` prop is provided

### Notebook Page — Additional Rendering Details

- [ ] Learn mode empty state subtitle is exactly `"Select your papers and start exploring"`
- [ ] Research mode empty state uses conditional plural without parentheses: `"Ready to analyze 1 source"` (singular) vs `"Ready to analyze 2 sources"` (plural)
- [ ] Suggestion-loading bouncing dots are `w-1.5 h-1.5 bg-brand/30` with delays 0ms/100ms/200ms — different from main loading dots which are `w-2 h-2 bg-brand/40` with delays 0ms/150ms/300ms
- [ ] `handleOpenAudioOverview` auto-creates a conversation with title `"Audio Overview"` if no conversation exists yet
- [ ] Audio overview auto-creation prepends the new conversation to `pastConversations` and slices list to 20 maximum
- [ ] `handleOpenAudioOverview` failure logs `"Failed to open audio overview:"` to console with no inline UI error
- [ ] Conversation history entries with null titles display `"Untitled"` as both visible text and HTML `title` attribute
- [ ] Send button disabled state uses `disabled:opacity-50`; audio/share disabled buttons use `disabled:opacity-30 disabled:cursor-not-allowed`
- [ ] `handleCitationClick` sets `highlightedSource` BEFORE checking if source exists — a missing source still updates the highlight index
- [ ] Copy and feedback action buttons appear on ALL assistant messages including error messages (ids starting with `err_`), but feedback persistence is a no-op for error messages due to id parsing
- [ ] Coverage badge unused-paper title truncation has no length limit for colon truncation and no ellipsis for the 30-char fallback — different from citation short-title truncation which caps colon position at 40 chars and appends `"…"`
- [ ] Coverage badge "not referenced" suffix: unused paper titles are joined with `", "` and followed by literal text `" not referenced"`

### Notebook Share Actions (`notebook-share.ts`) — Server-Side Details

- [ ] `enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists
- [ ] `disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`
- [ ] `updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)
- [ ] `verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison
- [ ] `verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)
- [ ] `getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`
- [ ] `getNotebookByShareToken` falls back to `"Untitled Notebook"` for null conversation titles
- [ ] `getNotebookByShareToken` falls back to `"A researcher"` for missing owner names
- [ ] `getNotebookByShareToken` orders messages by `created_at` ascending
- [ ] Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `"http://localhost:3000"`

### Share Dialog — Additional Details

- [ ] Password field in share dialog uses `type="text"` (visible while typing), NOT `type="password"` — different from the password gate which uses `type="password"`
- [ ] Share toggle has `aria-label="Toggle notebook sharing"`
- [ ] Toggle and Save Settings share the same `saving` state — toggling disables Save, and saving disables the toggle
- [ ] `handleCopy` is a no-op when `shareUrl` is null (guard before clipboard write)

### Shared Notebook — Additional Details

- [ ] `generateMetadata` returns `{ title: "Not Found - ScholarSync" }` when token lookup returns null
- [ ] `generateMetadata` returns `{ description: "Shared notebook by {ownerName}" }` for valid notebooks
- [ ] Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook
- [ ] Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes
- [ ] Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)
- [ ] Shared viewer date in header uses `toLocaleDateString` with `{ year: "numeric", month: "long", day: "numeric" }`
- [ ] `NotebookPasswordGate` clears error state (`setError("")`) on each new submission before setting loading
- [ ] Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array

### Source Notes Panel — Additional Details

- [ ] Paper cards start expanded by default (`useState(true)` for `expanded`)
- [ ] `getErrorMessage()` utility returns `error.message` for Error instances, otherwise `"Unable to generate notes right now. Please try again."`
- [ ] Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`
- [ ] Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`
- [ ] Panel max-width is `max-w-md` (not full sidebar width)
- [ ] Panel uses `glass-panel` class with `shadow-2xl`
- [ ] Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount
- [ ] `Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`
- [ ] Panel header count uses singular/plural: `"1 paper"` vs `"N papers"`
- [ ] Suggested questions section header: `ChatCircleDots` icon (size 10) + `"Ask about this paper"` label
- [ ] Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover
- [ ] Question text is line-clamped to 1 line via `line-clamp-1`

### Audio Overview Panel — Additional Details

- [ ] `normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values
- [ ] Play/Pause button has dynamic `title`: `"Pause"` when playing, `"Play"` otherwise
- [ ] Play icon and Pause icon both use `weight="fill"` (not the default regular weight)
- [ ] Speed button has `title="Playback speed"`
- [ ] Download button has `title="Download audio"`
- [ ] Audio element uses `preload="auto"` attribute
- [ ] Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max
- [ ] Options toggle link text is literally `"Options"` — visible only when `canControlAudio && !showOptions`
- [ ] `formatTime` returns `"0:00"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds
- [ ] Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout
- [ ] Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`
- [ ] In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`
- [ ] Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = "noopener"`, clicks it, then removes it

### Conversation Actions — Server-Side Details

- [ ] `createConversation` defaults title to `"New Conversation"` when title param is falsy
- [ ] `createConversation` defaults `paper_ids` to empty array when not provided
- [ ] `addMessage` updates the parent conversation's `updated_at` timestamp after inserting the message
- [ ] `submitMessageFeedback` accepts an optional `comment` parameter in addition to the numeric rating
- [ ] `getConversations` orders results by `updated_at` descending (most recent first)

### Loading Skeleton — Additional Details

- [ ] Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`
- [ ] Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`
- [ ] Loading skeleton chat area uses `SkeletonText` component with `lines={6}`

### Behavior Corrections (Pass 3)

- [ ] Section 21 states password gate has a `type="password"` input — confirmed correct. However, the Share Dialog (section 19) password field is `type="text"` (plaintext visible), which is not noted in any existing check
- [ ] Existing check says the audio close button has `title="Close audio overview"` but no `aria-label` — confirmed still accurate as of this pass
- [ ] Section 12 describes coverage badge unused-paper truncation generically — the actual truncation differs from citation truncation: no 40-char colon cap, no ellipsis on 30-char fallback, and "not referenced" suffix text
- [ ] Section 9 states "3 dots (2x2 rounded-full, brand/40 color)" for loading — this is correct for the main loading indicator; the suggestion-loading dots are different (1.5x1.5, brand/30, different delays) and should not be confused

### Components Referenced But Not Rendered (Pass 3)

- [ ] No change — all `src/components/notebook` files remain in active import chains

---

*Document generated from source code analysis. Last updated: 2026-03-10.*
