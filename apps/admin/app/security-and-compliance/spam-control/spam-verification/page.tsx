import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/spam-verification") };

export default function SpamVerificationPage() {
  return <SecurityPage page="spam-control/spam-verification" />;
}
