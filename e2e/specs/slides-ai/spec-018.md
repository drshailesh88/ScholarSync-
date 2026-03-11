# slides-ai — Spec 018

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### API Route Validation & Error Shapes
- [ ] 500 response: `{ error: "Slide regeneration failed" }`
- [ ] Uses provider-dependent `getSmallModel()`; with the default Anthropic provider this resolves to `"claude-haiku-4-5-20251001"`
- [ ] `action` field min 1 char, `contentBlocks` min 1 item
- [ ] Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`
- [ ] 500 response: `{ error: "Slide editing failed" }`
- [ ] `slides` array validated min 1, max 100
- [ ] `audienceType` is enum-validated (same 10 values as generate-stream)
- [ ] Prompt/type contract allows `suggestions[].autoFixAvailable?: boolean`, but the coach route does not Zod-validate that response field
- [ ] 500 response: `{ error: "Coach evaluation failed" }`
- [ ] Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right", footerText }`
- [ ] Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
- [ ] Uses 4 slide masters: `"BRANDED"`, `"TITLE_MASTER"`, `"SECTION_MASTER"`, `"CONTENT_MASTER"`
- [ ] Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
- [ ] 400 response includes `{ error: "At least one slide is required" }` for empty slides array
- [ ] `layout` validated as enum: `"full_slide" | "two_up" | "three_up_notes" | "six_up" | "outline"` (default `"full_slide"`)
- [ ] `paperSize` validated as `"letter" | "a4"` (default `"letter"`)
- [ ] `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true
- [ ] Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
- [ ] Filename pattern: `${safeTitle}_handout.pdf`
#### Gamma Export Helper (`export-deck.ts`)
- [ ] Only PPTX format receives `themeConfig` in the request body; PDF does not
- [ ] Fallback title for empty titles: `"Untitled Deck"` in request, `"deck"` in filename
- [ ] Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, "_")`
- [ ] Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)
#### SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)
- [ ] Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line "Clicking a chip sends the action as a message")
- [ ] Input placeholder changes dynamically: `"Edit this ${selectedBlockType} block..."` when block selected, `"Ask the AI to change your slides..."` otherwise
- [ ] Suggested changes panel header shows `"N change suggested"` / `"N changes suggested"` with singular/plural
- [ ] "Apply to All" button only rendered when `msg.suggestedChanges.length > 1`
- [ ] "Apply" button uses `ArrowRight` icon (size 10), "Apply to All" uses `ArrowsOutSimple` icon (size 10)
- [ ] Empty state (no messages, not loading, no stream) shows centered text: "Ask the AI to modify your slides, or pick a quick action above." and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`
- [ ] Send button `aria-label="Send message"`
- [ ] Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`
- [ ] User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]
- [ ] Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]
#### GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)
- [ ] Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`
- [ ] Header label is `"AI Agent"` with Sparkle icon size 16 weight fill (not "AI Chat" as in Slides mode)
