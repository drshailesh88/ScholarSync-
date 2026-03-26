ALTER TABLE "synthesis_documents"
ADD COLUMN IF NOT EXISTS "marks" jsonb DEFAULT '{}'::jsonb;
