# Zoho Recruit Research

Reference research behind the Recruit app's navigation and planned modules. Recruit is **inspired by** Zoho Recruit:
the code, wording and branding are original Bishnoi One work, and no Zoho source code or assets are used.

Research date: 2026-11-11. Method: automated fetch of public Zoho pages (no login, no browser, no product demo).

## Origin labels

Every page in `src/navigation/config.ts` carries one of these tags, and the Coming Soon screen shows it.

| Tag | Meaning |
|---|---|
| **Verified** | The name, or a close equivalent, appears on an official Zoho Recruit page listed below. This confirms the *feature exists*. It does **not** confirm Zoho's exact menu position or label. |
| **Inferred** | A standard ATS capability or a reasonable reading of Zoho's pages, but not found on a fetched page. |
| **Extension** | A Bishnoi One addition with no Zoho equivalent (e.g. Bishnoi HRMS handover). |

## Known gaps

- The real menu structure was **not** observed. Help pages describe a "top navigation menu" with module tabs; the
  left module rail plus module menu used here is a Bishnoi One layout choice (consistent with the Admin and People apps).
- These pages returned errors and were not read: `/recruit/features.html` (404), `/recruit/corporate-hr.html` (404),
  `/recruit/staffing-agency.html` (404), `/recruit/help/` (403), `/recruit/help/getting-started.html` (404),
  `/recruit/help/modules.html` (404).
- Linked but not yet fetched: `/recruit/corporate-hr-software.html`, `/recruit/career-site.html`,
  `/recruit/blueprint-recruitment-automation.html`, `/recruit/workflow-management.html`, `/recruit/video-interview.html`,
  `/recruit/supported-job-boards.html`, `/recruit/integrations.html`, and the Zoho People integration help article.
- **Not found anywhere:** Kanban view, sidebar, Candidate Status picklist values, application or hiring-stage names
  (New, Screening, Hired…), Offer status values, Talent Pools, Campaigns as a module, Applications as a top-level module.
- **Follow-up:** someone with a Zoho Recruit trial should screenshot the real menus and update the tags in the config.

## Sources

| # | URL | Status |
|---|---|---|
| S1 | https://www.zoho.com/recruit/ | Read |
| S2 | https://www.zoho.com/recruit/pricing.html (Corporate pricing) | Read |
| S3 | https://www.zoho.com/recruit/corporate-plan-comparison.html | Read |
| S4 | https://www.zoho.com/recruit/plan-comparison.html (Staffing Agency) | Read |
| S5 | https://www.zoho.com/recruit/recruitment-automation.html | Read |
| S6 | https://www.zoho.com/recruit/collaborative-hiring.html | Read |
| S7 | https://www.zoho.com/recruit/post-job-opening.html | Read |
| S8 | https://www.zoho.com/recruit/ai-recruitment.html | Read |
| S9 | https://help.zoho.com/portal/en/kb/recruit/module-set-up (with sub-modules, candidates, job-openings, offers, interviews, home-tab) | Read |
| S10 | https://help.zoho.com/portal/en/kb/recruit/zoho-recruit-fundamentals (editions, corporate-edition-plans, staffing-edition-plans) | Read |
| S11 | Help article: Candidate standard fields | Read |
| S12 | Help article: Job Opening standard fields | Read |
| S13 | Help article: Job status categories | Read |
| S14 | Help article: Submissions | Read |
| S15 | Help article: Offers in Zoho Recruit | Read |
| S16 | Help article: How to schedule interviews in Zoho Recruit | Read |

S11–S16 are under `https://help.zoho.com/portal/en/kb/recruit/module-set-up/…`.

## Editions

Zoho Recruit has two editions: **Corporate HR** and **Staffing Agency** (also called "Hiring Agency"). Source: S10.
Bishnoi One uses Corporate HR as the base. Staffing modules sit behind `STAFFING_FEATURES_ENABLED`.

## Verified modules

