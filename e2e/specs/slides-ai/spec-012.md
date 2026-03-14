# slides-ai — Spec 012

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 20. Spotlight Mode (Presentation Feature)
- [ ] **Indicator bar** (top center):
- [ ] Flashlight icon (amber)
- [ ] "Spotlight N / Total" counter
- [ ] Up arrow button (disabled at first block)
- [ ] Down arrow button (disabled at last block)
- [ ] Close (X) button
- [ ] Black/70 background with backdrop blur, pill shape
- [ ] Vertical column of dots
- [ ] Active dot: accent color, scale 1.25
- [ ] Past dots: white/30
- [ ] Future dots: white/10
- [ ] Clickable to jump to any block
- [ ] Current block: opacity-100, scale-100
- [ ] Past blocks: opacity-30
- [ ] Future blocks: opacity-10, blur-sm
- [ ] Arrow Down — next block
- [ ] Arrow Up — previous block
- [ ] Escape — exit spotlight mode
- [ ] Shortcuts disabled when input/textarea focused
- [ ] Framer Motion entrance/exit (opacity, 0.3s)
- [ ] Block wrapper transitions (opacity, blur, scale)
#### 21. Export (Gamma Mode)
- [ ] POST to `/api/export/pptx`
- [ ] Sends: title, slides (mapped from SlideState), themeConfig
- [ ] Downloads as `.pptx` file
- [ ] Filename: sanitized title (non-alphanumeric → underscore)
- [ ] Loading spinner during export
- [ ] POST to `/api/export/presentation-pdf`
- [ ] Sends title + mapped slides, but does not include `themeConfig`
- [ ] Downloads as `.pdf` file
- [ ] Loading spinner during export
- [ ] Alert shown on export failure
- [ ] Export button re-enabled after error
#### 22. Agent State Management (Slides Store)
- [ ] `agentMode`: "learn" | "draft" | "visual" | "illustrate"
- [ ] `agentChatHistory`: array of `AgentChatMessage`
- [ ] Each message: id, role, content, timestamp, suggestedChanges?, applied?
