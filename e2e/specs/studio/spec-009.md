# studio — Spec 009

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Empty references state text reads `Use Cmd+Shift+C to add citations`
- [x] PASS: References preview list shows only the first 5 cited references sorted by reference number
- [x] PASS: Reference preview cards show `[n]`, truncated title, and first-author family name or `Unknown`
- [x] PASS: `View all X references` appears only when there are more than 5 references
- [x] PASS: Clicking `View all X references` opens the full Reference Sidebar
- [x] PASS: AI Credits bar uses `tokens_used` over `tokens_limit` from `getUserUsageStats()`
- [x] PASS: If usage stats fail to load, the credits bar falls back to `0 / 50000`
- [x] PASS: Write-mode AI intensity header is visible only when `isLearnMode === false`
- [x] PASS: Write-mode intensity options are exactly `Focus`, `Collaborate`, and `Accelerate`
- [x] PASS: Active `Focus` chip uses sky styling, `Collaborate` uses brand styling, and `Accelerate` uses violet styling
- [x] PASS: Inactive intensity chips use muted text with hover color only
- [x] PASS: Write-mode description line below the chips updates to `DRAFT_MODE_DESCRIPTIONS[draftIntensity]`
- [x] PASS: Default draft intensity is `collaborate`
- [x] PASS: Learn-mode header is visible only when `isLearnMode === true`
- [x] PASS: Learn-mode helper text reads `Guide Mode — I won't write for you — I'll teach you how`
- [x] PASS: Guide document-type button defaults to `Select document type`
- [x] PASS: Guide document-type picker closes immediately after selecting a type
- [x] PASS: Stage tracker is hidden until a guide document type has been selected
- [x] PASS: Stage tracker completion styling depends only on array order, not on any persisted progress
- [x] PASS: Guide stages are clickable in non-linear order and simply update local `guideStage`
- [x] PASS: Switching between Write and Learn mode does not clear the current chat transcript
- [x] PASS: Switching between Write and Learn mode changes the outgoing `/api/chat` mode between `draft` and `learn`
- [x] PASS: Chat placeholder reads `Ask your AI research assistant...` in Write mode
- [x] PASS: Chat placeholder reads `Ask me to challenge your thinking...` in Learn mode
- [x] PASS: Chat send button is disabled while loading or when the trimmed input is empty
- [x] PASS: Submitting chat appends the user message locally before the network request starts
- [x] PASS: First successful chat submit creates a conversation through `createConversation(...)`
- [x] PASS: Conversation title is the first 80 characters of the initial prompt
- [x] PASS: User messages are persisted through `addMessage(...)` in the background and failures are ignored
- [x] PASS: Assistant responses stream from `/api/chat` into a placeholder assistant bubble
- [x] PASS: If `/api/chat` returns non-OK, the panel shows `data.error` or `Chat failed`
- [x] PASS: If the response body is missing, chat shows `No response stream`
- [x] PASS: Transport-level chat failures show `Failed to send message. Check your API key.`
- [x] PASS: Assistant loading placeholder uses three bouncing dots inside a brand-tinted bubble
- [x] PASS: Chat panel auto-scrolls to the bottom whenever `messages` changes
