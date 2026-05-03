# TODO — solar-journey-platform

## Project Summary

An intelligent lead conversion platform that automates the journey from form submission to scheduled appointments for solar companies, designed to replace expensive tools like Demand IQ.

Venture Home Solar currently uses expensive Demand IQ for lead conversion but only converts 20% of form fills to scheduled appointments. Inside sales spends massive time (25 calls over 30 days per lead) trying to reach the 80% who ghost after filling forms. This platform will automate the journey with smart sequences, optimal scheduling, and trust-building content, eventually expanding into a SaaS product for the entire solar industry.


## Release Strategy
**MVP → Iterative releases**
- MVP: Journey platform that takes leads from form completion to scheduled appointment with smart automation, A/B testing, lead scoring, and inside sales dashboard
- Success: Increase conversion rate from current 20% (form fill to scheduled) to meaningfully higher numbers, reduce manual call volume from 25 calls per lead over 30 days

---

## Data Model

### Objects
Lead (contact info, estimate data, source, engagement tracking), Journey Stage (form fill, engagement, scheduled, confirmed, completed), Appointment (time slots, type, confirmation status), Campaign (A/B test variants, sequences), Lead Score (credit likelihood, property data, engagement behavior), Referral (source customer, referred lead, $500 payout tracking)

### Relationships
Lead progresses through Journey Stages, has multiple Appointments over time, participates in specific Campaigns, accumulates Lead Score based on behavior and data sources, can become source of Referrals

### Fields & API Names to Confirm
These must be confirmed before going to production. Each confirmed value should be written to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`, updated in `.auto-memory/project_solar-journey-xdemandiq.md`, and updated in code as a named constant.

Specific integration points with existing systems need confirmation: Salesforce field mapping for leads, ActiveProspect webhook format from landing pages, Customer.io API integration points for messaging sequences

### Known Data Issues
Best conversion times are 9-10AM and 4-8PM, midday is poor. Current 15% overall conversion rate with only 20% of form fills even scheduling. When reps reach people by phone, conversion rates are much higher - the challenge is getting people to answer calls.

---

## Phase 0: Planning ✅
- [x] Brainstorm and discovery conversation
- [x] Scope and release strategy defined
- [x] Project docs generated
- [x] Planning memory file created

## Phase 1: Setup

### Tool Verification (run these first)
- [ ] Verify Node.js: `node --version` (requires v18+)
- [ ] Verify npm: `npm --version`
- [ ] Verify git: `git --version`
- [ ] Verify Docker: `docker --version`
- [ ] Verify gcloud: `gcloud --version` (install from https://cloud.google.com/sdk/docs/install if missing)

### Project Initialization
- [ ] Extract scaffold zip to `~/Documents/Claude/projects/solar-journey-xdemandiq`
- [ ] `cd ~/Documents/Claude/projects/solar-journey-xdemandiq && npm install`
- [ ] Copy `.env.example` → `.env.local` and fill in values
- [ ] Verify local dev server: `npm run dev`
- [ ] Initialize git: `git init && git add -A && git commit -m "initial scaffold from Ignition"`
- [ ] Create GitHub repo and push: `gh repo create solar-journey-xdemandiq --source . --push`
- [ ] Set up `.auto-memory/` directory and `MEMORY.md` index
- [ ] Update `.auto-memory/reference_solar-journey-xdemandiq.md` with GitHub URL

### GCP & Cloud Run
- [ ] Test Docker build: `docker build -t solar-journey-xdemandiq . && docker run -p 8080:8080 solar-journey-xdemandiq`
- [ ] Create GCP project: `gcloud projects create solar-journey-xdemandiq --name="solar-journey-platform"`
- [ ] Link billing: https://console.cloud.google.com/billing/linkedaccount?project=solar-journey-xdemandiq
- [ ] Enable APIs: `gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com storage.googleapis.com --project solar-journey-xdemandiq`
- [ ] Create Artifact Registry: `gcloud artifacts repositories create solar-journey-xdemandiq --repository-format=docker --location=us-east1 --project solar-journey-xdemandiq`
- [ ] First Cloud Run deploy: `gcloud run deploy solar-journey-xdemandiq --source . --region us-east1 --project solar-journey-xdemandiq --allow-unauthenticated` (use `--update-env-vars`, never `--set-env-vars`)
- [ ] Update `.auto-memory/reference_solar-journey-xdemandiq.md` with Cloud Run URL + GCP project ID
- [ ] Write first session file: `docs/memory/YYYY-MM-DD.md`

### Salesforce Setup
- [ ] Go to Salesforce Setup → App Manager → New Connected App
- [ ] Enable OAuth settings; set callback URL to `http://localhost:5173` (dev) and your Cloud Run URL (prod)
- [ ] Add OAuth scope: `api`
- [ ] Copy the Consumer Key → goes into `SF_CLIENT_ID` in `.env.local`
- [ ] Confirm field names (see Data Model → Fields to Confirm above)
- [ ] Update SOQL queries with confirmed field names
- [ ] Test OAuth flow against sandbox, then production org
- [ ] Write confirmed field names to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]` and update `.auto-memory/project_solar-journey-xdemandiq.md`

### Customer.io Setup
- [ ] Get API key from Customer.io Settings → API Credentials
- [ ] Note Workspace ID (in URL or Settings)
- [ ] Add to `.env.local` as `CUSTOMERIO_API_KEY` and `CUSTOMERIO_WORKSPACE_ID`
- [ ] Confirm the join key for matching Customer.io profiles to other records (usually email)
- [ ] Set up batch API calls — don't do one request per record
- [ ] Define "active" vs "dormant" threshold (e.g., active = any event in last 30 days)
- [ ] Write confirmed thresholds and API details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

### Database Setup
- [ ] Create database instance (Cloud SQL, managed Postgres, Supabase, etc.)
- [ ] Note connection string → `DATABASE_URL` in `.env.local`
- [ ] Run initial schema migrations
- [ ] Set `DATABASE_URL` as Cloud Run env var (`--update-env-vars`)
- [ ] Verify connection from Cloud Run service
- [ ] Write connection details (host, engine, env var names) to `.auto-memory/reference_solar-journey-xdemandiq.md` as `[Tier 1]`

### ActiveProspect Setup
- [ ] Obtain API credentials for ActiveProspect
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

### BatchData (for credit scoring) Setup
- [ ] Obtain API credentials for BatchData (for credit scoring)
- [ ] Add to `.env.example` as placeholder + `.env.local` with real values
- [ ] Build mock data layer that mirrors the real API response shape
- [ ] Implement real API calls after mock is working
- [ ] Write confirmed endpoints and auth details to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]`

