"use client";

import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({
  label = "Loading opportunities...",
}: LoadingStateProps) {
  return (
    <div className="grid min-h-64 place-items-center">
      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <Loader2
          className="h-5 w-5 animate-spin text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        />

        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          {label}
        </span>
      </div>
    </div>
  );
}
