import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "employees",
  name: "Employees",
  description: "Employee directory.",
  status: "placeholder",
  columns: [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
  ],
  mockRows,
};