| Module | Edition | Source |
|---|---|---|
| Job Openings, Candidates, Interviews, Notes | Both | S3, S4 |
| Tasks, Calls, Events | Both (not in Free) | S3, S4 |
| Departments | Corporate HR | S3 |
| Clients, Contacts, Forecasts | Staffing | S4, S9 |
| Home Tab (Overview Dashboard, Custom Home Tab) | Both | S9 |
| Offers (sub-module; "Corporate HR only") | Corporate HR | S15 |
| Submissions, Reviews (sub-modules, reached from Candidates) | Staffing; Corporate HR submits to a hiring manager | S14 |
| Analytics: Standard/Custom Reports, Dashboards, Recruiting KPIs | Both | S2, S3 |
| Candidate Portal, Vendor Portal | Both | S2, S6 |
| Client Portal | Staffing Enterprise | S6 |
| Custom Modules, Web Tabs, Tab Groups | Both | S3, S4 |

## Verified features

- **Sourcing:** Candidate Sourcing, Resume Management, Parse Resumes, Resume Inbox, Resume Extractor, Premium Job Boards
  ("75+ free, paid, and premium job boards"), Branded Careers Site, Employee Referrals, Social Recruiting, Source Boosters,
  Boolean and Semantic Search, AI Candidate Matching (S1, S2, S3).
- **Job posting:** choose a template, generate job descriptions, import job openings, publish on job boards,
  associate candidates, track the timeline of each job, view sourcing summary (S7).
- **Pipeline:** Hiring Pipeline, Hiring Pipeline widget on Home, Job Opening Status categories Open/Closed (S2, S13).
- **Interviews:** Interview Scheduling, Interview Scheduler, Interview scorecard, Interview Kit, Interview Timeline,
  Interview Feedback Form, Video Interviews (add-on), multi-interviewer setups (S2, S3, S6, S16).
- **Assessments** (S2). **Submit to Hiring Manager**, **Employee Conversion** (S3).
- **Offers:** Pre-Offer → Final Offer, Offer Approvals and Workflows, Offer Letter Templates (built in Zoho Writer),
  pushing offer details (job title, compensation, joining date, department) to Zoho People (S3, S15).
- **Automation:** Blueprint, Workflow Rules, Workflow Alerts/Tasks, Webhooks, Field Updates, Time-based Actions,
  Approval Process, Assignment Rules, Auto Response Rules, Custom Functions (S1, S3, S5).
- **Communication:** Email Management, Mass Email, Email Templates, SMS & Phonebridge, WhatsApp (S2, S3).
- **Security:** Profiles, Reporting Hierarchy, Data Sharing Rules, Groups, Field-level Security, Territory Management (S2, S3).
- **Setup paths** named in help: `Setup > Customization > Modules > Job Openings > Layouts`,
  `Setup > Automation > Workflow Rules`, `Setup > Customization > Templates > Offer Templates`,
  `Setup > Data Administration > Export` (S13, S15).
- **AI (Zia):** Zia Matches, Zia Insights, Zia Summaries, AI Interview Insights, Sourcing bot, chatbots (S8).
  Not in Bishnoi One scope.

## Verified UI statements

- Modules are reached from a "top navigation menu"; interviews have an "Interviews tab" (S16).
- List views have default "Views", custom views via "View Dropdown > Create View", a "Quick View" icon, and mass actions
  (Change Owner, Add/Remove Tags, Mass Transfer, Bulk Delete) (S13, S14).
- Job openings are filtered Open/Closed with "the filter provided on the left" (S13).
- Detail pages are split into Overview, Timeline and a status tab, with Related Lists below (S14).
- The Home tab supports "Add Component" dashboard widgets (S9).
- Interview reports live at `Analytics > Reports > Interview Reports` (S16).

## Bishnoi One decisions

- **Applications module:** Zoho names "application records" but has no top-level Applications module. Bishnoi One keeps
  Candidate, Job Opening and Application as separate entities (see `RECRUITMENT_DATA_MODELS.md`), so it gets its own module.
- **Talent Acquisition module:** groups Zoho's sourcing features (referrals, resume parsing, portals) in one place.
- **Administration** corresponds to Zoho's "Setup".
- **Job Requisitions** and **Bishnoi HRMS Handover** are Extensions.
