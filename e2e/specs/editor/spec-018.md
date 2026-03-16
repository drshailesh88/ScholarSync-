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
- [x] PASS: SelectionToolbar style choices are `Normal text`, `Heading 1`, `Heading 2`, `Heading 3`, and `Heading 4`
- [x] PASS: SelectionToolbar bold button toggles the `bold` mark on mouse down to preserve selection
- [x] PASS: SelectionToolbar italic button toggles the `italic` mark on mouse down to preserve selection
- [x] PASS: SelectionToolbar underline button toggles the `underline` mark on mouse down to preserve selection
- [x] PASS: SelectionToolbar strikethrough button toggles the `strike` mark on mouse down to preserve selection
- [x] PASS: SelectionToolbar inline-code button toggles the `code` mark on mouse down to preserve selection
- [x] PASS: SelectionToolbar highlight main click toggles the highlight mark without choosing a specific color
- [x] PASS: SelectionToolbar highlight palette opens from the highlight button context menu rather than a normal left click
- [x] PASS: SelectionToolbar highlight palette colors are yellow `#fef08a`, green `#bbf7d0`, blue `#bfdbfe`, pink `#fecdd3`, and orange `#fed7aa`
- [x] PASS: SelectionToolbar link action uses `window.prompt("URL", previousUrl)`
- [x] PASS: Cancelling the link prompt leaves the current link state unchanged
- [x] PASS: Entering an empty string in the link prompt removes the current link mark
- [x] PASS: Entering a non-empty string in the link prompt extends the current link mark range before updating `href`
- [x] PASS: SelectionToolbar comment button dispatches `scholarsync:editor-action` with `action: "add-comment"`
- [x] PASS: SelectionToolbar AI Edit button dispatches `scholarsync:ai-action` with `action: "precision-edit"`
- [x] PASS: LinkPopover intercepts clicks on `<a>` tags inside the editor DOM and prevents the browser default navigation
- [x] PASS: LinkPopover starts in read mode when opened from an inline link
- [x] PASS: LinkPopover edit input placeholder is `https://...`
- [x] PASS: LinkPopover pressing `Enter` in edit mode saves the new URL
- [x] PASS: LinkPopover pressing `Escape` in edit mode exits edit mode without applying additional changes
- [x] PASS: LinkPopover `Open in new tab` uses `window.open(url, "_blank", "noopener,noreferrer")`
- [x] PASS: LinkPopover `Remove link` unsets the mark and closes the popover
#### Slash Menu Renderer and Keyboard Navigation
- [x] PASS: Slash menu empty state text is `No commands found`
- [x] PASS: Slash menu width is fixed at `w-80`
- [x] PASS: Slash menu max height is `400px` with internal vertical scroll
- [x] PASS: Slash menu category labels render as `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, and `DOCUMENT TOOLS`
- [x] PASS: Slash menu resets the selected row to index `0` whenever the item list changes
- [x] PASS: Slash menu scrolls the selected row into view whenever the selected index changes
- [x] PASS: Slash menu `ArrowUp` wraps from the first item to the last item
- [x] PASS: Slash menu `ArrowDown` wraps from the last item back to the first item
- [x] PASS: Slash menu `Enter` runs the highlighted command and consumes the key event
- [x] PASS: Slash menu `Escape` hides the popup and consumes the key event
- [x] PASS: Slash menu popup placement is `bottom-start`
- [x] PASS: Slash menu popup offset is `[0, 4]`
- [x] PASS: Slash menu popup uses `interactive: true` and `trigger: "manual"`
