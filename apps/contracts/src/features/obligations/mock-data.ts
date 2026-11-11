import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { contract: "Contract A", obligation: "Annual fee", due: "Sample date" },
  { contract: "Contract B", obligation: "Renewal notice", due: "Sample date" },
  { contract: "Contract C", obligation: "Milestone payment", due: "Sample date" },
];
