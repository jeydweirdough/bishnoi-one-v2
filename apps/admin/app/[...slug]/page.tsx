import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { allStaticHrefs, resolveRoute } from "@/navigation/resolve";

type Props = { params: Promise<{ slug: string[] }> };

/** Pre-render every page in the navigation config. Per-user pages render on demand. */
export function generateStaticParams() {
  return allStaticHrefs()
    .filter((href) => href !== "/")
    .map((href) => ({ slug: href.slice(1).split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveRoute((await params).slug);
  return route?.kind === "page" ? { title: route.label } : {};
}

/** Every Admin Panel destination resolves through src/navigation/config.ts. */
export default async function AdminPage({ params }: Props) {
  const route = resolveRoute((await params).slug);
  if (!route) notFound();
  if (route.kind === "redirect") redirect(route.to);
  return <ComingSoon route={route} />;
}
