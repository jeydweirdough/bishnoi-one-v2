import type { IconName } from "@/navigation/config";

/** Basic outline icons drawn inline, so the Recruit shell needs no icon library. */
const PATHS: Record<IconName | UiIconName, string> = {
  home: "M3 11l9-7 9 7 M5 10v10h14V10",
  "job-openings": "M4 7h16v13H4z M9 7V4h6v3 M4 12h16",
  candidates: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6",
  applications: "M6 3h9l3 3v15H6z M9 9h6 M9 13h6 M9 17h4",
  interviews: "M4 5h16v11H9l-5 4z M8 9h8 M8 12h5",
  offers: "M3 6h18v12H3z M3 7l9 6 9-6",
  talent: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 3-5 6-5s6 2 6 5 M16 5a3 3 0 0 1 0 6 M17 15c2.5.5 4 2.5 4 5",
  activities: "M4 5h16v15H4z M4 10h16 M8 3v4 M16 3v4",
  staffing: "M4 21V5l8-2v18 M12 9h8v12 M3 21h18 M7 8h2 M7 12h2 M7 16h2 M15 13h2 M15 17h2",
  reports: "M4 4v16h16 M8 16l4-5 3 3 4-6",
  administration:
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M4.9 4.9L7 7 M17 17l2.1 2.1 M4.9 19.1L7 17 M17 7l2.1-2.1",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-right": "M9 6l6 6-6 6",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z M10 20a2 2 0 0 0 4 0",
  plus: "M12 5v14 M5 12h14",
  apps: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  collapse: "M4 6h16 M11 12h9 M4 18h16 M7 9l-3 3 3 3",
  expand: "M4 6h16 M4 12h9 M4 18h16 M17 9l3 3-3 3",
};

export type UiIconName = "search" | "chevron-down" | "chevron-right" | "bell" | "plus" | "apps" | "collapse" | "expand";

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
