import type { Metadata } from "next";
import { SecurityPage, securityTitle } from "@/security/SecurityPage";

export const metadata: Metadata = { title: securityTitle("data-subject-requests") };

export default function DataSubjectRequestsPage() {
  return <SecurityPage page="data-subject-requests" />;
}
