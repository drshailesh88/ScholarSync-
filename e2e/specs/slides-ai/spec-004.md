# slides-ai — Spec 004

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 5. Coach Panel (Properties Panel)
- [x] PASS: **Design** (amber)
- [x] PASS: **Audience Fit** (red)
- [x] PASS: Up to 5 suggestions displayed, sorted by priority
- [x] PASS: Priority coloring: high (red), medium (yellow), low (green)
- [x] PASS: Each suggestion shows actionable text
- [x] PASS: Per-slide breakdown with slide number and title
- [x] PASS: Issues list (red)
- [x] PASS: Strengths list (green)
- [x] PASS: Click a slide insight to navigate to that slide
- [x] PASS: "Re-evaluate" button to refresh scores after changes
- [x] PASS: Endpoint: `/api/presentations/coach`
- [x] PASS: Sends: deckId, audienceType, all slides data
- [x] PASS: Returns: overallScore, 5 dimension scores, suggestions[], slideInsights[]
#### 6. Slide Regenerate Dialog (Filmstrip Context Menu)
- [x] PASS: Opens from filmstrip right-click → "Regenerate with AI..."
- [x] PASS: Also available as "Regenerate Selected Slides..." for multi-select
- [x] PASS: **Dialog UI:**
- [x] PASS: Title shows "Regenerate This Slide" or "Regenerate Selected Slides"
- [x] PASS: Lists slide titles being regenerated
- [x] PASS: Instruction text input (freeform prompt)
- [x] PASS: Tone selector (RegenerateTone enum)
- [x] PASS: "Regenerate" submit button
- [x] PASS: Close/cancel button
- [x] PASS: On submit, regenerates slide content via store action
- [x] PASS: Dialog closes after successful regeneration
#### 7. Gamma Mode Layout
- [x] PASS: Three-panel layout when slides exist:
- [x] PASS: Left: Card Outline Sidebar (w-56)
- [x] PASS: Center: Card Stack (flex-1, scrollable)
- [x] PASS: Right: AI Agent Panel (w-360, conditional on `agentPanelOpen`)
- [x] PASS: When no slides exist: shows Outline Generator wizard instead
- [x] PASS: Gamma Toolbar at top (fixed)
#### 8. Gamma Toolbar
- [x] PASS: "Slides" / "Create" toggle (same as Section 1)
- [x] PASS: Switching from Create to Slides mode via Export menu shows confirmation dialog
- [x] PASS: Click to enter edit mode (inline input with brand underline)
- [x] PASS: Max width 300px, text truncated
- [x] PASS: Enter commits the title change
