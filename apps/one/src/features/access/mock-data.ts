import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { user: "Demo User", app: "All applications", role: "org_admin" },
  { user: "Sample Member", app: "CRM", role: "member" },
  { user: "Sample Viewer", app: "Analytics", role: "viewer" },
];
