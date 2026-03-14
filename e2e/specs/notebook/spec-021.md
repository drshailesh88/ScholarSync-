# notebook — Spec 021

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### `/api/rag-chat/route.ts` — RAG Chat API Internals
- [ ] Rate-limited via `checkRateLimit(userId, "rag-chat", RATE_LIMITS.ai)`; rate limit hit returns the rate-limit response directly
- [ ] Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
- [ ] When AI is not configured (`!isAIConfigured()`), returns a deterministic fallback via `buildFallbackNotebookAnswer()` with the same `X-RAG-Sources` and `X-RAG-Coverage` headers
- [ ] RAG retrieval failure is caught and logged as warning `"RAG retrieval failed, falling back to no-context mode"`; streaming continues without context chunks
- [ ] `streamText` error falls back to `buildFallbackNotebookAnswer()` with source headers intact (second fallback path)
- [ ] Outer catch returns `{ error: "An error occurred while processing your request. Please try again." }` with status 500
- [ ] System prompt base text is `"You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions."`
- [ ] Notebook mode appends `" You are in Notebook mode — analyzing uploaded research sources."` to the system prompt
- [ ] System prompt includes 5 CRITICAL RULES for citation behavior when context chunks are present, starting with `"For EVERY factual claim, cite the source number in brackets like [1] or [1][2]."`
- [ ] Default RAG pipeline config: `topK: 8`, `useMultiQuery: true`, `useHyDE: true`, `useSelfQuery: true`, `useRerank: true`, `useCompression: false`
- [ ] Fallback answer with zero chunks: `"I couldn't retrieve grounded source passages for that question.\n\nTry selecting more sources or ask a narrower question tied to the uploaded papers."`
- [ ] Fallback answer with chunks uses top 4 chunks as evidence lines, each snippet truncated to 280 characters
- [ ] Coverage report `unusedPapers` array contains objects with `id` and `title` fields, filtered from papers where `contributed` is false
- [ ] Source metadata array entries include `chunkId` alongside `sourceIndex`, `paperId`, `paperTitle`, `paperAuthors`, `pageNumber`, and `sectionType`
#### `/api/chat/route.ts` — General Chat API Internals
- [ ] Request body validated by Zod: `messages` array max(50) with no minimum (unlike rag-chat which requires min 1)
- [ ] Authentication failure returns `{ error: "Authentication required." }` with status 401
- [ ] Rate-limited via `checkRateLimit(userId, "chat", RATE_LIMITS.ai)`
- [ ] Validation failure returns `{ error: "Invalid request. Please check your input and try again." }` with status 400
- [ ] AI not configured returns `{ error: "AI service is not configured. Please contact an administrator." }` with status 503
- [ ] Mode `"learn"` in `/api/chat` triggers the Socratic guide system prompt via `getGuideSystemPrompt()` or `getDefaultGuidePrompt()`
- [ ] Mode `"notebook"` (research mode) falls through to the standard assistant prompt: `"You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone."`
- [ ] Server error returns `{ error: "An unexpected error occurred. Please try again." }` with status 500
#### `/api/extract-pdf/route.ts` — PDF Extraction API Internals
- [ ] Max file size limit is 20MB (`20 * 1024 * 1024` bytes)
- [ ] Content-Type must include `"multipart/form-data"` or returns 400 with `{ error: "Content-Type must be multipart/form-data" }`
- [ ] Missing file field returns 400 with `{ error: "No PDF file provided. Include a 'file' field in the form data." }`
- [ ] Non-PDF file returns 400 with `{ error: "Uploaded file must be a PDF" }` — validated by MIME type containing `"pdf"` OR filename ending `.pdf` case-insensitively
- [ ] Oversized file returns 413 with `{ error: "File size exceeds the 20MB limit. Uploaded file is X.XMB." }` showing actual size
- [ ] Successful extraction returns `{ text, pages, info: { title?, author? } }` where title and author come from PDF metadata
- [ ] Server error returns 500 with `{ error: "Failed to extract text from PDF" }`
#### `/api/embed/route.ts` — Embed API Internals
- [ ] Zod schema requires `paperId` to be `z.number().int().positive()` — negative, zero, or non-integer values rejected
- [ ] Validation failure returns 400 with `{ error: "Invalid input", issues: [...] }` including Zod issue details
- [ ] Rate-limited via `RATE_LIMITS.embed` — a different rate limit tier than the `RATE_LIMITS.ai` used by chat/rag-chat
- [ ] Server error returns 500 with `{ error: "Failed to embed paper" }`
#### `/api/extract-facts/route.ts` — Extract Facts API Internals
- [ ] Supports batch extraction via `paperIds` array (max 50) in addition to single `paperId`
- [ ] Missing `paperId` when no `paperIds` array provided returns 400 with `{ error: "paperId (number) is required" }`
