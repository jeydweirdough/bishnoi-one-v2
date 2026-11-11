import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "salary-components",
  name: "Salary Components",
  description: "Earnings and deductions.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Component" },
    { key: "type", label: "Type" },
    { key: "calculation", label: "Calculation" },
  ],
  mockRows,
};
