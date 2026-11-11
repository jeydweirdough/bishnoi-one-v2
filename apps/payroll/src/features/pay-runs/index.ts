import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "pay-runs",
  name: "Pay Runs",
  description: "Payroll processing cycles.",
  status: "placeholder",
  columns: [
    { key: "period", label: "Period" },
    { key: "employees", label: "Employees" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
