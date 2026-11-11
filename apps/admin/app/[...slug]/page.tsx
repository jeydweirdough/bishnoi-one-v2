import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { allStaticHrefs, resolveRoute } from "@/navigation/resolve";

type Props = { params: Promise<{ slug: string[] }> };

/** True when a module has its own route folder (app/<path>/page.tsx), which takes precedence over this catch-all. */
function hasDedicatedPage(segments: string[]): boolean {
  return existsSync(join(process.cwd(), "app", ...segments, "page.tsx"));
}

/** Pre-render every page in the navigation config that is not built yet. Per-user pages render on demand. */
export function generateStaticParams() {
  return allStaticHrefs()
    .filter((href) => href !== "/")
    .map((href) => href.slice(1).split("/"))
    .filter((segments) => !hasDedicatedPage(segments))
    .map((slug) => ({ slug }));
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
