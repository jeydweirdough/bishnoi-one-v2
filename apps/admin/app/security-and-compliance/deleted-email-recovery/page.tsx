import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("deleted-email-recovery") };

export default function DeletedEmailRecoveryPage() {
  return <SecurityPage page="deleted-email-recovery" />;
}
