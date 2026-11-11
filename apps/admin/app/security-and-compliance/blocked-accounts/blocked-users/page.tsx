import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("blocked-accounts/blocked-users") };

export default function BlockedUsersPage() {
  return <SecurityPage page="blocked-accounts/blocked-users" />;
}
