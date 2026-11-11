import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Travel", limit: "500 / trip", appliesTo: "All staff" },
  { name: "Meals", limit: "50 / day", appliesTo: "All staff" },
  { name: "Equipment", limit: "1,000 / year", appliesTo: "Managers" },
];
