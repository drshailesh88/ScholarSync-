# notebook — Spec 021

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### `/api/rag-chat/route.ts` — RAG Chat API Internals
- [x] PASS: Rate-limited via `checkRateLimit(userId, "rag-chat", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly
- [x] PASS: Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
- [x] PASS: When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers
- [x] PASS: RAG retrieval failure is caught and logged as warning `"RAG retrieval failed, falling back to no-context mode"`; streaming continues without context chunks
- [x] PASS: `streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)
- [x] PASS: Outer catch returns `{ error: "An error occurred while processing your request. Please try again." }` with status 500
- [x] PASS: System prompt base text is `"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions."`
- [x] PASS: Notebook mode appends `" You are in Notebook mode — analyzing uploaded research sources."` to the system prompt
- [x] PASS: System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `"For EVERY factual claim, cite the source number in brackets like [1] or [1][2]."`
- [x] PASS: Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`
- [x] PASS: Fallback answer with zero chunks: `"I couldn't retrieve grounded source passages for that question.\n\nTry selecting more sources or ask a narrower question tied to the uploaded papers."`
- [x] PASS: Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters
- [x] PASS: Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false
- [x] PASS: Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`
#### `/api/chat/route.ts` — General Chat API Internals
- [x] PASS: Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)
- [x] PASS: Authentication failure returns `{ error: "Authentication required." }` with status 401
- [x] PASS: Rate-limited via `checkRateLimit(userId, "chat", RATE_LIMITS.ai)`
- [x] PASS: Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
- [x] PASS: AI not configured returns `{ error: "AI service is not configured. Please contact an administrator." }` with status 503
- [x] PASS: Mode `"learn"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`
- [x] PASS: Mode `"notebook"` (research mode) falls through to the standard assistant prompt: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
- [x] PASS: Server error returns `{ error: "An unexpected error occurred. Please try again." }` with status 500
#### `/api/extract-pdf/route.ts` — PDF Extraction API Internals
- [x] PASS: Max file size limit is 20MB (`20 * 1024 * 1024` bytes)
- [x] PASS: Content-Type must include `"multipart/form-data"` or returns 400 with `{ error: "Content-Type must be multipart/form-data" }`
- [x] PASS: Missing file field returns 400 with `{ error: "No PDF file provided. Include a 'file' field in the form data." }`
- [x] PASS: Non-PDF file returns 400 with `{ error: "Uploaded file must be a PDF" }` — validated by MIME type containing `"pdf"` OR filename ending `.pdf` case-insensitively
- [x] PASS: Oversized file returns 413 with `{ error: "File size exceeds the 20MB limit. Uploaded file is X.XMB." }` showing actual size
- [x] PASS: Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata
- [x] PASS: Server error returns 500 with `{ error: "Failed to extract text from PDF" }`
#### `/api/embed/route.ts` — Embed API Internals
- [x] PASS: Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected
- [x] PASS: Validation failure returns 400 with `{ error: "Invalid input", issues: [...] }` including Zod issue details
- [x] PASS: Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat
- [x] PASS: Server error returns 500 with `{ error: "Failed to embed paper" }`
#### `/api/extract-facts/route.ts` — Extract Facts API Internals
- [x] PASS: Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`
- [x] PASS: Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: "paperId (number) is required" }`
