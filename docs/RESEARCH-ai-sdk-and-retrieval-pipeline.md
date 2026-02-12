# ScholarSync - AI SDK & Paper Retrieval Architecture Research

> **Date:** 2026-02-11
> **Status:** Research complete, awaiting founder decision

---

## 1. AI SDK Recommendation: Vercel AI SDK v6 + Mastra

### The Two-Layer Architecture

**Vercel AI SDK v6** (`ai` package) as the foundational model interface layer, and **Mastra** as the agent orchestration layer on top.

Mastra is built ON TOP of Vercel AI SDK by the team behind Gatsby. They share the same model routing, streaming, and tool-calling primitives.

### Vercel AI SDK v6 — Foundation Layer

- **Streaming-first**: `useChat` hook renders AI responses token-by-token with ~20 lines of code in Next.js
- **Structured output via Zod**: `generateText` with `Output.object()` for schemas
- **25+ provider support**: Claude (primary), GPT-4o (fallback), open models
- **Tool calling**: Zod schemas + execute functions
- **67.5 kB gzipped**: Half the size of LangChain.js
- **Next.js native**: Built by Vercel for Vercel

```bash
npm install ai @ai-sdk/anthropic @ai-sdk/openai
```

### Mastra — Agent Orchestration Layer

- **Graph-based workflows**: `.then()`, `.branch()`, `.parallel()` for multi-step pipelines
- **Agent loop control**: Fine control over stopping conditions, tool selection, state management
- **Human-in-the-loop suspension**: Agents pause and wait for user input (perfect for Learn Mode Socratic questioning)
- **Visual playground**: Debug agents step-by-step without deploying

```bash
npm install @mastra/core
```

### Feature-to-Layer Mapping

| Feature | Layer |
|---------|-------|
| Streaming chat (Studio, Notebook) | AI SDK `useChat` + `streamText` |
| Structured extraction (tables) | AI SDK `generateObject` + Zod schemas |
| Slash command AI (rephrase, expand) | AI SDK `generateText` with tools |
| Learn Mode (Socratic questioning) | **Mastra Agent** (human-in-the-loop) |
| Draft Mode (writing assistance) | AI SDK `streamText` with tools |
| Research synthesis pipeline | **Mastra Workflow** (multi-step graph) |
| Chat with PDF (RAG) | AI SDK embeddings + pgvector + `streamText` |
| Paper search orchestration | **Mastra Workflow** (parallel API calls) |

### Why NOT the Others

| SDK | Verdict | Reason |
|-----|---------|--------|
| **LangChain.js** | Skip | 101KB bundle, blocks Vercel Edge, over-abstracted |
| **LlamaIndex.ts** | Skip | RAG uses external APIs, not local indices |
| **OpenAI SDK directly** | Skip | Locks to one provider |
| **Anthropic SDK directly** | Skip | Same single-provider issue |
| **CrewAI JS** | Skip | No official JS SDK, only abandoned community ports |

---

## 2. Paper Retrieval Architecture (SciSpace/Elicit-Level)

### 8-Stage Pipeline

```
User Query
    ↓
[1. Query Augmentation]     ← LLM decomposes into sub-questions + MeSH terms
    ↓
[2. Multi-Source Retrieval]  ← PubMed + Semantic Scholar + OpenAlex (parallel)
    ↓
[3. Embedding + Dedup]      ← SPECTER2 embeddings, deduplicate across APIs
    ↓
[4. Re-Ranking]             ← Cohere Rerank v3.5 (cross-encoder scoring)
    ↓
[5. Citation Snowballing]   ← Forward + backward via S2/OpenAlex APIs
    ↓
[6. Structured Extraction]  ← LLM extracts fields into tables
    ↓
[7. Synthesis + Attribution] ← LLM summarizes with inline citations
```

### Stage 1: Query Augmentation

