import { success } from "@bishnoi/contracts";
import { feature } from "@/features/access";

/** Returns mock rows. Owner: Linus. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
