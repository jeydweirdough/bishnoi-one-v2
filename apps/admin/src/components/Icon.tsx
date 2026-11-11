import type { IconName } from "@/navigation/config";

/** Basic outline icons drawn inline, so the admin shell needs no icon library. */
const PATHS: Record<IconName | UiIconName, string> = {
  dashboard: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  organization: "M4 21V5l8-2v18 M12 9h8v12 M3 21h18 M7 8h2 M7 12h2 M7 16h2 M15 13h2 M15 17h2",
  "mail-settings": "M3 6h18v12H3z M3 7l9 6 9-6",
  users: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6",
  domains: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
  groups: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 3-5 6-5s6 2 6 5 M16 5a3 3 0 0 1 0 6 M17 15c2.5.5 4 2.5 4 5",
  "data-migration": "M12 3v10 M8 9l4 4 4-4 M4 14v6h16v-6",
  security: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4",
  "transactional-emails": "M3 11l18-8-8 18-2-8z M11 13L21 3",
  subscription: "M6 3h9l3 3v15H6z M9 9h6 M9 13h6 M9 17h4",
  "other-app-settings":
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M4.9 4.9L7 7 M17 17l2.1 2.1 M4.9 19.1L7 17 M17 7l2.1-2.1",
  zia: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  reports: "M4 4v16h16 M8 16l4-5 3 3 4-6",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "M9 6l6 6-6 6",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z M10 20a2 2 0 0 0 4 0",
  help: "M4 14v-2a8 8 0 0 1 16 0v2 M4 14h3v5H4z M17 14h3v5h-3z",
  home: "M3 11l9-7 9 7 M5 10v10h14V10",
  collapse: "M4 6h16 M11 12h9 M4 18h16 M7 9l-3 3 3 3",
  expand: "M4 6h16 M4 12h9 M4 18h16 M17 9l3 3-3 3",
  back: "M19 12H5 M11 6l-6 6 6 6",
  external: "M14 4h6v6 M20 4l-9 9 M18 14v6H4V6h6",
  menu: "M4 6h16 M4 12h16 M4 18h16",
};

export type UiIconName =
  | "search"
  | "chevron-down"
  | "chevron-right"
  | "bell"
  | "help"
  | "home"
  | "collapse"
  | "expand"
  | "back"
  | "external"
  | "menu";

export function Icon({ name, className = "size-5" }: { name: IconName | UiIconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
