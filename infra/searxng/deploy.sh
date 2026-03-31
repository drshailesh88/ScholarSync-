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

set -euo pipefail

# ── Configuration ──────────────────────────────────────────
PROJECT_ID=$(gcloud config get-value project)
INSTANCE_NAME="scholarsync-searxng"
DEFAULT_ZONES=("asia-south1-a" "asia-south1-b" "asia-south1-c")
DEFAULT_MACHINE_TYPES=("e2-small" "e2-medium")

if [[ -n "${SEARXNG_ZONES:-}" ]]; then
  IFS=', ' read -r -a ZONES <<< "$SEARXNG_ZONES"
else
  ZONES=("${DEFAULT_ZONES[@]}")
fi

if [[ -n "${SEARXNG_MACHINE_TYPES:-}" ]]; then
  IFS=', ' read -r -a MACHINE_TYPES <<< "$SEARXNG_MACHINE_TYPES"
else
  MACHINE_TYPES=("${DEFAULT_MACHINE_TYPES[@]}")
fi

if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "(unset)" ]]; then
  echo "No active GCP project configured. Run: gcloud config set project YOUR_PROJECT_ID" >&2
  exit 1
fi

SELECTED_ZONE=""
SELECTED_MACHINE_TYPE=""

find_existing_instance() {
  for zone in "${ZONES[@]}"; do
    if gcloud compute instances describe "$INSTANCE_NAME" --zone="$zone" &>/dev/null; then
      SELECTED_ZONE="$zone"
      return 0
    fi
  done

  return 1
}

create_instance() {
  local zone="$1"
  local machine_type="$2"

  gcloud compute instances create "$INSTANCE_NAME" \
    --zone="$zone" \
    --machine-type="$machine_type" \
    --image-family=cos-stable \
    --image-project=cos-cloud \
    --boot-disk-size=10GB \
    --tags=http-server,searxng \
    --metadata=startup-script='#!/bin/bash
      # Pre-pull the Docker Compose container fallback.
      docker pull docker/compose:latest 2>/dev/null || true
    '
}

echo "=== Deploying SearXNG to GCP ==="
echo "Project: $PROJECT_ID"
echo "Instance: $INSTANCE_NAME"
echo "Preferred zones: ${ZONES[*]}"
echo "Machine types: ${MACHINE_TYPES[*]}"
echo ""

# ── Step 1: Create the instance (if it doesn't exist) ──────
if find_existing_instance; then
  echo "Instance $INSTANCE_NAME already exists in zone $SELECTED_ZONE. Updating..."
else
  for machine_type in "${MACHINE_TYPES[@]}"; do
    for zone in "${ZONES[@]}"; do
      echo "Creating instance $INSTANCE_NAME in $zone with $machine_type..."
      if create_instance "$zone" "$machine_type"; then
        SELECTED_ZONE="$zone"
        SELECTED_MACHINE_TYPE="$machine_type"
        break 2
      fi

      echo "Instance creation failed in $zone with $machine_type. Trying next candidate..." >&2
    done
  done

  if [[ -z "$SELECTED_ZONE" ]]; then
    echo "Failed to create $INSTANCE_NAME in all configured zone/machine combinations." >&2
    exit 1
  fi

  echo "Creating firewall rule for SearXNG (port 8080)..."
  gcloud compute firewall-rules create allow-searxng \
    --allow=tcp:8080 \
    --target-tags=searxng \
    --description="Allow SearXNG traffic" \
    --source-ranges="0.0.0.0/0" 2>/dev/null || true
fi

echo "Using zone: $SELECTED_ZONE"
if [[ -n "$SELECTED_MACHINE_TYPE" ]]; then
  echo "Using machine type: $SELECTED_MACHINE_TYPE"
fi

# ── Step 2: Copy config files to the instance ──────────────
echo "Copying SearXNG config files..."
gcloud compute scp --zone="$SELECTED_ZONE" --recurse \
  docker-compose.yml settings.yml \
  "$INSTANCE_NAME":~/searxng/

# ── Step 3: Start SearXNG ──────────────────────────────────
echo "Starting SearXNG on the instance..."
REMOTE_STARTUP_COMMAND=$(cat <<'EOF'
set -euo pipefail

cd ~/searxng

compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
    return
  fi

  docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w "$PWD" \
    docker/compose:latest "$@"
}

# Generate a random secret key for this instance on first deploy.
sed -i "s/CHANGE_THIS_TO_A_RANDOM_STRING/$(openssl rand -hex 32)/" settings.yml

compose up -d

echo "SearXNG started. Waiting for health check..."
for attempt in $(seq 1 10); do
  if response=$(curl -fsS "http://localhost:8080/search?q=test&format=json"); then
    printf '%s\n' "${response:0:200}"
    echo "=== SearXNG is running ==="
    exit 0
  fi

  sleep 3
done

echo "SearXNG health check failed after startup." >&2
exit 1
EOF
)

gcloud compute ssh "$INSTANCE_NAME" --zone="$SELECTED_ZONE" --command="$REMOTE_STARTUP_COMMAND"

# ── Step 4: Get the external IP ────────────────────────────
EXTERNAL_IP=$(gcloud compute instances describe "$INSTANCE_NAME" \
  --zone="$SELECTED_ZONE" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "SearXNG URL: http://$EXTERNAL_IP:8080"
echo "JSON API:    http://$EXTERNAL_IP:8080/search?q=test&format=json"
echo ""
echo "Add this to your .env:"
echo "SEARXNG_URL=http://$EXTERNAL_IP:8080"
echo ""
echo "To check status: gcloud compute ssh $INSTANCE_NAME --zone=$SELECTED_ZONE --command='cd ~/searxng && docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v \$PWD:\$PWD -w \$PWD docker/compose:latest ps'"
echo "To view logs:    gcloud compute ssh $INSTANCE_NAME --zone=$SELECTED_ZONE --command='cd ~/searxng && docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v \$PWD:\$PWD -w \$PWD docker/compose:latest logs -f'"
echo "To restart:      gcloud compute ssh $INSTANCE_NAME --zone=$SELECTED_ZONE --command='cd ~/searxng && docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v \$PWD:\$PWD -w \$PWD docker/compose:latest restart'"
