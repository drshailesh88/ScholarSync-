# notebook — Spec 023

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### PDF Viewer Component (`pdf-viewer.tsx`) — Full Feature Set
- [ ] Per-page loading state: smaller spinner within the page render area
- [ ] Escape key listener registered only when `onClose` prop is provided; removed on cleanup
- [ ] `role="dialog"`, `aria-modal="true"`, `aria-label` includes title when provided: `"PDF Viewer: {title}"`, otherwise `"PDF Viewer"`
- [ ] Navigation aria-labels: `"Previous page"`, `"Next page"`
- [ ] Zoom aria-labels: `"Zoom out"`, `"Zoom in"`, `"Fit width"`
- [ ] Close button `aria-label="Close PDF viewer"`
- [ ] Title shown in toolbar: truncated with `max-w-[40%]`, hidden on small screens via `hidden sm:block`
- [ ] PDF page rendered with `shadow-xl rounded-lg`; content area has `bg-surface/50` background
- [ ] Returns `null` when neither `url` nor `file` prop is provided
#### Notebook Page — Additional Rendering Details
- [ ] Learn mode empty state subtitle is exactly `"Select your papers and start exploring"`
- [ ] Research mode empty state uses conditional plural without parentheses: `"Ready to analyze 1 source"` (singular) vs `"Ready to analyze 2 sources"` (plural)
- [ ] Suggestion-loading bouncing dots are `w-1.5 h-1.5 bg-brand/30` with delays 0ms/100ms/200ms — different from main loading dots which are `w-2 h-2 bg-brand/40` with delays 0ms/150ms/300ms
- [ ] `handleOpenAudioOverview` auto-creates a conversation with title `"Audio Overview"` if no conversation exists yet
- [ ] Audio overview auto-creation prepends the new conversation to `pastConversations` and slices list to 20 maximum
- [ ] `handleOpenAudioOverview` failure logs `"Failed to open audio overview:"` to console with no inline UI error
- [ ] Conversation history entries with null titles display `"Untitled"` as both visible text and HTML `title` attribute
- [ ] Send button disabled state uses `disabled:opacity-50`; audio/share disabled buttons use `disabled:opacity-30 disabled:cursor-not-allowed`
- [ ] `handleCitationClick` sets `highlightedSource` BEFORE checking if source exists — a missing source still updates the highlight index
- [ ] Copy and feedback action buttons appear on ALL assistant messages including error messages (ids starting with `err_`), but feedback persistence is a no-op for error messages due to id parsing
- [ ] Coverage badge unused-paper title truncation has no length limit for colon truncation and no ellipsis for the 30-char fallback — different from citation short-title truncation which caps colon position at 40 chars and appends `"…"`
- [ ] Coverage badge "not referenced" suffix: unused paper titles are joined with `", "` and followed by literal text `" not referenced"`
#### Notebook Share Actions (`notebook-share.ts`) — Server-Side Details
- [ ] `enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists
- [ ] `disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`
- [ ] `updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)
- [ ] `verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison
- [ ] `verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)
- [ ] `getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`
- [ ] `getNotebookByShareToken` falls back to `"Untitled Notebook"` for null conversation titles
- [ ] `getNotebookByShareToken` falls back to `"A researcher"` for missing owner names
- [ ] `getNotebookByShareToken` orders messages by `created_at` ascending
- [ ] Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `"http://localhost:3001"`
#### Share Dialog — Additional Details
- [ ] Password field in share dialog uses `type="text"` (visible while typing), NOT `type="password"` — different from the password gate which uses `type="password"`
- [ ] Share toggle has `aria-label="Toggle notebook sharing"`
- [ ] Toggle and Save Settings share the same `saving` state — toggling disables Save, and saving disables the toggle
- [ ] `handleCopy` is a no-op when `shareUrl` is null (guard before clipboard write)
