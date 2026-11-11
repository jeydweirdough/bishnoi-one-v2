import { success } from "@bishnoi/contracts";
import { feature } from "@/features/onboarding";

/** Returns mock rows. Owner: Jade. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
