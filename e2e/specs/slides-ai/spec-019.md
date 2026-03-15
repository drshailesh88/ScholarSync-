# slides-ai — Spec 019

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)
- [x] PASS: Error message format: `"Something went wrong: ${err.message}. Please try again."`
- [x] PASS: Fallback assistant message when API returns no summary: `"Changes applied."`
- [x] PASS: Input textarea `rows={1}`, no auto-resize (unlike Slides agent which auto-resizes)
- [x] PASS: Input `aria-label="Send message"` on send button
- [x] PASS: Empty state prompt text: `"Ask the AI to modify your entire deck, or pick a quick action:"`
- [x] PASS: Input focused on mount via `useEffect` with `inputRef.current?.focus()`
#### CardSparkleMenu — Additional Details (`card-sparkle-menu.tsx`)
- [x] PASS: Dropdown has `"AI Actions"` header (10px uppercase tracking-wider ink-muted) above the action list
- [x] PASS: Each action constructs a slide-specific prompt via `buildMessage(slideId)` with exact instructions (e.g., "Improve the writing quality of slide ID ${id}. Make it more polished and professional.")
- [x] PASS: Sparkle menu errors are silently swallowed — `catch {}` block with no user-facing error message
- [x] PASS: Loading overlay shows `"AI is working..."` text alongside spinner (not just spinner)
- [x] PASS: Dropdown has `role="menu"`, each action button has `role="menuitem"`
- [x] PASS: Trigger button has `aria-label="AI card actions"` and `aria-expanded={open}`
- [x] PASS: Trigger button uses `Sparkle`; `ImageSquare` belongs to `CardBackgroundButton`
#### CardBackgroundPicker — Additional Details (`card-background-picker.tsx`)
- [x] PASS: Exactly 12 preset color hex values: `#ffffff`, `#f8fafc`, `#f1f5f9`, `#e2e8f0`, `#1e293b`, `#0f172a`, `#fef2f2`, `#fef9c3`, `#ecfdf5`, `#eff6ff`, `#f5f3ff`, `#fdf2f8`
- [x] PASS: Theme colors (primary, background, surface, text) are prepended to presets and deduplicated via `Set`
- [x] PASS: Custom color uses a `ColorPicker` component (not a raw color input)
- [x] PASS: "Right" image position icon is `Columns` with `style={{ transform: "scaleX(-1)" }}` to mirror it
- [x] PASS: Overlay type controls only show when `imageUrl` is set AND `imagePosition !== "none"`
- [x] PASS: Overlay intensity and color controls only show when `overlayType !== "none"`
- [x] PASS: Overlay intensity defaults to `50` (shown as `50%`)
- [x] PASS: Overlay color defaults to `#000000`
- [x] PASS: Reset button text: `"Reset to default"` (clears `cardBackground` to `undefined`)
- [x] PASS: Picker width is `w-72` (288px)
- [x] PASS: `CardBackgroundButton` closes on `Escape` keypress
- [x] PASS: `CardBackgroundButton` trigger has `aria-label="Card background settings"` and `aria-expanded`
- [x] PASS: Trigger icon is `ImageSquare` (not just "Image icon")
#### CardEditor — Additional Details (`card-editor.tsx`)
- [x] PASS: Existing subtitles are editable in active state via `EditableTextBlock` with `style="subtitle"` and placeholder `"Subtitle..."`
- [x] PASS: Non-active cards show `"Untitled Card"` when title is empty
- [x] PASS: Empty state (active card, 0 content blocks): italic muted text `"Click here to start typing, or type / for commands"`
- [x] PASS: Text block inline editing supports `fontFamily`, `fontSize`, and `color` properties from block data
- [x] PASS: Bullets block editing passes `ordered` flag to toggle ordered/unordered lists
#### CardStack — Additional Details (`card-stack.tsx`)
- [x] PASS: Insert buttons between cards show `"Add card"` text label alongside the Plus icon (not just "+")
- [x] PASS: Active card border is `border-brand ring-1 ring-brand/30` (ring-1, not ring-2 as documented in Section 10)
- [x] PASS: Card accent bar is `h-1` (4px), not `1px` as stated in original doc
- [x] PASS: Side images (left/right) take `w-2/5` of card width with `min-h-[200px]`
