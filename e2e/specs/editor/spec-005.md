# editor — Spec 005

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Save System
#### Save Status Indicators
- [ ] **Unsaved** — amber icon + "Unsaved changes"
- [ ] **Error** — red warning + "Save failed"
- [ ] **Idle with last saved** — green check + "Saved HH:MM"
#### Editor Page Additional
- [ ] **Error state** — red warning + "Retry save" button
- [ ] **Offline state** — wifi-off icon + "Saved locally"
- [ ] **beforeunload protection** — browser warns before closing tab if unsaved/saving
- [ ] **Retry save** — button in error banner to retry failed save
#### Studio Page Additional
- [ ] **localStorage draft backup** — saves content to `scholarsync_studio_draft` on every keystroke as fallback

### AI Chat Panel (Studio page)
#### Chat & Learn Tab
- [ ] **Message input** — text input at bottom with send button
- [ ] **Streaming responses** — AI responses stream in token by token
- [ ] **Message bubbles** — user messages right-aligned, assistant messages left-aligned with sparkle avatar
- [ ] **Loading animation** — 3 bouncing dots while waiting for response
- [ ] **Error display** — amber error banner with error message
- [ ] **Auto-scroll** — chat scrolls to bottom on new messages
- [ ] **Conversation persistence** — creates DB conversation via `createConversation`, stores messages via `addMessage`
#### AI Event Handling
- [ ] `continue` — sends document text with "Continue writing..." prompt
- [ ] `summarize` — sends "Summarize the following text..." prompt
- [ ] `find-sources` — opens research sidebar with context from editor
- [ ] `cite` — asks AI for citation help
- [ ] `integrity-check` — switches to Checks tab

### Write Mode — AI Intensity (Studio page)
- [ ] Clicking a level selects it (highlighted state)
- [ ] Description text updates below the buttons
- [ ] Selected intensity is passed as `draftContext.intensity` to the chat API

### Learn Mode — Guide Mode (Studio page)
#### Features
- [ ] **Banner message** — "Guide Mode — I won't write for you — I'll teach you how"
- [ ] **Document type selector** — dropdown with 7 types:
#### Stage Progression
- [ ] Active stage is highlighted green
- [ ] Completed stages (before active) have lighter green background
- [ ] Future stages are grey
- [ ] Clicking any stage sets it as active
- [ ] Guide context (documentType + stage) is passed to the chat API

### Research Sidebar (Studio page)
#### Research Tab in AI Panel
- [ ] **"Open Literature Research Panel"** button — opens the ResearchSidebar component
- [ ] **Shortcut hint** — `Cmd+Shift+L` to toggle
- [ ] **Quick search** — PubMed search input + Search button, opens research sidebar with query
#### ResearchSidebar Component
- [ ] **Resizable** — drag handle to adjust width
- [ ] **Three tabs**: Search, Library, Chat
