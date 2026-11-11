import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { metric: "Open deals", source: "CRM", value: 12 },
  { metric: "Open tickets", source: "Desk", value: 7 },
  { metric: "Headcount", source: "People", value: 25 },
];
