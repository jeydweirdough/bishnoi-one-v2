import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as leads } from "./leads";
import { feature as contacts } from "./contacts";
import { feature as deals } from "./deals";

/**
 * Feature registry for CRM. Owned by the app lead (Aryan).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [leads, contacts, deals];
