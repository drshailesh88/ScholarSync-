# slides-ai — Spec 010

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 16. Outline Generator (4-Step Wizard)
- [x] PASS: **Audience selector** — 10 audience types with icons:
- [x] PASS: **Card count slider** (3–20 cards)
- [x] PASS: "Generate Outline" button (Sparkle icon)
- [x] PASS: Loading spinner during generation
- [x] PASS: Scrollable vertical list of editable outline cards
- [x] PASS: Each card row shows:
- [x] PASS: Card title input (editable)
- [x] PASS: Bullet point inputs (editable, add/remove)
- [x] PASS: Move up button (disabled at position 1)
- [x] PASS: Move down button (disabled at last position)
- [x] PASS: Delete button (disabled if only 1 card)
- [x] PASS: "Add another card" button at bottom
- [x] PASS: Back button → returns to Step 1
- [x] PASS: "Choose Theme" button → advances to Step 3
- [x] PASS: Flex-wrapped row of large theme swatches (120x72px)
- [x] PASS: Theme name label on each swatch
- [x] PASS: Selected theme: brand border + ring + check mark
- [x] PASS: Hover: scale 1.03 effect
- [x] PASS: Back button → returns to Step 2
- [x] PASS: "Create Presentation" button → starts generation (Step 4)
- [x] PASS: Spinner + "Creating your presentation" message
- [x] PASS: Status messages stream in:
- [x] PASS: "Setting up theme..."
- [x] PASS: "Generating your presentation..."
- [x] PASS: "Loading your deck..."
- [x] PASS: Streaming from `/api/slides/generate-stream` (newline-delimited JSON)
- [x] PASS: Stream events: status, images, complete, error
- [x] PASS: On completion, slides load into the editor
- [x] PASS: `/api/slides/outline` — generates outline from prompt
- [x] PASS: `/api/slides/generate-stream` — streams full deck generation
#### 17. Smart Layout Templates
- [x] PASS: 10 pre-built layout templates:
- [x] PASS: Floating panel appears in block inserter menu
- [x] PASS: Dashed border entry with icon + label + description
- [x] PASS: Click replaces active slide's contentBlocks with template
- [x] PASS: Auto-closes after selection
