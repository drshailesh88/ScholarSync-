# slides — Spec 020

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Quick Test Workflows
#### Slide Sorter View (NEW — not in original 536 checks)
- [ ] Slides in sorter are drag-to-reorder via dnd-kit `SortableContext`
#### Presenter Mode — Additional Keyboard Shortcuts
- [ ] `Space` key advances to next slide/reveal step (same as ArrowRight)
- [ ] `Enter` key advances to next slide unless jump buffer is active, in which case it jumps to typed slide number
- [ ] `Backspace` key goes to previous slide unless jump buffer is active, in which case it deletes last digit
- [ ] `B` key toggles black screen mode on/off
- [ ] `W` key toggles white screen mode on/off
- [ ] `N` key toggles presenter panel visibility on/off
- [ ] `Home` key jumps to first slide in presenter mode
- [ ] `End` key jumps to last slide in presenter mode
- [ ] Number keys typed in presenter mode accumulate in a jump buffer with 1.5s timeout
- [ ] Jump buffer is displayed in the slide-number input field and submitted via Enter
#### Presenter Mode — Audience Window & Fullscreen
- [ ] Presenter panel includes an `Audience` button that opens a separate window at `/presentation/audience`
- [ ] Audience window opens with dimensions `width=1280,height=720,menubar=no,toolbar=no`
- [ ] Presenter uses `BroadcastChannel("presenter-slide-sync")` to sync slide index to audience window
- [ ] BroadcastChannel sends `init` with slide render payload (`slides`, `masters`, `themeKey`, `themeConfig`, `screenMode`) when audience window sends `audience-ready`
- [ ] BroadcastChannel sends `slide` message with current index on each slide change
- [ ] BroadcastChannel sends `screen-mode` message when black/white screen toggles
- [ ] Fullscreen toggle button (ArrowsOut icon) calls `requestFullscreen()` on the presenter container
- [ ] Escape in presenter mode exits fullscreen first if `document.fullscreenElement` exists, then calls `onExit`
#### Presenter Mode — Empty & Edge States
- [ ] Zero visible slides shows `No visible slides to present.` with `Exit Presentation` button
- [ ] Empty speaker notes show italic text `No speaker notes for this slide.`
- [ ] Last slide shows `End of presentation` italic text in the Next Slide section
- [ ] Animation progress text reads `Build {current} of {total}` with optional click/auto breakdown
- [ ] When reveal sequence is complete, progress shows ` • Next click advances slide`
- [ ] Presenter help text at bottom reads `Keys: Right/Space/Enter next, Left/Backspace prev, Home/End, digits + Enter jump, B black, W white.`
- [ ] Presenter panel toggle button text alternates between `Hide Panel (N)` and `Show Panel (N)`
- [ ] Exit button in presenter has hover class `hover:bg-red-600/80`
#### Presenter Mode — Notes Font Size
- [ ] Notes font size buttons are labeled `S`, `M`, `L` (not `Small`, `Medium`, `Large`)
- [ ] Font size `small` maps to `text-sm`, `medium` to `text-base`, `large` to `text-lg`
#### Slide Store — Defaults & Internals
- [ ] Store default `transition` is `"fade"` (not `"none"`)
- [ ] Store default `gridSize` is `5`
- [ ] Store default `agentMode` is `"draft"`
- [ ] Store default `rightPanel` is `"properties"` (panel open by default)
- [ ] Store default `showRulers` is `false`
- [ ] Store default `showGrid` is `false`
