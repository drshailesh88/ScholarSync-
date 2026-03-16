# slides-ai — Spec 018

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/slides/ai
MODULE: slides-ai

---
#### API Route Validation & Error Shapes
- [x] PASS: 500 response: `{ error: "Slide regeneration failed" }`
- [x] PASS: Uses provider-dependent `getSmallModel()`; with the default Anthropic provider this resolves to `"claude-haiku-4-5-20251001"`
- [x] PASS: `action` field min 1 char, `contentBlocks` min 1 item
- [x] PASS: Each of the 14 AI actions has a distinct system prompt from `getSlideEditorSystemPrompt(action)`
- [x] PASS: 500 response: `{ error: "Slide editing failed" }`
- [x] PASS: `slides` array validated min 1, max 100
- [x] PASS: `audienceType` is enum-validated (same 10 values as generate-stream)
- [x] PASS: Prompt/type contract allows `suggestions[].autoFixAvailable?: boolean`, but the coach route does not Zod-validate that response field
- [x] PASS: 500 response: `{ error: "Coach evaluation failed" }`
- [x] PASS: Supports `institutionKit` in request: `{ name, logoUrl, logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right", footerText }`
- [x] PASS: Response headers: `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
- [x] PASS: Uses 4 slide masters: `"BRANDED"`, `"TITLE_MASTER"`, `"SECTION_MASTER"`, `"CONTENT_MASTER"`
- [x] PASS: Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
- [x] PASS: 400 response includes `{ error: "At least one slide is required" }` for empty slides array
- [x] PASS: `layout` validated as enum: `"full_slide" | "two_up" | "three_up_notes" | "six_up" | "outline"` (default `"full_slide"`)
- [x] PASS: `paperSize` validated as `"letter" | "a4"` (default `"letter"`)
- [x] PASS: `includeSlideNumbers`, `includeHeader`, `includeSpeakerNotes` all default true
- [x] PASS: Rate limited via `checkRateLimit(userId, "export", RATE_LIMITS.export)`
- [x] PASS: Filename pattern: `${safeTitle}_handout.pdf`
#### Gamma Export Helper (`export-deck.ts`)
- [x] PASS: Only PPTX format receives `themeConfig` in the request body; PDF does not
- [x] PASS: Fallback title for empty titles: `"Untitled Deck"` in request, `"deck"` in filename
- [x] PASS: Filename sanitization: `replace(/[^a-zA-Z0-9_-]/g, "_")`
- [x] PASS: Cleanup of blob URL uses `requestAnimationFrame` (not synchronous)
#### SlidesAgentPanel — Additional Details (`slides-agent-panel.tsx`)
- [x] PASS: Quick action chips in Slides mode SET INPUT TEXT and focus only — they do NOT auto-send (contradicts original doc Section 3 line "Clicking a chip sends the action as a message")
- [x] PASS: Input placeholder changes dynamically: `"Edit this ${selectedBlockType} block..."` when block selected, `"Ask the AI to change your slides..."` otherwise
- [x] PASS: Suggested changes panel header shows `"N change suggested"` / `"N changes suggested"` with singular/plural
- [x] PASS: "Apply to All" button only rendered when `msg.suggestedChanges.length > 1`
- [x] PASS: "Apply" button uses `ArrowRight` icon (size 10), "Apply to All" uses `ArrowsOutSimple` icon (size 10)
- [x] PASS: Empty state (no messages, not loading, no stream) shows centered text: "Ask the AI to modify your slides, or pick a quick action above." and slash command hints: `/learn`, `/draft`, `/visual`, `/illustrate`
- [x] PASS: Send button `aria-label="Send message"`
- [x] PASS: Textarea `disabled={isLoading}`, send button `disabled={isLoading || !input.trim()}`
- [x] PASS: User messages styled: `bg-brand text-white rounded-br-sm`, max-w-[85%]
- [x] PASS: Assistant messages styled: `bg-surface-raised text-ink border border-border rounded-bl-sm`, max-w-[85%]
#### GammaAgentPanel — Additional Details (`gamma-agent-panel.tsx`)
- [x] PASS: Gamma agent uses LOCAL React state (`useState`) for chat messages, NOT the store's `agentChatHistory`
- [x] PASS: Header label is `"AI Agent"` with Sparkle icon size 16 weight fill (not "AI Chat" as in Slides mode)
