# feeds — Spec 004

STATUS: PARTIAL
TESTED: 35/35
PASS: 6
FAIL: 29
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
- [ ] FAIL: Sparkle icon in brand/20 background
- [x] PASS: Title: "AI Copilot"
- [ ] FAIL: Close button (X icon)
#### Compact Article Header
- [ ] FAIL: Article title (line-clamp-2)
- [ ] FAIL: Authors, journal, year
#### Chat Messages
- [ ] FAIL: User messages: surface-raised background, right-aligned
- [ ] FAIL: Assistant messages: brand/5 background, left-aligned with Sparkle icon
- [ ] FAIL: Loading indicator: 3 animated dots
- [ ] FAIL: Streaming: text appears incrementally
- [ ] FAIL: Auto-scroll to latest message
#### Suggested Questions
- [ ] FAIL: Clickable chips with follow-up question text
- [ ] FAIL: Clicking sends the suggestion as a message
#### Chat Input
- [ ] FAIL: Placeholder: "Ask about this paper..."
- [ ] FAIL: PaperPlaneRight send button (brand background)
- [ ] FAIL: Disabled when loading or input empty
#### Initial State (No Messages)
- [ ] FAIL: Centered Sparkle icon (large, brand/10 bg)
- [ ] FAIL: "Ask me about this paper"
- [ ] FAIL: "Click Summarize for a quick overview, or ask any question about the study."
#### Copilot APIs
- [x] PASS: `POST /api/feeds/copilot/summarize` — returns summary + suggestions + source tier
- [x] PASS: `POST /api/feeds/copilot/chat` — SSE streaming chat response

### Add Feed Modal
#### Tabs
- [ ] FAIL: "Add URL" tab
- [ ] FAIL: "Browse Journals" tab
#### Add URL Tab
- [ ] FAIL: Label: "RSS / Atom Feed URL"
- [ ] FAIL: Input placeholder: "https://example.com/feed.xml"
- [ ] FAIL: "Add" button (loading: "Adding...")
- [ ] FAIL: Enter key submits
- [ ] FAIL: Validates URL and subscribes
- [ ] FAIL: Label: "PubMed Search Query"
- [x] PASS: Input placeholder: `e.g. "machine learning" AND radiology`
- [ ] FAIL: "Create Feed" button (loading: "Creating...")
- [ ] FAIL: Enter key submits
- [ ] FAIL: Creates live PubMed search feed
- [ ] FAIL: Red background (red-500/10) with error text
