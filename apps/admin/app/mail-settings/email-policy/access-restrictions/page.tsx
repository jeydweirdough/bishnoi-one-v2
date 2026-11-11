import type { Metadata } from "next";
import { RestrictionList } from "@/mail-settings/RestrictionList";

export const metadata: Metadata = { title: "Access Restrictions" };

export default function AccessRestrictionsPage() {
  return <RestrictionList kind="access" />;
}
