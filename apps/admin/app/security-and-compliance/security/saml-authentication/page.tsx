import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/saml-authentication") };

export default function SamlAuthenticationPage() {
  return <SecurityPage page="security/saml-authentication" />;
}
