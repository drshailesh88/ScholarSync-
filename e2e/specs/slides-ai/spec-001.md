# slides-ai — Spec 001

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 1. Mode Selector Toggle
- [x] PASS: Mode selector displayed in toolbar with two buttons: "Slides" and "Create"
- [x] PASS: Active mode highlighted with brand-colored background + white text
- [x] PASS: Inactive mode shows muted text, hover highlights
- [x] PASS: Clicking "Slides" switches to PowerPoint-style editing
- [x] PASS: Clicking "Create" switches to Gamma card-based editing
- [x] PASS: Mode persists across navigation within the deck
#### 2. Mode Selection Screen (First-Time Entry)
- [x] PASS: Full-screen mode selection displayed for new decks
- [x] PASS: "How do you want to work?" heading with subtitle "You can switch anytime"
- [x] PASS: **Slides Mode card:**
- [x] PASS: Slide-layout icon (16x16 rounded, brand colors)
- [x] PASS: "Slides Mode" title
- [x] PASS: "Click and build like PowerPoint" description
- [x] PASS: Hover: border → brand, background → brand/5
- [x] PASS: **Create Mode card:**
- [x] PASS: Star icon (brand colors)
- [x] PASS: "Create Mode" title
- [x] PASS: "AI builds it, you refine" description
- [x] PASS: Hover: same interaction as Slides card
- [x] PASS: Selecting either mode navigates to the appropriate editor
#### 3. Slides Agent Panel (`slides-agent-panel.tsx`)
- [x] PASS: "AI Chat" label with Sparkle icon
- [x] PASS: Panel opens as right sidebar in Slides Mode
- [x] PASS: Toggled via right panel selector (properties → agent)
- [x] PASS: Badge showing selected block type with icon:
- [x] PASS: Text/Bullets/Quote/Callout → TextAa icon
- [x] PASS: Chart → ChartBar icon
- [x] PASS: Image/Illustration → Image icon
- [x] PASS: Table → Table icon
- [x] PASS: No block selected → shows slide-level context
- [x] PASS: Context updates when selection changes
- [x] PASS: **Default actions** (no block or unknown block):
- [x] PASS: "Improve this slide"
- [x] PASS: "Add more detail"
- [x] PASS: "Simplify"
- [x] PASS: "Add citations"
- [x] PASS: "Fix formatting"
