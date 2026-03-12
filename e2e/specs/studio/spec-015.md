# studio — Spec 015

STATUS: COMPLETE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Quick Test Workflows
#### Chat API Route (`src/app/api/chat/route.ts`)
- [x] `guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
  RESULT: PASS — Code audit of `/studio` plus existing `ralph-studio-041` coverage confirmed the Learn-mode payload includes `documentType` and `stage`, and only includes `projectTitle` when the title is not `Untitled Document`.
- [x] `draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
  RESULT: PASS — Code audit of `/studio` plus existing `ralph-studio-041` coverage confirmed the Write-mode payload includes `intensity` and omits `projectTitle` for the untitled fallback document.
- [x] AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`
  RESULT: PASS — Route audit confirmed `route.ts` dynamically imports `isAIConfigured` and `getModel` from `@/lib/ai/models` at request time.
#### Chat Panel Rendering Details
- [x] User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`
  RESULT: PASS — Code audit of `sendMessage()` confirmed the exact `msg_${Date.now()}` and `msg_${Date.now() + 1}` ID construction.
- [x] Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`
  RESULT: PASS — Code audit of the streaming loop confirmed the page uses `new TextDecoder()` and `decoder.decode(value, { stream: true })`.
- [x] During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map
  RESULT: PASS — Code audit confirmed the assistant message is locally mutated per chunk and mirrored into React state with a `setMessages(...map(...))` update.
- [x] After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty
  RESULT: PASS — Code audit confirmed the `addMessage(...)` persistence path is guarded by `if (assistantMsg.content)`.
- [x] Messages rendered as plain text in `<p className="whitespace-pre-wrap text-xs leading-relaxed">` — NOT rendered as markdown
  RESULT: PASS — Live chat-panel inspection and page audit confirmed messages render as plain text paragraphs rather than markdown output.
- [x] User messages styled: `bg-surface-raised text-ink`, max-width 85%
  RESULT: PASS — Live DOM inspection confirmed the user bubble uses `bg-surface-raised text-ink` with the 85% max-width container classes.
- [x] Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%
  RESULT: PASS — Live DOM inspection confirmed the assistant bubble uses `bg-brand/5 text-ink` with the same max-width cap.
- [x] Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`
  RESULT: PASS — Live DOM inspection confirmed the assistant avatar container and the 12px `Sparkle` icon styling.
- [x] Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== "assistant"` (disappears once streaming starts)
  RESULT: PASS — Code audit confirmed the placeholder render guard uses the exact `isLoading && messages[messages.length - 1]?.role !== "assistant"` condition.
- [x] Loading placeholder Sparkle icon uses `animate-spin` class
  RESULT: PASS — Live DOM inspection confirmed the loading placeholder sparkle includes `animate-spin`.
- [x] Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms
  RESULT: PASS — Live DOM inspection confirmed the placeholder dots use the expected classes and the three staggered animation delays.
- [x] Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`
  RESULT: PASS — Live chat-panel inspection confirmed the send button icon and the expected brand/disabled styling classes.
- [x] Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`
  RESULT: PASS — Code audit confirmed the inline error banner uses the exact amber error block classes above the message list.
- [x] Chat input has `focus:ring-2 focus:ring-brand/40` focus ring
  RESULT: PASS — Live inspection confirmed the chat input includes the expected brand focus-ring classes.
- [x] `submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission
  RESULT: PASS — Code audit confirmed `submitAiPrompt(...)` sets the prompt immediately and repeats `setInput(prompt)` inside the 100 ms timeout before `requestSubmit()`.
#### Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)
- [x] Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`
  RESULT: PASS — Component audit confirmed the sidebar shell uses `w-80 bg-surface border-l border-border`.
- [x] Header shows `ChatCircle` 16px icon + "Comments" title (text-sm font-semibold text-ink)
  RESULT: PASS — Live sidebar inspection confirmed the header icon/title pair and the expected title styling.
- [x] Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`
  RESULT: PASS — Live seeded-comment run rendered the amber unresolved badge with count `1`, and the new component test covers the same case.
- [x] Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`
  RESULT: PASS — Component audit confirmed the close button uses the expected icon size and header button classes.
- [x] Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)
  RESULT: PASS — Live and test-backed inspection confirmed the filter bar renders the funnel icon and the three expected filter labels.
- [x] Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`
  RESULT: PASS — Component audit confirmed active and inactive filter buttons use the expected class split.
- [x] Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text "No comments yet", subtext "Select text and click the comment button to start"
  RESULT: PASS — The new component test verified the empty state text, and component audit confirmed the icon styling.
- [x] Inline comment creation shows "Commenting on selection" with `TextB` 12px icon in brand, uppercase text-[10px]
  RESULT: PASS — Live browser automation confirmed the inline composer appears after `scholarsync:new-inline-comment`, and component audit confirmed the label/icon styling.
- [x] Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic
  RESULT: PASS — Live inline-comment inspection showed the curly-quoted excerpt, and component audit confirmed the blockquote classes and italic styling.
- [x] Inline comment form has "Cancel" button (`text-ink-muted hover:bg-surface-raised`) and "Add Comment" button (`bg-brand text-white disabled:opacity-50`)
  RESULT: PASS — Live inline-comment inspection confirmed the two actions and their expected class names.
- [x] Comment bubbles show: user avatar (first letter of `userName`, default `"U"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `"User"`), relative timestamp
  RESULT: PASS — Live seeded-comment inspection confirmed avatar initials, names, and timestamps; component audit confirmed the avatar fallback/styling.
- [x] Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)
  RESULT: PASS — The new component test verified `Just now`, `5m ago`, and `Yesterday`, and the timestamp formatter code covers the remaining hour/day/date branches.
- [x] Resolved comments: `"Resolved"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container
  RESULT: PASS — Live seeded-comment inspection confirmed the resolved badge and strikethrough/opacity treatment, and the new component test asserts the name styling.
- [x] Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + "Resolve") / Unresolve (`ArrowClockwise` icon + "Unresolve"), Reply (`ArrowBendDownRight` icon + "Reply"), Delete (`Trash` icon + "Delete" in red, owner-only)
  RESULT: PASS — Component audit confirmed the action row uses the `opacity-0 group-hover:opacity-100` reveal pattern and the expected action labels/icons.
- [x] Resolve/Unresolve only shown on top-level comments, not replies
  RESULT: PASS — The new component test seeded a reply comment and verified the reply bubble exposes no action buttons of its own.
- [x] Reply button only shown on top-level comments
  RESULT: PASS — Live seeded-comment inspection confirmed top-level comments show `Reply`, while the reply item itself does not.
- [x] Reply input placeholder: `Write a reply...`
  RESULT: PASS — Component audit confirmed the inline reply composer uses the exact `Write a reply...` placeholder text.
