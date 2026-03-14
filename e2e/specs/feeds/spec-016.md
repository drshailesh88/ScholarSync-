# feeds — Spec 016

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/feeds
MODULE: feeds

---
### Quick Test Workflows
#### Copilot Panel (copilot-panel.tsx)
- [ ] Messages area: `overflow-y-auto px-4 py-3 space-y-3 min-h-0`
- [ ] Empty state icon container: `w-12 h-12 rounded-2xl bg-brand/10` with Sparkle (24px)
- [ ] Empty state text: "Ask me about this paper" (`text-sm font-medium text-ink mb-1`)
- [ ] Empty state helper: "Click Summarize for a quick overview, or ask any question about the study." (`text-xs text-ink-muted max-w-[250px]`)
- [ ] User messages: `bg-surface-raised text-ink` aligned right (`justify-end`)
- [ ] Assistant messages: `bg-brand/5 text-ink` aligned left (`justify-start`) with Sparkle avatar
- [ ] Assistant avatar: `w-6 h-6 rounded-full bg-brand/20` with `Sparkle` (12px)
- [ ] Message text: `whitespace-pre-wrap text-xs leading-relaxed`
- [ ] Related papers in messages use `RelatedPaperCards` with `dense` prop
- [ ] Related-papers message width: `max-w-[95%]` (vs normal `max-w-[85%]`)
- [ ] Loading Sparkle icon uses `animate-spin` class (separate from bouncing dots)
- [ ] Bouncing dot delays: 0ms, `[animation-delay:150ms]`, `[animation-delay:300ms]`
- [ ] Bouncing dot styling: `w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce`
- [ ] Suggestion chips header text: "Try asking:" (`text-xs text-ink-muted font-medium`)
- [ ] Suggestion chip: `w-full text-left px-3 py-2 rounded-lg text-xs` with `line-clamp-2`
- [ ] Suggestion chip hover: `hover:border-brand/30`
- [ ] Suggestion chips disabled when `copilotLoading` is true
- [ ] Chat input form border: `border-t border-border-subtle`
- [ ] Chat input styling: `rounded-xl bg-surface-raised border border-border text-ink text-xs`
- [ ] Send button: `p-2 rounded-xl bg-brand text-white` with `PaperPlaneRight` icon (16px)
- [ ] Send button disabled: `copilotLoading || !input.trim()` (both conditions)
- [ ] Form submit: prevents default, trims input, clears local input state, then calls `sendCopilotMessage`
- [ ] Auto-scroll: `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })` triggered on `copilotMessages` change
#### Add Feed Modal (add-feed-modal.tsx)
- [ ] Modal title: "Add Feed" (not "Add a Feed" or "New Feed")
- [ ] Modal max-width: `max-w-xl`
- [ ] Tab keys: `"url"` and `"browse"` (not `"Add URL"` / `"Browse Journals"`)
- [ ] RSS input icon: `Rss` (16px) positioned `left-3 top-1/2 -translate-y-1/2`
- [ ] RSS input type: `url` (enables browser URL validation)
- [ ] PubMed input icon: `MagnifyingGlass` (16px) positioned same as RSS
- [ ] PubMed input type: `text`
- [ ] RSS Add button text: "Adding..." during subscribe, "Add" normally
- [ ] PubMed Create Feed button text: "Creating..." during subscribe, "Create Feed" normally
- [ ] Divider: "or" text centered between `border-t border-border-subtle` lines
- [ ] Error styling: `text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-xl`
- [ ] Successful URL add: clears `feedUrl` then calls `onClose()`
