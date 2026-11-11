import type { Metadata } from "next";
import { RestrictionList } from "@/mail-settings/RestrictionList";

export const metadata: Metadata = { title: "Email Restrictions" };

export default function EmailRestrictionsPage() {
  return <RestrictionList kind="email" />;
}
