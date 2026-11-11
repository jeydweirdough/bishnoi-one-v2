# Recruit Page Registry

Generated from `apps/recruit/src/navigation/config.ts` — the config is the source of truth; regenerate this
table when it changes. Every route below is reachable from the sidebar.

- **Pages:** 105 (5 existing pages with mock data, 100 Coming Soon)
- **Origin:** 55 Verified, 48 Inferred, 2 Bishnoi One Extension (see `ZOHO_RECRUIT_RESEARCH.md`)
- **Redirects:** a module URL (e.g. `/administration`) or group URL (e.g. `/job-openings/publishing`) redirects to its first page.
- **Unknown URLs** return the app's 404 page.
- **Staffing modules** disappear when `STAFFING_FEATURES_ENABLED` is `false`.

### Home

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/` | Home | — | Verified | Existing page (mock data) |
| `/home/overview` | Recruitment Overview | — | Verified | Coming Soon |
| `/home/hiring-pipeline` | Hiring Pipeline | — | Verified | Coming Soon |
| `/home/activities` | Recruitment Activities | — | Inferred | Coming Soon |
| `/home/tasks-and-interviews` | Tasks and Upcoming Interviews | — | Inferred | Coming Soon |
| `/home/analytics` | Recruitment Analytics | — | Inferred | Coming Soon |

### Job Openings

Owner: Aaron (`job-openings`)

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/job-openings` | All Job Openings | — | Verified | Existing page (mock data) |
| `/job-openings/create` | Create Job Opening | — | Inferred | Coming Soon |
| `/job-openings/requisitions` | Job Requisitions | — | Extension | Coming Soon |
| `/job-openings/details` | Job Details | — | Inferred | Coming Soon |
| `/job-openings/associated-candidates` | Associated Candidates | — | Verified | Coming Soon |
| `/job-openings/hiring-pipeline` | Hiring Pipeline | — | Verified | Coming Soon |
| `/job-openings/status` | Job Status Management | — | Verified | Coming Soon |
| `/job-openings/publishing/job-publishing` | Job Publishing | Publishing | Verified | Coming Soon |
| `/job-openings/publishing/job-boards` | Job Board Integration | Publishing | Verified | Coming Soon |
| `/job-openings/publishing/career-site-listings` | Career Site Listings | Publishing | Verified | Coming Soon |

### Candidates

Owner: Aaron (`candidates`)

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/candidates` | All Candidates | — | Verified | Existing page (mock data) |
| `/candidates/create` | Create Candidate | — | Inferred | Coming Soon |
| `/candidates/profiles` | Candidate Profiles | — | Inferred | Coming Soon |
| `/candidates/details` | Candidate Details | — | Inferred | Coming Soon |
| `/candidates/resumes` | Resume Management | — | Verified | Coming Soon |
| `/candidates/stages` | Candidate Stages | — | Inferred | Coming Soon |
| `/candidates/history` | Candidate History | — | Inferred | Coming Soon |
| `/candidates/communications` | Candidate Communications | — | Inferred | Coming Soon |
| `/candidates/assessments` | Candidate Assessments | — | Verified | Coming Soon |
| `/candidates/reviews` | Reviews | — | Verified | Coming Soon |
| `/candidates/sourcing/candidate-sourcing` | Candidate Sourcing | Sourcing | Verified | Coming Soon |
| `/candidates/sourcing/matching` | Candidate Matching | Sourcing | Verified | Coming Soon |

### Applications

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/applications/all` | All Applications | — | Inferred | Coming Soon |
| `/applications/details` | Application Details | — | Inferred | Coming Soon |
| `/applications/status` | Application Status | — | Inferred | Coming Soon |
| `/applications/history` | Application History | — | Inferred | Coming Soon |
| `/applications/review/screening` | Screening | Review | Inferred | Coming Soon |
| `/applications/review/shortlisting` | Shortlisting | Review | Inferred | Coming Soon |
| `/applications/review/submissions` | Candidate Submissions | Review | Verified | Coming Soon |
| `/applications/review/rejections` | Rejection Management | Review | Inferred | Coming Soon |

### Interviews

Owner: Jade (`interviews`)

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/interviews` | All Interviews | — | Verified | Existing page (mock data) |
| `/interviews/calendar` | Interview Calendar | — | Inferred | Coming Soon |
| `/interviews/scheduling` | Interview Scheduling | — | Verified | Coming Soon |
| `/interviews/details` | Interview Details | — | Inferred | Coming Soon |
| `/interviews/panels` | Interview Panels | — | Inferred | Coming Soon |
| `/interviews/history` | Interview History | — | Inferred | Coming Soon |
| `/interviews/evaluation/feedback` | Interview Feedback | Evaluation | Verified | Coming Soon |
| `/interviews/evaluation/scorecards` | Interview Scorecards | Evaluation | Verified | Coming Soon |
| `/interviews/evaluation/assessments` | Interview Assessments | Evaluation | Inferred | Coming Soon |

### Offers

Owner: Jade (`offers`)

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/offers` | Offer Management | — | Verified | Existing page (mock data) |
| `/offers/create` | Create Offer | — | Inferred | Coming Soon |
| `/offers/templates` | Offer Templates | — | Verified | Coming Soon |
| `/offers/approvals` | Offer Approvals | — | Verified | Coming Soon |
| `/offers/status` | Offer Status | — | Inferred | Coming Soon |
| `/offers/acceptance` | Offer Acceptance | — | Inferred | Coming Soon |
| `/offers/hiring/confirmation` | Hiring Confirmation | Hiring | Inferred | Coming Soon |
| `/offers/hiring/employee-conversion` | Employee Conversion | Hiring | Verified | Coming Soon |
| `/offers/hiring/hrms-handover` | Bishnoi HRMS Handover | Hiring | Extension | Coming Soon |

