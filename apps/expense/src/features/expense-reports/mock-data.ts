import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { ref: "ER-001", employee: "Employee A", total: "320", status: "Submitted" },
  { ref: "ER-002", employee: "Employee B", total: "42", status: "Approved" },
  { ref: "ER-003", employee: "Employee C", total: "90", status: "Draft" },
];
