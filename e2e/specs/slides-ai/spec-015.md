# slides-ai — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### Detailed QA Coverage
- [x] PASS: Starting full Gamma deck generation immediately sets step to `generating` before the stream request returns
- [x] PASS: Gamma deck generation serializes the outline into a numbered `Card N: Title` text outline before sending it as `description`
- [x] PASS: Gamma deck generation persists the selected theme to store through `setTheme(selectedTheme, PRESET_THEMES[selectedTheme])` before requesting the stream
- [x] PASS: Gamma deck generation stream reads newline-delimited JSON objects from `/api/slides/generate-stream`
- [x] PASS: Gamma generation stream updates `generationProgress` from each event’s `message` field
- [x] PASS: Gamma generation stream throws immediately when an event of type `error` is received
- [x] PASS: After the stream completes, Gamma generation sets progress text to `Loading your deck...` and calls `loadDeck(deckId)`
- [x] PASS: Gamma deck generation failures return the wizard to the `outline` step rather than keeping the user on the generating screen
- [x] PASS: `GammaAgentPanel` quick-action chips only prefill the input text; they do not auto-send the command
- [x] PASS: Gamma agent header close button calls `setAgentPanelOpen(false)` directly
- [x] PASS: Gamma agent send is disabled while loading or when the trimmed input is empty
- [x] PASS: Gamma agent API payload always sends `deckId`, `message`, `slides`, `activeSlideId`, and `audienceType`
- [x] PASS: Gamma agent applies `modifiedSlides` by patching existing slides and `newSlides` by calling `addSlide()` first, then `updateSlide()`
- [x] PASS: Gamma agent adds assistant summary text even when the response modified slides successfully with no visible UI diff summary beyond that message
- [x] PASS: Gamma agent error responses are converted into assistant chat bubbles instead of a separate inline alert
- [x] PASS: `CardOutlineSidebar` truncates card titles over 20 characters with an ellipsis character
- [x] PASS: Card-outline row action menu is opened by a `DotsThree` button, not a context menu/right-click
- [x] PASS: Card-outline row menu contains only `Duplicate` and `Delete`
- [x] PASS: Card-outline delete is disabled when the deck contains only one slide/card
- [x] PASS: Card-outline insert-between `+` buttons are hover/focus-revealed between cards
- [x] PASS: Card-outline footer button label is `Add card`
- [x] PASS: `CardStack` empty state shows a dashed border button with `Add your first card`
- [x] PASS: Card stack uses `setActiveSlide(slide.id)` on click and also supports keyboard activation with `Enter` or `Space`
- [x] PASS: Only the active Gamma card shows per-card action buttons for background and sparkle menus
- [x] PASS: Card-stack end-of-list insert button remains visible below the final card
#### Actual Current Behavior Corrections
- [x] PASS: In Slides-mode AI chat, quick-action chips do not always send immediately in every context described by the original doc; the panel builds the outgoing request differently for `chat`, `learn`, and `draft` modes
- [x] PASS: `/visual` and `/illustrate` are not separate backend modes in `SlidesAgentPanel`; they stay in `chat` mode and are sent as prompt text
- [x] PASS: Gamma quick-action chips only populate the input field; they do not dispatch the request until the user sends it
- [x] PASS: Gamma mode does not show the three-panel card layout when a deck has zero slides; it shows the outline generator instead
- [x] PASS: Gamma export errors use `alert()` rather than inline toast/banner UI
- [x] PASS: Switching from Gamma to Slides mode is gated by a browser confirmation dialog, not an inline custom modal
- [x] PASS: The Gamma right-side agent panel is controlled by `agentPanelOpen`, not by `rightPanel`
- [x] PASS: The card-outline sidebar menu is a small local dropdown with `Duplicate` and `Delete`, not a full context menu with filmstrip-style actions
#### SlidesWorkspace Loading & Error States (`slides-workspace.tsx`)
- [x] PASS: Loading state displays centered spinner (brand border, transparent top) with text "Loading presentation..."
- [x] PASS: Error state displays "Deck not found or access denied." in red-500 with "Back to presentations" link to `/slides`
