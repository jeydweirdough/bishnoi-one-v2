import { success } from "@bishnoi/contracts";
import { feature } from "@/features/organization";

/** Returns mock rows. Owner: Linus. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
