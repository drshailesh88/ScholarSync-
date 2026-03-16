# slides-ai — Spec 013

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 22. Agent State Management (Slides Store)
- [x] PASS: `addAgentChatMessage(msg)` — adds to history
- [x] PASS: `markChatMessageApplied(msgId)` — marks changes as applied
- [x] PASS: `clearAgentChatHistory()` — clears all messages
- [x] PASS: `agentPanelOpen`: boolean — controls Gamma agent panel visibility
- [x] PASS: `setAgentPanelOpen(v)` — toggle agent panel
- [x] PASS: `rightPanel` options include "agent" alongside properties, comments, etc.
#### Detailed QA Coverage
- [x] PASS: `SlidesAgentPanel` reads context from `getActiveSlide()`, `getSelectedBlock()`, and `getPrimarySelectedBlockIndex()` on every render instead of caching selection locally
- [x] PASS: Slides agent quick-action set is derived from the selected block type and recalculates when selection changes
- [x] PASS: Slides agent context badge icon returns `null` when no recognized block type is selected
- [x] PASS: Slides agent input is focused on mount via `inputRef.current?.focus()`
- [x] PASS: Slides agent textarea auto-resizes up to 120px height while typing
- [x] PASS: Sending a slides-agent message resets the textarea height back to `auto`
- [x] PASS: Slides agent ignores send attempts when `deckId` is missing
- [x] PASS: Slides agent trims whitespace and ignores empty prompts
- [x] PASS: Slash command parsing only maps `/learn ` to `learn` and `/draft ` to `draft`
- [x] PASS: `/visual ` and `/illustrate ` are kept in `chat` mode and passed through as prompt text hints
- [x] PASS: Slides agent includes only the last 10 chat messages in the API request context
- [x] PASS: In chat mode, slides agent sends `slides`, `activeSlideId`, `audienceType`, and `chatHistory` with the prompt
- [x] PASS: When a block is selected, slides agent also sends `selectedBlockIndex`, `selectedBlockType`, and serialized `selectedBlockContent`
- [x] PASS: In legacy `learn` and `draft` modes, slides agent sends `slideContent` for the active slide instead of full block context
- [x] PASS: Slides agent normalizes `/learn` responses by appending a `Suggested papers:` list when `papers` are returned
- [x] PASS: Slides agent normalizes `/draft` responses by converting generated content blocks into one slide-level suggested change targeting the active slide
- [x] PASS: Slides agent simulates streaming locally by revealing assistant text word-by-word with a ~20ms delay
- [x] PASS: While simulated streaming is in progress, assistant text is held in `streamedText` and not yet added to `agentChatHistory`
- [x] PASS: Slides agent request failures surface as an assistant chat message with `Something went wrong: ... Please try again.`
- [x] PASS: Applying a suggested block-level change replaces only the targeted block index inside that slide’s `contentBlocks`
- [x] PASS: Applying a suggested slide-level change calls `updateSlide(change.slideId, slideChanges)` directly
- [x] PASS: Single-change apply filters suggestions down to the active slide when one is active
- [x] PASS: `Apply to All` uses the full suggested-change list without active-slide filtering
- [x] PASS: Applied suggestion sets are tracked by `markApplied(msgId)` in store-backed chat history
- [x] PASS: `agentChatHistory` is capped to the last 50 messages through the slides store
- [x] PASS: `GammaModeLayout` opens `OutlineGenerator` whenever `slides.length === 0`, regardless of whether create mode was entered from the full-screen selector or the toolbar toggle
- [x] PASS: Gamma layout right panel width is `w-[360px]`, not a generic `w-80`
- [x] PASS: `GammaToolbar` title button shows `Untitled Deck` when the deck title is empty
- [x] PASS: Entering gamma-toolbar title edit mode seeds `titleDraft` from the latest store title before focusing the input
