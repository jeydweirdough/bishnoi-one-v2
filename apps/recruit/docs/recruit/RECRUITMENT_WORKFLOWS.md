# Recruitment Workflows

**Design only — nothing here is implemented.** Changes to auth or permissions behaviour need approval before building.

## Lifecycle

```text
Job Requisition ─▶ Approval ─▶ Job Opening ─▶ Job Posting ─▶ Candidate Sourcing ─▶ Application
   ─▶ Resume Screening ─▶ Shortlisting ─▶ Assessment ─▶ Interview ─▶ Evaluation
   ─▶ Offer Approval ─▶ Offer Issuance ─▶ Offer Acceptance ─▶ Hired ─▶ HRMS Onboarding (People app)
```

| Step | Record | Module | Zoho reference |
|---|---|---|---|
| Requisition and approval | Job Requisition | Job Openings | Extension (Zoho has Approval Process) |
| Opening and posting | Job Opening | Job Openings | Verified: publish to job boards and career site |
| Sourcing | Candidate | Candidates, Talent Acquisition | Verified: sourcing, referrals, resume parsing |
| Application | Application | Applications | Inferred |
| Screening and shortlisting | Application | Applications | Inferred; "Submit to Hiring Manager" is Verified |
| Assessment | Application | Candidates, Interviews | Verified: Assessments |
| Interview and evaluation | Interview | Interviews | Verified: scheduler, scorecard, recommendation |
| Offer approval, issue, acceptance | Offer | Offers | Verified: Pre-Offer → Final Offer, approvals |
| Hired, then employee | Application → People employee | Offers | Verified: Employee Conversion, push to Zoho People |

## Hiring stages (configurable)

Stages are configured per pipeline under **Administration › Customization › Recruitment Pipelines**. A job opening
uses one pipeline. Default proposal (Inferred; Zoho's defaults were not found):

`New → Screening → Shortlisted → Assessment → Interview → Offer → Hired`, with the terminal states
`Rejected`, `Withdrawn` and `On Hold`.

Each stage defines:

- the roles allowed to move an application into and out of it
- any required fields (e.g. a rejection reason when moving to Rejected)
- automatic actions (e.g. send an email template, create a task)

## Rejection

Rejecting an application requires a reason from a configurable list. The candidate record stays active and can apply
to other job openings. If rejection emails are enabled, one is sent using an email template.

## Interview feedback

Each interviewer submits a scorecard. The interview's overall recommendation is **Move forward**, **Hold** or
**Decline** (Zoho: approve or schedule the next stage, hold, decline). The application only moves on once every
required scorecard is in.

## Approval chains

These are used for requisitions and offers. A chain is an ordered list of approvers, given as roles or specific users.
Any approver can reject, which returns the record to its owner. Each decision is written to the audit trail.

## Notifications and audit

- In-app notifications go out for assignment, stage change, interview scheduled or changed, approval requested or
  decided, and offer accepted or declined.
- Every stage change, approval decision and field edit on Application and Offer is written to the audit trail
  (who, when, before and after).

## Candidate-to-employee conversion

When an offer is accepted and hiring is confirmed, Recruit calls the People app's API through `@bishnoi/api-client`
with: name, contact details, job title, department, compensation and joining date. These are the same fields Zoho
pushes to Zoho People.

People creates the employee in an onboarding state and returns its employee id, which Recruit stores on the application.
Recruit never imports People's code. The People API contract needs agreement with Jade (People lead) before it is built.
