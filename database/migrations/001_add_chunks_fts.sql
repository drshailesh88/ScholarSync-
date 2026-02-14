-- Add GIN index for full-text search on paper_chunks
-- This enables hybrid search (vector + keyword) in the RAG pipeline
CREATE INDEX IF NOT EXISTS idx_paper_chunks_fts
  ON paper_chunks USING gin(to_tsvector('english', text));
