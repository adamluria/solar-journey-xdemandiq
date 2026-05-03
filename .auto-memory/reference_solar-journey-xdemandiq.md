---
name: solar-journey-platform infrastructure
description: GCP project, Cloud Run URL, env vars, deploy commands
type: reference
---

## Infrastructure

- **GCP project**: `solar-journey-xdemandiq` — confirmed during scaffold config
- **Cloud Run service**: `solar-journey-xdemandiq` — confirmed during scaffold config
- **Cloud Run URL**: TBD — set after first deploy
- **Region**: us-east1
- **GCS bucket**: TBD
- **GitHub repo**: TBD — set during Phase 1
- **Local path**: `~/Documents/Claude/projects/solar-journey-xdemandiq`

## Environment Variables

See `.env.example` for the full list.

## Deploy Command

```bash
gcloud run deploy solar-journey-xdemandiq --source . --region us-east1 --project solar-journey-xdemandiq
```

**Important**: Always use `--update-env-vars`, never `--set-env-vars` (the latter wipes all existing vars).
