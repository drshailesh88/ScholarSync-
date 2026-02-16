-- Migration 002: Add performance indexes
-- These indexes match the Drizzle schema definitions but are written as
-- idempotent SQL so the migration can be run safely against any database
-- state (e.g. before or after drizzle-kit push).
--
-- All indexes use IF NOT EXISTS to be fully idempotent.

-- papers(doi) - dedup lookups by DOI
CREATE INDEX IF NOT EXISTS idx_papers_doi ON papers (doi);

-- papers(source) - filtering papers by ingestion source
CREATE INDEX IF NOT EXISTS idx_papers_source ON papers (source);

-- paper_chunks(paper_id) - RAG chunk retrieval by parent paper
CREATE INDEX IF NOT EXISTS idx_paper_chunks_paper ON paper_chunks (paper_id);

-- user_references(user_id) - user library queries
CREATE INDEX IF NOT EXISTS idx_user_refs_user ON user_references (user_id);

-- synthesis_sections(document_id) - loading all sections for a document
CREATE INDEX IF NOT EXISTS idx_synthesis_sections_doc ON synthesis_sections (document_id);

-- messages(conversation_id) - chat history retrieval
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages (conversation_id);

-- slides(deck_id) - presentation slide loading
CREATE INDEX IF NOT EXISTS idx_slides_deck ON slides (deck_id);
