import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "finance-reports",
  name: "Finance Reports",
  description: "Books, Expense and Payroll reports.",
  status: "placeholder",
  columns: [
    { key: "report", label: "Report" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
