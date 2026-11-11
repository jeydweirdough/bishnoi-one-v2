import { success } from "@bishnoi/contracts";
import { feature } from "@/features/knowledge-base";

/** Returns mock rows. Owner: Jade. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
