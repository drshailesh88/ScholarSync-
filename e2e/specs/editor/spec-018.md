# editor — Spec 018

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Selection Toolbar and Link Popover
- [ ] SelectionToolbar style choices are `Normal text`, `Heading 1`, `Heading 2`, `Heading 3`, and `Heading 4`
- [ ] SelectionToolbar bold button toggles the `bold` mark on mouse down to preserve selection
- [ ] SelectionToolbar italic button toggles the `italic` mark on mouse down to preserve selection
- [ ] SelectionToolbar underline button toggles the `underline` mark on mouse down to preserve selection
- [ ] SelectionToolbar strikethrough button toggles the `strike` mark on mouse down to preserve selection
- [ ] SelectionToolbar inline-code button toggles the `code` mark on mouse down to preserve selection
- [ ] SelectionToolbar highlight main click toggles the highlight mark without choosing a specific color
- [ ] SelectionToolbar highlight palette opens from the highlight button context menu rather than a normal left click
- [ ] SelectionToolbar highlight palette colors are yellow `#fef08a`, green `#bbf7d0`, blue `#bfdbfe`, pink `#fecdd3`, and orange `#fed7aa`
- [ ] SelectionToolbar link action uses `window.prompt("URL", previousUrl)`
- [ ] Cancelling the link prompt leaves the current link state unchanged
- [ ] Entering an empty string in the link prompt removes the current link mark
- [ ] Entering a non-empty string in the link prompt extends the current link mark range before updating `href`
- [ ] SelectionToolbar comment button dispatches `scholarsync:editor-action` with `action: "add-comment"`
- [ ] SelectionToolbar AI Edit button dispatches `scholarsync:ai-action` with `action: "precision-edit"`
- [ ] LinkPopover intercepts clicks on `<a>` tags inside the editor DOM and prevents the browser default navigation
- [ ] LinkPopover starts in read mode when opened from an inline link
- [ ] LinkPopover edit input placeholder is `https://...`
- [ ] LinkPopover pressing `Enter` in edit mode saves the new URL
- [ ] LinkPopover pressing `Escape` in edit mode exits edit mode without applying additional changes
- [ ] LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [ ] LinkPopover `Remove link` unsets the mark and closes the popover
#### Slash Menu Renderer and Keyboard Navigation
- [ ] Slash menu empty state text is `No commands found`
- [ ] Slash menu width is fixed at `w-80`
- [ ] Slash menu max height is `400px` with internal vertical scroll
- [ ] Slash menu category labels render as `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, and `DOCUMENT TOOLS`
- [ ] Slash menu resets the selected row to index `0` whenever the item list changes
- [ ] Slash menu scrolls the selected row into view whenever the selected index changes
- [ ] Slash menu `ArrowUp` wraps from the first item to the last item
- [ ] Slash menu `ArrowDown` wraps from the last item back to the first item
- [ ] Slash menu `Enter` runs the highlighted command and consumes the key event
- [ ] Slash menu `Escape` hides the popup and consumes the key event
- [ ] Slash menu popup placement is `bottom-start`
- [ ] Slash menu popup offset is `[0, 4]`
- [ ] Slash menu popup uses `interactive: true` and `trigger: "manual"`
