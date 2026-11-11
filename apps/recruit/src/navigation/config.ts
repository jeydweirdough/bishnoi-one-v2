/**
 * Recruit navigation — the single source of truth for the module rail, the module menus, routes,
 * page titles and breadcrumbs. Modelled on Zoho Recruit (Corporate HR edition first); see
 * apps/recruit/docs/recruit/ZOHO_RECRUIT_RESEARCH.md for the evidence behind each origin tag.
 *
 * URL scheme:
 *   module leaf              /<module>/<leaf>
 *   leaf inside a group      /<module>/<group>/<leaf>
 *   module root leaf         /<module>            (leaf slug "")
 *   explicit href            leaf.href            (only Home at "/")
 * Module and group URLs without a page redirect to their first page.
 * Pages with their own app/<path>/page.tsx are served by that file; everything else renders Coming Soon.
 */

export type IconName =
  | "home"
  | "job-openings"
  | "candidates"
  | "applications"
  | "interviews"
  | "offers"
  | "talent"
  | "activities"
  | "staffing"
  | "reports"
  | "administration";

/** Verified = named on an official Zoho Recruit page; Inferred = common ATS pattern, not confirmed; Extension = Bishnoi One addition. */
export type Origin = "verified" | "inferred" | "extension";

/** Feature ids from .github/ownership.json. Modules without one fall to the app lead until assigned. */
export type FeatureId = "job-openings" | "candidates" | "interviews" | "offers";

export interface NavLeaf {
  slug: string;
  label: string;
  origin: Origin;
  /** Overrides the computed URL. */
  href?: string;
}

export interface NavGroup {
  slug: string;
  label: string;
  children: NavLeaf[];
}

export type NavItem = NavLeaf | NavGroup;

export interface NavModule {
  slug: string;
  label: string;
  icon: IconName;
  origin: Origin;
  feature?: FeatureId;
  /** Staffing-agency-only modules can be switched off for the internal Corporate HR setup. */
  edition?: "staffing";
  items: NavItem[];
}

export function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const V: Origin = "verified";
const I: Origin = "inferred";
const X: Origin = "extension";

const leaf = (slug: string, label: string, origin: Origin, href?: string): NavLeaf => (href ? { slug, label, origin, href } : { slug, label, origin });
const group = (slug: string, label: string, children: NavLeaf[]): NavGroup => ({ slug, label, children });

export const RECRUIT_TITLE = "Recruit";

/** Set to false to hide staffing-agency modules (Clients, Contacts, Submissions, Placements) for internal HR. */
export const STAFFING_FEATURES_ENABLED = true;

