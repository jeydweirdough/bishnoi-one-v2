import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "stock-adjustments",
  name: "Stock Adjustments",
  description: "Manual corrections to stock quantities.",
  status: "placeholder",
  columns: [
    { key: "ref", label: "Reference" },
    { key: "item", label: "Item" },
    { key: "change", label: "Change" },
    { key: "reason", label: "Reason" },
  ],
  mockRows,
};