### Talent Acquisition

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/talent/talent-pool` | Talent Pool | — | Inferred | Coming Soon |
| `/talent/sources` | Candidate Sources | — | Verified | Coming Soon |
| `/talent/resume-parsing` | Resume Parsing | — | Verified | Coming Soon |
| `/talent/referrals` | Employee Referrals | — | Verified | Coming Soon |
| `/talent/campaigns` | Recruitment Campaigns | — | Inferred | Coming Soon |
| `/talent/sourcing-automation` | Sourcing Automation | — | Inferred | Coming Soon |
| `/talent/portals/career-website` | Career Website | Portals | Verified | Coming Soon |
| `/talent/portals/candidate-portal` | Candidate Portal | Portals | Verified | Coming Soon |
| `/talent/portals/vendor-portal` | Vendor Portal | Portals | Verified | Coming Soon |

### Activities

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/activities/tasks` | Tasks | — | Verified | Coming Soon |
| `/activities/events` | Events | — | Verified | Coming Soon |
| `/activities/calls` | Calls | — | Verified | Coming Soon |
| `/activities/calendar` | Calendar | — | Verified | Coming Soon |
| `/activities/notes` | Notes | — | Verified | Coming Soon |
| `/activities/email` | Email Communication | — | Verified | Coming Soon |
| `/activities/timeline` | Activity Timeline | — | Inferred | Coming Soon |
| `/activities/follow-ups` | Follow-up Management | — | Inferred | Coming Soon |

### Staffing (staffing edition, optional)

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/staffing/clients` | Clients | — | Verified | Coming Soon |
| `/staffing/contacts` | Client Contacts | — | Verified | Coming Soon |
| `/staffing/job-requirements` | Client Job Requirements | — | Inferred | Coming Soon |
| `/staffing/submissions` | Candidate Submissions | — | Verified | Coming Soon |
| `/staffing/client-feedback` | Client Feedback | — | Inferred | Coming Soon |
| `/staffing/placements` | Placement Tracking | — | Inferred | Coming Soon |
| `/staffing/forecasts` | Forecasts | — | Verified | Coming Soon |

### Reports

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/reports/dashboard` | Recruitment Dashboard | — | Verified | Coming Soon |
| `/reports/custom` | Custom Reports | — | Verified | Coming Soon |
| `/reports/pipeline/candidate-sources` | Candidate Source Reports | Pipeline | Inferred | Coming Soon |
| `/reports/pipeline/hiring-funnel` | Hiring Funnel | Pipeline | Inferred | Coming Soon |
| `/reports/pipeline/job-openings` | Job Opening Reports | Pipeline | Inferred | Coming Soon |
| `/reports/pipeline/interviews` | Interview Reports | Pipeline | Verified | Coming Soon |
| `/reports/pipeline/offer-acceptance` | Offer Acceptance Reports | Pipeline | Inferred | Coming Soon |
| `/reports/performance/time-to-hire` | Time-to-Hire | Performance | Inferred | Coming Soon |
| `/reports/performance/time-to-fill` | Time-to-Fill | Performance | Inferred | Coming Soon |
| `/reports/performance/recruiter-performance` | Recruiter Performance | Performance | Inferred | Coming Soon |

### Administration

Owner: unassigned — app lead (Aaron) until assigned

| Route | Page | Group | Origin | Status |
|---|---|---|---|---|
| `/administration/general/organization` | Organization Settings | General | Inferred | Coming Soon |
| `/administration/general/recruitment` | Recruitment Settings | General | Inferred | Coming Soon |
| `/administration/general/departments` | Departments | General | Verified | Coming Soon |
| `/administration/users-and-control/users` | Users | Users and Control | Inferred | Coming Soon |
| `/administration/users-and-control/roles` | Roles and Permissions | Users and Control | Verified | Coming Soon |
| `/administration/users-and-control/audit-logs` | Audit Logs | Users and Control | Inferred | Coming Soon |
| `/administration/customization/custom-modules` | Custom Modules | Customization | Verified | Coming Soon |
| `/administration/customization/custom-fields` | Custom Fields | Customization | Verified | Coming Soon |
| `/administration/customization/page-layouts` | Page Layouts | Customization | Verified | Coming Soon |
| `/administration/customization/pipelines` | Recruitment Pipelines | Customization | Inferred | Coming Soon |
| `/administration/customization/application-statuses` | Application Status Configuration | Customization | Inferred | Coming Soon |
| `/administration/automation/workflow-rules` | Workflow Rules | Automation | Verified | Coming Soon |
| `/administration/automation/approval-processes` | Approval Processes | Automation | Verified | Coming Soon |
| `/administration/automation/email-templates` | Email Templates | Automation | Verified | Coming Soon |
| `/administration/automation/automation` | Automation | Automation | Verified | Coming Soon |
| `/administration/data/integrations` | Integrations | Data | Verified | Coming Soon |
| `/administration/data/import-export` | Data Import / Export | Data | Verified | Coming Soon |

