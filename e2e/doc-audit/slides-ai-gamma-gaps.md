# Slides AI / Gamma — Feature Doc Gaps

**Original doc:** `SLIDES_AI_GAMMA_FEATURES_TESTING.md`
**Original checkbox count:** 318
**Features found in UI:** 372
**Features found in source code:** 415
**Missing from doc:** 97
**Completeness of original doc:** 76.6%

## Missing Features

### Detailed QA Coverage
- [ ] Real `SlidesAgentPanel` request shaping, slash-command parsing, simulated word-by-word streaming, suggestion-apply behavior, textarea autofocus/auto-resize, and history trimming
- [ ] Gamma layout’s actual empty-state behavior, including `OutlineGenerator` replacing the three-panel card workspace until slides exist
- [ ] Gamma-toolbar details for editable title commits/reverts, save-dot tooltip behavior, click-outside dropdown dismissal, export error handling, and confirm-before-switching to Slides mode
- [ ] Outline-generator step defaults, ten-audience grid, 3–20 card slider, inline error handling, outline editing controls, and newline-delimited generation stream processing
- [ ] Gamma agent’s true quick-action behavior, request payloads, store mutation flow for modified/new slides, and error rendering
- [ ] Card-outline and card-stack behaviors for truncated labels, limited row-menu actions, hover-only insert buttons, active-card-only controls, and keyboard activation

## Features in doc that DON'T EXIST in the app
- In Slides-mode AI chat, `/visual` and `/illustrate` are not separate backend modes; they remain chat-mode prompts.
- Gamma quick-action chips do not immediately send a request; they only prefill the input.
- Gamma mode does not always render the three-panel card layout; zero-slide decks show the outline generator instead.
- Gamma export failures do not show inline banners or toasts; they surface through `alert()`.
- Switching from Gamma to Slides mode uses a browser confirmation dialog, not a custom in-app modal.
- The Gamma agent panel is controlled by `agentPanelOpen`, not by `rightPanel`.
- The card-outline sidebar does not expose a full filmstrip-style context menu; its local menu only contains `Duplicate` and `Delete`.
