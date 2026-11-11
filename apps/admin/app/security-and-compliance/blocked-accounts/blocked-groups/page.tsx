import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("blocked-accounts/blocked-groups") };

export default function BlockedGroupsPage() {
  return <SecurityPage page="blocked-accounts/blocked-groups" />;
}
