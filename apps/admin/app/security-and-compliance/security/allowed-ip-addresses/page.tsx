import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("security/allowed-ip-addresses") };

export default function AllowedIpAddressesPage() {
  return <SecurityPage page="security/allowed-ip-addresses" />;
}
