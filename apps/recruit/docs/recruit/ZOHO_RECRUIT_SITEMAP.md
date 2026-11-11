# Zoho Recruit-Inspired Sitemap

This is the Recruit navigation tree. The routes come from `src/navigation/config.ts`, and per-page origin tags and
status are in `RECRUITMENT_PAGE_REGISTRY.md`.
Markers: **[V]** Verified, **[I]** Inferred, **[X]** Bishnoi One Extension. A module's marker covers the module itself.

```text
Recruit
├── Home [V]                         /
│   ├── Home                         /
│   ├── Recruitment Overview         /home/overview
│   ├── Hiring Pipeline              /home/hiring-pipeline
│   ├── Recruitment Activities       /home/activities
│   ├── Tasks and Upcoming Interviews /home/tasks-and-interviews
│   └── Recruitment Analytics        /home/analytics
├── Job Openings [V]                 /job-openings
│   ├── All Job Openings · Create · Job Requisitions [X] · Job Details
│   ├── Associated Candidates · Hiring Pipeline · Job Status Management
│   └── Publishing ▸ Job Publishing · Job Board Integration · Career Site Listings
├── Candidates [V]                   /candidates
│   ├── All Candidates · Create · Profiles · Details · Resume Management · Stages
│   ├── History · Communications · Assessments · Reviews
│   └── Sourcing ▸ Candidate Sourcing · Candidate Matching
├── Applications [I]                 /applications/all
│   ├── All Applications · Details · Status · History
│   └── Review ▸ Screening · Shortlisting · Candidate Submissions · Rejection Management
├── Interviews [V]                   /interviews
│   ├── All Interviews · Calendar · Scheduling · Details · Panels · History
│   └── Evaluation ▸ Feedback · Scorecards · Assessments
├── Offers [V]                       /offers
│   ├── Offer Management · Create · Templates · Approvals · Status · Acceptance
│   └── Hiring ▸ Hiring Confirmation · Employee Conversion · Bishnoi HRMS Handover [X]
├── Talent Acquisition [X]           /talent/talent-pool
│   ├── Talent Pool · Candidate Sources · Resume Parsing · Employee Referrals
│   ├── Recruitment Campaigns · Sourcing Automation
│   └── Portals ▸ Career Website · Candidate Portal · Vendor Portal
├── Activities [V]                   /activities/tasks
│   └── Tasks · Events · Calls · Calendar · Notes · Email Communication · Activity Timeline · Follow-ups
├── Staffing [V] (optional)          /staffing/clients
│   └── Clients · Client Contacts · Client Job Requirements · Candidate Submissions
│       · Client Feedback · Placement Tracking · Forecasts
├── Reports [V]                      /reports/dashboard
│   ├── Recruitment Dashboard · Custom Reports
│   ├── Pipeline ▸ Candidate Sources · Hiring Funnel · Job Openings · Interviews · Offer Acceptance
│   └── Performance ▸ Time-to-Hire · Time-to-Fill · Recruiter Performance
└── Administration [V] ("Setup")     /administration
    ├── General ▸ Organization Settings · Recruitment Settings · Departments
    ├── Users and Control ▸ Users · Roles and Permissions · Audit Logs
    ├── Customization ▸ Custom Modules · Custom Fields · Page Layouts · Recruitment Pipelines
    │                   · Application Status Configuration
    ├── Automation ▸ Workflow Rules · Approval Processes · Email Templates · Automation
    └── Data ▸ Integrations · Data Import / Export
```

## Global chrome

| Element | Behaviour now | Origin |
|---|---|---|
| Module rail (left) | Lists all modules, collapses to icons, and remembers that choice per browser | Extension (Zoho uses top tabs) |
| Module menu | Pages for the current module, with expandable groups; collapses behind a toggle on mobile | Extension |
| App switcher | Links to the Bishnoi One launcher | Extension |
| Page search | Searches page names in the registry; `/` focuses it. Record search is not built | Inferred |
| Quick create | Links to the Create… placeholder pages | Inferred |
| Notifications | Empty placeholder | Inferred |
| Settings | Links to Administration | Verified ("Setup") |
| User menu | Name and email from the session; sign-out is disabled | Inferred |
| Breadcrumbs | Recruit › Module › Group › Page, built from the config | Extension |
