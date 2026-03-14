# studio — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Chat API Route (`src/app/api/chat/route.ts`)
- [x] PASS: `guideContext` payload from client includes `documentType`, `stage`, and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
- [x] PASS: `draftContext` payload from client includes `intensity` and optionally `projectTitle` (omitted when title is `"Untitled Document"`)
- [x] PASS: AI model obtained via dynamic import `getModel()` from `@/lib/ai/models`
#### Chat Panel Rendering Details
- [x] PASS: User message ID format: `msg_${Date.now()}`; assistant message ID: `msg_${Date.now() + 1}`
- [x] PASS: Streaming uses `new TextDecoder()` with `decode(value, { stream: true })`
- [x] PASS: During streaming, assistant content accumulated via local variable mutation (`assistantMsg.content += text`) then state updated per chunk with `setMessages` map
- [x] PASS: After streaming completes, assistant message persisted via `addMessage(...)` only if `content` is non-empty
- [x] PASS: Messages rendered as plain text in `<p className="whitespace-pre-wrap text-xs leading-relaxed">` — NOT rendered as markdown
- [x] PASS: User messages styled: `bg-surface-raised text-ink`, max-width 85%
- [x] PASS: Assistant messages styled: `bg-brand/5 text-ink`, max-width 85%
- [x] PASS: Assistant avatar: 24px circle (`w-6 h-6 rounded-full bg-brand/20`) with `Sparkle` 12px in `text-brand`
- [x] PASS: Loading placeholder appears only when `isLoading && messages[messages.length-1]?.role !== "assistant"` (disappears once streaming starts)
- [x] PASS: Loading placeholder Sparkle icon uses `animate-spin` class
- [x] PASS: Three bouncing dots are 6px circles (`w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`) with staggered delays: 0ms, 150ms, 300ms
- [x] PASS: Send button uses `PaperPlaneRight` icon (16px), styled `bg-brand text-white hover:bg-brand-hover disabled:opacity-50`
- [x] PASS: Chat error renders above messages: `p-3 rounded-lg bg-amber-500/10 text-amber-500 text-xs`
- [x] PASS: Chat input has `focus:ring-2 focus:ring-brand/40` focus ring
- [x] PASS: `submitAiPrompt` calls `setInput(prompt)` twice — once immediately and once inside the 100ms setTimeout — to ensure React state update before form submission
#### Comment Sidebar (`src/components/editor/CommentSidebar.tsx`)
- [x] PASS: Comment sidebar width: `w-80` (320px), `bg-surface border-l border-border`
- [x] PASS: Header shows `ChatCircle` 16px icon + "Comments" title (text-sm font-semibold text-ink)
- [x] PASS: Unresolved comment count badge: `bg-amber-500/15 text-amber-500` rounded-full `text-[10px] font-bold`, only shown when `totalUnresolved > 0`
- [x] PASS: Close button: `X` 16px icon in header, `p-1 rounded hover:bg-surface-raised text-ink-muted`
- [x] PASS: Filter bar with `FunnelSimple` 12px icon and three filter buttons: `all`, `unresolved`, `resolved` (capitalized via CSS)
- [x] PASS: Active filter styled: `bg-brand/10 text-brand`; inactive: `text-ink-muted hover:bg-surface-raised`
- [x] PASS: Empty state (no comments, no pending inline): `ChatCircle` 32px icon (`text-ink-muted/30`), text "No comments yet", subtext "Select text and click the comment button to start"
- [x] PASS: Inline comment creation shows "Commenting on selection" with `TextB` 12px icon in brand, uppercase text-[10px]
- [x] PASS: Inline comment quoted text: blockquote with `border-l-2 border-brand/30 pl-2`, curly quotes, italic
- [x] PASS: Inline comment form has "Cancel" button (`text-ink-muted hover:bg-surface-raised`) and "Add Comment" button (`bg-brand text-white disabled:opacity-50`)
- [x] PASS: Comment bubbles show: user avatar (first letter of `userName`, default `"U"`, uppercase, in 20px circle `bg-brand/20 text-brand`), name (default `"User"`), relative timestamp
- [x] PASS: Relative timestamps: `Just now` (<1m), `{N}m ago` (<1h), `{N}h ago` (<24h), `Yesterday` (1d), `{N}d ago` (<7d), locale `MMM D` (≥7d)
- [x] PASS: Resolved comments: `"Resolved"` emerald badge (`bg-emerald-500/10 text-emerald-500`), `line-through` on name and content, `opacity-70` on container
- [x] PASS: Comment actions visible on hover only (`opacity-0 group-hover:opacity-100`): Resolve (`Check` icon + "Resolve") / Unresolve (`ArrowClockwise` icon + "Unresolve"), Reply (`ArrowBendDownRight` icon + "Reply"), Delete (`Trash` icon + "Delete" in red, owner-only)
- [x] PASS: Resolve/Unresolve only shown on top-level comments, not replies
- [x] PASS: Reply button only shown on top-level comments
- [x] PASS: Reply input placeholder: `Write a reply...`
