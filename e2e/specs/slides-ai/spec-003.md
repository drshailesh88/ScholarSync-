# slides-ai — Spec 003

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 3. Slides Agent Panel (`slides-agent-panel.tsx`)
- [ ] Up to 50 messages cached in history
- [ ] Loading spinner during API call
- [ ] Error messages displayed on failure
- [ ] AI responses can include suggested changes to slide/block
- [ ] "Apply" button to apply a single suggested change
- [ ] "Apply to All" button to apply all suggestions
- [ ] Applied changes marked with checkmark icon
- [ ] Changes update the slide in the store
- [ ] Auto-resizing textarea
- [ ] Focuses on mount
- [ ] Enter sends message
- [ ] Shift+Enter adds new line
- [ ] Send button (PaperPlaneRight icon)
- [ ] `/learn` — enters research mode
- [ ] `/draft` — content generation mode
- [ ] `/visual` — visual suggestion mode
- [ ] `/illustrate` — illustration mode
- [ ] Endpoint: `/api/slides/agent`
- [ ] Sends: mode, prompt, deckId, slides data, activeSlideId, selected block context, chat history, audienceType
- [ ] Response includes message + optional suggestedChanges
#### 4. AI Tools Dropdown (Properties Panel)
- [ ] Located in Properties Panel under "AI Tools" heading
- [ ] **14 AI actions with icons and descriptions:**
- [ ] Loading spinner on active action
- [ ] Other actions disabled during processing
- [ ] Error message display
- [ ] Results applied directly to slide via `onApply()` callback
- [ ] API endpoint: `/api/presentations/edit-slide`
#### 5. Coach Panel (Properties Panel)
- [ ] "Run Coach" button to start evaluation
- [ ] Loading state during evaluation
- [ ] Error display on failure
- [ ] Score displayed (0–10 scale)
- [ ] Visual score display
- [ ] **Structure** (blue)
- [ ] **Evidence** (cyan)
- [ ] **Narrative** (green)
