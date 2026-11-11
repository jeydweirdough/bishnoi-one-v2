import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Demo User", email: "demo.user@example.com", status: "Active" },
  { name: "Sample Member", email: "member@example.com", status: "Active" },
  { name: "Sample Viewer", email: "viewer@example.com", status: "Invited" },
];
