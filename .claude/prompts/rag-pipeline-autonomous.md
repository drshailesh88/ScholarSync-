# ScholarSync — Advanced RAG Pipeline + Infrastructure Fixes — Autonomous Build Prompt

Paste everything below this line into the autonomous terminal:

---

You are building ScholarSync's advanced RAG pipeline and fixing critical infrastructure gaps autonomously. You must build continuously until ALL items are complete. Never stop to ask for input. Never wait for confirmation. If something breaks, fix it and keep going.

## PROJECT CONTEXT

ScholarSync is an AI-powered academic writing platform for Indian medical students. It's a Next.js 16 App Router project at the current working directory.

**What exists:** Full 10-page app (dashboard, studio, research, notebook, library, projects, compliance, presentation, analysis, settings), Clerk auth, 71-table Drizzle ORM schema, dual-provider AI system (Z.AI GLM-5 default, Claude fallback), Tiptap editor, PubMed + Semantic Scholar search, basic RAG chat.

**What's broken:** The RAG chat is primitive — 1 embedding, 5 nearest chunks, no citations. Papers saved from search are invisible to RAG. Editor auto-save never fires. Embed errors are silently swallowed. PDFs stored in /tmp.

**Your job:** Build a 9-strategy advanced retrieval pipeline in `src/lib/rag/` and fix 6 infrastructure gaps. The PRD with all code specifications is at `.taskmaster/docs/prd-rag-pipeline.txt`.

## YOUR METHODOLOGY

### 1. PRD-Driven Development
The PRD at `.taskmaster/docs/prd-rag-pipeline.txt` contains complete code for every file. READ IT FIRST. It has:
- Exact file paths for every new file
- Complete TypeScript implementations
- Type definitions and interfaces
- Integration points with existing code

### 2. Ralph Wiggum Loop (Build → Test → Fix → Repeat)
For EVERY file:
```
1. BUILD: Write the code exactly as specified in the PRD
2. TEST: Run `npx tsc --noEmit` to check TypeScript
3. FIX: If errors, fix them immediately
4. REPEAT until zero TypeScript errors
5. MOVE TO NEXT FILE
```

After all files are done:
```
6. Run `npm run build` — must pass clean
7. Fix any build errors
8. Done
```

## STEP-BY-STEP EXECUTION

Execute in this EXACT order. Do NOT skip steps or parallelize — each step depends on the previous.

### Phase 1: Read Context (DO THIS FIRST)

Read these files to understand the existing codebase:
1. `.taskmaster/docs/prd-rag-pipeline.txt` — The COMPLETE PRD (your primary reference)
2. `src/lib/ai/models.ts` — AI model utility (getModel, getSmallModel, getBigModel)
3. `src/lib/actions/embeddings.ts` — Existing embed functions (searchSimilarChunks, embedPaperChunks)
4. `src/lib/actions/papers.ts` — Existing savePaper function
5. `src/lib/actions/documents.ts` — Existing autoSaveVersion function
6. `src/app/api/rag-chat/route.ts` — Current basic RAG (will be rewritten)
7. `src/app/(app)/notebook/page.tsx` — Current notebook page
8. `src/app/(app)/studio/page.tsx` — Current studio page
9. `src/app/api/papers/[id]/pdf/route.ts` — Current PDF storage
10. `src/lib/db/schema/core.ts` — papers + paper_chunks table definitions
11. `src/app/globals.css` — Theme CSS variables
12. `src/lib/auth.ts` — getCurrentUserId function

### Phase 2: Create RAG Module Files (Items A1-A9)

Create the `src/lib/rag/` directory and ALL module files in dependency order:

**Step 1:** `src/lib/rag/search.ts` — Vector + keyword search functions
- Exports: `searchVector()`, `searchKeyword()`, `ChunkResult` interface
- Uses raw SQL for pgvector cosine distance and PostgreSQL tsvector
- MUST import `db` from `@/lib/db` and `sql` from `drizzle-orm`

**Step 2:** `src/lib/rag/fusion.ts` — Reciprocal Rank Fusion
- Exports: `reciprocalRankFusion()`, `FusedChunk` interface
- Imports: `ChunkResult` from `./search`
- Pure math, no external calls

**Step 3:** `src/lib/rag/reranker.ts` — Cohere rerank
- Exports: `rerankChunks()`, `RerankedChunk` interface
- Imports: `FusedChunk` from `./fusion`
- Graceful degradation when `COHERE_API_KEY` is missing — returns input unchanged
- Uses raw `fetch()` to Cohere API — NO npm package needed

**Step 4:** `src/lib/rag/compressor.ts` — Contextual compression
- Exports: `compressChunks()`, `CompressedChunk` interface
- Imports: `RerankedChunk` from `./reranker`
- Uses `getSmallModel()` + `generateText()` from `ai` package

**Step 5:** `src/lib/rag/query-enhancer.ts` — Multi-query generation
- Exports: `generateMultiQueries()`
- Uses `getSmallModel()` + `generateObject()` from `ai` package + `zod` schema

