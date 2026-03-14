# notebook — Spec 003

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Conversation History
#### Conversation List
- [ ] Loads up to 20 past notebook conversations on mount
- [ ] Each entry shows conversation title (truncated)
- [ ] **Active conversation** — highlighted with brand/10 background + brand text
- [ ] **Inactive conversations** — muted text with hover highlight
- [ ] **Empty state** — "No past conversations" text
- [ ] **Click to load** — loads full conversation with messages
#### Load Conversation
- [ ] Restores all messages with sources
- [ ] Restores paper selection from stored `paper_ids`
- [ ] Restores mode (research/learn) from conversation record
- [ ] Clears follow-up suggestions, coverage report, PDF viewer, overlays
- [ ] Restores sources panel from last assistant message with sources
- [ ] Closes history dropdown after loading
#### New Conversation
- [ ] Clears conversation ID
- [ ] Clears all messages
- [ ] Clears sources panel, coverage report, follow-up suggestions
- [ ] Clears PDF viewer, source notes, share dialog, audio overview

### Chat Interface
#### Message Display
- [ ] **Chat area** — scrollable container with `role="log"` and `aria-live="polite"`
- [ ] **User messages** — right-aligned, surface-raised background, rounded-2xl
- [ ] **Assistant messages** — left-aligned, brand/5 background, rounded-2xl
- [ ] **AI avatar** — 7x7 circle with brand/20 background, Sparkle icon inside
- [ ] **Max width** — 75% of container for both message types
- [ ] **Pre-wrap text** — whitespace preserved, relaxed line-height
- [ ] **Auto-scroll** — scrolls to bottom on new messages via `messagesEndRef`
#### Loading State
- [ ] **Bouncing dots** — 3 dots (2x2 rounded-full, brand/40 color)
- [ ] Dots have staggered animation delays (0ms, 150ms, 300ms)
- [ ] AI avatar shown with spinning Sparkle icon during loading
- [ ] brand/5 background bubble wraps the loading dots
#### Input Area
- [ ] **Form wrapper** — prevents default submit, calls `sendMessage()`
- [ ] **Paperclip button** — opens file picker for additional uploads
- [ ] **Text input** — full-width, transparent background
- [ ] **Placeholder** — changes based on mode (see Modes section)
- [ ] **Send button** — PaperPlaneRight icon, brand background, rounded-xl
- [ ] **Disabled state** — send button disabled when loading or input is empty
- [ ] **Disclaimer** — "AI can make mistakes. Check important info." centered below input

### Message Streaming & RAG
#### RAG vs Non-RAG Routing
- [ ] **With selected papers** — sends to `/api/rag-chat` with `paperIds`
