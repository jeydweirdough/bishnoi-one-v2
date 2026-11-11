import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "items",
  name: "Items",
  description: "Products and services tracked in inventory.",
  status: "placeholder",
  columns: [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Name" },
    { key: "onHand", label: "On hand" },
    { key: "unit", label: "Unit" },
  ],
  mockRows,
};
