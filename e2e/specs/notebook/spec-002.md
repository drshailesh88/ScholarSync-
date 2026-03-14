# notebook — Spec 002

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### URL Ingestion
- [ ] **Original URL preserved** — stored in `originalUrl` field
- [ ] **URL input cleared** — after submission
- [ ] **URL input hidden** — after submission

### Source File Status & States
#### Retry Embed
- [ ] **Retry button** — appears below "Embedding failed" label
- [ ] Shows ArrowClockwise icon + "Click to retry" text
- [ ] Sets status to "processing" during retry
- [ ] On success: status → `ready`
- [ ] On failure: status → `embed_failed` again

### Source Selection & Management
- [ ] **Checkbox per file** — toggles `selected` state
- [ ] **Selected papers** used for RAG retrieval in chat
- [ ] **Unselected papers** excluded from AI queries
- [ ] **Remove button** — X icon, visible on hover, removes file from list
- [ ] **Selected count** — used in empty state text: "Ready to analyze N source(s)"

### Notebook Modes
#### Research Mode (default)
- [ ] Chat header shows "Notebook Chat"
- [ ] Input placeholder: "Ask about your sources..."
- [ ] Empty state: "Ready to analyze N source(s)" + "Select sources on the left, then ask a question"
- [ ] Starter suggestions: "Summarize Key Themes", "Find Contradictions", "Compare Methodologies"
- [ ] AI provides direct, evidence-grounded responses
- [ ] Follow-up chips styled with neutral surface colors
#### Learn Mode
- [ ] Chat header shows "Learn Mode"
- [ ] **Socratic tutoring badge** — amber pill: "Socratic tutoring"
- [ ] Input placeholder: "What do you want to explore?"
- [ ] Empty state: "Learn mode: I'll ask you guiding questions instead of giving direct answers"
- [ ] Starter suggestions: "Quiz me on these papers", "What assumptions should I question?", "Help me find gaps in this research"
- [ ] AI uses Socratic method — asks guiding questions instead of direct answers
- [ ] Follow-up chips styled with amber colors (amber-500/5 background, amber-500/20 border)
#### Mode Switching
- [ ] Clicking mode button updates `notebookMode` state
- [ ] Mode persisted in conversation record on creation
- [ ] Mode sent as API parameter (`"notebook"` for research, `"learn"` for learn)
- [ ] Switching modes updates starter suggestions immediately
- [ ] Chat messages preserved when switching modes mid-conversation

### Conversation History
#### History Dropdown
- [ ] **Toggle button** — ClockCounterClockwise icon + "Past conversations" + caret
- [ ] **Caret direction** — CaretDown when closed, CaretUp when open
- [ ] **Max height** — 32 lines, scrollable overflow
- [ ] **"+ New conversation" button** — brand-colored, starts fresh conversation
