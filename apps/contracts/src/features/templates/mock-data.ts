import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Sample NDA", type: "Confidentiality", version: "v1" },
  { name: "Sample service agreement", type: "Services", version: "v2" },
  { name: "Sample vendor agreement", type: "Procurement", version: "v1" },
];
