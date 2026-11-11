import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/suspicious-login") };

export default function SuspiciousLoginPage() {
  return <SecurityPage page="security/suspicious-login" />;
}