**Step 6:** `src/lib/rag/hyde.ts` — Hypothetical Document Embeddings
- Exports: `generateHypotheticalAnswer()`
- Uses `getSmallModel()` + `generateText()`

**Step 7:** `src/lib/rag/self-query.ts` — Metadata filter extraction
- Exports: `extractMetadataFilters()`, `MetadataFilters` type
- Uses `getSmallModel()` + `generateObject()` + `zod` schema

**Step 8:** `src/lib/rag/decomposer.ts` — Query decomposition
- Exports: `decomposeQuery()`
- Uses `getSmallModel()` + `generateObject()` + `zod` schema

**Step 9:** `src/lib/rag/pipeline.ts` — Unified orchestrator
- Exports: `advancedRetrieve()`, `RAGConfig`, `RAGResult`
- Imports ALL previous modules
- This is the MAIN entry point that chains: decomposition → self-query → multi-query → HyDE → hybrid search → RRF → rerank → compress

**Step 10:** `src/lib/rag/index.ts` — Barrel export
- Re-export `advancedRetrieve`, `RAGConfig`, `RAGResult` from `./pipeline`

### Phase 3: Rewrite RAG Chat Endpoint (Item A10)

**Rewrite:** `src/app/api/rag-chat/route.ts`
- Replace the entire file with the source-grounded version from the PRD
- Uses `advancedRetrieve()` from `@/lib/rag/pipeline`
- Fetches paper metadata (title, authors, year) for source attribution
- Instructs LLM to cite sources as [1], [2], etc.
- Returns `X-RAG-Sources` header with source metadata JSON
- Streams the response via `streamText`

### Phase 4: FTS Migration (Item A11)

**Create:** `database/migrations/001_add_chunks_fts.sql`
- GIN index on `to_tsvector('english', text)` for paper_chunks
- This is a documentation file for manual execution when the DB is set up

### Phase 5: Infrastructure Fixes (Items D1-D6)

**D1 — Fix embed error handling:**
Update `src/app/(app)/notebook/page.tsx`:
- Find the `.catch(() => {})` on the embed fetch call
- Replace with proper try/catch that tracks embed status per paper
- Add a retry button when embedding fails
- Show "Embedding failed — click to retry" UI

**D2 — Save search history:**
Create `src/lib/actions/search-history.ts`:
- Server action `saveSearchQuery()` that writes to `search_queries` table
- Takes: originalQuery, queryType, source, resultCount, augmentedQueries, filtersApplied
- Uses `getCurrentUserId()` from `@/lib/auth`
- Integrate: Call this from the research page after search completes

**D3 — Wire editor auto-save:**
Update `src/app/(app)/studio/page.tsx`:
- Add debounced `onUpdate` callback to TiptapEditor
- Save to localStorage as stopgap (since the studio uses mock data, not real document IDs)
- Show "Saved" indicator in the editor area
- 2-3 second debounce delay

**D4 — Bridge saved papers to RAG:**
Update `src/lib/actions/papers.ts`:
- Add `autoChunkPaper()` function that creates chunks from abstract + TLDR
- Call it at the end of `savePaper()` when abstract is present
- After chunking, trigger `embedPaperChunks()` in background
- Check for existing chunks to avoid duplicates

**D5 — Fix PDF storage path:**
Update `src/app/api/papers/[id]/pdf/route.ts`:
- Change from `/tmp/scholarsync-pdfs/` to `process.env.PDF_STORAGE_PATH || path.join(process.cwd(), ".data", "pdfs")`
- Add `PDF_STORAGE_PATH` to `.env.example`
- Add `.data/` to `.gitignore`

**D6 — Snowball search UI buttons:**
Update `src/app/(app)/research/page.tsx`:
- Add "Citing Papers" and "References" buttons on paper cards
- Use Phosphor Icons (ArrowsIn, ArrowsOut or similar)
- Handler calls S2 citations/references API
- NOTE: If the paper-fetching agent hasn't built the S2 API yet, create stub handlers with TODO comments

### Phase 6: Citation Rendering (Item A12)

Update `src/app/(app)/notebook/page.tsx`:
- Read `X-RAG-Sources` header from streamed RAG response
- Parse [1], [2] citation markers in AI response text
- Render as clickable superscript elements
- Add `SourcesPanel` component showing cited papers with title, authors, page, section
- Style with existing theme variables (text-brand for citation links)

### Phase 7: Verification

Run these checks and fix ALL issues:
```bash
npx tsc --noEmit       # Must be 0 errors
npm run build          # Must pass clean
```

If either fails, read the errors, fix them, and run again. Do NOT proceed to "done" with errors.

## CRITICAL CODING RULES

### AI Calls
- ALL AI calls use `getModel()`, `getSmallModel()`, or `getBigModel()` from `src/lib/ai/models.ts`
- NEVER hardcode model names
- Use `generateText`, `generateObject`, `streamText` from the `ai` package
- Use `zod` for all schema definitions in generateObject calls

