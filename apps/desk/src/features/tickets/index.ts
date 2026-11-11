import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "tickets",
  name: "Tickets",
  description: "Customer support tickets.",
  status: "placeholder",
  columns: [
    { key: "id", label: "Ticket" },
    { key: "subject", label: "Subject" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
