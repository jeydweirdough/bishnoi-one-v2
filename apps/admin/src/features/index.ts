import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as users } from "./users";
import { feature as roles } from "./roles";
import { feature as auditLog } from "./audit-log";

/**
 * Feature registry for One Admin. Owned by the app lead (Jade).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [users, roles, auditLog];
