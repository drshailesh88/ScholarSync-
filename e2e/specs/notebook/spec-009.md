# notebook — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Audio Overview Panel
#### Audio Events
- [ ] **timeupdate** — updates progress slider and time display
- [ ] **ended** — resets to ready state, rewinds to start
- [ ] **loadedmetadata** — updates duration from actual audio
- [ ] **pause** / **play** — syncs audio state
- [ ] **error** — shows "Unable to play generated audio." error

### Notebook Sharing
#### Share Button
- [ ] **ShareNetwork icon** — in chat header toolbar
- [ ] **Disabled** — when no conversation exists (opacity-30, cursor-not-allowed)
- [ ] **Closes other overlays** — PDF viewer, source notes
#### Share Dialog
- [ ] **Modal overlay** — fixed inset-0, black/50 background, backdrop-blur-sm
- [ ] **Click outside closes** — backdrop click handler
- [ ] **Escape key closes** — keydown event listener
- [ ] **Header** — LinkSimple icon + "Share Notebook"
- [ ] **Close button** — X icon in header
#### Public Sharing Toggle
- [ ] **Toggle switch** — custom styled 44px toggle (w-11, h-6)
- [ ] **Label** — "Public sharing"
- [ ] **Description** — "Anyone with the link can view this notebook conversation"
- [ ] **Enable** — calls `enableNotebookSharing()`, generates share URL
- [ ] **Disable** — calls `disableNotebookSharing()`
- [ ] **Loading state** — toggle disabled with opacity-50 during API call
#### Share Link (when enabled)
- [ ] **Read-only input** — displays full share URL
- [ ] **Copy button** — brand background, Copy icon + "Copy" text
- [ ] **Copied confirmation** — Check icon + "Copied" for 2 seconds
#### Password Protection
- [ ] **Lock icon** + "Password protection (optional)" label
- [ ] **Text input** — placeholder "Leave empty for no password"
- [ ] **Optional** — leaving empty means no password required
#### Expiration Date
- [ ] **CalendarBlank icon** + "Expiration date (optional)" label
- [ ] **Date input** — type="date", min set to today
- [ ] **Optional** — leaving empty means no expiration
#### Save Settings
- [ ] **"Save Settings" button** — full-width, calls `updateNotebookShareSettings()`
- [ ] **Loading state** — "Saving..." text, disabled button
- [ ] **Loading settings** — "Loading share settings..." centered text on open

### Shared Notebook Viewer
#### Header
- [ ] **Notebook icon** (brand) + conversation title
- [ ] **Metadata** — "Shared by [owner]" + date + mode indicator
- [ ] **Learn mode indicator** — " · Learn Mode" appended
#### Messages
- [ ] **User messages** — right-aligned, white/5 background
