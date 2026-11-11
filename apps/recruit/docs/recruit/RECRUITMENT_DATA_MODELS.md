# Recruitment Data Models

**Proposal only.** No tables, migrations or schema changes have been made. Creating them needs approval (root
`CLAUDE.md` §4), and tables must be prefixed `recruit_`.

Field origin: **Z** = field named in Zoho Recruit help (S11–S16 in `ZOHO_RECRUIT_RESEARCH.md`);
**B** = proposed for Bishnoi One.

## Entity overview

```text
recruit_job_requisition ──approved──▶ recruit_job_opening
                                          │ 1
                                          │
recruit_candidate 1 ──── * recruit_application * ──── 1 recruit_job_opening
                               │ 1
                 ┌─────────────┼───────────────┐
                 * interview   * offer        * stage_history
recruit_activity  (polymorphic: any record above)
```

**Candidate**, **Job Opening** and **Application** are separate entities. One candidate can apply to many job openings,
and each application has its own stage, history, interviews and offers.

## Candidate — `recruit_candidate`

| Field | Origin | Notes |
|---|---|---|
| id, candidate_number | B | Display ID such as `CAN-000123` |
| salutation, first_name, last_name* | Z | Last name is mandatory in Zoho |
| email, secondary_email, phone, mobile | Z | |
| street, city, state, zip_code, country | Z | |
| current_employer, current_designation, experience_years | B | |
| education[], skills[] | B | |
| candidate_source | Z | |
| candidate_owner_id | Z | User id |
| candidate_status | Z | Picklist values not found; configurable |
| rating | Z | |
| email_opt_out | Z | |
| description | Z | |
| resume_file_id, attachments[] | B | Stored via WorkDrive later |
| created_by, modified_by, created_at, modified_at | Z | |

## Job Opening — `recruit_job_opening`

| Field | Origin | Notes |
|---|---|---|
| id, job_opening_number | B | |
| posting_title* | Z | Mandatory in Zoho |
| department_id | Z | "Client Name/Department Name"; department in Corporate HR |
| hiring_manager_id, recruiter_id | B | Zoho names "Account Manager" (staffing) |
| type | Z | Full time / Part time |
| positions | B | |
| industry | Z | |
| location | B | |
| salary_min, salary_max, currency | B | Zoho has a single "Salary" field |
| target_date* | Z | |
| description, requirements | Z / B | |
| job_opening_status | Z | Category Open or Closed, plus custom statuses |
| publishing_channels[] | B | Career site, job boards |
| requisition_id | B | |
| client_id, contact_id | Z | Staffing only |
| created_by, modified_by | Z | |

## Application — `recruit_application`

| Field | Origin | Notes |
|---|---|---|
| id, application_number | B | |
| candidate_id, job_opening_id | B | Unique pair |
| current_stage_id | B | From the pipeline configuration |
| assigned_recruiter_id | B | |
| screening_result, evaluation_score | B | |
| status | Z | Submission statuses: Submitted to Client, Approved by Client, Rejected by Client |
| submitted_to, submitted_on, submitted_by, medium | Z | From the Submissions sub-module |
| rejection_reason | Z | Named on interview evaluation |
| offer_status | B | Derived from the latest offer |

`recruit_application_stage_history`: application_id, from_stage, to_stage, changed_by, changed_at, reason. (B)

## Interview — `recruit_interview`

| Field | Origin |
|---|---|
| interview_name, candidate (via application_id), interviewer_ids[], date_time, location | Z |
| interview_status (Scheduled, In Progress, Completed) | Z |
| type (Formal, Video, Logged) | Z |
| round / stage (e.g. Phone Screening, Technical Interview, Final Interview) | Z (examples) |
| reason_for_rejection, cancellation_reason | Z |
| overall_recommendation, overall_comments | Z |
| scorecard_id, feedback[] (per interviewer) | B |

## Offer — `recruit_offer`

| Field | Origin |
|---|---|
| application_id, stage (Pre-Offer, Final Offer) | Z |
| job_title, compensation, joining_date, department | Z (the fields Zoho pushes to Zoho People) |
| template_id, approval_chain_id, status, sent_at, responded_at | B |

## Activity — `recruit_activity`

type (task, event, call, note, email), subject, due_at, owner_id, related_type, related_id, status. (Z for the types, B for the structure)
