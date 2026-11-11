import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "payslips",
  name: "Payslips",
  description: "Generated employee payslips.",
  status: "placeholder",
  columns: [
    { key: "employee", label: "Employee" },
    { key: "period", label: "Period" },
    { key: "net", label: "Net pay" },
  ],
  mockRows,
};
