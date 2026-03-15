# slides-ai — Spec 003

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 3. Slides Agent Panel (`slides-agent-panel.tsx`)
- [x] PASS: Up to 50 messages cached in history
- [x] PASS: Loading spinner during API call
- [x] PASS: Error messages displayed on failure
- [x] PASS: AI responses can include suggested changes to slide/block
- [x] PASS: "Apply" button to apply a single suggested change
- [x] PASS: "Apply to All" button to apply all suggestions
- [x] PASS: Applied changes marked with checkmark icon
- [x] PASS: Changes update the slide in the store
- [x] PASS: Auto-resizing textarea
- [x] PASS: Focuses on mount
- [x] PASS: Enter sends message
- [x] PASS: Shift+Enter adds new line
- [x] PASS: Send button (PaperPlaneRight icon)
- [x] PASS: `/learn` — enters research mode
- [x] PASS: `/draft` — content generation mode
- [x] PASS: `/visual` — visual suggestion mode
- [x] PASS: `/illustrate` — illustration mode
- [x] PASS: Endpoint: `/api/slides/agent`
- [x] PASS: Sends: mode, prompt, deckId, slides data, activeSlideId, selected block context, chat history, audienceType
- [x] PASS: Response includes message + optional suggestedChanges
#### 4. AI Tools Dropdown (Properties Panel)
- [x] PASS: Located in Properties Panel under "AI Tools" heading
- [x] PASS: **14 AI actions with icons and descriptions:**
- [x] PASS: Loading spinner on active action
- [x] PASS: Other actions disabled during processing
- [x] PASS: Error message display
- [x] PASS: Results applied directly to slide via `onApply()` callback
- [x] PASS: API endpoint: `/api/presentations/edit-slide`
#### 5. Coach Panel (Properties Panel)
- [x] PASS: "Run Coach" button to start evaluation
- [x] PASS: Loading state during evaluation
- [x] PASS: Error display on failure
- [x] PASS: Score displayed (0–10 scale)
- [x] PASS: Visual score display
- [x] PASS: **Structure** (blue)
- [x] PASS: **Evidence** (cyan)
- [x] PASS: **Narrative** (green)
