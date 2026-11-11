import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "sharing",
  name: "Sharing",
  description: "Who has access to which files.",
  status: "placeholder",
  columns: [
    { key: "item", label: "Item" },
    { key: "sharedWith", label: "Shared with" },
    { key: "permission", label: "Permission" },
  ],
  mockRows,
};
