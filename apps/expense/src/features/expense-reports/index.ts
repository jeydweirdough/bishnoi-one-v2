import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "expense-reports",
  name: "Expense Reports",
  description: "Grouped claims submitted for approval.",
  status: "placeholder",
  columns: [
    { key: "ref", label: "Report" },
    { key: "employee", label: "Employee" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
