"use client";

import { useState } from "react";

/** Copies a value to the clipboard and confirms in place. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} className="rounded border border-gray-300 px-2 py-0.5 text-xs hover:bg-gray-100">
      {copied ? "Copied" : "Copy"}
      <span className="sr-only"> {label}</span>
    </button>
  );
}
