# notebook — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Audio Overview Panel
#### Audio Events
- [x] PASS: **timeupdate** — updates progress slider and time display
- [x] PASS: **ended** — resets to ready state, rewinds to start
- [x] PASS: **loadedmetadata** — updates duration from actual audio
- [x] PASS: **pause** / **play** — syncs audio state
- [x] PASS: **error** — shows "Unable to play generated audio." error

### Notebook Sharing
#### Share Button
- [x] PASS: **ShareNetwork icon** — in chat header toolbar
- [x] PASS: **Disabled** — when no conversation exists (opacity-30, cursor-not-allowed)
- [x] PASS: **Closes other overlays** — PDF viewer, source notes
#### Share Dialog
- [x] PASS: **Modal overlay** — fixed inset-0, black/50 background, backdrop-blur-sm
- [x] PASS: **Click outside closes** — backdrop click handler
- [x] PASS: **Escape key closes** — keydown event listener
- [x] PASS: **Header** — LinkSimple icon + "Share Notebook"
- [x] PASS: **Close button** — X icon in header
#### Public Sharing Toggle
- [x] PASS: **Toggle switch** — custom styled 44px toggle (w-11, h-6)
- [x] PASS: **Label** — "Public sharing"
- [x] PASS: **Description** — "Anyone with the link can view this notebook conversation"
- [x] PASS: **Enable** — calls `enableNotebookSharing()`, generates share URL
- [x] PASS: **Disable** — calls `disableNotebookSharing()`
- [x] PASS: **Loading state** — toggle disabled with opacity-50 during API call
#### Share Link (when enabled)
- [x] PASS: **Read-only input** — displays full share URL
- [x] PASS: **Copy button** — brand background, Copy icon + "Copy" text
- [x] PASS: **Copied confirmation** — Check icon + "Copied" for 2 seconds
#### Password Protection
- [x] PASS: **Lock icon** + "Password protection (optional)" label
- [x] PASS: **Text input** — placeholder "Leave empty for no password"
- [x] PASS: **Optional** — leaving empty means no password required
#### Expiration Date
- [x] PASS: **CalendarBlank icon** + "Expiration date (optional)" label
- [x] PASS: **Date input** — type="date", min set to today
- [x] PASS: **Optional** — leaving empty means no expiration
#### Save Settings
- [x] PASS: **"Save Settings" button** — full-width, calls `updateNotebookShareSettings()`
- [x] PASS: **Loading state** — "Saving..." text, disabled button
- [x] PASS: **Loading settings** — "Loading share settings..." centered text on open

### Shared Notebook Viewer
#### Header
- [x] PASS: **Notebook icon** (brand) + conversation title
- [x] PASS: **Metadata** — "Shared by [owner]" + date + mode indicator
- [x] PASS: **Learn mode indicator** — " · Learn Mode" appended
#### Messages
- [x] PASS: **User messages** — right-aligned, white/5 background
