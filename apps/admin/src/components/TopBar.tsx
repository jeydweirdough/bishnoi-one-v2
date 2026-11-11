"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ADMIN_TITLE, SECTIONS } from "@/navigation/config";
import { activeSection, sectionHref } from "@/navigation/resolve";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";

export interface TopBarUser {
  name: string;
  email: string;
  mock: boolean;
}

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState(false);

  // The reference advertises Alt + Q to focus search.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "q") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(true);
      }}
      className="relative hidden min-w-0 max-w-xl flex-1 items-center rounded border border-gray-300 sm:flex"
    >
      <Dropdown
        label="Quick Access"
        align="left"
        buttonClassName="flex shrink-0 items-center gap-1 border-r border-gray-300 px-2 py-1.5 text-sm hover:bg-gray-100"
        button={
          <>
            <Icon name="search" className="size-4" />
            <span className="hidden lg:inline">Quick Access</span>
            <Icon name="chevron-down" className="size-4" />
          </>
        }
      >
        <p className="border-b border-gray-200 px-3 py-2 text-xs text-gray-600">Quick Access</p>
        <ul className="max-h-80 overflow-y-auto py-1">
          {SECTIONS.map((section) => (
            <li key={section.icon}>
              <Link href={sectionHref(section)} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100">
                <Icon name={section.icon} className="size-4" />
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </Dropdown>
      <label htmlFor="admin-search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="admin-search"
        type="search"
        placeholder="Search (Alt + q)"
        onChange={() => setNotice(false)}
        className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm"
      />
      {notice ? (
        <p role="status" className="absolute top-full left-0 z-20 mt-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs">
          Search is not available yet (placeholder).
        </p>
      ) : null}
    </form>
  );
}

export function TopBar({ user, portalUrl }: { user: TopBarUser; portalUrl: string }) {
  const pathname = usePathname();
  const section = activeSection(pathname);
  const title = section ? (section.title ?? section.label) : ADMIN_TITLE;

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-300 px-3 md:gap-3 md:px-4">
      <p className="min-w-0 flex-1 truncate font-semibold md:text-lg">{title}</p>
      <SearchBox />

      <Dropdown label="Help and support" button={<Icon name="help" />}>
        <div className="p-3">
          <p className="font-semibold">Help &amp; support</p>
          <p className="mt-1 text-gray-600">Placeholder — help resources are not connected yet.</p>
        </div>
      </Dropdown>

      <Dropdown label="Notifications" button={<Icon name="bell" />}>
        <div className="p-3">
          <p className="font-semibold">Notifications</p>
          <p className="mt-1 text-gray-600">No notifications. (Placeholder — not connected.)</p>
        </div>
      </Dropdown>

      <a href={portalUrl} title="Home — Bishnoi One portal" className="flex size-9 items-center justify-center rounded hover:bg-gray-100">
        <Icon name="home" />
        <span className="sr-only">Home — Bishnoi One portal</span>
      </a>

      <Dropdown
        label="User profile"
        buttonClassName="flex size-9 items-center justify-center rounded-full border border-gray-400 text-sm hover:bg-gray-100"
        button={<span aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span>}
      >
        <div className="border-b border-gray-200 p-3">
          <p className="font-semibold">{user.name}</p>
          <p className="truncate text-gray-600">{user.email}</p>
          {user.mock ? <p className="mt-1 text-xs text-gray-600">Demo session — authentication is not implemented.</p> : null}
        </div>
        <ul className="py-1">
          <li>
            <a href={`${portalUrl}/profile`} className="block px-3 py-1.5 hover:bg-gray-100">
              View profile
            </a>
          </li>
          <li>
            <button type="button" disabled className="block w-full px-3 py-1.5 text-left text-gray-500">
              Sign out (not available)
            </button>
          </li>
        </ul>
      </Dropdown>
    </header>
  );
}
