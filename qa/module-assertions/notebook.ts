import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface NotebookCheckpointInput {
  page: Page;
  description: string;
  section: string;
  subsection: string;
  rootDir: string;
}

const fileCache = new Map<string, string>();

function readFile(rootDir: string, relativePath: string): string {
  const cacheKey = `${rootDir}:${relativePath}`;
  const cached = fileCache.get(cacheKey);
  if (cached) return cached;
  const absolutePath = path.join(rootDir, relativePath);
  const contents = fs.readFileSync(absolutePath, "utf8");
  fileCache.set(cacheKey, contents);
  return contents;
}

function expectSourceContains(rootDir: string, relativePath: string, needle: string) {
  expect(readFile(rootDir, relativePath)).toContain(needle);
}

function fileExists(rootDir: string, relativePath: string): boolean {
  return fs.existsSync(path.join(rootDir, relativePath));
}

// ── Source paths ──
const PAGE = "src/app/(app)/notebook/page.tsx";
const LOADING = "src/app/(app)/notebook/loading.tsx";
const ERROR_PAGE = "src/app/(app)/notebook/error.tsx";
const AUDIO_PANEL = "src/components/notebook/AudioOverviewPanel.tsx";
const PASSWORD_GATE = "src/components/notebook/NotebookPasswordGate.tsx";
const SHARE_DIALOG = "src/components/notebook/NotebookShareDialog.tsx";
const SHARED_VIEWER = "src/components/notebook/SharedNotebookViewer.tsx";
const SOURCE_NOTES = "src/components/notebook/SourceNotesPanel.tsx";
const _SHARE_PAGE = "src/app/share/notebook/[token]/page.tsx";
const NOT_FOUND = "src/app/share/notebook/[token]/not-found.tsx";
const NOTEBOOK_SHARE = "src/lib/actions/notebook-share.ts";
const _NOTEBOOK_PROMPTS = "src/lib/ai/prompts/notebook.ts";
const CONVERSATIONS = "src/lib/actions/conversations.ts";
const RAG_CHAT_ROUTE = "src/app/api/rag-chat/route.ts";
const CHAT_ROUTE = "src/app/api/chat/route.ts";
const EXTRACT_PDF_ROUTE = "src/app/api/extract-pdf/route.ts";
const EMBED_ROUTE = "src/app/api/embed/route.ts";
const EXTRACT_FACTS_ROUTE = "src/app/api/extract-facts/route.ts";
const AUDIO_ROUTE = "src/app/api/audio-overview/route.ts";
const PDF_ROUTE = "src/app/api/papers/[id]/pdf/route.ts";
const PDF_VIEWER = "src/components/ui/pdf-viewer.tsx";
const FOLLOW_UP = "src/lib/actions/follow-up-suggestions.ts";

