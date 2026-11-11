import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/spam-processing") };

export default function SpamProcessingPage() {
  return <SecurityPage page="spam-control/spam-processing" />;
}
