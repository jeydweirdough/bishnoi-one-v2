import { success } from "@bishnoi/contracts";
import { feature } from "@/features/expense-reports";

/** Returns mock rows. Owner: Zild. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