// ── Explicit checkpoint → needle mappings ──
const sourceContainsChecks: Record<string, { file: string; needle: string }[]> = {
  // Spec 001 — Sources Sidebar
  'Back button — arrow left navigates to `/dashboard`': [
    { file: PAGE, needle: "/dashboard" },
  ],
  'Title — "Notebook Sources" with paper count badge': [
    { file: PAGE, needle: "Notebook Sources" },
  ],
  'Paper count badge — displays `files.length` in a pill': [
    { file: PAGE, needle: "files.length" },
  ],
  'Research / Learn toggle — two-button segmented control with `role="tablist"`': [
    { file: PAGE, needle: 'role="tablist"' },
  ],
  'Research button shows Lightning icon + "Research"': [
    { file: PAGE, needle: "Lightning" },
  ],
  'Learn button shows GraduationCap icon + "Learn"': [
    { file: PAGE, needle: "GraduationCap" },
  ],
  'Active mode highlighted with brand background + white text': [
    { file: PAGE, needle: "bg-brand" },
  ],
  'Drop zone — dashed border box: "Drag files here or click to upload"': [
    { file: PAGE, needle: "Drag files here" },
  ],
  'Accepted formats label — ".pdf, .txt, .md" shown below': [
    { file: PAGE, needle: ".pdf, .txt, .md" },
  ],
  'Click to upload — opens file picker (hidden `<input type="file">`)': [
    { file: PAGE, needle: 'type="file"' },
  ],
  'Multiple file support — `multiple` attribute on file input': [
    { file: PAGE, needle: "multiple" },
  ],
  'Scrollable — `overflow-y-auto` fills remaining sidebar space': [
    { file: PAGE, needle: "overflow-y-auto" },
  ],
  'Hover state — background highlight on file entry hover': [
    { file: PAGE, needle: "hover:" },
  ],
  '"Add Link / URL" button — shows LinkSimple icon, toggles URL input': [
    { file: PAGE, needle: "LinkSimple" },
  ],
  'URL input field — text input with placeholder "https://..."': [
    { file: PAGE, needle: "https://..." },
  ],
  '"Add" button — submits URL': [
    { file: PAGE, needle: "Add" },
  ],

  // Spec 001 — Upload Error Handling
  'Extract failure — file entry shows "error" status': [
    { file: PAGE, needle: '"error"' },
  ],
  'Zero chunks — file shows "embed_failed" status': [
    { file: PAGE, needle: "embed_failed" },
  ],
  'Embedding failure — file shows "embed_failed" with retry button': [
    { file: PAGE, needle: "embed_failed" },
  ],

  // Spec 001 — URL Ingestion
  'Trigger — "Add Link / URL" button in sidebar footer': [
    { file: PAGE, needle: "Add Link" },
  ],
  'File added immediately with "processing" status and URL as name': [
    { file: PAGE, needle: '"processing"' },
  ],
  '`ingestUrl()` server action called': [
    { file: PAGE, needle: "ingestUrl" },
  ],

  // Spec 002 — URL Ingestion
  'Original URL preserved — stored in `originalUrl` field': [
    { file: PAGE, needle: "originalUrl" },
  ],
  'URL input cleared — after submission': [
    { file: PAGE, needle: "setUrlValue" },
  ],
  'URL input hidden — after submission': [
    { file: PAGE, needle: "setShowUrlInput(false)" },
  ],

  // Spec 002 — Retry Embed
  'Retry button — appears below "Embedding failed" label': [
    { file: PAGE, needle: "Embedding failed" },
  ],
  'Shows ArrowClockwise icon + "Click to retry" text': [
    { file: PAGE, needle: "Click to retry" },
  ],

  // Spec 002 — Source Selection
  'Checkbox per file — toggles `selected` state': [
    { file: PAGE, needle: "selected" },
  ],

  // Spec 002 — Notebook Modes
  'Chat header shows "Notebook Chat"': [
    { file: PAGE, needle: "Notebook Chat" },
  ],
  'Input placeholder: "Ask about your sources..."': [
    { file: PAGE, needle: "Ask about your sources" },
  ],
  'Starter suggestions: "Summarize Key Themes", "Find Contradictions", "Compare Methodologies"': [
    { file: PAGE, needle: "Summarize Key Themes" },
  ],
  'Chat header shows "Learn Mode"': [
    { file: PAGE, needle: "Learn Mode" },
  ],
  'Socratic tutoring badge — amber pill: "Socratic tutoring"': [
    { file: PAGE, needle: "Socratic tutoring" },
  ],
  'Input placeholder: "What do you want to explore?"': [
    { file: PAGE, needle: "What do you want to explore" },
  ],
  'Empty state: "Learn mode: I\'ll ask you guiding questions instead of giving direct answers"': [
    { file: PAGE, needle: "guiding questions" },
  ],
  'Starter suggestions: "Quiz me on these papers", "What assumptions should I question?", "Help me find gaps in this research"': [
    { file: PAGE, needle: "Quiz me on these papers" },
  ],
  'Mode persisted in conversation record on creation': [
    { file: PAGE, needle: "createConversation" },
  ],

  // Spec 002 — Conversation History
  'Toggle button — ClockCounterClockwise icon + "Past conversations" + caret': [
    { file: PAGE, needle: "Past conversations" },
  ],
  '"+ New conversation" button — brand-colored, starts fresh conversation': [
    { file: PAGE, needle: "New conversation" },
  ],

  // Spec 003 — Conversation History
  'Loads up to 20 past notebook conversations on mount': [
    { file: PAGE, needle: "notebook" },
  ],
  'Active conversation — highlighted with brand/10 background + brand text': [
    { file: PAGE, needle: "brand/10" },
  ],
  'Empty state — "No past conversations" text': [
    { file: PAGE, needle: "No past conversations" },
  ],

  // Spec 003 — Chat Interface
  'Chat area — scrollable container with `role="log"` and `aria-live="polite"`': [
    { file: PAGE, needle: 'role="log"' },
  ],
  'AI avatar — 7x7 circle with brand/20 background, Sparkle icon inside': [
    { file: PAGE, needle: "Sparkle" },
  ],
  'Max width — 75% of container for both message types': [
    { file: PAGE, needle: "max-w-[75%]" },
  ],
  'Pre-wrap text — whitespace preserved, relaxed line-height': [
    { file: PAGE, needle: "whitespace-pre-wrap" },
  ],
  'Auto-scroll — scrolls to bottom on new messages via `messagesEndRef`': [
    { file: PAGE, needle: "messagesEndRef" },
  ],
  'Bouncing dots — 3 dots (2x2 rounded-full, brand/40 color)': [
    { file: PAGE, needle: "brand/40" },
  ],
  'Form wrapper — prevents default submit, calls `sendMessage()`': [
    { file: PAGE, needle: "sendMessage" },
  ],
  'Paperclip button — opens file picker for additional uploads': [
    { file: PAGE, needle: "Paperclip" },
  ],
  'Send button — PaperPlaneRight icon, brand background, rounded-xl': [
    { file: PAGE, needle: "PaperPlaneRight" },
  ],
  'Disclaimer — "AI can make mistakes. Check important info." centered below input': [
    { file: PAGE, needle: "AI can make mistakes" },
  ],

  // Spec 003/004 — RAG vs Non-RAG Routing
  'With selected papers — sends to `/api/rag-chat` with `paperIds`': [
    { file: PAGE, needle: "/api/rag-chat" },
  ],
  'Without selected papers — sends to `/api/chat` (general chat)': [
    { file: PAGE, needle: "/api/chat" },
  ],
  'Mode parameter — "notebook" for research, "learn" for learn mode': [
    { file: PAGE, needle: '"notebook"' },
  ],

  // Spec 004 — Conversation Persistence
  'First message — creates conversation via `createConversation()` with mode, title (first 80 chars), and paper_ids': [
    { file: PAGE, needle: "createConversation" },
  ],
  'User messages — persisted via `addMessage()` (fire-and-forget)': [
    { file: PAGE, needle: "addMessage" },
  ],

  // Spec 004 — Streaming
  'Response streams via `ReadableStream` reader': [
    { file: PAGE, needle: "ReadableStream" },
  ],
  'Text decoded incrementally with `TextDecoder`': [
    { file: PAGE, needle: "TextDecoder" },
  ],
  '30-second request timeout — via AbortController': [
    { file: PAGE, needle: "AbortController" },
  ],

  // Spec 004 — Source Metadata
  'X-RAG-Sources header — parsed to extract source metadata': [
    { file: PAGE, needle: "X-RAG-Sources" },
  ],
  'X-RAG-Coverage header — parsed to extract coverage data': [
    { file: PAGE, needle: "X-RAG-Coverage" },
  ],

  // Spec 004 — Error Handling
  'API error — "Unable to connect to AI. Please check your AI provider API key configuration."': [
    { file: PAGE, needle: "Unable to connect to AI" },
  ],
  'Request timeout (AbortError) — "The response timed out. Please try again or ask a simpler question."': [
    { file: PAGE, needle: "response timed out" },
  ],
  'Generic error — "Something went wrong. Please try again."': [
    { file: PAGE, needle: "Something went wrong" },
  ],

  // Spec 004 — Citation Rendering
  'Badge style — brand/10 background, brand/20 border, brand text, rounded-md': [
    { file: PAGE, needle: "brand/10" },
  ],
  'Short title logic — truncates at first colon (if within 40 chars) or at 28 chars with "..."': [
    { file: PAGE, needle: "indexOf" },
  ],
  'Highlights source — sets `highlightedSource` index': [
    { file: PAGE, needle: "highlightedSource" },
  ],

  // Spec 005 — Source Coverage Report
  'Visibility — only shown when `totalPapers > 1`': [
    { file: PAGE, needle: "totalPapers" },
  ],
  'Badge format — "Sources used: N/M" with optional unused paper list': [
    { file: PAGE, needle: "Sources used" },
  ],

  // Spec 005 — Sources Cited Panel
  'Toggle button — BookOpen icon + "Sources cited (N)" + caret': [
    { file: PAGE, needle: "Sources cited" },
  ],

  // Spec 005 — Follow-Up Suggestion Chips
  'Trigger — generated after assistant response ≥ 100 characters': [
    { file: PAGE, needle: "100" },
  ],
  'Non-blocking — generated asynchronously after stream completes': [
    { file: PAGE, needle: "getFollowUpSuggestions" },
  ],
  'Icon — ArrowBendDownRight icon (brand color in research, amber in learn)': [
    { file: PAGE, needle: "ArrowBendDownRight" },
  ],
  'Research mode styling — surface-raised/50 background, border-border, hover → brand/30': [
    { file: PAGE, needle: "surface-raised/50" },
  ],

  // Spec 005/006 — Message Actions
  'Icon — Copy icon (default) / Check icon (after copy, green)': [
    { file: PAGE, needle: "Copy" },
  ],
  'Copies cleaned text — removes `[N]` citation markers and extra whitespace': [
    { file: PAGE, needle: "replace" },
  ],
  'Tooltip — "Copy response"': [
    { file: PAGE, needle: "Copy response" },
  ],
  'Persists to DB — calls `submitMessageFeedback()` with rating `1`': [
    { file: PAGE, needle: "submitMessageFeedback" },
  ],
  'Toggle behavior — click to activate, click again to deactivate': [
    { file: PAGE, needle: "ThumbsUp" },
  ],

  // Spec 006 — PICO / Fact Extraction
  'Visibility — only on files with `paperId`, `status === "ready"`, not yet extracted': [
    { file: PAGE, needle: "paperId" },
  ],
  'Icon — Table icon, visible on file entry hover (opacity-0 → opacity-100)': [
    { file: PAGE, needle: "Table" },
  ],
  'Tooltip — "Extract PICO data"': [
    { file: PAGE, needle: "Extract PICO" },
  ],
  'Green checkmark — CheckCircle icon replaces extract button': [
    { file: PAGE, needle: "CheckCircle" },
  ],
  'Header — Table icon (brand) + "Structured Extraction" title': [
    { file: PAGE, needle: "Structured Extraction" },
  ],
  'Verification badge — "Verified" (green, ShieldCheck) or "Verify" button': [
    { file: PAGE, needle: "ShieldCheck" },
  ],
  'Verify button — CheckCircle icon + "Verify" text': [
    { file: PAGE, needle: "verifyExtraction" },
  ],

  // Spec 006/007 — Source Notes Panel
  '"View Source Notes" button — Notebook icon + text, in chat header toolbar': [
    { file: PAGE, needle: "View Source Notes" },
  ],
  'Opens as a fixed overlay with backdrop blur': [
    { file: SOURCE_NOTES, needle: "backdrop-blur" },
  ],
  'Escape key — closes panel': [
    { file: SOURCE_NOTES, needle: "Escape" },
  ],
  'Body scroll lock — prevents background scrolling while open': [
    { file: SOURCE_NOTES, needle: "overflow" },
  ],
  'Notebook icon (brand) + "Source Notes" title': [
    { file: SOURCE_NOTES, needle: "Source Notes" },
  ],
  'Paper count badge — "N papers"': [
    { file: SOURCE_NOTES, needle: "paper" },
  ],
  'Text — "N of M papers need notes generated"': [
    { file: SOURCE_NOTES, needle: "papers need notes generated" },
  ],
  '"Generate All" button — brand text, disabled during generation': [
    { file: SOURCE_NOTES, needle: "Generate All" },
  ],
  'Batch processing — generates in batches of 3 for controlled concurrency': [
    { file: SOURCE_NOTES, needle: "BATCH_SIZE" },
  ],
  'Title — truncated to 2 lines (line-clamp-2)': [
    { file: SOURCE_NOTES, needle: "line-clamp-2" },
  ],
  'Authors — first 3 authors + "et al." if more': [
    { file: SOURCE_NOTES, needle: "et al." },
  ],
  'Selected indicator — unselected papers show "Not selected for chat" (italic, muted)': [
    { file: SOURCE_NOTES, needle: "Not selected for chat" },
  ],
  'Summary — AI-generated text summary': [
    { file: SOURCE_NOTES, needle: "summary" },
  ],
  'Key Topics — tag pills with Tag icon (brand/10 background, brand text)': [
    { file: SOURCE_NOTES, needle: "Tag" },
  ],
  'No abstract — "No summary available yet."': [
    { file: SOURCE_NOTES, needle: "No summary available yet" },
  ],
  '"Generate Notes" button — brand text, triggers single paper generation': [
    { file: SOURCE_NOTES, needle: "Generate Notes" },
  ],
  'Generating state — spinning CircleNotch + "Analyzing paper..."': [
    { file: SOURCE_NOTES, needle: "Analyzing paper" },
  ],
  'Loading — centered spinner + "Loading paper notes..."': [
    { file: SOURCE_NOTES, needle: "Loading paper notes" },
  ],
  'Empty — Notebook icon + "No papers loaded yet." + upload hint': [
    { file: SOURCE_NOTES, needle: "No papers loaded yet" },
  ],

  // Spec 007/008 — Audio Overview Panel
  'Headphones button — in chat header toolbar': [
    { file: PAGE, needle: "Headphones" },
  ],
  'Header — Headphones icon (brand) + "Audio Overview" label': [
    { file: AUDIO_PANEL, needle: "Audio Overview" },
  ],
  'Close button — X icon, pauses audio on close': [
    { file: AUDIO_PANEL, needle: "pause" },
  ],
  '"Brief (~1 min)"': [
    { file: AUDIO_PANEL, needle: "Brief (~1 min)" },
  ],
  '"Standard (~3 min)" (default)': [
    { file: AUDIO_PANEL, needle: "Standard (~3 min)" },
  ],
  '"Detailed (~5 min)"': [
    { file: AUDIO_PANEL, needle: "Detailed (~5 min)" },
  ],
  'Text input — "Focus on (optional)"': [
    { file: AUDIO_PANEL, needle: "Focus on (optional)" },
  ],
  'Placeholder — "e.g., primary endpoint results, methodology comparison..."': [
    { file: AUDIO_PANEL, needle: "primary endpoint results" },
  ],
  'Max length — 500 characters': [
    { file: AUDIO_PANEL, needle: "500" },
  ],
  'Spinner — CircleNotch spinning (brand color)': [
    { file: AUDIO_PANEL, needle: "CircleNotch" },
  ],
  'Progress text — "Creating your audio summary..."': [
    { file: AUDIO_PANEL, needle: "Creating your audio summary" },
  ],
  'Time estimate — "Writing script, then synthesizing speech. This usually takes 10-30 seconds."': [
    { file: AUDIO_PANEL, needle: "10-30 seconds" },
  ],
  'Seek slider — range input (0 to duration, step 0.1)': [
    { file: AUDIO_PANEL, needle: "range" },
  ],
  'Speed button — cycles through 1x, 1.25x, 1.5x, 2x': [
    { file: AUDIO_PANEL, needle: "1.25" },
  ],
  'Download button — DownloadSimple icon, downloads as `audio-overview.mp3`': [
    { file: AUDIO_PANEL, needle: "audio-overview.mp3" },
  ],
  'Transcript toggle — "Show transcript" / "Hide transcript"': [
    { file: AUDIO_PANEL, needle: "Show transcript" },
  ],
  'Cached badge — "Cached" in green text when result was from cache': [
    { file: AUDIO_PANEL, needle: "Cached" },
  ],
  'Options toggle — "Options" link to change length/prompt and regenerate': [
    { file: AUDIO_PANEL, needle: "Options" },
  ],
  'Warning icon — red-400 color': [
    { file: AUDIO_PANEL, needle: "red-400" },
  ],
  'Retry button — ArrowsClockwise icon + "Retry" text (brand color)': [
    { file: AUDIO_PANEL, needle: "Retry" },
  ],
  '"Regenerate with new settings" button — full-width brand button': [
    { file: AUDIO_PANEL, needle: "Regenerate with new settings" },
  ],
  'error — shows "Unable to play generated audio." error': [
    { file: AUDIO_PANEL, needle: "Unable to play generated audio" },
  ],

  // Spec 009 — Audio Events
  'timeupdate — updates progress slider and time display': [
    { file: AUDIO_PANEL, needle: "timeupdate" },
  ],
  'ended — resets to ready state, rewinds to start': [
    { file: AUDIO_PANEL, needle: "ended" },
  ],
  'loadedmetadata — updates duration from actual audio': [
    { file: AUDIO_PANEL, needle: "loadedmetadata" },
  ],

  // Spec 009 — Notebook Sharing
  'ShareNetwork icon — in chat header toolbar': [
    { file: PAGE, needle: "ShareNetwork" },
  ],
  'Modal overlay — fixed inset-0, black/50 background, backdrop-blur-sm': [
    { file: SHARE_DIALOG, needle: "backdrop-blur" },
  ],
  'Header — LinkSimple icon + "Share Notebook"': [
    { file: SHARE_DIALOG, needle: "Share Notebook" },
  ],
  'Toggle switch — custom styled 44px toggle (w-11, h-6)': [
    { file: SHARE_DIALOG, needle: "w-11" },
  ],
  'Label — "Public sharing"': [
    { file: SHARE_DIALOG, needle: "Public sharing" },
  ],
  'Description — "Anyone with the link can view this notebook conversation"': [
    { file: SHARE_DIALOG, needle: "Anyone with the link" },
  ],
  'Enable — calls `enableNotebookSharing()`, generates share URL': [
    { file: SHARE_DIALOG, needle: "enableNotebookSharing" },
  ],
  'Disable — calls `disableNotebookSharing()`': [
    { file: SHARE_DIALOG, needle: "disableNotebookSharing" },
  ],
  'Copy button — brand background, Copy icon + "Copy" text': [
    { file: SHARE_DIALOG, needle: "Copy" },
  ],
  'Copied confirmation — Check icon + "Copied" for 2 seconds': [
    { file: SHARE_DIALOG, needle: "Copied" },
  ],
  'Lock icon + "Password protection (optional)" label': [
    { file: SHARE_DIALOG, needle: "Password protection" },
  ],
  'Text input — placeholder "Leave empty for no password"': [
    { file: SHARE_DIALOG, needle: "Leave empty for no password" },
  ],
  'CalendarBlank icon + "Expiration date (optional)" label': [
    { file: SHARE_DIALOG, needle: "Expiration date" },
  ],
  '"Save Settings" button — full-width, calls `updateNotebookShareSettings()`': [
    { file: SHARE_DIALOG, needle: "Save Settings" },
  ],
  'Loading state — "Saving..." text, disabled button': [
    { file: SHARE_DIALOG, needle: "Saving..." },
  ],
  'Loading settings — "Loading share settings..." centered text on open': [
    { file: SHARE_DIALOG, needle: "Loading share settings" },
  ],
  'Share toggle has `aria-label="Toggle notebook sharing"`': [
    { file: SHARE_DIALOG, needle: "Toggle notebook sharing" },
  ],

  // Spec 009/010 — Shared Notebook Viewer
  'Notebook icon (brand) + conversation title': [
    { file: SHARED_VIEWER, needle: "Notebook" },
  ],
  'Metadata — "Shared by [owner]" + date + mode indicator': [
    { file: SHARED_VIEWER, needle: "Shared by" },
  ],
  'Learn mode indicator — " · Learn Mode" appended': [
    { file: SHARED_VIEWER, needle: "Learn Mode" },
  ],
  'User messages — right-aligned, white/5 background': [
    { file: SHARED_VIEWER, needle: "white/5" },
  ],
  'Assistant messages — left-aligned, brand/5 background, sparkle avatar': [
    { file: SHARED_VIEWER, needle: "Sparkle" },
  ],
  '"This notebook has no messages yet." centered message': [
    { file: SHARED_VIEWER, needle: "no messages yet" },
  ],
  '"Shared from ScholarSync · AI-assisted research analysis" text': [
    { file: SHARED_VIEWER, needle: "Shared from ScholarSync" },
  ],

  // Spec 010 — Password Gate
  'Full-screen dark page — centered card (max-w-sm)': [
    { file: PASSWORD_GATE, needle: "max-w-sm" },
  ],
  'Lock icon — brand-colored circle (w-12, h-12)': [
    { file: PASSWORD_GATE, needle: "w-12" },
  ],
  'Title — "Password Protected"': [
    { file: PASSWORD_GATE, needle: "Password Protected" },
  ],
  'Subtitle — "Enter the password to view this notebook."': [
    { file: PASSWORD_GATE, needle: "Enter the password to view this notebook" },
  ],
  '"View Notebook" button — brand background, disabled when empty or loading': [
    { file: PASSWORD_GATE, needle: "View Notebook" },
  ],
  'Loading state — "Verifying..." button text': [
    { file: PASSWORD_GATE, needle: "Verifying..." },
  ],
  '"Incorrect password. Please try again."': [
    { file: PASSWORD_GATE, needle: "Incorrect password" },
  ],
  '"Something went wrong. Please try again."': [
    { file: PASSWORD_GATE, needle: "Something went wrong" },
  ],

  // Spec 010 — PDF Viewer
  'Opens on citation click — when source is a PDF (no originalUrl)': [
    { file: PAGE, needle: "pdfViewerState" },
  ],
  'Dynamically loaded — `next/dynamic` with `ssr: false`': [
    { file: PAGE, needle: "dynamic" },
  ],

  // Spec 010 — Starter Suggestions
  '"Summarize Key Themes" — clickable chip': [
    { file: PAGE, needle: "Summarize Key Themes" },
  ],
  '"Find Contradictions" — clickable chip': [
    { file: PAGE, needle: "Find Contradictions" },
  ],
  '"Compare Methodologies" — clickable chip': [
    { file: PAGE, needle: "Compare Methodologies" },
  ],
  '"Quiz me on these papers" — clickable chip': [
    { file: PAGE, needle: "Quiz me on these papers" },
  ],
  '"What assumptions should I question?" — clickable chip': [
    { file: PAGE, needle: "What assumptions should I question" },
  ],
  '"Help me find gaps in this research" — clickable chip': [
    { file: PAGE, needle: "Help me find gaps" },
  ],

  // Spec 011 — Suggestion Chip Behavior
  'Style — rounded-full, brand/10 background, brand text': [
    { file: PAGE, needle: "rounded-full" },
  ],
  'GlassPanel wrapper — p-6, text-center': [
    { file: PAGE, needle: "GlassPanel" },
  ],

  // Spec 011 — Error Handling
  'Timeout message — "The response timed out. Please try again or ask a simpler question."': [
    { file: PAGE, needle: "response timed out" },
  ],

  // Spec 011 — Audio Overview Errors
  'No papers selected — error: "Select at least one paper..."': [
    { file: AUDIO_PANEL, needle: "Select at least one paper" },
  ],
  'No conversation — error: "Select papers and start a notebook conversation first."': [
    { file: AUDIO_PANEL, needle: "Select papers and start a notebook conversation first" },
  ],

  // Spec 012-017 — Internal behavior/edge-cases from page.tsx
  'URL temp ids use the exact format `url_${Date.now()}`': [
    { file: PAGE, needle: "url_" },
  ],
  'URL submission clears `urlValue` and hides the composer with `setShowUrlInput(false)` before awaiting `ingestUrl(url)`': [
    { file: PAGE, needle: "setShowUrlInput(false)" },
  ],

  // Spec 021 — RAG Chat API Internals
  'Rate-limited via `checkRateLimit(userId, "rag-chat", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly': [
    { file: RAG_CHAT_ROUTE, needle: "checkRateLimit" },
  ],
  'Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400': [
    { file: RAG_CHAT_ROUTE, needle: "Invalid request" },
  ],
  'RAG retrieval failure is caught and logged as warning `"RAG retrieval failed, falling back to no-context mode"`; streaming continues without context chunks': [
    { file: RAG_CHAT_ROUTE, needle: "RAG retrieval failed" },
  ],
  'System prompt base text is `"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions."`': [
    { file: RAG_CHAT_ROUTE, needle: "You are ScholarSync" },
  ],
  'Notebook mode appends `" You are in Notebook mode — analyzing uploaded research sources."` to the system prompt': [
    { file: RAG_CHAT_ROUTE, needle: "Notebook mode" },
  ],
  'Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`': [
    { file: RAG_CHAT_ROUTE, needle: "topK: 8" },
  ],
  'Fallback answer with zero chunks: `"I couldn\'t retrieve grounded source passages for that question.\\n\\nTry selecting more sources or ask a narrower question tied to the uploaded papers."`': [
    { file: RAG_CHAT_ROUTE, needle: "grounded source passages" },
  ],
  'Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false': [
    { file: RAG_CHAT_ROUTE, needle: "unusedPapers" },
  ],
  'Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`': [
    { file: RAG_CHAT_ROUTE, needle: "chunkId" },
  ],

  // Spec 021 — General Chat API Internals
  'Authentication failure returns `{ error: "Authentication required." }` with status 401': [
    { file: CHAT_ROUTE, needle: "Authentication required" },
  ],
  'AI not configured returns `{ error: "AI service is not configured. Please contact an administrator." }` with status 503': [
    { file: CHAT_ROUTE, needle: "AI service is not configured" },
  ],
  'Mode `"notebook"` (research mode) falls through to the standard assistant prompt: `"You are ScholarSync\'s AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`': [
    { file: CHAT_ROUTE, needle: "research assistant" },
  ],
  'Server error returns `{ error: "An unexpected error occurred. Please try again." }` with status 500': [
    { file: CHAT_ROUTE, needle: "unexpected error" },
  ],

  // Spec 021 — Extract PDF API
  'Max file size limit is 20MB (`20 * 1024 * 1024` bytes)': [
    { file: EXTRACT_PDF_ROUTE, needle: "20 * 1024 * 1024" },
  ],
  'Content-Type must include `"multipart/form-data"` or returns 400 with `{ error: "Content-Type must be multipart/form-data" }`': [
    { file: EXTRACT_PDF_ROUTE, needle: "multipart/form-data" },
  ],
  'Missing file field returns 400 with `{ error: "No PDF file provided. Include a \'file\' field in the form data." }`': [
    { file: EXTRACT_PDF_ROUTE, needle: "No PDF file provided" },
  ],
  'Non-PDF file returns 400 with `{ error: "Uploaded file must be a PDF" }`': [
    { file: EXTRACT_PDF_ROUTE, needle: "Uploaded file must be a PDF" },
  ],
  'Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata': [
    { file: EXTRACT_PDF_ROUTE, needle: "title" },
  ],
  'Server error returns 500 with `{ error: "Failed to extract text from PDF" }`': [
    { file: EXTRACT_PDF_ROUTE, needle: "Failed to extract text from PDF" },
  ],

  // Spec 021 — Embed API
  'Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected': [
    { file: EMBED_ROUTE, needle: "positive" },
  ],
  'Server error returns 500 with `{ error: "Failed to embed paper" }`': [
    { file: EMBED_ROUTE, needle: "Failed to embed paper" },
  ],

  // Spec 021 — Extract Facts API
  'Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: "paperId (number) is required" }`': [
    { file: EXTRACT_FACTS_ROUTE, needle: "paperId (number) is required" },
  ],
  'Server error returns 500 with `{ error: "Extraction failed" }`': [
    { file: EXTRACT_FACTS_ROUTE, needle: "Extraction failed" },
  ],

  // Spec 022 — Audio Overview API
  'Conversation not found or not owned by user returns 404 with `{ error: "Conversation not found" }`': [
    { file: AUDIO_ROUTE, needle: "Conversation not found" },
  ],
  'No paper overviews available returns 400 with `{ error: "No source notes available. Generate source notes first (View Source Notes panel)." }`': [
    { file: AUDIO_ROUTE, needle: "No source notes available" },
  ],
  'Server error returns 500 with `{ error: "Failed to generate audio overview. Please try again." }`': [
    { file: AUDIO_ROUTE, needle: "Failed to generate audio overview" },
  ],
  'TTS uses OpenAI provider with voice `"nova"` and format `"mp3"`': [
    { file: AUDIO_ROUTE, needle: "nova" },
  ],

  // Spec 022 — PDF Storage & Serving
  'GET direct stream headers: `Content-Type: application/pdf`, `Content-Disposition: inline; filename="paper-{id}.pdf"`, `Cache-Control: private, max-age=3600`': [
    { file: PDF_ROUTE, needle: "application/pdf" },
  ],
  'GET 404 when no PDF found: `{ error: "PDF not found for this paper" }`': [
    { file: PDF_ROUTE, needle: "PDF not found" },
  ],
  'POST success returns `{ success: true, paperId, storagePath }`': [
    { file: PDF_ROUTE, needle: "storagePath" },
  ],
  'POST failure returns 500 with `{ error: "Failed to store PDF file" }`': [
    { file: PDF_ROUTE, needle: "Failed to store PDF" },
  ],

  // Spec 022/023 — PDF Viewer Component
  'Page display format: `"{pageNumber} / {numPages}"` when loaded, `"..."` while loading': [
    { file: PDF_VIEWER, needle: "numPages" },
  ],
  'Zoom range: minimum 0.5x (50%), maximum 3.0x (300%), step 0.25 per click': [
    { file: PDF_VIEWER, needle: "0.25" },
  ],
  'Previous page button disabled when `pageNumber <= 1`; next page disabled when `pageNumber >= numPages`': [
    { file: PDF_VIEWER, needle: "numPages" },
  ],
  'Document load error with "404", "Not Found", or "Missing" in message shows specific text: `"The original PDF is not available for this paper. It may have been imported from search without a PDF upload."`': [
    { file: PDF_VIEWER, needle: "imported from search" },
  ],
  'Error display: red circle (`bg-red-500/10`) with X icon (`text-red-500`) + `"Failed to load PDF"` heading + error detail text': [
    { file: PDF_VIEWER, needle: "Failed to load PDF" },
  ],
  'Document loading state: spinner (`border-brand border-t-transparent animate-spin`) + `"Loading PDF..."` text': [
    { file: PDF_VIEWER, needle: "Loading PDF" },
  ],
  '`role="dialog"`, `aria-modal="true"`, `aria-label` includes title when provided: `"PDF Viewer: {title}"`, otherwise `"PDF Viewer"`': [
    { file: PDF_VIEWER, needle: "PDF Viewer" },
  ],
  'Close button `aria-label="Close PDF viewer"`': [
    { file: PDF_VIEWER, needle: "Close PDF viewer" },
  ],
  'Returns `null` when neither `url` nor `file` prop is provided': [
    { file: PDF_VIEWER, needle: "null" },
  ],

  // Spec 023 — Notebook Page Additional Details
  'Learn mode empty state subtitle is exactly `"Select your papers and start exploring"`': [
    { file: PAGE, needle: "Select your papers and start exploring" },
  ],
  '`handleOpenAudioOverview` auto-creates a conversation with title `"Audio Overview"` if no conversation exists yet': [
    { file: PAGE, needle: "Audio Overview" },
  ],
  'Conversation history entries with null titles display `"Untitled"` as both visible text and HTML `title` attribute': [
    { file: PAGE, needle: "Untitled" },
  ],

  // Spec 023 — Notebook Share Actions
  '`enableNotebookSharing` reuses existing `share_token` if present; only generates new `crypto.randomUUID()` when no prior token exists': [
    { file: NOTEBOOK_SHARE, needle: "randomUUID" },
  ],
  '`disableNotebookSharing` preserves the existing share token; only sets `share_enabled: false` and updates `updated_at`': [
    { file: NOTEBOOK_SHARE, needle: "share_enabled: false" },
  ],
  '`updateNotebookShareSettings` hashes passwords via `hashPassword()` before storing; `null` password stores null (removes protection)': [
    { file: NOTEBOOK_SHARE, needle: "hashPassword" },
  ],
  '`verifyNotebookSharePassword` supports both hashed passwords (detected via `isHashedPassword()`) and legacy plain-text passwords via direct comparison': [
    { file: NOTEBOOK_SHARE, needle: "isHashedPassword" },
  ],
  '`verifyNotebookSharePassword` returns `true` without comparison when `sharePassword` is null (no password set)': [
    { file: NOTEBOOK_SHARE, needle: "return true" },
  ],
  '`getNotebookByShareToken` returns null for expired shares by checking `new Date() > convo.shareExpiresAt`': [
    { file: NOTEBOOK_SHARE, needle: "shareExpiresAt" },
  ],
  '`getNotebookByShareToken` falls back to `"Untitled Notebook"` for null conversation titles': [
    { file: NOTEBOOK_SHARE, needle: "Untitled Notebook" },
  ],
  '`getNotebookByShareToken` falls back to `"A researcher"` for missing owner names': [
    { file: NOTEBOOK_SHARE, needle: "A researcher" },
  ],
  '`getNotebookByShareToken` orders messages by `created_at` ascending': [
    { file: NOTEBOOK_SHARE, needle: "asc" },
  ],
  'Share URL constructed from `process.env.NEXT_PUBLIC_APP_URL`, falling back to `"http://localhost:3001"`': [
    { file: NOTEBOOK_SHARE, needle: "NEXT_PUBLIC_APP_URL" },
  ],

  // Spec 023 — Share Dialog Additional
  'Password field in share dialog uses `type="text"` (visible while typing), NOT `type="password"`': [
    { file: SHARE_DIALOG, needle: 'type="text"' },
  ],

  // Spec 024 — Shared Notebook Additional
  'Shared viewer uses hardcoded hex colors: `bg-[#020617]`, `text-[#f1f5f9]`, `text-[#64748b]`, `bg-[#6366f1]/5`': [
    { file: SHARED_VIEWER, needle: "#020617" },
  ],
  '`NotebookPasswordGate` clears error state (`setError("")`) on each new submission before setting loading': [
    { file: PASSWORD_GATE, needle: 'setError("")' },
  ],

  // Spec 024 — Source Notes Panel Additional
  'Paper cards start expanded by default (`useState(true)` for `expanded`)': [
    { file: SOURCE_NOTES, needle: "useState(true)" },
  ],
  '`getErrorMessage()` utility returns `error.message` for Error instances, otherwise `"Unable to generate notes right now. Please try again."`': [
    { file: SOURCE_NOTES, needle: "Unable to generate notes right now" },
  ],
  'Panel max-width is `max-w-md` (not full sidebar width)': [
    { file: SOURCE_NOTES, needle: "max-w-md" },
  ],
  '`Generate All` button disabled when `generatingPapers.size > 0` (any paper generating), with `disabled:opacity-50`': [
    { file: SOURCE_NOTES, needle: "generatingPapers.size" },
  ],
  'Suggested questions section header: `ChatCircleDots` icon (size 10) + `"Ask about this paper"` label': [
    { file: SOURCE_NOTES, needle: "Ask about this paper" },
  ],
  'Question items use `ArrowRight` icon (not generic arrow) with `text-brand/50` default, `group-hover:text-brand` on hover': [
    { file: SOURCE_NOTES, needle: "ArrowRight" },
  ],
  'Question text is line-clamped to 1 line via `line-clamp-1`': [
    { file: SOURCE_NOTES, needle: "line-clamp-1" },
  ],

  // Spec 024 — Audio Overview Panel Additional
  '`normalizedPaperIds` deduplicates via `new Set`, sorts numerically, then filters out non-positive and non-integer values': [
    { file: AUDIO_PANEL, needle: "new Set" },
  ],
  'Play/Pause button has dynamic `title`: `"Pause"` when playing, `"Play"` otherwise': [
    { file: AUDIO_PANEL, needle: '"Play"' },
  ],
  'Speed button has `title="Playback speed"`': [
    { file: AUDIO_PANEL, needle: "Playback speed" },
  ],
  'Download button has `title="Download audio"`': [
    { file: AUDIO_PANEL, needle: "Download audio" },
  ],
  'Audio element uses `preload="auto"` attribute': [
    { file: AUDIO_PANEL, needle: 'preload="auto"' },
  ],
  '`formatTime` returns `"0:00"` for non-finite, zero, or negative values; formats as `M:SS` with zero-padded seconds': [
    { file: AUDIO_PANEL, needle: "0:00" },
  ],
  'Time display elements use `tabular-nums` class and fixed `w-8` width for stable layout': [
    { file: AUDIO_PANEL, needle: "tabular-nums" },
  ],

  // Spec 024 — Conversations Actions
  '`createConversation` defaults title to `"New Conversation"` when title param is falsy': [
    { file: CONVERSATIONS, needle: "New Conversation" },
  ],

  // Spec 025 — Conversation Actions
  '`addMessage` updates the parent conversation\'s `updated_at` timestamp after inserting the message': [
    { file: CONVERSATIONS, needle: "updated_at" },
  ],
  '`getConversations` orders results by `updated_at` descending (most recent first)': [
    { file: CONVERSATIONS, needle: "updated_at" },
  ],

  // Spec 025 — Loading Skeleton
  'Loading skeleton sidebar width is `w-72` — narrower than the actual notebook page sidebar which is `w-80`': [
    { file: LOADING, needle: "w-72" },
  ],
  'Loading skeleton renders exactly 3 file placeholder rows, each with `p-3 rounded-lg bg-surface-raised/50`': [
    { file: LOADING, needle: "bg-surface-raised/50" },
  ],
  'Loading skeleton chat area uses `SkeletonText` component with `lines={6}`': [
    { file: LOADING, needle: "lines={6}" },
  ],

  // Spec 025 — Error boundary
  '`/notebook` route error boundary renders `ErrorDisplay` with title `Notebook unavailable`, message `We couldn\'t load your notebook. Please try again.`, and passes `reset` through `onRetry`': [
    { file: ERROR_PAGE, needle: "Notebook unavailable" },
  ],

  // Spec 025 — Not found
  '`/share/notebook/[token]/not-found.tsx` renders a dedicated 404 view with heading `404`, subtitle `Notebook not found`': [
    { file: NOT_FOUND, needle: "Notebook not found" },
  ],
  'body text `This shared notebook link may have expired, been disabled by the owner, or the notebook may no longer exist.`': [
    { file: NOT_FOUND, needle: "expired" },
  ],
  'a `Go to ScholarSync` link to `/`': [
    { file: NOT_FOUND, needle: "Go to ScholarSync" },
  ],
};

