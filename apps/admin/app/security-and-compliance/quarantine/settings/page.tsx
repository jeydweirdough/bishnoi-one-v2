import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("quarantine/settings") };

export default function SettingsPage() {
  return <SecurityPage page="quarantine/settings" />;
}
