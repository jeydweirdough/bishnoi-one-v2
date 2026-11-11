import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/allowed-list") };

export default function AllowedListPage() {
  return <SecurityPage page="spam-control/allowed-list" />;
}