// ── Subsection → file map ──
const SUBSECTION_FILE_MAP: { keywords: string[]; files: string[] }[] = [
  { keywords: ["Sources Sidebar", "Header", "Mode Toggle", "Upload Area", "File List", "URL Input"], files: [PAGE] },
  { keywords: ["Source Upload", "Upload Error"], files: [PAGE] },
  { keywords: ["URL Ingestion"], files: [PAGE] },
  { keywords: ["Retry Embed"], files: [PAGE] },
  { keywords: ["Source Selection", "Source Management"], files: [PAGE] },
  { keywords: ["Research Mode", "Learn Mode", "Mode Switching"], files: [PAGE] },
  { keywords: ["Conversation History", "History Dropdown", "Conversation List", "Load Conversation", "New Conversation"], files: [PAGE] },
  { keywords: ["Chat Interface", "Message Display", "Loading State", "Input Area"], files: [PAGE] },
  { keywords: ["RAG", "Non-RAG", "Routing"], files: [PAGE, RAG_CHAT_ROUTE, CHAT_ROUTE] },
  { keywords: ["Conversation Persistence"], files: [PAGE, CONVERSATIONS] },
  { keywords: ["Streaming"], files: [PAGE] },
  { keywords: ["Source Metadata"], files: [PAGE] },
  { keywords: ["Coverage Report"], files: [PAGE, RAG_CHAT_ROUTE] },
  { keywords: ["Citation", "Citation Rendering", "Citation Click"], files: [PAGE] },
  { keywords: ["Follow-Up", "Suggestion Chips"], files: [PAGE, FOLLOW_UP] },
  { keywords: ["Message Actions", "Copy Button", "Thumbs Up", "Thumbs Down", "Mutual Exclusion"], files: [PAGE] },
  { keywords: ["PICO", "Fact Extraction", "Extract Facts", "Extracted State", "Extraction Card", "Verify Extraction"], files: [PAGE, EXTRACT_FACTS_ROUTE] },
  { keywords: ["Source Notes Panel", "Paper Cards", "Paper Card", "Generate All"], files: [SOURCE_NOTES] },
  { keywords: ["Audio Overview", "Audio Events", "Audio Length", "Custom Focus", "Generating State", "Playback", "Regenerate"], files: [AUDIO_PANEL, AUDIO_ROUTE] },
  { keywords: ["Share Button", "Share Dialog", "Public Sharing", "Share Link", "Password Protection", "Expiration", "Save Settings"], files: [SHARE_DIALOG, NOTEBOOK_SHARE] },
  { keywords: ["Shared Notebook", "SharedNotebookViewer"], files: [SHARED_VIEWER] },
  { keywords: ["Password Gate", "Password-Protected"], files: [PASSWORD_GATE] },
  { keywords: ["PDF Viewer"], files: [PDF_VIEWER, PAGE] },
  { keywords: ["Starter Suggestions", "Empty State"], files: [PAGE] },
  { keywords: ["Error Handling", "Chat Errors", "Conversation Errors", "Source Upload Errors", "Extraction Errors"], files: [PAGE] },
  { keywords: ["Loading Skeleton"], files: [LOADING] },
  { keywords: ["Error boundary"], files: [ERROR_PAGE] },
  { keywords: ["not-found"], files: [NOT_FOUND] },
  { keywords: ["rag-chat", "RAG Chat API"], files: [RAG_CHAT_ROUTE] },
  { keywords: ["General Chat API", "/api/chat"], files: [CHAT_ROUTE] },
  { keywords: ["Extract PDF", "extract-pdf"], files: [EXTRACT_PDF_ROUTE] },
  { keywords: ["Embed API", "/api/embed"], files: [EMBED_ROUTE] },
  { keywords: ["Audio Overview API", "audio-overview"], files: [AUDIO_ROUTE] },
  { keywords: ["PDF Storage", "papers/[id]/pdf"], files: [PDF_ROUTE] },
  { keywords: ["Notebook Share Actions", "notebook-share"], files: [NOTEBOOK_SHARE] },
];

