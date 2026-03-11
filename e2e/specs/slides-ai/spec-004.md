# slides-ai — Spec 004

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 5. Coach Panel (Properties Panel)
- [ ] **Design** (amber)
- [ ] **Audience Fit** (red)
- [ ] Up to 5 suggestions displayed, sorted by priority
- [ ] Priority coloring: high (red), medium (yellow), low (green)
- [ ] Each suggestion shows actionable text
- [ ] Per-slide breakdown with slide number and title
- [ ] Issues list (red)
- [ ] Strengths list (green)
- [ ] Click a slide insight to navigate to that slide
- [ ] "Re-evaluate" button to refresh scores after changes
- [ ] Endpoint: `/api/presentations/coach`
- [ ] Sends: deckId, audienceType, all slides data
- [ ] Returns: overallScore, 5 dimension scores, suggestions[], slideInsights[]
#### 6. Slide Regenerate Dialog (Filmstrip Context Menu)
- [ ] Opens from filmstrip right-click → "Regenerate with AI..."
- [ ] Also available as "Regenerate Selected Slides..." for multi-select
- [ ] **Dialog UI:**
- [ ] Title shows "Regenerate This Slide" or "Regenerate Selected Slides"
- [ ] Lists slide titles being regenerated
- [ ] Instruction text input (freeform prompt)
- [ ] Tone selector (RegenerateTone enum)
- [ ] "Regenerate" submit button
- [ ] Close/cancel button
- [ ] On submit, regenerates slide content via store action
- [ ] Dialog closes after successful regeneration
#### 7. Gamma Mode Layout
- [ ] Three-panel layout when slides exist:
- [ ] Left: Card Outline Sidebar (w-56)
- [ ] Center: Card Stack (flex-1, scrollable)
- [ ] Right: AI Agent Panel (w-360, conditional on `agentPanelOpen`)
- [ ] When no slides exist: shows Outline Generator wizard instead
- [ ] Gamma Toolbar at top (fixed)
#### 8. Gamma Toolbar
- [ ] "Slides" / "Create" toggle (same as Section 1)
- [ ] Switching from Create to Slides mode via Export menu shows confirmation dialog
- [ ] Click to enter edit mode (inline input with brand underline)
- [ ] Max width 300px, text truncated
- [ ] Enter commits the title change
