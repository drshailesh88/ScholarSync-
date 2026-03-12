# studio — Spec 014

STATUS: COMPLETE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://127.0.0.1:3002/studio
MODULE: studio

---
### Quick Test Workflows
#### Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)
- [x] Slash command "Image": description "Insert an image", icon `image`, category `academic`, creates hidden `<input type="file" accept="image/*">`, reads file as DataURL, inserts via `setImage({ src })`
  RESULT: PASS — Test-backed command execution created the hidden image input, read a DataURL, and called `setImage({ src })`.
- [x] Slash command "Abstract": description "Structured abstract (Background, Methods, Results, Conclusion)", icon `academic`, category `academic`, inserts H2 "Abstract" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `
  RESULT: PASS — Unit coverage confirmed the command inserts the exact structured abstract block set.
- [x] Slash command "Figure Caption": description "Insert a figure caption with numbering", icon `image`, category `academic`, counts existing `Figure \d+` paragraphs and inserts bold `Figure {N+1}. ` + "Caption text here"
  RESULT: PASS — Test-backed command execution counted existing figure captions and inserted the next numbered caption.
- [x] Slash command "Table Caption": description "Insert a table caption with numbering", icon `table`, category `academic`, counts existing `Table \d+` paragraphs and inserts bold `Table {N+1}. ` + "Caption text here"
  RESULT: PASS — Test-backed command execution counted existing table captions and inserted the next numbered caption.
- [x] Slash command "Footnote": description "Add a footnote reference", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`
  RESULT: PASS — Unit coverage confirmed the command prompts for text and forwards the result to `insertFootnote`.
- [x] Slash command "Cite": description "Insert a citation from your library", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`
  RESULT: PASS — Live browser execution through the slash menu opened the citation dialog, and unit coverage confirmed the event name.
- [x] Slash command "Continue Writing": description "AI continues from cursor", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: "continue"` and `context: editor.getText()`
  RESULT: PASS — Command tests confirmed the dispatched event payload includes `action: "continue"` and the full editor text context.
- [x] Slash command "Outline Section": description "AI generates bullet outline", icon `ai`, category `ai`, dispatches `action: "outline-section"`
  RESULT: PASS — Command tests confirmed the dispatched event payload uses `action: "outline-section"`.
- [x] Slash command "Check Guidelines": description "Run reporting guideline check", icon `ai`, category `ai`, dispatches `action: "check-guidelines"`
  RESULT: PASS — Command tests confirmed the dispatched event payload uses `action: "check-guidelines"`.
- [x] Slash command "Ask AI": description "Ask a question (no edits)", icon `ai`, category `ai`, dispatches `action: "ask"` with no context
  RESULT: PASS — Command tests confirmed the event is dispatched with `action: "ask"` and no extra context.
- [x] Slash command "Word Count": description "Show section word counts", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: "show-word-count"`
  RESULT: PASS — Live browser execution through the slash menu posted the word-count assistant message, and unit coverage confirmed the exact event payload.
- [x] `filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching
  RESULT: PASS — Unit coverage exercised the extension’s `suggestion.items()` callback and confirmed case-insensitive `includes` matching on title, description, and category.

#### Slash Menu UI (`src/components/editor/SlashMenu.tsx`)
- [x] Empty filter results render "No commands found" text centered in `py-4`
  RESULT: PASS — Typing `/zzz` in the live editor rendered the exact `No commands found` empty state.
- [x] Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)
  RESULT: PASS — Live DOM inspection confirmed the menu container classes include `w-80 max-h-[400px] overflow-y-auto`.
- [x] Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`
  RESULT: PASS — Live browser output showed all four uppercase category labels in the rendered menu.
- [x] Category header shown only when category changes between adjacent items (not repeated per item)
  RESULT: PASS — Live menu inspection showed category headers only at group boundaries rather than repeating above every item.
- [x] Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])
  RESULT: PASS — Live DOM inspection confirmed the item and icon-box class names, and the rendered menu showed title, description, and shortcut text where applicable.
- [x] AI icon items (`icon === "ai"`) use `weight="fill"` on the Sparkle icon; others use `weight="regular"`
  RESULT: PASS — Code audit of `SlashMenu.tsx` confirmed AI items render `Sparkle` with `weight="fill"` while non-AI icons use `regular`.
- [x] Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`
  RESULT: PASS — Live DOM inspection of the selected menu item showed `bg-brand/10 text-brand` on the row and `bg-brand/15` on the icon box.
- [x] Slash menu uses tippy.js for positioning with `placement: "bottom-start"` and `offset: [0, 4]`
  RESULT: PASS — Code audit confirmed the renderer creates the popup with tippy `placement: "bottom-start"` and `offset: [0, 4]`.
- [x] Escape key in slash menu hides the tippy popup
  RESULT: PASS — Pressing Escape in the live slash menu closed the popup while leaving the slash text in the editor.
- [x] Arrow Up/Down wraps around (modular arithmetic on index)
  RESULT: PASS — Live browser automation showed ArrowUp from the first item wrapped to `Word Count`, and ArrowDown wrapped back to `Text`.

#### AI Action Handlers — page.tsx event switch
- [x] `outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\n\n{context}`
  RESULT: PASS — Code audit of the `/studio` AI action switch confirmed the exact prompt string.
- [x] `check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n{context}`
  RESULT: PASS — Code audit of the `/studio` AI action switch confirmed the exact prompt string.
- [x] `precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n{context}`
  RESULT: PASS — Code audit of the `/studio` AI action switch confirmed the exact prompt string.
- [x] `cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`
  RESULT: PASS — Code audit of the `/studio` AI action switch confirmed the exact prompt string.
- [x] `ask` handler focuses chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]` after a `setTimeout(..., 0)`
  RESULT: PASS — Live browser execution confirmed `ask` focuses the chat input, and code audit confirmed the exact selector and zero-delay timeout.

#### Chat API Route (`src/app/api/chat/route.ts`)
- [x] Zod schema validates messages as array max 50 items, each with `role` enum `["user", "assistant", "system"]` and `content` string max 50,000 chars
  RESULT: PASS — Route tests now cover both `>50` messages and `>50,000` character content, and the schema matches the spec exactly.
- [x] Auth failure returns 401 with `{ error: "Authentication required." }`
  RESULT: PASS — Route tests verified the 401 response and exact error string.
- [x] Validation failure returns 400 with `{ error: "Invalid request. Please check your input and try again." }`
  RESULT: PASS — Route tests verified the 400 response and exact validation error message.
- [x] AI not configured returns 503 with `{ error: "AI service is not configured. Please contact an administrator." }`
  RESULT: PASS — Route tests verified the 503 response and exact error string.
- [x] Unhandled error returns 500 with `{ error: "An unexpected error occurred. Please try again." }`
  RESULT: PASS — Route tests verified the 500 response and exact fallback error string when `streamText` throws.
- [x] Rate limiting checked with `checkRateLimit(userId, "chat", RATE_LIMITS.ai)` before processing
  RESULT: PASS — Route tests verified the exact `checkRateLimit` call signature.
- [x] When `mode` is neither `"learn"` nor `"draft"`, standard assistant system prompt used: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
  RESULT: PASS — Route tests verified the exact default system prompt for unsupported mode values.
- [x] Response produced via `streamText` from `"ai"` SDK, returned as `result.toTextStreamResponse()`
  RESULT: PASS — Route tests verified the handler calls `streamText(...)` and returns the resulting text stream response.
