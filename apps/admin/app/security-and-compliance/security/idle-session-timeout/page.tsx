import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/idle-session-timeout") };

export default function IdleSessionTimeoutPage() {
  return <SecurityPage page="security/idle-session-timeout" />;
}
