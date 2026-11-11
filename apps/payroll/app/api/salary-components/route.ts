import { success } from "@bishnoi/contracts";
import { feature } from "@/features/salary-components";

/** Returns mock rows. Owner: Zild. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
