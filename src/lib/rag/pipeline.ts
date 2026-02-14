import { generateMultiQueries } from "./query-enhancer";
import { generateHypotheticalAnswer } from "./hyde";
import { extractMetadataFilters } from "./self-query";
import { decomposeQuery } from "./decomposer";
import { searchVector, searchKeyword } from "./search";
import { reciprocalRankFusion } from "./fusion";
import { rerankChunks } from "./reranker";
import { compressChunks } from "./compressor";
import type { RerankedChunk } from "./reranker";
import type { CompressedChunk } from "./compressor";

export interface RAGConfig {
  useMultiQuery?: boolean;
  useHyDE?: boolean;
  useSelfQuery?: boolean;
  useRerank?: boolean;
  useCompression?: boolean;
  useDecomposition?: boolean;
  topK?: number;
  vectorLimit?: number;
  keywordLimit?: number;
}

export type RAGResult = CompressedChunk | RerankedChunk;

export async function advancedRetrieve(
  query: string,
  paperIds: number[],
  config: RAGConfig = {}
): Promise<RAGResult[]> {
  const {
    useMultiQuery = true,
    useHyDE = true,
    useSelfQuery = true,
    useRerank = true,
    useCompression = false,
    useDecomposition = false,
    topK = 8,
    vectorLimit = 20,
    keywordLimit = 20,
  } = config;

  // Step 0: Query decomposition (optional)
  if (useDecomposition) {
    const subQuestions = await decomposeQuery(query);
    if (subQuestions) {
      const allResults: RAGResult[] = [];
      for (const subQ of subQuestions) {
        const subResults = await advancedRetrieve(subQ, paperIds, {
          ...config,
          useDecomposition: false,
          topK: Math.ceil(topK / subQuestions.length),
        });
        allResults.push(...subResults);
      }
      // Deduplicate by chunk ID
      const seen = new Set<number>();
      return allResults.filter((r) => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      });
    }
  }

  // Step 1: Extract metadata filters
  let sectionFilter: string | undefined;
  if (useSelfQuery) {
    const filters = await extractMetadataFilters(query);
    sectionFilter = filters.sectionType;
  }

  // Step 2: Generate query variations
  let queries = [query];
  if (useMultiQuery) {
    queries = await generateMultiQueries(query);
  }

  // Step 3: HyDE — also embed a hypothetical answer
  let embeddingTexts = queries;
  if (useHyDE) {
    const hydeAnswer = await generateHypotheticalAnswer(query);
    embeddingTexts = [...queries, hydeAnswer];
  }

  // Step 4: Hybrid search for each query variation
  const allVectorResults = [];
  const allKeywordResults = [];

  // Vector search with all embedding texts (original + variations + HyDE)
  for (const text of embeddingTexts) {
    const vectorResults = await searchVector(text, paperIds, vectorLimit, {
      sectionType: sectionFilter,
    });
    allVectorResults.push(...vectorResults);
  }

  // Keyword search with original + variations (not HyDE — HyDE text is synthetic)
  for (const q of queries) {
    const keywordResults = await searchKeyword(q, paperIds, keywordLimit);
    allKeywordResults.push(...keywordResults);
  }

  // Step 5: Reciprocal Rank Fusion
  const fused = reciprocalRankFusion(allVectorResults, allKeywordResults);

  // Step 6: Cohere Rerank
  let ranked: RerankedChunk[];
  if (useRerank && fused.length > 0) {
    ranked = await rerankChunks(query, fused.slice(0, 20), topK);
  } else {
    ranked = fused
      .slice(0, topK)
      .map((c) => ({ ...c, rerankScore: c.rrfScore }));
  }

  // Step 7: Contextual Compression (optional)
  if (useCompression && ranked.length > 0) {
    return await compressChunks(query, ranked);
  }

  return ranked;
}
