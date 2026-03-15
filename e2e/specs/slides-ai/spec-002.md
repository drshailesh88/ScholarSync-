# slides-ai — Spec 002

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 3. Slides Agent Panel (`slides-agent-panel.tsx`)
- [x] PASS: "Suggest visual"
- [x] PASS: **Text block actions** (text, bullets, quote, callout):
- [x] PASS: "Rewrite"
- [x] PASS: "Shorten"
- [x] PASS: "Expand"
- [x] PASS: "Academic tone"
- [x] PASS: "Fix formatting"
- [x] PASS: "Add citations"
- [x] PASS: **Chart block actions:**
- [x] PASS: "Change chart type"
- [x] PASS: "Add labels"
- [x] PASS: "Simplify data"
- [x] PASS: "Improve colors"
- [x] PASS: "Add title"
- [x] PASS: "Convert to table"
- [x] PASS: **Image block actions:**
- [x] PASS: "Generate image"
- [x] PASS: "Suggest alternative"
- [x] PASS: "Add caption"
- [x] PASS: "Resize"
- [x] PASS: "Add border"
- [x] PASS: "Replace with diagram"
- [x] PASS: **Table block actions:**
- [x] PASS: "Add row"
- [x] PASS: "Add column"
- [x] PASS: "Simplify"
- [x] PASS: "Add caption"
- [x] PASS: "Improve formatting"
- [x] PASS: "Convert to chart"
- [x] PASS: Clicking a chip sets the input text and focuses the textarea; the user still has to send it
- [x] PASS: Message history area with auto-scroll on new messages
- [x] PASS: User messages styled differently from assistant messages
- [x] PASS: **Streaming text display:**
- [x] PASS: Text reveals progressively (word-by-word, ~20ms per word)
- [x] PASS: Animated cursor during streaming
