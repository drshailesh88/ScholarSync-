# slides-ai — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 14. Theme Customizer (Gamma Mode)
- [x] PASS: Editing any color marks theme as "custom"
- [x] PASS: **Heading font** dropdown (10 options):
- [x] PASS: Inter, Poppins, Roboto, Playfair Display, Merriweather, Source Sans 3, Lora, Fira Sans, Nunito, Space Grotesk
- [x] PASS: **Body font** dropdown (same 10 options)
- [x] PASS: None | Sm | Md | Lg | Xl
- [x] PASS: None | Subtle | Strong
- [x] PASS: None | Subtle | Medium | Dramatic
- [x] PASS: Compact | Comfortable | Spacious
- [x] PASS: Max height 70vh with scrollable content
- [x] PASS: All changes apply immediately (live preview)
- [x] PASS: Custom edits set themeKey to "custom"
#### 15. Gamma Agent Panel (Right Panel Chat)
- [x] PASS: Close button to hide the panel
- [x] PASS: "Restructure deck"
- [x] PASS: "Shorten all slides"
- [x] PASS: "Add citations everywhere"
- [x] PASS: "Improve flow"
- [x] PASS: "Translate to..."
- [x] PASS: "Make more visual"
- [x] PASS: Click populates input and focuses
- [x] PASS: Message history with auto-scroll
- [x] PASS: **User messages:** brand background, right-aligned, rounded-br-sm
- [x] PASS: **AI messages:** surface-raised background, left-aligned, rounded-bl-sm
- [x] PASS: Loading state: "Thinking..." with spinner
- [x] PASS: Textarea starts at `rows=1` and does not auto-resize
- [x] PASS: Placeholder: "Ask the AI to change your deck..."
- [x] PASS: Send button (brand background, paper plane icon)
- [x] PASS: Enter sends message; Shift+Enter for new line
- [x] PASS: Endpoint: `/api/slides/chat`
- [x] PASS: Sends: deckId, message, simplified slides data, activeSlideId, audienceType
- [x] PASS: Response: `{ summary, modifiedSlides[], newSlides[] }`
- [x] PASS: **Direct application:** changes applied immediately to store
- [x] PASS: Modified slides: updates title, contentBlocks, speakerNotes, layout
- [x] PASS: New slides: added to the deck
#### 16. Outline Generator (4-Step Wizard)
- [x] PASS: **Title input** (required, red asterisk)
- [x] PASS: **Description textarea** — "Describe your topic, key points, or paste an abstract..."
