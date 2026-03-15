# notebook — Spec 024

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Shared Notebook — Additional Details
- [x] PASS: `generateMetadata` returns `{ title: "Not Found - ScholarSync" }` when token lookup returns null
- [x] PASS: `generateMetadata` returns `{ description: "Shared notebook by {ownerName}" }` for valid notebooks
- [x] PASS: Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5` — not the `brand`/`ink`/`surface` design tokens used in the main notebook
- [x] PASS: Shared viewer citation pills use `bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]` — hardcoded values, not brand token classes
- [x] PASS: Shared viewer user messages use `bg-white/5` (not `bg-surface-raised` like the main notebook)
- [x] PASS: Shared viewer date in header uses `toLocaleDateString` with `{ year: "numeric", month: "long", day: "numeric" }`
- [x] PASS: `NotebookPasswordGate` clears error state (`setError("")`) on each new submission before setting loading
- [x] PASS: Shared viewer defensively checks `Array.isArray(msg.retrieved_chunks)` before casting to source metadata; non-array values result in empty sources array
#### Source Notes Panel — Additional Details
- [x] PASS: Paper cards start expanded by default (`useState(true)` for `expanded`)
- [x] PASS: `getErrorMessage()` utility returns `error.message` for Error instances, otherwise `"Unable to generate notes right now. Please try again."`
- [x] PASS: Panel backdrop opacity transitions from `opacity-0` to `opacity-100` with `duration-200`
- [x] PASS: Panel slide-in transform transitions from `translate-x-full` to `translate-x-0` with `duration-200`
- [x] PASS: Panel max-width is `max-w-md` (not full sidebar width)
- [x] PASS: Panel uses `glass-panel` class with `shadow-2xl`
- [x] PASS: Paper notes fetch uses a `cancelled` flag pattern via useEffect cleanup to prevent stale data updates after unmount
- [x] PASS: `Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`
- [x] PASS: Panel header count uses singular/plural: `"1 paper"` vs `"N papers"`
- [x] PASS: Suggested questions section header: `ChatCircleDots` icon (size 10) + `"Ask about this paper"` label
- [x] PASS: Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover
- [x] PASS: Question text is line-clamped to 1 line via `line-clamp-1`
#### Audio Overview Panel — Additional Details
- [x] PASS: `normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values
- [x] PASS: Play/Pause button has dynamic `title`: `"Pause"` when playing, `"Play"` otherwise
- [x] PASS: Play icon and Pause icon both use `weight="fill"` (not the default regular weight)
- [x] PASS: Speed button has `title="Playback speed"`
- [x] PASS: Download button has `title="Download audio"`
- [x] PASS: Audio element uses `preload="auto"` attribute
- [x] PASS: Seek slider value clamped: `Math.min(currentTime, durationSeconds)` for value, `Math.max(durationSeconds, 0)` for max
- [x] PASS: Options toggle link text is literally `"Options"` — visible only when `canControlAudio && !showOptions`
- [x] PASS: `formatTime` returns `"0:00"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds
- [x] PASS: Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout
- [x] PASS: Reset effect clears `audioUrl`, `script`, `durationSeconds`, `currentTime`, `showTranscript`, `errorMessage`, `isCachedResult` — but preserves `speedIndex`
- [x] PASS: In idle state (before first generation), no Generate/Regenerate button appears — generation is purely automatic via `hasTriggeredRef`
- [x] PASS: Download creates a temporary anchor element appended to `document.body`, sets `anchor.rel = "noopener"`, clicks it, then removes it
#### Conversation Actions — Server-Side Details
- [x] PASS: `createConversation` defaults title to `"New Conversation"` when title param is falsy
- [x] PASS: `createConversation` defaults `paper_ids` to empty array when not provided
