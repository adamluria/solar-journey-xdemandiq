# Project: solar-journey-platform

## What This Is

An intelligent lead conversion platform that automates the journey from form submission to scheduled appointments for solar companies, designed to replace expensive tools like Demand IQ.

Venture Home Solar currently uses expensive Demand IQ for lead conversion but only converts 20% of form fills to scheduled appointments. Inside sales spends massive time (25 calls over 30 days per lead) trying to reach the 80% who ghost after filling forms. This platform will automate the journey with smart sequences, optimal scheduling, and trust-building content, eventually expanding into a SaaS product for the entire solar industry.


## Repo Setup

- **Local project directory**: `~/Documents/Claude/projects/solar-journey-xdemandiq` (extracted from scaffold zip or cloned from GitHub)
- **GitHub repo**: `[your-gh-org]/solar-journey-xdemandiq`
- **Cloud Run service**: `solar-journey-xdemandiq`
- **GCP project ID**: `solar-journey-xdemandiq`
- **Branch strategy**: `main` is production. Work on feature branches (`feature/[name]`) and merge via PR.

When asked to make changes, commit to the current working branch with clear commit messages. Push to GitHub when asked to "push" or "ship it."

## Tech Stack

- **Frontend**: React with hooks, Vite build system
- **Styling**: Inline styles with dark theme, Venture Home design tokens
- **Data Sources**: Salesforce integration, ActiveProspet webhooks, third-party data APIs for lead intelligence
- **Integrations**: Salesforce, ActiveProspect, Customer.io, BatchData (for credit scoring), utility rate databases, solar permit databases for install density mapping


## Hosting & Deployment

- **Runtime**: Google Cloud Run (containerized, port 8080)
- **Static/File Storage**: Google Cloud Storage
- **Container Registry**: Google Artifact Registry
- **Region**: us-east1

### Key deployment rules:
- Cloud Run URL format: `https://solar-journey-xdemandiq-HASH-ue.a.run.app`
- Environment variables are set via Cloud Run service configuration — never baked into the container
- `.env.local` is for local dev only — never deployed, never committed
- For server-side API calls, use the Cloud Run service URL as the base, not localhost
- Always test Docker builds locally before deploying: `docker build -t solar-journey-xdemandiq . && docker run -p 8080:8080 solar-journey-xdemandiq`

### Deployment Commands
All commands run from the repo root (`~/Documents/Claude/projects/solar-journey-xdemandiq`).

```bash
# Verify required tools first
which node && which npm && which git && which docker && which gcloud
# If any are missing, install before proceeding

# First-time GCP setup (run once)
gcloud auth login
gcloud config set project solar-journey-xdemandiq
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com storage.googleapis.com

# Create Artifact Registry repo (once)
gcloud artifacts repositories create solar-journey-xdemandiq --repository-format=docker --location=us-east1

# Build and deploy
gcloud builds submit --tag us-east1-docker.pkg.dev/solar-journey-xdemandiq/solar-journey-xdemandiq/solar-journey-xdemandiq:latest .
gcloud run deploy solar-journey-xdemandiq \
  --image us-east1-docker.pkg.dev/solar-journey-xdemandiq/solar-journey-xdemandiq/solar-journey-xdemandiq:latest \
  --region us-east1 --platform managed --allow-unauthenticated

# Update environment variables
gcloud run services update solar-journey-xdemandiq --region us-east1 \
  --update-env-vars="KEY=value,KEY2=value2"
```

## Project Structure

