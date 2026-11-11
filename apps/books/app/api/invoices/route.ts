import { success } from "@bishnoi/contracts";
import { feature } from "@/features/invoices";

/** Returns mock rows. Owner: Aaron. */
export function GET() {
  return Response.json(success(feature.mockRows, { mock: true }));
}
