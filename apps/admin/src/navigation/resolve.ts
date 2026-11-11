/** Pure route resolution over the navigation config. Shared by server pages and client navigation. */
import { ADMIN_TITLE, isGroup, SECTIONS, USER_DETAIL_ITEMS, type NavItem, type NavSection } from "./config";

export interface Crumb {
  label: string;
  href?: string;
}

export type ResolvedRoute =
  | { kind: "page"; section: NavSection; label: string; crumbs: Crumb[]; external: boolean; userId?: string }
  | { kind: "redirect"; to: string };

/** Secondary sidebar context for the current URL. */
export interface SecondaryNav {
  items: NavItem[];
  base: string;
  userId?: string;
}

const USER_ID = /^[A-Za-z0-9._@+-]{1,128}$/;

export function sectionHref(section: NavSection): string {
  return section.slug ? `/${section.slug}` : "/";
}

export function userBase(userId: string): string {
  return `/users/${encodeURIComponent(userId)}`;
}

function firstLeafHref(items: NavItem[], base: string): string {
  const first = items[0]!;
  return isGroup(first) ? `${base}/${first.slug}/${first.children[0]!.slug}` : `${base}/${first.slug}`;
}

function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function resolveItems(section: NavSection, items: NavItem[], rest: string[], base: string, crumbs: Crumb[], userId?: string): ResolvedRoute | null {
  if (rest.length === 0) return { kind: "redirect", to: firstLeafHref(items, base) };
  const item = items.find((candidate) => candidate.slug === rest[0]);
  if (!item) return null;

  if (!isGroup(item)) {
    if (rest.length !== 1) return null;
    return { kind: "page", section, label: item.label, crumbs: [...crumbs, { label: item.label }], external: Boolean(item.external), userId };
  }
  if (rest.length === 1) return { kind: "redirect", to: `${base}/${item.slug}/${item.children[0]!.slug}` };
  const child = rest.length === 2 ? item.children.find((candidate) => candidate.slug === rest[1]) : undefined;
  if (!child) return null;
  return {
    kind: "page",
    section,
    label: child.label,
    crumbs: [...crumbs, { label: item.label }, { label: child.label }],
    external: Boolean(child.external),
    userId,
  };
}

/** Resolve URL segments (without the leading slash) to a page, a redirect, or null (404). */
export function resolveRoute(rawSegments: string[]): ResolvedRoute | null {
  const segments = rawSegments.map(decode);
  const root: Crumb = { label: ADMIN_TITLE, href: "/" };

  if (segments.length === 0) {
    const dashboard = SECTIONS[0]!;
    return { kind: "page", section: dashboard, label: dashboard.label, crumbs: [root, { label: dashboard.label }], external: false };
  }

  const section = SECTIONS.find((candidate) => candidate.slug !== "" && candidate.slug === segments[0]);
  if (!section) return null;
  const sectionCrumb: Crumb = { label: section.label, href: sectionHref(section) };

  if (section.slug === "users" && segments.length > 1) {
    const userId = segments[1]!;
    if (!USER_ID.test(userId)) return null;
    const base = userBase(userId);
    return resolveItems(section, USER_DETAIL_ITEMS, segments.slice(2), base, [root, sectionCrumb, { label: `User ${userId}`, href: base }], userId);
  }

  if (!section.items) {
    return segments.length === 1 ? { kind: "page", section, label: section.label, crumbs: [root, { label: section.label }], external: false } : null;
  }
  return resolveItems(section, section.items, segments.slice(1), sectionHref(section), [root, sectionCrumb]);
}

export function segmentsOf(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

/** Primary section owning a pathname ("" = dashboard). */
export function activeSection(pathname: string): NavSection | undefined {
  const [first] = segmentsOf(pathname).map(decode);
  return first ? SECTIONS.find((section) => section.slug === first) : SECTIONS[0];
}

export function secondaryNavFor(pathname: string): SecondaryNav | null {
  const segments = segmentsOf(pathname).map(decode);
  const section = activeSection(pathname);
  if (!section) return null;
  if (section.slug === "users" && segments.length > 1 && USER_ID.test(segments[1]!)) {
    return { items: USER_DETAIL_ITEMS, base: userBase(segments[1]!), userId: segments[1] };
  }
  return section.items ? { items: section.items, base: sectionHref(section) } : null;
}

/** Every statically known page URL (excludes per-user pages, which need a user id). */
export function allStaticHrefs(): string[] {
  const hrefs: string[] = [];
  for (const section of SECTIONS) {
    if (!section.items) {
      hrefs.push(sectionHref(section));
      continue;
    }
    for (const item of section.items) {
      if (isGroup(item)) for (const child of item.children) hrefs.push(`/${section.slug}/${item.slug}/${child.slug}`);
      else hrefs.push(`/${section.slug}/${item.slug}`);
    }
  }
  return hrefs;
}

/** Leaf URLs for the per-user secondary sidebar. */
export function userDetailHrefs(userId: string): string[] {
  const base = userBase(userId);
  return USER_DETAIL_ITEMS.flatMap((item) => (isGroup(item) ? item.children.map((child) => `${base}/${item.slug}/${child.slug}`) : [`${base}/${item.slug}`]));
}
