"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isGroup, type NavLeaf } from "@/navigation/config";
import { activeModule, findPage, itemHref, normalizePath } from "@/navigation/resolve";
import { Icon } from "./Icon";

function LeafLink({ leaf, href, active, nested }: { leaf: NavLeaf; href: string; active: boolean; nested: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block border-l-2 py-2 pr-4 text-sm ${nested ? "pl-8" : "pl-4"} ${
        active ? "border-gray-900 bg-gray-100 font-semibold" : "border-transparent hover:bg-gray-100"
      }`}
    >
      {leaf.label}
    </Link>
  );
}

/**
 * Menu for the current mod. Groups expand and collapse; the group containing the current page
 * opens automatically. On small screens the menu collapses behind a toggle.
 */
export function ModuleMenu() {
  const pathname = usePathname();
  const mod = activeModule(pathname);
  const current = findPage(pathname);
  const path = normalizePath(pathname);
  // Manual expand/collapse and the mobile toggle apply only to the path they were made on,
  // so navigating resets them to the active group without an effect.
  const [manual, setManual] = useState<{ path: string; open: string[] } | null>(null);
  const [mobileOpenOn, setMobileOpenOn] = useState<string | null>(null);

  if (!mod) return null;

  const activeGroup = current?.group?.slug ?? null;
  const open = manual?.path === path ? manual.open : activeGroup ? [activeGroup] : [];
  const mobileOpen = mobileOpenOn === path;
  const menuLabel = `${mod.label} menu`;

  function toggleGroup(slug: string) {
    setManual({ path, open: open.includes(slug) ? open.filter((item) => item !== slug) : [...open, slug] });
  }

  return (
    <div className="shrink-0 border-b border-gray-300 bg-white md:flex md:w-64 md:flex-col md:border-r md:border-b-0">
      <p className="hidden border-b border-gray-300 px-4 py-3 font-semibold md:block">{mod.label}</p>
      <button
        type="button"
        onClick={() => setMobileOpenOn(mobileOpen ? null : path)}
        aria-expanded={mobileOpen}
        aria-controls="mod-menu"
        className="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold md:hidden"
      >
        {menuLabel}
        <Icon name={mobileOpen ? "chevron-down" : "chevron-right"} className="size-4" />
      </button>

      <nav
        id="mod-menu"
        aria-label={menuLabel}
        className={`${mobileOpen ? "block" : "hidden"} max-h-[50vh] overflow-y-auto md:block md:max-h-none md:min-h-0 md:flex-1`}
      >
        <ul className="py-1">
          {mod.items.map((item) => {
            if (!isGroup(item)) {
              const href = itemHref(mod, item);
              return (
                <li key={item.slug || "root"}>
                  <LeafLink leaf={item} href={href} active={href === path} nested={false} />
                </li>
              );
            }
            const expanded = open.includes(item.slug);
            const groupId = `group-${item.slug}`;
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={groupId}
                  onClick={() => toggleGroup(item.slug)}
                  className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm ${
                    activeGroup === item.slug ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                  <Icon name={expanded ? "chevron-down" : "chevron-right"} className="size-4" />
                </button>
                {expanded ? (
                  <ul id={groupId} className="bg-gray-50 py-1">
                    {item.children.map((child) => {
                      const href = `/${mod.slug}/${item.slug}/${child.slug}`;
                      return (
                        <li key={child.slug}>
                          <LeafLink leaf={child} href={href} active={href === path} nested />
                        </li>
                      );
                    })}
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
