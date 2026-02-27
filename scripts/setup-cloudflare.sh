#!/bin/bash
# ScholarSync — Cloudflare Workers Setup
# Run this once to configure all Cloudflare resources.
#
# Prerequisites:
#   - Node.js installed
#   - npm install completed (for wrangler)
#   - Neon database created with connection string ready

set -e

echo "=== Step 1: Login to Cloudflare ==="
npx wrangler login

echo ""
echo "=== Step 2: Create R2 bucket ==="
npx wrangler r2 bucket create scholarsync-files
echo "R2 bucket 'scholarsync-files' created."

echo ""
echo "=== Step 3: Create KV namespace ==="
echo "Copy the 'id' from the output below into wrangler.jsonc → kv_namespaces[0].id"
npx wrangler kv namespace create VINEXT_CACHE

echo ""
echo "=== Step 4: Create Hyperdrive ==="
echo "You need your Neon connection string."
echo "Format: postgres://user:pass@ep-xxx.region.aws.neon.tech/scholarsync?sslmode=require"
read -p "Enter Neon connection string: " NEON_URL
echo "Copy the 'id' from the output below into wrangler.jsonc → hyperdrive[0].id"
npx wrangler hyperdrive create scholarsync-db --connection-string="$NEON_URL"

echo ""
echo "=== Step 5: Set secrets ==="
echo "You'll be prompted for each secret value. Press Enter to skip any you don't have yet."

SECRETS=(
  CLERK_SECRET_KEY
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
  NEXT_PUBLIC_POSTHOG_KEY
  OPENAI_API_KEY
  ANTHROPIC_API_KEY
  DATABASE_URL
  LATEX_COMPILER_URL
  LATEX_COMPILER_SECRET
  RAZORPAY_KEY_ID
  RAZORPAY_KEY_SECRET
  RAZORPAY_WEBHOOK_SECRET
  SENTRY_DSN
  LANGFUSE_PUBLIC_KEY
  LANGFUSE_SECRET_KEY
  LANGFUSE_BASE_URL
  LIVEBLOCKS_SECRET_KEY
  UPSTASH_REDIS_REST_URL
  UPSTASH_REDIS_REST_TOKEN
)

for secret in "${SECRETS[@]}"; do
  echo ""
  echo "Setting $secret..."
  npx wrangler secret put "$secret" || echo "Skipped $secret"
done

echo ""
echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "  1. Paste the KV namespace ID and Hyperdrive ID into wrangler.jsonc"
echo "  2. npm run build"
echo "  3. npx wrangler deploy"