```typescript
const augmented = await generateObject({
  model: anthropic('claude-sonnet-4-20250514'),
  schema: z.object({
    subQuestions: z.array(z.string()),
    searchTerms: z.array(z.string()),
    filters: z.object({
      dateRange: z.string().optional(),
      studyTypes: z.array(z.string()).optional(),
    }),
  }),
  prompt: `Decompose this research question: "${userQuery}"`,
});
```

### Stage 2: Multi-Source Parallel Retrieval

Use Mastra's `.parallel()` to fan out to all three APIs:

```typescript
const searchWorkflow = new Workflow({ name: 'paper-search' })
  .step(augmentQuery)
  .parallel([searchPubMed, searchSemanticScholar, searchOpenAlex])
  .step(deduplicateAndMerge)
  .step(rerank)
  .step(extractFields);
```

### Stage 3: Embedding Model — SPECTER2

- **Model**: `allenai/specter2` on HuggingFace
- Trained on 6M scientific paper triplets across 23 fields
- Task-specific adapters for search, classification, citation prediction
- 768-dim embeddings
- **Fallback**: Cohere embed-v4 or OpenAI text-embedding-3-large

### Stage 4: Vector Database — pgvector

- Add vector columns to PostgreSQL (Supabase/Neon)
- Handles up to 10-100M vectors
- Avoids adding another specialized service
- **Scale-up path**: Qdrant when exceeding 10M vectors

### Stage 5: Re-Ranking — Cohere Rerank v3.5

```typescript
const reranked = await cohere.rerank({
  model: 'rerank-v3.5',
  query: userQuery,
  documents: mergedResults.map(r => r.abstract),
  topN: 20,
});
```
Cost: $2/1,000 queries.

### Stage 6: Citation Graph Snowballing

```typescript
const snowball = async (seedPaperIds: string[], depth: number = 1) => {
  const forward = await s2BatchCitations(seedPaperIds);
  const backward = await s2BatchReferences(seedPaperIds);
  const newPapers = deduplicate([...forward, ...backward], alreadySeen);
  if (depth > 0 && newPapers.length > 0) {
    return snowball(newPapers.slice(0, 10), depth - 1);
  }
  return newPapers;
};
```

### Stage 7: Structured Extraction

```typescript
const extracted = await generateObject({
  model: anthropic('claude-sonnet-4-20250514'),
  schema: z.object({
    studyDesign: z.string(),
    sampleSize: z.number().optional(),
    population: z.string(),
    intervention: z.string().optional(),
    outcomes: z.array(z.string()),
    keyFindings: z.string(),
    limitations: z.string(),
  }),
  prompt: `Extract structured data from this paper abstract: ${abstract}`,
});
```

### Advanced RAG Patterns (Phase 2)

- **RAPTOR**: Hierarchical summarization trees — best for Notebook Mode (chat across 5-10 papers)
- **GraphRAG**: Entity-relation graphs — best for cross-paper queries ("Which genes are associated with both X and Y?")

---

## 3. New Dependencies Summary

```bash
# AI SDK (foundation)
npm install ai @ai-sdk/anthropic @ai-sdk/openai

# Mastra (agent orchestration)
npm install @mastra/core

# PDF extraction (replacing pdf-parse)
npm install unpdf

# Cohere re-ranking: via REST API, no npm package needed
# pgvector: infrastructure (Supabase/Neon), not npm
# SPECTER2: self-hosted or HuggingFace Inference API
```

### New Services

| Service | Purpose | Cost |
|---------|---------|------|
| Cohere Rerank API | Cross-encoder re-ranking | $2/1,000 queries |
| pgvector (Neon/Supabase) | Vector storage | Free tier sufficient |
| Docling microservice | Academic PDF table extraction | Self-hosted, free |
| LanguageTool | Grammar/spelling | Free (self-hosted or public API) |
| SPECTER2 | Academic paper embeddings | Self-hosted or HuggingFace API |
