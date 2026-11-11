"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SECTIONS } from "@/navigation/config";
import { activeSection, sectionHref } from "@/navigation/resolve";
import { Icon } from "./Icon";

const COLLAPSED_KEY = "admin.primary-sidebar.collapsed";

/** Icon rail with labels. Labels hide on small screens or when collapsed; titles act as tooltips. */
export function PrimarySidebar() {
  const pathname = usePathname();
  const current = activeSection(pathname);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(COLLAPSED_KEY) === "1");
    } catch {
      // Storage unavailable (private mode, blocked): keep the default.
    }
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    try {
      window.localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
    } catch {
      // Preference just won't persist.
    }
  }

  return (
    <aside className={`flex shrink-0 flex-col border-r border-gray-300 bg-gray-50 ${collapsed ? "w-14" : "w-14 md:w-24"}`}>
      <Link href="/" title="Admin Panel — Dashboard" className="flex h-12 shrink-0 items-center justify-center border-b border-gray-300">
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded border border-gray-500 text-xs font-semibold">
          B1
        </span>
        <span className="sr-only">Bishnoi One Admin Panel — Dashboard</span>
      </Link>

      <nav aria-label="Primary" className="min-h-0 flex-1 overflow-y-auto">
        <ul>
          {SECTIONS.map((section) => {
            const href = sectionHref(section);
            const active = section === current;
            return (
              <li key={section.icon}>
                <Link
                  href={href}
                  title={section.label}
                  aria-current={active ? (pathname === href ? "page" : "true") : undefined}
                  className={`flex flex-col items-center gap-1 border-l-2 px-1 py-2 text-center text-xs ${
                    active ? "border-gray-900 bg-gray-200 font-semibold" : "border-transparent hover:bg-gray-100"
                  }`}
                >
                  <Icon name={section.icon} />
                  <span className={collapsed ? "sr-only" : "sr-only md:not-sr-only"}>{section.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="hidden h-10 shrink-0 items-center justify-center border-t border-gray-300 hover:bg-gray-100 md:flex"
      >
        <Icon name={collapsed ? "expand" : "collapse"} />
      </button>
    </aside>
  );
}
