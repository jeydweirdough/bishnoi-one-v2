import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "files",
  name: "Files",
  description: "Files and folders.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "size", label: "Size" },
  ],
  mockRows,
};
