import { success } from "@bishnoi/contracts";
import { feature } from "@/features/payslips";

/** Returns mock rows. Owner: Zild. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
