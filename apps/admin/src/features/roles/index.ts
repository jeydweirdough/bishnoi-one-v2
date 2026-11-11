import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "roles",
  name: "Roles",
  description: "Roles and what they allow.",
  status: "placeholder",
  columns: [
    { key: "role", label: "Role" },
    { key: "actions", label: "Allowed actions" },
  ],
  mockRows,
};
