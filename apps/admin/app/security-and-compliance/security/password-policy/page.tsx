import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/password-policy") };

export default function PasswordPolicyPage() {
  return <SecurityPage page="security/password-policy" />;
}
