import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as overview } from "./overview";
import { feature as inventoryReports } from "./inventory-reports";
import { feature as recruitReports } from "./recruit-reports";
import { feature as salesReports } from "./sales-reports";
import { feature as financeReports } from "./finance-reports";
import { feature as hrReports } from "./hr-reports";

/**
 * Feature registry for Analytics. Owned by the app lead (Linus).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [overview, inventoryReports, recruitReports, salesReports, financeReports, hrReports];
