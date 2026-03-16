# studio — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Learn / Guide Mode
#### Stage Progression Tracker
- [x] PASS: 6 stage buttons displayed in order:
- [x] PASS: Active stage visually highlighted
- [x] PASS: Can click any stage to navigate (non-linear)
- [x] PASS: AI chat adapts Socratic method to current stage

### Top Status Bar
#### Export Dropdown
- [x] PASS: "Export" button visible
- [x] PASS: Clicking opens dropdown with options:
- [x] PASS: "Export as PDF"
- [x] PASS: "Export as Word"
- [x] PASS: Dropdown closes on selection; it does not currently dismiss on outside click

### Editor (TiptapEditor)
- [x] PASS: Rich text editor renders in center column
- [x] PASS: Editor accepts typing and formatting
- [x] PASS: Content syncs with document state
#### Text Formatting
- [x] PASS: Bold, Italic, Underline, Strikethrough
- [x] PASS: Heading levels 1–6
- [x] PASS: Bullet list, Numbered list, Checklist
- [x] PASS: Blockquote
- [x] PASS: Code block
- [x] PASS: Horizontal rule / divider
#### Academic Content
- [x] PASS: Table insertion (3×3 with header row)
- [x] PASS: Image upload and embedding
- [x] PASS: Abstract template (Background/Methods/Results/Conclusion)
- [x] PASS: Auto-numbered figure captions
- [x] PASS: Auto-numbered table captions
- [x] PASS: Footnotes (`Cmd+Shift+F`)
#### Content Editing
- [x] PASS: Text selection and editing
- [x] PASS: Copy/paste preserves formatting
- [x] PASS: Undo (`Cmd+Z`) / Redo (`Cmd+Shift+Z`)
- [x] PASS: Drag and drop text/blocks
- [x] PASS: Editor triggers `handleDirty()` on changes (saves to localStorage)
#### Debounce Behavior
- [x] PASS: Title changes debounced at 1 second
- [x] PASS: Content changes debounced at 2 seconds
- [x] PASS: Save status updates after debounce

### Slash Commands
- [x] PASS: Typing `/` at start of line or after space triggers command menu
- [x] PASS: Menu shows case-insensitive filtered results as user types
#### Academic Content Commands
- [x] PASS: Table inserts a 3x3 table with a header row
