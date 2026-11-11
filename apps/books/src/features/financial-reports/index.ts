import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "financial-reports",
  name: "Financial Reports",
  description: "Profit & loss, balance sheet and cash flow.",
  status: "placeholder",
  columns: [
    { key: "report", label: "Report" },
    { key: "period", label: "Period" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
