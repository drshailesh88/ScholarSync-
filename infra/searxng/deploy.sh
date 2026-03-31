#!/bin/bash
# Deploy SearXNG to GCP Compute Engine
# Run this script from the infra/searxng/ directory
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - GCP project set: gcloud config set project YOUR_PROJECT_ID
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh

set -e

# ── Configuration ──────────────────────────────────────────
PROJECT_ID=$(gcloud config get-value project)
INSTANCE_NAME="scholarsync-searxng"
ZONE="asia-south1-a"  # Mumbai — closest to India users
MACHINE_TYPE="e2-small"  # 2 vCPU, 2GB RAM — sufficient for 1,000 users

echo "=== Deploying SearXNG to GCP ==="
echo "Project: $PROJECT_ID"
echo "Instance: $INSTANCE_NAME"
echo "Zone: $ZONE"
echo "Machine: $MACHINE_TYPE"
echo ""

# ── Step 1: Create the instance (if it doesn't exist) ──────
if gcloud compute instances describe "$INSTANCE_NAME" --zone="$ZONE" &>/dev/null; then
  echo "Instance $INSTANCE_NAME already exists. Updating..."
else
  echo "Creating instance $INSTANCE_NAME..."
  gcloud compute instances create "$INSTANCE_NAME" \
    --zone="$ZONE" \
    --machine-type="$MACHINE_TYPE" \
    --image-family=cos-stable \
    --image-project=cos-cloud \
    --boot-disk-size=10GB \
    --tags=http-server,searxng \
    --metadata=startup-script='#!/bin/bash
      # Install Docker Compose
      docker pull docker/compose:latest 2>/dev/null || true
    '

  echo "Creating firewall rule for SearXNG (port 8080)..."
  gcloud compute firewall-rules create allow-searxng \
    --allow=tcp:8080 \
    --target-tags=searxng \
    --description="Allow SearXNG traffic" \
    --source-ranges="0.0.0.0/0" 2>/dev/null || true
fi

# ── Step 2: Copy config files to the instance ──────────────
echo "Copying SearXNG config files..."
gcloud compute scp --zone="$ZONE" --recurse \
  docker-compose.yml settings.yml \
  "$INSTANCE_NAME":~/searxng/

# ── Step 3: Start SearXNG ──────────────────────────────────
echo "Starting SearXNG on the instance..."
gcloud compute ssh "$INSTANCE_NAME" --zone="$ZONE" --command='
  cd ~/searxng
  # Generate a random secret key
  sed -i "s/CHANGE_THIS_TO_A_RANDOM_STRING/$(openssl rand -hex 32)/" settings.yml
  # Start SearXNG
  docker compose up -d
  echo "SearXNG started. Waiting for health check..."
  sleep 5
  curl -s http://localhost:8080/search?q=test\&format=json | head -c 200
  echo ""
  echo "=== SearXNG is running ==="
'

# ── Step 4: Get the external IP ────────────────────────────
EXTERNAL_IP=$(gcloud compute instances describe "$INSTANCE_NAME" \
  --zone="$ZONE" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "SearXNG URL: http://$EXTERNAL_IP:8080"
echo "JSON API:    http://$EXTERNAL_IP:8080/search?q=test&format=json"
echo ""
echo "Add this to your .env:"
echo "SEARXNG_URL=http://$EXTERNAL_IP:8080"
echo ""
echo "To check status: gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command='docker compose -f ~/searxng/docker-compose.yml ps'"
echo "To view logs:    gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command='docker compose -f ~/searxng/docker-compose.yml logs -f'"
echo "To restart:      gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command='docker compose -f ~/searxng/docker-compose.yml restart'"
