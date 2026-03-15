# studio — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Slash Commands — Full List (`src/components/editor/extensions/slash-commands.ts`)
- [x] PASS: Slash command "Image": description "Insert an image", icon `image`, category `academic`, creates hidden `<input type="file" accept="image/*">`, reads file as DataURL, inserts via `setImage({ src })`
- [x] PASS: Slash command "Abstract": description "Structured abstract (Background, Methods, Results, Conclusion)", icon `academic`, category `academic`, inserts H2 "Abstract" followed by bold labels `Background: `, `Methods: `, `Results: `, `Conclusion: `
- [x] PASS: Slash command "Figure Caption": description "Insert a figure caption with numbering", icon `image`, category `academic`, counts existing `Figure \d+` paragraphs and inserts bold `Figure {N+1}. ` + "Caption text here"
- [x] PASS: Slash command "Table Caption": description "Insert a table caption with numbering", icon `table`, category `academic`, counts existing `Table \d+` paragraphs and inserts bold `Table {N+1}. ` + "Caption text here"
- [x] PASS: Slash command "Footnote": description "Add a footnote reference", icon `footnote`, shortcut label `Cmd+Shift+F`, category `academic`, uses `prompt()` then `editor.commands.insertFootnote(text)`
- [x] PASS: Slash command "Cite": description "Insert a citation from your library", icon `academic`, shortcut label `Cmd+Shift+C`, category `academic`, dispatches `scholarsync:open-citation-dialog`
- [x] PASS: Slash command "Continue Writing": description "AI continues from cursor", icon `ai`, category `ai`, dispatches `scholarsync:ai-action` with `action: "continue"` and `context: editor.getText()`
- [x] PASS: Slash command "Outline Section": description "AI generates bullet outline", icon `ai`, category `ai`, dispatches `action: "outline-section"`
- [x] PASS: Slash command "Check Guidelines": description "Run reporting guideline check", icon `ai`, category `ai`, dispatches `action: "check-guidelines"`
- [x] PASS: Slash command "Ask AI": description "Ask a question (no edits)", icon `ai`, category `ai`, dispatches `action: "ask"` with no context
- [x] PASS: Slash command "Word Count": description "Show section word counts", icon `tools`, category `tools`, dispatches `scholarsync:editor-action` with `action: "show-word-count"`
- [x] PASS: `filterCommands` uses case-insensitive `includes` matching on title, description, and category — not fuzzy matching
#### Slash Menu UI (`src/components/editor/SlashMenu.tsx`)
- [x] PASS: Empty filter results render "No commands found" text centered in `py-4`
- [x] PASS: Slash menu max height `max-h-[400px]` with `overflow-y-auto`, width `w-80` (320px)
- [x] PASS: Slash menu items grouped by category with uppercase labels: `BASIC BLOCKS`, `ACADEMIC`, `AI TOOLS`, `DOCUMENT TOOLS`
- [x] PASS: Category header shown only when category changes between adjacent items (not repeated per item)
- [x] PASS: Each command item shows: 32px icon box (w-8 h-8 rounded-md), title (text-sm font-medium), description (text-[11px] text-ink-muted), optional shortcut label (text-[10px])
- [x] PASS: AI icon items (`icon === "ai"`) use `weight="fill"` on the Sparkle icon; others use `weight="regular"`
- [x] PASS: Selected item highlights with `bg-brand/10 text-brand` and icon box `bg-brand/15`
- [x] PASS: Slash menu uses tippy.js for positioning with `placement: "bottom-start"` and `offset: [0, 4]`
- [x] PASS: Escape key in slash menu hides the tippy popup
- [x] PASS: Arrow Up/Down wraps around (modular arithmetic on index)
#### AI Action Handlers — page.tsx event switch
- [x] PASS: `outline-section` handler prompt: `Create a concise bullet outline for the current section based on this draft:\n\n{context}`
- [x] PASS: `check-guidelines` handler prompt: `Review this draft against the most relevant reporting guideline checklist and list missing or weak items:\n\n{context}`
- [x] PASS: `precision-edit` handler prompt: `Improve the clarity, precision, and academic tone of this selected text while preserving meaning:\n\n{context}`
- [x] PASS: `cite` handler prompt: `Help me add a citation from my library. What paper should I cite here?`
- [x] PASS: `ask` handler focuses chat input by querying `input[placeholder*="AI research assistant"], input[placeholder*="challenge your thinking"]` after a `setTimeout(..., 0)`
#### Chat API Route (`src/app/api/chat/route.ts`)
- [x] PASS: Zod schema validates messages as array max 50 items, each with `role` enum `["user", "assistant", "system"]` and `content` string max 50,000 chars
- [x] PASS: Auth failure returns 401 with `{ error: "Authentication required." }`
- [x] PASS: Validation failure returns 400 with `{ error: "Invalid request. Please check your input and try again." }`
- [x] PASS: AI not configured returns 503 with `{ error: "AI service is not configured. Please contact an administrator." }`
- [x] PASS: Unhandled error returns 500 with `{ error: "An unexpected error occurred. Please try again." }`
- [x] PASS: Rate limiting checked with `checkRateLimit(userId, "chat", RATE_LIMITS.ai)` before processing
- [x] PASS: When `mode` is neither `"learn"` nor `"draft"`, standard assistant system prompt used: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
- [x] PASS: Response produced via `streamText` from `"ai"` SDK, returned as `result.toTextStreamResponse()`
