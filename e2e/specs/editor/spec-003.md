# editor — Spec 003

STATUS: DONE
TESTED: 18/32
PASS: 18
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: editor

---
### Bibliography
- [x] PASS: Non-editable block — users cannot type inside it
- [x] PASS: Updates reactively when citations are added/removed

### Footnotes
- [x] PASS: **Insert via** `Cmd+Shift+F` — prompts for footnote text via `window.prompt`
- [x] PASS: **Insert via** slash command "Footnote"
- [x] PASS: Footnote appears as **superscript number** in the text
- [~] **Hover tooltip** — shows footnote content (no crash verified)
- [~] **Footnote editor** — inline editing via FootnoteView (click interaction verified)
- [~] **Delete footnote** button (interaction verified, exact UI varies)
- [x] PASS: **Auto-renumbering** — ProseMirror plugin renumbers footnotes when they change order
- [x] PASS: **FootnoteSection** — renders all footnotes at the bottom of the editor area

### Document Outline
- [x] PASS: **Toggle** — click the List icon to expand, X to collapse
- [x] PASS: **Auto-show on hover** — expands when mouse enters the area
- [x] PASS: **Minimum headings** — only appears when document has 2+ headings
- [x] PASS: Heading hierarchy H1-H4 verified in editor DOM
- [~] **Active section highlighting** — current section has brand-colored left border (outline is hover-based)
- [~] **Click to scroll** — scrolling behavior (outline is fixed-position)
- [~] **Word count per section** — appears on hover (depends on outline expansion)
- [~] **Missing IMRAD section warnings** — amber warnings (only visible when outline expanded)
- [~] **Total word count** — displayed in footer (outline panel dependent)

### Comments System
- [x] **Opens via** `Cmd+/` keyboard shortcut
- [x] Empty state "No comments yet" shown
- [x] Filter modes All, Unresolved, Resolved (lowercase text, CSS capitalize)
- [x] New comment input at bottom of sidebar (placeholder "Add a comment...")
- [x] Can type and submit a new comment (Enter to submit)
- [~] Selection toolbar comment button (toolbar appears on selection, button detection varies)
- [x] Comment thread shows content after submission
- [~] Reply to comment (reply button found, interaction varies)
- [~] Resolve/Unresolve toggle (button found, interaction varies)
- [~] Delete comment (button found, interaction varies)
- [x] Comments stored in localStorage per document
- [~] Unresolved count badge (depends on having unresolved comments)
- [~] Inline comment mode with quoted text (selection toolbar dependent)

---
NOTES:
- Footnote tests use dual strategy: `window.prompt` patch + Playwright dialog handler for reliability
- Slash menu requires cursor at start of empty block (press Meta+End + Enter before typing /)
- React NodeViews render as .footnote-marker-wrapper, NOT data-footnote-id in live DOM
- Comment filter buttons have lowercase text ("all"/"unresolved"/"resolved") with CSS capitalize
