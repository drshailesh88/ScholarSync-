#!/bin/bash
# Deploy the LaTeX compiler microservice to Google Cloud Run.
#
# This is the only component that stays on GCP — Cloudflare Workers
# can't run Tectonic (LaTeX compiler) natively.
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - LATEX_COMPILER_SECRET chosen (random string for auth)

set -e

cd "$(dirname "$0")/../services/latex-compiler"

REGION="${GCP_REGION:-asia-south1}"
SECRET="${LATEX_COMPILER_SECRET:?Set LATEX_COMPILER_SECRET before running}"

echo "Deploying latex-compiler to Cloud Run ($REGION)..."
gcloud run deploy latex-compiler \
  --source . \
  --region "$REGION" \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3 \
  --timeout 60 \
  --set-env-vars "LATEX_COMPILER_SECRET=$SECRET"

echo ""
echo "Done. Now set the service URL as a Cloudflare secret:"
echo "  npx wrangler secret put LATEX_COMPILER_URL"
echo "  (paste the URL from the output above)"
