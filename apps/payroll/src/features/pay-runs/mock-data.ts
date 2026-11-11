import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { period: "Sample period 1", employees: 25, status: "Completed" },
  { period: "Sample period 2", employees: 26, status: "Draft" },
  { period: "Sample period 3", employees: 26, status: "Not started" },
];
