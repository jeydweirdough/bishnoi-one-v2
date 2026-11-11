import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/trusted-list") };

export default function TrustedListPage() {
  return <SecurityPage page="spam-control/trusted-list" />;
}
