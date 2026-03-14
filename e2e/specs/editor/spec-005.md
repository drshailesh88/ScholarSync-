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
- [x] **Unsaved** — amber icon + "Unsaved changes"
- [x] **Error** — red warning + "Save failed"
- [x] **Idle with last saved** — green check + "Saved HH:MM"
#### Editor Page Additional
- [x] **Error state** — red warning + "Retry save" button
- [x] **Offline state** — wifi-off icon + "Saved locally"
- [x] **beforeunload protection** — browser warns before closing tab if unsaved/saving
- [x] **Retry save** — button in error banner to retry failed save
#### Studio Page Additional
- [x] **localStorage draft backup** — saves content to `scholarsync_studio_draft` on every keystroke as fallback

### AI Chat Panel (Studio page)
#### Chat & Learn Tab
- [x] **Message input** — text input at bottom with send button
- [x] **Streaming responses** — AI responses stream in token by token
- [x] **Message bubbles** — user messages right-aligned, assistant messages left-aligned with sparkle avatar
- [x] **Loading animation** — 3 bouncing dots while waiting for response
- [x] **Error display** — amber error banner with error message
- [x] **Auto-scroll** — chat scrolls to bottom on new messages
- [x] **Conversation persistence** — creates DB conversation via `createConversation`, stores messages via `addMessage`
#### AI Event Handling
- [x] `continue` — sends document text with "Continue writing..." prompt
- [x] `summarize` — sends "Summarize the following text..." prompt
- [x] `find-sources` — opens research sidebar with context from editor
- [x] `cite` — asks AI for citation help
- [x] `integrity-check` — switches to Checks tab

### Write Mode — AI Intensity (Studio page)
- [x] Clicking a level selects it (highlighted state)
- [x] Description text updates below the buttons
- [x] Selected intensity is passed as `draftContext.intensity` to the chat API

### Learn Mode — Guide Mode (Studio page)
#### Features
- [x] **Banner message** — "Guide Mode — I won't write for you — I'll teach you how"
- [x] **Document type selector** — dropdown with 7 types:
#### Stage Progression
- [x] Active stage is highlighted green
- [x] Completed stages (before active) have lighter green background
- [x] Future stages are grey
- [x] Clicking any stage sets it as active
- [x] Guide context (documentType + stage) is passed to the chat API

### Research Sidebar (Studio page)
#### Research Tab in AI Panel
- [x] **"Open Literature Research Panel"** button — opens the ResearchSidebar component
- [x] **Shortcut hint** — `Cmd+Shift+L` to toggle
- [x] **Quick search** — PubMed search input + Search button, opens research sidebar with query
#### ResearchSidebar Component
- [x] **Resizable** — drag handle to adjust width
- [x] **Three tabs**: Search, Library, Chat