```
solar-journey-xdemandiq/
├── .auto-memory/
│   ├── MEMORY.md                  # Canonical index — read first every session
│   ├── reference_solar-journey-xdemandiq.md       # Infra: GCP project, Cloud Run URL, env vars
│   └── project_solar-journey-xdemandiq.md         # Tech stack, components, architecture decisions
├── src/
│   ├── main.jsx
│   ├── app.jsx
│   ├── components/                 # React with hooks, Vite build system components (.jsx)
│   ├── views/
│   ├── data/
│   ├── auth/
│   └── utils/
├── docs/
│   └── memory/
│       └── planning.md            # Bootstrap planning artifact from Ignition
├── PROJECT_INSTRUCTIONS.md
├── AGENTS.md
├── TODO.md
├── STARTER_PROMPTS.md
├── USER_GUIDE.md                  # Living user-facing reference — updated as features ship
├── Dockerfile
├── .dockerignore
├── .gcloudignore
├── .env.example
├── .env.local                     # Local dev only — git-ignored
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Current State

✅ Dashboard prototype with lead funnel visualization
✅ Journey stage tracking interface
✅ A/B testing framework UI
✅ Lead scoring display
✅ Automated sequence management
✅ Inside sales intervention points

## Design

- **Theme**: Professional dashboard aesthetic with amber accents, optimized for inside sales team daily workflow
- **Fonts**: JetBrains Mono for data and metrics, Outfit for interface text

- **Visual rules**: Amber (#F0A830) for primary actions and highlights, teal (#2DD4A8) for positive metrics, coral (#F87171) for drop-offs and issues

## Data Model

### Objects
Lead (contact info, estimate data, source, engagement tracking), Journey Stage (form fill, engagement, scheduled, confirmed, completed), Appointment (time slots, type, confirmation status), Campaign (A/B test variants, sequences), Lead Score (credit likelihood, property data, engagement behavior), Referral (source customer, referred lead, $500 payout tracking)

### Relationships
Lead progresses through Journey Stages, has multiple Appointments over time, participates in specific Campaigns, accumulates Lead Score based on behavior and data sources, can become source of Referrals

### Fields to Confirm Before Going Live
Specific integration points with existing systems need confirmation: Salesforce field mapping for leads, ActiveProspect webhook format from landing pages, Customer.io API integration points for messaging sequences

### Known Data Issues
Best conversion times are 9-10AM and 4-8PM, midday is poor. Current 15% overall conversion rate with only 20% of form fills even scheduling. When reps reach people by phone, conversion rates are much higher - the challenge is getting people to answer calls.

## Architecture Notes

Designed as foundation for eventual unified solar platform. Phase 1: Journey platform with own messaging engine. Phase 2: Absorb scheduling and basic CRM. Phase 3: Full platform replacing Salesforce, Demand IQ, scheduling tools. Built as multi-tenant SaaS from day one for eventual sale to other solar companies.


## Multi-User Collaboration

These docs are **AI-agnostic** — they work with Claude, GPT, Gemini, Copilot, or any LLM.
- **Team**: solo


## How to Work in This Project

1. **Read in this order every session**: `.auto-memory/MEMORY.md` (follow its links) → `AGENTS.md` → `docs/memory/` (newest first) → `TODO.md` → this file → `USER_GUIDE.md` (to see the current feature surface area from the user's perspective). The project spec is distributed across these files — no single file has the complete picture. Give a brief status summary before starting work.

2. **Follow AGENTS.md.** It defines agent roles, the memory system (tiers, auto-memory, golden snapshots), and session lifecycle. Read it and follow it.

3. **Keep mock data working at all times.** Every feature must be testable with mock/demo data before live data is wired up. The mock mode should always work.

4. **Field names and API names are placeholders until confirmed.** Keep them as configurable constants. When a field name is confirmed, update the constant, write it to today's session file in `docs/memory/` as `[Tier 1]`, and update `.auto-memory/project_solar-journey-xdemandiq.md`.

5. **Design rules are not suggestions.** Amber (#F0A830) for primary actions and highlights, teal (#2DD4A8) for positive metrics, coral (#F87171) for drop-offs and issues

6. **Ambiguous or multi-step work goes through the PM agent first.** When a feature is described in business terms, scope it before building: data source needed, API calls required, UI components to build, which agents are involved, and what goes in TODO.md as follow-up. See AGENTS.md → Fast Path for when to skip PM.

7. **Write to memory incrementally.** The moment a field name is confirmed, a decision is made, or a bug is fixed — write it to today's session file in `docs/memory/YYYY-MM-DD.md`. If it's a Tier 1 fact (infra, architecture, confirmed field name, deployment state), also update the relevant `.auto-memory/` file. See AGENTS.md → Memory System for the full rules.

8. **Commit often in small chunks.** After each logical unit of work (a component, a data integration, a view), commit with a descriptive message.

9. **Memory files and TODO.md are committed to GitHub.** They are project artifacts, not ephemeral notes. Every session should end with a commit and push that includes updated memory and TODO files.

10. **Keep USER_GUIDE.md current as features ship.** `USER_GUIDE.md` is the living, user-facing reference for this product. Every time a user-facing feature ships or changes, add or update an entry in the **same commit** as the feature — name, what it does (user terms), how to use it (step-by-step), and anything important to know. When the project is done, this file is publishable as-is. See AGENTS.md → "User Guide Maintenance" for the full rules and entry template.

11. **End every session the same way.** Finalize today's session file in `docs/memory/`. If any Tier 1 context changed, update the relevant `.auto-memory/` files. If any user-facing feature shipped or changed, update `USER_GUIDE.md`. Update TODO.md, commit everything, push to GitHub, confirm what was shipped. (Ultra-fast-path fixes can bundle into the next real commit — see AGENTS.md.)

12. **Cloud Run deploys**: test locally in Docker first. `docker build -t solar-journey-xdemandiq . && docker run -p 8080:8080 solar-journey-xdemandiq`

13. **Environment variables**: `.env.local` for local dev. Set production vars via `gcloud run services update --update-env-vars` (never `--set-env-vars` — it wipes all existing vars). Never commit secrets.

## Reference Data

Current conversion metrics: 15% overall form-fill to sale, 20% form-fill to scheduled appointment. Optimal contact times: 9-10AM, 4-8PM. Current follow-up: 25 calls over 30 days per lead. Referral payout: $500 per successful referral. Key objections: trust (legitimacy), information gaps (process, costs), commitment concerns (sales pressure).
