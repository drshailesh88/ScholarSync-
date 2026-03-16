# notebook — Spec 025

STATUS: DONE
TESTED: 19/19
PASS: 19
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Conversation Actions — Server-Side Details
- [x] PASS: `addMessage` updates the parent conversation's `updated_at` timestamp after inserting the message
- [x] PASS: `submitMessageFeedback` accepts an optional `comment` parameter in addition to the numeric rating
- [x] PASS: `getConversations` orders results by `updated_at` descending (most recent first)
#### Loading Skeleton — Additional Details
- [x] PASS: Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`
- [x] PASS: Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`
- [x] PASS: Loading skeleton chat area uses `SkeletonText` component with `lines={6}`
#### Behavior Corrections (Pass 3)
- [x] PASS: Section 21 states password gate has a `type="password"` input — confirmed correct. However, the Share Dialog (section 19) password field is `type="text"` (plaintext visible), which is not noted in any existing check
- [x] PASS: Existing check says the audio close button has `title="Close audio overview"` but no `aria-label` — confirmed still accurate as of this pass
- [x] PASS: Section 12 describes coverage badge unused-paper truncation generically — the actual truncation differs from citation truncation: no 40-char colon cap, no ellipsis on 30-char fallback, and "not referenced" suffix text
- [x] PASS: Section 9 states "3 dots (2x2 rounded-full, brand/40 color)" for loading — this is correct for the main loading indicator; the suggestion-loading dots are different (1.5x1.5, brand/30, different delays) and should not be confused
#### Components Referenced But Not Rendered (Pass 3)
- [x] PASS: No change — all `src/components/notebook` files remain in active import chains
- [x] PASS: `/notebook` route error boundary renders `ErrorDisplay` with title `Notebook unavailable`, message `We couldn't load your notebook. Please try again.`, and passes `reset` through `onRetry`
- [x] PASS: `/share/notebook/[token]/not-found.tsx` renders a dedicated 404 view with heading `404`, subtitle `Notebook not found`, body text `This shared notebook link may have expired, been disabled by the owner, or the notebook may no longer exist.`, and a `Go to ScholarSync` link to `/`
- [x] PASS: `NotebookShareDialog` is closed by Escape and backdrop click, but the rendered overlay has no `role="dialog"` or `aria-modal="true"` attributes
- [x] PASS: `loadConversation()` only reapplies file `selected` state when `convo.paper_ids` exists and has length > 0; conversations with `null` or empty `paper_ids` leave the current file-selection state untouched
- [x] PASS: `AudioOverviewPanel` posts to `/api/audio-overview` without an `AbortController`; closing the panel or changing inputs does not cancel an in-flight generation request
- [x] PASS: `AudioOverviewPanel` reset effect clears audio/script/error state on `conversationId`, `paperIdsKey`, `mode`, `customPrompt`, or `audioLength` changes, but it does not reset `showOptions`, so the options panel can stay open across those resets
- [x] PASS: Initial notebook mount suppresses library and history load failures with empty `.catch(() => {})` handlers on `getUserPapers()` and `getConversations("notebook")`, so those failures produce no inline error or retry UI
- [x] PASS: No WebSocket, SSE subscription, Yjs provider, or other realtime collaboration client is imported anywhere in the `/notebook` or `/share/notebook/[token]` render tree; notebook sync is request/response and server-action based only
