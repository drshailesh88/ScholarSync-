# presentation — Spec 021

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Detailed QA Coverage
- [x] PASS: Coach panel empty state includes descriptive helper copy and a `Run Coach` CTA
- [x] PASS: Successful coach response replaces the CTA state with score bars, suggestions, and per-slide insights
- [x] PASS: Coach suggestions are sorted by priority and capped to the top five items
- [x] PASS: Slide insights navigate to the referenced slide by calling `onNavigateToSlide`
- [x] PASS: `AgentPanel` starts with six quick-action buttons when no chat history exists
- [x] PASS: Agent quick actions disappear once there is at least one message in chat history
- [x] PASS: Agent messages can include `modifiedSlideIds`, which are displayed back to the user in the agent response bubble
- [x] PASS: Agent undo only resets the panel-local `canUndo` state and triggers `onSlidesUpdated()`; it does not restore the prior slide snapshot client-side
- [x] PASS: Agent command input trims whitespace before submission
- [x] PASS: Agent errors are both shown inline and appended as agent chat messages prefixed with `Error:`
- [x] PASS: Defense Prep configuration opens before any Q&A messages are shown
- [x] PASS: Defense Prep default difficulty is `moderate`
- [x] PASS: Defense Prep starts with no focus areas selected
- [x] PASS: Starting a defense session clears prior messages, summary, revealed answers, and question count before fetching the first question
- [x] PASS: Defense Prep API request omits `focusAreas` when none are selected
- [x] PASS: Reviewer messages can prepend `evaluation` text before the generated question
- [x] PASS: Ending a defense session computes a local summary instead of requesting one from the server
- [x] PASS: Resetting the defense session returns the panel to the configuration screen
- [x] PASS: `CommentsPanel` loads all comments on mount via `getComments(deckId)`
- [x] PASS: Comments filter modes are exactly `all`, `unresolved`, and `resolved`
- [x] PASS: Under the `all` filter, the active slide section is still shown even when it has zero comments
- [x] PASS: Comments empty state shows `No comments yet` plus helper copy `Comments on slides will appear here`
- [x] PASS: `useCommentCounts()` silently ignores load errors and exposes `counts`, `totalUnresolved`, and `refresh`
- [x] PASS: `CommentsPanel` close button is local to the slide-over header and does not affect other editor state
- [x] PASS: `SharePanel` loads current settings on mount and shows `Loading share settings...` while waiting
- [x] PASS: Share toggle uses a custom pill switch rather than a checkbox
- [x] PASS: Enabling sharing calls `enableDeckSharing(deckId)` and immediately stores the returned `shareUrl`
- [x] PASS: Disabling sharing calls `disableDeckSharing(deckId)` and flips only `shareEnabled` locally
- [x] PASS: Share link input is read-only and paired with a `Copy` button
- [x] PASS: Copy success swaps the button content to `Copied` for two seconds
- [x] PASS: Expiration date input sets `min` to today's date string in local ISO format
- [x] PASS: Share settings save button remains visible only while sharing is enabled and a share URL exists
- [x] PASS: Share-panel failures are logged to console only and do not surface an inline error message
- [x] PASS: `AnalyticsPanel` fetches `/api/analytics/deck-stats?deckId={id}` on mount
- [x] PASS: Analytics loading state shows spinner plus text `Loading analytics...`
