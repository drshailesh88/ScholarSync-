-- Migration: Add MOOSE checklist assessments table
-- Purpose: Store MOOSE reporting compliance assessments for observational meta-analyses

CREATE TABLE IF NOT EXISTS moose_assessments (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  compliance TEXT NOT NULL CHECK (compliance IN ('Complete', 'Minor gaps', 'Major gaps')),
  completed_count INTEGER NOT NULL DEFAULT 0,
  total_applicable INTEGER NOT NULL DEFAULT 0,
  completion_rate REAL NOT NULL DEFAULT 0,
  assessed_by TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id)
);

CREATE INDEX IF NOT EXISTS idx_moose_project ON moose_assessments(project_id);
