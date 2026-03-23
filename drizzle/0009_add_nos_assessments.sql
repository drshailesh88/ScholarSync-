-- Migration: Add NOS assessments table
-- Purpose: Store Newcastle-Ottawa Scale quality assessments for observational studies

CREATE TABLE IF NOT EXISTS nos_assessments (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  study_design TEXT NOT NULL CHECK (study_design IN ('cohort', 'case-control')),
  items JSONB NOT NULL,
  selection_score INTEGER NOT NULL DEFAULT 0,
  comparability_score INTEGER NOT NULL DEFAULT 0,
  outcome_exposure_score INTEGER NOT NULL DEFAULT 0,
  total_stars INTEGER NOT NULL DEFAULT 0,
  max_stars INTEGER NOT NULL DEFAULT 9,
  quality_rating TEXT NOT NULL CHECK (quality_rating IN ('good', 'fair', 'poor')),
  overall_rationale TEXT DEFAULT '',
  assessed_by TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, paper_id)
);

CREATE INDEX IF NOT EXISTS idx_nos_project ON nos_assessments(project_id);
CREATE INDEX IF NOT EXISTS idx_nos_paper ON nos_assessments(paper_id);
