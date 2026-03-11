# editor — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Bibliography
- [ ] Non-editable block — users cannot type inside it
- [ ] Updates reactively when citations are added/removed

### Footnotes
- [ ] **Insert via** `Cmd+Shift+F` — prompts for footnote text via `window.prompt`
- [ ] **Insert via** slash command "Footnote"
- [ ] Footnote appears as **superscript number** in the text
- [ ] **Hover tooltip** — shows footnote content
- [ ] **Footnote editor** — inline editing of footnote text (via FootnoteView)
- [ ] **Delete footnote** button in footnote view
- [ ] **Auto-renumbering** — ProseMirror plugin renumbers footnotes when they change order
- [ ] **FootnoteSection** — renders all footnotes at the bottom of the editor area

### Document Outline
- [ ] **Toggle** — click the List icon to expand, X to collapse
- [ ] **Auto-show on hover** — expands when mouse enters the area
- [ ] **Minimum headings** — only appears when document has 2+ headings
- [ ] **Heading hierarchy** — H1-H4 with proper indentation
- [ ] **Active section highlighting** — current section has brand-colored left border
- [ ] **Click to scroll** — clicking a heading scrolls to it and positions cursor
- [ ] **Word count per section** — appears on hover for each heading
- [ ] **Missing IMRAD section warnings** — amber warnings for missing: Introduction, Methods, Results, Discussion, Conclusion, References
- [ ] **Total word count** — displayed in footer

### Comments System
#### Adding Comments (Editor page only)
- [ ] **Selection toolbar comment button** — select text, click comment icon
- [ ] **Cmd+/** — toggles comment sidebar open/closed
- [ ] Inline comments capture the **quoted text** from selection
#### Comment Sidebar
- [ ] **Filter modes** — All, Unresolved, Resolved
- [ ] **Unresolved count badge** — amber badge in header
- [ ] **Empty state** — "No comments yet" message with instructions
#### Comment Thread Features
- [ ] **Comment bubble** — shows user avatar initial, username, relative timestamp
- [ ] **Quoted text** — clickable, scrolls to the commented section in the editor
- [ ] **Reply** — reply button opens inline reply input, Enter to submit
- [ ] **Resolve/Unresolve** — toggle button (green checkmark / amber unresolve)
- [ ] **Delete** — red delete button, only visible for owner comments
- [ ] **Resolved styling** — resolved comments have strikethrough text and reduced opacity
- [ ] **Resolved badge** — "Resolved" pill on resolved comments
- [ ] **Comments stored in localStorage** — per document ID
#### New Comment Input
- [ ] Input at bottom of sidebar for general document comments
- [ ] **Inline comment mode** — when triggered from selection toolbar, shows quoted text preview at top
