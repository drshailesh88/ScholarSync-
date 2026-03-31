DO $$
BEGIN
  CREATE TYPE "domain_preference_level" AS ENUM ('mute', 'lower', 'higher', 'prefer');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS "domain_preferences" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "domain" text NOT NULL,
  "level" "domain_preference_level" NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

DO $$
BEGIN
  ALTER TABLE "domain_preferences"
    ADD CONSTRAINT "domain_preferences_user_domain_unique"
    UNIQUE ("user_id", "domain");
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE INDEX IF NOT EXISTS "idx_domain_prefs_user" ON "domain_preferences" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_domain_prefs_level" ON "domain_preferences" ("level");
