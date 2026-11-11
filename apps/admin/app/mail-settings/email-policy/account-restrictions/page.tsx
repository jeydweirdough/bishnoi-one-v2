import type { Metadata } from "next";
import { RestrictionList } from "@/mail-settings/RestrictionList";

export const metadata: Metadata = { title: "Account Restrictions" };

export default function AccountRestrictionsPage() {
  return <RestrictionList kind="account" />;
}
