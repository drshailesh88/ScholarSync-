# notebook — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### URL Ingestion
- [x] PASS: **Original URL preserved** — stored in `originalUrl` field
- [x] PASS: **URL input cleared** — after submission
- [x] PASS: **URL input hidden** — after submission

### Source File Status & States
#### Retry Embed
- [x] PASS: **Retry button** — appears below "Embedding failed" label
- [x] PASS: Shows ArrowClockwise icon + "Click to retry" text
- [x] PASS: Sets status to "processing" during retry
- [x] PASS: On success: status → `ready`
- [x] PASS: On failure: status → `embed_failed` again

### Source Selection & Management
- [x] PASS: **Checkbox per file** — toggles `selected` state
- [x] PASS: **Selected papers** used for RAG retrieval in chat
- [x] PASS: **Unselected papers** excluded from AI queries
- [x] PASS: **Remove button** — X icon, visible on hover, removes file from list
- [x] PASS: **Selected count** — used in empty state text: "Ready to analyze N source(s)"

### Notebook Modes
#### Research Mode (default)
- [x] PASS: Chat header shows "Notebook Chat"
- [x] PASS: Input placeholder: "Ask about your sources..."
- [x] PASS: Empty state: "Ready to analyze N source(s)" + "Select sources on the left, then ask a question"
- [x] PASS: Starter suggestions: "Summarize Key Themes", "Find Contradictions", "Compare Methodologies"
- [x] PASS: AI provides direct, evidence-grounded responses
- [x] PASS: Follow-up chips styled with neutral surface colors
#### Learn Mode
- [x] PASS: Chat header shows "Learn Mode"
- [x] PASS: **Socratic tutoring badge** — amber pill: "Socratic tutoring"
- [x] PASS: Input placeholder: "What do you want to explore?"
- [x] PASS: Empty state: "Learn mode: I'll ask you guiding questions instead of giving direct answers"
- [x] PASS: Starter suggestions: "Quiz me on these papers", "What assumptions should I question?", "Help me find gaps in this research"
- [x] PASS: AI uses Socratic method — asks guiding questions instead of direct answers
- [x] PASS: Follow-up chips styled with amber colors (amber-500/5 background, amber-500/20 border)
#### Mode Switching
- [x] PASS: Clicking mode button updates `notebookMode` state
- [x] PASS: Mode persisted in conversation record on creation
- [x] PASS: Mode sent as API parameter (`"notebook"` for research, `"learn"` for learn)
- [x] PASS: Switching modes updates starter suggestions immediately
- [x] PASS: Chat messages preserved when switching modes mid-conversation

### Conversation History
#### History Dropdown
- [x] PASS: **Toggle button** — ClockCounterClockwise icon + "Past conversations" + caret
- [x] PASS: **Caret direction** — CaretDown when closed, CaretUp when open
- [x] PASS: **Max height** — 32 lines, scrollable overflow
- [x] PASS: **"+ New conversation" button** — brand-colored, starts fresh conversation
