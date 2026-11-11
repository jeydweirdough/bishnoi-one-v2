// HEURISTIC detector for high-fidelity UI patterns. It cannot judge visual fidelity — it only flags
// common signs (colors, gradients, motion, effects, UI kits, fonts) so Linus can review them.

const NON_GRAY_PALETTES =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|zinc|neutral|stone";

export const RULES = [
  {
    id: "color-utility",
    message: "Non-grayscale Tailwind color utility",
    pattern: new RegExp(`\\b(?:bg|text|border|ring|from|via|to|fill|stroke|outline|decoration|divide|accent|caret|shadow|placeholder)-(?:${NON_GRAY_PALETTES})-\\d{2,3}\\b`),
  },
  { id: "arbitrary-color", message: "Arbitrary color value", pattern: /-\[(?:#|rgb|hsl|oklch|color:)/ },
  { id: "gradient", message: "Gradient", pattern: /\bbg-(?:gradient|linear|radial|conic)-|(?:linear|radial|conic)-gradient\(/ },
  { id: "glass", message: "Blur / glassmorphism effect", pattern: /\b(?:backdrop-blur|backdrop-filter|blur-(?:sm|md|lg|xl|2xl|3xl))\b/ },
  { id: "animation", message: "Animation", pattern: /\banimate-[a-z]|@keyframes\b|\banimation\s*:/ },
  { id: "heavy-shadow", message: "Decorative shadow", pattern: /\b(?:shadow-(?:lg|xl|2xl|inner)|drop-shadow(?:-[a-z0-9]+)?)\b/ },
  { id: "custom-font", message: "Custom font", pattern: /from\s+["']next\/font|@font-face|fonts\.googleapis/ },
  {
    id: "ui-library",
    message: "UI/animation/icon library import",
    pattern: /from\s+["'](?:framer-motion|motion\/react|@radix-ui\/|@headlessui\/|lucide-react|react-icons|@heroicons\/|@mui\/|antd|@chakra-ui\/|@mantine\/|shadcn)/,
  },
  { id: "hex-color", message: "Hard-coded hex color", pattern: /#[0-9a-fA-F]{3,8}\b(?![\w-])/, extensions: [".css"] },
  { id: "inline-color", message: "Inline style color", pattern: /style=\{\{[^}]*\b(?:color|background|backgroundColor|borderColor)\s*:/ },
];

/** Files reviewed by Linus that may legitimately contain theme values. */
export const ALLOWLIST = ["packages/ui/src/styles.css"];

export const LINTED_EXTENSIONS = [".ts", ".tsx", ".css", ".mjs", ".js"];

export function isLintable(file) {
  return (
    (file.startsWith("apps/") || file.startsWith("packages/ui/")) &&
    !file.includes("/node_modules/") &&
    !file.includes("/.next/") &&
    LINTED_EXTENSIONS.some((ext) => file.endsWith(ext)) &&
    !ALLOWLIST.includes(file)
  );
}

/** @returns {{file: string, line: number, rule: string, message: string, text: string}[]} */
export function lintSource(file, source) {
  const findings = [];
  const lines = source.split(/\r?\n/);
  lines.forEach((text, index) => {
    for (const rule of RULES) {
      if (rule.extensions && !rule.extensions.some((ext) => file.endsWith(ext))) continue;
      if (rule.pattern.test(text)) {
        findings.push({ file, line: index + 1, rule: rule.id, message: rule.message, text: text.trim().slice(0, 160) });
      }
    }
  });
  return findings;
}
