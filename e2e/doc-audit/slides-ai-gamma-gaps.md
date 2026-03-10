# Slides AI / Gamma — Feature Doc Gaps

**Original doc:** `SLIDES_AI_GAMMA_FEATURES_TESTING.md`
**Original checkbox count:** 318
**After Codex pass 1:** 523
**After Claude Code pass 2:** 604 (189 new checks)

## Pass 2 Coverage Areas

### New sections added:
- SlidesWorkspace loading/error states (8 checks)
- Slides store additional state & defaults (27 checks)
- SlidesModeLayout additional panels & exports (14 checks)
- API route validation & error shapes — 9 routes (42 checks)
- Gamma export helper details (4 checks)
- SlidesAgentPanel additional details (10 checks)
- GammaAgentPanel additional details (8 checks)
- CardSparkleMenu additional details (7 checks)
- CardBackgroundPicker additional details (12 checks)
- CardEditor additional details (5 checks)
- CardStack additional details (6 checks)
- OutlineGenerator additional details (17 checks)
- ThemeCustomizer additional details (4 checks)
- SmartLayoutPicker additional details (4 checks)
- ModeSelector additional details (5 checks)
- BlockInserterMenu additional details (5 checks)
- Behavior corrections pass 2 (11 checks)

### Key discoveries:
- All 9 API routes have Zod validation with exact field constraints, 3 distinct error status codes (401/400/500), and rate limiting
- SlidesWorkspace has loading/error states not previously documented
- Store has extensive undo/redo, clipboard, and debounced save mechanics
- SlidesModeLayout exports include PNG (2x/3x), SVG, All-PNG-as-ZIP, and PDF handout with layout options
- GammaAgentPanel uses local state (not store agentChatHistory)
- 11 behavior corrections identified (accent bar height, ring size, chip behavior, etc.)

## Features in doc that DON'T EXIST in the app
- In Slides-mode AI chat, `/visual` and `/illustrate` are not separate backend modes; they remain chat-mode prompts.
- Gamma quick-action chips do not immediately send a request; they only prefill the input.
- Slides-mode quick-action chips also only prefill input (same behavior, contradicts original doc).
- Gamma mode does not always render the three-panel card layout; zero-slide decks show the outline generator instead.
- Gamma export failures do not show inline banners or toasts; they surface through `alert()`.
- Switching from Gamma to Slides mode uses a browser confirmation dialog, not a custom in-app modal.
- The Gamma agent panel is controlled by `agentPanelOpen`, not by `rightPanel`.
- The card-outline sidebar does not expose a full filmstrip-style context menu; its local menu only contains `Duplicate` and `Delete`.
- CardSparkleMenu silently swallows errors (no user-facing error message).
- Card accent bar is h-1 (4px), not 1px as original doc stated.
- Active card ring is ring-1, not ring-2 as original doc stated.
- Theme swatches in outline wizard use flex-wrap, not 4-column grid.
- ThemeCustomizer small swatch check badge is bottom-right, not top-right.
- Server allows cardCount up to 30, UI limits to 20.
- No loading.tsx or error.tsx route-level files exist under slides/.
