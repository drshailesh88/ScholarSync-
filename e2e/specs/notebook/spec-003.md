# notebook — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Conversation History
#### Conversation List
- [x] PASS: Loads up to 20 past notebook conversations on mount
- [x] PASS: Each entry shows conversation title (truncated)
- [x] PASS: **Active conversation** — highlighted with brand/10 background + brand text
- [x] PASS: **Inactive conversations** — muted text with hover highlight
- [x] PASS: **Empty state** — "No past conversations" text
- [x] PASS: **Click to load** — loads full conversation with messages
#### Load Conversation
- [x] PASS: Restores all messages with sources
- [x] PASS: Restores paper selection from stored `paper_ids`
- [x] PASS: Restores mode (research/learn) from conversation record
- [x] PASS: Clears follow-up suggestions, coverage report, PDF viewer, overlays
- [x] PASS: Restores sources panel from last assistant message with sources
- [x] PASS: Closes history dropdown after loading
#### New Conversation
- [x] PASS: Clears conversation ID
- [x] PASS: Clears all messages
- [x] PASS: Clears sources panel, coverage report, follow-up suggestions
- [x] PASS: Clears PDF viewer, source notes, share dialog, audio overview

### Chat Interface
#### Message Display
- [x] PASS: **Chat area** — scrollable container with `role="log"` and `aria-live="polite"`
- [x] PASS: **User messages** — right-aligned, surface-raised background, rounded-2xl
- [x] PASS: **Assistant messages** — left-aligned, brand/5 background, rounded-2xl
- [x] PASS: **AI avatar** — 7x7 circle with brand/20 background, Sparkle icon inside
- [x] PASS: **Max width** — 75% of container for both message types
- [x] PASS: **Pre-wrap text** — whitespace preserved, relaxed line-height
- [x] PASS: **Auto-scroll** — scrolls to bottom on new messages via `messagesEndRef`
#### Loading State
- [x] PASS: **Bouncing dots** — 3 dots (2x2 rounded-full, brand/40 color)
- [x] PASS: Dots have staggered animation delays (0ms, 150ms, 300ms)
- [x] PASS: AI avatar shown with spinning Sparkle icon during loading
- [x] PASS: brand/5 background bubble wraps the loading dots
#### Input Area
- [x] PASS: **Form wrapper** — prevents default submit, calls `sendMessage()`
- [x] PASS: **Paperclip button** — opens file picker for additional uploads
- [x] PASS: **Text input** — full-width, transparent background
- [x] PASS: **Placeholder** — changes based on mode (see Modes section)
- [x] PASS: **Send button** — PaperPlaneRight icon, brand background, rounded-xl
- [x] PASS: **Disabled state** — send button disabled when loading or input is empty
- [x] PASS: **Disclaimer** — "AI can make mistakes. Check important info." centered below input

### Message Streaming & RAG
#### RAG vs Non-RAG Routing
- [x] PASS: **With selected papers** — sends to `/api/rag-chat` with `paperIds`
