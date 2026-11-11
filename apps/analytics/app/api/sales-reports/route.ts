import { success } from "@bishnoi/contracts";
import { feature } from "@/features/sales-reports";

/** Returns mock rows. Owner: Aryan. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
