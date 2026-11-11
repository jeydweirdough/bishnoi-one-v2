import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "leads",
  name: "Leads",
  description: "Unqualified prospects.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "source", label: "Source" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
