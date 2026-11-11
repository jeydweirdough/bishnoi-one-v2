import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("email-recall") };

export default function EmailRecallPage() {
  return <SecurityPage page="email-recall" />;
}
