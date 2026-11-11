import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { employee: "Employee A", type: "Annual", days: 3, status: "Approved" },
  { employee: "Employee B", type: "Sick", days: 1, status: "Pending" },
  { employee: "Employee C", type: "Annual", days: 5, status: "Rejected" },
];
