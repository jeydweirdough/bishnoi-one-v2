import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/blocked-list") };

export default function BlockedListPage() {
  return <SecurityPage page="spam-control/blocked-list" />;
}
