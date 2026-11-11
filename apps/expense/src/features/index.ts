import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as claims } from "./claims";
import { feature as expenseReports } from "./expense-reports";
import { feature as policies } from "./policies";

/**
 * Feature registry for Expense. Owned by the app lead (Zild).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [claims, expenseReports, policies];
