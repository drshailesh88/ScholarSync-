# notebook — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Source Citations Panel and PDF Jump Behavior
- [x] PASS: Clicking a citation to a URL-backed source also clears any existing `pdfViewerState`
- [x] PASS: Clicking a citation to a non-URL source opens the PDF viewer with `/api/papers/{paperId}/pdf`
- [x] PASS: PDF viewer falls back to page `1` when citation metadata has no page number
- [x] PASS: Citation navigation always closes source notes and share dialog first to avoid overlay conflicts
#### Source Notes Panel Details
- [x] PASS: Source Notes drawer locks `document.body.style.overflow = "hidden"` while open
- [x] PASS: Source Notes drawer slides in from the right using an `animateIn` flag and transform transitions
- [x] PASS: Source Notes count pill reflects only ready papers loaded into `paperNotes`, not raw sidebar row count
- [x] PASS: When there are zero ready papers, Source Notes empty state says `No papers loaded yet.` and `Upload PDFs in the sidebar to see source notes.`
- [x] PASS: When paper-note loading fails, Source Notes shows `Failed to load paper notes.`
- [x] PASS: `Generate All` banner appears only when at least one loaded note is missing an overview
- [x] PASS: `Generate All` processes missing notes in batches of 3
- [x] PASS: Source Notes sorts selected papers ahead of unselected papers instead of preserving original order
- [x] PASS: Unselected note cards use reduced opacity and the text `Not selected for chat`
- [x] PASS: Generated note cards show a timestamp formatted with month, day, hour, and minute
- [x] PASS: `Ask about this paper` suggestion rows send a notebook message and immediately close the notes drawer
- [x] PASS: Per-paper generate failures render inline red text under that paper's summary block
#### Audio Overview Panel Details
- [x] PASS: Audio Overview auto-generates once on first mount using `hasTriggeredRef`
- [x] PASS: Audio Overview enters `error` state immediately when opened with no conversation id or no valid paper ids
- [x] PASS: Audio Overview generation request body includes `conversationId`, normalized unique `paperIds`, `mode`, optional `customPrompt`, and optional non-default `length`
- [x] PASS: Audio Overview displays a `Cached` badge only when the result is cached and controls are available
- [x] PASS: Audio Overview speed button cycles through `1x`, `1.25x`, `1.5x`, and `2x`
- [x] PASS: Transcript is hidden by default after each successful generation
- [x] PASS: Changing conversation id, selected paper ids, mode, custom prompt, or audio length resets the panel back to `idle`
- [x] PASS: Audio Overview options panel is visible by default only in idle state and later via the `Options` link
- [x] PASS: Length choices are `Brief (~1 min)`, `Standard (~3 min)`, and `Detailed (~5 min)`
- [x] PASS: Custom focus prompt input enforces `maxLength={500}`
- [x] PASS: When options are open after a previous generation, the CTA label changes to `Regenerate with new settings`
- [x] PASS: Download action always saves the file as `audio-overview.mp3`
- [x] PASS: Closing the audio panel pauses playback and resets current time to 0 before dismissing
- [x] PASS: Playback failures show `Playback failed. Please try again.`
- [x] PASS: Audio playback element is only mounted once an `audioUrl` exists
#### Share Dialog Details
- [x] PASS: Share dialog fetches existing settings on mount and shows `Loading share settings...` while waiting
- [x] PASS: Share dialog closes on Escape in addition to backdrop click and close-button click
- [x] PASS: Share toggle enables sharing by calling `enableNotebookSharing(conversationId)` and stores the returned `shareUrl`
- [x] PASS: Disabling sharing flips only `shareEnabled` false in local state and does not clear the existing `shareUrl` field
