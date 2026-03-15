# slides-ai — Spec 012

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 20. Spotlight Mode (Presentation Feature)
- [x] PASS: **Indicator bar** (top center):
- [x] PASS: Flashlight icon (amber)
- [x] PASS: "Spotlight N / Total" counter
- [x] PASS: Up arrow button (disabled at first block)
- [x] PASS: Down arrow button (disabled at last block)
- [x] PASS: Close (X) button
- [x] PASS: Black/70 background with backdrop blur, pill shape
- [x] PASS: Vertical column of dots
- [x] PASS: Active dot: accent color, scale 1.25
- [x] PASS: Past dots: white/30
- [x] PASS: Future dots: white/10
- [x] PASS: Clickable to jump to any block
- [x] PASS: Current block: opacity-100, scale-100
- [x] PASS: Past blocks: opacity-30
- [x] PASS: Future blocks: opacity-10, blur-sm
- [x] PASS: Arrow Down — next block
- [x] PASS: Arrow Up — previous block
- [x] PASS: Escape — exit spotlight mode
- [x] PASS: Shortcuts disabled when input/textarea focused
- [x] PASS: Framer Motion entrance/exit (opacity, 0.3s)
- [x] PASS: Block wrapper transitions (opacity, blur, scale)
#### 21. Export (Gamma Mode)
- [x] PASS: POST to `/api/export/pptx`
- [x] PASS: Sends: title, slides (mapped from SlideState), themeConfig
- [x] PASS: Downloads as `.pptx` file
- [x] PASS: Filename: sanitized title (non-alphanumeric → underscore)
- [x] PASS: Loading spinner during export
- [x] PASS: POST to `/api/export/presentation-pdf`
- [x] PASS: Sends title + mapped slides, but does not include `themeConfig`
- [x] PASS: Downloads as `.pdf` file
- [x] PASS: Loading spinner during export
- [x] PASS: Alert shown on export failure
- [x] PASS: Export button re-enabled after error
#### 22. Agent State Management (Slides Store)
- [x] PASS: `agentMode`: "learn" | "draft" | "visual" | "illustrate"
- [x] PASS: `agentChatHistory`: array of `AgentChatMessage`
- [x] PASS: Each message: id, role, content, timestamp, suggestedChanges?, applied?
