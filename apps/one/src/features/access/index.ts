import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Linus. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "access",
  name: "Access",
  description: "Who can open which application (placeholder).",
  status: "placeholder",
  columns: [
    { key: "user", label: "User" },
    { key: "app", label: "Application" },
    { key: "role", label: "Role" },
  ],
  mockRows,
};
