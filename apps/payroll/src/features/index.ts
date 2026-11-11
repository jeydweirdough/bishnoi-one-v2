import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as payRuns } from "./pay-runs";
import { feature as salaryComponents } from "./salary-components";
import { feature as payslips } from "./payslips";

/**
 * Feature registry for Payroll. Owned by the app lead (Zild).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [payRuns, salaryComponents, payslips];