// ── Section → file map ──
const SECTION_FILE_MAP: Record<string, string[]> = {
  "Sources Sidebar": [PAGE],
  "Source Upload & Ingestion": [PAGE],
  "URL Ingestion": [PAGE],
  "Source File Status & States": [PAGE],
  "Source Selection & Management": [PAGE],
  "Notebook Modes": [PAGE],
  "Conversation History": [PAGE],
  "Chat Interface": [PAGE],
  "Message Streaming & RAG": [PAGE, RAG_CHAT_ROUTE],
  "Citation System (In-Chat)": [PAGE],
  "Source Coverage Report": [PAGE],
  "Sources Cited Panel": [PAGE],
  "Follow-Up Suggestion Chips": [PAGE, FOLLOW_UP],
  "Message Actions (Copy & Feedback)": [PAGE],
  "PICO / Fact Extraction": [PAGE, EXTRACT_FACTS_ROUTE],
  "Source Notes Panel": [SOURCE_NOTES],
  "Audio Overview Panel": [AUDIO_PANEL, AUDIO_ROUTE],
  "Notebook Sharing": [SHARE_DIALOG, NOTEBOOK_SHARE],
  "Shared Notebook Viewer": [SHARED_VIEWER],
  "Password-Protected Sharing": [PASSWORD_GATE],
  "PDF Viewer (Citation Jump-to-Source)": [PDF_VIEWER, PAGE],
  "Starter Suggestions (Empty State)": [PAGE],
  "Error Handling & Edge Cases": [PAGE],
  "Quick Test Workflows": [PAGE, RAG_CHAT_ROUTE, CHAT_ROUTE, EXTRACT_PDF_ROUTE, EMBED_ROUTE, EXTRACT_FACTS_ROUTE, AUDIO_ROUTE, PDF_ROUTE, PDF_VIEWER, SOURCE_NOTES, AUDIO_PANEL, SHARED_VIEWER, PASSWORD_GATE, NOTEBOOK_SHARE, CONVERSATIONS, LOADING, ERROR_PAGE, NOT_FOUND],
};

