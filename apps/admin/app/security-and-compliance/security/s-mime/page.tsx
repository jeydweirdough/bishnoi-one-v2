import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/s-mime") };

export default function SMimePage() {
  return <SecurityPage page="security/s-mime" />;
}
