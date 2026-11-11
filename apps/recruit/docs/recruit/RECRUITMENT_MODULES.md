# Recruitment Modules

What each module will do once built, who owns it, and what it depends on. Today every page is either an existing
mock-data page or Coming Soon (see `RECRUITMENT_PAGE_REGISTRY.md`).

## Ownership

From `.github/ownership.json`. Modules with no feature id belong to the app lead (Aaron) until a maintainer assigns
them, and should be added to `ownership.json` before anyone builds them.

| Module | Feature id | Owner | Notes |
|---|---|---|---|
| Home | — | Aaron (lead) | Dashboard widgets read from the other modules |
| Job Openings | `job-openings` | Aaron | |
| Candidates | `candidates` | Aaron | |
| Applications | — (proposed `applications`) | Unassigned | Links candidates to job openings; central to the pipeline |
| Interviews | `interviews` | Jade | |
| Offers | `offers` | Jade | Includes the hand-over to the People app |
| Talent Acquisition | — (proposed `talent`) | Unassigned | |
| Activities | — (proposed `activities`) | Unassigned | Shared by every record type |
| Staffing | — (proposed `staffing`) | Unassigned | Optional; off for internal HR |
| Reports | — | Unassigned | Cross-app reporting lives in Analytics (`recruit-reports`, Aaron) |
| Administration | — | Aaron (lead) | Users, roles and audit logs integrate with the Admin app (Jade) |

## Modules

### Home
A role-based landing page: open job openings, candidates in each stage, today's interviews, pending approvals, my tasks.
Zoho's Home tab supports "Add Component" widgets; we start with a fixed layout.

### Job Openings
The list, a create/edit form, a detail view (Overview, Timeline, Related Lists: associated candidates, interviews,
offers), status management (Open/Closed categories plus custom statuses), and publishing to the career site and job boards.
**Job Requisitions** (Extension) come first: a hiring manager raises a request, it is approved, and it becomes a job opening.

### Candidates
The list with saved views and filters, a profile with resume preview, stages, history, communications, assessments,
reviews, sourcing and matching. A candidate is a person and exists independently of any job.

### Applications
One record per candidate × job opening. It holds the current hiring stage, screening result, evaluation score, status
history and rejection reason. Screening, shortlisting and submissions to the hiring manager work on applications, not candidates.

### Interviews
Scheduling (single interviewer or a panel), a calendar view, an interview kit, feedback forms and scorecards, an
overall recommendation (move forward, hold, decline) and history. An interview belongs to an application.

### Offers
Create an offer from an application. It moves from Pre-Offer to Final Offer, goes through an approval chain, is
generated from a template, and is accepted or declined. Hiring confirmation then leads to employee conversion and the
Bishnoi HRMS handover (People app API).

### Talent Acquisition
Talent pools, candidate sources, resume parsing, employee referrals, campaigns, sourcing automation, and the portals
(career website, candidate portal, vendor portal).

### Activities
Tasks, events, calls, notes, email and follow-ups. Every activity is attached to a record (candidate, job opening,
application, interview, offer, client), and the activity timeline shows them in one feed.

### Staffing (optional)
Clients, client contacts, client job requirements, submissions to clients, client feedback, placement tracking and forecasts.
It is hidden when `STAFFING_FEATURES_ENABLED = false`.

### Reports
A recruitment dashboard, the hiring funnel, source effectiveness, time-to-hire and time-to-fill, recruiter performance,
offer acceptance, and custom reports.

### Administration
Organization and recruitment settings, departments, users and roles (via `@bishnoi/permissions`), audit logs, custom
fields and layouts, pipeline and status configuration, workflow rules, approval processes, email templates,
integrations, and import/export.

## Cross-app dependencies

| Needs | From | How |
|---|---|---|
| Users, roles, permissions | `@bishnoi/auth`, `@bishnoi/permissions`, Admin app | Shared packages and the Admin API |
| Departments, locations | People / organization data | `@bishnoi/api-client` |
| Employee creation on hire | People app | HTTP API (see `RECRUITMENT_WORKFLOWS.md`) |
| Recruitment reports | Analytics app (`recruit-reports`) | Recruit exposes report APIs; Analytics consumes them |
