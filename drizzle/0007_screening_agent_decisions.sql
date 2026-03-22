-- Migration: Add screening_agent_decisions table
-- Purpose: Store individual agent decisions for deterministic caching + audit trail
-- Currently, only the consensus is stored. Individual Agent A/B/C decisions are lost.

CREATE TABLE IF NOT EXISTS screening_agent_decisions (
  id              SERIAL PRIMARY KEY,
  project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  paper_id        INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  agent_index     SMALLINT NOT NULL CHECK (agent_index IN (0, 1, 2)),
  content_hash    TEXT NOT NULL,
  decision        TEXT NOT NULL CHECK (decision IN ('include', 'exclude', 'uncertain')),
  confidence      REAL NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  reasoning       TEXT NOT NULL,
  matched_inclusion INTEGER[] DEFAULT '{}',
  matched_exclusion INTEGER[] DEFAULT '{}',
  model_id        TEXT,
  temperature     REAL DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Cache lookup: given a content hash, return the cached decision instantly
CREATE UNIQUE INDEX IF NOT EXISTS idx_agent_cache_lookup
  ON screening_agent_decisions (content_hash, agent_index);

-- Audit queries: show all agent decisions for paper X in project Y
CREATE INDEX IF NOT EXISTS idx_agent_decisions_project_paper
  ON screening_agent_decisions (project_id, paper_id);

-- Analytics: how often does Agent B disagree with the consensus?
CREATE INDEX IF NOT EXISTS idx_agent_decisions_agent
  ON screening_agent_decisions (agent_index, decision);

COMMENT ON TABLE screening_agent_decisions IS
  'Individual agent-level screening decisions. Used for: (1) deterministic caching — same content hash always returns the same decision, (2) audit trail — reviewers can inspect why each agent voted the way it did, (3) inter-agent agreement analytics.';

COMMENT ON COLUMN screening_agent_decisions.content_hash IS
  'SHA-256 of normalized(criteria + title + abstract + agent_index). Cache key for deterministic re-screening.';
