# feeds — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Related Papers
#### API
- [x] PASS: `GET /api/feeds/articles/{id}/related` (limit: 5)
- [x] PASS: `POST /api/papers/save` for saving related papers

### AI Copilot Panel
#### Header
- [x] PASS: Sparkle icon in brand/20 background
- [x] PASS: Title: "AI Copilot"
- [x] PASS: Close button (X icon)
#### Compact Article Header
- [x] PASS: Article title (line-clamp-2)
- [x] PASS: Authors, journal, year
#### Chat Messages
- [x] PASS: User messages: surface-raised background, right-aligned
- [x] PASS: Assistant messages: brand/5 background, left-aligned with Sparkle icon
- [x] PASS: Loading indicator: 3 animated dots
- [x] PASS: Streaming: text appears incrementally
- [x] PASS: Auto-scroll to latest message
#### Suggested Questions
- [x] PASS: Clickable chips with follow-up question text
- [x] PASS: Clicking sends the suggestion as a message
#### Chat Input
- [x] PASS: Placeholder: "Ask about this paper..."
- [x] PASS: PaperPlaneRight send button (brand background)
- [x] PASS: Disabled when loading or input empty
#### Initial State (No Messages)
- [x] PASS: Centered Sparkle icon (large, brand/10 bg)
- [x] PASS: "Ask me about this paper"
- [x] PASS: "Click Summarize for a quick overview, or ask any question about the study."
#### Copilot APIs
- [x] PASS: `POST /api/feeds/copilot/summarize` — returns summary + suggestions + source tier
- [x] PASS: `POST /api/feeds/copilot/chat` — SSE streaming chat response

### Add Feed Modal
#### Tabs
- [x] PASS: "Add URL" tab
- [x] PASS: "Browse Journals" tab
#### Add URL Tab
- [x] PASS: Label: "RSS / Atom Feed URL"
- [x] PASS: Input placeholder: "https://example.com/feed.xml"
- [x] PASS: "Add" button (loading: "Adding...")
- [x] PASS: Enter key submits
- [x] PASS: Validates URL and subscribes
- [x] PASS: Label: "PubMed Search Query"
- [x] PASS: Input placeholder: `e.g. "machine learning" AND radiology`
- [x] PASS: "Create Feed" button (loading: "Creating...")
- [x] PASS: Enter key submits
- [x] PASS: Creates live PubMed search feed
- [x] PASS: Red background (red-500/10) with error text
