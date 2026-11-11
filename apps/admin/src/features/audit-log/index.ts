import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "audit-log",
  name: "Audit Log",
  description: "Record of administrative actions.",
  status: "placeholder",
  columns: [
    { key: "when", label: "When" },
    { key: "actor", label: "Actor" },
    { key: "action", label: "Action" },
  ],
  mockRows,
};
