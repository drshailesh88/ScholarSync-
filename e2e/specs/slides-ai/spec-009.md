# slides-ai — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 14. Theme Customizer (Gamma Mode)
- [ ] Editing any color marks theme as "custom"
- [ ] **Heading font** dropdown (10 options):
- [ ] Inter, Poppins, Roboto, Playfair Display, Merriweather, Source Sans 3, Lora, Fira Sans, Nunito, Space Grotesk
- [ ] **Body font** dropdown (same 10 options)
- [ ] None | Sm | Md | Lg | Xl
- [ ] None | Subtle | Strong
- [ ] None | Subtle | Medium | Dramatic
- [ ] Compact | Comfortable | Spacious
- [ ] Max height 70vh with scrollable content
- [ ] All changes apply immediately (live preview)
- [ ] Custom edits set themeKey to "custom"
#### 15. Gamma Agent Panel (Right Panel Chat)
- [ ] Close button to hide the panel
- [ ] "Restructure deck"
- [ ] "Shorten all slides"
- [ ] "Add citations everywhere"
- [ ] "Improve flow"
- [ ] "Translate to..."
- [ ] "Make more visual"
- [ ] Click populates input and focuses
- [ ] Message history with auto-scroll
- [ ] **User messages:** brand background, right-aligned, rounded-br-sm
- [ ] **AI messages:** surface-raised background, left-aligned, rounded-bl-sm
- [ ] Loading state: "Thinking..." with spinner
- [ ] Textarea starts at `rows=1` and does not auto-resize
- [ ] Placeholder: "Ask the AI to change your deck..."
- [ ] Send button (brand background, paper plane icon)
- [ ] Enter sends message; Shift+Enter for new line
- [ ] Endpoint: `/api/slides/chat`
- [ ] Sends: deckId, message, simplified slides data, activeSlideId, audienceType
- [ ] Response: `{ summary, modifiedSlides[], newSlides[] }`
- [ ] **Direct application:** changes applied immediately to store
- [ ] Modified slides: updates title, contentBlocks, speakerNotes, layout
- [ ] New slides: added to the deck
#### 16. Outline Generator (4-Step Wizard)
- [ ] **Title input** (required, red asterisk)
- [ ] **Description textarea** — "Describe your topic, key points, or paste an abstract..."
