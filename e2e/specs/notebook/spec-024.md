# notebook — Spec 024

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Shared Notebook — Additional Details
- [ ] `generateMetadata` returns `{ title: "Not Found - ScholarSync" }` when token lookup returns null
- [ ] `generateMetadata` returns `{ description: "Shared notebook by {ownerName}" }` for valid notebooks
- [ ] Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook
- [ ] Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes
- [ ] Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)
- [ ] Shared viewer date in header uses `toLocaleDateString` with `{ year: "numeric", month: "long", day: "numeric" }`
- [ ] `NotebookPasswordGate` clears error state (`setError("")`) on each new submission before setting loading
- [ ] Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array
#### Source Notes Panel — Additional Details
- [ ] Paper cards start expanded by default (`useState(true)` for `expanded`)
- [ ] `getErrorMessage()` utility returns `error.message` for Error instances, otherwise `"Unable to generate notes right now. Please try again."`
- [ ] Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`
- [ ] Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`
- [ ] Panel max-width is `max-w-md` (not full sidebar width)
- [ ] Panel uses `glass-panel` class with `shadow-2xl`
- [ ] Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount
- [ ] `Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`
- [ ] Panel header count uses singular/plural: `"1 paper"` vs `"N papers"`
- [ ] Suggested questions section header: `ChatCircleDots` icon (size 10) + `"Ask about this paper"` label
- [ ] Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover
- [ ] Question text is line-clamped to 1 line via `line-clamp-1`
#### Audio Overview Panel — Additional Details
- [ ] `normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values
- [ ] Play/Pause button has dynamic `title`: `"Pause"` when playing, `"Play"` otherwise
- [ ] Play icon and Pause icon both use `weight="fill"` (not the default regular weight)
- [ ] Speed button has `title="Playback speed"`
- [ ] Download button has `title="Download audio"`
- [ ] Audio element uses `preload="auto"` attribute
- [ ] Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max
- [ ] Options toggle link text is literally `"Options"` — visible only when `canControlAudio && !showOptions`
- [ ] `formatTime` returns `"0:00"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds
- [ ] Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout
- [ ] Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`
- [ ] In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`
- [ ] Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = "noopener"`, clicks it, then removes it
#### Conversation Actions — Server-Side Details
- [ ] `createConversation` defaults title to `"New Conversation"` when title param is falsy
- [ ] `createConversation` defaults `paper_ids` to empty array when not provided
