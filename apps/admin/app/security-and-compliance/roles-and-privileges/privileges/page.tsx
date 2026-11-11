import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("roles-and-privileges/privileges") };

export default function PrivilegesPage() {
  return <SecurityPage page="roles-and-privileges/privileges" />;
}
