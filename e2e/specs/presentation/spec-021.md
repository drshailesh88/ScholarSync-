# presentation — Spec 021

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [ ] Coach panel empty state includes descriptive helper copy and a `Run Coach` CTA
- [ ] Successful coach response replaces the CTA state with score bars, suggestions, and per-slide insights
- [ ] Coach suggestions are sorted by priority and capped to the top five items
- [ ] Slide insights navigate to the referenced slide by calling `onNavigateToSlide`
- [ ] `AgentPanel` starts with six quick-action buttons when no chat history exists
- [ ] Agent quick actions disappear once there is at least one message in chat history
- [ ] Agent messages can include `modifiedSlideIds`, which are displayed back to the user in the agent response bubble
- [ ] Agent undo only resets the panel-local `canUndo` state and triggers `onSlidesUpdated()`; it does not restore the prior slide snapshot client-side
- [ ] Agent command input trims whitespace before submission
- [ ] Agent errors are both shown inline and appended as agent chat messages prefixed with `Error:`
- [ ] Defense Prep configuration opens before any Q&A messages are shown
- [ ] Defense Prep default difficulty is `moderate`
- [ ] Defense Prep starts with no focus areas selected
- [ ] Starting a defense session clears prior messages, summary, revealed answers, and question count before fetching the first question
- [ ] Defense Prep API request omits `focusAreas` when none are selected
- [ ] Reviewer messages can prepend `evaluation` text before the generated question
- [ ] Ending a defense session computes a local summary instead of requesting one from the server
- [ ] Resetting the defense session returns the panel to the configuration screen
- [ ] `CommentsPanel` loads all comments on mount via `getComments(deckId)`
- [ ] Comments filter modes are exactly `all`, `unresolved`, and `resolved`
- [ ] Under the `all` filter, the active slide section is still shown even when it has zero comments
- [ ] Comments empty state shows `No comments yet` plus helper copy `Comments on slides will appear here`
- [ ] `useCommentCounts()` silently ignores load errors and exposes `counts`, `totalUnresolved`, and `refresh`
- [ ] `CommentsPanel` close button is local to the slide-over header and does not affect other editor state
- [ ] `SharePanel` loads current settings on mount and shows `Loading share settings...` while waiting
- [ ] Share toggle uses a custom pill switch rather than a checkbox
- [ ] Enabling sharing calls `enableDeckSharing(deckId)` and immediately stores the returned `shareUrl`
- [ ] Disabling sharing calls `disableDeckSharing(deckId)` and flips only `shareEnabled` locally
- [ ] Share link input is read-only and paired with a `Copy` button
- [ ] Copy success swaps the button content to `Copied` for two seconds
- [ ] Expiration date input sets `min` to today's date string in local ISO format
- [ ] Share settings save button remains visible only while sharing is enabled and a share URL exists
- [ ] Share-panel failures are logged to console only and do not surface an inline error message
- [ ] `AnalyticsPanel` fetches `/api/analytics/deck-stats?deckId={id}` on mount
- [ ] Analytics loading state shows spinner plus text `Loading analytics...`
