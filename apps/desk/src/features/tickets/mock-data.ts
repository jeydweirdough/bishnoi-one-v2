import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { id: "T-001", subject: "Cannot sign in", priority: "High", status: "Open" },
  { id: "T-002", subject: "Invoice question", priority: "Medium", status: "Pending" },
  { id: "T-003", subject: "Feature request", priority: "Low", status: "Closed" },
];
