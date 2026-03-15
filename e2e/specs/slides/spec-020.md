# slides — Spec 020

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Slide Sorter View (NEW — not in original 536 checks)
- [x] PASS: Slides in sorter are drag-to-reorder via dnd-kit `SortableContext`
#### Presenter Mode — Additional Keyboard Shortcuts
- [x] PASS: `Space` key advances to next slide/reveal step (same as ArrowRight)
- [x] PASS: `Enter` key advances to next slide unless jump buffer is active, in which case it jumps to typed slide number
- [x] PASS: `Backspace` key goes to previous slide unless jump buffer is active, in which case it deletes last digit
- [x] PASS: `B` key toggles black screen mode on/off
- [x] PASS: `W` key toggles white screen mode on/off
- [x] PASS: `N` key toggles presenter panel visibility on/off
- [x] PASS: `Home` key jumps to first slide in presenter mode
- [x] PASS: `End` key jumps to last slide in presenter mode
- [x] PASS: Number keys typed in presenter mode accumulate in a jump buffer with 1.5s timeout
- [x] PASS: Jump buffer is displayed in the slide-number input field and submitted via Enter
#### Presenter Mode — Audience Window & Fullscreen
- [x] PASS: Presenter panel includes an `Audience` button that opens a separate window at `/presentation/audience`
- [x] PASS: Audience window opens with dimensions `width=1280,height=720,menubar=no,toolbar=no`
- [x] PASS: Presenter uses `BroadcastChannel("presenter-slide-sync")` to sync slide index to audience window
- [x] PASS: BroadcastChannel sends `init` with slide render payload (`slides`, `masters`, `themeKey`, `themeConfig`, `screenMode`) when audience window sends `audience-ready`
- [x] PASS: BroadcastChannel sends `slide` message with current index on each slide change
- [x] PASS: BroadcastChannel sends `screen-mode` message when black/white screen toggles
- [x] PASS: Fullscreen toggle button (ArrowsOut icon) calls `requestFullscreen()` on the presenter container
- [x] PASS: Escape in presenter mode exits fullscreen first if `document.fullscreenElement` exists, then calls `onExit`
#### Presenter Mode — Empty & Edge States
- [x] PASS: Zero visible slides shows `No visible slides to present.` with `Exit Presentation` button
- [x] PASS: Empty speaker notes show italic text `No speaker notes for this slide.`
- [x] PASS: Last slide shows `End of presentation` italic text in the Next Slide section
- [x] PASS: Animation progress text reads `Build {current} of {total}` with optional click/auto breakdown
- [x] PASS: When reveal sequence is complete, progress shows ` • Next click advances slide`
- [x] PASS: Presenter help text at bottom reads `Keys: Right/Space/Enter next, Left/Backspace prev, Home/End, digits + Enter jump, B black, W white.`
- [x] PASS: Presenter panel toggle button text alternates between `Hide Panel (N)` and `Show Panel (N)`
- [x] PASS: Exit button in presenter has hover class `hover:bg-red-600/80`
#### Presenter Mode — Notes Font Size
- [x] PASS: Notes font size buttons are labeled `S`, `M`, `L` (not `Small`, `Medium`, `Large`)
- [x] PASS: Font size `small` maps to `text-sm`, `medium` to `text-base`, `large` to `text-lg`
#### Slide Store — Defaults & Internals
- [x] PASS: Store default `transition` is `"fade"` (not `"none"`)
- [x] PASS: Store default `gridSize` is `5`
- [x] PASS: Store default `agentMode` is `"draft"`
- [x] PASS: Store default `rightPanel` is `"properties"` (panel open by default)
- [x] PASS: Store default `showRulers` is `false`
- [x] PASS: Store default `showGrid` is `false`
