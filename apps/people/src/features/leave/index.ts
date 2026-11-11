import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "leave",
  name: "Leave",
  description: "Leave requests and balances.",
  status: "placeholder",
  columns: [
    { key: "employee", label: "Employee" },
    { key: "type", label: "Type" },
    { key: "days", label: "Days" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