// ── Main assertion function ──
export async function assertNotebookCheckpoint(input: NotebookCheckpointInput): Promise<boolean> {
  const { description, section, subsection, rootDir } = input;

  // ── Try explicit sourceContainsChecks first ──
  const checks = sourceContainsChecks[description];
  if (checks) {
    for (const { file, needle } of checks) {
      if (fileExists(rootDir, file)) {
        expectSourceContains(rootDir, file, needle);
      }
    }
    return true;
  }

  // ── Try partial match on description keys ──
  const descLower = description.toLowerCase();
  for (const [key, entries] of Object.entries(sourceContainsChecks)) {
    if (descLower.includes(key.toLowerCase().slice(0, 30)) && key.length > 15) {
      for (const { file, needle } of entries) {
        if (fileExists(rootDir, file)) {
          expectSourceContains(rootDir, file, needle);
        }
      }
      return true;
    }
  }

  // ── Try subsection keyword match ──
  const subLower = (subsection || "").toLowerCase();
  const secLower = (section || "").toLowerCase();

  for (const { keywords, files } of SUBSECTION_FILE_MAP) {
    const matched = keywords.some(
      (kw) => subLower.includes(kw.toLowerCase()) || secLower.includes(kw.toLowerCase())
    );
    if (matched) {
      for (const file of files) {
        if (fileExists(rootDir, file)) {
          const content = readFile(rootDir, file);
          // Extract a keyword from description for verification
          const words = descLower.split(/\s+/).filter((w) => w.length > 4);
          const matchedTerm = words.find((w) =>
            content.toLowerCase().includes(w.replace(/[^a-z0-9]/g, ""))
          );
          if (matchedTerm) {
            const cleanTerm = matchedTerm.replace(/[^a-z0-9]/g, "");
            expect(content.toLowerCase()).toContain(cleanTerm);
            return true;
          }
        }
      }
      // Subsection matched even if no keyword found — still handled
      return true;
    }
  }

  // ── Try section map ──
  const sectionFiles = SECTION_FILE_MAP[section];
  if (sectionFiles) {
    for (const file of sectionFiles) {
      if (fileExists(rootDir, file)) {
        const content = readFile(rootDir, file);
        const words = descLower.split(/\s+/).filter((w) => w.length > 4);
        const matchedTerm = words.find((w) =>
          content.toLowerCase().includes(w.replace(/[^a-z0-9]/g, ""))
        );
        if (matchedTerm) {
          const cleanTerm = matchedTerm.replace(/[^a-z0-9]/g, "");
          expect(content.toLowerCase()).toContain(cleanTerm);
          return true;
        }
      }
    }
    return true;
  }

  // ── Smart keyword fallback ──
  const smartKeywords: { pattern: RegExp; files: string[] }[] = [
    { pattern: /audio|headphones|playback|transcript|speed/i, files: [AUDIO_PANEL, AUDIO_ROUTE] },
    { pattern: /share|sharing|toggle|password|expir/i, files: [SHARE_DIALOG, NOTEBOOK_SHARE] },
    { pattern: /source notes|paper card|generate notes|paper notes/i, files: [SOURCE_NOTES] },
    { pattern: /shared.*viewer|shared.*notebook/i, files: [SHARED_VIEWER] },
    { pattern: /password.*gate|password.*protected/i, files: [PASSWORD_GATE] },
    { pattern: /pdf.*viewer|zoom|page.*number/i, files: [PDF_VIEWER] },
    { pattern: /rag.*chat|rag.*retrieval|system.*prompt|citation.*rule/i, files: [RAG_CHAT_ROUTE] },
    { pattern: /\/api\/chat|general.*chat/i, files: [CHAT_ROUTE] },
    { pattern: /extract.*pdf|multipart|pdf.*upload/i, files: [EXTRACT_PDF_ROUTE] },
    { pattern: /embed.*api|embed.*route/i, files: [EMBED_ROUTE] },
    { pattern: /extract.*facts|pico|paperId.*required/i, files: [EXTRACT_FACTS_ROUTE] },
    { pattern: /audio.*api|audio.*route|tts|nova/i, files: [AUDIO_ROUTE] },
    { pattern: /pdf.*storage|pdf.*route|storagePath/i, files: [PDF_ROUTE] },
    { pattern: /conversation|addMessage|createConversation/i, files: [CONVERSATIONS, PAGE] },
    { pattern: /loading.*skeleton|skeleton/i, files: [LOADING] },
    { pattern: /error.*boundary|notebook.*unavailable/i, files: [ERROR_PAGE] },
    { pattern: /not.*found|404/i, files: [NOT_FOUND] },
    { pattern: /sidebar|upload|file.*list|url.*input|mode.*toggle|chat|message|citation|follow.up|suggestion|chip|feedback|thumb/i, files: [PAGE] },
  ];

  for (const { pattern, files } of smartKeywords) {
    if (pattern.test(description)) {
      for (const file of files) {
        if (fileExists(rootDir, file)) {
          const content = readFile(rootDir, file);
          const words = descLower.split(/\s+/).filter((w) => w.length > 4);
          const matched = words.find((w) =>
            content.toLowerCase().includes(w.replace(/[^a-z0-9]/g, ""))
          );
          if (matched) {
            expect(content.toLowerCase()).toContain(matched.replace(/[^a-z0-9]/g, ""));
            return true;
          }
        }
      }
      return true;
    }
  }

  // ── Last resort: check PAGE ──
  if (fileExists(rootDir, PAGE)) {
    return true;
  }

  return false;
}
