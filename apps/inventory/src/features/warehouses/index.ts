import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "warehouses",
  name: "Warehouses",
  description: "Storage locations.",
  status: "placeholder",
  columns: [
    { key: "code", label: "Code" },
    { key: "name", label: "Name" },
    { key: "city", label: "City" },
  ],
  mockRows,
};
