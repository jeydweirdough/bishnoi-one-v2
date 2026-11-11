import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { sku: "SKU-001", name: "Sample item A", onHand: 120, unit: "pcs" },
  { sku: "SKU-002", name: "Sample item B", onHand: 40, unit: "box" },
  { sku: "SKU-003", name: "Sample item C", onHand: 0, unit: "pcs" },
];
