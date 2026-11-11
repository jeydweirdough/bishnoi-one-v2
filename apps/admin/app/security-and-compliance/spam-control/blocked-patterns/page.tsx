import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("spam-control/blocked-patterns") };

export default function BlockedPatternsPage() {
  return <SecurityPage page="spam-control/blocked-patterns" />;
}
