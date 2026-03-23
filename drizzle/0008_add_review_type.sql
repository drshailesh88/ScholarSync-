-- Migration: Add review_type enum and column to systematic_review_config
-- Purpose: Allow projects to declare the type of systematic review (RCT, cohort, scoping, etc.)
--          so that screening criteria, risk-of-bias tools, and synthesis pipelines can adapt.

-- 1. Create the enum type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'review_type') THEN
    CREATE TYPE review_type AS ENUM (
      'intervention_rct',
      'intervention_non_rct',
      'observational_cohort',
      'observational_case_control',
      'diagnostic_accuracy',
      'prognostic',
      'qualitative',
      'mixed_methods',
      'scoping',
      'umbrella'
    );
  END IF;
END
$$;

-- 2. Add column to systematic_review_config (safe re-run with IF NOT EXISTS)
ALTER TABLE systematic_review_config
  ADD COLUMN IF NOT EXISTS review_type review_type NOT NULL DEFAULT 'intervention_rct';

-- 3. Backfill any existing rows that might have NULL (belt-and-suspenders)
UPDATE systematic_review_config
  SET review_type = 'intervention_rct'
  WHERE review_type IS NULL;
