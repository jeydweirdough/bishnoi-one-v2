import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as launcher } from "./launcher";
import { feature as profile } from "./profile";
import { feature as organization } from "./organization";
import { feature as access } from "./access";

/**
 * Feature registry for Bishnoi One. Owned by the app lead (Linus).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [launcher, profile, organization, access];
