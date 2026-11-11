/**
 * Admin Panel dashboard data.
 *
 * MOCK DATA: there is no Admin backend yet. `getDashboardData()` returns neutral placeholder values.
 * Replace its body with real queries later; the page and components only depend on `DashboardData`.
 * Never put real organization, user or email data here.
 */

export interface DailyTraffic {
  date: string;
  incoming: number;
  outgoing: number;
  spam: number;
}

export interface DashboardData {
  /** true while values are placeholders. */
  mock: boolean;
  organization: {
    name: string;
    website: string;
    superAdminEmail: string;
    plan: string;
    subscriptionDuration: string;
    renewalDate: string;
  };
  counts: { domains: number; users: number; groups: number; licenses: number };
  emailTraffic: { rangeLabel: string; days: DailyTraffic[] };
  userSummary: { active: number; inactive: number };
  storage: { user: string; usedGb: number }[];
  security: { suspiciousLogins: number; domains: number; withMx: number; withSpf: number; withDkim: number };
  resources: { guides: string[]; faqs: string[] };
}

const MOCK_DASHBOARD: DashboardData = {
  mock: true,
  organization: {
    name: "Sample Organization",
    website: "www.example.com",
    superAdminEmail: "admin@example.com",
    plan: "Sample Plan",
    subscriptionDuration: "Yearly",
    renewalDate: "31/05/2027",
  },
  counts: { domains: 3, users: 12, groups: 0, licenses: 15 },
  emailTraffic: {
    rangeLabel: "Last 7 days (04/11/2026 - 10/11/2026)",
    days: [
      { date: "04/11/2026", incoming: 120, outgoing: 90, spam: 3 },
      { date: "05/11/2026", incoming: 104, outgoing: 71, spam: 2 },
      { date: "06/11/2026", incoming: 96, outgoing: 52, spam: 4 },
      { date: "07/11/2026", incoming: 61, outgoing: 18, spam: 1 },
      { date: "08/11/2026", incoming: 34, outgoing: 6, spam: 0 },
      { date: "09/11/2026", incoming: 128, outgoing: 77, spam: 2 },
      { date: "10/11/2026", incoming: 66, outgoing: 41, spam: 1 },
    ],
  },
  userSummary: { active: 12, inactive: 0 },
  storage: [
    { user: "User 01", usedGb: 6.7 },
    { user: "User 02", usedGb: 5.1 },
    { user: "User 03", usedGb: 3.2 },
    { user: "User 04", usedGb: 2.5 },
    { user: "User 05", usedGb: 2.4 },
    { user: "User 06", usedGb: 2.4 },
    { user: "User 07", usedGb: 1.9 },
    { user: "User 08", usedGb: 1.9 },
    { user: "User 09", usedGb: 1.1 },
    { user: "User 10", usedGb: 1.1 },
  ],
  security: { suspiciousLogins: 1, domains: 3, withMx: 1, withSpf: 2, withDkim: 3 },
  resources: {
    guides: ["Deployment guide", "Migration guide", "API Documentation"],
    faqs: [
      "I have changed my MX records but still I am not able to receive mail?",
      "I want to set up Password policy for my organization",
      "How do I enable IMAP/ Active Sync for user accounts?",
      "I want to use custom Login URL for the organization",
    ],
  },
};

export async function getDashboardData(): Promise<DashboardData> {
  return MOCK_DASHBOARD;
}
