# editor — Spec 019

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Slash Menu Renderer and Keyboard Navigation
- [x] PASS: Slash suggestions are allowed at the start of a block
- [x] PASS: Slash suggestions are also allowed immediately after a space character
- [x] PASS: Slash suggestions are not allowed in the middle of a word with no preceding space or newline
- [x] PASS: Slash query filtering matches against command title, description, and category text
#### Slash Commands: Basic Blocks and Structure
- [x] PASS: Slash command `Text` label is `Text`
- [x] PASS: Slash command `Text` description is `Plain paragraph text`
- [x] PASS: Slash command `Text` converts the current block to a paragraph
- [x] PASS: Slash command `Heading 1` description is `Manuscript title`
- [x] PASS: Slash command `Heading 1` shortcut label is `Cmd+Shift+1`
- [x] PASS: Slash command `Heading 1` sets the current block to heading level 1
- [x] PASS: Slash command `Heading 2` description is `IMRAD sections`
- [x] PASS: Slash command `Heading 2` shortcut label is `Cmd+Shift+2`
- [x] PASS: Slash command `Heading 2` sets the current block to heading level 2
- [x] PASS: Slash command `Heading 3` description is `Subsections`
- [x] PASS: Slash command `Heading 3` shortcut label is `Cmd+Shift+3`
- [x] PASS: Slash command `Heading 3` sets the current block to heading level 3
- [x] PASS: Slash command `Heading 4` description is `Sub-subsections`
- [x] PASS: Slash command `Heading 4` shortcut label is `Cmd+Shift+4`
- [x] PASS: Slash command `Heading 4` sets the current block to heading level 4
- [x] PASS: Slash command `Bullet List` description is `Unordered list`
- [x] PASS: Slash command `Bullet List` shortcut label is `Cmd+Shift+8`
- [x] PASS: Slash command `Bullet List` toggles the current block into a bullet list
- [x] PASS: Slash command `Numbered List` description is `Ordered list`
- [x] PASS: Slash command `Numbered List` shortcut label is `Cmd+Shift+7`
- [x] PASS: Slash command `Numbered List` toggles the current block into an ordered list
- [x] PASS: Slash command `Checklist` description is `Task checklist`
- [x] PASS: Slash command `Checklist` shortcut label is `Cmd+Shift+9`
- [x] PASS: Slash command `Checklist` toggles a task list
- [x] PASS: Slash command `Block Quote` description is `Quote text`
- [x] PASS: Slash command `Block Quote` toggles a blockquote
- [x] PASS: Slash command `Divider` description is `Horizontal rule`
- [x] PASS: Slash command `Divider` inserts a horizontal rule
- [x] PASS: Slash command `Code Block` description is `For statistical code`
- [x] PASS: Slash command `Code Block` toggles a code block using StarterKit
#### Slash Commands: Academic Inserts
- [x] PASS: Slash command `Table` description is `Insert data table`
