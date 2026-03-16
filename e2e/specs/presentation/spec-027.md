# presentation — Spec 027

STATUS: DONE
TESTED: 27/27
PASS: 27
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### PresenterMode — Presentation Delivery (`presenter-mode.tsx`)
- [x] PASS: Jump input: `inputMode="numeric" pattern="[0-9]*"` placeholder `"Slide #"` + `"Jump"` button
- [x] PASS: ArrowRight / Space: next; Enter: jump (if digits) or next; ArrowLeft: prev; Backspace: delete digit or prev
- [x] PASS: Escape: exit fullscreen + onExit; Home: first slide; End: last slide; B: toggle black; W: toggle white; N: toggle panel
- [x] PASS: Digit keys accumulate in buffer; 1500ms auto-clear; ignored in input/textarea/contentEditable (except Escape)
- [x] PASS: Hint: `"Keys: Right/Space/Enter next, Left/Backspace prev, Home/End, digits + Enter jump, B black, W white."`
- [x] PASS: Threshold: 50px horizontal, must exceed 1.5× vertical; swipe left = next, swipe right = prev
- [x] PASS: Black: `bg-black text-white/50` text `"Black Screen"`; White: `bg-white text-black/50` text `"White Screen"`; both `uppercase tracking-[0.2em]`
- [x] PASS: Fullscreen: `ArrowsOut` icon, `aria-label="Toggle fullscreen"`, `title="Fullscreen"`
- [x] PASS: Exit: `X` icon, `bg-black/70 hover:bg-red-600/80`, `aria-label="Exit presentation"`
- [x] PASS: Panel toggle: `"Hide Panel (N)"` / `"Show Panel (N)"`; main area transitions `w-[70%]` ↔ `w-full` with `duration-200`
- [x] PASS: Channel `"presenter-slide-sync"`; listens for `{ type: "audience-ready" }`
- [x] PASS: On ready: sends `{ type: "init" }` with slides, masters, themeKey, themeConfig, screenMode
- [x] PASS: Sends `{ type: "slide", index }` on slide change; `{ type: "screen-mode", mode }` on mode change
- [x] PASS: Channel created on mount, closed on unmount
- [x] PASS: Uses `computeAnimationSequence` + `countClickSteps` from `animation-sequencer`
- [x] PASS: Click-triggered steps on user input; auto-triggered steps via timers with relative delays
- [x] PASS: Reveal resets to order 0 on slide change; auto-step timers cleared on change/unmount
- [x] PASS: Clicking main slide area calls `goNext`
- [x] PASS: `src/app/(app)/presentation/error.tsx` is a real module error boundary and was not documented directly: it renders `ErrorDisplay` with title `Presentations unavailable`, passes the thrown `error`, and wires retry to `reset`
- [x] PASS: `src/app/(app)/presentation/loading.tsx` is a real loading route and was not documented directly: it renders one `Skeleton` header plus six `SkeletonCard` placeholders in a responsive `1 / 2 / 3` column grid
- [x] PASS: `src/app/presentation/audience/page.tsx` remains undercovered as its own file: it creates `BroadcastChannel("presenter-slide-sync")`, posts `{ type: "audience-ready" }` on mount, waits for `init`, and applies black/white screen overlays without presenter notes or controls
- [x] PASS: `/api/presentations/preprocess` internals remain underdocumented: auth + rate limiting run before a zod schema check, references are accepted as `rawText` or `referenceContent`, empty source material returns `400 "No source content provided"`, and preprocessing failures return `500 "Preprocessing failed"`
- [x] PASS: `/api/presentations/generate` internals remain underdocumented: the deck is created before generation, `generationStatus` transitions through `processing` / `completed` / `failed`, unsupported slide layouts fall back to `title_content`, and route-level failures return `500 "Generation failed"`
- [x] PASS: Cleanup behavior still lacks explicit coverage: `generation-wizard.tsx` clears the `AutoTrigger` timeout, `presenter-mode.tsx` clears the timer interval, auto-step timers, jump-buffer timeout, keydown listener, and `BroadcastChannel`, `slide-renderer.tsx` cancels Mermaid updates via a `cancelled` flag, and the audience view closes its broadcast channel on unmount
- [x] PASS: Accessibility coverage is still incomplete: `SourceSelector` source cards and `ReferenceImportPanel` tabs are button groups without `role="tablist"` / `role="tab"` or `aria-selected`, while `presenter-mode.tsx` does provide `aria-label`s on fullscreen, exit, timer, and jump controls
- [x] PASS: Mobile/responsive behavior is still lightly documented: `SourceSelector` changes from `grid-cols-2` to `md:grid-cols-3` to `xl:grid-cols-6`, `NewPresentationPage` uses `grid-cols-2 sm:grid-cols-3` for audience options, `ReferenceImportPanel` keeps a fixed two-column Zotero form, and `presentation/loading.tsx` shifts from 1 to 2 to 3 columns
- [x] PASS: Import-tree files still not covered by dedicated sections include `template-selector.tsx`, `speaker-notes-panel.tsx`, `recordings-panel.tsx`, `src/app/(app)/presentation/error.tsx`, `src/app/(app)/presentation/loading.tsx`, `src/app/presentation/audience/page.tsx`, `/api/presentations/preprocess`, and `/api/presentations/generate`
