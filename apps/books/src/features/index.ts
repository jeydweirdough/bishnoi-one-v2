import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as invoices } from "./invoices";
import { feature as ledger } from "./ledger";
import { feature as financialReports } from "./financial-reports";

/**
 * Feature registry for Books. Owned by the app lead (Zild).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [invoices, ledger, financialReports];
