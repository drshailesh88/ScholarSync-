# editor — Spec 005

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Save System
#### Save Status Indicators
- [x] PASS: **Unsaved** — amber icon + "Unsaved changes"
- [x] PASS: **Error** — red warning + "Save failed"
- [x] PASS: **Idle with last saved** — green check + "Saved HH:MM"
#### Editor Page Additional
- [x] PASS: **Error state** — red warning + "Retry save" button
- [x] PASS: **Offline state** — wifi-off icon + "Saved locally"
- [x] PASS: **beforeunload protection** — browser warns before closing tab if unsaved/saving
- [x] PASS: **Retry save** — button in error banner to retry failed save
#### Studio Page Additional
- [x] PASS: **localStorage draft backup** — saves content to `scholarsync_studio_draft` on every keystroke as fallback

### AI Chat Panel (Studio page)
#### Chat & Learn Tab
- [x] PASS: **Message input** — text input at bottom with send button
- [x] PASS: **Streaming responses** — AI responses stream in token by token
- [x] PASS: **Message bubbles** — user messages right-aligned, assistant messages left-aligned with sparkle avatar
- [x] PASS: **Loading animation** — 3 bouncing dots while waiting for response
- [x] PASS: **Error display** — amber error banner with error message
- [x] PASS: **Auto-scroll** — chat scrolls to bottom on new messages
- [x] PASS: **Conversation persistence** — creates DB conversation via `createConversation`, stores messages via `addMessage`
#### AI Event Handling
- [x] PASS: `continue` — sends document text with "Continue writing..." prompt
- [x] PASS: `summarize` — sends "Summarize the following text..." prompt
- [x] PASS: `find-sources` — opens research sidebar with context from editor
- [x] PASS: `cite` — asks AI for citation help
- [x] PASS: `integrity-check` — switches to Checks tab

### Write Mode — AI Intensity (Studio page)
- [x] PASS: Clicking a level selects it (highlighted state)
- [x] PASS: Description text updates below the buttons
- [x] PASS: Selected intensity is passed as `draftContext.intensity` to the chat API

### Learn Mode — Guide Mode (Studio page)
#### Features
- [x] PASS: **Banner message** — "Guide Mode — I won't write for you — I'll teach you how"
- [x] PASS: **Document type selector** — dropdown with 7 types:
#### Stage Progression
- [x] PASS: Active stage is highlighted green
- [x] PASS: Completed stages (before active) have lighter green background
- [x] PASS: Future stages are grey
- [x] PASS: Clicking any stage sets it as active
- [x] PASS: Guide context (documentType + stage) is passed to the chat API

### Research Sidebar (Studio page)
#### Research Tab in AI Panel
- [x] PASS: **"Open Literature Research Panel"** button — opens the ResearchSidebar component
- [x] PASS: **Shortcut hint** — `Cmd+Shift+L` to toggle
- [x] PASS: **Quick search** — PubMed search input + Search button, opens research sidebar with query
#### ResearchSidebar Component
- [x] PASS: **Resizable** — drag handle to adjust width
- [x] PASS: **Three tabs**: Search, Library, Chat
