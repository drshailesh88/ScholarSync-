# feeds — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Related Papers
#### API
- [ ] `GET /api/feeds/articles/{id}/related` (limit: 5)
- [ ] `POST /api/papers/save` for saving related papers

### AI Copilot Panel
#### Header
- [ ] Sparkle icon in brand/20 background
- [ ] Title: "AI Copilot"
- [ ] Close button (X icon)
#### Compact Article Header
- [ ] Article title (line-clamp-2)
- [ ] Authors, journal, year
#### Chat Messages
- [ ] User messages: surface-raised background, right-aligned
- [ ] Assistant messages: brand/5 background, left-aligned with Sparkle icon
- [ ] Loading indicator: 3 animated dots
- [ ] Streaming: text appears incrementally
- [ ] Auto-scroll to latest message
#### Suggested Questions
- [ ] Clickable chips with follow-up question text
- [ ] Clicking sends the suggestion as a message
#### Chat Input
- [ ] Placeholder: "Ask about this paper..."
- [ ] PaperPlaneRight send button (brand background)
- [ ] Disabled when loading or input empty
#### Initial State (No Messages)
- [ ] Centered Sparkle icon (large, brand/10 bg)
- [ ] "Ask me about this paper"
- [ ] "Click Summarize for a quick overview, or ask any question about the study."
#### Copilot APIs
- [ ] `POST /api/feeds/copilot/summarize` — returns summary + suggestions + source tier
- [ ] `POST /api/feeds/copilot/chat` — SSE streaming chat response

### Add Feed Modal
#### Tabs
- [ ] "Add URL" tab
- [ ] "Browse Journals" tab
#### Add URL Tab
- [ ] Label: "RSS / Atom Feed URL"
- [ ] Input placeholder: "https://example.com/feed.xml"
- [ ] "Add" button (loading: "Adding...")
- [ ] Enter key submits
- [ ] Validates URL and subscribes
- [ ] Label: "PubMed Search Query"
- [ ] Input placeholder: `e.g. "machine learning" AND radiology`
- [ ] "Create Feed" button (loading: "Creating...")
- [ ] Enter key submits
- [ ] Creates live PubMed search feed
- [ ] Red background (red-500/10) with error text
