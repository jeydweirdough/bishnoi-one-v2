import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base = "inline-flex items-center justify-center rounded border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50";
const variants: Record<Variant, string> = {
  primary: "border-gray-900 bg-gray-900 text-white hover:bg-gray-700",
  secondary: "border-gray-400 bg-white text-gray-900 hover:bg-gray-100",
};

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({ href, children, variant = "secondary" }: { href: string; children: ReactNode; variant?: Variant }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
