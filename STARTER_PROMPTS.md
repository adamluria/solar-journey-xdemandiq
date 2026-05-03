# Starter Prompts — solar-journey-platform

Use these in order. Each one picks up where the last left off. Copy the prompt block, paste it, add any `[PASTE]` values, and go.

---

## New Contributor? Start Here
```
I'm joining an existing project. Read .auto-memory/MEMORY.md first (follow its links), then AGENTS.md, TODO.md, and docs/memory/ (newest first). Give me a status summary: what's done, what's in progress, what's blocked, and what I should work on next.
```

---

## Session 1: Repo Setup & First Deploy

> **Important**: Before reporting status, verify what's actually been done.
> Check git remote -v, git log, and any .auto-memory/ fields marked "TBD".
> If the user already followed the QUICKSTART.pdf, some or all of these steps
> may already be complete. Update .auto-memory/ with real values and skip ahead.

### 1a — Initialize the repo
```
I have the project scaffold for solar-journey-platform. Check what's already been set up (git log, git remote -v, node_modules, .env.local) and pick up from where things left off. The full setup list is:
1. npm install
2. Copy .env.example to .env.local (bash setup.sh)
3. Start the dev server with npm run dev
4. Verify it runs in the browser
5. Initialize git and make the first commit
6. Create a GitHub repo and push
Skip any steps that are already done — update .auto-memory/ with the real values.
```

### 1b — GCP setup and first Cloud Run deploy
```
Let's get this deployed to Cloud Run. First check if any of this is already done (check .auto-memory/reference_solar-journey-xdemandiq.md for existing values). The full list is:
1. Create a GCP project: gcloud projects create solar-journey-xdemandiq
2. Link a billing account — give me the console URL
3. Enable the required APIs (Cloud Run, Artifact Registry, Cloud Build)
4. Grant deploy permissions (roles/cloudbuild.builds.editor)
5. Deploy to Cloud Run: gcloud run deploy solar-journey-xdemandiq --source . --region us-east1 --project solar-journey-xdemandiq --allow-unauthenticated
6. Verify it's live at the Cloud Run URL
7. Write the Cloud Run URL and GCP project ID to .auto-memory/reference_solar-journey-xdemandiq.md
Skip any steps that are already done. Update .auto-memory/ with real values.
```

---

## Session 2: Build the Core Prototype

### 2a — Build main views with mock data
```
Build the core prototype with mock data. Start with the main view and get it rendering with realistic mock data. Mock mode must continue to work after we wire up real data — don't let me lose the ability to demo without a live connection.

The key objects we're working with:
Lead (contact info, estimate data, source, engagement tracking), Journey Stage (form fill, engagement, scheduled, confirmed, completed), Appointment (time slots, type, confirmation status), Campaign (A/B test variants, sequences), Lead Score (credit likelihood, property data, engagement behavior), Referral (source customer, referred lead, $500 payout tracking)
```

### 2b — Wire up remaining views and deploy
```
The main view is working. Now:
1. Build out the remaining views from our planning discussion
2. Make sure all views work with mock data
3. Deploy the prototype to Cloud Run
4. Write a memory file capturing decisions made and what was built
What's still on the list from Phase 2 in TODO.md?
```

---

## Session 3: Salesforce Connection

### 3a — Connected App and OAuth
```
Walk me through creating a Salesforce Connected App step by step:
1. Where to go in Salesforce Setup (App Manager → New Connected App)
2. What to name it
3. What OAuth settings to enable
4. What callback URLs to use — local dev (http://localhost:5173) and Cloud Run production URL
5. What OAuth scope to add (api)
6. Where to find the Consumer Key after creation
7. How to add it to .env.local and set it on Cloud Run
Don't skip any steps.
```

### 3b — Confirm field names from live org
```
I've connected to Salesforce and can run queries. Here's what I found about our data model:
- [PASTE: the API name of the key relationship field on the main object]
- [PASTE: confirm any custom field API names]
- [PASTE: the stage/status values that mean "completed" or "sold"]
- [PASTE: how to filter for the specific record type we care about]

Update all queries and data processors with the confirmed field names. Write every confirmed field name to today's memory file as [Tier 1] and update .auto-memory/ if this changes the data model.
```

### 3c — Test with live data and handle edge cases
```
We have confirmed field names. Now:
1. Run the main query against production data and show me a sample
2. Check for any data quality issues (missing fields, unexpected values, nulls)
3. Handle token expiry gracefully — auto-redirect to re-auth when the access token expires
4. Write everything confirmed to today's memory file
5. Commit and push
```

---

## Session 4: Customer.io Integration

### 4a — Mock engagement layer
```
Build a Customer.io integration module. Start with a mock that generates realistic engagement data for each record: last email open date, last click date, last page visit date, email opens (last 30/60/90 days), page visits. Wire it into the relevant views to show engagement status. Mock first — commit before touching real API.
```

