import type { Metadata } from "next";
import { getDashboardData } from "@/dashboard/data";
import { DashboardView } from "@/dashboard/DashboardView";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardView data={data} />;
}
