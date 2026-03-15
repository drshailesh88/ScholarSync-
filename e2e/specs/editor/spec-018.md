# editor — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Selection Toolbar and Link Popover
- [x] SelectionToolbar style choices are `Normal text`, `Heading 1`, `Heading 2`, `Heading 3`, and `Heading 4`
- [x] SelectionToolbar bold button toggles the `bold` mark on mouse down to preserve selection
- [x] SelectionToolbar italic button toggles the `italic` mark on mouse down to preserve selection
- [x] SelectionToolbar underline button toggles the `underline` mark on mouse down to preserve selection
- [x] SelectionToolbar strikethrough button toggles the `strike` mark on mouse down to preserve selection
- [x] SelectionToolbar inline-code button toggles the `code` mark on mouse down to preserve selection
- [x] SelectionToolbar highlight main click toggles the highlight mark without choosing a specific color
- [x] SelectionToolbar highlight palette opens from the highlight button context menu rather than a normal left click
- [x] SelectionToolbar highlight palette colors are yellow `#fef08a`, green `#bbf7d0`, blue `#bfdbfe`, pink `#fecdd3`, and orange `#fed7aa`
- [x] SelectionToolbar link action uses `window.prompt("URL", previousUrl)`
- [x] Cancelling the link prompt leaves the current link state unchanged
- [x] Entering an empty string in the link prompt removes the current link mark
- [x] Entering a non-empty string in the link prompt extends the current link mark range before updating `href`
- [x] SelectionToolbar comment button dispatches `scholarsync:editor-action` with `action: "add-comment"`
- [x] SelectionToolbar AI Edit button dispatches `scholarsync:ai-action` with `action: "precision-edit"`
- [x] LinkPopover intercepts clicks on `<a>` tags inside the editor DOM and prevents the browser default navigation
- [x] LinkPopover starts in read mode when opened from an inline link
- [x] LinkPopover edit input placeholder is `https://...`
- [x] LinkPopover pressing `Enter` in edit mode saves the new URL
- [x] LinkPopover pressing `Escape` in edit mode exits edit mode without applying additional changes
- [x] LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [x] LinkPopover `Remove link` unsets the mark and closes the popover
#### Slash Menu Renderer and Keyboard Navigation
- [x] Slash menu empty state text is `No commands found`
- [x] Slash menu width is fixed at `w-80`
- [x] Slash menu max height is `400px` with internal vertical scroll
- [x] Slash menu category labels render as `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, and `DOCUMENT TOOLS`
- [x] Slash menu resets the selected row to index `0` whenever the item list changes
- [x] Slash menu scrolls the selected row into view whenever the selected index changes
- [x] Slash menu `ArrowUp` wraps from the first item to the last item
- [x] Slash menu `ArrowDown` wraps from the last item back to the first item
- [x] Slash menu `Enter` runs the highlighted command and consumes the key event
- [x] Slash menu `Escape` hides the popup and consumes the key event
- [x] Slash menu popup placement is `bottom-start`
- [x] Slash menu popup offset is `[0, 4]`
- [x] Slash menu popup uses `interactive: true` and `trigger: "manual"`
