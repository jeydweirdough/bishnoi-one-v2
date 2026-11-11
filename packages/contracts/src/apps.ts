/**
 * The application registry: the single list of Bishnoi One apps that the portal
 * launcher, navigation and integration checks rely on.
 *
 * Ownership is NOT stored here — it lives in `.github/ownership.json`.
 */

export const APP_IDS = [
  "one",
  "inventory",
  "crm",
  "books",
  "expense",
  "payroll",
  "people",
  "recruit",
  "analytics",
  "admin",
  "desk",
  "contracts",
  "workdrive",
] as const;

export type AppId = (typeof APP_IDS)[number];

export type AppCategory = "portal" | "operations" | "sales-service" | "finance" | "hr" | "platform";

export interface AppDefinition {
  id: AppId;
  name: string;
  description: string;
  category: AppCategory;
  /** Local development port. Every app runs on its own port. */
  port: number;
}

export const APPS: readonly AppDefinition[] = [
  { id: "one", name: "Bishnoi One", description: "Central portal and application launcher.", category: "portal", port: 3000 },
  { id: "inventory", name: "Inventory", description: "Items, stock levels and warehouses.", category: "operations", port: 3001 },
  { id: "crm", name: "CRM", description: "Leads, contacts and deals.", category: "sales-service", port: 3002 },
  { id: "books", name: "Books", description: "Invoicing, ledger and accounting reports.", category: "finance", port: 3003 },
  { id: "expense", name: "Expense", description: "Expense claims, reports and policies.", category: "finance", port: 3004 },
  { id: "payroll", name: "Payroll", description: "Pay runs, salary components and payslips.", category: "finance", port: 3005 },
  { id: "people", name: "People", description: "Employees, attendance, leave and onboarding.", category: "hr", port: 3006 },
  { id: "recruit", name: "Recruit", description: "Job openings, candidates, interviews and offers.", category: "hr", port: 3007 },
  { id: "analytics", name: "Analytics", description: "Cross-application reports and dashboards.", category: "platform", port: 3008 },
  { id: "admin", name: "One Admin", description: "Users, roles and audit log for the organization.", category: "platform", port: 3009 },
  { id: "desk", name: "Desk", description: "Support tickets, SLAs and knowledge base.", category: "sales-service", port: 3010 },
  { id: "contracts", name: "Contracts", description: "Contract templates, obligations and approvals.", category: "operations", port: 3011 },
  { id: "workdrive", name: "WorkDrive", description: "Files, folders and sharing.", category: "platform", port: 3012 },
];

/** The 12 business applications (everything except the portal). */
export const BUSINESS_APPS = APPS.filter((app) => app.category !== "portal");

export function isAppId(value: string): value is AppId {
  return (APP_IDS as readonly string[]).includes(value);
}

export function getApp(id: AppId): AppDefinition {
  const app = APPS.find((candidate) => candidate.id === id);
  if (!app) throw new Error(`Unknown app id: ${id}`);
  return app;
}

/**
 * Resolve the public URL of an app. Reads NEXT_PUBLIC_APP_URL_<ID> on the server,
 * falling back to the local development port.
 */
export function getAppUrl(id: AppId, env: Record<string, string | undefined> = process.env): string {
  const override = env[`NEXT_PUBLIC_APP_URL_${id.toUpperCase()}`];
  return override && override.length > 0 ? override : `http://localhost:${getApp(id).port}`;
}
