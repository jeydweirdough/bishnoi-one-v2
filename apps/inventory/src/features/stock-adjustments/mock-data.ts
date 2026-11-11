import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { ref: "ADJ-001", item: "SKU-001", change: "+10", reason: "Recount" },
  { ref: "ADJ-002", item: "SKU-002", change: "-2", reason: "Damaged" },
  { ref: "ADJ-003", item: "SKU-003", change: "+5", reason: "Return" },
];
