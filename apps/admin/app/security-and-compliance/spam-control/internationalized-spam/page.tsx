import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/internationalized-spam") };

export default function InternationalizedSpamPage() {
  return <SecurityPage page="spam-control/internationalized-spam" />;
}
