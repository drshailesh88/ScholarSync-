# studio — Spec 009

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Empty references state text reads `Use Cmd+Shift+C to add citations`
- [ ] References preview list shows only the first 5 cited references sorted by reference number
- [ ] Reference preview cards show `[n]`, truncated title, and first-author family name or `Unknown`
- [ ] `View all X references` appears only when there are more than 5 references
- [ ] Clicking `View all X references` opens the full Reference Sidebar
- [ ] AI Credits bar uses `tokens_used` over `tokens_limit` from `getUserUsageStats()`
- [ ] If usage stats fail to load, the credits bar falls back to `0 / 50000`
- [ ] Write-mode AI intensity header is visible only when `isLearnMode === false`
- [ ] Write-mode intensity options are exactly `Focus`, `Collaborate`, and `Accelerate`
- [ ] Active `Focus` chip uses sky styling, `Collaborate` uses brand styling, and `Accelerate` uses violet styling
- [ ] Inactive intensity chips use muted text with hover color only
- [ ] Write-mode description line below the chips updates to `DRAFT_MODE_DESCRIPTIONS[draftIntensity]`
- [ ] Default draft intensity is `collaborate`
- [ ] Learn-mode header is visible only when `isLearnMode === true`
- [ ] Learn-mode helper text reads `Guide Mode — I won't write for you — I'll teach you how`
- [ ] Guide document-type button defaults to `Select document type`
- [ ] Guide document-type picker closes immediately after selecting a type
- [ ] Stage tracker is hidden until a guide document type has been selected
- [ ] Stage tracker completion styling depends only on array order, not on any persisted progress
- [ ] Guide stages are clickable in non-linear order and simply update local `guideStage`
- [ ] Switching between Write and Learn mode does not clear the current chat transcript
- [ ] Switching between Write and Learn mode changes the outgoing `/api/chat` mode between `draft` and `learn`
- [ ] Chat placeholder reads `Ask your AI research assistant...` in Write mode
- [ ] Chat placeholder reads `Ask me to challenge your thinking...` in Learn mode
- [ ] Chat send button is disabled while loading or when the trimmed input is empty
- [ ] Submitting chat appends the user message locally before the network request starts
- [ ] First successful chat submit creates a conversation through `createConversation(...)`
- [ ] Conversation title is the first 80 characters of the initial prompt
- [ ] User messages are persisted through `addMessage(...)` in the background and failures are ignored
- [ ] Assistant responses stream from `/api/chat` into a placeholder assistant bubble
- [ ] If `/api/chat` returns non-OK, the panel shows `data.error` or `Chat failed`
- [ ] If the response body is missing, chat shows `No response stream`
- [ ] Transport-level chat failures show `Failed to send message. Check your API key.`
- [ ] Assistant loading placeholder uses three bouncing dots inside a brand-tinted bubble
- [ ] Chat panel auto-scrolls to the bottom whenever `messages` changes
