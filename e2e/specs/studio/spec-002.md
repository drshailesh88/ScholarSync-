# studio — Spec 002

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Learn / Guide Mode
#### Stage Progression Tracker
- [ ] 6 stage buttons displayed in order:
- [ ] Active stage visually highlighted
- [ ] Can click any stage to navigate (non-linear)
- [ ] AI chat adapts Socratic method to current stage

### Top Status Bar
#### Export Dropdown
- [ ] "Export" button visible
- [ ] Clicking opens dropdown with options:
- [ ] "Export as PDF"
- [ ] "Export as Word"
- [ ] Dropdown closes on selection; it does not currently dismiss on outside click

### Editor (TiptapEditor)
- [ ] Rich text editor renders in center column
- [ ] Editor accepts typing and formatting
- [ ] Content syncs with document state
#### Text Formatting
- [ ] Bold, Italic, Underline, Strikethrough
- [ ] Heading levels 1–6
- [ ] Bullet list, Numbered list, Checklist
- [ ] Blockquote
- [ ] Code block
- [ ] Horizontal rule / divider
#### Academic Content
- [ ] Table insertion (3×3 with header row)
- [ ] Image upload and embedding
- [ ] Abstract template (Background/Methods/Results/Conclusion)
- [ ] Auto-numbered figure captions
- [ ] Auto-numbered table captions
- [ ] Footnotes (`Cmd+Shift+F`)
#### Content Editing
- [ ] Text selection and editing
- [ ] Copy/paste preserves formatting
- [ ] Undo (`Cmd+Z`) / Redo (`Cmd+Shift+Z`)
- [ ] Drag and drop text/blocks
- [ ] Editor triggers `handleDirty()` on changes (saves to localStorage)
#### Debounce Behavior
- [ ] Title changes debounced at 1 second
- [ ] Content changes debounced at 2 seconds
- [ ] Save status updates after debounce

### Slash Commands
- [ ] Typing `/` at start of line or after space triggers command menu
- [ ] Menu shows case-insensitive filtered results as user types
#### Academic Content Commands
- [ ] Table inserts a 3x3 table with a header row