## Phase 2: Prototype
- [ ] Build core UI with mock data
- [ ] Implement main views and interactions
- [ ] Verify mock mode works end-to-end
- [ ] Deploy prototype to Cloud Run for review

### What the prototype already covers:
✅ Dashboard prototype with lead funnel visualization
✅ Journey stage tracking interface
✅ A/B testing framework UI
✅ Lead scoring display
✅ Automated sequence management
✅ Inside sales intervention points


## Phase 3: Live Data
- [ ] Confirm all field names and API names — write each to `docs/memory/YYYY-MM-DD.md` as `[Tier 1]` and update `.auto-memory/project_solar-journey-xdemandiq.md`
- [ ] Connect Salesforce integration
- [ ] Connect ActiveProspect integration
- [ ] Connect Customer.io integration
- [ ] Connect BatchData (for credit scoring) integration
- [ ] Connect utility rate databases integration
- [ ] Connect solar permit databases for install density mapping integration
- [ ] Set production env vars on Cloud Run (`--update-env-vars`, never `--set-env-vars`)
- [ ] Run with live data end-to-end
- [ ] Verify in production

## Phase 4: MVP Features
- [ ] Journey platform that takes leads from form completion to scheduled appointment with smart automation, A/B testing, lead scoring, and inside sales dashboard

## Phase 5: MVP Deploy
- [ ] All env vars confirmed on Cloud Run
- [ ] Tested with real users in production
- [ ] Memory finalized, TODO updated
- [ ] Ship

## Phase 6+: Post-MVP
- [ ] Phase 2: Full CRM replacement, advanced lead intelligence, referral automation. Phase 3: Complete Demand IQ replacement with multi-channel communication engine. Ultimate vision: The 'Salesforce for Solar' - unified platform replacing CRM, scheduling, lead generation for entire solar industry
---

## Known Challenges & Open Questions

Volume problem - inside sales can't reach 80% of leads who fill forms but don't schedule. Need to automate trust-building and objection handling that reps currently do manually. Integration complexity with multiple existing systems. Building multi-tenant architecture while solving immediate business need.

---

## Brainstorm Notes
Building an intelligent lead conversion platform for Venture Home Solar to replace expensive Demand IQ and optimize the journey from form submission to scheduled appointments. Current 20% conversion rate with massive manual follow-up effort (25 calls per lead over 30 days). MVP focuses on automated sequences, smart scheduling, A/B testing, and inside sales dashboard. Designed as foundation for eventual 'Salesforce for Solar' unified platform that could be sold to other solar companies. Key integrations include Salesforce, ActiveProspect, and lead intelligence APIs. Timeline is 18 months to full platform launch by August 2026.

---

## Reference Data

Current conversion metrics: 15% overall form-fill to sale, 20% form-fill to scheduled appointment. Optimal contact times: 9-10AM, 4-8PM. Current follow-up: 25 calls over 30 days per lead. Referral payout: $500 per successful referral. Key objections: trust (legitimacy), information gaps (process, costs), commitment concerns (sales pressure).