### 4b — Live Customer.io API
```
I've added my Customer.io credentials to .env.local (CUSTOMERIO_API_KEY, CUSTOMERIO_WORKSPACE_ID). Now:
1. Replace the mock with real Customer.io API calls using the env vars
2. Match on email address
3. Pull: last activity date, email engagement (opens/clicks in 30/60/90d), page visit data
4. Handle rate limits with batching — no one request per record
5. Update the views with real engagement status
6. Define and write to memory the agreed thresholds: active = any event in last [X] days, dormant = [X]+ days
7. Commit and write a memory file
```

---

## Session 5: ActiveProspect Integration

### 5a — Mock layer
```
Build a ActiveProspect integration module. Start with a mock data layer that mirrors the exact shape of the real ActiveProspect API response. Wire it into the relevant views. Mock must work before we touch real credentials.
```

### 5b — Live integration
```
I've added my ActiveProspect credentials to .env.local. Now:
1. Replace the mock with real ActiveProspect API calls using the env vars
2. Handle auth and error cases (token expiry, rate limits, unexpected responses)
3. Confirm all field names and write them to memory as [Tier 1]
4. Test with live data end-to-end
5. Commit and write a memory file
```

---

## Session 6: BatchData (for credit scoring) Integration

### 6a — Mock layer
```
Build a BatchData (for credit scoring) integration module. Start with a mock data layer that mirrors the exact shape of the real BatchData (for credit scoring) API response. Wire it into the relevant views. Mock must work before we touch real credentials.
```

### 6b — Live integration
```
I've added my BatchData (for credit scoring) credentials to .env.local. Now:
1. Replace the mock with real BatchData (for credit scoring) API calls using the env vars
2. Handle auth and error cases (token expiry, rate limits, unexpected responses)
3. Confirm all field names and write them to memory as [Tier 1]
4. Test with live data end-to-end
5. Commit and write a memory file
```

---

## Session 7: utility rate databases Integration

### 7a — Mock layer
```
Build a utility rate databases integration module. Start with a mock data layer that mirrors the exact shape of the real utility rate databases API response. Wire it into the relevant views. Mock must work before we touch real credentials.
```

### 7b — Live integration
```
I've added my utility rate databases credentials to .env.local. Now:
1. Replace the mock with real utility rate databases API calls using the env vars
2. Handle auth and error cases (token expiry, rate limits, unexpected responses)
3. Confirm all field names and write them to memory as [Tier 1]
4. Test with live data end-to-end
5. Commit and write a memory file
```

---

## Session 8: solar permit databases for install density mapping Integration

### 8a — Mock layer
```
Build a solar permit databases for install density mapping integration module. Start with a mock data layer that mirrors the exact shape of the real solar permit databases for install density mapping API response. Wire it into the relevant views. Mock must work before we touch real credentials.
```

### 8b — Live integration
```
I've added my solar permit databases for install density mapping credentials to .env.local. Now:
1. Replace the mock with real solar permit databases for install density mapping API calls using the env vars
2. Handle auth and error cases (token expiry, rate limits, unexpected responses)
3. Confirm all field names and write them to memory as [Tier 1]
4. Test with live data end-to-end
5. Commit and write a memory file
```

---

## Session 9: MVP Features

### 9a — Scope the next feature
```
Read .auto-memory/MEMORY.md, TODO.md, and docs/memory/ (newest first). What's the highest-priority feature from Phase 4? Scope it as the pm agent — what data do we need, what API calls, what UI components, what agents are involved, and how long will it take?
```

### 9b — Build it
```
Let's build [FEATURE NAME]. Mock data first — I want to see it working in the browser before we wire up any real data. Commit at each logical checkpoint.
```

---

## Anytime Prompts

### Status check
```
Read .auto-memory/MEMORY.md (follow its links), then docs/memory/ (newest first) and TODO.md. What's done, in progress, and blocked? What would you recommend working on next?
```

### End session
```
Finalize today's memory file in docs/memory/. If any Tier 1 context changed this session (infra, architecture, field names), update the relevant .auto-memory/ files too. Update TODO.md with completed and new items, commit everything, and push to GitHub. What shipped this session?
```

### Scope an idea
```
Read .auto-memory/MEMORY.md and TODO.md first. I have an idea: [DESCRIBE]. Scope it as the pm agent — data needed, APIs, UI components, which agents are involved, effort estimate, and where it fits in the priority stack.
```

### Deploy
```
Deploy the current state to Cloud Run (service: solar-journey-xdemandiq, project: solar-journey-xdemandiq). First verify I have gcloud and docker installed (check with which). Walk me through each step from ~/Documents/Claude/projects/solar-journey-xdemandiq. Make sure env vars are set (use --update-env-vars, never --set-env-vars) and the service is healthy after deploy. Update .auto-memory/ with the live URL if this is a first deploy.
```

### Debug a problem
```
I'm seeing this issue: [DESCRIBE]. Read .auto-memory/MEMORY.md and relevant memory files, then diagnose the root cause, fix it, write what you found and fixed to today's memory file, and commit.
```

### Chat → Code cutover
```
I've been prototyping in chat and have a working artifact. Decompose the prototype into the proper project structure, set up local dev, and get it running. Don't rewrite from scratch — extract and refactor. Verify it runs with mock data before touching any real data connections.
```
