"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isGroup, type NavLeaf } from "@/navigation/config";
import { activeSection, secondaryNavFor } from "@/navigation/resolve";
import { Icon } from "./Icon";

function samePath(a: string, b: string): boolean {
  try {
    return decodeURI(a) === decodeURI(b);
  } catch {
    return a === b;
  }
}

function LeafLink({ leaf, href, pathname, nested }: { leaf: NavLeaf; href: string; pathname: string; nested: boolean }) {
  const active = samePath(href, pathname);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between gap-2 border-l-2 py-2 pr-4 text-sm ${nested ? "pl-8" : "pl-4"} ${
        active ? "border-gray-900 bg-gray-100 font-semibold" : "border-transparent hover:bg-gray-100"
      }`}
    >
      <span>{leaf.label}</span>
      {leaf.external ? (
        <>
          <Icon name="external" className="size-4" />
          <span className="sr-only">(external tool in the reference)</span>
        </>
      ) : null}
    </Link>
  );
}

/**
 * Context-sensitive menu for the current section. One group is expanded at a time; the group
 * containing the current page opens automatically. On small screens it collapses behind a toggle.
 */
export function SecondarySidebar() {
  const pathname = usePathname();
  const nav = secondaryNavFor(pathname);
  const section = activeSection(pathname);
  // Manual expand/collapse and the mobile toggle apply only to the path they were made on,
  // so navigating resets them to the active group without an effect.
  const [manual, setManual] = useState<{ path: string; group: string | null } | null>(null);
  const [mobileOpenOn, setMobileOpenOn] = useState<string | null>(null);

  if (!nav || !section) return null;

  const activeGroup =
    nav.items.find((item) => isGroup(item) && item.children.some((child) => samePath(`${nav.base}/${item.slug}/${child.slug}`, pathname)))?.slug ??
    null;
  const expanded = manual?.path === pathname ? manual.group : activeGroup;
  const mobileOpen = mobileOpenOn === pathname;
  const menuLabel = nav.userId ? "User settings" : `${section.label} menu`;

  return (
    <div className="shrink-0 border-b border-gray-300 bg-white md:flex md:w-64 md:flex-col md:border-r md:border-b-0">
      {nav.userId ? (
        <div className="flex items-start gap-2 border-b border-gray-300 p-3">
          <Link href="/users" title="Back to Users" className="rounded p-1 hover:bg-gray-100">
            <Icon name="back" />
            <span className="sr-only">Back to Users</span>
          </Link>
          <div className="min-w-0">
            <p className="truncate font-semibold">User {nav.userId}</p>
            <p className="text-xs text-gray-600">User settings</p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setMobileOpenOn(mobileOpen ? null : pathname)}
        aria-expanded={mobileOpen}
        aria-controls="secondary-nav"
        className="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold md:hidden"
      >
        {menuLabel}
        <Icon name={mobileOpen ? "chevron-down" : "chevron-right"} className="size-4" />
      </button>

      <nav
        id="secondary-nav"
        aria-label={menuLabel}
        className={`${mobileOpen ? "block" : "hidden"} max-h-[50vh] overflow-y-auto md:block md:max-h-none md:min-h-0 md:flex-1`}
      >
        <ul className="py-1">
          {nav.items.map((item) => {
            if (!isGroup(item)) {
              return (
                <li key={item.slug}>
                  <LeafLink leaf={item} href={`${nav.base}/${item.slug}`} pathname={pathname} nested={false} />
                </li>
              );
            }
            const open = expanded === item.slug;
            const groupId = `group-${item.slug}`;
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={groupId}
                  onClick={() => setManual({ path: pathname, group: open ? null : item.slug })}
                  className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm ${
                    activeGroup === item.slug ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                  <Icon name={open ? "chevron-down" : "chevron-right"} className="size-4" />
                </button>
                {open ? (
                  <ul id={groupId} className="bg-gray-50 py-1">
                    {item.children.map((child) => (
                      <li key={child.slug}>
                        <LeafLink leaf={child} href={`${nav.base}/${item.slug}/${child.slug}`} pathname={pathname} nested />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
