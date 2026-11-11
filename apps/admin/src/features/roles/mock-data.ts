import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { role: "org_admin", actions: "All actions, all apps" },
  { role: "member", actions: "View, create, update" },
  { role: "viewer", actions: "View only" },
];
