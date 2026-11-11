import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { resolveRoute } from "@/navigation/resolve";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const route = resolveRoute([]);
  if (route?.kind !== "page") notFound();
  return <ComingSoon route={route} />;
}
