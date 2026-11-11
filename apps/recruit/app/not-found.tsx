import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-gray-600">This address is not part of the Recruit navigation.</p>
      <p className="mt-4 text-sm">
        <Link href="/" className="underline">
          Go to Home
        </Link>
      </p>
    </div>
  );
}
