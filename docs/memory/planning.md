# Planning Memory — 2026-05-02
**Contributor**: Project creator (via Ignition planning session)
**Session type**: Initial brainstorm and project definition

---

## What We're Building

We're building an intelligent lead conversion platform called **Solar Journey Platform** that automates the customer journey from form submission to scheduled appointment for Venture Home Solar. The immediate problem: 80% of people who fill out solar estimate forms never schedule an appointment. The current solution — having inside sales reps make ~25 manual calls per lead over 30 days — is expensive, inefficient, and fails because most people simply never pick up the phone. When reps *do* reach someone, they convert well. The problem is reach, not persuasion.

This platform replaces the expensive third-party tool **Demand IQ** (specifically their "Journeys" product) with an internally-built system that's smarter, cheaper, and tailored to Venture Home's specific sales process. It sits between two existing landing pages — [solarincentivepro.com](https://www.solarincentivepro.com/) and [estimate.venturesolar.com](https://estimate.venturesolar.com/) — and the Salesforce-based scheduling system. Instead of dumping leads into a manual call queue, it provides immediate post-form engagement, multiple scheduling pathways, automated trust-building sequences, A/B testing, lead scoring, and an inside sales dashboard that surfaces the highest-priority leads for human intervention.

The bigger vision — and this is critical for architecture decisions — is that this platform becomes the foundation layer of a unified "Salesforce for Solar" product. Venture Home's boss has a "master tool project" that aims to replace Salesforce, Calendly, Demand IQ, and other tools with a single purpose-built platform for solar companies. This journey platform is the first module. It must be designed with multi-tenant SaaS architecture from day one because the long-term goal is to sell this to other solar companies. Think of it as Hubspot, but built specifically for the complexity of solar sales cycles, financing, installation workflows, and service monitoring.

The primary users are Venture Home's **inside sales team**, who currently spend their days calling through lists of people who filled forms but didn't schedule. The platform should dramatically reduce their manual call volume while increasing the percentage of leads that actually convert to scheduled (and completed) appointments.

## Why We're Building It

**Cost**: Demand IQ is expensive. Venture Home is paying significant money for a tool that addresses only part of their conversion problem.

**Conversion gap**: Only 20% of form fills result in a scheduled appointment. Only ~15% make it all the way through to a completed sale. That means for every 100 people who express interest in solar, 85 generate zero revenue. Each percentage point improvement in conversion directly translates to revenue.

**Operational waste**: Inside sales reps make approximately 25 calls per lead over 30 days. Most of those calls go unanswered. That's massive labor cost spent on people who will never pick up. If automation can warm those leads up and get them to self-schedule — or at minimum surface which leads are worth calling — that labor can be redirected to closing deals.

**Strategic opportunity**: If this works for Venture Home, every solar company in the country has the same problem. The solar industry is full of companies using generic CRMs and expensive third-party tools that aren't purpose-built for solar sales. A unified platform that handles the entire customer lifecycle — from lead generation through installation and service — could be a significant SaaS business. Venture Home gets to be both the first customer and the builder.

**Timeline**: The goal is to have this live by **August 2026** if possible, latest end of year 2026. This gives us roughly 14-18 months to build it right rather than hack something together.

## Decisions Made

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| **Messaging engine** | Build our own, not use Customer.io | Owner explicitly chose own messaging engine over integrating with existing Customer.io. This gives full control over sequencing logic and avoids per-message costs at scale. Also necessary for eventual SaaS offering. |
| **Architecture approach** | Multi-tenant SaaS from day one | Even though Venture Home is the only customer now, the architecture must support multiple solar companies. This affects database design, authentication, branding, and workflow configuration. |
| **Scope approach** | MVP first (form fill → scheduled appointment), but architect for the full platform | Build the journey/conversion piece first, prove it works, then expand into CRM, scheduling, and full Demand IQ replacement. But the data model and architecture should anticipate the full vision from the start. |
| **Salesforce integration** | Eventually, not immediately | Leads currently flow through ActiveProspect → Salesforce. We'll need to integrate, but it's not a day-one blocker. We can start by receiving webhooks from ActiveProspect directly. |
| **Frontend stack** | React with hooks, Vite build system | Confirmed in prototype. Dashboard-first approach for inside sales team. |
| **Styling approach** | Inline styles with dark theme, Venture Home design tokens | Amber (#F0A830) primary, teal (#2DD4A8) for positive metrics, coral (#F87171) for alerts/drop-offs. JetBrains Mono for data, Outfit for UI text. |
| **Scheduling rebuild** | Separate project, will integrate later | There's already a separate project rebuilding the Salesforce scheduler (currently at `venturesolar.my.salesforce-sites.com/scheduler/`). This platform will integrate with it when ready, but won't build its own scheduler from scratch. |
| **Lead intelligence data** | Include credit likelihood, property records, solar install density, utility data, demographics | These enrichment sources make lead scoring dramatically more useful. Specific API providers TBD. |
| **Referral system** | Built into the platform | Venture Home pays $500 per successful referral. The platform should automate the referral capture and tracking process. |
| **Deployment target** | GCP Cloud Run | Repo name: `solar-journey-xdemandiq`, GCP project: `solar-journey-xdemandiq` |

## MVP Scope

### In Scope (Phase 1 — Journey Platform)

**Customer-Facing Journey Experience:**
- Post-form engagement flow that fires immediately after someone submits a form on solarincentivepro.com or estimate.venturesolar.com
- Multiple next-step options presented to the lead: "Book consultation now," "Get a quick phone explanation first," "Text me when you have availability," "I want to learn more before scheduling"
- Time-optimized scheduling that prominently features 9-10AM and 4-8PM slots (proven best conversion windows) and de-emphasizes midday
- Multiple appointment types: quick phone call, full consultation, virtual walkthrough
- Trust-building content: customer testimonials, "what to expect" explanations, local installation examples, "no obligation" messaging
- Financial pain messaging: savings calculations personalized to their estimate data, "start saving vs utility company Day 1" positioning
- Urgency elements: "lock in current incentives," "limited slots this week"
- Partial interest capture: "not ready to schedule but want a call in 2 weeks"

**Automated Follow-Up Sequences (Own Messaging Engine):**
- SMS and email sequences triggered by behavior and timing
- Different tracks based on initial engagement choice and subsequent behavior
- Day 1: Interactive content addressing top objections (trust, process, costs, sales pressure)
- Day 3: Local success stories and social proof
- Day 7: Limited-time incentive or deadline messaging
- Behavioral triggers: different sequences based on what someone clicked, how long they spent on pages, whether they opened emails
- Dynamic content using their specific estimate data, location, and utility company
- Smart same-day outreach: if no schedule within 2 hours, text asking preferred contact time (morning 9-10AM or evening 4-8PM)

**Lead Scoring:**
- Engagement-based scoring: form fills, email opens, link clicks, page views, callback requests
- Data-enrichment scoring: credit likelihood above 650, property characteristics, solar install density in their area
- Score-based prioritization for manual outreach (surface the hottest leads to reps)
- Flag leads as "Ready for Call" when score crosses threshold

**A/B Testing Framework:**
- Test different post-form experiences
- Test different follow-up sequence content and timing
- Test different scheduling page layouts and CTAs
- Track conversion through entire funnel per variant

**Inside Sales Dashboard:**
- Funnel visualization: form fills → engaged → scheduled → confirmed → completed
- Active leads table with score, stage, last action, and quick-action buttons (Call Now, Send Text)
- Lead source breakdown (SolarIncentivePro vs VentureSolar.com)
- Manual call savings metrics (quantify automation value)
- Daily/weekly trend charts
- Filter by date range, source, stage, score

**Integration Layer:**
- Receive webhooks from ActiveProspect (how forms currently flow)
- Integration hooks designed for eventual Salesforce sync
- Integration hooks designed for eventual scheduling system connection
- API-first design for future modules

### Explicitly Out of Scope (Phase 1)

- Full CRM functionality (deal pipeline, customer records beyond lead stage)
- Building a scheduling system (separate project)
- Salesforce data sync (designed for, not built yet)
- Referral automation (Phase 2)
- Territory mapping and optimization
- Neighborhood comparison tools ("your neighbor saved $X")
- White-labeling for other solar companies
- Billing and subscription management
- Advanced property/credit API integrations (designed for, but can use mock data initially)
- Multi-channel communication beyond SMS and email (no in-app chat, no push notifications yet)
- Customer.io migration (Customer.io stays in use for other campaigns)

## Data Model

### Core Objects

**Tenant** (multi-tenant support from day one)
- `id` (UUID)
- `name` (string) — e.g., "Venture Home Solar"
- `slug` (string) — URL-safe identifier
- `settings` (JSON) — branding, messaging defaults, timezone
- `created_at`, `updated_at`

**Lead** (the central object)
- `id` (UUID)
- `tenant_id` (FK → Tenant)
- `first_name`, `last_name` (string)
- `email` (string)
- `phone` (string)
- `address`, `city`, `state`, `zip` (string)
- `source` (enum: "solarincentivepro", "venturesolar", "referral", "other") — *confirmed sources*
- `source_url` (string) — full referrer URL
- `external_id` (string) — ActiveProspect lead ID or Salesforce ID
- `estimate_data` (JSON) — monthly bill, estimated savings, system size, etc. from estimate tool
- `utm_source`, `utm_medium`, `utm_campaign` (string) — marketing attribution
- `current_stage` (enum — see Journey Stage)
- `lead_score` (integer, 0-100)
- `score_breakdown` (JSON) — component scores for transparency
- `assigned_rep_id` (FK → User, nullable)
- `created_at`, `updated_at`

**JourneyStage** (tracks progression through funnel)
- `id` (UUID)
- `lead_id` (FK → Lead)
- `stage` (enum: "form_submitted", "engaged", "scheduling_started", "scheduled", "confirmed", "completed", "no_show", "cancelled", "lost")
- `entered_at` (timestamp)
- `exited_at` (timestamp, nullable)
- `metadata` (JSON) — reason for exit, which path they chose, etc.

**Appointment** (scheduling data)
- `id` (UUID)
- `lead_id` (FK → Lead)
- `tenant_id` (FK → Tenant)
- `type` (enum: "phone_call", "virtual_consultation", "in_person_consultation") — *assumed names, confirm with team*
- `scheduled_at` (timestamp)
- `confirmed` (boolean)
- `confirmed_at` (timestamp, nullable)
- `completed` (boolean)
- `completed_at` (timestamp, nullable)
- `no_show` (boolean)
- `cancellation_reason` (string, nullable)
- `rep_id` (FK → User, nullable)
- `external_calendar_id` (string, nullable) — for future scheduling system integration
- `created_at`, `updated_at`

**Sequence** (automated follow-up definition)
- `id` (UUID)
- `tenant_id` (FK → Tenant)
- `name` (string) — e.g., "Day 3 Trust Building"
- `trigger_type` (enum: "stage_change", "time_delay", "behavior", "score_threshold")
- `trigger_config` (JSON) — conditions for firing
- `steps` (JSON array) — ordered list of actions (send SMS, send email, wait, check condition)
- `is_active` (boolean)
- `ab_test_id` (FK → ABTest, nullable)
- `created_at`, `updated_at`

**Message** (individual sent messages)
- `id` (UUID)
- `lead_id` (FK → Lead)
- `sequence_id` (FK → Sequence, nullable)
- `channel` (enum: "sms", "email")
- `template_id` (FK → MessageTemplate)
- `status` (enum: "queued", "sent", "delivered", "opened", "clicked", "bounced", "failed")
- `sent_at` (timestamp)
- `opened_at` (timestamp, nullable)
- `clicked_at` (timestamp, nullable)
- `content_snapshot` (text) — rendered content at time of send
- `metadata` (JSON)

**MessageTemplate** (reusable message content)
- `id` (UUID)
- `tenant_id` (FK → Tenant)
- `name` (string)
- `channel` (enum: "sms", "email")
- `subject` (string, nullable) — for email
- `body` (text) — supports variable interpolation (e.g., `{{lead.first_name}}`, `{{lead.estimate_data.monthly_savings}}`)
- `ab_variant` (string, nullable) — "A", "B", etc.
- `created_at`, `updated_at`

**ABTest** (A/B testing framework)
- `id` (UUID)
- `tenant_id` (FK → Tenant)
- `name` (string)
- `type` (enum: "sequence", "page", "message")
- `variants` (JSON) — variant definitions with traffic split percentages
- `status` (enum: "draft", "running", "paused", "completed")
- `started_at`, `ended_at` (timestamps, nullable)
- `winning_variant` (string, nullable)
- `created_at`, `updated_at`

**ABTestResult** (per-variant metrics)
- `id` (UUID)
- `ab_test_id` (FK → ABTest)
- `variant` (string)
- `leads_entered` (integer)
- `conversions` (integer)
- `conversion_rate` (decimal)
- `metrics` (JSON) — additional tracked metrics per variant

**LeadEvent** (behavioral tracking — the event stream)
- `id` (UUID)
- `lead_id` (FK → Lead)
- `event_type` (string) — e.g., "form_submitted", "email_opened", "link_clicked", "page_viewed", "callback_requested", "estimate_viewed", "scheduling_started", "appointment_booked"
- `event_data` (JSON) — contextual data per event type
- `source` (string) — which system generated the event
- `created_at` (timestamp)

**LeadEnrichment** (third-party data)
- `id` (UUID)
- `lead_id` (FK → Lead)
- `provider` (string) — e.g., "batchdata", "utility_api", "permit_data"
- `data_type` (enum: "credit_score", "property_data", "solar_density", "utility_rates", "demographics")
- `data` (JSON)
- `fetched_at` (timestamp)
- `expires_at` (timestamp, nullable)

**Referral** (Phase 2, but model now)
- `id` (UUID)
- `tenant_id` (FK → Tenant)
- `referrer_lead_id` (FK → Lead) — the customer who referred
- `referred_lead_id` (FK → Lead) — the new lead
- `payout_amount` (decimal) — $500 default
- `payout_status` (enum: "pending", "qualified", "paid")
- `qualified_at`, `paid_at` (timestamps, nullable)

**User** (inside sales team members and admins)
- `id` (UUID)
- `tenant_id` (FK → Tenant)
- `email` (string)
- `name` (string)
- `role` (enum: "admin", "