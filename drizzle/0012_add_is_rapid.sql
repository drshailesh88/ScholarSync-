-- Migration: Add is_rapid flag to systematic_review_config
ALTER TABLE systematic_review_config ADD COLUMN IF NOT EXISTS is_rapid BOOLEAN DEFAULT FALSE;
