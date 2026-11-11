"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { RECRUIT_TITLE } from "@/navigation/config";
import { PAGES } from "@/navigation/resolve";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";

export interface TopBarUser {
  name: string;
  email: string;
  mock: boolean;
}

/** Searches the page registry only. Record search arrives with real data. */
function PageSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");

  // "/" focuses search when the user is not typing elsewhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) && !target.isContentEditable) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && target === inputRef.current) setQuery("");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const term = query.trim().toLowerCase();
  const results = term
    ? PAGES.filter((page) => `${page.mod.label} ${page.group?.label ?? ""} ${page.leaf.label}`.toLowerCase().includes(term)).slice(0, 8)
    : [];

  return (
    <div role="search" className="relative hidden min-w-0 max-w-xl flex-1 sm:block">
      <label htmlFor="recruit-search" className="sr-only">
        Search pages
      </label>
      <div className="flex items-center rounded border border-gray-300 px-2">
        <Icon name="search" className="size-4" />
        <input
          ref={inputRef}
          id="recruit-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages ( / )"
          aria-controls={listId}
          className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm"
        />
      </div>
      {term ? (
        <ul id={listId} className="absolute top-full right-0 left-0 z-20 mt-1 max-h-80 overflow-y-auto rounded border border-gray-300 bg-white text-sm">
          {results.length === 0 ? (
            <li className="px-3 py-2 text-gray-600">No matching pages. Record search is not available yet.</li>
          ) : (
            results.map((page) => (
              <li key={page.href}>
                <Link href={page.href} onClick={() => setQuery("")} className="block px-3 py-1.5 hover:bg-gray-100">
                  {page.leaf.label}
                  <span className="ml-2 text-xs text-gray-600">{[page.mod.label, page.group?.label].filter(Boolean).join(" › ")}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

const QUICK_CREATE = [
  { href: "/job-openings/create", label: "Job Opening" },
  { href: "/candidates/create", label: "Candidate" },
  { href: "/interviews/scheduling", label: "Interview" },
  { href: "/offers/create", label: "Offer" },
  { href: "/activities/tasks", label: "Task" },
];

export function TopBar({ user, portalUrl }: { user: TopBarUser; portalUrl: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-300 px-3 md:gap-3 md:px-4">
      <Dropdown label="Bishnoi One apps" align="left" button={<Icon name="apps" />}>
        <div className="p-3">
          <p className="font-semibold">Bishnoi One apps</p>
          <a href={portalUrl} className="mt-1 block underline">
            Open the app launcher
          </a>
        </div>
      </Dropdown>
      <p className="min-w-0 flex-1 truncate font-semibold sm:flex-none md:text-lg">{RECRUIT_TITLE}</p>
      <PageSearch />

      <Dropdown label="Quick create" button={<Icon name="plus" />}>
        <p className="border-b border-gray-200 px-3 py-2 text-xs text-gray-600">Create (forms not built yet)</p>
        <ul className="py-1">
          {QUICK_CREATE.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block px-3 py-1.5 hover:bg-gray-100">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Dropdown>

      <Dropdown label="Notifications" button={<Icon name="bell" />}>
        <div className="p-3">
          <p className="font-semibold">Notifications</p>
          <p className="mt-1 text-gray-600">No notifications. (Placeholder — not connected.)</p>
        </div>
      </Dropdown>

      <Link href="/administration" title="Administration (Setup)" className="flex size-9 items-center justify-center rounded hover:bg-gray-100">
        <Icon name="administration" />
        <span className="sr-only">Administration (Setup)</span>
      </Link>

      <Dropdown
        label="User menu"
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
