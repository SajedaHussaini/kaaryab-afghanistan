"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="mx-auto grid min-h-96 w-full max-w-3xl place-items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-rose-200 bg-white p-6 text-center shadow-sm dark:border-rose-900 dark:bg-neutral-950">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-neutral-950 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          {error.message || "The page could not be rendered."}
        </p>
        <Button className="mt-5" onClick={unstable_retry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
