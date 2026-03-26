CREATE TABLE document_hashtags (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES synthesis_documents(id) ON DELETE CASCADE,
  section_id INTEGER NOT NULL REFERENCES synthesis_sections(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_doc_hashtags_user ON document_hashtags(user_id);
CREATE INDEX idx_doc_hashtags_tag ON document_hashtags(tag);
CREATE INDEX idx_doc_hashtags_doc ON document_hashtags(document_id);
CREATE UNIQUE INDEX idx_doc_hashtags_unique ON document_hashtags(document_id, section_id, tag);
