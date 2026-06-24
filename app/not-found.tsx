import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-96 w-full max-w-3xl place-items-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-neutral-950 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          The page you are looking for does not exist in this KaarYab demo.
        </p>
        <Link
          className={buttonStyles({ variant: "primary", className: "mt-5" })}
          href="/"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
