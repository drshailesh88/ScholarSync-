# ScholarSync — GCP Infrastructure

**Project:** `metal-node-486118-t7`
**Region:** `asia-south1` (Mumbai)
**Service Account:** `my-professional-app-deployer@metal-node-486118-t7.iam.gserviceaccount.com`

---

## Cloud SQL (PostgreSQL 16)

| Property | Value |
|----------|-------|
| Instance name | `scholarsync-db` |
| Connection name | `metal-node-486118-t7:asia-south1:scholarsync-db` |
| Edition | Enterprise |
| Tier | `db-f1-micro` |
| Storage | 10 GB SSD |
| Availability | Zonal |
| Database | `scholarsync` |
| App user | `scholarsync_app` |

### DATABASE_URL format

```
postgresql://scholarsync_app:<PASSWORD>@/scholarsync?host=/cloudsql/metal-node-486118-t7:asia-south1:scholarsync-db
```

> Replace `<PASSWORD>` with the `scholarsync_app` user password.

### Enable pgvector

After connecting to the database, run:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

---

## Serverless VPC Access Connector

| Property | Value |
|----------|-------|
| Name | `scholarsync-connector` |
| Region | `asia-south1` |
| IP range | `10.8.0.0/28` |

Used by Cloud Run to reach Cloud SQL via private IP.

---

## GCS Bucket (PDF Storage)

| Property | Value |
|----------|-------|
| Bucket | `gs://scholarsync-pdfs` |
| Location | `asia-south1` |
| Access | Uniform bucket-level |
| Public access | Prevented |

---

## Artifact Registry (Docker Images)

| Property | Value |
|----------|-------|
| Repository | `scholarsync` |
| Location | `asia-south1` |
| Format | Docker |
| Full path | `asia-south1-docker.pkg.dev/metal-node-486118-t7/scholarsync/web` |

---

## Secret Manager

All secrets are created with placeholder values. Update them before deploying.

| Secret Name | Maps to ENV var |
|-------------|----------------|
| `scholarsync-database-url` | `DATABASE_URL` |
| `scholarsync-clerk-publishable-key` | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| `scholarsync-clerk-secret-key` | `CLERK_SECRET_KEY` |
| `scholarsync-clerk-webhook-secret` | `CLERK_WEBHOOK_SECRET` |
| `scholarsync-anthropic-api-key` | `ANTHROPIC_API_KEY` |
| `scholarsync-openai-api-key` | `OPENAI_API_KEY` |
| `scholarsync-razorpay-key-id` | `RAZORPAY_KEY_ID` |
| `scholarsync-razorpay-key-secret` | `RAZORPAY_KEY_SECRET` |
| `scholarsync-razorpay-webhook-secret` | `RAZORPAY_WEBHOOK_SECRET` |
| `scholarsync-upstash-redis-url` | `UPSTASH_REDIS_REST_URL` |
| `scholarsync-upstash-redis-token` | `UPSTASH_REDIS_REST_TOKEN` |

### Update a secret value

```bash
echo -n "real-value" | gcloud secrets versions add SECRET_NAME --data-file=-
```

---

## IAM

The default Compute Engine service account (`24661688411-compute@developer.gserviceaccount.com`) has `roles/secretmanager.secretAccessor` on all 11 secrets.

---

## Enabled APIs

- Cloud SQL Admin (`sqladmin.googleapis.com`)
- Cloud Run (`run.googleapis.com`)
- Cloud Build (`cloudbuild.googleapis.com`)
- Artifact Registry (`artifactregistry.googleapis.com`)
- Secret Manager (`secretmanager.googleapis.com`)
- Cloud Storage (`storage.googleapis.com`)
- VPC Access (`vpcaccess.googleapis.com`)
