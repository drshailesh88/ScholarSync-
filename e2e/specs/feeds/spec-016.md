# feeds — Spec 016

STATUS: PARTIAL
TESTED: 35/35
PASS: 31
FAIL: 4
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Copilot Panel (copilot-panel.tsx)
- [x] PASS: Messages area: `overflow-y-auto px-4 py-3 space-y-3 min-h-0`
- [x] PASS: Empty state icon container: `w-12 h-12 rounded-2xl bg-brand/10` with Sparkle (24px)
- [x] PASS: Empty state text: "Ask me about this paper" (`text-sm font-medium text-ink mb-1`)
- [x] PASS: Empty state helper: "Click Summarize for a quick overview, or ask any question about the study." (`text-xs text-ink-muted max-w-[250px]`)
- [x] PASS: User messages: `bg-surface-raised text-ink` aligned right (`justify-end`)
- [x] PASS: Assistant messages: `bg-brand/5 text-ink` aligned left (`justify-start`) with Sparkle avatar
- [x] PASS: Assistant avatar: `w-6 h-6 rounded-full bg-brand/20` with `Sparkle` (12px)
- [x] PASS: Message text: `whitespace-pre-wrap text-xs leading-relaxed`
- [x] PASS: Related papers in messages use `RelatedPaperCards` with `dense` prop
- [x] PASS: Related-papers message width: `max-w-[95%]` (vs normal `max-w-[85%]`)
- [x] PASS: Loading Sparkle icon uses `animate-spin` class (separate from bouncing dots)
- [x] PASS: Bouncing dot delays: 0ms, `[animation-delay:150ms]`, `[animation-delay:300ms]`
- [x] PASS: Bouncing dot styling: `w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`
- [x] PASS: Suggestion chips header text: "Try asking:" (`text-xs text-ink-muted font-medium`)
- [x] PASS: Suggestion chip: `w-full text-left px-3 py-2 rounded-lg text-xs` with `line-clamp-2`
- [x] PASS: Suggestion chip hover: `hover:border-brand/30`
- [x] PASS: Suggestion chips disabled when `copilotLoading` is true
- [x] PASS: Chat input form border: `border-t border-border-subtle`
- [ ] FAIL: Chat input styling: `rounded-xl bg-surface-raised border border-border text-ink text-xs`
- [x] PASS: Send button: `p-2 rounded-xl bg-brand text-white` with `PaperPlaneRight` icon (16px)
- [x] PASS: Send button disabled: `copilotLoading || !input.trim()` (both conditions)
- [x] PASS: Form submit: prevents default, trims input, clears local input state, then calls `sendCopilotMessage`
- [x] PASS: Auto-scroll: `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })` triggered on `copilotMessages` change
#### Add Feed Modal (add-feed-modal.tsx)
- [ ] FAIL: Modal title: "Add Feed" (not "Add a Feed" or "New Feed")
- [x] PASS: Modal max-width: `max-w-xl`
- [x] PASS: Tab keys: `"url"` and `"browse"` (not `"Add URL"` / `"Browse Journals"`)
- [x] PASS: RSS input icon: `Rss` (16px) positioned `left-3 top-1/2 -translate-y-1/2`
- [x] PASS: RSS input type: `url` (enables browser URL validation)
- [x] PASS: PubMed input icon: `MagnifyingGlass` (16px) positioned same as RSS
- [x] PASS: PubMed input type: `text`
- [ ] FAIL: RSS Add button text: "Adding..." during subscribe, "Add" normally
- [ ] FAIL: PubMed Create Feed button text: "Creating..." during subscribe, "Create Feed" normally
- [x] PASS: Divider: "or" text centered between `border-t border-border-subtle` lines
- [x] PASS: Error styling: `text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-xl`
- [x] PASS: Successful URL add: clears `feedUrl` then calls `onClose()`
