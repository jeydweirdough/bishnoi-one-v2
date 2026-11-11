import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "offers",
  name: "Offers",
  description: "Offer letters.",
  status: "placeholder",
  columns: [
    { key: "candidate", label: "Candidate" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
