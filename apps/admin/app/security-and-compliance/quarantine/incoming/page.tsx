import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("quarantine/incoming") };

export default function IncomingPage() {
  return <SecurityPage page="quarantine/incoming" />;
}
