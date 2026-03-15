# notebook — Spec 016

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Source Citations Panel and PDF Jump Behavior
- [ ] Clicking a citation to a URL-backed source also clears any existing `pdfViewerState`
- [ ] Clicking a citation to a non-URL source opens the PDF viewer with `/api/papers/{paperId}/pdf`
- [ ] PDF viewer falls back to page `1` when citation metadata has no page number
- [ ] Citation navigation always closes source notes and share dialog first to avoid overlay conflicts
#### Source Notes Panel Details
- [ ] Source Notes drawer locks `document.body.style.overflow = "hidden"` while open
- [ ] Source Notes drawer slides in from the right using an `animateIn` flag and transform transitions
- [ ] Source Notes count pill reflects only ready papers loaded into `paperNotes`, not raw sidebar row count
- [ ] When there are zero ready papers, Source Notes empty state says `No papers loaded yet.` and `Upload PDFs in the sidebar to see source notes.`
- [ ] When paper-note loading fails, Source Notes shows `Failed to load paper notes.`
- [ ] `Generate All` banner appears only when at least one loaded note is missing an overview
- [ ] `Generate All` processes missing notes in batches of 3
- [ ] Source Notes sorts selected papers ahead of unselected papers instead of preserving original order
- [ ] Unselected note cards use reduced opacity and the text `Not selected for chat`
- [ ] Generated note cards show a timestamp formatted with month, day, hour, and minute
- [ ] `Ask about this paper` suggestion rows send a notebook message and immediately close the notes drawer
- [ ] Per-paper generate failures render inline red text under that paper's summary block
#### Audio Overview Panel Details
- [ ] Audio Overview auto-generates once on first mount using `hasTriggeredRef`
- [ ] Audio Overview enters `error` state immediately when opened with no conversation id or no valid paper ids
- [ ] Audio Overview generation request body includes `conversationId`, normalized unique `paperIds`, `mode`, optional `customPrompt`, and optional non-default `length`
- [ ] Audio Overview displays a `Cached` badge only when the result is cached and controls are available
- [ ] Audio Overview speed button cycles through `1x`, `1.25x`, `1.5x`, and `2x`
- [ ] Transcript is hidden by default after each successful generation
- [ ] Changing conversation id, selected paper ids, mode, custom prompt, or audio length resets the panel back to `idle`
- [ ] Audio Overview options panel is visible by default only in idle state and later via the `Options` link
- [ ] Length choices are `Brief (~1 min)`, `Standard (~3 min)`, and `Detailed (~5 min)`
- [ ] Custom focus prompt input enforces `maxLength={500}`
- [ ] When options are open after a previous generation, the CTA label changes to `Regenerate with new settings`
- [ ] Download action always saves the file as `audio-overview.mp3`
- [ ] Closing the audio panel pauses playback and resets current time to 0 before dismissing
- [ ] Playback failures show `Playback failed. Please try again.`
- [ ] Audio playback element is only mounted once an `audioUrl` exists
#### Share Dialog Details
- [ ] Share dialog fetches existing settings on mount and shows `Loading share settings...` while waiting
- [ ] Share dialog closes on Escape in addition to backdrop click and close-button click
- [ ] Share toggle enables sharing by calling `enableNotebookSharing(conversationId)` and stores the returned `shareUrl`
- [ ] Disabling sharing flips only `shareEnabled` false in local state and does not clear the existing `shareUrl` field
