import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/tfa") };

export default function TfaPage() {
  return <SecurityPage page="security/tfa" />;
}
