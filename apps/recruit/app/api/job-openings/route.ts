import { success } from "@bishnoi/contracts";
import { feature } from "@/features/job-openings";

/** Returns mock rows. Owner: Aaron. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
