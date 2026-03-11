# editor — Spec 019

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Slash Menu Renderer and Keyboard Navigation
- [ ] Slash suggestions are allowed at the start of a block
- [ ] Slash suggestions are also allowed immediately after a space character
- [ ] Slash suggestions are not allowed in the middle of a word with no preceding space or newline
- [ ] Slash query filtering matches against command title, description, and category text
#### Slash Commands: Basic Blocks and Structure
- [ ] Slash command `Text` label is `Text`
- [ ] Slash command `Text` description is `Plain paragraph text`
- [ ] Slash command `Text` converts the current block to a paragraph
- [ ] Slash command `Heading 1` description is `Manuscript title`
- [ ] Slash command `Heading 1` shortcut label is `Cmd+Opt+1`
- [ ] Slash command `Heading 1` sets the current block to heading level 1
- [ ] Slash command `Heading 2` description is `IMRAD sections`
- [ ] Slash command `Heading 2` shortcut label is `Cmd+Opt+2`
- [ ] Slash command `Heading 2` sets the current block to heading level 2
- [ ] Slash command `Heading 3` description is `Subsections`
- [ ] Slash command `Heading 3` shortcut label is `Cmd+Opt+3`
- [ ] Slash command `Heading 3` sets the current block to heading level 3
- [ ] Slash command `Heading 4` description is `Sub-subsections`
- [ ] Slash command `Heading 4` shortcut label is `Cmd+Opt+4`
- [ ] Slash command `Heading 4` sets the current block to heading level 4
- [ ] Slash command `Bullet List` description is `Unordered list`
- [ ] Slash command `Bullet List` shortcut label is `Cmd+Shift+8`
- [ ] Slash command `Bullet List` toggles the current block into a bullet list
- [ ] Slash command `Numbered List` description is `Ordered list`
- [ ] Slash command `Numbered List` shortcut label is `Cmd+Shift+7`
- [ ] Slash command `Numbered List` toggles the current block into an ordered list
- [ ] Slash command `Checklist` description is `Task checklist`
- [ ] Slash command `Checklist` shortcut label is `Cmd+Shift+9`
- [ ] Slash command `Checklist` toggles a task list
- [ ] Slash command `Block Quote` description is `Quote text`
- [ ] Slash command `Block Quote` toggles a blockquote
- [ ] Slash command `Divider` description is `Horizontal rule`
- [ ] Slash command `Divider` inserts a horizontal rule
- [ ] Slash command `Code Block` description is `For statistical code`
- [ ] Slash command `Code Block` toggles a code block using StarterKit
#### Slash Commands: Academic Inserts
- [ ] Slash command `Table` description is `Insert data table`
