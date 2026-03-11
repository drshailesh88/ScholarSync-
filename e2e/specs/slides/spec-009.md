# slides — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides
MODULE: slides

---
### Slide Master Editor
- [ ] Position editor for each placeholder
- [ ] Placeholder prompt text
- [ ] Live preview with `SlideRendererV2`
- [ ] Delete Master button (with Trash icon)
- [ ] Changes apply to all slides using that master

### Context Menu System
- [ ] Context menu appears at cursor position on right-click
- [ ] Menu auto-positions to stay within viewport bounds
- [ ] Animated entrance (scale + opacity transition)
- [ ] **Item types:**
- [ ] Regular items with icon, label, optional shortcut
- [ ] Divider lines
- [ ] Danger items (red text)
- [ ] Disabled items (grayed out, non-interactive)
- [ ] Submenu items (caret-right icon, hover to reveal)
- [ ] Click outside closes the menu
- [ ] Escape closes the menu
- [ ] Scroll closes the menu

### Speaker Notes Bar (Bottom)
- [ ] Collapsed by default (shows "Speaker Notes" toggle button)
- [ ] Click to expand/collapse (caret icon toggles)
- [ ] Textarea for typing speaker notes
- [ ] Placeholder: "Click to add speaker notes..."
- [ ] Notes auto-save to the active slide
- [ ] 3-row default height, non-resizable

### Find & Replace Dialog
- [ ] Triggered by Cmd+F keyboard shortcut
- [ ] Toggles on/off (Cmd+F again closes)
- [ ] **Search fields scanned:**
- [ ] Slide title
- [ ] Slide subtitle
- [ ] Speaker notes
- [ ] All string-valued block data properties
- [ ] **Match navigation:**
- [ ] Up/Down arrows cycle through matches
- [ ] Match count displayed
- [ ] Navigates to the slide containing the active match
- [ ] **Case sensitivity toggle**
