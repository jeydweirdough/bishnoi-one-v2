import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("quarantine/outgoing") };

export default function OutgoingPage() {
  return <SecurityPage page="quarantine/outgoing" />;
}
