# slides-ai — Spec 010

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 16. Outline Generator (4-Step Wizard)
- [ ] **Audience selector** — 10 audience types with icons:
- [ ] **Card count slider** (3–20 cards)
- [ ] "Generate Outline" button (Sparkle icon)
- [ ] Loading spinner during generation
- [ ] Scrollable vertical list of editable outline cards
- [ ] Each card row shows:
- [ ] Card title input (editable)
- [ ] Bullet point inputs (editable, add/remove)
- [ ] Move up button (disabled at position 1)
- [ ] Move down button (disabled at last position)
- [ ] Delete button (disabled if only 1 card)
- [ ] "Add another card" button at bottom
- [ ] Back button → returns to Step 1
- [ ] "Choose Theme" button → advances to Step 3
- [ ] Flex-wrapped row of large theme swatches (120x72px)
- [ ] Theme name label on each swatch
- [ ] Selected theme: brand border + ring + check mark
- [ ] Hover: scale 1.03 effect
- [ ] Back button → returns to Step 2
- [ ] "Create Presentation" button → starts generation (Step 4)
- [ ] Spinner + "Creating your presentation" message
- [ ] Status messages stream in:
- [ ] "Setting up theme..."
- [ ] "Generating your presentation..."
- [ ] "Loading your deck..."
- [ ] Streaming from `/api/slides/generate-stream` (newline-delimited JSON)
- [ ] Stream events: status, images, complete, error
- [ ] On completion, slides load into the editor
- [ ] `/api/slides/outline` — generates outline from prompt
- [ ] `/api/slides/generate-stream` — streams full deck generation
#### 17. Smart Layout Templates
- [ ] 10 pre-built layout templates:
- [ ] Floating panel appears in block inserter menu
- [ ] Dashed border entry with icon + label + description
- [ ] Click replaces active slide's contentBlocks with template
- [ ] Auto-closes after selection
