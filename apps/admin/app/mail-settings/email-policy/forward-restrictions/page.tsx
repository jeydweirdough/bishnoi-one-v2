import type { Metadata } from "next";
import { RestrictionList } from "@/mail-settings/RestrictionList";

export const metadata: Metadata = { title: "Forward Restrictions" };

export default function ForwardRestrictionsPage() {
  return <RestrictionList kind="forward" />;
}
