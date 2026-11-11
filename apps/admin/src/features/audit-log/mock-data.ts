import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { when: "Sample time", actor: "Demo User", action: "Invited a user" },
  { when: "Sample time", actor: "Demo User", action: "Changed a role" },
  { when: "Sample time", actor: "System", action: "Created organization" },
];
