# slides-ai — Spec 013

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### 22. Agent State Management (Slides Store)
- [ ] `addAgentChatMessage(msg)` — adds to history
- [ ] `markChatMessageApplied(msgId)` — marks changes as applied
- [ ] `clearAgentChatHistory()` — clears all messages
- [ ] `agentPanelOpen`: boolean — controls Gamma agent panel visibility
- [ ] `setAgentPanelOpen(v)` — toggle agent panel
- [ ] `rightPanel` options include "agent" alongside properties, comments, etc.
#### Detailed QA Coverage
- [ ] `SlidesAgentPanel` reads context from `getActiveSlide()`, `getSelectedBlock()`, and `getPrimarySelectedBlockIndex()` on every render instead of caching selection locally
- [ ] Slides agent quick-action set is derived from the selected block type and recalculates when selection changes
- [ ] Slides agent context badge icon returns `null` when no recognized block type is selected
- [ ] Slides agent input is focused on mount via `inputRef.current?.focus()`
- [ ] Slides agent textarea auto-resizes up to 120px height while typing
- [ ] Sending a slides-agent message resets the textarea height back to `auto`
- [ ] Slides agent ignores send attempts when `deckId` is missing
- [ ] Slides agent trims whitespace and ignores empty prompts
- [ ] Slash command parsing only maps `/learn ` to `learn` and `/draft ` to `draft`
- [ ] `/visual ` and `/illustrate ` are kept in `chat` mode and passed through as prompt text hints
- [ ] Slides agent includes only the last 10 chat messages in the API request context
- [ ] In chat mode, slides agent sends `slides`, `activeSlideId`, `audienceType`, and `chatHistory` with the prompt
- [ ] When a block is selected, slides agent also sends `selectedBlockIndex`, `selectedBlockType`, and serialized `selectedBlockContent`
- [ ] In legacy `learn` and `draft` modes, slides agent sends `slideContent` for the active slide instead of full block context
- [ ] Slides agent normalizes `/learn` responses by appending a `Suggested papers:` list when `papers` are returned
- [ ] Slides agent normalizes `/draft` responses by converting generated content blocks into one slide-level suggested change targeting the active slide
- [ ] Slides agent simulates streaming locally by revealing assistant text word-by-word with a ~20ms delay
- [ ] While simulated streaming is in progress, assistant text is held in `streamedText` and not yet added to `agentChatHistory`
- [ ] Slides agent request failures surface as an assistant chat message with `Something went wrong: ... Please try again.`
- [ ] Applying a suggested block-level change replaces only the targeted block index inside that slide’s `contentBlocks`
- [ ] Applying a suggested slide-level change calls `updateSlide(change.slideId, slideChanges)` directly
- [ ] Single-change apply filters suggestions down to the active slide when one is active
- [ ] `Apply to All` uses the full suggested-change list without active-slide filtering
- [ ] Applied suggestion sets are tracked by `markApplied(msgId)` in store-backed chat history
- [ ] `agentChatHistory` is capped to the last 50 messages through the slides store
- [ ] `GammaModeLayout` opens `OutlineGenerator` whenever `slides.length === 0`, regardless of whether create mode was entered from the full-screen selector or the toolbar toggle
- [ ] Gamma layout right panel width is `w-[360px]`, not a generic `w-80`
- [ ] `GammaToolbar` title button shows `Untitled Deck` when the deck title is empty
- [ ] Entering gamma-toolbar title edit mode seeds `titleDraft` from the latest store title before focusing the input
