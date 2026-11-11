import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { policy: "High priority", firstResponse: "1 hour", resolution: "8 hours" },
  { policy: "Medium priority", firstResponse: "4 hours", resolution: "2 days" },
  { policy: "Low priority", firstResponse: "1 day", resolution: "5 days" },
];