### Database
- ALL database queries use Drizzle ORM patterns from existing code
- Import `db` from `@/lib/db`
- Import table definitions from `@/lib/db/schema`
- For raw SQL (vector search, FTS), use `sql` template from `drizzle-orm`
- ALL server actions call `getCurrentUserId()` from `@/lib/auth`

### Theme System
- NEVER hardcode colors — use theme CSS variables:
  - Backgrounds: `bg-background`, `bg-surface`, `bg-surface-raised`
  - Text: `text-ink`, `text-ink-muted`
  - Borders: `border-border`, `border-border-subtle`
  - Brand: `text-brand`
  - Glass: `.glass-panel` CSS class
- Test works in BOTH dark and light themes

### Component Conventions
- Icons: ONLY `@phosphor-icons/react` — NEVER Lucide, Heroicons, or others
- Use `cn()` from `src/lib/utils` for conditional class merging
- Server Components by default. Only `"use client"` when hooks/interactivity needed
- Use existing `GlassPanel`, `GlowCard` components where appropriate

### Import Patterns
```typescript
// AI
import { generateText, generateObject, streamText } from "ai";
import { getModel, getSmallModel } from "@/lib/ai/models";

// Database
import { db } from "@/lib/db";
import { papers, paperChunks } from "@/lib/db/schema";
import { eq, inArray, sql } from "drizzle-orm";

// Auth
import { getCurrentUserId } from "@/lib/auth";

// Zod
import { z } from "zod";
```

### No New Packages
- Cohere rerank uses raw `fetch()` — no `cohere-ai` npm package
- Everything else uses existing installed packages: `ai`, `drizzle-orm`, `zod`, `@phosphor-icons/react`
- Do NOT run `npm install` for anything

### TypeScript
- Strict mode — no `any` types
- All functions must have explicit return types
- All interfaces must be exported
- Use `unknown` instead of `any` when type is uncertain

### Error Handling
- API routes: try/catch with proper error responses (400, 500)
- Server actions: try/catch, return meaningful errors
- Cohere rerank: graceful degradation (return input unchanged if API fails)
- Embedding: proper error state, retry capability
- NEVER use `.catch(() => {})` — always handle errors

## EXISTING FILE LOCATIONS (for reference)

```
src/lib/ai/models.ts              # getModel(), getSmallModel(), getBigModel()
src/lib/db/index.ts               # Drizzle client
src/lib/db/schema/core.ts         # papers, paperChunks tables
src/lib/db/schema/index.ts        # Schema barrel export
src/lib/actions/embeddings.ts     # embedPaperChunks, searchSimilarChunks, generateEmbedding
src/lib/actions/papers.ts         # savePaper
src/lib/actions/documents.ts      # autoSaveVersion
src/lib/auth.ts                   # getCurrentUserId
src/lib/utils.ts                  # cn()
src/app/api/rag-chat/route.ts     # Current basic RAG (rewrite this)
src/app/api/embed/route.ts        # Embedding trigger endpoint
src/app/(app)/notebook/page.tsx   # Notebook page (update)
src/app/(app)/studio/page.tsx     # Studio page (update)
src/app/(app)/research/page.tsx   # Research page (update)
src/app/api/papers/[id]/pdf/route.ts  # PDF storage (update)
```

## FILE CREATION ORDER (strict sequence)

```
 1. src/lib/rag/search.ts           ← vector + keyword search
 2. src/lib/rag/fusion.ts           ← RRF (depends on search types)
 3. src/lib/rag/reranker.ts         ← Cohere (depends on fusion types)
 4. src/lib/rag/compressor.ts       ← compression (depends on reranker types)
 5. src/lib/rag/query-enhancer.ts   ← multi-query
 6. src/lib/rag/hyde.ts             ← HyDE
 7. src/lib/rag/self-query.ts       ← metadata filters
 8. src/lib/rag/decomposer.ts       ← query decomposition
 9. src/lib/rag/pipeline.ts         ← orchestrator (imports 1-8)
10. src/lib/rag/index.ts            ← barrel export
11. src/app/api/rag-chat/route.ts   ← REWRITE with advanced RAG
12. database/migrations/001_add_chunks_fts.sql  ← FTS migration
13. src/lib/actions/search-history.ts  ← search history server action
14. src/lib/actions/papers.ts       ← ADD autoChunkPaper + bridge
15. src/app/(app)/notebook/page.tsx  ← UPDATE: embed errors + citations
16. src/app/(app)/studio/page.tsx    ← UPDATE: wire auto-save
17. src/app/api/papers/[id]/pdf/route.ts  ← UPDATE: fix storage path
18. src/app/(app)/research/page.tsx  ← UPDATE: snowball buttons + search history
```

## GO

Start now. Read the PRD at `.taskmaster/docs/prd-rag-pipeline.txt` first — it has the complete code for every file. Then execute the build loop continuously. Run `npx tsc --noEmit` after every 3-4 files to catch errors early. Do not stop until ALL 18 files are created/updated and `npm run build` passes clean.
