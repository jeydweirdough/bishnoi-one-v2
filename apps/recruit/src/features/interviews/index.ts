import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "interviews",
  name: "Interviews",
  description: "Scheduled interviews.",
  status: "placeholder",
  columns: [
    { key: "candidate", label: "Candidate" },
    { key: "round", label: "Round" },
    { key: "when", label: "When" },
  ],
  mockRows,
};