const ALL_MODULES: NavModule[] = [
  {
    slug: "home",
    label: "Home",
    icon: "home",
    origin: V,
    items: [
      leaf("", "Home", V, "/"),
      leaf("overview", "Recruitment Overview", V),
      leaf("hiring-pipeline", "Hiring Pipeline", V),
      leaf("activities", "Recruitment Activities", I),
      leaf("tasks-and-interviews", "Tasks and Upcoming Interviews", I),
      leaf("analytics", "Recruitment Analytics", I),
    ],
  },
  {
    slug: "job-openings",
    label: "Job Openings",
    icon: "job-openings",
    origin: V,
    feature: "job-openings",
    items: [
      leaf("", "All Job Openings", V),
      leaf("create", "Create Job Opening", I),
      leaf("requisitions", "Job Requisitions", X),
      leaf("details", "Job Details", I),
      leaf("associated-candidates", "Associated Candidates", V),
      leaf("hiring-pipeline", "Hiring Pipeline", V),
      leaf("status", "Job Status Management", V),
      group("publishing", "Publishing", [
        leaf("job-publishing", "Job Publishing", V),
        leaf("job-boards", "Job Board Integration", V),
        leaf("career-site-listings", "Career Site Listings", V),
      ]),
    ],
  },
  {
    slug: "candidates",
    label: "Candidates",
    icon: "candidates",
    origin: V,
    feature: "candidates",
    items: [
      leaf("", "All Candidates", V),
      leaf("create", "Create Candidate", I),
      leaf("profiles", "Candidate Profiles", I),
      leaf("details", "Candidate Details", I),
      leaf("resumes", "Resume Management", V),
      leaf("stages", "Candidate Stages", I),
      leaf("history", "Candidate History", I),
      leaf("communications", "Candidate Communications", I),
      leaf("assessments", "Candidate Assessments", V),
      leaf("reviews", "Reviews", V),
      group("sourcing", "Sourcing", [leaf("candidate-sourcing", "Candidate Sourcing", V), leaf("matching", "Candidate Matching", V)]),
    ],
  },
  {
    slug: "applications",
    label: "Applications",
    icon: "applications",
    origin: I,
    items: [
      leaf("all", "All Applications", I),
      leaf("details", "Application Details", I),
      leaf("status", "Application Status", I),
      leaf("history", "Application History", I),
      group("review", "Review", [
        leaf("screening", "Screening", I),
        leaf("shortlisting", "Shortlisting", I),
        leaf("submissions", "Candidate Submissions", V),
        leaf("rejections", "Rejection Management", I),
      ]),
    ],
  },
  {
    slug: "interviews",
    label: "Interviews",
    icon: "interviews",
    origin: V,
    feature: "interviews",
    items: [
      leaf("", "All Interviews", V),
      leaf("calendar", "Interview Calendar", I),
      leaf("scheduling", "Interview Scheduling", V),
      leaf("details", "Interview Details", I),
      leaf("panels", "Interview Panels", I),
      leaf("history", "Interview History", I),
      group("evaluation", "Evaluation", [
        leaf("feedback", "Interview Feedback", V),
        leaf("scorecards", "Interview Scorecards", V),
        leaf("assessments", "Interview Assessments", I),
      ]),
    ],
  },
  {
    slug: "offers",
    label: "Offers",
    icon: "offers",
    origin: V,
    feature: "offers",
    items: [
      leaf("", "Offer Management", V),
      leaf("create", "Create Offer", I),
      leaf("templates", "Offer Templates", V),
      leaf("approvals", "Offer Approvals", V),
      leaf("status", "Offer Status", I),
      leaf("acceptance", "Offer Acceptance", I),
      group("hiring", "Hiring", [
        leaf("confirmation", "Hiring Confirmation", I),
        leaf("employee-conversion", "Employee Conversion", V),
        leaf("hrms-handover", "Bishnoi HRMS Handover", X),
      ]),
    ],
  },
  {
    slug: "talent",
    label: "Talent Acquisition",
    icon: "talent",
    origin: X,
    items: [
      leaf("talent-pool", "Talent Pool", I),
      leaf("sources", "Candidate Sources", V),
      leaf("resume-parsing", "Resume Parsing", V),
      leaf("referrals", "Employee Referrals", V),
      leaf("campaigns", "Recruitment Campaigns", I),
      leaf("sourcing-automation", "Sourcing Automation", I),
      group("portals", "Portals", [
        leaf("career-website", "Career Website", V),
        leaf("candidate-portal", "Candidate Portal", V),
        leaf("vendor-portal", "Vendor Portal", V),
      ]),
    ],
  },
  {
    slug: "activities",
    label: "Activities",
    icon: "activities",
    origin: V,
    items: [
      leaf("tasks", "Tasks", V),
      leaf("events", "Events", V),
      leaf("calls", "Calls", V),
      leaf("calendar", "Calendar", V),
      leaf("notes", "Notes", V),
      leaf("email", "Email Communication", V),
      leaf("timeline", "Activity Timeline", I),
      leaf("follow-ups", "Follow-up Management", I),
    ],
  },
  {
    slug: "staffing",
    label: "Staffing",
    icon: "staffing",
    origin: V,
    edition: "staffing",
    items: [
      leaf("clients", "Clients", V),
      leaf("contacts", "Client Contacts", V),
      leaf("job-requirements", "Client Job Requirements", I),
      leaf("submissions", "Candidate Submissions", V),
      leaf("client-feedback", "Client Feedback", I),
      leaf("placements", "Placement Tracking", I),
      leaf("forecasts", "Forecasts", V),
    ],
  },
  {
    slug: "reports",
    label: "Reports",
    icon: "reports",
    origin: V,
    items: [
      leaf("dashboard", "Recruitment Dashboard", V),
      leaf("custom", "Custom Reports", V),
      group("pipeline", "Pipeline", [
        leaf("candidate-sources", "Candidate Source Reports", I),
        leaf("hiring-funnel", "Hiring Funnel", I),
        leaf("job-openings", "Job Opening Reports", I),
        leaf("interviews", "Interview Reports", V),
        leaf("offer-acceptance", "Offer Acceptance Reports", I),
      ]),
      group("performance", "Performance", [
        leaf("time-to-hire", "Time-to-Hire", I),
        leaf("time-to-fill", "Time-to-Fill", I),
        leaf("recruiter-performance", "Recruiter Performance", I),
      ]),
    ],
  },
  {
    slug: "administration",
    label: "Administration",
    icon: "administration",
    origin: V,
    items: [
      group("general", "General", [
        leaf("organization", "Organization Settings", I),
        leaf("recruitment", "Recruitment Settings", I),
        leaf("departments", "Departments", V),
      ]),
      group("users-and-control", "Users and Control", [
        leaf("users", "Users", I),
        leaf("roles", "Roles and Permissions", V),
        leaf("audit-logs", "Audit Logs", I),
      ]),
      group("customization", "Customization", [
        leaf("custom-modules", "Custom Modules", V),
        leaf("custom-fields", "Custom Fields", V),
        leaf("page-layouts", "Page Layouts", V),
        leaf("pipelines", "Recruitment Pipelines", I),
        leaf("application-statuses", "Application Status Configuration", I),
      ]),
      group("automation", "Automation", [
        leaf("workflow-rules", "Workflow Rules", V),
        leaf("approval-processes", "Approval Processes", V),
        leaf("email-templates", "Email Templates", V),
        leaf("automation", "Automation", V),
      ]),
      group("data", "Data", [leaf("integrations", "Integrations", V), leaf("import-export", "Data Import / Export", V)]),
    ],
  },
];

export const MODULES: NavModule[] = ALL_MODULES.filter((module) => STAFFING_FEATURES_ENABLED || module.edition !== "staffing");
