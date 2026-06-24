import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center dark:border-neutral-700 dark:bg-neutral-950">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-neutral-950 dark:text-white">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Link
          className={buttonStyles({ variant: "primary", className: "mt-5" })}
          href={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
