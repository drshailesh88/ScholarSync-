CREATE TABLE IF NOT EXISTS cerqual_assessments (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  finding_id TEXT NOT NULL,
  finding_statement TEXT NOT NULL,
  contributing_studies INTEGER NOT NULL DEFAULT 0,
  components JSONB NOT NULL,
  overall_confidence TEXT NOT NULL CHECK (overall_confidence IN ('high', 'moderate', 'low', 'very low')),
  explanation TEXT DEFAULT '',
  assessed_by TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, finding_id)
);

CREATE INDEX IF NOT EXISTS idx_cerqual_project ON cerqual_assessments(project_id);
