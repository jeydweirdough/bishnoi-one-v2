import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "inventory-reports",
  name: "Inventory Reports",
  description: "Stock and movement reports.",
  status: "placeholder",
  columns: [
    { key: "report", label: "Report" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
