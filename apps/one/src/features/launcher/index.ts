import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Linus. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "launcher",
  name: "Applications",
  description: "Launch any of the 12 Bishnoi One applications.",
  status: "placeholder",
  columns: [
    { key: "app", label: "Application" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
