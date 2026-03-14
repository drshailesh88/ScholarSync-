# notebook — Spec 019

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Audio Overview Internals
- [ ] Audio overview resets itself to `idle` whenever `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes
- [ ] That reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, and `isCachedResult`
- [ ] Transcript visibility defaults to hidden (`showTranscript === false`) and is also forced back to hidden after successful generation
- [ ] Missing conversation state shows the exact error `Select papers and start a notebook conversation first.`
- [ ] Missing selected-paper state shows the exact error `Select at least one paper to generate an audio overview.`
- [ ] Playback speed cycles through the fixed order `1x → 1.25x → 1.5x → 2x → 1x`
- [ ] `cycleSpeed()` updates both the `speedIndex` state and `audioRef.current.playbackRate`
- [ ] Download always uses the fixed filename `audio-overview.mp3`
- [ ] Closing the panel pauses playback and resets `audio.currentTime = 0` before calling `onClose()`
- [ ] Natural playback end sets audio state back to `ready`, resets `currentTime` to `0`, and rewinds `audio.currentTime = 0`
- [ ] `Regenerate with new settings` hides the options panel first via `setShowOptions(false)` and then triggers a fresh generation
#### Share Dialog Internals
- [ ] Share dialog initializes with `loading: true` and renders `Loading share settings...` until `getNotebookShareSettings(conversationId)` settles
- [ ] Share settings are fetched automatically on mount through a `useEffect(() => { loadSettings(); }, [loadSettings])`
- [ ] Share-dialog load failures log `Failed to load share settings:` to the console and do not render inline error text
- [ ] Escape-to-close is handled by a document-level `keydown` listener that is removed on unmount
- [ ] Share toggling calls `enableNotebookSharing(conversationId)` only when `shareEnabled` is currently false
- [ ] Enabling sharing mutates local state with `setShareEnabled(true)` and `setShareUrl(result.shareUrl)`
- [ ] Disabling sharing calls `disableNotebookSharing(conversationId)` and flips only `shareEnabled` to `false` in local state
- [ ] `Save Settings` persists only `{ password: password || null, expiresAt: expiresAt ? new Date(expiresAt) : null }`
- [ ] `Save Settings` does not re-enable sharing, regenerate a token, or refresh the loaded share URL
- [ ] Toggle and save failures are console-only via `Failed to toggle sharing:` and `Failed to save share settings:`
#### Shared Notebook Viewer Internals
- [ ] Shared notebook metadata title is generated as `${notebook.title} - ScholarSync`
- [ ] Missing or disabled share tokens call `notFound()` from `src/app/share/notebook/[token]/page.tsx`
- [ ] The share route renders `NotebookPasswordGate` only when `notebook.hasPassword` is true; otherwise it renders `SharedNotebookViewer` directly
- [ ] Password-gate submit is disabled while `loading` is true or while the password field is empty
- [ ] Incorrect password submissions show `Incorrect password. Please try again.`
- [ ] Password-gate catch failures show `Something went wrong. Please try again.`
- [ ] Successful password verification flips local `unlocked` state and swaps directly to `SharedNotebookViewer` without navigation
- [ ] Shared-viewer citations render as `<span>` pills, not `<button>` elements, so they are read-only and non-clickable
- [ ] Shared-viewer citation pills omit the interactive notebook `FilePdf` icon even though they reuse the same short-title and page-label truncation logic
#### Conversation History Internals
- [ ] Conversation-history dropdown uses `max-h-32 overflow-y-auto`
- [ ] `startNewConversation()` clears `conversationIdRef.current` plus messages, sources, coverage, follow-up suggestions, PDF viewer, source notes, share dialog, and audio overview state
- [ ] `startNewConversation()` does not clear file-selection state and does not explicitly close the history dropdown
- [ ] `loadConversation()` restores source metadata only from the last assistant message with `sources.length > 0`
- [ ] `loadConversation()` applies stored `paper_ids` by remapping every file row's `selected` flag
