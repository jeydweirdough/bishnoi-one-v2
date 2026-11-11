import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("email-journaling") };

export default function EmailJournalingPage() {
  return <SecurityPage page="email-journaling" />;
}
