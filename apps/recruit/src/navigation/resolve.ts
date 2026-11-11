/** Pure route resolution over the navigation config. Shared by server pages and client navigation. */
import { isGroup, MODULES, RECRUIT_TITLE, type NavGroup, type NavItem, type NavLeaf, type NavModule } from "./config";

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageEntry {
  href: string;
  leaf: NavLeaf;
  mod: NavModule;
  group?: NavGroup;
  crumbs: Crumb[];
}

export type ResolvedRoute = ({ kind: "page" } & PageEntry) | { kind: "redirect"; to: string };

function leafHref(mod: NavModule, leaf: NavLeaf, group?: NavGroup): string {
  if (leaf.href) return leaf.href;
  return "/" + [mod.slug, group?.slug, leaf.slug].filter(Boolean).join("/");
}

export function itemHref(mod: NavModule, item: NavItem): string {
  return isGroup(item) ? leafHref(mod, item.children[0]!, item) : leafHref(mod, item);
}

export function moduleHref(mod: NavModule): string {
  return itemHref(mod, mod.items[0]!);
}

function buildIndex(): PageEntry[] {
  const pages: PageEntry[] = [];
  for (const mod of MODULES) {
    const moduleCrumb: Crumb = { label: mod.label, href: moduleHref(mod) };
    for (const item of mod.items) {
      if (!isGroup(item)) {
        const href = leafHref(mod, item);
        pages.push({ href, leaf: item, mod, crumbs: href === "/" ? [{ label: item.label }] : [moduleCrumb, { label: item.label }] });
        continue;
      }
      for (const child of item.children) {
        const groupCrumb: Crumb = { label: item.label, href: leafHref(mod, item.children[0]!, item) };
        pages.push({ href: leafHref(mod, child, item), leaf: child, mod, group: item, crumbs: [moduleCrumb, groupCrumb, { label: child.label }] });
      }
    }
  }
  return pages;
}

/** Every page in the navigation config, in sidebar order. */
export const PAGES: PageEntry[] = buildIndex();

const BY_HREF = new Map(PAGES.map((page) => [page.href, page]));

function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function normalizePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean).map(decode);
  return "/" + segments.join("/");
}

export function findPage(pathname: string): PageEntry | undefined {
  return BY_HREF.get(normalizePath(pathname));
}

/** Resolve URL segments (without the leading slash) to a page, a redirect, or null (404). */
export function resolveRoute(rawSegments: string[]): ResolvedRoute | null {
  const path = normalizePath(rawSegments.join("/"));
  const page = BY_HREF.get(path);
  if (page) return { kind: "page", ...page };

  const [moduleSlug, groupSlug, ...rest] = path.split("/").filter(Boolean);
  const mod = MODULES.find((candidate) => candidate.slug === moduleSlug);
  if (!mod || rest.length > 0) return null;
  if (!groupSlug) return { kind: "redirect", to: moduleHref(mod) };
  const item = mod.items.find((candidate) => isGroup(candidate) && candidate.slug === groupSlug);
  return item ? { kind: "redirect", to: itemHref(mod, item) } : null;
}

/** Module owning a pathname. */
export function activeModule(pathname: string): NavModule | undefined {
  const page = findPage(pathname);
  if (page) return page.mod;
  const [first] = normalizePath(pathname).split("/").filter(Boolean);
  return MODULES.find((mod) => mod.slug === first);
}

/** Breadcrumb trail for any pathname: Recruit › Module › Group › Page (Home pages start at Home). */
export function crumbsFor(pathname: string): Crumb[] {
  const page = findPage(pathname);
  if (!page) return [{ label: RECRUIT_TITLE, href: "/" }];
  return page.mod.slug === "home" ? page.crumbs : [{ label: RECRUIT_TITLE, href: "/" }, ...page.crumbs];
}
