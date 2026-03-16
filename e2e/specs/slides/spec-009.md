# slides — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Slide Master Editor
- [x] PASS: Position editor for each placeholder
- [x] PASS: Placeholder prompt text
- [x] PASS: Live preview with `SlideRendererV2`
- [x] PASS: Delete Master button (with Trash icon)
- [x] PASS: Changes apply to all slides using that master

### Context Menu System
- [x] PASS: Context menu appears at cursor position on right-click
- [x] PASS: Menu auto-positions to stay within viewport bounds
- [x] PASS: Animated entrance (scale + opacity transition)
- [x] PASS: **Item types:**
- [x] PASS: Regular items with icon, label, optional shortcut
- [x] PASS: Divider lines
- [x] PASS: Danger items (red text)
- [x] PASS: Disabled items (grayed out, non-interactive)
- [x] PASS: Submenu items (caret-right icon, hover to reveal)
- [x] PASS: Click outside closes the menu
- [x] PASS: Escape closes the menu
- [x] PASS: Scroll closes the menu

### Speaker Notes Bar (Bottom)
- [x] PASS: Collapsed by default (shows "Speaker Notes" toggle button)
- [x] PASS: Click to expand/collapse (caret icon toggles)
- [x] PASS: Textarea for typing speaker notes
- [x] PASS: Placeholder: "Click to add speaker notes..."
- [x] PASS: Notes auto-save to the active slide
- [x] PASS: 3-row default height, non-resizable

### Find & Replace Dialog
- [x] PASS: Triggered by Cmd+F keyboard shortcut
- [x] PASS: Toggles on/off (Cmd+F again closes)
- [x] PASS: **Search fields scanned:**
- [x] PASS: Slide title
- [x] PASS: Slide subtitle
- [x] PASS: Speaker notes
- [x] PASS: All string-valued block data properties
- [x] PASS: **Match navigation:**
- [x] PASS: Up/Down arrows cycle through matches
- [x] PASS: Match count displayed
- [x] PASS: Navigates to the slide containing the active match
- [x] PASS: **Case sensitivity toggle**
